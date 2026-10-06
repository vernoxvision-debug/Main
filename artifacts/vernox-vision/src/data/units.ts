export interface Unit {
  id: string;
  code: string;
  slug: string;
  name: string;
  count: string;
  countNum: number;
  kind: 'video' | 'guide';
  orientation: string;
  format: string;
  description: string;
  tagline: string;
  useCases: string[];
  bestFor: string[];
  colorway: 'graphite' | 'cream' | 'olive' | 'blue' | 'red' | 'slate' | 'sand';
  chassisHex: string;
  accentHex: string;
  ledState: 'active' | 'standby';
  previewKey: string;
  order: number;
}

export const UNITS: Unit[] = [
  {
    id: 'vv-01',
    code: 'VV—01',
    slug: 'viral',
    name: 'Viral TikTok & Social Clips',
    count: '5,000+ clips',
    countNum: 5000,
    kind: 'video',
    orientation: '9:16 Vertical',
    format: 'MP4 / H.264 · 1080p · High Bitrate',
    description: 'High-energy hooks, rapid cutaways, and dynamic trending visuals built specifically for TikTok, Instagram Reels, and YouTube Shorts pacing.',
    tagline: 'High-energy cutaways for short-form retention spikes.',
    useCases: [
      '3-second opening hook drops',
      'Fast B-roll cuts between talking-head points',
      'High-velocity pacing for trending TikTok audio',
      'Motion backgrounds behind kinetic typography',
    ],
    bestFor: [
      'Faceless theme-page operators',
      'Short-form video editors',
      'Performance ad creators',
    ],
    colorway: 'graphite',
    chassisHex: '#1E1F21',
    accentHex: '#FF5A1F',
    ledState: 'active',
    previewKey: 'viral',
    order: 1,
  },
  {
    id: 'vv-02',
    code: 'VV—02',
    slug: 'speaker',
    name: 'Speaker & Motivation Vault',
    count: '3,100+ clips',
    countNum: 3100,
    kind: 'video',
    orientation: '9:16 Vertical',
    format: 'MP4 / H.264 · 1080p · High Bitrate',
    description: 'Podcast snippets, keynote moments, cinematic wisdom, and mindset soundbites curated for quote pages, discipline edits, and authority building.',
    tagline: 'Cinematic keynote and podcast frames with visceral weight.',
    useCases: [
      'Motivational reels with bold captions',
      'Discipline and finance quote reels',
      'Podcast highlight cutaways',
      'Authority hooks on business and focus',
    ],
    bestFor: [
      'Motivation and mindset curators',
      'Authority brand builders',
      'Faceless wealth pages',
    ],
    colorway: 'cream',
    chassisHex: '#ECE7DF',
    accentHex: '#FF5A1F',
    ledState: 'active',
    previewKey: 'speaker',
    order: 2,
  },
  {
    id: 'vv-03',
    code: 'VV—03',
    slug: 'luxury',
    name: 'Luxury Posts & Lifestyle',
    count: '3,000+ clips',
    countNum: 3000,
    kind: 'video',
    orientation: '9:16 Vertical',
    format: 'MP4 / H.264 · 1080p · High Bitrate',
    description: 'Hypercars, penthouses, private aviation, luxury horology, and high-end travel aesthetics tailored for wealth and finance editorial formats.',
    tagline: 'High-end automotive, architecture, and luxury travel frames.',
    useCases: [
      'Wealth and finance niche visual backing',
      'E-commerce aspiration hooks',
      'Aesthetic lifestyle mood edits',
      'High-ticket coaching B-roll',
    ],
    bestFor: [
      'Luxury and finance page operators',
      'E-commerce brand media buyers',
      'Lifestyle creators',
    ],
    colorway: 'olive',
    chassisHex: '#3A3F35',
    accentHex: '#FF5A1F',
    ledState: 'active',
    previewKey: 'luxury',
    order: 3,
  },
  {
    id: 'vv-04',
    code: 'VV—04',
    slug: 'vlog',
    name: 'Rich Vlogs & Omegle Series',
    count: '2,500+ clips',
    countNum: 2500,
    kind: 'video',
    orientation: '9:16 Vertical',
    format: 'MP4 / H.264 · 1080p · High Bitrate',
    description: 'Candid street reactions, real-world interactions, and genuine conversational vlog footage designed for commentary, reaction, and narrative pacing.',
    tagline: 'Candid street footage and human reactions for conversational hooks.',
    useCases: [
      'Commentary and storytelling context cuts',
      'Reaction hooks that build curiosity',
      'Relatable everyday scene transitions',
      'Authentic human interaction overlays',
    ],
    bestFor: [
      'YouTubers and commentary channels',
      'Freelance editors needing human B-roll',
      'UGC marketers',
    ],
    colorway: 'blue',
    chassisHex: '#3D4952',
    accentHex: '#FF5A1F',
    ledState: 'active',
    previewKey: 'vlog',
    order: 4,
  },
  {
    id: 'vv-05',
    code: 'VV—05',
    slug: 'calendar',
    name: '30-Day Content Calendar',
    count: 'PDF Guide',
    countNum: 30,
    kind: 'guide',
    orientation: 'Standard Document',
    format: 'Digital PDF Guide · Print-Ready Vector',
    description: 'Daily posting schedule, structured content pillars, optimal release timings, and strategic topic frameworks so you never face timeline inertia.',
    tagline: 'Systematic daily publishing blueprint with repeatable pillars.',
    useCases: [
      'Eliminate daily posting hesitation',
      'Structure balanced content pillars',
      'Maintain 30-day streak consistency',
      'Align format types to peak retention slots',
    ],
    bestFor: [
      'Solo creators struggling with consistency',
      'Agency social media managers',
      'Growth sprint coordinators',
    ],
    colorway: 'red',
    chassisHex: '#8C2B22',
    accentHex: '#FF5A1F',
    ledState: 'standby',
    previewKey: 'calendar',
    order: 5,
  },
  {
    id: 'vv-06',
    code: 'VV—06',
    slug: 'caption',
    name: 'Caption Vault & Growth Cheat Codes',
    count: 'PDF Guide',
    countNum: 50,
    kind: 'guide',
    orientation: 'Standard Document',
    format: 'Digital PDF Guide · Copy-Paste Templates',
    description: 'Battle-tested caption templates, 3-second hook formulas, call-to-action scripts, and algorithmic growth patterns for organic reach.',
    tagline: 'Tested retention formulas and ready-to-deploy text scaffolds.',
    useCases: [
      'Fill in hook templates in seconds',
      'Craft comment-provoking captions',
      'Optimize watch time through loop cues',
      'Standardize high-converting CTA structure',
    ],
    bestFor: [
      'Faceless page operators',
      'UGC scriptwriters',
      'Growth-focused editors',
    ],
    colorway: 'slate',
    chassisHex: '#2A2D34',
    accentHex: '#FF5A1F',
    ledState: 'standby',
    previewKey: 'caption',
    order: 6,
  },
  {
    id: 'vv-00',
    code: 'VV—00',
    slug: 'onboarding',
    name: 'Onboarding & Quick-Start Guide',
    count: 'PDF Guide',
    countNum: 1,
    kind: 'guide',
    orientation: 'Standard Document',
    format: 'Digital PDF Guide · Fast Architecture',
    description: 'The mandatory START HERE manual. Explains folder organization, recommended editing workflows, Google Drive shortcuts, and rapid timeline assembly.',
    tagline: 'Zero-friction system setup and file management protocols.',
    useCases: [
      'Fast Google Drive folder mapping',
      'Keyboard shortcut workflows for CapCut and Premiere',
      'Asset organization best practices',
      'Instant timeline assembly guide',
    ],
    bestFor: [
      'Every new vault owner',
      'Editors wanting speed optimization',
    ],
    colorway: 'sand',
    chassisHex: '#524F49',
    accentHex: '#FF5A1F',
    ledState: 'standby',
    previewKey: 'onboarding',
    order: 7,
  },
];

export const VIDEO_UNITS = UNITS.filter((u) => u.kind === 'video');
export const GUIDE_UNITS = UNITS.filter((u) => u.kind === 'guide');

export function getUnitBySlug(slug: string): Unit | undefined {
  return UNITS.find((u) => u.slug === slug || u.code.toLowerCase().replace('—', '-') === slug);
}
