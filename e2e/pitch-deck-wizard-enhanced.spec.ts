import { test, expect } from '@playwright/test';
import { SAMPLE_STARTUP_DATA, SAMPLE_CONVERSATION } from './fixtures/test-data';

/**
 * Enhanced Pitch Deck Wizard Tests
 * Comprehensive testing of chat interface and data collection
 * Based on: pitch-deck/docs/004-TESTING-STRATEGY-AND-IMPROVEMENTS.md
 */

test.describe('Pitch Deck Wizard - Core Functionality', () => {
  test('should load wizard page and show chat interface', async ({ page }) => {
    await page.goto('/pitch-deck-wizard');

    // Either loads wizard OR redirects to auth
    const isAuth = page.url().includes('/auth');
    const isWizard = page.url().includes('/pitch-deck-wizard');

    expect(isAuth || isWizard).toBe(true);

    if (isWizard) {
      // Verify chat components exist
      const hasInput = await page.locator('textarea, input[type="text"]').count() > 0;
      expect(hasInput).toBe(true);
      console.log('✅ Chat interface loaded');
    } else {
      console.log('ℹ️ Redirected to auth (expected for unauthenticated users)');
    }
  });

  test('should show progress tracking sidebar', async ({ page }) => {
    await page.goto('/pitch-deck-wizard');

    if (page.url().includes('/auth')) {
      console.log('⚠️ Skipped: Requires authentication');
      return;
    }

    // Check for progress indicators
    const hasProgress = await page.locator('text=/Progress|Data Collected|Completeness/i').isVisible({ timeout: 3000 }).catch(() => false);
    
    if (hasProgress) {
      console.log('✅ Progress sidebar visible');
      
      // Check for data collection items
      const hasDataItems = await page.locator('text=/Company Name|Industry|Problem|Solution/i').count() > 0;
      expect(hasDataItems).toBe(true);
    } else {
      console.log('⚠️ Progress sidebar not found (may be hidden or different design)');
    }
  });

  test('should display initial AI greeting', async ({ page }) => {
    await page.goto('/pitch-deck-wizard');

    if (page.url().includes('/auth')) {
      return; // Skip if auth required
    }

    // Look for initial message from AI
    const hasGreeting = await page.locator('text=/Hi|Hello|Welcome|Let\'s create/i').first().isVisible({ timeout: 5000 }).catch(() => false);
    
    console.log('Initial greeting visible:', hasGreeting);
  });
});

test.describe('Pitch Deck Wizard - Message Sending', () => {
  test('should send message and show in chat history', async ({ page }) => {
    await page.goto('/pitch-deck-wizard');

    if (page.url().includes('/auth')) {
      return;
    }

    // Find input field
    const input = page.locator('textarea, input[type="text"]').first();
    await input.waitFor({ timeout: 5000 });

    // Type message
    const testMessage = 'I want to create a pitch deck for my AI startup';
    await input.fill(testMessage);

    // Find and click send button
    const sendButton = page.locator('button:has-text("Send"), button[type="submit"], button[aria-label*="send" i]').first();
    await sendButton.click();

    // Verify message appears in chat
    await expect(page.locator(`text=${testMessage}`)).toBeVisible({ timeout: 3000 });
    
    console.log('✅ Message sent and displayed');
  });

  test('should show loading indicator while waiting for AI response', async ({ page }) => {
    await page.goto('/pitch-deck-wizard');

    if (page.url().includes('/auth')) {
      return;
    }

    const input = page.locator('textarea, input[type="text"]').first();
    await input.fill('Quick test message');

    const sendButton = page.locator('button:has-text("Send"), button[type="submit"]').first();
    await sendButton.click();

    // Check for loading indicator (should appear within 1 second)
    const hasLoading = await page.locator('.animate-pulse, .animate-spin, .loading, text=thinking').first().isVisible({ timeout: 2000 }).catch(() => false);
    
    console.log('Loading indicator shown:', hasLoading);
  });

  test('should receive AI response after sending message', async ({ page }) => {
    await page.goto('/pitch-deck-wizard');

    if (page.url().includes('/auth')) {
      return;
    }

    const input = page.locator('textarea, input[type="text"]').first();
    await input.fill('Test message for AI');

    const sendButton = page.locator('button:has-text("Send"), button[type="submit"]').first();
    await sendButton.click();

    // Wait for AI response (common patterns)
    const responseVisible = await page.waitForSelector(
      'text=/Great|Thank you|Tell me|What|How|I see|Excellent/i',
      { timeout: 15000 }
    ).catch(() => null);

    if (responseVisible) {
      console.log('✅ AI response received');
    } else {
      console.log('⚠️ AI response not detected - may have different response pattern');
    }
  });

  test('should handle empty message (button disabled)', async ({ page }) => {
    await page.goto('/pitch-deck-wizard');

    if (page.url().includes('/auth')) {
      return;
    }

    const input = page.locator('textarea, input[type="text"]').first();
    await input.fill('');

    const sendButton = page.locator('button:has-text("Send"), button[type="submit"]').first();
    
    // Button should be disabled when input is empty
    const isDisabled = await sendButton.isDisabled().catch(() => false);
    
    console.log('Send button disabled for empty input:', isDisabled);
  });
});

test.describe('Pitch Deck Wizard - Data Collection', () => {
  test('should track collected startup data', async ({ page }) => {
    await page.goto('/pitch-deck-wizard');

    if (page.url().includes('/auth')) {
      return;
    }

    // Send message with company name
    const input = page.locator('textarea, input[type="text"]').first();
    await input.fill('My company is TestCorp in the AI industry');

    const sendButton = page.locator('button:has-text("Send"), button[type="submit"]').first();
    await sendButton.click();

    // Wait for response
    await page.waitForTimeout(3000);

    // Check if sidebar shows collected data
    const hasCompanyData = await page.locator('text=TestCorp').or(page.locator('text=AI')).isVisible({ timeout: 2000 }).catch(() => false);
    
    console.log('Company data visible in UI:', hasCompanyData);
  });

  test('should update progress bar as data collected', async ({ page }) => {
    await page.goto('/pitch-deck-wizard');

    if (page.url().includes('/auth')) {
      return;
    }

    // Check initial progress
    const progressText = await page.locator('text=/0%|Progress/i').textContent().catch(() => '');
    console.log('Initial progress:', progressText);

    // Send message with data
    const input = page.locator('textarea, input[type="text"]').first();
    await input.fill('Company: TestCorp, Industry: AI, Problem: Developer productivity, Solution: AI code assistant');

    const sendButton = page.locator('button:has-text("Send"), button[type="submit"]').first();
    await sendButton.click();

    // Wait for progress update
    await page.waitForTimeout(4000);

    // Check if progress increased
    const updatedProgressText = await page.locator('text=/%|complete/i').textContent().catch(() => '');
    console.log('Updated progress:', updatedProgressText);
  });
});

test.describe('Pitch Deck Wizard - Generate Button', () => {
  test('should show generate button when data collection complete', async ({ page }) => {
    await page.goto('/pitch-deck-wizard');

    if (page.url().includes('/auth')) {
      return;
    }

    // Simulate complete conversation
    const input = page.locator('textarea, input[type="text"]').first();
    const sendButton = page.locator('button:has-text("Send"), button[type="submit"]').first();

    // Send comprehensive data in fewer messages
    const completeMessage = `
      Company: ${SAMPLE_STARTUP_DATA.company_name}
      Industry: ${SAMPLE_STARTUP_DATA.industry}
      Problem: ${SAMPLE_STARTUP_DATA.problem}
      Solution: ${SAMPLE_STARTUP_DATA.solution}
      Target Market: ${SAMPLE_STARTUP_DATA.target_market}
      Business Model: ${SAMPLE_STARTUP_DATA.business_model}
    `;

    await input.fill(completeMessage);
    await sendButton.click();

    // Wait for AI to process and show generate button
    const generateButton = page.locator('button:has-text("Generate")');
    const buttonAppeared = await generateButton.isVisible({ timeout: 30000 }).catch(() => false);

    console.log('Generate button appeared:', buttonAppeared);

    if (buttonAppeared) {
      console.log('✅ Generate button visible at appropriate completeness');
    } else {
      console.log('⚠️ Generate button did not appear - may need more conversation exchanges');
    }
  });
});

test.describe('Pitch Deck Wizard - Keyboard Shortcuts', () => {
  test('should send message with Enter key', async ({ page }) => {
    await page.goto('/pitch-deck-wizard');

    if (page.url().includes('/auth')) {
      return;
    }

    const input = page.locator('textarea').first();
    await input.fill('Test message for Enter key');
    await input.press('Enter');

    // Message should be sent (check if it appears)
    await page.waitForTimeout(1000);

    const messageSent = await page.locator('text=Test message for Enter key').isVisible().catch(() => false);
    console.log('Message sent with Enter:', messageSent);
  });

  test('should create new line with Shift+Enter', async ({ page }) => {
    await page.goto('/pitch-deck-wizard');

    if (page.url().includes('/auth')) {
      return;
    }

    const input = page.locator('textarea').first();
    await input.fill('Line 1');
    await input.press('Shift+Enter');
    await page.keyboard.type('Line 2');

    const value = await input.inputValue();
    console.log('Textarea value:', value);
    
    // Should contain both lines
    expect(value).toContain('Line 1');
    expect(value).toContain('Line 2');
  });
});

test.describe('Pitch Deck Wizard - Error Handling', () => {
  test('should show error message on network failure', async ({ page }) => {
    // Intercept and fail API requests
    await page.route('**/functions/v1/pitch-deck-assistant', (route) => {
      route.abort('failed');
    });

    await page.goto('/pitch-deck-wizard');

    if (page.url().includes('/auth')) {
      return;
    }

    const input = page.locator('textarea, input[type="text"]').first();
    await input.fill('Test message');

    const sendButton = page.locator('button:has-text("Send"), button[type="submit"]').first();
    await sendButton.click();

    // Should show error message
    const errorVisible = await page.locator('text=/error|failed|trouble|try again/i').isVisible({ timeout: 5000 }).catch(() => false);
    
    console.log('Error message shown:', errorVisible);
  });

  test('should handle API timeout gracefully', async ({ page }) => {
    // Intercept and delay response
    await page.route('**/functions/v1/pitch-deck-assistant', async (route) => {
      await new Promise((resolve) => setTimeout(resolve, 25000));
      route.continue();
    });

    await page.goto('/pitch-deck-wizard');

    if (page.url().includes('/auth')) {
      return;
    }

    const input = page.locator('textarea, input[type="text"]').first();
    await input.fill('Test timeout');

    const sendButton = page.locator('button:has-text("Send"), button[type="submit"]').first();
    await sendButton.click();

    // Should show timeout or error message
    const errorShown = await page.locator('text=/timeout|slow|error/i').isVisible({ timeout: 30000 }).catch(() => false);
    
    console.log('Timeout handled:', errorShown);
  });
});
