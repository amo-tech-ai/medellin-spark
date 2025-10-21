# UI/UX Implementation Plan - Pitch Deck Generator

## Design System

### Color Palette (Waterfall Theme)
```css
--primary: 199 89% 82%      /* #A8CAD6 - Calm blue */
--primary-light: 180 100% 95% /* #E5F8F8 - Lightest blue */
--primary-soft: 186 85% 93%  /* #EEF6F2 - Soft blue-green */
--accent: 210 43% 86%        /* #D6DFE8 - Muted slate */
--neutral-100: 180 50% 94%   /* #C2EBEF - Light aqua */
--neutral-200: 195 28% 72%   /* #D5E3E4 - Medium gray-blue */
--background: 30 50% 95%     /* Warm off-white */
```

### Typography
- Headings: Inter (600-700)
- Body: Inter (400-500)
- Monospace: JetBrains Mono

### Spacing Scale
- xs: 0.5rem (8px)
- sm: 0.75rem (12px)
- md: 1rem (16px)
- lg: 1.5rem (24px)
- xl: 2rem (32px)
- 2xl: 3rem (48px)

## Page Structure & Priority

### Phase 1: Core Dashboard (Week 1)
1. **DashboardLayout** - Sidebar + header wrapper
2. **Dashboard** - Main overview page
3. **DashboardPitchDecks** - Presentation grid (already exists, needs refinement)

### Phase 2: Editor Screens (Week 1-2)
4. **OutlineEditor** - `/presentations/:id/outline`
5. **SlideEditor** - `/presentations/:id/edit`
6. **PresentationViewer** - `/presentations/:id/view`

### Phase 3: Supporting Pages (Week 2)
7. **Landing Page** - Enhanced homepage
8. **Auth Page** - Login/signup
9. **Templates Gallery** - Pre-built templates

## Component Architecture

### Layout Components
- `DashboardLayout` - Sidebar navigation + header
- `EditorLayout` - Two-panel editor structure
- `ViewerLayout` - Full-screen presentation mode

### Editor Components
```
src/components/presentation/
├── outline/
│   ├── OutlineSlideRow.tsx       # Draggable slide item
│   ├── ThemeSelector.tsx         # Theme picker modal
│   └── OutlineHeader.tsx         # Header with actions
├── editor/
│   ├── ThumbnailPanel.tsx        # Left sidebar thumbnails
│   ├── SlideContent.tsx          # Main content editor
│   ├── LayoutSelector.tsx        # Layout picker modal
│   ├── AutoSaveIndicator.tsx     # Save status
│   └── EditorToolbar.tsx         # Editor actions
└── viewer/
    ├── SlideDisplay.tsx          # Renders slide with theme
    ├── ViewerControls.tsx        # Navigation controls
    └── ShareModal.tsx            # Share/export options
```

### Shared Components
- `StatsCard` - Dashboard metrics (already exists)
- `EmptyState` - Empty list states
- `LoadingState` - Skeletons and spinners
- `SearchBar` - Search input (already exists)

## User Flows

### Flow 1: Create New Presentation
```
Dashboard → New Deck Button → PitchDeck Form → 
Generate → OutlineEditor → SlideEditor → Viewer
```

### Flow 2: Edit Existing Presentation
```
Dashboard → Click Card → Viewer → Edit Button → 
SlideEditor → Save → Back to Viewer
```

### Flow 3: Share Presentation
```
Viewer → Share Button → ShareModal → Copy Link/Export PDF
```

## Responsive Breakpoints

- Mobile: < 640px (1 column, bottom sheet)
- Tablet: 640-1024px (2 columns, collapsible sidebar)
- Desktop: > 1024px (3-4 columns, persistent sidebar)

## Key Interactions

### Drag & Drop (Outline Editor)
- Library: @dnd-kit/core + @dnd-kit/sortable
- Visual feedback: Lift effect, drop indicator
- Auto-scroll when dragging near edge

### Auto-Save (Slide Editor)
- Debounce: 2 seconds after last change
- Indicator: "Saving..." → "Saved ✓"
- Use custom `useAutoSave` hook (already exists)

### Keyboard Navigation (Viewer)
- Arrow Left/Right: Navigate slides
- Escape: Exit full-screen
- F: Toggle full-screen
- Space: Next slide

## Implementation Order

### Sprint 1: Dashboard Foundation
- [x] DashboardLayout with sidebar
- [x] Dashboard main page
- [x] DashboardPitchDecks grid
- [ ] Empty states
- [ ] Loading states

### Sprint 2: Outline Editor
- [ ] `/presentations/:id/outline` route
- [ ] OutlineEditor page
- [ ] OutlineSlideRow with drag & drop
- [ ] ThemeSelector modal
- [ ] Generate content button

### Sprint 3: Slide Editor
- [ ] `/presentations/:id/edit` route
- [ ] SlideEditor page
- [ ] ThumbnailPanel sidebar
- [ ] SlideContent editor
- [ ] LayoutSelector modal
- [ ] Auto-save integration

### Sprint 4: Viewer
- [ ] `/presentations/:id/view` route
- [ ] PresentationViewer full-screen
- [ ] SlideDisplay component
- [ ] ViewerControls navigation
- [ ] ShareModal

### Sprint 5: Polish
- [ ] Mobile responsive
- [ ] Animations
- [ ] Error handling
- [ ] Toast notifications
- [ ] Accessibility

## Success Criteria

✅ All pages render without errors
✅ Navigation works between pages
✅ Drag & drop reordering works
✅ Auto-save works reliably
✅ Responsive on mobile/tablet/desktop
✅ Keyboard navigation works
✅ Loading states everywhere
✅ Error states handled gracefully
