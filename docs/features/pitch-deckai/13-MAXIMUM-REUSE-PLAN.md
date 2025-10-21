# 🔄 MAXIMUM FILE REUSE INTEGRATION PLAN

**Project:** Medellin Spark - Presentation AI Integration  
**Date:** October 14, 2025  
**Strategy:** Copy as many files as possible from reference-presentation-ai  
**Based On:** Deep analysis of actual repository structure

---

## 📊 FILE PORTABILITY ANALYSIS

### Total Files in Reference: ~506 files

**Breakdown:**
- ✅ **Directly Portable:** ~230 files (45%) - Can copy as-is
- 🟡 **Needs Adaptation:** ~150 files (30%) - Can copy with modifications
- 🔴 **Cannot Port:** ~126 files (25%) - Next.js specific, must rewrite

---

## ✅ PHASE 1: DIRECTLY PORTABLE FILES (Copy As-Is)

### 1.1 UI Components (60+ files) → 100% PORTABLE ✅

**Source:** `reference-presentation-ai/src/components/ui/`  
**Destination:** `src/components/ui/`  
**Status:** Ready to copy (Radix UI + Tailwind, framework-agnostic)

**Files to Copy:**
```bash
# All 60+ UI components
src/components/ui/
├── accordion.tsx          ✅
├── alert-dialog.tsx       ✅
├── alert.tsx              ✅
├── aspect-ratio.tsx       ✅
├── auto-resize-textarea.tsx ✅
├── avatar.tsx             ✅
├── badge.tsx              ✅
├── breadcrumb.tsx         ✅
├── button.tsx             ✅
├── calendar.tsx           ✅
├── card.tsx               ✅
├── carousel.tsx           ✅
├── chart.tsx              ✅
├── checkbox.tsx           ✅
├── collapsible.tsx        ✅
├── color-picker.tsx       ✅
├── command.tsx            ✅
├── context-menu.tsx       ✅
├── credenza.tsx           ✅
├── dialog.tsx             ✅
├── drawer.tsx             ✅
├── dropdown-menu.tsx      ✅
├── file-upload.tsx        ✅
├── font-picker/           ✅ (16 files)
├── form.tsx               ✅
├── hover-card.tsx         ✅
├── icon-picker.tsx        ✅
├── icons.tsx              ✅
├── input-otp.tsx          ✅
├── input.tsx              ✅
├── label.tsx              ✅
├── menubar.tsx            ✅
├── navigation-menu.tsx    ✅
├── pagination.tsx         ✅
├── popover.tsx            ✅
├── progress.tsx           ✅
├── radio-group.tsx        ✅
├── resizable.tsx          ✅
├── scroll-area.tsx        ✅
├── select.tsx             ✅
├── separator.tsx          ✅
├── sheet.tsx              ✅
├── skeleton.tsx           ✅
├── slider.tsx             ✅
├── sonner.tsx             ✅
├── spinner.tsx            ✅
├── switch.tsx             ✅
├── table.tsx              ✅
├── tabs.tsx               ✅
├── textarea.tsx           ✅
├── toast.tsx              ✅
├── toaster.tsx            ✅
├── toggle-group.tsx       ✅
├── toggle.tsx             ✅
├── tooltip.tsx            ✅
└── use-toast.ts           ✅
```

**Action:** Direct copy (rsync or cp)

**Dependencies Required:**
```json
{
  "@radix-ui/react-*": "All Radix packages from their package.json",
  "class-variance-authority": "^0.7.1",
  "clsx": "^2.1.1",
  "tailwind-merge": "^2.6.0",
  "lucide-react": "^0.525.0"
}
```

---

### 1.2 Plate.js Editor Components (180+ files) → 95% PORTABLE ✅

**Source:** `reference-presentation-ai/src/components/plate/`  
**Destination:** `src/components/plate/`  
**Status:** Can copy with minor import path adjustments

**Files to Copy:**

```bash
src/components/plate/
├── editor-base-kit.tsx    ✅
├── editor-kit.tsx          ✅
├── hooks/                  ✅ (6 files)
│   ├── use-debounce.ts
│   ├── use-floating-toolbar.tsx
│   ├── use-is-touch-device.ts
│   ├── use-mounted.ts
│   ├── use-upload-file.ts
│   └── usePlateEditor.ts
├── plugins/                ✅ (56 files)
│   ├── ai-kit.tsx
│   ├── align-base-kit.tsx
│   ├── align-kit.tsx
│   ├── autoformat-kit.tsx
│   ├── basic-blocks-base-kit.tsx
│   ├── basic-blocks-kit.tsx
│   ├── basic-marks-base-kit.tsx
│   ├── basic-marks-kit.tsx
│   ├── basic-nodes-kit.tsx
│   ├── block-menu-kit.tsx
│   ├── block-placeholder-kit.tsx
│   ├── block-selection-kit.tsx
│   ├── callout-base-kit.tsx
│   ├── callout-kit.tsx
│   ├── code-block-base-kit.tsx
│   ├── code-block-kit.tsx
│   ├── column-base-kit.tsx
│   ├── column-kit.tsx
│   ├── comment-base-kit.tsx
│   ├── comment-kit.tsx
│   ├── copilot-kit.tsx
│   ├── cursor-overlay-kit.tsx
│   ├── date-base-kit.tsx
│   ├── date-kit.tsx
│   ├── discussion-kit.tsx
│   ├── dnd-kit.tsx
│   ├── emoji-kit.tsx
│   ├── exit-break-kit.tsx
│   ├── fixed-toolbar-kit.tsx
│   ├── floating-toolbar-kit.tsx
│   ├── font-base-kit.tsx
│   ├── font-kit.tsx
│   ├── indent-base-kit.tsx
│   ├── indent-kit.tsx
│   ├── line-height-base-kit.tsx
│   ├── line-height-kit.tsx
│   ├── link-base-kit.tsx
│   ├── link-kit.tsx
│   ├── list-base-kit.tsx
│   ├── list-kit.tsx
│   ├── markdown-kit.tsx
│   ├── math-base-kit.tsx
│   ├── math-kit.tsx
│   ├── media-base-kit.tsx
│   ├── media-kit.tsx
│   ├── mention-base-kit.tsx
│   ├── mention-kit.tsx
│   ├── slash-kit.tsx
│   ├── suggestion-base-kit.tsx
│   ├── suggestion-kit.tsx
│   ├── table-base-kit.tsx
│   ├── table-kit.tsx
│   ├── toc-base-kit.tsx
│   ├── toc-kit.tsx
│   ├── toggle-base-kit.tsx
│   └── toggle-kit.tsx
├── ui/                     ✅ (116 files - all Plate UI components)
└── utils/                  ✅ (4 files)
    ├── extractFontsFromEditor.ts
    ├── font-loader.tsx
    ├── plate-types.ts
    └── transforms.ts
```

**Action:** Direct copy with import path updates

**Dependencies Required (30+ packages):**
```json
{
  "@platejs/ai": "^49.2.15",
  "@platejs/autoformat": "^49.0.0",
  "@platejs/basic-nodes": "^49.0.0",
  "@platejs/basic-styles": "^49.0.0",
  "@platejs/callout": "^49.0.0",
  "@platejs/caption": "^49.0.0",
  "@platejs/code-block": "^49.0.0",
  "@platejs/combobox": "^49.0.0",
  "@platejs/comment": "^49.0.0",
  "@platejs/date": "^49.0.2",
  "@platejs/dnd": "^49.2.10",
  "@platejs/emoji": "^49.0.0",
  "@platejs/excalidraw": "^49.0.0",
  "@platejs/floating": "^49.0.0",
  "@platejs/indent": "^49.0.0",
  "@platejs/juice": "^49.0.0",
  "@platejs/layout": "^49.2.1",
  "@platejs/link": "^49.1.1",
  "@platejs/list": "^49.2.0",
  "@platejs/markdown": "^49.2.15",
  "@platejs/math": "^49.0.0",
  "@platejs/media": "^49.0.0",
  "@platejs/mention": "^49.0.0",
  "@platejs/resizable": "^49.0.0",
  "@platejs/selection": "^50.2.0",
  "@platejs/slash-command": "^49.0.0",
  "@platejs/slate": "^49.2.4",
  "@platejs/suggestion": "^50.3.3",
  "@platejs/table": "^49.1.13",
  "@platejs/toc": "^49.0.0",
  "@platejs/toggle": "^49.0.0",
  "platejs": "^49.2.21"
}
```

---

### 1.3 Presentation UI Components (46 files) → 80% PORTABLE 🟡

**Source:** `reference-presentation-ai/src/components/presentation/`  
**Destination:** `src/components/presentations/`  

**Directly Portable (Copy As-Is):**

```bash
# Dashboard Components (15 files) - Minor adaptations needed
src/components/presentation/dashboard/
├── ModelPicker.tsx                     🟡 (adapt for Supabase)
├── ModelPickerSkeleton.tsx             ✅
├── PresentationControls.tsx            🟡 (adapt delete/duplicate)
├── PresentationDashboard.tsx           🟡 (adapt data fetching)
├── PresentationExamples.tsx            ✅
├── PresentationGenerationManager.tsx   🟡 (adapt AI calls)
├── PresentationHeader.tsx              ✅
├── PresentationInput.tsx               ✅
├── PresentationItem.tsx                🟡 (adapt for Supabase data)
├── PresentationsSidebar.tsx            🟡 (adapt data fetching)
├── PresentModeHeader.tsx               ✅
├── RecentPresentations.tsx             🟡 (adapt data fetching)
├── SelectionControls.tsx               ✅
├── ThinkingDisplay.tsx                 ✅
└── WebSearchToggle.tsx                 ✅

# Theme Components (11 files) - Highly portable
src/components/presentation/theme/
├── CustomThemeBuilder.tsx              🟡 (adapt save to Supabase)
├── CustomThemeCard.tsx                 ✅
├── CustomThemeModal.tsx                🟡 (adapt data fetching)
├── LoadThemeButton.tsx                 🟡 (adapt data fetching)
├── ThemeColorPicker.tsx                ✅
├── ThemeFontPicker.tsx                 ✅
├── ThemeLogoUpload.tsx                 🟡 (adapt uploadthing → Supabase storage)
├── ThemePreview.tsx                    ✅
├── ThemeSelector.tsx                   🟡 (adapt data fetching)
└── theme-types.ts                      ✅

# Presentation Page Components (15 files) - Mostly portable
src/components/presentation/presentation-page/
├── PresentationDisplay.tsx             ✅
├── PresentationNavigation.tsx          ✅
├── PresentationPage.tsx                🟡 (adapt data fetching)
├── PresentationSlide.tsx               ✅
├── SlideContent.tsx                    ✅
├── SlideImage.tsx                      ✅
├── SlideLayout.tsx                     ✅
├── SlideText.tsx                       ✅
├── SlideTitle.tsx                      ✅
└── ... (6 more files)                  ✅

# Outline Components (6 files) - Need adaptation for AI
src/components/presentation/outline/
├── OutlineDisplay.tsx                  ✅
├── OutlineEditor.tsx                   ✅
├── OutlineGeneration.tsx               🔴 (needs rewrite for Supabase Edge Functions)
├── OutlineItem.tsx                     ✅
├── OutlinePreview.tsx                  ✅
└── OutlineSlide.tsx                    ✅

# Utils (3 files) - Need adaptation
src/components/presentation/utils/
├── exportToPPT.ts                      🟡 (adapt data structure)
├── parser.ts                           🟡 (adapt for Supabase data)
└── types.ts                            🟡 (adapt for Supabase types)
```

**Adaptation Strategy:**
- Replace Prisma queries → Supabase queries
- Replace NextAuth → Supabase Auth
- Replace Server Actions → Supabase RPC or Edge Functions

---

### 1.4 Library Files → 90% PORTABLE ✅

**Source:** `reference-presentation-ai/src/lib/`  
**Destination:** `src/lib/`

```bash
src/lib/
├── model-picker.ts                     ✅ (pure logic)
├── presentation/
│   └── themes.ts                       ✅ (theme definitions - pure data)
├── thinking-extractor.ts               ✅ (pure logic)
└── utils.ts                            ✅ (utility functions)
```

**Action:** Direct copy

---

### 1.5 Hooks → 80% PORTABLE 🟡

**Source:** `reference-presentation-ai/src/hooks/`  
**Destination:** `src/hooks/`

```bash
src/hooks/
├── globals/
│   ├── useMediaQuery.tsx               ✅
│   └── useUploadthing.ts               🟡 (replace with Supabase storage)
└── presentation/
    ├── previewSignature.ts             ✅
    ├── useDebouncedSave.ts             🟡 (adapt Prisma → Supabase)
    ├── useLocalModels.ts               ✅
    ├── usePresentationSlides.tsx       ✅
    ├── useRootImageActions.ts          🟡 (adapt image gen)
    ├── useSlideChangeWatcher.ts        ✅
    └── useSlideOperations.ts           🟡 (adapt Prisma → Supabase)
```

---

### 1.6 Styles → 100% PORTABLE ✅

**Source:** `reference-presentation-ai/src/styles/`  
**Destination:** `src/styles/`

```bash
src/styles/
├── globals.css                         ✅
└── presentation.css                    ✅
```

**Action:** Direct copy

---

## 🟡 PHASE 2: NEEDS ADAPTATION (Copy with Modifications)

### 2.1 Editor Components (141 files) → Needs Minor Adaptation

**Source:** `reference-presentation-ai/src/components/presentation/editor/`  
**Destination:** `src/components/presentations/editor/`

**Files:**
```bash
src/components/presentation/editor/
├── custom-elements/                    🟡 (102 files)
│   # All custom Plate.js elements
│   # Need: Import path updates only
│   
├── dnd/                                🟡 (14 files)
│   # Drag and drop logic
│   # Need: Import path updates only
│   
├── lib.ts                              🟡
├── plugins/                            🟡 (25 files)
│   # Editor plugins
│   # Need: Adapt for Vite imports
│   
├── plugins.ts                          🟡
├── presentation-editor-static.tsx      🟡
└── presentation-editor.tsx             🟡
```

**Adaptation Required:**
1. Update import paths (`@/` → correct Vite paths)
2. Replace `use server` directives (remove, convert to client functions)
3. Adapt auto-save to use Supabase instead of Server Actions

**Estimated Time:** 2-3 days

---

### 2.2 State Management → Needs Adaptation

**Source:** `reference-presentation-ai/src/states/`  
**Destination:** `src/stores/`

```bash
src/states/
└── presentation-state.ts               🟡
```

**They Use:** Zustand (same as us ✅)

**Adaptation:**
- Already compatible!
- Just need to adjust data fetching functions

---

### 2.3 Providers → Needs Major Adaptation

**Source:** `reference-presentation-ai/src/provider/`  
**Destination:** `src/contexts/` or `src/providers/`

```bash
src/provider/
├── NextAuthProvider.tsx                🔴 (replace with Supabase Auth)
├── TanstackProvider.tsx                ✅ (can copy - we use TanStack Query)
└── theme-provider.tsx                  ✅ (can copy)
```

---

## 🔴 PHASE 3: CANNOT PORT (Must Rewrite)

### 3.1 Server Actions → Convert to Supabase Functions

**Source:** `reference-presentation-ai/src/app/_actions/`  
**Cannot Copy:** Next.js Server Actions specific

**Files to Rewrite:**

```typescript
// Their Server Actions (14 files)
src/app/_actions/
├── image/
│   ├── generate.ts                     🔴 Convert → Edge Function
│   └── unsplash.ts                     🔴 Convert → Edge Function
└── presentation/
    ├── exportPresentationActions.ts    🔴 Convert → Client Function
    ├── fetchPresentations.ts           🔴 Convert → Supabase Query
    ├── presentationActions.ts          🔴 Convert → Supabase RPC
    ├── sharedPresentationActions.ts    🔴 Convert → Supabase RPC
    └── theme-actions.ts                🔴 Convert → Supabase RPC
```

**Strategy:**
1. Extract business logic from Server Actions
2. Create Supabase Edge Functions for AI operations
3. Create Supabase RPC functions for database operations
4. Create client-side functions for simple operations

**Example Conversion:**

```typescript
// ❌ Their Server Action (Next.js)
'use server'
export async function fetchPresentations(userId: string) {
  const presentations = await prisma.presentation.findMany({
    where: { userId },
    include: { base: true }
  });
  return presentations;
}

// ✅ Our Supabase Query (Vite)
export async function fetchPresentations() {
  const { data: { user } } = await supabase.auth.getUser();
  const { data, error } = await supabase
    .from('presentations')
    .select('*')
    .eq('profile_id', user.id)
    .is('deleted_at', null);
  
  if (error) throw error;
  return data;
}
```

---

### 3.2 API Routes → Convert to Edge Functions

**Source:** `reference-presentation-ai/src/app/api/`  
**Cannot Copy:** Next.js API Routes specific

**Files to Rewrite:**

```typescript
// Their API Routes (7 files)
src/app/api/
├── auth/[...nextauth]/route.ts         🔴 Already using Supabase Auth
├── presentation/
│   ├── generate/route.ts               🔴 → Supabase Edge Function
│   ├── outline/route.ts                🔴 → Supabase Edge Function
│   └── outline-with-search/
│       ├── route.ts                    🔴 → Supabase Edge Function
│       └── search_tool.ts              🔴 → Supabase Edge Function
└── uploadthing/
    ├── core.ts                         🔴 → Supabase Storage
    └── route.ts                        🔴 → Supabase Storage
```

**Strategy:**
- Create Supabase Edge Functions for AI generation
- Use Supabase Storage for file uploads (replace UploadThing)

---

### 3.3 Pages → Cannot Port (Next.js App Router)

**Source:** `reference-presentation-ai/src/app/`  
**Cannot Copy:** Next.js App Router specific

**Files:**
```bash
src/app/
├── layout.tsx                          🔴 (use our App.tsx)
├── page.tsx                            🔴 (use our Index.tsx)
├── loading.tsx                         🔴 (use our loading components)
├── auth/signin/page.tsx                🔴 (use our Auth.tsx)
├── auth/signout/page.tsx               🔴 (use our Auth.tsx)
├── presentation/page.tsx               🔴 → Our MyPresentations.tsx
├── presentation/[id]/page.tsx          🔴 → Our PresentationView.tsx
└── presentation/generate/[id]/page.tsx 🔴 → Our PresentationGenerate.tsx
```

**Strategy:**
- Use our existing Vite pages
- Integrate portable components INTO our pages
- Keep React Router routing

---

### 3.4 Database → Cannot Port (Different ORM)

**Source:** `reference-presentation-ai/prisma/schema.prisma`  
**Cannot Copy:** Prisma-specific, we use Supabase

**Strategy:**
1. Keep our Supabase tables
2. Add missing fields to match their schema
3. Convert cuid → uuid where needed
4. Use Supabase RPC instead of Prisma queries

---

## 📋 PHASED INTEGRATION PLAN

### PHASE 1: Foundation (Week 1) - Install Dependencies & Copy UI

**Day 1-2: Install All Dependencies**

```bash
# Install Plate.js packages (30+)
pnpm add @platejs/ai @platejs/autoformat @platejs/basic-nodes \
  @platejs/basic-styles @platejs/callout @platejs/caption \
  @platejs/code-block @platejs/combobox @platejs/comment \
  @platejs/date @platejs/dnd @platejs/emoji @platejs/excalidraw \
  @platejs/floating @platejs/indent @platejs/juice @platejs/layout \
  @platejs/link @platejs/list @platejs/markdown @platejs/math \
  @platejs/media @platejs/mention @platejs/resizable \
  @platejs/selection @platejs/slash-command @platejs/slate \
  @platejs/suggestion @platejs/table @platejs/toc @platejs/toggle \
  platejs

# Install Radix UI packages (30+)
pnpm add @radix-ui/react-accordion @radix-ui/react-alert-dialog \
  @radix-ui/react-aspect-ratio @radix-ui/react-avatar \
  @radix-ui/react-checkbox @radix-ui/react-collapsible \
  @radix-ui/react-context-menu @radix-ui/react-dialog \
  @radix-ui/react-dropdown-menu @radix-ui/react-hover-card \
  @radix-ui/react-label @radix-ui/react-menubar \
  @radix-ui/react-navigation-menu @radix-ui/react-popover \
  @radix-ui/react-progress @radix-ui/react-radio-group \
  @radix-ui/react-scroll-area @radix-ui/react-select \
  @radix-ui/react-separator @radix-ui/react-slider \
  @radix-ui/react-slot @radix-ui/react-switch @radix-ui/react-tabs \
  @radix-ui/react-toast @radix-ui/react-toggle \
  @radix-ui/react-toggle-group @radix-ui/react-toolbar \
  @radix-ui/react-tooltip

# Install other UI dependencies
pnpm add class-variance-authority clsx tailwind-merge lucide-react \
  sonner vaul cmdk embla-carousel-react framer-motion \
  react-colorful react-day-picker react-dropzone \
  react-hook-form @hookform/resolvers zod

# Install utility libraries
pnpm add date-fns lodash.debounce nanoid
pnpm add -D @types/lodash.debounce

# Install AI/generation libraries
pnpm add @ai-sdk/openai @ai-sdk/react ai @tavily/core

# Install export libraries
pnpm add pptxgenjs pdf-lib html2canvas-pro

# Install DnD libraries
pnpm add @dnd-kit/core @dnd-kit/sortable @dnd-kit/utilities

# Install ProseMirror (for rich text)
pnpm add prosemirror-commands prosemirror-history \
  prosemirror-keymap prosemirror-markdown prosemirror-model \
  prosemirror-schema-basic prosemirror-schema-list \
  prosemirror-state prosemirror-view
```

**Day 3: Copy UI Components**

```bash
# Copy all UI components
cp -r reference-presentation-ai/src/components/ui/* src/components/ui/

# Copy utility functions
cp reference-presentation-ai/src/lib/utils.ts src/lib/

# Copy styles
cp reference-presentation-ai/src/styles/*.css src/styles/
```

**Day 4: Copy Plate.js Components**

```bash
# Copy entire Plate.js directory
cp -r reference-presentation-ai/src/components/plate src/components/

# Update import paths in all files
find src/components/plate -type f -name "*.tsx" -o -name "*.ts" | \
  xargs sed -i 's|@/components/ui|@/components/ui|g'
```

**Day 5: Test Basic UI**

- Import and test a few UI components
- Verify Tailwind styles work
- Test Plate.js editor initialization

---

### PHASE 2: Presentation Components (Week 2) - Copy & Adapt

**Day 1-2: Copy Presentation Components**

```bash
# Copy presentation components
cp -r reference-presentation-ai/src/components/presentation src/components/presentations

# Copy hooks
cp -r reference-presentation-ai/src/hooks src/

# Copy theme definitions
mkdir -p src/lib/presentation
cp reference-presentation-ai/src/lib/presentation/themes.ts src/lib/presentation/

# Copy state management
cp reference-presentation-ai/src/states/presentation-state.ts src/stores/
```

**Day 3-4: Adapt Components for Supabase**

Update all components to use Supabase instead of Prisma:

```typescript
// Find all Prisma queries
grep -r "prisma\." src/components/presentations/

// Replace with Supabase queries
// Example: presentation-state.ts
// Before:
const presentations = await prisma.presentation.findMany(...)

// After:
const { data: presentations } = await supabase
  .from('presentations')
  .select('*')
  .eq('profile_id', userId)
```

**Day 5: Update Schema**

Add missing fields to Supabase tables:

```sql
-- Add fields from Prisma schema that we're missing
ALTER TABLE presentations
ADD COLUMN IF NOT EXISTS outline text[],
ADD COLUMN IF NOT EXISTS search_results jsonb,
ADD COLUMN IF NOT EXISTS image_source text DEFAULT 'ai',
ADD COLUMN IF NOT EXISTS prompt text,
ADD COLUMN IF NOT EXISTS presentation_style text,
ADD COLUMN IF NOT EXISTS language text DEFAULT 'en-US';
```

---

### PHASE 3: Rich Editor Integration (Week 3) - Integrate Plate.js

**Day 1-2: Copy Editor Components**

```bash
# Copy editor
cp -r reference-presentation-ai/src/components/presentation/editor src/components/presentations/

# Update import paths
find src/components/presentations/editor -type f | \
  xargs sed -i 's|@/|@/|g'
```

**Day 3-4: Integrate Editor into PresentationEditor.tsx**

Replace our placeholder with real Plate.js editor:

```typescript
// src/pages/presentations/PresentationEditor.tsx
import { PresentationEditor as PlateEditor } from '@/components/presentations/editor/presentation-editor';

// Replace placeholder with:
<PlateEditor 
  presentation={presentation}
  onSave={handleSave}
/>
```

**Day 5: Test & Debug**

- Test editor loads
- Test saving
- Test all editor features (formatting, images, tables, etc.)

---

### PHASE 4: AI Generation (Week 4) - Create Edge Functions

**Day 1-2: Create Supabase Edge Functions**

```typescript
// supabase/functions/generate-presentation/index.ts
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

serve(async (req) => {
  const { prompt, slides, language, searchWeb } = await req.json()
  
  // Use OpenAI/Anthropic for generation (port logic from their API routes)
  const openai = new OpenAI({ apiKey: Deno.env.get('OPENAI_API_KEY') })
  
  // Generate outline
  const outline = await generateOutline(prompt, searchWeb)
  
  // Generate content for each slide
  const content = await generateSlides(outline, language)
  
  // Return results
  return new Response(JSON.stringify({ outline, content }), {
    headers: { 'Content-Type': 'application/json' }
  })
})
```

**Day 3-4: Create Image Generation Edge Function**

```typescript
// supabase/functions/generate-images/index.ts
// Port logic from reference-presentation-ai/src/app/_actions/image/generate.ts
```

**Day 5: Connect UI to Edge Functions**

Update `PresentationGenerate.tsx` to call Edge Functions:

```typescript
const response = await fetch(`${supabaseUrl}/functions/v1/generate-presentation`, {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${session.access_token}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ prompt, slides, language, searchWeb })
})
```

---

### PHASE 5: Themes & Export (Week 5) - Final Features

**Day 1-2: Theme System**

```bash
# Already copied themes.ts in Phase 2
# Now integrate theme components
# They're already adapted in Week 2
```

**Day 3-4: Export Features**

```typescript
// Copy export utilities
cp reference-presentation-ai/src/components/presentation/utils/exportToPPT.ts \
   src/components/presentations/utils/

// Adapt for Supabase data structure
```

**Day 5: Testing & Polish**

- Full end-to-end testing
- Bug fixes
- Performance optimization

---

## 📊 FINAL FILE COUNT

### ✅ Files We Can Reuse: ~380 files (75%)

| Category | Files | Status |
|----------|-------|--------|
| **UI Components** | 60+ | ✅ Direct copy |
| **Plate.js** | 180+ | ✅ Direct copy + minor paths |
| **Presentation Components** | 46 | 🟡 Copy + adapt queries |
| **Hooks** | 9 | 🟡 Copy + adapt |
| **Utilities** | 10+ | ✅ Direct copy |
| **Styles** | 2 | ✅ Direct copy |
| **State** | 1 | ✅ Direct copy (Zustand) |
| **Themes** | 1 | ✅ Direct copy |
| **Providers** | 2 | ✅ Direct copy (TanStack, theme) |

### 🔴 Files We Cannot Reuse: ~126 files (25%)

| Category | Files | Why Cannot Reuse |
|----------|-------|------------------|
| **Server Actions** | 14 | Next.js specific → Edge Functions |
| **API Routes** | 7 | Next.js specific → Edge Functions |
| **Pages** | 10 | App Router → React Router |
| **Middleware** | 1 | Next.js → Supabase RLS |
| **Auth Provider** | 1 | NextAuth → Supabase Auth |
| **Database** | Prisma | Different ORM → Supabase |

---

## ✅ UPDATED MASTER PLAN ASSESSMENT

### Is the Original Plan Correct? 🟡 **PARTIALLY**

**What Was Correct:**
- ✅ Recognized need for pages and components
- ✅ Identified database requirements
- ✅ Understood phased approach

**What Was Wrong:**
- ❌ Underestimated Plate.js complexity (180 files, not "simple")
- ❌ Didn't account for Server Actions → Edge Functions conversion
- ❌ Assumed we could port Next.js pages directly
- ❌ Missed 75+ additional dependencies needed

**What This New Plan Fixes:**
- ✅ Identifies exactly which 380 files CAN be reused
- ✅ Clear adaptation strategy for 150 files that need changes
- ✅ Honest about 126 files that must be rewritten
- ✅ Realistic 5-week timeline with specific daily tasks
- ✅ Complete dependency list (75+ packages)

---

## 🎯 RECOMMENDATION

### Option A: Maximum Reuse (RECOMMENDED) 🟢

**What:** Follow this 5-week plan to integrate 380 files

**Timeline:** 5 weeks (1 month + 1 week)

**Result:** 
- Get 75% of presentation-ai's code
- Full Plate.js rich editor
- All UI components and themes
- Must build: AI generation, image gen, export

**Effort Breakdown:**
- Week 1: Copy UI + Plate.js (mostly automated)
- Week 2: Adapt presentation components (manual)
- Week 3: Integrate editor (testing heavy)
- Week 4: Build Edge Functions (new code)
- Week 5: Polish & test

**Pros:**
- ✅ Reuse 380 files (saves months of work)
- ✅ Get professional UI immediately
- ✅ Get Plate.js editor (2-3 weeks alone)
- ✅ Proven components

**Cons:**
- Still need 5 weeks
- Must adapt 150 files
- Must rewrite 126 files (AI, API)

---

### Option B: Continue with Basic CRUD (FASTEST) 🟢

**What:** Ship what we have, add features v2+

**Timeline:** 3-5 hours to production

**Result:**
- Basic CRUD works now
- Add Plate.js in v1.1 (3 weeks)
- Add AI in v1.2 (3 weeks)
- Add themes in v1.3 (2 weeks)

**Total:** Same 8 weeks, but incremental

---

### Option C: Hybrid Approach (PRAGMATIC) 🟡

**What:** 
- Week 1: Copy UI components only (60 files)
- Week 1: Copy Plate.js only (180 files)
- Week 2: Integrate editor into our app
- Ship v1 with rich editor
- Add AI/themes in v2

**Timeline:** 2 weeks to rich editor MVP

---

## 📋 FINAL VERDICT

**Is the Plan Correct Now?** ✅ **YES** (with this updated analysis)

**Key Insights:**
1. We CAN reuse **75% of their files** (~380 files)
2. We MUST rewrite **25%** (~126 files for Next.js-specific)
3. Timeline: **5 weeks** for full feature parity
4. OR: **2 weeks** for rich editor only
5. OR: **3-5 hours** to ship basic CRUD now

**Recommendation:** Choose based on urgency:
- **Need features NOW:** Option A (5 weeks, maximum reuse)
- **Need ship NOW:** Option B (3-5 hours, basic CRUD)
- **Need editor NOW:** Option C (2 weeks, rich editor)

---

**Next Step:** Choose option and I'll create detailed implementation commands


