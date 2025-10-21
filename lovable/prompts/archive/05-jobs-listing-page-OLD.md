# Jobs Listing Page - Lovable Prompt

**Update the jobs listing page at `/jobs` to connect to database and add full functionality**

---

## Current Issues to Fix

The page exists but has problems:
- ❌ Uses hardcoded mock data (not connected to database)
- ❌ "Apply Now" button doesn't navigate to job detail page
- ❌ Search doesn't actually filter jobs
- ❌ Category filters don't work
- ❌ No loading state while fetching data
- ❌ No empty state when no jobs exist
- ❌ Job cards aren't clickable

---

## What Users Should See

A professional job board where users can:
- Browse all available jobs
- Search jobs by title, company, or skills
- Filter jobs by category (Engineering, Product, Design, etc.)
- Click any job card to see full details
- See job type badges (Full-time, Remote, Contract)
- See salary ranges and locations
- View company information

---

## Page Layout

### Hero Section (Keep Current Design)
- Background: Secondary color
- Title: "Job Board"
- Subtitle: "Find opportunities at AI startups and tech companies in Medellín"
- Keep centered, clean design

### Search Bar
- Search icon on left
- Placeholder: "Search by title, company, or skills..."
- Real-time search as user types
- Searches: job title, company name, skills

### Filter Tabs (Horizontal Pills)
Keep current filter design:
- "All Jobs" (default active)
- "Engineering"
- "Product"
- "Design"
- "Marketing"
- "Sales"

Active filter highlighted with primary color

### Jobs Grid
- Each job as a card (current card design is good)
- Cards should be clickable (entire card, not just button)
- Hover effect: shadow grows, border changes to primary
- Transition: smooth animation

### Job Card Contents (Keep Current Layout)
**Left Side:**
- Job title (large, bold)
- Company name (muted text)
- Location with MapPin icon
- Job type (Full-time/Part-time/Contract) with Briefcase icon
- Salary range with DollarSign icon
- Skills as badges (pill-shaped)
- "Remote" badge if applicable (green/success color)

**Right Side:**
- "View Details" button (or "Apply Now")
- Button should be outline style (not filled)

---

## Database Integration

### Connect to Supabase

Get jobs from the `jobs` table with these fields:
- title
- company_id (join with companies table for company name)
- location
- type (enum: full-time, part-time, contract, internship)
- salary_min, salary_max, salary_currency
- remote_allowed (boolean)
- status (only show if status = 'published')
- created_at (for "posted X days ago")
- category (engineering, product, design, marketing, sales)

**Join with:**
- `companies` table to get: company name, logo_url

**Example Query Pattern:**
```
Select jobs with:
- All job fields
- Company name from companies table
- Where status = 'published'
- Order by created_at DESC
```

---

## Functionality

### Page Load
1. Show loading skeleton (shimmer cards)
2. Fetch all published jobs from database
3. Display jobs in cards
4. If no jobs found, show empty state

### Search Functionality
- User types in search box
- Filter jobs that match:
  - Job title (case insensitive)
  - Company name (case insensitive)
  - Any skill in job's skills array
- Update displayed jobs in real-time
- Show count: "Showing X jobs" or "No jobs match 'keyword'"

### Filter by Category
- Click a category filter (Engineering, Product, etc.)
- Filter jobs where job.category matches selected filter
- "All Jobs" shows everything (no filter)
- Active filter gets primary color styling
- Combine with search (search + filter both apply)

### Click Job Card
- Entire card is clickable
- Navigate to `/jobs/[job-id]`
- Cursor changes to pointer on hover
- Card hover: shadow increases, border highlights

### "View Details" / "Apply Now" Button
- Click navigates to `/jobs/:id` detail page
- Prevent event propagation (so clicking button = clicking card)

---

## Responsive Design

### Desktop (large screens)
- Cards: max-width 800px, centered
- 1 column of cards
- Search and filters: horizontal layout

### Tablet (medium screens)
- Cards: full width with padding
- Search and filters: stack vertically
- Larger touch targets

### Mobile (small screens)
- Cards: full width, stack vertically
- Details (location, type, salary) wrap to multiple rows
- Button: full width at bottom of card
- Filters: horizontal scroll if needed

---

## Loading State

While fetching jobs from database:
- Show 3-5 skeleton cards
- Shimmer animation
- Same size/shape as real job cards
- Pulse effect

**Skeleton card should have:**
- Gray rectangle for title (width: 60%)
- Gray rectangle for company (width: 40%)
- Gray circles for icons + text
- Gray pills for skills

---

## Empty States

### No Jobs in Database
- Icon: BriefcaseX or SearchX
- Message: "No jobs available yet"
- Description: "Check back soon for new opportunities"
- CTA button: "Post a Job" (optional)

### No Search Results
- Icon: SearchX
- Message: "No jobs match your search"
- Description: "Try different keywords or clear filters"
- Button: "Clear Search" (clears search and filters)

### No Jobs in Category
- Message: "No [category] jobs available"
- Description: "Try another category or view all jobs"
- Button: "View All Jobs" (resets to "all" filter)

---

## Visual Design

### Card Styling
- Background: card color
- Border: 1px solid border color
- Border radius: 12px
- Padding: 24px
- Shadow: subtle card shadow
- Hover shadow: larger glow effect
- Hover border: primary color

### Typography
- Job title: text-xl, font-semibold
- Company: text-muted-foreground
- Details: text-sm, text-muted-foreground
- Skills badges: text-xs

### Badges
- Pills with rounded corners
- Skill badges: default variant (gray)
- "Remote" badge: success variant (green)
- Job type badge: secondary variant

### Colors
- Primary color for active filter
- Muted for secondary text
- Success green for "Remote"
- Border color for cards

---

## Interactive Behaviors

### Hover Effects
- Card: shadow increases, border highlights
- Filter button: background changes slightly
- Button: background color transition

### Click Feedback
- Card: slight scale down (0.98) on click
- Button: ripple effect (optional)
- Filter: smooth color transition

### Transitions
- All transitions: 0.2s ease
- Smooth, not jarring
- Professional feel

---

## Data Handling

### Skills Array
If skills are stored as JSON array or text:
- Parse skills array
- Display each skill as badge
- Limit to first 5 skills (+ "2 more" if needed)

### Salary Display
- If salary_min and salary_max exist:
  - Show: "$80K - $120K USD"
- If no salary disclosed:
  - Show: "Competitive salary"
- Use salary_currency (USD, COP, etc.)

### Date Formatting
- Show "Posted X days ago" using created_at
- Examples: "Posted today", "Posted 3 days ago", "Posted 2 weeks ago"

### Remote Badge
- If remote_allowed = true, show "Remote" badge
- Green/success color
- Placed with skills badges

---

## Performance

### Optimization
- Fetch jobs once on page load
- Store in state (don't refetch on every filter/search)
- Filter/search happens client-side (fast)
- If 100+ jobs, add pagination (20 per page)

### Pagination (Optional, if many jobs)
- Show 20 jobs per page
- "Load More" button at bottom
- Or numbered pagination: 1, 2, 3...
- Show: "Showing 1-20 of 45 jobs"

---

## Success Criteria

Before marking complete:
- [ ] Page loads jobs from Supabase `jobs` table
- [ ] Jobs display with correct data (title, company, location, salary)
- [ ] Search box filters jobs in real-time
- [ ] Category filters work correctly
- [ ] Clicking job card navigates to `/jobs/:id`
- [ ] "Remote" badge shows for remote jobs
- [ ] Skills display as badges
- [ ] Loading state shows while fetching
- [ ] Empty state shows if no jobs
- [ ] Responsive on mobile/tablet/desktop
- [ ] No TypeScript errors
- [ ] No console errors

---

## Testing

**Test with real data:**
1. Navigate to `/jobs`
2. Should see loading skeleton briefly
3. Jobs load from database
4. Click a job card → Should go to `/jobs/[id]`
5. Type in search box → Jobs filter instantly
6. Click category filter → Jobs filter by category
7. Test on mobile → Layout stacks correctly

**Test edge cases:**
1. No jobs in database → Show empty state
2. Search with no results → Show "no results" message
3. Remote job → Should show "Remote" badge
4. Job with no salary → Should show "Competitive salary"

**Test interactions:**
1. Hover over card → Shadow/border changes
2. Click filter → Active state updates
3. Clear search → All jobs show again

---

## Code Quality

### Use React Hooks
- `useState` for search query, active filter, jobs data
- `useEffect` to fetch jobs on mount
- `useMemo` to memoize filtered jobs (performance)

### Use Supabase Client
```
Import Supabase client
Fetch jobs with company join
Handle loading state
Handle error state
```

### Navigation
```
Use React Router's useNavigate or Link
Navigate to /jobs/:id on card click
```

---

## Additional Features (Optional)

### Bookmarking
- Heart icon to save job
- Add to saved_jobs table
- Show "Saved" badge if already saved

### Application Count
- Show "23 applicants" if tracking applications
- From job_applications table count

### Company Logo
- Show company logo next to company name
- Circular avatar, small size
- Fallback to company initial if no logo

---

**Priority:** TIER 1 - Critical for MVP
**Estimated Time:** 2-3 hours
**Dependencies:**
- Events and Perks list pages should match this pattern
- Job detail page should receive navigation from this page
- Companies table must exist for company names
