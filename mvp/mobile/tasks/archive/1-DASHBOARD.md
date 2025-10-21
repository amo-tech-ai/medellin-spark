# Week 1: Dashboard Responsive Layout

**Status**: ⬜ BLOCKED (awaiting Week 0)
**Hours**: 28
**Budget**: $3,500
**Goal**: Dashboard displays 1 column on mobile, 3 on desktop

---

## Tasks

### Task 1.1: Responsive Grid System (16 hours)

**Priority**: P0
**File**: `src/pages/Dashboard.tsx`

**Current Code** (Desktop-only):
```typescript
<div className="grid grid-cols-3 gap-4">
  <MetricCard title="Pitch Decks" value="5" />
  <MetricCard title="Events" value="12" />
  <MetricCard title="Applications" value="8" />
</div>
```

**New Code** (Mobile responsive):
```typescript
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

**Test Cases**:
- [ ] Mobile (375px): Cards stack vertically (1 column)
- [ ] Tablet (768px): Cards display in 2 columns
- [ ] Desktop (1024px): Cards display in 3 columns
- [ ] No horizontal scroll at any width

**Acceptance Criteria**:
- ✅ Responsive grid working
- ✅ No layout shift when resizing
- ✅ Padding appropriate for each breakpoint
- ✅ Cards fill container width

---

### Task 1.2: Touch-Optimized Metric Cards (8 hours)

**Priority**: P0
**File**: `src/components/dashboard/MetricCard.tsx`

**Changes**:
```typescript
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
        active:scale-[0.98]          // Visual feedback on tap
        transition-all
        min-h-[120px]           // Minimum tap target
        md:min-h-[140px]        // Larger on desktop
      "
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm md:text-base text-gray-600">
          {title}
        </span>
        {icon && <span className="text-gray-400">{icon}</span>}
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

**TypeScript Interface**:
```typescript
interface MetricCardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  href: string;
}
```

**Test Cases**:
- [ ] Card minimum height 120px (mobile)
- [ ] Card minimum height 140px (desktop)
- [ ] Active state shows on tap
- [ ] Entire card is clickable
- [ ] Text scales appropriately

**Acceptance Criteria**:
- ✅ All cards meet 44px minimum height
- ✅ Touch feedback visible
- ✅ Text readable on all screen sizes
- ✅ Links work correctly

---

### Task 1.3: Mobile Dashboard Header (4 hours)

**Priority**: P0
**File**: `src/components/dashboard/DashboardHeader.tsx`

**Implementation**:
```typescript
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

**Test Cases**:
- [ ] Header sticky on scroll
- [ ] Hamburger visible on mobile only
- [ ] Logo appropriate size for screen
- [ ] User menu accessible on all sizes

**Acceptance Criteria**:
- ✅ Header stays at top when scrolling
- ✅ Mobile/desktop layouts correct
- ✅ All interactive elements tappable
- ✅ Z-index prevents overlap issues

---

## Testing Checklist

### Manual Testing (Real Devices)
- [ ] iPhone SE (375px): Dashboard loads, cards stack
- [ ] iPhone 14 (390px): Dashboard responsive
- [ ] Galaxy S23 (360px): No horizontal scroll
- [ ] iPad Mini (768px): 2-column layout

### Browser Testing
- [ ] Chrome DevTools mobile emulation
- [ ] Safari iOS simulator
- [ ] Firefox responsive mode

### Automated Testing
```typescript
// e2e/dashboard.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Dashboard Mobile', () => {
  test.use({ viewport: { width: 375, height: 667 } });

  test('metric cards display in single column', async ({ page }) => {
    await page.goto('/dashboard');

    const cards = await page.$$('[data-testid="metric-card"]');
    const positions = await Promise.all(cards.map(c => c.boundingBox()));

    // Verify stacked vertically
    expect(positions[0].y).toBeLessThan(positions[1].y);
    expect(positions[1].y).toBeLessThan(positions[2].y);
  });

  test('all cards meet minimum tap target', async ({ page }) => {
    await page.goto('/dashboard');

    const cards = await page.$$('[data-testid="metric-card"]');
    for (const card of cards) {
      const box = await card.boundingBox();
      expect(box.height).toBeGreaterThanOrEqual(120);
    }
  });
});
```

Run tests:
```bash
pnpm exec playwright test --project="Mobile Safari" e2e/dashboard.spec.ts
```

---

## Performance Targets

| Metric | Target | How to Measure |
|--------|--------|----------------|
| Dashboard Load | <1.5s | Lighthouse FCP |
| Layout Shift | <0.1 | Lighthouse CLS |
| First Paint | <1s | Chrome DevTools |

---

## Deliverables

### Code Changes
- [ ] `src/pages/Dashboard.tsx` - Responsive grid
- [ ] `src/components/dashboard/MetricCard.tsx` - Touch optimization
- [ ] `src/components/dashboard/DashboardHeader.tsx` - Mobile header

### Tests
- [ ] `e2e/dashboard.spec.ts` - Mobile Playwright tests
- [ ] Manual test on 3 devices completed

### Documentation
- [ ] Screenshots: Before/after comparison
- [ ] Test report: All devices passing

---

## Completion Criteria

**Week 1 is DONE when**:
- ✅ Dashboard displays 1 column on mobile, 3 on desktop
- ✅ All metric cards tappable (min 120px height)
- ✅ Responsive padding and spacing correct
- ✅ Sticky header with mobile menu button
- ✅ All tests passing (manual + automated)
- ✅ No regressions on desktop

**Next**: [WEEK-2-NAVIGATION.md](./WEEK-2-NAVIGATION.md)
