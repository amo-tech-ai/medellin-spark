# AI Pitch Deck Creator - Implementation Plan
**Standalone URL Implementation**
**Date:** October 9, 2025

---

## 🎯 Goal

Create a standalone AI pitch deck creator that:
- Lives at `/pitch-deck-creator`
- Works independently OR as part of wizard
- Can be accessed from multiple entry points
- Uses existing wizard data when available

---

## 📍 URL Structure

### Primary Route
```
/pitch-deck-creator
```

### Query Parameters
```
/pitch-deck-creator?startupId=xxx     # Pre-fill with specific startup
/pitch-deck-creator?mode=wizard       # Wizard integration mode
/pitch-deck-creator?template=funding  # Start with specific template
```

### Integration Points
```
Dashboard → "Create Pitch Deck" button → /pitch-deck-creator
Wizard Stage 9 → Embedded iframe OR redirect → /pitch-deck-creator?startupId=xxx&mode=wizard
Startup Detail → "Generate Pitch Deck" → /pitch-deck-creator?startupId=xxx
```

---

## 🏗️ File Structure

```
src/
├── pages/
│   ├── PitchDeckCreator.tsx              # Main standalone page
│   └── wizard/
│       └── Stage9PitchDeck.tsx           # Wizard integration (optional)
│
├── components/
│   └── pitch-deck/
│       ├── ChatInterface.tsx             # Main chat UI
│       ├── QuickOptions.tsx              # Icon-based options
│       ├── TemplateGallery.tsx           # Template selector
│       ├── SlidePreview.tsx              # Real-time preview
│       ├── GenerationProgress.tsx        # Loading states
│       ├── DeckControls.tsx              # Edit/Export controls
│       └── StartupSelector.tsx           # Select which startup to use
│
├── hooks/
│   ├── usePitchDeckGenerator.ts          # AI generation logic
│   ├── useDeckTemplates.ts               # Template management
│   └── usePDFExport.ts                   # Export functionality
│
└── lib/
    └── pitch-deck/
        ├── deckGenerator.ts              # AI prompt engineering
        ├── slideTemplates.ts             # Slide definitions
        └── pdfRenderer.ts                # PDF generation
```

---

## 🔀 Route Configuration

### Update App.tsx

```typescript
// Add to routes in src/App.tsx

import PitchDeckCreator from "@/pages/PitchDeckCreator";

// In routes array:
{
  path: "/pitch-deck-creator",
  element: (
    <ProtectedRoute>
      <PitchDeckCreator />
    </ProtectedRoute>
  ),
},
```

### Navigation Updates

**Add to Dashboard:**
```typescript
// src/pages/Dashboard.tsx
<Button onClick={() => navigate('/pitch-deck-creator')}>
  <Presentation className="mr-2" />
  Create Pitch Deck
</Button>
```

**Add to Header (logged in users):**
```typescript
// src/components/layout/Header.tsx
<NavLink to="/pitch-deck-creator">
  <Presentation className="h-4 w-4" />
  Pitch Deck
</NavLink>
```

**Add to Startup Card:**
```typescript
// src/components/dashboard/StartupCard.tsx
<Button
  variant="outline"
  onClick={() => navigate(`/pitch-deck-creator?startupId=${startup.id}`)}
>
  Generate Pitch Deck
</Button>
```

---

## 💾 Database Schema

### Existing Table (if needed)

```sql
CREATE TABLE IF NOT EXISTS pitch_decks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  startup_profile_id UUID REFERENCES startup_profiles(id) ON DELETE CASCADE,

  title TEXT NOT NULL DEFAULT 'Untitled Pitch Deck',
  description TEXT,
  template_type TEXT DEFAULT 'standard',

  -- Configuration
  slide_count INTEGER DEFAULT 10,
  presentation_goal TEXT,  -- 'funding', 'recruiting', 'launch', 'partnership'
  audience_type TEXT,      -- 'vcs', 'angels', 'corporate', 'accelerators'
  style_preference TEXT,   -- 'modern', 'data-driven', 'storytelling', 'minimal'

  -- Content
  slides JSONB NOT NULL DEFAULT '[]',
  metadata JSONB DEFAULT '{}',

  -- Export
  pdf_url TEXT,
  pptx_url TEXT,
  is_public BOOLEAN DEFAULT false,

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  -- RLS
  CONSTRAINT valid_slides CHECK (jsonb_array_length(slides) > 0)
);

-- RLS Policies
ALTER TABLE pitch_decks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own pitch decks"
  ON pitch_decks FOR SELECT
  USING (auth.uid() = profile_id);

CREATE POLICY "Users can create pitch decks"
  ON pitch_decks FOR INSERT
  WITH CHECK (auth.uid() = profile_id);

CREATE POLICY "Users can update own pitch decks"
  ON pitch_decks FOR UPDATE
  USING (auth.uid() = profile_id);

CREATE POLICY "Users can delete own pitch decks"
  ON pitch_decks FOR DELETE
  USING (auth.uid() = profile_id);

-- Indexes
CREATE INDEX idx_pitch_decks_profile ON pitch_decks(profile_id);
CREATE INDEX idx_pitch_decks_startup ON pitch_decks(startup_profile_id);
```

---

## 🎨 Main Page Component

### src/pages/PitchDeckCreator.tsx

```typescript
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useDashboard } from "@/hooks/useDashboard";
import { usePitchDeckGenerator } from "@/hooks/usePitchDeckGenerator";

import ChatInterface from "@/components/pitch-deck/ChatInterface";
import QuickOptions from "@/components/pitch-deck/QuickOptions";
import TemplateGallery from "@/components/pitch-deck/TemplateGallery";
import SlidePreview from "@/components/pitch-deck/SlidePreview";
import StartupSelector from "@/components/pitch-deck/StartupSelector";
import GenerationProgress from "@/components/pitch-deck/GenerationProgress";

export default function PitchDeckCreator() {
  const [searchParams] = useSearchParams();
  const { user } = useAuth();
  const { startups } = useDashboard();

  // Get startup from URL or user selection
  const urlStartupId = searchParams.get("startupId");
  const [selectedStartup, setSelectedStartup] = useState(null);

  const {
    generateDeck,
    isGenerating,
    currentDeck,
    slides,
    updateSlide,
    exportToPDF,
  } = usePitchDeckGenerator();

  useEffect(() => {
    // Auto-select startup if provided in URL
    if (urlStartupId && startups.length > 0) {
      const startup = startups.find(s => s.id === urlStartupId);
      setSelectedStartup(startup);
    }
  }, [urlStartupId, startups]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                AI Pitch Deck Creator
              </h1>
              <p className="text-muted-foreground mt-1">
                Turn your startup story into a compelling presentation
              </p>
            </div>

            {/* Startup Selector */}
            {!selectedStartup && startups.length > 0 && (
              <StartupSelector
                startups={startups}
                onSelect={setSelectedStartup}
              />
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left: Chat Interface */}
          <div className="space-y-6">
            <ChatInterface
              startup={selectedStartup}
              onGenerate={generateDeck}
              isGenerating={isGenerating}
            />

            <QuickOptions
              startup={selectedStartup}
              onOptionSelect={(option) => {
                // Auto-fill chat based on selected option
              }}
            />

            <TemplateGallery
              onTemplateSelect={(template) => {
                generateDeck({ template, startup: selectedStartup });
              }}
            />
          </div>

          {/* Right: Preview */}
          <div className="lg:sticky lg:top-24 lg:h-[calc(100vh-8rem)]">
            {isGenerating ? (
              <GenerationProgress />
            ) : slides.length > 0 ? (
              <SlidePreview
                slides={slides}
                onSlideUpdate={updateSlide}
                onExport={exportToPDF}
              />
            ) : (
              <EmptyState startup={selectedStartup} />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

// Empty state when no deck generated yet
function EmptyState({ startup }) {
  return (
    <div className="h-full flex items-center justify-center border-2 border-dashed border-border rounded-lg p-12">
      <div className="text-center space-y-4">
        <Presentation className="h-16 w-16 mx-auto text-muted-foreground" />
        <h3 className="text-xl font-semibold">No deck yet</h3>
        <p className="text-muted-foreground max-w-sm">
          {startup
            ? "Use the chat interface to customize your pitch deck, or choose a quick template to get started."
            : "Select a startup to begin creating your pitch deck."
          }
        </p>
      </div>
    </div>
  );
}
```

---

## 🔗 Integration with Wizard Stage 9

### Option A: Redirect to Standalone Page

```typescript
// src/pages/wizard/Stage9PitchDeck.tsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useStartupWizard } from "@/hooks/useStartupWizard";

export default function Stage9PitchDeck() {
  const navigate = useNavigate();
  const { profile } = useStartupWizard();

  useEffect(() => {
    // Redirect to standalone page with startup ID
    if (profile?.id) {
      navigate(`/pitch-deck-creator?startupId=${profile.id}&mode=wizard`, {
        replace: true
      });
    }
  }, [profile?.id, navigate]);

  return (
    <div className="flex items-center justify-center h-96">
      <div className="text-center">
        <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
        <p>Redirecting to Pitch Deck Creator...</p>
      </div>
    </div>
  );
}
```

### Option B: Embedded in Wizard

```typescript
// src/pages/wizard/Stage9PitchDeck.tsx
import { WizardLayout } from "@/components/wizard/WizardLayout";
import ChatInterface from "@/components/pitch-deck/ChatInterface";
import { useStartupWizard } from "@/hooks/useStartupWizard";

export default function Stage9PitchDeck() {
  const { profile } = useStartupWizard();

  return (
    <WizardLayout
      title="Create Your Pitch Deck"
      description="Generate a professional pitch deck with AI"
      currentStage={9}
      totalStages={10}
    >
      <div className="max-w-4xl mx-auto">
        <ChatInterface
          startup={profile}
          mode="wizard"
          onComplete={() => {
            // Mark stage complete and navigate to stage 10
          }}
        />
      </div>
    </WizardLayout>
  );
}
```

---

## 🎣 Custom Hook: usePitchDeckGenerator

### src/hooks/usePitchDeckGenerator.ts

```typescript
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

interface GenerateDeckOptions {
  startup: StartupProfile;
  template?: string;
  goal?: string;
  audience?: string;
  style?: string;
  customPrompt?: string;
}

export const usePitchDeckGenerator = () => {
  const { getToken } = useAuth();
  const { toast } = useToast();

  const [isGenerating, setIsGenerating] = useState(false);
  const [currentDeck, setCurrentDeck] = useState(null);
  const [slides, setSlides] = useState([]);

  const generateDeck = async (options: GenerateDeckOptions) => {
    setIsGenerating(true);

    try {
      const token = await getToken({ template: "supabase" });

      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/generate-pitch-deck`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(options),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to generate deck");
      }

      const data = await response.json();

      setCurrentDeck(data.deck);
      setSlides(data.deck.slides);

      toast({
        title: "Success!",
        description: "Your pitch deck has been generated",
      });

      return data.deck;
    } catch (error) {
      console.error("Generation error:", error);
      toast({
        title: "Error",
        description: "Failed to generate pitch deck",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsGenerating(false);
    }
  };

  const updateSlide = async (slideIndex: number, updates: any) => {
    const updatedSlides = [...slides];
    updatedSlides[slideIndex] = { ...updatedSlides[slideIndex], ...updates };
    setSlides(updatedSlides);
  };

  const exportToPDF = async () => {
    try {
      const token = await getToken({ template: "supabase" });

      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/export-deck-pdf`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ deckId: currentDeck.id }),
        }
      );

      if (!response.ok) {
        throw new Error("Export failed");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${currentDeck.title}.pdf`;
      a.click();

      toast({
        title: "Downloaded!",
        description: "Your pitch deck has been exported",
      });
    } catch (error) {
      console.error("Export error:", error);
      toast({
        title: "Error",
        description: "Failed to export PDF",
        variant: "destructive",
      });
    }
  };

  return {
    generateDeck,
    isGenerating,
    currentDeck,
    slides,
    updateSlide,
    exportToPDF,
  };
};
```

---

## 📋 Implementation Checklist

### Phase 1: Foundation (Week 1)
- [ ] Create `/pitch-deck-creator` route in App.tsx
- [ ] Build PitchDeckCreator.tsx main page
- [ ] Create ChatInterface component
- [ ] Create QuickOptions component
- [ ] Create StartupSelector component
- [ ] Add navigation links from Dashboard

### Phase 2: AI Generation (Week 2)
- [ ] Create Edge Function: `generate-pitch-deck`
- [ ] Implement usePitchDeckGenerator hook
- [ ] Create slide templates
- [ ] Build GenerationProgress component
- [ ] Add error handling

### Phase 3: Preview & Edit (Week 3)
- [ ] Create SlidePreview component
- [ ] Implement slide editing
- [ ] Add TemplateGallery
- [ ] Build DeckControls
- [ ] Real-time preview updates

### Phase 4: Export & Polish (Week 4)
- [ ] Create Edge Function: `export-deck-pdf`
- [ ] Implement PDF generation
- [ ] Add database persistence
- [ ] Wizard integration (Stage 9)
- [ ] Testing & optimization

---

## 🚀 Quick Start Commands

```bash
# Create main page
touch src/pages/PitchDeckCreator.tsx

# Create components directory
mkdir -p src/components/pitch-deck
touch src/components/pitch-deck/ChatInterface.tsx
touch src/components/pitch-deck/QuickOptions.tsx
touch src/components/pitch-deck/TemplateGallery.tsx
touch src/components/pitch-deck/SlidePreview.tsx
touch src/components/pitch-deck/GenerationProgress.tsx
touch src/components/pitch-deck/StartupSelector.tsx

# Create hooks
touch src/hooks/usePitchDeckGenerator.ts
touch src/hooks/useDeckTemplates.ts
touch src/hooks/usePDFExport.ts

# Create edge functions
mkdir -p supabase/functions/generate-pitch-deck
mkdir -p supabase/functions/export-deck-pdf
```

---

## 🔄 User Flows

### Flow 1: From Dashboard
```
Dashboard
  → Click "Create Pitch Deck"
  → /pitch-deck-creator
  → Select startup from dropdown
  → Customize options
  → Generate
  → Edit slides
  → Export PDF
```

### Flow 2: From Wizard Stage 9
```
Wizard Stage 8 (Complete)
  → Navigate to Stage 9
  → Redirect to /pitch-deck-creator?startupId=xxx&mode=wizard
  → Auto-load startup data
  → Quick generate OR customize
  → Export PDF
  → Return to wizard (Stage 10)
```

### Flow 3: From Startup Card
```
Dashboard → Startup List
  → Click "Generate Pitch Deck" on specific startup
  → /pitch-deck-creator?startupId=xxx
  → Auto-loaded with startup data
  → Generate
  → Export
```

---

**Status:** 📝 Implementation Plan Complete
**Next:** Review plan → Begin Phase 1 implementation
**Timeline:** 4 weeks to MVP

_"Make it simple, but significant." - Don Draper_
