# 06 - Implementation Plan

## Phase 1: MVP (Build Order)

### Day 1: Foundation
1. Enhance `/pitch-deck` input form
2. Create Edge Function `generate-outline`
3. Test AI outline generation

### Day 2: Outline Editor
4. Build `/presentations/:id/outline` page
5. Add drag-and-drop for reordering
6. Implement theme selector
7. Add auto-save logic

### Day 3: Content Generation
8. Create Edge Function `generate-content`
9. Add progress indicator
10. Test full generation flow

### Day 4: Slide Editor
11. Build `/presentations/:id/edit` page
12. Create thumbnail navigation
13. Implement slide editing with auto-save

### Day 5: Viewer
14. Build `/presentations/:id/view` page
15. Add keyboard navigation
16. Apply theme styling

### Day 6: Integration
17. Update dashboard routing
18. Add navigation links
19. Test complete flow

### Day 7: Polish
20. Error handling
21. Loading states
22. Mobile responsiveness
23. Final testing

## Build Priority
🔴 Critical: Edge Functions, database operations, core pages
🟡 Important: Auto-save, theme system, navigation
🟢 Nice-to-have: Rich text, custom themes, export
