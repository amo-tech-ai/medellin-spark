/**
 * Basic Navigation Example
 *
 * Demonstrates: Navigation, snapshot, screenshot, console checks
 */

import { PlaywrightMCP } from '../types';

export async function basicNavigationTest(browser: PlaywrightMCP) {
  console.log('🚀 Starting basic navigation test...\n');

  try {
    // Step 1: Navigate to homepage
    console.log('Step 1: Navigate to homepage');
    await browser.navigate({ url: 'http://localhost:8080' });

    // Step 2: Take page snapshot
    console.log('Step 2: Taking page snapshot');
    const snapshot = await browser.snapshot();
    console.log('Snapshot length:', snapshot.length, 'characters');

    // Step 3: Take screenshot
    console.log('Step 3: Taking screenshot');
    await browser.screenshot({
      filename: 'homepage.png',
      fullPage: false
    });

    // Step 4: Check console for errors
    console.log('Step 4: Checking console');
    const consoleMessages = await browser.consoleMessages({ onlyErrors: true });

    if (consoleMessages.length > 0) {
      console.error('❌ Console errors found:', consoleMessages);
      throw new Error(`Found ${consoleMessages.length} console errors`);
    }

    console.log('✅ No console errors');

    // Step 5: Verify network health
    console.log('Step 5: Checking network requests');
    const requests = await browser.networkRequests();
    const apiCalls = requests.filter(r =>
      r.url.includes('/api/') || r.url.includes('/functions/')
    );

    console.log(`Total requests: ${requests.length}`);
    console.log(`API calls: ${apiCalls.length}`);

    const failedCalls = apiCalls.filter(r => r.status >= 400);
    if (failedCalls.length > 0) {
      console.error('❌ Failed API calls:', failedCalls);
      throw new Error(`${failedCalls.length} API calls failed`);
    }

    console.log('✅ All API calls successful');

    console.log('\n✅ Basic navigation test complete!');

    return {
      success: true,
      snapshot: snapshot.substring(0, 200) + '...',
      consoleErrors: consoleMessages.length,
      networkCalls: apiCalls.length
    };

  } catch (error) {
    console.error('❌ Test failed:', error);
    throw error;
  }
}

// Type definitions (minimal example)
// In real usage, import from @playwright/mcp types
type PlaywrightMCP = {
  navigate: (opts: { url: string }) => Promise<void>;
  snapshot: () => Promise<string>;
  screenshot: (opts: { filename: string; fullPage?: boolean }) => Promise<void>;
  consoleMessages: (opts: { onlyErrors?: boolean }) => Promise<any[]>;
  networkRequests: () => Promise<any[]>;
};

// Usage example
if (require.main === module) {
  console.log('Run this with Playwright MCP server active');
  console.log('Example: npx @playwright/mcp < examples/basic-navigation.ts');
}
