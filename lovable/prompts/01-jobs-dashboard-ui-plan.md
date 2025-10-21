# Jobs Dashboard UI Implementation Plan

**Priority:** HIGH - MVP Core Feature
**Phase:** Phase 1 - Mock Data UI Implementation
**Estimated Time:** 2-3 hours

---

## Implementation Order

### Step 1: Create Job Card Component (30 min)
**File:** `src/components/dashboard/jobs/JobCard.tsx`

**Requirements:**
- Accept job data as props
- Display job title, company, description
- Show job type badge, remote badge, location, salary
- Bookmark button in top-right (toggleable)
- Apply button in footer (disables after apply)
- Use existing Card, Button, Badge components
- Add hover-lift effect
- Icons: Building2, MapPin, DollarSign, Bookmark

**Mock Props Interface:**
```typescript
interface JobCardProps {
  job: {
    id: string;
    title: string;
    company_name: string;
    description: string;
    type: string;
    location: string;
    remote_allowed: boolean;
    salary_min: number;
    salary_max: number;
    salary_currency: string;
  };
  isSaved: boolean;
  hasApplied: boolean;
  onSave: () => void;
  onApply: () => void;
}
```

---

### Step 2: Create Main Dashboard Page (45 min)
**File:** `src/pages/DashboardJobs.tsx`

**Structure:**
1. Page Header
   - H1: "Jobs Board"
   - Description: "Browse startup opportunities and track your applications"

2. Metrics Row (4 MetricCards)
   - Total Applications (Briefcase, mock: 12)
   - Active Applications (FileText, mock: 5, trend: +2)
   - Interviews (Calendar, mock: 3)
   - Saved Jobs (Bookmark, mock: 7)

3. Job Listings Section
   - H2: "Available Positions"
   - Responsive grid: 1/2/3 columns
   - Map 6 mock jobs to JobCard components
   - LoadingState while loading
   - EmptyState if no jobs

**Mock Data:**
```typescript
const mockJobs = [
  {
    id: '1',
    title: 'Senior AI Engineer',
    company_name: 'TechFlow AI',
    description: 'Join our team building cutting-edge AI solutions...',
    type: 'Full-time',
    location: 'Medellín, Colombia',
    remote_allowed: true,
    salary_min: 80000,
    salary_max: 120000,
    salary_currency: 'USD'
  },
  // ... 5 more jobs
];

const mockMetrics = {
  totalApplications: 12,
  activeApplications: 5,
  interviews: 3,
  savedJobs: 7
};
```

**State Management:**
```typescript
const [savedJobIds, setSavedJobIds] = useState<string[]>(['1', '3']);
const [appliedJobIds, setAppliedJobIds] = useState<string[]>(['2']);
```

---

### Step 3: Add Routing (10 min)
**File:** `src/App.tsx`

Add route:
```tsx
<Route path="/dashboard/jobs" element={<DashboardJobs />} />
```

---

### Step 4: Verify & Polish (20 min)

**Testing Checklist:**
- [ ] Page loads at /dashboard/jobs
- [ ] All 4 metrics display with correct icons
- [ ] 6 job cards display in grid
- [ ] Grid is responsive (3/2/1 columns)
- [ ] Bookmark toggle works (icon fills/empties)
- [ ] Apply button disables and shows "Applied"
- [ ] Metrics update after bookmark/apply actions
- [ ] Hover effects work on cards
- [ ] Typography matches Dashboard.tsx
- [ ] Spacing matches Dashboard.tsx
- [ ] No TypeScript errors
- [ ] No console errors

**Visual Checks:**
- Mobile (< 640px): 1 column, stacked metrics
- Tablet (640-1024px): 2 columns
- Desktop (> 1024px): 3 columns
- All text readable
- Icons properly sized
- Buttons have hover states

---

## Component Architecture

```
DashboardJobs.tsx
├── DashboardLayout (existing)
│   ├── DashboardSidebar (existing)
│   └── DashboardHeader (existing)
├── Page Header (div)
├── Metrics Row (grid)
│   ├── MetricCard (existing) x4
├── Job Listings Section
│   ├── Section Header (h2)
│   └── Jobs Grid (grid)
│       └── JobCard (new) x6
```

---

## Styling Tokens to Use

**Colors:**
- `bg-background` - Page background
- `bg-card` - Card background
- `border-border` - Card borders
- `text-foreground` - Primary text
- `text-muted-foreground` - Secondary text
- `bg-primary` - Apply button
- `text-primary` - Accent elements

**Spacing:**
- Gap between metrics: `gap-4` or `gap-6`
- Section margin: `mb-8`
- Card padding: `p-6`
- Grid gap: `gap-4` or `gap-6`

**Typography:**
- Page title: `text-3xl font-bold`
- Section heading: `text-2xl font-semibold mb-6`
- Card title: `text-xl font-semibold`
- Body text: `text-sm` or `text-base`

---

## Mock Data Structure

### Job Listings (6 jobs)
1. Senior AI Engineer @ TechFlow AI - Remote, $80k-$120k
2. Machine Learning Engineer @ DataStart - Remote, $70k-$100k
3. Frontend Developer @ UILabs - Medellín, $50k-$80k
4. Product Manager @ GrowthCo - Hybrid, $90k-$130k
5. Backend Engineer @ CloudTech - Remote, $75k-$110k
6. DevOps Engineer @ InfraTech - Medellín, $85k-$125k

### Application States
- User saved: Jobs #1, #3
- User applied: Job #2
- All others: Not saved, not applied

---

## Phase 2 Prep (Not in this PR)

**Database Hooks to Create Later:**
- `useJobApplications()` - Fetch user's applications
- `useSavedJobs()` - Fetch user's saved jobs
- `useJobs()` - Fetch published job listings

**Mutations to Add Later:**
- `applyToJob(jobId)` - Create application
- `saveJob(jobId)` - Bookmark job
- `unsaveJob(jobId)` - Remove bookmark

---

## Success Criteria

**Must Have:**
- ✅ Visual design matches Dashboard.tsx
- ✅ All interactions work with mock data
- ✅ Responsive at all breakpoints
- ✅ No TypeScript errors
- ✅ Clean, reusable components
- ✅ Follows existing code patterns

**Deferred to Phase 2:**
- ⏸️ Real database queries
- ⏸️ Loading states
- ⏸️ Error handling
- ⏸️ Toast notifications
- ⏸️ Optimistic updates

---

**Status:** Ready to implement
**Next Step:** Create JobCard component with mock props
