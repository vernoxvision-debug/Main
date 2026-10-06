import React from 'react';
import { trackPixel } from '@/lib/pixel';

export interface TactileButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;
  variant?: 'primary' | 'orange' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  isExternal?: boolean;
  isBuy?: boolean;
  className?: string;
}

export const TactileButton: React.FC<TactileButtonProps> = ({
  href,
  variant = 'primary',
  size = 'md',
  children,
  isExternal = false,
  isBuy = false,
  className = '',
  onClick,
  ...rest
}) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    if (isBuy) {
      trackPixel('InitiateCheckout', {
        value: 9.99,
        currency: 'USD',
        content_name: 'Vernox Vision Vault',
      });
    }
    if (onClick) {
      (onClick as React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>)(e);
    }
  };

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-[11px] gap-1.5',
    md: 'px-5 py-2.5 text-xs gap-2',
    lg: 'px-7 py-3.5 text-sm gap-2.5',
  }[size];

  const variantClasses = {
    primary:
      'bg-[var(--ink)] text-[var(--bg)] border border-[var(--ink)] hover:bg-[#1E1E1E] dark:hover:bg-[#EAEAEA] active:translate-y-[1px]',
    orange:
      'bg-[#FF5A1F] text-black font-bold border border-[#FF5A1F] hover:bg-[#FF6D38] active:translate-y-[1px] shadow-[0_2px_12px_rgba(255,90,31,0.35)]',
    secondary:
      'bg-transparent text-[var(--ink)] border border-[var(--line-strong)] hover:bg-[var(--line)]/30 active:translate-y-[1px]',
    ghost:
      'bg-transparent text-[var(--ink)] hover:text-[#FF5A1F] underline-offset-4 hover:underline',
  }[variant];

  const baseClasses =
    `inline-flex items-center justify-center font-mono font-medium uppercase tracking-wider rounded-[2px] cursor-pointer transition-all duration-150 select-none ${sizeClasses} ${variantClasses} ${className}`;

  if (href) {
    return (
      <a
        href={href}
        className={baseClasses}
        target={isExternal ? '_blank' : undefined}
        rel={isExternal ? 'noopener noreferrer' : undefined}
        onClick={handleClick}
        data-testid={isBuy ? 'btn-buy-cta' : undefined}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      type="button"
      className={baseClasses}
      onClick={handleClick}
      data-testid={isBuy ? 'btn-buy-cta' : undefined}
      {...rest}
    >
      {children}
    </button>
  );
};
