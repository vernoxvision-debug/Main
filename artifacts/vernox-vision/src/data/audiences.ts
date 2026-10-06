export interface Audience {
  index: string;
  title: string;
  subtitle: string;
  description: string;
  bundleCodes: string[];
}

export const AUDIENCES: Audience[] = [
  {
    index: '01',
    title: 'Faceless Theme-Page Operators',
    subtitle: 'Luxury, motivation, wealth, and lifestyle niches',
    description:
      'Curate daily high-retention feeds without showing your face or filming personal b-roll. Drop verified visuals straight behind audio tracks.',
    bundleCodes: ['VV—01', 'VV—02', 'VV—03', 'VV—06'],
  },
  {
    index: '02',
    title: 'Short-Form Video Editors & Freelancers',
    subtitle: 'Upwork, Fiverr, and agency client pipelines',
    description:
      'Slash delivery turnaround from days to hours. Pull relevant b-roll, podcast cutaways, and motion plates without expensive stock subscriptions.',
    bundleCodes: ['VV—01', 'VV—04', 'VV—00'],
  },
  {
    index: '03',
    title: 'YouTubers & Solo Creators',
    subtitle: 'Long-form commentary and 3-5 second cutaway pacing',
    description:
      'Keep viewer drop-off low. Inject fresh visual cutaways every 3–5 seconds to reset viewer attention and maintain high playback graphs.',
    bundleCodes: ['VV—01', 'VV—02', 'VV—04'],
  },
  {
    index: '04',
    title: 'Performance Marketers & UGC Creators',
    subtitle: 'Meta, TikTok, and YouTube video ad hooks',
    description:
      'Rapidly test 20+ opening hook variations per ad creative. Swap 3-second visual triggers to drive lower cost-per-click across paid campaigns.',
    bundleCodes: ['VV—01', 'VV—05', 'VV—06'],
  },
];
