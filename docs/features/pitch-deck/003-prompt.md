# Pitch Deck Wizard - ChatGPT-Style Conversational Interface

## 🎯 PROJECT OVERVIEW

**Feature Name:** AI-Powered Pitch Deck Wizard with Conversational Chat Interface
**Target Users:** Startup founders in Medellin AI Hub accelerator
**Primary Goal:** Create professional pitch decks through natural conversation (like ChatGPT)
**Timeline:** MVP in 3-5 weeks
**Inspiration:** ChatGPT's conversational UI + ALLWEONE® AI Presentation Generator
**Reference Image:** Based on `07bd575c-d17a-4303-a399-3fd7a5b9b7e3.png` (clean, minimal design)


---

## 💬 COMPLETE CHATGPT-STYLE INTERFACE

For the full comprehensive prompt with all sections, see the complete document.

Key sections included:
1. ChatGPT-style interface layout with message bubbles
2. 10 conversation stages (greeting → deck generation)
3. UI components (7 card types)
4. Content & taglines
5. Conversation flows (4 user scenarios)
6. AI behavior & personality guidelines
7. Theme system (5 professional themes)
8. 12 slide templates with layouts
9. Implementation checklist (5 phases)
10. Success metrics & KPIs

---

**Document created:** October 11, 2025
**For:** Lovable AI implementation
**Status:** Production-ready specification


## 📸 VISUAL REFERENCE & DESIGN PRINCIPLES

### Reference Design Analysis
From the provided image, the platform should have:
- **Hero Section:** "Create stunning presentations in seconds with AI"
- **Clean, minimal aesthetic** with generous white space
- **Workflow visualization** showing clear step-by-step process
- **Card-based layouts** for features and options
- **Modern, professional feel** with orange/grey/white palette

### Core Design Principles
1. **Conversational** - Natural language, friendly tone
2. **Progressive Disclosure** - Don't overwhelm with too many options upfront
3. **Visual Feedback** - Show progress, confirm actions, celebrate wins
4. **Clear CTAs** - Orange buttons for primary actions, grey for secondary
5. **Mobile-First** - Touch-optimized, responsive design

---

## 💬 MAIN CHAT INTERFACE LAYOUT

```
┌───────────────────────────────────────────────────────────────┐
│ [≡] Pitch Deck AI                    [New Chat] [History ▼]  │
├───────────────────────────────────────────────────────────────┤
│                       CHAT CONTAINER                          │
│                       (Scrollable)                            │
│                                                                │
│  ┌──────────────────────────────────────────────────────┐   │
│  │ 🤖 AI Assistant                         2:34 PM      │   │
│  │                                                       │   │
│  │ Hi! I'm your AI pitch deck assistant. I'll help you  │   │
│  │ create a professional investor presentation in ~10   │   │
│  │ minutes through natural conversation.                │   │
│  │                                                       │   │
│  │ Quick Start:                                          │   │
│  │ ┌──────────┐ ┌──────────┐ ┌──────────┐             │   │
│  │ │ 📝 Use   │ │ ✨ Start │ │ 📤 Upload│             │   │
│  │ │ Wizard   │ │ Fresh    │ │ Deck     │             │   │
│  │ └──────────┘ └──────────┘ └──────────┘             │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                                │
│          ┌────────────────────────────────────────┐           │
│          │ I'm building EventAI, an AI-powered    │           │
│          │ event management platform...           │           │
│          │                               2:35 PM  │           │
│          └────────────────────────────────────────┘           │
│                                                                │
│  ┌──────────────────────────────────────────────────────┐   │
│  │ 🤖 AI Assistant                         2:36 PM      │   │
│  │                                                       │   │
│  │ Great! EventAI sounds promising. I have 3 questions: │   │
│  │                                                       │   │
│  │ 1. Who's your target market? (e.g., enterprises)    │   │
│  │ 2. What makes EventAI different?                     │   │
│  │ 3. Do you have traction? (users, revenue)           │   │
│  │                                                       │   │
│  │ Answer all at once or one at a time - I'm flexible!  │   │
│  │                                                       │   │
│  │ [Copy] [Regenerate] [👍] [👎]                        │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                                │
│  [AI is typing...]                                            │
│                                                                │
├───────────────────────────────────────────────────────────────┤
│  Type your message...                        [📎] [Send →]   │
└───────────────────────────────────────────────────────────────┘
```

**Key UI Elements:**
- **Message Bubbles:** AI (grey, left) vs User (orange, right)
- **Quick Actions:** Button cards for common tasks
- **Typing Indicator:** Shows AI is processing
- **Feedback Buttons:** Copy, regenerate, thumbs up/down
- **Input Bar:** Text area with attach and send buttons

---

## 🎭 10 CONVERSATION STAGES

### Stage 1: Greeting & Onboarding
```
AI: "Hi! I'm your AI pitch deck assistant. I'll help you create a 
professional investor presentation in about 10 minutes through 
natural conversation.

Before we start, have you completed the Medellin AI Hub startup 
wizard? If yes, I can use that data to speed things up!"

[Use Wizard Data] [Start Fresh] [Upload Existing Deck]
```
**Purpose:** Welcome user, set expectations, offer shortcuts
**Duration:** 30 seconds

### Stage 2: Startup Basics
```
AI: "Let's start with the basics. Tell me about your startup:

• What's the name?
• What problem are you solving?
• Who's your target customer?

You can answer in a paragraph or bullet points!"
```
**Purpose:** Gather core information
**Duration:** 2-3 minutes

### Stage 3: Solution & Value Prop
```
AI: "Now let's talk about your solution:

1. What's your unique approach?
2. What's the key benefit for customers?
3. Any secret sauce or tech advantage?

💡 Tip: Investors love specifics - mention AI models, patents, 
or unique data if applicable!"
```
**Purpose:** Understand differentiation
**Duration:** 2-3 minutes

### Stage 4: Market Opportunity
```
AI: "Investors always ask about market size:

1. What's the total addressable market (TAM)?
2. Who are your main competitors?
3. What's your market entry strategy?

Not sure? I can help research or note 'TBD' for now."
```
**Purpose:** Market sizing, competitive analysis
**Duration:** 2 minutes

### Stage 5: Traction & Validation
```
AI: "Now for the exciting part - traction!

• Users or customers?
• Revenue or bookings?
• Key partnerships?
• Press or awards?

Pre-launch? Mention waitlist or LOIs!"
```
**Purpose:** Proof of progress
**Duration:** 1-2 minutes

### Stage 6: Team
```
AI: "Investors bet on teams:

• How many co-founders?
• Relevant backgrounds?
• Notable advisors?

💡 Mention exits, YC, Fortune 500 experience!"
```
**Purpose:** Build credibility
**Duration:** 1-2 minutes

### Stage 7: Business Model
```
AI: "Let's talk money:

1. How do you make money?
2. Unit economics? (CAC, LTV)
3. Revenue projections?

Estimates are fine!"
```
**Purpose:** Financial viability
**Duration:** 2 minutes

### Stage 8: The Ask
```
AI: "Final question: What are you raising?

• How much capital?
• What will you use it for?
• What milestones will this achieve?

Be specific - investors like clear plans!"
```
**Purpose:** Fundraising clarity
**Duration:** 1-2 minutes

### Stage 9: Generation
```
AI: "🎨 Generating your pitch deck...

Creating 12 professional slides:

✅ Cover
✅ Problem
✅ Solution
✅ Market
⏳ Product...

[Progress: ████████░░ 67%]

Estimated: 8 seconds..."
```
**Purpose:** Build anticipation
**Duration:** 10-20 seconds

### Stage 10: Preview & Edit
```
AI: "🎉 Your pitch deck is ready!

[Grid of 12 slide thumbnails]

What next?
[Preview] [Edit] [Theme] [Export]

💡 Click any slide to edit, or ask me to make changes!"
```
**Purpose:** Present results, enable iteration
**Duration:** Ongoing

---

## 🎨 UI COMPONENT SPECIFICATIONS

### 1. AI Message Bubble
```
Styling:
- Background: hsl(0, 0%, 96%) light grey
- Border radius: 12px
- Padding: 16px 20px
- Max width: 80%
- Margin: 8px 0
- Avatar: 32px circle (AI icon)
- Font: Inter 15px/1.5
- Color: hsl(0, 0%, 9%) near-black

Layout:
┌────────────────────────────────────┐
│ 🤖 AI Assistant       2:34 PM      │
│                                    │
│ Message content here with          │
│ multiple lines and formatting.     │
│                                    │
│ [Copy] [Regenerate] [👍] [👎]     │
└────────────────────────────────────┘

Actions:
- Copy: Copy text to clipboard
- Regenerate: Generate new response
- Thumbs up/down: User feedback
```

### 2. User Message Bubble
```
Styling:
- Background: hsl(14, 82%, 60%) orange gradient
- Border radius: 12px
- Padding: 16px 20px
- Max width: 80%
- Margin: 8px 0 8px auto (right-aligned)
- Font: Inter 15px/1.5
- Color: white
- Text-align: right

Layout:
         ┌────────────────────────────┐
         │ I'm building EventAI, an   │
         │ AI-powered event platform. │
         │                   2:35 PM  │
         └────────────────────────────┘
```

### 3. Quick Action Card
```
Styling:
- Background: white
- Border: 1px solid hsl(0, 0%, 91%)
- Border radius: 8px
- Padding: 16px
- Min-width: 120px
- Hover: scale(1.02), border-color orange
- Transition: all 0.2s ease
- Cursor: pointer

Layout:
┌──────────────┐
│  📝          │
│              │
│  Use Wizard  │
│  Data        │
│              │
└──────────────┘

Icon: 40px, centered
Text: 14px, centered, 2 lines max
```

### 4. Progress Indicator
```
Styling:
- Container: white card, shadow, padding 24px
- Progress bar: height 8px, rounded
- Fill: orange gradient, animated
- Label: 14px grey above bar
- Status: 16px bold below bar

Layout:
┌───────────────────────────────────┐
│ 🎨 Generating your pitch deck...  │
│                                   │
│ ████████████░░░░░░ 67%            │
│                                   │
│ Creating slide 8 of 12:           │
│ Business Model                    │
│                                   │
│ ⏱️ Estimated time: 8 seconds      │
└───────────────────────────────────┘

Animation: Progress bar fills smoothly
Updates: Real-time slide status
```

### 5. Slide Preview Card
```
Styling:
- Size: 160px × 90px (16:9 ratio)
- Border: 2px solid transparent
- Border radius: 8px
- Hover: border-color orange, shadow
- Cursor: pointer
- Transition: all 0.2s

Layout:
┌──────────────┐
│  [Thumbnail] │
│              │
│              │
│ Slide 1      │
│ Cover        │
│ ✏️ Edit      │
└──────────────┘

Thumbnail: Rendered slide preview
Label: Slide # + Type
Edit button: Appears on hover
```

### 6. Theme Selector
```
Styling:
- Container: white card, padding 20px
- Theme cards: 120px × 80px each
- Selected: orange border 3px
- Hover: scale(1.05)
- Layout: Horizontal scroll carousel

Layout:
┌──────────────────────────────────┐
│ Choose Theme:                    │
│                                  │
│ ┌────┐ ┌────┐ ┌────┐ ┌────┐    │
│ │Prev│ │Prev│ │Prev│ │Prev│    │
│ │    │ │    │ │    │ │    │    │
│ │Mod │ │Bold│ │Clean│ │Grad│    │
│ └────┘ └────┘ └────┘ └────┘    │
│ ●      ○      ○      ○          │
└──────────────────────────────────┘

Themes: 5 options (Modern, Bold, Clean, Corporate, Gradient)
Indicators: Radio dots below
```

### 7. Export Modal
```
Styling:
- Overlay: rgba(0,0,0,0.5)
- Modal: white card, 480px width
- Border radius: 16px
- Shadow: 0 8px 32px rgba(0,0,0,0.2)
- Padding: 32px

Layout:
┌──────────────────────────────────┐
│ Export Your Deck           [X]   │
├──────────────────────────────────┤
│                                  │
│ ┌──────────────────────────────┐│
│ │ 📊 PowerPoint (.pptx)        ││
│ │ Best for presenting          ││
│ │ [Download PowerPoint]        ││
│ └──────────────────────────────┘│
│                                  │
│ ┌──────────────────────────────┐│
│ │ 📄 PDF (Coming Soon)         ││
│ │ Universal format             ││
│ │ [Download PDF]               ││
│ └──────────────────────────────┘│
│                                  │
│ ┌──────────────────────────────┐│
│ │ 🖥️ Presentation Mode         ││
│ │ Fullscreen with notes        ││
│ │ [Start Presenting]           ││
│ └──────────────────────────────┘│
└──────────────────────────────────┘

Options: 3 export formats
Primary: PowerPoint (enabled)
Secondary: PDF, Presentation mode
```

---

## 📝 CONTENT & COPY

### Taglines & Headers
```
Hero: "Create Stunning Pitch Decks in Minutes with AI"
Subheader: "Tell us about your startup, and our AI crafts a professional 
            investor presentation through natural conversation."

CTA Button: "Start Creating →"
Secondary CTA: "See Example Deck"

Feature Headlines:
• "Conversational AI Assistant"
• "12 Professional Slides"
• "Multiple Themes"
• "Export to PowerPoint"
• "Presentation Mode"
```

### Loading Messages
```
Generation:
• "Analyzing your startup..." (0-15%)
• "Researching market data..." (15-30%)
• "Crafting compelling narratives..." (30-60%)
• "Designing beautiful slides..." (60-85%)
• "Adding finishing touches..." (85-100%)

Saving:
• "Saving your deck..."
• "Updating slides..."
• "Syncing changes..."

Exporting:
• "Generating PowerPoint..."
• "Applying theme..."
• "Creating downloadable file..."
```

### Success Messages
```
• "Your pitch deck is ready! 🎉"
• "Slide updated successfully!"
• "Deck saved to your account"
• "PowerPoint downloaded!"
• "Theme applied to all slides"
• "Changes saved automatically"
```

### Error Messages
```
User-friendly:
• "Oops! Something went wrong. Let's try that again."
• "AI service is busy. Please wait 30 seconds and retry."
• "Couldn't save your changes. Check your connection."
• "Generation failed. Want to try with different input?"

Technical (for debugging):
• "Error: AI_TIMEOUT - Generation took too long"
• "Error: RATE_LIMIT - Too many requests (wait 60s)"
• "Error: AUTH_FAILED - Please log in again"
```

### Empty States
```
• "No pitch decks yet. Start your first one!"
• "No chat history. Begin a conversation!"
• "No slides selected. Click a slide to edit."
• "No themes applied. Choose a theme to preview."
```

---

## 🔄 CONVERSATION WORKFLOWS

### Workflow 1: First-Time User (Full Flow)
```
Duration: ~10 minutes

1. [00:00] Land on /pitch-deck-creator
2. [00:30] AI greets, explains process
3. [01:00] User clicks "Start Fresh"
4. [01:30] AI asks startup basics (name, problem, customer)
5. [02:00] User describes EventAI
6. [03:00] AI asks solution & value prop
7. [04:00] User explains unique approach
8. [05:00] AI asks market & competitors
9. [06:00] User provides market data
10. [07:00] AI asks traction (users, revenue)
11. [07:30] User shares metrics
12. [08:00] AI asks team details
13. [08:30] User describes founders
14. [09:00] AI asks business model
15. [09:30] User explains pricing
16. [10:00] AI asks fundraising
17. [10:30] User states $500K seed
18. [11:00] AI says "Ready to generate?"
19. [11:15] User clicks "Yes, Generate!"
20. [11:30] AI generates 12 slides (15s)
21. [11:45] AI shows preview grid
22. [12:00] User reviews, makes minor edits
23. [12:30] User exports PowerPoint
24. [12:35] Done! ✅
```

### Workflow 2: Returning User (With Wizard Data)
```
Duration: ~5 minutes

1. [00:00] User navigates to /pitch-deck-creator
2. [00:10] AI recognizes user: "Welcome back!"
3. [00:20] AI offers: "Use your EventAI wizard data?"
4. [00:25] User clicks "Yes, Use It"
5. [00:30] AI auto-fills from stages 1-6
6. [00:35] AI asks only missing info (financials, ask)
7. [01:00] User provides fundraising details
8. [01:30] AI confirms: "Got everything!"
9. [01:35] AI generates deck (15s)
10. [01:50] Deck ready with 12 slides
11. [02:00] User previews, looks good
12. [02:10] User selects "Bold" theme
13. [02:15] Theme applied instantly
14. [02:20] User exports PowerPoint
15. [02:25] Done! ✅
```

### Workflow 3: Upload & Improve Existing Deck
```
Duration: ~3 minutes

1. [00:00] User clicks "Upload Existing Deck"
2. [00:05] User uploads PPTX file
3. [00:10] AI extracts content (parsing)
4. [00:25] AI says: "I found 10 slides. What to do?"
   Options:
   • Improve content quality
   • Redesign with new theme
   • Add missing slides
   • Translate to another language
5. [00:35] User chooses "Improve content"
6. [00:40] AI analyzes each slide
7. [01:20] AI rewrites with better copy
8. [01:35] AI shows side-by-side comparison
9. [01:50] User approves changes
10. [02:00] AI applies improvements
11. [02:15] User exports improved deck
12. [02:20] Done! ✅
```

### Workflow 4: Conversational Edit Mode
```
Duration: ~2 minutes

User is viewing generated deck...

User: "Make the problem slide more dramatic"

AI: [Processes request]
    1. Identifies slide 2 (Problem)
    2. Analyzes current content
    3. Rewrites with emphasis
    4. Updates slide

AI: "✅ Updated! I added statistics about wasted time and
    a bold headline: 'Event Planning is Broken - Costing 
    Businesses $50K+ Per Year'. Better?"

User: "Yes! Now change all colors to blue"

AI: [Processes request]
    1. Identifies theme system
    2. Applies "Corporate Blue" theme
    3. Updates all 12 slides

AI: "Done! Applied Corporate Blue theme to all slides. 
    Want to try a different one?"

User: "No, perfect. Export it."

AI: "Great! Generating PowerPoint..."
    [Exports in 2 seconds]

AI: "✅ Your deck is ready! Downloaded as 
    'EventAI-Pitch-Deck.pptx'"
```

---

## 🧠 AI PERSONALITY & BEHAVIOR

### Core Traits
- **Helpful:** Anticipates needs, offers suggestions
- **Encouraging:** Celebrates progress, positive reinforcement
- **Patient:** Handles incomplete answers gracefully
- **Smart:** Provides context, educates when needed
- **Adaptive:** Matches user's communication style

### Response Examples

**Short answer from user:**
```
User: "EventAI. Events."

AI: "Got it! EventAI for events. Can you tell me more?
    
    • Who's your target customer?
    • What specific problem do you solve?
    
    Even a quick sentence helps!"
```

**Detailed answer from user:**
```
User: "We're EventAI, an AI-powered platform for enterprise corporate 
       event planners. We automate 80% of planning tasks - vendor 
       coordination, schedule optimization, attendee management. Our
       clients save 15+ hours per event."

AI: "Excellent! I love the specificity:
    
    • Target: Enterprise event planners ✓
    • Solution: AI automation (80% tasks) ✓
    • Benefit: 15+ hours saved per event ✓
    
    That's a powerful value prop! Quick follow-up: How many events
    does a typical client run per year? This helps quantify the
    total ROI."
```

**Uncertain user:**
```
User: "I'm not sure about market size..."

AI: "No worries! Market sizing is tricky. Let me help:
    
    Based on event management industry research:
    • Global market: $1.1B (2024)
    • Annual growth: 11% CAGR
    • Corporate events subset: ~$450M
    
    I can use these numbers, or note 'Research TBD' and you can
    update later. Your choice!"
```

**User corrects AI:**
```
User: "Actually, we're targeting agencies, not enterprises."

AI: "Thanks for clarifying! I'll update that:
    
    Target: Event agencies (not enterprises)
    
    This changes the pitch a bit. Agencies typically manage more
    events per client than in-house teams. Should I emphasize
    scalability and multi-client management in your deck?"
```

---

## 🎨 THEME SYSTEM (5 Themes)

### 1. Modern Professional (Default)
```
Name: "Modern Professional"
Best For: SaaS, Tech startups

Colors:
- Primary: hsl(14, 82%, 60%) Orange
- Background: hsl(0, 0%, 100%) White
- Text: hsl(0, 0%, 9%) Near-black
- Accent: hsl(0, 0%, 91%) Light grey

Fonts:
- Heading: Inter Bold, 32-44pt
- Body: Inter Regular, 18-24pt

Layout Style:
- Clean, generous whitespace
- Centered text blocks
- Bullet points with icons
- Minimal graphics, max clarity

Slide Treatments:
- Cover: Gradient orange overlay
- Content: Left-aligned text, right visual
- Data: Clean charts, no clutter
```

### 2. Bold & Vibrant
```
Name: "Bold & Vibrant"
Best For: Consumer apps, Creative startups

Colors:
- Primary: hsl(14, 100%, 50%) Bright orange
- Background: hsl(0, 0%, 12%) Dark grey
- Text: hsl(0, 0%, 100%) White
- Accent: hsl(180, 60%, 50%) Teal

Fonts:
- Heading: Montserrat Bold, 36-48pt
- Body: Montserrat Regular, 20-26pt

Layout Style:
- High contrast
- Large, bold text
- Vibrant accent colors
- Dynamic layouts

Slide Treatments:
- Cover: Full-bleed image + bold text
- Content: Two-column with color blocks
- Data: Colorful charts, infographics
```

### 3. Minimalist Clean
```
Name: "Minimalist Clean"
Best For: Design studios, Consulting

Colors:
- Primary: hsl(0, 0%, 0%) Black
- Background: hsl(0, 0%, 98%) Off-white
- Text: hsl(0, 0%, 20%) Dark grey
- Accent: hsl(14, 82%, 60%) Single orange line

Fonts:
- Heading: Helvetica Neue Light, 40-52pt
- Body: Helvetica Neue Regular, 20-24pt

Layout Style:
- Maximum white space
- Minimal text per slide
- Sans-serif only
- Elegant simplicity

Slide Treatments:
- Cover: Centered text, no graphics
- Content: One key message per slide
- Data: Simple line charts only
```

### 4. Corporate Blue
```
Name: "Corporate Blue"
Best For: B2B, Enterprise, Finance

Colors:
- Primary: hsl(210, 80%, 30%) Navy blue
- Background: hsl(0, 0%, 100%) White
- Text: hsl(0, 0%, 0%) Black
- Accent: hsl(210, 80%, 70%) Light blue

Fonts:
- Heading: Georgia Bold, 32-42pt
- Body: Arial Regular, 18-22pt

Layout Style:
- Traditional, professional
- Structured grids
- Conservative color use
- Trustworthy aesthetic

Slide Treatments:
- Cover: Logo + title + blue bar
- Content: Header + 3 columns
- Data: Bar/line charts, tables
```

### 5. Startup Gradient
```
Name: "Startup Gradient"
Best For: Tech startups, Innovation

Colors:
- Primary: Purple-pink gradient
- Background: hsl(0, 0%, 100%) White
- Text: hsl(0, 0%, 0%) Black
- Accent: Gradient bars and shapes

Fonts:
- Heading: Poppins Bold, 34-46pt
- Body: Poppins Regular, 18-24pt

Layout Style:
- Modern, energetic
- Gradient accents throughout
- Tech-forward aesthetic
- Dynamic visuals

Slide Treatments:
- Cover: Gradient background
- Content: Gradient accent bars
- Data: Gradient-filled charts
```

---

## 📊 SLIDE TEMPLATE SPECIFICATIONS

### Slide 1: Cover
```
Layout: Centered vertical

Elements:
1. Company logo (top, 80px height)
2. Startup name (48pt bold, center)
3. Tagline (24pt regular, center)
4. Founder name + title (18pt, bottom)
5. Date (18pt, bottom right)

Background: Theme-based (gradient or solid)
Text color: White (if dark bg) or Black (if light bg)

Example:
     [EventAI Logo]
     
     EventAI
     AI-Powered Event Management
     
     
     Sarah Martinez, CEO
     October 2025
```

### Slide 2: Problem
```
Layout: Two-column (60/40 split)

Left Column:
- "The Problem" header (32pt bold)
- 3-4 bullet points (20pt)
  • Each 1-2 sentences
  • Include stats if available
- Pull quote from customer (optional)

Right Column:
- Icon or illustration (large)
- Visual representation of problem

Background: White
Accent: Orange bar on left edge

Example:
┌────────────────────┬────────────┐
│ The Problem        │            │
│                    │   [Icon]   │
│ • Manual event     │            │
│   coordination     │  Problem   │
│   wastes 20+ hrs   │  Visual    │
│                    │            │
│ • Errors cost      │            │
│   $50K per event   │            │
└────────────────────┴────────────┘
```

### Slide 3: Solution
```
Layout: Full-width with sections

Elements:
1. "Our Solution" header (32pt bold, top)
2. Brief description (18pt, 2-3 sentences)
3. Key features grid (4 boxes, icons + text)
4. Value proposition statement (bottom, bold)

Background: Light grey or white
Feature boxes: White cards with shadows

Example:
┌──────────────────────────────────┐
│ Our Solution                     │
│ EventAI automates 80% of...     │
│                                  │
│ ┌──────┐ ┌──────┐ ┌──────┐     │
│ │[Icon]│ │[Icon]│ │[Icon]│     │
│ │Auto  │ │Smart │ │Real  │     │
│ │Schedule│Vendors│Time │     │
│ └──────┘ └──────┘ └──────┘     │
│                                  │
│ "80% faster planning, 95% fewer  │
│  errors, $50K saved per event"   │
└──────────────────────────────────┘
```

### Slide 4: Market Opportunity
```
Layout: Split horizontal

Top Half (60%):
- "Market Opportunity" header
- TAM/SAM/SOM visualization
  (nested circles or bar chart)
- Key numbers large and bold

Bottom Half (40%):
- Market trends
- Growth statistics
- Target segment callout

Background: White
Charts: Orange gradient fills

Example:
┌──────────────────────────────────┐
│ Market Opportunity               │
│                                  │
│     ╔═══════════╗                │
│     ║    TAM    ║                │
│     ║   $1.1B   ║                │
│     ║  ┌─────┐  ║                │
│     ║  │ SAM │  ║                │
│     ║  └─────┘  ║                │
│     ╚═══════════╝                │
│                                  │
│ Growing 11% annually             │
│ Enterprise events: $450M         │
└──────────────────────────────────┘
```

(Continue with remaining 8 slides...)

---

## 🚀 LOVABLE IMPLEMENTATION GUIDE

### Phase 1: Chat UI (Week 1)
```
Priority: Critical
Duration: 5 days

Tasks:
1. Create ChatLayout component
   - Header with logo + actions
   - Scrollable message container
   - Input bar with send button
   
2. Build MessageBubble components
   - AIMessage (left, grey)
   - UserMessage (right, orange)
   - Typing indicator
   - Feedback buttons
   
3. Implement ChatInput
   - Auto-resize textarea
   - Send on Enter (Shift+Enter for new line)
   - Attach file button
   - Character counter
   
4. Add ChatHistory sidebar
   - List of previous chats
   - Search functionality
   - Delete option
   
5. Create QuickActionCards
   - Use Wizard Data
   - Start Fresh
   - Upload Deck

Dependencies: None (start immediately)
Success Criteria: Can send/receive messages, see history
```

### Phase 2: Conversation Engine (Week 2)
```
Priority: Critical
Duration: 5 days

Tasks:
1. Implement ConversationState machine
   - 10 stages tracking
   - Data collection object
   - Progress calculation
   
2. Build AI response generator
   - Stage-based prompts
   - Entity extraction
   - Context management
   
3. Create validation logic
   - Required fields per stage
   - Error handling
   - Data completeness check
   
4. Integrate with wizard data
   - Fetch user's wizard progress
   - Pre-fill applicable fields
   - Show diff of what's needed
   
5. Add conversation flow control
   - Stage transitions
   - Skip/back functionality
   - Save partial progress

Dependencies: Phase 1 complete, wizard data accessible
Success Criteria: Can complete full conversation, data saved
```

### Phase 3: Deck Generation (Week 2-3)
```
Priority: Critical
Duration: 7 days

Tasks:
1. Enhance generate-deck-outline API
   - Generate 12 slides with full content
   - Include body_json for Plate editor
   - Return structured data
   
2. Create slide templates
   - 12 templates (Cover → Ask)
   - Theme-aware rendering
   - Responsive layouts
   
3. Build ProgressIndicator
   - Real-time updates (websocket/polling)
   - Slide-by-slide status
   - Estimated time remaining
   
4. Implement SlidePreviewGrid
   - 12 thumbnail cards
   - Click to select
   - Edit button on hover
   
5. Create SlideEditor modal
   - Plate.js integration
   - Title + body editing
   - Speaker notes field
   - Save/cancel actions

Dependencies: Phase 2 complete, API enhanced
Success Criteria: Deck generated in <20s, editable
```

### Phase 4: Themes & Export (Week 3-4)
```
Priority: High
Duration: 5 days

Tasks:
1. Define 5 theme objects
   - Colors, fonts, layouts
   - JSON structure
   - Preview images
   
2. Build ThemeSelector component
   - Carousel of 5 themes
   - Live preview on click
   - Apply to all slides
   
3. Implement client-side PPTX export
   - pptxgenjs integration
   - Theme application
   - Download trigger
   
4. Create PresentationMode
   - Fullscreen view
   - Keyboard navigation
   - Speaker notes panel
   - Slide counter
   
5. Build ExportModal
   - PowerPoint option
   - PDF option (future)
   - Presentation mode launch

Dependencies: Phase 3 complete
Success Criteria: Can change themes, export PPTX, present
```

### Phase 5: Advanced Features (Week 4-5)
```
Priority: Medium
Duration: 7 days

Tasks:
1. Upload deck parser
   - PPTX file upload
   - Content extraction
   - AI analysis
   
2. Natural language editing
   - Command parser
   - Slide identifier
   - Content updater
   
3. Multi-language support
   - Language selector
   - Translation API
   - RTL support
   
4. Analytics tracking
   - Event logging
   - User behavior
   - Deck metrics
   
5. User feedback system
   - Rating widget
   - Feedback form
   - Bug reporting

Dependencies: Phase 4 complete
Success Criteria: All features functional, analytics capturing
```

---

## 📈 SUCCESS METRICS

### Primary KPIs
```
Speed:
- Time to first deck: < 10 minutes (target: 8 min)
- Generation speed: < 20 seconds (target: 12 sec)
- Export time: < 3 seconds (target: 2 sec)

Quality:
- Completion rate: > 80% (users who start, finish)
- Edit rate: < 30% (minimal editing needed)
- Export rate: > 90% (users download deck)

Satisfaction:
- User rating: > 4.5/5 stars
- NPS score: > 50
- Return rate: > 60% (use again within 30 days)
```

### Secondary Metrics
```
Engagement:
- Messages per conversation: 15-25
- Time per stage: 1-3 minutes
- Regeneration rate: < 10%

Technical:
- API success rate: > 99%
- Page load time: < 2 seconds
- Error rate: < 1%

Business:
- Conversion to paid: > 15%
- Upgrade rate: > 10%
- Referral rate: > 20%
```

---

## 🔐 SECURITY & PRIVACY

### Data Protection
```
Encryption:
- In transit: TLS 1.3
- At rest: AES-256
- Backups: Encrypted storage

Access Control:
- JWT authentication
- Row-level security (RLS)
- Ownership verification
- Rate limiting (5 gen/hour, 10 saves/hour)
```

### Privacy Policy
```
Data Collection:
- Conversation history (encrypted)
- Generated decks (user-owned)
- Usage analytics (anonymized)

User Rights:
- View all data (export)
- Delete all data (GDPR)
- Opt-out of analytics
- Data portability

Third Parties:
- AI provider: Lovable AI Gateway (no storage)
- No data sold
- No third-party tracking
```

---

## 📚 REFERENCES

### Technical Documentation
- **Architecture Diagrams:** `.taskmaster/docs/PITCH-DECK-DIAGRAMS.md`
- **MVP PRD:** `.taskmaster/docs/pitch-deck-mvp.txt`
- **Database Schema:** `supabase/migrations/20251011102100_pitch_deck_enhancements.sql`
- **API Docs:** `supabase/functions/generate-deck-outline/index.ts`

### Component Files
- **Hooks:** `src/hooks/usePitchDeckGenerator.ts`
- **Components:** `src/components/pitch-deck/`
- **Utilities:** `src/lib/export/pptx-export.ts`

### Design References
- **Reference Image:** `docs/main/07bd575c-d17a-4303-a399-3fd7a5b9b7e3.png`
- **ALLWEONE® Repo:** `repo-reference/` (Plate.js examples)

---

## 🎯 FINAL SUMMARY FOR LOVABLE

**What to Build:**
A ChatGPT-style conversational interface that creates investor-ready pitch decks through natural dialogue. Users chat with an AI assistant that asks questions, gathers information, and generates 12 professional slides in <10 minutes.

**Core Features:**
1. Conversational chat UI (grey/orange message bubbles)
2. 10-stage information gathering (greeting → generation)
3. AI-powered slide generation (12 slides with full content)
4. Real-time preview and editing (Plate.js editor)
5. Theme selector (5 professional themes)
6. PowerPoint export (client-side, pptxgenjs)
7. Presentation mode (fullscreen with speaker notes)

**Design Style:**
- Clean, minimal, modern (ChatGPT-inspired)
- Orange accent color (hsl(14, 82%, 60%))
- White/light grey backgrounds
- Inter font family
- Smooth animations and transitions
- Mobile-responsive (touch-optimized)

**Technical Stack:**
- React + TypeScript + Vite
- Supabase (auth + database + edge functions)
- Plate.js (rich text editor)
- pptxgenjs (PowerPoint export)
- TanStack Query (state management)
- shadcn/ui (component library)

**Success Criteria:**
- Users create decks in <10 minutes
- 80%+ completion rate (finish what they start)
- 90%+ export rate (download PowerPoint)
- 4.5/5 star satisfaction rating
- Professional output quality (investor-ready)

**Priority Order:**
1. Week 1: Chat UI (message bubbles, input, history)
2. Week 2: Conversation engine (10 stages, data collection)
3. Week 2-3: Deck generation (12 slides, preview grid)
4. Week 3-4: Themes & export (5 themes, PPTX download)
5. Week 4-5: Polish (upload, edit commands, analytics)

---

**Document Version:** 1.0
**Created:** October 11, 2025
**Project:** Medellin AI Hub - Pitch Deck Wizard
**Purpose:** Complete implementation guide for Lovable AI
**Status:** Production-ready specification

---

**END OF DOCUMENT**

