# Perk Detail Page - Lovable Prompt

**Create an attractive perks/benefits detail page at `/perks/:id` that showcases the offer**

---

## What Users See

When someone clicks a perk from the perks list, they should see:
- Perk name and provider logo
- What the perk offers
- Monetary value or savings amount
- How to redeem it
- Terms and conditions
- Related perks they might like

---

## Page Layout

### Hero Section
- Perk provider logo (large, centered or left-aligned)
- Perk title (large, bold)
- Category badge (SaaS, Discount, Service, etc.)
- Value highlight box (if applicable)

### Value Highlight (If Applicable)
- Background with accent color
- Large text: "Save up to $500" OR "50% off" OR "Free for 6 months"
- Icon: Gift or Sparkles

### Perk Overview Section
- Heading: "What You Get"
- Description of the perk benefit
- Bullet list of included features
- Visual icons next to benefits

### How to Redeem Section
- Heading: "How to Claim This Perk"
- Step-by-step instructions (numbered list)
- Promo code display (if applicable) with copy button
- Redeem button OR external link

### Provider Information
- About the provider (company description)
- Provider logo
- Industry/category
- Website link
- "Visit Provider Website" button

### Terms and Conditions
- Collapsible section (accordion)
- Heading: "Terms & Conditions"
- List of terms, expiration date, restrictions
- Fine print in smaller text

### Related Perks Section (Bottom)
- Heading: "More Perks You Might Like"
- 3 perk cards in a row
- Same category OR same provider OR popular perks

### Breadcrumb Navigation (Top)
- Show: Home > Perks > [Perk Name]

---

## Components to Use

**From shadcn/ui:**
- Card for main content
- Button for redeem/save actions
- Badge for category
- Accordion for terms and conditions
- Separator for sections

**From our codebase:**
- Use existing card styling
- Match button styles from other pages
- Use perk card component for related perks

**Icons from lucide-react:**
- Gift (value/savings)
- Sparkles (highlight)
- Tag (discount code)
- Check (features included)
- ExternalLink (provider website)
- Copy (copy promo code)
- Bookmark (save perk)
- ArrowRight (redeem action)
- Star (premium perks)

---

## Page Behavior

### When Page Loads
- Show loading skeleton while fetching perk data
- Fade in content when loaded
- If perk not found, show "Perk not found" message
- Check if user already redeemed (show redeemed status)

### Redeem Button Options

**Option 1: Promo Code**
- Display code in special box with dashed border
- "Copy Code" button next to code
- Click copy → Copies to clipboard, shows toast: "Code copied!"
- Main button: "Visit Website" → Opens provider site in new tab

**Option 2: External Link**
- "Redeem Now" button → Opens redemption page in new tab
- Track redemption in database
- Show "Redeemed" badge after clicking

**Option 3: Contact Required**
- "Contact Provider" button
- Opens email client OR shows contact form
- Includes user info in message

### Save Perk Button
- Bookmark icon button
- Click → Icon fills, toast: "Perk saved to your favorites"
- Click again → Icon empties, toast: "Perk removed"
- Save to user's favorite_perks table

### Copy Promo Code
- Click "Copy" button
- Code copies to clipboard
- Button text briefly changes to "Copied!"
- Show checkmark icon briefly
- Toast: "Promo code copied!"

---

## Responsive Design

### Desktop (large screens)
- 2-column layout: Main content (65%), sidebar (35%)
- Sidebar shows: Provider info, how to redeem
- Full-width value highlight box

### Tablet (medium screens)
- Single column layout
- Sidebar content moves below main
- Centered elements

### Mobile (small screens)
- Stack all vertically
- Full-width buttons
- Larger touch targets
- Sticky redeem button at bottom (optional)

---

## Data to Display

Get perk data from the `perks` table:
- name/title
- description
- value_amount (e.g., "$500 savings")
- value_type (discount, free_trial, credits, etc.)
- category (SaaS, Discount, Service, Professional)
- provider_name
- provider_logo_url
- provider_description
- redemption_instructions
- promo_code (if applicable)
- redemption_url (if applicable)
- terms_and_conditions
- expiration_date (if applicable)
- created_at
- status (only show if status = 'active')

Calculate:
- times_redeemed (count from redemptions table)
- user_redeemed (check if current user redeemed)
- user_saved (check if current user saved)

---

## Visual Design

### Colors
- Accent color for value highlight (success green or primary)
- Badge colors by category (different colors)
- Provider brand colors where appropriate
- Muted backgrounds for code display boxes

### Typography
- Perk title: Extra large (3xl or 4xl), bold
- Value amount: Very large (4xl), extra bold
- Section headings: Large (2xl), semibold
- Body text: Regular, good line height
- Promo code: Monospace font, larger size

### Special Elements
- **Promo Code Box:**
  - Dashed border
  - Background color (light accent)
  - Monospace font for code
  - Copy icon button
  - Larger font size

- **Value Highlight:**
  - Colored background (gradient optional)
  - Large bold text
  - Icon (gift or sparkle)
  - Centered or left-aligned

- **Step Numbers:**
  - Circular numbered badges
  - Primary color
  - White text
  - Connected by dotted lines (optional)

---

## Empty States

**Perk Not Found:**
- Icon: Gift X or TagX
- Message: "Perk Not Found"
- Description: "This offer may have expired or been removed"
- Button: "Browse All Perks"

**No Related Perks:**
- Hide section OR show: "No similar perks available"

**Promo Code Not Available:**
- Instead of code box, show: "Contact provider for access"

---

## Loading State

While fetching:
- Skeleton for logo and title
- Shimmer for value highlight box
- Loading boxes for description
- Pulse animation

---

## Promo Code Display Examples

### Example 1: Simple Code
```
┌─────────────────────────────┐
│  MEDELLINSPARK50             │
│  [Copy Code] 📋              │
└─────────────────────────────┘
```

### Example 2: With Instructions
```
Use code at checkout:
┌─────────────────────────────┐
│  STARTUP2025                 │
│  [Copy Code & Visit Site]    │
└─────────────────────────────┘
```

---

## Redemption Flow Examples

### Flow 1: Promo Code Type
1. User sees promo code
2. Clicks "Copy Code"
3. Code copies to clipboard
4. Clicks "Visit Website" button
5. Opens provider site in new tab
6. User pastes code at checkout

### Flow 2: Direct Link Type
1. User clicks "Redeem Now"
2. Opens redemption URL in new tab
3. User gets automatic discount
4. Perk marked as redeemed

### Flow 3: Contact Type
1. User clicks "Contact Provider"
2. Opens email with pre-filled message
3. User sends request
4. Provider responds with access

---

## Success Criteria

Before marking complete:
- [ ] Page loads perk data from database
- [ ] All perk details display correctly
- [ ] Value amount highlighted prominently
- [ ] Promo code (if any) displays correctly
- [ ] Copy code button works
- [ ] Redeem button/link works
- [ ] Save button toggles correctly
- [ ] Terms & conditions accordion works
- [ ] Related perks section displays
- [ ] Breadcrumb navigation works
- [ ] Responsive on mobile/tablet/desktop
- [ ] Loading state shows appropriately
- [ ] 404 state for missing perks
- [ ] No TypeScript errors
- [ ] No console errors
- [ ] Redemption tracking works (if implemented)

---

## Testing

**Test with real perk:**
1. Navigate to `/perks`
2. Click any perk card
3. Should go to `/perks/[perk-id]`
4. Verify all data displays
5. If promo code exists → Test copy button
6. Click "Redeem" or "Visit Website" → Opens correctly
7. Click "Save Perk" → Saves and fills icon
8. Test accordion → Terms expand/collapse
9. Test on mobile → Layout stacks correctly

**Test edge cases:**
1. Visit `/perks/invalid-id` → Show 404 state
2. Perk with no promo code → Show contact/link only
3. Expired perk → Show expiration notice
4. Already redeemed → Show "Redeemed" badge
5. External link opens in new tab

---

## Additional Features (Optional)

### Redemption Tracking
- Track when user redeems
- Store in `perk_redemptions` table
- Show redemption date badge
- Prevent multiple redemptions if needed

### Favorites
- Heart icon instead of bookmark
- Add to user's favorites
- Show on user's dashboard

### Social Sharing
- Share buttons for WhatsApp, LinkedIn
- Share message: "Check out this perk: [title]"

---

**Priority:** TIER 1 - Critical for MVP
**Estimated Time:** 2-3 hours
**Dependencies:** Perks list page should link to this page
