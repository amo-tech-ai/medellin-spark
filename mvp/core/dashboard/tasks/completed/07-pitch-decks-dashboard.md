# Task 07: Connect Pitch Decks Dashboard

**Phase**: Core Pages (Week 2, Day 3)
**Priority**: 🟠 HIGH
**Time**: 2-3 hours
**Dependencies**: 02, 03

---

## Objective

Connect existing Pitch Decks dashboard page to Supabase data.

---

## File to Update

`src/pages/DashboardPitchDecks.tsx` (already exists)

---

## Implementation Steps

### 1. Replace Mock Data

```typescript
// OLD: const presentations = [...mock data]
// NEW: const { data: presentations, isLoading, error } = usePresentations();
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
if (!presentations || presentations.length === 0) {
  return (
    <EmptyState
      icon={FileText}
      title="No pitch decks yet"
      description="Create your first pitch deck to get started"
      action={{ label: "Create Pitch Deck", onClick: () => navigate('/pitch-deck-wizard') }}
    />
  );
}
```

### 5. Use PresentationCard Component

```typescript
<PresentationCard presentation={presentation} />
```

---

## Success Criteria

- [ ] No mock data
- [ ] Real presentations from Supabase
- [ ] Loading states work
- [ ] Error states work
- [ ] Empty state works
- [ ] PresentationCard displays correctly
- [ ] Create new deck button works
- [ ] No TypeScript errors

---

## Testing

```bash
# TypeScript check
pnpm tsc --noEmit

# Visit page
open http://localhost:8080/dashboard/pitch-decks

# Test:
# - Presentations load from database
# - Loading spinner shows
# - No console errors
# - Click presentation → editor
# - Create new deck → wizard
```

---

## Next Task

→ **08-settings-dashboard.md**
