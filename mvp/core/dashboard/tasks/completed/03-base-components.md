# Task 03: Create Base Components

**Phase**: Foundation (Week 1, Day 2)
**Priority**: 🔴 CRITICAL
**Time**: 2-3 hours
**Dependencies**: None

---

## Objective

Create reusable UI components for dashboard.

---

## Components to Create

### 1. `src/components/dashboard/EmptyState.tsx`

Displays when no data is available.

**Props**:
- `icon`: Lucide icon component
- `title`: string
- `description`: string
- `action?`: { label: string, onClick: () => void }

### 2. `src/components/dashboard/LoadingState.tsx`

Displays while data is loading.

**Props**:
- `type`: 'cards' | 'table' | 'chart'
- `count?`: number (default: 4)

### 3. `src/components/dashboard/EventCard.tsx`

Card component for displaying events.

### 4. `src/components/dashboard/JobCard.tsx`

Card component for displaying jobs.

### 5. `src/components/dashboard/PerkCard.tsx`

Card component for displaying perks.

---

## Implementation

**Reference**: See `003-DASHBOARD-IMPLEMENTATION-TASKS.md` Task 1.3 for complete code.

```bash
cd /home/sk/medellin-spark/src/components/dashboard

# Create each component
# Copy implementations from 003-DASHBOARD-IMPLEMENTATION-TASKS.md
# Lines 401-650
```

---

## Success Criteria

- [ ] 5 component files created
- [ ] All components use TypeScript
- [ ] All components use shadcn/ui
- [ ] TypeScript compiles without errors
- [ ] Components are responsive

---

## Validation

```bash
# TypeScript check
pnpm tsc --noEmit

# Check files exist
ls -la src/components/dashboard/

# Visual test
# Import and render in any page
# <EmptyState icon={Calendar} title="Test" description="Testing" />
```

---

## Next Task

→ **04-connect-main-dashboard.md**
