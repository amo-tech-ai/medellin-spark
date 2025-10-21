# 🚀 LOVABLE MULTI-PHASE PROMPT: PITCH DECK GENERATOR

**Project:** Medellin AI Hub - AI-Powered Pitch Deck Generator
**Date:** October 15, 2025
**Based On:** Decktopus analysis + existing Medellin AI design system

---

## 📋 HOW TO USE THIS DOCUMENT

This document contains **10 phases** for building the pitch deck generator. Each phase is a standalone prompt you can copy-paste into Lovable. 

**Instructions:**
1. Copy Phase 1 prompt → Paste into Lovable → Wait for completion
2. Test Phase 1 features on the live site
3. Copy Phase 2 prompt → Paste into Lovable → Wait for completion
4. Repeat for all 10 phases

**Important:** Each phase builds on the previous ones, so complete them in order!

---

## 🎯 EXISTING SITE CONTEXT (For All Phases)

**What's Already Built:**
- Landing page with hero, stats, CTAs (purple/white theme)
- Main dashboard with sidebar navigation and stats cards
- User profiles with skills, experience
- Events, Perks, Programs pages
- Basic `/pitch-deck` AI wizard (needs enhancement)

**Design System to Follow:**
- **Colors:** Purple (#8B5CF6) primary, white/gray backgrounds
- **Typography:** Clean modern fonts, 16px body, 24-32px headings
- **Cards:** White with shadow on hover (like Events/Perks pages)
- **Buttons:** Purple gradient primary, outlined secondary
- **Modals:** Dark overlay, white centered panel with close button
- **Sidebar:** Collapsible, logo at top (like dashboard)

---

# PHASE 1: Enhanced AI Wizard (Week 1, Day 1-2)

## What to Build

Enhance the existing `/pitch-deck` page with:
1. **Step 1: Choose Your Starting Point** - 3 options (Prompt, Upload, Template)
2. **Step 2: Clarifying Questions** - Audience, goal, length, tone, industry
3. **Step 3: AI Processing** - Progress indicators

---

## LOVABLE PROMPT FOR PHASE 1

```
Hey Lovable! I need to enhance the existing /pitch-deck AI wizard page. 

Current state: Basic wizard exists but needs major upgrades.

New design: 3-step wizard with better UX and smart defaults.

STEP 1: CHOOSE YOUR STARTING POINT
-----------------------------------

Create a centered layout with 3 large clickable cards:

Card 1: 📝 Prompt
- Icon: Pencil/document icon
- Title: "Describe with words"
- Description: "Tell AI what you need"
- On click: Go to Step 2

Card 2: 📄 Upload
- Icon: Upload icon
- Title: "Upload Document"
- Description: "PDF, DOCX, or TXT (max 10MB)"
- On click: Show file upload modal
- File upload modal:
  * Drag & drop zone
  * File type filter: .pdf, .docx, .txt
  * Max size: 10MB
  * Show "Analyzing document..." spinner after upload
  * Extract text and go to Step 2 with pre-filled data

Card 3: 📋 Template
- Icon: Grid/template icon
- Title: "Start with Template"
- Description: "Use proven structure"
- On click: Go to template library (we'll build this in Phase 2)

Below the cards, add "Popular Topics" section:
- 8 pill-shaped buttons in 2 rows
- Buttons: [Investor Pitch] [Sales Proposal] [Product Launch] [Quarterly Review]
         [Team Training] [Company Update] [Grant Proposal] [Marketing Plan]
- On click: Pre-fill AI prompt and skip to Step 3

STEP 2: CLARIFYING QUESTIONS
-----------------------------

Show a clean form with 5 questions:

1. Who is your audience?
   - Radio buttons: Investors/VCs, Clients/Customers, Internal Team, Partners, General Public

2. What's your goal?
   - Radio buttons: Raise Funding, Win Deal, Train Team, Get Partnership, Report Progress

3. Presentation length?
   - Radio buttons: Quick (5-7 slides), Standard (10-15 slides), Detailed (18-25 slides), Let AI decide

4. Tone preference?
   - Radio buttons: Professional, Conversational, Technical

5. Industry/Category?
   - Dropdown: Tech Startup, Healthcare, Education, Finance, E-commerce, SaaS, AI/ML, Other

At bottom:
- [Skip] button (uses defaults)
- [Continue →] button (purple, primary)

STEP 3: AI PROCESSING
---------------------

Show loading screen with progress indicators:

Title: "🤖 AI is creating your presentation..."

Progress list (animated checkmarks):
- ✅ Parsed your input
- ✅ Analyzed audience and goals
- 🔄 Generating slide structure... (8/15 slides)
- ⏳ Adding data visualizations...
- ⏳ Selecting optimal layouts...

Show estimated time: "Estimated: 30 seconds remaining"

When complete: Redirect to /presentations/:id/outline

DESIGN NOTES:
- Use purple (#8B5CF6) for primary buttons
- Cards should have white background, shadow on hover
- Consistent spacing: 24px padding, 16px gaps
- Mobile responsive: Stack cards vertically on mobile

That's it for Phase 1! Focus on the 3-step wizard flow with good UX.
```

---

# PHASE 2: Template Library (Week 1, Day 3)

## What to Build

Create a new page `/presentations/templates` with 6 pre-built templates.

---

## LOVABLE PROMPT FOR PHASE 2

```
Hey Lovable! Create a new template library page at /presentations/templates.

TEMPLATE GALLERY LAYOUT
-----------------------

Header:
- Title: "Choose a Template"
- Close button (X) in top-right

Filter tabs:
- [All] [Investor] [Sales] [Internal] [Other]
- Active tab has purple underline

Template grid (2 columns on desktop, 1 on mobile):

Each template card shows:
- Large preview image (placeholder with slide layout)
- Template name (h3, bold)
- Slide count (e.g., "12 slides")
- Brief description
- [Preview] button (outlined)
- [Use Template] button (purple, primary)

6 TEMPLATES TO CREATE:

1. Investor Pitch (12 slides)
   Category: Investor
   Description: "Raise funding with proven pitch structure"
   Slides: Problem, Solution, Market Size, Business Model, Traction, Team, Competition, Go-to-Market, Financials, Investment Ask, Milestones, Thank You

2. Sales Proposal (15 slides)
   Category: Sales
   Description: "Win clients with professional proposals"
   Slides: Executive Summary, Client Challenge, Our Approach, Solution Details, Timeline, Pricing, Case Studies, ROI Projections, Team, Why Us, Next Steps, Terms, References, Contact, Thank You

3. Product Launch (10 slides)
   Category: Sales
   Description: "Announce new products with impact"
   Slides: Product Intro, Problem Solved, Key Features, Demo Screenshots, Target Market, Pricing, Launch Timeline, Success Metrics, Call to Action, Thank You

4. Company Update (8 slides)
   Category: Internal
   Description: "Share quarterly progress with team"
   Slides: Quarter Highlights, Key Metrics, Team Updates, Product Progress, Customer Wins, Challenges, Next Quarter Goals, Thank You

5. Team Training (20 slides)
   Category: Internal
   Description: "Educate teams on new processes"
   Slides: Learning Objectives, Agenda, Core Concepts (5 slides), Step-by-step Tutorials (5 slides), Best Practices, Common Mistakes, Resources, Quiz, Summary, Questions

6. Grant Proposal (18 slides)
   Category: Other
   Description: "Secure funding for research/projects"
   Slides: Organization Overview, Problem Statement, Solution, Impact Metrics, Budget Breakdown, Timeline (3 slides), Team Qualifications, Success Stories, Evaluation Plan, Sustainability, Partners, References, Appendix, Contact

FUNCTIONALITY:

When user clicks [Use Template]:
- Create new presentation with template structure
- Pre-fill slide titles from template
- Add placeholder content in each slide
- Redirect to /presentations/:id/outline

When user clicks [Preview]:
- Open modal showing all slide titles in the template
- Show thumbnail previews if possible
- [Close] and [Use This Template] buttons

Filter functionality:
- Click "Investor" → Show only Investor Pitch
- Click "Sales" → Show Sales Proposal + Product Launch
- Click "Internal" → Show Company Update + Team Training
- Click "Other" → Show Grant Proposal
- Click "All" → Show all 6 templates

DESIGN:
- Match existing card style (white, shadow on hover)
- Purple buttons for primary actions
- Filter tabs with purple active state
- Responsive grid (2 cols desktop, 1 col mobile)

That's Phase 2! Template library complete.
```

---

# PHASE 3: Enhanced Outline Editor (Week 1, Day 4-5)

## What to Build

Enhance `/presentations/:id/outline` with sidebar, refinement options, and better UI.

---

## LOVABLE PROMPT FOR PHASE 3

```
Hey Lovable! Enhance the existing /presentations/:id/outline page.

Current state: Basic outline viewer exists.
New design: Add left sidebar with refinement options and better slide list.

LAYOUT:
-------

Top nav:
- [Logo] Presentation Title (editable)
- Slide count: "11 Slides"
- Auto-save indicator: "💾 Saved 2 min ago"
- Right side buttons: [Comments: 3] [History] [Share] [Export ▼] [Edit Slides →]

Main area (split layout):

LEFT SIDEBAR (240px width):
- Section title: "Refine your presentation ▼" (collapsible)

3 dropdown fields:
1. Industry: [Tech Startup ▼]
   Options: Tech Startup, Healthcare, Education, Finance, E-commerce, SaaS, AI/ML, Other

2. Audience: [Investors ▼]
   Options: Investors, Clients, Internal Team, Partners, General Public

3. Tone: [Professional ▼]
   Options: Professional, Conversational, Technical

[Apply Changes] button (purple)
- On click: Show loading spinner, regenerate content with new context

Divider line

Quick Actions section:
- [📄 Add Slide] button
- [🎨 Change Theme] button
- [📤 Export] button

RIGHT MAIN AREA:
- Slide list (one per row)

Each slide row shows:
- Drag handle icon (⠿) on left
- Slide number and title: "Slide 1: Title Slide"
- Content preview (first line, gray text)
- Action buttons on right:
  * [🔄] Regenerate this slide
  * [➖] Remove slide
  * [📋] Duplicate slide
  * [🗑️] Delete slide
  * [▼] Expand to see full content
- Comment indicator: 💬1 (if slide has comments)

When expanded (click ▼):
- Show full slide content (markdown formatted)
- [Collapse ▲] button

Bottom buttons:
- [← Back to Dashboard] (left)
- [Choose Theme →] (right, purple)

FUNCTIONALITY:

Drag-and-drop:
- User can drag ⠿ handle to reorder slides
- Show drop indicator between slides
- Update slide numbers after reorder

Add Slide button:
- Opens modal: "Add New Slide"
- Input field: "Slide title..."
- [Cancel] [Add] buttons
- Inserts at end of presentation

Change Theme button:
- Opens theme picker modal (we'll build in Phase 6)

Export button dropdown:
- Download PDF
- Download PPTX
- Export HTML
- Copy shareable link

Apply Changes button:
- Shows loading: "Regenerating presentation..."
- Calls AI to adjust content based on new industry/audience/tone
- Updates all slides

[Edit Slides →] button:
- Goes to /presentations/:id/edit (we'll build in Phase 7)

DESIGN:
- Sidebar: Light gray background (#F9FAFB)
- Main area: White background
- Slide rows: White cards with border, hover effect
- Purple buttons for primary actions
- Drag handles visible on hover

That's Phase 3! Enhanced outline editor with refinement options.
```

---

# PHASE 4: Comment System (Week 2, Day 1-2)

## What to Build

Add commenting functionality - sidebar that slides in from right.

---

## LOVABLE PROMPT FOR PHASE 4

```
Hey Lovable! Add a comment system to the presentation pages.

TRIGGER: 
- Click 💬 icon on any slide in outline editor
- Click [Comments: 3] button in top nav

COMMENT SIDEBAR:
----------------

Slides in from right side (400px width, overlay on mobile)

Header:
- Title: "Comments (3)"
- [✕] Close button

Comment list (scrollable):

Each comment shows:
- 📍 Slide anchor: "Slide 3: Our Solution"
- 👤 Profile pic + name: "María González"
- Comment text (supports markdown)
- Timestamp: "2 hours ago"
- [Reply] [Resolve] buttons

Threaded replies (indented):
- Same format as parent comment
- Indented 20px with vertical line
- Reply count: "└─ 1 reply"

Resolved comments:
- Gray background
- ✅ "Resolved" badge
- [Reopen] button instead of [Resolve]

Bottom of sidebar:
- 💬 "Add a comment..." textarea
- [Select slide ▼] dropdown (shows all slide titles)
- [Post] button (purple)

FUNCTIONALITY:

Add comment:
1. User types in textarea
2. Selects slide from dropdown
3. Clicks [Post]
4. Comment added to list
5. Textarea clears

Reply to comment:
1. Click [Reply] on any comment
2. Textarea appears below that comment
3. User types and clicks [Post Reply]
4. Reply added as threaded child

Resolve comment:
1. Click [Resolve] on comment
2. Comment turns gray, marked as resolved
3. Can click [Reopen] to unresolved

Comment notifications:
- Badge on [Comments: X] button shows unread count
- Red dot on slides with new comments
- Mark as read when user views comment

STORAGE:
- Use Supabase table: presentation_comments
- Columns: id, presentation_id, slide_number, user_id, comment_text, parent_id, resolved, created_at
- Real-time subscriptions for live updates

DESIGN:
- White sidebar with shadow
- Comment cards with subtle borders
- Threaded replies indented with gray vertical line
- Purple [Post] button
- Smooth slide-in animation (300ms)

That's Phase 4! Comment system complete.
```

---

# PHASE 5: Version History (Week 2, Day 3)

## What to Build

Add version history modal to track changes and restore old versions.

---

## LOVABLE PROMPT FOR PHASE 5

```
Hey Lovable! Add version history to presentations.

TRIGGER:
- Click [History] button in outline editor top nav

VERSION HISTORY MODAL:
---------------------

Modal (600px width, centered):

Header:
- Title: "Version History"
- [✕] Close button

Version list (scrollable):

Each version shows:
- Status icon: ✅ (current), 💾 (auto-save), 📌 (manual save)
- Title: "Current Version" or "Saved by you" or "Auto-save"
- Timestamp: "2 minutes ago" or "1 hour ago"
- Optional note: "Added market size data" (for manual saves)
- Slide count: "11 slides"
- Buttons: [👁️ Preview] [↩️ Restore] (no Restore for current version)

Version types:
1. Current Version (top)
   - ✅ icon
   - "Current Version"
   - Only [Preview] button

2. Manual saves
   - 📌 icon
   - "Saved by [user name]"
   - Shows save note if provided
   - [Preview] [Restore] buttons

3. Auto-saves (every 2 minutes)
   - 💾 icon
   - "Auto-save"
   - [Preview] [Restore] buttons

FUNCTIONALITY:

Preview version:
1. Click [👁️ Preview] on any version
2. Open new modal showing that version's slides
3. Read-only view (can't edit)
4. [Close] button to return to version list

Restore version:
1. Click [↩️ Restore] on any version
2. Show confirmation: "Restore this version? Current work will be saved as new version first."
3. [Cancel] [Restore] buttons
4. On confirm:
   - Save current state as new version
   - Load selected version as current
   - Close modal
   - Show success toast: "Version restored"

Auto-save:
- Trigger every 2 minutes if changes detected
- Create new auto-save version entry
- Keep last 10 auto-saves (delete older ones)

Manual save:
- Add [Save] button to top nav
- Click opens modal: "Save this version"
- Optional note: "What changed?" (textarea)
- [Cancel] [Save] buttons
- Creates manual save version with note

STORAGE:
- Supabase table: presentation_versions
- Columns: id, presentation_id, version_data (JSONB), user_id, save_type (auto/manual), note, created_at
- Store full presentation JSON in version_data

DESIGN:
- Modal with white background, shadow
- Version cards with borders
- Icons colored: ✅ green, 💾 blue, 📌 purple
- Timestamps in gray
- Purple [Restore] button
- Smooth animations

That's Phase 5! Version history complete.
```

---

# PHASE 6: Theme & Layout Pickers (Week 2, Day 4-5)

## What to Build

Create modals for selecting presentation themes and slide layouts.

---

## LOVABLE PROMPT FOR PHASE 6

```
Hey Lovable! Create theme and layout picker modals.

THEME PICKER MODAL:
-------------------

TRIGGER: Click [🎨 Change Theme] button in outline editor

Modal (900px width, centered):

Header:
- Title: "Choose Theme"
- [✕] Close button

Layout (split):

LEFT SIDE (500px):
- Large preview of selected theme
- Shows 3 sample slides with theme applied
- Slide thumbnails: Title slide, Content slide, Chart slide

RIGHT SIDE (400px):
- Theme grid (2 columns)
- 10 theme cards

Each theme card:
- Theme name
- 3 color dots showing theme colors
- Thumbnail preview
- On hover: subtle shadow
- On click: Update left preview, mark as selected

10 THEMES:

1. Vivid Pop
   Colors: 🔴 Red, 🟡 Yellow, 🔵 Blue
   Style: Bold, energetic, bright backgrounds

2. Ocean Breeze
   Colors: 🔵 Light Blue, 🟦 Blue, 🟪 Purple
   Style: Calm, professional, gradients

3. Forest Green
   Colors: 🟢 Green, 🟩 Dark Green, 🟫 Brown
   Style: Natural, eco-friendly, earthy

4. Sunset Glow
   Colors: 🟠 Orange, 🟡 Yellow, 🔴 Red
   Style: Warm, inviting, gradients

5. Midnight
   Colors: ⚫ Black, 🔵 Dark Blue, ⚪ White text
   Style: Dark mode, sleek, modern

6. Coral Reef
   Colors: 🩷 Coral, 🟠 Orange, 🟡 Light Yellow
   Style: Friendly, approachable, soft

7. Professional
   Colors: ⚫ Navy, ⚪ White, 🔵 Light Blue
   Style: Corporate, clean, minimal

8. Minimalist
   Colors: ⚫ Black, ⚪ White, ⚫ Gray
   Style: Simple, elegant, lots of whitespace

9. Warm Autumn
   Colors: 🟤 Brown, 🟠 Orange, 🟡 Gold
   Style: Cozy, seasonal, rich

10. Spring Fresh
    Colors: 🟢 Light Green, 🌸 Pink, 🟡 Yellow
    Style: Bright, cheerful, youthful

Bottom:
- [Cancel] button (left)
- [Apply Theme] button (right, purple)

On [Apply Theme]:
- Apply theme to all slides
- Close modal
- Show toast: "Theme applied"

---

LAYOUT PICKER MODAL:
--------------------

TRIGGER: Click layout icon on any slide in outline editor

Modal (1000px width, centered):

Header:
- Title: "Choose Layout"
- [✕] Close button

Layout (split):

LEFT SIDE (500px):
- Large preview of selected layout
- Shows how content will be arranged
- Placeholder text and images

RIGHT SIDE (500px):
- Layout grid (3 columns × 4 rows = 12 layouts)

Each layout card:
- Layout thumbnail
- Layout name below
- On click: Update left preview, mark as selected

12 LAYOUTS:

1. Four Number Cards
   - 2×2 grid of metric cards

2. Thank You
   - Centered title, subtitle, contact info

3. Mission Split
   - Left: text, Right: image

4. Two Step Icons
   - 2 columns with icon + text

5. Four Team Grid
   - 2×2 grid with photos + names

6. Timeline Split
   - Left: timeline, Right: details

7. Semi-Circle Graph
   - Large semi-circle chart + legend

8. Venn Diagram
   - 3 overlapping circles

9. Funnel Diagram
   - 4-stage funnel visualization

10. References
    - Bulleted list with citations

11. Product Showcase
    - Large product image + features list

12. Comparison Table
    - 3-column comparison grid

Bottom:
- [Cancel] button (left)
- [Apply Layout] button (right, purple)

On [Apply Layout]:
- Apply layout to selected slide
- Rearrange content to fit layout
- Close modal
- Show toast: "Layout applied"

DESIGN:
- Both modals use same style
- Large preview on left, grid on right
- Thumbnails with borders, hover effects
- Selected item has purple border
- Purple [Apply] buttons

That's Phase 6! Theme and layout pickers complete.
```

---

# PHASE 7: Presentation Editor (Week 3, Day 1-3)

## What to Build

Create rich text editor at `/presentations/:id/edit` for editing slide content.

---

## LOVABLE PROMPT FOR PHASE 7

```
Hey Lovable! Create a presentation editor at /presentations/:id/edit.

PAGE LAYOUT:
-----------

Top nav:
- [Logo] Presentation Title
- Slide counter: "Slide 3/11"
- Auto-save: "💾 Saved now"
- Buttons: [Comments: 3] [History] [Share] [Export ▼] [Preview] [Done]

Presence indicators (if multiple users):
- "👤 María is viewing Slide 5"
- "👤 Carlos is editing Slide 7"

Main editor area:

RICH TEXT TOOLBAR:
- Formatting: [B] [I] [U] (bold, italic, underline)
- Heading: [H1 ▼] (H1, H2, Body)
- Color: [Color ▼] (text and background color pickers)
- Alignment: [Align ▼] (left, center, right, justify)
- Lists: [•] [1.] (bullet and numbered lists)
- Insert: [Link] [Image] [Chart]

CONTENT EDITOR:
- WYSIWYG editor (use Plate.js or TipTap)
- Editable text area with formatting
- Shows current slide content
- Real-time character count
- Markdown shortcuts supported (**, *, ##, etc.)

AI SUGGESTIONS PANEL:
- Appears on right side (collapsible)
- Title: "💡 AI Suggestions" with [✕] to dismiss
- 3-5 context-aware suggestions:
  * "Add specific metrics (e.g., 'saves 15 hours/week')"
  * "Consider adding a customer testimonial quote"
  * "Visual: Upload product screenshot or demo GIF"
  * "Data point: Include year-over-year growth %"
- [Apply] button per suggestion
- Auto-updates based on slide content

SLIDE NAVIGATION:
- Bottom bar with:
  * [◀ Prev: The Problem] button (left)
  * [Next: Market Size ▶] button (right)
- Keyboard shortcuts: ← → arrows

COMMENT INDICATOR:
- 💬1 badge on slide if it has comments
- Click to open comment sidebar (from Phase 4)

FUNCTIONALITY:

Text editing:
- Click in editor to start typing
- Select text to show formatting toolbar
- Apply formatting (bold, italic, etc.)
- Auto-save every 30 seconds

Insert link:
1. Select text
2. Click [Link] button
3. Show popup: "Enter URL"
4. Input field + [Cancel] [Insert] buttons
5. Creates hyperlink

Insert image:
1. Click [Image] button
2. Show upload modal or URL input
3. Upload to Supabase Storage
4. Insert image into editor
5. Draggable/resizable image

Insert chart:
1. Click [Chart] button
2. Show chart type selector: Bar, Line, Pie, Donut
3. Show data input form (labels + values)
4. Generate chart using Chart.js
5. Insert into editor

AI suggestions:
- Analyze slide content every 5 seconds
- Generate 3-5 relevant suggestions
- Show in right panel
- User can click [Apply] to auto-insert suggestion text
- User can [✕] dismiss panel

[Preview] button:
- Opens presentation viewer in new tab
- Shows current slide

[Done] button:
- Returns to outline editor
- Shows toast: "Changes saved"

Auto-save:
- Every 30 seconds if changes detected
- Show "💾 Saving..." then "💾 Saved now"

DESIGN:
- Clean, minimal editor interface
- Toolbar with icon buttons
- Purple highlight for selected text
- AI panel: Light blue background (#EFF6FF)
- Smooth transitions
- Mobile: Stack toolbar items, hide AI panel by default

That's Phase 7! Presentation editor complete.
```

---

# PHASE 8: Presentation Viewer (Week 3, Day 4)

## What to Build

Create full-screen viewer at `/presentations/:id/view` for presenting.

---

## LOVABLE PROMPT FOR PHASE 8

```
Hey Lovable! Create presentation viewer at /presentations/:id/view.

FULL-SCREEN LAYOUT:
-------------------

Presentation area (90% of screen):
- Full-screen slide display
- Dark background or theme-colored background
- Slide content centered
- Large, readable text
- High-contrast colors

Bottom controls bar (auto-hide after 3 seconds):
- Left side: [◀ Prev] [Next ▶]
- Center: Slide counter "3/11"
- Right side: [Notes] [Share] [⚙️ Settings] [✕ Exit]

PRESENTER NOTES PANEL:
----------------------

Toggle with [Notes] button

Shows at bottom (200px height) or right side (300px width):
- Title: "📝 Slide 3 Notes"
- Notes text (from presenter_notes field)
- Can include:
  * Talking points
  * Reminders
  * Time estimates
  * FAQs to address

Notes only visible to presenter, not shared audience

FUNCTIONALITY:

Navigation:
- Click [Next ▶] to advance
- Click [◀ Prev] to go back
- Keyboard arrows: → next, ← previous
- Keyboard Escape: Exit presentation
- Keyboard N: Toggle notes
- Keyboard F: Toggle fullscreen

Auto-hide controls:
- Controls visible on mouse move
- Hide after 3 seconds of no movement
- Always visible if notes panel open

[Share] button:
- Opens share modal (Phase 9)
- Can share current slide or full presentation

[⚙️ Settings] menu:
- Auto-advance: Off, 5s, 10s, 15s, 30s, 60s
- Loop presentation: On/Off toggle
- Show slide numbers: On/Off toggle
- Background music: Upload audio file (optional)

[✕ Exit] button:
- Exits full-screen mode
- Returns to editor or outline

Presenter mode (Keyboard P):
- Dual screen support
- Screen 1: Full-screen presentation (for audience)
- Screen 2: Presenter view with notes + timer
- Timer shows elapsed time
- Next slide preview

ANALYTICS TRACKING (background):
- Track when viewer opens presentation
- Log slide views (slide_number, timestamp)
- Track time spent per slide
- Log when viewer exits
- Track link clicks in presentation
- Store in presentation_views table

DESIGN:
- Minimal UI, focus on content
- Controls: Dark semi-transparent bar
- Smooth slide transitions (300ms fade)
- High contrast text for readability
- Mobile: Swipe gestures for navigation

That's Phase 8! Presentation viewer complete.
```

---

# PHASE 9: Export & Share System (Week 3, Day 5)

## What to Build

Create share modal and export functionality for presentations.

---

## LOVABLE PROMPT FOR PHASE 9

```
Hey Lovable! Create share modal and export system.

SHARE MODAL:
-----------

TRIGGER: Click [Share] button in any presentation page

Modal (600px width, centered):

Header:
- Title: "Share Presentation"
- [✕] Close button

Section 1: SHAREABLE LINK
- Title: "🔗 Shareable Link"
- Input field showing: https://medellin-spark.app/p/abc123xyz
- [📋 Copy] button (copies to clipboard, shows "Copied!" toast)

Section 2: PRIVACY SETTINGS
- Title: "🔒 Privacy Settings"
- Radio options:
  ○ Public - Anyone with link can view
  ○ Password protected - Require password to view
  ○ Private - Only invited team members

If "Password protected" selected:
- Show password input: "Enter password..."
- [Generate Random] button

Section 3: EXPIRATION
- Title: "⏰ Expiration (Optional)"
- Dropdown: [None ▼]
- Options: None, 24 hours, 7 days, 30 days, Custom date

Section 4: ANALYTICS TRACKING
- Title: "📊 Track Analytics"
- Checkboxes:
  ☑ Track views and engagement
  ☑ Notify me when someone views
  ☐ Require email to view (captures viewer info)

Section 5: INVITE TEAM MEMBERS
- Title: "📧 Invite Team Members"
- Email input: "Enter email addresses..." (comma-separated)
- Permission dropdown: [Can View ▼]
  Options: Can View, Can Comment, Can Edit
- [Send Invites] button

Section 6: EXPORT OPTIONS
- Title: "📥 Export Options"
- Three big buttons in a row:
  [Download PDF]
  [Download PPTX]
  [Export HTML]

Bottom:
- [Close] button

FUNCTIONALITY:

Generate shareable link:
- Create unique short code (8 chars: abc123xyz)
- Store in presentation_shares table:
  * Columns: id, presentation_id, share_code, password, expires_at, settings (JSONB), created_at
- Return URL: /p/:share_code

Copy link:
- Click [📋 Copy] button
- Copy URL to clipboard
- Show toast: "Link copied!"

Apply privacy settings:
- Store settings in presentation_shares.settings
- On public link access, check:
  * If password required, show password input page
  * If expired, show "Link expired" message
  * If private, check if user has permission

Send invites:
1. Parse email addresses
2. Create presentation_shares entries for each
3. Send email via Supabase Edge Function
4. Email contains:
   - Link to presentation
   - Inviter name
   - Permission level
   - [View Presentation] button

Export to PDF:
1. Click [Download PDF]
2. Show loading: "Generating PDF..."
3. Server-side: Use Puppeteer or jsPDF
4. Render each slide as PDF page
5. Download: presentation_title.pdf

Export to PPTX:
1. Click [Download PPTX]
2. Show loading: "Generating PowerPoint..."
3. Use pptxgenjs library
4. Create slide for each presentation slide
5. Apply theme colors
6. Download: presentation_title.pptx

Export to HTML:
1. Click [Export HTML]
2. Generate static HTML file
3. Inline CSS for styling
4. Include basic navigation (← →)
5. Download: presentation_title.html

STORAGE:
- presentation_shares table (links, passwords, settings)
- presentation_invites table (email invites)
- presentation_exports table (track export counts)

DESIGN:
- Modal with white background
- Sections separated by divider lines
- Purple buttons for primary actions
- Copy button shows green checkmark on success
- Export buttons with icons

That's Phase 9! Share and export system complete.
```

---

# PHASE 10: Analytics Dashboard (Week 4, Day 1-2)

## What to Build

Create analytics page at `/presentations/:id/analytics` to track performance.

---

## LOVABLE PROMPT FOR PHASE 10

```
Hey Lovable! Create analytics dashboard at /presentations/:id/analytics.

PAGE LAYOUT:
-----------

Top nav:
- [Logo] Presentation Title - Analytics
- Tab navigation:
  [Outline] [Edit] [View] [Analytics] [Settings]
  (Analytics tab active with purple underline)

Main content:

SECTION 1: OVERVIEW METRICS
----------------------------

Title: "📊 Overview (Last 30 Days)"

4 metric cards in a row:

Card 1: Total Views
- Icon: 👁️
- Number: 47
- Label: "Views"

Card 2: Average Time
- Icon: ⏱️
- Number: 3:24
- Label: "Avg Time"

Card 3: Comments
- Icon: 💬
- Number: 12
- Label: "Comments"

Card 4: Shares
- Icon: 📤
- Number: 8
- Label: "Shares"

SECTION 2: VIEWS OVER TIME
---------------------------

Title: "📈 Views Over Time"

Line chart (using Chart.js):
- X-axis: Dates (last 30 days)
- Y-axis: View count
- Line graph with data points
- Hover shows exact count
- Smooth curve

SECTION 3: ENGAGEMENT BY SLIDE
-------------------------------

Title: "🎯 Engagement by Slide"

Horizontal bar chart:
- One bar per slide
- Bar shows completion rate (%)
- Format: "Slide 1: Title ████████████░░░░ 80% completion"
- Color gradient: Red (low) → Yellow (medium) → Green (high)
- Shows drop-off pattern

Example data:
- Slide 1: 80% (most people view)
- Slide 2: 70%
- Slide 3: 55%
- Slide 4: 40%
- Slide 5: 30% (big drop-off here)

SECTION 4: RECENT VIEWERS
--------------------------

Title: "👥 Recent Viewers"

Table/list of viewers:
- Viewer email or "Anonymous"
- Timestamp: "2 hours ago"
- Slides viewed: "viewed all 11 slides" or "stopped at Slide 6"
- Time spent: "5 min 23 sec"

Example entries:
• investor@vc-firm.com - 2 hours ago (viewed all 11 slides, 6 min)
• client@company.com - Yesterday (stopped at Slide 6, 3 min)
• Anonymous - 3 days ago (viewed Slides 1-4, 2 min)
• team@medellin.com - Last week (full presentation, 8 min)

SECTION 5: TOP INSIGHTS
------------------------

Title: "💡 Key Insights"

Auto-generated insights based on data:
- "Slide 5 has highest drop-off rate (50% leave here)"
- "Average completion rate: 45% - Consider shortening to 8 slides"
- "Peak viewing time: Tuesday 2-4 PM"
- "Mobile views: 35% - Ensure mobile optimization"
- "Most shared slide: Slide 3 (Our Solution)"

FILTERS:
--------

Top-right corner:
- Date range dropdown: [Last 30 Days ▼]
  Options: Last 7 days, Last 30 days, Last 90 days, All time, Custom range

FUNCTIONALITY:

Data aggregation:
- Query presentation_views table
- Group by slide_number, viewer_email, date
- Calculate:
  * Total views: COUNT(DISTINCT viewer_email)
  * Avg time: AVG(duration)
  * Completion rate: (viewers who reached slide N / total viewers) * 100

Real-time updates:
- Use Supabase Realtime subscriptions
- Update metrics when new views come in
- Show notification: "New view from investor@vc.com"

Export analytics:
- [Export Report] button
- Downloads CSV with all data
- Columns: Date, Viewer, Slides Viewed, Time Spent, Completion %

STORAGE:
- presentation_views table:
  * Columns: id, presentation_id, viewer_email, slide_number, timestamp, duration, session_id
- Analytics queries use Supabase Functions for complex aggregations

DESIGN:
- Clean dashboard layout
- Metric cards with icons and large numbers
- Charts using Chart.js library
- Purple accent color for headers
- Responsive grid (stacks on mobile)

That's Phase 10! Analytics dashboard complete.
```

---

# 🎉 COMPLETION CHECKLIST

After completing all 10 phases, you should have:

✅ **Phase 1:** Enhanced AI wizard with 3 starting options
✅ **Phase 2:** Template library with 6 templates  
✅ **Phase 3:** Enhanced outline editor with sidebar
✅ **Phase 4:** Comment system with threading
✅ **Phase 5:** Version history with restore
✅ **Phase 6:** Theme and layout pickers
✅ **Phase 7:** Rich text presentation editor
✅ **Phase 8:** Full-screen presentation viewer
✅ **Phase 9:** Share modal and export system
✅ **Phase 10:** Analytics dashboard

---

# 📝 TESTING GUIDE

Test each phase before moving to the next:

**Phase 1 Testing:**
- [ ] Click each starting option (Prompt, Upload, Template)
- [ ] Upload a PDF file (max 10MB)
- [ ] Click a quick-start button
- [ ] Complete clarifying questions
- [ ] Watch AI progress indicators

**Phase 2 Testing:**
- [ ] Browse all 6 templates
- [ ] Filter by category
- [ ] Preview a template
- [ ] Use a template to create presentation

**Phase 3 Testing:**
- [ ] Drag slides to reorder
- [ ] Change industry/audience/tone
- [ ] Add a new slide
- [ ] Delete a slide
- [ ] Expand slide to see content

**Phase 4 Testing:**
- [ ] Add a comment to a slide
- [ ] Reply to a comment
- [ ] Resolve a comment
- [ ] Reopen a resolved comment

**Phase 5 Testing:**
- [ ] Wait for auto-save (2 min)
- [ ] Manually save with note
- [ ] Preview an old version
- [ ] Restore an old version

**Phase 6 Testing:**
- [ ] Preview all 10 themes
- [ ] Apply a theme
- [ ] Preview all 12 layouts
- [ ] Apply a layout to a slide

**Phase 7 Testing:**
- [ ] Edit slide content
- [ ] Apply text formatting (bold, italic)
- [ ] Insert a link
- [ ] Insert an image
- [ ] Review AI suggestions

**Phase 8 Testing:**
- [ ] Open full-screen viewer
- [ ] Navigate with arrows
- [ ] Toggle presenter notes
- [ ] Test keyboard shortcuts
- [ ] Exit viewer

**Phase 9 Testing:**
- [ ] Generate shareable link
- [ ] Copy link to clipboard
- [ ] Set password protection
- [ ] Send email invite
- [ ] Export to PDF
- [ ] Export to PPTX

**Phase 10 Testing:**
- [ ] View overview metrics
- [ ] Check views over time chart
- [ ] Review engagement by slide
- [ ] See recent viewers list
- [ ] Change date range filter

---

# 🚀 DEPLOYMENT NOTES

**After Each Phase:**
1. Test on Lovable preview
2. Fix any bugs before moving to next phase
3. Commit changes to git
4. Deploy to production when stable

**Database Setup:**
Create these Supabase tables:
- presentations
- presentation_slides
- presentation_versions
- presentation_comments
- presentation_shares
- presentation_views

**Storage Buckets:**
- presentation-uploads (for PDFs, documents)
- presentation-images (for slide images)
- presentation-exports (for generated PDFs/PPTX)

**Edge Functions:**
- send-invite-email
- generate-pdf-export
- generate-pptx-export
- analytics-aggregation

---

# ✨ SUCCESS!

You now have a complete multi-phase plan to build a world-class AI-powered pitch deck generator! 🎉

Each phase is self-contained and can be completed in 1-3 days. Follow the phases in order, test thoroughly, and you'll have a professional presentation tool integrated into Medellin AI Hub.

Good luck! 🚀
