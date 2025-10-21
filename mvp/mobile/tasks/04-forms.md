# Week 4: Forms and Events Mobile

**Goal**: Forms work perfectly on mobile, events display correctly
**Time**: 1 week (3 days fundamentals + 2 days advanced)

---

## Fundamentals

### Task 1: Mobile-Optimized Form Fields

**What**: Make all form inputs mobile-friendly (prevent zoom, correct keyboards)

**Files**: All form components (`StartupProfile.tsx`, event forms, etc.)

**Steps**:
1. Set minimum font size to 16px (prevents iOS zoom)
2. Use correct input types for mobile keyboards
3. Ensure 48px minimum height for touch

**Update all form fields**:
```typescript
<input
  type="email"           // Shows @ key on mobile keyboard
  inputMode="email"      // Optimizes keyboard layout
  autoComplete="email"   // Enables autofill
  className="
    h-12                 // 48px minimum (iOS requirement)
    px-4
    text-base            // 16px - prevents iOS zoom on focus
    border border-gray-300 rounded-lg
    w-full
  "
/>
```

**Input types for mobile**:
```typescript
// Email field
<input type="email" inputMode="email" />

// Phone number
<input type="tel" inputMode="tel" />

// Numeric only (e.g., funding amount)
<input type="text" inputMode="numeric" />

// URL
<input type="url" inputMode="url" />

// Date
<input type="date" />

// Text area
<textarea
  className="
    min-h-[120px]         // 5 lines × 24px
    p-4
    text-base
    border rounded-lg
    w-full
  "
/>
```

**Success Criteria**:
- ✅ All inputs are minimum 48px tall
- ✅ Font size is minimum 16px
- ✅ Correct keyboard appears for each input type
- ✅ No page zoom when focusing inputs on iOS
- ✅ Autofill suggestions work (email, name, phone)
- ✅ Inputs are full-width on mobile

**Test**:
```bash
# iOS Safari: Tap email field
# Expected: Email keyboard with @ appears, no zoom
# Tap phone field → Phone keyboard appears
# Tap numeric field → Number keyboard appears
```

---

### Task 2: Form Layout Mobile-First

**What**: Stack form fields vertically on mobile, side-by-side on desktop

**File**: `src/pages/StartupProfile.tsx` (example)

**Steps**:
1. Use grid with responsive columns
2. Add proper spacing
3. Full-width buttons on mobile

**Update form layout**:
```typescript
<form className="space-y-6 max-w-3xl mx-auto px-4 md:px-6">
  {/* Single column on mobile, two columns on desktop */}
  <div className="
    grid
    grid-cols-1              // Mobile: 1 column
    md:grid-cols-2           // Desktop: 2 columns
    gap-4
  ">
    <div>
      <label className="block text-sm font-medium mb-2">
        Company Name
      </label>
      <input type="text" className="..." />
    </div>

    <div>
      <label className="block text-sm font-medium mb-2">
        Industry
      </label>
      <input type="text" className="..." />
    </div>
  </div>

  {/* Full-width fields */}
  <div>
    <label className="block text-sm font-medium mb-2">
      Description
    </label>
    <textarea className="..." />
  </div>

  {/* Full-width submit button on mobile */}
  <button
    type="submit"
    className="
      w-full                    // Mobile: full width
      md:w-auto md:px-8         // Desktop: auto width
      h-12
      bg-primary text-white
      rounded-lg font-semibold
      active:scale-[0.98]
      transition-all
    "
  >
    Save Profile
  </button>
</form>
```

**Success Criteria**:
- ✅ Fields stack vertically on mobile (< 768px)
- ✅ Fields display 2 columns on desktop (≥ 768px)
- ✅ Labels are clearly visible
- ✅ Submit button is full-width on mobile
- ✅ Form is comfortable to fill on mobile
- ✅ No horizontal scrolling

**Test**:
```bash
# Resize to 375px → All fields stack vertically
# Submit button should be full-width
# Resize to 1024px → Fields in 2 columns
```

---

### Task 3: Responsive Event Cards

**What**: Make event cards work on mobile (1 column instead of grid)

**File**: `src/pages/DashboardEvents.tsx`

**Steps**:
1. Change grid to responsive
2. Optimize card content for mobile
3. Ensure touch targets are 48px+

**Update events grid**:
```typescript
<div className="
  grid
  grid-cols-1              // Mobile: 1 column
  md:grid-cols-2           // Tablet: 2 columns
  lg:grid-cols-3           // Desktop: 3 columns
  gap-4
  px-4 md:px-6
">
  {events.map(event => (
    <Link
      key={event.id}
      to={`/events/${event.id}`}
      className="
        block
        p-4 md:p-6
        bg-white
        rounded-lg
        border border-gray-200
        hover:shadow-lg
        active:scale-[0.98]
        transition-all
        min-h-[140px]           // Ensures touch target
      "
    >
      {/* Event details */}
      <h3 className="text-lg font-semibold mb-2">
        {event.title}
      </h3>
      <p className="text-sm text-gray-600 mb-3">
        {event.date}
      </p>
      <div className="flex items-center justify-between">
        <span className={`
          px-3 py-1
          text-xs font-medium rounded-full
          ${event.status === 'upcoming' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100'}
        `}>
          {event.status}
        </span>
        <span className="text-sm text-gray-500">
          {event.attendees} attendees
        </span>
      </div>
    </Link>
  ))}
</div>
```

**Success Criteria**:
- ✅ Cards display 1 column on mobile
- ✅ Cards are minimum 140px tall
- ✅ Card content is readable without zoom
- ✅ Status badges are visible
- ✅ Tap feedback works (scale animation)
- ✅ No horizontal scrolling

**Test**:
```bash
# Mobile view → Cards stack vertically
# Tap card → Should see scale effect
# All text should be readable
```

---

## Fundamentals Summary

**What you built**:
- ✅ Mobile-optimized form fields (48px height, 16px font)
- ✅ Responsive form layouts (1 column → 2 columns)
- ✅ Responsive event cards (1 column → 3 columns)

**Success Check**:
- [ ] Forms work on mobile without zoom
- [ ] Correct keyboard appears for each field type
- [ ] Event cards are easy to tap
- [ ] All layouts responsive

**Time**: ~3 days

---

## Advanced Features (Optional)

### Advanced 1: Form Validation Feedback

**What**: Show inline validation errors with mobile-friendly styling

**When to use**: All forms (improves UX)

**Code**:
```typescript
import { useState } from 'react';

function FormField({ label, error, ...props }: Props) {
  return (
    <div>
      <label className="block text-sm font-medium mb-2">
        {label}
      </label>
      <input
        {...props}
        className={`
          h-12 px-4 text-base border rounded-lg w-full
          ${error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'}
        `}
      />
      {error && (
        <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
          <AlertCircle className="h-4 w-4" />
          {error}
        </p>
      )}
    </div>
  );
}

// Usage
const [errors, setErrors] = useState<Record<string, string>>({});

const validateForm = () => {
  const newErrors: Record<string, string> = {};

  if (!email.includes('@')) {
    newErrors.email = 'Please enter a valid email';
  }

  if (phone.length < 10) {
    newErrors.phone = 'Phone must be at least 10 digits';
  }

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};

<FormField
  label="Email"
  type="email"
  value={email}
  error={errors.email}
  onChange={(e) => setEmail(e.target.value)}
/>
```

**Success Criteria**:
- ✅ Errors appear immediately below field
- ✅ Red border highlights invalid fields
- ✅ Error messages are clear and actionable
- ✅ Errors clear when field is corrected
- ✅ Icon makes errors noticeable

**Time**: +4 hours

---

### Advanced 2: Date/Time Picker Mobile

**What**: Use native date picker on mobile, custom picker on desktop

**When to use**: Event creation/editing forms

**Code**:
```typescript
import { Calendar } from 'lucide-react';
import { useState } from 'react';

function DatePicker({ value, onChange }: Props) {
  const [showPicker, setShowPicker] = useState(false);
  const isMobile = window.innerWidth < 768;

  if (isMobile) {
    // Native mobile picker
    return (
      <input
        type="datetime-local"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-12 px-4 text-base border rounded-lg w-full"
      />
    );
  }

  // Custom desktop picker (shadcn calendar)
  return (
    <div className="relative">
      <button
        onClick={() => setShowPicker(!showPicker)}
        className="
          h-12 px-4 text-base border rounded-lg w-full
          flex items-center justify-between
        "
      >
        <span>{value || 'Select date'}</span>
        <Calendar className="h-5 w-5" />
      </button>
      {showPicker && (
        <div className="absolute top-full left-0 mt-2 z-50">
          {/* shadcn Calendar component */}
        </div>
      )}
    </div>
  );
}
```

**Success Criteria**:
- ✅ Mobile uses native datetime picker
- ✅ Desktop uses custom calendar UI
- ✅ Selected date displays clearly
- ✅ Time zone handling is correct

**Time**: +5 hours

---

### Advanced 3: Multi-Step Forms

**What**: Break long forms into steps with progress indicator

**When to use**: Forms with 8+ fields

**Code**:
```typescript
import { useState } from 'react';

function MultiStepForm() {
  const [step, setStep] = useState(1);
  const totalSteps = 3;

  const progress = (step / totalSteps) * 100;

  return (
    <div className="max-w-3xl mx-auto px-4">
      {/* Progress */}
      <div className="mb-6">
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-primary transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-sm text-gray-600 mt-2">
          Step {step} of {totalSteps}
        </p>
      </div>

      {/* Step content */}
      {step === 1 && <Step1Fields />}
      {step === 2 && <Step2Fields />}
      {step === 3 && <Step3Fields />}

      {/* Navigation */}
      <div className="flex gap-3 mt-6">
        {step > 1 && (
          <button
            onClick={() => setStep(step - 1)}
            className="
              flex-1 h-12
              border border-gray-300 rounded-lg
            "
          >
            Back
          </button>
        )}
        <button
          onClick={() => step < totalSteps ? setStep(step + 1) : handleSubmit()}
          className="
            flex-1 h-12
            bg-primary text-white rounded-lg
          "
        >
          {step < totalSteps ? 'Next' : 'Submit'}
        </button>
      </div>
    </div>
  );
}
```

**Success Criteria**:
- ✅ Progress bar shows completion
- ✅ Back/Next buttons work
- ✅ Form data persists between steps
- ✅ Final step submits form
- ✅ Validation per step

**Time**: +6 hours

---

### Advanced 4: File Upload Mobile

**What**: Optimize file upload for mobile (camera access)

**When to use**: If users need to upload images/documents

**Code**:
```typescript
import { Upload, Camera } from 'lucide-react';

function FileUpload() {
  const [file, setFile] = useState<File | null>(null);

  return (
    <div>
      <input
        type="file"
        id="file-upload"
        accept="image/*"
        capture="environment"     // Opens camera on mobile
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        className="hidden"
      />

      <label
        htmlFor="file-upload"
        className="
          flex items-center justify-center gap-2
          h-32 w-full
          border-2 border-dashed border-gray-300
          rounded-lg
          cursor-pointer
          hover:border-primary
          active:scale-[0.98]
        "
      >
        {file ? (
          <span className="text-sm">{file.name}</span>
        ) : (
          <>
            <Upload className="h-6 w-6" />
            <span>Tap to upload or take photo</span>
          </>
        )}
      </label>
    </div>
  );
}
```

**Success Criteria**:
- ✅ Opens camera on mobile
- ✅ Shows file browser on desktop
- ✅ Displays selected file name
- ✅ Touch target is large (132px height)
- ✅ Visual feedback on tap

**Time**: +3 hours

---

## Advanced Summary

**What's available**:
- ⬜ Form validation feedback (+4h) - **Recommended**
- ⬜ Mobile date picker (+5h)
- ⬜ Multi-step forms (+6h)
- ⬜ File upload mobile (+3h)

**When to add**:
- Add validation (recommended - improves UX)
- Add date picker if creating events
- Add multi-step if forms are very long
- Add file upload if needed

**Total advanced time**: +18 hours (optional)

---

## Week 4 Complete

**Fundamentals**: ✅ Forms and events work on mobile
**Next**: Week 5 - Performance Optimization

**Diagram**:
```
Form Layout Responsive Pattern:

Mobile (< 768px)          Desktop (≥ 768px)
┌─────────────────┐       ┌──────────┬──────────┐
│  Company Name   │       │ Company  │ Industry │
│  [___________ ] │       │ [______] │ [______] │
├─────────────────┤       ├──────────┴──────────┤
│  Industry       │       │  Description        │
│  [___________ ] │       │  [________________] │
├─────────────────┤       │  [________________] │
│  Description    │       ├─────────────────────┤
│  [___________ ] │       │      [Submit]       │
│  [___________ ] │       └─────────────────────┘
├─────────────────┤
│  [Submit]       │       1 column → 2 columns
└─────────────────┘
```
