# Task 12: Performance Optimization

**Phase**: Polish (Week 4, Day 1-2)
**Priority**: 🟢 LOW
**Time**: 3-4 hours
**Dependencies**: All previous tasks

---

## Objective

Optimize dashboard performance for production.

---

## Optimization Areas

### 1. React Query Optimization

```typescript
// Add stale time to reduce refetches
queryKey: ['dashboard-metrics'],
staleTime: 5 * 60 * 1000, // 5 minutes
cacheTime: 10 * 60 * 1000, // 10 minutes
```

### 2. Component Memoization

```typescript
// Memoize expensive components
const MemoizedEventCard = React.memo(EventCard);
const MemoizedJobCard = React.memo(JobCard);
```

### 3. Lazy Loading

```typescript
// Lazy load dashboard pages
const DashboardJobs = lazy(() => import('@/pages/dashboard/DashboardJobs'));
const DashboardPerks = lazy(() => import('@/pages/dashboard/DashboardPerks'));
```

### 4. Image Optimization

```typescript
// Add loading="lazy" to images
<img src={url} loading="lazy" alt={title} />
```

### 5. Database Query Optimization

```sql
-- Add indexes for common queries
CREATE INDEX idx_events_status_date ON events(status, event_date);
CREATE INDEX idx_presentations_profile_status ON presentations(profile_id, status);
```

---

## Performance Targets

- [ ] Page load < 2 seconds
- [ ] Time to Interactive < 3 seconds
- [ ] Lighthouse Performance > 90
- [ ] No layout shift (CLS < 0.1)
- [ ] First Contentful Paint < 1.5s

---

## Testing

```bash
# Build production
pnpm build

# Lighthouse audit
npx lighthouse http://localhost:8080/dashboard --view

# Bundle size analysis
npx vite-bundle-visualizer

# Performance profiling
# Open DevTools → Performance → Record
```

---

## MCP Chrome DevTools Testing

```typescript
// Performance trace
mcp__chrome-devtools__performance_start_trace({ reload: true, autoStop: true })

// Get insights
mcp__chrome-devtools__performance_analyze_insight({ insightName: "LCPBreakdown" })

// Network analysis
mcp__chrome-devtools__list_network_requests()
```

---

## Next Task

→ **13-testing-coverage.md**
