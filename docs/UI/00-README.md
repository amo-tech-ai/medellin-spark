# Presentation AI - UI/UX Wireframe Documentation

**Project**: Medellin AI - Presentation Generator Integration
**Purpose**: Complete UI/UX specifications for designing in Lovable
**Date**: October 13, 2025

---

## 📁 Documentation Overview

This directory contains detailed wireframe specifications for all UI components needed for the Presentation AI feature integration.

### Files:

1. **`01-presentation-dashboard-wireframe.md`** - Main dashboard page
2. **`02-generation-wizard-wireframe.md`** - AI presentation creation wizard
3. **`03-theme-creator-wireframe.md`** - Custom theme builder modal
4. **`04-share-modal-wireframe.md`** - Presentation sharing modal

---

## 🎯 Quick Start Guide

### For Lovable Design:

**Step 1**: Start with the Dashboard
- Open `01-presentation-dashboard-wireframe.md`
- Design the main layout, stats cards, and presentation grid
- Focus on card interactions and responsive behavior

**Step 2**: Create the Wizard
- Open `02-generation-wizard-wireframe.md`
- Build the 4-step wizard flow
- Implement progress indicator and form validation

**Step 3**: Design Modals
- Open `03-theme-creator-wireframe.md` - Theme creator
- Open `04-share-modal-wireframe.md` - Share modal
- These are overlay components

**Step 4**: Test & Refine
- Test responsive breakpoints
- Verify accessibility
- Check color contrast

---

## 📊 Component Priority

### Must Have (Phase 1):
1. ✅ **Presentation Dashboard** - Core interface
2. ✅ **Generation Wizard** - Content creation
3. ✅ **Share Modal** - Basic sharing

### Nice to Have (Phase 2):
4. ✅ **Theme Creator** - Customization (can use default themes initially)

---

## 🎨 Design System

### Colors (Medellin Spark Theme):

```
Primary:     #8B5CF6 (Purple)
Secondary:   #06B6D4 (Cyan)
Success:     #10B981 (Green)
Warning:     #F59E0B (Orange)
Error:       #EF4444 (Red)

Background:  #F9FAFB (Light) / #1F2937 (Dark)
Card:        #FFFFFF (Light) / #374151 (Dark)
Text:        #111827 (Light) / #F9FAFB (Dark)
Border:      #E5E7EB (Light) / #4B5563 (Dark)
```

### Typography:

**Headings**: Montserrat, Poppins, or Raleway
**Body**: Inter, Lato, or Open Sans

**Scale**:
- h1: 2.5rem (40px)
- h2: 2rem (32px)
- h3: 1.5rem (24px)
- h4: 1.25rem (20px)
- body: 1rem (16px)
- small: 0.875rem (14px)

### Spacing:

Use Tailwind spacing scale (0.25rem = 1 unit):
- xs: 0.5rem (8px)
- sm: 0.75rem (12px)
- md: 1rem (16px)
- lg: 1.5rem (24px)
- xl: 2rem (32px)
- 2xl: 3rem (48px)

### Shadows:

```css
sm:   0 1px 2px rgba(0,0,0,0.05)
md:   0 4px 6px rgba(0,0,0,0.1)
lg:   0 10px 15px rgba(0,0,0,0.1)
xl:   0 20px 25px rgba(0,0,0,0.1)
```

### Border Radius:

```
sm:  0.25rem (4px)
md:  0.5rem (8px)
lg:  0.75rem (12px)
xl:  1rem (16px)
```

---

## 📱 Responsive Breakpoints

```
Mobile:  < 768px
Tablet:  768px - 1024px
Desktop: > 1024px
```

### Layout Adjustments:

**Dashboard Grid**:
- Desktop: 3 columns
- Tablet: 2 columns
- Mobile: 1 column

**Stats Cards**:
- Desktop: 4 in a row
- Tablet: 2×2 grid
- Mobile: 2×2 grid

**Wizard**:
- Desktop: Max 800px centered
- Tablet: Max 600px
- Mobile: Full width

---

## 🔧 Component Library

### UI Components Needed:

**From Radix UI**:
- `@radix-ui/react-dialog` - Modals
- `@radix-ui/react-dropdown-menu` - Dropdowns
- `@radix-ui/react-select` - Select inputs
- `@radix-ui/react-checkbox` - Checkboxes
- `@radix-ui/react-radio-group` - Radio buttons
- `@radix-ui/react-slider` - Sliders
- `@radix-ui/react-tabs` - Tabs
- `@radix-ui/react-toast` - Toasts
- `@radix-ui/react-toggle` - Toggle switches

**Custom Components**:
- PresentationCard
- StatsCard
- FilterBar
- WizardStep
- ProgressIndicator
- ColorPicker
- ThemePreview
- ShareButton
- CopyButton

**Already Available** (from existing Medellin AI):
- Button
- Input
- Textarea
- Label
- Card
- Badge
- Skeleton
- Avatar
- Spinner

---

## 🎬 Animations

### Transitions:

```css
/* Fade in */
fade-in: opacity 0 → 1, 300ms ease

/* Scale up */
scale-up: scale 0.95 → 1, 200ms ease

/* Slide in from bottom */
slide-up: translateY(10px) → 0, 300ms ease

/* Hover scale */
hover-scale: scale 1 → 1.05, 200ms ease
```

### Interactive States:

**Buttons**:
- Hover: brightness(1.1)
- Active: scale(0.98)
- Disabled: opacity(0.5)

**Cards**:
- Hover: shadow-lg, scale(1.02)
- Active: shadow-xl

**Inputs**:
- Focus: ring-2, ring-primary

---

## 📋 Data Requirements

### API Endpoints Needed:

```
GET    /api/presentations                    - List presentations
POST   /api/presentations                    - Create presentation
GET    /api/presentations/:id                - Get presentation
PUT    /api/presentations/:id                - Update presentation
DELETE /api/presentations/:id                - Delete presentation

POST   /api/presentations/generate-outline   - Generate outline
POST   /api/presentations/generate           - Generate full presentation
GET    /api/presentations/:id/status         - Check generation status

GET    /api/themes                           - List custom themes
POST   /api/themes                           - Create theme
PUT    /api/themes/:id                       - Update theme
DELETE /api/themes/:id                       - Delete theme

POST   /api/presentations/:id/share          - Enable sharing
PUT    /api/presentations/:id/share          - Update share settings
DELETE /api/presentations/:id/share          - Disable sharing

POST   /api/presentations/:id/favorite       - Add to favorites
DELETE /api/presentations/:id/favorite       - Remove from favorites
```

### Supabase Queries:

**Get presentations with stats**:
```typescript
const { data } = await supabase
  .rpc('get_presentations_with_favorites', { user_id })
  .order('updated_at', { ascending: false });

const { data: stats } = await supabase
  .rpc('get_presentation_stats', { user_id })
  .single();
```

---

## ♿ Accessibility Requirements

### WCAG 2.1 AA Compliance:

**Keyboard Navigation**:
- ✅ Tab through all interactive elements
- ✅ Enter/Space to activate buttons
- ✅ Escape to close modals/dropdowns
- ✅ Arrow keys for sliders/carousels

**Screen Readers**:
- ✅ ARIA labels on all inputs
- ✅ ARIA live regions for status updates
- ✅ Meaningful alt text for images
- ✅ Proper heading hierarchy

**Visual**:
- ✅ Minimum 4.5:1 contrast for text
- ✅ Minimum 3:1 contrast for UI components
- ✅ Focus indicators visible
- ✅ Text resizable to 200%

**Forms**:
- ✅ Label associated with input
- ✅ Error messages linked to fields
- ✅ Required fields indicated
- ✅ Validation messages clear

---

## 🧪 Testing Checklist

### Before Handoff:

**Visual**:
- [ ] All layouts match wireframes
- [ ] Responsive at all breakpoints
- [ ] Dark mode works correctly
- [ ] Animations smooth (60fps)
- [ ] Loading states implemented
- [ ] Empty states designed

**Interactive**:
- [ ] All buttons clickable
- [ ] Forms validate correctly
- [ ] Modals open/close properly
- [ ] Tooltips show on hover
- [ ] Dropdowns work correctly
- [ ] Copy buttons function

**Data**:
- [ ] Mock data displays correctly
- [ ] Pagination works
- [ ] Filters update results
- [ ] Search is responsive
- [ ] Sort functions work

**Accessibility**:
- [ ] Keyboard navigation works
- [ ] Screen reader tested
- [ ] Contrast ratios pass
- [ ] Focus indicators visible
- [ ] ARIA labels present

---

## 📦 Component File Structure

```
src/
├── features/
│   └── presentations/
│       ├── components/
│       │   ├── PresentationCard.tsx
│       │   ├── StatsCard.tsx
│       │   ├── PresentationFilters.tsx
│       │   ├── ThemeCreator.tsx
│       │   ├── ShareModal.tsx
│       │   └── wizard/
│       │       ├── Step1Topic.tsx
│       │       ├── Step2Options.tsx
│       │       ├── Step3Review.tsx
│       │       └── Step4Generate.tsx
│       ├── hooks/
│       │   ├── usePresentations.ts
│       │   ├── useWizardState.ts
│       │   ├── useThemeCreator.ts
│       │   └── useShareSettings.ts
│       ├── api/
│       │   ├── presentationApi.ts
│       │   ├── themeApi.ts
│       │   └── shareApi.ts
│       └── lib/
│           ├── themes.ts
│           └── utils.ts
├── pages/
│   ├── PresentationDashboard.tsx
│   └── PresentationWizard.tsx
```

---

## 🚀 Implementation Workflow

### Phase 1: Design in Lovable (Current Phase)
1. ✅ Read wireframe specs (this document)
2. ✅ Design Dashboard page
3. ✅ Design Wizard flow
4. ✅ Design Theme Creator modal
5. ✅ Design Share Modal
6. ✅ Test responsive behavior
7. ✅ Export components from Lovable

### Phase 2: Integration
1. Copy generated components to Medellin AI codebase
2. Connect to Supabase API
3. Implement data fetching with React Query
4. Add state management with Zustand
5. Wire up forms and validation
6. Test end-to-end flows

### Phase 3: Polish
1. Add loading states
2. Add error handling
3. Add success feedback
4. Optimize performance
5. Fix accessibility issues
6. Cross-browser testing

---

## 💡 Design Tips for Lovable

### Best Practices:

**1. Start Simple**:
- Build basic layout first
- Add interactivity next
- Polish last

**2. Component Reuse**:
- Create reusable components (cards, buttons)
- Use consistent spacing
- Follow design system

**3. State Management**:
- Plan form state structure
- Define data flow
- Mock API responses

**4. Responsive Design**:
- Mobile-first approach
- Test at all breakpoints
- Use flexible layouts

**5. Accessibility**:
- Add ARIA labels from start
- Test keyboard navigation
- Check color contrast

---

## 🎓 Resources

### Design References:

**Presentation Tools**:
- Gamma.app - AI presentation design
- Beautiful.ai - Smart templates
- Pitch.com - Collaborative presentations
- Canva Presentations - Template library

**Dashboard Inspiration**:
- Notion dashboard
- Linear project view
- Figma file browser
- GitHub repository list

**Wizard Flows**:
- Typeform multi-step forms
- Shopify onboarding
- Calendly booking flow
- Stripe checkout

### Component Libraries:

- **Radix UI**: https://radix-ui.com
- **shadcn/ui**: https://ui.shadcn.com
- **Tailwind CSS**: https://tailwindcss.com
- **Heroicons**: https://heroicons.com

---

## ❓ FAQ

**Q: Should I design the presentation editor?**
A: No, the editor already exists in the reference app and uses Plate.js. Just design the dashboard, wizard, and modals.

**Q: What about the presentation viewer?**
A: The viewer will be built separately using the editor components. Focus on creation/management UI.

**Q: How detailed should animations be?**
A: Define transitions and hover states. Exact timing can be adjusted in code.

**Q: Do I need to design error states?**
A: Yes, include error messages, validation states, and empty states.

**Q: What about loading states?**
A: Yes, use skeleton loaders and spinners where appropriate.

**Q: Mobile design required?**
A: Yes, all components must be responsive and mobile-friendly.

---

## 📞 Support

For questions or clarifications:
- Review the detailed wireframe files
- Check the integration plan: `docs/PRESENTATION_AI_INTEGRATION_PLAN.md`
- Check the conversion plan: `docs/PRESENTATION_AI_FILE_CONVERSION_PLAN.md`

---

## ✅ Checklist for Lovable Design

### Before You Start:
- [ ] Read all wireframe documents
- [ ] Understand the user flow
- [ ] Review design system colors/fonts
- [ ] Check component requirements

### While Designing:
- [ ] Follow wireframe layouts
- [ ] Use consistent spacing
- [ ] Apply brand colors
- [ ] Add hover states
- [ ] Include loading states
- [ ] Design empty states
- [ ] Add error states
- [ ] Test responsive views

### Before Export:
- [ ] Verify all interactions work
- [ ] Test keyboard navigation
- [ ] Check accessibility
- [ ] Review all text content
- [ ] Validate data structure
- [ ] Document any deviations

---

**Ready to design?** Open the wireframe files and start building in Lovable! 🎨✨

All specifications are complete and production-ready.
