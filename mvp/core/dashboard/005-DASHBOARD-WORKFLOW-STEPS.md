# 🔄 Dashboard Implementation Workflow

**Project**: Medellin Spark Dashboard
**Approach**: Step-by-Step, Test-Driven, Continuous Validation
**Date**: January 2025

**RULE**: ❌ **NO AUTH DURING DEVELOPMENT**

---

## Implementation Philosophy

```
Plan → Code → Test → Verify → Commit → Repeat
```

**Every step includes**:
1. **Success Criteria** - How do you know it's done?
2. **Validation** - How do you test it works?
3. **Rollback Plan** - What if something breaks?

---

## Week 1: Foundation

### Day 1: Database Setup

#### Step 1: Create Migration File

**Action**:
```bash
cd /home/sk/medellin-spark

# Create migration file
cat > supabase/migrations/20250120000000_dashboard_requirements.sql << 'EOF'
-- Dashboard Requirements Migration
-- Created: January 20, 2025

-- 1. Create job_applications table
CREATE TABLE IF NOT EXISTS job_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  job_id UUID NOT NULL REFERENCES jobs(id) ON DELETE CASCADE,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'reviewing', 'interview', 'rejected', 'accepted')),
  cover_letter TEXT,
  resume_url TEXT,
  applied_at TIMESTAMPTZ DEFAULT NOW(),
  reviewed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_job_applications_profile ON job_applications(profile_id);
CREATE INDEX idx_job_applications_job ON job_applications(job_id);
CREATE INDEX idx_job_applications_status ON job_applications(status);

-- 2. Add location to events
ALTER TABLE events ADD COLUMN IF NOT EXISTS location TEXT;

-- 3. Add view counts
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS view_count INTEGER DEFAULT 0;
ALTER TABLE presentations ADD COLUMN IF NOT EXISTS view_count INTEGER DEFAULT 0;

-- 4. Create saved_jobs table
CREATE TABLE IF NOT EXISTS saved_jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  job_id UUID NOT NULL REFERENCES jobs(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(profile_id, job_id)
);

CREATE INDEX idx_saved_jobs_profile ON saved_jobs(profile_id);
EOF
```

**Success Criteria**:
- [ ] File created at `supabase/migrations/20250120000000_dashboard_requirements.sql`
- [ ] SQL syntax valid (no errors when reviewed)

**Validation**:
```bash
# Check file exists
ls -la supabase/migrations/20250120000000_dashboard_requirements.sql

# Check SQL syntax (dry run)
cat supabase/migrations/20250120000000_dashboard_requirements.sql
```

---

#### Step 2: Apply Migration

**Action**:
```bash
# Apply migration to database
npx supabase db push
```

**Success Criteria**:
- [ ] Migration applies without errors
- [ ] Tables created successfully
- [ ] Indexes created successfully

**Validation**:
```bash
# Verify tables exist
PGPASSWORD='Toronto2025#' psql \
  -h db.dhesktsqhcxhqfjypulk.supabase.co \
  -U postgres -d postgres \
  -c "\dt" | grep -E "job_applications|saved_jobs"

# Verify columns in events table
PGPASSWORD='Toronto2025#' psql \
  -h db.dhesktsqhcxhqfjypulk.supabase.co \
  -U postgres -d postgres \
  -c "\d events" | grep location

# Verify indexes
PGPASSWORD='Toronto2025#' psql \
  -h db.dhesktsqhcxhqfjypulk.supabase.co \
  -U postgres -d postgres \
  -c "\di" | grep job_applications
```

**Rollback Plan**:
```bash
# If migration fails, create rollback migration
cat > supabase/migrations/20250120000001_rollback_dashboard.sql << 'EOF'
DROP TABLE IF EXISTS saved_jobs;
DROP TABLE IF EXISTS job_applications;
ALTER TABLE events DROP COLUMN IF EXISTS location;
ALTER TABLE profiles DROP COLUMN IF EXISTS view_count;
ALTER TABLE presentations DROP COLUMN IF EXISTS view_count;
EOF

npx supabase db push
```

---

#### Step 3: Insert Test Data

**Action**:
```bash
# Create seed data script
cat > scripts/seed-dashboard-data.sql << 'EOF'
-- Insert test jobs
INSERT INTO jobs (id, company_id, title, description, type, location, remote_allowed, salary_min, salary_max, status)
SELECT
  gen_random_uuid(),
  (SELECT id FROM companies LIMIT 1),
  'Frontend Developer',
  'Build amazing UIs',
  'full-time',
  'Medellin',
  true,
  60000,
  90000,
  'published'
WHERE NOT EXISTS (SELECT 1 FROM jobs WHERE title = 'Frontend Developer');

-- Insert test application
INSERT INTO job_applications (profile_id, job_id, status, applied_at)
SELECT
  (SELECT id FROM profiles LIMIT 1),
  (SELECT id FROM jobs WHERE title = 'Frontend Developer' LIMIT 1),
  'pending',
  NOW()
WHERE NOT EXISTS (SELECT 1 FROM job_applications LIMIT 1);

-- Update events with location
UPDATE events SET location = 'Ruta N, Medellin' WHERE location IS NULL AND is_virtual = false;
UPDATE events SET location = 'Virtual' WHERE location IS NULL AND is_virtual = true;
EOF

# Run seed script
PGPASSWORD='Toronto2025#' psql \
  -h db.dhesktsqhcxhqfjypulk.supabase.co \
  -U postgres -d postgres \
  -f scripts/seed-dashboard-data.sql
```

**Success Criteria**:
- [ ] Test job inserted
- [ ] Test application inserted
- [ ] Events have locations

**Validation**:
```bash
# Check jobs
PGPASSWORD='Toronto2025#' psql \
  -h db.dhesktsqhcxhqfjypulk.supabase.co \
  -U postgres -d postgres \
  -c "SELECT id, title FROM jobs WHERE title = 'Frontend Developer';"

# Check applications
PGPASSWORD='Toronto2025#' psql \
  -h db.dhesktsqhcxhqfjypulk.supabase.co \
  -U postgres -d postgres \
  -c "SELECT COUNT(*) FROM job_applications;"

# Check events locations
PGPASSWORD='Toronto2025#' psql \
  -h db.dhesktsqhcxhqfjypulk.supabase.co \
  -U postgres -d postgres \
  -c "SELECT id, title, location FROM events LIMIT 5;"
```

---

### Day 2: Custom Hooks

#### Step 4: Create useDashboardMetrics Hook

**Action**:
```bash
# Create hooks directory if doesn't exist
mkdir -p src/hooks

# Create hook file
cat > src/hooks/useDashboardMetrics.ts << 'EOF'
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface DashboardMetrics {
  events: number;
  eventsThisMonth: number;
  jobs: number;
  jobsPending: number;
  perks: number;
  perksValue: number;
  decks: number;
  decksDrafts: number;
}

export function useDashboardMetrics() {
  return useQuery<DashboardMetrics>({
    queryKey: ['dashboard-metrics'],
    queryFn: async () => {
      const now = new Date();
      const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

      const [
        registrations,
        registrationsMonth,
        applications,
        applicationsPending,
        claims,
        presentations,
        draftPresentations
      ] = await Promise.all([
        supabase.from('registrations').select('*', { count: 'exact', head: true }),
        supabase.from('registrations').select('*', { count: 'exact', head: true }).gte('created_at', firstDayOfMonth.toISOString()),
        supabase.from('job_applications').select('*', { count: 'exact', head: true }),
        supabase.from('job_applications').select('*', { count: 'exact', head: true }).eq('status', 'pending'),
        supabase.from('perk_claims').select('*', { count: 'exact', head: true }),
        supabase.from('presentations').select('*', { count: 'exact', head: true }),
        supabase.from('presentations').select('*', { count: 'exact', head: true }).eq('status', 'draft')
      ]);

      return {
        events: registrations.count ?? 0,
        eventsThisMonth: registrationsMonth.count ?? 0,
        jobs: applications.count ?? 0,
        jobsPending: applicationsPending.count ?? 0,
        perks: claims.count ?? 0,
        perksValue: 12000,
        decks: presentations.count ?? 0,
        decksDrafts: draftPresentations.count ?? 0
      };
    }
  });
}
EOF
```

**Success Criteria**:
- [ ] File created at `src/hooks/useDashboardMetrics.ts`
- [ ] TypeScript compiles without errors
- [ ] Hook exports interface and function

**Validation**:
```bash
# TypeScript check
pnpm tsc --noEmit

# Expected: 0 errors
```

---

#### Step 5: Test Hook in Browser

**Action**:
```bash
# Start dev server
pnpm dev

# Create test page
cat > src/pages/TestMetrics.tsx << 'EOF'
import { useDashboardMetrics } from '@/hooks/useDashboardMetrics';

export default function TestMetrics() {
  const { data, isLoading, error } = useDashboardMetrics();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Dashboard Metrics Test</h1>
      <pre className="bg-gray-100 p-4 rounded">
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  );
}
EOF

# Add route to App.tsx
# <Route path="/test-metrics" element={<TestMetrics />} />
```

**Success Criteria**:
- [ ] Page loads at `http://localhost:8082/test-metrics`
- [ ] Metrics display correctly
- [ ] No console errors

**Validation with MCP Chrome DevTools**:
```
1. Navigate: mcp__chrome-devtools__navigate_page({ url: "http://localhost:8082/test-metrics" })
2. Wait: mcp__chrome-devtools__wait_for({ text: "Dashboard Metrics Test", timeout: 3000 })
3. Snapshot: mcp__chrome-devtools__take_snapshot()
4. Console: mcp__chrome-devtools__list_console_messages()
   Expected: No errors
5. Network: mcp__chrome-devtools__list_network_requests({ resourceTypes: ["fetch"] })
   Expected: All requests status 200
6. Screenshot: mcp__chrome-devtools__take_screenshot({ filename: "metrics-test.png" })
```

---

### Day 3: Base Components

#### Step 6: Create EmptyState Component

**Action**:
```bash
cat > src/components/dashboard/EmptyState.tsx << 'EOF'
import { LucideIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export function EmptyState({ icon: Icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mb-4">
        <Icon className="h-8 w-8 text-muted-foreground" />
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground max-w-sm mb-6">{description}</p>
      {action && (
        <Button onClick={action.onClick}>{action.label}</Button>
      )}
    </div>
  );
}
EOF
```

**Success Criteria**:
- [ ] Component created
- [ ] TypeScript compiles
- [ ] Component exports correctly

**Validation**:
```bash
# TypeScript check
pnpm tsc --noEmit

# Visual test in Storybook (if available) or test page
```

---

### Days 4-5: Connect Main Dashboard

#### Step 7: Update Dashboard.tsx

**Action**: Replace hardcoded data with hooks

**Before**:
```typescript
const metrics = {
  events: 12,
  jobs: 5,
  perks: 8,
  decks: 47
};
```

**After**:
```typescript
import { useDashboardMetrics } from '@/hooks/useDashboardMetrics';
import { LoadingState } from '@/components/dashboard/LoadingState';

const { data: metrics, isLoading } = useDashboardMetrics();

if (isLoading) return <LoadingState type="cards" count={4} />;
```

**Success Criteria**:
- [ ] Dashboard renders with real data
- [ ] Loading states show
- [ ] No console errors
- [ ] All metrics display correctly

**Validation**:
```bash
# 1. Start server
pnpm dev

# 2. Navigate to dashboard
# http://localhost:8082/dashboard

# 3. MCP Chrome DevTools test
```

**MCP Test**:
```
1. Navigate: mcp__chrome-devtools__navigate_page({ url: "http://localhost:8082/dashboard" })
2. Wait: mcp__chrome-devtools__wait_for({ text: "Welcome back", timeout: 5000 })
3. Snapshot: mcp__chrome-devtools__take_snapshot()
   Verify: 4 metric cards exist
4. Console: mcp__chrome-devtools__list_console_messages()
   Expected: No errors
5. Network: mcp__chrome-devtools__list_network_requests({ resourceTypes: ["fetch"] })
   Expected: Successful Supabase queries
6. Screenshot: mcp__chrome-devtools__take_screenshot({ filename: "dashboard-connected.png" })
```

---

## Week 2: Core Pages

### Day 6-7: Jobs Dashboard

#### Step 8: Create useJobs Hook

(Similar pattern to Step 4)

#### Step 9: Create JobCard Component

(Similar pattern to Step 6)

#### Step 10: Create DashboardJobs Page

(Similar pattern to Step 7)

#### Step 11: Test Jobs Page

**MCP Chrome DevTools Validation**:
```
1. Navigate: mcp__chrome-devtools__navigate_page({ url: "http://localhost:8082/dashboard/jobs" })
2. Wait: mcp__chrome-devtools__wait_for({ text: "Job Opportunities", timeout: 3000 })
3. Snapshot: mcp__chrome-devtools__take_snapshot()
4. Click Filter: mcp__chrome-devtools__click({ uid: "job-type-filter-123" })
5. Verify Results: mcp__chrome-devtools__take_snapshot()
6. Screenshot: mcp__chrome-devtools__take_screenshot({ filename: "jobs-page.png" })
```

---

### Days 8-10: Events, Pitch Decks, Settings

(Repeat workflow for each page)

---

## Continuous Validation Pattern

**After Every Feature**:

```bash
# 1. TypeScript check
pnpm tsc --noEmit

# 2. Start dev server
pnpm dev

# 3. MCP Chrome DevTools test
# Navigate → Snapshot → Console → Network → Screenshot

# 4. Manual interaction test
# Click buttons, fill forms, navigate

# 5. Commit if all pass
git add .
git commit -m "feat: Add [feature name]"
```

---

## Daily Checklist

**End of Each Day**:
```
[ ] All TypeScript compiles (0 errors)
[ ] All pages load without errors
[ ] All data fetches successfully
[ ] Screenshots captured for reference
[ ] Progress documented
[ ] Code committed to git
[ ] Testing notes updated
```

---

## Weekly Milestones

### Week 1 Complete
```
✅ Database tables created
✅ Custom hooks working
✅ Base components created
✅ Main dashboard connected
✅ All tests passing
```

### Week 2 Complete
```
✅ Jobs page functional
✅ Events page functional
✅ Pitch decks page functional
✅ Settings page functional
✅ All user journeys work
```

### Week 3 Complete
```
✅ Perks page functional
✅ Advanced components added
✅ Charts rendering
✅ Performance optimized
```

### Week 4 Complete
```
✅ All 8 pages complete
✅ Full test coverage
✅ Documentation updated
✅ Production ready
```

---

## Emergency Procedures

### If Something Breaks

**Step 1: Identify the Issue**
```bash
# Check TypeScript
pnpm tsc --noEmit

# Check console errors
# Open browser DevTools → Console tab

# Check network errors
# Open browser DevTools → Network tab
```

**Step 2: Isolate the Problem**
```bash
# Test individual component
# Create isolated test page

# Test hook separately
# Use React Query DevTools
```

**Step 3: Fix or Rollback**
```bash
# Option A: Fix the issue
# Make targeted changes, test, commit

# Option B: Rollback to last working commit
git log --oneline
git checkout <last-working-commit>
```

---

## Success Criteria Summary

**Dashboard is "Complete" when**:
- [ ] All 8 pages created and functional
- [ ] All pages connect to Supabase
- [ ] All components responsive (mobile, tablet, desktop)
- [ ] Loading states implemented
- [ ] Empty states implemented
- [ ] Error handling implemented
- [ ] TypeScript compiles (0 errors)
- [ ] No console errors
- [ ] All E2E tests passing
- [ ] Performance acceptable (< 2s page load)
- [ ] Screenshots captured for all pages
- [ ] Documentation complete

---

**Document Version**: 1.0
**Last Updated**: January 2025
**Status**: Ready for Implementation ✅
