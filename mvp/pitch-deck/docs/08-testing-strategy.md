# 11 - Testing Strategy

**Created:** 2025-01-15
**Purpose:** Comprehensive testing plan for MVP and beyond

---

## 🎯 Testing Philosophy

**For MVP:** Focus on manual testing and critical path coverage
**Post-MVP:** Add automated tests for stability and regression prevention

### Testing Priorities
1. **Critical User Flows** - Can users create presentations end-to-end?
2. **Data Integrity** - Is data saved correctly to Supabase?
3. **Authentication** - Are routes properly protected?
4. **AI Generation** - Does Claude API integration work reliably?
5. **Auto-save** - Does debounced saving work without data loss?

---

## ✅ MVP Testing Checklist

### Phase 1: Manual Testing

**Input Form (`/pitch-deck`)**
- [ ] Form renders correctly on mobile/tablet/desktop
- [ ] Quick start templates populate textarea
- [ ] Validation shows errors for < 50 characters
- [ ] Validation shows errors for > 2000 characters
- [ ] Slide count dropdown works (5-20)
- [ ] Language selector works
- [ ] Style selector works
- [ ] Submit button shows loading state
- [ ] Network errors display user-friendly message

**Outline Generation**
- [ ] Edge Function generates 10 slide titles
- [ ] Titles are relevant to input topic
- [ ] Database creates new presentation record
- [ ] Status is set to 'outline'
- [ ] User is redirected to outline editor
- [ ] Generation completes in < 30 seconds
- [ ] Retry works if first attempt fails

**Outline Editor (`/presentations/:id/outline`)**
- [ ] Fetches correct presentation from database
- [ ] Displays all slide titles in correct order
- [ ] Drag and drop reorders slides
- [ ] Click title to edit works
- [ ] Auto-save triggers after 2 seconds
- [ ] Delete slide removes from list
- [ ] Add slide inserts new slide
- [ ] Minimum 3 slides enforced
- [ ] Theme selector shows 3 themes
- [ ] Selected theme has visual indicator
- [ ] Theme selection saves immediately
- [ ] "Generate Presentation" button enabled when ready
- [ ] Back button returns to dashboard

**Content Generation**
- [ ] Edge Function generates content for all slides
- [ ] Progress updates show current slide
- [ ] Content is relevant and well-formatted
- [ ] First slide has title layout
- [ ] Other slides have content layout
- [ ] Generation completes in < 90 seconds
- [ ] Database updates with full content JSONB
- [ ] Status changes to 'complete'
- [ ] User redirected to slide editor

**Slide Editor (`/presentations/:id/edit`)**
- [ ] Thumbnails show on left sidebar
- [ ] First slide loads and displays
- [ ] Title input shows current title
- [ ] Content textarea shows current content
- [ ] Edit title triggers auto-save
- [ ] Edit content triggers auto-save
- [ ] Save indicator shows "Saving..." then "Saved"
- [ ] Click thumbnail switches slides
- [ ] Previous/Next buttons work
- [ ] Previous disabled on first slide
- [ ] Next disabled on last slide
- [ ] Arrow keys navigate slides
- [ ] "View Presentation" opens viewer
- [ ] Changes persist after page reload

**Presentation Viewer (`/presentations/:id/view`)**
- [ ] Opens in full-screen mode
- [ ] First slide displays with correct theme
- [ ] Content is readable and styled
- [ ] Right arrow advances to next slide
- [ ] Left arrow goes to previous slide
- [ ] Space bar advances slide
- [ ] PageDown advances slide
- [ ] PageUp goes back
- [ ] Escape key exits to editor
- [ ] Mouse controls auto-hide after 3s
- [ ] Progress indicator shows "3 / 10"
- [ ] Theme colors applied correctly

**Dashboard Integration**
- [ ] "My Pitch Decks" shows all presentations
- [ ] Each card shows title, status, slide count
- [ ] Last edited timestamp is accurate
- [ ] Status badges show correct state
- [ ] Click "Edit Deck" opens editor
- [ ] Click "View" opens viewer
- [ ] Empty state shows when no decks
- [ ] "Generate New" button works

**Authentication & Security**
- [ ] Unauthenticated users redirected to /auth
- [ ] Users can only see own presentations
- [ ] Direct URL access checked for ownership
- [ ] Invalid presentation ID returns 404
- [ ] Database RLS policies enforced
- [ ] JWT token validated in Edge Functions

**Error Handling**
- [ ] Network errors show toast notifications
- [ ] AI generation failures show retry option
- [ ] Auto-save failures indicated clearly
- [ ] Invalid input shows validation errors
- [ ] 404 page shows for missing routes
- [ ] Database errors handled gracefully

---

## 🧪 Post-MVP: Automated Testing

### Unit Tests (Vitest)

**Test Coverage Goals:**
- Utility functions: 100%
- Hooks: 80%
- Components: 60%

**Example Test: Validation Function**
```typescript
// src/utils/validation.test.ts
import { describe, it, expect } from 'vitest';
import { validatePresentationId, isValidUUID } from './validation';

describe('validatePresentationId', () => {
  it('should accept valid UUID', () => {
    const validId = '550e8400-e29b-41d4-a716-446655440000';
    expect(() => validatePresentationId(validId)).not.toThrow();
  });

  it('should reject invalid UUID', () => {
    expect(() => validatePresentationId('invalid-id')).toThrow();
  });

  it('should reject undefined', () => {
    expect(() => validatePresentationId(undefined)).toThrow();
  });
});

describe('isValidUUID', () => {
  it('should return true for valid UUIDs', () => {
    expect(isValidUUID('550e8400-e29b-41d4-a716-446655440000')).toBe(true);
  });

  it('should return false for invalid format', () => {
    expect(isValidUUID('not-a-uuid')).toBe(false);
  });
});
```

**Example Test: Custom Hook**
```typescript
// src/hooks/usePresentationAccess.test.ts
import { renderHook, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { usePresentationAccess } from './usePresentationAccess';

// Mock Supabase
vi.mock('@/integrations/supabase/client', () => ({
  supabase: {
    from: () => ({
      select: () => ({
        eq: () => ({
          single: vi.fn().mockResolvedValue({
            data: { profile_id: 'user-123', is_public: false },
            error: null
          })
        })
      })
    })
  }
}));

describe('usePresentationAccess', () => {
  it('should grant access to owner', async () => {
    const { result } = renderHook(() =>
      usePresentationAccess('pres-123')
    );

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.hasAccess).toBe(true);
    });
  });
});
```

---

### Integration Tests (Playwright)

**Test Critical Paths:**

```typescript
// tests/e2e/create-presentation.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Create Presentation Flow', () => {
  test.beforeEach(async ({ page }) => {
    // Login
    await page.goto('/auth');
    await page.fill('[name="email"]', 'test@example.com');
    await page.fill('[name="password"]', 'password123');
    await page.click('button[type="submit"]');

    await page.waitForURL('/dashboard');
  });

  test('should create presentation end-to-end', async ({ page }) => {
    // 1. Navigate to pitch deck input
    await page.click('text=Generate Pitch Deck');
    await expect(page).toHaveURL('/pitch-deck');

    // 2. Fill form
    await page.fill('textarea[name="description"]',
      'We are building an AI-powered event management platform that automates the entire event lifecycle from planning to execution.'
    );
    await page.selectOption('select[name="slideCount"]', '10');
    await page.selectOption('select[name="style"]', 'professional');

    // 3. Generate outline
    await page.click('button:has-text("Generate Pitch Deck")');

    // 4. Wait for outline editor
    await page.waitForURL(/\/presentations\/.+\/outline/, { timeout: 60000 });

    // 5. Verify outline loaded
    await expect(page.locator('[data-testid="slide-row"]')).toHaveCount(10);

    // 6. Edit a slide title
    const firstSlide = page.locator('[data-testid="slide-row"]').first();
    await firstSlide.click();
    await page.keyboard.type(' (Updated)');
    await page.keyboard.press('Enter');

    // 7. Wait for auto-save
    await expect(page.locator('text=Saved')).toBeVisible({ timeout: 5000 });

    // 8. Select theme
    await page.click('[data-testid="theme-purple"]');

    // 9. Generate presentation
    await page.click('button:has-text("Generate Presentation")');

    // 10. Wait for editor
    await page.waitForURL(/\/presentations\/.+\/edit/, { timeout: 120000 });

    // 11. Verify content loaded
    await expect(page.locator('[data-testid="slide-title-input"]')).toBeVisible();
    await expect(page.locator('[data-testid="slide-content-textarea"]')).toBeVisible();

    // 12. Edit content
    await page.fill('[data-testid="slide-content-textarea"]',
      'Updated content for this slide.'
    );

    // 13. Wait for auto-save
    await expect(page.locator('text=Saved')).toBeVisible({ timeout: 5000 });

    // 14. Open viewer
    await page.click('button:has-text("View Presentation")');
    await expect(page).toHaveURL(/\/presentations\/.+\/view/);

    // 15. Verify viewer works
    await expect(page.locator('[data-testid="slide-display"]')).toBeVisible();

    // 16. Navigate slides
    await page.keyboard.press('ArrowRight');
    await expect(page.locator('text=2 / 10')).toBeVisible();

    // 17. Exit viewer
    await page.keyboard.press('Escape');
    await expect(page).toHaveURL(/\/presentations\/.+\/edit/);
  });

  test('should handle AI generation errors gracefully', async ({ page }) => {
    // Mock API failure
    await page.route('**/functions/v1/generate-outline', route =>
      route.abort('failed')
    );

    await page.goto('/pitch-deck');
    await page.fill('textarea[name="description"]', 'Test startup description');
    await page.click('button:has-text("Generate Pitch Deck")');

    // Should show error message
    await expect(page.locator('text=Failed to generate')).toBeVisible();

    // Should show retry button
    await expect(page.locator('button:has-text("Try Again")')).toBeVisible();
  });
});
```

---

### Performance Testing

**Lighthouse CI Integration:**

```yaml
# .github/workflows/lighthouse.yml
name: Lighthouse CI
on: [push]
jobs:
  lighthouse:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm install && npm run build
      - run: npm install -g @lhci/cli
      - run: lhci autorun
```

**Performance Budgets:**
```json
{
  "ci": {
    "collect": {
      "url": [
        "http://localhost:3000/",
        "http://localhost:3000/dashboard",
        "http://localhost:3000/pitch-deck"
      ],
      "numberOfRuns": 3
    },
    "assert": {
      "assertions": {
        "categories:performance": ["error", {"minScore": 0.9}],
        "categories:accessibility": ["error", {"minScore": 0.95}],
        "first-contentful-paint": ["error", {"maxNumericValue": 2000}],
        "interactive": ["error", {"maxNumericValue": 3500}]
      }
    }
  }
}
```

---

### Load Testing (K6)

**Test Edge Functions under load:**

```javascript
// tests/load/generate-outline.js
import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '30s', target: 10 },  // Ramp up to 10 users
    { duration: '1m', target: 10 },   // Stay at 10 for 1 min
    { duration: '30s', target: 0 },   // Ramp down
  ],
  thresholds: {
    http_req_duration: ['p(95)<30000'], // 95% under 30s
    http_req_failed: ['rate<0.05'],     // Less than 5% failures
  },
};

export default function () {
  const url = 'https://your-project.supabase.co/functions/v1/generate-outline';
  const payload = JSON.stringify({
    topic: 'We are building an AI-powered SaaS platform for event management',
    slideCount: 10,
    language: 'en-US',
    presentationStyle: 'professional'
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${__ENV.USER_JWT}`,
    },
  };

  const response = http.post(url, payload, params);

  check(response, {
    'status is 200': (r) => r.status === 200,
    'has presentationId': (r) => JSON.parse(r.body).presentationId !== undefined,
    'outline has slides': (r) => JSON.parse(r.body).outline.length >= 5,
  });

  sleep(1);
}
```

Run with:
```bash
k6 run tests/load/generate-outline.js
```

---

## 🔍 Monitoring & Observability

### Error Tracking (Sentry)

```typescript
// src/lib/sentry.ts
import * as Sentry from '@sentry/react';

Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN,
  environment: import.meta.env.MODE,
  tracesSampleRate: 0.1,
  integrations: [
    new Sentry.BrowserTracing(),
    new Sentry.Replay({
      maskAllText: true,
      blockAllMedia: true,
    }),
  ],
  beforeSend(event) {
    // Don't send events in development
    if (import.meta.env.DEV) return null;
    return event;
  },
});
```

### Analytics Tracking

```typescript
// src/lib/analytics.ts
export function trackEvent(eventName: string, properties?: Record<string, any>) {
  // Posthog, Mixpanel, or GA4
  console.log('Event:', eventName, properties);

  // Example with Posthog
  // window.posthog?.capture(eventName, properties);
}

// Track key user actions
trackEvent('presentation_created', { slideCount: 10 });
trackEvent('outline_edited', { changesCount: 3 });
trackEvent('content_generated', { timeToGenerate: 45000 });
trackEvent('presentation_viewed', { theme: 'purple' });
```

---

## 📊 Test Reports

### Coverage Reports

```bash
# Generate coverage report
npm run test:coverage

# View in browser
open coverage/index.html
```

**Minimum Coverage Targets:**
- Statements: 70%
- Branches: 60%
- Functions: 70%
- Lines: 70%

---

## 🚀 CI/CD Integration

### GitHub Actions Workflow

```yaml
# .github/workflows/test.yml
name: Test Suite
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Install dependencies
        run: npm ci

      - name: Run linter
        run: npm run lint

      - name: Run type check
        run: npm run typecheck

      - name: Run unit tests
        run: npm run test:coverage

      - name: Upload coverage
        uses: codecov/codecov-action@v3
        with:
          files: ./coverage/coverage-final.json

      - name: Build
        run: npm run build

      - name: Run E2E tests
        run: npm run test:e2e
        env:
          CI: true
```

---

## 🔗 Next Steps

1. ✅ Understand testing strategy
2. → Run through MVP manual testing checklist
3. → Fix any bugs found during testing
4. → Set up error tracking (Sentry)
5. → Add analytics tracking
6. → (Post-MVP) Add automated tests
7. → (Post-MVP) Set up CI/CD pipeline
