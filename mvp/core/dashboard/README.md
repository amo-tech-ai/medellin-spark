# Dashboard Documentation Hub

**Project**: Medellin Spark - Startup Ecosystem Platform
**Location**: `/mvp/core/dashboard/`
**Status**: Complete Planning - Ready for Implementation ✅
**Date**: January 2025

**CRITICAL RULE**: ❌ **NO AUTH DURING DEVELOPMENT**

---

## 📚 Documentation Structure

Read documents in this order for complete understanding:

| # | Document | Purpose | Read Time |
|---|----------|---------|-----------|
| **000** | `DASHBOARD_SUPABASE_AUDIT.md` | Current state assessment | 10 min |
| **001** | `001-DASHBOARD-PAGES-PLAN.md` | High-level pages overview | 15 min |
| **002** | `002-DASHBOARD-COMPREHENSIVE-PLAN.md` | Complete technical plan | 45 min |
| **003** | `003-DASHBOARD-IMPLEMENTATION-TASKS.md` | Detailed task breakdown | 30 min |
| **004** | `004-DASHBOARD-TESTING-STRATEGY.md` | Testing approach with MCP | 30 min |
| **005** | `005-DASHBOARD-WORKFLOW-STEPS.md` | Step-by-step workflow | 30 min |
| **006** | `006-SUPABASE-REACT-BEST-PRACTICES.md` | Supabase + React patterns | 45 min |

**Total Reading Time**: ~3.25 hours
**Implementation Time**: 40-50 hours (1-2 weeks)

---

## 📚 Related Documentation

### Reference Materials (in `/mvp/core/05-reference/`)
- **dashboard-ui-layouts.md** - Stakeholder personas and ASCII UI layouts
- **decktopus-competitor-analysis.md** - Competitor research and insights
- **decktopus-ui-patterns.md** - UI/UX design patterns from Decktopus

### Historical Files (in `/mvp/notes/`)
- Original dashboard planning docs (Oct 17, 2025)
- Superseded by current 001-006 documentation
- Kept for historical reference only

---

## 🎯 Quick Start

### For Product Managers

**Read**: `001-DASHBOARD-PAGES-PLAN.md`

**Key Info**:
- 8 total dashboard pages (4 existing + 4 new)
- 3 implementation phases (4 weeks)
- Priority: Jobs page → Events → Pitch Decks → Perks

**Success Metrics**:
- All pages load in < 2 seconds
- 100% mobile responsive
- Zero console errors

---

### For Developers

**Read Order**:
1. `002-DASHBOARD-COMPREHENSIVE-PLAN.md` - Architecture & patterns
2. `003-DASHBOARD-IMPLEMENTATION-TASKS.md` - What to build
3. `005-DASHBOARD-WORKFLOW-STEPS.md` - How to build it

**Quick Setup**:
```bash
# 1. Install dependencies
pnpm install

# 2. Apply database migrations
npx supabase db push

# 3. Start dev server
pnpm dev

# 4. Navigate to dashboard
open http://localhost:8082/dashboard
```

---

### For QA/Testers

**Read**: `004-DASHBOARD-TESTING-STRATEGY.md`

**Testing Tools**:
- MCP Chrome DevTools (primary)
- MCP Playwright (E2E)
- React Testing Library (components)

**Daily Testing Checklist**:
```bash
# 1. TypeScript compiles
pnpm tsc --noEmit

# 2. All pages load
# Visit each /dashboard/* route

# 3. MCP Chrome DevTools validation
# Navigate → Snapshot → Console → Network → Screenshot

# 4. E2E tests pass
pnpm test:e2e
```

---

## 📊 Current State

### ✅ What We Have

**Pages** (4/8):
- Main Dashboard (`/dashboard`)
- Events (`/dashboard/events`)
- Pitch Decks (`/dashboard/pitch-decks`)
- Settings (`/dashboard/settings`)

**Components** (4/12):
- DashboardLayout
- DashboardSidebar
- DashboardHeader
- MetricCard

**Database**: All required tables exist (events, jobs, perks, presentations)

---

### ❌ What's Missing

**Pages** (4):
- Jobs Dashboard (`/dashboard/jobs`) - 🔴 HIGH PRIORITY
- Perks Dashboard (`/dashboard/perks`) - 🟡 MEDIUM PRIORITY
- Network Dashboard (`/dashboard/network`) - 🟢 LOW PRIORITY
- Analytics Dashboard (`/dashboard/analytics`) - 🟢 LOW PRIORITY

**Components** (8):
- EventCard, JobCard, PerkCard
- PresentationCard
- ActivityFeedItem
- EmptyState, LoadingState
- StatChart

**Database** (3 tables):
- `job_applications` (critical)
- `saved_jobs` (medium)
- `connections` (future)

**Connections**: All existing pages use hardcoded mock data

---

## 🚀 Implementation Phases

### Phase 1: Foundation (Week 1)
**Goal**: Database + Core Infrastructure

**Tasks**:
1. Create database migrations
2. Build custom hooks (useDashboardMetrics, useEvents, useJobs)
3. Create base components (EmptyState, LoadingState)
4. Connect main dashboard to Supabase

**Deliverable**: Dashboard showing real metrics

---

### Phase 2: Core Pages (Week 2)
**Goal**: Jobs, Events, Pitch Decks connected

**Tasks**:
1. Create Jobs dashboard page
2. Connect Events dashboard
3. Connect Pitch Decks dashboard
4. Connect Settings dashboard

**Deliverable**: All core pages functional with real data

---

### Phase 3: Enhanced Features (Week 3)
**Goal**: Perks + Advanced Components

**Tasks**:
1. Create Perks dashboard
2. Add charts and visualizations
3. Implement advanced filters
4. Performance optimization

**Deliverable**: Full-featured dashboard

---

### Phase 4: Polish (Week 4)
**Goal**: Production Ready

**Tasks**:
1. Full test coverage
2. Performance tuning
3. Accessibility audit
4. Documentation complete

**Deliverable**: Production-ready dashboard

---

## 🗂️ Database Requirements

### Migration to Apply

**File**: `supabase/migrations/20250120000000_dashboard_requirements.sql`

```sql
-- Create job_applications
CREATE TABLE job_applications (...);

-- Add location to events
ALTER TABLE events ADD COLUMN location TEXT;

-- Add view counts
ALTER TABLE profiles ADD COLUMN view_count INTEGER DEFAULT 0;
ALTER TABLE presentations ADD COLUMN view_count INTEGER DEFAULT 0;

-- Create saved_jobs
CREATE TABLE saved_jobs (...);
```

**Apply**:
```bash
npx supabase db push
```

---

## 🧪 Testing Strategy

### 4 Testing Layers

1. **Database** - SQL queries
2. **Hooks** - React Query integration
3. **Components** - React Testing Library
4. **E2E** - MCP Chrome DevTools + Playwright

### MCP Chrome DevTools Pattern

```typescript
// Standard test flow
1. Navigate: mcp__chrome-devtools__navigate_page({ url })
2. Snapshot: mcp__chrome-devtools__take_snapshot()
3. Console: mcp__chrome-devtools__list_console_messages()
4. Network: mcp__chrome-devtools__list_network_requests()
5. Screenshot: mcp__chrome-devtools__take_screenshot({ filename })
```

---

## 📈 Success Metrics

| Metric | Target | Status |
|--------|--------|--------|
| **Pages Complete** | 8/8 | 4/8 ⏳ |
| **Data Connected** | 100% | 0% ⏳ |
| **TypeScript Errors** | 0 | 0 ✅ |
| **Console Errors** | 0 | 0 ✅ |
| **Page Load Time** | < 2s | TBD |
| **Mobile Responsive** | 100% | 50% ⏳ |
| **Test Coverage** | 80% | 0% ⏳ |

---

## 🔧 Tech Stack

**Frontend**:
- React 18 + TypeScript
- Vite (build tool)
- TailwindCSS + shadcn/ui
- React Router v6

**Data Layer**:
- Supabase (PostgreSQL)
- React Query (data fetching)
- No authentication (dev mode)

**Testing**:
- MCP Chrome DevTools (E2E)
- MCP Playwright (automated E2E)
- React Testing Library (components)
- Vitest (unit tests)

---

## 📖 Key Patterns

### 1. No Auth Pattern

```typescript
// DEVELOPMENT ONLY
const mockUser = {
  id: '00000000-0000-0000-0000-000000000000',
  full_name: 'Alex Developer'
};

// Direct Supabase query (no user filtering)
const { data } = useQuery({
  queryFn: () => supabase.from('events').select('*')
});
```

### 2. Data Fetching Pattern

```typescript
// Custom hook
export function useDashboardMetrics() {
  return useQuery({
    queryKey: ['dashboard-metrics'],
    queryFn: async () => {
      const { data } = await supabase
        .from('registrations')
        .select('*', { count: 'exact', head: true });
      return { events: data.count };
    }
  });
}

// Component usage
const { data, isLoading, error } = useDashboardMetrics();
```

### 3. Component Pattern

```typescript
// Loading state
if (isLoading) return <LoadingState type="cards" count={4} />;

// Error state
if (error) return <Alert variant="destructive">{error.message}</Alert>;

// Empty state
if (!data || data.length === 0) {
  return (
    <EmptyState
      icon={Calendar}
      title="No events found"
      description="Register for events to see them here"
      action={{ label: "Browse Events", onClick: () => navigate('/events') }}
    />
  );
}

// Data rendering
return data.map(item => <ItemCard key={item.id} item={item} />);
```

---

## 🔍 Troubleshooting

### Issue: TypeScript Errors

```bash
# Check errors
pnpm tsc --noEmit

# Fix imports
# Ensure all types are properly defined

# Restart TypeScript server (VS Code)
# Cmd+Shift+P → "Restart TS Server"
```

### Issue: Data Not Loading

```bash
# 1. Check database tables exist
PGPASSWORD='Toronto2025#' psql -h db... -U postgres -d postgres -c "\dt"

# 2. Check Supabase connection
# Open browser DevTools → Network tab
# Verify requests to supabase.co

# 3. Check React Query DevTools
# Look for failed queries

# 4. Check console errors
# Open browser DevTools → Console tab
```

### Issue: Page Not Rendering

```bash
# 1. Check route exists in App.tsx
grep "/dashboard/jobs" src/App.tsx

# 2. Check component exports
# File must have: export default function PageName()

# 3. Check for runtime errors
# Open browser console

# 4. Test with MCP Chrome DevTools
mcp__chrome-devtools__navigate_page({ url: "..." })
mcp__chrome-devtools__list_console_messages()
```

---

## 📁 File Structure Reference

```
/home/sk/medellin-spark/
├── mvp/core/dashboard/          # 📍 You are here
│   ├── README.md               # This file
│   ├── DASHBOARD_SUPABASE_AUDIT.md
│   ├── 001-DASHBOARD-PAGES-PLAN.md
│   ├── 002-DASHBOARD-COMPREHENSIVE-PLAN.md
│   ├── 003-DASHBOARD-IMPLEMENTATION-TASKS.md
│   ├── 004-DASHBOARD-TESTING-STRATEGY.md
│   └── 005-DASHBOARD-WORKFLOW-STEPS.md
├── src/
│   ├── pages/
│   │   ├── Dashboard.tsx       ✅ Exists
│   │   ├── DashboardEvents.tsx ✅ Exists
│   │   ├── DashboardPitchDecks.tsx ✅ Exists
│   │   ├── DashboardSettings.tsx ✅ Exists
│   │   └── dashboard/
│   │       ├── DashboardJobs.tsx [NEW]
│   │       ├── DashboardPerks.tsx [NEW]
│   │       ├── DashboardNetwork.tsx [FUTURE]
│   │       └── DashboardAnalytics.tsx [FUTURE]
│   ├── components/dashboard/
│   │   ├── DashboardLayout.tsx ✅ Exists
│   │   ├── DashboardSidebar.tsx ✅ Exists
│   │   ├── DashboardHeader.tsx ✅ Exists
│   │   ├── MetricCard.tsx ✅ Exists
│   │   ├── EventCard.tsx [NEW]
│   │   ├── JobCard.tsx [NEW]
│   │   ├── PerkCard.tsx [NEW]
│   │   ├── EmptyState.tsx [NEW]
│   │   └── LoadingState.tsx [NEW]
│   └── hooks/
│       ├── useDashboardMetrics.ts [NEW]
│       ├── useEvents.ts [NEW]
│       ├── useJobs.ts [NEW]
│       └── usePerks.ts [NEW]
└── supabase/migrations/
    └── 20250120000000_dashboard_requirements.sql [NEW]
```

---

## 🎓 Learning Resources

### Supabase
- [Supabase Docs](https://supabase.com/docs)
- [PostgreSQL Tutorial](https://www.postgresql.org/docs/current/tutorial.html)

### React Query
- [React Query Docs](https://tanstack.com/query/latest)
- [React Query DevTools](https://tanstack.com/query/latest/docs/react/devtools)

### Testing
- [Playwright Docs](https://playwright.dev)
- [React Testing Library](https://testing-library.com/react)

### MCP Tools
- Chrome DevTools MCP: Available in Claude Code
- Playwright MCP: Available in Claude Code

---

## 📞 Getting Help

**Have Questions?**
1. Read the comprehensive plan (`002-DASHBOARD-COMPREHENSIVE-PLAN.md`)
2. Check the workflow steps (`005-DASHBOARD-WORKFLOW-STEPS.md`)
3. Review testing strategy (`004-DASHBOARD-TESTING-STRATEGY.md`)
4. Ask in team chat or create GitHub issue

---

## ✅ Pre-Implementation Checklist

Before starting implementation:
- [ ] Read all 6 documentation files
- [ ] Understand the architecture
- [ ] Set up development environment
- [ ] Database access working
- [ ] Dev server running
- [ ] MCP tools accessible
- [ ] Team aligned on approach

---

**Ready to start building?**

**Next Steps**:
1. Read `002-DASHBOARD-COMPREHENSIVE-PLAN.md` (45 min)
2. Review `003-DASHBOARD-IMPLEMENTATION-TASKS.md` (30 min)
3. Follow `005-DASHBOARD-WORKFLOW-STEPS.md` (start coding)

**Good luck! 🚀**

---

**Document Version**: 1.0
**Last Updated**: January 2025
**Status**: Complete ✅
