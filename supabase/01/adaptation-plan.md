# Medellin Spark - Reference Implementation Adaptation Plan

## Overview
Adapting reference-presentation-ai (Next.js + Prisma) to medellin-spark (Vite + React Router + Supabase)

**Reference Repository**: `/home/sk/medellin-spark/reference-presentation-ai`
**Target Repository**: `/home/sk/medellin-spark`

---

## Phase 1: My Presentations Page (Dashboard) - CURRENT FOCUS

### Architecture Comparison

| Component | Reference (Next.js) | Target (Vite) | Adaptation Required |
|-----------|---------------------|---------------|---------------------|
| Routing | Next.js App Router | React Router v6 | ✅ HIGH |
| Server Actions | `app/_actions/` | Zustand Store + Supabase | ✅ HIGH |
| Data Fetching | React Query + Server Actions | Zustand + Supabase Client | ✅ MEDIUM |
| State Management | Zustand (presentation-state.ts) | Zustand (presentations.store.ts) | ✅ LOW |
| Image Optimization | next/image | Standard `<img>` or custom | ✅ LOW |
| Client Directive | `"use client"` | Remove | ✅ LOW |

---

## File Mapping & Adaptation Checklist

### 1. Dashboard Components

#### ✅ COMPLETED
- [x] **PresentationItem.tsx** → **PresentationCard.tsx**
  - Location: `src/components/presentations/PresentationCard.tsx`
  - Status: Adapted successfully
  - Changes:
    - Replaced `useRouter()` → `useNavigate()`
    - Replaced React Query mutations → Zustand store methods
    - Replaced `next/image` → `<img>`
    - Changed field names (snake_case for Supabase)
    - Added Share action

#### 🔄 IN PROGRESS
- [ ] **RecentPresentations.tsx** → **MyPresentationsGrid.tsx**
  - Reference: `src/components/presentation/dashboard/RecentPresentations.tsx` (367 lines)
  - Target: `src/components/presentations/MyPresentationsGrid.tsx`
  - Required Adaptations:
    - [ ] Remove `useInfiniteQuery` (pagination)
    - [ ] Use Zustand `sortedAndFilteredPresentations()`
    - [ ] Replace `fetchPresentations` action with Zustand `fetchPresentations()`
    - [ ] Replace delete mutation with Zustand `deletePresentation()`
    - [ ] Replace rename mutation with Zustand `updatePresentation()`
    - [ ] Remove `setIsSheetOpen` (sidebar navigation)
    - [ ] Add sort/filter controls
    - [ ] Render grid of `PresentationCard` components
    - [ ] Add empty state handling

#### ⏳ PENDING
- [ ] **PresentationsSidebar.tsx** → Review if needed
  - Reference: `src/components/presentation/dashboard/PresentationsSidebar.tsx` (6525 bytes)
  - Target: May not be needed (different layout)
  - Decision: Review after MyPresentationsGrid is complete

- [ ] **PresentationDashboard.tsx** → **CreateNewSection.tsx** (Partial adaptation)
  - Reference: `src/components/presentation/dashboard/PresentationDashboard.tsx`
  - Target: `src/components/presentations/CreateNewSection.tsx` (CREATED)
  - Status: Created custom version (needs review against reference)
  - Required Review:
    - [ ] Compare with reference dashboard structure
    - [ ] Verify creation flow matches reference patterns
    - [ ] Check if PresentationInput component is needed
    - [ ] Review PresentationGenerationManager integration

- [ ] **PresentationHeader.tsx** (Dashboard) → May adapt later
  - Reference: `src/components/presentation/dashboard/PresentationHeader.tsx`
  - Note: Different from presentation-page/PresentationHeader.tsx
  - Decision: Review after main dashboard is complete

- [ ] **PageHeader Component** → **PageHeader.tsx** (Created - needs review)
  - Target: `src/components/presentations/PageHeader.tsx` (CREATED)
  - Status: Created custom version (needs review against reference)
  - Required Review:
    - [ ] Compare greeting/stats pattern with reference
    - [ ] Verify data sources match reference approach
    - [ ] Check if reference has similar stats component

### 2. State Management

#### ✅ COMPLETED
- [x] **presentation-state.ts** → **presentations.store.ts**
  - Reference: `src/states/presentation-state.ts`
  - Target: `src/stores/presentations.store.ts`
  - Status: Created with dashboard-specific state
  - Scope: Dashboard/list management only (not editor state)

#### ⏳ PENDING (For Future Phases)
- [ ] **presentation-state.ts** → **presentation-editor.store.ts**
  - Scope: Editor state (slides, theme, selection, grid view)
  - Status: Not needed for Phase 1 dashboard
  - Required for: Phase 2 (Presentation Editor)

### 3. Server Actions → Supabase/Zustand Adaptations

#### Reference Actions (Next.js Server Actions)
Location: `src/app/_actions/presentation/`

| Action File | Purpose | Target Adaptation |
|-------------|---------|-------------------|
| **presentationActions.ts** | CRUD operations | ✅ Zustand store methods |
| **fetchPresentations.ts** | List presentations | ✅ Zustand `fetchPresentations()` |
| **theme-actions.ts** | Theme management | ⏳ Future (Phase 2) |
| **exportPresentationActions.ts** | Export to PDF/PPTX | ⏳ Future (Phase 3) |
| **sharedPresentationActions.ts** | Sharing features | ⏳ Future (Phase 4) |

#### Completed Adaptations
- ✅ `deletePresentations()` → Zustand `deletePresentation()` + Supabase RPC
- ✅ `updatePresentationTitle()` → Zustand `updatePresentation()`
- ✅ `getPresentationContent()` → Check `slide_count` field
- ✅ Create presentation → Zustand `createPresentation()`
- ✅ Duplicate presentation → Zustand `duplicatePresentation()` + Supabase RPC

#### Pending Adaptations
- ⏳ Fetch templates → Zustand `fetchTemplates()`
- ⏳ Share presentation → Future implementation
- ⏳ Export presentation → Future implementation

### 4. Database Schema Adaptations

#### Reference: Prisma Schema
- Uses Prisma ORM with PostgreSQL
- BaseDocument model for presentations

#### Target: Supabase Schema
- ✅ Migration created: `20251013150000_add_presentations_metadata.sql`
- ✅ RPC functions: `soft_delete_presentation`, `duplicate_presentation`
- ⏳ Migration not yet applied (connection issues)

#### Schema Mapping

| Prisma Field | Supabase Field | Type | Notes |
|--------------|----------------|------|-------|
| `id` | `id` | uuid | Primary key |
| `title` | `title` | text | Presentation title |
| `content` | `content` | jsonb | Slide data |
| `thumbnailUrl` | `thumbnail_url` | text | Snake case |
| `updatedAt` | `last_edited_at` | timestamptz | Different name |
| `createdAt` | `created_at` | timestamptz | Same concept |
| `userId` | `profile_id` | uuid | References profiles |
| - | `slide_count` | integer | NEW: Performance optimization |
| - | `deleted_at` | timestamptz | NEW: Soft delete pattern |

---

## Detailed Component Adaptation Requirements

### Component 1: MyPresentationsGrid (from RecentPresentations)

**Reference**: `src/components/presentation/dashboard/RecentPresentations.tsx` (367 lines)

#### Key Features to Adapt:
1. **Data Fetching**
   - Reference: `useInfiniteQuery` with `fetchPresentations` action
   - Target: Zustand `fetchPresentations()` + `sortedAndFilteredPresentations()`
   - Remove: Pagination (infinite scroll)
   - Add: Sort and filter UI controls

2. **Loading States**
   - Reference: Skeleton cards in 3-column grid
   - Target: Same skeleton pattern (keep this)
   - Keep: `isLoading` state handling

3. **Grid Layout**
   - Reference: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`
   - Target: Same responsive grid
   - Note: Shows only 3 items with "View all" button
   - Adaptation: Show all filtered presentations (no limit)

4. **Card Rendering**
   - Reference: Custom card with thumbnail, title, date, actions
   - Target: Use `<PresentationCard>` component (already adapted)
   - Remove: Inline card JSX
   - Add: Map over presentations array

5. **Actions**
   - Reference: Delete and Rename in dropdown
   - Target: PresentationCard handles all actions
   - Keep: Delete confirmation dialog pattern
   - Add: Share action (in PresentationCard)

6. **Navigation**
   - Reference: `handlePresentationClick` with router.push
   - Target: Pass onClick handlers to PresentationCard
   - PresentationCard handles: Click → navigate based on slide_count

7. **Empty State**
   - Reference: Returns null if no presentations
   - Target: Add proper empty state UI
   - Show: "No presentations yet" with CTA to create

#### Code Structure Outline:

```typescript
export const MyPresentationsGrid = ({
  sortBy,
  filterBy,
  onSortChange,
  onFilterChange,
}: MyPresentationsGridProps) => {
  const { isLoading, error } = usePresentationsStore();
  const presentations = useSortedPresentations(); // Zustand computed
  
  if (isLoading) return <LoadingSkeleton />;
  if (error) return <ErrorState />;
  if (presentations.length === 0) return <EmptyState />;
  
  return (
    <div>
      <GridControls /> {/* Sort/Filter UI */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {presentations.map((presentation) => (
          <PresentationCard
            key={presentation.id}
            presentation={presentation}
            onEdit={handleEdit}
            onDuplicate={handleDuplicate}
            onDelete={handleDelete}
            onShare={handleShare}
          />
        ))}
      </div>
    </div>
  );
};
```


### Component 2: RecommendedTemplatesSection

**Reference**: Need to identify template display component in reference repo

#### Investigation Required:
- [ ] Check if reference has template browsing
- [ ] Look for template card components
- [ ] Review template data structure
- [ ] Identify template selection flow

#### Potential Reference Files:
- `PresentationDashboard.tsx` - May show template options
- Database: `presentation_templates` table (Supabase)
- May need to create custom component if reference doesn't have this

#### Planned Features:
1. Display 4-8 popular templates in grid
2. Template cards with preview images
3. Click to create presentation from template
4. "View all templates" link to full template browser

---

## Adaptation Pattern Summary

### DO's ✅
1. **Read reference file first** before creating anything
2. **Keep component structure** - Same props, state management patterns
3. **Keep UI patterns** - Same layout, styling approach, component composition
4. **Keep logic patterns** - Same event handlers, state updates, validations
5. **Adapt framework code** - Replace Next.js/Prisma with Vite/Supabase equivalents

### Adaptation Mappings 🔄

| Reference Pattern | Target Pattern | Example |
|-------------------|----------------|---------|
| `"use client"` | Remove directive | - |
| `useRouter()` from next/navigation | `useNavigate()` from react-router-dom | - |
| `router.push('/path')` | `navigate('/path')` | - |
| `Image` from next/image | `<img>` tag | - |
| Server Actions | Zustand store methods | `deletePresentation()` |
| React Query `useMutation` | Direct async + local state | `const [isLoading, setIsLoading] = useState()` |
| React Query `useQuery` | Zustand store + `useEffect` | `fetchPresentations()` |
| Prisma field `updatedAt` | Supabase field `last_edited_at` | Snake case convention |
| Prisma field `thumbnailUrl` | Supabase field `thumbnail_url` | Snake case convention |

### DON'Ts ❌
1. **Don't create new patterns** - Use existing reference patterns
2. **Don't skip reading reference** - Always read before implementing
3. **Don't reinvent UI** - Keep same component structure
4. **Don't change logic flow** - Keep same state management approach
5. **Don't add features** - Match reference functionality first


---

## Phase 1 Action Plan - My Presentations Dashboard

### Step 1: Complete Adaptation Plan Document ✅ CURRENT
- [x] Document architecture comparison
- [x] Map all reference components to target components
- [x] Define adaptation patterns and rules
- [x] Create component-by-component breakdown

### Step 2: Validate Existing Components
- [ ] Review `PageHeader.tsx` against reference dashboard header
- [ ] Review `CreateNewSection.tsx` against reference creation flow
- [ ] Update components if they don't match reference patterns
- [ ] Document any intentional deviations

### Step 3: Adapt MyPresentationsGrid
- [ ] Read `RecentPresentations.tsx` thoroughly
- [ ] Create `MyPresentationsGrid.tsx` following adaptation pattern
- [ ] Implement sort/filter controls
- [ ] Integrate with `PresentationCard` component
- [ ] Add loading, error, and empty states
- [ ] Test grid responsiveness and interactions

### Step 4: Create RecommendedTemplatesSection
- [ ] Investigate template components in reference
- [ ] Adapt or create template display component
- [ ] Integrate with templates store/API
- [ ] Add template selection flow

### Step 5: Build Main Page Component
- [ ] Create `MyPresentationsPage.tsx`
- [ ] Compose all dashboard sections:
  - PageHeader
  - CreateNewSection
  - MyPresentationsGrid
  - RecommendedTemplatesSection
- [ ] Add routing configuration
- [ ] Integrate with authentication

### Step 6: Testing & Refinement
- [ ] Test all CRUD operations (Create, Read, Update, Delete)
- [ ] Test sort and filter functionality
- [ ] Test responsive layout on mobile/tablet/desktop
- [ ] Test accessibility (keyboard navigation, ARIA)
- [ ] Test loading and error states
- [ ] Test empty states
- [ ] Fix any issues found

### Step 7: Database Migration
- [ ] Resolve Supabase connection issues
- [ ] Apply pending migration `20251013150000_add_presentations_metadata.sql`
- [ ] Verify RPC functions work correctly
- [ ] Test soft delete functionality
- [ ] Test duplicate functionality

---

## Future Phases (Not in Current Scope)

### Phase 2: Presentation Editor
- Adapt editor components from `presentation-page/`
- Implement slide editing with Plate.js
- Theme customization
- Undo/redo functionality

### Phase 3: Generation Wizard
- AI-powered presentation generation
- Step-by-step wizard flow
- Template selection
- Content customization

### Phase 4: Advanced Features
- Export to PDF/PPTX
- Presentation sharing
- Collaboration features
- Analytics and metrics


---

## Quick Reference Checklist

### Files to Adapt (Phase 1 Only)

#### ✅ Completed
- [x] PresentationItem.tsx → PresentationCard.tsx

#### 🔄 In Progress
- [ ] Create comprehensive adaptation plan (THIS DOCUMENT)

#### ⏳ Next Steps
- [ ] RecentPresentations.tsx → MyPresentationsGrid.tsx
- [ ] Review PageHeader.tsx (validate against reference)
- [ ] Review CreateNewSection.tsx (validate against reference)
- [ ] Create RecommendedTemplatesSection.tsx
- [ ] Create MyPresentationsPage.tsx (main composition)

### Adaptation Commands Quick Reference

```bash
# Read reference file
cat /home/sk/medellin-spark/reference-presentation-ai/src/components/[path]

# Create adapted component
# 1. Copy structure and logic
# 2. Replace Next.js imports with React Router
# 3. Replace Server Actions with Zustand
# 4. Replace next/image with <img>
# 5. Change camelCase to snake_case for Supabase fields
# 6. Remove "use client" directive

# Test component
pnpm dev
# Visit http://localhost:5173
```

---

## Summary

This adaptation plan provides a structured approach to migrating the reference-presentation-ai codebase to medellin-spark. The key principles are:

1. **Reference First**: Always read reference implementation before creating
2. **Structured Adaptation**: Follow the mapping patterns consistently
3. **Incremental Progress**: Complete one component at a time
4. **Validation**: Review against reference to ensure consistency
5. **Documentation**: Update this plan as adaptations are completed

**Current Status**: Adaptation plan document completed. Ready to proceed with Step 2 (validation of existing components) and Step 3 (MyPresentationsGrid adaptation).

