import { useBoardStore } from './store/boardStore';
import { Board } from './components/Board';
import { BoardSwitcher } from './components/BoardSwitcher';
import { FontSizeSelector } from './components/FontSizeSelector';
import { ThemeSelector } from './components/ThemeSelector';

const scaleClasses = {
  xs: 'scale-xs',
  sm: 'scale-sm',
  md: 'scale-md',
  lg: 'scale-lg',
  xl: 'scale-xl',
};

const themeClasses = {
  light: 'theme-light',
  dark: 'theme-dark',
};

function App() {
  const { boards, activeBoardId, fontSize, theme } = useBoardStore();
  const activeBoard = activeBoardId ? boards[activeBoardId] : null;

  return (
    <div className={`min-h-screen flex flex-col ${scaleClasses[fontSize]} ${themeClasses[theme]}`}>
      {/* Header */}
      <header className="px-6 py-4" style={{ backgroundColor: 'var(--bg-header)', borderBottom: '1px solid var(--border-default)' }}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>Task Board</h1>
            <BoardSwitcher />
          </div>
          <div className="flex items-center gap-4">
            <ThemeSelector />
            <FontSizeSelector />
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 flex overflow-hidden">
        {activeBoard ? (
          <Board board={activeBoard} />
        ) : (
          <div className="flex-1 flex items-center justify-center" style={{ color: 'var(--text-secondary)' }}>
            <div className="text-center">
              <svg
                className="w-16 h-16 mx-auto mb-4"
                style={{ color: 'var(--text-muted)' }}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2"
                />
              </svg>
              <p className="text-[1.1em]" style={{ color: 'var(--text-primary)' }}>No board selected</p>
              <p className="text-[0.9em] mt-2">Create a board to get started</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
