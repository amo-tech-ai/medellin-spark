# Pitch Deck AI Generator - Planning Documentation

## 📚 Documentation Index

Read in this order:

1. **01-project-overview.md** - Current state, goals, success criteria
2. **02-database-architecture.md** - Database schemas, JSONB structures, data flows
3. **03-user-journey.md** - Complete 16-step user flow with mermaid diagrams
4. **04-sitemap-routes.md** - All routes and navigation structure
5. **05-components.md** - Component architecture and file organization
6. **06-implementation-plan.md** - Day-by-day build order

## 🎯 Quick Reference

**Key Routes:**
- `/pitch-deck` - Enhanced input form
- `/presentations/:id/outline` - Outline editor (NEW)
- `/presentations/:id/edit` - Slide editor (NEW)  
- `/presentations/:id/view` - Viewer (NEW)

**Database:**
- Table: `presentations`
- Key columns: `outline` (text[]), `content` (jsonb), `theme`, `status`

**Edge Functions:**
- `generate-outline` - AI generates slide titles
- `generate-content` - AI generates full slides

**Color Scheme:**
- Platform: Blue (#9ABAC6)
- Presentations: Purple (#8B5CF6)
- CTA: Amber (#F5A623)

## ✅ Ready to Build

All planning docs complete. Start with Day 1 in implementation plan.
