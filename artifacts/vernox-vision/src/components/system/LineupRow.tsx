import React, { useState, useRef, useEffect, useCallback } from 'react';
import { UNITS, Unit } from '@/data/units';
import { UnitFaceplate } from './UnitFaceplate';
import { useLocation } from 'wouter';

export interface LineupRowProps {
  className?: string;
}

export const LineupRow: React.FC<LineupRowProps> = ({ className = '' }) => {
  const [, setLocation] = useLocation();
  const [hoveredUnit, setHoveredUnit] = useState<Unit | null>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [canScrollLeft, setCanScrollLeft] = useState<boolean>(false);
  const [canScrollRight, setCanScrollRight] = useState<boolean>(true);

  const containerRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef<boolean>(false);
  const startXRef = useRef<number>(0);
  const scrollLeftRef = useRef<number>(0);
  const hasMovedRef = useRef<boolean>(false);

  // Update scroll bounds and active unit indicator
  const updateScrollState = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;

    const maxScroll = el.scrollWidth - el.clientWidth;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < maxScroll - 10);

    if (maxScroll > 0) {
      setScrollProgress(Math.min(1, Math.max(0, el.scrollLeft / maxScroll)));
      const approxIndex = Math.round((el.scrollLeft / maxScroll) * (UNITS.length - 1));
      setActiveIndex(Math.min(UNITS.length - 1, Math.max(0, approxIndex)));
    }
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    updateScrollState();
    el.addEventListener('scroll', updateScrollState, { passive: true });
    window.addEventListener('resize', updateScrollState);

    return () => {
      el.removeEventListener('scroll', updateScrollState);
      window.removeEventListener('resize', updateScrollState);
    };
  }, [updateScrollState]);

  // Smooth scroll navigation
  const slideBy = (offset: number) => {
    const el = containerRef.current;
    if (!el) return;
    el.scrollBy({ left: offset, behavior: 'smooth' });
  };

  const slideToUnit = (index: number) => {
    const el = containerRef.current;
    if (!el) return;
    const unitElements = el.querySelectorAll('[data-unit-index]');
    const target = unitElements[index] as HTMLElement | undefined;
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      setActiveIndex(index);
    }
  };

  const handleUnitClick = (unit: Unit) => {
    if (hasMovedRef.current) return; // Prevent click navigation if dragging
    setLocation(`/vault/${unit.slug}`);
  };

  // Mouse Drag to slide
  const handleMouseDown = (e: React.MouseEvent) => {
    const el = containerRef.current;
    if (!el) return;
    isDraggingRef.current = true;
    hasMovedRef.current = false;
    startXRef.current = e.pageX - el.offsetLeft;
    scrollLeftRef.current = el.scrollLeft;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current) return;
    const el = containerRef.current;
    if (!el) return;
    e.preventDefault();
    const x = e.pageX - el.offsetLeft;
    const walk = (x - startXRef.current) * 1.4;
    if (Math.abs(walk) > 4) {
      hasMovedRef.current = true;
    }
    el.scrollLeft = scrollLeftRef.current - walk;
  };

  const handleMouseUpOrLeave = () => {
    isDraggingRef.current = false;
  };

  // Horizontal wheel translate
  const handleWheel = (e: React.WheelEvent) => {
    const el = containerRef.current;
    if (!el) return;
    if (Math.abs(e.deltaY) > Math.abs(e.deltaX) && Math.abs(e.deltaY) > 20) {
      const maxScroll = el.scrollWidth - el.clientWidth;
      if ((e.deltaY > 0 && el.scrollLeft < maxScroll) || (e.deltaY < 0 && el.scrollLeft > 0)) {
        el.scrollLeft += e.deltaY * 0.8;
      }
    }
  };

  return (
    <div className={`relative w-full ${className}`} data-testid="system-lineup-row">
      {/* Spec Tooltip & Tactical Slide Controls Bar */}
      <div className="min-h-10 mb-4 py-1.5 flex flex-wrap items-center justify-between gap-3 font-mono text-xs px-2 border-b border-[var(--line)]">
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

        {/* Slide Controls & Unit Step Selector */}
        <div className="flex items-center gap-3">
          {/* 7 Unit Jump Selector Pips */}
          <div className="hidden md:flex items-center gap-1 bg-[var(--line)]/30 p-0.5 rounded-[2px] border border-[var(--line)]">
            {UNITS.map((u, i) => (
              <button
                key={u.id}
                type="button"
                onClick={() => slideToUnit(i)}
                className={`px-1.5 py-0.5 font-mono text-[9px] rounded-[1px] transition-all cursor-pointer ${
                  activeIndex === i
                    ? 'bg-[#FF5A1F] text-black font-bold'
                    : 'text-[var(--ink-muted)] hover:text-[var(--ink)]'
                }`}
                title={`Jump to ${u.code}: ${u.name}`}
                aria-label={`Jump to unit ${u.code}`}
              >
                0{i + 1}
              </button>
            ))}
          </div>

          {/* Tactical Slide Prev / Next Arrows */}
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => slideBy(-320)}
              disabled={!canScrollLeft}
              className={`h-7 px-2.5 font-mono text-[10px] uppercase tracking-wider rounded-[2px] border transition-all flex items-center gap-1 cursor-pointer ${
                canScrollLeft
                  ? 'border-[var(--line-strong)] text-[var(--ink)] bg-[var(--bg)] hover:bg-[#FF5A1F] hover:text-black hover:border-[#FF5A1F]'
                  : 'border-[var(--line)] text-[var(--ink-muted)] opacity-40 cursor-not-allowed'
              }`}
              aria-label="Slide lineup left"
            >
              <span>◄</span>
              <span className="hidden sm:inline">PREV</span>
            </button>

            <button
              type="button"
              onClick={() => slideBy(320)}
              disabled={!canScrollRight}
              className={`h-7 px-2.5 font-mono text-[10px] uppercase tracking-wider rounded-[2px] border transition-all flex items-center gap-1 cursor-pointer ${
                canScrollRight
                  ? 'border-[var(--line-strong)] text-[var(--ink)] bg-[var(--bg)] hover:bg-[#FF5A1F] hover:text-black hover:border-[#FF5A1F]'
                  : 'border-[var(--line)] text-[var(--ink-muted)] opacity-40 cursor-not-allowed'
              }`}
              aria-label="Slide lineup right"
            >
              <span className="hidden sm:inline">NEXT</span>
              <span>►</span>
            </button>
          </div>
        </div>
      </div>

      {/* Floating Left Slide Button on Desktop */}
      {canScrollLeft && (
        <button
          type="button"
          onClick={() => slideBy(-320)}
          className="hidden md:flex absolute left-2 top-[55%] -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/85 text-white border border-white/20 items-center justify-center hover:bg-[#FF5A1F] hover:text-black transition-all shadow-xl cursor-pointer"
          aria-label="Scroll left"
        >
          ◄
        </button>
      )}

      {/* Floating Right Slide Button on Desktop */}
      {canScrollRight && (
        <button
          type="button"
          onClick={() => slideBy(320)}
          className="hidden md:flex absolute right-2 top-[55%] -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/85 text-white border border-white/20 items-center justify-center hover:bg-[#FF5A1F] hover:text-black transition-all shadow-xl cursor-pointer"
          aria-label="Scroll right"
        >
          ►
        </button>
      )}

      {/* Lineup Container: Slideable with mouse drag, touch swipe & smooth wheel */}
      <div
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUpOrLeave}
        onMouseLeave={handleMouseUpOrLeave}
        onWheel={handleWheel}
        className="relative overflow-x-auto scroll-smooth snap-x snap-mandatory touch-pan-x cursor-grab active:cursor-grabbing pb-6 pt-2 select-none"
        style={{ scrollbarWidth: 'thin' }}
      >
        <div className="flex items-end justify-start gap-4 sm:gap-6 min-w-max px-4 sm:px-8">
          {UNITS.map((unit, index) => (
            <div
              key={unit.id}
              data-unit-index={index}
              className="group flex flex-col items-center snap-center"
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

      {/* Hardware Scrub Indicator Track at Bottom */}
      <div className="mt-2 mb-3 px-2">
        <div className="w-full h-1 bg-[var(--line)]/50 rounded-full overflow-hidden relative">
          <div
            className="h-full bg-[#FF5A1F] transition-all duration-150 rounded-full"
            style={{
              width: `${100 / UNITS.length}%`,
              transform: `translateX(${scrollProgress * (UNITS.length - 1) * 100}%)`,
            }}
          />
        </div>
      </div>

      {/* Bottom status caption TE-style */}
      <div className="flex items-center justify-between font-mono text-[10px] text-[var(--ink-muted)] px-2">
        <span className="tracking-widest uppercase">the vv vault // precision library</span>
        <span className="text-[9px] flex items-center gap-1.5">
          <span className="text-[var(--accent)]">●</span>
          DRAG OR CLICK ARROWS TO SLIDE (01 — 07) →
        </span>
      </div>
    </div>
  );
};
