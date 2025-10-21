# Mobile Optimization - Simple Roadmap

**Timeline**: 6 weeks
**Focus**: Make it work on mobile, nothing fancy

---

## Week 1: Dashboard (28 hours)

**Goal**: Dashboard displays 1 column on mobile, 3 on desktop

**Tasks**:
1. Make grid responsive (`grid-cols-1 md:grid-cols-2 lg:grid-cols-3`)
2. Enlarge cards to 120px min height
3. Add sticky header

**File**: `src/pages/Dashboard.tsx`

---

## Week 2: Navigation (24 hours)

**Goal**: Bottom nav on mobile, sidebar on desktop

**Tasks**:
1. Create bottom nav (4 buttons)
2. Make sidebar a drawer on mobile
3. Add hamburger menu

**Files**: `src/components/MobileNav.tsx`, `src/components/DashboardSidebar.tsx`

---

## Week 3: Wizard (20 hours)

**Goal**: Chat works on mobile without keyboard issues

**Tasks**:
1. Full-width chat messages
2. Sticky input at bottom
3. 48px send button

**File**: `src/pages/PitchDeckWizard.tsx`

---

## Week 4: Forms (24 hours)

**Goal**: Forms work on mobile

**Tasks**:
1. All inputs 48px height
2. Use proper input types (email, tel)
3. Event cards 1 column on mobile

**Files**: Forms, Events pages

---

## Week 5: Performance (28 hours)

**Goal**: Load in <2 seconds

**Tasks**:
1. Lazy load images
2. Code split routes
3. Use WebP images

**File**: `vite.config.ts`, `src/App.tsx`

---

## Week 6: Test & Ship (8 hours)

**Goal**: Works on iPhone and Android

**Tasks**:
1. Test on Chrome DevTools mobile
2. Fix any obvious bugs
3. Deploy

---

## That's It

No analytics. No feature flags. No A/B testing.

**Just make it work on mobile.**

You can add fancy stuff later.
