# Job Detail Page - UI Design Only

**Create a professional job posting page at `/jobs/:id` with beautiful layout and mock data**

**IMPORTANT:** This prompt is for UI design only. Do NOT add database queries, Supabase code, or data fetching logic. Use mock/hardcoded data.

---

## What to Build

A detailed job posting page that displays:
- Company information with logo
- Job title and employment details
- Salary information
- Job description
- Requirements and responsibilities
- Company sidebar
- Action buttons (visual only)
- Similar jobs section

---

## Page Layout Structure

### Top Section: Breadcrumb
```
Home > Jobs > Senior AI Engineer
```
- Use ChevronRight icons between items
- Muted text color
- Last item (job title) is not clickable

---

### Hero Section: Job Header

**Company Logo & Name:**
- Left side: Company logo (64x64px, rounded)
- Next to logo: Company name (text-lg, semibold)

**Job Title:**
- Below logo: Large job title (text-3xl, font-bold)
- Example: "Senior AI Engineer"

**Job Details Row:**
Horizontal row with icons and text:
- 💼 **Full-time** (Badge, primary variant)
- 🌍 **Remote** (Badge, success variant - only if remote)
- 📍 **Medellín, Colombia** (MapPin icon)
- 📅 **Posted 3 days ago** (Calendar icon)

All with text-sm, text-muted-foreground

---

### Salary Highlight Section

**Visual Design:**
- Light background color (bg-secondary or bg-accent/10)
- Border: 1px solid
- Rounded: rounded-lg
- Padding: p-6
- Icon: DollarSign (left side)

**Content:**
- Large text: "$80,000 - $120,000 USD"
- Subtitle: "per year"
- OR if no salary: "Competitive Salary Package"

---

### Main Content Area (Left Side - 65%)

**Section 1: About the Role**
- Heading: "About the Role" (text-2xl, font-semibold, mb-4)
- Paragraph text with good line height (leading-relaxed)
- Mock content: 2-3 paragraphs describing the position

**Section 2: What We're Looking For**
- Heading: "What We're Looking For" (text-2xl, font-semibold, mb-4)
- Bullet list with checkmark icons (Check from lucide-react)
- Example items:
  - ✓ 5+ years of experience in AI/ML
  - ✓ Strong proficiency in Python and TensorFlow
  - ✓ Experience with AWS or cloud platforms
  - ✓ Excellent communication skills

**Section 3: What You'll Do**
- Heading: "What You'll Do" (text-2xl, font-semibold, mb-4)
- Bullet list with arrow icons (ArrowRight from lucide-react)
- Example items:
  - → Design and implement ML models
  - → Collaborate with cross-functional teams
  - → Optimize algorithms for production
  - → Mentor junior engineers

**Section 4: Nice to Have (Optional)**
- Heading: "Bonus Points" (text-2xl, font-semibold, mb-4)
- Bullet list with star icons (Star from lucide-react)
- Example items:
  - ⭐ Experience with LLMs
  - ⭐ Published research papers
  - ⭐ Open source contributions

---

### Sidebar Area (Right Side - 35%)

**Company Information Card:**

Card component with:
- Company logo (centered or top-left)
- Company name (font-semibold)
- Short description (2-3 lines, text-muted-foreground)
- Industry badge (Badge component)
- Company size: "11-50 employees" (Users icon)
- "View Company" button (outline variant, full width)

**Divider (Separator component)**

**Application Stats:**
- Users icon + "23 applicants"
- Eye icon + "156 views"
- Both with text-sm, text-muted-foreground

**Divider (Separator component)**

**Action Buttons:**
- "Apply Now" button (primary, large, full width)
- "Save Job" button (outline, Bookmark icon, full width, mt-2)

---

### Similar Jobs Section (Bottom of Page)

**Heading:** "Similar Opportunities"

**Grid Layout:**
- Desktop: 3 columns
- Tablet: 2 columns
- Mobile: 1 column

**Each Job Card Shows:**
- Job title (font-semibold)
- Company name (text-muted-foreground)
- Location (MapPin icon)
- Job type badge (Full-time, Part-time, etc.)
- Remote badge (if applicable)
- Salary range
- Skills badges (3-4 badges)

---

## Mock Data to Use

### Main Job
```
Title: Senior AI Engineer
Company: TechCorp AI
Logo: Use a placeholder or Building2 icon
Location: Medellín, Colombia
Type: Full-time
Remote: Yes
Salary: $80,000 - $120,000 USD
Posted: 3 days ago

Description:
"We're looking for an experienced AI Engineer to join our growing team in Medellín. You'll work on cutting-edge projects using the latest ML technologies and help shape the future of AI-powered solutions for Latin American startups."

Requirements:
- 5+ years of experience in AI/ML
- Strong proficiency in Python and TensorFlow
- Experience with AWS or cloud platforms
- Excellent communication skills
- Bachelor's degree in Computer Science or related field

Responsibilities:
- Design and implement ML models for production
- Collaborate with cross-functional teams
- Optimize algorithms for performance
- Mentor junior engineers
- Stay current with latest AI research

Company Info:
"TechCorp AI is a leading artificial intelligence company focused on solving real-world problems for Latin American businesses. Founded in 2020, we've grown to 40+ employees across Colombia and Mexico."

Industry: Artificial Intelligence
Size: 11-50 employees
Applicants: 23
Views: 156
```

### Similar Jobs (3 cards)
```
Job 1:
- Machine Learning Engineer
- DataStart
- Remote
- $70K - $100K
- Full-time

Job 2:
- AI Research Scientist
- Innovation Labs
- Medellín, Colombia
- $90K - $130K
- Full-time

Job 3:
- Senior Data Scientist
- Analytics Pro
- Remote
- $75K - $110K
- Full-time
```

---

## Components to Use

**From shadcn/ui:**
- Card (for company info, main content container)
- CardHeader, CardContent, CardFooter
- Button (variants: default, outline)
- Badge (variants: default, secondary, success)
- Separator (divider lines)

**Icons from lucide-react:**
- Building2 (company)
- Briefcase (job type)
- MapPin (location)
- DollarSign (salary)
- Calendar (posted date)
- Users (applicants, company size)
- Eye (views)
- Bookmark (save job)
- Check (requirements)
- ArrowRight (responsibilities)
- Star (bonus points)
- ChevronRight (breadcrumb)

---

## Responsive Design

### Desktop (> 1024px)
- 2-column layout: Main content (65%) + Sidebar (35%)
- Fixed sidebar while scrolling (optional)
- Full-width similar jobs grid (3 columns)

### Tablet (640px - 1024px)
- Single column
- Sidebar moves below main content
- Similar jobs grid (2 columns)

### Mobile (< 640px)
- Stack all vertically
- Full-width buttons
- Similar jobs grid (1 column)
- Sticky apply button bar at bottom (optional)

---

## Styling Guidelines

### Colors
- Primary for "Apply Now" button
- Muted text for secondary information
- Success/green for "Remote" badge
- Default/gray for job type badge
- Light background for salary section

### Typography
- Job title: text-3xl, font-bold
- Section headings: text-2xl, font-semibold
- Company name: text-lg, font-medium
- Body text: text-base, leading-relaxed
- Metadata: text-sm, text-muted-foreground

### Spacing
- Section spacing: space-y-8
- Paragraph spacing: space-y-4
- List item spacing: space-y-2
- Card padding: p-6
- Button spacing: mt-2, mt-4

### Visual Effects
- Card shadow: shadow-md
- Hover on similar job cards: shadow-lg
- Rounded corners: rounded-lg
- Border: border
- Transitions: transition-all duration-200

---

## Button States (Visual Only)

### Apply Now Button
- Default: "Apply Now"
- On click: Change to "Applied ✓" (green background, disabled)
- Just visual change, no actual submission

### Save Job Button
- Default: Outline bookmark icon
- On click: Filled bookmark icon (toggle)
- Just visual toggle, no data storage

---

## What NOT to Include

❌ Don't add:
- Supabase queries or database connections
- useState for fetching data
- useEffect for loading job
- Form submission logic
- Authentication checks
- Real applicant count calculation
- Navigation to company page (just show button)
- Actual job application submission

✅ Do add:
- Beautiful page layout
- Mock job data (hardcoded)
- Visual button states
- Responsive design
- Proper component structure
- Icons and styling
- Similar jobs section with mock cards

---

## Success Checklist

Before marking complete:
- [ ] Page loads at `/jobs/:id` route
- [ ] All sections display with mock data
- [ ] Company logo and info show correctly
- [ ] Breadcrumb navigation displays
- [ ] Salary section has highlighted background
- [ ] All bullet lists render with proper icons
- [ ] Sidebar company card displays
- [ ] Action buttons are styled correctly
- [ ] Similar jobs section shows 3 cards
- [ ] Page is responsive (mobile, tablet, desktop)
- [ ] No TypeScript errors
- [ ] No console errors
- [ ] All text is readable
- [ ] Spacing and padding look professional
- [ ] Matches design system of other pages

---

**Priority:** TIER 1 - Critical Detail Page
**Estimated Time:** 2-3 hours
**Focus:** UI design and layout with mock data only
