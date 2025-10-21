# Jobs Board Dashboard - Lovable Implementation Guide

**Create a new dashboard page at `/dashboard/jobs` that matches the style of the existing Dashboard, Events, and Pitch Decks pages.**

---

## What to Build

A jobs board where users can:
- Browse startup job openings
- Save jobs they're interested in
- Apply to positions
- Track their application status

---

## Page Layout

### Header Section
- Large title: "Jobs Board"
- Subtitle below title: "Browse startup opportunities and track your applications"
- Use the same spacing and typography as the main Dashboard page

### Metrics Row
Display 4 metric cards in a row that stack on mobile:
1. **Total Applications** - Show total number of job applications with Briefcase icon
2. **Active Applications** - Show count of pending and under-review applications with FileText icon, include a "+2" change indicator
3. **Interviews** - Show count of interview-stage applications with Calendar icon
4. **Saved Jobs** - Show count of bookmarked jobs with Bookmark icon

**Use the existing MetricCard component** - it's already styled and working on other dashboard pages.

### Job Listings Section
- Section heading: "Available Positions"
- Display jobs in a responsive grid:
  - Desktop (large screens): 3 columns
  - Tablet (medium screens): 2 columns
  - Mobile (small screens): 1 column
- Each job shows as a card with hover effect (slight lift animation)

---

## Job Card Design

Each job card should display:

### Header Area
- **Job Title** as the card title (large, bold)
- **Company Name** below title with a Building icon
- **Bookmark button** in top-right corner (outline when not saved, filled when saved)

### Content Area
- **Job Description** - Show first 2 lines with ellipsis if longer
- **Job Type Badge** - Display job type (Full-time, Part-time, Contract, etc.)
- **Remote Badge** - Only show if the job allows remote work (label: "Remote")
- **Location** - Show with MapPin icon
- **Salary Range** - Show with DollarSign icon in format: $80k - $120k USD

### Footer Area
- **Apply Now button** - Full width, primary style
- Button should be disabled if user already applied (show "Applied" text)

---

## Component Structure

### Create New Components

**JobCard Component**
- Location: `src/components/dashboard/jobs/JobCard.tsx`
- Should accept props for all job data
- Include bookmark toggle functionality
- Include apply button functionality
- Use the hover-lift effect class that exists on other cards

### Main Page Component
- Location: `src/pages/DashboardJobs.tsx`
- Wrap everything in DashboardLayout component (already exists)
- Use the same page structure as Dashboard.tsx

---

## Use Existing Components

Don't recreate these - they already exist and work:
- **DashboardLayout** - Page wrapper with sidebar navigation
- **MetricCard** - Displays metrics with icon, title, value, and optional change indicator
- **LoadingState** - Skeleton loader (use type="cards" and count=6)
- **EmptyState** - Shows when no data (use custom title and description)
- **Card, CardHeader, CardTitle, CardContent, CardFooter** - From shadcn/ui
- **Button** - From shadcn/ui
- **Badge** - From shadcn/ui

---

## Icons to Use

All from lucide-react:
- Briefcase - Total applications metric
- FileText - Active applications metric
- Calendar - Interviews metric
- Bookmark - Saved jobs metric and bookmark button
- MapPin - Job location
- DollarSign - Salary information
- Building2 - Company name

---

## Styling Guidelines

### Colors
Use the existing color palette from the design system:
- Primary colors for buttons and important elements
- Muted colors for secondary text
- Background colors from the existing theme

### Typography
- Headings: Use same font sizes as Dashboard page
- Body text: Use muted-foreground color for descriptions
- Keep consistent line heights and spacing

### Spacing
- Match the gap spacing used on Events and Pitch Decks pages
- Card padding should match existing cards
- Section spacing should be consistent with other pages

### Responsive Design
- Grid collapses gracefully on smaller screens
- Metrics stack vertically on mobile
- Cards maintain readability at all sizes
- No horizontal scroll on any screen size

---

## Implementation Strategy

### Phase 1: Build with Mock Data
Start by creating the UI with hardcoded sample jobs:
- Use 3-4 fake job listings to test the layout
- Use placeholder numbers for metrics
- Focus on getting the visual design perfect
- Ensure responsiveness works on all screen sizes

### Phase 2: Connect to Database (Later)
Only after Phase 1 looks perfect:
- Connect to the jobs table in Supabase
- Load real job data
- Calculate real metrics from user's applications
- Add loading and empty states

---

## Database Information (For Phase 2)

Tables that already exist:
- **jobs** - Contains all job postings (filter by status = 'published')
- **job_applications** - User's job applications (linked by profile_id)
- **saved_jobs** - User's bookmarked jobs (linked by profile_id)
- **companies** - Company information (join to get company names)

Required data relationships:
- Jobs belong to companies (company_id field)
- Applications belong to users and jobs
- Saved jobs belong to users and jobs

---

## User Interactions

### Bookmark a Job
- Click bookmark icon on any job card
- Icon fills in and shows as saved
- Add to saved_jobs table
- Show success toast: "Job saved"
- Update Saved Jobs metric count

### Unbookmark a Job
- Click filled bookmark icon
- Icon becomes outline style
- Remove from saved_jobs table
- Show success toast: "Job removed from saved"
- Update Saved Jobs metric count

### Apply to a Job
- Click "Apply Now" button
- Button becomes disabled
- Text changes to "Applied"
- Add to job_applications table with status = 'pending'
- Show success toast: "Application submitted"
- Update Total Applications and Active Applications metrics

---

## Navigation

### Add to Router
Create a route at `/dashboard/jobs` that renders the DashboardJobs page component.

### Add to Sidebar
The DashboardSidebar component should already have a "Jobs Board" link. If not, it will need to be added to match the other dashboard sections.

---

## Quality Checklist

Before marking as complete:
- Page loads without errors at `/dashboard/jobs`
- All 4 metric cards display
- Job cards display in responsive grid
- Hover effects work on cards
- Bookmark toggle works
- Apply button works and becomes disabled
- Metrics update after actions
- Loading state shows while data loads
- Empty state shows when no jobs
- Page looks identical in style to Dashboard.tsx
- No TypeScript errors
- No console errors
- Works on mobile, tablet, and desktop sizes
- All text is readable
- Buttons have proper hover states

---

## Success Criteria

**Visual Design:**
- Matches the look and feel of existing dashboard pages
- Uses the same components, colors, and spacing
- Responsive grid works perfectly at all screen sizes

**Functionality:**
- Users can browse job listings
- Users can save/unsave jobs
- Users can apply to jobs
- Metrics accurately reflect user's data
- All interactions show appropriate feedback

**Code Quality:**
- TypeScript compiles without errors
- Follows existing code patterns from Dashboard.tsx
- Reuses existing components where possible
- Clean, readable component structure

---

**Priority: High - This is a key user feature for the MVP**
**Estimated time: 3-4 hours with mock data, +2 hours to connect database**
