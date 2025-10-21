# Perk Detail Page - UI Design Only

**Create an attractive perks/benefits detail page at `/perks/:id` with beautiful layout and mock data**

**IMPORTANT:** This prompt is for UI design only. Do NOT add database queries, Supabase code, or data fetching logic. Use mock/hardcoded data.

---

## What to Build

A compelling perks page that displays:
- Provider logo and perk title
- Value/savings highlight
- Benefits description
- Promo code display
- Redemption instructions
- Provider information
- Related perks section

---

## Page Layout Structure

### Breadcrumb
```
Home > Perks > 50% Off AWS Credits
```

---

### Hero Section: Perk Header

**Provider Logo:**
- Centered or left-aligned
- Size: 80x80px, rounded
- Border: subtle border

**Perk Title:**
- Large heading (text-3xl, font-bold)
- Example: "50% Off AWS Credits for Startups"

**Category Badge:**
- Badge component
- Examples: "Cloud Services", "SaaS Discount", "Free Tool"

---

### Value Highlight Box (If Applicable)

**Visual Design:**
- Prominent card with accent background
- Icon: Gift or Sparkles (large)
- Gradient or solid accent color
- Centered text

**Content:**
- Large value text: "Save up to $5,000"
- OR: "50% off for 12 months"
- OR: "Free for 6 months"
- Subtitle: "For qualified startups"

---

### Main Content Area (Left 65%)

**What You Get Section:**
- Heading: "What You Get"
- Description paragraph (2-3 lines)
- Bullet list with check icons:
  - ✓ $5,000 in AWS credits
  - ✓ Valid for 12 months
  - ✓ Access to startup support program
  - ✓ Free training resources

**How It Works Section:**
- Heading: "How to Claim This Perk"
- Numbered steps:
  1. Click "Copy Code" below
  2. Visit AWS Activate website
  3. Create account or sign in
  4. Enter promo code during signup
  5. Enjoy your benefits!

**Terms & Conditions:**
- Accordion component (collapsible)
- Heading: "Terms & Conditions"
- List of terms in small text:
  - Available to startups less than 2 years old
  - One redemption per company
  - Valid until December 31, 2025
  - Subject to AWS Terms of Service

---

### Sidebar (Right 35%)

**Promo Code Card:**
- Prominent card with dashed border
- Large promo code: "STARTUP2025"
- "Copy Code" button (full width, primary)
- On click: Button text changes to "Copied ✓"

**Separator**

**Provider Information Card:**
- Provider logo
- Provider name: "Amazon Web Services"
- Industry: "Cloud Computing"
- Description (2 lines)
- "Visit Provider" button (outline, ExternalLink icon)

**Separator**

**Perk Stats:**
- Users icon + "127 startups claimed"
- Star icon + "Featured perk"
- Calendar icon + "Expires Dec 31, 2025"

**Separator**

**Action Buttons:**
- "Claim Perk" (primary, large, full width)
- "Save for Later" (outline, Bookmark icon, full width)

---

### Related Perks Section (Bottom)

**Heading:** "More Perks You Might Like"

**Grid:** 3 perk cards (responsive)

**Each Card Shows:**
- Provider logo
- Perk title
- Value/savings (if applicable)
- Category badge
- "Claim" button

---

## Mock Data to Use

### Main Perk
```
Title: 50% Off AWS Credits for Startups
Provider: Amazon Web Services
Logo: Use placeholder or cloud icon
Category: Cloud Services
Value: Save up to $5,000
Expiration: December 31, 2025

Description:
"Get 50% off AWS credits to help your startup scale infrastructure. Perfect for early-stage companies building cloud-based applications."

What You Get:
- $5,000 in AWS credits over 12 months
- Access to AWS startup support program
- Free training and documentation
- Technical support resources
- Community forum access

How to Claim:
1. Click "Copy Code" below
2. Visit aws.amazon.com/activate
3. Create your AWS account or sign in
4. Enter promo code: STARTUP2025
5. Start using your credits immediately

Promo Code: STARTUP2025

Terms:
- Available to startups incorporated less than 2 years ago
- One redemption per company
- Credits expire 12 months from activation
- Subject to AWS Terms of Service
- Cannot be combined with other offers

Stats:
- 127 startups claimed
- Featured perk
- Expires: Dec 31, 2025
```

### Related Perks (3 cards)
```
Perk 1:
- Title: "Free Stripe Processing Fees"
- Provider: Stripe
- Value: Save $2,000
- Category: Payments

Perk 2:
- Title: "50% Off SendGrid Email"
- Provider: SendGrid
- Value: $500 credit
- Category: Email Services

Perk 3:
- Title: "Free Notion Team Plan"
- Provider: Notion
- Value: 6 months free
- Category: Productivity
```

---

## Components to Use

**From shadcn/ui:**
- Card (provider info, promo code)
- Button (claim, copy code, save)
- Badge (category, featured)
- Accordion (terms & conditions)
- Separator (dividers)

**Icons from lucide-react:**
- Gift or Sparkles (value highlight)
- Tag (promo code)
- Check (benefits list)
- Copy (copy code button)
- Bookmark (save for later)
- ExternalLink (visit provider)
- Users (claims count)
- Star (featured)
- Calendar (expiration)

---

## Responsive Design

### Desktop (> 1024px)
- 2-column layout (65% main, 35% sidebar)
- Full-width value highlight
- 3-column related perks

### Tablet (640px - 1024px)
- Single column
- Sidebar below main content
- 2-column related perks

### Mobile (< 640px)
- Stack vertically
- Full-width elements
- 1-column related perks
- Sticky "Claim Perk" button

---

## Styling Guidelines

### Colors
- Accent background for value highlight
- Primary for "Claim Perk" button
- Success for "Copied" state
- Dashed border for promo code box

### Typography
- Perk title: text-3xl, font-bold
- Value text: text-4xl, font-bold
- Section headings: text-2xl, font-semibold
- Body text: leading-relaxed
- Promo code: text-2xl, font-mono

### Spacing
- Value box: p-8, mb-8
- Section spacing: space-y-6
- Card padding: p-6
- Generous whitespace

### Visual Effects
- Value box: gradient or solid accent
- Promo code box: dashed-2 border
- Copy button success state
- Card shadows throughout

---

## Interactive States (Visual Only)

### Copy Code Button
- Default: "Copy Code"
- On click: "Copied ✓" (green checkmark)
- Auto-revert after 2 seconds

### Claim Perk Button
- Default: "Claim Perk"
- On click: "Claimed ✓" (disabled, green)

### Save for Later Button
- Toggle bookmark fill/outline
- Toast message: "Saved to favorites"

---

## What NOT to Include

❌ Don't add:
- Database queries
- Clipboard copy functionality (just show visual change)
- Real redemption tracking
- Authentication checks
- Actual promo code validation

✅ Do add:
- Beautiful layout
- Mock perk data
- Visual button states
- Responsive design
- Related perks with mock data
- Accordion for terms

---

## Success Checklist

- [ ] Page loads at `/perks/:id`
- [ ] Provider logo and title display
- [ ] Value highlight box prominent
- [ ] Benefits list renders
- [ ] Promo code displays
- [ ] Copy button shows state change
- [ ] Terms accordion works
- [ ] Provider card displays
- [ ] Action buttons styled
- [ ] Related perks section (3 cards)
- [ ] Responsive layout works
- [ ] No console errors
- [ ] Matches design system

---

**Priority:** TIER 1 - Critical Detail Page
**Estimated Time:** 2-3 hours
**Focus:** UI design and layout with mock data only
