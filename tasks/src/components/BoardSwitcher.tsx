import { useState, useRef, useEffect } from 'react';
import { useBoardStore } from '../store/boardStore';
import { EditableTitle } from './EditableTitle';

export function BoardSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAddingBoard, setIsAddingBoard] = useState(false);
  const [newBoardName, setNewBoardName] = useState('');
  const menuRef = useRef<HTMLDivElement>(null);

  const { boards, activeBoardId, setActiveBoard, addBoard, renameBoard, deleteBoard } =
    useBoardStore();

  const activeBoard = activeBoardId ? boards[activeBoardId] : null;
  const boardList = Object.values(boards);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setIsAddingBoard(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleAddBoard = () => {
    if (newBoardName.trim()) {
      addBoard(newBoardName.trim());
      setNewBoardName('');
      setIsAddingBoard(false);
    }
  };

  const handleDeleteBoard = (boardId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (boardList.length > 1) {
      deleteBoard(boardId);
    }
  };

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 border rounded-lg transition-colors"
        style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-default)', color: 'var(--text-primary)' }}
      >
        <svg className="w-5 h-5" style={{ color: 'var(--text-secondary)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
        </svg>
        <span className="font-medium">{activeBoard?.name || 'Select Board'}</span>
        <svg
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          style={{ color: 'var(--text-muted)' }}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 border rounded-lg shadow-lg z-30 min-w-[240px]" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-default)' }}>
          <div className="p-2" style={{ borderBottom: '1px solid var(--border-default)' }}>
            <p className="text-[0.75em] font-semibold uppercase px-2 py-1" style={{ color: 'var(--text-secondary)' }}>
              Your Boards
            </p>
          </div>

          <div className="max-h-64 overflow-y-auto">
            {boardList.map((board) => (
              <div
                key={board.id}
                className="flex items-center gap-2 px-3 py-2 cursor-pointer"
                style={{ backgroundColor: board.id === activeBoardId ? 'var(--bg-active)' : 'transparent' }}
                onClick={() => {
                  setActiveBoard(board.id);
                  setIsOpen(false);
                }}
              >
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: board.id === activeBoardId ? 'var(--accent-primary)' : 'var(--text-muted)' }}
                />

                <EditableTitle
                  value={board.name}
                  onSave={(name) => renameBoard(board.id, name)}
                  className="flex-1"
                  inputClassName="w-full"
                />

                {boardList.length > 1 && (
                  <button
                    onClick={(e) => handleDeleteBoard(board.id, e)}
                    className="p-1 opacity-0 group-hover:opacity-100 hover:opacity-100"
                    style={{ color: 'var(--text-muted)' }}
                    title="Delete board"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
            ))}
          </div>

          <div className="p-2" style={{ borderTop: '1px solid var(--border-default)' }}>
            {isAddingBoard ? (
              <div className="flex items-center gap-2 px-2">
                <input
                  type="text"
                  value={newBoardName}
                  onChange={(e) => setNewBoardName(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleAddBoard();
                    if (e.key === 'Escape') {
                      setIsAddingBoard(false);
                      setNewBoardName('');
                    }
                  }}
                  placeholder="Board name..."
                  className="flex-1 border rounded px-2 py-1 text-[0.9em] focus:outline-none focus:ring-2 focus:ring-blue-500"
                  style={{ backgroundColor: 'var(--bg-input)', borderColor: 'var(--border-default)', color: 'var(--text-primary)' }}
                  autoFocus
                />
                <button
                  onClick={handleAddBoard}
                  style={{ color: 'var(--accent-primary)' }}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </button>
                <button
                  onClick={() => {
                    setIsAddingBoard(false);
                    setNewBoardName('');
                  }}
                  style={{ color: 'var(--text-muted)' }}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsAddingBoard(true)}
                className="w-full flex items-center gap-2 px-3 py-2 text-[0.9em] rounded"
                style={{ color: 'var(--text-secondary)' }}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Create new board
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
