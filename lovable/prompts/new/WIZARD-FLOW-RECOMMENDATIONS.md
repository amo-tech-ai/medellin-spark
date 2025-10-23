# Pitch Deck Wizard Flow Recommendations
**Medellín AI Hub - Pitch Deck Wizard UX Guidelines**  
**Last Updated:** October 23, 2025

---

## 🎯 Executive Summary

The Pitch Deck Wizard is an **AI-powered conversational interface** that guides founders through creating professional pitch decks in 10-15 minutes. This document outlines the step-by-step flow, UX patterns, and best practices for building an intuitive, engaging wizard experience.

---

## 📐 Wizard Architecture

### User Journey Flow

```
Entry Point → Wizard Conversation → Outline Editor → Slide Editor → Viewer → Share
     ↓              ↓                      ↓              ↓           ↓        ↓
  Dashboard    AI Questions         Review Content    Customize   Present   Export
  Pitch Deck   (10 steps)           & Structure       Design      Deck      PDF/Link
  Home
```

---

## 🚀 Entry Points

### 1. Dashboard Home
- **Location:** Dashboard → Quick Actions → "Create Pitch Deck" button
- **CTA:** Prominent button with icon
- **Action:** Navigate to `/pitch-deck-wizard`

### 2. Dashboard Pitch Decks
- **Location:** `/dashboard/pitch-decks` → "Create New Deck" button
- **CTA:** Top-right corner, primary color
- **Modal:** Show options:
  - Start from Scratch (Wizard)
  - Use Template
  - Import PPTX

### 3. Pitch Deck Home
- **Location:** `/pitch-deck` → Marketing page
- **CTA:** "Start Wizard" button in hero
- **Action:** Navigate to `/pitch-deck-wizard`

---

## 💬 Wizard Conversation Flow (/pitch-deck-wizard)

### Layout Design

```
┌──────────────────────────────────────────────────────────────┐
│ [Logo]              Pitch Deck Wizard                    [✕] │ ← Header
├──────────────────────────────────────────────────────────────┤
│                                                              │
│ ┌──────────────────────────────────────────────────────┐    │
│ │ Progress: Step 3 of 10                       [Save]  │    │ ← Progress bar
│ │ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │    │
│ │ 30% Complete                                          │    │
│ └──────────────────────────────────────────────────────┘    │
│                                                              │
│ ┌──────────────────────────────────────────────────────┐    │
│ │ [AI] What problem does your startup solve?           │    │ ← AI question
│ │      Try to be specific about the pain point.        │    │
│ └──────────────────────────────────────────────────────┘    │
│                                                              │
│ ┌──────────────────────────────────────────────────────┐    │
│ │ [User] Small businesses struggle with inventory      │    │ ← User response
│ │        management, leading to stockouts and          │    │
│ │        overstocking.                                 │    │
│ └──────────────────────────────────────────────────────┘    │
│                                                              │
│ ┌──────────────────────────────────────────────────────┐    │
│ │ [AI] Great! Can you quantify the impact?             │    │ ← Follow-up
│ │      For example, how much money do they lose?       │    │
│ └──────────────────────────────────────────────────────┘    │
│                                                              │
│ ┌──────────────────────────────────────────────────────┐    │
│ │ [Your Answer]                                        │    │ ← Input field
│ │ [____________________________  ]                     │    │
│ │                                                      │    │
│ │                              [Skip]    [Next Step →] │    │
│ └──────────────────────────────────────────────────────┘    │
│                                                              │
│ AI Suggestions:                                              │
│ [💡 Average loss is $50K per year]                          │ ← Smart suggestions
│ [💡 30% of revenue is lost to inefficiency]                 │
│ [💡 60% of small businesses face this issue]                │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

### Key Components

#### 1. Header
- **Left:** Logo (links to dashboard)
- **Center:** "Pitch Deck Wizard" title
- **Right:** Close button (with save prompt)

#### 2. Progress Indicator
- **Bar:** Visual progress (0-100%)
- **Text:** "Step X of 10" + "Y% Complete"
- **Save Button:** Manual save (auto-saves every 30s)

#### 3. Conversation Thread
- **AI Messages:** Left-aligned, light background
- **User Messages:** Right-aligned, primary color background
- **Timestamps:** Optional, on hover
- **Scroll Behavior:** Auto-scroll to latest message

#### 4. Input Area
- **Text Field:** Multi-line textarea (grows with content)
- **Actions:**
  - Skip: Move to next step (data saved as empty)
  - Next Step: Submit answer and proceed
- **Keyboard Shortcut:** Enter to submit, Shift+Enter for new line

#### 5. AI Suggestions
- **Purpose:** Help users when stuck
- **Display:** Chips/pills below input
- **Action:** Click to insert into input field
- **Generate:** AI generates 2-3 suggestions per question

---

## 📝 Wizard Steps (10 Questions)

### Step 1: Company Name & Tagline
- **AI Question:** "What's the name of your startup, and what's your one-line pitch?"
- **Example Input:**
  - Name: "InventoryIQ"
  - Tagline: "AI-powered inventory management for small businesses"
- **AI Suggestions:**
  - "Smart inventory, zero waste"
  - "Your AI inventory assistant"
- **Validation:** Name required, tagline optional

### Step 2: Problem Statement
- **AI Question:** "What problem does your startup solve? Be specific about the pain point."
- **Example Input:** "Small businesses lose 30% of revenue to stockouts and overstocking due to manual inventory tracking."
- **AI Suggestions:**
  - "Manual processes lead to errors"
  - "Lack of real-time visibility"
- **Follow-up:** "Can you quantify the impact?" (AI asks for numbers)

### Step 3: Solution
- **AI Question:** "How does your product solve this problem? What makes it unique?"
- **Example Input:** "We use AI to predict demand, automate reordering, and optimize stock levels in real-time."
- **AI Suggestions:**
  - "AI-powered demand forecasting"
  - "Automated stock optimization"
- **Follow-up:** "What's the key differentiator?" (vs. competitors)

### Step 4: Market Size
- **AI Question:** "How big is the market opportunity? Who are your target customers?"
- **Example Input:**
  - Target: "5M small retail businesses in Latin America"
  - TAM: "$50B market"
  - SAM: "$5B serviceable market"
- **AI Suggestions:**
  - "Retail stores with 1-10 locations"
  - "E-commerce businesses"
- **Follow-up:** "What's your TAM/SAM/SOM?" (if user knows)

### Step 5: Business Model
- **AI Question:** "How do you make money? What's your pricing strategy?"
- **Example Input:**
  - Model: "SaaS subscription"
  - Pricing: "$99/month per location"
  - Upsells: "Premium analytics, integrations"
- **AI Suggestions:**
  - "Tiered pricing (Basic, Pro, Enterprise)"
  - "Freemium model"

### Step 6: Traction & Metrics
- **AI Question:** "What progress have you made so far? Share key metrics."
- **Example Input:**
  - Users: "500 active customers"
  - Revenue: "$50K MRR"
  - Growth: "20% MoM"
- **AI Suggestions:**
  - "Launched 6 months ago"
  - "1000% YoY growth"
- **Follow-up:** "Any key milestones?" (partnerships, awards)

### Step 7: Competition & Differentiation
- **AI Question:** "Who are your main competitors, and how are you different?"
- **Example Input:**
  - Competitors: "QuickBooks, Excel, manual processes"
  - Advantage: "Only AI-native solution, 10x faster, 50% cheaper"
- **AI Suggestions:**
  - "Focus on small businesses"
  - "Better UX, faster onboarding"

### Step 8: Team
- **AI Question:** "Who's on your founding team? What's your superpower?"
- **Example Input:**
  - CEO: "Sarah Chen, ex-Amazon, 10 years in supply chain"
  - CTO: "Mike Rodriguez, Stanford CS, built AI systems at Google"
- **AI Suggestions:**
  - "20 years combined experience"
  - "Previously founded successful startup"

### Step 9: Funding Ask
- **AI Question:** "How much funding are you raising, and what round is this?"
- **Example Input:**
  - Amount: "$1.5M Seed round"
  - Use: "Product development, hiring, marketing"
  - Milestone: "Reach $200K MRR, expand to Brazil"
- **AI Suggestions:**
  - "Pre-seed / Seed / Series A"
  - "12-18 month runway"

### Step 10: Vision & Timeline
- **AI Question:** "What's your 3-year vision? Where do you see the company?"
- **Example Input:**
  - Vision: "Become the #1 inventory platform in Latin America, serving 50K customers"
  - Timeline: "Year 1: $1M ARR, Year 2: $5M ARR, Year 3: $20M ARR"
- **AI Suggestions:**
  - "Expand to new markets"
  - "Launch new product lines"

---

## 🎨 UX Patterns & Best Practices

### Conversational UI

#### 1. AI Personality
- **Tone:** Friendly, supportive, professional (not overly casual)
- **Voice:** "Great!" "Let's dive deeper" "Can you tell me more?"
- **Encouragement:** "You're doing great!" "Almost there!"
- **Clarifications:** "Can you be more specific?" "Got it!"

#### 2. Typing Indicator
- Show "..." when AI is "thinking"
- Duration: 500ms-1s (not too fast, not too slow)
- Creates natural conversation feel

#### 3. Message Animations
- AI messages: Fade in from left
- User messages: Fade in from right
- Smooth scroll to new message

#### 4. Error Handling
- Empty input: "Please provide an answer or skip this step"
- Too short: "Can you provide more detail?"
- API error: "Oops! Let's try that again" + Retry button

### Auto-Save

#### Implementation
- **Trigger:** Every 30 seconds
- **On Change:** Save after user stops typing (debounce 3s)
- **Indicator:** "Saving..." → "Saved ✓" (subtle, top-right)
- **Failure:** "Failed to save. Retrying..." + Manual retry button

#### Data Stored
- All user answers (step 1-10)
- Current step number
- Timestamps
- Session ID

### Skip Step Logic

#### When to Allow
- **Any step:** User can skip if stuck
- **No penalty:** Skipped steps show as empty in outline

#### Follow-up
- In Outline Editor, user can fill in skipped sections
- AI can regenerate content for skipped steps

### Navigation

#### Forward
- "Next Step" button (disabled until answer provided OR user clicks Skip)
- Enter key submits (Shift+Enter for new line)

#### Backward
- "Previous" button in header (or left arrow)
- Returns to previous step, shows saved answer
- Can edit previous answer

#### Exit
- Close button (X) in header
- Modal: "Save draft and exit?" → Yes/No/Cancel
- Saves progress, returns to dashboard

### Progress Persistence

#### Saved State
- User can exit and resume later
- Dashboard shows "Draft in Progress" badge
- Click to resume from last step

#### Completion
- After step 10, button changes to "Generate Outline"
- Navigates to `/presentations/:id/outline`

---

## 📊 Outline Editor (/presentations/:id/outline)

### Layout

```
┌────────────────────────────────────────────────────────────────┐
│ [← Back]     Your Pitch Deck Outline           [Edit Slides →] │ ← Header
├──────────────┬─────────────────────────────────────────────────┤
│              │                                                 │
│  Slides (L)  │           Slide Content (R)                     │
│              │                                                 │
│ ┌──────────┐ │ ┌─────────────────────────────────────────────┐ │
│ │ 1. Cover │ │ │ Slide 1: Cover                              │ │
│ │ [Thumb]  │ │ │                                             │ │
│ ├──────────┤ │ │ Title: [InventoryIQ___________________]     │ │
│ │ 2. Probl.│ │ │ Tagline: [AI-powered inventory for SBs_]    │ │
│ │ [Thumb]  │ │ │                                             │ │
│ ├──────────┤ │ │ [Image Placeholder]                         │ │
│ │ 3. Solut.│ │ │                                             │ │
│ │ [Thumb]  │ │ │                        [Regenerate with AI] │ │
│ ├──────────┤ │ └─────────────────────────────────────────────┘ │
│ │ 4. Markt │ │                                                 │
│ │ [Thumb]  │ │ Notes (Optional):                               │
│ ├──────────┤ │ [This is the hook slide, keep it punchy____]    │
│ │ 5. Model │ │                                                 │
│ │ [Thumb]  │ │                                                 │
│ │          │ │                                                 │
│ │ [+ Add]  │ │                                                 │
│ └──────────┘ │                                                 │
│              │                                                 │
│  30%        │                                                 │ ← Width split
└──────────────┴─────────────────────────────────────────────────┘
```

### Features

#### Left Panel: Slide List
- **Display:** Thumbnail preview of each slide
- **Drag & Drop:** Reorder slides
- **Highlight:** Current slide (blue border)
- **Actions:**
  - Click to select slide
  - Drag to reorder
  - Right-click for menu (Duplicate, Delete)
  - "+" button to add blank slide

#### Right Panel: Slide Content
- **Title:** Editable text input
- **Content:** Editable textarea (supports Markdown)
- **Image Placeholder:** Shows where image will go
- **AI Regenerate Button:**
  - "Regenerate with AI"
  - Opens modal: "What would you like to change?"
  - AI rewrites content based on prompt
- **Notes:** Optional presenter notes (not visible in presentation)

#### Header Actions
- **Back to Dashboard:** Returns to `/dashboard/pitch-decks`
- **Save Draft:** Manual save (auto-saves enabled)
- **Edit Slides:** Proceed to full editor → `/presentations/:id/edit`

### Default Slide Structure

**Generated by AI based on wizard answers:**

1. **Cover Slide:** Title, tagline, logo
2. **Problem Slide:** Problem statement, pain points, stats
3. **Solution Slide:** How you solve it, key features
4. **Market Opportunity:** TAM/SAM/SOM, target customers
5. **Business Model:** Pricing, revenue streams
6. **Traction Slide:** Metrics, growth charts
7. **Competition Slide:** Competitive landscape, advantages
8. **Team Slide:** Founder bios, photos
9. **Funding Ask:** Amount, use of funds, milestones
10. **Vision Slide:** 3-year roadmap, closing statement

**Users can:**
- Edit any slide content
- Add/remove slides
- Reorder slides
- Regenerate individual slides with AI

---

## 🎨 Slide Editor (/presentations/:id/edit)

### Layout

```
┌────────────────────────────────────────────────────────────────┐
│ [←] [↶↷] [Save✓] [Theme▼] [Preview] [Share] [Export▼]       │ ← Toolbar
├────────┬───────────────────────────────────────┬───────────────┤
│        │                                       │               │
│ Thumbs │         Canvas (Slide)                │  Properties   │
│        │                                       │               │
│ [Slid1]│  ┌─────────────────────────────────┐  │ Text Format   │
│ [Slid2]│  │                                 │  │ ┌───────────┐ │
│ [Slid3]│  │    [Your Slide Content]         │  │ │Font: [▼]  │ │
│ [Slid4]│  │                                 │  │ │Size: [▼]  │ │
│ [Slid5]│  │    [Editable Text Boxes]        │  │ │Color: [■] │ │
│ [Slid6]│  │                                 │  │ │Bold [B]   │ │
│ [Slid7]│  │    [Drag & Drop Images]         │  │ │Italic [I] │ │
│ [Slid8]│  │                                 │  │ └───────────┘ │
│ [Slid9]│  │                                 │  │               │
│ [Sld10]│  │                                 │  │ Background    │
│        │  └─────────────────────────────────┘  │ ┌───────────┐ │
│ [+ Add]│                                       │ │Color: [■] │ │
│        │  [Zoom: 100% ▼]                       │ │Image: [+] │ │
│        │                                       │ └───────────┘ │
│ 15%    │            60%                        │    25%        │
└────────┴───────────────────────────────────────┴───────────────┘
```

### Features

#### Top Toolbar
- **Back Arrow:** Return to outline editor
- **Undo/Redo:** Standard edit history
- **Save:** Manual save with indicator (auto-saves enabled)
- **Theme Selector:** Dropdown (Light, Dark, Corporate, Creative)
- **Preview:** Opens viewer in new tab
- **Share:** Generate public link (modal)
- **Export:** Dropdown (PDF, PPTX, PNG)

#### Left Panel: Thumbnails (15%)
- Vertical list of all slides
- Drag to reorder
- Click to select
- Add new slide button
- Duplicate/Delete on right-click

#### Center Canvas (60%)
- Live slide preview
- Click to select elements (text boxes, images)
- Drag to move elements
- Resize handles on selection
- Snap-to-grid for alignment
- Zoom controls (50%, 100%, 150%, Fit)

#### Right Panel: Properties (25%)
- **Text Formatting:**
  - Font family dropdown
  - Font size slider
  - Color picker
  - Bold, Italic, Underline
  - Alignment (Left, Center, Right)
- **Background:**
  - Solid color picker
  - Gradient editor
  - Image upload
- **Element Properties:**
  - X/Y position
  - Width/Height
  - Rotation
  - Opacity

#### Keyboard Shortcuts
- **Cmd/Ctrl + Z:** Undo
- **Cmd/Ctrl + Y:** Redo
- **Cmd/Ctrl + S:** Save
- **Cmd/Ctrl + C/V:** Copy/Paste
- **Delete:** Remove element
- **Arrow Keys:** Nudge element 1px
- **Shift + Arrow:** Nudge element 10px

#### Mobile Behavior
- **Limited Editing:** View-only mode
- **Toast:** "Use desktop for full editing experience"
- **Allow:** Basic text edits, image uploads
- **Recommendation:** Desktop for design work

---

## 👀 Presentation Viewer (/presentations/:id/view)

### Layout (Fullscreen)

```
┌────────────────────────────────────────────────────────────────┐
│                                                            [✕]  │ ← Close button
│                                                                │
│                                                                │
│                                                                │
│                   [Slide Content Fullscreen]                   │
│                                                                │
│                                                                │
│                                                                │
│                                                                │
│ [←]                                                      [→]    │ ← Nav arrows
│                                            Slide 5 of 10       │ ← Counter
└────────────────────────────────────────────────────────────────┘
```

### Features

#### Navigation
- **Arrow Keys:** Previous/Next slide
- **Click:** Next slide
- **Space:** Next slide
- **Backspace:** Previous slide
- **Arrow Buttons:** On-screen prev/next (fade in on hover)

#### Controls (Bottom-Right)
- Slide counter: "5 of 10"
- Zoom: +/- buttons
- Fullscreen toggle (F11)
- Print button
- Download PDF
- Share link

#### Presenter Mode (Optional)
- Split view: Current slide (left) + Next slide (right)
- Notes panel (bottom)
- Timer (top-right)
- Slide thumbnails (left sidebar, mini)

#### Public Sharing
- If `is_public=true`, anyone with link can view
- No login required
- Watermark: "Created with Medellín AI Hub" (optional)
- Shareable URL: `/presentations/:id/view`

#### Private Viewing
- If `is_public=false`, requires authentication
- Only owner can view
- 404 for unauthorized users

---

## 💾 Data Persistence & Auto-Save

### Wizard Data
- **Saved Fields:** All 10 wizard answers
- **Save Trigger:** After each step, on skip, on exit
- **Storage:** Supabase `presentations` table
- **Status:** `draft` until outline generated

### Outline Data
- **Saved Fields:** Slide titles, content, order, notes
- **Save Trigger:** Every 30s, on navigation, on exit
- **Storage:** Supabase `presentations.content` (JSON)

### Editor Data
- **Saved Fields:** Slide elements, positions, styles, theme
- **Save Trigger:** Every 10s (more frequent), on change (debounced 3s)
- **Storage:** Supabase `presentations.content` (JSON)
- **Version History:** Optional (future feature)

---

## 🎨 Theme System

### Pre-Built Themes

#### 1. Professional
- Colors: Navy, Gold, White
- Fonts: Inter, Playfair Display
- Style: Clean, corporate

#### 2. Modern Tech
- Colors: Electric Blue, Cyan, Black
- Fonts: Poppins, Roboto Mono
- Style: Bold, gradient backgrounds

#### 3. Minimalist
- Colors: Black, White, Gray
- Fonts: Helvetica, Arial
- Style: Simple, lots of whitespace

#### 4. Creative
- Colors: Purple, Pink, Orange (gradient)
- Fonts: Montserrat, Quicksand
- Style: Playful, vibrant

### Custom Themes (Future)
- Color picker for brand colors
- Font selector
- Logo upload
- Save as custom theme

---

## ♿ Accessibility

### Keyboard Navigation
- Tab through all interactive elements
- Arrow keys for slide navigation
- Enter/Space to activate buttons
- Escape to close modals

### Screen Reader Support
- ARIA labels on all buttons
- ARIA live regions for auto-save status
- Descriptive alt text for images
- Semantic HTML structure

### Color Contrast
- Text: 4.5:1 minimum
- Ensure readability on all themes
- High contrast mode option

---

## 🚀 Performance Optimization

### Loading Strategy
1. Wizard: Instant load (conversational UI, no heavy assets)
2. Outline Editor: Load thumbnails lazily
3. Slide Editor: Code-split editor components
4. Viewer: Preload next slide

### Data Handling
- Compress presentation JSON (gzip)
- Paginate slide thumbnails (if > 20 slides)
- Cache images in browser
- Debounce auto-save to avoid excessive writes

### Image Optimization
- Resize images on upload (max 1920x1080)
- Convert to WebP
- Lazy load images in editor
- Use thumbnails in slide list

---

## 📈 Success Metrics

### Wizard Completion
- **Start Rate:** % of users who start wizard
- **Completion Rate:** % who finish all 10 steps (target: > 70%)
- **Average Time:** 10-15 minutes (target)
- **Drop-off Points:** Track which steps users abandon

### Outline Editing
- **Edit Rate:** % who edit AI-generated content
- **Regenerate Usage:** % who use AI regenerate
- **Time Spent:** Average time in outline editor

### Slide Editor
- **Usage:** % who proceed to editor from outline
- **Export Rate:** % who export PDF/PPTX
- **Share Rate:** % who create public links

### Presentation Views
- **Public Views:** Total views of shared presentations
- **Avg Views per Deck:** Engagement metric
- **View Duration:** How long viewers spend on deck

---

## 🔧 Implementation Checklist

### Phase 1: Wizard ✅
- [x] Wizard layout component
- [x] Progress indicator
- [x] Conversational UI (messages)
- [ ] AI question flow (10 steps)
- [ ] Auto-save logic
- [ ] Skip step functionality

### Phase 2: Outline Editor
- [ ] Split-panel layout
- [ ] Slide thumbnail list (draggable)
- [ ] Content editing (title, text)
- [ ] AI regenerate button
- [ ] Navigation to slide editor

### Phase 3: Slide Editor
- [ ] Three-panel layout (thumbs, canvas, properties)
- [ ] Drag-and-drop elements
- [ ] Text formatting toolbar
- [ ] Image upload
- [ ] Theme selector
- [ ] Export (PDF, PPTX)

### Phase 4: Viewer
- [ ] Fullscreen layout
- [ ] Slide navigation
- [ ] Public sharing links
- [ ] Presenter mode
- [ ] Download/print

### Phase 5: Polish
- [ ] Keyboard shortcuts
- [ ] Mobile responsiveness
- [ ] Loading states
- [ ] Error handling
- [ ] Analytics tracking

---

**Next Document:** See `BEST-PRACTICES-CHECKLIST.md` for implementation guidelines.

**Related:** See `COMPREHENSIVE-SITEMAP.md` for overall site structure.
