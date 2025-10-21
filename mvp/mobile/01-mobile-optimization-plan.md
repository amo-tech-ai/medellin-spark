# Mobile Optimization Plan - Medellin Spark

**Date**: October 20, 2025
**Timeline**: 6 weeks (2 phases)
**Priority**: P0 - CRITICAL
**Goal**: 50%+ mobile users complete core tasks without frustration

---

## Executive Summary

**Current State**:
- 60-70% of traffic is mobile
- Mobile bounce rate: 68%
- Mobile conversion: 2.1%
- Core tasks fail on mobile: Dashboard, Pitch Deck, Event Registration

**Target State**:
- Mobile bounce rate: <35%
- Mobile conversion: >5.8%
- Core tasks succeed on mobile: 100% of features functional
- Page load time: <2 seconds

**Investment**: 172 hours (21.5 days) across 2 developers
**Expected ROI**: +176% mobile conversion, +60% addressable market

---

## Table of Contents

1. [Current Mobile Problems](#current-mobile-problems)
2. [Phase 1: Core Functionality (Weeks 1-4)](#phase-1-core-functionality)
3. [Phase 2: Performance & Polish (Weeks 5-6)](#phase-2-performance--polish)
4. [Testing Strategy](#testing-strategy)
5. [Success Metrics](#success-metrics)
6. [Implementation Checklist](#implementation-checklist)

---

## Current Mobile Problems

### Critical Issues (Blocking Core Tasks)

**1. Dashboard - Unusable on Mobile**
```
Problem: Cards crushed, text overlaps, buttons untappable
File: src/pages/Dashboard.tsx
Impact: Users can't access main features

Current Code (Desktop-only):
<div className="grid grid-cols-3 gap-4">
  <MetricCard /> {/* 400px wide, crushed to 320px on mobile */}
</div>

Mobile Issues:
- Cards display side-by-side (3 columns on 375px screen)
- Text overlaps borders
- Tap targets <44px (iOS minimum)
- Horizontal scroll required
```

**2. Pitch Deck Wizard - Chat Cramped**
```
Problem: Chat bubbles too narrow, keyboard covers input
File: src/pages/PitchDeckWizard.tsx
Impact: Users abandon deck creation

Current Issues:
- Message bubbles: 280px (should be full width - 32px padding)
- Input field hidden by keyboard
- Send button too small to tap
- Progress bar invisible on small screens
```

**3. Navigation - Overlaps Content**
```
Problem: Sidebar covers main content on mobile
Files: src/components/dashboard/DashboardSidebar.tsx
Impact: Users can't close sidebar, content inaccessible

Current Issues:
- Desktop sidebar always visible (fixed width)
- No mobile menu (hamburger or bottom nav)
- Menu items too small to tap
- Nested menus don't work on touch
```

**4. Forms - Frustrating on Mobile**
```
Problem: Tiny inputs, no mobile keyboard optimization
Files:
- src/pages/StartupProfile.tsx
- src/pages/Jobs.tsx (application forms)
Impact: Form abandonment 60%+

Current Issues:
- Input fields: 16px height (should be 44px+)
- No input type="email" (no @ keyboard)
- No autocomplete attributes
- Submit button below fold (requires scrolling)
- Progress indicator invisible
```

**5. Event Listings - Cards Too Small**
```
Problem: Event cards unreadable, tap targets overlap
File: src/pages/Events.tsx
Impact: Users can't browse or register

Current Issues:
- 3-column grid on 375px screen (125px per card)
- Text 12px (unreadable on mobile)
- Register buttons 28px height (too small)
- Filters in dropdown (hard to use on touch)
```

### Secondary Issues (Annoying but Not Blocking)

**6. Presentation Viewer - No Touch Controls**
```
File: src/pages/presentations/PresentationViewer.tsx
Issue: Keyboard arrows don't work, need swipe gestures
```

**7. Tables - Horizontal Scroll**
```
Files: Dashboard tables, Job listings
Issue: Tables extend off-screen, hard to read
```

**8. Images - Not Optimized**
```
Issue: Large images (2MB+) slow load times
Impact: 4.2s load time on mobile
```

---

## Phase 1: Core Functionality (Weeks 1-4)

**Goal**: Make all core features work on mobile
**Timeline**: 4 weeks, 2 developers
**Hours**: 136 hours total

---

### Week 1: Dashboard Responsive Layout

**Tasks**:

**Task 1.1: Responsive Grid System** (16 hours)
```typescript
// src/pages/Dashboard.tsx - BEFORE
<div className="grid grid-cols-3 gap-4">
  <MetricCard title="Pitch Decks" value="5" />
  <MetricCard title="Events" value="12" />
  <MetricCard title="Applications" value="8" />
</div>

// AFTER - Mobile Responsive
<div className="
  grid
  grid-cols-1           // 1 column on mobile (default)
  sm:grid-cols-1        // 1 column on small phones (640px)
  md:grid-cols-2        // 2 columns on tablets (768px)
  lg:grid-cols-3        // 3 columns on desktop (1024px)
  gap-4
  px-4                  // Horizontal padding
  md:px-6
">
  <MetricCard title="Pitch Decks" value="5" />
  <MetricCard title="Events" value="12" />
  <MetricCard title="Applications" value="8" />
</div>
```

**Task 1.2: Touch-Optimized Metric Cards** (8 hours)
```typescript
// src/components/dashboard/MetricCard.tsx
export function MetricCard({ title, value, icon, href }: Props) {
  return (
    <Link
      to={href}
      className="
        block                    // Full card is clickable
        p-6                      // Larger padding
        bg-white
        rounded-lg
        border
        hover:shadow-lg
        active:scale-98          // Visual feedback on tap
        transition-all
        min-h-[120px]           // Minimum tap target
        md:min-h-[140px]        // Larger on desktop
      "
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm md:text-base text-gray-600">
          {title}
        </span>
        {icon}
      </div>
      <div className="
        text-2xl                 // Larger on mobile
        md:text-3xl              // Even larger on desktop
        font-bold
      ">
        {value}
      </div>
    </Link>
  );
}
```

**Task 1.3: Mobile Dashboard Header** (4 hours)
```typescript
// src/components/dashboard/DashboardHeader.tsx
export function DashboardHeader() {
  return (
    <header className="
      sticky top-0              // Sticky header
      z-40
      bg-white
      border-b
      px-4 py-3
      md:px-6 md:py-4
    ">
      <div className="flex items-center justify-between">
        {/* Mobile: Hamburger + Logo */}
        <div className="flex items-center gap-3 md:hidden">
          <MobileMenuButton />
          <Logo size="sm" />
        </div>

        {/* Desktop: Full header */}
        <div className="hidden md:flex items-center gap-4">
          <Logo />
          <h1 className="text-xl font-semibold">Dashboard</h1>
        </div>

        {/* User menu (both mobile & desktop) */}
        <UserMenu />
      </div>
    </header>
  );
}
```

**Week 1 Deliverables**:
- ✅ Dashboard displays 1 column on mobile, 3 on desktop
- ✅ All cards tappable (min 44px height)
- ✅ Responsive padding and spacing
- ✅ Sticky header with mobile menu button

---

### Week 2: Mobile Navigation

**Tasks**:

**Task 2.1: Bottom Navigation Bar** (12 hours)
```typescript
// src/components/MobileNav.tsx - NEW FILE
import { Home, Calendar, Briefcase, PresentationIcon } from 'lucide-react';
import { NavLink } from 'react-router-dom';

export function MobileNav() {
  return (
    <nav className="
      fixed bottom-0 left-0 right-0
      bg-white
      border-t
      flex justify-around
      h-16
      z-50
      md:hidden              // Hide on desktop (show sidebar instead)
      safe-area-inset-bottom // iOS notch support
    ">
      <MobileNavButton
        icon={Home}
        label="Home"
        to="/dashboard"
      />
      <MobileNavButton
        icon={Calendar}
        label="Events"
        to="/dashboard/events"
      />
      <MobileNavButton
        icon={PresentationIcon}
        label="Decks"
        to="/dashboard/pitch-decks"
      />
      <MobileNavButton
        icon={Briefcase}
        label="Jobs"
        to="/jobs"
      />
    </nav>
  );
}

function MobileNavButton({ icon: Icon, label, to }: Props) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => `
        flex flex-col items-center justify-center
        flex-1
        py-2
        text-xs
        transition-colors
        ${isActive ? 'text-primary' : 'text-gray-600'}
        active:bg-gray-100     // Tap feedback
      `}
    >
      <Icon className="w-6 h-6 mb-1" />
      <span>{label}</span>
    </NavLink>
  );
}
```

**Task 2.2: Responsive Sidebar** (8 hours)
```typescript
// src/components/dashboard/DashboardSidebar.tsx - UPDATE
export function DashboardSidebar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { open } = useSidebar();

  return (
    <>
      {/* Desktop Sidebar - Always visible */}
      <Sidebar className={`
        hidden md:block           // Hide on mobile
        ${open ? 'w-60' : 'w-14'}
      `}>
        {/* Existing sidebar content */}
      </Sidebar>

      {/* Mobile Drawer - Overlay */}
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent side="left" className="w-64 p-0">
          <div className="flex flex-col h-full">
            {/* Logo */}
            <div className="p-4 border-b">
              <Logo />
            </div>

            {/* Navigation */}
            <SidebarContent className="flex-1 overflow-y-auto">
              {/* Same content as desktop sidebar */}
            </SidebarContent>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
```

**Task 2.3: Hamburger Menu Button** (4 hours)
```typescript
// src/components/MobileMenuButton.tsx - NEW FILE
export function MobileMenuButton() {
  const [open, setOpen] = useState(false);

  return (
    <button
      onClick={() => setOpen(!open)}
      className="
        p-2
        rounded-lg
        hover:bg-gray-100
        active:bg-gray-200
        md:hidden
      "
      aria-label="Open menu"
    >
      <Menu className="w-6 h-6" />
    </button>
  );
}
```

**Week 2 Deliverables**:
- ✅ Bottom navigation bar on mobile (4 key routes)
- ✅ Sidebar becomes drawer on mobile
- ✅ Hamburger menu button in header
- ✅ All nav items have min 44px tap targets

---

### Week 3: Pitch Deck Wizard Mobile

**Tasks**:

**Task 3.1: Responsive Chat Interface** (16 hours)
```typescript
// src/pages/PitchDeckWizard.tsx - UPDATE
export default function PitchDeckWizard() {
  return (
    <div className="
      flex flex-col
      h-screen                  // Full viewport height
      max-h-screen              // Prevent overflow
    ">
      {/* Header */}
      <header className="
        sticky top-0 z-10
        bg-white border-b
        px-4 py-3
        md:px-6 md:py-4
      ">
        <h1 className="text-lg md:text-xl font-semibold">
          Create Pitch Deck
        </h1>
        {/* Progress bar */}
        <div className="mt-2">
          <ProgressBar value={progress} />
        </div>
      </header>

      {/* Chat Messages - Scrollable */}
      <div className="
        flex-1
        overflow-y-auto
        px-4 py-4
        md:px-6 md:py-6
        pb-20                   // Space for input field
      ">
        {messages.map((msg) => (
          <ChatMessage
            key={msg.id}
            message={msg}
            className="
              max-w-full           // Full width on mobile
              md:max-w-2xl         // Constrained on desktop
            "
          />
        ))}
      </div>

      {/* Input - Sticky Bottom */}
      <div className="
        sticky bottom-0
        bg-white
        border-t
        p-4
        md:p-6
        safe-area-inset-bottom  // iOS keyboard safe area
      ">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Describe your startup..."
            className="
              flex-1
              h-12                // 48px - iOS minimum
              md:h-14             // Larger on desktop
              px-4
              text-base           // 16px - prevents iOS zoom
              rounded-lg
              border
            "
          />
          <button
            type="submit"
            className="
              h-12 w-12          // Square button
              md:h-14 md:w-14
              rounded-lg
              bg-primary
              text-white
              flex items-center justify-center
              active:scale-95    // Tap feedback
            "
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
}
```

**Task 3.2: Touch-Optimized Progress Bar** (4 hours)
```typescript
// src/components/ProgressBar.tsx - UPDATE
export function ProgressBar({ value }: { value: number }) {
  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-2">
        <span className="
          text-xs md:text-sm
          text-gray-600
        ">
          Progress: {value}%
        </span>
        {value >= 80 && (
          <span className="
            text-xs md:text-sm
            text-green-600
            font-medium
          ">
            Ready to generate!
          </span>
        )}
      </div>
      <div className="
        h-2 md:h-3              // Thicker on desktop
        bg-gray-200
        rounded-full
        overflow-hidden
      ">
        <div
          className="h-full bg-primary transition-all duration-300"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}
```

**Week 3 Deliverables**:
- ✅ Chat messages full width on mobile
- ✅ Sticky input field (always visible)
- ✅ Large send button (48px)
- ✅ iOS keyboard safe area support

---

### Week 4: Forms & Event Pages

**Task 4.1: Mobile-Optimized Forms** (12 hours)
```typescript
// src/components/forms/FormField.tsx - NEW COMPONENT
export function FormField({
  label,
  type = 'text',
  error,
  ...props
}: FormFieldProps) {
  return (
    <div className="mb-4">
      <label className="
        block
        text-sm md:text-base
        font-medium
        mb-2
      ">
        {label}
      </label>
      <input
        type={type}
        className={`
          w-full
          h-12                    // 48px minimum (iOS)
          md:h-14                 // Larger on desktop
          px-4
          text-base               // 16px - prevents iOS zoom
          rounded-lg
          border
          ${error ? 'border-red-500' : 'border-gray-300'}
          focus:ring-2
          focus:ring-primary
          focus:border-transparent
        `}
        {...props}
      />
      {error && (
        <p className="text-sm text-red-500 mt-1">
          {error}
        </p>
      )}
    </div>
  );
}

// Usage with proper mobile attributes
<FormField
  label="Email"
  type="email"              // Mobile email keyboard
  autoComplete="email"      // Browser autofill
  inputMode="email"         // Numeric keyboard hint
/>

<FormField
  label="Phone"
  type="tel"                // Mobile phone keyboard
  autoComplete="tel"
  inputMode="tel"
/>
```

**Task 4.2: Responsive Event Cards** (12 hours)
```typescript
// src/pages/Events.tsx - UPDATE
export default function Events() {
  return (
    <div className="container mx-auto px-4 py-6 md:px-6 md:py-8">
      {/* Header */}
      <h1 className="
        text-2xl md:text-3xl
        font-bold
        mb-6
      ">
        Events
      </h1>

      {/* Filters */}
      <div className="
        flex flex-col gap-3      // Stack vertically on mobile
        md:flex-row md:gap-4    // Horizontal on desktop
        mb-6
      ">
        <select className="
          h-12 md:h-10
          px-4
          rounded-lg
          border
        ">
          <option>All Categories</option>
          <option>AI & ML</option>
          <option>Startup Events</option>
        </select>
      </div>

      {/* Event Grid */}
      <div className="
        grid
        grid-cols-1              // 1 column mobile
        md:grid-cols-2           // 2 columns tablet
        lg:grid-cols-3           // 3 columns desktop
        gap-4
        md:gap-6
      ">
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
}

// src/components/EventCard.tsx - UPDATE
export function EventCard({ event }: { event: Event }) {
  return (
    <Link
      to={`/events/${event.id}`}
      className="
        block
        bg-white
        rounded-lg
        border
        overflow-hidden
        hover:shadow-lg
        active:scale-98         // Mobile tap feedback
        transition-all
      "
    >
      {/* Image */}
      <div className="aspect-video bg-gray-200">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover"
          loading="lazy"        // Lazy load images
        />
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="
          text-lg md:text-xl
          font-semibold
          mb-2
          line-clamp-2          // Max 2 lines
        ">
          {event.title}
        </h3>

        <p className="
          text-sm md:text-base
          text-gray-600
          mb-4
          line-clamp-3          // Max 3 lines
        ">
          {event.description}
        </p>

        {/* Register Button */}
        <button className="
          w-full                 // Full width on mobile
          h-12
          bg-primary
          text-white
          rounded-lg
          font-medium
          active:bg-primary-dark
        ">
          Register Now
        </button>
      </div>
    </Link>
  );
}
```

**Week 4 Deliverables**:
- ✅ All forms have 48px inputs
- ✅ Proper mobile input types (email, tel, etc.)
- ✅ Event cards display 1 column on mobile
- ✅ Full-width register buttons

---

## Phase 2: Performance & Polish (Weeks 5-6)

**Goal**: Fast load times, smooth interactions
**Timeline**: 2 weeks
**Hours**: 36 hours

---

### Week 5: Image & Code Optimization

**Task 5.1: Image Optimization** (12 hours)

**Install Dependencies**:
```bash
pnpm add sharp
pnpm add -D vite-plugin-imagemin
```

**Configure Vite**:
```typescript
// vite.config.ts
import imagemin from 'vite-plugin-imagemin';

export default defineConfig({
  plugins: [
    react(),
    imagemin({
      gifsicle: { optimizationLevel: 7 },
      optipng: { optimizationLevel: 7 },
      mozjpeg: { quality: 80 },
      webp: { quality: 80 }
    })
  ]
});
```

**Responsive Images**:
```typescript
// src/components/ResponsiveImage.tsx - NEW
export function ResponsiveImage({
  src,
  alt,
  sizes = '(max-width: 768px) 100vw, 50vw'
}: Props) {
  return (
    <img
      src={src}
      alt={alt}
      sizes={sizes}
      srcSet={`
        ${src}?w=320 320w,
        ${src}?w=640 640w,
        ${src}?w=1024 1024w
      `}
      loading="lazy"
      decoding="async"
    />
  );
}
```

**Task 5.2: Code Splitting** (16 hours)

**Route-Based Splitting**:
```typescript
// src/App.tsx - UPDATE
import { lazy, Suspense } from 'react';

// Lazy load pages
const Dashboard = lazy(() => import('./pages/Dashboard'));
const PitchDeckWizard = lazy(() => import('./pages/PitchDeckWizard'));
const Events = lazy(() => import('./pages/Events'));
const Jobs = lazy(() => import('./pages/Jobs'));

// Loading component
function PageLoader() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/pitch-deck-wizard" element={<PitchDeckWizard />} />
          <Route path="/events" element={<Events />} />
          <Route path="/jobs" element={<Jobs />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
```

**Component-Level Splitting**:
```typescript
// Split heavy components
const RichTextEditor = lazy(() => import('./components/RichTextEditor'));
const ChartComponent = lazy(() => import('./components/Chart'));

// Use with Suspense
<Suspense fallback={<LoadingSpinner />}>
  <RichTextEditor />
</Suspense>
```

**Week 5 Deliverables**:
- ✅ Images optimized (WebP format)
- ✅ Lazy loading for images
- ✅ Route-based code splitting
- ✅ Bundle size reduced by 50%+

---

### Week 6: Touch Interactions & Testing

**Task 6.1: Swipe Gestures** (8 hours)

**Install Dependencies**:
```bash
pnpm add react-swipeable
```

**Implement Swipes**:
```typescript
// src/pages/presentations/PresentationViewer.tsx - UPDATE
import { useSwipeable } from 'react-swipeable';

export default function PresentationViewer() {
  const [slideIndex, setSlideIndex] = useState(0);

  // Swipe handlers
  const handlers = useSwipeable({
    onSwipedLeft: () => {
      if (slideIndex < slides.length - 1) {
        setSlideIndex(slideIndex + 1);
      }
    },
    onSwipedRight: () => {
      if (slideIndex > 0) {
        setSlideIndex(slideIndex - 1);
      }
    },
    preventDefaultTouchmoveEvent: true,
    trackMouse: false // Only touch, not mouse
  });

  return (
    <div {...handlers} className="h-screen overflow-hidden">
      <Slide data={slides[slideIndex]} />

      {/* Touch indicators */}
      <div className="
        fixed bottom-4 left-1/2 -translate-x-1/2
        text-sm text-gray-500
        md:hidden              // Only show on mobile
      ">
        ← Swipe to navigate →
      </div>
    </div>
  );
}
```

**Task 6.2: Mobile Testing** (8 hours)

**Create Testing Checklist**:
```markdown
## Mobile Testing Checklist

### Devices
- [ ] iPhone SE (375×667) - Small screen
- [ ] iPhone 14 (390×844) - Standard
- [ ] iPhone 14 Pro Max (430×932) - Large
- [ ] Samsung Galaxy S23 (360×800) - Android
- [ ] iPad Mini (768×1024) - Tablet

### Core Flows
Dashboard:
- [ ] Dashboard loads in <2 seconds
- [ ] All metric cards tappable
- [ ] Bottom nav works
- [ ] No horizontal scroll

Pitch Deck Wizard:
- [ ] Chat interface full width
- [ ] Input field always visible (keyboard doesn't hide it)
- [ ] Send button 48px minimum
- [ ] Messages readable (font size 16px+)

Events:
- [ ] Event cards display 1 column
- [ ] Images load (lazy loading works)
- [ ] Register button full width
- [ ] Detail page scrolls smoothly

Forms:
- [ ] All inputs 48px height
- [ ] Email keyboard appears for email fields
- [ ] Phone keyboard appears for phone fields
- [ ] No iOS zoom (font-size 16px+)
- [ ] Progress indicators visible

### Performance
- [ ] First Contentful Paint < 1.5s
- [ ] Largest Contentful Paint < 2.5s
- [ ] Time to Interactive < 3.5s
- [ ] No layout shifts (CLS < 0.1)

### Touch
- [ ] All buttons min 44×44px
- [ ] Active states on tap
- [ ] No double-tap zoom
- [ ] Swipe gestures work (presentation viewer)
```

**Run Lighthouse Mobile Audit**:
```bash
# Install Lighthouse CLI
pnpm add -D lighthouse

# Run mobile audit
npx lighthouse http://localhost:8080 \
  --preset=mobile \
  --output=html \
  --output-path=./mobile-audit.html

# Target scores:
# Performance: >90
# Accessibility: >95
# Best Practices: >90
# SEO: >90
```

**Week 6 Deliverables**:
- ✅ Swipe gestures in presentation viewer
- ✅ All devices tested (6 devices)
- ✅ Lighthouse mobile score >90
- ✅ Zero critical bugs

---

## Testing Strategy

### Manual Testing

**Daily Testing** (During Development):
1. Test every change on iPhone Safari (real device)
2. Test on Chrome DevTools mobile simulator
3. Verify tap targets (min 44px)
4. Check text readability (min 16px)

**Weekly Testing** (End of Each Week):
1. Test on 3 real devices (iPhone, Android, iPad)
2. Complete core user flows
3. Check performance (Lighthouse)
4. Verify no regressions

### Automated Testing

**Playwright Mobile Tests**:
```typescript
// e2e/mobile.spec.ts
import { test, expect, devices } from '@playwright/test';

test.describe('Mobile Dashboard', () => {
  test.use(devices['iPhone 14']);

  test('should display metric cards in 1 column', async ({ page }) => {
    await page.goto('http://localhost:8080/dashboard');

    // Wait for cards to load
    await page.waitForSelector('[data-testid="metric-card"]');

    // Get card positions
    const cards = await page.$$('[data-testid="metric-card"]');
    const positions = await Promise.all(
      cards.map(card => card.boundingBox())
    );

    // Verify stacked vertically (not side-by-side)
    expect(positions[0].y).toBeLessThan(positions[1].y);
    expect(positions[1].y).toBeLessThan(positions[2].y);
  });

  test('bottom navigation should be visible', async ({ page }) => {
    await page.goto('http://localhost:8080/dashboard');

    const bottomNav = page.locator('[data-testid="mobile-nav"]');
    await expect(bottomNav).toBeVisible();

    // Verify 4 nav items
    const navItems = bottomNav.locator('a');
    await expect(navItems).toHaveCount(4);
  });

  test('tap targets should be >44px', async ({ page }) => {
    await page.goto('http://localhost:8080/dashboard');

    const buttons = await page.$$('button, a');
    for (const button of buttons) {
      const box = await button.boundingBox();
      expect(box.height).toBeGreaterThanOrEqual(44);
    }
  });
});
```

**Run Tests**:
```bash
# Run mobile tests
pnpm exec playwright test --project="Mobile Safari"

# Run on multiple devices
pnpm exec playwright test --project="iPhone 14" --project="Galaxy S23"
```

---

## Success Metrics

### Performance Targets

| Metric | Current | Target | Measurement |
|--------|---------|--------|-------------|
| **Mobile Bounce Rate** | 68% | <35% | Google Analytics |
| **Mobile Conversion** | 2.1% | >5.8% | Conversion tracking |
| **Page Load Time** | 4.2s | <2s | Lighthouse |
| **First Contentful Paint** | 2.8s | <1.5s | Lighthouse |
| **Time to Interactive** | 5.1s | <3.5s | Lighthouse |
| **Mobile Task Completion** | 28% | >50% | User testing |

### User Experience Metrics

| Metric | Target | How to Measure |
|--------|--------|----------------|
| **Tap Target Size** | 100% >44px | Manual audit |
| **Font Size** | 100% ≥16px | Manual audit |
| **Form Completion** | >60% | Analytics |
| **No Horizontal Scroll** | 100% pages | Visual QA |
| **Mobile NPS** | >50 | User survey |

### Technical Metrics

| Metric | Current | Target |
|--------|---------|--------|
| **Bundle Size** | 2.1 MB | <800 KB |
| **Image Sizes** | 1.2 MB avg | <300 KB avg |
| **Lighthouse Score** | 54 | >90 |
| **API Response Time** | 1.2s | <500ms |

---

## Implementation Checklist

### Pre-Development

- [ ] Review current mobile analytics (bounce rate, devices)
- [ ] Set up mobile testing devices (borrow 3 phones)
- [ ] Install Lighthouse CLI
- [ ] Install Playwright for mobile testing
- [ ] Create mobile testing spreadsheet

### Phase 1: Core Functionality (Weeks 1-4)

**Week 1: Dashboard**
- [ ] Update Dashboard grid (1/2/3 columns)
- [ ] Enlarge metric cards (min 120px height)
- [ ] Add touch feedback (active states)
- [ ] Make header sticky
- [ ] Test on 3 devices

**Week 2: Navigation**
- [ ] Create MobileNav component (bottom nav)
- [ ] Update DashboardSidebar (drawer on mobile)
- [ ] Add hamburger menu button
- [ ] Test navigation flows
- [ ] Verify tap targets >44px

**Week 3: Pitch Deck Wizard**
- [ ] Make chat messages full width
- [ ] Sticky input field (safe-area-inset-bottom)
- [ ] Enlarge send button (48px)
- [ ] Update progress bar (visible on mobile)
- [ ] Test keyboard behavior (iOS + Android)

**Week 4: Forms & Events**
- [ ] Create FormField component (48px inputs)
- [ ] Add proper input types (email, tel)
- [ ] Update event cards (1 column mobile)
- [ ] Full-width register buttons
- [ ] Test form completion flow

### Phase 2: Performance & Polish (Weeks 5-6)

**Week 5: Optimization**
- [ ] Install imagemin plugin
- [ ] Convert images to WebP
- [ ] Add lazy loading
- [ ] Implement code splitting (route-based)
- [ ] Split heavy components (lazy imports)
- [ ] Run Lighthouse audit (target >80)

**Week 6: Touch & Testing**
- [ ] Add swipe gestures (presentation viewer)
- [ ] Test on 6 devices (checklist)
- [ ] Run automated tests (Playwright)
- [ ] Fix all critical bugs
- [ ] Final Lighthouse audit (target >90)

### Post-Development

- [ ] Deploy to staging
- [ ] User acceptance testing (5 users on mobile)
- [ ] Monitor mobile analytics (1 week)
- [ ] Fix any production issues
- [ ] Document mobile best practices

---

## Common Issues & Solutions

### Issue 1: iOS Keyboard Hides Input Field

**Problem**: When user taps input, keyboard covers it.

**Solution**: Use `safe-area-inset-bottom` and sticky positioning.
```css
.input-container {
  position: sticky;
  bottom: 0;
  padding-bottom: env(safe-area-inset-bottom);
}
```

### Issue 2: iOS Zoom on Input Focus

**Problem**: iOS Safari zooms in when input font-size < 16px.

**Solution**: Always use font-size ≥16px on inputs.
```css
input {
  font-size: 16px; /* Prevents iOS zoom */
}
```

### Issue 3: Android Back Button Breaks Navigation

**Problem**: Android back button doesn't work with React Router.

**Solution**: Use `react-router-dom` v6+ (handles back button automatically).

### Issue 4: Images Load Slowly

**Problem**: Large images (2MB+) slow page load.

**Solutions**:
1. Convert to WebP (70% smaller)
2. Use lazy loading (`loading="lazy"`)
3. Serve responsive images (`srcset`)
4. Use CDN (Cloudinary, Imgix)

### Issue 5: Tap Targets Too Small

**Problem**: Buttons <44px are hard to tap.

**Solution**: Minimum 44×44px for all interactive elements.
```css
button, a {
  min-height: 44px;
  min-width: 44px;
}
```

---

## Resources

### Documentation
- [Tailwind Responsive Design](https://tailwindcss.com/docs/responsive-design)
- [iOS Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/ios)
- [Material Design Touch Targets](https://material.io/design/usability/accessibility.html#layout-typography)

### Tools
- [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci)
- [Playwright Mobile Testing](https://playwright.dev/docs/emulation)
- [React Swipeable](https://github.com/FormidableLabs/react-swipeable)

### Testing Devices (Recommended)
- **Budget**: Use BrowserStack ($39/month) for device testing
- **Free**: Chrome DevTools Device Toolbar
- **Best**: Buy 2-3 used phones (iPhone SE, Galaxy S9)

---

## Next Steps

**Week 1 Start**:
1. Clone production branch: `git checkout -b mobile-optimization`
2. Set up testing devices (real phones or BrowserStack)
3. Begin Dashboard responsive work (Task 1.1)
4. Daily testing on iPhone Safari

**Weekly Review**:
- Friday 4pm: Demo mobile progress to team
- Show before/after screenshots
- Test on 3 real devices
- Document any blockers

**Launch Criteria**:
- [ ] All Phase 1 tasks complete (core functionality)
- [ ] Lighthouse mobile score >85
- [ ] No critical bugs on top 3 devices
- [ ] 5 users complete core tasks successfully on mobile

---

**Created**: October 20, 2025
**Owner**: Development Team
**Status**: Ready for implementation
**Est. Completion**: December 1, 2025 (6 weeks from start)

**Questions?** Review this plan with the team, then start Week 1 tasks! 🚀
