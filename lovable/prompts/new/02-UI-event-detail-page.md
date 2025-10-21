# Event Detail Page - UI Design Only

**Create an engaging event detail page at `/events/:id` with beautiful layout and mock data**

**IMPORTANT:** This prompt is for UI design only. Do NOT add database queries, Supabase code, or data fetching logic. Use mock/hardcoded data.

---

## What to Build

An attractive event page that displays:
- Event banner image with title
- Date, time, and location
- Event description
- Organizer information
- Registration button
- Similar events section

---

## Page Layout Structure

### Breadcrumb (Top)
```
Home > Events > AI Startup Networking Night
```

---

### Hero Section: Event Banner

**Banner Image:**
- Full-width container (max-w-5xl)
- Height: 300-400px
- Background: Gradient or placeholder image
- Rounded corners: rounded-xl
- Overlay: Dark gradient for text readability

**Text Over Banner:**
- Event title (text-4xl, font-bold, text-white)
- Event category badge (Badge, top-left corner)
- Example: "Networking", "Workshop", "Conference"

---

### Event Details Card (Below Banner)

**Card Layout:**
Large Card component with grid layout (3 columns on desktop)

**Column 1: Date & Time**
- Icon: Calendar (large)
- Date: "February 15, 2025"
- Day: "Thursday"
- Time: "6:00 PM - 9:00 PM"

**Column 2: Location**
- Icon: MapPin (large)
- Venue name: "WeWork Poblado"
- Address: "Calle 7 #43A-99, El Poblado"
- City: "Medellín, Colombia"

**Column 3: Capacity**
- Icon: Users (large)
- Registered: "32 of 50 spots filled"
- Progress bar showing 64% full
- Text: "18 spots left"

---

### Main Content Area (2 Columns)

**Left Column (65%):**

**About This Event Section:**
- Heading: "About This Event"
- Mock description (2-3 paragraphs)
- Good line height and spacing

**What to Expect Section:**
- Heading: "What to Expect"
- Bullet list with icons (Check or ArrowRight)
- Example items:
  - ✓ Network with 50+ founders and investors
  - ✓ Lightning talks from 3 startup founders
  - ✓ Food and drinks provided
  - ✓ Opportunity to pitch your startup

**Schedule (If Applicable):**
- Heading: "Event Schedule"
- Timeline format:
  - 6:00 PM - Registration & Welcome Drinks
  - 6:30 PM - Opening Remarks
  - 7:00 PM - Lightning Talks
  - 8:00 PM - Networking Session
  - 9:00 PM - Closing

---

**Right Column (35%):**

**Organizer Card:**
- Card component
- Organizer logo/avatar (rounded-full)
- Organizer name: "Medellín Tech Community"
- Short bio (2-3 lines)
- "View Organizer" button (outline)

**Separator**

**Event Stats:**
- Attendees icon + "32 registered"
- Eye icon + "245 views"
- Star icon + "Trending event"

**Separator**

**Action Buttons:**
- "Register Now" (primary, large, full width)
- "Add to Calendar" (outline, Calendar icon, full width)
- "Share Event" (outline, Share2 icon, full width)

---

### Similar Events Section (Bottom)

**Heading:** "More Events You Might Like"

**Grid:** 3 event cards (responsive)

**Each Card Shows:**
- Event image (aspect-video)
- Event title
- Date (Calendar icon)
- Location (MapPin icon)
- Attendees count (Users icon)
- Category badge

---

## Mock Data to Use

### Main Event
```
Title: AI Startup Networking Night
Category: Networking
Banner: Use gradient background (blue to purple)
Date: February 15, 2025
Day: Thursday
Time: 6:00 PM - 9:00 PM
Venue: WeWork Poblado
Address: Calle 7 #43A-99, El Poblado, Medellín
Capacity: 50
Registered: 32
Views: 245

Description:
"Join us for an exciting evening of networking with Medellín's most innovative AI startup founders, investors, and tech enthusiasts. This event brings together the community to share ideas, find collaborators, and explore opportunities in the AI space.

Whether you're a founder looking for your next co-founder, an investor seeking promising startups, or simply curious about AI, this event is for you. We'll have lightning talks from successful founders, plenty of networking time, and great food and drinks."

What to Expect:
- Network with 50+ founders and investors
- Lightning talks from 3 startup founders
- Food and drinks provided
- Opportunity to pitch your startup (1-minute pitches)
- Meet potential co-founders and team members

Organizer:
Name: Medellín Tech Community
Bio: "Building Colombia's largest tech community with 5,000+ members across Medellín, Bogotá, and beyond."
```

### Similar Events (3 cards)
```
Event 1:
- Title: "Product Management Workshop"
- Date: Feb 22, 2025
- Location: Ruta N
- Registered: 18/30
- Category: Workshop

Event 2:
- Title: "Startup Pitch Competition"
- Date: March 1, 2025
- Location: Centro Comercial
- Registered: 45/100
- Category: Competition

Event 3:
- Title: "Tech Talks: Machine Learning"
- Date: March 8, 2025
- Location: Online
- Registered: 120/200
- Category: Talk
```

---

## Components to Use

**From shadcn/ui:**
- Card (event details, organizer card)
- Button (register, calendar, share)
- Badge (category)
- Separator (dividers)
- Progress (capacity bar)

**Icons from lucide-react:**
- Calendar (date/time)
- MapPin (location)
- Users (capacity, attendees)
- Eye (views)
- Star (trending)
- Share2 (share button)
- Check or ArrowRight (what to expect list)
- ChevronRight (breadcrumb)

---

## Responsive Design

### Desktop (> 1024px)
- 2-column layout (65% main, 35% sidebar)
- 3-column event details card
- 3-column similar events grid

### Tablet (640px - 1024px)
- Single column main content
- 2-column event details card
- 2-column similar events grid

### Mobile (< 640px)
- Stack all vertically
- 1-column event details card
- 1-column similar events grid
- Sticky "Register Now" button at bottom

---

## Styling Guidelines

### Colors
- Primary for "Register Now" button
- Success/green for capacity progress bar
- Muted for secondary text
- Gradient for banner background

### Typography
- Event title: text-4xl, font-bold
- Section headings: text-2xl, font-semibold
- Body text: leading-relaxed
- Metadata: text-sm, text-muted-foreground

### Spacing
- Banner height: h-[400px]
- Section spacing: space-y-8
- Card padding: p-6
- Button spacing: mt-2

### Visual Effects
- Banner overlay: bg-gradient-to-t from-black/60
- Card shadows: shadow-lg
- Hover effects on similar events
- Rounded corners throughout

---

## Button States (Visual Only)

### Register Now Button
- Default: "Register Now"
- On click: "Registered ✓" (green, disabled)
- Just visual change

### Add to Calendar Button
- On click: Show toast "Added to calendar"
- Visual feedback only

---

## What NOT to Include

❌ Don't add:
- Database queries
- Event fetching logic
- Real registration submission
- Authentication checks
- Actual calendar integration
- Real attendee counting

✅ Do add:
- Beautiful banner design
- Mock event data
- Visual button states
- Responsive layout
- Proper spacing
- Similar events with mock data

---

## Success Checklist

- [ ] Page loads at `/events/:id`
- [ ] Banner displays with title
- [ ] Event details card shows (date, location, capacity)
- [ ] Progress bar for capacity
- [ ] Description renders correctly
- [ ] Organizer card displays
- [ ] Action buttons styled
- [ ] Similar events section (3 cards)
- [ ] Responsive design works
- [ ] No errors in console
- [ ] Matches design system

---

**Priority:** TIER 1 - Critical Detail Page
**Estimated Time:** 2-3 hours
**Focus:** UI design and layout with mock data only
