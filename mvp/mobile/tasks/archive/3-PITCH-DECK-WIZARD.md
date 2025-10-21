# Week 3: Pitch Deck Wizard Mobile

**Status**: ⬜ BLOCKED (awaiting Week 2)
**Hours**: 20
**Budget**: $2,500
**Goal**: Chat interface works perfectly on mobile

---

## Tasks

### Task 3.1: Responsive Chat Interface (16 hours)

**Priority**: P0
**File**: `src/pages/PitchDeckWizard.tsx`

**Implementation**:
```typescript
export default function PitchDeckWizard() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [progress, setProgress] = useState(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // ... chat logic
  };

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
        pb-24                   // Space for fixed input (16 + 8 padding)
        md:pb-20
      ">
        {messages.map((msg) => (
          <ChatMessage
            key={msg.id}
            message={msg}
            className="
              max-w-full           // Full width on mobile
              md:max-w-2xl         // Constrained on desktop
              mx-auto
            "
          />
        ))}
      </div>

      {/* Input - Sticky Bottom */}
      <div className="
        fixed bottom-0 left-0 right-0
        md:sticky
        bg-white
        border-t
        p-4
        md:p-6
        pb-safe-bottom          // iOS keyboard safe area
        z-10
      ">
        <form onSubmit={handleSubmit} className="flex gap-2 max-w-4xl mx-auto">
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
              focus:ring-2 focus:ring-primary
            "
          />
          <button
            type="submit"
            disabled={!input.trim()}
            className="
              h-12 w-12          // Square button
              md:h-14 md:w-14
              rounded-lg
              bg-primary
              text-white
              flex items-center justify-center
              active:scale-95    // Tap feedback
              disabled:opacity-50
              disabled:cursor-not-allowed
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

**Test Cases**:
- [ ] Chat messages full width on mobile
- [ ] Input field always visible (not hidden by keyboard)
- [ ] Send button 48px minimum (tappable)
- [ ] Smooth scrolling on iOS
- [ ] No keyboard jumping issues

---

### Task 3.2: Touch-Optimized Progress Bar (4 hours)

**Priority**: P1
**File**: `src/components/ProgressBar.tsx`

**Implementation**:
```typescript
interface ProgressBarProps {
  value: number; // 0-100
}

export function ProgressBar({ value }: ProgressBarProps): JSX.Element {
  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-2">
        <span className="text-xs md:text-sm text-gray-600">
          Progress: {value}%
        </span>
        {value >= 80 && (
          <span className="text-xs md:text-sm text-green-600 font-medium">
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
          className="h-full bg-primary transition-all duration-300 ease-in-out"
          style={{ width: `${value}%` }}
          role="progressbar"
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>
    </div>
  );
}
```

---

## Testing Checklist

### Automated Tests
```typescript
// e2e/pitch-deck-wizard.spec.ts
test('chat input always visible on mobile', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 667 });
  await page.goto('/pitch-deck-wizard');

  // Click input to open keyboard
  const input = page.locator('input[placeholder*="startup"]');
  await input.click();

  // Input should still be visible
  await expect(input).toBeVisible();

  // Input should be in viewport
  const box = await input.boundingBox();
  const viewport = page.viewportSize();
  expect(box.y + box.height).toBeLessThan(viewport.height);
});
```

### Manual Testing
- [ ] iPhone SE: Keyboard doesn't hide input
- [ ] iPhone 14: Send button tappable
- [ ] Galaxy S23: Chat scrolls smoothly
- [ ] Test with 10+ messages (scroll performance)

---

## Completion Criteria

**Week 3 is DONE when**:
- ✅ Chat messages full width on mobile
- ✅ Sticky input field (always visible)
- ✅ Large send button (48px)
- ✅ iOS keyboard safe area support
- ✅ Progress bar visible and animated
- ✅ Smooth scrolling on all devices

**Next**: [WEEK-4-FORMS-EVENTS.md](./WEEK-4-FORMS-EVENTS.md)
