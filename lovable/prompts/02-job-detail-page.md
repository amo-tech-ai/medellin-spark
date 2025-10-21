# Job Detail Page - Lovable Prompt

**Create a professional job posting page at `/jobs/:id` that shows complete job information**

---

## What Users See

When someone clicks a job from the jobs board, they should see:
- Company logo and name
- Job title and employment details
- Salary range and benefits
- Complete job description
- Requirements and qualifications
- About the company
- Apply and save buttons

---

## Page Layout

### Header Section
- Company logo (left side, medium size)
- Company name next to logo
- Job title (large, bold) below logo
- Job details row below title

### Job Details Row
- **Employment Type Badge** - Full-time, Part-time, Contract (use Badge component)
- **Remote Badge** - Show "Remote" if remote_allowed is true
- **Location** with MapPin icon - City, Country
- **Posted Date** - "Posted 3 days ago"

### Salary Section (Highlighted)
- Background color (light accent)
- DollarSign icon
- Salary range: "$80,000 - $120,000 USD per year"
- OR "Competitive salary" if not disclosed

### Main Content Area

**Job Description**
- Heading: "About the Role"
- Full description with proper formatting
- Paragraphs, lists, emphasis maintained

**Requirements**
- Heading: "What We're Looking For"
- Bullet list of requirements
- Use checkmark icon for each item

**Responsibilities**
- Heading: "What You'll Do"
- Bullet list of responsibilities
- Use arrow icon for each item

**Nice to Have**
- Heading: "Bonus Points"
- Bullet list of preferred qualifications (if any)

### Sidebar (Desktop) / Below Main (Mobile)

**Company Information Card**
- Company logo
- Company name
- Company description (2-3 lines)
- Industry badge
- Company size (e.g., "11-50 employees")
- "View Company" button (outline)

**Application Stats**
- Applicants icon with count (e.g., "23 applicants")
- Views icon with count (e.g., "156 views")

### Action Buttons (Sticky on Mobile)
- **Primary:** "Apply Now" (large, full width, primary color)
- **Secondary:** "Save Job" (outline, bookmark icon)
- Show "Applied" badge if user already applied

### Similar Jobs Section (Bottom)
- Heading: "Similar Opportunities"
- 3 job cards in a row
- Same company OR same job type OR related jobs

### Breadcrumb Navigation (Top)
- Show: Home > Jobs > [Job Title]

---

## Components to Use

**From shadcn/ui:**
- Card for company info sidebar
- Button for apply/save actions
- Badge for job type, remote, status
- Separator between sections

**From our codebase:**
- Use JobCard component for similar jobs section
- Match card styling from jobs list page
- Use existing button and badge styles

**Icons from lucide-react:**
- Briefcase (job type)
- MapPin (location)
- DollarSign (salary)
- Calendar (posted date)
- Users (applicants)
- Eye (views)
- Bookmark (save job)
- Check (requirements)
- ArrowRight (responsibilities)
- Building2 (company)

---

## Page Behavior

### When Page Loads
- Show loading skeleton while fetching job data
- Fade in content when loaded
- If job not found, show "Job not found" message
- Check if user already applied (show "Applied" state)
- Check if job is saved (fill bookmark icon)

### Apply Now Button
- Click "Apply Now" → Show success toast: "Application submitted!"
- Button text changes to "Applied" and becomes disabled
- Badge appears: "Applied on [date]"
- Increment applicants count
- Add to user's job_applications table

### Save Job Button
- Click bookmark icon → Icon fills in, toast: "Job saved"
- Click again → Icon empties, toast: "Job removed"
- Add/remove from saved_jobs table
- Update user's saved jobs count

### View Company Button
- Navigate to `/companies/:id` OR `/startups/:id`
- OR show company modal with more details

---

## Responsive Design

### Desktop (large screens)
- 2-column layout: Main content (65%), sidebar (35%)
- Fixed sidebar while scrolling
- Apply button in sidebar

### Tablet (medium screens)
- Single column
- Sidebar moves below main content
- Apply button stays at top

### Mobile (small screens)
- Stack all vertically
- Sticky apply button bar at bottom of screen
- Larger touch targets
- Full-width elements

---

## Data to Display

Get job data from the `jobs` table:
- title
- description
- requirements (text or array)
- responsibilities (text or array)
- type (enum: full-time, part-time, contract, etc.)
- location
- remote_allowed (boolean)
- salary_min
- salary_max
- salary_currency
- created_at (for "posted X days ago")
- status (only show if status = 'published')

Join with:
- `companies` table for company info (name, logo_url, description, industry, size)

Calculate:
- applicants_count from job_applications table
- views_count (if tracking implemented)
- user_applied (check if current user applied)
- user_saved (check if current user saved)

---

## Visual Design

### Colors
- Primary color for "Apply Now" button
- Subtle background color for salary section
- Badge colors for job type (primary), remote (success)
- Muted text for secondary information

### Typography
- Job title: Extra large (3xl), bold
- Section headings: Large (2xl), semibold
- Company name: Medium (xl), medium weight
- Body text: Regular, comfortable line height
- Lists: Good spacing between items

### Layout
- Maximum content width for readability
- Clear visual hierarchy
- Generous spacing between sections
- Cards have subtle shadows
- Rounded corners consistent throughout

### Lists
- Bullet points OR checkmarks for requirements
- Arrow icons for responsibilities
- Good spacing between items
- Indentation for clarity

---

## Empty States

**Job Not Found:**
- Icon: SearchX or BriefcaseX
- Message: "Job Not Found"
- Description: "This position may have been filled or removed"
- Button: "Browse All Jobs"

**No Similar Jobs:**
- Hide section OR show: "No similar jobs available"

---

## Loading State

While fetching:
- Skeleton for header (logo, title, badges)
- Shimmer for salary section
- Loading boxes for description sections
- Pulse animation throughout

---

## Application Flow

**When "Apply Now" clicked:**

Option 1 (Simple):
- Create job_application record with status = 'pending'
- Show success toast
- Update UI to show "Applied" state

Option 2 (With Form - Future):
- Open modal with application form
- Fields: Cover letter, resume upload
- Submit to create job_application
- Show success and update UI

Start with Option 1 (simple) for MVP.

---

## Success Criteria

Before marking complete:
- [ ] Page loads job data from database
- [ ] All job details display correctly
- [ ] Company information shows in sidebar
- [ ] Apply button works and updates state
- [ ] Save button toggles correctly
- [ ] Similar jobs section displays
- [ ] Breadcrumb navigation works
- [ ] Responsive on mobile/tablet/desktop
- [ ] Loading state shows appropriately
- [ ] 404 state for missing jobs
- [ ] No TypeScript errors
- [ ] No console errors
- [ ] Applied state persists on page reload
- [ ] Saved state persists on page reload

---

## Testing

**Test with real job:**
1. Navigate to `/jobs`
2. Click any job card
3. Should go to `/jobs/[job-id]`
4. Verify all data displays
5. Click "Apply Now" → Should show applied state
6. Refresh page → Applied state should persist
7. Click "Save Job" → Should save and fill icon
8. Test on mobile → Sticky apply bar works

**Test edge cases:**
1. Visit `/jobs/invalid-id` → Show 404 state
2. Job with no salary → Show "Competitive salary"
3. Already applied job → Show "Applied" immediately
4. Remote job → Show "Remote" badge
5. Non-remote job → No "Remote" badge

---

**Priority:** TIER 1 - Critical for MVP
**Estimated Time:** 2-3 hours
**Dependencies:** Jobs list page should link to this page
