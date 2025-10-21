# My Presentations Page - Implementation Plan

**Created**: January 13, 2025
**Status**: Ready for Implementation
**Priority**: HIGH (Phase 1, Week 1-2)
**UI Design**: `/home/sk/medellin-spark/main/UI/01-my-presentations-ui-plan.md`

---

## 📋 Implementation Overview

This document provides a step-by-step implementation guide for building the My Presentations page (`/presentations`), the central hub for users to create and manage their pitch deck library.

---

## 🎯 Implementation Goals

1. **Primary**: Allow users to create new presentations via AI, templates, or blank canvas
2. **Secondary**: Display user's existing presentations in an organized grid
3. **Tertiary**: Showcase recommended templates for inspiration
4. **Experience**: Deliver <2s page load, smooth animations, WCAG AA accessibility

---

## 📊 Phase 1: Database Schema & API Setup

### 1.1 Supabase Tables

#### Table 1: `presentations`
```sql
-- Create presentations table
CREATE TABLE IF NOT EXISTS presentations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  cover_image_url TEXT,
  thumbnail_url TEXT,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'complete', 'shared')),
  slide_count INT NOT NULL DEFAULT 0,
  theme JSONB DEFAULT '{"primary_color": "#F5A623", "secondary_color": "#4A5568", "font_family": "Inter"}'::jsonb,
  is_public BOOLEAN DEFAULT false,
  share_link TEXT UNIQUE,
  view_count INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  last_edited_at TIMESTAMPTZ DEFAULT NOW(),
  last_presented_at TIMESTAMPTZ,
  deleted_at TIMESTAMPTZ,

  CONSTRAINT presentations_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE
);

-- Add indexes for performance
CREATE INDEX IF NOT EXISTS idx_presentations_user_id ON presentations(user_id);
CREATE INDEX IF NOT EXISTS idx_presentations_status ON presentations(status);
CREATE INDEX IF NOT EXISTS idx_presentations_created_at ON presentations(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_presentations_last_edited_at ON presentations(last_edited_at DESC);
CREATE INDEX IF NOT EXISTS idx_presentations_deleted_at ON presentations(deleted_at) WHERE deleted_at IS NULL;

-- Enable Row Level Security
ALTER TABLE presentations ENABLE ROW LEVEL SECURITY;

-- RLS Policies
-- Users can view their own presentations
CREATE POLICY "Users can view own presentations"
  ON presentations FOR SELECT
  USING (auth.uid() = user_id AND deleted_at IS NULL);

-- Users can insert their own presentations
CREATE POLICY "Users can insert own presentations"
  ON presentations FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own presentations
CREATE POLICY "Users can update own presentations"
  ON presentations FOR UPDATE
  USING (auth.uid() = user_id AND deleted_at IS NULL);

-- Public can view shared presentations
CREATE POLICY "Public can view shared presentations"
  ON presentations FOR SELECT
  USING (is_public = true AND deleted_at IS NULL);
```

#### Table 2: `presentation_templates`
```sql
-- Create presentation templates table
CREATE TABLE IF NOT EXISTS presentation_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  cover_image_url TEXT NOT NULL,
  attribution TEXT, -- e.g., "By Airbnb"
  category TEXT NOT NULL CHECK (category IN ('pitch-deck', 'investor-deck', 'product-launch', 'sales-deck', 'budgeting')),
  usage_count INT DEFAULT 0,
  like_count INT DEFAULT 0,
  is_premium BOOLEAN DEFAULT false,
  price_cents INT DEFAULT 0,
  tags TEXT[] DEFAULT '{}',
  slides JSONB NOT NULL DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add indexes
CREATE INDEX IF NOT EXISTS idx_templates_category ON presentation_templates(category);
CREATE INDEX IF NOT EXISTS idx_templates_usage_count ON presentation_templates(usage_count DESC);
CREATE INDEX IF NOT EXISTS idx_templates_is_premium ON presentation_templates(is_premium);

-- Enable RLS
ALTER TABLE presentation_templates ENABLE ROW LEVEL SECURITY;

-- Public can view all templates
CREATE POLICY "Public can view templates"
  ON presentation_templates FOR SELECT
  USING (true);
```

### 1.2 Database Migration File

**File**: `/home/sk/medellin-spark/supabase/migrations/YYYYMMDDHHMMSS_create_presentations_tables.sql`

---

## 🔧 Phase 2: TypeScript Types & Interfaces

### 2.1 Create Types File

**File**: `src/types/presentations.types.ts`

```typescript
// src/types/presentations.types.ts

export type PresentationStatus = 'draft' | 'complete' | 'shared';
export type TemplateCategory = 'pitch-deck' | 'investor-deck' | 'product-launch' | 'sales-deck' | 'budgeting';

export interface PresentationTheme {
  primary_color: string;
  secondary_color: string;
  font_family: string;
}

export interface Presentation {
  id: string;
  user_id: string;
  title: string;
  description?: string;
  cover_image_url?: string;
  thumbnail_url?: string;
  status: PresentationStatus;
  slide_count: number;
  theme: PresentationTheme;
  is_public: boolean;
  share_link?: string;
  view_count: number;
  created_at: string;
  updated_at: string;
  last_edited_at: string;
  last_presented_at?: string;
  deleted_at?: string;
}

export interface Template {
  id: string;
  name: string;
  description?: string;
  cover_image_url: string;
  attribution?: string;
  category: TemplateCategory;
  usage_count: number;
  like_count: number;
  is_premium: boolean;
  price_cents?: number;
  tags: string[];
  slides: any[];
  created_at: string;
  updated_at: string;
}

export interface CreatePresentationInput {
  title: string;
  description?: string;
  status?: PresentationStatus;
  theme?: Partial<PresentationTheme>;
}

export interface UpdatePresentationInput {
  title?: string;
  description?: string;
  status?: PresentationStatus;
  cover_image_url?: string;
  theme?: Partial<PresentationTheme>;
  is_public?: boolean;
}
```

---

## 🗂️ Phase 3: Zustand Store

### 3.1 Create Presentations Store

**File**: `src/stores/presentations.store.ts`

```typescript
// src/stores/presentations.store.ts
import { create } from 'zustand';
import { supabase } from '@/lib/supabase';
import type { Presentation, Template, CreatePresentationInput, UpdatePresentationInput } from '@/types/presentations.types';

type SortOption = 'recent' | 'name' | 'created';
type FilterOption = 'all' | 'drafts' | 'complete' | 'shared';

interface PresentationsStore {
  presentations: Presentation[];
  templates: Template[];
  sortBy: SortOption;
  filterBy: FilterOption;
  isLoading: boolean;
  error: string | null;

  // Actions
  fetchPresentations: () => Promise<void>;
  fetchTemplates: (limit?: number) => Promise<void>;
  setSortBy: (sort: SortOption) => void;
  setFilterBy: (filter: FilterOption) => void;
  createPresentation: (data: CreatePresentationInput) => Promise<Presentation>;
  updatePresentation: (id: string, data: UpdatePresentationInput) => Promise<Presentation>;
  duplicatePresentation: (id: string) => Promise<Presentation>;
  deletePresentation: (id: string) => Promise<void>;

  // Computed
  sortedAndFilteredPresentations: () => Presentation[];
}

export const usePresentationsStore = create<PresentationsStore>((set, get) => ({
  presentations: [],
  templates: [],
  sortBy: 'recent',
  filterBy: 'all',
  isLoading: false,
  error: null,

  fetchPresentations: async () => {
    set({ isLoading: true, error: null });
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('presentations')
        .select('*')
        .eq('user_id', user.id)
        .is('deleted_at', null)
        .order('last_edited_at', { ascending: false });

      if (error) throw error;
      set({ presentations: data || [], isLoading: false });
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },

  fetchTemplates: async (limit = 8) => {
    set({ isLoading: true, error: null });
    try {
      const { data, error } = await supabase
        .from('presentation_templates')
        .select('*')
        .order('usage_count', { ascending: false })
        .limit(limit);

      if (error) throw error;
      set({ templates: data || [], isLoading: false });
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },

  setSortBy: (sort) => set({ sortBy: sort }),
  setFilterBy: (filter) => set({ filterBy: filter }),

  createPresentation: async (data) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Not authenticated');

    const { data: newPresentation, error } = await supabase
      .from('presentations')
      .insert([{ ...data, user_id: user.id }])
      .select()
      .single();

    if (error) throw error;

    set((state) => ({
      presentations: [newPresentation, ...state.presentations],
    }));

    return newPresentation;
  },

  updatePresentation: async (id, data) => {
    const { data: updated, error } = await supabase
      .from('presentations')
      .update({ ...data, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    set((state) => ({
      presentations: state.presentations.map((p) =>
        p.id === id ? updated : p
      ),
    }));

    return updated;
  },

  duplicatePresentation: async (id) => {
    const original = get().presentations.find((p) => p.id === id);
    if (!original) throw new Error('Presentation not found');

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Not authenticated');

    const { data: duplicate, error } = await supabase
      .from('presentations')
      .insert([{
        user_id: user.id,
        title: `${original.title} (Copy)`,
        description: original.description,
        status: 'draft',
        theme: original.theme,
      }])
      .select()
      .single();

    if (error) throw error;

    set((state) => ({
      presentations: [duplicate, ...state.presentations],
    }));

    return duplicate;
  },

  deletePresentation: async (id) => {
    // Soft delete
    const { error } = await supabase
      .from('presentations')
      .update({ deleted_at: new Date().toISOString() })
      .eq('id', id);

    if (error) throw error;

    set((state) => ({
      presentations: state.presentations.filter((p) => p.id !== id),
    }));
  },

  sortedAndFilteredPresentations: () => {
    const { presentations, sortBy, filterBy } = get();

    // Filter
    let filtered = presentations;
    if (filterBy !== 'all') {
      filtered = presentations.filter((p) => {
        if (filterBy === 'drafts') return p.status === 'draft';
        if (filterBy === 'complete') return p.status === 'complete';
        if (filterBy === 'shared') return p.status === 'shared';
        return true;
      });
    }

    // Sort
    const sorted = [...filtered].sort((a, b) => {
      if (sortBy === 'recent') {
        return new Date(b.last_edited_at).getTime() - new Date(a.last_edited_at).getTime();
      }
      if (sortBy === 'name') {
        return a.title.localeCompare(b.title);
      }
      if (sortBy === 'created') {
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      }
      return 0;
    });

    return sorted;
  },
}));
```

---

## 🎨 Phase 4: Components

### Component Structure
```
src/components/presentations/
├── index.ts                       # Barrel export
├── PageHeader.tsx                 # Greeting + stats
├── PageHeader.types.ts
├── CreateNewSection.tsx           # 4 creation cards
├── CreateNewSection.types.ts
├── AIGenerateCard.tsx             # Primary CTA card
├── TemplateCard.tsx               # Template card (not creation)
├── BlankCard.tsx                  # Blank creation card
├── BudgetingCard.tsx              # Budgeting card
├── PresentationCard.tsx           # User's presentation card
├── PresentationCard.types.ts
├── MyPresentationsGrid.tsx        # Grid container
├── MyPresentationsGrid.types.ts
├── RecommendedTemplatesSection.tsx # Template showcase
├── TemplateCard.tsx (reuse)
├── EmptyState.tsx                 # No presentations state
└── SortFilterBar.tsx              # Sort/filter controls
```

### 4.1 Component Implementation Order
1. ✅ PageHeader (basic greeting)
2. ✅ PresentationCard (core card design)
3. ✅ MyPresentationsGrid (layout + cards)
4. ✅ CreateNewSection (4 creation options)
5. ✅ AIGenerateCard (primary CTA)
6. ✅ RecommendedTemplatesSection
7. ✅ EmptyState
8. ✅ SortFilterBar

---

## 📄 Phase 5: Main Page Component

### 5.1 Create MyPresentationsPage

**File**: `src/pages/MyPresentationsPage.tsx`

```typescript
// src/pages/MyPresentationsPage.tsx (Part 1)
import { useEffect } from 'react';
import { usePresentationsStore } from '@/stores/presentations.store';
import { PageHeader } from '@/components/presentations/PageHeader';
import { CreateNewSection } from '@/components/presentations/CreateNewSection';
import { MyPresentationsGrid } from '@/components/presentations/MyPresentationsGrid';
import { RecommendedTemplatesSection } from '@/components/presentations/RecommendedTemplatesSection';
import { EmptyState } from '@/components/presentations/EmptyState';

export function MyPresentationsPage() {
  const {
    presentations,
    templates,
    isLoading,
    error,
    fetchPresentations,
    fetchTemplates,
    sortedAndFilteredPresentations,
  } = usePresentationsStore();

  const sortedPresentations = sortedAndFilteredPresentations();

  useEffect(() => {
    fetchPresentations();
    fetchTemplates(8);
  }, [fetchPresentations, fetchTemplates]);

  if (isLoading && presentations.length === 0) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState error={error} />;
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <PageHeader
          userName="User" // Get from auth context
          presentationCount={presentations.length}
          lastEditedAt={presentations[0]?.last_edited_at}
        />

        <CreateNewSection className="mt-8" />

        {sortedPresentations.length > 0 ? (
          <MyPresentationsGrid
            presentations={sortedPresentations}
            className="mt-12"
          />
        ) : (
          <EmptyState
            userName="User"
            onCreateFirst={() => {/* Navigate to AI wizard */}}
            className="mt-12"
          />
        )}

        {templates.length > 0 && (
          <RecommendedTemplatesSection
            templates={templates}
            className="mt-16"
          />
        )}
      </div>
    </div>
  );
}
```

### 5.2 Add Route to App.tsx

```typescript
// src/App.tsx (add route)
import { MyPresentationsPage } from '@/pages/MyPresentationsPage';

// Inside Routes:
<Route
  path="/presentations"
  element={
    <ProtectedRoute>
      <MyPresentationsPage />
    </ProtectedRoute>
  }
/>
```

---

## 🎯 Phase 6: Implementation Checklist

### Week 1: Foundation
- [ ] Create database migration for presentations + templates tables
- [ ] Run migration on Supabase
- [ ] Seed templates table with 8+ starter templates
- [ ] Create TypeScript types file
- [ ] Create Zustand store with all actions
- [ ] Write unit tests for store

### Week 2: Components
- [ ] Build PageHeader component
- [ ] Build PresentationCard component
- [ ] Build CreateNewSection with 4 cards
- [ ] Build MyPresentationsGrid
- [ ] Build RecommendedTemplatesSection
- [ ] Build EmptyState component
- [ ] Build SortFilterBar

### Week 3: Integration & Polish
- [ ] Create MyPresentationsPage main component
- [ ] Add route to App.tsx
- [ ] Connect to Supabase API
- [ ] Implement loading states
- [ ] Implement error handling
- [ ] Add animations (card hover, transitions)
- [ ] Responsive design testing (mobile, tablet, desktop)

### Week 4: Testing & Launch
- [ ] Accessibility audit (WCAG AA)
- [ ] Keyboard navigation testing
- [ ] Screen reader testing
- [ ] Performance optimization (lazy loading, image optimization)
- [ ] Cross-browser testing
- [ ] User acceptance testing
- [ ] Deploy to production

---

## 🚀 Success Criteria

### Functional Requirements
- ✅ Users can view all their presentations in a grid
- ✅ Users can create new presentations via AI, template, or blank
- ✅ Users can sort presentations (recent, name, created)
- ✅ Users can filter presentations (all, drafts, complete, shared)
- ✅ Users can edit, duplicate, share, delete presentations
- ✅ Users can browse recommended templates

### Non-Functional Requirements
- ✅ Page loads in <2 seconds
- ✅ Smooth animations (60fps)
- ✅ WCAG AA accessibility compliance
- ✅ Mobile-responsive (works on 375px+ screens)
- ✅ Works in Chrome, Firefox, Safari, Edge

### Business Metrics
- Target: >90% of users create first presentation within 5 minutes
- Target: >80% of users create ≥1 presentation within 24 hours
- Target: >60% use AI generation (primary conversion driver)
- Target: >30% use templates

---

## 📚 Resources

### Design References
- **UI Plan**: `/home/sk/medellin-spark/main/UI/01-my-presentations-ui-plan.md`
- **Design System**: Soft Intelligence color palette (Warm Amber, Deep Indigo, Soft Slate)
- **Inspiration**: Slidebean My Presentations interface

### Technical Docs
- **Supabase Docs**: https://supabase.com/docs
- **shadcn/ui**: https://ui.shadcn.com/
- **Zustand**: https://zustand-demo.pmnd.rs/
- **React Query**: https://tanstack.com/query/latest

---

**Document Status**: ✅ Complete
**Ready for Implementation**: YES
**Estimated Timeline**: 4 weeks
**Next Step**: Create database migration

---
