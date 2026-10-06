import { useEffect, useState, useCallback } from 'react';

export type StageMode = 'light' | 'dark';

const STORAGE_KEY = 'vv_stage_mode';

export function useStageMode() {
  const [stageMode, setStageMode] = useState<StageMode>(() => {
    if (typeof window === 'undefined') return 'dark';
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === 'light' || stored === 'dark') return stored;
    } catch {
      // ignore localStorage errors in privacy mode
    }
    return 'dark';
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
