# Lovable Prompts Index

**All prompts are ready to copy-paste into Lovable**
**No code blocks - just clear descriptions of what to build**

---

## Master Build Plan

📋 **Start Here:** `LOVABLE-BUILD-PLAN.md`
- Complete overview of all pages needed
- Priority tiers (1-5)
- Implementation order
- Success criteria

---

## Detail Pages (TIER 1 - Start Here)

### 1. Event Detail Page
📄 **File:** `prompts/01-event-detail-page.md`
**Route:** `/events/:id`
**Time:** 2-3 hours
**Priority:** ⭐⭐⭐ Critical

**What it builds:**
- Event banner with image
- Date, time, location details
- Event description
- Organizer information
- Register and save buttons
- Similar events section

---

### 2. Job Detail Page
📄 **File:** `prompts/02-job-detail-page.md`
**Route:** `/jobs/:id`
**Time:** 2-3 hours
**Priority:** ⭐⭐⭐ Critical

**What it builds:**
- Company header with logo
- Job title and employment details
- Salary range and benefits
- Requirements and responsibilities
- Company information sidebar
- Apply and save buttons
- Similar jobs section

---

### 3. Perk Detail Page
📄 **File:** `prompts/03-perk-detail-page.md`
**Route:** `/perks/:id`
**Time:** 2-3 hours
**Priority:** ⭐⭐⭐ Critical

**What it builds:**
- Perk provider logo and name
- Value/savings highlight
- Perk description and benefits
- Promo code display with copy button
- How to redeem instructions
- Provider information
- Related perks section

---

## Dashboard Pages (TIER 2)

### 4. Jobs Board Dashboard
📄 **File:** `prompts/04-jobs-dashboard.md`
**Route:** `/dashboard/jobs`
**Time:** 3-4 hours
**Priority:** ⭐⭐ High

**What it builds:**
- 4 metrics (Total Apps, Active, Interviews, Saved)
- Job listings grid (responsive)
- Job cards with apply and bookmark
- Integration with jobs database
- Loading and empty states

---

## Listing Pages & Forms (TIER 1 CONTINUED)

### 5. Jobs Listing Page
📄 **File:** `prompts/05-jobs-listing-page.md`
**Route:** `/jobs`
**Time:** 2-3 hours
**Priority:** ⭐⭐⭐ Critical

**What it builds:**
- Browse all jobs with search and filters
- Clickable job cards linking to detail page
- Real-time search by title/company/skills
- Category filters (Engineering, Product, etc.)
- Loading and empty states

---

### 6. Post Job Form
📄 **File:** `prompts/06-post-job-form.md`
**Route:** `/post-job`
**Time:** 3-4 hours
**Priority:** ⭐⭐ High

**What it builds:**
- Complete job posting form
- Company info, job details, compensation
- Validation and preview
- Submit to database with approval workflow

---

## Dashboard Pages (TIER 2)

### 7. Settings Dashboard
📄 **File:** Create new prompt (see WHAT-NEEDS-DESIGN.md)
**Route:** `/dashboard/settings`
**Time:** 2-3 hours
**Priority:** ⭐ Medium

**Needs:**
- Profile settings form
- Password change section
- Notification preferences
- Account management

---

### 8. Perks Dashboard
📄 **File:** Create new prompt (see WHAT-NEEDS-DESIGN.md)
**Route:** `/dashboard/perks`
**Time:** 3-4 hours
**Priority:** ⭐ Medium

**Needs:**
- Metrics for perks activity
- Perks grid with redeem/save
- Category filters
- Redeemed perks section

---

## Future Pages (TIER 3-5)

See `LOVABLE-BUILD-PLAN.md` for:
- Startup Profile (`/startups/:id`)
- Founder Profile (`/founders/:id`)
- 404 Page improvements
- Error boundary pages
- List page enhancements

---

## How to Use These Prompts

### Step 1: Choose a Page
Start with TIER 1 pages (Event, Job, Perk detail pages)

### Step 2: Open the Prompt File
Each prompt is self-contained with:
- What to build
- Visual layout description
- Components to use
- Data to display
- Responsive behavior
- Success criteria

### Step 3: Copy Entire Prompt
Copy the entire markdown file contents

### Step 4: Paste into Lovable
Paste into Lovable's chat interface

### Step 5: Review Output
Check that:
- Page matches description
- Responsive design works
- Data loads correctly
- No errors

### Step 6: Test Thoroughly
Use the testing checklist in each prompt

---

## Prompt Style

All prompts follow these principles:
- ❌ **No code examples** - Just descriptions
- ✅ **Clear visual descriptions** - What users see
- ✅ **Component lists** - What to use from existing codebase
- ✅ **User interactions** - What happens when clicked
- ✅ **Responsive guidelines** - Mobile, tablet, desktop
- ✅ **Testing checklists** - How to verify it works

---

## Database Tables Available

All prompts can use these existing tables:
- `events` - Event listings
- `jobs` - Job postings
- `perks` - Perks/benefits
- `companies` - Company data
- `profiles` - User profiles
- `job_applications` - Job applications
- `saved_jobs` - Bookmarked jobs
- `event_registrations` - Event RSVPs
- `perk_redemptions` - Perk usage

---

## Design System

All prompts reference:
- Existing components (DashboardLayout, MetricCard, etc.)
- shadcn/ui components (Card, Button, Badge)
- lucide-react icons
- Tailwind CSS classes
- Current color scheme

---

## Implementation Order

### Week 1: Detail Pages & Listings
1. Event Detail (`prompts/01-event-detail-page.md`)
2. Job Detail (`prompts/02-job-detail-page.md`)
3. Perk Detail (`prompts/03-perk-detail-page.md`)
4. Jobs Listing (`prompts/05-jobs-listing-page.md`)

### Week 2: Dashboard & Forms
5. Jobs Dashboard (`prompts/04-jobs-dashboard.md`)
6. Post Job Form (`prompts/06-post-job-form.md`)
7. Settings Dashboard (create prompt)
8. Dashboard improvements

### Week 3: Polish
7. Perks Dashboard (create prompt)
8. List page enhancements
9. Error pages

---

## Success Metrics

Each page must have:
- ✅ Loads without errors
- ✅ Displays real data from database
- ✅ Responsive on all screen sizes
- ✅ Loading states
- ✅ Empty states
- ✅ Proper navigation
- ✅ User interactions work
- ✅ TypeScript compiles
- ✅ No console errors

---

## Getting Help

If a prompt needs clarification:
1. Check the `LOVABLE-BUILD-PLAN.md` for context
2. Look at existing similar pages for reference
3. Review database schema in migrations folder
4. Check existing components in `src/components/`

---

## Notes for Lovable

**Auth Protection:**
- Currently disabled for development (intentional)
- Will be added before production
- Don't worry about login during implementation

**Mock Data:**
- Start with mock data if needed
- Then connect to real database
- Verify data displays correctly

**Component Reuse:**
- Use existing components wherever possible
- Match styling of Dashboard, Events, Pitch Decks pages
- Keep design consistent

---

**Last Updated:** January 21, 2025
**Status:** Ready for implementation
**Priority:** Start with Event Detail Page
