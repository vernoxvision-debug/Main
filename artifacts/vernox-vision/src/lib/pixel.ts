export type PixelEvent = 'PageView' | 'ViewContent' | 'InitiateCheckout' | 'Purchase';

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    _fbq?: unknown;
  }
}

export function trackPixel(event: PixelEvent, params?: Record<string, unknown>) {
  if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
    try {
      window.fbq('track', event, params);
    } catch {
      // silently handle ad blocker prevention
    }
  }
}
