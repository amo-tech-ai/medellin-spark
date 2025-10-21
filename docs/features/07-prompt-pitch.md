# 🎨 LOVABLE PROMPT: PITCH DECK PRESENTATION TOOLS

**For:** Medellin AI Hub - AI-Powered Pitch Deck Generator
**Date:** October 15, 2025
**Goal:** Build the complete pitch deck creation, editing, and viewing experience

---

## 📋 What You're Building

Hey Lovable! We need you to create the pitch deck presentation tools for Medellin AI Hub. This is the core feature that lets founders create, edit, and present their startup pitch decks using AI.

**What's Already Built:**
- ✅ Landing page with hero and CTAs
- ✅ AI wizard for pitch deck generation (`/pitch-deck`)
- ✅ Main dashboard with stats and quick actions
- ✅ User profiles and startup profile wizard
- ✅ Events, perks, and programs pages

**What We Need You to Create:**
1. **Presentation Outline Editor** - Where users review and refine the AI-generated outline
2. **Layout Picker Modal** - Choose from 12+ slide layouts
3. **Theme Picker Modal** - Choose from 10+ presentation themes
4. **Presentation Editor** - Rich text editor for customizing slides
5. **Presentation Viewer** - Full-screen presentation mode

---

## 🎯 Design System to Follow

**Use the existing site's style:**
- Same color scheme as the dashboard (purple primary buttons, clean white backgrounds)
- Same fonts and typography from other pages
- Same card styles and hover effects you see on the perks and events pages
- Same navigation sidebar style from the dashboard
- Keep it professional and modern like the current pages

**Colors (from existing site):**
- Primary: Purple/blue gradient buttons
- Background: White and light gray
- Text: Dark gray for body, black for headings
- Accents: Green for success, red for delete actions

---

## 🚀 Page 1: Presentation Outline Editor

**Route:** `/presentations/:id/outline`

**The Big Picture:**
After the AI generates a pitch deck outline, users land here to review and refine it before creating the full presentation. Think of it like Decktopus or Gamma.app - clean, organized, with drag-and-drop slides.

**Layout:**
```
┌─────────────────────────────────────────────────────────┐
│ [Logo] Presentation Outline    11 Slides    [Generate] │
├──────────────────┬──────────────────────────────────────┤
│ Left Sidebar     │ Main Content Area                    │
│ (240px width)    │                                      │
│                  │ [Title Section with theme dropdown] │
│ Refine your      │                                      │
│ presentation ▼   │ ⠿ Slide 1: EventOS Startup Pitch    │
│                  │    [🔄][➖][📋][🗑️][▼]             │
│ [Prompt Box]     │                                      │
│ Shows original   │ ⠿ Slide 2: The Problem with Events  │
│ prompt user      │    Click to expand/collapse ▼        │
│ entered in AI    │    [When expanded: show full text]  │
│ wizard           │    [🔄 Regenerate][➖ Make Concise] │
│                  │                                      │
│ [Regenerate All] │ ⠿ Slide 3: Introducing EventOS      │
│ Button           │    [Actions...]                      │
│                  │                                      │
│ [Make Concise]   │ ⠿ Slide 4: How EventOS Works        │
│ Button           │    [Actions...]                      │
│                  │                                      │
│                  │ ... more slides ...                  │
│                  │                                      │
│                  │ [+ Add Slide] button at bottom       │
└──────────────────┴──────────────────────────────────────┘
```

**Left Sidebar Should Have:**
- Header: "Refine your presentation" (collapsible with chevron)
- A read-only box showing the original prompt the user entered
- Two buttons:
  - "Regenerate" button (generates new outline)
  - "Make Concise" button (shortens all slides)

**Main Content Area Should Have:**
- Top bar:
  - Site logo on left
  - "Presentation Outline" title
  - Slide count badge: "11 Slides"
  - Dropdown: "Choose Theme" (shows current theme with 3 colored dots)
  - Big purple "Generate Presentation" button on the right
- List of slides with:
  - Drag handle icon (⠿ - six dots in 2x3 grid) on the left of each slide
  - Slide number and title: "Slide 1: EventOS Startup Pitch"
  - Action buttons on the right:
    - 🔄 Regenerate (tooltip: "Regenerate this slide")
    - ➖ Make Concise (tooltip: "Make this slide shorter")
    - 📋 Duplicate (tooltip: "Duplicate this slide")
    - 🗑️ Delete (tooltip: "Delete this slide")
    - ▼ Expand (toggle to show/hide full slide content)
  - When expanded: Show the full slide content below the title
  - When expanded: Show action buttons below content
- Bottom: "+ Add Slide" button (outlined, not filled)

**Interactions:**
- Drag slides to reorder them (use drag-and-drop)
- Click slide title or ▼ to expand/collapse full content
- Click "Choose Theme" dropdown to open Theme Picker Modal
- Click "Generate Presentation" to proceed to editor
- All action buttons should show loading state when clicked

---

## 🎨 Page 2: Layout Picker Modal

**When It Opens:**
User clicks "Choose a Layout" button from outline editor or editor page.

**Design:**
```
┌────────────────────────────────────────────────────────────┐
│ Choose a Layout                                       [×]  │
│ Select a layout to organize your slide content            │
├─────────────────────────────┬──────────────────────────────┤
│                             │  [Layout Grid - 2 columns]  │
│ [Large Preview Panel]       │                              │
│ Shows selected layout       │  [Card]      [Card]          │
│ with example content        │  Four        Thank You       │
│                             │  Number                      │
│ Selected: Four Number Cards │  Cards                       │
│                             │                              │
│ Company Overview            │  [Card]      [Card]          │
│ 2019  2,350  50  10.5k     │  Mission     Two Step        │
│                             │  Split       Icons           │
│                             │                              │
│ [Apply Layout Button]       │  [Card]      [Card]          │
│ (Purple, full width)        │  Four Team   Timeline        │
│                             │  Grid        Split           │
│                             │                              │
│                             │  ... 6 more layouts ...      │
└─────────────────────────────┴──────────────────────────────┘
```

**What It Should Have:**
- Modal overlay (covers screen with dark background)
- Modal width: 80% of screen, max 1200px
- Header with title and close button (×)
- Two-column layout:
  - **Left Panel (40%):**
    - Large preview of the currently selected layout
    - Show example content in the preview (fake company data)
    - Label below: "Selected: [Layout Name]"
    - Big "Apply Layout" button at bottom (purple, full width)
  - **Right Panel (60%):**
    - Scrollable grid of layout cards (2 columns)
    - 12 layout options minimum

**12 Layout Options to Include:**
1. **Four Number Cards** - 4 stat cards in a grid
2. **Thank You** - Large centered text with icon
3. **Mission Split** - Two-column text layout
4. **Two Step Icons** - Two boxes with icons and text
5. **Four Team Grid** - 4 team member cards with photos
6. **Timeline Split** - Vertical timeline with milestones
7. **Semi-Circle Graph** - Half donut chart with stats
8. **Venn Diagram** - 3 overlapping circles
9. **Funnel Diagram** - Sales funnel visualization
10. **References** - List of citations or sources
11. **Product Showcase** - Image with description
12. **Comparison Table** - Two-column comparison

**Each Layout Card:**
- Thumbnail image showing the layout structure (use simple shapes/lines)
- Name below thumbnail
- Click to select (adds blue border)
- Hover: slight shadow and scale

---

## 🌈 Page 3: Theme Picker Modal

**When It Opens:**
User clicks "Choose Theme" dropdown from outline editor or editor.

**Design:**
```
┌────────────────────────────────────────────────────────────┐
│ Choose a Theme                                        [×]  │
│ Select colors and style for your presentation             │
├────────────────────────────────────────────────────────────┤
│                                                            │
│  [Grid of Theme Cards - 3 columns]                        │
│                                                            │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐                   │
│  │ Preview │  │ Preview │  │ Preview │                   │
│  │ Image   │  │ Image   │  │ Image   │                   │
│  │ ●●●     │  │ ●●●     │  │ ●●●     │                   │
│  │Vivid Pop│  │Tangerine│  │Ocean    │                   │
│  └─────────┘  └─────────┘  └─────────┘                   │
│                                                            │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐                   │
│  │ More    │  │ themes  │  │ here... │                   │
│  └─────────┘  └─────────┘  └─────────┘                   │
│                                                            │
│  ... 4 more rows of themes ...                            │
│                                                            │
│  [Apply Theme Button - Purple, centered]                  │
│                                                            │
└────────────────────────────────────────────────────────────┘
```

**What It Should Have:**
- Modal overlay
- Modal width: 70% of screen, max 900px
- Header with title and close button
- Grid of theme cards (3 columns, responsive)
- 10+ themes minimum
- "Apply Theme" button at bottom

**10 Theme Options to Include:**
1. **Vivid Pop** - Bright colors (red, yellow, blue dots)
2. **Tangerine Sunset** - Orange gradient (orange dots)
3. **Ocean Breeze** - Blues and teals (blue dots)
4. **Forest Green** - Green and earthy (green dots)
5. **Midnight** - Dark blue and purple (dark dots)
6. **Coral Reef** - Pink and coral (pink dots)
7. **Professional** - Navy and gray (blue, gray dots)
8. **Minimalist** - Black and white (gray dots)
9. **Warm Autumn** - Browns and oranges (brown, orange dots)
10. **Spring Fresh** - Light greens and yellows (green, yellow dots)

**Each Theme Card:**
- Preview thumbnail (show a slide with that theme's colors)
- 3 colored dots below thumbnail (●●●) showing the theme's main colors
- Theme name below dots
- Click to select (adds colored border matching theme)
- Hover: slight scale up

---

## 📝 Page 4: Presentation Editor

**Route:** `/presentations/:id/edit`

**The Big Picture:**
Rich text editor where users customize each slide. Similar to Google Slides or Canva, but simpler.

**Layout:**
```
┌────────────────────────────────────────────────────────────┐
│ [Logo]  My Pitch Deck  [💾 Saved][👁️ Preview][📤 Share] │
├────────┬───────────────────────────────────────┬───────────┤
│ Slides │ Editor Canvas                         │ Theme     │
│ Panel  │                                       │ Panel     │
│ (200px)│ ┌───────────────────────────────────┐ │ (250px)   │
│        │ │                                   │ │           │
│   1▶   │ │    [Editable Slide Content]      │ │ Colors    │
│   2    │ │                                   │ │ [●●●●●]   │
│   3    │ │    This is where user edits       │ │           │
│   4    │ │    the slide text, images, etc    │ │ Fonts     │
│   5    │ │                                   │ │ [Dropdown]│
│   6    │ │    Rich text toolbar above        │ │           │
│        │ │                                   │ │ Layout    │
│ [+ Add]│ └───────────────────────────────────┘ │ [Change]  │
│        │                                       │           │
│        │ Slide 1 of 11                         │ Templates │
│        │                                       │ [Browse]  │
└────────┴───────────────────────────────────────┴───────────┘
```

**Left Panel (Slide Thumbnails):**
- Vertical list of slide thumbnails (small preview of each slide)
- Current slide highlighted with blue border
- Click to switch to that slide
- Drag to reorder slides
- "+ Add Slide" button at bottom

**Center Panel (Editor):**
- Top toolbar:
  - Site logo
  - Presentation title (editable inline)
  - Auto-save indicator: "💾 Saved just now"
  - "👁️ Preview" button (opens viewer)
  - "📤 Share" button (share modal)
- Rich text editor:
  - Bold, italic, underline buttons
  - Font size dropdown
  - Text color picker
  - Alignment buttons
  - Bullet list, numbered list
  - Insert image button
  - Insert link button
- Editor should be WYSIWYG (what you see is what you get)
- Bottom: "Slide X of Y" indicator

**Right Panel (Theme Controls):**
- **Colors Section:**
  - 5 color swatches (theme colors)
  - Click to change each color (color picker)
- **Fonts Section:**
  - Dropdown for heading font
  - Dropdown for body font
- **Layout Section:**
  - "Change Layout" button (opens Layout Picker Modal)
- **Templates Section:**
  - "Browse Templates" button

---

## 🎬 Page 5: Presentation Viewer

**Route:** `/presentations/:id/view`

**The Big Picture:**
Full-screen presentation mode. Clean, minimal, like PowerPoint presentation mode or Google Slides present view.

**Layout:**
```
┌────────────────────────────────────────────────────────────┐
│                                                            │
│                                                            │
│                                                            │
│                  [SLIDE CONTENT]                           │
│                  Centered on screen                        │
│                  Max width 1200px                          │
│                                                            │
│                                                            │
│                                                            │
└────────────────────────────────────────────────────────────┘
[← Previous]      Slide 3 of 11              [Next →] [Exit]
```

**What It Should Have:**
- Full-screen background (black or theme color)
- Slide content centered, maximum width 1200px
- Maintains aspect ratio (16:9 or 4:3)
- Bottom control bar:
  - Left: "← Previous" button
  - Center: "Slide 3 of 11" counter
  - Right: "Next →" button and "Exit" button
  - Control bar auto-hides after 3 seconds (appears on mouse move)
  - Semi-transparent dark background on control bar

**Interactions:**
- Click "Next" or use right arrow key to go forward
- Click "Previous" or use left arrow key to go back
- Press Escape to exit presentation mode
- Swipe left/right on mobile for next/previous
- Click "Exit" to return to editor

---

## 🔗 User Flow (How It All Connects)

1. User starts at `/pitch-deck` (AI wizard - already built ✅)
2. AI generates outline → User lands on `/presentations/123/outline` (Outline Editor)
3. User reviews slides, clicks "Choose Theme" → Theme Picker Modal opens
4. User selects theme, clicks "Apply Theme" → Modal closes
5. User clicks "Generate Presentation" → Goes to `/presentations/123/edit` (Editor)
6. User edits slides, clicks "Preview" → Opens `/presentations/123/view` (Viewer) in new tab or modal
7. User presents or exports deck

**Key Navigation:**
- Outline Editor → Theme Picker Modal (click theme dropdown)
- Outline Editor → Layout Picker Modal (click "Choose Layout")
- Outline Editor → Editor (click "Generate Presentation")
- Editor → Theme Panel → Theme Picker Modal
- Editor → Viewer (click "Preview")
- Viewer → Editor (click "Exit")

---

## 🎨 Component Patterns to Use

**From Existing Pages (Keep Consistency):**
- Use the same card styles you see on the Events and Perks pages
- Use the same button styles from the dashboard
- Use the same purple color for primary actions
- Use the same sidebar style from the main dashboard
- Use the same modal overlay style (if you've built modals elsewhere)

**New Components to Create:**
- **Drag Handle:** Six dots in 2x3 grid (⠿) - used for dragging slides
- **Slide Card:** Box with slide number, title, action buttons, expandable content
- **Layout Card:** Thumbnail + name, selectable
- **Theme Card:** Preview + color dots + name, selectable
- **Toolbar:** Rich text editing buttons (bold, italic, color, etc.)
- **Slide Thumbnail:** Small preview of slide for sidebar
- **Control Bar:** Bottom bar with navigation buttons (auto-hide)

---

## 💡 Important Details

**Mobile Responsiveness:**
- All pages should work on mobile (375px width minimum)
- On mobile:
  - Outline Editor: Stack sidebar on top, main content below
  - Layout Picker Modal: Single column of layouts
  - Theme Picker Modal: 2 columns instead of 3
  - Editor: Hide right panel, show as drawer/toggle
  - Viewer: Full screen, swipe navigation

**Auto-Save:**
- Show "💾 Saving..." when user types
- Show "💾 Saved just now" after save completes
- Update timestamp: "Saved 2 minutes ago"

**Loading States:**
- Show spinner when regenerating slides
- Show skeleton loaders when loading content
- Disable buttons while loading

**Empty States:**
- If no slides: Show "No slides yet. Click + Add Slide to get started"
- If outline generation fails: Show error message with retry button

**Accessibility:**
- All buttons should have aria-labels
- Keyboard navigation (tab through buttons, arrow keys in viewer)
- Focus indicators on all interactive elements

---

## 📦 What to Deliver

Please create these 5 pages/components in this order:

1. **Outline Editor page** (`/presentations/:id/outline`)
2. **Layout Picker Modal** (component)
3. **Theme Picker Modal** (component)
4. **Editor page** (`/presentations/:id/edit`)
5. **Viewer page** (`/presentations/:id/view`)

Use real example data (EventOS startup pitch deck) so we can see how it looks. Make it look professional and polished like the existing pages on the site.

---

## 🎯 Success Criteria

We'll know it's done when:
- ✅ User can see their AI-generated outline with drag-and-drop slides
- ✅ User can expand/collapse slides to see full content
- ✅ User can regenerate individual slides or all slides
- ✅ User can choose from 12+ layouts via modal
- ✅ User can choose from 10+ themes via modal
- ✅ User can edit slide content with rich text editor
- ✅ User can preview presentation in full-screen mode
- ✅ Navigation between pages works smoothly
- ✅ Everything looks consistent with existing site design
- ✅ Mobile responsive on all pages

---

**That's it!** Build these 5 pieces and our pitch deck tool will be complete. Focus on making it clean, professional, and easy to use. Match the existing site's design so it feels like one cohesive product.

Let me know if you have questions! 🚀
