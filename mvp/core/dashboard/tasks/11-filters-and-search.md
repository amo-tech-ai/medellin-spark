# Task 11: Add Filters and Search

**Phase**: Enhanced Features (Week 3, Day 3-4)
**Priority**: 🟡 MEDIUM
**Time**: 3-4 hours
**Dependencies**: 10

---

## Objective

Add filtering and search functionality to all dashboard pages.

---

## Pages to Update

### 1. Jobs Dashboard
- Filter by status (pending, reviewing, interview)
- Filter by date range
- Search by job title or company

### 2. Events Dashboard
- Filter by upcoming/past
- Filter by virtual/in-person
- Search by event title

### 3. Pitch Decks Dashboard
- Filter by status (draft, published)
- Sort by date (newest, oldest)
- Search by title

### 4. Perks Dashboard
- Filter by category (software, hardware, services)
- Filter by claimed/unclaimed
- Search by perk name

---

## Implementation Pattern

```typescript
// Add state
const [filters, setFilters] = useState({
  status: 'all',
  search: '',
  dateRange: null
});

// Filter data
const filteredData = useMemo(() => {
  return data?.filter(item => {
    // Apply filters
    if (filters.status !== 'all' && item.status !== filters.status) return false;
    if (filters.search && !item.title.toLowerCase().includes(filters.search.toLowerCase())) return false;
    return true;
  });
}, [data, filters]);

// Render
<FilterPanel filters={filters} onChange={setFilters} />
<SearchInput value={filters.search} onChange={(v) => setFilters({...filters, search: v})} />
```

---

## Success Criteria

- [ ] All pages have filters
- [ ] Search works on all pages
- [ ] Filters update URL params
- [ ] Filters persist on page refresh
- [ ] Clear filters button works
- [ ] Filter counts update
- [ ] No TypeScript errors

---

## Testing

```bash
# TypeScript check
pnpm tsc --noEmit

# Test each page:
open http://localhost:8080/dashboard/jobs
# - Apply status filter → updates list
# - Search → filters results
# - Clear filters → resets

open http://localhost:8080/dashboard/events
# - Filter virtual/in-person → works
# - Search event name → works

open http://localhost:8080/dashboard/pitch-decks
# - Filter by status → works
# - Sort by date → works
```

---

## Next Task

→ **12-performance-optimization.md**
