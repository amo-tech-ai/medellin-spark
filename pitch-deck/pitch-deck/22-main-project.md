# 📋 Main Project - Complete Task Breakdown

**Date:** 2025-10-15
**Project:** Medellin AI Hub - Pitch Deck System
**Location:** `/home/sk/medellin-spark/`
**Current Progress:** 98% Complete
**Remaining Work:** ~10-13 hours

---

## 🎯 What is the "Main Project"?

The Main Project is the **primary pitch deck creation system** built with Vite, React, and Supabase. It's the Lovable-generated codebase that we've been working on. This is what users will interact with when they visit your website.

### Think of it like this:
- **Main Project** = Your production website (Lovable deployment)
- **Presentation-AI** = Advanced AI engine (Next.js backend, not integrated yet)

### Key Features:
1. **Dashboard** - See all your pitch decks in one place
2. **Outline Editor** - Drag & drop slides, organize structure
3. **Slide Editor** - Edit content, auto-saves every 2 seconds
4. **Presentation Viewer** - Full-screen presentation mode
5. **AI Generator** - Quick form-based deck creation
6. **Chat Wizard** - Conversational AI (UI only, not connected yet)

---

## ✅ What's Already Complete (98%)

### Infrastructure (100% ✅)
- Vite build system configured
- React + TypeScript setup
- Supabase database connected
- Authentication working
- Routing configured (React Router)
- UI components (shadcn/ui)
- Tailwind CSS styling

### Database Layer (100% ✅)
- Presentations table with RLS
- Presentation slides table
- Profile connections
- Themes and layouts table
- Database migrations applied
- Row Level Security (RLS) policies

### Core Pages (100% ✅)

#### 1. Dashboard (`/dashboard/pitch-decks`)
**What it does:** Your home base - see all presentations
**Status:** ✅ 100% Complete
**Features Working:**
- Shows all presentations from database
- Search by title
- Sort by: recent, title, slides, status
- Loading states
- Error handling
- Empty states
- Template cards
- Create new presentation buttons

#### 2. Presentation Viewer (`/presentations/:id/view`)
**What it does:** Full-screen presentation mode (like PowerPoint Slideshow)
**Status:** ✅ 100% Complete
**Features Working:**
- Loads slides from database
- Navigate with arrows/keyboard
- Auto-hide controls after 3 seconds
- Slide counter (1 of 5)
- Edit and Share buttons
- Works for public presentations (no login required)

#### 3. Outline Editor (`/presentations/:id/outline`)
**What it does:** Structure your presentation - organize slides
**Status:** ✅ 100% Complete
**Features Working:**
- Lists all slides with titles
- Drag & drop to reorder (using @dnd-kit)
- Add new slides
- Delete slides
- Edit slide titles inline
- Auto-saves to database
- Change theme button
- Generate content button
- Preview button

#### 4. Slide Editor (`/presentations/:id/edit`)
**What it does:** Edit slide content - where you write your pitch
**Status:** ✅ 100% Complete
**Features Working:**
- Slide thumbnails sidebar (shows all slides)
- Edit title and content for each slide
- Auto-save every 2 seconds (debounced)
- "Saving..." / "Saved ✓" status indicator
- Navigate between slides
- Layout button (not connected yet)
- Theme button
- Export button (not connected yet)
- Preview button

### React Query Hooks (100% ✅)
**Files:** `src/hooks/`

1. **usePresentationsQuery.ts** (104 lines)
   - Fetches all presentations for current user
   - Filters by status, category
   - Sorted by update time
   - Cached for 1 minute

2. **usePresentationQuery.ts** (54 lines)
   - Fetches single presentation by ID
   - Checks permissions (RLS)
   - Public presentations work without auth
   - Cached for 30 seconds

3. **usePresentationMutations.ts** (208 lines)
   - Create presentation
   - Update presentation
   - Delete presentation
   - Update outline (slide reordering)
   - Update slide content
   - All with optimistic updates

4. **useAuth.ts** (36 lines)
   - Current user state
   - Session management
   - Sign out function

---

## ⏳ What's NOT Complete (2% Remaining)

### 1. Layout Selector Component (Not Built Yet) 🔴
**Estimated Time:** 5-6 hours
**Priority:** High
**Impact:** Medium

**What it needs to do:**
When you click the "Layout" button in the Slide Editor, a modal should open showing different slide layout templates.

**Detailed Requirements:**

#### Layout Templates Needed (12+ layouts):
1. **Title Slide**
   - Large title centered
   - Subtitle below
   - Optional background image

2. **Text Only**
   - Full-width text content
   - Clean and simple

3. **Title + Content**
   - Title at top
   - Bullet points or paragraphs below
   - Most common layout

4. **Two Columns**
   - Title at top
   - Left column: text
   - Right column: text

5. **Image + Text (Left)**
   - Title at top
   - Left: Large image
   - Right: Text content

6. **Image + Text (Right)**
   - Title at top
   - Left: Text content
   - Right: Large image

7. **Big Number**
   - Large statistic/number centered
   - Supporting text below

8. **Three Columns**
   - Title at top
   - Three equal columns

9. **Quote**
   - Large quote in center
   - Attribution below

10. **Comparison (vs)**
    - Title at top
    - Left: Option A
    - Right: Option B
    - VS in the middle

11. **Image Full**
    - Full-screen background image
    - Text overlay

12. **Section Header**
    - Just a title
    - Transition between sections

**Implementation Tasks:**
```
Step 1: Create LayoutSelector component
- File: src/components/presentations/LayoutSelector.tsx
- Modal component with grid of layout previews
- Click to select, shows checkmark on selected

Step 2: Create layout preview thumbnails
- Small visual representation of each layout
- 150x100px previews
- Gray boxes showing layout structure

Step 3: Create layout data structure
- File: src/types/layouts.ts
- Define layout types
- Layout metadata (name, description, preview)

Step 4: Integrate with SlideEditor
- Import LayoutSelector component
- Open modal on "Layout" button click
- Save selected layout to slide data
- Update slide rendering to use layout

Step 5: Apply layouts in viewer
- Update PresentationViewer.tsx
- Render slides based on their layout type
- Different styles per layout
```

**Files to Create/Modify:**
- `src/components/presentations/LayoutSelector.tsx` (new, ~150 lines)
- `src/types/layouts.ts` (new, ~50 lines)
- `src/pages/presentations/SlideEditor.tsx` (modify, add modal)
- `src/pages/presentations/PresentationViewer.tsx` (modify, layout rendering)

---

### 2. Mobile Responsive Issues (Partially Working) 🟡
**Estimated Time:** 3-4 hours
**Priority:** High
**Impact:** High (affects user experience)

**Problems to Fix:**

#### Issue A: Slide Thumbnails on Mobile
**Where:** SlideEditor (`/presentations/:id/edit`)
**Problem:** Thumbnail panel too wide on small screens
**Current State:** Works on desktop, overlaps on mobile
**Fix Needed:**
```
- Hide thumbnails on screens < 768px
- Add "Slides" button to open drawer
- Drawer slides in from left
- Shows thumbnails in vertical list
- Tap to select slide
```

**Files to Modify:**
- `src/pages/presentations/SlideEditor.tsx` (add responsive breakpoints)
- `src/components/ui/drawer.tsx` (may need to create)

#### Issue B: Outline Editor on Mobile
**Where:** OutlineEditor (`/presentations/:id/outline`)
**Problem:** Slide rows too cramped on mobile
**Current State:** Works but buttons overlap
**Fix Needed:**
```
- Stack buttons vertically on mobile
- Increase touch target size (44x44px minimum)
- Hide drag handle on mobile (not reliable on touch)
- Add "Hold to drag" if keeping drag on mobile
```

**Files to Modify:**
- `src/pages/presentations/OutlineEditor.tsx` (responsive classes)
- `src/components/presentation/outline/OutlineSlideRow.tsx` (button stacking)

#### Issue C: Viewer Controls on Mobile
**Where:** PresentationViewer (`/presentations/:id/view`)
**Problem:** Controls too small to tap easily
**Current State:** Small buttons, hard to tap
**Fix Needed:**
```
- Larger touch targets (minimum 44x44px)
- More spacing between buttons
- Swipe gestures for next/previous
- Tap anywhere to show/hide controls
```

**Files to Modify:**
- `src/pages/presentations/PresentationViewer.tsx` (touch targets)

#### Issue D: Dashboard Cards on Mobile
**Where:** DashboardPitchDecks (`/dashboard/pitch-decks`)
**Problem:** Cards don't stack well on very small screens
**Current State:** Works but could be better
**Fix Needed:**
```
- Grid: 4 columns desktop → 2 columns tablet → 1 column mobile
- Larger cards on mobile (easier to tap)
- Better spacing
```

**Files to Modify:**
- `src/pages/DashboardPitchDecks.tsx` (grid responsive classes)

**Testing Checklist:**
```
- [ ] Test on iPhone SE (375px width) - smallest common phone
- [ ] Test on standard iPhone (390px width)
- [ ] Test on Android (360px width)
- [ ] Test on tablet (768px width)
- [ ] Test on laptop (1024px width)
- [ ] Test on desktop (1440px+ width)
```

---

### 3. Polish & User Experience (Minor Issues) 🟡
**Estimated Time:** 2-3 hours
**Priority:** Medium
**Impact:** Medium (nice to have)

**Enhancement A: Loading Skeletons**
**Current:** Spinner with text
**Improvement:** Skeleton UI (gray boxes showing layout)
```
Instead of:
  <Loader2 /> "Loading..."

Show:
  [Gray box] [Gray box] [Gray box]
  (Looks like content is about to appear)
```

**Files to Create:**
- `src/components/ui/skeleton.tsx` (shadcn component)
- Use in: Dashboard, Viewer, Outline, Editor

**Enhancement B: Better Empty States**
**Current:** Simple text message
**Improvement:** Illustrations and actions
```
Empty Dashboard:
  [Illustration of empty folder]
  "No presentations yet"
  "Get started by creating your first pitch deck"
  [Big "Create Presentation" button]
```

**Files to Modify:**
- `src/pages/DashboardPitchDecks.tsx` (empty state)
- `src/pages/presentations/OutlineEditor.tsx` (no slides state)

**Enhancement C: ARIA Labels**
**Current:** Missing accessibility labels
**Improvement:** Add screen reader support
```
Add to buttons:
  aria-label="Previous slide"
  aria-label="Next slide"
  aria-label="Delete slide"

Add to icons:
  aria-hidden="true" (decorative icons)
```

**Files to Modify:** All page components

**Enhancement D: Keyboard Shortcuts Help**
**Current:** No help modal
**Improvement:** Show keyboard shortcuts
```
Press "?" to open help
Shows modal with:
  Arrow keys: Navigate slides
  Escape: Exit viewer
  Enter: Edit mode
```

**Files to Create:**
- `src/components/KeyboardShortcutsHelp.tsx` (new modal)
- Add to PresentationViewer

---

## 📊 Task Breakdown by Priority

### Must Have (Before Launch) 🔴
1. Layout Selector Component (5-6 hours) - Users need this
2. Mobile Responsive Fixes (3-4 hours) - Many users on mobile

### Should Have (Soon After) 🟡
3. Polish & UX improvements (2-3 hours) - Better experience

### Nice to Have (Later) 🟢
4. AI Integration - Connect wizard to real AI
5. Export to PDF/PowerPoint
6. Theme customization
7. Collaboration features
8. Analytics dashboard

---

## 🛠️ Step-by-Step Implementation Plan

### Week 1 (This Week) - Complete Main Project

#### Day 1: Layout Selector (5-6 hours)
**Morning (3 hours):**
- [ ] Create layout type definitions
- [ ] Design 12 layout templates
- [ ] Create layout preview thumbnails

**Afternoon (3 hours):**
- [ ] Build LayoutSelector modal component
- [ ] Integrate with SlideEditor
- [ ] Test layout selection
- [ ] Save layout to database

#### Day 2: Mobile Responsive (3-4 hours)
**Morning (2 hours):**
- [ ] Fix SlideEditor thumbnails (drawer on mobile)
- [ ] Fix OutlineEditor button stacking

**Afternoon (2 hours):**
- [ ] Fix PresentationViewer touch targets
- [ ] Fix Dashboard card grid
- [ ] Test on multiple devices

#### Day 3: Polish & UX (2-3 hours)
**Morning (1 hour):**
- [ ] Add loading skeletons
- [ ] Improve empty states

**Afternoon (1 hour):**
- [ ] Add ARIA labels
- [ ] Create keyboard shortcuts help
- [ ] Final testing

#### Day 4: Deploy & Test
- [ ] Run full test suite
- [ ] Deploy to production
- [ ] Test live site
- [ ] Fix any bugs

---

## 🎯 Definition of "Done" for Main Project

The Main Project is 100% complete when:

✅ **All Pages Working:**
- [ ] Dashboard loads presentations from database
- [ ] Outline editor saves reordered slides
- [ ] Slide editor auto-saves content
- [ ] Viewer displays presentations in full-screen
- [ ] Layout selector shows 12+ templates
- [ ] All buttons work as expected

✅ **Mobile Responsive:**
- [ ] Works on screens 375px - 1920px wide
- [ ] Touch targets minimum 44x44px
- [ ] No overlapping elements
- [ ] All text readable
- [ ] All features accessible on mobile

✅ **Database Integration:**
- [ ] Create presentations works
- [ ] Update presentations works
- [ ] Delete presentations works
- [ ] Reorder slides works
- [ ] Edit content works
- [ ] All changes persist

✅ **User Experience:**
- [ ] Loading states everywhere
- [ ] Error handling with helpful messages
- [ ] Empty states with clear actions
- [ ] Keyboard shortcuts work
- [ ] Accessible (ARIA labels)

✅ **Performance:**
- [ ] Pages load in < 500ms
- [ ] Auto-save triggers correctly
- [ ] No console errors
- [ ] No memory leaks
- [ ] Smooth animations

✅ **Testing:**
- [ ] All routes tested
- [ ] All CRUD operations tested
- [ ] Mobile responsiveness tested
- [ ] Cross-browser testing (Chrome, Firefox, Safari)
- [ ] Accessibility testing

---

## 📁 File Structure Reference

```
/home/sk/medellin-spark/
├── src/
│   ├── pages/
│   │   ├── Dashboard.tsx
│   │   ├── DashboardPitchDecks.tsx ✅ (database integrated)
│   │   ├── presentations/
│   │   │   ├── OutlineEditor.tsx ✅ (drag & drop working)
│   │   │   ├── SlideEditor.tsx ✅ (auto-save working)
│   │   │   └── PresentationViewer.tsx ✅ (navigation working)
│   ├── hooks/
│   │   ├── usePresentationsQuery.ts ✅
│   │   ├── usePresentationQuery.ts ✅
│   │   ├── usePresentationMutations.ts ✅
│   │   └── useAuth.ts ✅
│   ├── components/
│   │   ├── presentations/
│   │   │   ├── LayoutSelector.tsx ❌ (NEED TO BUILD)
│   │   │   └── outline/
│   │   │       └── OutlineSlideRow.tsx ✅
│   │   └── ui/ (shadcn components) ✅
│   └── types/
│       └── layouts.ts ❌ (NEED TO CREATE)
├── supabase/
│   └── migrations/ ✅ (all applied)
└── lovable-plan/
    └── pitch-deck/
        ├── 21-progress-tracker.md ✅
        └── 22-main-project.md (THIS FILE)
```

---

## 🚀 Quick Start Guide for Each Task

### Task 1: Build Layout Selector

**Start here:**
```bash
# Create the component file
touch src/components/presentations/LayoutSelector.tsx

# Create types file
touch src/types/layouts.ts
```

**What to build:**
1. Modal component with 3x4 grid of layout previews
2. Each preview shows visual representation of layout
3. Click to select, shows blue border on selected
4. "Apply Layout" button at bottom
5. Close modal after applying

**Code structure:**
```typescript
// src/types/layouts.ts
export type LayoutType =
  | 'title-slide'
  | 'title-content'
  | 'two-columns'
  // ... etc

export interface Layout {
  id: LayoutType;
  name: string;
  description: string;
  preview: string; // SVG or component
}

// src/components/presentations/LayoutSelector.tsx
export function LayoutSelector({
  currentLayout,
  onSelectLayout,
  open,
  onClose
}: LayoutSelectorProps) {
  // Grid of layouts
  // Click handler
  // Apply button
}
```

---

### Task 2: Fix Mobile Responsive

**Test approach:**
```bash
# Open browser dev tools
# Press F12
# Click device toolbar icon (phone icon)
# Select "iPhone SE" (375px)
# Navigate through all pages
# Document issues
# Fix one by one
```

**Quick fixes:**
```typescript
// Hide on mobile, show on desktop
className="hidden md:block"

// Stack on mobile, row on desktop
className="flex flex-col md:flex-row"

// 1 column mobile, 4 columns desktop
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4"

// Larger touch targets
className="h-11 w-11" // 44px minimum
```

---

### Task 3: Polish & UX

**Add skeleton loading:**
```bash
npx shadcn-ui@latest add skeleton
```

**Use it:**
```typescript
{isLoading ? (
  <div className="space-y-4">
    <Skeleton className="h-32 w-full" />
    <Skeleton className="h-32 w-full" />
  </div>
) : (
  <PresentationList />
)}
```

---

## 📞 Need Help?

**If stuck on:**
- Layout selector → Check Figma designs, browse templates on Canva/Pitch
- Mobile issues → Use Chrome DevTools device emulator
- TypeScript errors → Run `pnpm tsc --noEmit` to see all errors
- Database errors → Check Supabase dashboard logs
- UI components → Check shadcn/ui documentation

---

## ✅ Progress Tracking

Mark tasks as you complete them:

**Layout Selector:**
- [ ] Create layout types (layouts.ts)
- [ ] Design layout previews
- [ ] Build LayoutSelector component
- [ ] Integrate with SlideEditor
- [ ] Test layout selection
- [ ] Save to database

**Mobile Responsive:**
- [ ] Fix SlideEditor thumbnails
- [ ] Fix OutlineEditor buttons
- [ ] Fix Viewer touch targets
- [ ] Fix Dashboard grid
- [ ] Test on iPhone SE (375px)
- [ ] Test on standard mobile (390px)
- [ ] Test on tablet (768px)

**Polish:**
- [ ] Add loading skeletons
- [ ] Improve empty states
- [ ] Add ARIA labels
- [ ] Create shortcuts help modal
- [ ] Final polish pass

---

**Current Status:** 98% Complete (Dashboard integrated, all routes working)
**Next Task:** Build Layout Selector Component (5-6 hours)
**Target:** 100% Complete by end of week

**Let's finish the last 2% and ship this! 🚀**
