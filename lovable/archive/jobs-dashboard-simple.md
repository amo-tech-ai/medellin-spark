# Jobs Dashboard - Simple Phased Implementation

**Route:** `/dashboard/jobs`
**Style:** Match existing Dashboard, Events, and Pitch Decks pages
**Approach:** Build UI first, then connect data

---

## Phase 1: UI/UX Wireframe (START HERE)

### Layout Structure

Copy the exact layout from `src/pages/Dashboard.tsx`:

```
┌─────────────────────────────────────────────┐
│ Header: "Jobs Board"                        │
│ Subtitle: "Browse opportunities and track   │
│           your applications"                │
└─────────────────────────────────────────────┘

┌──────────┬──────────┬──────────┬──────────┐
│ Metric 1 │ Metric 2 │ Metric 3 │ Metric 4 │
│ Total    │ Active   │ Interview│ Saved    │
│ Apps     │ Apps     │          │ Jobs     │
└──────────┴──────────┴──────────┴──────────┘

┌─────────────────────────────────────────────┐
│ Section: "Available Positions"              │
└─────────────────────────────────────────────┘

┌────────────┬────────────┬────────────┐
│ Job Card 1 │ Job Card 2 │ Job Card 3 │
│            │            │            │
│ [Company]  │ [Company]  │ [Company]  │
│ [Title]    │ [Title]    │ [Title]    │
│ [Location] │ [Location] │ [Location] │
│ [Salary]   │ [Salary]   │ [Salary]   │
│            │            │            │
│ [Apply]    │ [Apply]    │ [Apply]    │
└────────────┴────────────┴────────────┘
```

### Components to Use (EXISTING)

**From shadcn/ui:**
- Card, CardHeader, CardTitle, CardContent, CardFooter
- Button
- Badge

**From our codebase:**
- `DashboardLayout` (wraps everything)
- `MetricCard` (for the 4 metrics)
- `LoadingState` (while data loads)
- `EmptyState` (when no jobs)

**Icons from lucide-react:**
- Briefcase (Total Applications)
- FileText (Active Applications)
- Calendar (Interviews)
- Bookmark (Saved Jobs)
- MapPin (Location)
- DollarSign (Salary)
- Building2 (Company)

### Responsive Grid

```tsx
// Desktop: 3 columns, Tablet: 2 columns, Mobile: 1 column
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {jobs.map(job => <JobCard key={job.id} {...job} />)}
</div>
```

---

## Phase 2: Create Job Card Component

**File:** `src/components/dashboard/jobs/JobCard.tsx`

### Card Structure

```tsx
<Card className="hover-lift"> {/* Use existing hover effect */}
  <CardHeader>
    <div className="flex justify-between items-start">
      <div>
        <CardTitle>{job.title}</CardTitle>
        <p className="text-sm text-muted-foreground">
          <Building2 className="inline h-4 w-4" /> {job.company_name}
        </p>
      </div>
      <Button variant="ghost" size="icon">
        <Bookmark /> {/* Filled if saved */}
      </Button>
    </div>
  </CardHeader>

  <CardContent>
    <p className="line-clamp-2 text-sm">{job.description}</p>

    <div className="flex gap-2 mt-4">
      <Badge>{job.type}</Badge>
      {job.remote_allowed && <Badge variant="secondary">Remote</Badge>}
    </div>

    <div className="flex gap-4 mt-4 text-sm text-muted-foreground">
      <span><MapPin className="inline h-4 w-4" /> {job.location}</span>
      <span><DollarSign className="inline h-4 w-4" /> {salary}</span>
    </div>
  </CardContent>

  <CardFooter>
    <Button className="w-full">Apply Now</Button>
  </CardFooter>
</Card>
```

### Props Interface

```tsx
interface JobCardProps {
  id: string;
  title: string;
  company_name: string;
  description: string;
  type: string;
  location: string;
  remote_allowed: boolean;
  salary_min?: number;
  salary_max?: number;
  salary_currency?: string;
  isSaved?: boolean;
  hasApplied?: boolean;
  onSave?: () => void;
  onApply?: () => void;
}
```

---

## Phase 3: Create Main Page with Mock Data

**File:** `src/pages/DashboardJobs.tsx`

### Start with Mock Data

```tsx
const MOCK_JOBS = [
  {
    id: '1',
    title: 'Senior Frontend Engineer',
    company_name: 'Tech Startup Inc',
    description: 'Build amazing React applications...',
    type: 'Full-time',
    location: 'Medellin, Colombia',
    remote_allowed: true,
    salary_min: 80000,
    salary_max: 120000,
    salary_currency: 'USD'
  },
  // Add 2-3 more...
];

const MOCK_METRICS = {
  totalApplications: 12,
  activeApplications: 5,
  interviews: 2,
  savedJobs: 8
};
```

### Page Structure

```tsx
export default function DashboardJobs() {
  return (
    <DashboardLayout>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Jobs Board</h1>
        <p className="text-muted-foreground">
          Browse startup opportunities and track your applications
        </p>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <MetricCard
          title="Total Applications"
          value={MOCK_METRICS.totalApplications}
          icon={Briefcase}
        />
        <MetricCard
          title="Active"
          value={MOCK_METRICS.activeApplications}
          icon={FileText}
          change="+2"
        />
        <MetricCard
          title="Interviews"
          value={MOCK_METRICS.interviews}
          icon={Calendar}
        />
        <MetricCard
          title="Saved Jobs"
          value={MOCK_METRICS.savedJobs}
          icon={Bookmark}
        />
      </div>

      {/* Job Listings */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Available Positions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MOCK_JOBS.map(job => (
            <JobCard key={job.id} {...job} />
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
```

### Add Route to App.tsx

```tsx
import DashboardJobs from '@/pages/DashboardJobs';

// Inside <Routes>
<Route path="/dashboard/jobs" element={<DashboardJobs />} />
```

---

## Phase 4: Connect Real Data (LATER)

**Only do this AFTER Phase 1-3 are working perfectly**

### Tables (Already Exist)
- `jobs` - Job postings
- `job_applications` - User applications
- `saved_jobs` - Bookmarked jobs

### Replace Mock Data

```tsx
// Replace MOCK_JOBS with:
const { data: jobs, isLoading } = useQuery({
  queryKey: ['jobs'],
  queryFn: async () => {
    const { data } = await supabase
      .from('jobs')
      .select(`
        *,
        companies (name)
      `)
      .eq('status', 'published')
      .is('deleted_at', null)
      .order('created_at', { ascending: false })
      .limit(12);
    return data;
  }
});

if (isLoading) return <LoadingState type="cards" count={6} />;
```

---

## Testing Checklist

**Phase 1-3 (UI Only):**
- [ ] Page loads at `/dashboard/jobs`
- [ ] Header and subtitle display
- [ ] 4 MetricCards show mock numbers
- [ ] Job cards display in 3-column grid (desktop)
- [ ] Job cards display in 2-column grid (tablet)
- [ ] Job cards display in 1-column grid (mobile)
- [ ] Hover effect works on cards
- [ ] No TypeScript errors
- [ ] No console errors

**Phase 4 (With Data):**
- [ ] Real jobs load from database
- [ ] Metrics calculate from real data
- [ ] Loading state shows while fetching
- [ ] Empty state shows when no jobs

---

## Success Criteria

**Phase 1-3:**
✅ UI looks identical to Dashboard.tsx style
✅ Responsive on all screen sizes
✅ Mock data displays correctly
✅ TypeScript compiles without errors
✅ Can navigate and view page

**Phase 4:**
✅ Database queries work
✅ Real data replaces mock data
✅ Loading and empty states work

---

## Quick Start Commands

```bash
# Test TypeScript
pnpm tsc --noEmit

# Start dev server
pnpm dev

# View page
http://localhost:8080/dashboard/jobs
```

---

**Start with Phase 1-3 ONLY. Don't worry about database until UI is perfect.**
