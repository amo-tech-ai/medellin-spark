# Core Files to Change: Next.js → Vite Conversion

**Project:** `/home/sk/medellin-spark/presentation-ai` (Source)
**Target:** `/home/sk/medellin-spark/presentation-ai` (Vite)
**Total Tasks:** 11 main tasks expanded into 35 subtasks
**Focus:** Simple, core changes only

---

## 🎯 Start Here: Task 1 (5 Subtasks)

### Task 1.1: Install Plate.js Ecosystem (28 packages)
**What:** Install all Plate.js rich text editor packages
**Files to Change:**
- `package.json` - Add dependencies
- Create `vite.config.ts`

**Command:**
```bash
cd /home/sk/medellin-spark/presentation-ai
pnpm add @platejs/core @platejs/common @platejs/elements @platejs/marks \
  @platejs/ui @platejs/serializers platejs
```

### Task 1.2: Install AI SDK Packages
**What:** Add OpenAI and Tavily integrations
**Files to Change:**
- `package.json`

**Command:**
```bash
pnpm add ai @ai-sdk/openai @ai-sdk/react @tavily/core
```

### Task 1.3: Install Export Libraries
**What:** PDF and PowerPoint generation
**Files to Change:**
- `package.json`

**Command:**
```bash
pnpm add pptxgenjs pdf-lib html2canvas-pro
```

### Task 1.4: Install DnD and ProseMirror
**What:** Drag-drop and outline editor
**Files to Change:**
- `package.json`

**Command:**
```bash
pnpm add @dnd-kit/core @dnd-kit/sortable @dnd-kit/utilities \
  prosemirror-state prosemirror-view prosemirror-model \
  prosemirror-commands prosemirror-keymap prosemirror-history
```

### Task 1.5: Create Vite Config
**What:** Setup Vite build system
**Files to Create:**
- `vite.config.ts`
- `index.html`

**vite.config.ts:**
```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  server: {
    port: 8080
  }
})
```

**Update package.json scripts:**
```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

---

## 📝 Task 2: Copy Plate.js Editor (4 Subtasks)

### Files to Copy from `/home/sk/medellin-spark/presentation-ai`:
```
src/components/plate/              → Copy entire directory (184 files)
src/components/prose-mirror/       → Copy entire directory (3 files)
src/lib/presentation/themes.ts     → Copy file
src/lib/presentation/parser.ts     → Copy file
src/lib/presentation/exportToPPT.ts → Copy file
src/styles/presentation.css        → Copy file
```

### Key Changes in Copied Files:
1. **Remove:** `'use client'` and `'use server'` directives
2. **Replace:** `next/navigation` → `react-router-dom`
3. **Replace:** `next/image` → `<img>`
4. **Update:** Relative imports → `@/` aliases

---

## 🔄 Task 4: Convert Routing (7 Subtasks)

### Core Files to Convert:

**1. Pages (Next.js App Router → React Router):**
```
app/page.tsx                              → src/pages/Home.tsx
app/presentation/page.tsx                 → src/pages/presentations/MyPresentations.tsx
app/presentation/generate/[id]/page.tsx   → src/pages/presentations/PresentationGenerate.tsx
app/auth/signin/page.tsx                  → src/pages/Auth.tsx
```

**2. Import Changes (8 files):**
```typescript
// BEFORE (Next.js)
import { useRouter, usePathname } from 'next/navigation'
const router = useRouter()
router.push('/presentations')

// AFTER (React Router)
import { useNavigate, useLocation } from 'react-router-dom'
const navigate = useNavigate()
navigate('/presentations')
```

**3. Link Components (2 files):**
```typescript
// BEFORE
import Link from 'next/link'
<Link href="/presentations">View</Link>

// AFTER
import { Link } from 'react-router-dom'
<Link to="/presentations">View</Link>
```

**4. Image Components (4 files):**
```typescript
// BEFORE
import Image from 'next/image'
<Image src="/logo.png" width={100} height={50} alt="Logo" />

// AFTER
<img src="/logo.png" className="w-25 h-12" alt="Logo" />
```

---

## 🔐 Task 5: Supabase Auth (4 Subtasks)

### Files to Remove:
```
src/server/auth.ts
src/provider/NextAuthProvider.tsx
```

### Files to Create/Update:
```
src/contexts/AuthContext.tsx           → Create new
src/hooks/useAuth.ts                   → Create new
src/pages/Auth.tsx                     → Update for Supabase
src/components/ProtectedRoute.tsx      → Update for Supabase
src/components/auth/Dropdown.tsx       → Update for Supabase
```

**Auth Context Pattern:**
```typescript
import { createClient } from '@/integrations/supabase/client'

export const AuthContext = createContext({})

export const useAuth = () => {
  const supabase = createClient()

  return {
    signIn: (email, password) => supabase.auth.signInWithPassword({email, password}),
    signOut: () => supabase.auth.signOut(),
    user: session?.user
  }
}
```

---

## 🗂️ Task 6: Database CRUD (5 Subtasks)

### Files to Create:
```
src/lib/presentation/actions.ts          → CRUD functions
src/lib/presentation/theme-actions.ts    → Theme management
src/hooks/presentation/useDebouncedSave.ts
src/hooks/presentation/useSlideOperations.ts
```

**Key Functions:**
```typescript
// src/lib/presentation/actions.ts
export async function fetchPresentations(userId: string)
export async function createPresentation(data: PresentationData)
export async function updatePresentation(id: string, data: Partial<PresentationData>)
export async function deletePresentation(id: string)
```

---

## ⚡ Task 7: Edge Functions (4 Subtasks)

### Files to Create in Supabase:
```
supabase/functions/hello-stream/index.ts          → SSE POC
supabase/functions/generate-outline/index.ts      → Outline generation
supabase/functions/generate-presentation/index.ts → Slide generation
supabase/functions/generate-image/index.ts        → Image generation
```

**Key Pattern (npm: specifiers for Deno):**
```typescript
// supabase/functions/generate-outline/index.ts
import { generateText } from "npm:ai"
import { openai } from "npm:@ai-sdk/openai"

Deno.serve(async (req) => {
  const { prompt } = await req.json()

  const result = await generateText({
    model: openai('gpt-4'),
    prompt: prompt
  })

  return new Response(JSON.stringify(result))
})
```

---

## 📋 Simple Checklist: Files You MUST Change

### Configuration Files (Create New):
- [ ] `vite.config.ts` - Vite build config
- [ ] `index.html` - Entry point
- [ ] Update `package.json` scripts

### Routing Files (Convert):
- [ ] `src/pages/Home.tsx`
- [ ] `src/pages/presentations/MyPresentations.tsx`
- [ ] `src/pages/presentations/PresentationGenerate.tsx`
- [ ] `src/pages/Auth.tsx`
- [ ] Update 8 files with navigation imports
- [ ] Update 2 files with Link components
- [ ] Update 4 files with Image components

### Auth Files (Replace):
- [ ] Delete `src/server/auth.ts`
- [ ] Delete `src/provider/NextAuthProvider.tsx`
- [ ] Create `src/contexts/AuthContext.tsx`
- [ ] Update `src/components/ProtectedRoute.tsx`
- [ ] Update `src/components/auth/Dropdown.tsx`

### Copy As-Is (No Changes):
- [ ] `src/components/plate/` (184 files) - Just remove 'use client'
- [ ] `src/components/prose-mirror/` (3 files)
- [ ] `src/lib/presentation/themes.ts`
- [ ] `src/lib/presentation/parser.ts`
- [ ] `src/lib/presentation/exportToPPT.ts`

---

## 🚀 Quick Start Guide

**1. Install Dependencies (Task 1):**
```bash
cd /home/sk/medellin-spark/presentation-ai
pnpm add vite @vitejs/plugin-react -D
pnpm add @platejs/* prosemirror-* ai @ai-sdk/* pptxgenjs pdf-lib
```

**2. Create Vite Config:**
```bash
touch vite.config.ts index.html
# Add configs from Task 1.5 above
```

**3. Update Package Scripts:**
```json
"dev": "vite",
"build": "vite build"
```

**4. Test:**
```bash
pnpm dev
# Should start on http://localhost:8080
```

---

## 📊 Task Breakdown Summary

| Task | Subtasks | Focus | Files |
|------|----------|-------|-------|
| 1. Vite Setup | 5 | Install packages, create config | 2 new |
| 2. Plate.js | 4 | Copy editor system | 184 files |
| 3. ProseMirror | 6 | Copy outline editor | 3 files |
| 4. Routing | 7 | Convert Next.js → React Router | 14 files |
| 5. Auth | 4 | Supabase Auth integration | 7 files |
| 6. Database | 5 | CRUD operations | 5 new |
| 7. Edge Functions | 4 | AI generation services | 4 new |
| 8. UI Components | 5 | Copy dashboard | 50+ files |
| 9. Export | 4 | PDF/PPTX/PNG export | 3 files |
| 10. AI Integration | 5 | Connect frontend to Edge Functions | 5 files |
| 11. Polish | 5 | Error handling, optimization | Various |

**Total:** 11 tasks, 35 subtasks, ~300 files

---

## 🎯 Priority Order

1. **Task 1** - Setup (MUST DO FIRST)
2. **Task 4** - Routing (Core changes)
3. **Task 5** - Auth (Required for RLS)
4. **Task 2** - Plate.js (Copy files)
5. **Task 3** - ProseMirror (Copy files)
6. **Task 7** - Edge Functions (AI backend)
7. **Task 6** - Database (CRUD)
8. **Task 8** - UI Components (Dashboard)
9. **Task 10** - AI Integration (Connect frontend)
10. **Task 9** - Export (PDF/PPTX)
11. **Task 11** - Polish (Final touches)

---

## ✅ Success Criteria

After completing core conversions (Tasks 1-5), you should have:

- ✅ Vite dev server running on port 8080
- ✅ React Router navigation working
- ✅ Supabase Auth integrated
- ✅ Plate.js editor renders
- ✅ ProseMirror outline editor works
- ✅ No Next.js imports remaining
- ✅ No build errors

**Next Steps:** See detailed subtasks with `task-master show 1` through `task-master show 11`
