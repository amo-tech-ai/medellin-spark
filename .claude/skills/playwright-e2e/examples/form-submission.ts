/**
 * Form Submission Example
 *
 * Demonstrates: Form filling, validation, submission flow
 */

import { PlaywrightMCP } from '../types';

export async function formSubmissionTest(browser: PlaywrightMCP) {
  console.log('🚀 Starting form submission test...\n');

  try {
    // Step 1: Navigate to form page
    console.log('Step 1: Navigate to contact form');
    await browser.navigate({ url: 'http://localhost:8080/contact' });

    // Step 2: Take snapshot to see form structure
    console.log('Step 2: Taking form snapshot');
    const snapshot = await browser.snapshot();
    console.log('Form elements found:', snapshot.includes('input') ? 'Yes' : 'No');

    // Step 3: Fill form using fillForm (multiple fields at once)
    console.log('Step 3: Filling form fields');
    await browser.fillForm({
      fields: [
        {
          name: 'Name',
          type: 'textbox',
          ref: 'input-name',
          value: 'John Doe'
        },
        {
          name: 'Email',
          type: 'textbox',
          ref: 'input-email',
          value: 'john@example.com'
        },
        {
          name: 'Message',
          type: 'textbox',
          ref: 'textarea-message',
          value: 'This is a test message from E2E automation.'
        },
        {
          name: 'Newsletter',
          type: 'checkbox',
          ref: 'checkbox-newsletter',
          value: 'true'
        }
      ]
    });

    // Step 4: Screenshot filled form
    console.log('Step 4: Taking screenshot of filled form');
    await browser.screenshot({
      filename: 'form-filled.png',
      fullPage: false
    });

    // Step 5: Submit form
    console.log('Step 5: Submitting form');
    await browser.click({
      element: 'Submit button',
      ref: 'button-submit'
    });

    // Step 6: Wait for success message
    console.log('Step 6: Waiting for success message');
    await browser.waitFor({ text: 'Message sent', timeout: 10000 });

    // Step 7: Verify no errors
    console.log('Step 7: Checking for errors');
    const errors = await browser.consoleMessages({ onlyErrors: true });

    if (errors.length > 0) {
      console.error('❌ Console errors found:', errors);
      throw new Error(`Found ${errors.length} console errors`);
    }

    console.log('✅ No console errors');

    // Step 8: Screenshot success state
    console.log('Step 8: Taking success screenshot');
    await browser.screenshot({
      filename: 'form-success.png',
      fullPage: false
    });

    // Step 9: Verify network request was made
    console.log('Step 9: Verifying network request');
    const requests = await browser.networkRequests();
    const submitRequest = requests.find(r => r.method === 'POST' && r.url.includes('/contact'));

    if (!submitRequest) {
      console.error('❌ No POST request to /contact found');
      throw new Error('Form submission request not detected');
    }

    console.log('✅ Form submission request successful');
    console.log(`   Status: ${submitRequest.status}`);

    console.log('\n✅ Form submission test complete!');

    return {
      success: true,
      formFilled: true,
      submitted: true,
      consoleErrors: errors.length,
      networkStatus: submitRequest.status
    };

  } catch (error) {
    console.error('❌ Test failed:', error);
    throw error;
  }
}

// Type definitions (minimal example)
type PlaywrightMCP = {
  navigate: (opts: { url: string }) => Promise<void>;
  snapshot: () => Promise<string>;
  screenshot: (opts: { filename: string; fullPage?: boolean }) => Promise<void>;
  fillForm: (opts: { fields: any[] }) => Promise<void>;
  click: (opts: { element: string; ref: string }) => Promise<void>;
  waitFor: (opts: { text?: string; timeout?: number }) => Promise<void>;
  consoleMessages: (opts: { onlyErrors?: boolean }) => Promise<any[]>;
  networkRequests: () => Promise<any[]>;
};

// Usage example
if (require.main === module) {
  console.log('Run this with Playwright MCP server active');
  console.log('Example: npx @playwright/mcp < examples/form-submission.ts');
}
