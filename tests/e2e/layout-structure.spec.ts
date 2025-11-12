// ABOUTME: E2E tests for project structure and base layout components
// ABOUTME: Verifies BaseLayout renders correctly with proper HTML5 structure and Container component works

import { test, expect } from '@playwright/test';

test.describe('Layout Structure - Issue #3', () => {
  test('should have proper HTML5 structure with BaseLayout', async ({ page }) => {
    await page.goto('/');

    // Verify HTML5 doctype and structure
    const html = await page.locator('html').getAttribute('lang');
    expect(html).toBe('en');

    // Verify head section with meta tags
    const viewport = await page.locator('meta[name="viewport"]').getAttribute('content');
    expect(viewport).toContain('width=device-width');

    const description = await page.locator('meta[name="description"]').getAttribute('content');
    expect(description).toBeTruthy();
    expect(description!.length).toBeGreaterThan(0);

    // Verify title
    await expect(page).toHaveTitle(/Final Fantasy VIII/);

    // Verify body element exists
    await expect(page.locator('body')).toBeVisible();
  });

  test('should render main content within BaseLayout', async ({ page }) => {
    await page.goto('/');

    // Verify main element exists
    const main = page.locator('main');
    await expect(main).toBeVisible();

    // Verify content is rendered
    const heading = page.locator('h1');
    await expect(heading).toBeVisible();
    await expect(heading).toContainText('Final Fantasy VIII');
  });

  test('should have Container component with proper responsive padding', async ({ page }) => {
    await page.goto('/');

    // Verify container exists
    const container = page.locator('.container');
    await expect(container).toBeVisible();

    // Verify container has responsive padding classes
    const containerClass = await container.getAttribute('class');
    expect(containerClass).toContain('px-4'); // Mobile padding
    expect(containerClass).toContain('sm:px-6'); // Tablet padding
    expect(containerClass).toContain('lg:px-8'); // Desktop padding
    expect(containerClass).toContain('mx-auto'); // Centered
  });

  test('should have proper Open Graph meta tags', async ({ page }) => {
    await page.goto('/');

    // Verify Open Graph tags
    const ogType = await page.locator('meta[property="og:type"]').getAttribute('content');
    expect(ogType).toBe('website');

    const ogTitle = await page.locator('meta[property="og:title"]').getAttribute('content');
    expect(ogTitle).toContain('Final Fantasy VIII');

    const ogDescription = await page
      .locator('meta[property="og:description"]')
      .getAttribute('content');
    expect(ogDescription).toBeTruthy();
  });

  test('should have proper Twitter Card meta tags', async ({ page }) => {
    await page.goto('/');

    // Verify Twitter Card tags
    const twitterCard = await page.locator('meta[property="twitter:card"]').getAttribute('content');
    expect(twitterCard).toBe('summary_large_image');

    const twitterTitle = await page
      .locator('meta[property="twitter:title"]')
      .getAttribute('content');
    expect(twitterTitle).toContain('Final Fantasy VIII');

    const twitterDescription = await page
      .locator('meta[property="twitter:description"]')
      .getAttribute('content');
    expect(twitterDescription).toBeTruthy();
  });

  test('should be responsive at mobile viewport (375px)', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    // Verify page is visible and content is accessible
    await expect(page.locator('body')).toBeVisible();
    await expect(page.locator('h1')).toBeVisible();

    // Verify container has mobile padding
    const container = page.locator('.container');
    const containerClass = await container.getAttribute('class');
    expect(containerClass).toContain('px-4');
  });

  test('should be responsive at tablet viewport (768px)', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/');

    // Verify page is visible and content is accessible
    await expect(page.locator('body')).toBeVisible();
    await expect(page.locator('h1')).toBeVisible();

    // Verify container has tablet padding
    const container = page.locator('.container');
    const containerClass = await container.getAttribute('class');
    expect(containerClass).toContain('sm:px-6');
  });

  test('should be responsive at desktop viewport (1280px)', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.goto('/');

    // Verify page is visible and content is accessible
    await expect(page.locator('body')).toBeVisible();
    await expect(page.locator('h1')).toBeVisible();

    // Verify container has desktop padding
    const container = page.locator('.container');
    const containerClass = await container.getAttribute('class');
    expect(containerClass).toContain('lg:px-8');
  });
});
