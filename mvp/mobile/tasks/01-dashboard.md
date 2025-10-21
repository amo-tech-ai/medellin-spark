# Week 1: Dashboard Mobile

**Goal**: Dashboard works perfectly on mobile devices
**Time**: 1 week (3 days fundamentals + 2 days advanced)

---

## Fundamentals

### Task 1: Responsive Grid System

**What**: Change dashboard grid from fixed 3 columns to responsive 1→2→3 columns

**File**: `src/pages/Dashboard.tsx`

**Steps**:
1. Find the metrics grid container
2. Replace `grid-cols-3` with responsive classes
3. Add proper spacing for mobile

**Find this**:
```typescript
<div className="grid grid-cols-3 gap-4">
```

**Replace with**:
```typescript
<div className="
  grid
  grid-cols-1           // Mobile: 1 column
  md:grid-cols-2        // Tablet: 2 columns
  lg:grid-cols-3        // Desktop: 3 columns
  gap-4
  px-4 md:px-6
">
```

**Success Criteria**:
- ✅ Mobile (< 768px): Shows 1 column
- ✅ Tablet (768-1024px): Shows 2 columns
- ✅ Desktop (> 1024px): Shows 3 columns
- ✅ Cards stack vertically on mobile without horizontal scroll
- ✅ Spacing looks balanced on all screen sizes

**Test**:
```bash
# Open Chrome DevTools → Toggle device toolbar → iPhone 12
# Expected: Cards display in 1 column
```

---

### Task 2: Touch-Optimized Cards

**What**: Enlarge cards to meet iOS minimum touch target (44×44px)

**File**: `src/components/dashboard/MetricCard.tsx`

**Steps**:
1. Update card component className
2. Add minimum height
3. Add active state for touch feedback

**Update className**:
```typescript
<Link
  to={href}
  className="
    block
    p-6
    bg-white
    rounded-lg
    border border-gray-200
    hover:shadow-lg
    active:scale-[0.98]      // Touch feedback
    transition-all
    min-h-[120px]            // iOS minimum
    md:min-h-[140px]
  "
>
```

**Success Criteria**:
- ✅ Cards are minimum 120px tall on mobile
- ✅ Cards are minimum 140px tall on tablet/desktop
- ✅ Cards show visual feedback when tapped (scale effect)
- ✅ Text is readable without zooming
- ✅ No layout shift when tapping

**Test**:
```bash
# Inspect element → Check computed height ≥ 120px
# Tap card → Should see subtle scale animation
```

---

### Task 3: Sticky Header

**What**: Keep dashboard header visible when scrolling

**File**: `src/components/dashboard/DashboardHeader.tsx`

**Steps**:
1. Add sticky positioning
2. Set proper z-index
3. Add background to prevent transparency

**Add className**:
```typescript
<header className="
  sticky top-0
  z-40
  bg-white
  border-b border-gray-200
  px-4 py-3
  md:px-6 md:py-4
">
```

**Success Criteria**:
- ✅ Header stays at top when scrolling down
- ✅ Header doesn't cover navigation elements
- ✅ Background is opaque (not transparent)
- ✅ Border appears at bottom of header
- ✅ Works on all screen sizes

**Test**:
```bash
# Scroll down page → Header should stay fixed at top
# Check z-index doesn't conflict with modals/dropdowns
```

---

## Fundamentals Summary

**What you built**:
- ✅ Responsive grid (1→2→3 columns)
- ✅ Touch-optimized cards (120px+ height)
- ✅ Sticky header that stays visible

**Success Check**:
- [ ] Dashboard loads correctly on mobile (< 768px width)
- [ ] Cards are easy to tap (no mis-taps)
- [ ] Scrolling feels natural
- [ ] No horizontal scroll on mobile

**Time**: ~3 days

---

## Advanced Features (Optional)

### Advanced 1: Pull-to-Refresh

**What**: Add native pull-to-refresh gesture on mobile

**When to use**: If users frequently need to refresh dashboard data

**File**: `src/pages/Dashboard.tsx`

**Steps**:
1. Install react-pull-to-refresh: `pnpm add react-pull-to-refresh`
2. Wrap dashboard content
3. Add refresh handler

**Code**:
```typescript
import PullToRefresh from 'react-pull-to-refresh';

export function Dashboard() {
  const handleRefresh = async () => {
    await queryClient.invalidateQueries(['dashboard']);
  };

  return (
    <PullToRefresh onRefresh={handleRefresh}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {/* cards */}
      </div>
    </PullToRefresh>
  );
}
```

**Success Criteria**:
- ✅ Pull down shows loading indicator
- ✅ Data refreshes after pull gesture completes
- ✅ Works only on mobile (disabled on desktop)
- ✅ Doesn't interfere with normal scrolling

**Time**: +4 hours

---

### Advanced 2: Skeleton Loading

**What**: Show placeholder cards while data loads (better UX than spinner)

**When to use**: If dashboard takes >1 second to load

**File**: `src/components/dashboard/MetricCardSkeleton.tsx`

**Steps**:
1. Create skeleton component
2. Use during loading state
3. Match card dimensions

**Code**:
```typescript
// src/components/dashboard/MetricCardSkeleton.tsx
export function MetricCardSkeleton() {
  return (
    <div className="
      block p-6 bg-white rounded-lg border border-gray-200
      min-h-[120px] md:min-h-[140px]
      animate-pulse
    ">
      <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
      <div className="h-8 bg-gray-200 rounded w-3/4"></div>
    </div>
  );
}

// In Dashboard.tsx
{isLoading ? (
  <>
    <MetricCardSkeleton />
    <MetricCardSkeleton />
    <MetricCardSkeleton />
  </>
) : (
  cards.map(card => <MetricCard key={card.id} {...card} />)
)}
```

**Success Criteria**:
- ✅ Skeleton cards match real card dimensions
- ✅ Smooth transition from skeleton to real content
- ✅ No layout shift when content loads
- ✅ Pulse animation is subtle

**Time**: +3 hours

---

### Advanced 3: Swipe Navigation Between Cards

**What**: Swipe left/right to navigate between metric details

**When to use**: If cards link to detail pages

**File**: `src/components/dashboard/MetricCard.tsx`

**Steps**:
1. Install react-swipeable: `pnpm add react-swipeable`
2. Add swipe handlers
3. Navigate on swipe

**Code**:
```typescript
import { useSwipeable } from 'react-swipeable';
import { useNavigate } from 'react-router-dom';

export function MetricCard({ href, nextHref, prevHref }: Props) {
  const navigate = useNavigate();

  const handlers = useSwipeable({
    onSwipedLeft: () => nextHref && navigate(nextHref),
    onSwipedRight: () => prevHref && navigate(prevHref),
    trackMouse: false, // Mobile only
  });

  return (
    <Link {...handlers} to={href} className="...">
      {/* content */}
    </Link>
  );
}
```

**Success Criteria**:
- ✅ Swipe left goes to next card detail
- ✅ Swipe right goes to previous card detail
- ✅ Doesn't trigger on vertical scroll
- ✅ Works only on mobile (disabled on desktop)

**Time**: +5 hours

---

## Advanced Summary

**What's available**:
- ⬜ Pull-to-refresh (+4h)
- ⬜ Skeleton loading (+3h)
- ⬜ Swipe navigation (+5h)

**When to add**:
- Add pull-to-refresh if users complain about stale data
- Add skeleton if Lighthouse shows slow loading
- Add swipe navigation if users navigate between cards frequently

**Total advanced time**: +12 hours (optional)

---

## Week 1 Complete

**Fundamentals**: ✅ Dashboard works on mobile
**Next**: Week 2 - Navigation (bottom nav + hamburger menu)

**Diagram**:
```
Mobile (< 768px)          Tablet (768-1024px)       Desktop (> 1024px)
┌─────────────────┐       ┌──────────┬──────────┐   ┌────┬────┬────┐
│                 │       │          │          │   │    │    │    │
│  ┌───────────┐  │       │  ┌────┐  │  ┌────┐  │   │ ┌──┐ ┌──┐ ┌──┐
│  │  Card 1   │  │       │  │ C1 │  │  │ C2 │  │   │ │C1│ │C2│ │C3│
│  └───────────┘  │       │  └────┘  │  └────┘  │   │ └──┘ └──┘ └──┘
│                 │       │          │          │   │              │
│  ┌───────────┐  │       │  ┌────┐  │  ┌────┐  │   │ ┌──┐ ┌──┐ ┌──┐
│  │  Card 2   │  │       │  │ C3 │  │  │ C4 │  │   │ │C4│ │C5│ │C6│
│  └───────────┘  │       │  └────┘  │  └────┘  │   │ └──┘ └──┘ └──┘
│                 │       └──────────┴──────────┘   └────┴────┴────┘
│  ┌───────────┐  │
│  │  Card 3   │  │       1 column → 2 columns → 3 columns
│  └───────────┘  │
└─────────────────┘
```
