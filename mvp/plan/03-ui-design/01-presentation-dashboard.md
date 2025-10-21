# Presentation Dashboard - UI/UX Wireframe

**Component**: Presentation Dashboard
**Route**: `/presentations` or `/dashboard/presentations`
**Purpose**: Main hub for viewing, managing, and creating presentations

---

## Layout Structure

```
┌─────────────────────────────────────────────────────────────────┐
│  HEADER (with navbar)                                           │
└─────────────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────────┐
│  PAGE TITLE & CREATE BUTTON                                     │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  My Presentations                    [+ Create New] BTN  │  │
│  └──────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────────┐
│  STATS ROW (4 Cards)                                            │
│  ┌──────┐  ┌──────┐  ┌──────┐  ┌──────┐                       │
│  │ 24   │  │ 18   │  │ 6    │  │ 12   │                       │
│  │ Total│  │ Done │  │ Draft│  │Favs  │                       │
│  └──────┘  └──────┘  └──────┘  └──────┘                       │
└─────────────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────────┐
│  FILTERS & SEARCH BAR                                           │
│  ┌────────────────────────────┐  ┌──────┐  ┌──────┐           │
│  │ 🔍 Search presentations... │  │Status│  │Theme │           │
│  └────────────────────────────┘  └──────┘  └──────┘           │
└─────────────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────────┐
│  PRESENTATION GRID (3 columns, responsive)                      │
│  ┌───────────┐  ┌───────────┐  ┌───────────┐                  │
│  │  [Image]  │  │  [Image]  │  │  [Image]  │                  │
│  │           │  │           │  │           │                  │
│  │ Title     │  │ Title     │  │ Title     │                  │
│  │ 12 slides │  │ 8 slides  │  │ 15 slides │                  │
│  │ ⭐ Edit    │  │ ⭐ Edit    │  │ ⭐ Edit    │                  │
│  └───────────┘  └───────────┘  └───────────┘                  │
│  ┌───────────┐  ┌───────────┐  ┌───────────┐                  │
│  │  [Image]  │  │  [Image]  │  │  [Image]  │                  │
│  │ Title     │  │ Title     │  │ Title     │                  │
│  └───────────┘  └───────────┘  └───────────┘                  │
└─────────────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────────┐
│  PAGINATION                                                     │
│          ← Previous  1 2 3 4 5  Next →                         │
└─────────────────────────────────────────────────────────────────┘
```

---

## Section 1: Page Header

### Elements:
- **Title**: "My Presentations" (h1, large, bold)
- **Create Button**: Primary CTA button
  - Text: "+ Create New Presentation"
  - Color: Primary brand color (purple/blue)
  - Position: Top right
  - Action: Opens Generation Wizard

### Spacing:
- Padding: 2rem top/bottom, 1.5rem sides
- Between title and button: justify-between

---

## Section 2: Stats Cards Row

### Layout:
- **4 cards in a row** (responsive: 2x2 on tablet, stacked on mobile)
- Equal width cards with hover effect

### Card 1: Total Presentations
```
┌─────────────────┐
│  📊             │
│  24             │  ← Large number
│  Total          │  ← Label
│  Presentations  │
└─────────────────┘
```
- **Icon**: 📊 Chart icon
- **Number**: Total count from database
- **Label**: "Total Presentations"
- **Background**: Light gradient

### Card 2: Completed
```
┌─────────────────┐
│  ✅             │
│  18             │
│  Completed      │
└─────────────────┘
```
- **Icon**: ✅ Checkmark
- **Number**: Count where status='completed'
- **Label**: "Completed"
- **Color accent**: Green

### Card 3: Drafts
```
┌─────────────────┐
│  📝             │
│  6              │
│  Drafts         │
└─────────────────┘
```
- **Icon**: 📝 Document
- **Number**: Count where status='draft'
- **Label**: "Drafts"
- **Color accent**: Yellow/Orange

### Card 4: Favorites
```
┌─────────────────┐
│  ⭐             │
│  12             │
│  Favorites      │
└─────────────────┘
```
- **Icon**: ⭐ Star
- **Number**: Count from favorite_presentations table
- **Label**: "Favorites"
- **Color accent**: Gold

### Card Styling:
- **Border**: Light border or subtle shadow
- **Padding**: 1.5rem
- **Hover**: Slight scale up (1.02)
- **Clickable**: Yes, filters to that category

---

## Section 3: Filters & Search Bar

### Search Input:
```
┌────────────────────────────────────┐
│  🔍  Search presentations...       │
└────────────────────────────────────┘
```
- **Width**: 60% of container
- **Icon**: Magnifying glass (left side)
- **Placeholder**: "Search presentations..."
- **Functionality**: Real-time search on title, content

### Status Filter Dropdown:
```
┌──────────────┐
│  Status  ▼  │
└──────────────┘
  ↓
┌──────────────┐
│ All          │
│ ✅ Completed │
│ 📝 Draft     │
│ ⚙️ Generating│
│ ❌ Error     │
└──────────────┘
```
- **Options**: All, Completed, Draft, Generating, Error
- **Default**: All
- **Multi-select**: No

### Theme Filter Dropdown:
```
┌──────────────┐
│  Theme   ▼  │
└──────────────┘
  ↓
┌──────────────┐
│ All          │
│ 🌙 Mystique  │
│ 🌊 Ocean     │
│ 🌳 Forest    │
│ 🎨 Custom    │
└──────────────┘
```
- **Options**: All, Mystique, Ocean, Forest, Custom themes
- **Default**: All

### Layout:
- Flex row with gap
- Search: flex-grow
- Filters: fixed width (150px each)

---

## Section 4: Presentation Grid

### Grid Layout:
- **Desktop**: 3 columns
- **Tablet**: 2 columns
- **Mobile**: 1 column
- **Gap**: 1.5rem between cards

### Presentation Card:
```
┌─────────────────────────────┐
│  ┌───────────────────────┐  │
│  │                       │  │
│  │   [Thumbnail Image]   │  │  ← 16:9 ratio
│  │                       │  │
│  └───────────────────────┘  │
│                             │
│  Marketing Strategy Q4      │  ← Title (truncate)
│                             │
│  ┌─────────────────────┐   │
│  │ 📊 12 slides        │   │  ← Metadata row
│  │ Updated 2h ago      │   │
│  └─────────────────────┘   │
│                             │
│  ┌────────────────────────┐│
│  │ ⭐  ✏️ Edit  ⋯ More   ││  ← Action row
│  └────────────────────────┘│
└─────────────────────────────┘
```

#### Card Elements:

**1. Thumbnail**
- **Aspect ratio**: 16:9
- **Source**: thumbnail_url from database
- **Fallback**: Gradient background with first letter of title
- **Hover**: Slight zoom effect

**2. Title**
- **Font**: Medium weight, 1rem
- **Lines**: Max 2 lines, ellipsis overflow
- **Hover**: Show full title in tooltip

**3. Metadata Row**
```
┌─────────────────────────┐
│ 📊 12 slides           │
│ 🎨 Mystique theme      │
│ 🕐 Updated 2 hours ago │
└─────────────────────────┘
```
- **Slide count**: Icon + count
- **Theme**: Icon + theme name
- **Last updated**: Relative time (2h ago, 3d ago)
- **Layout**: Column or wrap

**4. Status Badge** (conditional)
```
┌──────────┐
│ 📝 Draft │  ← Yellow badge
└──────────┘

┌─────────────┐
│ ⚙️ Generating│  ← Blue badge with spinner
└─────────────┘
```
- **Position**: Top right overlay on thumbnail
- **Colors**:
  - Draft: Yellow
  - Generating: Blue (with spinner animation)
  - Error: Red

**5. Action Row**
```
┌───────────────────────────┐
│ [⭐] [✏️ Edit] [⋯ More] │
└───────────────────────────┘
```

**Favorite Button**:
- **Icon**: ⭐ (filled if favorited, outline if not)
- **Toggle**: Click to add/remove from favorites
- **Animation**: Scale bounce on toggle

**Edit Button**:
- **Text**: "✏️ Edit"
- **Style**: Secondary button
- **Action**: Navigate to `/presentation/{id}/edit`

**More Menu** (Dropdown):
```
⋯
 ↓
┌──────────────┐
│ 👁️ Preview   │
│ 📤 Share     │
│ 📥 Export    │
│ 📋 Duplicate │
│ 🗑️ Delete    │
└──────────────┘
```
- **Options**: Preview, Share, Export, Duplicate, Delete
- **Icons**: Yes for each option
- **Delete**: Requires confirmation

### Card Styling:
- **Border**: 1px light border
- **Border radius**: 0.5rem
- **Padding**: 1rem
- **Background**: White (light mode) / Dark gray (dark mode)
- **Hover**: Shadow increase, border color change
- **Transition**: Smooth (200ms)

---

## Section 5: Empty State

When no presentations exist:

```
┌─────────────────────────────────────┐
│                                     │
│           📊                        │
│                                     │
│    No Presentations Yet             │
│                                     │
│    Create your first AI-powered     │
│    presentation in minutes          │
│                                     │
│    [+ Create Presentation]          │
│                                     │
└─────────────────────────────────────┘
```

**Elements**:
- **Icon**: Large presentation icon (3rem)
- **Title**: "No Presentations Yet"
- **Subtitle**: Encouraging message
- **CTA Button**: Primary button to create first presentation
- **Center aligned**: All content

---

## Section 6: Pagination

```
┌─────────────────────────────────────┐
│  ← Previous  1 2 [3] 4 5  Next →   │
└─────────────────────────────────────┘
```

**Elements**:
- **Previous/Next buttons**: Arrow icons + text
- **Page numbers**: Current page highlighted
- **Layout**: Center aligned
- **Style**: Minimal, clear
- **Show**: Only if more than 1 page

**Pagination Logic**:
- **Items per page**: 12 presentations
- **Show pages**: Max 5 page numbers at once
- **Ellipsis**: For many pages (1 2 3 ... 10)

---

## Data Requirements

### API Endpoint: `GET /api/presentations`

**Query Parameters**:
```typescript
{
  search?: string;
  status?: 'all' | 'draft' | 'completed' | 'generating' | 'error';
  theme?: string;
  page?: number;
  limit?: number;
  favorited?: boolean;
}
```

**Response**:
```typescript
{
  presentations: Array<{
    id: string;
    title: string;
    thumbnail_url: string;
    theme: string;
    status: 'draft' | 'completed' | 'generating' | 'error';
    slide_count: number;
    updated_at: string;
    is_favorited: boolean;
    is_public: boolean;
  }>;
  stats: {
    total: number;
    completed: number;
    drafts: number;
    favorites: number;
  };
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}
```

### Supabase Queries:

**Get presentations with favorites**:
```typescript
const { data: presentations } = await supabase
  .rpc('get_presentations_with_favorites', { user_id: userId })
  .order('updated_at', { ascending: false })
  .range((page - 1) * limit, page * limit - 1);
```

**Get stats**:
```typescript
const { data: stats } = await supabase
  .rpc('get_presentation_stats', { user_id: userId })
  .single();
```

---

## Interactive Features

### 1. Real-time Search
- Debounced input (300ms delay)
- Filter presentations client-side or server-side
- Clear button when search has text

### 2. Filter Combinations
- Can combine search + status + theme
- Update URL params for shareable links

### 3. Quick Actions
- Hover over card shows action buttons
- Click thumbnail or title to preview
- Right-click for context menu

### 4. Keyboard Shortcuts
- `/` - Focus search
- `n` - New presentation
- `Esc` - Clear filters

### 5. Drag to Reorder (Optional)
- Hold and drag cards to reorder
- Save order preference

---

## Responsive Behavior

### Desktop (> 1024px):
- 3 columns
- Full stats row
- All filters visible

### Tablet (768px - 1024px):
- 2 columns
- Stats in 2x2 grid
- Filters stack vertically

### Mobile (< 768px):
- 1 column
- Stats in 2x2 grid
- Search full width
- Filters collapse to dropdown
- Simplified card layout

---

## Loading States

### 1. Initial Load
```
┌─────────────────┐
│  ▭▭▭▭▭▭▭▭      │  ← Skeleton card
│  ▭▭▭▭          │
│  ▭▭▭▭▭▭        │
└─────────────────┘
```
- Show 6-12 skeleton cards
- Pulse animation

### 2. Filtering/Search
- Show spinner in search input
- Fade out/in grid

### 3. Pagination
- Show spinner while loading next page
- Smooth transition

---

## Error States

### 1. Network Error
```
┌─────────────────────────────────────┐
│         ⚠️                          │
│   Failed to load presentations      │
│   [Try Again]                       │
└─────────────────────────────────────┘
```

### 2. No Results
```
┌─────────────────────────────────────┐
│         🔍                          │
│   No presentations found            │
│   Try adjusting your filters        │
│   [Clear Filters]                   │
└─────────────────────────────────────┘
```

---

## Color Palette

**Based on Medellin Spark theme**:
- **Primary**: #8B5CF6 (Purple)
- **Secondary**: #06B6D4 (Cyan)
- **Success**: #10B981 (Green)
- **Warning**: #F59E0B (Orange)
- **Error**: #EF4444 (Red)
- **Background**: #F9FAFB (Light) / #1F2937 (Dark)
- **Card**: #FFFFFF (Light) / #374151 (Dark)
- **Text**: #111827 (Light) / #F9FAFB (Dark)
- **Border**: #E5E7EB (Light) / #4B5563 (Dark)

---

## Animations

1. **Card hover**: Scale 1.02, shadow increase (200ms ease)
2. **Button hover**: Brightness increase (150ms ease)
3. **Skeleton pulse**: 2s infinite pulse
4. **Favorite toggle**: Scale bounce (300ms ease-out)
5. **Page transition**: Fade in (300ms ease)

---

## Accessibility

- ✅ Semantic HTML (nav, main, article)
- ✅ ARIA labels for all interactive elements
- ✅ Keyboard navigation support
- ✅ Focus indicators visible
- ✅ Color contrast WCAG AA compliant
- ✅ Screen reader friendly
- ✅ Alt text for all images

---

## Implementation Notes

**Tech Stack**:
- React + TypeScript
- React Router for navigation
- Supabase for data
- Radix UI for components
- Tailwind CSS for styling

**Files to create**:
- `src/pages/PresentationDashboard.tsx` - Main page
- `src/features/presentations/components/PresentationCard.tsx` - Card component
- `src/features/presentations/components/StatsCard.tsx` - Stats component
- `src/features/presentations/components/PresentationFilters.tsx` - Filter bar
- `src/features/presentations/hooks/usePresentations.ts` - Data fetching hook

---

**Ready for Lovable**: ✅ This spec is complete and ready to design in Lovable!
