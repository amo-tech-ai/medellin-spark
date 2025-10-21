# Task 09: Create Perks Dashboard

**Phase**: Enhanced Features (Week 3, Day 1-2)
**Priority**: 🟡 MEDIUM
**Time**: 4-5 hours
**Dependencies**: 02, 03

---

## Objective

Create a new Perks dashboard page showing available perks and claimed perks.

---

## File to Create

`src/pages/dashboard/DashboardPerks.tsx`

---

## Features

### 1. Available Perks Section
- List all available perks
- Show perk value
- Show perk category (software, hardware, services)
- Claim button

### 2. Claimed Perks Section
- List claimed perks
- Show claim date
- Show redemption status
- View redemption code

### 3. Perks Stats
- Total perks available
- Perks claimed
- Total value saved
- Expiring soon

---

## Route Setup

Add to `src/App.tsx`:

```typescript
import DashboardPerks from '@/pages/dashboard/DashboardPerks';

// In routes:
<Route path="/dashboard/perks" element={<DashboardPerks />} />
```

---

## Implementation

```typescript
// Use hooks
const { data: perks, isLoading } = usePerks();
const { data: claims } = usePerkClaims();

// Display with components
<PerkCard perk={perk} onClaim={handleClaim} />
<EmptyState icon={Gift} title="No perks claimed yet" />
```

---

## Success Criteria

- [ ] Page created and routed
- [ ] Shows available perks
- [ ] Shows claimed perks
- [ ] Claim perk works
- [ ] Stats display correctly
- [ ] Loading states work
- [ ] Empty states work
- [ ] Mobile responsive
- [ ] No TypeScript errors

---

## Testing

```bash
# TypeScript check
pnpm tsc --noEmit

# Visit page
open http://localhost:8080/dashboard/perks

# Test:
# - Perks load
# - Claim perk → adds to claimed
# - Stats update
# - Mobile view works
```

---

## Next Task

→ **10-advanced-components.md**
