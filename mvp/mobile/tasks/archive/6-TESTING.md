# Week 6: Touch Interactions & Testing

**Status**: ⬜ BLOCKED (awaiting Week 5)
**Hours**: 8
**Budget**: $1,000
**Goal**: Swipe gestures working, all devices tested

---

## Tasks

### Task 6.1: Swipe Gestures (8 hours)

**Priority**: P1

**Install Dependencies**:
```bash
pnpm add react-swipeable
```

**Implementation**:
```typescript
// src/pages/presentations/PresentationViewer.tsx
import { useSwipeable } from 'react-swipeable';

export default function PresentationViewer() {
  const [slideIndex, setSlideIndex] = useState(0);

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
        md:hidden
      ">
        ← Swipe to navigate →
      </div>
    </div>
  );
}
```

---

## Testing Checklist

### Device Testing Matrix

| Device | Screen | Browser | Status |
|--------|--------|---------|--------|
| iPhone SE | 375×667 | Safari | ⬜ |
| iPhone 14 | 390×844 | Safari | ⬜ |
| iPhone 14 Pro Max | 430×932 | Safari | ⬜ |
| Galaxy S23 | 360×800 | Chrome | ⬜ |
| iPad Mini | 768×1024 | Safari | ⬜ |
| iPad Pro | 1024×1366 | Safari | ⬜ |

### Core Flows to Test

**Dashboard** (15 min per device):
- [ ] Dashboard loads in <2 seconds
- [ ] All metric cards tappable
- [ ] Bottom nav works
- [ ] No horizontal scroll
- [ ] Hamburger menu opens drawer

**Pitch Deck Wizard** (15 min):
- [ ] Chat interface full width
- [ ] Input field always visible
- [ ] Send button tappable (48px)
- [ ] Messages readable
- [ ] Progress bar visible

**Events** (10 min):
- [ ] Event cards display 1 column
- [ ] Images load (lazy loading)
- [ ] Register button full width
- [ ] Detail page scrolls smoothly

**Forms** (10 min):
- [ ] All inputs 48px height
- [ ] Email keyboard for email fields
- [ ] Phone keyboard for phone fields
- [ ] No iOS zoom (font-size 16px+)
- [ ] Progress indicators visible

### Automated Tests
```bash
# Run all mobile tests
pnpm exec playwright test --project="Mobile Safari"
pnpm exec playwright test --project="Mobile Chrome"

# Run specific test suites
pnpm exec playwright test e2e/dashboard.spec.ts
pnpm exec playwright test e2e/navigation.spec.ts
pnpm exec playwright test e2e/pitch-deck-wizard.spec.ts
pnpm exec playwright test e2e/forms.spec.ts
```

---

## Completion Criteria

**Week 6 is DONE when**:
- ✅ Swipe gestures in presentation viewer
- ✅ All 6 devices tested (matrix complete)
- ✅ Lighthouse mobile score >85
- ✅ All automated tests passing
- ✅ Zero critical bugs found

**Next**: [WEEK-6.5-ACCESSIBILITY.md](./WEEK-6.5-ACCESSIBILITY.md)
