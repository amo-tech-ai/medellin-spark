# Week 0: Core Setup (ESSENTIALS ONLY)

**Time**: 35 minutes
**Priority**: P0 - Start here
**Goal**: Minimum setup to begin Week 1 (Dashboard responsive work)

---

## What You Actually Need

To start mobile development, you only need **2 things**:

1. ✅ Viewport meta tag (5 min)
2. ✅ Tailwind safe-area config (30 min)

**That's it.** Everything else can be added later.

---

## Task 1: Add Viewport Meta Tag (5 minutes)

**File**: `index.html`

**Add this to `<head>`**:
```html
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5">
```

**Verify**:
```bash
grep "viewport" index.html
```

**Done.** Site is now responsive.

---

## Task 2: Configure Tailwind Safe Areas (30 minutes)

**File**: `tailwind.config.ts`

**Add this to theme.extend**:
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

**Verify**:
```bash
grep "safe-bottom" tailwind.config.ts
```

**Done.** iOS notch support ready.

---

## What About Everything Else?

### Testing?
Use Chrome DevTools mobile emulation (free, already installed)

### Analytics?
Add in Week 7 when deploying

### Feature Flags?
Add in Week 7 when deploying

### ESLint Accessibility?
Add during Week 6.5 (accessibility audit)

### Physical Devices?
Buy during Week 6 (testing week)

### ErrorBoundary?
Add during Week 5 (code splitting)

---

## Start Week 1 Now

After these 2 tasks (35 minutes), you can:
- ✅ Start Week 1 (Dashboard responsive)
- ✅ Use Tailwind responsive classes
- ✅ Test with Chrome DevTools
- ✅ Build mobile layouts

**Everything else is premature optimization.**

---

## Simplified Timeline

**Day 1** (35 min):
- Add viewport tag (5 min)
- Configure Tailwind (30 min)
- **START WEEK 1**

**Weeks 1-4**:
- Build core mobile features

**Week 5**:
- Add ErrorBoundary during code splitting

**Week 6**:
- Install Playwright
- Buy test devices

**Week 6.5**:
- Add ESLint accessibility

**Week 7**:
- Add analytics
- Add feature flags
- Deploy

---

**Status**: ✅ READY
**Next**: [1-DASHBOARD.md](./1-DASHBOARD.md) - Start building
