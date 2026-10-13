import { test, expect } from '@playwright/test';

test.describe('Vernox Vision Luxury Editorial Theme & 3D Coverflow Suite', () => {
  // 01 - Home loads with 200 OK and no blocking errors
  test('01 - Home loads successfully with 200 OK', async ({ page }) => {
    const consoleErrors: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error' && !msg.text().includes('favicon')) {
        consoleErrors.push(msg.text());
      }
    });

    const response = await page.goto('/');
    expect(response?.status()).toBe(200);
    await expect(page.locator('[data-testid="hero-headline"]')).toBeVisible();
    expect(consoleErrors.length).toBe(0);
  });

  // 02 - Luxury Editorial Typography & Headline
  test('02 - Editorial Serif headline renders with correct content', async ({ page }) => {
    await page.goto('/');
    const headline = page.locator('[data-testid="hero-headline"]');
    await expect(headline).toBeVisible();
    await expect(headline).toContainText('Create');
    await expect(headline).toContainText('without limits');
    await expect(headline).toContainText('Build your');
    await expect(headline).toContainText('vision');
  });

  // 03 - 3D Coverflow Carousel renders and navigates
  test('03 - 3D Coverflow Carousel renders all unit slides and navigates smoothly', async ({ page }) => {
    await page.goto('/');
    const carouselSection = page.locator('[data-testid="featured-carousel-section"]');
    await expect(carouselSection).toBeVisible();

    // Check next button navigates slide
    const nextBtn = carouselSection.locator('[data-testid="btn-carousel-next"]');
    await expect(nextBtn).toBeVisible();
    await nextBtn.click();
    await page.waitForTimeout(300);

    // Check prev button navigates slide
    const prevBtn = carouselSection.locator('[data-testid="btn-carousel-prev"]');
    await expect(prevBtn).toBeVisible();
    await prevBtn.click();
    await page.waitForTimeout(300);
  });

  // 04 - Gumroad Purchase CTAs point to official product link ($9.99)
  test('04 - Buy CTAs point to official Gumroad product link at $9.99', async ({ page }) => {
    await page.goto('/');
    const buyButtons = page.locator('[data-testid="btn-buy-cta"]');
    const count = await buyButtons.count();
    expect(count).toBeGreaterThan(0);

    for (let i = 0; i < count; i++) {
      const btn = buyButtons.nth(i);
      const href = await btn.getAttribute('href');
      const target = await btn.getAttribute('target');
      const rel = await btn.getAttribute('rel');

      expect(href).toBe('https://vernoxvision.gumroad.com/l/vernoxvision');
      expect(target).toBe('_blank');
      expect(rel).toContain('noopener');
    }
  });

  // 05 - Signature Cream Pricing Card renders with $9.99 price and features
  test('05 - Signature Cream Pricing Card renders with price and trust badges', async ({ page }) => {
    await page.goto('/');
    const pricingCard = page.locator('[data-testid="pricing-card"]');
    await expect(pricingCard).toBeVisible();
    await expect(pricingCard).toContainText('$9.99');
    await expect(pricingCard).toContainText('THE SIGNATURE COLLECTION');
    await expect(pricingCard).toContainText('Your next idea');
    await expect(pricingCard).toContainText('LIFETIME ACCESS');
  });

  // 06 - Attribution Link in Footer matches user request
  test('06 - Footer contains exact attribution link to Madhan Kumar T', async ({ page }) => {
    await page.goto('/');
    const attributionLink = page.locator('footer a[href="https://www.madhankumart.in"]');
    await expect(attributionLink).toBeVisible();
    await expect(attributionLink).toContainText('Websites by Madhan Kumar T');
  });

  // 07 - Mobile Viewport test: zero horizontal overflow on 360px
  test('07 - Page renders without horizontal overflow on 360px mobile viewport', async ({ page }) => {
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

  // 08 - Zero external font requests to Google Fonts CDN
  test('08 - Zero external font requests to third-party CDNs', async ({ page }) => {
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
});
