import { useEffect, useState, useCallback } from 'react';

export type StageMode = 'light' | 'dark';

const STORAGE_KEY = 'vv_stage_mode';

export function useStageMode() {
  const [stageMode, setStageMode] = useState<StageMode>(() => {
    if (typeof window === 'undefined') return 'light';
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === 'dark' || stored === 'light') return stored;
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
      }
    } catch {
      // ignore localStorage errors in privacy mode
    }
    return 'light';
  });

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-stage-mode', stageMode);
    try {
      localStorage.setItem(STORAGE_KEY, stageMode);
    } catch {
      // ignore
    }
  }, [stageMode]);

  const toggleStageMode = useCallback(() => {
    setStageMode((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return {
    stageMode,
    isDark: stageMode === 'dark',
    toggleStageMode,
    setStageMode,
  };
}
