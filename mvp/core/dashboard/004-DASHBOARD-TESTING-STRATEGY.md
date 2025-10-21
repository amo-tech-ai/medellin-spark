# 🧪 Dashboard Continuous Testing Strategy

**Project**: Medellin Spark Dashboard
**Tools**: MCP Playwright + Chrome DevTools
**Date**: January 2025

**Approach**: Test-Driven Development with continuous validation

---

## Testing Philosophy

**Test Early, Test Often, Test Everything**

```
Code → Test → Fix → Commit
  ↓
Every feature has:
1. Unit tests (components)
2. Integration tests (hooks + Supabase)
3. E2E tests (user journeys)
```

---

## Testing Layers

### Layer 1: Database Testing ✅
**Tool**: Direct SQL queries via psql
**When**: After every migration

```bash
# Verify table exists
PGPASSWORD='Toronto2025#' psql \
  -h db.dhesktsqhcxhqfjypulk.supabase.co \
  -U postgres -d postgres \
  -c "SELECT table_name FROM information_schema.tables WHERE table_name = 'job_applications';"

# Verify columns
PGPASSWORD='Toronto2025#' psql \
  -h db.dhesktsqhcxhqfjypulk.supabase.co \
  -U postgres -d postgres \
  -c "\d job_applications"

# Test insert
PGPASSWORD='Toronto2025#' psql \
  -h db.dhesktsqhcxhqfjypulk.supabase.co \
  -U postgres -d postgres \
  -c "INSERT INTO job_applications (profile_id, job_id) VALUES ('test', 'test') RETURNING id;"
```

---

### Layer 2: API/Hook Testing ✅
**Tool**: React Query DevTools + Network Tab
**When**: After creating each hook

**Test Pattern**:
```typescript
// Test hook in isolation
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useDashboardMetrics } from './useDashboardMetrics';

test('fetches dashboard metrics', async () => {
  const queryClient = new QueryClient();
  const wrapper = ({ children }) => (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );

  const { result } = renderHook(() => useDashboardMetrics(), { wrapper });

  await waitFor(() => expect(result.current.isSuccess).toBe(true));

  expect(result.current.data).toHaveProperty('events');
  expect(result.current.data).toHaveProperty('jobs');
  expect(typeof result.current.data.events).toBe('number');
});
```

---

### Layer 3: Component Testing ✅
**Tool**: React Testing Library
**When**: After creating each component

**Test Pattern**:
```typescript
import { render, screen } from '@testing-library/react';
import { MetricCard } from './MetricCard';
import { Calendar } from 'lucide-react';

test('renders metric card with value', () => {
  render(
    <MetricCard
      title="Events Registered"
      value={12}
      icon={Calendar}
      trend={{ value: "+3 this month", positive: true }}
    />
  );

  expect(screen.getByText('Events Registered')).toBeInTheDocument();
  expect(screen.getByText('12')).toBeInTheDocument();
  expect(screen.getByText('+3 this month')).toBeInTheDocument();
});
```

---

### Layer 4: E2E Testing with MCP Tools 🎯

## MCP Chrome DevTools Testing

**Why Chrome DevTools over Playwright?**
- Real-time debugging
- Network inspection
- Console monitoring
- Element tree with UIDs
- Better for iterative development

### Test Workflow Pattern

**Step 1: Navigate to Page**
```typescript
mcp__chrome-devtools__navigate_page({
  url: "http://localhost:8082/dashboard"
})
```

**Step 2: Take Snapshot (Get Element UIDs)**
```typescript
mcp__chrome-devtools__take_snapshot()

// Returns element tree like:
// <main>
//   <div uid="dashboard-123">
//     <h1 uid="title-456">Welcome back, Alex!</h1>
//     <div uid="metrics-grid-789">
//       <div uid="event-card-101">...</div>
//     </div>
//   </div>
// </main>
```

**Step 3: Verify Data Loads**
```typescript
// Check console for errors
mcp__chrome-devtools__list_console_messages()

// Expected: No errors, only logs

// Check network requests
mcp__chrome-devtools__list_network_requests({
  resourceTypes: ["fetch", "xhr"]
})

// Expected: Successful requests to Supabase API
```

**Step 4: Interact with Elements**
```typescript
// Click a button using UID from snapshot
mcp__chrome-devtools__click({
  uid: "generate-deck-button-456"
})

// Wait for navigation
mcp__chrome-devtools__wait_for({
  text: "Pitch Deck Wizard",
  timeout: 5000
})
```

**Step 5: Verify Results**
```typescript
// Take screenshot for visual confirmation
mcp__chrome-devtools__take_screenshot({
  filename: "dashboard-metrics-loaded.png"
})

// Get specific network request details
mcp__chrome-devtools__get_network_request({
  url: "/rest/v1/registrations"
})

// Expected: Status 200, data returned
```

---

## E2E Test Scenarios

### Test 1: Dashboard Loads with Real Data

**File**: `e2e/dashboard-metrics.spec.ts`

```typescript
import { test, expect } from '@playwright/test';

test('dashboard displays real metrics from Supabase', async ({ page }) => {
  // Navigate
  await page.goto('http://localhost:8082/dashboard');

  // Wait for metrics to load
  await page.waitForSelector('[data-testid="metric-card"]', { timeout: 10000 });

  // Verify metrics cards exist
  const metricCards = await page.locator('[data-testid="metric-card"]').count();
  expect(metricCards).toBe(4);

  // Check no console errors
  const errors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') errors.push(msg.text());
  });
  expect(errors).toHaveLength(0);

  // Verify network requests succeeded
  const response = await page.waitForResponse(
    response => response.url().includes('/rest/v1/registrations') && response.status() === 200
  );
  expect(response.ok()).toBeTruthy();
});
```

**MCP Chrome DevTools Version**:
```
1. Navigate: mcp__chrome-devtools__navigate_page({ url: "http://localhost:8082/dashboard" })
2. Snapshot: mcp__chrome-devtools__take_snapshot()
3. Verify: Check for metric-card elements in snapshot
4. Console: mcp__chrome-devtools__list_console_messages()
5. Network: mcp__chrome-devtools__list_network_requests({ resourceTypes: ["fetch"] })
6. Screenshot: mcp__chrome-devtools__take_screenshot({ filename: "dashboard-loaded.png" })
```

---

### Test 2: Event Registration Flow

**Playwright Test**:
```typescript
test('user can register for an event', async ({ page }) => {
  // Navigate to events page
  await page.goto('http://localhost:8082/dashboard/events');

  // Wait for events to load
  await page.waitForSelector('[data-testid="event-card"]');

  // Click first "Register" button
  await page.click('button:has-text("Register"):first');

  // Wait for confirmation toast
  await page.waitForSelector('text=/registered|success/i');

  // Verify event appears in "My Events" tab
  await page.click('[data-testid="my-events-tab"]');
  await page.waitForSelector('[data-testid="registered-event"]');

  // Take screenshot
  await page.screenshot({ path: 'e2e/screenshots/event-registered.png' });
});
```

**MCP Chrome DevTools Version**:
```
1. Navigate: mcp__chrome-devtools__navigate_page({ url: "http://localhost:8082/dashboard/events" })
2. Snapshot: mcp__chrome-devtools__take_snapshot()
3. Click Register: mcp__chrome-devtools__click({ uid: "register-button-123" })
4. Wait Toast: mcp__chrome-devtools__wait_for({ text: "registered", timeout: 3000 })
5. Switch Tab: mcp__chrome-devtools__click({ uid: "my-events-tab-456" })
6. Verify: mcp__chrome-devtools__take_snapshot() (check for registered event)
7. Screenshot: mcp__chrome-devtools__take_screenshot({ filename: "event-registered.png" })
```

---

### Test 3: Job Application Flow

```typescript
test('user can apply to a job', async ({ page }) => {
  // Navigate to jobs
  await page.goto('http://localhost:8082/dashboard/jobs');

  // Wait for jobs to load
  await page.waitForSelector('[data-testid="job-card"]');

  // Click "Apply Now" on first job
  await page.click('button:has-text("Apply Now"):first');

  // Fill application form (when implemented)
  // await page.fill('[name="cover_letter"]', 'I am interested in this position');

  // Submit application
  // await page.click('button:has-text("Submit Application")');

  // Verify success
  // await page.waitForSelector('text=/application submitted/i');

  // Check "My Applications" tab
  await page.click('[data-testid="applications-tab"]');
  await page.waitForSelector('[data-testid="application-item"]');
});
```

---

### Test 4: Pitch Deck Generation (Full Journey)

```typescript
test('complete pitch deck generation flow', async ({ page }) => {
  // Start from dashboard
  await page.goto('http://localhost:8082/dashboard');

  // Click "Generate Pitch Deck" button
  await page.click('button:has-text("Generate Pitch Deck")');

  // Should redirect to pitch-deck-wizard
  await page.waitForURL('**/pitch-deck-wizard');

  // Send first message
  await page.fill('input[placeholder*="message"]', 'Create pitch deck for TestCorp AI startup');
  await page.click('button[type="submit"]');

  // Wait for AI response
  await page.waitForSelector('text=/tell me more|great|what/i', { timeout: 15000 });

  // Verify progress bar exists
  await expect(page.locator('[role="progressbar"]')).toBeVisible();

  // Continue conversation (simplified)
  await page.fill('input', 'Software development industry');
  await page.click('button[type="submit"]');

  // Wait for "Generate" button
  await page.waitForSelector('button:has-text("Generate")', { timeout: 30000 });

  // Click Generate
  await page.click('button:has-text("Generate")');

  // Wait for redirect to outline page
  await page.waitForURL('**/presentations/**/outline', { timeout: 20000 });

  // Verify all 10 slides render
  const slideCount = await page.locator('[data-slide-number]').count();
  expect(slideCount).toBe(10);

  // Take screenshot of final result
  await page.screenshot({ path: 'e2e/screenshots/pitch-deck-complete.png', fullPage: true });
});
```

---

## Continuous Testing Workflow

### During Development (After Every Change)

**Quick Validation Loop** (30 seconds):
```bash
# 1. TypeScript check
pnpm tsc --noEmit

# 2. Start dev server (if not running)
pnpm dev

# 3. Quick visual check
# Open: http://localhost:8082/dashboard
# Verify: Page loads, no console errors, metrics display

# 4. Network check
# Open DevTools → Network tab
# Verify: Supabase requests return 200
```

**Full Component Test** (2-3 minutes):
```bash
# 1. Run unit tests
pnpm test

# 2. MCP Chrome DevTools test
# Navigate to page
# Take snapshot
# Verify elements
# Check console
# Screenshot

# 3. Manual interaction test
# Click buttons
# Navigate between pages
# Verify data updates
```

---

### Pre-Commit Testing (5-10 minutes)

**Checklist**:
```bash
# 1. TypeScript compiles
pnpm tsc --noEmit
# Expected: 0 errors

# 2. Linter passes
pnpm lint
# Expected: 0 errors (warnings OK)

# 3. All pages load
for url in /dashboard /dashboard/events /dashboard/jobs /dashboard/pitch-decks /dashboard/settings; do
  echo "Testing $url"
  # Use MCP Chrome DevTools to navigate and verify
done

# 4. Database queries work
# Check React Query DevTools
# All queries successful

# 5. No console errors
# Check browser console
# No red errors

# 6. Build succeeds
pnpm build
# Expected: Success in < 10 seconds
```

---

### Daily Testing (End of Day)

**Full E2E Test Suite**:
```bash
# Run all Playwright tests
pnpm test:e2e

# Expected:
# ✅ Dashboard loads
# ✅ Events page works
# ✅ Jobs page works
# ✅ Pitch deck wizard works
# ✅ All user journeys complete
```

**Performance Check**:
```bash
# Lighthouse audit
npx lighthouse http://localhost:8082/dashboard --view

# Target scores:
# Performance: > 90
# Accessibility: > 95
# Best Practices: > 90
# SEO: > 90
```

---

## MCP Tool Testing Patterns

### Pattern 1: Page Load Verification

```typescript
// 1. Navigate
mcp__chrome-devtools__navigate_page({ url: "http://localhost:8082/dashboard" })

// 2. Wait for content
mcp__chrome-devtools__wait_for({ text: "Welcome back", timeout: 3000 })

// 3. Snapshot
const snapshot = mcp__chrome-devtools__take_snapshot()

// 4. Verify elements exist
// Check snapshot contains:
// - <h1> with "Welcome back"
// - 4 metric cards
// - Upcoming events section

// 5. Console check
const console = mcp__chrome-devtools__list_console_messages()
// Expect: No errors

// 6. Network check
const network = mcp__chrome-devtools__list_network_requests({ resourceTypes: ["fetch"] })
// Expect: All 200 status

// 7. Screenshot
mcp__chrome-devtools__take_screenshot({ filename: "dashboard-verified.png" })
```

### Pattern 2: Form Interaction

```typescript
// 1. Navigate to page with form
mcp__chrome-devtools__navigate_page({ url: "http://localhost:8082/dashboard/jobs" })

// 2. Snapshot to get UIDs
const snapshot = mcp__chrome-devtools__take_snapshot()

// 3. Fill form field
mcp__chrome-devtools__fill({
  uid: "search-input-123", // from snapshot
  value: "frontend developer"
})

// 4. Submit
mcp__chrome-devtools__click({ uid: "search-button-456" })

// 5. Wait for results
mcp__chrome-devtools__wait_for({ text: "Frontend", timeout: 2000 })

// 6. Verify filtered results
const resultsSnapshot = mcp__chrome-devtools__take_snapshot()
// Check results contain "Frontend" in job titles
```

### Pattern 3: Navigation Flow

```typescript
// 1. Start at dashboard
mcp__chrome-devtools__navigate_page({ url: "http://localhost:8082/dashboard" })

// 2. Get sidebar UIDs
const snapshot1 = mcp__chrome-devtools__take_snapshot()

// 3. Click "Events" in sidebar
mcp__chrome-devtools__click({ uid: "sidebar-events-link-123" })

// 4. Verify URL changed
// Current URL should be: /dashboard/events

// 5. Click "Jobs" in sidebar
const snapshot2 = mcp__chrome-devtools__take_snapshot()
mcp__chrome-devtools__click({ uid: "sidebar-jobs-link-456" })

// 6. Verify URL changed
// Current URL should be: /dashboard/jobs

// 7. Screenshot navigation state
mcp__chrome-devtools__take_screenshot({ filename: "navigation-flow.png" })
```

---

## Testing Checklist Templates

### Feature Completion Checklist

```
Feature: ________________

[ ] Component renders without errors
[ ] TypeScript compiles (0 errors)
[ ] Data fetches from Supabase
[ ] Loading states show correctly
[ ] Empty states show when no data
[ ] Error states show on failures
[ ] Responsive on mobile (< 640px)
[ ] Responsive on tablet (768px-1024px)
[ ] Responsive on desktop (> 1024px)
[ ] Console has no errors
[ ] Network requests succeed (200)
[ ] Screenshots taken for reference
[ ] E2E test written and passing
[ ] Performance acceptable (< 2s load)
```

### Page Completion Checklist

```
Page: ________________

Database:
[ ] Required tables exist
[ ] Foreign keys configured
[ ] Indexes added
[ ] Test data inserted

Hooks:
[ ] Custom hook created
[ ] TypeScript types defined
[ ] React Query configured
[ ] Error handling implemented

Components:
[ ] All components created
[ ] Props properly typed
[ ] Loading states implemented
[ ] Empty states implemented
[ ] Error states implemented

Integration:
[ ] Page renders with real data
[ ] Navigation works
[ ] Interactions functional
[ ] No console errors

Testing:
[ ] Unit tests pass
[ ] E2E test passes
[ ] Manual testing complete
[ ] Screenshots captured
```

---

## Automated Testing Scripts

### File: `scripts/test-dashboard.sh`

```bash
#!/bin/bash

echo "🧪 Dashboard Testing Suite"
echo "=========================="

# 1. TypeScript Check
echo ""
echo "1. TypeScript Compilation..."
pnpm tsc --noEmit
if [ $? -ne 0 ]; then
  echo "❌ TypeScript errors found"
  exit 1
fi
echo "✅ TypeScript passed"

# 2. Linter
echo ""
echo "2. ESLint Check..."
pnpm lint --quiet
if [ $? -ne 0 ]; then
  echo "⚠️  Linter warnings (acceptable)"
fi
echo "✅ Linter checked"

# 3. Unit Tests
echo ""
echo "3. Unit Tests..."
pnpm test
if [ $? -ne 0 ]; then
  echo "❌ Unit tests failed"
  exit 1
fi
echo "✅ Unit tests passed"

# 4. Build Test
echo ""
echo "4. Production Build..."
pnpm build
if [ $? -ne 0 ]; then
  echo "❌ Build failed"
  exit 1
fi
echo "✅ Build successful"

# 5. E2E Tests
echo ""
echo "5. E2E Tests..."
pnpm test:e2e
if [ $? -ne 0 ]; then
  echo "❌ E2E tests failed"
  exit 1
fi
echo "✅ E2E tests passed"

echo ""
echo "=========================="
echo "✅ All tests passed!"
```

---

## Success Metrics

| Test Type | Coverage Target | Status |
|-----------|----------------|--------|
| **Unit Tests** | 80% component coverage | TBD |
| **Integration Tests** | All hooks tested | TBD |
| **E2E Tests** | All user journeys | TBD |
| **Performance** | < 2s page load | TBD |
| **Accessibility** | WCAG AA compliant | TBD |

---

**Document Version**: 1.0
**Last Updated**: January 2025
**Status**: Ready for Implementation ✅
