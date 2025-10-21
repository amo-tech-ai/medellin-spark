# Week 1: Dashboard Mobile

**Time**: 1 week
**Goal**: Dashboard works on mobile

---

## Task 1: Make Grid Responsive

**File**: `src/pages/Dashboard.tsx`

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

**Test**: Open Chrome DevTools → Toggle device toolbar → See 1 column on mobile

---

## Task 2: Enlarge Cards

**File**: `src/components/dashboard/MetricCard.tsx`

**Update className**:
```typescript
<Link
  to={href}
  className="
    block
    p-6
    bg-white
    rounded-lg
    border
    hover:shadow-lg
    active:scale-[0.98]
    transition-all
    min-h-[120px]        // iOS tap target minimum
    md:min-h-[140px]
  "
>
```

**Test**: Cards are at least 120px tall on mobile

---

## Task 3: Sticky Header

**File**: `src/components/dashboard/DashboardHeader.tsx`

**Add className**:
```typescript
<header className="
  sticky top-0
  z-40
  bg-white
  border-b
  px-4 py-3
  md:px-6 md:py-4
">
```

**Test**: Scroll down → Header stays at top

---

## Done

Dashboard now works on mobile. Move to Week 2.
