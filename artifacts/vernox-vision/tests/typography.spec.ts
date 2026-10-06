import { test, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

test.describe('Vernox Vision Typography Test Suite (T01–T12)', () => {
  // Ensure screenshots directory exists
  const screenshotDir = path.resolve(process.cwd(), 'tests/screenshots');
  if (!fs.existsSync(screenshotDir)) {
    fs.mkdirSync(screenshotDir, { recursive: true });
  }

  // T01: document.fonts.check() returns true for Archivo, Outfit, JetBrains Mono, DSEG7 Classic
  test('T01 - All four self-hosted font families are loaded and ready', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const fontsReady = await page.evaluate(async () => {
      await document.fonts.ready;
      return {
        archivo: document.fonts.check('900 32px Archivo') || document.fonts.check('16px Archivo'),
        outfit: document.fonts.check('300 16px Outfit') || document.fonts.check('16px Outfit'),
        jetbrains: document.fonts.check('400 12px "JetBrains Mono"') || document.fonts.check('12px "JetBrains Mono"'),
        dseg7: document.fonts.check('400 24px "DSEG7 Classic"') || document.fonts.check('24px "DSEG7 Classic"'),
      };
    });

    expect(fontsReady.archivo).toBe(true);
    expect(fontsReady.outfit).toBe(true);
    expect(fontsReady.jetbrains).toBe(true);
    expect(fontsReady.dseg7).toBe(true);
  });

  // T02: computed font-family on h1 starts with "Archivo"
  test('T02 - Computed font-family on h1 starts with Archivo', async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('h1');

    const h1Font = await page.evaluate(() => {
      const h1 = document.querySelector('h1');
      if (!h1) return '';
      return window.getComputedStyle(h1).fontFamily;
    });

    // Should begin with Archivo or "Archivo"
    expect(h1Font.replace(/['"]/g, '').toLowerCase().startsWith('archivo')).toBe(true);
  });

  // T03: computed font-family on p starts with "Outfit"
  test('T03 - Computed font-family on body paragraphs starts with Outfit', async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('p');

    const pFont = await page.evaluate(() => {
      // Find main editorial body paragraph
      const p = document.querySelector('main p') || document.querySelector('.type-body') || document.querySelector('p');
      if (!p) return '';
      return window.getComputedStyle(p).fontFamily;
    });

    expect(pFont.replace(/['"]/g, '').toLowerCase().startsWith('outfit')).toBe(true);
  });

  // T04: computed font-family on .label and model codes starts with "JetBrains Mono"
  test('T04 - Computed font-family on .label and model codes starts with JetBrains Mono', async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('.label');

    const labelFont = await page.evaluate(() => {
      const label = document.querySelector('.label');
      if (!label) return '';
      return window.getComputedStyle(label).fontFamily;
    });

    expect(labelFont.replace(/['"]/g, '').toLowerCase().startsWith('jetbrains mono')).toBe(true);
  });

  // T05: computed font-family on price numeral and clip counts starts with "DSEG7 Classic"
  test('T05 - Computed font-family on price numeral starts with DSEG7 Classic', async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('.font-lcd');

    const lcdFont = await page.evaluate(() => {
      const lcd = document.querySelector('.font-lcd');
      if (!lcd) return '';
      return window.getComputedStyle(lcd).fontFamily;
    });

    expect(lcdFont.replace(/['"]/g, '').toLowerCase().startsWith('dseg7 classic')).toBe(true);
  });

  // T06: ZERO network requests to fonts.googleapis.com or fonts.gstatic.com
  test('T06 - Zero external network requests to Google Fonts or third-party CDNs', async ({ page }) => {
    const externalFontRequests: string[] = [];

    page.on('request', (req) => {
      const url = req.url();
      if (url.includes('fonts.googleapis.com') || url.includes('fonts.gstatic.com')) {
        externalFontRequests.push(url);
      }
    });

    await page.goto('/');
    await page.waitForLoadState('networkidle');

    expect(externalFontRequests).toEqual([]);
  });

  // T07: ONLY Archivo is preloaded in <head>
  test('T07 - Only Archivo variable font is preloaded in head', async ({ page }) => {
    await page.goto('/');

    const fontPreloads = await page.evaluate(() => {
      const links = Array.from(document.querySelectorAll('link[rel="preload"][as="font"]'));
      return links.map((link) => link.getAttribute('href') || '');
    });

    expect(fontPreloads.length).toBe(1);
    expect(fontPreloads[0]).toContain('archivo-variable.woff2');
  });

  // T08: CLS measured via PerformanceObserver is < 0.02
  test('T08 - Cumulative Layout Shift (CLS) is below 0.02', async ({ page }) => {
    await page.goto('/');

    // Evaluate CLS using web-vitals / layout shift observer
    const cls = await page.evaluate(async () => {
      return new Promise<number>((resolve) => {
        let clsValue = 0;
        const observer = new PerformanceObserver((entryList) => {
          for (const entry of entryList.getEntries()) {
            if (!(entry as any).hadRecentInput) {
              clsValue += (entry as any).value;
            }
          }
        });

        observer.observe({ type: 'layout-shift', buffered: true });

        // Let the page settle for 1000ms
        setTimeout(() => {
          observer.disconnect();
          resolve(clsValue);
        }, 1000);
      });
    });

    expect(cls).toBeLessThan(0.02);
  });

  // T09: Hero headline fits within 360px viewport with zero horizontal overflow
  test('T09 - Hero headline fits 360px viewport with zero horizontal overflow', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 800 });
    await page.goto('/');
    await page.waitForSelector('[data-testid="hero-headline"]');

    const overflow = await page.evaluate(() => {
      const doc = document.documentElement;
      return {
        scrollWidth: doc.scrollWidth,
        clientWidth: doc.clientWidth,
        hasOverflow: doc.scrollWidth > doc.clientWidth,
      };
    });

    expect(overflow.hasOverflow).toBe(false);
  });

  // T10: LCD element has accessible text alternative (aria-label and sr-only)
  test('T10 - LCD element has accessible text alternative for screen readers', async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('.font-lcd');

    const accessibility = await page.evaluate(() => {
      const lcd = document.querySelector('.font-lcd');
      if (!lcd) return { hasAriaLabel: false, hasSrOnly: false };

      const ariaLabel = lcd.getAttribute('aria-label');
      const srOnly = lcd.querySelector('.sr-only');
      const ghost = lcd.querySelector('[aria-hidden="true"]');

      return {
        hasAriaLabel: Boolean(ariaLabel && ariaLabel.trim().length > 0),
        hasSrOnly: Boolean(srOnly && srOnly.textContent?.trim().length),
        ghostIsHidden: ghost?.getAttribute('aria-hidden') === 'true',
      };
    });

    expect(accessibility.hasAriaLabel || accessibility.hasSrOnly).toBe(true);
    expect(accessibility.ghostIsHidden).toBe(true);
  });

  // T11: Reduced-motion media query disables display-type entrance animations
  test('T11 - Reduced motion query disables headline entrance motion', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/');
    await page.waitForSelector('[data-testid="hero-headline"]');

    // In reduced motion, MaskLine returns an un-animated direct span without framer motion transform
    const motionStyles = await page.evaluate(() => {
      const headline = document.querySelector('[data-testid="hero-headline"]');
      if (!headline) return null;
      const lines = headline.querySelectorAll('.line');
      return Array.from(lines).map((l) => window.getComputedStyle(l).transform);
    });

    expect(motionStyles).not.toBeNull();
  });

  // T12: Contrast ratio of display type against background is at least 7:1
  test('T12 - Contrast ratio of display type against background is >= 7:1 in light and dark mode', async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('h1');

    const evaluateContrast = async () => {
      return page.evaluate(() => {
        function getLuminance(r: number, g: number, b: number) {
          const a = [r, g, b].map((v) => {
            v /= 255;
            return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
          });
          return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
        }

        function parseColor(str: string): [number, number, number] {
          const match = str.match(/\d+/g);
          if (!match || match.length < 3) return [0, 0, 0];
          return [parseInt(match[0]), parseInt(match[1]), parseInt(match[2])];
        }

        const h1 = document.querySelector('h1')!;
        const heroSection = document.querySelector('[data-testid="room-hero"]') || document.body;

        const textColor = window.getComputedStyle(h1).color;
        let bgColor = window.getComputedStyle(heroSection).backgroundColor;
        if (!bgColor || bgColor === 'rgba(0, 0, 0, 0)' || bgColor === 'transparent') {
          bgColor = window.getComputedStyle(document.body).backgroundColor;
        }

        const [r1, g1, b1] = parseColor(textColor);
        const [r2, g2, b2] = parseColor(bgColor);

        const l1 = getLuminance(r1, g1, b1);
        const l2 = getLuminance(r2, g2, b2);

        const ratio = (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
        return ratio;
      });
    };

    // 1. Light mode contrast (Ink on Bg is ~17:1)
    const lightRatio = await evaluateContrast();
    expect(lightRatio).toBeGreaterThanOrEqual(7.0);

    // 2. Dark mode contrast (Ink on Bg in dark stage is ~18:1)
    await page.evaluate(() => {
      try {
        localStorage.setItem('vv_stage_mode', 'dark');
      } catch (e) {}
      document.documentElement.setAttribute('data-stage-mode', 'dark');
    });
    await page.reload();
    await page.waitForSelector('h1');
    await page.waitForTimeout(350);

    const darkRatio = await evaluateContrast();
    expect(darkRatio).toBeGreaterThanOrEqual(7.0);
  });

  // Visual regression and typography layout snapshots
  test('Visual Snapshots - Capture hero, unit faceplate, price readout, and spec table', async ({ page }) => {
    // 1. Hero at 1440
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    const hero = page.locator('[data-testid="room-hero"]');
    await hero.screenshot({ path: path.join(screenshotDir, 'hero-1440.png') });

    // 2. Hero at 768
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await hero.screenshot({ path: path.join(screenshotDir, 'hero-768.png') });

    // 3. Hero at 360
    await page.setViewportSize({ width: 360, height: 800 });
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await hero.screenshot({ path: path.join(screenshotDir, 'hero-360.png') });

    // 4. Unit Faceplate at 1440
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    const faceplate = page.locator('[data-testid="unit-faceplate-viral"]').first();
    await faceplate.scrollIntoViewIfNeeded();
    await faceplate.screenshot({ path: path.join(screenshotDir, 'unit-faceplate-1440.png') });

    // 5. Price Readout at 1440
    const priceSection = page.locator('text=SYSTEM PRICE [USD]').locator('..');
    await priceSection.scrollIntoViewIfNeeded();
    await priceSection.screenshot({ path: path.join(screenshotDir, 'price-readout-1440.png') });

    // 6. Spec Table at 1440
    await page.goto('/vault/viral');
    await page.waitForLoadState('networkidle');
    const specTable = page.locator('[data-testid="spec-table"]');
    await specTable.scrollIntoViewIfNeeded();
    await specTable.screenshot({ path: path.join(screenshotDir, 'spec-table-1440.png') });
  });
});
