import React from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';

/* ==========================================================================
   1. DISPLAY COMPONENT: Archivo Extended (wdth 125, wght 900)
   ========================================================================== */
export interface DisplayProps {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'div' | 'span';
  size?: 'xl' | 'l' | 'm';
  children: React.ReactNode;
  className?: string;
  id?: string;
  'data-testid'?: string;
}

export const Display: React.FC<DisplayProps> = ({
  as: Component = 'h2',
  size = 'l',
  children,
  className = '',
  id,
  'data-testid': testId,
}) => {
  const sizeStyles = {
    xl: { fontSize: 'var(--step-display-xl)', lineHeight: '0.82' },
    l: { fontSize: 'var(--step-display-l)', lineHeight: '0.84' },
    m: { fontSize: 'var(--step-display-m)', lineHeight: '0.88' },
  }[size];

  return (
    <Component
      id={id}
      data-testid={testId}
      className={`display text-[var(--ink)] ${className}`}
      style={sizeStyles}
    >
      {children}
    </Component>
  );
};

/* ==========================================================================
   2. BODY COMPONENT: Outfit (300 / 400)
   ========================================================================== */
export interface BodyProps {
  as?: 'p' | 'span' | 'div';
  size?: 'default' | 'large';
  weight?: '300' | '400';
  children: React.ReactNode;
  className?: string;
}

export const Body: React.FC<BodyProps> = ({
  as: Component = 'p',
  size = 'default',
  weight = '300',
  children,
  className = '',
}) => {
  const sizeClass = size === 'large' ? 'text-[var(--step-body-l)]' : 'text-[var(--step-body)]';
  const weightClass = weight === '400' ? 'font-normal' : 'font-light';

  return (
    <Component
      className={`type-body ${sizeClass} ${weightClass} text-[var(--ink-muted)] leading-[1.45] max-w-[60ch] ${className}`}
    >
      {children}
    </Component>
  );
};

/* ==========================================================================
   3. LABEL COMPONENT: JetBrains Mono (400 / 500)
   ========================================================================== */
export interface LabelProps {
  as?: 'span' | 'div' | 'p' | 'label';
  variant?: 'default' | 'accent' | 'muted';
  children: React.ReactNode;
  className?: string;
}

export const Label: React.FC<LabelProps> = ({
  as: Component = 'span',
  variant = 'default',
  children,
  className = '',
}) => {
  const colorClass = {
    default: 'text-[var(--ink)]',
    accent: 'text-[var(--accent)] font-semibold',
    muted: 'text-[var(--ink-muted)]',
  }[variant];

  return (
    <Component className={`label ${colorClass} ${className}`}>
      {children}
    </Component>
  );
};

/* ==========================================================================
   4. CODE COMPONENT: Hardware Model Codes (VV—01) with Real Em Dash
   ========================================================================== */
export interface CodeProps {
  number: string | number; // e.g. "01" or "02"
  className?: string;
}

export const Code: React.FC<CodeProps> = ({ number, className = '' }) => {
  const formatted = typeof number === 'number' ? number.toString().padStart(2, '0') : number;
  return (
    <span className={`label tracking-wider font-bold select-none ${className}`}>
      VV—{formatted}
    </span>
  );
};

/* ==========================================================================
   5. LCD COMPONENT: DSEG7 Classic with Ghost Segment Background Layer
   ========================================================================== */
export interface LcdProps {
  value: string;
  ghost?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'amber' | 'green';
  ariaLabel?: string;
  className?: string;
}

export const Lcd: React.FC<LcdProps> = ({
  value,
  ghost,
  size = 'md',
  variant = 'amber',
  ariaLabel,
  className = '',
}) => {
  // Generate ghost 8s if not provided
  const ghostText = ghost || value.replace(/[0-9]/g, '8');

  const sizeClasses = {
    sm: 'text-base sm:text-lg px-2 py-0.5',
    md: 'text-2xl sm:text-3xl px-3 py-1',
    lg: 'text-4xl sm:text-5xl px-4 py-1.5',
    xl: 'text-6xl sm:text-7xl lg:text-8xl px-6 py-2',
  }[size];

  const colorClasses = {
    amber: {
      active: 'text-[#FF5A1F]',
      ghost: 'text-[#FF5A1F]/[0.08]',
      bg: 'bg-[#14120F] border-[#2A231A]',
    },
    green: {
      active: 'text-[#34D399]',
      ghost: 'text-[#34D399]/[0.08]',
      bg: 'bg-[#0E1510] border-[#182B1E]',
    },
  }[variant];

  return (
    <div
      className={`relative inline-flex items-center justify-center font-lcd select-none border rounded-[2px] shadow-[inset_0_2px_4px_rgba(0,0,0,0.8)] overflow-hidden ${sizeClasses} ${colorClasses.bg} ${className}`}
      aria-label={ariaLabel || value}
      role="img"
    >
      {/* Screen-reader accessible label */}
      <span className="sr-only">{ariaLabel || value}</span>

      {/* Aligned LCD character frame */}
      <div className="relative inline-flex items-center justify-center">
        {/* Layer 1: Unlit Ghost Segments (8s pattern) */}
        <span
          aria-hidden="true"
          className={`absolute inset-0 flex items-center justify-center pointer-events-none tabular-nums select-none ${colorClasses.ghost}`}
        >
          {ghostText}
        </span>

        {/* Layer 2: Active Illuminated Segments */}
        <span
          aria-hidden="true"
          className={`relative z-10 tabular-nums ${colorClasses.active}`}
        >
          {value}
        </span>
      </div>
    </div>
  );
};

/* ==========================================================================
   6. MASKLINE COMPONENT: Hardware Headline Mask Reveal
   ========================================================================== */
export interface MaskLineProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

export const MaskLine: React.FC<MaskLineProps> = ({
  children,
  delay = 0,
  className = '',
}) => {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <span className={`block ${className}`}>{children}</span>;
  }

  return (
    <span className={`block overflow-hidden ${className}`}>
      <motion.span
        className="block"
        initial={{ y: '105%' }}
        animate={{ y: 0 }}
        transition={{
          duration: 0.85,
          delay,
          ease: [0.16, 1, 0.3, 1], // ease-out-expo
        }}
      >
        {children}
      </motion.span>
    </span>
  );
};
