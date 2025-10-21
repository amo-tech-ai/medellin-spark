# 🚀 IMPROVED LOVABLE PROMPT: PITCH DECK FOR MEDELLIN AI HUB

**For:** Medellin AI Hub - AI-Powered Pitch Deck Generator (Integrated)
**Date:** October 15, 2025
**Based On:** Decktopus analysis + existing Medellin AI design system

---

## 📊 IMPROVEMENTS FROM DECKTOPUS ANALYSIS

After reviewing the Decktopus analysis document, here are key improvements to add:

### What's Missing in Current Prompt (07-prompt-pitch.md):
1. ❌ **Document Upload** - Users can't upload business plans or existing docs
2. ❌ **Smart Topic Suggestions** - No quick-start buttons for common pitch types
3. ❌ **Clarifying Questions** - AI doesn't ask about audience, goals, key metrics
4. ❌ **Industry Adaptation** - No mention of adapting style by industry/use case
5. ❌ **Template Library** - Missing pre-built templates for investor pitch, sales proposal, etc.
6. ❌ **Comment System** - No collaboration features for team feedback
7. ❌ **Version History** - Can't track changes or revert to previous versions
8. ❌ **Export Options** - No PDF or PowerPoint export mentioned
9. ❌ **Analytics** - Missing presentation performance tracking
10. ❌ **Learning System** - AI doesn't learn from user preferences over time

### What Should Be Added:
✅ **Enhanced AI Wizard** with document upload and smart suggestions
✅ **Refinement Questions** before generating
✅ **Industry Templates** (Tech Startup, Corporate, Educational, etc.)
✅ **Collaboration Tools** (comments, approvals, sharing)
✅ **Export System** (PDF, PPTX, shareable link)
✅ **Presentation Analytics** (views, time spent per slide)

---

## 🎨 COMPLETE IMPROVED PROMPT FOR LOVABLE

Hey Lovable! We're building an AI-powered pitch deck generator for Medellin AI Hub - a platform that helps startup founders, entrepreneurs, and professionals create professional presentations in minutes. This is a core feature that integrates with the existing site you've already built.

---

## 📋 What's Already Built on the Site

**Existing Pages (Keep Consistent Design):**
- ✅ Landing page with hero, stats, CTAs (purple/white theme)
- ✅ Main dashboard with sidebar navigation and stats cards
- ✅ User profiles with skills, experience, profile strength indicators
- ✅ Startup profile wizard (5-step multi-step form)
- ✅ Events page with cards and filters
- ✅ Perks page with partner cards and badges
- ✅ Programs page with accelerator listings

**Design System to Match:**
- **Colors:** Purple primary buttons, white/gray backgrounds, dark text
- **Typography:** Clean modern fonts from existing pages
- **Cards:** Same style as Events and Perks pages (shadow on hover)
- **Buttons:** Purple gradient for primary, outlined for secondary
- **Modals:** Dark overlay, white centered panel with close button
- **Sidebar:** Same as main dashboard (collapsible, logo at top)

---

## 🚀 PART 1: Enhanced AI Wizard (Existing `/pitch-deck` - Improve It)

**Current State:** Basic wizard exists but needs enhancement.

**What to Add:**

### Step 1: Choose Your Starting Point (NEW)
```
┌────────────────────────────────────────────────────────┐
│  How would you like to start?                         │
│                                                        │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐   │
│  │  📝 Prompt  │  │  📄 Upload  │  │  📋 Template│   │
│  │             │  │             │  │             │   │
│  │ Describe    │  │ Upload your │  │ Start with  │   │
│  │ your pitch  │  │ doc/business│  │ a proven    │   │
│  │ in words    │  │ plan (PDF,  │  │ template    │   │
│  │             │  │ DOCX, TXT)  │  │             │   │
│  └─────────────┘  └─────────────┘  └─────────────┘   │
│                                                        │
│  Popular Topics (Click to use):                       │
│  [Investor Pitch] [Sales Proposal] [Product Launch]   │
│  [Quarterly Review] [Team Training]   │
│  [Company Update] [Grant Proposal] [Marketing Plan]   │
└────────────────────────────────────────────────────────┘
```

**Features:**
- **3 Starting Options:** Let users choose their preferred workflow
- **Document Upload:** Accept PDF, DOCX, TXT files (up to 10MB)
- **Smart Topic Buttons:** 8-12 pre-configured pitch types for quick start
- **Clean Layout:** Large clickable cards with icons

---

### Step 2: Clarifying Questions (NEW)

After user selects starting point, ask these questions:

```
┌────────────────────────────────────────────────────────┐
│  Help us tailor your presentation                      │
│                                                        │
│  1. Who is your audience?                             │
│     ○ Investors/VCs   ○ Clients/Customers            │
│     ○ Internal Team   ○ Partners   ○ General Public   │
│                                                        │
│  2. What's your goal?                                 │
│     ○ Raise Funding   ○ Win Deal   ○ Train Team      │
│     ○ Get Partnership ○ Report Progress              │
│                                                        │
│  3. Presentation length?                              │
│     ○ Quick (5-7 slides)   ○ Standard (10-15 slides) │
│     ○ Detailed (18-25 slides)   ○ Let AI decide      │
│                                                        │
│  4. Tone preference?                                  │
│     ○ Professional   ○ Conversational   ○ Technical  │
│                                                        │
│  5. Industry/Category?                                │
│     [Dropdown: Tech Startup, Healthcare, Education,   │
│      Finance, E-commerce, SaaS, AI/ML, Other]        │
│                                                        │
│  [Skip] ─────────────────────────── [Continue] →     │
└────────────────────────────────────────────────────────┘
```

**Why Important:** These questions help AI adapt content style, slide count, and data focus. Users can skip if they want default behavior.

---

### Step 3: AI Processing (Enhanced)

**Current:** Simple "Generating..." spinner
**New:** Show what AI is doing:

```
┌────────────────────────────────────────────────────────┐
│  🤖 AI is creating your presentation...               │
│                                                        │
│  ✅ Parsed your input                                 │
│  ✅ Analyzed audience and goals                       │
│  🔄 Generating slide structure... (8/15 slides)       │
│  ⏳ Adding data visualizations...                     │
│  ⏳ Selecting optimal layouts...                      │
│                                                        │
│  Estimated: 30 seconds remaining                      │
└────────────────────────────────────────────────────────┘
```

**Features:**
- Progress indicators for each AI step
- Real-time slide count
- Estimated time remaining
- Cancel button if taking too long

---

## 📚 PART 2: Template Library (NEW PAGE)

**Route:** `/presentations/templates`

Add a template gallery that users can access from:
- Step 1 "Choose Template" card
- Dashboard quick action "Browse Templates"
- Presentation list page "Start from Template" button

### Template Gallery Layout:

```
┌────────────────────────────────────────────────────────┐
│  Choose a Template                            [✕]      │
│                                                        │
│  Filter: [All] [Investor] [Sales] [Internal] [Other] │
│                                                        │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐            │
│  │ INVESTOR │  │  SALES   │  │ PRODUCT  │            │
│  │  PITCH   │  │ PROPOSAL │  │ LAUNCH   │            │
│  │          │  │          │  │          │            │
│  │ 12 slides│  │ 15 slides│  │ 10 slides│            │
│  │ [Preview]│  │ [Preview]│  │ [Preview]│            │
│  └──────────┘  └──────────┘  └──────────┘            │
│                                                        │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐            │
│  │ COMPANY  │  │  TEAM    │  │  GRANT   │            │
│  │  UPDATE  │  │ TRAINING │  │ PROPOSAL │            │
│  │          │  │          │  │          │            │
│  │ 8 slides │  │ 20 slides│  │ 18 slides│            │
│  │ [Preview]│  │ [Preview]│  │ [Preview]│            │
│  └──────────┘  └──────────┘  └──────────┘            │
└────────────────────────────────────────────────────────┘
```

**6 Pre-Built Templates:**

1. **Investor Pitch** (12 slides)
   - Problem, Solution, Market Size, Business Model, Traction
   - Team, Competition, Go-to-Market, Financials, Investment Ask
   - Milestones, Thank You

2. **Sales Proposal** (15 slides)
   - Executive Summary, Client Challenge, Our Approach
   - Solution Details, Timeline, Pricing, Case Studies
   - ROI Projections, Team, Why Us, Next Steps

3. **Product Launch** (10 slides)
   - Product Intro, Problem Solved, Key Features
   - Demo Screenshots, Target Market, Pricing
   - Launch Timeline, Success Metrics, Call to Action

4. **Company Update** (8 slides)
   - Quarter Highlights, Key Metrics, Team Updates
   - Product Progress, Customer Wins, Challenges
   - Next Quarter Goals, Thank You

5. **Team Training** (20 slides)
   - Learning Objectives, Agenda, Core Concepts
   - Step-by-step Tutorials, Best Practices
   - Common Mistakes, Resources, Quiz, Summary

6. **Grant Proposal** (18 slides)
   - Organization Overview, Problem Statement, Solution
   - Impact Metrics, Budget Breakdown, Timeline
   - Team Qualifications, Success Stories, Evaluation Plan

---

## 📝 PART 3: Outline Editor (Enhanced `/presentations/:id/outline`)

**Current:** Basic outline viewer from 07-prompt-pitch.md
**New:** Add collaboration, version history, and export preview

### Enhanced Layout:

```
┌─────────────────────────────────────────────────────────────────────┐
│ [Logo] EventOS Startup Pitch    11 Slides    💾 Saved 2 min ago    │
│                                                                     │
│ [Comments: 3] [History] [Share] [Export ▼]        [Edit Slides →] │
├──────────────────┬──────────────────────────────────────────────────┤
│ Left Sidebar     │ Main Content Area                                │
│ (240px width)    │                                                  │
│                  │ 💬 2 new comments                                │
│ Refine your      │                                                  │
│ presentation ▼   │ ⠿ Slide 1: Title Slide                          │
│                  │    EventOS: Revolutionizing Event Management     │
│ Industry:        │    [🔄][➖][📋][🗑️][▼]  💬1                     │
│ [Tech Startup▼]  │                                                  │
│                  │ ⠿ Slide 2: The Problem                          │
│ Audience:        │    Event organizers face 5 major challenges...   │
│ [Investors ▼]    │    [🔄][➖][📋][🗑️][▼]                          │
│                  │                                                  │
│ Tone:            │ ⠿ Slide 3: Our Solution                         │
│ [Professional▼]  │    AI-powered platform that simplifies...        │
│                  │    [🔄][➖][📋][🗑️][▼]  💬1                     │
│ [Apply Changes]  │                                                  │
│                  │ [...8 more slides...]                            │
│ ─────────────    │                                                  │
│                  │ [← Back to Dashboard] [Choose Theme →]           │
│ Quick Actions    │                                                  │
│ [📄 Add Slide]   │                                                  │
│ [🎨 Change Theme]│                                                  │
│ [📤 Export]      │                                                  │
└──────────────────┴──────────────────────────────────────────────────┘
```

**New Features:**

1. **Comment Indicators** (💬 icon with count)
   - Show which slides have comments
   - Badge in top nav shows total unread comments
   - Click to open comment sidebar

2. **Version History** ([History] button)
   - Opens modal showing past versions
   - "Auto-saved 2 min ago", "Saved by you 1 hour ago"
   - Click to preview or restore old version

3. **Export Preview** ([Export ▼] dropdown)
   - Quick export to PDF
   - Export to PPTX
   - Copy shareable link
   - Download as HTML

4. **Sidebar Refinement Panel**
   - Change industry, audience, tone
   - [Apply Changes] button re-generates with new context
   - Shows loading spinner during re-generation

---

## 💬 PART 4: Comment System (NEW Component)

**Trigger:** Click 💬 icon on any slide or [Comments: 3] in top nav

### Comment Sidebar (Slides Right In):

```
┌─────────────────────────────────┐
│ Comments (3)          [✕]       │
├─────────────────────────────────┤
│                                 │
│ 📍 Slide 3: Our Solution        │
│                                 │
│ 👤 María González               │
│    "Can we add more specific    │
│    metrics here? Show 40%       │
│    time savings data?"          │
│    2 hours ago                  │
│    [Reply] [Resolve]            │
│                                 │
│    └─ 👤 You (Sarah)            │
│       "Good idea! I'll add that"│
│       1 hour ago                │
│                                 │
│ ─────────────────────────────── │
│                                 │
│ 📍 Slide 1: Title Slide         │
│                                 │
│ 👤 Carlos Ruiz                  │
│    "Logo looks great! ✨"       │
│    3 hours ago   ✅ Resolved    │
│                                 │
│ ─────────────────────────────── │
│                                 │
│ 💬 Add a comment...             │
│ [Select slide ▼] [Post]        │
│                                 │
└─────────────────────────────────┘
```

**Features:**
- Slide-specific comments with anchor indicators (📍)
- Threaded replies
- Resolve/Reopen comments
- Real-time updates (if multiple users viewing)
- Commenter profile pics and names

---

## 🕐 PART 5: Version History Modal (NEW)

**Trigger:** Click [History] button in Outline Editor

### Version History Layout:

```
┌──────────────────────────────────────────────────────────┐
│  Version History                                  [✕]    │
├──────────────────────────────────────────────────────────┤
│                                                          │
│  ✅ Current Version                                      │
│  Auto-saved 2 minutes ago                               │
│  11 slides                                              │
│  [👁️ Preview]                                           │
│                                                          │
│  ───────────────────────────────────────────────────── │
│                                                          │
│  📌 Saved by you                                         │
│  1 hour ago - "Added market size data"                  │
│  11 slides                                              │
│  [👁️ Preview] [↩️ Restore]                              │
│                                                          │
│  ───────────────────────────────────────────────────── │
│                                                          │
│  💾 Auto-save                                            │
│  3 hours ago                                            │
│  10 slides                                              │
│  [👁️ Preview] [↩️ Restore]                              │
│                                                          │
│  ───────────────────────────────────────────────────── │
│                                                          │
│  📌 Saved by María González                             │
│  Yesterday - "Initial AI generation"                    │
│  12 slides                                              │
│  [👁️ Preview] [↩️ Restore]                              │
│                                                          │
└──────────────────────────────────────────────────────────┘
```

**Features:**
- Automatic saves every 2 minutes
- Manual saves with optional comment
- Preview old version without restoring
- Restore creates new version (doesn't delete history)
- Shows who made changes (for shared presentations)

---

## 🎨 PART 6: Layout & Theme Pickers (Same as 07-prompt)

**Keep these exactly as specified in 07-prompt-pitch.md:**

### Layout Picker Modal
- 12 layout options in 3x4 grid
- Large preview on left (500px width)
- Apply button
- Layouts: Four Number Cards, Thank You, Mission Split, etc.

### Theme Picker Modal
- 10 themes with 3-dot color indicators
- Large preview panel
- Themes: Vivid Pop, Ocean Breeze, Forest Green, etc.

**(No changes needed - copy from original prompt)**

---

## ✏️ PART 7: Presentation Editor (Enhanced `/presentations/:id/edit`)

**Current:** Basic WYSIWYG editor from 07-prompt-pitch.md
**New:** Add real-time collaboration indicators and AI suggestions

### Enhanced Editor Layout:

```
┌─────────────────────────────────────────────────────────────────────┐
│ [Logo] EventOS Startup Pitch    Slide 3/11    💾 Saved now          │
│                                                                     │
│ [Comments: 3] [History] [Share] [Export ▼]      [Preview] [Done]  │
│                                                                     │
│ 👤 María is viewing Slide 5  👤 Carlos is editing Slide 7          │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ┌─────────────────────────────────────────────────────────┐      │
│  │ [B][I][U] [H1▼] [Color▼] [Align▼] [List] [Link] [Image]│      │
│  ├─────────────────────────────────────────────────────────┤      │
│  │                                                         │      │
│  │  Our Solution                                          │      │
│  │  ────────────                                          │      │
│  │                                                         │      │
│  │  EventOS is an AI-powered event management            │      │
│  │  platform that automates 80% of planning tasks.       │      │
│  │                                                         │      │
│  │  • Smart venue recommendations                         │      │
│  │  • Automated attendee tracking                         │      │
│  │  • Real-time analytics dashboard                       │      │
│  │                                                         │      │
│  │                                              💬 1 comment│      │
│  └─────────────────────────────────────────────────────────┘      │
│                                                                     │
│  ┌──────────────────────────────────────────────────────┐         │
│  │ 💡 AI Suggestions                             [✕]    │         │
│  ├──────────────────────────────────────────────────────┤         │
│  │ • Add specific metrics (e.g., "saves 15 hours/week") │         │
│  │ • Consider adding a customer testimonial quote        │         │
│  │ • Visual: Upload product screenshot or demo GIF       │         │
│  └──────────────────────────────────────────────────────┘         │
│                                                                     │
│  ┌─ Slide Navigation ────────────────────────────────────┐         │
│  │ [◀ Prev: The Problem] [Next: Market Size ▶]         │         │
│  └──────────────────────────────────────────────────────┘         │
└─────────────────────────────────────────────────────────────────────┘
```

**New Features:**

1. **Real-Time Presence Indicators**
   - Show who's viewing/editing which slides
   - Colored cursor indicators for active editors
   - Conflict prevention (warn if editing same slide)

2. **AI Suggestions Panel**
   - Context-aware suggestions as you type
   - Recommends adding data/metrics
   - Suggests visual elements
   - Can dismiss or apply suggestions

3. **Enhanced Toolbar**
   - Rich text formatting (bold, italic, underline)
   - Heading styles (H1, H2, Body)
   - Color picker for text/background
   - Alignment options
   - Lists (bullet, numbered)
   - Add links, images, charts

4. **Slide-by-Slide Comments**
   - 💬 icon shows comment count per slide
   - Click to open comment sidebar

---

## 👁️ PART 8: Presentation Viewer (Enhanced `/presentations/:id/view`)

**Current:** Basic full-screen viewer from 07-prompt-pitch.md
**New:** Add analytics tracking, presenter notes, and audience engagement

### Enhanced Viewer Layout:

```
┌─────────────────────────────────────────────────────────────────────┐
│                                                                     │
│                                                                     │
│                      Our Solution                                   │
│                      ────────────                                   │
│                                                                     │
│         EventOS is an AI-powered event management                   │
│         platform that automates 80% of planning tasks.              │
│                                                                     │
│              • Smart venue recommendations                          │
│              • Automated attendee tracking                          │
│              • Real-time analytics dashboard                        │
│                                                                     │
│                                                                     │
│                                                          Slide 3/11 │
│                                                                     │
│ [◀ Prev] [Next ▶]  [Notes] [Share] [⚙️]                    [✕ Esc]│
└─────────────────────────────────────────────────────────────────────┘

Presenter Notes Panel (Toggle with [Notes]):
┌─────────────────────────────────────────────────────────────┐
│ 📝 Slide 3 Notes                                            │
│                                                             │
│ • Emphasize the "80% automation" stat                       │
│ • Mention 500+ companies using EventOS                      │
│ • If asked about pricing, refer to Slide 9                  │
└─────────────────────────────────────────────────────────────┘
```

**New Features:**

1. **Analytics Tracking** (Background)
   - Track views per slide
   - Time spent per slide
   - Drop-off points (where viewers exit)
   - Clicks on links
   - Share/export actions

2. **Presenter Notes**
   - Toggle [Notes] button to show/hide
   - Appears at bottom or on second screen
   - Only visible to presenter (not shared audience)
   - Can include talking points, reminders, FAQs

3. **Share from Viewer**
   - [Share] button opens share modal
   - Generate public link with optional password
   - Track who accessed the link
   - Set expiration date

4. **Keyboard Shortcuts**
   - ← → arrows for navigation
   - Escape to exit
   - N for notes toggle
   - F for fullscreen
   - P for presenter mode (notes + timer)

5. **Settings Menu** ([⚙️] icon)
   - Auto-advance slides (timer)
   - Loop presentation
   - Show/hide slide numbers
   - Background music (optional)

---

## 📤 PART 9: Export & Share System (NEW)

### Share Modal (Triggered from [Share] button)

```
┌──────────────────────────────────────────────────────────┐
│  Share Presentation                              [✕]     │
├──────────────────────────────────────────────────────────┤
│                                                          │
│  🔗 Shareable Link                                       │
│  ┌────────────────────────────────────────────────────┐ │
│  │ https://medellin-spark.app/p/abc123xyz            │ │
│  │                                        [📋 Copy]   │ │
│  └────────────────────────────────────────────────────┘ │
│                                                          │
│  🔒 Privacy Settings                                     │
│  ○ Public - Anyone with link can view                   │
│  ○ Password protected - Require password                │
│  ○ Private - Only team members                          │
│                                                          │
│  ⏰ Expiration (Optional)                                │
│  [None ▼]  Options: 24 hours, 7 days, 30 days, Never   │
│                                                          │
│  📊 Track Analytics                                      │
│  ☑ Track views and engagement                           │
│  ☑ Notify me when someone views                         │
│                                                          │
│  ─────────────────────────────────────────────────────  │
│                                                          │
│  📧 Invite Team Members                                  │
│  ┌────────────────────────────────────────────────────┐ │
│  │ Enter email addresses...                          │ │
│  └────────────────────────────────────────────────────┘ │
│  [Can View ▼] [Can Comment ▼] [Can Edit ▼]             │
│  [Send Invites]                                         │
│                                                          │
│  ─────────────────────────────────────────────────────  │
│                                                          │
│  📥 Export Options                                       │
│  [Download PDF] [Download PPTX] [Export HTML]           │
│                                                          │
└──────────────────────────────────────────────────────────┘
```

**Features:**
- Generate unique shareable links
- Password protection option
- Link expiration dates
- Track who accessed the link
- Email invites with permission levels (view/comment/edit)
- Multiple export formats (PDF, PPTX, HTML)

---

## 📊 PART 10: Analytics Dashboard (NEW Page)

**Route:** `/presentations/:id/analytics`
**Access:** From presentation list or viewer → [⚙️] → "View Analytics"

### Analytics Layout:

```
┌─────────────────────────────────────────────────────────────────────┐
│ [Logo] EventOS Startup Pitch - Analytics                           │
│                                                                     │
│ [Outline] [Edit] [View] [Analytics] [Settings]                     │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  📊 Overview (Last 30 Days)                                         │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐              │
│  │ 👁️ 47   │  │ ⏱️ 3:24  │  │ 💬 12   │  │ 📤 8    │              │
│  │ Views   │  │ Avg Time │  │ Comments│  │ Shares  │              │
│  └─────────┘  └─────────┘  └─────────┘  └─────────┘              │
│                                                                     │
│  📈 Views Over Time                                                 │
│  ┌────────────────────────────────────────────────────────────┐   │
│  │ 15 │          ●                                            │   │
│  │    │         ●  ●                                          │   │
│  │ 10 │     ●  ●    ●     ●                                   │   │
│  │    │   ●  ●        ●  ●  ●                                 │   │
│  │  5 │  ●                   ●  ●                             │   │
│  │    │                            ●                          │   │
│  │  0 └───────────────────────────────────────────────────── │   │
│  │      Nov 1    Nov 8    Nov 15   Nov 22   Nov 29          │   │
│  └────────────────────────────────────────────────────────────┘   │
│                                                                     │
│  🎯 Engagement by Slide                                             │
│  ┌────────────────────────────────────────────────────────────┐   │
│  │ Slide 1: Title         ████████████░░░░  80% completion   │   │
│  │ Slide 2: Problem       ███████████░░░░░  70% completion   │   │
│  │ Slide 3: Solution      ████████░░░░░░░░  55% completion   │   │
│  │ Slide 4: Market Size   ██████░░░░░░░░░░  40% completion   │   │
│  │ Slide 5: Product       ████░░░░░░░░░░░░  30% completion   │   │
│  │ [... 6 more slides]                                       │   │
│  └────────────────────────────────────────────────────────────┘   │
│                                                                     │
│  👥 Recent Viewers                                                  │
│  • investor@vc-firm.com - 2 hours ago (viewed all 11 slides)       │
│  • client@company.com - Yesterday (stopped at Slide 6)             │
│  • Anonymous - 3 days ago (viewed Slides 1-4)                      │
│  • team@medellin.com - Last week (full presentation)               │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

**Metrics Tracked:**
- Total views
- Unique viewers
- Average time spent
- Completion rate (% who reach last slide)
- Drop-off points
- Most/least viewed slides
- Comments and engagement
- Share count
- Export downloads
- Link clicks (if slides have links)

---

## 🧠 PART 11: AI Learning System (NEW)

**Purpose:** AI adapts to user preferences over time for smarter suggestions

### How It Works:

**Background Learning (No UI needed - automatic):**

1. **Style Preferences**
   - Tracks which themes user selects most often
   - Remembers preferred layouts (charts vs text-heavy)
   - Learns tone preferences (formal, conversational, technical)

2. **Content Patterns**
   - Notices which slide types user adds manually
   - Detects common metrics/data points user includes
   - Learns industry-specific terminology user prefers

3. **Workflow Habits**
   - Remembers preferred presentation length
   - Tracks if user prefers AI-generated vs template-based
   - Learns editing patterns (heavy editor vs light touch)

**Where Learning Appears:**

- **AI Wizard:** Pre-selects user's preferred options
- **Theme Picker:** Shows frequently used themes first
- **Layout Picker:** Prioritizes user's favorite layouts
- **AI Suggestions:** More accurate, context-aware recommendations
- **Template Library:** "Recommended for You" section

**User Control (Settings Page):**

```
┌──────────────────────────────────────────────────────────┐
│  🧠 AI Personalization                                   │
├──────────────────────────────────────────────────────────┤
│                                                          │
│  ☑ Enable AI learning from my preferences               │
│                                                          │
│  Your AI Profile:                                        │
│  • Prefers "Professional" tone (used 80% of time)       │
│  • Often includes metrics and data visualizations        │
│  • Creates 10-15 slide presentations (avg)               │
│  • Favorite theme: Ocean Breeze                          │
│  • Most used layout: Four Number Cards                   │
│                                                          │
│  [Reset AI Learning] [Download My Data]                 │
│                                                          │
└──────────────────────────────────────────────────────────┘
```

**Privacy:**
- All learning data stored in user's profile (not shared)
- Can disable AI learning anytime
- Can reset learned preferences
- Can export data to see what AI knows

---

## 🔄 PART 12: Updated User Flows

### Flow 1: AI-Generated from Prompt (Enhanced)

```
1. Dashboard → Click "Generate Pitch Deck"
   ↓
2. /pitch-deck - Step 1: Choose Starting Point (NEW)
   → User clicks "📝 Prompt"
   → Or clicks [Investor Pitch] quick-start button
   ↓
3. Step 2: Clarifying Questions (NEW)
   → Who's your audience? (Investors)
   → What's your goal? (Raise Funding)
   → Length? (Standard 10-15 slides)
   → Tone? (Professional)
   → Industry? (Tech Startup)
   → [Continue]
   ↓
4. Step 3: AI Processing (ENHANCED)
   → Shows progress: "Generating slide structure... 8/12 slides"
   → Estimated time: 30 seconds
   ↓
5. /presentations/123/outline - Outline Editor (ENHANCED)
   → Review 12 slides
   → See comment notifications: "💬 2 new comments"
   → Use sidebar: Change industry/audience/tone if needed
   → Click [Choose Theme]
   ↓
6. Theme Picker Modal (NEW: AI shows recommended themes first)
   → Select "Ocean Breeze" (user's favorite learned by AI)
   → [Apply]
   ↓
7. /presentations/123/edit - Editor (ENHANCED)
   → Edit slides with rich text toolbar
   → See AI suggestions: "Add specific metrics"
   → See team presence: "María is viewing Slide 5"
   → Add comments: 💬 "Can we add customer logos here?"
   → [Preview]
   ↓
8. /presentations/123/view - Viewer (ENHANCED)
   → Full-screen presentation mode
   → Toggle [Notes] for presenter notes
   → Click [Share] to generate link
   → Background: Analytics tracking views
   ↓
9. Share Modal (NEW)
   → Copy shareable link
   → Set privacy: Public with password
   → Enable tracking: ☑ Track views
   → [Download PDF] or [Download PPTX]
   ↓
10. /presentations/123/analytics - Analytics (NEW)
    → View stats: 47 views, 3:24 avg time
    → See engagement: 80% reached last slide
    → Check viewers: investor@vc-firm.com viewed all slides
```

### Flow 2: Document Upload (NEW)

```
1. /pitch-deck - Step 1: Choose Starting Point
   → User clicks "📄 Upload"
   ↓
2. File Upload Modal
   → Drag & drop business_plan.pdf (5MB)
   → AI parsing: "Analyzing your document..."
   → AI extracts: Problem, solution, market size, team, traction
   ↓
3. Step 2: Clarifying Questions
   → Pre-filled based on document content
   → Audience: Investors (detected from doc)
   → Goal: Raise Funding (detected from doc)
   → User can adjust or [Continue]
   ↓
4. [Continue to Outline Editor as in Flow 1]
```

### Flow 3: Template-Based (NEW)

```
1. /pitch-deck - Step 1: Choose Starting Point
   → User clicks "📋 Template"
   ↓
2. /presentations/templates - Template Gallery (NEW)
   → Browse 6 templates
   → Filter: [Investor] category
   → Click "Investor Pitch" template
   → [Preview] shows 12-slide structure
   → [Use This Template]
   ↓
3. /presentations/124/outline - Pre-filled Outline
   → 12 slides with placeholder content
   → User fills in: Company name, problem, solution, etc.
   → [Choose Theme]
   ↓
4. [Continue as normal flow]
```

### Flow 4: Collaboration Flow (NEW)

```
1. /presentations/123/outline
   → Sarah clicks [Share] → Invites María (Can Comment)
   ↓
2. María receives email → Opens shared link
   ↓
3. /presentations/123/view
   → María reviews presentation
   → Clicks 💬 on Slide 3
   → Adds comment: "Add specific metrics here"
   ↓
4. Sarah gets notification: "New comment from María"
   ↓
5. /presentations/123/edit
   → Sarah sees comment indicator: 💬1 on Slide 3
   → Opens comment sidebar
   → Replies: "Good idea! I'll add that"
   → Edits slide to add metrics
   → Clicks [Resolve] on comment
   ↓
6. María gets notification: "Comment resolved"
   → Can reopen if needed
```

---

## ✅ PART 13: Success Criteria

**Must-Have Features (Week 1-2):**
- ✅ Enhanced AI Wizard with 3 starting options (Prompt, Upload, Template)
- ✅ Clarifying questions before generation
- ✅ Document upload and parsing (PDF, DOCX, TXT)
- ✅ Smart topic suggestion buttons (8-12 options)
- ✅ Template library with 6 pre-built templates
- ✅ Outline Editor with comment indicators
- ✅ Comment system with threading and resolve
- ✅ Version history with preview and restore
- ✅ Theme Picker with AI-recommended themes first
- ✅ Layout Picker (12 layouts)
- ✅ Presentation Editor with rich text toolbar
- ✅ AI suggestion panel in editor
- ✅ Presentation Viewer with presenter notes
- ✅ Share modal with link generation
- ✅ Export to PDF, PPTX, HTML
- ✅ Analytics dashboard with key metrics

**Nice-to-Have (Week 3+):**
- Real-time collaboration (live cursor indicators)
- AI learning system (adapts to preferences)
- Advanced analytics (heatmaps, A/B testing)
- Custom branding (logos, colors, fonts)
- Slide animations and transitions
- Video embed support
- Integration with Google Drive/Dropbox

**Testing Checklist:**
- [ ] Upload 5MB PDF → AI generates slides correctly
- [ ] Click [Investor Pitch] button → Creates 12-slide pitch
- [ ] Add comment → Other user receives notification
- [ ] Restore old version → Doesn't break current version
- [ ] Export to PDF → All slides render correctly
- [ ] Share link with password → Password required to view
- [ ] Track analytics → Views and time tracked accurately
- [ ] AI suggestions → Relevant to slide content

---

## 🎯 PART 14: Design Guidelines

**Colors:**
- Primary: Purple (#8B5CF6) for buttons, links, highlights
- Secondary: White/gray (#F9FAFB, #F3F4F6) for backgrounds
- Text: Dark gray (#1F2937) for headings, medium gray (#6B7280) for body
- Success: Green (#10B981) for confirmations, "Saved" indicators
- Warning: Orange (#F59E0B) for alerts, unsaved changes
- Danger: Red (#EF4444) for delete actions, errors

**Typography:**
- Headings: Bold, 24-32px
- Body: Regular, 16px
- Small text: 14px for captions, timestamps
- Monospace: For code, shareable links

**Spacing:**
- Consistent padding: 16px, 24px, 32px
- Card gaps: 16px between cards
- Section gaps: 48px between major sections
- Button spacing: 8px between button groups

**Components to Reuse:**
- Same card style as Events/Perks pages (white, shadow on hover)
- Same buttons as dashboard (purple gradient primary, outlined secondary)
- Same modals as existing site (dark overlay, centered white panel)
- Same sidebar as dashboard (collapsible, logo at top)

**Accessibility:**
- Aria-labels on all interactive elements
- Keyboard navigation (Tab, Enter, Escape)
- Focus indicators (blue outline on focus)
- Color contrast: WCAG AA minimum
- Screen reader text for icons

**Mobile Responsive:**
- Stack layouts vertically on mobile (< 768px)
- Hide sidebar on mobile, show hamburger menu
- Large touch targets (44x44px minimum)
- Swipe gestures for slide navigation

---

## 📦 PART 15: Implementation Notes

**Tech Stack (Use What's Already in Medellin AI):**
- React (existing)
- TailwindCSS for styling (existing)
- Shadcn UI components (existing)
- Supabase for backend (existing)
- Supabase Storage for file uploads
- Supabase Realtime for live collaboration

**File Upload:**
- Use Supabase Storage bucket: `presentation-uploads`
- Max file size: 10MB
- Allowed types: `.pdf`, `.docx`, `.txt`
- Server-side parsing with `pdf-parse`, `mammoth` (DOCX)

**AI Generation:**
- Use existing AI integration (Anthropic/OpenAI)
- Prompt template for each use case (investor, sales, etc.)
- Stream responses for progress indicator
- Fallback to default structure if AI fails

**Analytics Tracking:**
- Store in Supabase table: `presentation_views`
- Columns: presentation_id, viewer_email, slide_number, timestamp, duration
- Use Supabase Functions for aggregation queries

**Comments & Collaboration:**
- Supabase table: `presentation_comments`
- Supabase Realtime subscriptions for live updates
- Email notifications via Supabase Edge Functions

**Export:**
- PDF: Use `jsPDF` or server-side Puppeteer
- PPTX: Use `pptxgenjs` library
- HTML: Export as static HTML with inline CSS

---

## 🎬 PART 16: Summary & Next Steps

**What You're Building:**

A comprehensive AI-powered pitch deck generator that integrates seamlessly with the existing Medellin AI Hub platform. This isn't just a simple slide creator - it's a full-featured presentation tool with:

1. **Smart AI Generation** - Document upload, clarifying questions, industry adaptation
2. **Template Library** - 6 pre-built templates for common use cases
3. **Collaboration Tools** - Comments, version history, real-time presence
4. **Professional Editing** - WYSIWYG editor with AI suggestions
5. **Powerful Sharing** - Password-protected links, permission levels, analytics
6. **Export Options** - PDF, PPTX, HTML formats
7. **AI Learning** - System adapts to user preferences over time

**Priority Order:**

**Phase 1 (Week 1):** Core Creation Flow
- Enhanced AI Wizard (Steps 1-3)
- Template Library
- Outline Editor with basic features
- Theme & Layout Pickers

**Phase 2 (Week 2):** Editing & Viewing
- Presentation Editor with toolbar
- Presentation Viewer with notes
- Basic share modal
- PDF/PPTX export

**Phase 3 (Week 3):** Collaboration
- Comment system
- Version history
- Analytics dashboard
- AI suggestions panel

**Phase 4 (Week 4+):** Advanced Features
- Real-time collaboration
- AI learning system
- Advanced analytics
- Mobile optimization

**Design Consistency:**
- Match existing Medellin AI Hub purple/white theme
- Use same card, button, and modal styles
- Keep navigation consistent with dashboard
- Mobile-responsive like other pages

**Success Metrics:**
- Users can create a presentation in < 5 minutes
- 80%+ users complete full flow (don't abandon)
- 50%+ users share or export their presentation
- Comments increase collaboration by 3x
- AI suggestions accepted 40%+ of the time

---

## ✨ That's It!

Build this step-by-step following the phases above. Start with the core AI wizard and outline editor, then layer in the collaboration and analytics features. Keep the design consistent with the existing Medellin AI Hub aesthetic, and focus on making it fast and intuitive.

The key differentiators from competitors:
1. **Document upload** - Turn business plans into presentations
2. **Smart topic buttons** - Quick-start for common pitch types
3. **Template library** - Proven structures for different use cases
4. **Collaboration built-in** - Comments and version history from day one
5. **AI that learns** - Gets smarter with each presentation you create
6. **Full analytics** - Know exactly who viewed your presentation and for how long

Let me know if you need clarification on any section! 🚀
