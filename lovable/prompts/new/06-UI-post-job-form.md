# Post Job Form - UI Design Only

**Create a multi-section job posting form at `/post-job` with clean layout**

**IMPORTANT:** This prompt is for UI design only. Do NOT add form submission logic, database inserts, or validation code. Focus on visual structure.

---

## What to Build

A job posting form with:
- Company information section
- Job details section
- Compensation section
- Description textarea
- Requirements and responsibilities
- Preview button (visual only)
- Submit button (visual only)

---

## Page Layout

### Page Header

- Title: "Post a Job" (text-3xl, font-bold)
- Subtitle: "Share your opportunity with the Medellín startup community"
- Container: max-w-3xl, centered

---

## Form Structure

**Container:**
- Max width: 3xl
- Centered
- Card component
- Padding: p-8

**Form Sections (Progressive):**

---

### Section 1: Company Information

**Heading:** "Company Information"

**Fields:**

1. **Company Name** (required)
   - Label: "Company Name"
   - Input: text
   - Placeholder: "e.g. TechCorp AI"
   - Required indicator: red asterisk

2. **Company Website** (optional)
   - Label: "Website"
   - Input: url
   - Placeholder: "https://example.com"

3. **Company Logo** (optional)
   - Label: "Company Logo URL"
   - Input: url
   - Placeholder: "https://example.com/logo.png"
   - Help text: "Optional: Link to your company logo"

4. **Company Description**
   - Label: "About Your Company"
   - Textarea: 3 rows
   - Placeholder: "Brief description of your company..."
   - Max length hint: "150 characters"

**Separator**

---

### Section 2: Job Details

**Heading:** "Job Details"

**Fields:**

1. **Job Title** (required)
   - Label: "Job Title"
   - Input: text
   - Placeholder: "e.g. Senior AI Engineer"

2. **Category** (required)
   - Label: "Job Category"
   - Select dropdown
   - Options: Engineering, Product, Design, Marketing, Sales, Operations, Other

3. **Employment Type** (required)
   - Label: "Employment Type"
   - Select dropdown
   - Options: Full-time, Part-time, Contract, Internship

4. **Remote Work** (required)
   - Label: "Remote Work"
   - RadioGroup:
     - Remote
     - Hybrid
     - On-site only

5. **Location** (required)
   - Label: "Location"
   - Input: text
   - Placeholder: "e.g. Medellín, Colombia"

**Separator**

---

### Section 3: Compensation

**Heading:** "Compensation"

**Fields:**

1. **Salary Range Disclosure** (required)
   - RadioGroup:
     - Display salary range
     - Competitive salary (don't show range)

2. **Minimum Salary** (conditional - only if showing range)
   - Label: "Minimum Salary (USD)"
   - Input: number
   - Placeholder: "80000"

3. **Maximum Salary** (conditional - only if showing range)
   - Label: "Maximum Salary (USD)"
   - Input: number
   - Placeholder: "120000"

4. **Benefits**
   - Label: "Benefits"
   - Textarea: 3 rows
   - Placeholder: "e.g. Health insurance, equity, remote work, flexible hours..."

**Separator**

---

### Section 4: Job Description

**Heading:** "Job Description"

**Field:**

1. **Description** (required)
   - Label: "Job Description"
   - Textarea: 8 rows
   - Placeholder: "Describe the role, responsibilities, and what makes this opportunity exciting..."
   - Help text: "Supports markdown formatting"

**Separator**

---

### Section 5: Requirements

**Heading:** "Requirements & Qualifications"

**Fields:**

1. **Requirements** (required)
   - Label: "Requirements"
   - Textarea: 5 rows
   - Placeholder: "List required skills and qualifications (one per line)..."
   - Help text: "Enter each requirement on a new line"

2. **Nice to Have**
   - Label: "Nice to Have"
   - Textarea: 3 rows
   - Placeholder: "Optional qualifications or bonus skills..."

**Separator**

---

### Section 6: Application Details

**Heading:** "How to Apply"

**Fields:**

1. **Application Method** (required)
   - RadioGroup:
     - Email applications
     - External URL
     - Apply through platform (default)

2. **Application Email** (conditional - only if email selected)
   - Label: "Application Email"
   - Input: email
   - Placeholder: "jobs@company.com"

3. **Application URL** (conditional - only if external URL selected)
   - Label: "Application URL"
   - Input: url
   - Placeholder: "https://company.com/careers/apply"

---

## Form Actions (Bottom)

**Button Row:**
- Flex layout, gap-4
- Right-aligned (justify-end)

**Buttons:**

1. **Preview Button**
   - Variant: outline
   - Text: "Preview"
   - Icon: Eye
   - Visual only (no actual preview)

2. **Submit Button**
   - Variant: default (primary)
   - Text: "Submit Job Posting"
   - Icon: Send
   - Visual only (no actual submission)

---

## Components to Use

**From shadcn/ui:**
- Card (form container)
- Label (field labels)
- Input (text inputs)
- Textarea (long text inputs)
- Select (dropdowns)
- RadioGroup (radio buttons)
- Button (actions)
- Separator (section dividers)

**Icons from lucide-react:**
- Building2 (company section)
- Briefcase (job details section)
- DollarSign (compensation section)
- FileText (description section)
- CheckSquare (requirements section)
- Send (submit button)
- Eye (preview button)

---

## Responsive Design

### Desktop (> 768px)
- Form width: max-w-3xl
- Two-column grid for some fields (if appropriate)
- Side-by-side buttons

### Mobile (< 768px)
- Full-width form
- Single column for all fields
- Stacked buttons (full width each)

---

## Styling Guidelines

### Colors
- Primary for submit button
- Muted labels and help text
- Border colors for inputs
- Section headings bold

### Typography
- Page title: text-3xl, font-bold
- Section headings: text-xl, font-semibold
- Labels: text-sm, font-medium
- Help text: text-xs, text-muted-foreground
- Placeholders: text-muted-foreground

### Spacing
- Section spacing: space-y-8
- Field spacing: space-y-4
- Label to input: gap-2
- Card padding: p-8
- Form header mb-8

### Visual Elements
- Required asterisks in red
- Help text below inputs
- Separators between sections
- Card shadow
- Input focus rings

---

## Conditional Fields

**Show salary inputs only when "Display salary range" selected:**
- Min/Max salary inputs appear
- "Competitive salary" hides them

**Show application email/URL based on selection:**
- Email method → show email input
- External URL → show URL input
- Platform → no additional input

Use simple state toggle (visual only, no complex logic)

---

## Form Validation (Visual Only)

**Show visual indicators:**
- Required fields have red asterisk
- Empty required fields could show red border on blur
- Success state shows green checkmark
- Just visual feedback, no actual validation

---

## What NOT to Include

❌ Don't add:
- Form submission handler
- Database inserts
- Real validation logic
- File upload functionality
- Rich text editor integration
- Authentication checks
- Email sending
- Success/error modals

✅ Do add:
- Beautiful form layout
- All input fields
- Section organization
- Visual required indicators
- Conditional field visibility (simple)
- Placeholder text
- Help text
- Responsive design

---

## Success Checklist

- [ ] Page loads at `/post-job`
- [ ] Form renders in card
- [ ] All 6 sections display
- [ ] All fields render correctly
- [ ] Required asterisks show
- [ ] Help text displays
- [ ] Dropdowns work
- [ ] Radio groups work
- [ ] Conditional fields show/hide
- [ ] Textareas resize properly
- [ ] Preview and Submit buttons styled
- [ ] Separators between sections
- [ ] Responsive layout works
- [ ] No console errors
- [ ] Form looks professional

---

**Priority:** TIER 3 - Form Page
**Estimated Time:** 2-3 hours
**Focus:** UI design and form structure with visual-only interactions
