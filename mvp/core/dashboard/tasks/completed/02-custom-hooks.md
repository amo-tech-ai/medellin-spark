# Task 02: Create Custom Hooks

**Phase**: Foundation (Week 1, Day 1-2)
**Priority**: 🔴 CRITICAL
**Time**: 2-3 hours
**Dependencies**: 01-database-migration

---

## Objective

Create React Query hooks for dashboard data fetching.

---

## Files to Create

### 1. `src/hooks/useDashboardMetrics.ts`

Central hook for all dashboard metrics (events, jobs, perks, decks).

### 2. `src/hooks/useEvents.ts`

Hooks for fetching events data (`useEvents`, `useUpcomingEvents`).

### 3. `src/hooks/useJobs.ts`

Hooks for fetching jobs data (`useJobs`, `useJobApplications`).

### 4. `src/hooks/usePerks.ts`

Hooks for fetching perks data (`usePerks`, `usePerkClaims`).

---

## Implementation

```bash
cd /home/sk/medellin-spark/src/hooks

# Create each hook file
# Copy implementations from:
# mvp/core/dashboard/003-DASHBOARD-IMPLEMENTATION-TASKS.md
# Lines 119-400 (contains all hook code)
```

**Reference**: See `003-DASHBOARD-IMPLEMENTATION-TASKS.md` Task 1.2 for complete code.

---

## Success Criteria

- [ ] 4 hook files created
- [ ] All hooks use React Query
- [ ] All hooks handle errors
- [ ] TypeScript compiles without errors
- [ ] Hooks export proper types

---

## Validation

```bash
# TypeScript check
pnpm tsc --noEmit

# Check files exist
ls -la src/hooks/use*.ts

# Test import (in any component)
# import { useDashboardMetrics } from '@/hooks/useDashboardMetrics';
```

---

## Next Task

→ **03-base-components.md**
