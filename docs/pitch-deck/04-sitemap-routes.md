# 04 - Sitemap & Routes

## Existing Routes
- `/` - Home
- `/dashboard` - Main dashboard
- `/dashboard/pitch-decks` - Pitch deck dashboard (exists)
- `/pitch-deck` - Input form (exists, needs enhancement)
- `/pitch-deck-wizard` - AI wizard (exists)
- `/profile/:id` - Member profiles

## New Routes to Build
- `/presentations/:id/outline` - Outline editor (NEW)
- `/presentations/:id/edit` - Slide editor (NEW)
- `/presentations/:id/view` - Presentation viewer (NEW)

## Navigation Flow
```
/dashboard → /pitch-deck → /presentations/:id/outline → /presentations/:id/edit → /presentations/:id/view
```
