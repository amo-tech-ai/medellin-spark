# Event Detail Page - Lovable Prompt

**Create a beautiful event detail page at `/events/:id` that shows all event information**

---

## What Users See

When someone clicks an event from the events list, they should see:
- Event banner image or photo
- Event title (large, prominent)
- When and where the event happens
- Full event description
- Who's organizing it
- A button to register/RSVP
- Similar upcoming events

---

## Page Layout

### Hero Section (Top of Page)
- Large banner image spanning full width (if event has image)
- Event title overlaid on image OR below image
- Gradient overlay on image for text readability

### Event Details Card
- **Date and Time** with Calendar icon - Show day, date, time (e.g., "Wednesday, Jan 24, 2025 at 6:00 PM")
- **Location** with MapPin icon - Show venue name and address (e.g., "Ruta N, Calle 67")
- **Event Type Badge** - Workshop, Networking, Talk, etc.
- **Capacity** - Show spots available (e.g., "45 / 50 spots filled")

### Description Section
- Full event description with proper formatting
- Paragraph breaks maintained
- Links clickable
- Bullet points if included

### Organizer Section
- Organizer name with avatar/logo
- Brief bio or company description
- "View Profile" link

### Action Buttons
- **Primary:** "Register for Event" (large, prominent, primary color)
- **Secondary:** "Save Event" (outline style, bookmark icon)
- **Share buttons** - WhatsApp, LinkedIn, Twitter icons

### Related Events Section (Bottom)
- Heading: "You Might Also Like"
- 3 event cards in a row (similar to events list page)
- Same organizer OR same category OR upcoming events

### Breadcrumb Navigation (Top)
- Show: Home > Events > [Event Title]
- Clickable links back to previous pages

---

## Components to Use

**From shadcn/ui:**
- Card for main content area
- Button for register/save actions
- Badge for event type
- Separator for dividing sections

**From our codebase:**
- Use the same card styling as events list page
- Match button styles from other pages
- Use existing color scheme

**Icons from lucide-react:**
- Calendar (date/time)
- MapPin (location)
- Users (capacity/attendees)
- Bookmark (save event)
- Share2 (sharing)
- ArrowLeft (back button)

---

## Page Behavior

### When Page Loads
- Show loading skeleton while fetching event data
- Fade in content when loaded
- If event not found, show "Event not found" message with "Back to Events" button

### Register Button
- Click "Register for Event" → Show success toast: "Successfully registered!"
- Button text changes to "Registered" and becomes disabled
- Update capacity count
- Add event to user's calendar (optional)

### Save Button
- Click bookmark icon → Icon fills in, shows toast: "Event saved"
- Click again → Icon empties, shows toast: "Event removed from saved"
- Save to user's saved events list

### Share Buttons
- Click WhatsApp → Open WhatsApp share with event link
- Click LinkedIn → Open LinkedIn share dialog
- Click Twitter → Open Twitter share with event title and link

---

## Responsive Design

### Desktop (large screens)
- 2-column layout: Event details on left (60%), sidebar on right (40%)
- Sidebar shows: Organizer info, similar events
- Full-width banner image

### Tablet (medium screens)
- Single column layout
- Wider content area
- Sidebar moves below main content

### Mobile (small screens)
- Stack all sections vertically
- Full-width elements
- Larger touch targets for buttons
- Sticky register button at bottom of screen

---

## Data to Display

Get event data from the `events` table with these fields:
- title
- description
- event_date
- event_time
- location
- venue_name
- capacity
- registered_count
- event_type
- image_url
- organizer_id

Join with:
- `profiles` or `companies` table for organizer info

---

## Visual Design

### Colors
- Use primary color for register button
- Muted colors for secondary information
- Background should be light/white
- Card shadows for depth

### Typography
- Event title: Large (3xl or 4xl), bold
- Section headings: Medium (xl or 2xl), bold
- Body text: Regular size, good line height
- Dates/times: Slightly larger, medium weight

### Spacing
- Generous white space around sections
- Clear visual hierarchy
- Comfortable reading width for description
- Consistent padding in cards

### Images
- Banner image aspect ratio 16:9 or 21:9
- Cover entire width
- Fallback gradient if no image
- Rounded corners on avatar images

---

## Empty States

**Event Not Found:**
- Icon: SearchX or CalendarX
- Message: "Event Not Found"
- Description: "This event may have been removed or the link is incorrect"
- Button: "Browse All Events"

**No Similar Events:**
- Don't show the section
- OR show message: "No similar events at this time"

---

## Loading State

While fetching event data:
- Show skeleton loader for banner image
- Shimmer effect for title area
- Loading boxes for details cards
- Pulse animation on entire layout

---

## Success Criteria

Before marking complete:
- [ ] Page loads event data from database
- [ ] All event information displays correctly
- [ ] Banner image shows (or fallback gradient)
- [ ] Register button works
- [ ] Save button toggles correctly
- [ ] Share buttons open share dialogs
- [ ] Similar events section displays
- [ ] Breadcrumb navigation works
- [ ] Responsive on mobile/tablet/desktop
- [ ] Loading state shows while fetching
- [ ] 404 state shows for missing events
- [ ] No TypeScript errors
- [ ] No console errors

---

## Testing

**Test with real event:**
1. Navigate to `/events`
2. Click any event card
3. Should navigate to `/events/[event-id]`
4. Verify all data displays
5. Test register button
6. Test save button
7. Test share buttons
8. Test on mobile device

**Test edge cases:**
1. Visit `/events/fake-id-123` → Should show 404 state
2. Test with event that has no image → Should show fallback
3. Test with fully booked event → Register button should indicate full

---

**Priority:** TIER 1 - Critical for MVP
**Estimated Time:** 2-3 hours
**Dependencies:** Events list page should link to this page
