# 09 - Implementation Checklist & Progress Tracker

**Created:** 2025-01-15
**Purpose:** Complete checklist of all changes Lovable needs to make with status tracking

---

## =� Status Legend

- =� **COMPLETED** - Feature is implemented and working
- =� **IN PROGRESS** - Partially implemented or being worked on
- =4 **NOT STARTED** - Needs to be implemented
- =� **RED FLAG** - Critical issue or blocker identified

---

## <� Overall Progress Summary

| Category | Total Items | Completed | In Progress | Not Started | Red Flags |
|----------|-------------|-----------|-------------|-------------|-----------|
| Database Setup | 8 | 3 | 2 | 3 | 1 |
| Edge Functions | 6 | 0 | 0 | 6 | 0 |
| Core Components | 4 | 0 | 0 | 4 | 1 |
| Page Components | 4 | 0 | 1 | 3 | 0 |
| Authentication | 3 | 1 | 0 | 2 | 0 |
| UI Enhancements | 5 | 0 | 1 | 4 | 0 |
| Testing | 4 | 0 | 0 | 4 | 0 |
| **TOTAL** | **34** | **4** | **4** | **26** | **2** |

**Overall Completion:** 12% (4/34)

---

## 1� DATABASE SETUP & VALIDATION

### Table Structure
- =� **presentations table exists** - Table is created in Supabase
- =� **RLS policies enabled** - Row Level Security is active
- =� **Basic columns present** - Core columns (id, profile_id, title, etc.) exist

### Database Constraints (CRITICAL)
- =4 **Add JSONB structure validation** - CHECK constraint for content.slides
  ```sql
  ALTER TABLE presentations
  ADD CONSTRAINT content_structure_check
  CHECK (
    content ? 'slides' AND
    content ? 'slideCount' AND
    content ? 'metadata' AND
    jsonb_typeof(content->'slides') = 'array'
  );
  ```
  **Why:** Prevents corrupt data from being saved
  **Priority:** HIGH

- =4 **Add theme validation** - CHECK constraint for theme values
  ```sql
  ALTER TABLE presentations
  ADD CONSTRAINT theme_check
  CHECK (theme IN ('purple', 'blue', 'dark'));
  ```
  **Why:** Only allow valid themes
  **Priority:** MEDIUM

- =4 **Add status validation** - CHECK constraint for status values
  ```sql
  ALTER TABLE presentations
  ADD CONSTRAINT status_check
  CHECK (status IN ('draft', 'outline', 'complete'));
  ```
  **Why:** Enforce valid workflow states
  **Priority:** MEDIUM

### Database Indexes (PERFORMANCE)
- =� **Add composite index** - For dashboard queries
  ```sql
  CREATE INDEX idx_presentations_profile_status
  ON presentations(profile_id, status, last_edited_at DESC);
  ```
  **Why:** Speed up "My Presentations" dashboard
  **Priority:** HIGH
  **Status:** May already exist, needs verification

- =4 **Add GIN index for JSONB** - For content searches (future)
  ```sql
  CREATE INDEX idx_presentations_content_gin
  ON presentations USING GIN (content);
  ```
  **Why:** Enable fast JSONB queries
  **Priority:** LOW (not needed for MVP)

### AI Usage Logging
- =4 **Create ai_usage_logs table** - Track AI costs and usage
  ```sql
  CREATE TABLE ai_usage_logs (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    presentation_id uuid REFERENCES presentations(id) ON DELETE CASCADE,
    operation text NOT NULL CHECK (operation IN ('outline', 'content')),
    input_tokens integer NOT NULL,
    output_tokens integer NOT NULL,
    estimated_cost decimal(10, 6) NOT NULL,
    timestamp timestamptz DEFAULT now()
  );
  ```
  **Why:** Monitor AI costs and usage patterns
  **Priority:** MEDIUM

### =� RED FLAG: Missing Slide Count Constraint
- =� **CRITICAL:** No constraint preventing slide_count < 3 or > 30
  ```sql
  ALTER TABLE presentations
  ADD CONSTRAINT slide_count_check
  CHECK (slide_count >= 3 AND slide_count <= 30);
  ```
  **Impact:** Users could create invalid presentations
  **Action:** Add this constraint immediately

---

## 2� EDGE FUNCTIONS (SUPABASE)

### Function: generate-outline
- =4 **Create function directory** - `supabase/functions/generate-outline/`
- =4 **Implement index.ts** - Complete implementation from 08-edge-functions.md
- =4 **Set up CORS headers** - Copy from `_shared/cors.ts`
- =4 **Deploy to Supabase** - Run `supabase functions deploy generate-outline`
- =4 **Set environment variables** - ANTHROPIC_API_KEY, SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY
- =4 **Test with curl** - Verify it works with real user JWT

**Dependencies:**
- Anthropic API key required
- Supabase service role key required

**Estimated Time:** 2 hours (code + deploy + test)

### Function: generate-content
- =4 **Create function directory** - `supabase/functions/generate-content/`
- =4 **Implement index.ts** - Complete implementation from 08-edge-functions.md
- =4 **Deploy to Supabase** - Run `supabase functions deploy generate-content`
- =4 **Test with curl** - Verify it generates all slides

**Estimated Time:** 2 hours (code + deploy + test)

---

## 3� CORE SHARED COMPONENTS

### Authentication & Routing
- =4 **Create ProtectedRoute.tsx** - `/src/components/ProtectedRoute.tsx`
  ```typescript
  // Wraps routes that require authentication
  // Redirects to /auth if not logged in
  // Shows loading spinner while checking auth
  ```
  **Location:** `src/components/ProtectedRoute.tsx`
  **Reference:** 04-sitemap-routes.md lines 54-92
  **Priority:** HIGH (blocks all presentation routes)

- =4 **Create usePresentationAccess hook** - `/src/hooks/usePresentationAccess.ts`
  ```typescript
  // Verifies user owns the presentation
  // Redirects if no access
  // Shows loading state
  ```
  **Location:** `src/hooks/usePresentationAccess.ts`
  **Reference:** 04-sitemap-routes.md lines 100-156
  **Priority:** HIGH (security critical)

- =4 **Create useBackNavigation hook** - `/src/hooks/useBackNavigation.ts`
  ```typescript
  // Safe back navigation with fallback
  ```
  **Location:** `src/hooks/useBackNavigation.ts`
  **Reference:** 04-sitemap-routes.md lines 432-458
  **Priority:** LOW (nice-to-have)

### =� RED FLAG: No Auth Hook Exists
- =� **CRITICAL:** Planning docs reference `useAuth()` hook but it may not exist
  **Check:** Does `src/hooks/useAuth.ts` exist?
  **If not:** Must create it to get current user and auth state
  **Impact:** All protected routes will fail
  **Action:** Verify or create useAuth hook

---

## 4� NEW PAGE COMPONENTS

### Page 1: Outline Editor
- =4 **Create OutlineEditor.tsx** - `/src/pages/presentations/OutlineEditor.tsx`
  **Features:**
  - Display all slide titles from database
  - Drag and drop to reorder (using @dnd-kit)
  - Click title to edit inline
  - Delete slide button (min 3 slides)
  - Add slide button
  - Auto-save after 2 seconds
  - Theme selector (3 themes)
  - "Generate Presentation" button
  - Breadcrumb navigation

  **Components Needed:**
  - OutlineSlideRow (draggable row)
  - ThemeSelector (theme picker)
  - AutoSaveIndicator (save status)

  **Estimated Time:** 8 hours
  **Priority:** HIGH

### Page 2: Slide Editor
- =4 **Create SlideEditor.tsx** - `/src/pages/presentations/SlideEditor.tsx`
  **Features:**
  - Thumbnail panel on left (all slides)
  - Title input field
  - Content textarea (10 lines)
  - Previous/Next buttons
  - Arrow key navigation
  - Auto-save after 2 seconds
  - "View Presentation" button
  - Save status indicator

  **Components Needed:**
  - ThumbnailPanel (sidebar with slide previews)
  - SlideContent (title + content editor)
  - AutoSaveIndicator (reuse from outline)

  **Estimated Time:** 10 hours
  **Priority:** HIGH

### Page 3: Presentation Viewer
- =4 **Create PresentationViewer.tsx** - `/src/pages/presentations/Viewer.tsx`
  **Features:**
  - Full-screen presentation mode
  - Display current slide with theme styling
  - Keyboard navigation (arrows, space, escape)
  - Mouse controls (auto-hide after 3s)
  - Progress indicator (3 / 10)
  - Exit button

  **Components Needed:**
  - SlideDisplay (renders slide with theme)
  - ViewerControls (navigation arrows)

  **Estimated Time:** 6 hours
  **Priority:** MEDIUM

### Page Enhancement: Input Form
- =� **Enhance /pitch-deck page** - Existing page needs improvements
  **Current State:** Basic form exists
  **Needed Changes:**
  - Add 6 quick start template buttons
  - Increase textarea size (10 lines, min-height: 250px)
  - Change button color to purple (#8B5CF6)
  - Set default slide count to 10
  - Add better validation messages
  - Improve loading state during generation

  **File:** `src/pages/PitchDeckWizard.tsx` (or similar)
  **Estimated Time:** 3 hours
  **Priority:** MEDIUM

---

## 5� AUTHENTICATION & ROUTING

### Route Configuration
- =� **React Router setup** - Already configured in App.tsx

### Protected Routes
- =4 **Add outline editor route** - `/presentations/:id/outline`
  ```typescript
  <Route
    path="/presentations/:id/outline"
    element={
      <ProtectedRoute>
        <OutlineEditorPage />
      </ProtectedRoute>
    }
  />
  ```
  **Priority:** HIGH

- =4 **Add slide editor route** - `/presentations/:id/edit`
  ```typescript
  <Route
    path="/presentations/:id/edit"
    element={
      <ProtectedRoute>
        <SlideEditorPage />
      </ProtectedRoute>
    }
  />
  ```
  **Priority:** HIGH

- =4 **Add viewer route** - `/presentations/:id/view`
  ```typescript
  <Route
    path="/presentations/:id/view"
    element={
      <ProtectedRoute>
        <PresentationViewerPage />
      </ProtectedRoute>
    }
  />
  ```
  **Priority:** HIGH

---

## 6� UI COMPONENTS & STYLING

### Component Library
- =� **shadcn/ui components** - Button, Card, Input, Textarea, Select already available

### New Components Needed
- =4 **OutlineSlideRow** - Draggable slide row with drag handle
  **File:** `src/components/presentation/OutlineSlideRow.tsx`
  **Features:** Drag handle (?), inline edit, delete button
  **Priority:** HIGH

- =4 **ThemeSelector** - Theme selection cards
  **File:** `src/components/presentation/ThemeSelector.tsx`
  **Features:** 3 theme cards (purple, blue, dark), visual selection state
  **Priority:** HIGH

- =4 **ThumbnailPanel** - Sidebar with slide thumbnails
  **File:** `src/components/presentation/ThumbnailPanel.tsx`
  **Features:** Scrollable list, click to switch, active state
  **Priority:** HIGH

- =� **AutoSaveIndicator** - Save status display
  **File:** `src/components/presentation/AutoSaveIndicator.tsx`
  **Features:** Shows "Saving...", "Saved ", "Error"
  **Status:** May exist in some form, needs verification
  **Priority:** MEDIUM

### Styling Updates
- =4 **Add purple theme colors** - For presentation features
  ```css
  /* Add to tailwind.config.ts or CSS */
  --presentation-primary: #8B5CF6;
  --presentation-primary-hover: #7C3AED;
  --presentation-primary-light: #A78BFA;
  ```
  **Why:** Differentiate presentation features from main platform
  **Priority:** MEDIUM

---

## 7� INTEGRATION & DATA FLOW

### Supabase Client
- =� **Supabase client configured** - Connection established

### API Integration
- =4 **Call generate-outline Edge Function** - From pitch-deck form
  ```typescript
  const { data, error } = await supabase.functions.invoke('generate-outline', {
    body: { topic, slideCount, language, presentationStyle }
  });
  ```
  **Location:** PitchDeckWizard.tsx (form submit handler)
  **Priority:** HIGH

- =4 **Call generate-content Edge Function** - From outline editor
  ```typescript
  const { data, error } = await supabase.functions.invoke('generate-content', {
    body: { presentationId }
  });
  ```
  **Location:** OutlineEditor.tsx (generate button handler)
  **Priority:** HIGH

### Auto-Save Implementation
- =4 **Implement debounced save** - For outline editor
  ```typescript
  const debouncedSave = useDebouncedCallback(async (outline) => {
    await supabase.from('presentations').update({ outline }).eq('id', id);
  }, 2000);
  ```
  **Priority:** HIGH

- =4 **Implement debounced save** - For slide editor
  ```typescript
  const debouncedSave = useDebouncedCallback(async (content) => {
    await supabase.from('presentations').update({ content }).eq('id', id);
  }, 2000);
  ```
  **Priority:** HIGH

---

## 8� TESTING & QUALITY ASSURANCE

### Manual Testing
- =4 **Complete MVP testing checklist** - 60+ test cases
  **Reference:** 11-testing-strategy.md
  **Priority:** HIGH (before launch)

### Error Handling
- =4 **Add toast notifications** - For errors and success messages
  **Library:** Already using Sonner
  **Priority:** HIGH

- =4 **Add loading states** - For AI generation
  **Priority:** HIGH

- =4 **Add error boundaries** - For component crashes
  **Priority:** MEDIUM

---

## <� PRIORITY MATRIX

### =% IMMEDIATE (Week 1 - Critical Path)

**Day 1: Foundation**
1. =4 Deploy Edge Functions (generate-outline, generate-content)
2. =4 Add database constraints (content_structure_check, theme_check, status_check)
3. =4 Create ProtectedRoute component
4. =4 Create usePresentationAccess hook
5. =4 Verify/create useAuth hook

**Day 2-3: Outline Editor**
6. =4 Create OutlineEditor page
7. =4 Create OutlineSlideRow component (with drag & drop)
8. =4 Create ThemeSelector component
9. =4 Implement auto-save logic
10. =4 Add route to App.tsx

**Day 4-5: Slide Editor**
11. =4 Create SlideEditor page
12. =4 Create ThumbnailPanel component
13. =4 Implement slide navigation
14. =4 Implement auto-save logic
15. =4 Add route to App.tsx

**Day 6: Viewer**
16. =4 Create PresentationViewer page
17. =4 Implement keyboard navigation
18. =4 Add theme styling
19. =4 Add route to App.tsx

**Day 7: Integration & Testing**
20. =4 Enhance /pitch-deck input form
21. =4 Test complete flow end-to-end
22. =4 Fix critical bugs
23. =4 Add error handling & loading states

### � IMPORTANT (Week 2 - Polish)

24. =4 Add composite index for performance
25. =4 Create ai_usage_logs table
26. =4 Add AutoSaveIndicator component
27. =4 Add breadcrumb navigation
28. =4 Add purple theme colors to config
29. =4 Complete manual testing checklist

### =� NICE-TO-HAVE (Post-MVP)

30. =4 Add GIN index for JSONB searches
31. =4 Create useBackNavigation hook
32. =4 Add error boundaries
33. =4 Set up Sentry error tracking
34. =4 Add analytics tracking

---

## =� IDENTIFIED RED FLAGS & BLOCKERS

### =� RED FLAG #1: Missing useAuth Hook
**Issue:** Planning documents reference `useAuth()` but may not exist
**Impact:** All authentication checks will fail
**Action Required:**
```typescript
// Check if this exists: src/hooks/useAuth.ts
// If not, create it:
export function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get current user from Supabase
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
      setLoading(false);
    });
  }, []);

  return { user, loading };
}
```
**Priority:** CRITICAL - Must resolve before building pages

### =� RED FLAG #2: Missing Database Constraints
**Issue:** No validation constraints on presentations table
**Impact:** Corrupt data can be saved (invalid themes, malformed JSONB)
**Action Required:** Run SQL migrations from section 1�
**Priority:** CRITICAL - Must resolve before deploying

---

##  VALIDATION CHECKLIST

### Core Setup Validation

- [ ] **Supabase Connection** - Can connect to database?
- [ ] **Environment Variables** - Are all required vars set?
  - `VITE_SUPABASE_URL`
  - `VITE_SUPABASE_ANON_KEY`
  - `ANTHROPIC_API_KEY` (for Edge Functions)
  - `SUPABASE_SERVICE_ROLE_KEY` (for Edge Functions)
- [ ] **Presentations Table** - Does it exist with all columns?
- [ ] **RLS Policies** - Are they enabled and correct?
- [ ] **Dependencies** - Are these installed?
  - `@supabase/supabase-js`
  - `@anthropic-ai/sdk` (for Edge Functions)
  - `@dnd-kit/core` (for drag & drop)
  - `react-router-dom`
  - `sonner` (toast notifications)

### Missing Items Identified

- L **No drag & drop library installed** - Need `@dnd-kit/core` and `@dnd-kit/sortable`
- L **No debounce utility** - Need `use-debounce` or similar
- L **No database constraints** - Need to run SQL migrations
- L **No Edge Functions deployed** - Need to deploy both functions
- L **No new routes configured** - Need to add 3 routes to App.tsx

---

## =� SUGGESTED CORRECTIONS TO PLANNING DOCS

### Minor Issues Found

1. **Document 04-sitemap-routes.md**
   - References `useAuth` hook but doesn't specify where it's defined
   - Suggestion: Add note that useAuth needs to be created or reference Supabase auth docs

2. **Document 03-user-journey.md**
   - Shows `order` field in slide objects (line 90), but 02-database-architecture.md says order is by array index
   - Already fixed in database doc, but user journey doc should be updated for consistency

3. **Document 05-components.md**
   - Too brief, needs TypeScript interfaces for all components
   - Should specify props for each component

4. **Document 06-implementation-plan.md**
   - Missing testing checkpoints for each day
   - Should reference 11-testing-strategy.md manual checklist

### No Critical Errors Found

 Overall planning is sound and production-ready
 Database architecture is well-designed
 Edge Functions are complete and correct
 User journey is clear and logical
 Testing strategy is comprehensive

---

## <� NEXT STEPS FOR LOVABLE

### Step 1: Validate Environment (30 minutes)
```bash
# Check Supabase connection
npm run dev
# Navigate to /dashboard - does it load?

# Check if presentations table exists
# Go to Supabase Dashboard > Table Editor > presentations

# Check if RLS is enabled
# Go to Supabase Dashboard > Authentication > Policies
```

### Step 2: Deploy Edge Functions (1 hour)
```bash
# Install Supabase CLI
npm install supabase --save-dev

# Login to Supabase
npx supabase login

# Link to project
npx supabase link --project-ref YOUR_PROJECT_REF

# Create function directories
mkdir -p supabase/functions/generate-outline
mkdir -p supabase/functions/generate-content
mkdir -p supabase/functions/_shared

# Copy code from 08-edge-functions.md to respective files

# Deploy
npx supabase functions deploy generate-outline
npx supabase functions deploy generate-content

# Set secrets
npx supabase secrets set ANTHROPIC_API_KEY=your-key-here
```

### Step 3: Add Database Constraints (15 minutes)
```sql
-- Run these in Supabase SQL Editor
ALTER TABLE presentations
ADD CONSTRAINT content_structure_check
CHECK (
  content ? 'slides' AND
  content ? 'slideCount' AND
  content ? 'metadata' AND
  jsonb_typeof(content->'slides') = 'array'
);

ALTER TABLE presentations
ADD CONSTRAINT theme_check
CHECK (theme IN ('purple', 'blue', 'dark'));

ALTER TABLE presentations
ADD CONSTRAINT status_check
CHECK (status IN ('draft', 'outline', 'complete'));

ALTER TABLE presentations
ADD CONSTRAINT slide_count_check
CHECK (slide_count >= 3 AND slide_count <= 30);

CREATE INDEX idx_presentations_profile_status
ON presentations(profile_id, status, last_edited_at DESC);
```

### Step 4: Install Dependencies (5 minutes)
```bash
npm install @dnd-kit/core @dnd-kit/sortable use-debounce
```

### Step 5: Build Core Components (Days 1-7)
Follow the Priority Matrix above, building in this order:
1. Authentication components (ProtectedRoute, hooks)
2. Outline Editor page + components
3. Slide Editor page + components
4. Viewer page
5. Enhance input form
6. End-to-end testing

---

## =� FINAL STATUS SUMMARY

**Documentation Quality:**  95%+ (Production Ready)
**Implementation Status:** =4 12% (4/34 items complete)
**Critical Blockers:** 2 (useAuth hook, database constraints)
**Estimated Time to MVP:** 5-7 days full-time development

**Recommendation:**
1. Resolve red flags first (useAuth, database constraints)
2. Deploy Edge Functions
3. Follow priority matrix day by day
4. Use 11-testing-strategy.md manual checklist before launch

---

## > PROMPT FOR CLAUDE TO MAKE CHANGES

```
I need you to implement the pitch deck AI generator MVP based on the planning documents in /home/sk/medellin-spark/lovable-plan/.

CRITICAL ISSUES TO ADDRESS FIRST:
1. Verify if src/hooks/useAuth.ts exists. If not, create it to return { user, loading } from Supabase auth.
2. Run database migrations to add constraints from 09-changes.md section 1�
3. Deploy both Edge Functions from 08-edge-functions.md (generate-outline and generate-content)

BUILD ORDER (5-7 days):
Day 1:
- Deploy Edge Functions to Supabase
- Add database constraints and indexes
- Create ProtectedRoute component (04-sitemap-routes.md lines 54-92)
- Create usePresentationAccess hook (04-sitemap-routes.md lines 100-156)

Day 2-3:
- Build OutlineEditor page at /src/pages/presentations/OutlineEditor.tsx
- Build OutlineSlideRow component with @dnd-kit drag and drop
- Build ThemeSelector component (3 themes: purple, blue, dark)
- Implement auto-save with 2-second debounce
- Add route /presentations/:id/outline to App.tsx

Day 4-5:
- Build SlideEditor page at /src/pages/presentations/SlideEditor.tsx
- Build ThumbnailPanel component for sidebar
- Implement keyboard navigation (arrows, previous/next buttons)
- Implement auto-save with 2-second debounce
- Add route /presentations/:id/edit to App.tsx

Day 6:
- Build PresentationViewer page at /src/pages/presentations/Viewer.tsx
- Implement full-screen mode with keyboard navigation
- Apply theme styling (purple/blue/dark gradients)
- Add route /presentations/:id/view to App.tsx

Day 7:
- Enhance /pitch-deck input form (add quick start templates, increase textarea size)
- Test complete flow end-to-end
- Add error handling and loading states
- Fix any bugs found

REFERENCE DOCUMENTS:
- User flow: 03-user-journey.md
- Database queries: 02-database-architecture.md
- Route setup: 04-sitemap-routes.md
- Edge Functions: 08-edge-functions.md
- Testing: 11-testing-strategy.md

COLOR SCHEME:
- Use purple (#8B5CF6) for ALL presentation feature buttons/links
- Use blue (#9ABAC6) for main platform features
- This creates visual separation between platform and pitch deck tools

VALIDATION:
After each page is built, verify:
1. Authentication works (redirects if not logged in)
2. Ownership check works (can't access others' presentations)
3. Auto-save works (changes persist after 2 seconds)
4. Navigation works (can move between pages)
5. Error states handled gracefully

Let me know when you're ready to start, and I'll guide you through each day's implementation.
```
