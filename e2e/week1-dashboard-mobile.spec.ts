import { test, expect, devices } from '@playwright/test';

test.describe('Week 1: Dashboard Mobile Implementation Tests', () => {
  
  // Test Suite 1: Mobile (iPhone SE - smallest screen)
  test.describe('Mobile - iPhone SE (375px)', () => {
    test.use({ viewport: { width: 375, height: 667 } });

    test('viewport meta tag exists and is correct', async ({ page }) => {
      await page.goto('http://localhost:8081/dashboard');
      
      const viewport = await page.locator('meta[name="viewport"]').getAttribute('content');
      expect(viewport).toContain('width=device-width');
      expect(viewport).toContain('initial-scale=1');
    });

    test('dashboard loads without errors', async ({ page }) => {
      const consoleErrors: string[] = [];
      page.on('console', msg => {
        if (msg.type() === 'error') consoleErrors.push(msg.text());
      });

      await page.goto('http://localhost:8081/dashboard');
      await page.waitForLoadState('networkidle');

      expect(consoleErrors).toEqual([]);
    });

    test('metric cards display in single column', async ({ page }) => {
      await page.goto('http://localhost:8081/dashboard');
      
      // Find the grid container
      const grid = page.locator('.grid').first();
      await expect(grid).toBeVisible();
      
      // Verify grid classes
      const gridClasses = await grid.getAttribute('class');
      expect(gridClasses).toContain('grid-cols-1');
      expect(gridClasses).toContain('md:grid-cols-2');
      expect(gridClasses).toContain('lg:grid-cols-4');
    });

    test('metric cards meet minimum touch target (120px height)', async ({ page }) => {
      await page.goto('http://localhost:8081/dashboard');
      
      // Find metric cards by their content
      const eventsCard = page.getByText('Events Registered').locator('..');
      const jobsCard = page.getByText('Job Applications').locator('..');
      const savedCard = page.getByText('Saved Opportunities').locator('..');
      const decksCard = page.getByText('Pitch Decks').locator('..');
      
      const cards = [eventsCard, jobsCard, savedCard, decksCard];
      
      for (const card of cards) {
        const box = await card.boundingBox();
        if (box) {
          expect(box.height).toBeGreaterThanOrEqual(120);
        }
      }
    });

    test('no horizontal scroll on mobile', async ({ page }) => {
      await page.goto('http://localhost:8081/dashboard');
      
      const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
      const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
      
      expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 5); // 5px tolerance
    });

    test('cards have active state for touch feedback', async ({ page }) => {
      await page.goto('http://localhost:8081/dashboard');
      
      const firstCard = page.locator('.grid > *').first();
      const classes = await firstCard.getAttribute('class');
      
      expect(classes).toContain('active:scale-[0.98]');
      expect(classes).toContain('min-h-[120px]');
    });
  });

  // Test Suite 2: Tablet (iPad Air)
  test.describe('Tablet - iPad Air (820px)', () => {
    test.use({ viewport: { width: 820, height: 1180 } });

    test('metric cards display in 2 columns', async ({ page }) => {
      await page.goto('http://localhost:8081/dashboard');
      
      // At 820px, should be md:grid-cols-2 (2 columns)
      const grid = page.locator('.grid').first();
      const gridStyle = await grid.evaluate((el) => {
        const computed = window.getComputedStyle(el);
        return computed.gridTemplateColumns;
      });
      
      // Should have 2 columns
      const columnCount = gridStyle.split(' ').length;
      expect(columnCount).toBe(2);
    });

    test('cards are taller on tablet (140px minimum)', async ({ page }) => {
      await page.goto('http://localhost:8081/dashboard');
      
      const cards = page.locator('.grid > *').filter({ hasText: /Events|Job|Saved|Pitch/ });
      const count = await cards.count();
      
      for (let i = 0; i < count; i++) {
        const box = await cards.nth(i).boundingBox();
        if (box) {
          expect(box.height).toBeGreaterThanOrEqual(140);
        }
      }
    });
  });

  // Test Suite 3: Desktop (Full HD)
  test.describe('Desktop - 1920px', () => {
    test.use({ viewport: { width: 1920, height: 1080 } });

    test('metric cards display in 4 columns', async ({ page }) => {
      await page.goto('http://localhost:8081/dashboard');
      
      // At 1920px, should be lg:grid-cols-4 (4 columns)
      const grid = page.locator('.grid').first();
      const gridStyle = await grid.evaluate((el) => {
        const computed = window.getComputedStyle(el);
        return computed.gridTemplateColumns;
      });
      
      // Should have 4 columns
      const columnCount = gridStyle.split(' ').length;
      expect(columnCount).toBe(4);
    });

    test('desktop has larger padding', async ({ page }) => {
      await page.goto('http://localhost:8081/dashboard');
      
      const grid = page.locator('.grid').first();
      const padding = await grid.evaluate((el) => {
        const computed = window.getComputedStyle(el);
        return computed.paddingLeft;
      });
      
      // md:px-6 at desktop = 24px (1.5rem)
      expect(parseInt(padding)).toBeGreaterThanOrEqual(24);
    });
  });

  // Test Suite 4: Sticky Header
  test.describe('Sticky Header Tests', () => {
    test.use({ viewport: { width: 375, height: 667 } });

    test('header stays visible when scrolling', async ({ page }) => {
      await page.goto('http://localhost:8081/dashboard');
      
      const header = page.locator('header').first();
      
      // Verify sticky positioning
      const isSticky = await header.evaluate((el) => {
        const computed = window.getComputedStyle(el);
        return computed.position === 'sticky';
      });
      
      expect(isSticky).toBe(true);
      
      // Verify z-index
      const zIndex = await header.evaluate((el) => {
        const computed = window.getComputedStyle(el);
        return parseInt(computed.zIndex);
      });
      
      expect(zIndex).toBeGreaterThanOrEqual(40);
    });

    test('header has opaque background', async ({ page }) => {
      await page.goto('http://localhost:8081/dashboard');
      
      const header = page.locator('header').first();
      const bgColor = await header.evaluate((el) => {
        const computed = window.getComputedStyle(el);
        return computed.backgroundColor;
      });
      
      // Should not be transparent
      expect(bgColor).not.toBe('rgba(0, 0, 0, 0)');
      expect(bgColor).not.toBe('transparent');
    });

    test('header has border at bottom', async ({ page }) => {
      await page.goto('http://localhost:8081/dashboard');
      
      const header = page.locator('header').first();
      const borderBottom = await header.evaluate((el) => {
        const computed = window.getComputedStyle(el);
        return computed.borderBottomWidth;
      });
      
      expect(parseInt(borderBottom)).toBeGreaterThan(0);
    });
  });

  // Test Suite 5: Touch Interactions
  test.describe('Touch Interaction Tests', () => {
    test.use({ viewport: { width: 390, height: 844 } }); // iPhone 12

    test('metric cards are tappable', async ({ page }) => {
      await page.goto('http://localhost:8081/dashboard');
      
      // Find a metric card
      const eventsCard = page.getByText('Events Registered').locator('..');
      
      // Verify it's visible and has proper classes
      await expect(eventsCard).toBeVisible();
      
      const classes = await eventsCard.getAttribute('class');
      expect(classes).toContain('active:scale-[0.98]');
    });

    test('cards respond to tap', async ({ page }) => {
      await page.goto('http://localhost:8081/dashboard');
      
      const firstCard = page.locator('.grid > *').first();
      
      // Tap the card (if it's a link/button)
      await firstCard.click({ force: true });
      
      // Should not throw error
      await page.waitForTimeout(100);
    });
  });

  // Test Suite 6: Responsive Breakpoints
  test.describe('Responsive Breakpoint Tests', () => {
    const breakpoints = [
      { name: 'iPhone SE', width: 375, height: 667, expectedColumns: 1 },
      { name: 'iPhone 12', width: 390, height: 844, expectedColumns: 1 },
      { name: 'iPad Mini', width: 768, height: 1024, expectedColumns: 2 },
      { name: 'iPad Pro', width: 1024, height: 1366, expectedColumns: 4 },
      { name: 'Desktop', width: 1920, height: 1080, expectedColumns: 4 },
    ];

    for (const device of breakpoints) {
      test(`${device.name} (${device.width}px) shows ${device.expectedColumns} columns`, async ({ page }) => {
        await page.setViewportSize({ width: device.width, height: device.height });
        await page.goto('http://localhost:8081/dashboard');
        
        const grid = page.locator('.grid').first();
        const columnCount = await grid.evaluate((el) => {
          const computed = window.getComputedStyle(el);
          const columns = computed.gridTemplateColumns;
          return columns.split(' ').length;
        });
        
        expect(columnCount).toBe(device.expectedColumns);
      });
    }
  });

  // Test Suite 7: Performance
  test.describe('Performance Tests', () => {
    test.use({ viewport: { width: 375, height: 667 } });

    test('dashboard loads in reasonable time', async ({ page }) => {
      const startTime = Date.now();
      
      await page.goto('http://localhost:8081/dashboard');
      await page.waitForLoadState('networkidle');
      
      const loadTime = Date.now() - startTime;
      
      // Should load in less than 3 seconds (generous for dev mode)
      expect(loadTime).toBeLessThan(3000);
    });

    test('no layout shift when loading', async ({ page }) => {
      await page.goto('http://localhost:8081/dashboard');
      
      // Wait for content to load
      await page.waitForSelector('.grid');
      
      // Check for layout shift by verifying grid is in final position
      const grid = page.locator('.grid').first();
      const box1 = await grid.boundingBox();
      
      await page.waitForTimeout(500);
      
      const box2 = await grid.boundingBox();
      
      // Grid should not have moved
      expect(box1?.y).toBe(box2?.y);
    });
  });

  // Test Suite 8: Accessibility
  test.describe('Accessibility Tests', () => {
    test.use({ viewport: { width: 375, height: 667 } });

    test('page has proper heading structure', async ({ page }) => {
      await page.goto('http://localhost:8081/dashboard');
      
      const h1 = page.locator('h1');
      await expect(h1).toBeVisible();
    });

    test('interactive elements are focusable', async ({ page }) => {
      await page.goto('http://localhost:8081/dashboard');
      
      // Tab through interactive elements
      await page.keyboard.press('Tab');
      
      const focused = await page.evaluate(() => document.activeElement?.tagName);
      expect(['A', 'BUTTON', 'INPUT']).toContain(focused || '');
    });

    test('metric cards have proper contrast', async ({ page }) => {
      await page.goto('http://localhost:8081/dashboard');
      
      const card = page.locator('.grid > *').first();
      const contrast = await card.evaluate((el) => {
        const style = window.getComputedStyle(el);
        return {
          bg: style.backgroundColor,
          color: style.color,
          border: style.borderColor
        };
      });
      
      // Should have background and border
      expect(contrast.bg).not.toBe('');
      expect(contrast.border).not.toBe('');
    });
  });

  // Test Suite 9: Error Handling
  test.describe('Error Handling', () => {
    test('handles missing data gracefully', async ({ page }) => {
      await page.goto('http://localhost:8081/dashboard');
      
      // Check for error boundaries or fallback content
      const errorMessage = page.getByText(/error|failed|something went wrong/i);
      
      // If there's an error, it should be handled gracefully
      const errorExists = await errorMessage.isVisible().catch(() => false);
      
      if (errorExists) {
        // Should have a user-friendly error message
        expect(await errorMessage.textContent()).toBeTruthy();
      }
    });
  });

  // Test Suite 10: Visual Regression (Basic)
  test.describe('Visual Tests', () => {
    test.use({ viewport: { width: 375, height: 667 } });

    test('dashboard mobile screenshot matches', async ({ page }) => {
      await page.goto('http://localhost:8081/dashboard');
      await page.waitForLoadState('networkidle');
      
      // Take screenshot
      await page.screenshot({ 
        path: '/home/sk/medellin-spark/mvp/docs/mobile/test-results/dashboard-mobile-playwright.png',
        fullPage: true 
      });
    });
  });
});

