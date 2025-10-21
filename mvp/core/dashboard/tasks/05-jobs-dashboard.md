# Task 05: Create Jobs Dashboard

**Phase**: Core Pages (Week 2, Day 1-2)
**Priority**: 🟠 HIGH
**Time**: 4-5 hours
**Dependencies**: 01, 02, 03

---

## Objective

Create a new Jobs dashboard page showing job applications and saved jobs.

---

## File to Create

`src/pages/dashboard/DashboardJobs.tsx`

---

## Features

### 1. Job Applications Section
- List all job applications
- Show application status (pending, reviewing, interview, rejected, accepted)
- Filter by status
- Link to job details

### 2. Saved Jobs Section
- List saved jobs
- Quick apply button
- Remove from saved

### 3. Job Stats
- Total applications
- Pending applications
- Interview count
- Acceptance rate

---

## Route Setup

Add to `src/App.tsx`:

```typescript
import DashboardJobs from '@/pages/dashboard/DashboardJobs';

// In routes:
<Route path="/dashboard/jobs" element={<DashboardJobs />} />
```

---

## Implementation

**Reference**: See `002-DASHBOARD-COMPREHENSIVE-PLAN.md` section "Jobs Dashboard" for complete layout.

```typescript
// Use hooks
const { data: applications, isLoading } = useJobApplications();
const { data: savedJobs } = useSavedJobs();

// Display with components
<JobCard job={job} />
<EmptyState icon={Briefcase} title="No applications yet" />
```

---

## Success Criteria

- [ ] Page created and routed
- [ ] Shows job applications
- [ ] Shows saved jobs
- [ ] Filter by status works
- [ ] Loading states work
- [ ] Empty states work
- [ ] Mobile responsive
- [ ] No TypeScript errors

---

## Testing

```bash
# TypeScript check
pnpm tsc --noEmit

# Visit page
open http://localhost:8080/dashboard/jobs

# Test:
# - Applications load
# - Filters work
# - Click actions work
# - Mobile view works
```

---

## Next Task

→ **06-events-dashboard.md**
