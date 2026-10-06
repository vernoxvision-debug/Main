import React from 'react';
import { Lcd } from '@/components/ui/typography';

export interface LcdNumeralProps {
  value: string | number;
  label?: string;
  variant?: 'green' | 'amber' | 'mono';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export const LcdNumeral: React.FC<LcdNumeralProps> = ({
  value,
  label,
  variant = 'amber',
  size = 'md',
  className = '',
}) => {
  const strVal = String(value);
  // Segmented LCD is strictly for numerals (digits 0-9 and $ . : , - + /)
  const isPureNumeral = /^[\d\s.,:+\-$]+$/.test(strVal);

  const sizeClasses = {
    sm: 'text-sm px-2 py-0.5',
    md: 'text-lg px-2.5 py-1',
    lg: 'text-2xl sm:text-3xl px-3 py-1.5',
    xl: 'text-4xl sm:text-6xl px-4 py-2',
  }[size];

  const variantClasses = {
    amber: 'bg-[#14120F] text-[#FF5A1F] border-[#2A231A]',
    green: 'bg-[#0E1510] text-[#34D399] border-[#182B1E]',
    mono: 'bg-[#151618] text-[#EAE6DF] border-[#25272B]',
  }[variant];

  return (
    <div className={`inline-flex flex-col gap-1 select-none ${className}`}>
      {isPureNumeral && variant !== 'mono' ? (
        <Lcd
          value={strVal}
          size={size}
          variant={variant === 'green' ? 'green' : 'amber'}
          ariaLabel={label ? `${label}: ${strVal}` : strVal}
        />
      ) : (
        <div
          className={`font-mono font-bold tracking-widest border rounded-[2px] shadow-[inset_0_2px_4px_rgba(0,0,0,0.8)] flex items-center justify-center ${sizeClasses} ${variantClasses}`}
        >
          <span className="tabular-nums">{value}</span>
        </div>
      )}
      {label && (
        <span className="font-mono text-[9px] uppercase tracking-wider text-[var(--ink-muted)]">
          {label}
        </span>
      )}
    </div>
  );
};

