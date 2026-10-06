export interface PreviewConfig {
  poster: string;
  videoSrc?: string;
  aspectRatio: string;
  theme: 'dark' | 'light' | 'graphite' | 'olive';
  label: string;
}

export const PREVIEWS: Record<string, PreviewConfig> = {
  viral: {
    poster: '/previews/vv-01-poster.svg',
    aspectRatio: '9/16',
    theme: 'dark',
    label: 'VV—01 // 9:16 HIGH-ENERGY HOOKS',
  },
  speaker: {
    poster: '/previews/vv-02-poster.svg',
    aspectRatio: '9/16',
    theme: 'light',
    label: 'VV—02 // 9:16 KEYNOTE & WISDOM',
  },
  luxury: {
    poster: '/previews/vv-03-poster.svg',
    aspectRatio: '9/16',
    theme: 'graphite',
    label: 'VV—03 // 9:16 LIFESTYLE AESTHETICS',
  },
  vlog: {
    poster: '/previews/vv-04-poster.svg',
    aspectRatio: '9/16',
    theme: 'olive',
    label: 'VV—04 // 9:16 CANDID HUMAN B-ROLL',
  },
  calendar: {
    poster: '/previews/vv-05-poster.svg',
    aspectRatio: '4/5',
    theme: 'light',
    label: 'VV—05 // 30-DAY SYSTEM BLUEPRINT',
  },
  caption: {
    poster: '/previews/vv-06-poster.svg',
    aspectRatio: '4/5',
    theme: 'dark',
    label: 'VV—06 // RETENTION HOOK CHEAT SHEET',
  },
  onboarding: {
    poster: '/previews/vv-00-poster.svg',
    aspectRatio: '4/5',
    theme: 'light',
    label: 'VV—00 // SETUP & WORKFLOW SPEC',
  },
};
