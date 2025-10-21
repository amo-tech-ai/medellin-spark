# Jobs Listing Page - UI Design Only

**Create a clean jobs listing page at `/jobs` with search, filters, and job cards**

**IMPORTANT:** This prompt is for UI design only. Do NOT add database queries, Supabase code, search/filter logic, or data fetching. Use mock/hardcoded data.

---

## What to Build

A professional job board page with:
- Hero section
- Search bar (visual only)
- Category filter pills (visual only)
- Job cards grid
- Apply buttons (visual only)

---

## Page Layout

### Hero Section

**Visual Design:**
- Background: bg-secondary or light gradient
- Padding: py-16
- Centered content

**Content:**
- Large heading (h1): "Job Board"
- Subtitle: "Find opportunities at AI startups and tech companies in Medellín"
- Text-muted-foreground for subtitle

---

### Search & Filter Section

**Container:**
- Full width container
- Padding: py-8
- Space-y-4 between search and filters

**Search Bar:**
- Max width: md (max-w-md)
- Search icon (left side)
- Input placeholder: "Search by title, company, or skills..."
- Input component from shadcn/ui

**Filter Pills:**
- Horizontal row with flex-wrap
- Buttons with variant="outline" (inactive) or variant="default" (active)
- Gap: gap-2
- Pills: "All Jobs", "Engineering", "Product", "Design", "Marketing", "Sales"
- First pill "All Jobs" is active by default

---

### Jobs Grid Section

**Container:**
- Max width: 4xl
- Centered (mx-auto)
- Vertical stack (space-y-4)

**Show 5 Job Cards with Mock Data:**

Each job card is a Card component:
- Border, rounded-xl, p-6
- Shadow: shadow-card
- Hover: shadow-lg, border-primary
- Transition: transition-all

**Card Layout:**

**Top Row (Flex between):**
- Left: Job title (text-xl, font-semibold)
- Right: "Apply Now" button (primary)

**Second Row:**
- Company name with Building2 icon (text-muted-foreground)

**Third Row (Job Details):**
- Flex row with gap-4
- Icons and text (text-sm, text-muted-foreground):
  - 📍 MapPin icon + Location
  - 💼 Briefcase icon + Job Type
  - 💰 DollarSign icon + Salary

**Fourth Row (Skills Badges):**
- Flex wrap with gap-2
- Badge components (default variant for skills)
- Badge with success variant for "Remote" if applicable

---

## Mock Data (5 Jobs)

```
Job 1:
- Title: "Senior AI Engineer"
- Company: "TechCorp AI"
- Location: "Medellín, Colombia"
- Type: "Full-time"
- Salary: "$80K - $120K"
- Remote: Yes
- Skills: ["Python", "TensorFlow", "AWS"]

Job 2:
- Title: "Machine Learning Engineer"
- Company: "DataStart"
- Location: "Remote"
- Type: "Full-time"
- Salary: "$70K - $100K"
- Remote: Yes
- Skills: ["Python", "PyTorch", "Docker"]

Job 3:
- Title: "Frontend Developer"
- Company: "WebCraft"
- Location: "Bogotá, Colombia"
- Type: "Full-time"
- Salary: "$50K - $70K"
- Remote: No
- Skills: ["React", "TypeScript", "Tailwind"]

Job 4:
- Title: "Product Manager"
- Company: "InnovateCo"
- Location: "Remote"
- Type: "Full-time"
- Salary: "$90K - $130K"
- Remote: Yes
- Skills: ["Product Strategy", "Agile", "Analytics"]

Job 5:
- Title: "UX/UI Designer"
- Company: "DesignHub"
- Location: "Medellín, Colombia"
- Type: "Part-time"
- Salary: "$40K - $60K"
- Remote: No
- Skills: ["Figma", "User Research", "Prototyping"]
```

---

## Components to Use

**From shadcn/ui:**
- Card (job cards)
- Input (search bar)
- Button (filter pills, apply buttons)
- Badge (job type, remote, skills)

**Icons from lucide-react:**
- Search (search bar)
- MapPin (location)
- Briefcase (job type)
- DollarSign (salary)
- Building2 (company)

---

## Responsive Design

### Desktop (> 768px)
- Search bar centered
- Filter pills in single row
- Job cards full width
- Apply button on right side of card

### Tablet (640px - 768px)
- Search bar full width
- Filter pills may wrap to 2 rows
- Job cards full width

### Mobile (< 640px)
- Stack all elements
- Search bar full width
- Filter pills scroll horizontally OR wrap
- Apply button full width below card content

---

## Styling Guidelines

### Colors
- Hero background: bg-secondary
- Search bar: bg-background with border
- Active filter: primary background
- Inactive filter: outline style
- Apply button: primary

### Typography
- Hero title: text-4xl, font-bold
- Subtitle: text-lg, text-muted-foreground
- Job title: text-xl, font-semibold
- Company: text-muted-foreground
- Metadata: text-sm

### Spacing
- Hero: py-16
- Search section: py-8
- Job cards: space-y-4
- Card padding: p-6
- Skills badges: gap-2

### Visual Effects
- Card hover: shadow-lg, border-primary
- Transitions: transition-all duration-200
- Search input focus ring
- Button hover states

---

## Button States (Visual Only)

### Apply Now Button
- Default: "Apply Now"
- On click: "Applied ✓" (green background, disabled)
- Just visual change, no submission

### Filter Pills
- Click to toggle active/inactive
- Active: solid background (primary)
- Inactive: outline style
- Only visual toggle (doesn't actually filter)

### Search Bar
- Input value changes (visual only)
- No actual search functionality
- Just shows user typing

---

## What NOT to Include

❌ Don't add:
- Supabase queries
- Real search functionality
- Filter logic that actually filters
- Database connections
- useEffect for data fetching
- Pagination
- Authentication

✅ Do add:
- Beautiful layout
- Mock job data (5 jobs hardcoded)
- Visual button states
- Responsive design
- Proper spacing
- Hover effects

---

## Success Checklist

- [ ] Page loads at `/jobs`
- [ ] Hero section displays
- [ ] Search bar renders
- [ ] Filter pills display
- [ ] 5 job cards show with mock data
- [ ] Each card has all information
- [ ] Skills badges render
- [ ] Remote badge shows for remote jobs
- [ ] Apply buttons work (visual change only)
- [ ] Responsive layout works
- [ ] Hover effects work on cards
- [ ] No console errors
- [ ] Matches design system

---

**Priority:** TIER 2 - List Page
**Estimated Time:** 2-3 hours
**Focus:** UI design and layout with mock data only
