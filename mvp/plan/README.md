# MVP Implementation Plan

**Purpose**: Centralized implementation guides for Pitch Deck and Dashboard features
**Organization**: Core → Intermediate → Advanced progression
**Time**: Complete guides for 1-4 week implementations

---

## 📁 Folder Structure

```
plan/
├── README.md                    ← You are here
├── pitch-deck/
│   ├── 01-core.md              ← 2-4 hours: Foundation
│   ├── 02-intermediate.md      ← 5-7 days: Core features
│   └── 03-advanced.md          ← 1-2 weeks: Professional features
└── dashboard/
    ├── 01-core.md              ← 9-13 hours: Foundation
    ├── 02-intermediate.md      ← 10-14 hours: Core pages
    └── 03-advanced.md          ← 10-13 hours: Professional features
```

---

## 🎯 How to Use This Plan

### Step 1: Choose Your Feature

**Pitch Deck**: AI-powered presentation generation
**Dashboard**: User dashboard with jobs, events, analytics

### Step 2: Follow Implementation Order

Always implement in order: **Core → Intermediate → Advanced**

**Why?** Each level builds on the previous. Core establishes foundation, Intermediate adds features, Advanced adds polish.

### Step 3: Track Progress

Each guide includes:
- ✅ Success criteria
- 🧪 Testing commands
- ⚠️ Common issues & fixes
- ⏱️ Time estimates

---

## 📊 Pitch Deck Implementation

### 01-core.md - Foundation (2-4 hours)

**What You'll Build**:
- Database tables (pitch_conversations, presentations)
- Chat Edge Function (OpenAI integration)
- Basic chat interface
- Authentication setup

**Outcome**: Working chat interface that talks to AI

**Prerequisites**: Supabase project, OpenAI API key

**Files Created**:
- `supabase/migrations/20250120000000_pitch_deck_foundation.sql`
- `supabase/functions/chat/index.ts`
- `src/pages/PitchDeckWizard.tsx`

---

### 02-intermediate.md - Core Features (5-7 days)

**What You'll Build**:
- Conversation state management with progress tracking
- Data extraction using OpenAI function calling
- Outline generation (10 slides)
- Outline editor with drag-and-drop
- Basic slide viewer with keyboard navigation

**Outcome**: Complete MVP - users can chat, generate decks, edit, and view

**Prerequisites**: 01-core.md complete

**Files Created**:
- Updated `supabase/functions/chat/index.ts` (with function calling)
- `supabase/functions/generate-pitch-deck/index.ts`
- `src/pages/presentations/OutlineEditor.tsx`
- `src/pages/presentations/PresentationViewer.tsx`

---

### 03-advanced.md - Professional Features (1-2 weeks)

**What You'll Build**:
- Rich text editing with Plate.js
- Template system (multiple deck types)
- PDF export
- Custom themes
- Analytics and view tracking
- Collaboration (optional)

**Outcome**: Enterprise-ready pitch deck platform

**Prerequisites**: 01-core.md and 02-intermediate.md complete

**Optional Features**: Pick and choose based on requirements

---

## 📊 Dashboard Implementation

### 01-core.md - Foundation (9-13 hours)

**What You'll Build**:
- Database tables (job_applications, saved_jobs)
- React Query hooks (useDashboardMetrics, useEvents)
- Base UI components (EmptyState, LoadingState, EventCard)
- Main dashboard with real metrics

**Outcome**: Working dashboard showing real data from Supabase

**Prerequisites**: React, TypeScript, Supabase setup

**Files Created**:
- `supabase/migrations/20250120000000_dashboard_foundation.sql`
- `src/hooks/useDashboardMetrics.ts`
- `src/hooks/useEvents.ts`
- `src/components/dashboard/EmptyState.tsx`
- `src/components/dashboard/LoadingState.tsx`
- `src/components/dashboard/EventCard.tsx`
- Updated `src/pages/Dashboard.tsx`

---

### 02-intermediate.md - Core Pages (10-14 hours)

**What You'll Build**:
- Jobs dashboard (browse, filter, apply)
- Events dashboard (upcoming, past, registered)
- Pitch Decks dashboard (list, edit, view)
- Settings page (profile, notifications, privacy)

**Outcome**: Complete dashboard with all major pages

**Prerequisites**: 01-core.md complete

**Files Created**:
- `src/pages/DashboardJobs.tsx`
- `src/pages/DashboardEvents.tsx`
- `src/pages/DashboardPitchDecks.tsx`
- `src/pages/Settings.tsx`
- `src/hooks/useJobs.ts`
- `src/hooks/usePresentations.ts`
- `src/components/dashboard/JobCard.tsx`
- `src/components/dashboard/PresentationCard.tsx`

---

### 03-advanced.md - Professional Features (10-13 hours)

**What You'll Build**:
- Charts and analytics with Recharts
- Advanced filtering and search
- Performance optimization (pagination, virtual scrolling)
- Testing coverage (unit, integration)
- Production polish (error boundaries, loading states)

**Outcome**: Production-ready dashboard with analytics

**Prerequisites**: 01-core.md and 02-intermediate.md complete

**Files Created**:
- `src/components/dashboard/charts/MetricsChart.tsx`
- `src/pages/DashboardAnalytics.tsx`
- `src/hooks/useAnalytics.ts`
- `src/components/dashboard/AdvancedFilters.tsx`
- Test files in `src/__tests__/`
- `src/components/ErrorBoundary.tsx`

---

## ⏱️ Time Estimates

### Pitch Deck Total

| Level | Time | Cumulative |
|-------|------|------------|
| Core | 2-4 hours | 2-4 hours |
| Intermediate | 5-7 days | 1 week |
| Advanced | 1-2 weeks | 2-3 weeks |

**Total**: 2-3 weeks for complete implementation

### Dashboard Total

| Level | Time | Cumulative |
|-------|------|------------|
| Core | 9-13 hours | 1-2 days |
| Intermediate | 10-14 hours | 3-4 days |
| Advanced | 10-13 hours | 5-7 days |

**Total**: 29-40 hours (1-2 weeks for complete implementation)

---

## 🎓 Difficulty Progression

### Core (Beginner-Intermediate)
- Database setup
- Basic hooks
- Simple components
- Edge Functions (basics)

### Intermediate (Intermediate)
- State management
- CRUD operations
- Drag-and-drop
- Tabs and filtering
- OpenAI integration

### Advanced (Advanced)
- Rich text editing
- Charts and analytics
- Performance optimization
- Testing
- Production deployment

---

## ✅ Success Criteria

Each guide includes specific success criteria. General criteria:

### Functional
- [ ] All features work as described
- [ ] No critical bugs
- [ ] User flows complete end-to-end

### Technical
- [ ] TypeScript compiles (0 errors)
- [ ] No console errors
- [ ] Database queries optimized
- [ ] Edge Functions deployed

### Quality
- [ ] Mobile responsive
- [ ] Loading states present
- [ ] Error handling comprehensive
- [ ] Tests passing (Advanced level)

---

## 🧪 Testing Strategy

### Core Level
- Manual testing
- Browser console checks
- Database query verification

### Intermediate Level
- End-to-end user flows
- Cross-browser testing
- Mobile device testing

### Advanced Level
- Unit tests (hooks, utilities)
- Component tests
- Integration tests
- Performance testing (Lighthouse)

---

## 🚀 Deployment Path

### After Core
- **Deploy**: Edge Functions, database migrations
- **Test**: Basic functionality works
- **Status**: Demo-ready

### After Intermediate
- **Deploy**: All features, routes configured
- **Test**: Complete user journeys
- **Status**: MVP-ready

### After Advanced
- **Deploy**: Production build, performance optimized
- **Test**: Full QA, security audit
- **Status**: Production-ready

---

## 📋 Common Patterns

### Database Migrations
```sql
-- Always idempotent
CREATE TABLE IF NOT EXISTS table_name (...);
ALTER TABLE table_name ADD COLUMN IF NOT EXISTS column_name TYPE;
```

### React Query Hooks
```typescript
export function useResource() {
  return useQuery({
    queryKey: ['resource'],
    queryFn: async () => { ... },
    staleTime: 5 * 60 * 1000,
  });
}
```

### Edge Functions
```typescript
serve(async (req) => {
  const corsHeaders = { /* CORS setup */ };
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    // Function logic
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
});
```

---

## 🔧 Troubleshooting

### Common Issues

**TypeScript Errors**:
```bash
pnpm tsc --noEmit
# Fix all type errors before proceeding
```

**Database Issues**:
```bash
# Check tables exist
PGPASSWORD='...' psql -h ... -c "\dt"

# Check RLS enabled
SELECT tablename, rowsecurity FROM pg_tables WHERE tablename = 'your_table';
```

**Edge Function Issues**:
```bash
# Check logs
supabase functions logs function-name --tail

# Test locally
supabase functions serve
```

---

## 📚 Documentation References

### Pitch Deck Docs
- Full documentation: `/home/sk/medellin-spark/mvp/pitch-deck/docs/`
- Research: `/home/sk/medellin-spark/mvp/pitch-deck/research/`
- Diagrams: `/home/sk/medellin-spark/mvp/pitch-deck/diagrams/`

### Dashboard Docs
- Original plans: `/home/sk/medellin-spark/mvp/core/dashboard/`
- Tasks: `/home/sk/medellin-spark/mvp/core/dashboard/tasks/`

### Main Project
- Project memory: `/home/sk/medellin-spark/CLAUDE.md`
- Security: `/home/sk/medellin-spark/docs/SECURITY_STATUS.md`

---

## 🎯 Quick Start

### For Pitch Deck
```bash
cd /home/sk/medellin-spark/mvp/plan/pitch-deck
cat 01-core.md  # Read foundation guide
# Follow steps in order
```

### For Dashboard
```bash
cd /home/sk/medellin-spark/mvp/plan/dashboard
cat 01-core.md  # Read foundation guide
# Follow steps in order
```

---

## 📊 Feature Comparison

| Feature | Pitch Deck | Dashboard |
|---------|-----------|-----------|
| **Primary Function** | AI presentation generation | User activity hub |
| **Main Tech** | OpenAI, Edge Functions | React Query, Supabase |
| **Complexity** | High (AI integration) | Medium (CRUD + UI) |
| **Time** | 2-3 weeks | 1-2 weeks |
| **Dependencies** | OpenAI API key | Supabase tables |

---

## 🎓 Learning Path

### Beginner Developer
**Start with**: Dashboard Core → Dashboard Intermediate
**Why**: CRUD operations, basic hooks, standard patterns
**Time**: 1 week

### Intermediate Developer
**Start with**: Pitch Deck Core → Pitch Deck Intermediate
**Why**: AI integration, state management, complex flows
**Time**: 1-2 weeks

### Advanced Developer
**Do**: Both features, all levels
**Time**: 3-4 weeks (parallel development)

---

## 📞 Need Help?

### Stuck on Core?
- Review prerequisites
- Check database connection
- Verify environment variables

### Stuck on Intermediate?
- Review Core completion
- Check all imports
- Verify routes configured

### Stuck on Advanced?
- Review Intermediate completion
- Check package versions
- Review error logs

---

## ✨ Best Practices

1. **Always implement in order** (Core → Intermediate → Advanced)
2. **Test after each major step**
3. **Commit frequently** with descriptive messages
4. **Check success criteria** before moving forward
5. **Document any deviations** from the guide
6. **Ask for clarification** if stuck for >30 minutes

---

**Created**: January 2025
**Last Updated**: January 2025
**Status**: ✅ Complete and ready for implementation
**Maintainer**: Medellin Spark Development Team
