import React, { useState } from 'react';
import { UNITS, Unit } from '@/data/units';
import { UnitFaceplate } from './UnitFaceplate';
import { useLocation } from 'wouter';

export interface LineupRowProps {
  className?: string;
}

export const LineupRow: React.FC<LineupRowProps> = ({ className = '' }) => {
  const [, setLocation] = useLocation();
  const [hoveredUnit, setHoveredUnit] = useState<Unit | null>(null);

  const handleUnitClick = (unit: Unit) => {
    setLocation(`/vault/${unit.slug}`);
  };

  return (
    <div className={`relative w-full ${className}`} data-testid="system-lineup-row">
      {/* Spec Tooltip Bar on Desktop */}
      <div className="h-9 mb-4 flex items-center justify-between font-mono text-xs px-2 border-b border-[var(--line)]">
        <div className="flex items-center gap-3">
          <span className="text-[var(--accent)] font-bold">SYSTEM // 07 UNITS</span>
          {hoveredUnit ? (
            <span className="text-[var(--ink)] animate-fadeIn">
              {hoveredUnit.code} · {hoveredUnit.name} ·{' '}
              <span className="text-[var(--accent)] font-bold">{hoveredUnit.count}</span>
            </span>
          ) : (
            <span className="text-[var(--ink-muted)]">
              SELECT ANY HARDWARE UNIT TO INSPECT SPECS
            </span>
          )}
        </div>
        <div className="hidden sm:flex items-center gap-2 text-[var(--ink-muted)] text-[10px]">
          <span>HORIZONTAL ARRAY</span>
          <span>●</span>
          <span>9:16 VERTICAL ENGINE</span>
        </div>
      </div>

      {/* Lineup Container: Desktop flex row, Mobile snap-scroll */}
      <div className="relative overflow-x-auto no-scrollbar pb-6 pt-2">
        <div className="flex items-end justify-start md:justify-center gap-4 sm:gap-6 min-w-max px-4">
          {UNITS.map((unit) => (
            <div
              key={unit.id}
              className="group flex flex-col items-center"
              onMouseEnter={() => setHoveredUnit(unit)}
              onMouseLeave={() => setHoveredUnit(null)}
            >
              <UnitFaceplate
                unit={unit}
                isCompact={false}
                interactive={true}
                showReflection={true}
                onClick={() => handleUnitClick(unit)}
              />
              {/* Unit Model Label Below */}
              <div className="mt-2 text-center">
                <span className="font-mono text-[11px] font-bold text-[var(--ink)] group-hover:text-[var(--accent)] transition-colors">
                  {unit.code}
                </span>
                <div className="font-mono text-[9px] text-[var(--ink-muted)]">
                  {unit.count}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom left caption TE-style */}
      <div className="mt-3 flex items-center justify-between font-mono text-[10px] text-[var(--ink-muted)] px-2">
        <span className="tracking-widest uppercase">the vv vault // precision library</span>
        <span className="text-[9px]">SCROLL HORIZONTALLY ON MOBILE →</span>
      </div>
    </div>
  );
};
