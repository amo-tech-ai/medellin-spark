import { test as base } from '@playwright/test';

/**
 * Authentication Fixtures
 * Provides authenticated Playwright context for tests
 */

// Development test user UUID
export const DEV_USER_ID = '00000000-0000-0000-0000-000000000000';

// Test user credentials (if using real auth)
export const TEST_USER_EMAIL = process.env.TEST_USER_EMAIL || 'test@medellinspark.com';
export const TEST_USER_PASSWORD = process.env.TEST_USER_PASSWORD || 'test123456';

/**
 * Extended test with authenticated session
 * Usage: import { test } from './fixtures/auth';
 */
export const test = base.extend({
  // Add authenticated context
  authenticatedPage: async ({ page }, use) => {
    // Option 1: Load saved auth state (if available)
    // await context.addCookies([...savedCookies]);
    
    // Option 2: Perform login flow
    // await page.goto('/auth');
    // await page.fill('input[type="email"]', TEST_USER_EMAIL);
    // await page.fill('input[type="password"]', TEST_USER_PASSWORD);
    // await page.click('button:has-text("Sign In")');
    // await page.waitForURL('/dashboard');

    // Option 3: Set localStorage auth state (dev mode)
    await page.goto('/');
    await page.evaluate((userId) => {
      localStorage.setItem('supabase.auth.token', JSON.stringify({
        access_token: 'dev-token',
        user: { id: userId }
      }));
    }, DEV_USER_ID);

    // Use the authenticated page
    await use(page);
  },
});

export { expect } from '@playwright/test';
