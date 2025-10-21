# Task 04: Connect Main Dashboard

**Phase**: Foundation (Week 1, Day 3)
**Priority**: 🔴 CRITICAL
**Time**: 3-4 hours
**Dependencies**: 01, 02, 03

---

## Objective

Replace mock data in main dashboard with real Supabase data.

---

## File to Update

`src/pages/Dashboard.tsx`

---

## Implementation Steps

### 1. Import Custom Hooks

```typescript
import { useDashboardMetrics } from '@/hooks/useDashboardMetrics';
import { useUpcomingEvents } from '@/hooks/useEvents';
```

### 2. Replace Mock Data

```typescript
// OLD: const metrics = { ... hardcoded data }
// NEW: const { data: metrics, isLoading, error } = useDashboardMetrics();
```

### 3. Add Loading State

```typescript
if (isLoading) return <LoadingState type="cards" count={4} />;
```

### 4. Add Error Handling

```typescript
if (error) return <Alert variant="destructive">{error.message}</Alert>;
```

### 5. Update MetricCards

Use real data from `metrics` object.

---

## Success Criteria

- [ ] No mock data in Dashboard.tsx
- [ ] Real metrics display correctly
- [ ] Loading states work
- [ ] Error states work
- [ ] No console errors
- [ ] TypeScript compiles

---

## Testing

```bash
# 1. TypeScript check
pnpm tsc --noEmit

# 2. Start dev server
pnpm dev

# 3. Navigate to dashboard
open http://localhost:8080/dashboard

# 4. Check:
# - Metrics load from database
# - No console errors
# - Loading spinner shows initially
# - Data appears after loading
```

---

## MCP Testing

```typescript
// Navigate
mcp__chrome-devtools__navigate_page({ url: "http://localhost:8080/dashboard" })

// Snapshot
mcp__chrome-devtools__take_snapshot()

// Console
mcp__chrome-devtools__list_console_messages()

// Network
mcp__chrome-devtools__list_network_requests({ resourceTypes: ["fetch"] })

// Screenshot
mcp__chrome-devtools__take_screenshot({ fullPage: true })
```

---

## Next Task

→ **05-jobs-dashboard.md**
