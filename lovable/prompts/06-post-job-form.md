# Post Job Form Page - Lovable Prompt

**Create a form page at `/post-job` for users to submit job postings**

---

## What Users See

A clean, professional form where companies/recruiters can:
- Post a new job opening
- Fill in job details (title, description, requirements)
- Set compensation and location
- Choose job type and category
- Preview their posting before submitting
- See confirmation after successful submission

---

## Page Layout

### Hero Section
- Title: "Post a Job"
- Subtitle: "Reach talented developers and AI professionals in Medellín"
- Background: Light/secondary color

### Form Container
- Maximum width: 800px
- Centered on page
- White/card background
- Shadow: card shadow
- Padding: comfortable spacing
- Divided into logical sections

### Form Sections (Progressive)

**Section 1: Company Information**
- Company name (text input, required)
- Company website (URL input, optional)
- Company logo URL (text input, optional)
- About the company (textarea, 2-3 lines, optional)

**Section 2: Job Details**
- Job title (text input, required)
  - Placeholder: "e.g., Senior React Developer"
- Job category (dropdown, required)
  - Options: Engineering, Product, Design, Marketing, Sales, Operations, Other
- Employment type (radio buttons, required)
  - Options: Full-time, Part-time, Contract, Internship
- Remote allowed? (checkbox)
  - Label: "This position allows remote work"

**Section 3: Location & Compensation**
- Location (text input, required)
  - Placeholder: "e.g., Medellín, Colombia"
- Salary range (two number inputs, optional)
  - Min salary: "$___"
  - Max salary: "$___"
  - Currency: Dropdown (USD, COP, EUR)
- Checkbox: "Competitive salary (don't disclose range)"

**Section 4: Job Description**
- Job description (rich textarea, required)
  - Minimum 50 characters
  - Placeholder: "Describe the role, responsibilities, and what makes it exciting..."
  - Height: 200px

**Section 5: Requirements**
- Requirements (rich textarea, required)
  - Placeholder: "List the required skills, experience, and qualifications..."
  - Height: 150px

**Section 6: Responsibilities** (Optional)
- Responsibilities (rich textarea, optional)
  - Placeholder: "What will the person be doing day-to-day?"
  - Height: 150px

**Section 7: Application**
- Application email (email input, required)
  - Placeholder: "jobs@company.com"
  - Where applications should be sent
- Application URL (URL input, optional)
  - Placeholder: "https://company.com/careers/apply"
  - External application link

### Action Buttons
- "Preview Job" (secondary/outline button)
- "Submit Job Posting" (primary button, large)
- "Cancel" (text button, muted)

---

## Form Behavior

### Validation
**Real-time validation as user types:**
- Required fields show error if empty on blur
- Email must be valid format
- URLs must be valid format
- Salary min must be less than salary max
- Character minimums for descriptions

**Error Messages:**
- "This field is required"
- "Please enter a valid email address"
- "Minimum 50 characters required"
- "Max salary must be greater than min salary"

**Visual Feedback:**
- Red border on invalid fields
- Error message below field (red text)
- Green checkmark on valid fields (optional)

### Submit Behavior
**When "Submit Job Posting" clicked:**
1. Validate all required fields
2. If invalid: highlight errors, scroll to first error
3. If valid: show loading state on button ("Submitting...")
4. Create record in `jobs` table
5. On success: show success message + redirect
6. On error: show error toast

**Database Insert:**
```
Insert into jobs table:
- title, description, requirements, responsibilities
- type, category, location
- salary_min, salary_max, salary_currency
- remote_allowed (boolean)
- application_email, application_url
- status = 'pending' (requires admin approval)
- profile_id = current user ID
- created_at = now()

Insert into companies table (if new company):
- name, website, logo_url, description
- Get company_id
- Link to job with company_id
```

### Preview Feature
**When "Preview Job" clicked:**
- Open modal OR navigate to preview page
- Show job as it will appear on job detail page
- Use same layout as job detail page
- "Back to Edit" button
- "Submit" button from preview

---

## Success State

**After Successful Submission:**

**Option 1: Success Message (Recommended)**
- Show success toast: "Job posted successfully! Pending review."
- Redirect to dashboard or jobs list
- Email confirmation sent to application_email

**Option 2: Success Page**
- Hero: "Job Posted Successfully! 🎉"
- Message: "Your job posting is pending review and will be live within 24 hours"
- Next steps:
  - "View All Jobs"
  - "Post Another Job"
  - "Go to Dashboard"

---

## Responsive Design

### Desktop
- Form: 800px max width, centered
- Two-column layout for salary min/max
- Side-by-side buttons

### Tablet
- Form: full width with padding
- Fields: full width
- Buttons: full width, stacked

### Mobile
- Stack all fields vertically
- Larger touch targets
- Buttons: full width
- Sticky "Submit" button at bottom (optional)

---

## Visual Design

### Form Styling
- Input fields: border, rounded corners, padding
- Focus state: border changes to primary color
- Labels: above fields, semibold
- Helper text: below fields, muted, small

### Section Dividers
- Each section separated by horizontal line
- Section headings: medium size, semibold
- Optional: number badges (1, 2, 3, 4) for sections

### Buttons
- Primary button: solid, primary color
- Secondary button: outline, primary color
- Text button: no border, muted color
- Loading state: spinner + "Submitting..."

---

## Field Components

### Text Input
```
Component: Input from shadcn/ui
- Full width
- Border: 1px solid
- Padding: 12px
- Border radius: 8px
- Focus: ring effect
```

### Textarea
```
Component: Textarea from shadcn/ui
- Resizable vertically
- Min height: varies by field
- Font: same as body
```

### Dropdown/Select
```
Component: Select from shadcn/ui
- Custom styled dropdown
- Search if many options
- Clear button
```

### Radio Buttons
```
Component: RadioGroup from shadcn/ui
- Horizontal layout
- Visual selection state
- Large click targets
```

### Checkbox
```
Component: Checkbox from shadcn/ui
- Label clickable
- Visual checked state
```

---

## Validation Rules

| Field | Rule |
|-------|------|
| Company name | Required, 2-100 chars |
| Job title | Required, 5-100 chars |
| Category | Required, must be from list |
| Employment type | Required, must be from list |
| Location | Required, 2-100 chars |
| Description | Required, min 50 chars |
| Requirements | Required, min 20 chars |
| Application email | Required, valid email format |
| Salary min | Optional, positive number |
| Salary max | Optional, must be > min if both provided |

---

## Empty States

**Not logged in:**
- Message: "Please sign in to post a job"
- CTA: "Sign In" button
- Redirect to /auth with return URL

---

## Loading State

**While submitting:**
- Button: disabled, spinner icon
- Text: "Submitting..."
- Form: disabled (can't edit)
- Overlay: subtle (optional)

---

## Error Handling

### Network Error
- Toast: "Failed to submit. Please try again."
- Keep form data (don't clear)
- Re-enable submit button

### Validation Error
- Highlight all invalid fields
- Scroll to first error
- Show count: "Please fix 3 errors"

### Duplicate Job
- Toast: "This job posting already exists"
- Option to edit existing post

---

## Auto-save (Optional)

**Save draft automatically:**
- Store in localStorage every 30 seconds
- On page reload: ask "Resume draft?"
- Clear draft after successful submit

---

## Success Criteria

Before marking complete:
- [ ] All form fields render correctly
- [ ] Required field validation works
- [ ] Email and URL validation works
- [ ] Submitting creates job in database
- [ ] Success message shows after submit
- [ ] Form redirects after success
- [ ] Preview feature works
- [ ] Responsive on mobile/tablet/desktop
- [ ] No TypeScript errors
- [ ] No console errors

---

## Testing

**Test form submission:**
1. Fill all required fields
2. Click "Submit Job Posting"
3. Should create job in `jobs` table
4. Should show success message
5. Should redirect to jobs list or dashboard

**Test validation:**
1. Leave required fields empty → Should show errors
2. Enter invalid email → Should show error
3. Set max salary < min salary → Should show error
4. Enter < 50 chars in description → Should show error

**Test preview:**
1. Fill form partially
2. Click "Preview Job"
3. Should show job as it will appear
4. Click "Back to Edit"
5. Form data should persist

---

## Additional Features (Optional)

### Rich Text Editor
- Use TipTap or similar for description
- Basic formatting: bold, italic, lists
- Preview mode

### Skills Tagging
- Add skill chips (React, Python, etc.)
- Autocomplete from skills list
- Tag input component

### Logo Upload
- Upload company logo (file upload)
- Store in Supabase storage
- Show preview

### Job Expiration
- Date picker: "Job expires on..."
- Auto-close job after expiration date

---

**Priority:** TIER 2 - High Priority
**Estimated Time:** 3-4 hours
**Dependencies:**
- Must connect to `jobs` and `companies` tables
- User must be authenticated to post
- Admin review workflow (status = 'pending')
