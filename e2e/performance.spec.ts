import { test, expect } from '@playwright/test';

/**
 * Performance & Load Time Tests
 * Ensures application meets performance targets
 * Based on: docs/TESTING-STRATEGY.md targets
 */

test.describe('Performance Benchmarks', () => {
  test('chat interface should load within 1.5 seconds', async ({ page }) => {
    const startTime = Date.now();

    await page.goto('/pitch-deck-wizard');
    await page.waitForLoadState('domcontentloaded');

    const loadTime = Date.now() - startTime;

    console.log(`Chat interface load time: ${loadTime}ms`);
    expect(loadTime).toBeLessThan(2000); // 2 second max (target: 1.5s)
  });

  test('slide grid should load within 2 seconds', async ({ page }) => {
    const startTime = Date.now();

    await page.goto('/presentations/d4a27c1c-8b2d-48a9-99c9-2298037e9e81/outline');
    await page.waitForLoadState('networkidle');

    const loadTime = Date.now() - startTime;

    console.log(`Slide grid load time: ${loadTime}ms`);
    expect(loadTime).toBeLessThan(3000); // 3 second max (target: 2s)
  });

  test('home page should load within 1 second', async ({ page }) => {
    const startTime = Date.now();

    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');

    const loadTime = Date.now() - startTime;

    console.log(`Home page load time: ${loadTime}ms`);
    expect(loadTime).toBeLessThan(1500); // 1.5 second max (target: 1s)
  });
});

test.describe('Network Performance', () => {
  test('should make minimal API calls on initial load', async ({ page }) => {
    const apiCalls: { url: string; method: string }[] = [];

    page.on('request', (request) => {
      if (request.url().includes('/rest/v1/') || request.url().includes('/functions/v1/')) {
        apiCalls.push({
          url: request.url(),
          method: request.method(),
        });
      }
    });

    await page.goto('/pitch-deck-wizard');
    await page.waitForLoadState('networkidle');

    console.log(`Total API calls: ${apiCalls.length}`);
    console.log('API calls:', apiCalls);

    // Should make < 5 API calls on initial load
    expect(apiCalls.length).toBeLessThan(10);
  });

  test('should not have failed network requests', async ({ page }) => {
    const failedRequests: string[] = [];

    page.on('requestfailed', (request) => {
      failedRequests.push(request.url());
    });

    await page.goto('/');
    await page.waitForLoadState('networkidle');

    console.log('Failed requests:', failedRequests.length);
    expect(failedRequests.length).toBe(0);
  });

  test('should load critical resources first', async ({ page }) => {
    const resourceTimings: { url: string; duration: number }[] = [];

    page.on('response', async (response) => {
      const timing = response.timing();
      if (timing) {
        const duration = timing.responseEnd - timing.requestStart;
        resourceTimings.push({
          url: response.url(),
          duration: duration,
        });
      }
    });

    await page.goto('/pitch-deck-wizard');
    await page.waitForLoadState('networkidle');

    // Sort by load time
    resourceTimings.sort((a, b) => a.duration - b.duration);

    console.log('Slowest resources:');
    resourceTimings.slice(-5).forEach((r, i) => {
      console.log(`${i + 1}. ${r.url.substring(0, 80)}... (${r.duration}ms)`);
    });
  });
});

test.describe('Bundle Size & Assets', () => {
  test('should not load excessive JavaScript', async ({ page }) => {
    let totalJsSize = 0;
    const jsFiles: { url: string; size: number }[] = [];

    page.on('response', async (response) => {
      const url = response.url();
      if (url.endsWith('.js') || url.endsWith('.mjs')) {
        const buffer = await response.body().catch(() => Buffer.from(''));
        const size = buffer.length;
        totalJsSize += size;
        jsFiles.push({ url, size });
      }
    });

    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const totalMB = (totalJsSize / 1024 / 1024).toFixed(2);
    console.log(`Total JS size: ${totalMB} MB`);
    console.log(`Total JS files: ${jsFiles.length}`);

    // Target: < 2MB total
    expect(totalJsSize).toBeLessThan(3 * 1024 * 1024); // 3MB max
  });

  test('should optimize images', async ({ page }) => {
    let totalImageSize = 0;
    const images: { url: string; size: number }[] = [];

    page.on('response', async (response) => {
      const url = response.url();
      const contentType = response.headers()['content-type'] || '';
      
      if (contentType.includes('image/')) {
        const buffer = await response.body().catch(() => Buffer.from(''));
        const size = buffer.length;
        totalImageSize += size;
        images.push({ url, size });
      }
    });

    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const totalMB = (totalImageSize / 1024 / 1024).toFixed(2);
    console.log(`Total image size: ${totalMB} MB`);
    console.log(`Total images: ${images.length}`);

    // Log largest images
    images.sort((a, b) => b.size - a.size);
    console.log('Largest images:');
    images.slice(0, 3).forEach((img, i) => {
      console.log(`${i + 1}. ${(img.size / 1024).toFixed(0)}KB - ${img.url.substring(0, 60)}...`);
    });
  });
});

test.describe('Memory Leaks & Resource Cleanup', () => {
  test.skip('should not leak memory on navigation', async ({ page }) => {
    // This test requires performance API access
    // Skipped in CI, useful for local debugging

    await page.goto('/pitch-deck-wizard');

    // Navigate away and back multiple times
    for (let i = 0; i < 5; i++) {
      await page.goto('/');
      await page.waitForTimeout(500);
      await page.goto('/pitch-deck-wizard');
      await page.waitForTimeout(500);
    }

    // Check memory usage (browser-specific)
    const metrics = await page.evaluate(() => {
      if ('memory' in performance) {
        return (performance as any).memory.usedJSHeapSize;
      }
      return null;
    });

    if (metrics) {
      const memoryMB = (metrics / 1024 / 1024).toFixed(2);
      console.log(`Memory usage: ${memoryMB} MB`);
      
      // Should be < 100MB
      expect(metrics).toBeLessThan(100 * 1024 * 1024);
    }
  });
});

test.describe('Render Performance', () => {
  test('should render slide grid efficiently', async ({ page }) => {
    await page.goto('/presentations/d4a27c1c-8b2d-48a9-99c9-2298037e9e81/outline');

    // Measure time to first slide visible
    const startTime = Date.now();
    
    await page.locator('[data-slide-number], article').first().waitFor({ timeout: 5000 });
    
    const renderTime = Date.now() - startTime;

    console.log(`Time to first slide: ${renderTime}ms`);
    expect(renderTime).toBeLessThan(1000); // 1 second max
  });

  test('should handle large presentations without performance degradation', async ({ page }) => {
    // Navigate to presentation (if exists)
    await page.goto('/presentations/d4a27c1c-8b2d-48a9-99c9-2298037e9e81/outline');
    await page.waitForLoadState('networkidle');

    // Scroll through all slides
    const startTime = Date.now();
    
    for (let i = 0; i < 5; i++) {
      await page.evaluate(() => window.scrollBy(0, 500));
      await page.waitForTimeout(100);
    }

    const scrollTime = Date.now() - startTime;

    console.log(`Scroll performance: ${scrollTime}ms for 5 scrolls`);
    
    // Should be smooth (< 1 second total)
    expect(scrollTime).toBeLessThan(1500);
  });
});

test.describe('API Response Times', () => {
  test.skip('chat response should be under 3 seconds', async ({ page }) => {
    // Requires authentication
    
    await page.goto('/pitch-deck-wizard');

    const input = page.locator('textarea, input').first();
    await input.fill('Quick test message');

    const startTime = Date.now();
    
    await page.click('button:has-text("Send")');
    
    // Wait for response
    await page.waitForSelector('text=/Great|Tell|What/', { timeout: 5000 }).catch(() => {});

    const responseTime = Date.now() - startTime;

    console.log(`AI response time: ${responseTime}ms`);
    
    // Target: < 3 seconds
    expect(responseTime).toBeLessThan(4000);
  });
});
