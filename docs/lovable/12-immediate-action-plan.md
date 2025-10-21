# 🚨 IMMEDIATE ACTION PLAN - PITCH DECK CRITICAL PATH

**Date:** October 15, 2025
**Status:** 🔴 BLOCKED - Primary user journey non-functional
**Source:** Based on Firecrawl crawl results + MVP requirements

---

## 📊 CURRENT STATE (From Crawl)

### ✅ What's Working (12 pages live)
- Landing page, Programs, Events, Perks, Blog, About, Contact ✅
- Dashboard with "Generate Pitch Deck" button ✅
- Startup Profile wizard ✅
- Skills & Experience editor ✅
- Public profile pages ✅

### 🔴 CRITICAL BLOCKER
**The entire pitch deck creation flow is non-functional after the AI wizard:**

```
✅ Dashboard → "Generate Pitch Deck" button
✅ /pitch-deck page (input form)
⚠️ AI generation (backend exists, not verified)
❌ /presentations/:id/outline (NOT BUILT) 🔴
❌ /presentations/:id/edit (NOT BUILT) 🔴
❌ /presentations/:id/view (NOT BUILT) 🔴
❌ Layout Picker Modal (NOT BUILT) 🔴
❌ Theme Picker Modal (NOT BUILT) 🔴
```

**Impact:** Users can start creating a pitch deck but cannot:
- Review or edit the AI-generated outline
- Choose layouts or themes
- Edit slide content
- View the presentation
- Export or share

---

## 🎯 WEEK 1 PRIORITY (5 Critical Pages)

Build these 5 pages/components in order to unblock the user journey:

### Day 1-2: Outline Editor + Theme Picker
**File:** `/presentations/:id/outline`
**Priority:** 🔴 CRITICAL (Blocks everything)

### Day 2-3: Presentation Editor
**File:** `/presentations/:id/edit`
**Priority:** 🔴 CRITICAL (Core editing)

### Day 3-4: Presentation Viewer
**File:** `/presentations/:id/view`
**Priority:** 🔴 CRITICAL (Present/export)

### Day 4-5: Polish + Testing
- Layout Picker Modal
- Bug fixes
- User flow testing

---

## 📝 LOVABLE PROMPT - PHASE 1 (Outline Editor)

**Copy this prompt to Lovable to build the outline editor first:**

```
Hey Lovable! Let's build the Presentation Outline Editor for Medellin AI Hub.

This is the most critical missing page that's blocking our pitch deck creation flow.

CONTEXT FROM EXISTING SITE
--------------------------

We already have these pages live:
✅ /pitch-deck - Input form where users enter topic, slide count, style
✅ /dashboard - Has "Generate Pitch Deck" quick action
✅ Supabase database with presentations table

WHAT WE NEED TO BUILD
---------------------

Create a new page: /presentations/:id/outline

This page appears AFTER the AI generates an outline. Users land here to:
1. Review the AI-generated slide titles
2. Edit slide titles inline
3. Reorder slides with drag & drop
4. Delete unwanted slides
5. Add new slides
6. Choose a presentation theme
7. Generate the full presentation

DESIGN & COMPONENTS
-------------------

Layout: Two-section page

TOP SECTION: Outline Editor
- Header: "Review Your Outline" + subtitle "Edit slide titles, reorder, or remove slides"
- Editable slide list:
  * Each row: [⠿ Drag Handle] [Number] [Editable Title Input] [✏️ Edit] [🗑️ Delete]
  * Use @dnd-kit/core and @dnd-kit/sortable for drag & drop
  * Inline editing - click title to edit, auto-save after 2 sec
  * Delete removes slide with confirmation
- Bottom: [+ Add Slide] button
- Stats: "10 slides · ~5 min presentation"

BOTTOM SECTION: Theme Selector
- Header: "Choose a Theme"
- 3 theme cards in a row:
  1. Purple (default, selected)
     * Color preview: 3 dots (●●● in purple shades)
     * Colors: Primary #8B5CF6, Secondary #A78BFA, Accent #DDD6FE
  2. Blue
     * Colors: Primary #3B82F6, Secondary #60A5FA, Accent #DBEAFE
  3. Dark
     * Colors: Primary #1F2937, Secondary #374151, Accent #6B7280

Each theme card:
- Theme name (h3)
- Color preview dots (3 circles showing the color palette)
- Radio button to select (only one can be selected)
- Border: 2px solid when selected

Bottom buttons:
- [← Edit Info] - Goes back to /pitch-deck
- [Generate Presentation →] - Purple button, generates full deck

SUPABASE INTEGRATION
--------------------

On page load:
1. Get presentation ID from URL (/presentations/:id/outline)
2. Fetch from Supabase:
   ```typescript
   const { data: presentation } = await supabase
     .from('presentations')
     .select('*')
     .eq('id', presentationId)
     .single()
   ```
3. Display presentation.outline (array of slide titles)
4. Display presentation.theme (string: 'purple', 'blue', or 'dark')

On outline edit (debounced 2 sec):
```typescript
await supabase
  .from('presentations')
  .update({
    outline: newOutline,
    updated_at: new Date().toISOString()
  })
  .eq('id', presentationId)
```

On theme change:
```typescript
await supabase
  .from('presentations')
  .update({
    theme: selectedTheme,
    updated_at: new Date().toISOString()
  })
  .eq('id', presentationId)
```

On "Generate Presentation":
1. Show loading: "Generating slide 5/10..."
2. Call Supabase Edge Function:
   ```typescript
   const { data } = await supabase.functions.invoke('generate-presentation', {
     body: {
       presentationId,
       outline: presentation.outline,
       style: presentation.presentation_style,
       topic: presentation.title
     }
   })
   ```
3. Update presentations.content with generated slides
4. Redirect to: /presentations/:id/edit

DRAG & DROP IMPLEMENTATION
---------------------------

Use @dnd-kit for slide reordering:

```tsx
import { DndContext, closestCenter } from '@dnd-kit/core'
import { SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

function SortableSlideItem({ slide, index }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: slide.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div ref={setNodeRef} style={style} className="slide-row">
      <div {...attributes} {...listeners} className="drag-handle">⠿</div>
      <span className="slide-number">{index + 1}</span>
      <input
        value={slide.title}
        onChange={(e) => handleTitleEdit(slide.id, e.target.value)}
        className="slide-title-input"
      />
      <button onClick={() => handleEdit(slide.id)}>✏️</button>
      <button onClick={() => handleDelete(slide.id)}>🗑️</button>
    </div>
  )
}

function OutlineEditor({ outline, setOutline }) {
  const handleDragEnd = (event) => {
    const { active, over } = event
    if (active.id !== over.id) {
      const oldIndex = outline.findIndex(s => s.id === active.id)
      const newIndex = outline.findIndex(s => s.id === over.id)
      const newOutline = arrayMove(outline, oldIndex, newIndex)
      setOutline(newOutline)
      // Auto-save to Supabase here
    }
  }

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={outline} strategy={verticalListSortingStrategy}>
        {outline.map((slide, index) => (
          <SortableSlideItem key={slide.id} slide={slide} index={index} />
        ))}
      </SortableContext>
    </DndContext>
  )
}
```

STYLING NOTES
-------------

Use existing Medellin AI design system:
- Purple primary buttons (#8B5CF6)
- Card shadows on hover
- Same fonts as dashboard
- Responsive (stack on mobile)
- White background with gray borders
- Smooth animations for drag & drop

Copy the card styling from /pitch-deck page (you already built that).

AUTO-SAVE INDICATOR
-------------------

Show save status in top right:
- "💾 Saving..." (gray, faded)
- "💾 Saved now" (green, brief)
- "⚠️ Failed to save" (red, if error)

Use debounce: Wait 2 seconds after last edit before saving.

NAVIGATION
----------

Top bar:
- [← Back to Dashboard] link on left
- Page title: "Review Outline" in center
- Save indicator on right

EXAMPLE DATA
------------

If outline from database is:
```json
[
  { "id": "slide-1", "title": "EventOS Startup Pitch" },
  { "id": "slide-2", "title": "The Problem" },
  { "id": "slide-3", "title": "Our Solution" },
  { "id": "slide-4", "title": "How It Works" },
  { "id": "slide-5", "title": "Market Opportunity" },
  { "id": "slide-6", "title": "Business Model" },
  { "id": "slide-7", "title": "Traction & Metrics" },
  { "id": "slide-8", "title": "The Team" },
  { "id": "slide-9", "title": "Investment Ask" },
  { "id": "slide-10", "title": "Thank You" }
]
```

Display as editable list with drag handles.

EDGE CASES
----------

1. If outline is empty: Show empty state "No slides yet. Add your first slide."
2. If theme is null: Default to 'purple'
3. If user tries to delete last slide: Show warning "You need at least 1 slide"
4. If generation fails: Show error toast + keep user on page

TESTING CHECKLIST
-----------------

Before marking done:
✅ Page loads with outline from database
✅ Can edit slide titles (auto-save works)
✅ Can drag & drop to reorder slides
✅ Can delete slides (with confirmation)
✅ Can add new slides
✅ Can select theme (updates database)
✅ "Generate Presentation" calls Edge Function
✅ Progress indicator shows during generation
✅ Redirects to /presentations/:id/edit after generation
✅ Mobile responsive (stacks sections)
✅ Auto-save indicator works correctly

That's it! Build this page so users can review and customize their AI-generated outlines.
```

---

## 📦 DEPENDENCIES TO INSTALL

For Lovable to build this, make sure these are installed:

```bash
npm install @dnd-kit/core @dnd-kit/sortable @dnd-kit/utilities
```

Or add to package.json dependencies:
```json
{
  "@dnd-kit/core": "^6.1.0",
  "@dnd-kit/sortable": "^8.0.0",
  "@dnd-kit/utilities": "^3.2.2"
}
```

---

## 🔄 AFTER PHASE 1 (Outline Editor)

Once the outline editor is working, proceed to:

**Phase 2:** Presentation Editor (`/presentations/:id/edit`)
- Use the prompt from `/home/sk/medellin-spark/main/lovable/09-mvp-simple.md` PART 4
- Add Plate.js or simple textarea for slide editing
- Slide thumbnails on left, editor on right
- Auto-save every 2 seconds

**Phase 3:** Presentation Viewer (`/presentations/:id/view`)
- Use the prompt from `/home/sk/medellin-spark/main/lovable/09-mvp-simple.md` PART 5
- Full-screen presentation mode
- Keyboard navigation (arrows, Escape)
- Apply theme colors

---

## ✅ SUCCESS CRITERIA

Phase 1 is complete when:
- [ ] User can access `/presentations/:id/outline` after AI generation
- [ ] User can see all slide titles from database
- [ ] User can edit titles (auto-saves to Supabase)
- [ ] User can reorder slides with drag & drop
- [ ] User can delete slides
- [ ] User can select a theme (purple/blue/dark)
- [ ] "Generate Presentation" button calls Edge Function
- [ ] Redirects to editor after generation
- [ ] Mobile responsive

---

## 🚀 DEPLOYMENT ORDER

1. **Week 1, Day 1-2:** Build Outline Editor (this prompt)
2. **Week 1, Day 2-3:** Build Presentation Editor
3. **Week 1, Day 3-4:** Build Presentation Viewer
4. **Week 1, Day 4-5:** Polish + test complete flow
5. **Week 2:** Dashboard improvements + auth pages

---

## 📞 NEED HELP?

**Reference Files:**
- MVP Spec: `/home/sk/medellin-spark/main/lovable/09-mvp-simple.md`
- Supabase Setup: `/home/sk/medellin-spark/main/lovable/10-supabase.md`
- Comprehensive Plan: `/home/sk/medellin-spark/main/lovable/11-prompt-pitch.md`
- Crawl Report: `/home/sk/medellin-spark/data/firecrawl/2025-10-15/CRAWL-REPORT.md`
- Live Site: https://medellin-spark.lovable.app/

**Next Steps:**
1. Copy the Lovable prompt above
2. Paste into Lovable
3. Wait for it to generate the outline editor page
4. Test the complete flow: Dashboard → Generate → Outline → Edit → View

---

**Created:** October 15, 2025
**Priority:** 🔴 CRITICAL - Unblocks primary user journey
**Estimated Time:** 2-3 days for Outline Editor + Theme Picker
