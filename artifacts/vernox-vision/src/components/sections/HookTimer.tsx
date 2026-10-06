import React, { useState, useEffect, useRef } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { Lcd } from '@/components/ui/typography';

export const HookTimer: React.FC = () => {
  const [seconds, setSeconds] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const prefersReducedMotion = useReducedMotion();
  const timerRef = useRef<number | null>(null);

  // 3 distinct cuts corresponding to retention pacing
  const cuts = [
    {
      time: '0.0s — 1.0s',
      label: 'CUT 01 // VISUAL HOOK',
      description: 'Disrupt the scroll immediately. Dynamic high-energy cutaway resets viewer focus.',
      tag: 'VV—01 VIRAL',
    },
    {
      time: '1.0s — 2.0s',
      label: 'CUT 02 // CURIOSITY DRIFT',
      description: 'Second frame transition. Prevents dopamine drop before the first spoken point.',
      tag: 'VV—02 / VV—04',
    },
    {
      time: '2.0s — 3.0s',
      label: 'CUT 03 // LOCK RETENTION',
      description: 'Algorithm threshold passed. Viewer commits to the full video duration.',
      tag: 'RETENTION LOCK',
    },
  ];

  const currentCutIndex = Math.min(Math.floor(seconds), 2);
  const currentCut = cuts[currentCutIndex];

  useEffect(() => {
    if (prefersReducedMotion) {
      setIsPlaying(false);
      return;
    }

    if (isPlaying) {
      const interval = 100; // tick every 100ms
      timerRef.current = window.setInterval(() => {
        setSeconds((prev) => {
          const next = prev + 0.1;
          return next >= 3.0 ? 0.0 : parseFloat(next.toFixed(1));
        });
      }, interval);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, prefersReducedMotion]);

  const togglePlay = () => {
    setIsPlaying((prev) => !prev);
  };

  return (
    <div
      className="border border-[var(--line-strong)] bg-[var(--bg)] p-4 sm:p-6 rounded-[2px] max-w-xl mx-auto shadow-sm"
      data-testid="hook-timer-component"
    >
      {/* Header bar */}
      <div className="flex items-center justify-between border-b border-[var(--line)] pb-3 mb-4">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#FF5A1F] animate-pulse" />
          <span className="font-mono text-xs uppercase tracking-widest text-[var(--ink)] font-bold">
            3-SECOND RETENTION SIMULATOR
          </span>
        </div>
        <button
          type="button"
          onClick={togglePlay}
          className="font-mono text-[10px] uppercase tracking-wider px-2.5 py-1 border border-[var(--line-strong)] hover:bg-[var(--line)] transition-colors cursor-pointer"
          data-testid="btn-hook-timer-toggle"
        >
          {isPlaying ? 'PAUSE [■]' : 'PLAY [▶]'}
        </button>
      </div>

      {/* Main Display: LCD Segmented Counter + Cut Info */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
        {/* LCD Counter Box */}
        <div className="bg-[#111315] border border-black/50 p-4 rounded-[2px] text-center shadow-inner flex flex-col items-center">
          <div className="font-mono text-[9px] uppercase tracking-widest text-[#777] mb-2">
            RETENTION TIMECODE
          </div>
          <div className="flex items-baseline justify-center gap-1.5" data-testid="hook-timer-display">
            <Lcd
              value={seconds.toFixed(1)}
              ghost="8.8"
              size="lg"
              variant="amber"
              ariaLabel={`${seconds.toFixed(1)} seconds`}
            />
            <span className="font-mono text-xs uppercase text-[#FF5A1F] font-bold">s</span>
          </div>
          <div className="mt-2 flex items-center justify-center gap-1.5">
            <span
              className={`h-1.5 flex-1 rounded-[1px] transition-colors ${
                currentCutIndex >= 0 ? 'bg-[#FF5A1F]' : 'bg-[#333]'
              }`}
            />
            <span
              className={`h-1.5 flex-1 rounded-[1px] transition-colors ${
                currentCutIndex >= 1 ? 'bg-[#FF5A1F]' : 'bg-[#333]'
              }`}
            />
            <span
              className={`h-1.5 flex-1 rounded-[1px] transition-colors ${
                currentCutIndex >= 2 ? 'bg-[#FF5A1F]' : 'bg-[#333]'
              }`}
            />
          </div>
        </div>

        {/* Current Cutaway Data */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] uppercase tracking-wider text-[#FF5A1F] font-bold">
              {currentCut.label}
            </span>
            <span className="font-mono text-[9px] bg-[var(--line)]/50 px-2 py-0.5 rounded-[1px] text-[var(--ink-muted)]">
              {currentCut.time}
            </span>
          </div>

          <p className="font-body text-xs text-[var(--ink)] leading-relaxed">
            {currentCut.description}
          </p>

          <div className="font-mono text-[9px] uppercase text-[var(--ink-muted)] pt-1">
            ASSET SOURCE: <span className="text-[var(--ink)] font-bold">{currentCut.tag}</span>
          </div>
        </div>
      </div>

      {/* Micro rule statement */}
      <div className="mt-4 pt-3 border-t border-[var(--line)] font-mono text-[9px] text-[var(--ink-muted)] flex items-center justify-between">
        <span>PACING PRINCIPLE: CUT EVERY ~1-2 SECONDS</span>
        <span>NO TIMELINE STAGNATION</span>
      </div>
    </div>
  );
};
