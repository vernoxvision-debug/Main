import React from 'react';
import { UNITS } from '@/data/units';
import { BrandLogo } from '@/components/illustration/Pictograms';

export interface VaultBadgeProps {
  className?: string;
}

export const VaultBadge: React.FC<VaultBadgeProps> = ({ className = '' }) => {
  // Grab the 4 video bundles
  const videoBundles = UNITS.filter((u) => u.kind === 'video');

  return (
    <div
      className={`relative w-[210px] sm:w-[230px] shrink-0 border border-[var(--ink)] bg-[var(--bg)] p-3 shadow-sm select-none ${className}`}
      data-testid="vault-update-badge"
    >
      {/* Two binder rings at the top */}
      <div className="absolute -top-3 left-6 w-3 h-3.5 rounded-full border-2 border-[var(--ink)] bg-[var(--bg)] shadow-sm" />
      <div className="absolute -top-3 right-6 w-3 h-3.5 rounded-full border-2 border-[var(--ink)] bg-[var(--bg)] shadow-sm" />

      {/* Header title */}
      <div className="pt-1 pb-2 flex items-center justify-between">
        <div>
          <div className="font-mono text-[9px] uppercase tracking-widest text-[var(--ink-muted)]">
            SYSTEM IDENT
          </div>
          <div className="type-display text-sm sm:text-base leading-tight tracking-tight text-[var(--ink)]">
            VV SERIES<br />VAULT
          </div>
        </div>
        <BrandLogo className="h-10 w-auto shrink-0" />
      </div>

      {/* Orange filled strip with folded corner */}
      <div className="relative bg-[#FF5A1F] text-black px-2 py-0.5 my-2 flex items-center justify-between font-mono font-bold text-[10px] tracking-widest uppercase">
        <span>UPDATE // V2.0</span>
        <span className="text-[9px] font-black">15K+</span>
        {/* Folded corner triangular cut */}
        <div
          className="absolute -top-1 -right-1 w-2 h-2 bg-[var(--bg)] border-b border-l border-[var(--ink)] transform rotate-45"
          aria-hidden="true"
        />
      </div>

      {/* Mini list of model codes and counts with underlined rows */}
      <div className="mt-2 divide-y divide-[var(--line)]">
        {videoBundles.map((unit) => (
          <div
            key={unit.id}
            className="flex items-center justify-between py-1 font-mono text-[10px] text-[var(--ink)]"
          >
            <span className="font-semibold tracking-wider">{unit.code}</span>
            <span className="text-[#FF5A1F] font-bold tracking-tight">
              {unit.count.replace(' clips', '')}
            </span>
          </div>
        ))}
      </div>

      {/* Micro-label footer */}
      <div className="mt-2 pt-1.5 border-t border-[var(--ink)] flex items-center justify-between font-mono text-[8px] uppercase tracking-widest text-[var(--ink-muted)]">
        <span>FORMAT: 9:16</span>
        <span>DELIVERY: DRIVE</span>
      </div>
    </div>
  );
};
