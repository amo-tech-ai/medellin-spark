# Week 4: Forms & Event Pages

**Status**: ⬜ BLOCKED (awaiting Week 3)
**Hours**: 24
**Budget**: $3,000
**Goal**: All forms and event pages mobile-friendly

---

## Tasks

### Task 4.1: Mobile-Optimized Form Component (12 hours)

**Priority**: P0
**File**: `src/components/forms/FormField.tsx` (NEW)

**Implementation**:
```typescript
interface FormFieldProps {
  label: string;
  type?: 'text' | 'email' | 'tel' | 'url' | 'number';
  error?: string;
  inputMode?: 'text' | 'email' | 'tel' | 'url' | 'numeric';
  autoComplete?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function FormField({
  label,
  type = 'text',
  error,
  inputMode,
  autoComplete,
  ...props
}: FormFieldProps): JSX.Element {
  return (
    <div className="mb-4">
      <label className="
        block
        text-sm md:text-base
        font-medium
        mb-2
      ">
        {label}
      </label>
      <input
        type={type}
        inputMode={inputMode}
        autoComplete={autoComplete}
        className={`
          w-full
          h-12                    // 48px minimum (iOS)
          md:h-14                 // Larger on desktop
          px-4
          text-base               // 16px - prevents iOS zoom
          rounded-lg
          border
          ${error ? 'border-red-500' : 'border-gray-300'}
          focus:ring-2
          focus:ring-primary
          focus:border-transparent
          transition-colors
        `}
        {...props}
      />
      {error && (
        <p className="text-sm text-red-500 mt-1" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
```

**Usage Examples**:
```typescript
// Email field - shows @ keyboard on mobile
<FormField
  label="Email"
  type="email"
  inputMode="email"
  autoComplete="email"
  placeholder="you@example.com"
/>

// Phone field - shows number pad on mobile
<FormField
  label="Phone"
  type="tel"
  inputMode="tel"
  autoComplete="tel"
  placeholder="+1 (555) 000-0000"
/>

// URL field - shows .com keyboard on mobile
<FormField
  label="Website"
  type="url"
  inputMode="url"
  autoComplete="url"
  placeholder="https://example.com"
/>
```

**Test Cases**:
- [ ] Email input shows email keyboard on iOS
- [ ] Phone input shows number pad on iOS
- [ ] All inputs minimum 48px height
- [ ] Font size 16px (no zoom on iOS)
- [ ] AutoComplete working

---

### Task 4.2: Responsive Event Cards (12 hours)

**Priority**: P0
**Files**:
- `src/pages/Events.tsx` (UPDATE)
- `src/components/EventCard.tsx` (UPDATE)

**Events Page**:
```typescript
export default function Events() {
  return (
    <div className="container mx-auto px-4 py-6 md:px-6 md:py-8">
      {/* Header */}
      <h1 className="text-2xl md:text-3xl font-bold mb-6">
        Events
      </h1>

      {/* Filters */}
      <div className="
        flex flex-col gap-3      // Stack vertically on mobile
        md:flex-row md:gap-4    // Horizontal on desktop
        mb-6
      ">
        <select className="
          h-12 md:h-10
          px-4
          text-base
          rounded-lg
          border
        ">
          <option>All Categories</option>
          <option>AI & ML</option>
          <option>Startup Events</option>
        </select>
      </div>

      {/* Event Grid */}
      <div className="
        grid
        grid-cols-1              // 1 column mobile
        md:grid-cols-2           // 2 columns tablet
        lg:grid-cols-3           // 3 columns desktop
        gap-4
        md:gap-6
      ">
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
}
```

**EventCard Component**:
```typescript
interface EventCardProps {
  event: Event;
}

export function EventCard({ event }: EventCardProps): JSX.Element {
  return (
    <Link
      to={`/events/${event.id}`}
      className="
        block
        bg-white
        rounded-lg
        border
        overflow-hidden
        hover:shadow-lg
        active:scale-[0.98]         // Mobile tap feedback
        transition-all
      "
    >
      {/* Image */}
      <div className="aspect-video bg-gray-200">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover"
          loading="lazy"        // Lazy load images
        />
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="
          text-lg md:text-xl
          font-semibold
          mb-2
          line-clamp-2          // Max 2 lines
        ">
          {event.title}
        </h3>

        <p className="
          text-sm md:text-base
          text-gray-600
          mb-4
          line-clamp-3          // Max 3 lines
        ">
          {event.description}
        </p>

        {/* Register Button */}
        <button className="
          w-full                 // Full width on mobile
          h-12
          bg-primary
          text-white
          rounded-lg
          font-medium
          active:bg-primary-dark
          transition-colors
        ">
          Register Now
        </button>
      </div>
    </Link>
  );
}
```

---

## Testing Checklist

### Automated Tests
```typescript
// e2e/forms.spec.ts
test('mobile keyboard optimization', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 667 });
  await page.goto('/startup-profile');

  // Email field should show email keyboard
  const email = page.locator('input[type="email"]');
  await email.focus();

  // Check input attributes
  await expect(email).toHaveAttribute('inputMode', 'email');
  await expect(email).toHaveAttribute('autoComplete', 'email');
});

test('event cards single column on mobile', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 667 });
  await page.goto('/events');

  const cards = await page.$$('[data-testid="event-card"]');
  const positions = await Promise.all(cards.map(c => c.boundingBox()));

  // Verify stacked vertically
  expect(positions[0].y).toBeLessThan(positions[1].y);
});
```

---

## Completion Criteria

**Week 4 is DONE when**:
- ✅ All forms have 48px inputs
- ✅ Proper mobile input types (email, tel, url)
- ✅ AutoComplete attributes present
- ✅ Event cards display 1 column on mobile
- ✅ Full-width register buttons
- ✅ All tests passing

**Next**: [WEEK-5-PERFORMANCE.md](./WEEK-5-PERFORMANCE.md)
