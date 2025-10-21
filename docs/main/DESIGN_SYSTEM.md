# Medellin AI Hub - Design System

## 🎨 Visual Identity

### Color Palette

#### Primary Colors (HSL)
```css
Primary Orange: hsl(14, 82%, 60%)     /* #F97316 */
Primary Hover: hsl(14, 82%, 55%)      /* #FF6A3D */
Secondary Orange: hsl(14, 90%, 65%)   /* Lighter variant */
```

#### Neutral Colors
```css
Background White: hsl(0, 0%, 100%)    /* #FFFFFF */
Background Light: hsl(0, 0%, 98%)     /* #FAFAFA */
Surface: hsl(0, 0%, 96%)              /* Cards, sections */
Border: hsl(0, 0%, 91%)               /* #E8E8E8 */
Text Dark: hsl(0, 0%, 9%)             /* #171717 */
Text Muted: hsl(0, 0%, 46%)           /* #757575 */
```

#### Semantic Colors
```css
Success: hsl(142, 71%, 45%)           /* Green */
Warning: hsl(38, 92%, 50%)            /* Yellow */
Error: hsl(0, 84%, 60%)               /* Red */
Info: hsl(217, 91%, 60%)              /* Blue */
```

### Typography

#### Font Family
- **Primary:** Inter (Google Fonts)
- **Weights:** 400 (Regular), 500 (Medium), 600 (Semibold), 700 (Bold)

#### Type Scale
```css
Display: 48px / 56px (3rem / 3.5rem)
H1: 36px / 40px (2.25rem / 2.5rem)
H2: 30px / 36px (1.875rem / 2.25rem)
H3: 24px / 32px (1.5rem / 2rem)
H4: 20px / 28px (1.25rem / 1.75rem)
Body Large: 18px / 28px (1.125rem / 1.75rem)
Body: 16px / 24px (1rem / 1.5rem)
Body Small: 14px / 20px (0.875rem / 1.25rem)
Caption: 12px / 16px (0.75rem / 1rem)
```

#### Font Weights
- Headlines: 700 (Bold)
- Subheads: 600 (Semibold)
- Body: 400 (Regular)
- Buttons: 500 (Medium)
- Labels: 500 (Medium)

### Spacing System

**Base unit:** 4px (0.25rem)

```
4px   (spacing-1)   0.25rem
8px   (spacing-2)   0.5rem
12px  (spacing-3)   0.75rem
16px  (spacing-4)   1rem
20px  (spacing-5)   1.25rem
24px  (spacing-6)   1.5rem
32px  (spacing-8)   2rem
40px  (spacing-10)  2.5rem
48px  (spacing-12)  3rem
64px  (spacing-16)  4rem
96px  (spacing-24)  6rem
```

### Border Radius

```
Small: 8px (0.5rem)      /* Tags, badges */
Medium: 12px (0.75rem)   /* Cards, buttons */
Large: 16px (1rem)       /* Modals, sections */
Round: 9999px            /* Pills, avatars */
```

### Shadows

```css
Soft: 0 2px 8px rgba(0, 0, 0, 0.05)
Card: 0 4px 16px rgba(0, 0, 0, 0.08)
Card Hover: 0 8px 24px rgba(0, 0, 0, 0.12)
Glow: 0 12px 40px rgba(242, 96, 60, 0.15)
Focus: 0 0 0 3px rgba(249, 115, 22, 0.2)
```

### Animation

```css
Duration Fast: 150ms
Duration Normal: 200ms
Duration Slow: 300ms
Easing: cubic-bezier(0.4, 0, 0.2, 1)
```

## 🧩 Component System

### Buttons

#### Primary Button
- Background: Primary orange
- Text: White
- Hover: Scale 1.02 + glow shadow
- Padding: 12px 24px (medium)
- Border radius: 12px
- Font: 500 weight, 14px

#### Secondary/Outline Button
- Background: Transparent
- Border: 1px solid border color
- Text: Foreground
- Hover: Background accent + text accent-foreground

#### Text Button
- No background or border
- Text: Primary color
- Hover: Opacity 0.8

#### Sizes
- Small: h-9 (36px), px-3
- Medium: h-10 (40px), px-4
- Large: h-11 (44px), px-8

### Cards

#### Event Card
- White background
- Border: 1px solid border
- Padding: 16px
- Border radius: 12px
- Shadow: Card shadow
- Hover: Shadow-glow + border-primary

**Structure:**
- Category badge (top-left)
- Status badge (top-right, "upcoming")
- Title (H3, bold)
- Description (2 lines, text-sm)
- Date + time (icon + text)
- Location (icon + text)
- Attendees count
- CTA button (full width, primary)

#### Perk Card
- White background
- Featured badge (orange, top-left)
- Value badge (grey, top-right)
- Partner name (bold)
- Short description
- Category tag
- "View Details" button

#### Blog Card
- Image (16:9 aspect ratio)
- Category badge (overlay on image)
- Title (H3)
- Excerpt (2-3 lines)
- Date
- "Read More" link with arrow

### Filters & Tags

#### Filter Buttons
- Pill shape (rounded-full)
- Default: bg-background, border, text-foreground
- Active: bg-primary, text-white
- Padding: 8px 16px
- Font: 500 weight, 14px
- Hover: bg-accent

#### Category Tags
- Small pill
- Light background with colored text
- Examples: "Workshop", "Hackathon", "AI & Automation"
- Padding: 4px 12px
- Font: 500 weight, 12px

### Forms

#### Input Fields
- Height: 40px
- Border: 1px solid border
- Border radius: 12px
- Padding: 8px 12px
- Focus: Orange ring (3px)
- Placeholder: Muted color

#### Search Bar
- Icon on left (Search icon)
- Full width or 400px max
- Light background

### Navigation

#### Top Navigation
- Sticky
- White background
- Border bottom
- Height: 64px
- Logo left
- Menu items center
- CTA button right (orange)

#### Footer
- 5 columns on desktop
- Light grey background
- Sections: Brand, Quick Links, Dashboards, Community, Stay Connected
- Social icons
- Copyright centered

## 📱 Responsive Breakpoints

```
Mobile: < 768px
Tablet: 768px - 1024px
Desktop: > 1024px
Wide: > 1280px
```

### Responsive Patterns

**Mobile (< 768px):**
- Single column layouts
- Stacked cards
- Bottom nav bar (fixed)
- Hamburger menu
- Touch targets min 44px
- Filters scroll horizontally

**Tablet (768px - 1024px):**
- 2 column grids
- Drawer navigation
- Compact cards
- Touch-optimized spacing

**Desktop (> 1024px):**
- 3-4 column grids
- Persistent sidebar (admin)
- Hover states
- Spacious layouts

## ♿ Accessibility

### Color Contrast
- Text on white: 4.5:1 minimum
- Primary on white: 4.5:1 ✓
- Error/success states use icons + text

### Keyboard Navigation
- Tab order follows visual flow
- Focus visible (orange ring)
- Skip to content link
- Escape closes modals

### Screen Readers
- Semantic HTML
- ARIA labels on icons
- Alt text on all images
- Form labels linked

## 🎭 Brand Voice

**Tone:** Friendly, professional, tech-savvy, community-focused

**CTAs:**
- "Join Community"
- "Apply Now"
- "View Details"
- "Register Now"
- "Get Started"
- "Explore Perks"

**Microcopy:**
- Welcome messages: "Welcome back, [Name]! 👋"
- Empty states: "No events yet. Try adjusting your filters."
- Success: "You're registered! Check your email for details."
- Errors: "Something went wrong. Please try again."

## 📊 Layout Patterns

### Hero Section
- Full width
- Center aligned
- Large heading (H1)
- Supporting text (18-20px)
- 2 CTAs (primary + outline)
- Stats grid below

### Content Grid
- Max width: 1200px
- Container padding: 16px mobile, 24px desktop
- Gap between cards: 24px
- Consistent card heights

### Section Spacing
- Between sections: 80px desktop, 48px mobile
- Within sections: 32px desktop, 24px mobile
- Card padding: 24px desktop, 16px mobile

## 🖼️ Iconography

**Style:** Lucide React (outline style, 2px stroke)

**Common Icons:**
- Rocket: Programs/Startups
- Users: Community
- Gift: Perks
- Calendar: Events
- Briefcase: Jobs
- Book: Blog
- MapPin: Location
- Clock: Time
- Mail: Contact
- Search: Search bars

**Sizes:**
- Small: 16px
- Medium: 20px
- Large: 24px
- Hero: 48px

## 🎨 Illustrations & Empty States

**Style:** Flat, minimal, single color (primary orange)

**Empty States:**
- Rocket icon: "No startups found"
- Calendar: "No events yet"
- Gift: "No perks available"
- Search: "No results found"

**Message:** Clear + actionable
**CTA:** Present when applicable

## ✅ Component Checklist

- [x] Buttons (primary, outline, text)
- [x] Cards (event, perk, blog, startup)
- [x] Filters (pill buttons, active state)
- [x] Tags (category badges)
- [x] Forms (input, search, textarea)
- [x] Navigation (navbar, footer)
- [x] Empty states
- [x] Loading states (skeleton)
- [x] Modals/dialogs
- [x] Tabs
- [x] Pagination

## 🚀 Next Steps

1. Implement all page layouts
2. Create reusable components
3. Test responsive behavior
4. Validate accessibility
5. Optimize performance
6. Add micro-interactions
