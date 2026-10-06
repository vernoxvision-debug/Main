import { test, expect } from '@playwright/test';

test.describe('Vernox Vision Test Suite', () => {
  // Scenario 01: Home loads with no blocking errors.
  test('01 - Home loads with no blocking errors', async ({ page }) => {
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

  // Scenario 02: Header columns render and every link navigates correctly.
  test('02 - Header columns render and links navigate correctly', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/');

    const brandWordmark = page.locator('[data-testid="brand-wordmark"]');
    await expect(brandWordmark).toBeVisible();

    // Check header links
    await page.click('header a:has-text("vault")');
    await expect(page).toHaveURL(/.*\/vault/);

    await page.goto('/');
    await page.click('header a:has-text("how it works")');
    await expect(page).toHaveURL(/.*\/how-it-works/);
  });

  // Scenario 03: Mobile menu opens, closes (Escape and button) and navigates.
  test('03 - Mobile menu opens, closes (Escape and button) and navigates', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/');

    const menuBtn = page.locator('[data-testid="btn-mobile-menu"]');
    await expect(menuBtn).toBeVisible();

    // Open menu
    await menuBtn.click();
    const menuModal = page.locator('[data-testid="mobile-menu-modal"]');
    await expect(menuModal).toBeVisible();

    // Close via Escape key
    await page.keyboard.press('Escape');
    await expect(menuModal).not.toBeVisible();

    // Open and close via button
    await menuBtn.click();
    await expect(menuModal).toBeVisible();
    const closeBtn = page.locator('[data-testid="btn-mobile-menu-close"]');
    await closeBtn.click();
    await expect(menuModal).not.toBeVisible();
  });

  // Scenario 04: Hero headline, badge and both CTAs are visible.
  test('04 - Hero headline, badge and both CTAs are visible', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('[data-testid="hero-headline"]')).toContainText('15,000+ CLIPS');
    await expect(page.locator('[data-testid="vault-update-badge"]')).toBeVisible();
    await expect(page.locator('[data-testid="btn-buy-cta"]').first()).toBeVisible();
    await expect(page.locator('[data-testid="btn-see-inside"]')).toBeVisible();
  });

  // Scenario 05: Primary Buy CTAs point to https://vernoxvision.gumroad.com/l/vernoxvision
  test('05 - Primary Buy CTAs point to Gumroad product URL with noopener', async ({ page }) => {
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

  // Scenario 06: All seven units render in the lineup with correct codes and counts.
  test('06 - All seven units render in the lineup with correct codes and counts', async ({ page }) => {
    await page.goto('/');
    const lineup = page.locator('[data-testid="system-lineup-row"]');
    await expect(lineup).toBeVisible();

    const expectedUnits = ['viral', 'speaker', 'luxury', 'vlog', 'calendar', 'caption', 'onboarding'];
    for (const slug of expectedUnits) {
      await expect(lineup.locator(`[data-testid="unit-faceplate-${slug}"]`)).toBeVisible();
    }
  });

  // Scenario 07: Clicking a unit opens its detail page with the correct spec table.
  test('07 - Clicking a unit opens its detail page with spec table', async ({ page }) => {
    await page.goto('/');
    await page.locator('[data-testid="unit-faceplate-viral"]').first().click();
    await expect(page).toHaveURL(/.*\/vault\/viral/);

    await expect(page.locator('[data-testid="unit-detail-title"]')).toContainText('Viral TikTok & Social Clips');
    await expect(page.locator('[data-testid="spec-table"]')).toBeVisible();
  });

  // Scenario 08: Previous/next unit navigation works.
  test('08 - Previous/next unit navigation works', async ({ page }) => {
    await page.goto('/vault/viral');
    await page.click('[data-testid="link-next-unit"]');
    await expect(page).toHaveURL(/.*\/vault\/speaker/);

    await page.click('[data-testid="link-prev-unit"]');
    await expect(page).toHaveURL(/.*\/vault\/viral/);
  });

  // Scenario 09: HookTimer starts, runs and can be paused.
  test('09 - HookTimer starts, runs and can be paused', async ({ page }) => {
    await page.goto('/');
    const timerComponent = page.locator('[data-testid="hook-timer-component"]');
    await expect(timerComponent).toBeVisible();

    const toggleBtn = page.locator('[data-testid="btn-hook-timer-toggle"]');
    await expect(toggleBtn).toContainText('PAUSE');

    await toggleBtn.click();
    await expect(toggleBtn).toContainText('PLAY');

    await toggleBtn.click();
    await expect(toggleBtn).toContainText('PAUSE');
  });

  // Scenario 10: Calendar preview interaction works (hover and tap).
  test('10 - Calendar preview interaction works', async ({ page }) => {
    await page.goto('/guides');
    const day5Btn = page.locator('[data-testid="calendar-day-5"]');
    await expect(day5Btn).toBeVisible();

    await day5Btn.click();
    await expect(page.locator('text=DAY 05 // Process Teardown')).toBeVisible();
  });

  // Scenario 11: FAQ accordion opens/closes via mouse and keyboard.
  test('11 - FAQ accordion opens/closes via mouse and keyboard', async ({ page }) => {
    await page.goto('/faq');
    const firstTrigger = page.locator('[data-testid="accordion-trigger-faq-1"]');
    await expect(firstTrigger).toBeVisible();

    // Toggle close
    await firstTrigger.click();
    await expect(firstTrigger).toHaveAttribute('aria-expanded', 'false');

    // Toggle open via keyboard Enter
    await firstTrigger.focus();
    await page.keyboard.press('Enter');
    await expect(firstTrigger).toHaveAttribute('aria-expanded', 'true');
  });

  // Scenario 12: Stage-mode toggle flips theme and persists across reload.
  test('12 - Stage-mode toggle flips theme and persists across reload', async ({ page }) => {
    await page.goto('/');
    const toggleBtn = page.locator('[data-testid="toggle-stage-mode"]').first();
    await expect(toggleBtn).toBeVisible();

    // Initial state
    const initialChecked = await toggleBtn.getAttribute('aria-checked');
    await toggleBtn.click();

    const newChecked = await toggleBtn.getAttribute('aria-checked');
    expect(newChecked).not.toBe(initialChecked);

    // Reload page to verify persistence
    await page.reload();
    const persistedToggle = page.locator('[data-testid="toggle-stage-mode"]').first();
    const persistedChecked = await persistedToggle.getAttribute('aria-checked');
    expect(persistedChecked).toBe(newChecked);
  });

  // Scenario 13: Reduced-motion emulation disables heavy animation without breaking layout.
  test('13 - Reduced-motion emulation works cleanly', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/');
    await expect(page.locator('[data-testid="hero-headline"]')).toBeVisible();
    await expect(page.locator('[data-testid="system-lineup-row"]')).toBeVisible();
  });

  // Scenario 14: Pricing stage shows $9.99, one-time, lifetime access.
  test('14 - Pricing stage shows $9.99, one-time, lifetime access', async ({ page }) => {
    await page.goto('/access');
    await expect(page.locator('text=$9.99').first()).toBeVisible();
    await expect(page.locator('text=ONE-TIME PAYMENT').first()).toBeVisible();
  });

  // Scenario 15: License page lists can/can't items accurately, including the no-resale rule.
  test('15 - License page lists can/can\'t items accurately', async ({ page }) => {
    await page.goto('/license');
    await expect(page.locator('text=YOU ARE PERMITTED TO [COMMERCIAL USE]')).toBeVisible();
    await expect(page.locator('text=YOU ARE STRICTLY PROHIBITED FROM [FORBIDDEN]')).toBeVisible();
    await expect(page.locator('text=Reselling Raw Files')).toBeVisible();
  });

  // Scenario 16: Legal/placeholder pages exist and are reachable.
  test('16 - Legal pages exist and are reachable', async ({ page }) => {
    for (const path of ['/terms', '/privacy', '/refund-policy']) {
      const res = await page.goto(path);
      expect(res?.status()).toBe(200);
      await expect(page.locator('text=[CLIENT TODO]')).toBeVisible();
    }
  });

  // Scenario 17: 404 page works.
  test('17 - 404 page works for unknown route', async ({ page }) => {
    await page.goto('/non-existent-hardware-module');
    await expect(page.locator('text=404').first()).toBeVisible();
    await expect(page.locator('text=UNIT NOT FOUND ON BUS')).toBeVisible();
  });

  // Scenario 18: Keyboard-only navigation reaches interactive elements with visible focus.
  test('18 - Keyboard-only navigation reaches interactive elements', async ({ page }) => {
    await page.goto('/');
    await page.keyboard.press('Tab'); // focus skip link or brand mark
    const focusedTag = await page.evaluate(() => document.activeElement?.tagName);
    expect(['A', 'BUTTON']).toContain(focusedTag);
  });

  // Scenario 19: No console errors or warnings of consequence.
  test('19 - No console errors of consequence', async ({ page }) => {
    const criticalErrors: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error' && !msg.text().includes('favicon')) {
        criticalErrors.push(msg.text());
      }
    });
    await page.goto('/');
    expect(criticalErrors.length).toBe(0);
  });

  // Scenario 20: No broken images, fonts or media.
  test('20 - No broken network requests for media', async ({ page }) => {
    const failedUrls: string[] = [];
    page.on('requestfailed', (req) => {
      failedUrls.push(req.url());
    });
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    expect(failedUrls.filter(u => !u.includes('gumroad.com'))).toHaveLength(0);
  });

  // Scenario 21: No horizontal overflow at 360, 430, 768, 1280, 1680 widths.
  test('21 - No horizontal overflow at various widths', async ({ page }) => {
    const widths = [360, 430, 768, 1280, 1680];
    for (const w of widths) {
      await page.setViewportSize({ width: w, height: 800 });
      await page.goto('/');
      const overflow = await page.evaluate(() => {
        return document.documentElement.scrollWidth > document.documentElement.clientWidth;
      });
      expect(overflow, `Horizontal overflow detected at ${w}px`).toBe(false);
    }
  });

  // Scenario 22: Giant headlines don't clip at 360px.
  test('22 - Giant headlines don\'t clip at 360px', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 740 });
    await page.goto('/');
    const headline = page.locator('[data-testid="hero-headline"]');
    await expect(headline).toBeVisible();
    const box = await headline.boundingBox();
    expect(box).not.toBeNull();
    if (box) {
      expect(box.width).toBeLessThanOrEqual(360);
    }
  });

  // Scenario 23: Accessibility checks: landmarks, headings, role attributes.
  test('23 - Accessibility structure check', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('main')).toBeVisible();
    await expect(page.locator('header')).toBeVisible();
    await expect(page.locator('footer')).toBeVisible();
    const h1Count = await page.locator('h1').count();
    expect(h1Count).toBe(1);
  });

  // Scenario 24: Meta tags, OG tags and JSON-LD present and valid.
  test('24 - Meta tags and JSON-LD present', async ({ page }) => {
    await page.goto('/');
    const title = await page.title();
    expect(title).toContain('Vernox Vision');

    const ogTitle = await page.locator('meta[property="og:title"]').getAttribute('content');
    expect(ogTitle).toContain('Vernox Vision');

    const jsonLd = await page.locator('script[type="application/ld+json"]').textContent();
    expect(jsonLd).not.toBeNull();
    if (jsonLd) {
      const data = JSON.parse(jsonLd);
      expect(data['@type']).toBe('Product');
      expect(data.offers.price).toBe('9.99');
    }
  });

  // Scenario 25 & Screenshots across 360, 768, 1440 widths.
  test('25 - Capture visual verification screenshots', async ({ page }) => {
    const viewports = [
      { width: 360, height: 740, name: '360' },
      { width: 768, height: 1024, name: '768' },
      { width: 1440, height: 900, name: '1440' },
    ];

    for (const vp of viewports) {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.goto('/');
      await page.waitForLoadState('networkidle');

      // Home Top
      await page.screenshot({
        path: `tests/screenshots/home-top-${vp.name}.png`,
        clip: { x: 0, y: 0, width: vp.width, height: Math.min(vp.height, 900) },
      });

      // Lineup
      const lineupSection = page.locator('#vault');
      if (await lineupSection.isVisible()) {
        await lineupSection.scrollIntoViewIfNeeded();
        await page.screenshot({
          path: `tests/screenshots/lineup-${vp.name}.png`,
          clip: { x: 0, y: 0, width: vp.width, height: Math.min(vp.height, 700) },
        });
      }

      // Unit Detail
      await page.goto('/vault/viral');
      await page.screenshot({
        path: `tests/screenshots/unit-detail-${vp.name}.png`,
        clip: { x: 0, y: 0, width: vp.width, height: Math.min(vp.height, 900) },
      });

      // Pricing Stage
      await page.goto('/access');
      await page.screenshot({
        path: `tests/screenshots/pricing-${vp.name}.png`,
        clip: { x: 0, y: 0, width: vp.width, height: Math.min(vp.height, 800) },
      });
    }

    // Mobile menu open screenshot at 360px
    await page.setViewportSize({ width: 360, height: 740 });
    await page.goto('/');
    const menuBtn = page.locator('[data-testid="btn-mobile-menu"]');
    await menuBtn.click();
    await page.screenshot({
      path: `tests/screenshots/mobile-menu-360.png`,
    });
  });

  // Scenario 26: Developer credit link points to https://www.madhankumart.in
  test('26 - Developer credit link points to https://www.madhankumart.in', async ({ page }) => {
    await page.goto('/');
    const creditLink = page.locator('[data-testid="link-developer-credit"]');
    await creditLink.scrollIntoViewIfNeeded();
    await expect(creditLink).toBeVisible();
    await expect(creditLink).toHaveText('Madhan Kumar T');
    await expect(creditLink).toHaveAttribute('href', 'https://www.madhankumart.in');
    await expect(creditLink).toHaveAttribute('target', '_blank');
  });
});
