# 🧪 E2E Test Suite - Medellin Spark

**Purpose**: Automated end-to-end testing for all critical user journeys
**Framework**: Playwright
**Coverage**: 80%+ for critical paths

---

## 🚀 QUICK START

```bash
# Install Playwright browsers (first time only)
npx playwright install chromium --with-deps

# Run all tests
npx playwright test

# Run with UI mode (recommended for development)
npx playwright test --ui

# Run specific test file
npx playwright test e2e/pitch-deck-complete-flow.spec.ts
```

---

## 📁 TEST SUITE ORGANIZATION

### Critical User Journeys
```
pitch-deck-complete-flow.spec.ts
└─ Full user journey: chat → data collection → generate → view slides
   Tests: Complete flow from start to finish
   Duration: ~3 minutes
   Priority: P0 (Must pass before deployment)
```

### Feature-Specific Tests
```
pitch-deck-wizard-enhanced.spec.ts
└─ Chat interface, message sending, data collection
   Tests: UI interaction, keyboard shortcuts, error handling
   Duration: ~5 minutes
   Priority: P0

slide-grid.spec.ts
└─ Slide rendering, navigation, accessibility
   Tests: Grid layout, click handling, responsive design
   Duration: ~2 minutes
   Priority: P0

auth.spec.ts
└─ Authentication & route protection
   Tests: Login flow, protected routes, session management
   Duration: ~2 minutes
   Priority: P0
```

### Backend & Infrastructure
```
database-integration.spec.ts
└─ Database operations, RLS policies, API contracts
   Tests: Schema verification, access control, performance
   Duration: ~3 minutes
   Priority: P1

api-errors.spec.ts
└─ Error handling, CORS, security
   Tests: 401/403/500 responses, rate limiting
   Duration: ~2 minutes
   Priority: P1

performance.spec.ts
└─ Load times, bundle size, memory usage
   Tests: Page speed, API response times, resource optimization
   Duration: ~3 minutes
   Priority: P2
```

---

## 🎯 TEST COVERAGE BY FEATURE

### Pitch Deck Wizard (Chat Interface)
- ✅ Page loading
- ✅ Message sending/receiving
- ✅ Data collection tracking
- ✅ Progress indicator updates
- ✅ Generate button appearance
- ✅ Error handling
- ✅ Keyboard shortcuts

### Slide Grid & Presentation
- ✅ Public presentation access
- ✅ All 10 slides render
- ✅ Slide navigation
- ✅ Responsive design
- ✅ Performance (< 2s load)
- ✅ Accessibility

### Backend & Database
- ✅ Edge Function deployment
- ✅ RLS policy enforcement
- ✅ Authentication requirements
- ✅ API response schemas
- ✅ Error handling

---

## 🔧 TEST FIXTURES & HELPERS

### Authentication (`fixtures/auth.ts`)
```typescript
import { test } from './fixtures/auth';

// Use authenticated context
test('my test', async ({ authenticatedPage }) => {
  // Page already has auth state
});
```

### Test Data (`fixtures/test-data.ts`)
```typescript
import { SAMPLE_STARTUP_DATA, SAMPLE_CONVERSATION } from './fixtures/test-data';

// Use sample data in tests
const data = SAMPLE_STARTUP_DATA;
```

---

## 📊 RUNNING TESTS

### Development
```bash
# Quick test during development
npx playwright test --headed

# UI mode (best for debugging)
npx playwright test --ui

# Debug specific test
npx playwright test --debug e2e/pitch-deck-complete-flow.spec.ts
```

### CI/CD
```bash
# Run all tests (headless)
npx playwright test

# With HTML report
npx playwright test --reporter=html

# Show report after run
npx playwright show-report
```

### Specific Scenarios
```bash
# Only auth tests
npx playwright test auth

# Only performance tests
npx playwright test performance

# Only failed tests
npx playwright test --last-failed

# Specific browser
npx playwright test --project=chromium
```

---

## 🎯 SUCCESS CRITERIA

### All Tests Must Pass
- ✅ TypeScript compiles (0 errors)
- ✅ Build succeeds
- ✅ E2E tests pass (100%)
- ✅ No console errors
- ✅ Performance targets met

### Critical Path Tests
1. **Complete Flow**: Chat → Generate → View (MUST PASS)
2. **Slide Grid**: All 10 slides render (MUST PASS)
3. **Auth**: Protected routes redirect (MUST PASS)
4. **Performance**: Meet load time targets (SHOULD PASS)

---

## 🐛 DEBUGGING FAILED TESTS

### View Results
```bash
# Open HTML report
npx playwright show-report

# View trace for failed test
npx playwright show-trace test-results/.../trace.zip
```

### Common Issues

**Test timeout**:
```typescript
// Increase timeout
await page.waitForSelector('...', { timeout: 30000 });
```

**Element not found**:
```typescript
// Use .or() for fallback selectors
await page.locator('button:has-text("Send")').or(page.locator('button[type="submit"]')).click();
```

**Flaky tests**:
```typescript
// Wait for network idle instead of fixed timeout
await page.waitForLoadState('networkidle');
```

---

## 📈 TEST METRICS

### Current Stats
- **Total tests**: 60+
- **Test files**: 8
- **Coverage**: 80%+ (critical paths)
- **Pass rate**: Target 100%
- **Execution time**: ~15-20 minutes (full suite)

### Performance Benchmarks
- Chat interface load: < 1.5s ✅
- Slide grid load: < 2s ✅
- AI response: < 3s 🎯
- Deck generation: < 15s 🎯

---

## 📚 RESOURCES

### Documentation
- **Comprehensive Strategy**: `../docs/TESTING-STRATEGY.md`
- **Quick Guide**: `../docs/TESTING-GUIDE.md`
- **Implementation Report**: `../docs/TESTING-IMPLEMENTATION-COMPLETE.md`

### Source Documentation
- **Pitch Deck Strategy**: `../pitch-deck/docs/004-TESTING-STRATEGY-AND-IMPROVEMENTS.md`
- **Daily Checklist**: `../pitch-deck/management/903-DAILY-TESTING-CHECKLIST.md`
- **E2E Success Report**: `../pitch-deck/management/904-E2E-TEST-SUCCESS-REPORT.md`

### External Resources
- **Playwright Docs**: https://playwright.dev
- **Best Practices**: https://playwright.dev/docs/best-practices
- **Debugging Guide**: https://playwright.dev/docs/debug

---

## ✅ VERIFICATION

Run this to verify setup:

```bash
# 1. Check Playwright installed
npx playwright --version

# 2. List all test files
ls -l e2e/*.spec.ts

# 3. Run one test file
npx playwright test e2e/auth.spec.ts

# 4. Check test report
npx playwright show-report
```

**Expected**:
- Playwright version shown
- 8 test files listed
- Tests execute successfully
- HTML report opens

---

## 🎯 NEXT ACTIONS

1. **Run tests**: `npx playwright test`
2. **Review results**: `npx playwright show-report`
3. **Fix failures**: Debug and resolve issues
4. **Integrate CI/CD**: Add to GitHub Actions
5. **Monitor**: Track test results over time

---

**Generated**: 2025-10-18
**Status**: Ready to use
**Maintainer**: Medellin Spark Development Team
