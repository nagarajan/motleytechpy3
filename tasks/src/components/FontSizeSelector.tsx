import { useBoardStore } from '../store/boardStore';
import type { FontSize } from '../types';

const fontSizes: { value: FontSize; label: string }[] = [
  { value: 'xs', label: 'XS' },
  { value: 'sm', label: 'S' },
  { value: 'md', label: 'M' },
  { value: 'lg', label: 'L' },
  { value: 'xl', label: 'XL' },
];

export function FontSizeSelector() {
  const { fontSize, setFontSize } = useBoardStore();

  return (
    <div className="flex items-center gap-1">
      <span className="text-sm mr-1" style={{ color: 'var(--text-header)' }}>Size:</span>
      <div className="flex border rounded-lg overflow-hidden" style={{ borderColor: 'var(--border-default)' }}>
        {fontSizes.map((size) => (
          <button
            key={size.value}
            onClick={() => setFontSize(size.value)}
            className="px-2 py-1 text-xs font-medium transition-colors"
            style={{
              backgroundColor: fontSize === size.value ? 'var(--accent-primary)' : 'var(--bg-card)',
              color: fontSize === size.value ? 'white' : 'var(--text-secondary)',
            }}
            title={`${size.label} font size`}
          >
            {size.label}
          </button>
        ))}
      </div>
    </div>
  );
}
