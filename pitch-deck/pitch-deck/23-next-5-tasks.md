# 🎯 Next 5 Tasks - Priority Order

**Date:** 2025-10-15
**Project:** Main Pitch Deck System
**Current Progress:** 98% Complete
**Target:** 100% MVP Ready

---

## Task 1: Build Layout Selector Component with 12 Templates

**Time:** 5-6 hours | **Priority:** 🔴 Critical | **Difficulty:** Medium

**What:** Create modal showing 12 slide layout options (Title Slide, Two Columns, Image + Text, etc.)

**Why:** Users need different layouts for different slide purposes

**Success:** Click "Layout" button → Modal opens → Select layout → Slide updates → Saves to database

**Steps:**
1. Create `LayoutSelector.tsx` in `src/components/presentations/`
2. Design 12 layout templates with preview thumbnails
3. Build 3x4 grid modal
4. Connect to SlideEditor "Layout" button
5. Save selection to database

**Files:**
- Create: `src/components/presentations/LayoutSelector.tsx`, `src/types/layouts.ts`
- Modify: `SlideEditor.tsx`, `PresentationViewer.tsx`

---

## Task 2: Fix Mobile Responsive Issues for All Pages

**Time:** 3-4 hours | **Priority:** 🔴 Critical | **Difficulty:** Easy-Medium

**What:** Make all pages work perfectly on phones (buttons too small, panels too wide, elements overlap)

**Why:** 60% of users browse on mobile devices

**Success:** Works on iPhone SE (375px), all buttons 44x44px minimum, no scrolling, text readable

**Fixes:**
- SlideEditor: Hide thumbnails on mobile, add drawer
- OutlineEditor: Stack buttons vertically
- Viewer: Larger touch targets
- Dashboard: Cards stack 1 column on mobile

**Files:**
- Modify: `SlideEditor.tsx`, `OutlineEditor.tsx`, `PresentationViewer.tsx`, `DashboardPitchDecks.tsx`

**Test:** iPhone SE (375px), iPhone (390px), Android (360px), iPad (768px)

---

## Task 3: Add Loading Skeletons and Better Empty States

**Time:** 2 hours | **Priority:** 🟡 Important | **Difficulty:** Easy

**What:** Replace spinners with skeleton screens (gray boxes showing content shape), improve empty states

**Why:** Makes app feel faster and more polished

**Success:** Loading shows gray boxes instead of spinners, empty states have illustrations + clear CTAs

**Add Skeletons:**
- Dashboard: Skeleton cards while loading
- Viewer: Skeleton slide
- Outline Editor: Skeleton slide list
- Slide Editor: Skeleton editor

**Improve Empty States:**
- Dashboard: Illustration + "Create Presentation" button
- Outline: "Add your first slide" CTA
- Search: "No matches" message

**Files:**
- Modify: `DashboardPitchDecks.tsx`, `PresentationViewer.tsx`, `OutlineEditor.tsx`, `SlideEditor.tsx`
- Install: `npx shadcn-ui@latest add skeleton`

---

## Task 4: Add Accessibility Features and ARIA Labels

**Time:** 1-2 hours | **Priority:** 🟡 Important | **Difficulty:** Easy

**What:** Add ARIA labels, keyboard navigation, focus indicators, alt text

**Why:** Required for professional app, makes it accessible to everyone

**Success:** Full keyboard navigation, screen reader support, visible focus indicators

**Add:**
- ARIA labels on all buttons: `aria-label="Previous slide"`
- Keyboard shortcuts: Arrow keys, Escape, Enter, Tab
- Focus indicators: `outline: 2px solid blue`
- Alt text on images: `alt="Slide 1: Title"`

**Files:**
- Modify: `PresentationViewer.tsx`, `SlideEditor.tsx`, `OutlineEditor.tsx`, `DashboardPitchDecks.tsx`

---

## Task 5: Create Keyboard Shortcuts Help Modal

**Time:** 1-2 hours | **Priority:** 🟢 Nice to Have | **Difficulty:** Easy

**What:** Modal showing keyboard shortcuts when user presses "?"

**Why:** Power users love shortcuts but need to discover them

**Success:** Press "?" → Modal opens → Shows shortcuts by context → Press Escape to close

**Shortcuts:**
- Viewer: `→` next, `←` previous, `Esc` exit
- Editor: `Cmd+→` next, `Cmd+←` previous
- Outline: `↑↓` move, `Del` delete, `Enter` add

**Files:**
- Create: `src/components/KeyboardShortcutsHelp.tsx`
- Modify: `PresentationViewer.tsx`, `SlideEditor.tsx`, `OutlineEditor.tsx`

---

## 📊 Quick Summary

| # | Task | Time | Priority | What |
|---|------|------|----------|------|
| 1 | Layout Selector | 5-6h | 🔴 Critical | Modal with 12 slide layouts |
| 2 | Mobile Responsive | 3-4h | 🔴 Critical | Fix all pages for phones |
| 3 | Skeletons & Empty States | 2h | 🟡 Important | Better loading UX |
| 4 | Accessibility | 1-2h | 🟡 Important | ARIA labels, keyboard nav |
| 5 | Shortcuts Help | 1-2h | 🟢 Nice to Have | "?" key shows shortcuts |

**Total:** 12-16 hours | **Critical:** Tasks 1-2 (8-10 hours)

---

## 🚀 Quick Start

**Start Task 1 now:**
```bash
touch src/components/presentations/LayoutSelector.tsx
touch src/types/layouts.ts
code src/components/presentations/LayoutSelector.tsx
```

**Next:** Follow Task 1 steps above

**Goal:** 100% complete by end of week 🎯

---

## 📋 Next Steps to Completion (Sequential Order)

### Step 1: Task 1 - Layout Selector (Start Now)
1. Create type definitions: `touch src/types/layouts.ts`
2. Define 12 layout types: Title, TwoColumns, ImageLeft, ImageRight, BulletList, etc.
3. Create component: `touch src/components/presentations/LayoutSelector.tsx`
4. Build modal with 3x4 grid of layout cards
5. Add preview thumbnails for each layout
6. Connect "Layout" button in SlideEditor (line ~150)
7. Add `onLayoutSelect` handler
8. Save layout to database via `updateSlide` mutation
9. Test: Click Layout → Select → Slide updates

### Step 2: Task 2 - Mobile Responsive (After Task 1)
1. Add mobile breakpoints: `@media (max-width: 768px)`
2. SlideEditor: Hide left panel, add bottom drawer
3. OutlineEditor: Stack action buttons vertically
4. PresentationViewer: Increase button sizes to 44px
5. DashboardPitchDecks: Change grid to 1 column
6. Test on Chrome DevTools: 375px, 390px, 768px
7. Test touch interactions

### Step 3: Task 3 - Loading States (After Task 2)
1. Install skeleton: `npx shadcn-ui@latest add skeleton`
2. Replace Dashboard spinner with `<Skeleton>` cards (8 cards)
3. Replace Viewer spinner with slide skeleton
4. Replace Outline spinner with list skeleton
5. Replace SlideEditor spinner with editor skeleton
6. Add empty state illustrations
7. Test loading states

### Step 4: Task 4 - Accessibility (After Task 3)
1. Add ARIA labels to all buttons in Viewer
2. Add ARIA labels to SlideEditor controls
3. Add ARIA labels to Outline actions
4. Add keyboard navigation handlers
5. Add focus indicators (CSS)
6. Add alt text to all images
7. Test with screen reader

### Step 5: Task 5 - Shortcuts Modal (After Task 4)
1. Create `src/components/KeyboardShortcutsHelp.tsx`
2. Build modal with shortcut list
3. Add "?" key listener
4. Add escape to close
5. Display shortcuts by page context
6. Add help icon to header
7. Test shortcuts

---

## ⚡ Immediate Action (Next 30 Minutes)

```bash
# Create files
touch src/types/layouts.ts
touch src/components/presentations/LayoutSelector.tsx

# Start editing
code src/types/layouts.ts
```

**Then:** Define layout types → Build modal component → Connect to SlideEditor

**Progress:** 98% → 100% (estimated 12-16 hours)
