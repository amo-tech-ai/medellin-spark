/**
 * Full Journey Example - Pitch Deck Wizard
 *
 * Demonstrates: Complete multi-step user flow from start to finish
 * Duration: ~10-15 minutes
 */

import { PlaywrightMCP } from '../types';

export async function fullJourneyTest(browser: PlaywrightMCP) {
  console.log('🚀 Starting full pitch deck wizard journey...\n');

  const results = {
    phases: [] as string[],
    screenshots: [] as string[],
    conversationExchanges: 0,
    slidesGenerated: 0,
    errors: [] as string[]
  };

  try {
    // ====================
    // PHASE 1: Setup & Navigation
    // ====================
    console.log('📍 PHASE 1: Setup & Navigation');
    await browser.navigate({ url: 'http://localhost:8080/pitch-deck-wizard' });
    await browser.waitFor({ text: 'Create Pitch Deck', timeout: 5000 });

    await browser.screenshot({ filename: '01-wizard-loaded.png' });
    results.screenshots.push('01-wizard-loaded.png');
    results.phases.push('✅ Wizard loaded');

    // ====================
    // PHASE 2: AI Conversation
    // ====================
    console.log('\n📍 PHASE 2: AI Conversation & Data Collection');

    const messages = [
      'I want to create a pitch deck for AI Code Assistant, a developer productivity tool',
      'We target software developers in enterprise companies',
      'The problem is repetitive coding tasks waste developer time',
      'Our solution uses AI to autocomplete code and suggest improvements',
      'We charge $20 per month per developer, SaaS model',
      'We have 500 beta users and $50K MRR'
    ];

    for (let i = 0; i < messages.length; i++) {
      console.log(`  💬 Sending message ${i + 1}/${messages.length}...`);

      await browser.type({
        element: 'Chat input',
        ref: 'input-chat',
        text: messages[i]
      });

      await browser.click({
        element: 'Send button',
        ref: 'btn-send'
      });

      // Wait for AI response
      await browser.waitFor({ time: 8000 });

      results.conversationExchanges++;

      // Check progress
      const snapshot = await browser.snapshot();
      const hasProgress = snapshot.includes('progress') || snapshot.includes('%');
      console.log(`     Progress indicator: ${hasProgress ? 'visible' : 'not visible'}`);

      if ((i + 1) % 2 === 0) {
        await browser.screenshot({
          filename: `02-conversation-${i + 1}.png`
        });
        results.screenshots.push(`02-conversation-${i + 1}.png`);
      }

      // Small delay between messages
      await browser.waitFor({ time: 2000 });
    }

    results.phases.push(`✅ Conversation: ${results.conversationExchanges} exchanges`);

    // ====================
    // PHASE 3: Deck Generation
    // ====================
    console.log('\n📍 PHASE 3: Deck Generation');

    // Wait for Generate button to appear
    console.log('  ⏳ Waiting for Generate Deck button...');
    await browser.waitFor({ text: 'Generate', timeout: 30000 });

    await browser.screenshot({ filename: '03-ready-to-generate.png' });
    results.screenshots.push('03-ready-to-generate.png');

    // Click Generate
    console.log('  🔄 Generating deck...');
    await browser.click({
      element: 'Generate Deck button',
      ref: 'btn-generate'
    });

    // Wait for generation (can take 10-30 seconds)
    await browser.waitFor({ text: 'Generating', timeout: 5000 });

    await browser.screenshot({ filename: '04-generating.png' });
    results.screenshots.push('04-generating.png');

    // Wait for redirect to slides view
    console.log('  ⏳ Waiting for generation to complete...');
    await browser.waitFor({ text: 'Slide', timeout: 45000 });

    results.phases.push('✅ Deck generated');

    // ====================
    // PHASE 4: Slide Validation
    // ====================
    console.log('\n📍 PHASE 4: Slide Validation');

    // Take screenshot of slides
    await browser.screenshot({ filename: '05-slides-view.png', fullPage: true });
    results.screenshots.push('05-slides-view.png');

    // Count slides
    const slidesSnapshot = await browser.snapshot();
    const slidePattern = /slide/gi;
    const slideMatches = slidesSnapshot.match(slidePattern) || [];
    results.slidesGenerated = slideMatches.length;

    console.log(`  📊 Detected ${results.slidesGenerated} slide references`);

    if (results.slidesGenerated < 8) {
      const error = `Only ${results.slidesGenerated} slides found, expected 10`;
      console.warn(`  ⚠️  ${error}`);
      results.errors.push(error);
    } else {
      results.phases.push(`✅ ${results.slidesGenerated} slides generated`);
    }

    // Verify expected slide types
    const expectedSlides = [
      'Problem',
      'Solution',
      'Product',
      'Market',
      'Business Model',
      'Team',
      'Traction',
      'Ask'
    ];

    let foundSlides = 0;
    for (const slideType of expectedSlides) {
      const found = slidesSnapshot.toLowerCase().includes(slideType.toLowerCase());
      if (found) {
        foundSlides++;
        console.log(`  ✅ Found slide: ${slideType}`);
      } else {
        console.log(`  ⚠️  Missing slide: ${slideType}`);
      }
    }

    console.log(`  📈 Found ${foundSlides}/${expectedSlides.length} expected slide types`);

    // Click first slide to test interaction
    console.log('\n  🔍 Testing slide interaction...');
    await browser.click({
      element: 'First slide',
      ref: 'slide-1'
    });

    await browser.waitFor({ time: 2000 });
    await browser.screenshot({ filename: '06-slide-detail.png' });
    results.screenshots.push('06-slide-detail.png');

    results.phases.push('✅ Slide interaction works');

    // ====================
    // PHASE 5: Final Verification
    // ====================
    console.log('\n📍 PHASE 5: Final Verification');

    // Check console errors
    const consoleErrors = await browser.consoleMessages({ onlyErrors: true });
    if (consoleErrors.length > 0) {
      const error = `Console errors: ${consoleErrors.length}`;
      console.warn(`  ⚠️  ${error}`);
      results.errors.push(error);
    } else {
      console.log('  ✅ No console errors');
    }

    // Check network requests
    const requests = await browser.networkRequests();
    const apiCalls = requests.filter(r =>
      r.url.includes('/functions/v1/') ||
      r.url.includes('/pitch-deck-assistant') ||
      r.url.includes('/generate-pitch-deck')
    );

    console.log(`  📡 Network: ${requests.length} total, ${apiCalls.length} API calls`);

    const failedCalls = apiCalls.filter(r => r.status >= 400);
    if (failedCalls.length > 0) {
      const error = `Failed API calls: ${failedCalls.length}`;
      console.warn(`  ⚠️  ${error}`);
      results.errors.push(error);
    } else {
      console.log('  ✅ All API calls successful');
    }

    // Final screenshot
    await browser.screenshot({ filename: '07-final-state.png', fullPage: true });
    results.screenshots.push('07-final-state.png');

    // ====================
    // Summary
    // ====================
    console.log('\n' + '='.repeat(60));
    console.log('✅ FULL JOURNEY COMPLETE');
    console.log('='.repeat(60));
    console.log(`Phases: ${results.phases.join(' → ')}`);
    console.log(`Conversation exchanges: ${results.conversationExchanges}`);
    console.log(`Slides generated: ${results.slidesGenerated}`);
    console.log(`Screenshots: ${results.screenshots.length}`);
    console.log(`Errors: ${results.errors.length}`);

    if (results.errors.length > 0) {
      console.log('\n⚠️  Warnings:');
      results.errors.forEach(error => console.log(`  - ${error}`));
    }

    return {
      success: results.errors.length === 0,
      ...results
    };

  } catch (error) {
    console.error('\n❌ Journey failed:', error);
    results.errors.push(`Fatal error: ${error}`);
    throw error;
  }
}

// Type definitions
type PlaywrightMCP = {
  navigate: (opts: { url: string; timeout?: number }) => Promise<void>;
  snapshot: () => Promise<string>;
  screenshot: (opts: { filename: string; fullPage?: boolean }) => Promise<void>;
  click: (opts: { element: string; ref: string }) => Promise<void>;
  type: (opts: { element: string; ref: string; text: string }) => Promise<void>;
  waitFor: (opts: { text?: string; time?: number; timeout?: number }) => Promise<void>;
  consoleMessages: (opts: { onlyErrors?: boolean }) => Promise<any[]>;
  networkRequests: () => Promise<any[]>;
};

// Usage example
if (require.main === module) {
  console.log('Run this with Playwright MCP server active');
  console.log('Example: npx @playwright/mcp < examples/full-journey.ts');
}
