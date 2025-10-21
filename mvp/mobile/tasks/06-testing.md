# Week 6: Mobile Testing

**Goal**: Verify everything works on mobile devices
**Time**: 1 week (2 days fundamentals + 3 days advanced)

---

## Fundamentals

### Task 1: Chrome DevTools Mobile Testing

**What**: Test on simulated mobile devices (free, fast, good for development)

**Tool**: Chrome DevTools Device Toolbar

**Steps**:
1. Open Chrome DevTools (F12)
2. Click Toggle Device Toolbar (Ctrl+Shift+M)
3. Test on multiple devices

**Devices to test**:
```
iOS Devices:
- iPhone SE (375×667) - Smallest iPhone
- iPhone 12 Pro (390×844) - Standard iPhone
- iPhone 14 Pro Max (430×932) - Large iPhone
- iPad Air (820×1180) - Tablet

Android Devices:
- Galaxy S20 (360×800) - Small Android
- Pixel 7 (412×915) - Standard Android
- Galaxy Tab S8 (753×1037) - Tablet
```

**Test checklist**:
```
Dashboard:
[ ] Grid displays 1 column on iPhone SE
[ ] Cards are tappable (44px+ height)
[ ] Header stays sticky when scrolling
[ ] No horizontal scroll

Navigation:
[ ] Bottom nav shows on mobile
[ ] Hamburger menu opens drawer
[ ] Menu items are easy to tap
[ ] Safe-area spacing on iPhone 14 Pro (notch)

Chat (Wizard):
[ ] Messages are full-width
[ ] Input stays at bottom when keyboard opens
[ ] Send button is 48px × 48px
[ ] Progress bar updates correctly

Forms:
[ ] No zoom when focusing inputs (16px font)
[ ] Correct keyboard for each field type
[ ] Submit button is full-width on mobile
[ ] Event cards stack vertically

Performance:
[ ] Initial load < 2 seconds
[ ] Smooth scrolling (no lag)
[ ] Images load progressively
```

**Success Criteria**:
- ✅ All pages load correctly on all device sizes
- ✅ No horizontal scrolling on any page
- ✅ Touch targets are 44×44px minimum
- ✅ Text is readable without zooming
- ✅ All interactions work (tap, scroll, type)

**Test**:
```bash
# Start dev server
pnpm dev

# Open http://localhost:8080 in Chrome
# Press F12 → Toggle Device Toolbar (Ctrl+Shift+M)
# Select device → Test all pages
# Rotate to landscape → Verify layout
```

---

### Task 2: Lighthouse Mobile Audit

**What**: Automated testing for performance, accessibility, best practices

**Tool**: Chrome Lighthouse (built-in)

**Steps**:
1. Open page in Chrome
2. Open DevTools (F12) → Lighthouse tab
3. Select "Mobile" + check all categories
4. Run audit

**Target scores**:
```
Performance:      ≥ 80 (Green)
Accessibility:    ≥ 90 (Green)
Best Practices:   ≥ 90 (Green)
SEO:             ≥ 80 (Green)
PWA:             N/A (optional)
```

**Common issues and fixes**:
```
Performance < 80:
→ Check bundle size (should be < 500KB)
→ Enable code splitting (Week 5 Task 1)
→ Optimize images (Week 5 Task 2)

Accessibility < 90:
→ Missing alt text on images
→ Insufficient color contrast
→ Missing ARIA labels
→ Touch targets too small

Best Practices < 90:
→ console.log in production
→ Images not using correct sizes
→ Missing HTTPS (local dev only)
```

**Success Criteria**:
- ✅ Performance score ≥ 80
- ✅ Accessibility score ≥ 90
- ✅ Best Practices score ≥ 90
- ✅ All critical issues fixed
- ✅ No red/orange warnings in console

**Test**:
```bash
# Production build
pnpm build
pnpm preview

# Open http://localhost:4173
# DevTools → Lighthouse → Analyze page load
# Fix any issues scoring < 80
```

---

### Task 3: Manual User Journey Test

**What**: Complete end-to-end flow on mobile simulation

**Device**: iPhone 12 Pro (390×844)

**User journey**:
```
1. Landing → Dashboard
   [ ] Navigate to http://localhost:8080
   [ ] Click "Get Started" or "Dashboard"
   [ ] Dashboard loads in < 2s
   [ ] Metrics cards display correctly

2. Dashboard → Events
   [ ] Tap "Events" in bottom nav
   [ ] Events page loads
   [ ] Event cards stack vertically
   [ ] Tap an event card
   [ ] Event details load

3. Events → Create Event
   [ ] Tap "Create Event" button
   [ ] Form loads
   [ ] Tap date field → Date picker appears
   [ ] Fill all fields (no zoom when focusing)
   [ ] Tap "Submit"
   [ ] Success message shows

4. Events → Pitch Deck Wizard
   [ ] Tap "Decks" in bottom nav
   [ ] Navigate to Wizard
   [ ] Chat interface loads
   [ ] Send message: "I want to create a pitch deck"
   [ ] AI responds (< 3s)
   [ ] Progress bar updates
   [ ] Continue conversation (3-4 exchanges)
   [ ] Progress reaches 80%+
   [ ] "Generate Deck" button appears
   [ ] Tap "Generate Deck"
   [ ] Redirects to presentation outline
   [ ] All 10 slides render

5. Navigation Test
   [ ] Tap hamburger menu
   [ ] Drawer slides from left
   [ ] Tap menu item
   [ ] Drawer closes
   [ ] Page navigates correctly

6. Rotate Device
   [ ] Rotate to landscape
   [ ] Layout adapts correctly
   [ ] Rotate back to portrait
   [ ] No broken layouts
```

**Success Criteria**:
- ✅ Complete journey works without errors
- ✅ No console errors at any step
- ✅ All interactions feel responsive
- ✅ Page transitions are smooth
- ✅ No layout breaks on rotation
- ✅ User can complete all core tasks

**Test**:
```bash
# Chrome DevTools → iPhone 12 Pro
# Follow journey step-by-step
# Document any issues found
```

---

## Fundamentals Summary

**What you tested**:
- ✅ Multi-device testing (Chrome DevTools)
- ✅ Performance audit (Lighthouse)
- ✅ End-to-end user journey

**Success Check**:
- [ ] Tested on 7+ device sizes
- [ ] Lighthouse scores all ≥ 80
- [ ] Complete user journey works
- [ ] No critical bugs found

**Time**: ~2 days

---

## Advanced Features (Optional)

### Advanced 1: Real Device Testing

**What**: Test on actual phones/tablets (most accurate)

**When to use**: Before production launch

**Options**:

**Option A: BrowserStack (Paid - $39/month)**
```
1. Sign up at browserstack.com
2. Select device (iPhone 14, Galaxy S22, etc.)
3. Enter URL: https://your-staging-url.com
4. Test interactively
5. Take screenshots for documentation

Pros: Real devices, many options
Cons: Paid, slower than local testing
```

**Option B: Physical Devices (Free)**
```
1. Deploy to staging (Vercel/Netlify)
2. Open on your iPhone/Android
3. Test all features
4. Use Safari/Chrome DevTools for debugging

Pros: Free, most accurate
Cons: Need access to devices
```

**Test checklist (real devices)**:
```
[ ] Touch gestures work (tap, swipe, scroll)
[ ] Keyboard behavior correct (no zoom on focus)
[ ] Safe area spacing on iPhone notch
[ ] Back button works (Android)
[ ] Pull-to-refresh works (if implemented)
[ ] Performance feels smooth
[ ] Battery drain acceptable
[ ] Works on WiFi and cellular (3G/4G/5G)
```

**Success Criteria**:
- ✅ Works on iOS 15+ (iPhone)
- ✅ Works on Android 11+ (Samsung, Pixel)
- ✅ Works on tablets (iPad, Android tablets)
- ✅ No device-specific bugs

**Time**: +8 hours

---

### Advanced 2: Automated E2E Testing (Playwright)

**What**: Automated tests that simulate real user interactions

**When to use**: For regression testing, CI/CD

**Install**:
```bash
pnpm add -D @playwright/test
npx playwright install chromium
```

**Create test**:
```typescript
// e2e/mobile-journey.spec.ts
import { test, expect, devices } from '@playwright/test';

test.use(devices['iPhone 12']);

test('complete pitch deck creation on mobile', async ({ page }) => {
  // 1. Navigate to wizard
  await page.goto('http://localhost:8080/pitch-deck-wizard');

  // 2. Verify chat interface loads
  await expect(page.locator('input[placeholder*="message"]')).toBeVisible();

  // 3. Send first message
  await page.fill('input[placeholder*="message"]', 'Create a pitch deck for AI startup');
  await page.click('button[type="submit"]');

  // 4. Wait for AI response
  await page.waitForSelector('text=/Great|Tell me|What/', { timeout: 10000 });

  // 5. Verify progress bar
  await expect(page.locator('[role="progressbar"]')).toBeVisible();

  // 6. Continue conversation
  await page.fill('input', 'Software development industry');
  await page.click('button[type="submit"]');
  await page.waitForTimeout(2000);

  await page.fill('input', 'Helps developers write code faster');
  await page.click('button[type="submit"]');
  await page.waitForTimeout(2000);

  // 7. Wait for Generate button (80% progress)
  await expect(page.locator('button:has-text("Generate")')).toBeVisible({ timeout: 30000 });

  // 8. Generate deck
  await page.click('button:has-text("Generate")');

  // 9. Verify redirect to outline
  await page.waitForURL(/\/presentations\/.*\/outline/, { timeout: 20000 });

  // 10. Verify slides render
  await expect(page.locator('[data-slide-number]')).toHaveCount(10);
});

test('bottom navigation works', async ({ page }) => {
  await page.goto('http://localhost:8080/dashboard');

  // Verify bottom nav visible on mobile
  await expect(page.locator('nav >> text=Dashboard')).toBeVisible();
  await expect(page.locator('nav >> text=Events')).toBeVisible();

  // Tap Events
  await page.click('nav >> text=Events');
  await expect(page).toHaveURL(/\/events/);

  // Verify event cards visible
  await expect(page.locator('text=Upcoming Events')).toBeVisible();
});
```

**Run tests**:
```bash
# Run all tests
npx playwright test

# Run with UI (see browser)
npx playwright test --ui

# Run specific test
npx playwright test e2e/mobile-journey.spec.ts

# Generate test report
npx playwright show-report
```

**Success Criteria**:
- ✅ All tests pass consistently
- ✅ Tests run in < 2 minutes
- ✅ No flaky tests (random failures)
- ✅ Easy to maintain

**Time**: +12 hours

---

### Advanced 3: Accessibility Testing (Automated)

**What**: Automated accessibility checks with axe-core

**When to use**: For WCAG compliance (EU requirement)

**Install**:
```bash
pnpm add -D @axe-core/playwright
```

**Create test**:
```typescript
// e2e/accessibility.spec.ts
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('dashboard accessibility', async ({ page }) => {
  await page.goto('http://localhost:8080/dashboard');

  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
    .analyze();

  expect(results.violations).toEqual([]);
});

test('forms accessibility', async ({ page }) => {
  await page.goto('http://localhost:8080/startup-profile');

  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa'])
    .analyze();

  // Print violations for debugging
  results.violations.forEach(violation => {
    console.log(`${violation.id}: ${violation.description}`);
    violation.nodes.forEach(node => {
      console.log(`  - ${node.html}`);
    });
  });

  expect(results.violations.length).toBe(0);
});
```

**Common violations**:
```
Missing alt text:
<img src="logo.png" /> ❌
<img src="logo.png" alt="Company logo" /> ✅

Insufficient contrast:
<button className="text-gray-400 bg-gray-300"> ❌
<button className="text-white bg-primary"> ✅

Missing labels:
<input type="email" /> ❌
<label>Email <input type="email" /></label> ✅

Small touch targets:
<button className="p-1"> ❌ (< 44px)
<button className="p-3"> ✅ (48px)
```

**Success Criteria**:
- ✅ Zero critical violations
- ✅ WCAG 2.1 AA compliant
- ✅ All forms have labels
- ✅ Color contrast ratio ≥ 4.5:1

**Time**: +6 hours

---

## Advanced Summary

**What's available**:
- ⬜ Real device testing (+8h)
- ⬜ Automated E2E tests (+12h) - **Recommended**
- ⬜ Accessibility testing (+6h) - **Recommended for EU**

**When to add**:
- Add real devices before production launch
- Add E2E tests for CI/CD and regression testing
- Add accessibility tests if deploying to EU (legal requirement)

**Total advanced time**: +26 hours (optional)

---

## Week 6 Complete

**Fundamentals**: ✅ Mobile thoroughly tested
**Next**: Production deployment

**Testing Coverage**:
```
Fundamentals (2 days):
├─ ✅ Chrome DevTools testing (7 devices)
├─ ✅ Lighthouse audit (scores ≥ 80)
└─ ✅ Manual user journey (complete flow)

Advanced (optional):
├─ ⬜ Real device testing (+8h)
├─ ⬜ Automated E2E (+12h)
└─ ⬜ Accessibility testing (+6h)

Total Coverage:
├─ Devices tested: 7+ (simulated) or 15+ (real)
├─ User journeys: 1 manual, 5+ automated
├─ Accessibility: Manual or automated (WCAG 2.1 AA)
└─ Performance: Lighthouse + Web Vitals
```

**Diagram**:
```
Testing Pyramid:

         ┌─────────────┐
         │   Manual    │ ← 10% (Exploratory testing)
         │   Testing   │
         ├─────────────┤
         │   E2E       │ ← 20% (User journeys)
         │   Tests     │
         ├─────────────┤
         │   UI        │ ← 30% (Component tests)
         │   Tests     │
         ├─────────────┤
         │   Unit      │ ← 40% (Logic tests)
         │   Tests     │
         └─────────────┘

For mobile MVP, focus on:
1. Chrome DevTools (fast iteration)
2. Lighthouse (automated performance)
3. Manual user journey (critical paths)
4. Optional: E2E + Real devices (pre-launch)
```

**Quality Gates**:
```
Before Production:
☑ All Fundamentals complete (Week 1-6)
☑ Lighthouse scores ≥ 80
☑ Zero console errors
☑ User journey works end-to-end
☑ No horizontal scroll on any page
☑ Touch targets ≥ 44px

Optional (Recommended):
☐ Tested on 3+ real devices
☐ E2E tests passing
☐ Accessibility audit complete
```
