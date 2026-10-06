export const SITE_CONFIG = {
  name: 'Vernox Vision',
  domain: 'vernoxvision.com',
  url: 'https://vernoxvision.com',
  gumroadUrl: 'https://vernoxvision.gumroad.com/l/vernoxvision',
  price: 9.99,
  priceDisplay: '$9.99',
  currency: 'USD',
  paymentModel: 'one-time · lifetime access · no subscription',
  totalClips: '15,000+',
  totalVideoBundles: 4,
  totalGuides: 3,
  deliveryMethod: 'Instant Google Drive vault link via Gumroad confirmation email',
  licenseSummary: 'Commercial usage rights included. Reselling raw files prohibited.',
  supportEmail: 'support@vernoxvision.com',
  metaPixelId: typeof window !== 'undefined' && (window as unknown as { VITE_META_PIXEL_ID?: string }).VITE_META_PIXEL_ID
    ? (window as unknown as { VITE_META_PIXEL_ID?: string }).VITE_META_PIXEL_ID
    : '',
} as const;
