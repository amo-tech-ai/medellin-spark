# Task 13: Testing Coverage

**Phase**: Polish (Week 4, Day 2-3)
**Priority**: 🟢 LOW
**Time**: 4-5 hours
**Dependencies**: All previous tasks

---

## Objective

Add comprehensive testing for all dashboard features.

---

## Testing Layers

### 1. Database Tests

Test SQL queries and data integrity.

```bash
# File: tests/database/dashboard-queries.test.ts
# Test: job_applications table queries
# Test: metrics aggregation
# Test: RLS policies
```

### 2. Hook Tests

Test React Query hooks.

```bash
# File: tests/hooks/useDashboardMetrics.test.ts
# Test: Returns correct metrics
# Test: Handles errors
# Test: Caches data
```

### 3. Component Tests

Test UI components with React Testing Library.

```bash
# File: tests/components/EventCard.test.tsx
# Test: Renders event data
# Test: Click actions work
# Test: Loading states
```

### 4. E2E Tests

Test complete user journeys with MCP Playwright.

```bash
# File: e2e/dashboard.spec.ts
# Test: Navigate to dashboard
# Test: Metrics display
# Test: Navigate to Jobs page
# Test: Apply for job
```

---

## MCP Playwright E2E Tests

```typescript
// Navigate to dashboard
mcp__playwright__browser_navigate({ url: "http://localhost:8080/dashboard" })

// Verify metrics load
mcp__playwright__browser_snapshot()
mcp__playwright__browser_wait_for({ text: "Events Registered" })

// Navigate to Jobs page
mcp__playwright__browser_click({ element: "Jobs link", ref: "nav-jobs" })

// Verify jobs load
mcp__playwright__browser_wait_for({ text: "Job Applications" })
mcp__playwright__browser_take_screenshot({ filename: "jobs-dashboard.png" })

// Check for errors
mcp__playwright__browser_console_messages({ onlyErrors: true })
```

---

## Coverage Targets

- [ ] Database queries: 100%
- [ ] Hooks: 80%
- [ ] Components: 80%
- [ ] E2E flows: Critical paths (login, view, apply)

---

## Testing

```bash
# Run all tests
pnpm test

# Run with coverage
pnpm test:coverage

# E2E tests
pnpm test:e2e

# Check coverage
open coverage/index.html
```

---

## Success Criteria

- [ ] All tests pass
- [ ] Coverage > 80%
- [ ] No console errors in tests
- [ ] E2E tests cover critical flows
- [ ] Tests run in CI/CD

---

## Next Task

→ **14-documentation-and-cleanup.md**
