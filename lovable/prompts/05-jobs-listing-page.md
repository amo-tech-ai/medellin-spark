# Jobs Listing Page - UI Design (Lovable)

**Create a beautiful jobs listing page at `/jobs` with clean UI and layout**

---

## What to Build

A professional job board page where users can browse job openings. Focus on creating beautiful, responsive UI with proper layout and components. Data connection will be added later.

---

## Page Sections

### 1. Hero Section

**Visual Design:**
- Background: Light secondary color (bg-secondary)
- Height: Medium (py-16)
- Content: Centered

**Content:**
- Large heading (h1): "Job Board"
- Subtitle: "Find opportunities at AI startups and tech companies in Medellín"
- Text color: Muted for subtitle

---

### 2. Search & Filter Section

**Container:**
- Full width with container padding
- Vertical spacing: py-8

**Search Bar:**
- Max width: md (max-w-md)
- Search icon on left (lucide-react Search)
- Input placeholder: "Search by title, company, or skills..."
- Styling: Input from shadcn/ui

**Filter Pills (Below Search):**
- Horizontal row of filter buttons
- Pills: "All Jobs", "Engineering", "Product", "Design", "Marketing", "Sales"
- Active pill: Primary color background
- Inactive pills: Default background, border
- Spacing: gap-2 between pills
- Component: Button with variant="outline" or variant="default" for active

**Visual Layout:**
```
┌─────────────────────────────────────┐
│  [🔍 Search by title...]            │
└─────────────────────────────────────┘

[All Jobs] [Engineering] [Product] [Design]...
```

---

### 3. Jobs Grid Section

**Container:**
- Max width: 4xl (max-w-4xl)
- Centered
- Vertical stack of job cards
- Spacing: space-y-4 between cards

**Job Cards (Use mock data for 3-5 jobs):**

Each card is a clickable container:
- Component: Card from shadcn/ui
- Border: 1px solid border color
- Rounded: rounded-xl
- Padding: p-6
- Shadow: shadow-card
- Hover: shadow-glow, border-primary
- Transition: transition-smooth

**Card Layout (Flex):**
```
┌──────────────────────────────────────────────────────────┐
│  Senior AI Engineer                    [Apply Now]       │
│  TechCorp AI                                             │
│                                                          │
│  📍 Medellín, Colombia  💼 Full-time  💰 $80K - $120K   │
│                                                          │
│  [Python] [TensorFlow] [AWS] [Remote]                   │
└──────────────────────────────────────────────────────────┘
```

**Card Content (Left Side):**
1. **Job Title**
   - Text: text-xl font-semibold
   - Example: "Senior AI Engineer"

2. **Company Name**
   - Text: text-muted-foreground
   - Margin: mb-3
   - Example: "TechCorp AI"

3. **Job Details Row**
   - Flex container: flex gap-4
   - Text: text-sm text-muted-foreground
   - Icons: lucide-react (size 16)

   Items:
   - 📍 Location: MapPin icon + "Medellín, Colombia"
   - 💼 Job Type: Briefcase icon + "Full-time"
   - 💰 Salary: DollarSign icon + "$80K - $120K"

4. **Skills Badges**
   - Flex wrap: flex flex-wrap gap-2
   - Component: Badge from shadcn/ui (or custom pill)
   - Variant: default (gray) for skills
   - Variant: success (green) for "Remote" badge
   - Examples: "Python", "TensorFlow", "AWS", "Remote"

**Card Content (Right Side):**
- Button: "Apply Now"
- Variant: default (primary color)
- Size: Default
- Desktop: Fixed width
- Mobile: Full width

---

## Mock Data to Display

Show 3-5 sample job cards with this data:

**Job 1:**
- Title: "Senior AI Engineer"
- Company: "TechCorp AI"
- Location: "Medellín, Colombia"
- Type: "Full-time"
- Salary: "$80K - $120K"
- Remote: Yes
- Skills: Python, TensorFlow, AWS

**Job 2:**
- Title: "Machine Learning Engineer"
- Company: "DataStart"
- Location: "Remote"
- Type: "Full-time"
- Salary: "$70K - $100K"
- Remote: Yes
- Skills: Python, PyTorch, Docker

**Job 3:**
- Title: "Frontend Developer"
- Company: "UILabs"
- Location: "Medellín, Colombia"
- Type: "Contract"
- Salary: "$50K - $80K"
- Remote: No
- Skills: React, TypeScript, Tailwind

**Job 4 (Optional):**
- Title: "Product Manager"
- Company: "InnovateCo"
- Location: "Bogotá, Colombia"
- Type: "Full-time"
- Salary: "Competitive"
- Remote: Yes
- Skills: Product Strategy, Analytics, Agile

**Job 5 (Optional):**
- Title: "UX Designer"
- Company: "CreativeStudio"
- Location: "Medellín, Colombia"
- Type: "Part-time"
- Salary: "$40K - $60K"
- Remote: No
- Skills: Figma, User Research, Prototyping

---

## Responsive Design

### Desktop (lg and above)
- Hero: Full width, centered text
- Search: Max width md, aligned left
- Filters: Horizontal row
- Cards: Max width 4xl, centered
- Card layout: Flex row (content left, button right)

### Tablet (md)
- Hero: Same as desktop
- Search: Full width with padding
- Filters: May wrap to multiple rows
- Cards: Full width with padding
- Card layout: Flex row

### Mobile (sm and below)
- Hero: Smaller padding
- Search: Full width
- Filters: Horizontal scroll OR stack vertically
- Cards: Full width
- Card layout: Stack vertically (content on top, button on bottom)
- Button: Full width (w-full)
- Details row: May wrap to multiple lines

---

## Components to Use

### From shadcn/ui:
- `Card` - For job cards
- `Button` - For "Apply Now" and filters
- `Input` - For search box
- `Badge` - For skill pills
- `Separator` - Optional between sections

### From lucide-react:
- `Search` - Search icon
- `MapPin` - Location icon
- `Briefcase` - Job type icon
- `DollarSign` - Salary icon

### Custom Styling:
- Use existing color scheme (primary, secondary, muted)
- Consistent spacing (p-4, p-6, gap-4)
- Shadows: shadow-card, shadow-glow
- Transitions: transition-smooth

---

## Visual Hierarchy

**Priority order (largest to smallest):**
1. Hero heading (h1)
2. Job titles (text-xl)
3. Search bar (medium size)
4. Filter pills (medium size)
5. Company names (text-base)
6. Job details (text-sm)
7. Skills badges (text-xs)

**Color hierarchy:**
- Primary: Hero heading, active filter, button
- Default: Job titles
- Muted: Company names, job details
- Success: "Remote" badge
- Border: Card borders

---

## Spacing & Layout

**Section Spacing:**
- Hero: py-16
- Search & Filters: py-8
- Jobs grid: pb-16

**Card Spacing:**
- Padding: p-6
- Gap between elements: gap-4
- Space between cards: space-y-4

**Element Spacing:**
- Title to company: mb-2
- Company to details: mb-3
- Details to skills: mb-3

---

## Interactive Elements (Visual Only)

### Search Input
- Border changes on focus
- Placeholder text visible
- Search icon stays fixed on left

### Filter Pills
- Hover: Slight background change
- Active: Primary color background + white text
- Inactive: Border + default background
- Smooth transition between states

### Job Cards
- Hover: Shadow increases, border highlights
- Cursor: pointer
- Transition: All 0.2s ease

### Apply Button
- Hover: Darker background
- Active: Slight scale down
- Transition: smooth

---

## Empty State (Optional)

If showing empty state:
- Icon: Briefcase or SearchX
- Message: "No jobs available yet"
- Description: "Check back soon for new opportunities"
- Centered in grid area

---

## Loading State (Optional)

Show 3 skeleton cards:
- Same size as real cards
- Gray rectangles with shimmer
- Pulse animation

---

## What NOT to Include

❌ Don't add database queries or Supabase code
❌ Don't add state management for search/filters
❌ Don't add navigation logic
❌ Don't add form submission
❌ Don't add authentication checks

Focus ONLY on:
✅ Visual layout and spacing
✅ Component structure
✅ Responsive design
✅ Mock data display
✅ Hover and visual states

---

## Success Criteria

Page should have:
- [ ] Clean hero section with heading
- [ ] Search input (visual only, doesn't filter yet)
- [ ] Filter pills (visual only, don't filter yet)
- [ ] 3-5 job cards displaying mock data
- [ ] Proper card layout with all elements
- [ ] Skills badges rendering correctly
- [ ] "Remote" badge shows green when applicable
- [ ] Responsive on mobile (cards stack)
- [ ] Hover effects work on cards and buttons
- [ ] Clean, professional design matching existing site

---

## Design Notes

**Keep it simple and clean:**
- Use whitespace generously
- Consistent padding and margins
- Clear visual hierarchy
- Professional, not cluttered

**Match existing design:**
- Use same color scheme as rest of site
- Same button styles as other pages
- Same card styles as dashboard
- Consistent typography

---

**Priority:** TIER 1 - Critical
**Time to Build UI:** 1-2 hours in Lovable
**Next Step:** After UI is created, connect to Supabase (separate task)
