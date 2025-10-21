# Week 0: Prerequisites (CRITICAL)

**Status**: ⬜ NOT STARTED
**Hours**: 19.2
**Budget**: $2,400
**Priority**: P0 - BLOCKER
**Must Complete Before**: Week 1 can start

---

## Overview

Week 0 resolves the 5 critical blockers identified in the assessment. **No development work can begin until these are complete.**

**Success Criteria**: All 19 tasks complete, all 5 blockers resolved

---

## Tasks

### 1. Environment Setup (4 hours)

#### Task 1.1: Add Viewport Meta Tag ⚠️ BLOCKER #1
**Time**: 5 minutes
**Priority**: P0
**File**: `index.html`

**Problem**: Without this, the site won't be responsive at all.

**Action**:
```html
<!-- index.html - Add to <head> section -->
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
  <meta name="description" content="Medellin Spark - AI-powered startup platform" />
  <title>Medellin Spark</title>
</head>
```

**Verification**:
```bash
# Check viewport tag exists
grep -n "viewport" index.html

# Should output:
# 3:  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
```

**Success**: Viewport meta tag present in `index.html`

---

#### Task 1.2: Fix CSS Safe Area Classes ⚠️ BLOCKER #2
**Time**: 30 minutes
**Priority**: P0
**Files**: Mobile plan, Tailwind config

**Problem**: `safe-area-inset-bottom` is not a valid Tailwind class.

**Action 1 - Update Tailwind Config**:
```typescript
// tailwind.config.ts
export default {
  theme: {
    extend: {
      spacing: {
        'safe-top': 'env(safe-area-inset-top)',
        'safe-bottom': 'env(safe-area-inset-bottom)',
        'safe-left': 'env(safe-area-inset-left)',
        'safe-right': 'env(safe-area-inset-right)',
      },
      padding: {
        'safe-top': 'env(safe-area-inset-top)',
        'safe-bottom': 'env(safe-area-inset-bottom)',
      }
    }
  }
}
```

**Action 2 - Update Mobile Plan**:
Replace all instances of:
```typescript
// WRONG (Lines 277, 451)
className="safe-area-inset-bottom"
```

With:
```typescript
// CORRECT
className="pb-safe-bottom"
// OR
className="pb-[env(safe-area-inset-bottom)]"
```

**Verification**:
```bash
# Check Tailwind config
grep -A 5 "safe-bottom" tailwind.config.ts

# Search for invalid class usage
grep -r "safe-area-inset-bottom" src/
# Should return: (no results)
```

**Success**: No `safe-area-inset-bottom` usage, Tailwind config has safe-area spacing

---

#### Task 1.3: Update TypeScript Config
**Time**: 15 minutes
**Priority**: P1
**File**: `tsconfig.json`

**Action**:
```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "jsx": "react-jsx"
  }
}
```

**Verification**:
```bash
pnpm tsc --noEmit
# Should output: 0 errors
```

**Success**: TypeScript strict mode enabled, compiles with 0 errors

---

#### Task 1.4: Install ESLint Accessibility Plugin
**Time**: 1 hour
**Priority**: P0
**Package**: `eslint-plugin-jsx-a11y`

**Action**:
```bash
pnpm add -D eslint-plugin-jsx-a11y
```

**Update ESLint config**:
```javascript
// .eslintrc.cjs
module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:jsx-a11y/recommended', // ADD THIS
  ],
  plugins: ['react', '@typescript-eslint', 'jsx-a11y'],
  rules: {
    'jsx-a11y/no-autofocus': 'warn',
    'jsx-a11y/anchor-is-valid': 'warn',
  }
};
```

**Verification**:
```bash
pnpm lint
# Check for accessibility warnings
```

**Success**: ESLint a11y plugin installed, configured, running

---

#### Task 1.5: Create ErrorBoundary Component
**Time**: 2 hours
**Priority**: P1
**File**: `src/components/ErrorBoundary.tsx` (NEW)

**Action**:
```typescript
// src/components/ErrorBoundary.tsx
import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);

    // TODO: Send to error tracking service (Sentry, LogRocket)
    // trackError(error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="flex flex-col items-center justify-center min-h-screen px-4">
          <div className="max-w-md text-center">
            <h1 className="text-2xl md:text-3xl font-bold mb-4">
              Oops! Something went wrong
            </h1>
            <p className="text-gray-600 mb-6">
              We're sorry, but something unexpected happened. Please try refreshing the page.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="h-12 px-6 bg-primary text-white rounded-lg font-medium hover:bg-primary-dark active:scale-95 transition-all"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
```

**Usage example**:
```typescript
// src/App.tsx
import { ErrorBoundary } from './components/ErrorBoundary';

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <Routes>{/* routes */}</Routes>
      </Router>
    </ErrorBoundary>
  );
}
```

**Verification**:
```bash
# Test error boundary
# Create test component that throws error, verify fallback shows
```

**Success**: ErrorBoundary component created, tested, working

---

### 2. Testing Setup (6 hours)

#### Task 2.1: Purchase Testing Devices ⚠️ BLOCKER #4
**Time**: 2 hours (research + purchase)
**Priority**: P0
**Budget**: $450

**Action**:
```markdown
### Devices to Purchase (Used/Refurbished)

1. **iPhone SE (2020)** - $120-150
   - Small screen (4.7", 375×667)
   - Tests minimum iOS experience
   - Buy from: eBay, Swappa, Back Market

2. **Samsung Galaxy S9** - $100-120
   - Android testing
   - Standard size (360×740)
   - Buy from: eBay, Amazon Renewed

3. **iPad Mini (5th gen)** - $150-180
   - Tablet testing
   - 768×1024
   - Buy from: eBay, Apple Refurbished

**Total**: ~$450
```

**Purchase Links**:
- eBay: Search "iPhone SE 2020 unlocked"
- Swappa: https://swappa.com/mobile/buy/apple-iphone-se-2020
- Back Market: https://www.backmarket.com

**Success**: 3 physical devices purchased, delivered within 1 week

---

#### Task 2.2: Set Up BrowserStack Account
**Time**: 1 hour
**Priority**: P0
**Budget**: $78 (2 months)

**Action**:
1. Sign up at https://www.browserstack.com/users/sign_up
2. Choose "Live" plan ($39/month)
3. Add payment method
4. Test device access

**Devices to test**:
- iPhone 14 (390×844)
- iPhone 14 Pro Max (430×932)
- Samsung Galaxy S23 (360×800)
- iPad Pro 12.9" (1024×1366)

**Verification**:
```bash
# Log into BrowserStack
# Start live session on iPhone 14
# Navigate to http://localhost:8080
# Verify can interact with site
```

**Success**: BrowserStack account active, can test on 4+ devices

---

#### Task 2.3: Install Lighthouse CI
**Time**: 1 hour
**Priority**: P1

**Action**:
```bash
# Install Lighthouse
pnpm add -D lighthouse @lhci/cli

# Create config
# lighthouserc.json
{
  "ci": {
    "collect": {
      "url": ["http://localhost:8080"],
      "numberOfRuns": 3,
      "settings": {
        "preset": "mobile"
      }
    },
    "assert": {
      "assertions": {
        "categories:performance": ["warn", {"minScore": 0.9}],
        "categories:accessibility": ["error", {"minScore": 0.95}],
        "categories:best-practices": ["warn", {"minScore": 0.9}],
        "categories:seo": ["warn", {"minScore": 0.9}]
      }
    }
  }
}
```

**Add script to package.json**:
```json
{
  "scripts": {
    "lighthouse": "lhci autorun",
    "lighthouse:mobile": "lighthouse http://localhost:8080 --preset=mobile --view"
  }
}
```

**Verification**:
```bash
pnpm dev &
sleep 5
pnpm lighthouse:mobile
```

**Success**: Lighthouse runs, generates mobile report

---

#### Task 2.4: Install Playwright Mobile Testing
**Time**: 2 hours
**Priority**: P1

**Action**:
```bash
# Install Playwright
pnpm add -D @playwright/test

# Install browsers
npx playwright install chromium webkit

# Create config
# playwright.config.ts
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:8080',
    trace: 'on-first-retry',
  },

  projects: [
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 14'] },
    },
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'Desktop Chrome',
      use: { ...devices['Desktop Chrome'] },
    },
  ],

  webServer: {
    command: 'pnpm dev',
    url: 'http://localhost:8080',
    reuseExistingServer: !process.env.CI,
  },
});
```

**Create sample test**:
```typescript
// e2e/mobile.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Mobile Responsive', () => {
  test('viewport meta tag exists', async ({ page }) => {
    await page.goto('/');

    const viewport = await page.locator('meta[name="viewport"]').getAttribute('content');
    expect(viewport).toContain('width=device-width');
  });
});
```

**Verification**:
```bash
pnpm exec playwright test --project="Mobile Safari"
```

**Success**: Playwright installed, mobile tests running

---

### 3. Analytics Setup (3 hours)

#### Task 3.1: Install Google Analytics 4
**Time**: 2 hours
**Priority**: P0

**Action**:
```bash
pnpm add react-ga4
```

**Create analytics utility**:
```typescript
// src/lib/analytics.ts
import ReactGA from 'react-ga4';

const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;

export const initializeAnalytics = () => {
  if (GA_MEASUREMENT_ID) {
    ReactGA.initialize(GA_MEASUREMENT_ID);
  }
};

export const trackPageView = (path: string) => {
  ReactGA.send({ hitType: 'pageview', page: path });
};

export const trackEvent = (
  category: string,
  action: string,
  label?: string,
  value?: number
) => {
  ReactGA.event({
    category,
    action,
    label,
    value
  });
};

export const trackMobileInteraction = (action: string, label?: string) => {
  const isMobile = window.innerWidth < 768;

  ReactGA.event({
    category: 'Mobile',
    action,
    label: label || (isMobile ? 'Mobile' : 'Desktop'),
    nonInteraction: false
  });
};

// Track Core Web Vitals
export const trackWebVitals = (metric: any) => {
  ReactGA.event({
    category: 'Web Vitals',
    action: metric.name,
    value: Math.round(metric.value),
    label: metric.id,
    nonInteraction: true
  });
};
```

**Initialize in App**:
```typescript
// src/App.tsx
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { initializeAnalytics, trackPageView } from './lib/analytics';

function App() {
  const location = useLocation();

  useEffect(() => {
    initializeAnalytics();
  }, []);

  useEffect(() => {
    trackPageView(location.pathname + location.search);
  }, [location]);

  return <Router>{/* ... */}</Router>;
}
```

**Add to .env**:
```bash
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

**Verification**:
```bash
# Start dev server
pnpm dev

# Open browser console
# Navigate between pages
# Check Network tab for GA requests
```

**Success**: GA4 tracking page views, events sending

---

#### Task 3.2: Set Up Custom Events
**Time**: 1 hour
**Priority**: P1

**Action - Track key mobile events**:
```typescript
// Mobile-specific tracking examples

// Track form submissions
trackMobileInteraction('Form Submit', 'Startup Profile');

// Track deck generation
trackMobileInteraction('Generate Deck', 'Pitch Deck Wizard');

// Track navigation clicks
trackMobileInteraction('Bottom Nav Click', 'Events');

// Track swipe gestures
trackMobileInteraction('Swipe', 'Presentation Viewer - Next Slide');
```

**Add to key components**:
```typescript
// src/components/MobileNav.tsx
import { trackMobileInteraction } from '@/lib/analytics';

function MobileNavButton({ label, to }: Props) {
  const handleClick = () => {
    trackMobileInteraction('Bottom Nav Click', label);
  };

  return <NavLink to={to} onClick={handleClick}>{/* ... */}</NavLink>;
}
```

**Success**: Custom events tracking mobile interactions

---

### 4. Deployment Prep (6 hours)

#### Task 4.1: Install Feature Flag System ⚠️ BLOCKER #5
**Time**: 3 hours
**Priority**: P0

**Action**:
```bash
pnpm add posthog-js
```

**Create feature flag hook**:
```typescript
// src/hooks/useFeatureFlag.ts
import { usePostHog } from 'posthog-js/react';

export function useFeatureFlag(flagName: string): boolean {
  const posthog = usePostHog();
  return posthog?.isFeatureEnabled(flagName) ?? false;
}
```

**Initialize PostHog**:
```typescript
// src/main.tsx
import posthog from 'posthog-js';

if (import.meta.env.VITE_POSTHOG_KEY) {
  posthog.init(import.meta.env.VITE_POSTHOG_KEY, {
    api_host: 'https://app.posthog.com',
    loaded: (posthog) => {
      if (import.meta.env.DEV) posthog.debug();
    }
  });
}
```

**Usage example**:
```typescript
// src/App.tsx
import { useFeatureFlag } from './hooks/useFeatureFlag';

function App() {
  const mobileOptimizationEnabled = useFeatureFlag('mobile-optimization');

  return mobileOptimizationEnabled ? (
    <MobileOptimizedLayout />
  ) : (
    <CurrentLayout />
  );
}
```

**Add to .env**:
```bash
VITE_POSTHOG_KEY=phc_XXXXXXXXXXXX
```

**Success**: PostHog initialized, feature flags working

---

#### Task 4.2: Document Rollback Procedure
**Time**: 1 hour
**Priority**: P0
**File**: `docs/ROLLBACK.md` (NEW)

**Action - Create rollback documentation**:
```markdown
# Rollback Procedure

## Quick Rollback (Feature Flag)

**Time**: 30 seconds

```bash
# 1. Disable feature flag in PostHog dashboard
# Dashboard → Feature Flags → "mobile-optimization" → OFF

# 2. Verify rollback
# Check analytics - mobile traffic goes back to old layout

# 3. No code deployment needed
```

## Full Rollback (Code Revert)

**Time**: 5 minutes

```bash
# 1. Identify commit to revert
git log --oneline -10

# 2. Revert commit
git revert <commit-hash>

# 3. Push to production
git push origin main

# 4. Verify deployment
# Check production site on mobile
```

## Rollback Triggers

**AUTO-ROLLBACK if**:
- Error rate >5% (20 errors in 5 minutes)
- Bounce rate increases >15% vs baseline
- Page load time >5 seconds consistently

**MANUAL ROLLBACK if**:
- User complaints >5 in first hour
- Critical bug (data loss, auth failure)
- Accessibility issues reported
```

**Success**: Rollback procedure documented, tested

---

#### Task 4.3: Set Up Monitoring Dashboards
**Time**: 2 hours
**Priority**: P1

**Action - Create monitoring dashboard**:

**Option 1: Google Analytics Dashboard**
1. Go to GA4 → Reports → Library
2. Create custom report: "Mobile Performance"
3. Add metrics:
   - Bounce rate (mobile vs desktop)
   - Average session duration
   - Conversion rate
   - Page load time
4. Add dimensions:
   - Device category
   - Screen resolution
   - Browser

**Option 2: PostHog Dashboard**
1. Create dashboard: "Mobile Optimization"
2. Add insights:
   - Mobile traffic %
   - Feature flag rollout %
   - Error rate by device
   - Conversion funnel (mobile)

**Success**: Monitoring dashboard showing mobile metrics

---

## Verification Checklist

After completing all tasks, verify:

### Environment ✅
- [ ] Viewport meta tag in index.html
- [ ] Tailwind safe-area config correct
- [ ] TypeScript strict mode enabled, 0 errors
- [ ] ESLint a11y plugin installed, configured

### Testing ✅
- [ ] 3 physical devices purchased
- [ ] BrowserStack account active ($78 paid)
- [ ] Lighthouse CI configured
- [ ] Playwright mobile tests running

### Analytics ✅
- [ ] GA4 installed, tracking page views
- [ ] Custom events configured
- [ ] Mobile tracking working

### Deployment ✅
- [ ] PostHog feature flags working
- [ ] Rollback procedure documented
- [ ] Monitoring dashboards created

---

## Budget Tracking

| Item | Budget | Actual | Status |
|------|--------|--------|--------|
| Development (19.2h) | $2,400 | TBD | ⬜ |
| iPhone SE | $150 | TBD | ⬜ |
| Galaxy S9 | $120 | TBD | ⬜ |
| iPad Mini | $180 | TBD | ⬜ |
| BrowserStack (2mo) | $78 | TBD | ⬜ |
| **Total** | **$2,928** | **TBD** | ⬜ |

---

## Timeline

**Day 1** (8 hours):
- Tasks 1.1-1.3: Environment setup
- Task 2.1: Research/purchase devices
- Task 3.1: Install GA4

**Day 2** (8 hours):
- Task 1.4-1.5: ESLint + ErrorBoundary
- Task 2.2-2.3: BrowserStack + Lighthouse
- Task 4.1: Feature flags

**Day 3** (3.2 hours):
- Task 2.4: Playwright setup
- Task 3.2: Custom events
- Tasks 4.2-4.3: Rollback + monitoring
- **Final verification**

---

## Completion Criteria

**Week 0 is DONE when**:
- ✅ All 19 tasks complete
- ✅ All 5 blockers resolved
- ✅ All verification checkboxes checked
- ✅ Budget spent: $928 (devices + tools)
- ✅ Development time: 19.2 hours

**Then**: Week 1 can begin

---

**Status**: ⬜ NOT STARTED
**Start Date**: TBD
**Target Completion**: 3 days from start
**Next**: [WEEK-1-DASHBOARD.md](./WEEK-1-DASHBOARD.md)
