import { useEffect } from 'react';
import { useBoardStore, initializeForUser } from './store/boardStore';
import { useAuthStore, initializeAuthListener } from './store/authStore';
import { Board } from './components/Board';
import { BoardSwitcher } from './components/BoardSwitcher';
import { FontSizeSelector } from './components/FontSizeSelector';
import { ColorThemeSelector } from './components/ColorThemeSelector';
import { ImportExportButtons } from './components/ImportExportButtons';
import { GoogleAccountWidget } from './components/GoogleAccountWidget';

const scaleClasses = {
  xs: 'scale-xs',
  sm: 'scale-sm',
  md: 'scale-md',
  lg: 'scale-lg',
  xl: 'scale-xl',
};

const themeClasses: Record<string, string> = {
  // Pastel themes
  rose: 'theme-rose',
  lavender: 'theme-lavender',
  mint: 'theme-mint',
  peach: 'theme-peach',
  // Saturated themes
  ocean: 'theme-ocean',
  forest: 'theme-forest',
  sunset: 'theme-sunset',
  grape: 'theme-grape',
  // Dark theme
  dark: 'theme-dark',
};

const getThemeClass = (theme: string) => themeClasses[theme] || 'theme-lavender';

function App() {
  const { boards, activeBoardId, fontSize, theme } = useBoardStore();
  const { initialized } = useAuthStore();
  const activeBoard = activeBoardId ? boards[activeBoardId] : null;

  // Initialize auth listener on mount
  useEffect(() => {
    const unsubscribe = initializeAuthListener((user) => {
      // When auth state changes, initialize board store for that user
      initializeForUser(user?.email || null);
    });
    return unsubscribe;
  }, []);

  // Show loading while auth is initializing
  if (!initialized) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${getThemeClass(theme)}`}>
        <div className="text-center" style={{ color: 'var(--text-secondary)' }}>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen flex flex-col ${scaleClasses[fontSize]} ${getThemeClass(theme)}`}>
      {/* Header */}
      <header style={{ padding: '1em 1.5em', backgroundColor: 'var(--bg-header)', borderBottom: '1px solid var(--border-default)' }}>
        <div className="flex items-center justify-between">
          <div className="flex items-center" style={{ gap: '1em' }}>
            <h1 className="font-bold" style={{ fontSize: '1.5em', color: 'var(--text-header)' }}>Task Board</h1>
            <BoardSwitcher />
          </div>
          <div className="flex items-center" style={{ gap: '1em' }}>
            <ImportExportButtons />
            <ColorThemeSelector />
            <FontSizeSelector />
            <GoogleAccountWidget />
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
