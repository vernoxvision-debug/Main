import React from 'react';

export interface LedToggleProps {
  isDark: boolean;
  onToggle: () => void;
  className?: string;
}

export const LedToggle: React.FC<LedToggleProps> = ({ isDark, onToggle, className = '' }) => {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onToggle();
    }
  };

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--ink-muted)]">
        STAGE
      </span>
      <button
        type="button"
        role="switch"
        aria-checked={isDark}
        aria-label="Toggle Stage Mode between light and dark rooms"
        onClick={onToggle}
        onKeyDown={handleKeyDown}
        className="relative inline-flex items-center h-6 w-12 cursor-pointer rounded-[2px] p-0.5 border border-[var(--line-strong)] bg-[#D9D9D6] dark:bg-[#1C1D1F] transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-[#FF5A1F] focus-visible:outline-offset-2"
        data-testid="toggle-stage-mode"
      >
        {/* Toggle Slider Track & Thumb */}
        <span
          className={`inline-block h-4.5 w-5 rounded-[1px] bg-[var(--bg)] border border-[var(--line)] shadow-sm transform transition-transform duration-200 ease-out flex items-center justify-center ${
            isDark ? 'translate-x-5.5 bg-[#2A2B2E]' : 'translate-x-0 bg-[#F4F4F2]'
          }`}
        >
          {/* Hardware grip lines */}
          <span className="flex flex-col gap-0.5 opacity-40">
            <span className="w-2.5 h-[1px] bg-[var(--ink)] block"></span>
            <span className="w-2.5 h-[1px] bg-[var(--ink)] block"></span>
          </span>
        </span>
      </button>

      {/* Tactile Hardware LED dot */}
      <div className="flex items-center gap-1.5" title={isDark ? 'Dark Stage Lit' : 'Light Stage'}>
        <span
          className={`w-2 h-2 rounded-full transition-all duration-300 ${
            isDark
              ? 'bg-[#FF5A1F] shadow-[0_0_8px_#FF5A1F,0_0_2px_#FFF]'
              : 'bg-[#8E8E8B] opacity-50'
          }`}
          data-testid="stage-led"
        />
        <span className="font-mono text-[9px] uppercase tracking-widest text-[var(--ink-muted)]">
          {isDark ? 'DRK' : 'LGT'}
        </span>
      </div>
    </div>
  );
};
