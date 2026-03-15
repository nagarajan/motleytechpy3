import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';
import { doc, setDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../config/firebase';
import type { AppState, Board, Swimlane, Task, Subtask, FontSize, Theme } from '../types';

export interface ExportData {
  version: number;
  exportedAt: string;
  boards: Record<string, Board>;
  swimlanes: Record<string, Swimlane>;
  tasks: Record<string, Task>;
}

interface BoardStore extends AppState {
  // Board actions
  addBoard: (name: string) => void;
  renameBoard: (boardId: string, name: string) => void;
  deleteBoard: (boardId: string) => void;
  setActiveBoard: (boardId: string) => void;

  // Swimlane actions
  addSwimlane: (boardId: string, title: string) => void;
  renameSwimlane: (swimlaneId: string, title: string) => void;
  deleteSwimlane: (swimlaneId: string) => void;
  moveSwimlaneToBoard: (swimlaneId: string, targetBoardId: string) => void;
  reorderSwimlanes: (boardId: string, swimlaneIds: string[]) => void;

  // Task actions
  addTask: (swimlaneId: string, title: string) => void;
  renameTask: (taskId: string, title: string) => void;
  deleteTask: (taskId: string) => void;
  toggleTaskComplete: (taskId: string) => void;
  moveTask: (taskId: string, fromSwimlaneId: string, toSwimlaneId: string, newIndex?: number) => void;
  reorderTasks: (swimlaneId: string, taskIds: string[]) => void;

  // Subtask actions
  addSubtask: (taskId: string, title: string) => void;
  renameSubtask: (taskId: string, subtaskId: string, title: string) => void;
  deleteSubtask: (taskId: string, subtaskId: string) => void;
  toggleSubtaskComplete: (taskId: string, subtaskId: string) => void;
  reorderSubtasks: (taskId: string, subtaskIds: string[]) => void;

  // Settings
  setFontSize: (size: FontSize) => void;
  setTheme: (theme: Theme) => void;

  // Import/Export
  getExportData: () => ExportData;
  importData: (data: ExportData) => { importedBoards: number; renamedBoards: string[] };

  // Firestore sync
  _isRemoteUpdate: boolean;
  _setIsRemoteUpdate: (value: boolean) => void;
}

const FIRESTORE_DOC = doc(db, 'taskboards', 'user-data');

// Debounce helper
function debounce<T extends (arg: AppState) => void>(fn: T, ms: number): T {
  let timeoutId: ReturnType<typeof setTimeout>;
  return ((arg: AppState) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(arg), ms);
  }) as T;
}

// Save to Firestore (debounced to avoid too many writes)
const saveToFirestore = debounce((state: AppState) => {
  setDoc(FIRESTORE_DOC, {
    boards: state.boards,
    swimlanes: state.swimlanes,
    tasks: state.tasks,
    activeBoardId: state.activeBoardId,
    fontSize: state.fontSize,
    theme: state.theme,
    updatedAt: new Date().toISOString(),
  }).catch((error) => {
    console.error('Failed to save to Firestore:', error);
  });
}, 1000);

const createDefaultBoard = (): { board: Board; swimlanes: Swimlane[] } => {
  const todoId = uuidv4();
  const inProgressId = uuidv4();
  const doneId = uuidv4();

  return {
    board: {
      id: uuidv4(),
      name: 'My Board',
      swimlaneIds: [todoId, inProgressId, doneId],
    },
    swimlanes: [
      { id: todoId, title: 'To Do', taskIds: [] },
      { id: inProgressId, title: 'In Progress', taskIds: [] },
      { id: doneId, title: 'Done', taskIds: [] },
    ],
  };
};

export const useBoardStore = create<BoardStore>()(
  persist(
    (set, get) => ({
      boards: {},
      swimlanes: {},
      tasks: {},
      activeBoardId: null,
      fontSize: 'md' as FontSize,
      theme: 'light' as Theme,
      _isRemoteUpdate: false,

      _setIsRemoteUpdate: (value: boolean) => {
        set({ _isRemoteUpdate: value });
      },

      // Board actions
      addBoard: (name: string) => {
        const { board, swimlanes } = createDefaultBoard();
        board.name = name;

        set((state) => {
          const newSwimlanes = { ...state.swimlanes };
          swimlanes.forEach((sl) => {
            newSwimlanes[sl.id] = sl;
          });

          return {
            boards: { ...state.boards, [board.id]: board },
            swimlanes: newSwimlanes,
            activeBoardId: state.activeBoardId || board.id,
          };
        });
      },

      renameBoard: (boardId: string, name: string) => {
        set((state) => ({
          boards: {
            ...state.boards,
            [boardId]: { ...state.boards[boardId], name },
          },
        }));
      },

      deleteBoard: (boardId: string) => {
        set((state) => {
          const board = state.boards[boardId];
          if (!board) return state;

          const newBoards = { ...state.boards };
          delete newBoards[boardId];

          const newSwimlanes = { ...state.swimlanes };
          const newTasks = { ...state.tasks };

          board.swimlaneIds.forEach((slId) => {
            const swimlane = state.swimlanes[slId];
            if (swimlane) {
              swimlane.taskIds.forEach((taskId) => {
                delete newTasks[taskId];
              });
              delete newSwimlanes[slId];
            }
          });

          const boardIds = Object.keys(newBoards);
          const newActiveBoardId =
            state.activeBoardId === boardId
              ? boardIds.length > 0
                ? boardIds[0]
                : null
              : state.activeBoardId;

          return {
            boards: newBoards,
            swimlanes: newSwimlanes,
            tasks: newTasks,
            activeBoardId: newActiveBoardId,
          };
        });
      },

      setActiveBoard: (boardId: string) => {
        set({ activeBoardId: boardId });
      },

      // Swimlane actions
      addSwimlane: (boardId: string, title: string) => {
        const swimlane: Swimlane = {
          id: uuidv4(),
          title,
          taskIds: [],
        };

        set((state) => ({
          swimlanes: { ...state.swimlanes, [swimlane.id]: swimlane },
          boards: {
            ...state.boards,
            [boardId]: {
              ...state.boards[boardId],
              swimlaneIds: [...state.boards[boardId].swimlaneIds, swimlane.id],
            },
          },
        }));
      },

      renameSwimlane: (swimlaneId: string, title: string) => {
        set((state) => ({
          swimlanes: {
            ...state.swimlanes,
            [swimlaneId]: { ...state.swimlanes[swimlaneId], title },
          },
        }));
      },

      deleteSwimlane: (swimlaneId: string) => {
        set((state) => {
          const swimlane = state.swimlanes[swimlaneId];
          if (!swimlane) return state;

          const newSwimlanes = { ...state.swimlanes };
          delete newSwimlanes[swimlaneId];

          const newTasks = { ...state.tasks };
          swimlane.taskIds.forEach((taskId) => {
            delete newTasks[taskId];
          });

          const newBoards = { ...state.boards };
          Object.values(newBoards).forEach((board) => {
            if (board.swimlaneIds.includes(swimlaneId)) {
              board.swimlaneIds = board.swimlaneIds.filter((id) => id !== swimlaneId);
            }
          });

          return { swimlanes: newSwimlanes, tasks: newTasks, boards: newBoards };
        });
      },

      moveSwimlaneToBoard: (swimlaneId: string, targetBoardId: string) => {
        set((state) => {
          const newBoards = { ...state.boards };

          // Remove from current board
          Object.values(newBoards).forEach((board) => {
            if (board.swimlaneIds.includes(swimlaneId)) {
              board.swimlaneIds = board.swimlaneIds.filter((id) => id !== swimlaneId);
            }
          });

          // Add to target board
          if (newBoards[targetBoardId]) {
            newBoards[targetBoardId] = {
              ...newBoards[targetBoardId],
              swimlaneIds: [...newBoards[targetBoardId].swimlaneIds, swimlaneId],
            };
          }

          return { boards: newBoards };
        });
      },

      reorderSwimlanes: (boardId: string, swimlaneIds: string[]) => {
        set((state) => ({
          boards: {
            ...state.boards,
            [boardId]: { ...state.boards[boardId], swimlaneIds },
          },
        }));
      },

      // Task actions
      addTask: (swimlaneId: string, title: string) => {
        const task: Task = {
          id: uuidv4(),
          title,
          completed: false,
          subtasks: [],
        };

        set((state) => ({
          tasks: { ...state.tasks, [task.id]: task },
          swimlanes: {
            ...state.swimlanes,
            [swimlaneId]: {
              ...state.swimlanes[swimlaneId],
              taskIds: [...state.swimlanes[swimlaneId].taskIds, task.id],
            },
          },
        }));
      },

      renameTask: (taskId: string, title: string) => {
        set((state) => ({
          tasks: {
            ...state.tasks,
            [taskId]: { ...state.tasks[taskId], title },
          },
        }));
      },

      deleteTask: (taskId: string) => {
        set((state) => {
          const newTasks = { ...state.tasks };
          delete newTasks[taskId];

          const newSwimlanes = { ...state.swimlanes };
          Object.values(newSwimlanes).forEach((swimlane) => {
            if (swimlane.taskIds.includes(taskId)) {
              swimlane.taskIds = swimlane.taskIds.filter((id) => id !== taskId);
            }
          });

          return { tasks: newTasks, swimlanes: newSwimlanes };
        });
      },

      toggleTaskComplete: (taskId: string) => {
        set((state) => ({
          tasks: {
            ...state.tasks,
            [taskId]: {
              ...state.tasks[taskId],
              completed: !state.tasks[taskId].completed,
            },
          },
        }));
      },

      moveTask: (taskId: string, fromSwimlaneId: string, toSwimlaneId: string, newIndex?: number) => {
        set((state) => {
          const newSwimlanes = { ...state.swimlanes };

          // Remove from source
          if (newSwimlanes[fromSwimlaneId]) {
            newSwimlanes[fromSwimlaneId] = {
              ...newSwimlanes[fromSwimlaneId],
              taskIds: newSwimlanes[fromSwimlaneId].taskIds.filter((id) => id !== taskId),
            };
          }

          // Add to destination
          if (newSwimlanes[toSwimlaneId]) {
            const newTaskIds = [...newSwimlanes[toSwimlaneId].taskIds];
            if (newIndex !== undefined) {
              newTaskIds.splice(newIndex, 0, taskId);
            } else {
              newTaskIds.push(taskId);
            }
            newSwimlanes[toSwimlaneId] = {
              ...newSwimlanes[toSwimlaneId],
              taskIds: newTaskIds,
            };
          }

          return { swimlanes: newSwimlanes };
        });
      },

      reorderTasks: (swimlaneId: string, taskIds: string[]) => {
        set((state) => ({
          swimlanes: {
            ...state.swimlanes,
            [swimlaneId]: { ...state.swimlanes[swimlaneId], taskIds },
          },
        }));
      },

      // Subtask actions
      addSubtask: (taskId: string, title: string) => {
        const subtask: Subtask = {
          id: uuidv4(),
          title,
          completed: false,
        };

        set((state) => ({
          tasks: {
            ...state.tasks,
            [taskId]: {
              ...state.tasks[taskId],
              subtasks: [...state.tasks[taskId].subtasks, subtask],
            },
          },
        }));
      },

      renameSubtask: (taskId: string, subtaskId: string, title: string) => {
        set((state) => ({
          tasks: {
            ...state.tasks,
            [taskId]: {
              ...state.tasks[taskId],
              subtasks: state.tasks[taskId].subtasks.map((st) =>
                st.id === subtaskId ? { ...st, title } : st
              ),
            },
          },
        }));
      },

      deleteSubtask: (taskId: string, subtaskId: string) => {
        set((state) => ({
          tasks: {
            ...state.tasks,
            [taskId]: {
              ...state.tasks[taskId],
              subtasks: state.tasks[taskId].subtasks.filter((st) => st.id !== subtaskId),
            },
          },
        }));
      },

      toggleSubtaskComplete: (taskId: string, subtaskId: string) => {
        set((state) => ({
          tasks: {
            ...state.tasks,
            [taskId]: {
              ...state.tasks[taskId],
              subtasks: state.tasks[taskId].subtasks.map((st) =>
                st.id === subtaskId ? { ...st, completed: !st.completed } : st
              ),
            },
          },
        }));
      },

      reorderSubtasks: (taskId: string, subtaskIds: string[]) => {
        set((state) => {
          const task = state.tasks[taskId];
          if (!task) return state;

          const subtaskMap = new Map(task.subtasks.map((st) => [st.id, st]));
          const reorderedSubtasks = subtaskIds
            .map((id) => subtaskMap.get(id))
            .filter(Boolean) as typeof task.subtasks;

          return {
            tasks: {
              ...state.tasks,
              [taskId]: {
                ...task,
                subtasks: reorderedSubtasks,
              },
            },
          };
        });
      },

      // Settings
      setFontSize: (size: FontSize) => {
        set({ fontSize: size });
      },

      setTheme: (theme: Theme) => {
        set({ theme });
      },

      // Import/Export
      getExportData: (): ExportData => {
        const state = get();
        return {
          version: 1,
          exportedAt: new Date().toISOString(),
          boards: state.boards,
          swimlanes: state.swimlanes,
          tasks: state.tasks,
        };
      },

      importData: (data: ExportData) => {
        const state = get();
        const existingBoardNames = new Set(
          Object.values(state.boards).map((b) => b.name.toLowerCase())
        );

        const renamedBoards: string[] = [];
        const newBoards: Record<string, Board> = { ...state.boards };
        const newSwimlanes: Record<string, Swimlane> = { ...state.swimlanes };
        const newTasks: Record<string, Task> = { ...state.tasks };

        const getUniqueBoardName = (originalName: string): string => {
          const lowerName = originalName.toLowerCase();
          if (!existingBoardNames.has(lowerName)) {
            existingBoardNames.add(lowerName);
            return originalName;
          }

          let counter = 1;
          let newName = `${originalName} (${counter})`;
          while (existingBoardNames.has(newName.toLowerCase())) {
            counter++;
            newName = `${originalName} (${counter})`;
          }
          existingBoardNames.add(newName.toLowerCase());
          return newName;
        };

        Object.values(data.boards).forEach((importedBoard) => {
          const newBoardId = uuidv4();

          const originalName = importedBoard.name;
          const uniqueName = getUniqueBoardName(originalName);
          if (uniqueName !== originalName) {
            renamedBoards.push(`"${originalName}" -> "${uniqueName}"`);
          }

          const newSwimlaneIds: string[] = [];
          importedBoard.swimlaneIds.forEach((oldSwimlaneId) => {
            const importedSwimlane = data.swimlanes[oldSwimlaneId];
            if (importedSwimlane) {
              const newSwimlaneId = uuidv4();
              newSwimlaneIds.push(newSwimlaneId);

              const newTaskIds: string[] = [];
              importedSwimlane.taskIds.forEach((oldTaskId) => {
                const importedTask = data.tasks[oldTaskId];
                if (importedTask) {
                  const newTaskId = uuidv4();
                  newTaskIds.push(newTaskId);

                  const newSubtasks = importedTask.subtasks.map((subtask) => ({
                    ...subtask,
                    id: uuidv4(),
                  }));

                  newTasks[newTaskId] = {
                    ...importedTask,
                    id: newTaskId,
                    subtasks: newSubtasks,
                  };
                }
              });

              newSwimlanes[newSwimlaneId] = {
                ...importedSwimlane,
                id: newSwimlaneId,
                taskIds: newTaskIds,
              };
            }
          });

          newBoards[newBoardId] = {
            id: newBoardId,
            name: uniqueName,
            swimlaneIds: newSwimlaneIds,
          };
        });

        set({
          boards: newBoards,
          swimlanes: newSwimlanes,
          tasks: newTasks,
        });

        return {
          importedBoards: Object.keys(data.boards).length,
          renamedBoards,
        };
      },
    }),
    {
      name: 'kanban-board-storage',
      onRehydrateStorage: () => {
        return (state) => {
          // After rehydrating from localStorage, start Firestore sync
          if (state) {
            initializeFirestoreSync();
          }
        };
      },
    }
  )
);

// Subscribe to state changes and sync to Firestore
let unsubscribeFromStore: (() => void) | null = null;
let unsubscribeFromFirestore: (() => void) | null = null;

function initializeFirestoreSync() {
  // Subscribe to local state changes and push to Firestore
  if (!unsubscribeFromStore) {
    unsubscribeFromStore = useBoardStore.subscribe((state) => {
      // Don't sync if this was a remote update (to avoid loops)
      if (!state._isRemoteUpdate) {
        saveToFirestore({
          boards: state.boards,
          swimlanes: state.swimlanes,
          tasks: state.tasks,
          activeBoardId: state.activeBoardId,
          fontSize: state.fontSize,
          theme: state.theme,
        });
      }
    });
  }

  // Subscribe to Firestore changes and update local state
  if (!unsubscribeFromFirestore) {
    unsubscribeFromFirestore = onSnapshot(
      FIRESTORE_DOC,
      (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.data();
          const currentState = useBoardStore.getState();

          // Only update if data is different (compare by updatedAt or content)
          const hasChanges =
            JSON.stringify(data.boards) !== JSON.stringify(currentState.boards) ||
            JSON.stringify(data.swimlanes) !== JSON.stringify(currentState.swimlanes) ||
            JSON.stringify(data.tasks) !== JSON.stringify(currentState.tasks);

          if (hasChanges) {
            currentState._setIsRemoteUpdate(true);
            useBoardStore.setState({
              boards: data.boards || {},
              swimlanes: data.swimlanes || {},
              tasks: data.tasks || {},
              activeBoardId: data.activeBoardId || currentState.activeBoardId,
              fontSize: data.fontSize || 'md',
              theme: data.theme || 'light',
            });
            // Reset flag after a short delay
            setTimeout(() => {
              useBoardStore.getState()._setIsRemoteUpdate(false);
            }, 100);
          }
        }
      },
      (error) => {
        console.error('Firestore sync error:', error);
      }
    );
  }
}

// Initialize with a default board if empty
const initializeStore = () => {
  const state = useBoardStore.getState();
  if (Object.keys(state.boards).length === 0) {
    state.addBoard('My Board');
  }
};

initializeStore();
