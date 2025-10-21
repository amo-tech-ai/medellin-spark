# Task 06: Connect Events Dashboard

**Phase**: Core Pages (Week 2, Day 2)
**Priority**: 🟠 HIGH
**Time**: 2-3 hours
**Dependencies**: 02, 03

---

## Objective

Connect existing Events dashboard page to Supabase data.

---

## File to Update

`src/pages/DashboardEvents.tsx` (already exists)

---

## Implementation Steps

### 1. Replace Mock Data

```typescript
// OLD: const events = [...mock data]
// NEW: const { data: events, isLoading, error } = useEvents();
```

### 2. Add Loading State

```typescript
if (isLoading) return <LoadingState type="cards" count={6} />;
```

### 3. Add Error Handling

```typescript
if (error) return <Alert variant="destructive">{error.message}</Alert>;
```

### 4. Add Empty State

```typescript
if (!events || events.length === 0) {
  return (
    <EmptyState
      icon={Calendar}
      title="No events registered"
      description="Browse events and register to see them here"
      action={{ label: "Browse Events", onClick: () => navigate('/events') }}
    />
  );
}
```

### 5. Use EventCard Component

```typescript
<EventCard event={event} />
```

---

## Success Criteria

- [ ] No mock data
- [ ] Real events from Supabase
- [ ] Loading states work
- [ ] Error states work
- [ ] Empty state works
- [ ] EventCard displays correctly
- [ ] No TypeScript errors

---

## Testing

```bash
# TypeScript check
pnpm tsc --noEmit

# Visit page
open http://localhost:8080/dashboard/events

# Test:
# - Events load from database
# - Loading spinner shows
# - No console errors
# - Click event → details page
```

---

## Next Task

→ **07-pitch-decks-dashboard.md**
