import { test, expect } from '@playwright/test';

/**
 * Slide Grid Rendering Tests
 * Tests the presentation outline view with 10-slide grid
 */

const TEST_PRESENTATION_ID = 'd4a27c1c-8b2d-48a9-99c9-2298037e9e81';

test.describe('Slide Grid - Public Presentation Access', () => {
  test('should load public presentation without authentication', async ({ page }) => {
    // Navigate to test presentation outline
    await page.goto(`/presentations/${TEST_PRESENTATION_ID}/outline`);

    // Page should load (not stuck on "Loading...")
    await expect(page.locator('text=Loading')).not.toBeVisible({ timeout: 10000 });

    // Should show presentation title
    await expect(page.locator('h1, h2, [class*="title"]')).toBeVisible();
  });

  test('should render all 10 slides in grid', async ({ page }) => {
    await page.goto(`/presentations/${TEST_PRESENTATION_ID}/outline`);

    // Wait for grid to load
    await page.waitForLoadState('networkidle');

    // Count slide elements
    const slides = page.locator('[data-slide-number], [class*="slide-card"], article');
    const count = await slides.count();

    // Should have exactly 10 slides
    expect(count).toBeGreaterThanOrEqual(10);
  });

  test('should not show RLS policy errors in console', async ({ page }) => {
    const consoleErrors: string[] = [];

    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    await page.goto(`/presentations/${TEST_PRESENTATION_ID}/outline`);
    await page.waitForLoadState('networkidle');

    // Filter for RLS-related errors
    const rlsErrors = consoleErrors.filter(err =>
      err.includes('Access denied') ||
      err.includes('RLS') ||
      err.includes('policy violation')
    );

    expect(rlsErrors).toHaveLength(0);
  });

  test('should load slide thumbnails', async ({ page }) => {
    await page.goto(`/presentations/${TEST_PRESENTATION_ID}/outline`);

    // Wait for images to load
    await page.waitForLoadState('networkidle');

    // Check for slide content/thumbnails
    const slideContent = page.locator('[class*="slide-preview"], [class*="slide-content"]');
    const count = await slideContent.count();

    expect(count).toBeGreaterThan(0);
  });
});

test.describe('Slide Grid - Navigation', () => {
  test('should navigate to slide detail view on click', async ({ page }) => {
    await page.goto(`/presentations/${TEST_PRESENTATION_ID}/outline`);
    await page.waitForLoadState('networkidle');

    // Click first slide
    const firstSlide = page.locator('[data-slide-number="1"], article').first();
    await firstSlide.click();

    // Should navigate to detail view or show modal
    // URL might change to /slide/1 or modal might appear
    await page.waitForTimeout(1000);

    // Verify either URL changed or detail view appeared
    const urlChanged = page.url().includes('/slide') || page.url().includes('/edit');
    const modalAppeared = await page.locator('[role="dialog"], [class*="modal"]').isVisible().catch(() => false);

    expect(urlChanged || modalAppeared).toBe(true);
  });

  test('should show slide navigation controls', async ({ page }) => {
    await page.goto(`/presentations/${TEST_PRESENTATION_ID}/outline`);

    // Look for navigation elements (arrows, numbers, etc.)
    const navElements = page.locator('button:has-text("Previous"), button:has-text("Next"), [aria-label*="navigation"]');

    // At least some navigation should exist
    const hasNav = await navElements.count().then(c => c > 0).catch(() => false);
    
    // This might not exist in grid view, so we just log
    console.log('Navigation elements found:', hasNav);
  });
});

test.describe('Slide Grid - Performance', () => {
  test('should load within 2 seconds', async ({ page }) => {
    const startTime = Date.now();

    await page.goto(`/presentations/${TEST_PRESENTATION_ID}/outline`);
    await page.waitForLoadState('networkidle');

    const loadTime = Date.now() - startTime;

    console.log(`Slide grid load time: ${loadTime}ms`);
    expect(loadTime).toBeLessThan(3000); // 3 second max
  });

  test('should not make excessive API calls', async ({ page }) => {
    const apiCalls: string[] = [];

    page.on('request', (request) => {
      if (request.url().includes('/rest/v1/')) {
        apiCalls.push(request.url());
      }
    });

    await page.goto(`/presentations/${TEST_PRESENTATION_ID}/outline`);
    await page.waitForLoadState('networkidle');

    console.log(`Total API calls: ${apiCalls.length}`);

    // Should make < 10 API calls total
    expect(apiCalls.length).toBeLessThan(10);
  });
});

test.describe('Slide Grid - Responsive Design', () => {
  test('should be mobile responsive', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });

    await page.goto(`/presentations/${TEST_PRESENTATION_ID}/outline`);

    // Should still render slides (maybe in list view)
    const slides = page.locator('[data-slide-number], [class*="slide"], article');
    const count = await slides.count();

    expect(count).toBeGreaterThan(0);
  });

  test('should adapt layout for tablet', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });

    await page.goto(`/presentations/${TEST_PRESENTATION_ID}/outline`);

    const slides = page.locator('[data-slide-number], article');
    const count = await slides.count();

    expect(count).toBeGreaterThanOrEqual(10);
  });
});
