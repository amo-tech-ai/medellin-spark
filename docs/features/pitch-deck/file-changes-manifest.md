# File Changes Manifest - My Presentations Dashboard
## Reference Implementation Adaptation

**Project**: Medellin Spark - Presentation AI Platform  
**Reference Repository**: `/home/sk/medellin-spark/reference-presentation-ai`  
**Target Repository**: `/home/sk/medellin-spark`  
**Phase**: 1 - My Presentations Dashboard (List View)

---

## Overview

This document lists every file that needs to be changed or created to adapt the reference implementation to our Vite + React Router + Supabase stack. Each entry explains what changes are needed and why.

---

## Section 1: Component Files

### File 1: PresentationCard.tsx
**Status**: ✅ COMPLETED  
**Location**: `src/components/presentations/PresentationCard.tsx`  
**Reference**: `reference-presentation-ai/src/components/presentation/dashboard/PresentationItem.tsx`

**Changes Made**:
- Removed "use client" directive - not needed in Vite
- Changed useRouter from next/navigation to useNavigate from react-router-dom
- Replaced router.push calls with navigate calls
- Removed React Query useMutation hooks - replaced with direct Zustand store calls
- Added local loading states for delete and duplicate actions
- Changed Image component from next/image to standard img tag
- Updated field names to match Supabase schema (snake_case instead of camelCase)
- Added Share action to dropdown menu

**Why These Changes**:
- Framework differences: Next.js App Router vs React Router v6
- State management: Server Actions + React Query vs Client-side Zustand
- Database schema: Prisma camelCase vs Supabase snake_case conventions
- Image optimization: Next.js Image component vs browser-native img
- Additional feature: Share functionality not in reference but in our design specs

---

### File 2: MyPresentationsGrid.tsx
**Status**: ⏳ PENDING  
**Location**: `src/components/presentations/MyPresentationsGrid.tsx` (to be created)  
**Reference**: `reference-presentation-ai/src/components/presentation/dashboard/RecentPresentations.tsx`

**Changes Needed**:
- Remove "use client" directive
- Replace useInfiniteQuery with Zustand store access
- Replace fetchPresentations server action with Zustand fetchPresentations method
- Remove pagination logic (infinite scroll not needed for Phase 1)
- Replace delete mutation with Zustand deletePresentation method
- Replace rename mutation with Zustand updatePresentation method
- Remove setIsSheetOpen state (sidebar navigation pattern not used)
- Change from showing "3 recent" to showing "all filtered/sorted presentations"
- Replace inline card JSX with PresentationCard component
- Add sort and filter UI controls (dropdowns for sortBy and filterBy)
- Add empty state UI when no presentations exist
- Add proper error state handling
- Update handlePresentationClick to work with React Router navigation
- Change Image component to img tag
- Update field names to Supabase schema (snake_case)


**Why These Changes**:
- Remove server-side data fetching (React Query infinite queries) in favor of client-side Zustand store
- Eliminate pagination complexity for simpler initial implementation
- Component composition: Use already-adapted PresentationCard instead of inline JSX
- Add filtering and sorting UI that wasn't in "recent" view (only showed 3 items)
- Better empty state handling for first-time users
- Consistent with our stack: React Router navigation, Zustand state, Supabase data

---

### File 3: PageHeader.tsx
**Status**: ⚠️ NEEDS REVIEW  
**Location**: `src/components/presentations/PageHeader.tsx` (already exists)  
**Reference**: `reference-presentation-ai/src/components/presentation/dashboard/PresentationHeader.tsx`

**Current Status**: 
- Component was created from design specs, not adapted from reference
- Needs comparison with reference implementation to ensure consistency

**Review Needed**:
- Compare greeting pattern with reference dashboard header
- Verify stats calculation matches reference approach
- Check if time-based greeting exists in reference
- Validate weekly activity stats pattern
- Ensure data structure matches what Zustand store provides

**Potential Changes**:
- May need to adjust stats data source if reference uses different approach
- May need to add/remove stats based on reference implementation
- May need to restructure component if reference has different layout pattern
- Field name adjustments if referencing wrong Supabase fields

**Why Review Needed**:
- Component created before "use reference first" rule was established
- Need to ensure consistency with reference patterns
- May have implemented custom patterns that should match reference

---

### File 4: CreateNewSection.tsx
**Status**: ⚠️ NEEDS REVIEW  
**Location**: `src/components/presentations/CreateNewSection.tsx` (already exists)  
**Reference**: `reference-presentation-ai/src/components/presentation/dashboard/PresentationDashboard.tsx`

**Current Status**:
- Component was created from design specs with 4 creation cards
- Needs comparison with reference dashboard creation flow

**Review Needed**:
- Compare creation options with reference (AI Generate, Template, Blank, Budgeting)
- Check if reference has similar card-based creation pattern
- Verify if PresentationInput component from reference is needed
- Check if PresentationGenerationManager integration is required
- Validate navigation flow matches reference patterns

**Potential Changes**:
- May need to integrate PresentationInput component for AI generation
- May need to add PresentationGenerationManager for generation state
- May need to adjust creation flow to match reference patterns
- May need to add model picker or web search toggle components
- May need to restructure to match reference dashboard composition

**Why Review Needed**:
- Component created independently without reference check
- Reference may have more sophisticated generation flow
- Need to ensure creation patterns are consistent
- May be missing key reference functionality

---

### File 5: RecommendedTemplatesSection.tsx
**Status**: ⏳ PENDING (TO BE CREATED)  
**Location**: `src/components/presentations/RecommendedTemplatesSection.tsx`  
**Reference**: Investigation needed - may be in PresentationDashboard.tsx or separate component

**Investigation Required**:
- Check if reference has template browsing/display functionality
- Identify template card component pattern in reference
- Review template data structure in reference database
- Understand template selection flow in reference

**Changes Needed** (tentative):
- Remove "use client" if present in reference
- Replace any Next.js Image components with img tags
- Adapt any server actions to Zustand fetchTemplates method
- Update field names to match Supabase presentation_templates table
- Replace router navigation with React Router useNavigate
- Integrate with templates store for data fetching

**Component Purpose**:
- Display 4-8 popular/recommended templates in grid layout
- Show template preview images and metadata
- Allow clicking template to create new presentation from it
- Provide "View all templates" link to full template browser

**Why This Component**:
- Helps users get started quickly with proven templates
- Reduces friction for new users
- Matches common presentation platform patterns
- May or may not exist in reference - needs investigation

---

### File 6: MyPresentationsPage.tsx
**Status**: ⏳ PENDING (TO BE CREATED)  
**Location**: `src/pages/MyPresentationsPage.tsx`  
**Reference**: Likely in `reference-presentation-ai/src/app/dashboard/page.tsx` or similar

**Changes Needed**:
- Remove "use client" directive
- Replace Next.js page structure with React Router page component
- Compose all dashboard sections into single page layout
- Add React Router route configuration
- Integrate authentication check (protected route)
- Add page-level error boundaries
- Add page-level loading states
- Set up data fetching on mount (useEffect with Zustand fetchPresentations)

**Component Composition**:
- PageHeader component at top
- CreateNewSection below header
- MyPresentationsGrid as main content area
- RecommendedTemplatesSection at bottom (optional)

**Why These Changes**:
- Next.js uses file-based routing, we use React Router declarative routing
- Need explicit authentication checks vs Next.js middleware
- Component composition pattern should match reference layout
- Data fetching lifecycle different between Next.js and Vite

---

## Section 2: State Management Files

### File 7: presentations.store.ts
**Status**: ✅ COMPLETED  
**Location**: `src/stores/presentations.store.ts`  
**Reference**: `reference-presentation-ai/src/states/presentation-state.ts`

**Changes Made**:
- Adapted Zustand store structure for dashboard/list management only
- Removed editor-specific state (slides, theme, currentSlideIndex, isGridView)
- Added fetchPresentations method with Supabase client integration
- Added fetchTemplates method for template data
- Added createPresentation, updatePresentation, deletePresentation, duplicatePresentation methods
- Replaced Prisma queries with Supabase queries
- Added sortBy and filterBy state for grid controls
- Added computed selector sortedAndFilteredPresentations for derived state
- Changed field names to match Supabase schema

**Why These Changes**:
- Phase 1 scope: Dashboard only, not editor functionality
- Server Actions don't exist in Vite - need client-side methods
- Zustand remains consistent between both implementations
- Supabase queries replace Prisma ORM calls
- Computed selectors optimize re-renders


---

### File 8: presentation-editor.store.ts
**Status**: ⏳ FUTURE (NOT NEEDED FOR PHASE 1)  
**Location**: `src/stores/presentation-editor.store.ts` (will create in Phase 2)  
**Reference**: `reference-presentation-ai/src/states/presentation-state.ts`

**Future Changes Needed**:
- Extract editor-specific state from reference presentation-state
- Include slides array, theme configuration, currentSlideIndex
- Include isGridView, selection state, image generation tracking
- Add slide manipulation methods (add, delete, reorder, duplicate)
- Add theme customization methods
- Add undo/redo state management

**Why Not Now**:
- Phase 1 is dashboard/list view only
- Editor functionality is Phase 2
- Keeps current implementation focused and simpler
- Reference has combined state, we're splitting dashboard vs editor

---

## Section 3: Type Definition Files

### File 9: presentations.types.ts
**Status**: ✅ COMPLETED  
**Location**: `src/types/presentations.types.ts`  
**Reference**: Prisma schema types and component prop types from reference

**Changes Made**:
- Created Presentation interface matching Supabase table structure
- Used snake_case for field names (Supabase convention)
- Created Template interface for presentation_templates table
- Created PresentationCard props interface
- Created CreateNewSection props interface
- Created PageHeader props interface
- Added SortOption and FilterOption types for grid controls
- Added store interface PresentationsStore with method signatures
- Changed UUID type to string (TypeScript standard)
- Added metadata fields not in Prisma (slide_count, deleted_at)

**Why These Changes**:
- Supabase uses snake_case, Prisma uses camelCase
- Need TypeScript definitions for all component props
- Store methods need type signatures for type safety
- Additional fields in Supabase for performance and soft delete

---

## Section 4: Database Files

### File 10: 20251013150000_add_presentations_metadata.sql
**Status**: ⏳ CREATED BUT NOT APPLIED  
**Location**: `supabase/migrations/20251013150000_add_presentations_metadata.sql`  
**Reference**: Prisma schema in reference-presentation-ai

**Changes Made**:
- Created presentations table with Supabase-specific structure
- Added slide_count column for performance optimization
- Added deleted_at column for soft delete pattern
- Created soft_delete_presentation RPC function
- Created duplicate_presentation RPC function
- Added Row Level Security policies
- Added indexes for performance
- Created presentation_templates table for template library

**Why These Changes**:
- Prisma handles migrations differently than Supabase
- Supabase uses PostgreSQL functions for complex operations
- RLS policies enforce data security at database level
- Additional fields optimize queries and add features
- Migration not yet applied due to connection issues (will resolve)

**Action Needed**:
- Fix Supabase connection configuration
- Apply migration through Supabase CLI or dashboard
- Verify RPC functions work correctly
- Test soft delete and duplicate operations

---

### File 11: supabase/client.ts
**Status**: ⚠️ MAY NEED UPDATES  
**Location**: `src/integrations/supabase/client.ts`  
**Reference**: N/A (Supabase-specific, no Next.js equivalent)

**Potential Changes Needed**:
- Verify Supabase client initialization is correct
- Ensure auth persistence is configured properly
- Add presentation-specific query helpers if needed
- Verify connection string and API keys are correct

**Why Check This**:
- Connection issues prevented migration application
- Need to ensure client is properly configured
- May need environment variable corrections


---

## Section 5: Routing Configuration Files

### File 12: App.tsx
**Status**: ⚠️ NEEDS UPDATE  
**Location**: `src/App.tsx`  
**Reference**: `reference-presentation-ai/src/app/layout.tsx` and routing structure

**Changes Needed**:
- Add route for My Presentations page
- Configure protected route wrapper for authenticated pages
- Add route for presentation editor (future)
- Add route for generation wizard (future)
- Ensure proper route hierarchy and nesting

**Route Structure Needed**:
```
/presentations - My Presentations dashboard (protected)
/presentation/:id - Presentation editor (protected, Phase 2)
/presentation/generate/:id - Generation wizard (protected, Phase 2)
/login - Authentication page
/register - Registration page
/ - Landing or redirect to presentations
```

**Why These Changes**:
- Next.js uses file-based routing in app directory
- React Router needs explicit route configuration
- Protected routes need authentication wrapper component
- Must match reference navigation patterns

---

### File 13: ProtectedRoute.tsx
**Status**: ⏳ MAY NEED CREATION  
**Location**: `src/components/ProtectedRoute.tsx` (if not exists)  
**Reference**: Next.js middleware handles this in reference

**Changes Needed** (if creating):
- Check Supabase authentication state
- Redirect to login if not authenticated
- Show loading state while checking auth
- Pass through to children if authenticated

**Why This Component**:
- Next.js middleware handles auth at edge
- React Router needs component-based protection
- Prevents unauthorized access to dashboard
- Consistent with React Router patterns

---

## Section 6: Supporting Component Files

### File 14: Loading Skeletons
**Status**: ⏳ MAY NEED CREATION  
**Location**: `src/components/presentations/LoadingSkeleton.tsx` or similar  
**Reference**: Skeleton components in RecentPresentations.tsx

**Changes Needed**:
- Extract skeleton loading pattern from reference
- Create reusable skeleton for presentation cards
- Match reference loading state visual design
- Add skeleton for grid layout

**Why This Component**:
- Better user experience during data loading
- Prevents layout shift
- Matches reference loading patterns
- Reusable across different views

---

### File 15: EmptyState.tsx
**Status**: ⏳ MAY NEED CREATION  
**Location**: `src/components/presentations/EmptyState.tsx`  
**Reference**: Check if reference has empty state component

**Changes Needed**:
- Create friendly empty state when no presentations exist
- Add illustration or icon
- Add call-to-action to create first presentation
- Match reference empty state if it exists

**Why This Component**:
- First-time user experience
- Clear next action for users
- Reduces confusion
- Standard UX pattern

---

## Section 7: Utility Files

### File 16: date-utils.ts (if needed)
**Status**: ⏳ CHECK IF NEEDED  
**Location**: `src/lib/utils/date-utils.ts` or similar  
**Reference**: Date formatting in reference components

**Potential Changes**:
- Extract date formatting functions used in reference
- Create relative time formatting (e.g., "2 hours ago")
- Create standard date formatting for display
- Ensure timezone handling is correct

**Why These Utils**:
- Consistent date display across components
- Already implemented in PageHeader (formatRelativeTime)
- May need to extract and reuse in other components
- Match reference date display patterns

---

### File 17: presentation-utils.ts (if needed)
**Status**: ⏳ CHECK IF NEEDED  
**Location**: `src/lib/utils/presentation-utils.ts` or similar  
**Reference**: Check reference for presentation-specific utilities

**Potential Functions**:
- Generate thumbnail from presentation content
- Calculate presentation statistics
- Validate presentation data
- Format presentation metadata

**Why These Utils**:
- Code reusability across components
- Centralized business logic
- Easier testing
- Match reference utility patterns

---

## Section 8: Reference Components NOT Needed for Phase 1

These components exist in reference but are NOT required for Phase 1 dashboard:

### Not Needed Now - Future Phases

**PresentationsSidebar.tsx**
- Purpose: Sidebar navigation and presentation list
- Why Not Now: Different layout approach in our design
- When Needed: May adapt in future if sidebar navigation is added

**ModelPicker.tsx & ModelPickerSkeleton.tsx**
- Purpose: AI model selection for generation
- Why Not Now: Phase 2 - Generation wizard functionality
- When Needed: Will adapt when implementing AI generation flow

**PresentationInput.tsx**
- Purpose: Text input for AI generation prompt
- Why Not Now: Phase 2 - Generation wizard functionality
- When Needed: Will adapt for generation wizard

**PresentationGenerationManager.tsx**
- Purpose: Manages AI generation state and progress
- Why Not Now: Phase 2 - Generation wizard functionality
- When Needed: Will adapt when implementing streaming generation

**ThinkingDisplay.tsx**
- Purpose: Shows AI thinking/processing state during generation
- Why Not Now: Phase 2 - Generation wizard functionality
- When Needed: Will adapt for generation progress display

**WebSearchToggle.tsx**
- Purpose: Enable/disable web search during generation
- Why Not Now: Phase 2 - Generation wizard functionality
- When Needed: Will adapt if we implement web search feature

**PresentationControls.tsx**
- Purpose: Bulk actions and selection controls
- Why Not Now: Phase 1 has basic actions, bulk operations are Phase 3
- When Needed: Will adapt when adding multi-select and bulk operations

**SelectionControls.tsx**
- Purpose: Select all, deselect all for bulk operations
- Why Not Now: Phase 1 doesn't include bulk selection
- When Needed: Will adapt when adding bulk actions

**PresentModeHeader.tsx**
- Purpose: Header for presentation mode (fullscreen viewing)
- Why Not Now: Phase 2 - Presentation viewer functionality
- When Needed: Will adapt when implementing presentation mode

**PresentationExamples.tsx**
- Purpose: Show example presentations or templates
- Why Not Now: May not be needed, have RecommendedTemplatesSection instead
- When Needed: Review if different from our template approach

---

## Section 9: Files That May Need Minor Updates

### File 18: tailwind.config.js
**Status**: ⚠️ CHECK IF UPDATES NEEDED  
**Location**: `tailwind.config.js`  
**Reference**: Reference may have custom theme colors or utilities

**Potential Changes**:
- Verify Soft Intelligence design system colors are configured
- Add any custom utilities from reference if beneficial
- Ensure responsive breakpoints match reference
- Add custom animations if reference uses them

**Why Check**:
- Design system consistency
- May need custom Tailwind classes from reference
- Ensure styling matches reference appearance

---

### File 19: vite.config.ts
**Status**: ⚠️ CHECK IF UPDATES NEEDED  
**Location**: `vite.config.ts`  
**Reference**: N/A (Next.js uses different config)

**Potential Changes**:
- Ensure path aliases match project structure
- Verify build optimization settings
- Check if any special plugins needed
- Ensure dev server configured properly

**Why Check**:
- Import paths must work correctly
- Build performance optimization
- Development experience

---

### File 20: tsconfig.json
**Status**: ⚠️ CHECK IF UPDATES NEEDED  
**Location**: `tsconfig.json`  
**Reference**: Reference TypeScript configuration

**Potential Changes**:
- Ensure strict mode is enabled (type safety)
- Verify path aliases match vite.config
- Check compiler options for compatibility
- Ensure proper module resolution

**Why Check**:
- TypeScript type safety
- Import resolution
- Compatibility with dependencies

---

## Section 10: Summary Tables

### Priority Matrix

| Priority | File | Status | Action | Phase |
|----------|------|--------|--------|-------|
| HIGH | MyPresentationsGrid.tsx | Pending | CREATE - Adapt from RecentPresentations | 1 |
| HIGH | MyPresentationsPage.tsx | Pending | CREATE - Main page composition | 1 |
| HIGH | Database Migration | Created | APPLY - Fix connection and apply | 1 |
| MEDIUM | PageHeader.tsx | Exists | REVIEW - Validate against reference | 1 |
| MEDIUM | CreateNewSection.tsx | Exists | REVIEW - Validate against reference | 1 |
| MEDIUM | RecommendedTemplatesSection.tsx | Pending | CREATE - After investigation | 1 |
| MEDIUM | App.tsx | Exists | UPDATE - Add routes | 1 |
| MEDIUM | ProtectedRoute.tsx | Unknown | CHECK/CREATE - If not exists | 1 |
| LOW | LoadingSkeleton.tsx | Pending | CREATE - Extract from reference | 1 |
| LOW | EmptyState.tsx | Pending | CREATE - New component | 1 |
| LOW | Config files | Exists | REVIEW - Minor updates if needed | 1 |
| COMPLETED | PresentationCard.tsx | Done | ✅ Already adapted | 1 |
| COMPLETED | presentations.store.ts | Done | ✅ Already created | 1 |
| COMPLETED | presentations.types.ts | Done | ✅ Already created | 1 |
| FUTURE | Editor components | N/A | Phase 2 | 2 |
| FUTURE | Generation components | N/A | Phase 2 | 2 |

---

### Change Type Summary

| Change Type | Count | Description |
|-------------|-------|-------------|
| CREATE (Adapt from Reference) | 3 | MyPresentationsGrid, MyPresentationsPage, RecommendedTemplatesSection |
| CREATE (New) | 2-3 | LoadingSkeleton, EmptyState, possibly ProtectedRoute |
| REVIEW/VALIDATE | 2 | PageHeader, CreateNewSection |
| UPDATE | 1-2 | App.tsx routes, possibly Supabase client |
| APPLY | 1 | Database migration |
| CHECK | 3 | Config files (tailwind, vite, tsconfig) |
| COMPLETED | 3 | PresentationCard, store, types |
| FUTURE | 10+ | All generation/editor components |

---

### Framework Adaptation Patterns (Quick Reference)

| Reference Code | Target Code | Reason |
|----------------|-------------|---------|
| `"use client"` | Remove line | Vite doesn't need client directive |
| `import { useRouter } from "next/navigation"` | `import { useNavigate } from "react-router-dom"` | Different routing libraries |
| `const router = useRouter()` | `const navigate = useNavigate()` | API differences |
| `router.push("/path")` | `navigate("/path")` | Navigation method change |
| `import Image from "next/image"` | Remove, use `<img>` | No Next.js image optimization |
| `<Image src={} />` | `<img src={} />` | Standard HTML image |
| `useQuery({ queryKey, queryFn })` | `useEffect(() => { store.fetch() }, [])` | React Query → Zustand |
| `useMutation({ mutationFn })` | `const [loading, setLoading] = useState()` + async | Mutations → local state |
| Server action import | Zustand store method | No server actions in Vite |
| `presentation.updatedAt` | `presentation.last_edited_at` | Prisma vs Supabase naming |
| `presentation.thumbnailUrl` | `presentation.thumbnail_url` | camelCase vs snake_case |
| `presentation.userId` | `presentation.profile_id` | Field name differences |

---

## Section 11: Execution Checklist

### Immediate Next Steps (In Order)

- [ ] **Step 1**: Review PageHeader.tsx against reference dashboard header
  - Compare with PresentationHeader.tsx from reference
  - Document any needed changes
  - Update if necessary

- [ ] **Step 2**: Review CreateNewSection.tsx against reference dashboard
  - Compare with PresentationDashboard.tsx creation section
  - Check if PresentationInput integration needed
  - Update if necessary

- [ ] **Step 3**: Create MyPresentationsGrid.tsx
  - Read RecentPresentations.tsx thoroughly
  - Follow adaptation pattern
  - Use PresentationCard component
  - Add sort/filter controls
  - Add empty and error states

- [ ] **Step 4**: Investigate and create RecommendedTemplatesSection.tsx
  - Research template display in reference
  - Adapt or create based on findings
  - Integrate with templates store

- [ ] **Step 5**: Create MyPresentationsPage.tsx
  - Compose all sections
  - Add to routing
  - Add authentication protection
  - Test full page flow

- [ ] **Step 6**: Fix and apply database migration
  - Resolve Supabase connection issues
  - Apply migration
  - Test RPC functions

- [ ] **Step 7**: End-to-end testing
  - Test all CRUD operations
  - Test navigation flows
  - Test responsive design
  - Test loading/error states
  - Fix any issues

---

## Document End

**Document Purpose**: Comprehensive manifest of all file changes needed to adapt reference-presentation-ai dashboard to medellin-spark.

**Last Updated**: January 13, 2025  
**Phase**: 1 - My Presentations Dashboard  
**Status**: Planning Complete - Ready for Implementation

**Total Files**:
- Completed: 3 files
- To Create: 5-6 files
- To Review: 2 files
- To Update: 2-3 files
- To Check: 3 files
- Future: 10+ files

**Next Action**: Begin Step 1 - Review PageHeader.tsx against reference patterns.
