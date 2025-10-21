# Pitch Deck AI Wizard: Complete UI/UX Design & Implementation Prompt
**For:** Lovable AI
**Project:** Medellin AI Hub - Pitch Deck Generator
**Version:** 1.0
**Date:** 2025-10-15

---

## 🎯 Project Overview

You are building an **AI-powered pitch deck generator** that helps startup founders create professional investor presentations through two paths:

1. **Quick Path:** AI Chatbot Wizard (conversational, 10 minutes)
2. **Detailed Path:** Manual Editor (full control, structured)

**Important Context:**
- Authentication system is already built (useAuth hook works)
- All routes are already configured
- Database table `presentations` exists
- Page skeletons exist but need completion
- Design system uses shadcn/ui components

**Your mission:** Complete the existing infrastructure and build the missing UI components.

---

## 🎨 Design System & Brand Guidelines

### Color Palette

**Platform Colors (Main Site):**
- Primary Blue: `#9ABAC6` - Use for navbar, general platform features
- Primary Blue Hover: `#85AAB8`
- CTA Amber: `#F5A623` - Use for general CTAs (events, perks, jobs)

**Presentation Feature Colors (AI Wizard & Editor):**
- Primary Purple: `#8B5CF6` - Use for ALL pitch deck feature buttons, accents
- Purple Hover: `#7C3AED`
- Purple Light: `#A78BFA` - Use for backgrounds and highlights
- **Why Purple?** To visually differentiate pitch deck tools from main platform

**Neutral Colors:**
- Background: `#FFFFFF` (Pure White)
- Background Alt: `#F5F8F9` (Frost Gray)
- Surface: `#FAFBFC` (Cloud White)
- Text Primary: `#1F1F1F` (Charcoal)
- Text Muted: `#6A737D` (Ash Gray)
- Border: `#E1E8EB` (Silver Mist)

**System Colors:**
- Success: `hsl(145, 40%, 60%)` - Use for completed states
- Warning: `hsl(35, 80%, 65%)` - Use for in-progress states
- Error: `hsl(0, 70%, 60%)` - Use for errors and validation

### Typography

**Font Family:** Inter (already loaded)

**Text Sizes:**
- Heading 1: `text-3xl md:text-4xl` (36-48px) - Page titles
- Heading 2: `text-2xl` (24px) - Section titles
- Heading 3: `text-lg` (18px) - Card titles
- Body: `text-base` (16px) - Regular text
- Small: `text-sm` (14px) - Captions, metadata
- Tiny: `text-xs` (12px) - Labels, badges

**Font Weights:**
- Regular: `font-normal` (400)
- Medium: `font-medium` (500) - Use for emphasis
- Semibold: `font-semibold` (600) - Use for subheadings
- Bold: `font-bold` (700) - Use for headings

### Spacing System

Use Tailwind's spacing scale:
- Extra tight: `gap-2` (8px) - Between related items
- Tight: `gap-4` (16px) - Between components
- Normal: `gap-6` (24px) - Between sections
- Loose: `gap-8` (32px) - Between major sections
- Extra loose: `gap-12` (48px) - Between page sections

### Component Library

**Available Components (shadcn/ui):**
- `Button` - Use variants: default (purple), outline, ghost
- `Card`, `CardHeader`, `CardTitle`, `CardContent`, `CardFooter`
- `Input`, `Textarea` - Form inputs
- `Select`, `SelectTrigger`, `SelectContent`, `SelectItem` - Dropdowns
- `Badge` - Status indicators (draft, complete, etc.)
- `Dialog`, `DialogContent`, `DialogHeader` - Modals
- `Tabs`, `TabsList`, `TabsTrigger`, `TabsContent` - Tab navigation
- `Progress` - Loading bars
- `Avatar` - User avatars
- `Separator` - Horizontal dividers
- `ScrollArea` - Scrollable containers
- `Dropdown Menu` - Action menus
- `Toast` (Sonner) - Notifications

**Icons (lucide-react):**
Available icons: `Plus`, `Edit`, `Trash2`, `Copy`, `Share2`, `Download`, `ArrowLeft`, `ArrowRight`, `Save`, `Sparkles`, `FileText`, `Loader2`, `Calendar`, `ChevronLeft`, `ChevronRight`, etc.

---

## 📱 Responsive Design Rules

### Breakpoints

Follow Tailwind's standard breakpoints:
- Mobile: `< 768px` (default, no prefix)
- Tablet: `768px - 1024px` (use `md:` prefix)
- Desktop: `> 1024px` (use `lg:` prefix)

### Layout Patterns

**Mobile First Approach:**
```
1. Design for mobile first (320-767px)
2. Add tablet adjustments (768-1023px) with md: prefix
3. Add desktop enhancements (1024px+) with lg: prefix
```

**Grid Systems:**
- Mobile: `grid-cols-1` - Single column
- Tablet: `md:grid-cols-2` - Two columns
- Desktop: `lg:grid-cols-3` - Three columns

**Container Widths:**
- Use: `container mx-auto px-4 md:px-6 lg:px-8`
- Max width: Automatically constrained by Tailwind
- Padding: 16px mobile, 24px tablet, 32px desktop

### Mobile Optimizations

**Touch Targets:**
- Minimum size: `h-12` (48px) for all clickable elements
- Buttons: `h-10` mobile, `h-12` desktop
- Form inputs: `h-12` minimum

**Font Sizes:**
- Scale down headings on mobile: `text-2xl md:text-3xl lg:text-4xl`
- Keep body text readable: `text-base` (16px minimum)
- Use `truncate` for long text in cards

**Navigation:**
- Mobile: Hamburger menu or bottom navigation
- Desktop: Full horizontal navigation
- Sticky header on scroll

**Images:**
- Use `aspect-video` (16:9) or `aspect-square` for consistency
- Apply `object-cover` to prevent distortion
- Add `rounded-lg` for modern look

---

## 🗺️ Complete Sitemap & User Flow

### Website Structure

```
/
├── Landing Pages (Public)
│   ├── / (Home)
│   ├── /pitch-deck (Marketing page - explains AI wizard)
│   └── /auth (Login/Signup)
│
├── AI Wizard Flow (Protected)
│   ├── /pitch-deck-wizard (Step 1: Conversational input)
│   └── → Redirects to /presentations/:id/edit after generation
│
├── Presentations Dashboard (Protected)
│   ├── /presentations (List view - MyPresentations)
│   ├── /presentations/generate (Step 1: Enter prompt)
│   ├── /presentations/:id/edit (Step 2: Edit outline & content)
│   └── /presentations/:id (Step 3: View/Present)
│
└── Main Dashboard (Protected)
    ├── /dashboard (Overview with pitch deck widget)
    ├── /dashboard/events
    └── /dashboard/settings
```

### User Journey: AI Wizard Path

**Goal:** Create pitch deck in 10 minutes through conversation

```
Step 1: Entry Point
├── User clicks "Create Pitch Deck" from dashboard
├── OR visits /pitch-deck-wizard directly
└── Sees: Welcome screen with 3 options
    ├── Option A: "Use Wizard Data" (pre-fill from startup profile)
    ├── Option B: "Start Fresh" (conversational AI)
    └── Option C: "Upload Deck" (improve existing)

Step 2: Conversational Input (if "Start Fresh")
├── AI asks questions in chat interface
├── User types responses naturally
├── AI collects:
│   ├── Company name
│   ├── Problem statement
│   ├── Solution description
│   ├── Target customer
│   ├── Business model
│   └── Traction/metrics
├── Progress indicator shows completeness
└── "Generate Deck" button appears when ready

Step 3: AI Generation (30-60 seconds)
├── Loading screen with:
│   ├── Animated progress bar
│   ├── Status messages ("Analyzing your startup...")
│   └── Preview of slide titles being generated
├── Backend calls Edge Function
├── AI generates 10 slide titles (outline)
└── Creates presentation record in database

Step 4: Review & Edit
├── Automatically redirects to /presentations/:id/edit
├── Shows generated outline in left panel
├── User can:
│   ├── Reorder slides (drag & drop)
│   ├── Add/delete slides
│   ├── Edit slide titles
│   ├── Choose theme (purple, blue, dark)
│   └── Generate full content with one click
└── Auto-saves every 2 seconds

Step 5: View & Present
├── Click "View Presentation" button
├── Opens /presentations/:id (viewer)
├── Full-screen slide display
├── Keyboard navigation (arrows, space)
├── Share button (copy link)
└── Export button (PDF download)
```

### User Journey: Manual Editor Path

**Goal:** Full control over presentation creation

```
Step 1: Entry Point
├── User visits /presentations
└── Clicks "New Presentation" button

Step 2: Initial Setup
├── Opens /presentations/generate
├── User enters:
│   ├── Prompt/description (required)
│   ├── OR clicks "Start Blank"
└── Creates presentation record

Step 3: Outline Editor
├── Opens /presentations/:id/edit
├── Left panel: Slide outline
│   ├── Each slide shows title
│   ├── Drag handles for reordering
│   ├── "+" button to add slides
│   └── Trash icon to delete slides
├── Top toolbar:
│   ├── Back button
│   ├── Presentation title (editable)
│   ├── Theme selector dropdown
│   ├── Save button
│   └── "Generate Content" button
└── Auto-save indicator in corner

Step 4: Content Editing
├── Right panel: Slide content editor
├── Shows current slide being edited
├── Thumbnail strip at bottom
├── Click thumbnail to switch slides
├── Edit content in textarea (or Plate.js later)
└── Arrow keys navigate between slides

Step 5: Theme Customization
├── Theme selector dropdown in toolbar
├── Preview updates in real-time
├── Options: Purple, Blue, Dark
└── Saves preference automatically

Step 6: View & Share
├── Click "View Presentation"
├── Opens full-screen viewer
├── Navigation controls
├── Share/Export options
└── Can return to editor anytime
```

---

## 🎯 Page-by-Page UI Specifications

### Page 1: My Presentations Dashboard

**Route:** `/presentations`
**Layout:** Grid view with filters and stats

**Desktop Layout:**
```
┌─────────────────────────────────────────────┐
│ Header                                       │
│ ┌─────────────────────┐  ┌────────────────┐│
│ │ My Presentations    │  │ [New Presentation]││
│ │ 12 total • 5 drafts │  │                │││
│ └─────────────────────┘  └────────────────┘│
│                                              │
│ Stats Row                                    │
│ ┌────────┐ ┌────────┐ ┌────────┐          │
│ │ Total  │ │ Drafts │ │Complete│          │
│ │   12   │ │   5    │ │   7    │          │
│ └────────┘ └────────┘ └────────┘          │
│                                              │
│ Presentations Grid (3 columns)              │
│ ┌─────────┐ ┌─────────┐ ┌─────────┐       │
│ │ [Image] │ │ [Image] │ │ [Image] │       │
│ │ Title   │ │ Title   │ │ Title   │       │
│ │ 10 slides│ │ 12 slides│ │ 8 slides│       │
│ │ Updated │ │ Updated │ │ Updated │       │
│ │ [Edit]  │ │ [Edit]  │ │ [Edit]  │       │
│ └─────────┘ └─────────┘ └─────────┘       │
│ ┌─────────┐ ┌─────────┐ ┌─────────┐       │
│ │   ...   │ │   ...   │ │   ...   │       │
│ └─────────┘ └─────────┘ └─────────┘       │
└─────────────────────────────────────────────┘
```

**Mobile Layout:**
```
┌──────────────────┐
│ My Presentations │
│ 12 total         │
│ [New +]          │
├──────────────────┤
│ Stats            │
│ Total: 12        │
│ Drafts: 5        │
│ Complete: 7      │
├──────────────────┤
│ Presentations    │
│ (1 column)       │
│ ┌──────────────┐ │
│ │ [Image]      │ │
│ │ Title        │ │
│ │ 10 slides    │ │
│ │ [View][Edit] │ │
│ └──────────────┘ │
│ ┌──────────────┐ │
│ │ ...          │ │
│ └──────────────┘ │
└──────────────────┘
```

**Components & Styling:**

**Header Section:**
```tsx
<div className="container mx-auto px-4 py-8">
  <div className="flex justify-between items-center mb-8">
    <div>
      <h1 className="text-3xl font-bold mb-2">My Presentations</h1>
      <p className="text-muted-foreground">
        {stats.total} total • {stats.draft} drafts • {stats.complete} completed
      </p>
    </div>
    <Button onClick={() => navigate('/presentations/generate')}>
      <Plus className="mr-2 h-4 w-4" />
      New Presentation
    </Button>
  </div>
</div>
```

**Stats Cards:**
```tsx
<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
  <Card>
    <CardContent className="pt-6">
      <div className="text-center">
        <div className="text-4xl font-bold text-purple-600">{stats.total}</div>
        <p className="text-sm text-muted-foreground mt-2">Total Presentations</p>
      </div>
    </CardContent>
  </Card>
  <Card>
    <CardContent className="pt-6">
      <div className="text-center">
        <div className="text-4xl font-bold text-amber-600">{stats.draft}</div>
        <p className="text-sm text-muted-foreground mt-2">Drafts</p>
      </div>
    </CardContent>
  </Card>
  <Card>
    <CardContent className="pt-6">
      <div className="text-center">
        <div className="text-4xl font-bold text-green-600">{stats.complete}</div>
        <p className="text-sm text-muted-foreground mt-2">Completed</p>
      </div>
    </CardContent>
  </Card>
</div>
```

**Presentation Cards:**
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {presentations.map((presentation) => (
    <Card
      key={presentation.id}
      className="cursor-pointer hover:shadow-lg transition-shadow"
      onClick={() => navigate(`/presentations/${presentation.id}`)}
    >
      <CardHeader>
        {presentation.thumbnail_url ? (
          <img
            src={presentation.thumbnail_url}
            alt={presentation.title}
            className="w-full h-48 object-cover rounded-md mb-4"
          />
        ) : (
          <div className="w-full h-48 bg-gradient-to-br from-purple-100 to-purple-200 rounded-md mb-4 flex items-center justify-center">
            <FileText className="h-16 w-16 text-purple-400" />
          </div>
        )}
        <CardTitle className="truncate">{presentation.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
          <span className="flex items-center">
            <FileText className="mr-1 h-3 w-3" />
            {presentation.slide_count} slides
          </span>
          <span className="flex items-center">
            <Calendar className="mr-1 h-3 w-3" />
            {formatDate(presentation.updated_at)}
          </span>
        </div>
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="outline"
            className="flex-1"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/presentations/${presentation.id}/edit`);
            }}
          >
            <Edit className="mr-1 h-3 w-3" />
            Edit
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={(e) => {
              e.stopPropagation();
              handleDuplicate(presentation.id);
            }}
          >
            <Copy className="h-3 w-3" />
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={(e) => {
              e.stopPropagation();
              handleDelete(presentation.id);
            }}
          >
            <Trash2 className="h-3 w-3" />
          </Button>
        </div>
      </CardContent>
    </Card>
  ))}
</div>
```

**Empty State:**
```tsx
{presentations.length === 0 && (
  <div className="text-center py-12">
    <div className="w-24 h-24 rounded-full bg-purple-100 mx-auto mb-6 flex items-center justify-center">
      <FileText className="h-12 w-12 text-purple-500" />
    </div>
    <h3 className="text-lg font-semibold mb-2">No presentations yet</h3>
    <p className="text-muted-foreground mb-6">
      Create your first professional pitch deck with AI assistance
    </p>
    <Button onClick={() => navigate('/presentations/generate')}>
      <Plus className="mr-2 h-4 w-4" />
      Create Your First Presentation
    </Button>
  </div>
)}
```

**Loading State:**
```tsx
{loading && (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {[1, 2, 3, 4, 5, 6].map((i) => (
      <Card key={i}>
        <CardHeader>
          <div className="w-full h-48 bg-muted rounded-md mb-4 animate-pulse" />
          <div className="h-6 bg-muted rounded animate-pulse" />
        </CardHeader>
        <CardContent>
          <div className="h-4 bg-muted rounded animate-pulse mb-2" />
          <div className="h-4 bg-muted rounded animate-pulse w-2/3" />
        </CardContent>
      </Card>
    ))}
  </div>
)}
```

**Interactions:**
1. **Card Click:** Navigate to viewer (`/presentations/:id`)
2. **Edit Button:** Navigate to editor (`/presentations/:id/edit`)
3. **Duplicate Button:** Call `handleDuplicate()`, show toast notification
4. **Delete Button:** Show confirmation dialog, then soft delete
5. **New Presentation Button:** Navigate to generate page

---

### Page 2: Generate Presentation (AI Input)

**Route:** `/presentations/generate`
**Layout:** Centered form with AI assistance

**Desktop Layout:**
```
┌─────────────────────────────────────────────┐
│                                              │
│              ✨ Generate with AI            │
│     Describe your presentation and let      │
│          AI create it for you               │
│                                              │
│  ┌────────────────────────────────────────┐│
│  │                                         ││
│  │  Example: Create a pitch deck for a    ││
│  │  SaaS startup that helps remote        ││
│  │  teams collaborate...                  ││
│  │                                         ││
│  │  (Large textarea - 8 rows)             ││
│  │                                         ││
│  └────────────────────────────────────────┘│
│                                              │
│  ┌────────────────────────────────────────┐│
│  │     ✨ Generate Presentation           ││
│  └────────────────────────────────────────┘│
│                                              │
│  Or: [Start with Blank Template]           │
│                                              │
│  ┌────────────────────────────────────────┐│
│  │ 💡 Tips:                               ││
│  │ • Be specific about your industry      ││
│  │ • Mention your target audience         ││
│  │ • Include key metrics if available     ││
│  └────────────────────────────────────────┘│
└─────────────────────────────────────────────┘
```

**Mobile Layout:**
```
┌──────────────────┐
│   ✨ Generate    │
│                  │
│ ┌──────────────┐ │
│ │ Textarea     │ │
│ │ (6 rows)     │ │
│ │              │ │
│ └──────────────┘ │
│                  │
│ [Generate]       │
│ [Blank Template] │
│                  │
│ Tips:            │
│ • Be specific    │
│ • Mention audience│
│ • Include metrics│
└──────────────────┘
```

**Components & Styling:**

**Page Structure:**
```tsx
<div className="min-h-screen bg-gradient-to-b from-purple-50 to-white flex items-center justify-center p-4">
  <div className="container max-w-2xl">
    {/* Icon */}
    <div className="text-center mb-8">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-purple-100 mb-4">
        <Sparkles className="w-8 h-8 text-purple-600" />
      </div>
      <h1 className="text-3xl md:text-4xl font-bold mb-2">
        Generate Presentation with AI
      </h1>
      <p className="text-muted-foreground">
        Describe your presentation and let AI create it for you
      </p>
    </div>

    {/* Input Form */}
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-4">
          <Textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Example: Create a pitch deck for a SaaS startup that helps remote teams collaborate effectively. We have 10,000 users and $50k MRR. Target audience is VP of Engineering at companies with 50-200 employees."
            rows={8}
            className="resize-none"
          />

          <Button
            onClick={handleGenerate}
            disabled={!prompt.trim() || generating}
            className="w-full h-12 text-lg"
            size="lg"
          >
            {generating ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-5 w-5" />
                Generate Presentation
              </>
            )}
          </Button>

          <div className="text-center">
            <Button
              variant="ghost"
              onClick={handleStartBlank}
              disabled={generating}
            >
              Start with Blank Template
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>

    {/* Tips Section */}
    <Card className="mt-6 bg-blue-50 border-blue-200">
      <CardContent className="pt-6">
        <div className="flex items-start gap-3">
          <div className="text-2xl">💡</div>
          <div>
            <h3 className="font-semibold mb-2">Tips for better results:</h3>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>• Be specific about your industry and product</li>
              <li>• Mention your target audience and their pain points</li>
              <li>• Include key metrics (users, revenue, growth)</li>
              <li>• Describe your unique value proposition</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
</div>
```

**Loading State (During Generation):**
```tsx
{generating && (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
    <Card className="max-w-md mx-4">
      <CardContent className="pt-6">
        <div className="text-center space-y-4">
          <Sparkles className="w-12 h-12 text-purple-600 mx-auto animate-pulse" />
          <h3 className="text-xl font-semibold">Creating your presentation...</h3>
          <Progress value={progress} className="w-full" />
          <p className="text-sm text-muted-foreground">{statusMessage}</p>
        </div>
      </CardContent>
    </Card>
  </div>
)}
```

**Interactions:**
1. **Generate Button:**
   - Validates prompt (min 20 characters)
   - Creates presentation record in database
   - Calls Edge Function `generate-outline`
   - Shows loading overlay with progress
   - Redirects to editor when complete

2. **Blank Template Button:**
   - Creates blank presentation
   - Redirects immediately to editor
   - Pre-populates with 5 empty slides

---

### Page 3: Presentation Editor (Outline & Content)

**Route:** `/presentations/:id/edit`
**Layout:** Split-panel editor with outline and content

**Desktop Layout:**
```
┌─────────────────────────────────────────────────────────┐
│ Toolbar                                                  │
│ [←Back] Title (editable) [Theme▼] [Generate] [Save] [View]│
├──────────────┬──────────────────────────────────────────┤
│ Outline Panel│ Content Editor                           │
│ (30% width)  │ (70% width)                              │
│              │                                           │
│ [+ Add Slide]│ ┌──────────────────────────────────────┐│
│              │ │ Slide 1: Cover Slide                 ││
│ ┌──────────┐│ │                                       ││
│ │☰ Slide 1 ││ │ (Edit content here)                  ││
│ │  Cover   ││ │                                       ││
│ └──────────┘│ │ [Textarea or Plate.js editor]        ││
│ ┌──────────┐│ │                                       ││
│ │☰ Slide 2 ││ │                                       ││
│ │  Problem ││ └──────────────────────────────────────┘│
│ └──────────┘│                                           │
│ ┌──────────┐│ Slide Thumbnails (bottom)                │
│ │☰ Slide 3 ││ ┌───┐┌───┐┌───┐┌───┐┌───┐             │
│ │  Solution││ │ 1 ││ 2 ││ 3 ││ 4 ││ 5 │             │
│ └──────────┘│ └───┘└───┘└───┘└───┘└───┘             │
│     ...     │ (Click to navigate)                      │
│              │                                           │
│ [🎨 Theme]   │ Auto-saved 2s ago ✓                     │
│ ○ Purple     │                                           │
│ ○ Blue       │                                           │
│ ○ Dark       │                                           │
└──────────────┴──────────────────────────────────────────┘
```

**Mobile Layout:**
```
┌──────────────────┐
│ [←] Title [Save] │
├──────────────────┤
│ Tabs:            │
│ [Outline][Edit]  │
├──────────────────┤
│ Outline Tab:     │
│ [+ Add Slide]    │
│ ┌──────────────┐ │
│ │ Slide 1      │ │
│ │ Cover        │ │
│ └──────────────┘ │
│ ┌──────────────┐ │
│ │ Slide 2      │ │
│ └──────────────┘ │
│      ...         │
│                  │
│ Edit Tab:        │
│ Slide 1 of 10    │
│ [Textarea]       │
│ [< Prev] [Next >]│
└──────────────────┘
```

**Components & Styling:**

**Toolbar:**
```tsx
<div className="border-b p-4 flex items-center justify-between gap-4 sticky top-0 bg-white z-10">
  <div className="flex items-center gap-4">
    <Button
      variant="ghost"
      size="sm"
      onClick={() => navigate('/presentations')}
    >
      <ArrowLeft className="h-4 w-4 mr-2" />
      Back
    </Button>
    <Input
      value={title}
      onChange={(e) => setTitle(e.target.value)}
      className="text-xl font-bold border-none focus:ring-0 max-w-md"
      placeholder="Untitled Presentation"
    />
  </div>

  <div className="flex items-center gap-2">
    <Select value={theme} onValueChange={setTheme}>
      <SelectTrigger className="w-32">
        <SelectValue placeholder="Theme" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="purple">Purple</SelectItem>
        <SelectItem value="blue">Blue</SelectItem>
        <SelectItem value="dark">Dark</SelectItem>
      </SelectContent>
    </Select>

    <Button
      variant="outline"
      size="sm"
      onClick={handleGenerateContent}
      disabled={generating}
    >
      {generating ? (
        <>
          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          Generating...
        </>
      ) : (
        <>
          <Sparkles className="h-4 w-4 mr-2" />
          Generate Content
        </>
      )}
    </Button>

    <Button
      size="sm"
      onClick={handleSave}
      disabled={saving}
    >
      <Save className="h-4 w-4 mr-2" />
      {saving ? 'Saving...' : 'Save'}
    </Button>

    <Button
      variant="default"
      size="sm"
      onClick={() => navigate(`/presentations/${id}`)}
    >
      View Presentation
    </Button>
  </div>
</div>
```

**Outline Panel (Left Side):**
```tsx
<div className="w-80 border-r bg-muted/30 overflow-auto">
  <div className="p-4 space-y-2">
    <Button
      variant="outline"
      className="w-full"
      onClick={handleAddSlide}
    >
      <Plus className="h-4 w-4 mr-2" />
      Add Slide
    </Button>

    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={outline}
        strategy={verticalListSortingStrategy}
      >
        {outline.map((slideTitle, index) => (
          <SortableSlideRow
            key={index}
            index={index}
            title={slideTitle}
            isActive={currentSlide === index}
            onClick={() => setCurrentSlide(index)}
            onTitleChange={(newTitle) => updateSlideTitle(index, newTitle)}
            onDelete={() => deleteSlide(index)}
          />
        ))}
      </SortableContext>
    </DndContext>
  </div>

  <Separator />

  <div className="p-4">
    <h3 className="font-semibold mb-3">Theme</h3>
    <div className="space-y-2">
      <button
        onClick={() => setTheme('purple')}
        className={cn(
          "w-full p-3 rounded-lg border-2 transition-all",
          theme === 'purple'
            ? "border-purple-600 bg-purple-50"
            : "border-gray-200 hover:border-gray-300"
        )}
      >
        <div className="flex items-center justify-between">
          <span className="font-medium">Purple</span>
          <div className="w-6 h-6 rounded-full bg-purple-600" />
        </div>
      </button>
      <button
        onClick={() => setTheme('blue')}
        className={cn(
          "w-full p-3 rounded-lg border-2 transition-all",
          theme === 'blue'
            ? "border-blue-600 bg-blue-50"
            : "border-gray-200 hover:border-gray-300"
        )}
      >
        <div className="flex items-center justify-between">
          <span className="font-medium">Blue</span>
          <div className="w-6 h-6 rounded-full bg-blue-600" />
        </div>
      </button>
      <button
        onClick={() => setTheme('dark')}
        className={cn(
          "w-full p-3 rounded-lg border-2 transition-all",
          theme === 'dark'
            ? "border-gray-900 bg-gray-50"
            : "border-gray-200 hover:border-gray-300"
        )}
      >
        <div className="flex items-center justify-between">
          <span className="font-medium">Dark</span>
          <div className="w-6 h-6 rounded-full bg-gray-900" />
        </div>
      </button>
    </div>
  </div>
</div>
```

**Sortable Slide Row Component:**
```tsx
function SortableSlideRow({ index, title, isActive, onClick, onTitleChange, onDelete }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: index });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "flex items-center gap-2 p-3 rounded-lg border-2 transition-all group",
        isActive
          ? "border-purple-600 bg-purple-50"
          : "border-transparent hover:border-gray-300 hover:bg-white"
      )}
      onClick={onClick}
    >
      <div
        {...attributes}
        {...listeners}
        className="cursor-grab active:cursor-grabbing"
      >
        <GripVertical className="h-4 w-4 text-muted-foreground" />
      </div>

      <div className="flex-1 min-w-0">
        <div className="text-xs text-muted-foreground mb-1">
          Slide {index + 1}
        </div>
        <Input
          value={title}
          onChange={(e) => {
            e.stopPropagation();
            onTitleChange(e.target.value);
          }}
          className="text-sm font-medium border-none p-0 h-auto focus:ring-0"
          placeholder="Slide title..."
        />
      </div>

      <Button
        variant="ghost"
        size="sm"
        className="opacity-0 group-hover:opacity-100"
        onClick={(e) => {
          e.stopPropagation();
          onDelete();
        }}
      >
        <Trash2 className="h-4 w-4 text-red-600" />
      </Button>
    </div>
  );
}
```

**Content Editor (Right Side):**
```tsx
<div className="flex-1 flex flex-col overflow-hidden">
  <div className="flex-1 p-8 overflow-auto">
    <div className="max-w-4xl mx-auto">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-2xl font-bold">
          {outline[currentSlide] || 'Slide Title'}
        </h2>
        <span className="text-sm text-muted-foreground">
          Slide {currentSlide + 1} of {outline.length}
        </span>
      </div>

      <Card className="min-h-[500px]">
        <CardContent className="pt-6">
          <Textarea
            value={slideContent}
            onChange={(e) => updateSlideContent(currentSlide, e.target.value)}
            placeholder="Enter slide content here...

You can add:
• Bullet points
• Key messages
• Data and metrics
• Images (coming soon)

Tip: Keep it concise and visual"
            rows={20}
            className="resize-none text-base"
          />
        </CardContent>
      </Card>
    </div>
  </div>

  {/* Slide Navigation Thumbnails */}
  <div className="border-t p-4 bg-muted/30">
    <div className="flex items-center gap-4 max-w-4xl mx-auto">
      <Button
        variant="outline"
        size="sm"
        onClick={() => setCurrentSlide(Math.max(0, currentSlide - 1))}
        disabled={currentSlide === 0}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      <ScrollArea className="flex-1">
        <div className="flex gap-2">
          {outline.map((title, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={cn(
                "flex-shrink-0 w-32 h-24 border-2 rounded-lg p-2 transition-all",
                currentSlide === index
                  ? "border-purple-600 bg-purple-50"
                  : "border-gray-200 hover:border-gray-300 bg-white"
              )}
            >
              <div className="text-xs font-medium truncate mb-1">
                {index + 1}. {title}
              </div>
              <div className="text-xs text-muted-foreground line-clamp-3">
                {getSlidePreview(index)}
              </div>
            </button>
          ))}
        </div>
      </ScrollArea>

      <Button
        variant="outline"
        size="sm"
        onClick={() => setCurrentSlide(Math.min(outline.length - 1, currentSlide + 1))}
        disabled={currentSlide === outline.length - 1}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  </div>

  {/* Auto-save Indicator */}
  <div className="absolute bottom-4 right-4">
    {saving ? (
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Loader2 className="h-4 w-4 animate-spin" />
        Saving...
      </div>
    ) : lastSaved ? (
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Check className="h-4 w-4 text-green-600" />
        Saved {formatTimeSince(lastSaved)}
      </div>
    ) : null}
  </div>
</div>
```

**Interactions & Features:**

1. **Drag & Drop Slides:**
   - Use `@dnd-kit/core` and `@dnd-kit/sortable`
   - Drag handle (☰ icon) on left of each slide
   - Visual feedback during drag
   - Auto-save after reorder

2. **Add Slide:**
   - Click "+ Add Slide" button
   - Adds new slide at end of list
   - Default title: "New Slide {number}"
   - Automatically focuses on new slide

3. **Delete Slide:**
   - Hover over slide to reveal trash icon
   - Click trash icon
   - Show confirmation dialog
   - Cannot delete if only 1 slide remains

4. **Edit Slide Title:**
   - Click on title input in slide row
   - Edit inline
   - Auto-save after 2 seconds of no typing
   - Press Enter to save immediately

5. **Navigate Slides:**
   - Click slide in outline panel
   - Click thumbnail in bottom strip
   - Use arrow keys (← →) to navigate
   - Shows "Slide X of Y" indicator

6. **Edit Content:**
   - Type in textarea
   - Auto-save after 2 seconds of no typing
   - Shows "Saving..." indicator
   - Shows "Saved {time} ago" when complete

7. **Change Theme:**
   - Click theme option in left panel
   - Preview updates in real-time (future)
   - Saves automatically

8. **Generate Content:**
   - Click "Generate Content" button
   - Shows loading overlay
   - Calls Edge Function for AI generation
   - Updates all slides with generated content
   - Shows success toast

9. **Keyboard Shortcuts:**
   - `Ctrl/Cmd + S`: Save
   - `Arrow Left`: Previous slide
   - `Arrow Right`: Next slide
   - `Ctrl/Cmd + Enter`: View presentation

---

### Page 4: Presentation Viewer (Full-Screen Display)

**Route:** `/presentations/:id`
**Layout:** Full-screen slide viewer with navigation

**Desktop Layout:**
```
┌─────────────────────────────────────────────────────────┐
│ Toolbar (auto-hide after 3s)                            │
│ [Title]           [3/10]          [Edit][Share][Export] │
├─────────────────────────────────────────────────────────┤
│                                                          │
│                                                          │
│                   SLIDE CONTENT                          │
│                   (Full Screen)                          │
│                                                          │
│                   Theme-styled                           │
│                   Typography                             │
│                                                          │
│                                                          │
├─────────────────────────────────────────────────────────┤
│ Navigation (bottom center, auto-hide)                   │
│             [<]  3 of 10  [>]                           │
└─────────────────────────────────────────────────────────┘
```

**Mobile Layout:**
```
┌──────────────────┐
│ [×] Title [•••]  │
├──────────────────┤
│                  │
│  SLIDE CONTENT   │
│  (Full Screen)   │
│                  │
│  Swipe to        │
│  navigate        │
│                  │
├──────────────────┤
│  3 of 10  [< >]  │
└──────────────────┘
```

**Components & Styling:**

**Main Viewer Structure:**
```tsx
<div className="h-screen flex flex-col bg-gray-900">
  {/* Toolbar (auto-hide) */}
  <div
    className={cn(
      "absolute top-0 left-0 right-0 z-10 transition-transform duration-300",
      showControls ? "translate-y-0" : "-translate-y-full"
    )}
  >
    <div className="bg-white/95 backdrop-blur border-b shadow-lg">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <button
          onClick={() => navigate('/presentations')}
          className="flex items-center gap-2 text-sm hover:text-purple-600"
        >
          <X className="h-4 w-4" />
          <span className="hidden md:inline">Exit</span>
        </button>

        <h1 className="text-lg font-semibold truncate max-w-md">
          {presentation.title}
        </h1>

        <div className="flex items-center gap-2">
          <Badge variant="outline">
            {currentSlide + 1} of {presentation.outline.length}
          </Badge>

          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate(`/presentations/${id}/edit`)}
          >
            <Edit className="h-4 w-4 mr-1" />
            Edit
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={handleShare}
          >
            <Share2 className="h-4 w-4 mr-1" />
            Share
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={handleExport}
          >
            <Download className="h-4 w-4 mr-1" />
            Export
          </Button>
        </div>
      </div>
    </div>
  </div>

  {/* Slide Display Area */}
  <div
    className="flex-1 flex items-center justify-center p-4 md:p-8"
    onClick={() => setShowControls(!showControls)}
    onMouseMove={handleMouseMove}
  >
    <div
      className={cn(
        "w-full max-w-6xl aspect-video rounded-lg shadow-2xl p-8 md:p-12",
        getThemeBackground()
      )}
    >
      <SlideContent
        slide={presentation.content.slides[currentSlide]}
        theme={presentation.theme}
      />
    </div>
  </div>

  {/* Navigation Controls (auto-hide) */}
  <div
    className={cn(
      "absolute bottom-0 left-0 right-0 z-10 transition-transform duration-300",
      showControls ? "translate-y-0" : "translate-y-full"
    )}
  >
    <div className="bg-white/95 backdrop-blur border-t shadow-lg">
      <div className="container mx-auto px-4 py-3 flex items-center justify-center gap-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={previousSlide}
          disabled={currentSlide === 0}
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>

        <span className="text-sm font-medium min-w-[100px] text-center">
          {currentSlide + 1} of {presentation.outline.length}
        </span>

        <Button
          variant="ghost"
          size="sm"
          onClick={nextSlide}
          disabled={currentSlide === presentation.outline.length - 1}
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>
    </div>
  </div>
</div>
```

**Slide Content Renderer:**
```tsx
function SlideContent({ slide, theme }) {
  const themeStyles = getThemeStyles(theme);

  return (
    <div
      className={cn(
        "h-full flex flex-col",
        themeStyles.text
      )}
    >
      <h1 className={cn(
        "text-4xl md:text-5xl font-bold mb-8",
        themeStyles.heading
      )}>
        {slide.title}
      </h1>

      <div className="flex-1 space-y-4 text-lg md:text-xl">
        {slide.content.split('\n').map((line, index) => (
          <p key={index} className="leading-relaxed">
            {line}
          </p>
        ))}
      </div>

      {slide.footer && (
        <div className="mt-auto pt-8 text-sm opacity-70">
          {slide.footer}
        </div>
      )}
    </div>
  );
}
```

**Theme Styles:**
```tsx
function getThemeStyles(theme) {
  const themes = {
    purple: {
      background: "bg-gradient-to-br from-purple-600 to-purple-800",
      text: "text-white",
      heading: "text-white",
      accent: "text-purple-200"
    },
    blue: {
      background: "bg-gradient-to-br from-blue-600 to-blue-800",
      text: "text-white",
      heading: "text-white",
      accent: "text-blue-200"
    },
    dark: {
      background: "bg-gradient-to-br from-gray-900 to-gray-800",
      text: "text-white",
      heading: "text-white",
      accent: "text-gray-300"
    }
  };

  return themes[theme] || themes.purple;
}
```

**Interactions & Features:**

1. **Keyboard Navigation:**
   - `Arrow Right` / `Space`: Next slide
   - `Arrow Left`: Previous slide
   - `Escape`: Exit to presentations list
   - `Home`: First slide
   - `End`: Last slide

2. **Mouse/Touch Navigation:**
   - Click right side: Next slide
   - Click left side: Previous slide
   - Move mouse: Show controls
   - No mouse movement for 3s: Hide controls

3. **Auto-Hide Controls:**
   - Toolbar and navigation hide after 3 seconds
   - Show on mouse move
   - Show on keyboard press
   - Always visible on mobile (smaller screen)

4. **Share Functionality:**
   - Click "Share" button
   - Copy presentation link to clipboard
   - Show toast: "Link copied!"
   - Link format: `https://yourdomain.com/presentations/:id`

5. **Export Functionality:**
   - Click "Export" button
   - Show loading spinner
   - Generate PDF (future feature)
   - Download presentation.pdf

6. **Mobile Gestures:**
   - Swipe left: Next slide
   - Swipe right: Previous slide
   - Tap: Toggle controls

---

### Page 5: AI Wizard (Conversational Interface)

**Route:** `/pitch-deck-wizard`
**Layout:** Chat interface with AI assistant

**Desktop Layout:**
```
┌─────────────────────────────────────────────────────────┐
│ Header                                                   │
│ [Logo] Pitch Deck AI     [History] [New Chat]          │
├──────────────┬──────────────────────────────────────────┤
│ Sidebar      │ Chat Messages                            │
│ (Progress)   │                                          │
│              │ ┌────────────────────────────────────┐  │
│ Progress:    │ │ AI: Hi! I'll help you create...   │  │
│ ○ Started    │ └────────────────────────────────────┘  │
│ ○ Company    │                                          │
│ ○ Problem    │ ┌────────────────────────────────────┐  │
│ ○ Solution   │ │ You: EventOS is an AI-powered...  │  │
│ ○ Ready      │ └────────────────────────────────────┘  │
│              │                                          │
│ Collected:   │ ┌────────────────────────────────────┐  │
│ ✓ Company    │ │ AI: Great! Tell me about the...   │  │
│ ✓ Problem    │ └────────────────────────────────────┘  │
│ · Solution   │                                          │
│ · Market     │                                          │
│              │                                          │
│              │                                          │
├──────────────┴──────────────────────────────────────────┤
│ Input Bar                                                │
│ [Type your message...              ] [Send →]           │
└─────────────────────────────────────────────────────────┘
```

**Mobile Layout:**
```
┌──────────────────┐
│ Pitch Deck AI    │
│ [•••]      [New] │
├──────────────────┤
│ Messages         │
│                  │
│ ┌──────────────┐ │
│ │ AI: Hi...    │ │
│ └──────────────┘ │
│                  │
│ ┌──────────────┐ │
│ │ You: Text... │ │
│ └──────────────┘ │
│                  │
│        ↓         │
│                  │
├──────────────────┤
│ [Type...] [Send] │
└──────────────────┘
```

**Components & Styling:**

(Full implementation provided in existing `PitchDeckWizard.tsx` - already complete)

**Key Features:**
1. Conversational AI interface
2. Quick action cards (wizard data, fresh start, upload)
3. Progress tracking sidebar
4. Data collection indicators
5. Generate button appears when ready
6. Integration with Edge Function
7. Redirects to editor after generation

---

## 🔄 User Workflows & Edge Cases

### Workflow 1: First-Time User Creating Presentation

**Entry:** User clicks "Create Pitch Deck" from dashboard

**Steps:**
1. Redirects to `/presentations/generate`
2. Sees empty input form with tips
3. Types description (example provided)
4. Clicks "Generate Presentation"
5. Sees loading overlay with progress (30-60 seconds)
6. Redirects to `/presentations/:id/edit`
7. Sees generated outline in left panel
8. Can edit slide titles, reorder, add/delete
9. Clicks "Generate Content" to fill slides
10. Reviews generated content
11. Makes edits as needed
12. Clicks "View Presentation"
13. Full-screen viewer opens
14. Can share link or export PDF

**Edge Cases:**
- No input: Button disabled until text entered
- Very short input: Show warning "Please provide more details"
- Generation fails: Show error toast, stay on generate page
- Network error: Show retry button

### Workflow 2: Editing Existing Presentation

**Entry:** User clicks "Edit" on presentation card

**Steps:**
1. Opens `/presentations/:id/edit`
2. Loads existing outline and content
3. Can modify any slide
4. Auto-saves after 2 seconds
5. Can generate new content for specific slides
6. Can change theme
7. Clicks "View Presentation" when done

**Edge Cases:**
- Presentation not found: Redirect to 404
- No permission: Redirect to 403 page
- Conflicting changes: Last write wins
- Network offline: Queue changes, sync when online

### Workflow 3: Viewing and Sharing Presentation

**Entry:** User clicks on presentation card

**Steps:**
1. Opens `/presentations/:id` (viewer)
2. Full-screen slide display
3. Navigate with keyboard or mouse
4. Click "Share" to copy link
5. Click "Export" to download PDF
6. Press Escape to exit

**Edge Cases:**
- Presentation is draft: Show "Draft" badge, allow viewing
- Presentation is private: Only owner can view
- Invalid presentation ID: Show 404 page

### Workflow 4: Mobile User Creating Presentation

**Entry:** Mobile user taps "New Presentation"

**Steps:**
1. Opens generate page (mobile layout)
2. Types in textarea (6 rows on mobile)
3. Taps "Generate" button
4. Sees full-screen loading overlay
5. Switches to tab navigation (Outline | Edit)
6. Outline tab: See all slides, tap to select
7. Edit tab: See current slide content
8. Swipe or use [< Prev] [Next >] buttons
9. Taps "View" to see full-screen presentation
10. Swipe to navigate slides

**Edge Cases:**
- Small screen: Use tabs instead of split panel
- Touch targets: Minimum 48px height
- Keyboard: May cover input, scroll view
- Orientation change: Re-layout appropriately

---

## 🎨 Image & Media Guidelines

### Image Usage Rules

**Thumbnail Images:**
- Size: 16:9 aspect ratio (1280x720 recommended)
- Format: JPEG or PNG
- Max file size: 2MB
- Use: Presentation card thumbnails
- Fallback: Purple gradient with FileText icon

**Cover Images:**
- Size: 1920x1080 (Full HD)
- Format: JPEG or PNG
- Max file size: 5MB
- Use: First slide background (optional)

**Icons:**
- Library: lucide-react
- Size: `h-4 w-4` (16px) for inline, `h-6 w-6` (24px) for standalone
- Color: Inherit from text color or use explicit color classes

**Avatars:**
- Size: 40x40px minimum
- Shape: Circular (`rounded-full`)
- Fallback: User initials in colored circle

**Logos:**
- Max height: 48px
- Transparent background
- SVG preferred
- PNG acceptable

### Placeholder Content

**For Development:**
```tsx
// Image placeholder
<div className="w-full h-48 bg-gradient-to-br from-purple-100 to-purple-200 rounded-md flex items-center justify-center">
  <FileText className="h-16 w-16 text-purple-400" />
</div>

// Avatar placeholder
<div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center text-white font-semibold">
  {user.name.charAt(0)}
</div>

// Loading skeleton
<div className="animate-pulse space-y-4">
  <div className="h-48 bg-gray-200 rounded" />
  <div className="h-4 bg-gray-200 rounded w-3/4" />
  <div className="h-4 bg-gray-200 rounded w-1/2" />
</div>
```

---

## ✅ Core Features Checklist

### Must-Have (MVP)

- [x] Authentication (useAuth hook)
- [x] Protected routes
- [ ] List presentations (fix queries)
- [ ] Create blank presentation
- [ ] Generate with AI (deploy Edge Function)
- [ ] Edit outline (drag & drop)
- [ ] Edit content (textarea)
- [ ] Change theme
- [ ] Auto-save
- [ ] View presentation (full-screen)
- [ ] Keyboard navigation
- [ ] Share link
- [ ] Delete presentation (soft delete)
- [ ] Duplicate presentation

### Should-Have (Post-MVP)

- [ ] Rich text editing (Plate.js)
- [ ] Image upload
- [ ] Slide templates
- [ ] Export to PDF
- [ ] Presentation history
- [ ] Comments
- [ ] Version control
- [ ] Collaborative editing (real-time)
- [ ] Analytics (view count)

### Nice-to-Have (Future)

- [ ] Video embeds
- [ ] Charts and graphs
- [ ] Animations
- [ ] Presenter notes
- [ ] Remote presenter
- [ ] Template marketplace
- [ ] AI voiceover
- [ ] Auto-translate

---

## 🚀 Implementation Priority

### Phase 1: Fix Critical Issues (2-4 hours)

**Goal:** Make existing pages work

1. Update `MyPresentations.tsx` queries
   - Change field names to match database
   - Calculate slide_count from content
   - Remove non-existent filters

2. Create missing RPC functions
   - `get_my_presentations_stats`
   - `soft_delete_presentation`
   - `duplicate_presentation`

3. Add database constraints
   - Theme validation
   - Status validation
   - Performance indexes

4. Deploy Edge Function (mock)
   - Basic outline generation
   - Connect to PresentationGenerate

**Output:** Functional presentation list and creation

---

### Phase 2: Complete Editor (3-5 days)

**Goal:** Full outline and content editing

1. Implement drag & drop
   - Install @dnd-kit
   - Create SortableSlideRow component
   - Handle reordering logic
   - Auto-save after move

2. Add/delete slides
   - "+ Add Slide" button
   - Trash icon on hover
   - Confirmation dialog for delete
   - Update slide count

3. Theme selector
   - Visual preview cards
   - Real-time preview (future)
   - Save preference

4. Auto-save
   - Install use-debounce
   - Debounce input changes (2 seconds)
   - Show saving indicator
   - Show "Saved {time} ago"

5. Slide content editing
   - Textarea for now
   - Keyboard shortcuts
   - Arrow keys to navigate
   - Ctrl+S to save

**Output:** Fully functional editor

---

### Phase 3: Complete Viewer (1-2 days)

**Goal:** Full-screen presentation viewing

1. Slide renderer
   - Theme-based styling
   - Typography scaling
   - Content formatting

2. Navigation
   - Keyboard (arrows, space, escape)
   - Mouse clicks (left/right)
   - Touch gestures (swipe)
   - Auto-hide controls

3. Toolbar actions
   - Share (copy link)
   - Export (PDF - future)
   - Edit (navigate to editor)

**Output:** Professional slide viewer

---

### Phase 4: Polish & Optimize (2-3 days)

**Goal:** Production-ready quality

1. Loading states
   - Skeleton screens
   - Progress indicators
   - Spinners

2. Error handling
   - Toast notifications
   - Error boundaries
   - Retry buttons

3. Mobile responsive
   - Test on real devices
   - Fix touch targets
   - Optimize layouts

4. Performance
   - Lazy loading
   - Image optimization
   - Bundle size

5. Accessibility
   - Keyboard navigation
   - ARIA labels
   - Focus management
   - Screen reader support

**Output:** Production-ready system

---

## 📝 Final Notes for Lovable

### What Already Exists (Don't Rebuild)

✅ **Keep These:**
- `AuthContext.tsx` - Authentication works perfectly
- `ProtectedRoute.tsx` - Route protection works
- `App.tsx` - All routes configured
- All shadcn/ui components
- Database `presentations` table
- Color scheme and design system

### What Needs Fixing (Quick Updates)

🔧 **Fix These:**
- `MyPresentations.tsx` lines 34, 36, 122, 124, 146 (field names)
- Create 3 RPC functions in Supabase
- Deploy generate-outline Edge Function
- Uncomment Edge Function call in PresentationGenerate

### What Needs Building (New Components)

🏗️ **Build These:**
- Complete `PresentationEditor` with:
  - Drag & drop slide list (use @dnd-kit)
  - Theme selector panel
  - Content editor with auto-save
  - Slide thumbnails navigation

- Complete `PresentationView` with:
  - Full-screen slide renderer
  - Keyboard navigation
  - Auto-hide controls
  - Share and export buttons

### Success Criteria

**You'll know it's working when:**
1. `/presentations` page loads without errors
2. Can create new presentations
3. AI generates slide outline
4. Can reorder slides with drag & drop
5. Can edit slide content
6. Auto-saves changes every 2 seconds
7. Can view full-screen presentation
8. Can navigate with keyboard
9. Can share and export
10. Works on mobile devices

### Deployment Checklist

**Before going live:**
- [ ] Test on Chrome, Firefox, Safari
- [ ] Test on iOS and Android
- [ ] Test offline functionality
- [ ] Test with slow network (3G simulation)
- [ ] Test with screen reader
- [ ] Test keyboard-only navigation
- [ ] Verify all images have alt text
- [ ] Verify all buttons have labels
- [ ] Check console for errors
- [ ] Run Lighthouse audit (score > 90)

---

**Ready to start building!** 🚀

Follow the priority order, use existing components, and test frequently. The infrastructure is already 45% complete - we just need to connect the pieces and add the missing features.
