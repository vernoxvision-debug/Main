import React from 'react';
import { Unit } from '@/data/units';
import { Label, Code } from '@/components/ui/typography';

export interface SpecTableProps {
  unit: Unit;
  className?: string;
}

export const SpecTable: React.FC<SpecTableProps> = ({ unit, className = '' }) => {
  const specs = [
    { label: 'SYSTEM CODE', value: unit.code },
    { label: 'UNIT NAME', value: unit.name },
    { label: 'CLASSIFICATION', value: unit.kind === 'video' ? 'VIDEO ASSET VAULT' : 'STRATEGIC GUIDE BOOKLET' },
    { label: 'ASSET VOLUME', value: unit.count },
    { label: 'ASPECT RATIO', value: unit.orientation },
    { label: 'ENCODING / SPEC', value: unit.format },
    { label: 'DELIVERY PIPELINE', value: 'INSTANT GOOGLE DRIVE REPOSITORY LINK' },
    { label: 'USAGE RIGHTS', value: 'COMMERCIAL USE APPROVED (RESELLING RAW FILES FORBIDDEN)' },
    { label: 'OPTIMAL NLE', value: 'CAPCUT · PREMIERE PRO · DAVINCI RESOLVE · FINAL CUT' },
  ];

  return (
    <div
      className={`border border-[var(--line)] bg-[var(--bg)] divide-y divide-[var(--line)] ${className}`}
      data-testid="spec-table"
    >
      <div className="bg-[var(--line)]/20 px-4 py-2 flex items-center justify-between font-mono text-[11px] uppercase tracking-wider text-[var(--ink-muted)]">
        <span>TECHNICAL SPECIFICATION // {unit.code}</span>
        <span className="flex items-center gap-1.5 text-[var(--accent)]">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-pulse" />
          VERIFIED
        </span>
      </div>

      <div className="divide-y divide-[var(--line)]">
        {specs.map((spec) => (
          <div
            key={spec.label}
            className="grid grid-cols-1 md:grid-cols-3 px-4 py-3 text-xs gap-1 md:gap-4 hover:bg-[var(--line)]/10 transition-colors"
          >
            <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--ink-muted)] flex items-center">
              {spec.label}
            </span>
            <span className="font-mono text-xs md:col-span-2 text-[var(--ink)] font-medium break-words tabular-nums">
              {spec.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
