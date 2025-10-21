# Medellin AI - UI Design Prompt Template

> **Purpose**: This template provides a comprehensive structure for generating detailed UI/UX design specifications for Medellin AI pages. Use this as a guide when creating new page designs or redesigning existing features.

---

## 1. Page Overview

### 1.1 Page Name
- **Name**: [Page name, e.g., "My Presentations Dashboard"]
- **Route**: [URL path, e.g., `/presentations` or `/profile`]
- **User Role**: [Who accesses this page, e.g., "Authenticated users only", "Public"]

### 1.2 Purpose & User Goals
**Primary Purpose**: [What problem does this page solve?]

**User Goals**:
- Primary goal: [What's the #1 thing users want to accomplish?]
- Secondary goals:
  - [Supporting task 1]
  - [Supporting task 2]
  - [Supporting task 3]

### 1.3 User Personas
**Target Users**:
1. **[Persona 1 Name]**: [Brief description, e.g., "Solo entrepreneur creating first pitch deck"]
2. **[Persona 2 Name]**: [Brief description, e.g., "Startup founder iterating on investor presentations"]
3. **[Persona 3 Name]**: [Brief description, e.g., "Corporate professional building internal presentations"]

---

## 2. UI Layout Structure

### 2.1 Page Hierarchy
```
[Component Tree]
├── Header
│   ├── Logo
│   ├── Navigation
│   └── User Menu
├── Main Content Area
│   ├── [Section 1]
│   ├── [Section 2]
│   └── [Section 3]
└── Footer (optional)
```

### 2.2 Key Sections

#### Section 1: [Name]
- **Position**: [Top/Middle/Bottom of page]
- **Purpose**: [What this section does]
- **Content**: [What's displayed]
- **Layout**: [Grid/Flex/Stack arrangement]

#### Section 2: [Name]
- **Position**: [Location]
- **Purpose**: [Function]
- **Content**: [Elements]
- **Layout**: [Arrangement]

#### Section 3: [Name]
- **Position**: [Location]
- **Purpose**: [Function]
- **Content**: [Elements]
- **Layout**: [Arrangement]

---

## 3. Design System - Soft Intelligence

### 3.1 Color Palette

#### Primary Colors
- **Warm Amber** `#F5A623` - Primary CTA, AI generation buttons
- **Deep Indigo** `#4A5568` - Headings, primary text
- **Soft Slate** `#718096` - Body text, secondary information

#### Secondary Colors
- **Muted Teal** `#38B2AC` - Success states, active indicators
- **Gentle Coral** `#FC8181` - Warnings, destructive actions
- **Powder Blue** `#90CDF4` - Links, interactive elements

#### Neutral Palette
- **Pure White** `#FFFFFF` - Backgrounds, cards
- **Cloud Gray** `#F7FAFC` - Subtle backgrounds, hover states
- **Soft Gray** `#EDF2F7` - Borders, dividers
- **Charcoal** `#2D3748` - Dark text, strong contrast

### 3.2 Typography

#### Font Families
- **Headings**: Inter, system-ui
- **Body Text**: Inter, system-ui
- **Code/Monospace**: JetBrains Mono, Consolas, monospace

#### Type Scale
```css
/* Headings */
h1: 2.5rem (40px) / font-weight: 700 / line-height: 1.2
h2: 2rem (32px) / font-weight: 700 / line-height: 1.3
h3: 1.5rem (24px) / font-weight: 600 / line-height: 1.4
h4: 1.25rem (20px) / font-weight: 600 / line-height: 1.5

/* Body */
body-large: 1.125rem (18px) / font-weight: 400 / line-height: 1.6
body: 1rem (16px) / font-weight: 400 / line-height: 1.6
body-small: 0.875rem (14px) / font-weight: 400 / line-height: 1.5
caption: 0.75rem (12px) / font-weight: 400 / line-height: 1.4
```

### 3.3 Spacing System
```
xs: 0.25rem (4px)
sm: 0.5rem (8px)
md: 1rem (16px)
lg: 1.5rem (24px)
xl: 2rem (32px)
2xl: 3rem (48px)
3xl: 4rem (64px)
4xl: 6rem (96px)
```

### 3.4 Border Radius
```
sm: 0.25rem (4px) - Input fields, small buttons
md: 0.5rem (8px) - Cards, buttons
lg: 0.75rem (12px) - Modal dialogs
xl: 1rem (16px) - Hero sections, large cards
2xl: 1.5rem (24px) - Feature cards
full: 9999px - Pills, avatars, circular buttons
```

### 3.5 Shadows
```css
/* Card elevations */
shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05)
shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)
shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)
shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)
shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)

/* Hover states */
hover-shadow: 0 10px 25px -5px rgba(245, 166, 35, 0.2)
```

---

## 4. Responsive Design

### 4.1 Breakpoints
```css
/* Mobile First Approach */
mobile: 0px - 639px (default)
tablet: 640px - 1023px (@media (min-width: 640px))
desktop: 1024px - 1279px (@media (min-width: 1024px))
wide: 1280px+ (@media (min-width: 1280px))
```

### 4.2 Layout Behavior

#### Mobile (0-639px)
- [How layout adapts for mobile]
- [Stack order changes]
- [Hidden/shown elements]
- [Navigation changes]

#### Tablet (640-1023px)
- [Layout adjustments]
- [Grid columns]
- [Spacing changes]

#### Desktop (1024px+)
- [Full layout]
- [Sidebar behavior]
- [Max content width]

---

## 5. Component Specifications

### 5.1 Component List

#### Component 1: [Name]
**Purpose**: [What it does]

**Props**:
```typescript
interface [ComponentName]Props {
  [prop1]: [type]; // Description
  [prop2]: [type]; // Description
  [prop3]?: [type]; // Optional - description
}
```

**States**:
- Default: [Description]
- Hover: [Visual changes]
- Active: [Visual changes]
- Disabled: [Visual changes]
- Loading: [Visual changes]

**Visual Design**:
- **Dimensions**: [Width x Height, or responsive rules]
- **Background**: [Color, gradient, or image]
- **Border**: [Width, color, radius]
- **Shadow**: [Shadow specification]
- **Typography**: [Font size, weight, color]
- **Spacing**: [Padding, margin]

#### Component 2: [Name]
[Same structure as above]

---

## 6. Interactive Elements

### 6.1 Primary CTA Button
**Style**: Warm Amber background with white text

**States**:
```css
/* Default */
background: #F5A623
color: #FFFFFF
padding: 12px 24px
border-radius: 8px
font-weight: 600
shadow: 0 2px 4px rgba(245, 166, 35, 0.3)

/* Hover */
background: #E89714 (darker amber)
shadow: 0 4px 12px rgba(245, 166, 35, 0.4)
transform: translateY(-2px)

/* Active */
background: #D68910
transform: translateY(0)

/* Disabled */
background: #CBD5E0 (Soft Gray)
color: #A0AEC0
cursor: not-allowed
```

### 6.2 Secondary Button
[Similar specifications]

### 6.3 Text Link
[Specifications]

### 6.4 Form Inputs
[Input field specifications]

---

## 7. Content Guidelines

### 7.1 Empty States
**When Shown**: [Condition that triggers empty state]

**Content**:
- **Icon**: [Specify icon or illustration]
- **Heading**: "[Example heading text]"
- **Description**: "[Example description]"
- **CTA**: "[Button text]"

**Visual Design**:
- Center-aligned content
- Icon/illustration: 120px size, Soft Slate color
- Max-width: 400px
- Vertical spacing: 24px between elements

### 7.2 Loading States
[Skeleton screens, spinners, progress indicators]

### 7.3 Error States
[Error messages, retry options]

---

## 8. Interactions & Animations

### 8.1 Hover Effects
- **Cards**: Lift effect (translateY -4px) + shadow increase
- **Buttons**: Subtle lift (translateY -2px) + shadow
- **Links**: Color change to Powder Blue

### 8.2 Transitions
```css
/* Standard transition */
transition: all 0.2s ease-in-out

/* Specific properties */
transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out
```

### 8.3 Micro-interactions
- [Button click feedback]
- [Loading indicators]
- [Success confirmations]
- [Error shake animations]

---

## 9. Accessibility (A11y)

### 9.1 Checklist
- [ ] All interactive elements keyboard accessible (Tab, Enter, Escape)
- [ ] Focus indicators visible (2px Warm Amber outline)
- [ ] ARIA labels on icon-only buttons
- [ ] Alt text on all images
- [ ] Color contrast ratios meet WCAG AA (4.5:1 for text)
- [ ] Form inputs have associated labels
- [ ] Error messages announced to screen readers
- [ ] Skip navigation link present
- [ ] Semantic HTML (header, nav, main, footer, section, article)

### 9.2 Keyboard Navigation
- **Tab**: Navigate between interactive elements
- **Enter/Space**: Activate buttons, links
- **Escape**: Close modals, dropdowns
- **Arrow Keys**: Navigate within components (dropdowns, tabs)

### 9.3 Screen Reader Support
- [ ] Descriptive page titles
- [ ] ARIA landmarks (role="main", role="navigation")
- [ ] Live regions for dynamic content updates
- [ ] Proper heading hierarchy (h1 → h2 → h3)

---

## 10. Images & Media

### 10.1 Image Usage

#### Placeholder Images
- **Service**: Unsplash API or local placeholders
- **Dimensions**: [Specify for each use case]
- **Style**: [Photo style, illustration style]
- **Fallback**: [SVG placeholder with Soft Slate background]

#### User-Generated Images
- **Format**: JPEG, PNG, WebP
- **Max Size**: 5MB per image
- **Optimization**: Automatic compression, responsive srcset
- **Storage**: Supabase Storage buckets

### 10.2 Icons
- **Library**: Lucide React icons
- **Size**: 16px (small), 20px (medium), 24px (large)
- **Color**: Inherit from parent or Deep Indigo
- **Style**: Outlined (stroke-width: 2px)

---

## 11. Data Integration

### 11.1 Data Model
```typescript
interface [DataModel] {
  id: string;
  [field1]: [type];
  [field2]: [type];
  created_at: string;
  updated_at: string;
}
```

### 11.2 API Endpoints
- **Fetch**: `GET /api/[resource]`
- **Create**: `POST /api/[resource]`
- **Update**: `PATCH /api/[resource]/:id`
- **Delete**: `DELETE /api/[resource]/:id`

### 11.3 State Management
- **Global State**: [Zustand store name]
- **Local State**: [React useState for component-specific state]
- **Server State**: [React Query for data fetching]

---

## 12. Implementation Notes

### 12.1 Technical Stack
- **Framework**: React 18+ with TypeScript
- **Styling**: Tailwind CSS
- **State**: Zustand + React Query
- **Forms**: React Hook Form + Zod validation
- **UI Components**: shadcn/ui base components
- **Icons**: Lucide React
- **Animation**: Framer Motion (optional)

### 12.2 File Structure
```
src/
├── pages/
│   └── [PageName].tsx
├── components/
│   └── [ComponentName]/
│       ├── [ComponentName].tsx
│       ├── [ComponentName].types.ts
│       └── index.ts
├── hooks/
│   └── use[HookName].ts
├── stores/
│   └── [storeName].store.ts
└── lib/
    └── utils.ts
```

### 12.3 Performance Optimization
- [ ] Lazy load components with React.lazy()
- [ ] Memoize expensive calculations with useMemo
- [ ] Virtualize long lists (react-window)
- [ ] Optimize images (next/image or similar)
- [ ] Code splitting per route

---

## 13. Real-World Use Cases

### Use Case 1: [Scenario Name]
**Actor**: [User type]
**Goal**: [What they want to achieve]
**Steps**:
1. [Action 1]
2. [Action 2]
3. [Action 3]
**Outcome**: [Result]
**Time**: [Expected duration]

### Use Case 2: [Scenario Name]
[Same structure]

### Use Case 3: [Scenario Name]
[Same structure]

---

## 14. Success Metrics

### 14.1 UX Metrics
- **Task Completion Rate**: [Target %]
- **Time on Task**: [Target duration]
- **Error Rate**: [Target %]
- **User Satisfaction**: [Target NPS or CSAT score]

### 14.2 Performance Metrics
- **First Contentful Paint (FCP)**: < 1.8s
- **Largest Contentful Paint (LCP)**: < 2.5s
- **Cumulative Layout Shift (CLS)**: < 0.1
- **Time to Interactive (TTI)**: < 3.5s

### 14.3 Business Metrics
- **Conversion Rate**: [Target %]
- **User Retention**: [Target %]
- **Feature Adoption**: [Target %]

---

## 15. Deliverables

### For Lovable/Development Team
- [ ] Complete design specification document (this file)
- [ ] Figma/Sketch mockups (optional but recommended)
- [ ] Component prop interfaces (TypeScript)
- [ ] API endpoint specifications
- [ ] Database schema (if new tables needed)
- [ ] User flow diagrams
- [ ] Accessibility checklist
- [ ] Success metrics dashboard

### For Stakeholders
- [ ] Executive summary (1-page overview)
- [ ] User journey maps
- [ ] Feature prioritization matrix
- [ ] Timeline and milestones

---

## Template Usage Instructions

1. **Copy this template** for each new page design
2. **Rename the file** to match the page (e.g., `01-my-presentations-ui-plan.md`)
3. **Fill in all sections** with specific details for the page
4. **Replace placeholders** (marked with `[brackets]`) with actual content
5. **Remove sections** that don't apply (mark as "N/A" if needed)
6. **Add screenshots** or mockups where helpful
7. **Reference existing components** from the design system
8. **Keep it updated** as designs evolve

---

**Version**: 1.0
**Last Updated**: 2025-01-13
**Maintained By**: Medellin AI Design Team
