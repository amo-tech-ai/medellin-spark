# UI-Only Lovable Prompts

**All prompts in this folder are UI/UX design prompts ONLY**

**Created:** January 21, 2025
**Status:** Ready for Lovable
**Total:** 6 prompts + 1 implementation plan

---

## 🎯 What's Different About These Prompts?

### These Prompts Are UI-ONLY

✅ **What Lovable Will Do:**
- Create beautiful, responsive page layouts
- Design visual components and styling
- Build page structure with mock/placeholder data
- Focus on user experience and visual design
- Set up component structure

❌ **What Lovable Won't Do:**
- Connect to Supabase database
- Add data fetching logic
- Implement form submissions
- Add authentication
- Create search/filter functionality

### Claude Will Connect Database Later

After Lovable completes the UI, Claude will:
- Replace mock data with real Supabase queries
- Add form validation and submission
- Implement search/filter logic
- Connect authentication
- Handle loading and error states

---

## 📋 Available Prompts

### Implementation Plan
**File:** `00-UI-ONLY-IMPLEMENTATION-PLAN.md`
- Overview of all prompts
- Design standards
- What to include/exclude
- Testing checklist
- Mock data examples

### Detail Pages (TIER 1 - Start Here)

1. **Job Detail Page** - `01-UI-job-detail-page.md`
   - Route: `/jobs/:id`
   - Time: 2-3 hours
   - Professional job posting with company info

2. **Event Detail Page** - `02-UI-event-detail-page.md`
   - Route: `/events/:id`
   - Time: 2-3 hours
   - Engaging event page with registration

3. **Perk Detail Page** - `03-UI-perk-detail-page.md`
   - Route: `/perks/:id`
   - Time: 2-3 hours
   - Attractive benefits showcase

### List & Dashboard Pages (TIER 2)

4. **Jobs Listing Page** - `04-UI-jobs-listing-page.md`
   - Route: `/jobs`
   - Time: 2-3 hours
   - Job board with search and filters (visual only)

5. **Jobs Dashboard** - `05-UI-jobs-dashboard.md`
   - Route: `/dashboard/jobs`
   - Time: 2-3 hours
   - Dashboard with metrics and job cards

### Forms (TIER 3)

6. **Post Job Form** - `06-UI-post-job-form.md`
   - Route: `/post-job`
   - Time: 2-3 hours
   - Multi-section job submission form

---

## 🚀 How to Use These Prompts

### Step 1: Choose a Prompt
Start with TIER 1 (detail pages) for highest impact.

Recommended order:
1. Job Detail Page
2. Event Detail Page
3. Perk Detail Page
4. Jobs Listing Page
5. Jobs Dashboard
6. Post Job Form

### Step 2: Open Lovable
Navigate to your Lovable workspace.

### Step 3: Copy Entire Prompt
Open the .md file and copy ALL contents (Ctrl+A, Ctrl+C).

### Step 4: Paste into Lovable
Paste the entire prompt into Lovable's chat interface.

### Step 5: Review Generated UI
Lovable will create:
- Page component files
- Visual structure
- Mock data
- Styling
- Responsive design

### Step 6: Test Visually
Check that:
- Page loads without errors
- All sections display
- Responsive design works
- Mock data shows correctly
- No TypeScript errors

### Step 7: Move to Next Prompt
Repeat with the next numbered prompt.

---

## ✅ What Each Prompt Includes

**Visual Design:**
- Complete page layout
- Component structure
- Spacing and typography
- Color scheme
- Responsive breakpoints

**Mock Data:**
- Hardcoded sample data
- Placeholder metrics
- Sample job/event/perk details
- Example company information

**Components:**
- shadcn/ui components
- lucide-react icons
- Proper component composition
- Reusable patterns

**Interactions (Visual Only):**
- Button click states
- Toggle states (bookmark fill/outline)
- Visual feedback
- No actual data mutations

---

## ❌ What These Prompts DON'T Include

**No Database Code:**
- No Supabase queries (.from('table'))
- No database connections
- No SQL or RPC functions

**No State Management:**
- No React Query/TanStack Query
- No complex useState for data
- No useEffect for data fetching

**No Advanced Logic:**
- No form submission handlers
- No authentication checks
- No real search/filter functionality
- No data validation (except visual)

**No Backend Integration:**
- No API calls
- No data mutations
- No file uploads
- No email sending

---

## 🎨 Design Standards

All prompts follow these standards:

**Visual Consistency:**
- Match existing Dashboard, Events, Pitch Decks pages
- Use shadcn/ui components
- Use lucide-react icons
- Consistent spacing and typography

**Color Palette:**
- Primary color for CTAs
- Muted colors for secondary text
- Accent colors for badges
- Background colors from theme

**Typography:**
- Clear heading hierarchy
- Comfortable line height (1.6-1.8)
- Consistent font sizes

**Responsive Design:**
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

---

## 🧪 Testing Checklist

For each page:

**Visual:**
- [ ] Page loads without errors
- [ ] All sections display correctly
- [ ] Mock data shows properly
- [ ] Styling matches design system
- [ ] Icons display correctly

**Responsive:**
- [ ] Mobile layout works
- [ ] Tablet layout works
- [ ] Desktop layout works
- [ ] No horizontal scroll

**Components:**
- [ ] All components render
- [ ] Buttons have hover states
- [ ] Cards have proper shadows
- [ ] Badges display correctly

**Code Quality:**
- [ ] No TypeScript errors
- [ ] No console errors
- [ ] Clean component structure
- [ ] Proper imports

---

## 📖 Mock Data Examples

### Sample Job
```typescript
{
  title: "Senior AI Engineer",
  company: "TechCorp AI",
  location: "Medellín, Colombia",
  type: "Full-time",
  remote: true,
  salary: "$80K - $120K",
  skills: ["Python", "TensorFlow", "AWS"]
}
```

### Sample Metrics
```typescript
{
  totalApplications: 12,
  activeApplications: 5,
  interviews: 2,
  savedJobs: 7
}
```

---

## 🔄 After Lovable Completes UI

### Claude's Tasks (Later)

**Database Integration:**
1. Replace mock data with Supabase queries
2. Add loading states
3. Handle errors
4. Implement pagination

**Form Functionality:**
1. Add form validation
2. Implement submission handlers
3. Connect to database
4. Show success/error messages

**User Actions:**
1. Implement apply to job
2. Implement save/bookmark
3. Implement register for event
4. Track user interactions

**Authentication:**
1. Add login checks
2. Protect private routes
3. Show user-specific data

---

## 📅 Recommended Timeline

**Day 1:** Detail Pages (6-9 hours)
- Job Detail Page
- Event Detail Page
- Perk Detail Page

**Day 2:** List & Dashboard (4-6 hours)
- Jobs Listing Page
- Jobs Dashboard

**Day 3:** Form (2-3 hours)
- Post Job Form

**Total:** 12-18 hours for all UI

---

## 💡 Tips for Success

1. **Copy entire prompt** - Don't modify or summarize
2. **Review before accepting** - Check generated code
3. **Test responsiveness** - Check all screen sizes
4. **One prompt at a time** - Don't rush
5. **Follow the order** - TIER 1 → TIER 2 → TIER 3
6. **Keep mock data** - Don't try to connect database yet

---

## 🔗 Related Files

- **Main Project:** `../../`
- **Old Prompts:** `../` (original folder)
- **Database Schema:** `../../supabase/migrations/`
- **Components:** `../../src/components/`

---

## ❓ Need Help?

**If Lovable asks about database:**
- "Use mock data for now"
- "Hardcode sample data"
- "Just focus on visual design"

**If Lovable adds Supabase code:**
- "Remove database queries"
- "Use static mock data instead"
- "Focus on UI layout only"

**If unclear about styling:**
- "Match the existing Dashboard page style"
- "Use shadcn/ui components"
- "Follow the design system"

---

## ✨ Success Criteria

**UI is complete when:**
- All 6 pages load without errors
- Mock data displays correctly
- Responsive design works
- Styling matches existing pages
- No TypeScript errors
- No console errors
- All interactions work (visual only)

**Ready for Claude when:**
- All visual design is finalized
- Components are clean and reusable
- Layout is responsive
- Mock data shows expected structure

---

**Last Updated:** January 21, 2025
**Status:** Ready for Lovable Implementation
**Remember:** UI design only - database connection comes later!
