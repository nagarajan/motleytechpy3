import { useState, useRef, useEffect } from 'react';
import { useBoardStore } from '../store/boardStore';
import type { Theme } from '../types';

interface ThemeOption {
  value: Theme;
  label: string;
  colors: string[]; // Preview colors for the theme
  category: 'pastel' | 'saturated' | 'dark';
}

const themeOptions: ThemeOption[] = [
  // Pastel themes
  { value: 'rose', label: 'Rose', colors: ['#fce7f3', '#ec4899', '#fbcfe8'], category: 'pastel' },
  { value: 'lavender', label: 'Lavender', colors: ['#ede9fe', '#8b5cf6', '#ddd6fe'], category: 'pastel' },
  { value: 'mint', label: 'Mint', colors: ['#d1fae5', '#10b981', '#a7f3d0'], category: 'pastel' },
  { value: 'peach', label: 'Peach', colors: ['#ffedd5', '#f97316', '#fed7aa'], category: 'pastel' },
  // Saturated themes
  { value: 'ocean', label: 'Ocean', colors: ['#0c4a6e', '#0284c7', '#075985'], category: 'saturated' },
  { value: 'forest', label: 'Forest', colors: ['#14532d', '#16a34a', '#166534'], category: 'saturated' },
  { value: 'sunset', label: 'Sunset', colors: ['#7c2d12', '#ea580c', '#9a3412'], category: 'saturated' },
  { value: 'grape', label: 'Grape', colors: ['#4c1d95', '#7c3aed', '#5b21b6'], category: 'saturated' },
  // Dark theme
  { value: 'dark', label: 'Dark', colors: ['#111827', '#1f2937', '#374151'], category: 'dark' },
];

export function ColorThemeSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { theme, setTheme } = useBoardStore();

  const currentTheme = themeOptions.find((t) => t.value === theme) || themeOptions[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectTheme = (themeValue: Theme) => {
    setTheme(themeValue);
    setIsOpen(false);
  };

  const renderColorPreview = (colors: string[], size: string = '1em') => (
    <div
      className="rounded-full overflow-hidden flex"
      style={{ width: size, height: size }}
    >
      {colors.map((color, i) => (
        <div
          key={i}
          style={{
            backgroundColor: color,
            width: `${100 / colors.length}%`,
            height: '100%',
          }}
        />
      ))}
    </div>
  );

  const pastelThemes = themeOptions.filter((t) => t.category === 'pastel');
  const saturatedThemes = themeOptions.filter((t) => t.category === 'saturated');
  const darkThemes = themeOptions.filter((t) => t.category === 'dark');

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center rounded transition-colors"
        style={{
          padding: '0.5em 0.75em',
          backgroundColor: 'var(--bg-card)',
          color: 'var(--text-secondary)',
          gap: '0.5em',
        }}
        title="Color theme"
      >
        {renderColorPreview(currentTheme.colors, '1.25em')}
        <span style={{ fontSize: '0.85em' }}>{currentTheme.label}</span>
        <svg
          className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}
          style={{ width: '0.75em', height: '0.75em' }}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div
          className="absolute top-full right-0 mt-2 rounded-lg shadow-lg z-50"
          style={{
            backgroundColor: 'var(--bg-card)',
            border: '1px solid var(--border-default)',
            minWidth: '180px',
          }}
        >
          {/* Pastel themes */}
          <div style={{ padding: '0.5em', borderBottom: '1px solid var(--border-default)' }}>
            <p
              className="font-semibold uppercase"
              style={{ color: 'var(--text-muted)', fontSize: '0.7em', padding: '0.25em 0.5em' }}
            >
              Pastel
            </p>
            {pastelThemes.map((option) => (
              <button
                key={option.value}
                onClick={() => handleSelectTheme(option.value)}
                className="w-full flex items-center rounded transition-colors"
                style={{
                  padding: '0.5em',
                  gap: '0.5em',
                  backgroundColor: theme === option.value ? 'var(--bg-active)' : 'transparent',
                  color: 'var(--text-primary)',
                }}
              >
                {renderColorPreview(option.colors, '1.5em')}
                <span style={{ fontSize: '0.9em' }}>{option.label}</span>
                {theme === option.value && (
                  <svg
                    className="ml-auto"
                    style={{ width: '1em', height: '1em', color: 'var(--accent-primary)' }}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </button>
            ))}
          </div>

          {/* Saturated themes */}
          <div style={{ padding: '0.5em', borderBottom: '1px solid var(--border-default)' }}>
            <p
              className="font-semibold uppercase"
              style={{ color: 'var(--text-muted)', fontSize: '0.7em', padding: '0.25em 0.5em' }}
            >
              Saturated
            </p>
            {saturatedThemes.map((option) => (
              <button
                key={option.value}
                onClick={() => handleSelectTheme(option.value)}
                className="w-full flex items-center rounded transition-colors"
                style={{
                  padding: '0.5em',
                  gap: '0.5em',
                  backgroundColor: theme === option.value ? 'var(--bg-active)' : 'transparent',
                  color: 'var(--text-primary)',
                }}
              >
                {renderColorPreview(option.colors, '1.5em')}
                <span style={{ fontSize: '0.9em' }}>{option.label}</span>
                {theme === option.value && (
                  <svg
                    className="ml-auto"
                    style={{ width: '1em', height: '1em', color: 'var(--accent-primary)' }}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </button>
            ))}
          </div>

          {/* Dark theme */}
          <div style={{ padding: '0.5em' }}>
            {darkThemes.map((option) => (
              <button
                key={option.value}
                onClick={() => handleSelectTheme(option.value)}
                className="w-full flex items-center rounded transition-colors"
                style={{
                  padding: '0.5em',
                  gap: '0.5em',
                  backgroundColor: theme === option.value ? 'var(--bg-active)' : 'transparent',
                  color: 'var(--text-primary)',
                }}
              >
                {renderColorPreview(option.colors, '1.5em')}
                <span style={{ fontSize: '0.9em' }}>{option.label}</span>
                {theme === option.value && (
                  <svg
                    className="ml-auto"
                    style={{ width: '1em', height: '1em', color: 'var(--accent-primary)' }}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
