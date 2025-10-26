---
name: testing-workflow
description: Comprehensive testing workflow for E2E, integration, and unit tests. Use when testing applications layer-by-layer, validating user journeys, or running test suites.
version: 1.0.0
---

# Testing Workflow Skill

## Purpose
Guide comprehensive testing following the layer-by-layer approach. Test systematically from database → backend → frontend → E2E.

---

## Testing Philosophy

**DON'T**: Test entire system at once
**DO**: Test each layer independently, bottom-up

```
Layer 1: Database ✅ → SQL queries
Layer 2: Backend ✅ → API/Edge Functions
Layer 3: Frontend 🟡 → Component testing
Layer 4: E2E 🔴 → Complete user journeys
```

---

## Quick Navigation

### 🗄️ Layer 1: Database
**Test SQL, RLS policies, migrations**
- See [DATABASE.md](DATABASE.md)
- Quick SQL tests, RLS verification, policy checks

### ⚙️ Layer 2: Backend
**Test Edge Functions, APIs**
- See [BACKEND.md](BACKEND.md)
- Function deployment, secrets, logs

### 🎨 Layer 3: Frontend
**Test components, UI**
- See [FRONTEND.md](FRONTEND.md)
- Component rendering, TypeScript, build

### 🚀 Layer 4: E2E
**Test complete user journeys**
- See [E2E.md](E2E.md)
- Playwright tests, full workflows

---

## Quick Test Commands

### Pre-Commit Check (30 sec)
```bash
pnpm tsc && pnpm build
```

### Full Test Suite (5 min)
```bash
pnpm tsc && pnpm build && npx playwright test
```

### Watch Mode
```bash
npx playwright test --ui
```

---

## Testing Layers

| Layer | What | Tools | Time |
|-------|------|-------|------|
| 1. Database | SQL, RLS | Supabase, psql | 2 min |
| 2. Backend | Edge Functions | curl, Supabase CLI | 3 min |
| 3. Frontend | Components | TypeScript, Build | 2 min |
| 4. E2E | User journeys | Playwright | 5 min |

---

## Pre-Deployment Testing

### Complete Test Run (15 min)

```bash
# 1. Type check
pnpm tsc --noEmit

# 2. Build
pnpm build

# 3. Start dev server (background)
pnpm dev &

# 4. Manual smoke test
# - Visit /pitch-deck-wizard
# - Send message
# - Verify response

# 5. Run E2E tests
npx playwright test

# 6. Check production build
pnpm preview
```

---

## Production Readiness Checklist

### Code Quality
- [ ] `pnpm tsc --noEmit` → 0 errors
- [ ] `pnpm lint` → 0 warnings
- [ ] `pnpm build` → succeeds
- [ ] No `console.log` in production code

### Functionality
- [ ] Wizard works (AI responds)
- [ ] Progress tracking (0-100%)
- [ ] Deck generation works
- [ ] All slides render

### Backend
- [ ] Edge Functions deployed
- [ ] Secrets configured
- [ ] Database migrations applied
- [ ] RLS enabled

### Testing
- [ ] Manual tests pass
- [ ] E2E tests pass
- [ ] No console errors
- [ ] No network errors

---

## Common Issues

### Tests Fail Due to RLS
```sql
-- Set test presentation public
UPDATE presentations
SET is_public = true
WHERE id = 'd4a27c1c-8b2d-48a9-99c9-2298037e9e81';
```

### Playwright Timeout
```typescript
// Increase timeout
await page.waitForSelector('element', { timeout: 30000 });
```

### TypeScript Errors
```bash
# Find all errors
pnpm tsc --noEmit | grep "error TS"
```

---

## Resources

- **Daily Checklist**: `lovable-plan/management/903-DAILY-TESTING-CHECKLIST.md`
- **Full Strategy**: `lovable-plan/docs/004-TESTING-STRATEGY-AND-IMPROVEMENTS.md`
- **Playwright Docs**: https://playwright.dev

---

**Start testing:** Begin with [DATABASE.md](DATABASE.md) for Layer 1
