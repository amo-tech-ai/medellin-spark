# 🎯 Core MVP - Implementation Order Guide

**Last Updated**: October 18, 2025
**Purpose**: Step-by-step guide to implement core features in correct order
**Timeline**: Week 1-2 (MVP essentials)

---

## 📊 Quick Overview

**Total Files**: 38 documents across 5 phases
**Implementation Time**: 1-2 weeks
**Current Status**: ✅ 100% Complete (Reference for new features)

---

## 🗺️ Implementation Roadmap

```
PHASE 0: Setup (30 min)
    ↓
PHASE 1: Foundation - Architecture & Database (Day 1)
    ↓
PHASE 2: Reference Setup - Design System (Day 1)
    ↓
PHASE 3: Core Feature - Pitch Deck Wizard (Week 1)
    ↓
PHASE 4: UI Polish (Week 2)
    ↓
PHASE 5: Testing & Launch
```

---

## 📋 Phase-by-Phase Implementation

---

## ⚙️ PHASE 0: Environment Setup (30 minutes)

**Goal**: Install dependencies and verify environment works
**Location**: `/mvp/01-getting-started/` (outside core/)
**Status**: ✅ Complete

### Step 0.1: Quick Start
**File**: `/mvp/01-getting-started/01-quick-start.md`
**Purpose**: One-command setup for Supabase
**Actions**:
```bash
# Clone and install
git clone <repo>
cd medellin-spark
pnpm install

# Setup Supabase
npx supabase db reset
npx supabase db diff -f verify

# Verify sample data loaded
source .env
psql "$SUPABASE_DB_URL_POOLER" -c "SELECT COUNT(*) FROM profiles;"
```

**Success Criteria**:
- ✅ Dev server runs (`pnpm dev`)
- ✅ Supabase connected (no errors)
- ✅ Sample data visible in database

### Step 0.2: Start Here Guide
**File**: `/mvp/01-getting-started/02-start-here.md`
**Purpose**: Orientation and next steps
**Actions**: Read for project overview

### Step 0.3: MVP Simple Guide
**File**: `/mvp/01-getting-started/03-mvp-simple-guide.md`
**Purpose**: High-level MVP explanation
**Actions**: Understand MVP scope

**⏱️ Time**: 30 minutes
**✅ Checkpoint**: Dev server running, database seeded

---

## 🏗️ PHASE 1: Foundation - Architecture & Database (Day 1)

**Goal**: Understand system before coding
**Location**: `core/02-architecture/`
**Status**: ✅ Complete (Reference)

### Step 1.1: Database Schema (CRITICAL - Read First!)
**File**: `02-architecture/04-database-schema.md`
**Purpose**: Database structure (most important doc)
**Why First**: Everything depends on database design
**Actions**:
- ✅ Review ERD diagram
- ✅ Understand table relationships
- ✅ Note: `profile_id` (not `user_id`) references auth.users
- ✅ Verify RLS policies enabled

**Key Tables**:
```
auth.users → profiles → presentations
                      → pitch_conversations
                      → custom_themes
```

**Critical Rules**:
- Always use `profile_id` in foreign keys
- Never query `auth.users` directly (use `profiles`)
- RLS must be enabled on ALL tables

**⏱️ Time**: 1 hour (read carefully!)

---

### Step 1.2: System Flowchart
**File**: `02-architecture/01-system-flowchart.md`
**Purpose**: High-level system overview
**Actions**:
- ✅ Understand user → frontend → backend → database flow
- ✅ Identify key components

**⏱️ Time**: 20 minutes

---

### Step 1.3: User Journey
**File**: `02-architecture/05-user-journey.md`
**Purpose**: How users interact with system
**Actions**:
- ✅ Map user flows
- ✅ Understand wizard → editor → viewer path

**⏱️ Time**: 15 minutes

---

### Step 1.4: Additional Architecture (Optional)
**Files**:
- `02-architecture/02-sequence-diagram.md` - Component interactions
- `02-architecture/03-state-diagram.md` - Application states
- `02-architecture/06-architecture-overview.md` - Complete overview
- `02-architecture/README.md` - Architecture summary

**Purpose**: Deeper understanding
**When to Read**: When you need specific details
**⏱️ Time**: 1 hour (optional, as needed)

---

### Step 1.5: Architecture Diagrams (Visual Reference)
**Folder**: `02-architecture/diagrams/`
**Files**:
- `01-system-flowchart.md` - Mermaid flowchart
- `02-sequence-diagram.md` - Interaction diagram
- `03-state-diagram.md` - State machine
- `04-database-erd.md` - Database ERD (visual)
- `05-user-journey.md` - User flow diagram

**Purpose**: Visual versions of architecture docs
**Usage**: Reference when building features
**⏱️ Time**: Quick reference as needed

**✅ Phase 1 Complete**: You understand the system architecture

---

## 🎨 PHASE 2: Reference Setup - Design System (Day 1)

**Goal**: Establish design standards before building UI
**Location**: `core/05-reference/`
**Status**: ✅ Complete
**Why Second**: Need design system before building UI

### Step 2.1: Design System (CRITICAL)
**File**: `05-reference/01-design-system.md`
**Purpose**: shadcn/ui components, Radix UI, Tailwind config
**Actions**:
- ✅ Review component library (shadcn/ui)
- ✅ Understand utility patterns
- ✅ Note typography scale
- ✅ Memorize spacing system

**Key Components**:
```
shadcn/ui components:
- Button, Card, Dialog, Input
- Select, Textarea, Toast
- Form, Label, Tabs, etc.
```

**⏱️ Time**: 30 minutes

**⚠️ Note**: Files `02-design-system.md` is a **DUPLICATE** - ignore it

---

### Step 2.2: Color Scheme
**File**: `05-reference/02-color-scheme.md`
**Purpose**: Brand colors, semantic tokens
**Actions**:
- ✅ Copy color palette
- ✅ Use CSS variables (--primary, --secondary, etc.)
- ✅ Follow dark/light mode patterns

**⏱️ Time**: 10 minutes

**⚠️ Note**: `03-color-scheme.md` is a **DUPLICATE** - ignore it

---

### Step 2.3: File Structure
**File**: `05-reference/03-file-structure.md`
**Purpose**: Project organization, where files go
**Actions**:
- ✅ Understand folder layout
- ✅ Know where to create new files
- ✅ Follow naming conventions

**⏱️ Time**: 10 minutes

**⚠️ Note**: `04-file-structure.md` is a **DUPLICATE** - ignore it

---

### Step 2.4: Decision Matrix
**File**: `05-reference/04-decision-matrix.md`
**Purpose**: Tech stack decisions and rationale
**Actions**:
- ✅ Understand why React + Vite (not Next.js)
- ✅ Know why Supabase (not Firebase)
- ✅ Learn component library choices

**⏱️ Time**: 15 minutes

**⚠️ Note**: `05-decision-matrix.md` is a **DUPLICATE** - ignore it

---

### ⚠️ Files to IGNORE (Duplicates)
```
❌ 00-master-reference.md (outdated)
❌ 01-master-reference.md (duplicate of 00)
❌ 02-design-system.md (duplicate of 01)
❌ 03-color-scheme.md (duplicate of 02)
❌ 04-file-structure.md (duplicate of 03)
❌ 05-decision-matrix.md (duplicate of 04)
```

**Rule**: Always use the LOWEST numbered file (01, 02, 03, 04)

**✅ Phase 2 Complete**: Design system established

---

## 🚀 PHASE 3: Core Feature - Pitch Deck Wizard (Week 1)

**Goal**: Build the main differentiating feature
**Location**: `core/03-presentations/`
**Status**: ✅ Complete (Implemented)
**Priority**: 🔴 HIGHEST - This is the core product

### Step 3.1: Wizard Specification (MUST READ!)
**File**: `03-presentations/01-wizard-ai-generation.md`
**Purpose**: Complete spec for AI wizard (most detailed doc)
**Actions**:
- ✅ Read entire document (comprehensive)
- ✅ Understand 4-step wizard flow
- ✅ Study UI mockups and user journey
- ✅ Review success metrics

**Wizard Flow**:
```
Step 1: Model Selection (GPT-4, Claude, etc.)
    ↓
Step 2: Business Description (prompt input)
    ↓
Step 3: AI Generation (progress indicator)
    ↓
Step 4: Outline Review (edit before finalizing)
    ↓
Redirect to Editor
```

**Success Metrics**:
- 80% completion rate
- <20 minutes total time
- 10-15 seconds AI generation

**⏱️ Time**: 2 hours (read + understand)

**Implementation File**: `src/pages/PitchDeckWizard.tsx` ✅

---

### Step 3.2: AI Setup
**File**: `03-presentations/05-ai-setup.md`
**Purpose**: OpenAI integration, Edge Functions
**Actions**:
- ✅ Setup OpenAI API key (server-side only!)
- ✅ Deploy Edge Function proxy
- ✅ Test AI generation endpoint

**Security Critical**:
```
❌ NEVER: const key = import.meta.env.VITE_OPENAI_API_KEY
✅ ALWAYS: Use Edge Function (/functions/v1/chat)
```

**⏱️ Time**: 1 hour

**Implementation Files**:
- `supabase/functions/chat/index.ts` ✅
- `supabase/functions/pitch-deck-assistant/index.ts` ✅

---

### Step 3.3: Build Wizard (Week 1)
**Actions**:
1. ✅ Create wizard page component
2. ✅ Implement 4-step flow
3. ✅ Connect to Edge Function
4. ✅ Add loading states
5. ✅ Test complete user journey

**Implementation Time**: 3-5 days
**Files Created**: `PitchDeckWizard.tsx`, wizard components

---

### Step 3.4: Presentation Editor
**File**: `03-presentations/02-presentation-editor.md`
**Purpose**: Edit generated slides
**Actions**:
- ✅ Build slide grid view
- ✅ Implement slide editor
- ✅ Add theme customization
- ✅ Enable slide reordering

**⏱️ Time**: 2-3 days

**Implementation Files**:
- `src/pages/presentations/OutlineEditor.tsx` ✅
- `src/pages/presentations/SlideEditor.tsx` ✅
- `src/pages/presentations/PresentationViewer.tsx` ✅

---

### Step 3.5: Reference Docs (Optional)
**Files**:
- `03-presentations/03-pitch-deck-wizard-plan.md` - Original planning
- `03-presentations/04-implementation-plan.md` - Integration guide
- `03-presentations/README.md` - Overview

**Purpose**: Historical context and alternative approaches
**When to Read**: If you need background or troubleshooting
**⏱️ Time**: As needed

**✅ Phase 3 Complete**: Core feature (wizard + editor) working

---

## 🎨 PHASE 4: UI Polish (Week 2)

**Goal**: Apply designs to components
**Location**: `core/04-ui-design/`
**Status**: ✅ Complete
**Priority**: 🟡 MEDIUM - Polish after functionality works

### Step 4.1: Generation Wizard UI
**File**: `04-ui-design/02-generation-wizard.md`
**Purpose**: Wizard visual design and interactions
**Actions**:
- ✅ Apply visual design to wizard
- ✅ Add animations and transitions
- ✅ Implement progress indicators
- ✅ Polish user experience

**⏱️ Time**: 1 day

---

### Step 4.2: Dashboard Layouts
**Files**:
- `04-ui-design/01-presentation-dashboard.md`
- `04-ui-design/01-my-presentations-layout.md`
- `04-ui-design/02-pitch-deck-dashboard-layout.md`

**Purpose**: Presentation list and dashboard UI
**Actions**:
- ✅ Design presentation cards
- ✅ Create grid/list views
- ✅ Add search and filters

**⏱️ Time**: 1 day

**Note**: Two `01-` files exist - both are useful, review both

---

### Step 4.3: Additional UI Components (Lower Priority)
**Files**:
- `04-ui-design/03-theme-creator.md` - Theme customization UI
- `04-ui-design/03-professional-profile-layout.md` - Profile pages
- `04-ui-design/04-share-modal.md` - Sharing interface

**Purpose**: Enhancement features
**Status**: 🟡 Partial implementation
**When to Build**: After core wizard works well
**⏱️ Time**: 2-3 days

---

### Step 4.4: UI Assets (Reference Only)
**Folders**:
- `04-ui-design/components/` - Component mockups
- `04-ui-design/layouts/` - Layout templates
- `04-ui-design/wireframes/` - Wireframe designs

**Purpose**: Visual references during development
**Usage**: Look at these when building UI
**⏱️ Time**: Reference as needed

---

### Step 4.5: UI Overview
**File**: `04-ui-design/README.md`
**Purpose**: UI design overview
**Actions**: Read for UI strategy

**✅ Phase 4 Complete**: UI polished and professional

---

## ✅ PHASE 5: Testing & Launch

**Goal**: Verify everything works end-to-end
**Location**: See Testing section in intermediate/04-testing/
**Status**: 🟡 Ongoing

### Step 5.1: Manual Testing
**Test Flow**:
1. ✅ User can create account
2. ✅ User can start wizard
3. ✅ Wizard generates deck (<20 min)
4. ✅ User can edit slides
5. ✅ User can view presentation
6. ✅ All 10 slides render correctly
7. ✅ No console errors
8. ✅ Mobile responsive

**⏱️ Time**: 2 hours

---

### Step 5.2: Production Checklist
**Verify**:
- ✅ TypeScript compiles (`pnpm tsc`)
- ✅ Build succeeds (`pnpm build`)
- ✅ Edge Functions deployed
- ✅ Environment variables set
- ✅ RLS policies active
- ✅ No API keys in frontend

**⏱️ Time**: 1 hour

---

### Step 5.3: Deploy
**Actions**:
```bash
# Build for production
pnpm build

# Deploy Edge Functions
supabase functions deploy chat
supabase functions deploy pitch-deck-assistant

# Deploy frontend (Vercel/Netlify)
# Follow hosting provider instructions
```

**✅ Phase 5 Complete**: MVP launched! 🎉

---

## 📊 Implementation Summary

### By Priority

| Phase | Priority | Time | Status |
|-------|----------|------|--------|
| **Phase 0: Setup** | 🔴 Critical | 30 min | ✅ Done |
| **Phase 1: Architecture** | 🔴 Critical | 2-3 hours | ✅ Done |
| **Phase 2: Design System** | 🔴 Critical | 1 hour | ✅ Done |
| **Phase 3: Wizard** | 🔴 Critical | 1 week | ✅ Done |
| **Phase 4: UI Polish** | 🟡 Medium | 3-5 days | ✅ Done |
| **Phase 5: Testing** | 🔴 Critical | 3 hours | 🟡 Ongoing |

---

### By Folder

| Folder | Files | Purpose | Time | Status |
|--------|-------|---------|------|--------|
| `01-getting-started/` | 4 | Environment setup | 30 min | ✅ |
| `02-architecture/` | 12 | System design | 2-3 hours | ✅ |
| `05-reference/` | 11 (6 useful) | Design standards | 1 hour | ✅ |
| `03-presentations/` | 6 | Core feature | 1 week | ✅ |
| `04-ui-design/` | 11+ | UI polish | 3-5 days | ✅ |

---

## 🎯 Critical Path (Minimum Viable Implementation)

**If time is limited, follow this path**:

```
1. Setup (30 min)
   → /mvp/01-getting-started/01-quick-start.md

2. Database (1 hour)
   → core/02-architecture/04-database-schema.md

3. Design System (30 min)
   → core/05-reference/01-design-system.md
   → core/05-reference/02-color-scheme.md

4. Wizard Spec (2 hours)
   → core/03-presentations/01-wizard-ai-generation.md
   → core/03-presentations/05-ai-setup.md

5. Build (1 week)
   → Implement wizard + editor

6. Test & Deploy (3 hours)
   → Manual testing → Deploy
```

**Total**: 1.5 weeks for bare minimum MVP

---

## 📝 Key Takeaways

### ✅ DO Read These First
1. `02-architecture/04-database-schema.md` (MOST IMPORTANT)
2. `05-reference/01-design-system.md`
3. `03-presentations/01-wizard-ai-generation.md`

### ❌ DON'T Read These (Duplicates)
- `05-reference/00-master-reference.md`
- `05-reference/02-design-system.md` through `05-decision-matrix.md`

### 🎯 Implementation Order Rationale

**Why This Order**:
1. **Setup First** - Can't code without environment
2. **Database Second** - Everything depends on data model
3. **Design System Third** - Need standards before building UI
4. **Wizard Fourth** - The core product value
5. **Polish Fifth** - Make it beautiful after it works
6. **Test Last** - Verify everything works

**Dependencies**:
```
Setup → Database → Design System → Wizard → UI Polish → Testing
                                      ↓
                                  Editor
```

---

## 🔄 Iterative Approach

**For each feature**:
1. ✅ Read specification doc
2. ✅ Review reference materials
3. ✅ Build minimum version
4. ✅ Test manually
5. ✅ Polish UI
6. ✅ Fix bugs
7. ✅ Deploy

**Don't try to perfect Phase 1 before moving to Phase 2**. Build iteratively!

---

## 💡 Pro Tips

### Reading Docs
- **Database schema** = Most important (read 3 times)
- **Wizard spec** = Most detailed (comprehensive guide)
- **READMEs** = Good overviews (start here per folder)

### Avoiding Duplicates
- Use **lowest numbered files** (01, 02, 03, 04)
- Ignore **00-** and **duplicates** (02-design-system, etc.)

### Time Management
- **Don't read everything** - Use this guide
- **Focus on critical path** - Skip optional docs initially
- **Reference as needed** - Come back to docs during implementation

### Implementation
- **Test incrementally** - Don't wait until the end
- **Database first** - Get schema right before coding
- **Security critical** - API keys server-side ONLY

---

## 🆘 Troubleshooting

### "Where do I start?"
→ Follow Phase 0 → Phase 1 → Phase 2

### "Too many files, overwhelmed"
→ Follow Critical Path (6 steps)

### "Not sure what this file is for"
→ Check this guide's description for each file

### "Implementation not working"
→ Verify you completed all previous phases

---

## 📚 Related Resources

### Project Root
- `/CLAUDE.md` - Project instructions
- `/docs/` - Additional guides
- `/.claude/skills/` - Development skills

### Testing
- `/mvp/intermediate/04-testing/` - Test suite

### Advanced
- `/mvp/advanced/` - Future features (don't build yet)

---

**Success Criteria**: You can build the entire core MVP by following this guide from top to bottom. 🎯

**Last Updated**: October 18, 2025
**Maintained By**: Development Team
**Status**: Complete Implementation Guide

---

*This guide is your roadmap. Follow it sequentially for fastest MVP development.*
