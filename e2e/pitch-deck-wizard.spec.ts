import { test, expect } from '@playwright/test';

test.describe('Pitch Deck Wizard - UI and Interaction', () => {
  test.beforeEach(async ({ page }) => {
    // Note: This test assumes user is authenticated
    // In a real test, you would use Supabase auth state or mock auth
    await page.goto('/pitch-deck-wizard');
  });

  test('should show authentication requirement when not logged in', async ({ page }) => {
    // Should redirect to auth page
    await expect(page).toHaveURL(/\/auth/);
  });

  test.describe('When authenticated', () => {
    // These tests require actual authentication
    // In production, you would:
    // 1. Use Supabase test user credentials
    // 2. Or mock the auth state using localStorage/cookies
    // 3. Or use Playwright's storage state to save authenticated session

    test.skip('should load wizard with initial AI message', async ({ page }) => {
      // This test is skipped because it requires authentication
      // To enable: Set up test user or mock auth state

      await page.goto('/pitch-deck-wizard');

      // Check header
      await expect(page.locator('text=Pitch Deck AI')).toBeVisible();

      // Check initial AI message
      await expect(page.locator('text=Hi! I\'m Claude')).toBeVisible();

      // Check input area
      await expect(page.locator('textarea[placeholder*="Type your message"]')).toBeVisible();

      // Check progress sidebar
      await expect(page.locator('text=Progress')).toBeVisible();
      await expect(page.locator('text=0% complete')).toBeVisible();
    });

    test.skip('should send message and receive response', async ({ page }) => {
      // This test requires authentication + mocked Edge Function

      await page.goto('/pitch-deck-wizard');

      const input = page.locator('textarea[placeholder*="Type your message"]');
      await input.fill('My startup is a SaaS platform for AI-powered presentations');

      await page.click('button:has-text("Send")');

      // Should show typing indicator
      await expect(page.locator('.animate-bounce').first()).toBeVisible({ timeout: 2000 });

      // Wait for response (with timeout)
      await expect(page.locator('.animate-bounce').first()).not.toBeVisible({ timeout: 30000 });

      // Check that new message appeared
      const messages = page.locator('[role="assistant"]');
      await expect(messages).toHaveCount({ greaterThan: 1 });
    });

    test.skip('should update progress as data is collected', async ({ page }) => {
      // This test requires authentication + conversation state

      await page.goto('/pitch-deck-wizard');

      // Initial progress should be 0%
      await expect(page.locator('text=0% complete')).toBeVisible();

      // After collecting some data, progress should increase
      // (This would be tested with actual conversation flow)
    });

    test.skip('should show Generate Deck button when ready', async ({ page }) => {
      // This test requires authentication + complete conversation

      await page.goto('/pitch-deck-wizard');

      // Generate button should not be visible initially
      await expect(page.locator('button:has-text("Generate Deck")')).not.toBeVisible();

      // After completing conversation, button should appear
      // (This would be tested with actual conversation flow)
    });

    test.skip('should collect and display data in sidebar', async ({ page }) => {
      // This test requires authentication + conversation state

      await page.goto('/pitch-deck-wizard');

      // Check data collection checklist
      await expect(page.locator('text=Data Collected')).toBeVisible();

      // Check for data items
      await expect(page.locator('text=Company Name')).toBeVisible();
      await expect(page.locator('text=Industry')).toBeVisible();
      await expect(page.locator('text=Problem')).toBeVisible();
      await expect(page.locator('text=Solution')).toBeVisible();
    });
  });
});

test.describe('Pitch Deck Wizard - Keyboard Shortcuts', () => {
  test.skip('should send message with Enter key', async ({ page }) => {
    // Requires authentication

    await page.goto('/pitch-deck-wizard');

    const input = page.locator('textarea[placeholder*="Type your message"]');
    await input.fill('Test message');
    await input.press('Enter');

    // Message should be sent
    await expect(page.locator('text=Test message')).toBeVisible();
  });

  test.skip('should create new line with Shift+Enter', async ({ page }) => {
    // Requires authentication

    await page.goto('/pitch-deck-wizard');

    const input = page.locator('textarea[placeholder*="Type your message"]');
    await input.fill('Line 1');
    await input.press('Shift+Enter');
    await input.type('Line 2');

    // Textarea should contain both lines
    await expect(input).toHaveValue('Line 1\nLine 2');
  });
});
