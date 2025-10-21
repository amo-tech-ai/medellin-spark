# Week 2: Mobile Navigation

**Goal**: Bottom navigation on mobile, sidebar on desktop
**Time**: 1 week (3 days fundamentals + 2 days advanced)

---

## Prerequisites

Before starting Week 2, add Tailwind safe-area support:

**File**: `tailwind.config.ts`

```typescript
export default {
  theme: {
    extend: {
      spacing: {
        'safe-bottom': 'env(safe-area-inset-bottom)',
      }
    }
  }
}
```

**Why**: iOS devices have notches/home indicators that need spacing

---

## Fundamentals

### Task 1: Create Bottom Navigation

**What**: Fixed bottom nav bar with 4 main actions (mobile only)

**File**: Create `src/components/MobileNav.tsx`

**Steps**:
1. Install shadcn Sheet component: `npx shadcn@latest add sheet`
2. Create MobileNav component
3. Add to App.tsx layout

**Code**:
```typescript
// src/components/MobileNav.tsx
import { Home, Calendar, FileText, User } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export function MobileNav() {
  const location = useLocation();

  const navItems = [
    { icon: Home, label: 'Dashboard', href: '/dashboard' },
    { icon: Calendar, label: 'Events', href: '/events' },
    { icon: FileText, label: 'Decks', href: '/pitch-decks' },
    { icon: User, label: 'Profile', href: '/profile' },
  ];

  return (
    <nav className="
      fixed bottom-0 left-0 right-0
      bg-white border-t border-gray-200
      flex justify-around items-center
      h-16 z-50
      md:hidden
      pb-safe-bottom        // iOS safe area
    ">
      {navItems.map(({ icon: Icon, label, href }) => {
        const isActive = location.pathname === href;
        return (
          <Link
            key={href}
            to={href}
            className={`
              flex flex-col items-center justify-center
              min-w-[64px] h-12
              text-xs
              ${isActive ? 'text-primary' : 'text-gray-600'}
            `}
          >
            <Icon className="h-6 w-6 mb-1" />
            <span>{label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
```

**Steps**:
3. Add to layout:
```typescript
// src/App.tsx
import { MobileNav } from './components/MobileNav';

<div className="pb-16 md:pb-0"> {/* Space for bottom nav */}
  <Routes>...</Routes>
  <MobileNav />
</div>
```

**Success Criteria**:
- ✅ Bottom nav shows on mobile (< 768px)
- ✅ Bottom nav hidden on desktop (≥ 768px)
- ✅ Active page highlighted
- ✅ Touch targets are 44×44px minimum
- ✅ Icons and labels are clear
- ✅ Doesn't overlap with iOS home indicator
- ✅ z-index keeps it above page content

**Test**:
```bash
# Chrome DevTools → iPhone 12
# Navigate between pages → Active state updates
# Check safe-area spacing on iPhone with notch
```

---

### Task 2: Responsive Sidebar

**What**: Convert desktop sidebar to slide-out drawer on mobile

**File**: `src/components/dashboard/DashboardSidebar.tsx`

**Steps**:
1. Wrap sidebar in Sheet component
2. Add hamburger menu trigger
3. Show drawer on mobile, sidebar on desktop

**Code**:
```typescript
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';

export function DashboardSidebar() {
  return (
    <>
      {/* Mobile: Hamburger + Drawer */}
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <button className="
              fixed top-4 left-4 z-50
              p-2 bg-white rounded-lg border shadow
            ">
              <Menu className="h-6 w-6" />
            </button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64">
            <SidebarContent />
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop: Always visible sidebar */}
      <aside className="hidden md:block w-64 border-r">
        <SidebarContent />
      </aside>
    </>
  );
}

function SidebarContent() {
  return (
    <nav className="p-4 space-y-2">
      {/* Same content for both mobile drawer and desktop sidebar */}
      <Link to="/dashboard" className="block p-2 rounded hover:bg-gray-100">
        Dashboard
      </Link>
      <Link to="/events" className="block p-2 rounded hover:bg-gray-100">
        Events
      </Link>
      {/* ... more links */}
    </nav>
  );
}
```

**Success Criteria**:
- ✅ Mobile: Hamburger button visible in top-left
- ✅ Mobile: Drawer slides from left when hamburger tapped
- ✅ Mobile: Drawer closes when link clicked
- ✅ Mobile: Drawer closes when backdrop tapped
- ✅ Desktop: Sidebar always visible (no hamburger)
- ✅ Same content in drawer and sidebar
- ✅ Smooth animations

**Test**:
```bash
# Mobile: Tap hamburger → Drawer slides in
# Tap link → Drawer closes, navigates
# Desktop: Sidebar always visible
```

---

### Task 3: Touch-Optimized Menu Items

**What**: Enlarge menu items for easy tapping

**File**: `src/components/dashboard/DashboardSidebar.tsx`

**Steps**:
1. Increase padding on menu items
2. Add visual feedback on tap
3. Ensure 44px minimum height

**Update menu items**:
```typescript
<Link
  to={href}
  className="
    flex items-center gap-3
    p-3                      // 48px height (12px × 2 + 24px icon)
    rounded-lg
    hover:bg-gray-100
    active:scale-[0.98]
    transition-all
    min-h-[44px]             // iOS minimum
  "
>
  <Icon className="h-6 w-6" />
  <span className="text-base">{label}</span>
</Link>
```

**Success Criteria**:
- ✅ Menu items are minimum 44px tall
- ✅ Items show scale feedback when tapped
- ✅ Gap between icon and text is consistent
- ✅ Text is 16px (prevents iOS zoom)
- ✅ No accidental taps on wrong items

**Test**:
```bash
# Tap each menu item → Should see scale animation
# Measure height → Should be ≥ 44px
```

---

## Fundamentals Summary

**What you built**:
- ✅ Bottom navigation bar (mobile)
- ✅ Slide-out drawer (mobile)
- ✅ Touch-optimized menu items

**Success Check**:
- [ ] Bottom nav works on mobile
- [ ] Drawer slides smoothly
- [ ] Navigation is easy to use with thumbs
- [ ] No accidental taps

**Time**: ~3 days

---

## Advanced Features (Optional)

### Advanced 1: Swipe Gesture to Open Drawer

**What**: Swipe from left edge to open navigation drawer

**When to use**: If users frequently access sidebar on mobile

**File**: `src/components/dashboard/DashboardSidebar.tsx`

**Steps**:
1. Install react-swipeable: `pnpm add react-swipeable`
2. Add swipe handler
3. Open drawer on swipe from edge

**Code**:
```typescript
import { useSwipeable } from 'react-swipeable';
import { useState } from 'react';

export function DashboardSidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const handlers = useSwipeable({
    onSwipedRight: (event) => {
      // Only trigger if swipe starts from left edge
      if (event.initial[0] < 50) {
        setIsOpen(true);
      }
    },
    trackMouse: false,
  });

  return (
    <div {...handlers}>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        {/* ... */}
      </Sheet>
    </div>
  );
}
```

**Success Criteria**:
- ✅ Swipe from left edge opens drawer
- ✅ Only triggers near edge (< 50px from left)
- ✅ Doesn't interfere with horizontal scrolling
- ✅ Works smoothly without lag

**Time**: +4 hours

---

### Advanced 2: Breadcrumb Navigation

**What**: Show current page hierarchy in header

**When to use**: If app has deep navigation (3+ levels)

**File**: Create `src/components/Breadcrumbs.tsx`

**Code**:
```typescript
import { ChevronRight } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export function Breadcrumbs() {
  const location = useLocation();
  const paths = location.pathname.split('/').filter(Boolean);

  return (
    <nav className="flex items-center gap-2 text-sm text-gray-600 px-4 py-2">
      <Link to="/" className="hover:text-gray-900">Home</Link>
      {paths.map((path, index) => (
        <div key={path} className="flex items-center gap-2">
          <ChevronRight className="h-4 w-4" />
          <Link
            to={`/${paths.slice(0, index + 1).join('/')}`}
            className="hover:text-gray-900 capitalize"
          >
            {path}
          </Link>
        </div>
      ))}
    </nav>
  );
}
```

**Success Criteria**:
- ✅ Shows path from home to current page
- ✅ Each segment is clickable
- ✅ Truncates on mobile if too long
- ✅ Updates when navigation changes

**Time**: +3 hours

---

### Advanced 3: Navigation Search

**What**: Quick search bar in navigation menu

**When to use**: If app has many pages (10+)

**File**: `src/components/dashboard/DashboardSidebar.tsx`

**Code**:
```typescript
import { Search } from 'lucide-react';
import { useState } from 'react';

function SidebarContent() {
  const [search, setSearch] = useState('');

  const allLinks = [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Events', href: '/events' },
    { label: 'Pitch Decks', href: '/pitch-decks' },
    // ... more links
  ];

  const filtered = allLinks.filter(link =>
    link.label.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <nav className="p-4 space-y-2">
      <div className="relative mb-4">
        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
        <input
          type="search"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="
            w-full pl-10 pr-4 py-2
            border rounded-lg
            text-base               // Prevent iOS zoom
          "
        />
      </div>
      {filtered.map(link => (
        <Link key={link.href} to={link.href}>
          {link.label}
        </Link>
      ))}
    </nav>
  );
}
```

**Success Criteria**:
- ✅ Search filters navigation items
- ✅ Instant results as user types
- ✅ Shows "No results" if nothing matches
- ✅ Clears when drawer closes

**Time**: +3 hours

---

## Advanced Summary

**What's available**:
- ⬜ Swipe to open drawer (+4h)
- ⬜ Breadcrumb navigation (+3h)
- ⬜ Navigation search (+3h)

**When to add**:
- Add swipe if users complain about hard-to-reach hamburger
- Add breadcrumbs if navigation is 3+ levels deep
- Add search if you have 10+ navigation items

**Total advanced time**: +10 hours (optional)

---

## Week 2 Complete

**Fundamentals**: ✅ Mobile navigation works
**Next**: Week 3 - Pitch Deck Wizard (chat interface)

**Diagram**:
```
Mobile Navigation Pattern:

┌────────────────────────┐
│  ☰  Dashboard     ⋮   │ ← Header with hamburger
├────────────────────────┤
│                        │
│     Page Content       │
│                        │
│                        │
├────────────────────────┤
│  🏠   📅   📄   👤    │ ← Bottom nav (fixed)
└────────────────────────┘
        ▲
        │ iOS safe area spacing
        └─ pb-safe-bottom


Desktop Pattern:

┌──────┬─────────────────┐
│      │  Dashboard  ⋮   │ ← Header (no hamburger)
│ Nav  ├─────────────────┤
│ Bar  │                 │
│      │  Page Content   │
│ 🏠   │                 │
│ 📅   │                 │
│ 📄   │                 │
│ 👤   │                 │
└──────┴─────────────────┘
   ▲
   └─ Sidebar (always visible)
```
