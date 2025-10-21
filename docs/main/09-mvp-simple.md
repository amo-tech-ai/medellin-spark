# 🎯 MVP PITCH DECK CREATOR - SIMPLE & WORKING

**Goal:** Get a working pitch deck generator integrated with Medellin AI Hub
**Timeline:** 3-5 days for MVP
**Focus:** Core functionality only, keep it simple

---

## 📊 USER JOURNEY (MVP)

```
1. User completes Startup Profile (already built ✅)
   → Has: Company name, description, problem, solution, team
   
2. User clicks "Generate Pitch Deck" from dashboard
   → Goes to /pitch-deck page
   
3. User enters basic info:
   → Topic: Auto-filled from startup profile
   → Number of slides: 10-12 slides
   → Style: Professional or Casual
   
4. AI generates outline (10-12 slide titles)
   → Shows in simple list
   → User can edit titles if needed
   
5. User picks a theme (3-5 simple themes)
   → Preview shows color scheme
   
6. AI generates full presentation
   → Shows progress: "Generating slide 5/12..."
   → Takes 30-60 seconds
   
7. User lands on presentation editor
   → Can edit slide content (simple text editor)
   → Can reorder slides (drag & drop)
   
8. User can view presentation
   → Full-screen mode
   → Navigate with arrows
```

---

## 🗄️ DATABASE SETUP (Supabase)

Add these tables to your existing Supabase database:

```sql
-- presentations table
create table presentations (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references profiles(id) on delete cascade,
  title text not null,
  topic text,
  style text default 'professional', -- professional or casual
  theme text default 'purple', -- theme name
  outline jsonb, -- array of slide titles
  content jsonb, -- array of slides with content
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- enable row level security
alter table presentations enable row level security;

-- policy: users can only see their own presentations
create policy "Users can view own presentations"
  on presentations for select
  using (auth.uid() = user_id);

-- policy: users can insert their own presentations
create policy "Users can create presentations"
  on presentations for insert
  with check (auth.uid() = user_id);

-- policy: users can update their own presentations
create policy "Users can update own presentations"
  on presentations for update
  using (auth.uid() = user_id);
```

**Content JSON structure:**
```json
{
  "slides": [
    {
      "id": "slide-1",
      "title": "EventOS Startup Pitch",
      "content": "Welcome to our pitch...",
      "layout": "title" // title, content, two-column, etc.
    },
    {
      "id": "slide-2",
      "title": "The Problem",
      "content": "Event organizers struggle with...",
      "layout": "content"
    }
  ]
}
```

---

## 🎨 3-5 SIMPLE THEMES (MVP)

Don't overcomplicate. Just 3-5 basic color schemes:

1. **Purple** (match existing Medellin AI brand)
   - Primary: #8B5CF6
   - Background: White
   - Text: #1F2937

2. **Blue**
   - Primary: #3B82F6
   - Background: White
   - Text: #1F2937

3. **Dark**
   - Primary: #8B5CF6
   - Background: #1F2937
   - Text: White

---

## 💻 LOVABLE MVP PROMPT

```
Hey Lovable! Let's build a simple AI pitch deck generator for Medellin AI Hub.

PART 1: DASHBOARD INTEGRATION
------------------------------

On the existing /dashboard page, add a new card:

Card: "Generate Pitch Deck"
- Icon: 📊
- Description: "Create an AI-powered investor pitch in minutes"
- Button: [Generate Pitch Deck →]
- On click: Go to /pitch-deck

PART 2: PITCH DECK INPUT PAGE (/pitch-deck)
-------------------------------------------

Simple form with 3 fields:

Field 1: Topic (text input, large)
- Label: "What's your pitch about?"
- Placeholder: "e.g., EventOS - AI Event Management Platform"
- Pre-fill from user's startup profile if available

Field 2: Number of Slides (dropdown)
- Label: "How many slides?"
- Options: 8 slides, 10 slides, 12 slides, 15 slides
- Default: 10 slides

Field 3: Style (radio buttons)
- Label: "Presentation style?"
- Options: 
  ○ Professional (for investors, formal)
  ○ Casual (for team meetings, friendly)
- Default: Professional

Bottom buttons:
- [← Back to Dashboard]
- [Generate Outline →] (purple, primary)

On click [Generate Outline]:
1. Call AI API (use Anthropic Claude or OpenAI)
2. Prompt: "Create a {slides} slide pitch deck outline for: {topic}. Style: {style}. Return only slide titles as a numbered list."
3. Show loading: "AI is creating your outline..."
4. Go to /pitch-deck/outline page

PART 3: OUTLINE REVIEW PAGE (/pitch-deck/outline)
-------------------------------------------------

Show AI-generated outline in editable list:

Header: "Review Your Outline"

Slide list (editable):
1. [✏️] EventOS Startup Pitch
2. [✏️] The Problem We Solve
3. [✏️] Our Solution
4. [✏️] How It Works
5. [✏️] Market Opportunity
6. [✏️] Business Model
7. [✏️] Traction & Metrics
8. [✏️] The Team
9. [✏️] Investment Ask
10. [✏️] Thank You

Each slide row:
- Slide number
- Title (editable input)
- [✏️] Edit icon
- [🗑️] Delete icon
- Drag handle (⠿) for reordering

Bottom section: "Choose a Theme"
- 3 theme cards in a row
- Each card shows:
  * Theme name
  * Color preview (3 dots)
  * Radio button to select

Themes:
○ Purple (●●● purple shades) [Selected by default]
○ Blue (●●● blue shades)
○ Dark (●●● dark shades)

Bottom buttons:
- [← Edit Info]
- [Generate Presentation →] (purple, primary)

On click [Generate Presentation]:
1. Save outline to database
2. Call AI to generate content for each slide
3. Prompt per slide: "Write content for slide titled '{title}' in a {style} style. Keep it brief (2-3 sentences)."
4. Show progress: "Generating slide 5/10..."
5. Save to database
6. Go to /presentations/:id/edit

PART 4: PRESENTATION EDITOR (/presentations/:id/edit)
-----------------------------------------------------

Layout:

Top bar:
- [Logo] Presentation Title (editable)
- [💾 Saved 2 min ago]
- [Preview] [Done] buttons

Main area (split):

LEFT: Slide Thumbnails (200px width)
- Vertical list of mini slide previews
- Click to select slide
- Selected slide has purple border
- Show slide numbers

RIGHT: Current Slide Editor (rest of width)
- Slide title (editable h1)
- Content area (simple textarea or rich text)
- Simple formatting: [B] [I] [U] buttons

Bottom navigation:
- [◀ Previous Slide]
- Slide counter: "3 / 10"
- [Next Slide ▶]

Functionality:
- Click slide thumbnail: Switch to that slide
- Edit title: Auto-save after 2 sec
- Edit content: Auto-save after 2 sec
- [Preview] button: Open /presentations/:id/view in new tab
- [Done] button: Go back to dashboard
- Drag thumbnails to reorder slides

Auto-save to database:
- Use Supabase update query
- Save content JSON every 2 seconds if changed
- Show "💾 Saving..." then "💾 Saved now"

PART 5: PRESENTATION VIEWER (/presentations/:id/view)
-----------------------------------------------------

Full-screen presentation mode:

Layout:
- Full screen (100vh, 100vw)
- Dark background or theme-colored background
- Slide content centered
- Large readable text

Slide display:
- Show current slide title (h1, bold)
- Show current slide content (p, large)
- Apply theme colors

Bottom controls (auto-hide after 3 sec):
- [◀ Prev] button
- Slide counter "3 / 10"
- [Next ▶] button
- [✕ Exit] button

Keyboard shortcuts:
- Right arrow: Next slide
- Left arrow: Previous slide
- Escape: Exit presentation

Functionality:
- Load presentation from database
- Show one slide at a time
- Navigate with buttons or keyboard
- Exit returns to editor

DESIGN NOTES:
-------------

Use existing Medellin AI design system:
- Purple (#8B5CF6) for primary buttons
- White/gray backgrounds
- Same fonts as dashboard
- Same card styles (shadow on hover)
- Mobile responsive (stack on mobile)

That's it! A simple, working MVP pitch deck generator.
```

---

## 🔌 API INTEGRATION (Supabase Edge Function)

Create a Supabase Edge Function for AI generation:

```typescript
// supabase/functions/generate-presentation/index.ts

import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import Anthropic from "@anthropic-ai/sdk"

serve(async (req) => {
  const { outline, style, slides } = await req.json()
  
  const anthropic = new Anthropic({
    apiKey: Deno.env.get('ANTHROPIC_API_KEY'),
  })

  const content = []
  
  for (let i = 0; i < outline.length; i++) {
    const slide = outline[i]
    
    const message = await anthropic.messages.create({
      model: "claude-3-5-sonnet-20241022",
      max_tokens: 300,
      messages: [{
        role: "user",
        content: `Write content for a pitch deck slide titled "${slide}" in a ${style} style. Keep it brief (2-3 sentences). Focus on key points only.`
      }]
    })
    
    content.push({
      id: `slide-${i + 1}`,
      title: slide,
      content: message.content[0].text,
      layout: i === 0 ? "title" : "content"
    })
  }
  
  return new Response(
    JSON.stringify({ slides: content }),
    { headers: { "Content-Type": "application/json" } }
  )
})
```

---

## ✅ MVP TESTING CHECKLIST

Test these core flows:

1. **Dashboard to Creation**
   - [ ] Click "Generate Pitch Deck" from dashboard
   - [ ] Loads /pitch-deck page

2. **Input Form**
   - [ ] Topic auto-fills from startup profile
   - [ ] Can select number of slides
   - [ ] Can select style (Professional/Casual)
   - [ ] Click "Generate Outline" → AI creates outline

3. **Outline Review**
   - [ ] AI-generated outline displays
   - [ ] Can edit slide titles
   - [ ] Can delete slides
   - [ ] Can select theme
   - [ ] Click "Generate Presentation" → Creates full deck

4. **Editor**
   - [ ] Loads presentation with all slides
   - [ ] Can click slide thumbnail to switch slides
   - [ ] Can edit title and content
   - [ ] Auto-saves after 2 seconds
   - [ ] Drag thumbnails to reorder

5. **Viewer**
   - [ ] Click "Preview" opens full-screen mode
   - [ ] Can navigate with buttons
   - [ ] Can navigate with keyboard arrows
   - [ ] Escape key exits
   - [ ] Theme colors apply correctly

6. **Database**
   - [ ] Presentation saves to Supabase
   - [ ] Updates save correctly
   - [ ] User can only see their own presentations

---

## 🚀 WHAT'S NOT IN MVP (Save for Later)

These features are nice-to-have but NOT needed for MVP:

- ❌ Comments/collaboration
- ❌ Version history
- ❌ Export to PDF/PPTX
- ❌ Analytics tracking
- ❌ Share links
- ❌ Multiple themes (just 3 is fine)
- ❌ Layout options (just basic layouts)
- ❌ Image generation (text only for MVP)
- ❌ Document upload
- ❌ Template library

**Focus:** Get the core flow working end-to-end first!

---

## 📝 IMPLEMENTATION ORDER

Day 1: Database + Dashboard
- Create Supabase tables
- Add "Generate Pitch Deck" card to dashboard
- Create /pitch-deck input page

Day 2: AI Generation
- Build outline generation
- Create Supabase Edge Function for AI
- Build outline review page

Day 3: Editor
- Build presentation editor
- Implement auto-save
- Add slide navigation

Day 4: Viewer
- Build full-screen viewer
- Add keyboard shortcuts
- Test complete flow

Day 5: Polish & Testing
- Fix bugs
- Improve UX
- Test edge cases
- Deploy to production

---

## 🎯 SUCCESS CRITERIA

MVP is successful if:
✅ User can create a 10-slide pitch deck in under 5 minutes
✅ All slides generate with AI content
✅ User can edit slide content
✅ User can view presentation full-screen
✅ Everything saves to database
✅ No errors or crashes

That's it! Keep it simple, get it working, then iterate! 🚀
