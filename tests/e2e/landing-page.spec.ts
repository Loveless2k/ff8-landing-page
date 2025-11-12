// ABOUTME: Basic smoke test for Final Fantasy VIII Landing Page
// ABOUTME: Verifies that the landing page loads successfully and has the correct title
import { test, expect } from '@playwright/test';

test.describe('Landing Page - Smoke Tests', () => {
  test('should load the landing page successfully', async ({ page }) => {
    await page.goto('/');

    // Verify page loads
    await expect(page).toHaveTitle(/Astro/);

    // Verify page is visible
    await expect(page.locator('body')).toBeVisible();
  });

  test('should have no console errors on load', async ({ page }) => {
    const consoleErrors: string[] = [];

    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    await page.goto('/');

    // Wait for page to fully load
    await page.waitForLoadState('networkidle');

    // Verify no console errors
    expect(consoleErrors).toHaveLength(0);
  });

  test('should be responsive on mobile viewport', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });

    await page.goto('/');

    // Verify page is visible on mobile
    await expect(page.locator('body')).toBeVisible();
  });

  test('should be responsive on tablet viewport', async ({ page }) => {
    // Set tablet viewport
    await page.setViewportSize({ width: 768, height: 1024 });

    await page.goto('/');

    // Verify page is visible on tablet
    await expect(page.locator('body')).toBeVisible();
  });

  test('should be responsive on desktop viewport', async ({ page }) => {
    // Set desktop viewport
    await page.setViewportSize({ width: 1920, height: 1080 });

    await page.goto('/');

    // Verify page is visible on desktop
    await expect(page.locator('body')).toBeVisible();
  });
});
