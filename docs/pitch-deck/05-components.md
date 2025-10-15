# 05 - Component Architecture

## Reusable Components (Existing)
✅ Button, Card, Input, Textarea, Select, Badge, Dialog, Toast, Progress, Tabs

## New Components to Build

### Outline Editor Components
- `OutlineEditor.tsx` - Main outline page
- `OutlineSlideRow.tsx` - Draggable slide row
- `ThemeSelector.tsx` - Theme selection cards

### Slide Editor Components  
- `SlideEditor.tsx` - Main editor page
- `ThumbnailPanel.tsx` - Left sidebar thumbnails
- `SlideContent.tsx` - Title + content editing area
- `AutoSaveIndicator.tsx` - Save status indicator

### Viewer Components
- `PresentationViewer.tsx` - Full-screen viewer
- `SlideDisplay.tsx` - Renders slide with theme
- `ViewerControls.tsx` - Navigation controls

## File Organization
```
src/
├── pages/
│   └── presentations/
│       ├── OutlineEditor.tsx
│       ├── SlideEditor.tsx
│       └── PresentationViewer.tsx
└── components/
    └── presentation/
        ├── OutlineSlideRow.tsx
        ├── ThemeSelector.tsx
        ├── ThumbnailPanel.tsx
        ├── SlideContent.tsx
        └── AutoSaveIndicator.tsx
```
