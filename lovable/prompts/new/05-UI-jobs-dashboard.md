# Jobs Dashboard - UI Design Only

**Create a jobs dashboard page at `/dashboard/jobs` with metrics and job cards**

**IMPORTANT:** This prompt is for UI design only. Do NOT add database queries, Supabase code, or data fetching. Use mock/hardcoded data.

---

## What to Build

A dashboard for users to:
- View job application metrics
- Browse available jobs
- Save/bookmark jobs (visual only)
- Apply to jobs (visual only)

---

## Page Layout

Use **DashboardLayout** component (wraps entire page)

### Header Section

- Title: "Jobs Board" (text-3xl, font-bold)
- Subtitle: "Browse startup opportunities and track your applications"
- Space-y-2 between title and subtitle

---

### Metrics Row

Display 4 **MetricCard** components in a grid:

**Grid Layout:**
- Desktop: grid-cols-4
- Tablet: grid-cols-2
- Mobile: grid-cols-1
- Gap: gap-6

**Metric Cards:**

1. **Total Applications**
   - Icon: Briefcase
   - Value: 12
   - Label: "Total Applications"
   - No change indicator

2. **Active Applications**
   - Icon: FileText
   - Value: 5
   - Label: "Active Applications"
   - Change: +2 (green, trending up)

3. **Interviews**
   - Icon: Calendar
   - Value: 2
   - Label: "Interviews Scheduled"
   - No change indicator

4. **Saved Jobs**
   - Icon: Bookmark
   - Value: 7
   - Label: "Saved Jobs"
   - No change indicator

Use the existing **MetricCard** component from the codebase.

---

### Jobs Section

**Section Heading:**
- Title: "Available Positions" (text-2xl, font-semibold, mb-6)

**Jobs Grid:**
- Grid layout:
  - Desktop: grid-cols-3
  - Tablet: grid-cols-2
  - Mobile: grid-cols-1
- Gap: gap-6

**Show 6 Job Cards with Mock Data**

---

## Job Card Design

Each card is a Card component with:

### Header
- Job title (text-lg, font-semibold)
- Bookmark button (top-right corner)
  - Outline when not saved
  - Filled when saved (visual toggle)

### Content
- Company name with Building2 icon (text-muted-foreground, mb-2)
- Job description (2 lines, truncate with ellipsis)
- Job type badge (Full-time, Part-time, Contract)
- Remote badge (if applicable, success variant)
- Location with MapPin icon
- Salary with DollarSign icon

### Footer
- "Apply Now" button (full width, primary)
- OR "Applied ✓" (if already applied, disabled, success color)

---

## Mock Data (6 Jobs)

```
Job 1:
- Title: "Senior AI Engineer"
- Company: "TechCorp AI"
- Description: "Join our AI team to build cutting-edge solutions for Latin American startups..."
- Type: "Full-time"
- Remote: Yes
- Location: "Medellín, Colombia"
- Salary: "$80K - $120K"
- Applied: No

Job 2:
- Title: "ML Engineer"
- Company: "DataStart"
- Description: "We're looking for an ML engineer to help us build next-gen data products..."
- Type: "Full-time"
- Remote: Yes
- Location: "Remote"
- Salary: "$70K - $100K"
- Applied: Yes

Job 3:
- Title: "Frontend Developer"
- Company: "WebCraft"
- Description: "Build beautiful, responsive web applications using React and modern tools..."
- Type: "Full-time"
- Remote: No
- Location: "Bogotá, Colombia"
- Salary: "$50K - $70K"
- Applied: No

Job 4:
- Title: "Product Manager"
- Company: "InnovateCo"
- Description: "Lead product strategy and execution for our AI-powered platform..."
- Type: "Full-time"
- Remote: Yes
- Location: "Remote"
- Salary: "$90K - $130K"
- Applied: No

Job 5:
- Title: "UX Designer"
- Company: "DesignHub"
- Description: "Create intuitive user experiences for enterprise SaaS applications..."
- Type: "Part-time"
- Remote: No
- Location: "Medellín, Colombia"
- Salary: "$40K - $60K"
- Applied: No

Job 6:
- Title: "Backend Engineer"
- Company: "CloudTech"
- Description: "Build scalable APIs and microservices for high-traffic applications..."
- Type: "Full-time"
- Remote: Yes
- Location: "Remote"
- Salary: "$75K - $105K"
- Applied: Yes
```

---

## Components to Use

**From Project:**
- DashboardLayout (page wrapper)
- MetricCard (for metrics display)

**From shadcn/ui:**
- Card, CardHeader, CardTitle, CardContent, CardFooter
- Button
- Badge

**Icons from lucide-react:**
- Briefcase (total applications)
- FileText (active applications)
- Calendar (interviews)
- Bookmark (saved jobs, bookmark button)
- Building2 (company)
- MapPin (location)
- DollarSign (salary)

---

## Responsive Design

### Desktop (> 1024px)
- 4-column metrics grid
- 3-column jobs grid

### Tablet (640px - 1024px)
- 2-column metrics grid
- 2-column jobs grid

### Mobile (< 640px)
- 1-column metrics grid (stacked)
- 1-column jobs grid (stacked)
- Full-width buttons

---

## Styling Guidelines

### Colors
- Primary for "Apply Now" button
- Success/green for "Applied" state
- Muted for secondary text
- Default badges for job type
- Success badges for "Remote"

### Typography
- Page title: text-3xl, font-bold
- Section heading: text-2xl, font-semibold
- Job title: text-lg, font-semibold
- Company: text-muted-foreground
- Description: text-sm, line-clamp-2

### Spacing
- Header mb-8
- Metrics mb-10
- Section heading mb-6
- Card padding: p-6
- Grid gap: gap-6

### Visual Effects
- Card hover: shadow-lg
- Bookmark fill animation
- Button hover states
- Transition effects

---

## Interactive States (Visual Only)

### Bookmark Button
- Click to toggle filled/outline
- Visual change only (no saving to database)

### Apply Now Button
- Default: "Apply Now"
- On click: Changes to "Applied ✓" (green, disabled)
- Visual change only (no actual application)

### Metrics
- Display static numbers (no real-time updates)
- Change indicators static (+2, etc.)

---

## What NOT to Include

❌ Don't add:
- Database queries
- Real metrics calculation
- Actual bookmark saving
- Real job application
- Data fetching
- Authentication checks
- Loading states with real data

✅ Do add:
- Beautiful dashboard layout
- Mock metrics (hardcoded numbers)
- Mock job cards (6 jobs)
- Visual button states
- Hover effects
- Responsive grid
- Proper spacing

---

## Success Checklist

- [ ] Page loads at `/dashboard/jobs`
- [ ] DashboardLayout wrapper works
- [ ] 4 metric cards display
- [ ] Metric cards show icons and values
- [ ] 6 job cards display in grid
- [ ] Each card shows all information
- [ ] Bookmark button toggles (visual)
- [ ] Apply button changes state (visual)
- [ ] "Applied" jobs show different state
- [ ] Remote badges show for remote jobs
- [ ] Responsive layout works
- [ ] Matches Dashboard.tsx style
- [ ] No console errors
- [ ] All text readable

---

**Priority:** TIER 2 - Dashboard Page
**Estimated Time:** 2-3 hours
**Focus:** UI design and layout with mock data only
