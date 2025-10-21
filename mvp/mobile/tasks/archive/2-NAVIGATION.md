# Week 2: Mobile Navigation

**Status**: ⬜ BLOCKED (awaiting Week 1)
**Hours**: 24
**Budget**: $3,000
**Goal**: Bottom navigation on mobile, drawer sidebar

---

## Tasks

### Task 2.1: Bottom Navigation Bar (12 hours)

**Priority**: P0
**Files**:
- `src/components/MobileNav.tsx` (NEW)
- `src/App.tsx` (UPDATE)

**Implementation**:

```typescript
// src/components/MobileNav.tsx
import { Home, Calendar, Briefcase, PresentationIcon } from 'lucide-react';
import { NavLink } from 'react-router-dom';

interface MobileNavButtonProps {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  to: string;
}

export function MobileNav(): JSX.Element {
  return (
    <nav className="
      fixed bottom-0 left-0 right-0
      bg-white
      border-t
      flex justify-around
      h-16
      z-50
      md:hidden              // Hide on desktop (show sidebar instead)
      pb-safe-bottom         // iOS notch support (from Week 0 config)
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

function MobileNavButton({ icon: Icon, label, to }: MobileNavButtonProps): JSX.Element {
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
        min-h-[44px]           // iOS tap target
      `}
    >
      {({ isActive }) => (
        <>
          <Icon className={`w-6 h-6 mb-1 ${isActive ? 'text-primary' : ''}`} />
          <span className="font-medium">{label}</span>
        </>
      )}
    </NavLink>
  );
}
```

**Add to App layout**:
```typescript
// src/App.tsx
import { MobileNav } from './components/MobileNav';

function App() {
  return (
    <div className="min-h-screen">
      <Routes>{/* routes */}</Routes>
      <MobileNav />
    </div>
  );
}
```

**Test Cases**:
- [ ] Bottom nav visible on mobile (<768px)
- [ ] Bottom nav hidden on desktop (≥768px)
- [ ] Active state shows current route
- [ ] All buttons minimum 44px height
- [ ] iOS safe area working (notch doesn't cover nav)

**Acceptance Criteria**:
- ✅ 4 navigation buttons present
- ✅ Active route highlighted
- ✅ Touch feedback on tap
- ✅ Safe area inset working on iOS

---

### Task 2.2: Responsive Sidebar Drawer (8 hours)

**Priority**: P0
**File**: `src/components/dashboard/DashboardSidebar.tsx`

**Install Sheet Component**:
```bash
npx shadcn@latest add sheet
```

**Implementation**:
```typescript
import { useState } from 'react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

export function DashboardSidebar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Desktop Sidebar - Always visible */}
      <aside className="
        hidden md:block
        w-64
        border-r
        bg-white
        h-screen
        sticky top-0
      ">
        <SidebarContent />
      </aside>

      {/* Mobile Drawer - Overlay */}
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent side="left" className="w-64 p-0 md:hidden">
          <div className="flex flex-col h-full">
            {/* Logo */}
            <div className="p-4 border-b">
              <Logo />
            </div>

            {/* Navigation */}
            <div className="flex-1 overflow-y-auto">
              <SidebarContent onItemClick={() => setMobileOpen(false)} />
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}

function SidebarContent({ onItemClick }: { onItemClick?: () => void }) {
  return (
    <nav className="p-4 space-y-2">
      <SidebarLink to="/dashboard" onClick={onItemClick}>
        Dashboard
      </SidebarLink>
      <SidebarLink to="/dashboard/pitch-decks" onClick={onItemClick}>
        Pitch Decks
      </SidebarLink>
      <SidebarLink to="/dashboard/events" onClick={onItemClick}>
        Events
      </SidebarLink>
      {/* ... more links */}
    </nav>
  );
}
```

**Test Cases**:
- [ ] Sidebar always visible on desktop
- [ ] Sidebar becomes drawer on mobile
- [ ] Drawer opens from hamburger button
- [ ] Drawer closes when clicking outside
- [ ] Drawer closes when clicking link
- [ ] Content doesn't scroll when drawer open

**Acceptance Criteria**:
- ✅ Sidebar visible on desktop (≥768px)
- ✅ Drawer works on mobile (<768px)
- ✅ Closes automatically on navigation
- ✅ Backdrop prevents interaction with page

---

### Task 2.3: Hamburger Menu Button (4 hours)

**Priority**: P0
**File**: `src/components/MobileMenuButton.tsx` (NEW)

**Implementation**:
```typescript
import { Menu } from 'lucide-react';
import { SheetTrigger } from '@/components/ui/sheet';

export function MobileMenuButton(): JSX.Element {
  return (
    <SheetTrigger asChild>
      <button
        className="
          p-2
          rounded-lg
          hover:bg-gray-100
          active:bg-gray-200
          md:hidden
          min-h-[44px]
          min-w-[44px]
        "
        aria-label="Open menu"
      >
        <Menu className="w-6 h-6" />
      </button>
    </SheetTrigger>
  );
}
```

**Usage in Header**:
```typescript
// src/components/dashboard/DashboardHeader.tsx
import { MobileMenuButton } from '@/components/MobileMenuButton';

export function DashboardHeader() {
  return (
    <header>
      <div className="flex items-center gap-3 md:hidden">
        <MobileMenuButton />
        <Logo size="sm" />
      </div>
    </header>
  );
}
```

**Test Cases**:
- [ ] Button visible on mobile only
- [ ] Opens sidebar drawer
- [ ] Min 44x44px tap target
- [ ] Visual feedback on tap

**Acceptance Criteria**:
- ✅ Hamburger menu opens drawer
- ✅ Accessible (aria-label present)
- ✅ Touch target adequate
- ✅ Hidden on desktop

---

## Testing Checklist

### Automated Tests
```typescript
// e2e/navigation.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Mobile Navigation', () => {
  test.use({ viewport: { width: 375, height: 667 } });

  test('bottom navigation visible on mobile', async ({ page }) => {
    await page.goto('/dashboard');

    const bottomNav = page.locator('[data-testid="mobile-nav"]');
    await expect(bottomNav).toBeVisible();

    // Verify 4 nav items
    const navItems = bottomNav.locator('a');
    await expect(navItems).toHaveCount(4);
  });

  test('active route highlighted', async ({ page }) => {
    await page.goto('/dashboard/events');

    const eventsButton = page.locator('[data-testid="mobile-nav"] a[href="/dashboard/events"]');
    await expect(eventsButton).toHaveClass(/text-primary/);
  });

  test('hamburger menu opens drawer', async ({ page }) => {
    await page.goto('/dashboard');

    // Click hamburger
    await page.click('[aria-label="Open menu"]');

    // Drawer should be visible
    const drawer = page.locator('[role="dialog"]');
    await expect(drawer).toBeVisible();
  });
});
```

### Manual Testing
- [ ] iPhone SE: Bottom nav works, safe area correct
- [ ] iPhone 14: Bottom nav visible, drawer opens
- [ ] Galaxy S23: Navigation functional
- [ ] iPad Mini: Sidebar always visible (no bottom nav)

---

## Deliverables

### Code Changes
- [ ] `src/components/MobileNav.tsx` - Bottom navigation
- [ ] `src/components/MobileMenuButton.tsx` - Hamburger menu
- [ ] `src/components/dashboard/DashboardSidebar.tsx` - Drawer sidebar
- [ ] `src/App.tsx` - Add MobileNav

### Tests
- [ ] `e2e/navigation.spec.ts` - Mobile navigation tests
- [ ] Manual tests on 3 devices

### Documentation
- [ ] Navigation flow diagram
- [ ] Test results

---

## Completion Criteria

**Week 2 is DONE when**:
- ✅ Bottom navigation bar on mobile (4 routes)
- ✅ Sidebar becomes drawer on mobile
- ✅ Hamburger menu button in header
- ✅ All nav items min 44px tap targets
- ✅ Active route highlighting works
- ✅ iOS safe area implemented correctly
- ✅ All tests passing

**Next**: [WEEK-3-PITCH-DECK-WIZARD.md](./WEEK-3-PITCH-DECK-WIZARD.md)
