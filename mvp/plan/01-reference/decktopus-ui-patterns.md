# 🎨 Decktopus UI/UX Integration Guide for Medellin AI

**Date:** October 15, 2025
**Purpose:** Visual guide showing how to integrate Decktopus UI/UX patterns into existing Lovable Medellin AI
**Based on:** 5 Lovable screenshots + 3 Decktopus screenshots analyzed

---

## 📸 SCREENSHOT ANALYSIS SUMMARY

### ✅ What Currently Exists in Lovable Medellin AI

**Screenshot 1: Create Presentations Page** (`1-chat.png`)
- ✅ Basic input form exists at `/pitch-deck`
- ✅ Small textarea (NOT Decktopus-style large input)
- ✅ Dropdowns for slides (5), language (English), web search toggle
- ✅ Teal/cyan "Generate Presentation" button
- ✅ "Try these examples" section with 6 example cards
- ⚠️ **NEEDS ENHANCEMENT** - Input too small, button wrong color

**Screenshot 2: Startup Profile Wizard** (`2-startup-profile.png`)
- ✅ Multi-step wizard with progress indicator (30% Complete)
- ✅ Right sidebar with Profile Strength, Pro Tips, Quick Actions
- ✅ Auto-saving indicator
- ✅ "Save Draft" + "Continue" buttons
- 💡 **GOOD PATTERN** - Reuse this wizard pattern for outline editor

**Screenshot 3: Dashboard** (`3-Medellin-AI-dash.png`)
- ✅ Left sidebar navigation with "Pitch Deck" link
- ✅ Quick Actions section with "Generate Pitch Deck" button
- ✅ Stats cards layout
- ✅ Welcome message with progress bar
- 💡 **ALREADY GOOD** - Links to pitch deck creation

**Screenshot 4: Public Profile** (`4-profile.png`)
- ✅ Clean profile layout
- ✅ Stats display (Profile Views, Connections, Endorsements)
- ✅ About section
- ✅ Profile Strength indicator (92%)
- 💡 **DESIGN SYSTEM** - Use same card styling for presentations

**Screenshot 5: My Pitch Decks** (`5-mypitch-decks.png`)
- ✅ "Create New Presentation" section with 4 cards:
  - AI Generate
  - Template Library
  - Start Blank
  - Budget Deck
- ✅ "My Presentations" grid with thumbnail cards
- ✅ "Recommended Templates" section
- ✅ Search and filter options
- 🎯 **PERFECT!** - This page already matches Decktopus style
- ⚠️ **ISSUE** - Cards link to non-existent pages

### 🎯 What Decktopus Does Better

**Screenshot 6: Outline Editor** (`4-Decktopus...jpg`)
- 🔥 **LEARN FROM THIS** - Clean outline editor with:
  - Drag handles (≡) on each slide row
  - Slide number + editable title
  - Inline action icons (edit ✏️, duplicate 📋, delete 🗑️, dropdown ⌄)
  - Theme preview at top (Title card with ●●● color dots)
  - Left sidebar with "Refine your presentation" tips
  - Purple "Generate Presentation" button (not teal!)
  - "Add Slide" link at bottom

**Screenshot 7: Layout Picker** (`5-Decktopus...jpg`)
- 🔥 **LEARN FROM THIS** - Modal overlay for layout selection:
  - Grid of layout thumbnails (3 columns)
  - Layout names below thumbnails
  - Clear categories (Company Overview, Four Number Cards, Mission Split, etc.)
  - Purple "Apply Layout" button
  - ❌ **FOR MVP:** Skip this - too complex, use 2 layouts only (title, content)

**Screenshot 8: Theme Picker** (`2025-10-13_12-19.jpg`)
- 🔥 **LEARN FROM THIS** - Modal overlay for theme selection:
  - Left side: Large theme previews (visual thumbnails)
  - Right side: List of themes with color dots (●●●)
  - Selected theme has checkmark ✓
  - Theme names: Sunset Glow, Green Meadow, Tangerine, Ocean Breeze, etc.
  - Purple "Apply Theme" button
  - ✅ **FOR MVP:** Simplify to 3 themes (Purple, Blue, Dark)

---

## 🎨 DESIGN SYSTEM COMPARISON

### Current Lovable Colors (from screenshots)
```css
--primary-button: #5EAEA8 (Teal/Cyan)
--sidebar-bg: #F8F9FA (Light gray)
--text-primary: #1F2937 (Dark gray)
--border: #E5E7EB (Light gray)
--card-bg: #FFFFFF (White)
```

### Decktopus Colors (from screenshots)
```css
--primary-button: #7C3AED (Purple)
--outline-editor-bg: #FAFAFA (Very light gray)
--text-primary: #1F2937 (Dark gray)
--border: #E5E7EB (Light gray)
--drag-handle: #9CA3AF (Medium gray)
```

### 🎯 RECOMMENDATION: Adopt Purple for Presentation Features
```css
/* Keep existing teal for general Medellin AI features */
--medellin-primary: #5EAEA8 (Teal) - For navbar, general buttons

/* Add purple for presentation-specific features */
--presentation-primary: #8B5CF6 (Purple) - For pitch deck buttons
--presentation-secondary: #A78BFA (Light purple)
--presentation-accent: #DDD6FE (Very light purple)
```

**Why?** Differentiate presentation features from general platform features.

---

## 📋 PAGE-BY-PAGE INTEGRATION GUIDE

### PAGE 1: Enhance Existing Input Page (`/pitch-deck`)

**Current State** (Screenshot 1: `1-chat.png`):
```
┌──────────────────────────────────────────────────────────┐
│  Create stunning presentations                            │
│                                                           │
│  Describe your topic or paste your content here          │
│  ┌──────────────────────────────────────────────────┐   │
│  │ Create a pitch deck for an event management...  │   │  ← SMALL (3 lines)
│  │                                                  │   │
│  │                                            0 char│   │
│  └──────────────────────────────────────────────────┘   │
│                                                           │
│  Number of Slides [5 slides ▼]  Language [English ▼]    │
│  Web Search [Toggle Off]                                 │
│                                                           │
│  ┌────────────────────────────────┐                     │
│  │  Generate Presentation   →     │ ← TEAL BUTTON       │
│  └────────────────────────────────┘                     │
│                                                           │
│  ✨ Try these examples                                   │
│  [6 example cards in 2 rows]                            │
└──────────────────────────────────────────────────────────┘
```

**Decktopus Style** (Adopt from Screenshot 6):
```
┌──────────────────────────────────────────────────────────┐
│  Create Your Startup Pitch Deck                          │
│  Transform your idea into a professional investor pitch  │
│                                                           │
│  What's your startup about?                              │
│  ┌──────────────────────────────────────────────────┐   │
│  │                                                   │   │
│  │ We're building an AI-powered event management   │   │  ← LARGE (8-10 lines)
│  │ platform for Latin American businesses...        │   │
│  │                                                   │   │
│  │                                                   │   │
│  │                                                   │   │
│  │                                            250 char│   │
│  └──────────────────────────────────────────────────┘   │
│                                                           │
│  Or try these quick starts:                              │
│  [SaaS Platform] [Marketplace] [AI/ML] [Fintech]        │
│  [E-commerce] [Dev Tools]                                │
│                                                           │
│  Number of Slides [10 slides ▼]  Style [Professional ▼] │
│                                                           │
│  ┌────────────────────────────────┐                     │
│  │  Generate Pitch Deck   →       │ ← PURPLE BUTTON     │
│  └────────────────────────────────┘                     │
└──────────────────────────────────────────────────────────┘
```

**Changes Needed:**
1. ✅ **Enlarge textarea** - From 3 lines to 8-10 lines (min-height: 200px)
2. ✅ **Better placeholder** - "Describe your startup in detail. What problem do you solve? Who are your customers? What makes you different?"
3. ✅ **Add quick start buttons** - 6 buttons above textarea
4. ✅ **Change button color** - From teal (#5EAEA8) to purple (#8B5CF6)
5. ✅ **Update button text** - "Generate Pitch Deck" (not "Generate Presentation")
6. ✅ **Simplify options** - Keep slides dropdown, remove language, remove web search toggle
7. ✅ **Remove bottom examples** - Replace with inline quick start buttons

**Quick Start Button Behavior:**
```typescript
const quickStarts = {
  'SaaS Platform': `B2B SaaS platform that helps [target] solve [problem] by [solution].
Our platform features [key features] and serves [customer segment].`,

  'Marketplace': `Two-sided marketplace connecting [buyers] and [sellers] in the [industry] space.
We facilitate [transactions] and take [revenue model].`,

  'AI/ML Product': `AI-powered tool that automates [process] using machine learning.
Our technology [key innovation] and helps [target users] achieve [outcome].`,

  'Fintech': `Financial technology solution that [value prop] for [target market].
We're disrupting [traditional process] with [innovation].`,

  'E-commerce': `Direct-to-consumer brand selling [products] to [target market].
Our unique selling point is [differentiation].`,

  'Dev Tools': `Developer tool that helps engineers [task] more efficiently.
Integrates with [platforms] and supports [use cases].`
}

// On click, fill textarea with template
function handleQuickStart(template) {
  setTopic(quickStarts[template])
}
```

---

### PAGE 2: Build New Outline Editor (`/presentations/:id/outline`)

**Decktopus Pattern** (Screenshot 6: `4-Decktopus...jpg`):

```
┌────────────┬─────────────────────────────────────────────────────────────┐
│            │  ← Back to Dashboard         Presentation Outline    💾 Saved │
│  Refine    ├─────────────────────────────────────────────────────────────┤
│  your      │                                                               │
│  present-  │  ┌─────────────────┐                                         │
│  ation     │  │  Title          │  ●●● (Purple theme preview)            │
│            │  │                 │                                         │
│  (Tips     │  └─────────────────┘                                         │
│  sidebar)  │                                                               │
│            │  11 Slides • ~6 min presentation                             │
│            │                                                               │
│            │  ≡  Slide 1   EventOS Startup Pitch              ✏️  📋  🗑️  ⌄│
│            │  ≡  Slide 2   The Problem with Event Planning    ✏️  📋  🗑️  ⌄│
│            │  ≡  Slide 3   Introducing EventOS...             ✏️  📋  🗑️  ⌄│
│            │  ≡  Slide 4   How EventOS Works                  ✏️  📋  🗑️  ⌄│
│            │  ≡  Slide 5   Key Benefits of EventOS            ✏️  📋  🗑️  ⌄│
│            │  ≡  Slide 6   Target Market and Expansion...     ✏️  📋  🗑️  ⌄│
│            │  ≡  Slide 7   Market Opportunity in Latin...     ✏️  📋  🗑️  ⌄│
│            │  ≡  Slide 8   Competitive Landscape and Diff...  ✏️  📋  🗑️  ⌄│
│            │  ≡  Slide 9   Success Metrics and User Impact    ✏️  📋  🗑️  ⌄│
│            │  ≡  Slide 10  Vision: Making Event Management... ✏️  📋  🗑️  ⌄│
│            │  ≡  Slide 11  Thank You                          ✏️  📋  🗑️  ⌄│
│            │                                                               │
│            │  + Add Slide                                                 │
│            │                                                               │
│            ├─────────────────────────────────────────────────────────────┤
│            │  Choose a Theme                                              │
│            │                                                               │
│            │  [Theme selector - see next section]                         │
│            │                                                               │
│            │  ┌──────────────┐  ┌────────────────────────────┐          │
│            │  │ ← Edit Info  │  │  Generate Presentation  →  │          │
│            │  └──────────────┘  └────────────────────────────┘          │
└────────────┴─────────────────────────────────────────────────────────────┘
```

**MVP Simplified Layout** (NO left sidebar for MVP):

```
┌───────────────────────────────────────────────────────────────────────────┐
│  ← Back to Dashboard              Review Your Outline           💾 Saved  │
├───────────────────────────────────────────────────────────────────────────┤
│                                                                            │
│  Edit your slide titles, reorder, or remove slides before generating     │
│                                                                            │
│  10 slides • ~5 min presentation                                          │
│                                                                            │
│  ⠿  1.  [EventOS - Investor Pitch Deck                    ]  ✏️  🗑️  ⌄  │
│  ⠿  2.  [The Problem with Traditional Event Planning      ]  ✏️  🗑️  ⌄  │
│  ⠿  3.  [Our Solution: AI-Powered Event Management        ]  ✏️  🗑️  ⌄  │
│  ⠿  4.  [How EventOS Works - Product Demo                 ]  ✏️  🗑️  ⌄  │
│  ⠿  5.  [Market Opportunity in Latin America              ]  ✏️  🗑️  ⌄  │
│  ⠿  6.  [Business Model and Revenue Streams               ]  ✏️  🗑️  ⌄  │
│  ⠿  7.  [Traction and Key Milestones                      ]  ✏️  🗑️  ⌄  │
│  ⠿  8.  [The Team Behind EventOS                          ]  ✏️  🗑️  ⌄  │
│  ⠿  9.  [Financial Projections and Funding Ask            ]  ✏️  🗑️  ⌄  │
│  ⠿  10. [Vision: Transforming Events Across LATAM         ]  ✏️  🗑️  ⌄  │
│                                                                            │
│  + Add Slide                                                              │
│                                                                            │
├───────────────────────────────────────────────────────────────────────────┤
│  Choose a Theme                                                            │
│                                                                            │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐                   │
│  │   Purple     │  │     Blue     │  │     Dark     │                   │
│  │              │  │              │  │              │                   │
│  │   ● ● ●      │  │   ● ● ●      │  │   ● ● ●      │                   │
│  │      ◉       │  │      ○       │  │      ○       │  ← Radio button  │
│  │ Professional │  │ Trustworthy  │  │  Executive   │                   │
│  └──────────────┘  └──────────────┘  └──────────────┘                   │
│   SELECTED          Not selected      Not selected                        │
│   (border: 2px purple)                                                     │
│                                                                            │
│  ┌──────────────┐  ┌────────────────────────────────┐                   │
│  │ ← Back       │  │  Generate Presentation  →      │ ← PURPLE          │
│  └──────────────┘  └────────────────────────────────┘                   │
└───────────────────────────────────────────────────────────────────────────┘
```

**Key Decktopus Patterns to Adopt:**

1. **Drag Handles** (⠿ or ≡)
   - Visual indicator that slides can be reordered
   - Use @dnd-kit/core for drag & drop
   - Cursor changes to grab/grabbing on hover

2. **Inline Action Buttons**
   - Edit icon (✏️) - Makes title editable
   - Delete icon (🗑️) - Removes slide with confirmation
   - Dropdown (⌄) - Shows more options (duplicate, etc.)
   - NO duplicate button for MVP (keep it simple)

3. **Editable Titles**
   - Click title → becomes input field
   - Auto-save after 2 seconds of no typing
   - Show "💾 Saving..." indicator

4. **Theme Selector with Color Dots**
   - Show 3-4 color dots (●●●) representing palette
   - Click anywhere on card to select theme
   - Selected theme has thick purple border + radio button checked
   - Below each theme: Short description

5. **Auto-Save Indicator**
   - Top right corner
   - States:
     - "💾 Saving..." (gray, while saving)
     - "💾 Saved 2s ago" (green, after save)
     - "⚠️ Failed to save" (red, on error)

**Slide Row Component:**
```tsx
interface SlideRowProps {
  slide: { id: string; title: string }
  index: number
  onEdit: (id: string) => void
  onDelete: (id: string) => void
  onTitleChange: (id: string, newTitle: string) => void
}

function SlideRow({ slide, index, onEdit, onDelete, onTitleChange }: SlideRowProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [title, setTitle] = useState(slide.title)

  // @dnd-kit sortable hook
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: slide.id
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="slide-row group hover:bg-purple-50 transition-colors"
    >
      {/* Drag Handle */}
      <div
        {...attributes}
        {...listeners}
        className="drag-handle cursor-grab active:cursor-grabbing"
      >
        ⠿
      </div>

      {/* Slide Number */}
      <span className="slide-number text-gray-500">
        {index + 1}.
      </span>

      {/* Editable Title */}
      {isEditing ? (
        <input
          value={title}
          onChange={(e) => {
            setTitle(e.target.value)
            onTitleChange(slide.id, e.target.value) // Debounced in parent
          }}
          onBlur={() => setIsEditing(false)}
          autoFocus
          className="slide-title-input flex-1"
        />
      ) : (
        <span
          onClick={() => setIsEditing(true)}
          className="slide-title flex-1 cursor-text hover:text-purple-600"
        >
          {title}
        </span>
      )}

      {/* Action Buttons (show on hover) */}
      <div className="action-buttons opacity-0 group-hover:opacity-100 transition-opacity">
        <button onClick={() => onEdit(slide.id)} title="Edit slide">
          ✏️
        </button>
        <button onClick={() => onDelete(slide.id)} title="Delete slide">
          🗑️
        </button>
        <button title="More options">⌄</button>
      </div>
    </div>
  )
}
```

**Theme Card Component:**
```tsx
interface Theme {
  id: string
  name: string
  colors: [string, string, string] // [primary, secondary, accent]
  description: string
}

interface ThemeCardProps {
  theme: Theme
  isSelected: boolean
  onSelect: (themeId: string) => void
}

function ThemeCard({ theme, isSelected, onSelect }: ThemeCardProps) {
  return (
    <div
      onClick={() => onSelect(theme.id)}
      className={`
        theme-card cursor-pointer p-4 rounded-lg border-2 transition-all
        ${isSelected
          ? 'border-purple-600 bg-purple-50'
          : 'border-gray-200 hover:border-purple-300'
        }
      `}
    >
      {/* Theme Name */}
      <h4 className="font-semibold mb-2">{theme.name}</h4>

      {/* Color Dots Preview */}
      <div className="color-preview flex gap-2 mb-3">
        {theme.colors.map((color, i) => (
          <div
            key={i}
            className="color-dot w-4 h-4 rounded-full"
            style={{ backgroundColor: color }}
          />
        ))}
      </div>

      {/* Radio Button */}
      <div className="flex items-center gap-2">
        <div className={`
          radio-button w-4 h-4 rounded-full border-2 flex items-center justify-center
          ${isSelected ? 'border-purple-600' : 'border-gray-300'}
        `}>
          {isSelected && (
            <div className="w-2 h-2 rounded-full bg-purple-600" />
          )}
        </div>
        <span className="text-sm text-gray-600">{theme.description}</span>
      </div>
    </div>
  )
}

// Theme data
const themes: Theme[] = [
  {
    id: 'purple',
    name: 'Purple',
    colors: ['#8B5CF6', '#A78BFA', '#DDD6FE'],
    description: 'Professional'
  },
  {
    id: 'blue',
    name: 'Blue',
    colors: ['#3B82F6', '#60A5FA', '#DBEAFE'],
    description: 'Trustworthy'
  },
  {
    id: 'dark',
    name: 'Dark',
    colors: ['#1F2937', '#374151', '#6B7280'],
    description: 'Executive'
  }
]
```

---

### PAGE 3: Build Slide Editor (`/presentations/:id/edit`)

**NOT in Decktopus screenshots, but based on Screenshot 2 pattern** (startup profile wizard):

```
┌──────────┬──────────────────────────────────────────────────────────────┐
│ SLIDES   │  ← Back to Outline              SLIDE 3 OF 10    💾 Saved   │
│          ├──────────────────────────────────────────────────────────────┤
│ ┌──────┐ │                                                               │
│ │Slide1│ │  Slide Title                                                 │
│ │Title │ │  ┌─────────────────────────────────────────────────────┐    │
│ └──────┘ │  │ Our Solution: AI-Powered Event Management           │    │
│          │  └─────────────────────────────────────────────────────┘    │
│ ┌──────┐ │                                                               │
│ │Slide2│ │  Slide Content                                               │
│ │Probl.│ │  ┌─────────────────────────────────────────────────────┐    │
│ └──────┘ │  │                                                      │    │
│          │  │ EventOS is an AI-powered event management platform  │    │
│ ┌──────┐ │  │ that helps businesses create, manage, and launch    │    │
│ │▶Slide3│◄──── SELECTED (purple border)                           │    │
│ │Solut.│ │  │ events in under 5 minutes.                          │    │
│ └──────┘ │  │                                                      │    │
│          │  │ Key Features:                                        │    │
│ ┌──────┐ │  │ • AI-powered event creation                         │    │
│ │Slide4│ │  │ • Automated attendee management                     │    │
│ │Demo  │ │  │ • Real-time analytics and insights                  │    │
│ └──────┘ │  │ • Multi-platform integration                        │    │
│          │  │                                                      │    │
│ ┌──────┐ │  └─────────────────────────────────────────────────────┘    │
│ │Slide5│ │                                                               │
│ │Market│ │                                                               │
│ └──────┘ │  ┌──────────────┐  ┌──────────────┐                         │
│          │  │ ← Previous   │  │   Next →     │                         │
│   ...    │  └──────────────┘  └──────────────┘                         │
│          │                                                               │
└──────────┴──────────────────────────────────────────────────────────────┘
```

**Key Features:**
- Left sidebar with slide thumbnails (click to switch)
- Selected slide has purple border indicator (▶)
- Right area shows title + content editor
- Simple textarea (NO rich text for MVP)
- Auto-save after 2 seconds
- Previous/Next buttons for navigation

**Thumbnail Panel:**
```tsx
function ThumbnailPanel({ slides, currentSlideIndex, onSelectSlide }) {
  return (
    <div className="thumbnail-panel w-48 bg-gray-50 border-r overflow-y-auto">
      <div className="p-4">
        <h3 className="font-semibold text-sm text-gray-700 mb-3">SLIDES</h3>
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            onClick={() => onSelectSlide(index)}
            className={`
              thumbnail-card mb-2 p-3 rounded cursor-pointer transition-all
              ${index === currentSlideIndex
                ? 'bg-white border-2 border-purple-600 shadow-md'
                : 'bg-white border border-gray-200 hover:border-purple-300'
              }
            `}
          >
            <div className="flex items-center gap-2">
              {index === currentSlideIndex && (
                <span className="text-purple-600">▶</span>
              )}
              <div className="flex-1">
                <div className="text-xs text-gray-500">Slide {index + 1}</div>
                <div className="text-sm font-medium truncate">{slide.title}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
```

---

### PAGE 4: Build Presentation Viewer (`/presentations/:id/view`)

**Full-screen viewer** (NOT in screenshots, but standard presentation pattern):

```
┌────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│                                                                             │
│                                                                             │
│                          EventOS - Investor Pitch                          │
│                                                                             │
│                    Transforming Event Management with AI                   │
│                                                                             │
│                                                                             │
│                                                                             │
│                                                                             │
│                                                                             │
│                                                                             │
│  ← →  1/10  ⏸️  ⚙️                                       🗙 Exit Fullscreen │ ← Auto-hide controls
└────────────────────────────────────────────────────────────────────────────┘
```

**Keyboard Navigation:**
- Arrow Left/Right - Previous/Next slide
- Space - Next slide
- Escape - Exit fullscreen
- F - Toggle fullscreen

**Auto-hide controls:**
- Show controls on mouse move
- Hide after 3 seconds of no movement
- Always show on hover at bottom

---

## 🚀 IMPLEMENTATION PRIORITY ORDER

### Phase 1: Enhance Input Page (Day 1) 🔴 CRITICAL
**File:** `/src/pages/PitchDeckWizard.tsx` (already exists!)

**Changes:**
1. ✅ Enlarge textarea from 3 lines to 10 lines
   ```tsx
   <textarea
     className="w-full min-h-[200px] p-4 border rounded-lg"  // Was: min-h-[80px]
     placeholder="Describe your startup in detail..."
   />
   ```

2. ✅ Add 6 quick start buttons above textarea
   ```tsx
   <div className="quick-starts grid grid-cols-3 gap-2 mb-4">
     {['SaaS Platform', 'Marketplace', 'AI/ML Product', 'Fintech', 'E-commerce', 'Dev Tools'].map(type => (
       <button
         key={type}
         onClick={() => handleQuickStart(type)}
         className="px-4 py-2 border border-purple-300 rounded-lg hover:bg-purple-50"
       >
         {type}
       </button>
     ))}
   </div>
   ```

3. ✅ Change button color from teal to purple
   ```tsx
   <button className="bg-purple-600 hover:bg-purple-700">  // Was: bg-cyan-600
     Generate Pitch Deck →
   </button>
   ```

4. ✅ Update placeholder text
   ```tsx
   placeholder="Describe your startup in detail. What problem do you solve? Who are your customers? What makes you different? Include your business model, target market, and key features."
   ```

5. ✅ Set default slides to 10 (investor pitch standard)
   ```tsx
   const [slideCount, setSlideCount] = useState(10)  // Was: 5
   ```

**Success Criteria:**
- Input page looks like Decktopus (large textarea, quick starts, purple button)
- Quick start buttons fill textarea with template
- User can type freely or use templates
- "Generate" button is prominent and purple

---

### Phase 2: Build Outline Editor (Days 2-3) 🔴 CRITICAL
**File:** `/src/pages/presentations/[id]/outline.tsx` (NEW!)

**Steps:**
1. ✅ Install @dnd-kit dependencies
   ```bash
   pnpm add @dnd-kit/core @dnd-kit/sortable @dnd-kit/utilities
   ```

2. ✅ Create route: `/src/pages/presentations/[id]/outline.tsx`

3. ✅ Build SlideRow component with drag handles (⠿)

4. ✅ Add inline edit/delete buttons (✏️ 🗑️)

5. ✅ Implement drag & drop reordering

6. ✅ Build theme selector with 3 themes (purple, blue, dark)

7. ✅ Add auto-save with debounce (2 seconds)

8. ✅ Add "Generate Presentation" button (calls Edge Function)

9. ✅ Show progress indicator during generation

10. ✅ Redirect to editor after generation

**Components to build:**
- `OutlineEditor.tsx` - Main page component
- `SlideRow.tsx` - Draggable slide row with actions
- `ThemeCard.tsx` - Theme selector card with color dots
- `AutoSaveIndicator.tsx` - Save status display

**Supabase Integration:**
```typescript
// On page load
const { data: presentation } = await supabase
  .from('presentations')
  .select('*')
  .eq('id', presentationId)
  .single()

// Auto-save outline changes (debounced 2 sec)
const saveOutline = useDebouncedCallback(async (newOutline) => {
  await supabase
    .from('presentations')
    .update({ outline: newOutline, updated_at: new Date().toISOString() })
    .eq('id', presentationId)
}, 2000)

// Save theme selection
async function saveTheme(themeId: string) {
  await supabase
    .from('presentations')
    .update({ theme: themeId, updated_at: new Date().toISOString() })
    .eq('id', presentationId)
}

// Generate full presentation
async function generatePresentation() {
  const { data } = await supabase.functions.invoke('generate-presentation', {
    body: {
      presentationId,
      outline: presentation.outline,
      style: presentation.presentation_style,
      topic: presentation.title,
      theme: presentation.theme
    }
  })

  // Redirect to editor
  router.push(`/presentations/${presentationId}/edit`)
}
```

**Success Criteria:**
- Outline page loads with slides from database
- Can reorder slides with drag & drop
- Can edit slide titles inline
- Can delete slides with confirmation
- Can select theme (color dots preview)
- Auto-save works (shows indicator)
- "Generate Presentation" triggers Edge Function
- Redirects to editor after generation

---

### Phase 3: Build Slide Editor (Days 4-5) 🔴 CRITICAL
**File:** `/src/pages/presentations/[id]/edit.tsx` (NEW!)

**Steps:**
1. ✅ Create route: `/src/pages/presentations/[id]/edit.tsx`

2. ✅ Build left thumbnail panel (similar to startup profile sidebar)

3. ✅ Build right editor area (title + content textareas)

4. ✅ Implement slide switching (click thumbnail)

5. ✅ Add Previous/Next buttons

6. ✅ Implement auto-save (2 second debounce)

7. ✅ Add "View Presentation" button

**Layout:**
```tsx
function SlideEditor({ presentationId }) {
  const [slides, setSlides] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)

  const currentSlide = slides[currentIndex]

  return (
    <div className="flex h-screen">
      {/* Left: Thumbnails */}
      <ThumbnailPanel
        slides={slides}
        currentSlideIndex={currentIndex}
        onSelectSlide={setCurrentIndex}
      />

      {/* Right: Editor */}
      <div className="flex-1 p-8">
        <header className="flex justify-between mb-6">
          <button onClick={() => router.back()}>← Back to Outline</button>
          <div>SLIDE {currentIndex + 1} OF {slides.length}</div>
          <AutoSaveIndicator />
        </header>

        <div className="editor-content max-w-3xl mx-auto">
          {/* Title */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Slide Title</label>
            <input
              value={currentSlide.title}
              onChange={(e) => handleTitleChange(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg text-lg font-semibold"
            />
          </div>

          {/* Content */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Slide Content</label>
            <textarea
              value={currentSlide.content}
              onChange={(e) => handleContentChange(e.target.value)}
              className="w-full min-h-[300px] px-4 py-3 border rounded-lg"
              placeholder="Enter your slide content here..."
            />
          </div>

          {/* Navigation */}
          <div className="flex justify-between">
            <button
              onClick={() => setCurrentIndex(i => Math.max(0, i - 1))}
              disabled={currentIndex === 0}
              className="px-6 py-2 border rounded-lg"
            >
              ← Previous
            </button>
            <button
              onClick={() => setCurrentIndex(i => Math.min(slides.length - 1, i + 1))}
              disabled={currentIndex === slides.length - 1}
              className="px-6 py-2 border rounded-lg"
            >
              Next →
            </button>
          </div>

          {/* View Presentation */}
          <div className="mt-8 text-center">
            <button
              onClick={() => router.push(`/presentations/${presentationId}/view`)}
              className="px-8 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
            >
              View Presentation →
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
```

**Auto-save Implementation:**
```typescript
// Debounced save function
const saveSlide = useDebouncedCallback(async (slideId, updates) => {
  // Get current content JSONB
  const { data: presentation } = await supabase
    .from('presentations')
    .select('content')
    .eq('id', presentationId)
    .single()

  // Update specific slide in JSONB
  const content = presentation.content as { slides: any[] }
  const slideIndex = content.slides.findIndex(s => s.id === slideId)
  content.slides[slideIndex] = { ...content.slides[slideIndex], ...updates }

  // Save back to database
  await supabase
    .from('presentations')
    .update({
      content: content,
      updated_at: new Date().toISOString()
    })
    .eq('id', presentationId)
}, 2000)

// Handle title change
function handleTitleChange(newTitle: string) {
  setSlides(slides => slides.map((s, i) =>
    i === currentIndex ? { ...s, title: newTitle } : s
  ))
  saveSlide(currentSlide.id, { title: newTitle })
}

// Handle content change
function handleContentChange(newContent: string) {
  setSlides(slides => slides.map((s, i) =>
    i === currentIndex ? { ...s, content: newContent } : s
  ))
  saveSlide(currentSlide.id, { content: newContent })
}
```

**Success Criteria:**
- Editor page loads with slides from database
- Thumbnail panel shows all slides
- Can click thumbnail to switch slides
- Can edit title and content
- Changes auto-save after 2 seconds
- Previous/Next buttons work
- "View Presentation" opens viewer

---

### Phase 4: Build Viewer (Day 6) 🔴 CRITICAL
**File:** `/src/pages/presentations/[id]/view.tsx` (NEW!)

**Steps:**
1. ✅ Create route: `/src/pages/presentations/[id]/view.tsx`

2. ✅ Build full-screen layout

3. ✅ Apply theme colors to slides

4. ✅ Add keyboard navigation (arrows, space, escape)

5. ✅ Add auto-hide controls

6. ✅ Add slide counter (1/10)

**Layout:**
```tsx
function PresentationViewer({ presentationId }) {
  const [slides, setSlides] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showControls, setShowControls] = useState(true)
  const [theme, setTheme] = useState('purple')

  const currentSlide = slides[currentIndex]

  // Keyboard navigation
  useEffect(() => {
    function handleKeyPress(e: KeyboardEvent) {
      if (e.key === 'ArrowLeft') setCurrentIndex(i => Math.max(0, i - 1))
      if (e.key === 'ArrowRight' || e.key === ' ') {
        setCurrentIndex(i => Math.min(slides.length - 1, i + 1))
      }
      if (e.key === 'Escape') router.back()
    }
    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [slides.length])

  // Auto-hide controls
  useEffect(() => {
    const timer = setTimeout(() => setShowControls(false), 3000)
    return () => clearTimeout(timer)
  }, [showControls])

  return (
    <div
      className="presentation-viewer h-screen w-screen bg-black text-white flex items-center justify-center"
      onMouseMove={() => setShowControls(true)}
    >
      {/* Slide Content */}
      <div className="slide-content max-w-5xl mx-auto p-12">
        {currentSlide.layout === 'title' ? (
          <div className="text-center">
            <h1 className="text-6xl font-bold mb-6">{currentSlide.title}</h1>
            <p className="text-2xl text-gray-300">{currentSlide.content}</p>
          </div>
        ) : (
          <div>
            <h2 className="text-4xl font-bold mb-8">{currentSlide.title}</h2>
            <div className="text-xl leading-relaxed whitespace-pre-wrap">
              {currentSlide.content}
            </div>
          </div>
        )}
      </div>

      {/* Controls (auto-hide) */}
      {showControls && (
        <div className="controls fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80">
          <div className="flex items-center justify-between max-w-5xl mx-auto">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setCurrentIndex(i => Math.max(0, i - 1))}
                disabled={currentIndex === 0}
              >
                ←
              </button>
              <button
                onClick={() => setCurrentIndex(i => Math.min(slides.length - 1, i + 1))}
                disabled={currentIndex === slides.length - 1}
              >
                →
              </button>
              <span className="text-sm">
                {currentIndex + 1} / {slides.length}
              </span>
            </div>

            <button onClick={() => router.back()}>
              🗙 Exit Fullscreen
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
```

**Theme Colors:**
```typescript
const themeColors = {
  purple: {
    bg: '#1F2937',
    primary: '#8B5CF6',
    secondary: '#A78BFA',
    text: '#FFFFFF'
  },
  blue: {
    bg: '#1E3A8A',
    primary: '#3B82F6',
    secondary: '#60A5FA',
    text: '#FFFFFF'
  },
  dark: {
    bg: '#000000',
    primary: '#1F2937',
    secondary: '#374151',
    text: '#FFFFFF'
  }
}

// Apply theme
const colors = themeColors[theme]
```

**Success Criteria:**
- Viewer opens in full-screen mode
- Slides render with theme colors
- Arrow keys navigate slides
- Space bar advances slides
- Escape exits viewer
- Controls auto-hide after 3 seconds
- Slide counter shows progress

---

### Phase 5: Connect "My Pitch Decks" Page (Day 7)
**File:** `/src/pages/presentations/index.tsx` (might already exist as shown in Screenshot 5)

**Current State** (Screenshot 5: `5-mypitch-decks.png`):
- ✅ Page already exists!
- ✅ "My Presentations" grid with cards
- ✅ "Edit Deck" buttons on each card
- ⚠️ **ISSUE:** Buttons probably link to non-existent pages

**Changes Needed:**
1. ✅ Update "Edit Deck" button links
   ```tsx
   // OLD (broken):
   <button onClick={() => router.push(`/presentations/${deck.id}`)}>
     Edit Deck
   </button>

   // NEW (working):
   <button onClick={() => router.push(`/presentations/${deck.id}/edit`)}>
     Edit Deck
   </button>
   ```

2. ✅ Add "View" button next to "Edit Deck"
   ```tsx
   <div className="flex gap-2">
     <button
       onClick={() => router.push(`/presentations/${deck.id}/edit`)}
       className="flex-1 px-4 py-2 border border-purple-600 text-purple-600 rounded-lg hover:bg-purple-50"
     >
       ✏️ Edit Deck
     </button>
     <button
       onClick={() => router.push(`/presentations/${deck.id}/view`)}
       className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
     >
       ▶️ View
     </button>
   </div>
   ```

3. ✅ Update "AI Generate" card to link to pitch deck wizard
   ```tsx
   <div
     onClick={() => router.push('/pitch-deck')}
     className="create-option-card cursor-pointer"
   >
     <div className="icon">✨</div>
     <h3>AI Generate</h3>
     <p>Create with artificial intelligence</p>
     <button>Get Started</button>
   </div>
   ```

4. ✅ Add status badges to presentation cards
   ```tsx
   <div className="presentation-card">
     <img src={deck.thumbnailUrl || '/placeholder.jpg'} />

     {/* Status Badge */}
     {deck.status === 'draft' && (
       <span className="badge badge-yellow">Draft</span>
     )}
     {deck.status === 'complete' && (
       <span className="badge badge-green">Complete</span>
     )}

     <h4>{deck.title}</h4>
     <p>{deck.slideCount} slides • {deck.updatedAt}</p>

     {/* Action Buttons */}
     <div className="flex gap-2">
       <button>✏️ Edit Deck</button>
       <button>▶️ View</button>
     </div>
   </div>
   ```

**Success Criteria:**
- "My Pitch Decks" page shows all user's presentations
- "Edit Deck" button opens `/presentations/:id/edit`
- "View" button opens `/presentations/:id/view`
- "AI Generate" card opens `/pitch-deck`
- Status badges show draft vs complete

---

### Phase 6: Polish & Testing (Day 8)
**Focus:** Make everything feel cohesive

**Tasks:**
1. ✅ Consistent purple theme across all presentation pages
2. ✅ Test complete user flow:
   - Dashboard → Generate Pitch Deck → Input → Outline → Edit → View
3. ✅ Fix any navigation issues
4. ✅ Test auto-save functionality
5. ✅ Test keyboard navigation in viewer
6. ✅ Mobile responsive testing
7. ✅ Error handling (what if AI generation fails?)
8. ✅ Loading states (show progress during generation)

**Checklist:**
```
Complete User Flow Testing:
□ Dashboard "Generate Pitch Deck" button works
□ Input page shows large textarea with quick start buttons
□ Quick start buttons fill textarea with templates
□ "Generate Pitch Deck" button triggers AI generation
□ Loading indicator shows during generation (30-60 sec)
□ Redirects to outline editor after generation
□ Outline shows all slide titles
□ Can reorder slides with drag & drop
□ Can edit slide titles inline
□ Can delete slides with confirmation
□ Can select theme (purple, blue, dark)
□ Theme selector shows color dots
□ Auto-save works (shows indicator)
□ "Generate Presentation" calls Edge Function
□ Loading shows progress (Generating slide 5/10...)
□ Redirects to editor after generation
□ Editor shows thumbnail panel on left
□ Can click thumbnails to switch slides
□ Can edit title and content
□ Previous/Next buttons work
□ "View Presentation" opens viewer
□ Viewer shows full-screen presentation
□ Arrow keys navigate slides
□ Space bar advances slides
□ Escape exits viewer
□ Controls auto-hide after 3 seconds
□ Back button returns to editor
□ "My Pitch Decks" page lists all presentations
□ "Edit Deck" button opens editor
□ "View" button opens viewer
□ Mobile responsive on all pages
```

---

## 🎨 DESIGN TOKENS & STYLING

### Color System
```css
/* Medellin AI General (Keep existing teal) */
--medellin-primary: #5EAEA8;
--medellin-primary-hover: #4D9D97;

/* Presentation Features (NEW - Purple from Decktopus) */
--presentation-primary: #8B5CF6;
--presentation-primary-hover: #7C3AED;
--presentation-secondary: #A78BFA;
--presentation-accent: #DDD6FE;

/* Themes */
--theme-purple-primary: #8B5CF6;
--theme-purple-secondary: #A78BFA;
--theme-purple-accent: #DDD6FE;

--theme-blue-primary: #3B82F6;
--theme-blue-secondary: #60A5FA;
--theme-blue-accent: #DBEAFE;

--theme-dark-primary: #1F2937;
--theme-dark-secondary: #374151;
--theme-dark-accent: #6B7280;

/* Neutral Colors (Keep existing) */
--gray-50: #F9FAFB;
--gray-100: #F3F4F6;
--gray-200: #E5E7EB;
--gray-300: #D1D5DB;
--gray-500: #6B7280;
--gray-700: #374151;
--gray-900: #111827;
```

### Component Styling

**Drag Handle:**
```css
.drag-handle {
  cursor: grab;
  color: #9CA3AF;
  font-size: 1.25rem;
  padding: 0.5rem;
  transition: color 0.2s;
}

.drag-handle:active {
  cursor: grabbing;
}

.drag-handle:hover {
  color: #6B7280;
}
```

**Slide Row:**
```css
.slide-row {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem 1rem;
  border: 1px solid #E5E7EB;
  border-radius: 0.5rem;
  margin-bottom: 0.5rem;
  background: white;
  transition: all 0.2s;
}

.slide-row:hover {
  background: #F9FAFB;
  border-color: #A78BFA;
}

.slide-row.dragging {
  opacity: 0.5;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}
```

**Slide Title Input:**
```css
.slide-title-input {
  flex: 1;
  border: none;
  background: transparent;
  font-size: 1rem;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  transition: background 0.2s;
}

.slide-title-input:focus {
  outline: none;
  background: white;
  box-shadow: 0 0 0 2px #8B5CF6;
}
```

**Action Buttons:**
```css
.action-buttons {
  display: flex;
  gap: 0.5rem;
  opacity: 0;
  transition: opacity 0.2s;
}

.slide-row:hover .action-buttons {
  opacity: 1;
}

.action-buttons button {
  padding: 0.25rem 0.5rem;
  border: none;
  background: transparent;
  cursor: pointer;
  font-size: 1.125rem;
  transition: transform 0.2s;
}

.action-buttons button:hover {
  transform: scale(1.1);
}
```

**Theme Card:**
```css
.theme-card {
  padding: 1.5rem;
  border: 2px solid #E5E7EB;
  border-radius: 0.75rem;
  cursor: pointer;
  transition: all 0.2s;
}

.theme-card:hover {
  border-color: #A78BFA;
  transform: translateY(-2px);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.theme-card.selected {
  border-color: #8B5CF6;
  background: #F5F3FF;
}

.color-preview {
  display: flex;
  gap: 0.5rem;
  margin: 0.75rem 0;
}

.color-dot {
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
}
```

**Auto-Save Indicator:**
```css
.autosave-indicator {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  transition: all 0.3s;
}

.autosave-indicator.saving {
  color: #6B7280;
  background: #F3F4F6;
}

.autosave-indicator.saved {
  color: #059669;
  background: #D1FAE5;
}

.autosave-indicator.error {
  color: #DC2626;
  background: #FEE2E2;
}
```

---

## 📦 DEPENDENCIES TO INSTALL

```bash
# Drag & Drop
pnpm add @dnd-kit/core @dnd-kit/sortable @dnd-kit/utilities

# Debouncing (if not already installed)
pnpm add use-debounce

# Date formatting (if not already installed)
pnpm add date-fns
```

**package.json additions:**
```json
{
  "dependencies": {
    "@dnd-kit/core": "^6.1.0",
    "@dnd-kit/sortable": "^8.0.0",
    "@dnd-kit/utilities": "^3.2.2",
    "use-debounce": "^10.0.0",
    "date-fns": "^3.0.0"
  }
}
```

---

## 🔄 USER FLOW DIAGRAM (Visual)

```
START: User Dashboard
        ↓
        │ Click "Generate Pitch Deck" quick action
        ↓
PAGE 1: Input Page (/pitch-deck) ✅ EXISTS
        │ - Large textarea (NEW: enhance)
        │ - Quick start buttons (NEW: add)
        │ - Generate button (PURPLE) (NEW: change color)
        ↓
        │ Click "Generate Pitch Deck"
        ↓
AI Processing (30-60 sec)
        │ Show: "Generating outline..."
        ↓
PAGE 2: Outline Editor (/presentations/:id/outline) ❌ NEW
        │ - List of 10 slide titles
        │ - Drag & drop to reorder (⠿)
        │ - Edit titles inline (✏️)
        │ - Delete slides (🗑️)
        │ - Theme selector (●●● Purple, Blue, Dark)
        ↓
        │ Click "Generate Presentation"
        ↓
AI Processing (60-120 sec)
        │ Show: "Generating slide 5/10..."
        ↓
PAGE 3: Slide Editor (/presentations/:id/edit) ❌ NEW
        │ - Thumbnail panel (left)
        │ - Editor area (right)
        │ - Edit title + content
        │ - Previous/Next buttons
        ↓
        │ Click "View Presentation"
        ↓
PAGE 4: Viewer (/presentations/:id/view) ❌ NEW
        │ - Full-screen presentation
        │ - Arrow keys navigate
        │ - Escape to exit
        ↓
        │ Press Escape
        ↓
RETURN: My Pitch Decks (/presentations) ✅ EXISTS
        │ - Grid of presentation cards
        │ - Edit / View buttons
        │
END
```

---

## ✅ SUCCESS CRITERIA CHECKLIST

### Input Page Enhancement
- [ ] Textarea enlarged to 10 lines (min-height: 200px)
- [ ] 6 quick start buttons added above textarea
- [ ] Quick start buttons fill textarea with template on click
- [ ] Button color changed from teal to purple
- [ ] Button text changed to "Generate Pitch Deck"
- [ ] Default slide count set to 10
- [ ] Placeholder text updated with detailed guidance

### Outline Editor (NEW)
- [ ] Route created: `/presentations/:id/outline`
- [ ] @dnd-kit dependencies installed
- [ ] Slide rows render with drag handles (⠿)
- [ ] Can reorder slides with drag & drop
- [ ] Can edit slide titles inline
- [ ] Can delete slides with confirmation (can't delete last slide)
- [ ] Theme selector shows 3 themes with color dots
- [ ] Can select theme (click card)
- [ ] Selected theme has purple border + radio button
- [ ] Auto-save indicator shows status
- [ ] Changes save after 2 seconds of no typing
- [ ] "Generate Presentation" button calls Edge Function
- [ ] Progress indicator shows during generation
- [ ] Redirects to editor after successful generation
- [ ] Error handling shows toast on failure

### Slide Editor (NEW)
- [ ] Route created: `/presentations/:id/edit`
- [ ] Thumbnail panel shows all slides on left
- [ ] Can click thumbnail to switch slides
- [ ] Selected thumbnail has purple border indicator (▶)
- [ ] Editor area shows title + content inputs
- [ ] Can edit title (auto-saves after 2 sec)
- [ ] Can edit content (auto-saves after 2 sec)
- [ ] Previous button works (disabled on first slide)
- [ ] Next button works (disabled on last slide)
- [ ] "View Presentation" button opens viewer
- [ ] Auto-save indicator shows status
- [ ] Mobile responsive (thumbnails stack on small screens)

### Viewer (NEW)
- [ ] Route created: `/presentations/:id/view`
- [ ] Full-screen layout (100vw x 100vh)
- [ ] Slides render with theme colors
- [ ] Title slides use centered layout
- [ ] Content slides use standard layout
- [ ] Arrow Left key goes to previous slide
- [ ] Arrow Right key goes to next slide
- [ ] Space key advances to next slide
- [ ] Escape key exits viewer
- [ ] Controls show on mouse move
- [ ] Controls auto-hide after 3 seconds
- [ ] Slide counter shows current/total (1/10)
- [ ] Exit button returns to editor
- [ ] Mobile responsive (swipe gestures optional)

### My Pitch Decks Page Updates
- [ ] "Edit Deck" button links to `/presentations/:id/edit`
- [ ] "View" button added next to "Edit Deck"
- [ ] "View" button links to `/presentations/:id/view`
- [ ] "AI Generate" card links to `/pitch-deck`
- [ ] Status badges show (Draft, Complete)
- [ ] Presentation cards show thumbnail, title, slide count, last updated

### End-to-End Flow
- [ ] Dashboard → Generate Pitch Deck → Input page
- [ ] Input page → Generate → Outline editor
- [ ] Outline editor → Generate Presentation → Slide editor
- [ ] Slide editor → View Presentation → Viewer
- [ ] Viewer → Exit → Returns to editor
- [ ] My Pitch Decks → Edit Deck → Opens editor
- [ ] My Pitch Decks → View → Opens viewer
- [ ] No broken links or 404 errors
- [ ] All navigation works correctly
- [ ] Auto-save works on all pages
- [ ] Loading states show during AI processing
- [ ] Error states show user-friendly messages

---

## 🚨 COMMON PITFALLS & SOLUTIONS

### Pitfall 1: Drag & Drop Not Working
**Problem:** Slides won't reorder when dragging

**Solution:**
```tsx
// Make sure you're using the correct imports
import { DndContext, closestCenter } from '@dnd-kit/core'
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

// Make sure each slide has a unique ID
const slides = outline.map((title, index) => ({
  id: `slide-${index}`,  // MUST be unique and stable
  title
}))

// Use SortableContext with items prop
<DndContext onDragEnd={handleDragEnd}>
  <SortableContext items={slides} strategy={verticalListSortingStrategy}>
    {slides.map((slide, index) => (
      <SlideRow key={slide.id} slide={slide} index={index} />
    ))}
  </SortableContext>
</DndContext>
```

### Pitfall 2: Auto-Save Saves Too Often
**Problem:** Database gets hammered with updates on every keystroke

**Solution:**
```tsx
import { useDebouncedCallback } from 'use-debounce'

// Debounce for 2 seconds
const saveToDatabase = useDebouncedCallback(async (data) => {
  await supabase.from('presentations').update(data).eq('id', id)
}, 2000)

// Call on every change, but only actually saves after 2 sec
function handleTitleChange(newTitle: string) {
  setTitle(newTitle)  // Update UI immediately
  saveToDatabase({ outline: newOutline })  // Debounced save
}
```

### Pitfall 3: Theme Colors Not Applying
**Problem:** Viewer shows wrong colors even after selecting theme

**Solution:**
```tsx
// Load theme from database
const { data } = await supabase
  .from('presentations')
  .select('theme')
  .eq('id', presentationId)
  .single()

// Apply theme colors dynamically
const themeColors = {
  purple: { bg: '#1F2937', primary: '#8B5CF6', text: '#FFFFFF' },
  blue: { bg: '#1E3A8A', primary: '#3B82F6', text: '#FFFFFF' },
  dark: { bg: '#000000', primary: '#1F2937', text: '#FFFFFF' }
}

const colors = themeColors[data.theme || 'purple']

// Use inline styles or CSS variables
<div style={{ backgroundColor: colors.bg, color: colors.text }}>
  {/* Slide content */}
</div>
```

### Pitfall 4: Keyboard Navigation Conflicts
**Problem:** Keyboard shortcuts trigger other actions (e.g., Space scrolls page)

**Solution:**
```tsx
useEffect(() => {
  function handleKeyPress(e: KeyboardEvent) {
    // Prevent default behavior for presentation keys
    if (['ArrowLeft', 'ArrowRight', ' ', 'Escape'].includes(e.key)) {
      e.preventDefault()
    }

    // Handle navigation
    if (e.key === 'ArrowLeft') setSlide(i => Math.max(0, i - 1))
    if (e.key === 'ArrowRight' || e.key === ' ') {
      setSlide(i => Math.min(slides.length - 1, i + 1))
    }
    if (e.key === 'Escape') router.back()
  }

  window.addEventListener('keydown', handleKeyPress)
  return () => window.removeEventListener('keydown', handleKeyPress)
}, [slides.length])
```

### Pitfall 5: JSONB Content Structure Confusion
**Problem:** Can't update individual slides in content JSONB column

**Solution:**
```typescript
// presentations.content JSONB structure:
{
  "slides": [
    {
      "id": "slide-1",
      "title": "EventOS Pitch",
      "content": "Welcome to our pitch...",
      "layout": "title"
    },
    {
      "id": "slide-2",
      "title": "The Problem",
      "content": "Event organizers struggle...",
      "layout": "content"
    }
  ],
  "slideCount": 10
}

// To update a specific slide:
async function updateSlide(slideId: string, updates: Partial<Slide>) {
  // 1. Fetch current content
  const { data } = await supabase
    .from('presentations')
    .select('content')
    .eq('id', presentationId)
    .single()

  // 2. Update the specific slide
  const content = data.content as { slides: Slide[] }
  const slideIndex = content.slides.findIndex(s => s.id === slideId)
  content.slides[slideIndex] = { ...content.slides[slideIndex], ...updates }

  // 3. Save entire content back
  await supabase
    .from('presentations')
    .update({ content: content })
    .eq('id', presentationId)
}
```

---

## 📚 REFERENCE FILES

- **MVP Spec:** `/home/sk/medellin-spark/main/lovable/09-mvp-simple.md`
- **Immediate Action Plan:** `/home/sk/medellin-spark/main/lovable/12-immediate-action-plan.md`
- **Flowchart Diagrams:** `/home/sk/medellin-spark/main/lovable/13-flowchart-diagrams.md`
- **Mermaid Diagrams:** `/home/sk/medellin-spark/main/lovable/14-mermaid.md`
- **Comprehensive Prompt:** `/home/sk/medellin-spark/main/lovable/15-lovable-comprehensive-prompt.md`
- **Decktopus MVP Spec:** `/home/sk/medellin-spark/main/lovable/16-decktopus-mvp-startup-pitch.md`
- **Decktopus Analysis:** `/home/sk/medellin-spark/main/pages/04-decktopus.md`
- **Crawl Report:** `/home/sk/medellin-spark/data/firecrawl/2025-10-15/CRAWL-REPORT.md`

---

## 🎯 FINAL SUMMARY

### What Currently Exists (Good News!)
✅ Input page exists (`/pitch-deck`) - just needs enhancement
✅ "My Pitch Decks" page exists - already looks like Decktopus!
✅ Dashboard has "Generate Pitch Deck" quick action
✅ Startup profile wizard pattern to reuse
✅ Design system with cards, buttons, forms

### What We Need to Build (3 New Pages)
❌ Outline Editor (`/presentations/:id/outline`) - Days 2-3
❌ Slide Editor (`/presentations/:id/edit`) - Days 4-5
❌ Viewer (`/presentations/:id/view`) - Day 6

### Key Decktopus Patterns to Adopt
1. **Large textarea input** with quick start buttons
2. **Drag handles (⠿)** for slide reordering
3. **Inline action buttons** (✏️ 🗑️) that show on hover
4. **Theme selector** with color dots (●●●) and radio buttons
5. **Auto-save indicator** (💾 Saved)
6. **Purple buttons** for presentation features
7. **Full-screen viewer** with keyboard navigation
8. **Thumbnail panel** for slide switching

### Estimated Timeline
- **Day 1:** Enhance input page (4 hours)
- **Days 2-3:** Build outline editor (12 hours)
- **Days 4-5:** Build slide editor (12 hours)
- **Day 6:** Build viewer (8 hours)
- **Day 7:** Connect pages + polish (6 hours)
- **Day 8:** Testing + bug fixes (6 hours)

**Total: 48 hours = 6 working days**

### Success = Complete User Journey
```
Dashboard → Input (enhanced) → Outline (NEW) → Editor (NEW) → Viewer (NEW) → My Decks
```

All pages connected, all navigation working, auto-save functional, no 404 errors.

---

**Created:** October 15, 2025
**Based on:** 5 Lovable screenshots + 3 Decktopus screenshots
**Next Step:** Start with Phase 1 - Enhance Input Page

