# 🚀 Startup Perks Onboarding Wizard - Implementation Plan
**Project**: AI-Powered Startup-to-Perks Matching System  
**Architecture**: CopilotKit State Machine Pattern  
**Status**: Planning Phase  
**Created**: 2025-10-06  

---

## 📊 EXECUTIVE SUMMARY

This document outlines the complete implementation plan for an intelligent **Startup Perks Onboarding Wizard** that guides founders through a 7-stage journey to discover and claim personalized partner perks based on their startup profile.

### Key Features
- 🧠 AI-powered perk recommendation engine
- 🔀 Dynamic branching based on startup stage
- 📊 Intelligent scoring system for perk relevance
- 🎯 Contextual partner mapping (Azure, HubSpot, Stripe, etc.)
- 💾 Full database persistence
- 🎨 Breef-inspired responsive UI

---

## ✅ CURRENT STATE ANALYSIS

### 🟢 COMPLETED INFRASTRUCTURE (100%)

#### 1. CopilotKit Foundation ✅
**Location**: `supabase/functions/copilotkit/index.ts`  
**Status**: Production-ready, CORS configured  

```typescript
✅ Edge function deployed
✅ Lovable AI Gateway integration
✅ Model: google/gemini-2.5-flash
✅ CORS headers properly configured
✅ Health check endpoint: /health
✅ GraphQL handshake support
```

**Verification**: Tested with Events Wizard (6 stages, fully functional)

---

#### 2. Wizard State Machine Pattern ✅
**Location**: `src/hooks/useWizardState.ts`  
**Status**: Production-verified across 4 wizards  

```typescript
✅ Multi-wizard support (events, projects, jobs, profile)
✅ Database persistence via wizard_sessions table
✅ Auto-save with 2-second debounce
✅ Stage transitions with history tracking
✅ RLS policies secure and working
✅ Loading states and error handling
```

**Pattern Proven**: Successfully powers Events (6 stages), Projects (3 stages), Jobs (4 stages), Profile (3 stages)

---

#### 3. Database Schema ✅
**Table**: `wizard_sessions`  
**Status**: Active and tested  

```sql
✅ Supports multiple wizard types via wizard_type column
✅ JSON storage for draft_data
✅ RLS policies: users can only access their own sessions
✅ Auto-update trigger for updated_at
✅ Indexed on user_id and wizard_type
```

**Missing**: `startup_profiles` table (see [TODO] section)

---

#### 4. Perks Infrastructure ✅
**Tables**: `perks`, `saved_perks`, `perk_claims`  
**Status**: Functional with UI  

```typescript
✅ Perks directory with search/filter (/perks)
✅ Detailed perk pages (/perks/:id)
✅ Save/unsave functionality
✅ Member dashboard (/dashboard/perks)
✅ Redeemed perks tracking
```

**Gap**: No AI recommendation system or scoring engine yet

---

#### 5. Shared UI Components ✅
**Location**: `src/components/wizard/`, `src/components/dashboard/`  
**Status**: Reusable and styled  

```typescript
✅ WizardNavigation - Forward/back buttons
✅ WizardStepper - Progress indicator
✅ StatCard - Dashboard metrics
✅ SavedPerkCard - Saved perks display
✅ RedeemedPerkCard - Claimed perks display
```

**Design System**: Breef-inspired color palette applied

---

### 🟡 IN PROGRESS (0%)

**Nothing currently in progress for Perks Wizard**

---

### 🔴 NEEDS TO BE COMPLETED

#### 1. New Wizard Type Definition ❌
**File**: `src/types/wizard.ts`  
**Required Changes**:
```typescript
// Add to WizardType
export type WizardType = "profile" | "events" | "projects" | "accelerator" | "startup-perks";

// Add new enum
export enum StartupPerksStage {
  StartupBasics = "StartupBasics",
  ProductOverview = "ProductOverview", 
  TechStack = "TechStack",
  GrowthGoals = "GrowthGoals",
  AIAnalysis = "AIAnalysis",
  Recommendations = "Recommendations",
  Summary = "Summary",
}

// Extend WizardStateData
export interface WizardStateData {
  // ... existing fields
  
  // Startup Perks Wizard
  startupName?: string;
  startupIndustry?: string;
  startupCountry?: string;
  startupTeamSize?: number;
  startupStage?: "idea" | "mvp" | "early" | "growth" | "scale";
  
  productDescription?: string;
  productCategory?: string; // AI-generated
  
  techStack?: string[]; // e.g., ["React", "Supabase", "Stripe"]
  cloudProvider?: string; // e.g., "AWS", "Azure", "GCP"
  
  growthGoals?: string[]; // e.g., ["scale_customers", "optimize_infra"]
  currentChallenges?: string[];
  
  perkRecommendations?: PerkRecommendation[];
  totalPerkValue?: number;
}

export interface PerkRecommendation {
  perkId: string;
  partnerName: string;
  score: number; // 0-100
  reason: string;
  category: string;
  valueUsd: number;
}
```

**Estimate**: 30 minutes

---

#### 2. Database Schema: startup_profiles ❌
**Table**: New table needed  
**Purpose**: Store analyzed startup data and recommendations  

```sql
CREATE TABLE IF NOT EXISTS public.startup_profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  
  -- Basic Info
  name text NOT NULL,
  industry text,
  country text,
  team_size integer,
  stage text, -- idea | mvp | early | growth | scale
  
  -- Product
  product_description text,
  product_category text, -- AI-classified
  
  -- Tech Stack
  tech_stack jsonb DEFAULT '[]'::jsonb,
  cloud_provider text,
  
  -- Goals
  growth_goals text[],
  current_challenges text[],
  
  -- AI Analysis
  perk_recommendations jsonb DEFAULT '[]'::jsonb,
  total_perk_value numeric DEFAULT 0,
  analysis_metadata jsonb, -- Store AI reasoning
  
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  
  UNIQUE(profile_id) -- One profile per user
);

-- RLS Policies
ALTER TABLE public.startup_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own startup profile"
  ON public.startup_profiles FOR SELECT
  USING (profile_id IN (SELECT id FROM profiles WHERE user_id = auth.uid()));

CREATE POLICY "Users can insert own startup profile"
  ON public.startup_profiles FOR INSERT
  WITH CHECK (profile_id IN (SELECT id FROM profiles WHERE user_id = auth.uid()));

CREATE POLICY "Users can update own startup profile"
  ON public.startup_profiles FOR UPDATE
  USING (profile_id IN (SELECT id FROM profiles WHERE user_id = auth.uid()));

-- Auto-update trigger
CREATE TRIGGER update_startup_profiles_updated_at
  BEFORE UPDATE ON public.startup_profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();
```

**Estimate**: 15 minutes (migration)

---

#### 3. AI Perk Scoring Engine ❌
**File**: `src/lib/perkScoring.ts` (new)  
**Purpose**: Score and rank perks based on startup profile  

```typescript
export interface StartupProfile {
  industry: string;
  stage: string;
  techStack: string[];
  growthGoals: string[];
  cloudProvider?: string;
}

export interface ScoredPerk {
  perkId: string;
  partnerName: string;
  score: number; // 0-100
  reason: string;
  category: string;
  relevanceFactors: string[];
}

export async function scorePerkRelevance(
  startup: StartupProfile,
  perks: any[]
): Promise<ScoredPerk[]> {
  // Call Lovable AI to analyze and score perks
  const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/analyze-perks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
    },
    body: JSON.stringify({ startup, perks }),
  });
  
  const { recommendations } = await response.json();
  return recommendations;
}
```

**Dependencies**: New edge function `analyze-perks`

**Estimate**: 2 hours

---

#### 4. Edge Function: analyze-perks ❌
**File**: `supabase/functions/analyze-perks/index.ts` (new)  
**Purpose**: AI-powered perk analysis and scoring  

```typescript
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

serve(async (req) => {
  const { startup, perks } = await req.json();
  
  const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
  
  const prompt = `You are an expert startup advisor analyzing which partner perks would be most valuable.

Startup Profile:
- Industry: ${startup.industry}
- Stage: ${startup.stage}
- Tech Stack: ${startup.techStack.join(", ")}
- Growth Goals: ${startup.growthGoals.join(", ")}

Available Perks:
${perks.map((p: any) => `- ${p.company_name}: ${p.description}`).join("\n")}

Task: Rank the top 5 most relevant perks with scores (0-100) and specific reasoning why each fits this startup's needs.

Return JSON: { "recommendations": [{ "perkId", "score", "reason", "relevanceFactors": [] }] }`;

  const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${LOVABLE_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "google/gemini-2.5-flash",
      messages: [{ role: "user", content: prompt }],
    }),
  });
  
  const data = await response.json();
  const content = data.choices[0].message.content;
  
  // Parse JSON from AI response
  const recommendations = JSON.parse(content);
  
  return new Response(JSON.stringify(recommendations), {
    headers: { "Content-Type": "application/json" },
  });
});
```

**Estimate**: 1 hour

---

#### 5. Stage Hooks (7 stages) ❌
**Location**: `src/hooks/stages/perks/`  
**Files to Create**:

1. `useStartupBasicsStage.ts` - Capture company info
2. `useProductOverviewStage.ts` - Describe product, AI classify
3. `useTechStackStage.ts` - Select technologies
4. `useGrowthGoalsStage.ts` - Identify priorities
5. `useAIAnalysisStage.ts` - Trigger scoring engine
6. `useRecommendationsStage.ts` - Display ranked perks
7. `useSummaryStage.ts` - Final review & save

**Example Structure** (per hook):
```typescript
export function useStartupBasicsStage(
  currentStage: StartupPerksStage,
  data: WizardStateData,
  updateData: (updates: Partial<WizardStateData>) => void,
  goToNext: () => void
) {
  const isActive = currentStage === StartupPerksStage.StartupBasics;

  useCopilotAdditionalInstructions({
    instructions: `Help the user provide their startup's basic information...`,
    available: isActive ? "available" : "disabled",
  });

  useCopilotAction({
    name: "setStartupInfo",
    description: "Update startup basic information",
    parameters: [
      { name: "name", type: "string", required: true },
      { name: "industry", type: "string", required: true },
      { name: "stage", type: "string", required: true },
    ],
    handler: async ({ name, industry, stage }) => {
      updateData({ startupName: name, startupIndustry: industry, startupStage: stage });
      return "Startup info updated";
    },
    available: isActive ? "available" : "disabled",
  });

  const canAdvance = () => {
    return !!(data.startupName && data.startupIndustry && data.startupStage);
  };

  return { canAdvance };
}
```

**Estimate**: 6 hours (all 7 stages)

---

#### 6. UI Pages (7 pages) ❌
**Location**: `src/pages/wizard/perks/`  
**Files to Create**:

1. `StartupBasics.tsx` - Form: name, industry, team size, country, stage
2. `ProductOverview.tsx` - Textarea for description, AI classification display
3. `TechStack.tsx` - Multi-select tech chips (React, Supabase, Stripe, etc.)
4. `GrowthGoals.tsx` - Checkbox list of goals (scale, optimize, automate, etc.)
5. `AIAnalysis.tsx` - Loading animation → show analysis results
6. `Recommendations.tsx` - Ranked perk cards with relevance scores
7. `Summary.tsx` - Full profile review, save to database button

**Example UI Component**:
```tsx
export default function StartupBasics() {
  const { data, updateData, goToNext, goToPrevious, currentStage } = 
    useWizardState(StartupPerksStage.StartupBasics, "startup-perks");
  
  const { canAdvance } = useStartupBasicsStage(currentStage, data, updateData, goToNext);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <WizardStepper currentStep={1} totalSteps={7} />
      
      <Card>
        <CardContent className="p-8">
          <h2 className="text-2xl font-semibold mb-6">Tell us about your startup</h2>
          
          <div className="space-y-4">
            <div>
              <Label>Startup Name</Label>
              <Input
                value={data.startupName || ""}
                onChange={(e) => updateData({ startupName: e.target.value })}
                placeholder="e.g., Acme AI Tools"
              />
            </div>
            
            {/* More fields... */}
          </div>
        </CardContent>
      </Card>

      <WizardNavigation
        onNext={goToNext}
        onBack={goToPrevious}
        disabled={!canAdvance()}
      />
    </div>
  );
}
```

**Estimate**: 8 hours (all 7 pages with styling)

---

#### 7. Wizard Container ❌
**File**: `src/pages/wizard/PerksWizardContainer.tsx` (new)  
**Purpose**: Orchestrate the 7-stage perks wizard  

```typescript
import { useCopilotReadable } from "@copilotkit/react-core";
import { useWizardState } from "@/hooks/useWizardState";
import { StartupPerksStage } from "@/types/wizard";
import { useStartupBasicsStage } from "@/hooks/stages/perks/useStartupBasicsStage";
// ... import all 7 stage hooks

export function PerksWizardContainer() {
  const {
    currentStage,
    data,
    updateData,
    goToNext,
    goToPrevious,
    reset,
  } = useWizardState(StartupPerksStage.StartupBasics, "startup-perks");

  // Global context
  useCopilotReadable({
    description: "Startup perks wizard state",
    value: { currentStage, data },
  });

  // Initialize all 7 stage hooks
  useStartupBasicsStage(currentStage, data, updateData, goToNext);
  useProductOverviewStage(currentStage, data, updateData, goToNext);
  useTechStackStage(currentStage, data, updateData, goToNext);
  useGrowthGoalsStage(currentStage, data, updateData, goToNext);
  useAIAnalysisStage(currentStage, data, updateData, goToNext);
  useRecommendationsStage(currentStage, data, updateData, goToNext);
  useSummaryStage(currentStage, data, goToPrevious, reset);

  return (
    <ErrorBoundary>
      {renderStage(currentStage, data, updateData, goToNext, goToPrevious)}
    </ErrorBoundary>
  );
}
```

**Estimate**: 1 hour

---

#### 8. Routing ❌
**File**: `src/App.tsx`  
**Required Changes**: Add routes for perks wizard  

```typescript
<Route path="/wizard/perks/startup-basics" element={<StartupBasics />} />
<Route path="/wizard/perks/product-overview" element={<ProductOverview />} />
<Route path="/wizard/perks/tech-stack" element={<TechStack />} />
<Route path="/wizard/perks/growth-goals" element={<GrowthGoals />} />
<Route path="/wizard/perks/ai-analysis" element={<AIAnalysis />} />
<Route path="/wizard/perks/recommendations" element={<Recommendations />} />
<Route path="/wizard/perks/summary" element={<Summary />} />
```

**Estimate**: 15 minutes

---

#### 9. Dynamic Branching Logic ❌
**File**: `src/lib/wizardBranching.ts` (new)  
**Purpose**: Adapt wizard flow based on startup stage  

```typescript
export function getNextStage(
  current: StartupPerksStage,
  data: WizardStateData
): StartupPerksStage {
  // Example branching logic
  if (current === StartupPerksStage.GrowthGoals) {
    if (data.startupStage === "idea" || data.startupStage === "mvp") {
      // Early-stage: skip some analysis, show basic perks
      return StartupPerksStage.Recommendations;
    } else {
      // Growth/Scale: full AI analysis
      return StartupPerksStage.AIAnalysis;
    }
  }
  
  // Default: linear progression
  const stageOrder = Object.values(StartupPerksStage);
  const currentIndex = stageOrder.indexOf(current);
  return stageOrder[currentIndex + 1];
}
```

**Estimate**: 1 hour

---

#### 10. Partner Data Integration ❌
**File**: `src/lib/partnerData.ts` (new)  
**Purpose**: Define partner metadata for AI mapping  

```typescript
export const PARTNERS = {
  azure: {
    id: "azure",
    name: "Microsoft Azure",
    categories: ["cloud", "compute", "ai"],
    bestFor: ["ai-startups", "data-intensive", "enterprise"],
    requiresTech: ["cloud"],
  },
  hubspot: {
    id: "hubspot",
    name: "HubSpot",
    categories: ["crm", "marketing", "sales"],
    bestFor: ["b2b", "saas", "growth-stage"],
    requiresTech: [],
  },
  // ... other partners
};

export function matchPartnersToStartup(profile: StartupProfile): string[] {
  // Logic to match partners based on profile
  return ["azure", "hubspot", "stripe"]; // Example
}
```

**Estimate**: 1 hour

---

## 📈 IMPLEMENTATION PHASES

### Phase 1: Foundation (3 hours)
- [ ] Update `wizard.ts` types (30 min)
- [ ] Create `startup_profiles` migration (15 min)
- [ ] Deploy migration and verify (15 min)
- [ ] Create `perkScoring.ts` skeleton (30 min)
- [ ] Create `analyze-perks` edge function (1 hour)
- [ ] Test edge function with sample data (30 min)

### Phase 2: Stage Hooks (6 hours)
- [ ] Create all 7 stage hooks with CopilotKit integration
- [ ] Add validation logic for each stage
- [ ] Test hooks in isolation

### Phase 3: UI Components (8 hours)
- [ ] Build all 7 page components
- [ ] Style with Breef design system
- [ ] Add animations and transitions
- [ ] Responsive mobile layouts

### Phase 4: Wizard Container (2 hours)
- [ ] Create `PerksWizardContainer.tsx`
- [ ] Wire up all stage hooks
- [ ] Add routing in `App.tsx`
- [ ] Test full navigation flow

### Phase 5: AI Integration (3 hours)
- [ ] Implement dynamic branching
- [ ] Connect perk scoring to UI
- [ ] Test AI recommendations
- [ ] Refine prompts based on results

### Phase 6: Database Integration (2 hours)
- [ ] Connect Summary stage to save profile
- [ ] Test data persistence
- [ ] Verify RLS policies
- [ ] Add error handling

### Phase 7: Testing & Polish (4 hours)
- [ ] End-to-end wizard flow
- [ ] Mobile responsiveness
- [ ] Error states and edge cases
- [ ] Performance optimization
- [ ] Analytics integration

**Total Estimate**: 28 hours (~3.5 days)

---

## 🎯 SUCCESS CRITERIA

### Functionality
- ✅ User can complete all 7 stages without errors
- ✅ AI generates personalized perk recommendations
- ✅ Dynamic branching adapts to startup stage
- ✅ Data persists to `startup_profiles` table
- ✅ Recommendations display with relevance scores

### UX
- ✅ Wizard is responsive on mobile, tablet, desktop
- ✅ Smooth transitions between stages
- ✅ Clear progress indicator
- ✅ Helpful AI assistance at each stage
- ✅ Loading states during AI analysis

### Performance
- ✅ AI scoring completes in < 5 seconds
- ✅ Page transitions are instant
- ✅ No console errors
- ✅ Auto-save works reliably

### Security
- ✅ RLS policies prevent unauthorized access
- ✅ Input validation on all fields
- ✅ SQL injection protection
- ✅ XSS prevention

---

## 🔗 INTEGRATION POINTS

### Existing Systems
1. **Perks Directory** (`/perks`) - Recommendations link to detail pages
2. **Member Dashboard** (`/dashboard/perks`) - Show completed profiles
3. **Auth System** (Clerk) - User identification for profiles
4. **Analytics** - Track wizard completion rates

### New Connections
1. **Startup Profile** → **Saved Perks** (auto-save top recommendations)
2. **AI Analysis** → **Perk Claims** (one-click claim from wizard)
3. **Summary** → **Member Dashboard** (redirect after completion)

---

## 📊 METRICS TO TRACK

| Metric | Target | Measurement |
|--------|--------|-------------|
| Wizard Completion Rate | > 70% | Users reaching stage 7 |
| Average Time to Complete | < 15 min | Start to finish |
| AI Recommendation Accuracy | > 80% | User saves ≥3 recommendations |
| Claimed Perks from Wizard | > 40% | Claims within 7 days |
| Mobile Completion Rate | > 60% | Completions on mobile |

---

## 🚨 RISKS & MITIGATION

| Risk | Impact | Mitigation |
|------|--------|------------|
| AI takes too long | High | Add loading state, cache results |
| Low recommendation accuracy | Medium | Refine prompts, add user feedback loop |
| Users abandon mid-wizard | Medium | Add save/resume, email reminders |
| Mobile UX issues | Medium | Prioritize mobile testing |
| Database migration failure | Low | Test in staging first |

---

## 📝 NEXT STEPS

1. **Approve Plan** - Review and confirm approach
2. **Create Tickets** - Break down into smaller tasks
3. **Start Phase 1** - Foundation work (types, database)
4. **Daily Progress Reviews** - Track against estimate
5. **User Testing** - Beta test with 5-10 founders

---

## 📚 REFERENCE DOCUMENTS

- [Wizard Master Plan Verified](../WIZARD_MASTER_PLAN_VERIFIED.md)
- [CopilotKit State Machine Cookbook](https://docs.copilotkit.ai/coagents/cookbook/state-machines)
- [Breef Design Analysis](../022-BREEF_DESIGN_ANALYSIS.md)
- [Perks Search Implementation](../021-DESIGN_GUIDE.md)

---

**Document Status**: ✅ Complete  
**Last Updated**: 2025-10-06  
**Owner**: AI Development Team  
**Review Date**: After Phase 1 completion
