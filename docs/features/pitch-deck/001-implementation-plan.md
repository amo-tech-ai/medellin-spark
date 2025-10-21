# Pitch Deck Feature Implementation Plan
## Converting Presentation AI to Medellin AI Hub

**Target**: Stage 9 of Startup Wizard - AI-Powered Pitch Deck Generation
**Stack**: Vite + React + TypeScript + Supabase + Lovable AI
**Reference**: AllWeOne presentation-ai (Next.js → Vite conversion)
**AI Model**: Gemini 2.5 Flash via Lovable AI Gateway

---

## Executive Summary

This plan outlines a **3-phase approach** to build an AI-powered pitch deck generation feature by adapting patterns from the AllWeOne presentation-ai repository to our Vite/React/Supabase stack. Total estimated time: **12-16 hours**.

**Core Philosophy**: Simple MVP first, then enhance. Follow Lovable AI best practices for 99.7% time savings.

---

## Phase 1: MVP Core Features (6-8 hours)

### 1.1 Database Schema Setup (1 hour)

**Create `pitch_decks` table in Supabase:**

```sql
-- pitch_decks table
create table pitch_decks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  startup_id uuid references startups(id) on delete cascade,

  -- Content
  title text not null default 'Untitled Pitch Deck',
  template_type text not null default '10-slide-standard',
  slides jsonb not null default '[]'::jsonb,
  raw_input text,

  -- Metadata
  language text not null default 'en',
  style text not null default 'modern',
  status text not null default 'draft' check (status in ('draft', 'generating', 'ready', 'error')),

  -- AI Generation
  generation_prompt text,
  ai_model text default 'gemini-2.5-flash',

  -- Timestamps
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  generated_at timestamptz
);

-- Enable RLS
alter table pitch_decks enable row level security;

-- RLS Policies
create policy "Users can view own pitch decks"
  on pitch_decks for select
  using (auth.uid() = user_id);

create policy "Users can create own pitch decks"
  on pitch_decks for insert
  with check (auth.uid() = user_id);

create policy "Users can update own pitch decks"
  on pitch_decks for update
  using (auth.uid() = user_id);

create policy "Users can delete own pitch decks"
  on pitch_decks for delete
  using (auth.uid() = user_id);

-- Indexes
create index pitch_decks_user_id_idx on pitch_decks(user_id);
create index pitch_decks_startup_id_idx on pitch_decks(startup_id);
create index pitch_decks_status_idx on pitch_decks(status);

-- Updated timestamp trigger
create trigger update_pitch_decks_updated_at
  before update on pitch_decks
  for each row
  execute function update_updated_at_column();
```

**TypeScript Types:**

```typescript
// src/types/pitch-deck.ts
export interface Slide {
  id: string
  type: 'title' | 'problem' | 'solution' | 'market' | 'product' |
        'traction' | 'team' | 'financials' | 'ask' | 'closing'
  title: string
  content: string[]
  notes?: string
  order: number
}

export interface PitchDeck {
  id: string
  user_id: string
  startup_id?: string
  title: string
  template_type: '10-slide-standard' | 'custom'
  slides: Slide[]
  raw_input?: string
  language: string
  style: 'modern' | 'classic' | 'minimal'
  status: 'draft' | 'generating' | 'ready' | 'error'
  generation_prompt?: string
  ai_model?: string
  created_at: string
  updated_at: string
  generated_at?: string
}
```

### 1.2 UI Components (3-4 hours)

**Component Structure** (adapt from presentation-ai):

```
src/components/pitch-deck/
├── PitchDeckDashboard.tsx      # Main orchestrator (from PresentationDashboard)
├── PitchDeckInput.tsx          # Large textarea (from PresentationInput)
├── PitchDeckControls.tsx       # Template, language, style (from PresentationControls)
├── PitchDeckPreview.tsx        # Slide preview component
└── PitchDeckExport.tsx         # PDF export button
```

**Key Conversions (Next.js → Vite/React):**

| Presentation AI (Next.js) | Medellin AI (Vite) | Notes |
|---------------------------|-------------------|-------|
| `"use client"` directive | Remove | Vite is all client-side |
| Server Actions | Supabase Edge Functions | Move to `/api/generate-pitch-deck` |
| `next/font` | Direct font import in CSS | Use Tailwind font utilities |
| `Image` from next/image | `<img>` with optimization | Or use vite-imagetools |
| API Routes `/api/*` | Supabase Edge Functions | Deploy to Lovable Cloud |

**Example Component (PitchDeckInput.tsx):**

```typescript
// src/components/pitch-deck/PitchDeckInput.tsx
import { useState } from 'react'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Sparkles } from 'lucide-react'

interface PitchDeckInputProps {
  value: string
  onChange: (value: string) => void
  onGenerate: () => void
  isGenerating: boolean
}

export const PitchDeckInput = ({
  value,
  onChange,
  onGenerate,
  isGenerating
}: PitchDeckInputProps) => {
  return (
    <div className="space-y-4">
      <Textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Describe your startup in detail... (or we'll pre-fill from your wizard data)"
        className="min-h-[300px] text-lg resize-none"
        disabled={isGenerating}
      />

      <Button
        onClick={onGenerate}
        disabled={!value.trim() || isGenerating}
        size="lg"
        className="w-full"
      >
        <Sparkles className="mr-2 h-5 w-5" />
        {isGenerating ? 'Generating Pitch Deck...' : 'Generate Pitch Deck'}
      </Button>
    </div>
  )
}
```

### 1.3 AI Generation Edge Function (2-3 hours)

**Supabase Edge Function**: `/supabase/functions/generate-pitch-deck/index.ts`

```typescript
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

// Gemini 2.5 Flash via Lovable AI Gateway
const LOVABLE_AI_ENDPOINT = Deno.env.get('LOVABLE_AI_ENDPOINT')!
const LOVABLE_AI_KEY = Deno.env.get('LOVABLE_AI_KEY')!

serve(async (req) => {
  try {
    // 1. Verify JWT
    const authHeader = req.headers.get('Authorization')
    if (!authHeader) {
      return new Response(JSON.stringify({ error: 'Missing authorization' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_ANON_KEY')!,
      { global: { headers: { Authorization: authHeader } } }
    )

    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    // 2. Parse request
    const { input, template, language, style, startup_id } = await req.json()

    // 3. Pre-fill from wizard data if startup_id provided
    let context = input
    if (startup_id) {
      const { data: startup } = await supabase
        .from('startups')
        .select('*')
        .eq('id', startup_id)
        .eq('user_id', user.id)
        .single()

      if (startup) {
        context = `
Startup Name: ${startup.name}
Problem: ${startup.problem_statement}
Solution: ${startup.solution_description}
Market: ${startup.market_analysis}
Product: ${startup.product_overview}

Additional Context: ${input}
        `.trim()
      }
    }

    // 4. Generate with Gemini 2.5 Flash
    const prompt = `
You are a pitch deck expert. Generate a professional ${template} pitch deck in ${language}.
Style: ${style}

Context:
${context}

Generate a JSON array of slides with this structure:
[
  {
    "id": "slide-1",
    "type": "title",
    "title": "Slide Title",
    "content": ["Bullet point 1", "Bullet point 2"],
    "notes": "Presenter notes",
    "order": 1
  },
  ...
]

For a 10-slide standard deck, include: title, problem, solution, market, product, traction, team, financials, ask, closing.
    `.trim()

    const aiResponse = await fetch(LOVABLE_AI_ENDPOINT, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_AI_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'gemini-2.5-flash',
        prompt,
        temperature: 0.7,
        max_tokens: 4000
      })
    })

    const aiData = await aiResponse.json()
    const slides = JSON.parse(aiData.response)

    // 5. Save to database
    const { data: pitchDeck, error: insertError } = await supabase
      .from('pitch_decks')
      .insert({
        user_id: user.id,
        startup_id,
        title: slides[0]?.title || 'Untitled Pitch Deck',
        template_type: template,
        slides,
        raw_input: input,
        language,
        style,
        status: 'ready',
        generation_prompt: prompt,
        ai_model: 'gemini-2.5-flash',
        generated_at: new Date().toISOString()
      })
      .select()
      .single()

    if (insertError) throw insertError

    return new Response(JSON.stringify(pitchDeck), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    })

  } catch (error) {
    console.error('Generation error:', error)
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
})
```

**Rate Limiting** (following Lovable AI best practices):

```typescript
// Add to edge function
const RATE_LIMIT = 20 // requests
const RATE_WINDOW = 10 * 60 * 1000 // 10 minutes

// Check rate limit before generation
const { count } = await supabase
  .from('pitch_decks')
  .select('id', { count: 'exact', head: true })
  .eq('user_id', user.id)
  .gte('created_at', new Date(Date.now() - RATE_WINDOW).toISOString())

if (count >= RATE_LIMIT) {
  return new Response(
    JSON.stringify({ error: 'Rate limit exceeded. Try again in 10 minutes.' }),
    { status: 429, headers: { 'Content-Type': 'application/json' } }
  )
}
```

---

## Phase 2: Advanced Features (4-5 hours)

### 2.1 Template System (1.5 hours)

**Pre-built Templates:**

```typescript
// src/lib/pitch-deck-templates.ts
export const PITCH_DECK_TEMPLATES = {
  '10-slide-standard': {
    name: '10-Slide Standard',
    description: 'Classic pitch deck structure',
    slides: [
      { type: 'title', title: 'Company Overview', placeholder: 'Your tagline here' },
      { type: 'problem', title: 'Problem', placeholder: 'What problem are you solving?' },
      { type: 'solution', title: 'Solution', placeholder: 'How do you solve it?' },
      { type: 'market', title: 'Market Opportunity', placeholder: 'How big is the market?' },
      { type: 'product', title: 'Product', placeholder: 'What are you building?' },
      { type: 'traction', title: 'Traction', placeholder: 'What have you achieved?' },
      { type: 'team', title: 'Team', placeholder: 'Who is building this?' },
      { type: 'financials', title: 'Business Model', placeholder: 'How do you make money?' },
      { type: 'ask', title: 'The Ask', placeholder: 'What do you need?' },
      { type: 'closing', title: 'Contact', placeholder: 'How to reach you' }
    ]
  },
  'y-combinator': {
    name: 'Y Combinator',
    description: 'YC application style',
    slides: [
      // YC-specific structure
    ]
  }
}
```

### 2.2 Conversational Refinement (2 hours)

**Chat Interface for Edits:**

```typescript
// src/components/pitch-deck/PitchDeckChat.tsx
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { MessageSquare } from 'lucide-react'

interface Message {
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

export const PitchDeckChat = ({ pitchDeckId, onUpdate }: {
  pitchDeckId: string
  onUpdate: (slides: Slide[]) => void
}) => {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')

  const sendMessage = async () => {
    // Send to /api/refine-pitch-deck edge function
    // AI refines specific slides based on conversation
  }

  return (
    <div className="flex flex-col h-[400px] border rounded-lg">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`rounded-lg p-3 max-w-[80%] ${
              msg.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'
            }`}>
              {msg.content}
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 border-t flex gap-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask for changes... (e.g., 'Make the problem slide more compelling')"
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
        />
        <Button onClick={sendMessage}>
          <MessageSquare className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
```

### 2.3 Slide Preview Component (1.5 hours)

```typescript
// src/components/pitch-deck/PitchDeckPreview.tsx
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import type { Slide } from '@/types/pitch-deck'

export const PitchDeckPreview = ({ slides }: { slides: Slide[] }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {slides.map((slide, index) => (
        <Card key={slide.id} className="cursor-pointer hover:shadow-lg transition-shadow">
          <CardHeader className="pb-3">
            <div className="text-xs text-muted-foreground mb-1">
              Slide {index + 1} · {slide.type}
            </div>
            <CardTitle className="text-sm">{slide.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="text-xs space-y-1 text-muted-foreground">
              {slide.content.slice(0, 3).map((item, i) => (
                <li key={i} className="truncate">• {item}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
```

---

## Phase 3: Export & Polish (2-3 hours)

### 3.1 PDF Export (1.5 hours)

**Using jsPDF + html2canvas:**

```typescript
// src/lib/pdf-export.ts
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'
import type { PitchDeck } from '@/types/pitch-deck'

export const exportToPDF = async (pitchDeck: PitchDeck) => {
  const pdf = new jsPDF({
    orientation: 'landscape',
    unit: 'px',
    format: [1920, 1080] // 16:9 aspect ratio
  })

  for (let i = 0; i < pitchDeck.slides.length; i++) {
    const slide = pitchDeck.slides[i]

    // Render slide to canvas
    const slideElement = document.getElementById(`slide-${slide.id}`)
    if (!slideElement) continue

    const canvas = await html2canvas(slideElement, {
      scale: 2,
      width: 1920,
      height: 1080
    })

    const imgData = canvas.toDataURL('image/png')

    if (i > 0) pdf.addPage()
    pdf.addImage(imgData, 'PNG', 0, 0, 1920, 1080)
  }

  pdf.save(`${pitchDeck.title}.pdf`)
}
```

### 3.2 Polish & Testing (1-1.5 hours)

**Checklist:**
- [ ] Loading states for AI generation
- [ ] Error handling with toast notifications
- [ ] Empty states when no decks exist
- [ ] Mobile responsiveness
- [ ] Keyboard shortcuts (Cmd+Enter to generate)
- [ ] Auto-save draft inputs
- [ ] Analytics tracking

---

## Development Order (Step-by-Step)

### Day 1: Foundation (4-5 hours)
1. **Database setup** (1 hour)
   - Run SQL migration in Supabase dashboard
   - Generate TypeScript types
   - Test RLS policies

2. **Basic UI structure** (2 hours)
   - Create `src/pages/startup-wizard/Stage9PitchDeck.tsx`
   - Implement `PitchDeckInput` component
   - Implement `PitchDeckControls` component

3. **Edge function scaffold** (1-2 hours)
   - Create `/supabase/functions/generate-pitch-deck/index.ts`
   - Set up JWT verification
   - Test with dummy response

### Day 2: AI Integration (4-5 hours)
1. **Lovable AI integration** (2-3 hours)
   - Connect to Gemini 2.5 Flash
   - Implement prompt engineering
   - Handle rate limiting

2. **Pre-fill from wizard** (1 hour)
   - Query stages 1-8 data
   - Build context for AI
   - Test with real wizard data

3. **Save to database** (1 hour)
   - Insert generated slides
   - Handle errors gracefully
   - Show success toast

### Day 3: Advanced Features (3-4 hours)
1. **Template system** (1.5 hours)
   - Implement template selector
   - Add template-specific prompts

2. **Preview component** (1 hour)
   - Build slide preview cards
   - Add click to edit

3. **Export functionality** (1-1.5 hours)
   - Integrate jsPDF
   - Test PDF generation

---

## Best Practices (Vite + React + Supabase)

### 1. Component Architecture
```typescript
// ✅ GOOD: Functional components with explicit types
interface Props {
  value: string
  onChange: (value: string) => void
}

const Component = ({ value, onChange }: Props) => { }

// ❌ BAD: No types, class components
const Component = ({ value, onChange }) => { }
```

### 2. Data Fetching with TanStack Query
```typescript
// ✅ GOOD: Use React Query for server state
import { useQuery, useMutation } from '@tanstack/react-query'

const { data: pitchDecks, isLoading } = useQuery({
  queryKey: ['pitch-decks'],
  queryFn: async () => {
    const { data } = await supabase
      .from('pitch_decks')
      .select('*')
      .order('created_at', { ascending: false })
    return data
  }
})

const generateMutation = useMutation({
  mutationFn: async (input: string) => {
    const response = await fetch('/api/generate-pitch-deck', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${session?.access_token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ input })
    })
    return response.json()
  },
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['pitch-decks'] })
    toast.success('Pitch deck generated!')
  }
})
```

### 3. Security (Following Lovable AI Standards)
```typescript
// ✅ ALWAYS: JWT verification in edge functions
const { data: { user }, error } = await supabase.auth.getUser()
if (error || !user) {
  return new Response(JSON.stringify({ error: 'Unauthorized' }), {
    status: 401
  })
}

// ✅ ALWAYS: Ownership verification
const { data: pitchDeck } = await supabase
  .from('pitch_decks')
  .select('*')
  .eq('id', pitch_deck_id)
  .eq('user_id', user.id)  // ← Ensures user owns this deck
  .single()

// ✅ ALWAYS: Input validation with Zod
import { z } from 'zod'

const GenerateSchema = z.object({
  input: z.string().min(50).max(5000),
  template: z.enum(['10-slide-standard', 'y-combinator']),
  language: z.string().default('en'),
  style: z.enum(['modern', 'classic', 'minimal']).default('modern')
})

const validated = GenerateSchema.parse(await req.json())
```

### 4. Performance Optimization
```typescript
// ✅ Debounce expensive operations
import { useDebouncedCallback } from 'use-debounce'

const debouncedSave = useDebouncedCallback(
  async (value: string) => {
    await supabase.from('pitch_decks').update({ raw_input: value })
  },
  500
)

// ✅ Lazy load heavy components
const PitchDeckPreview = lazy(() => import('./PitchDeckPreview'))

// ✅ Memoize expensive computations
const processedSlides = useMemo(() => {
  return slides.map(slide => ({
    ...slide,
    wordCount: slide.content.join(' ').split(' ').length
  }))
}, [slides])
```

### 5. Error Handling
```typescript
// ✅ User-friendly error messages
try {
  const response = await generatePitchDeck(input)
  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || 'Generation failed')
  }
} catch (error) {
  console.error('Pitch deck generation error:', error)
  toast.error(
    error instanceof Error
      ? error.message
      : 'Unable to generate pitch deck. Please try again.'
  )
}
```

---

## Lovable AI Integration Patterns

### Multi-Agent System (For Future Enhancement)

```typescript
// Orchestrator pattern for complex pitch decks
const agents = {
  contentAgent: 'Generates slide content',
  designAgent: 'Suggests visual layouts',
  reviewAgent: 'Quality checks and improvements'
}

// Sequential agent workflow
async function generateWithAgents(input: string) {
  // 1. Content generation
  const content = await callAgent('content', { input })

  // 2. Design suggestions
  const design = await callAgent('design', { content })

  // 3. Review and refine
  const refined = await callAgent('review', { content, design })

  return refined
}
```

### MemZero Integration (For Context Persistence)

```typescript
// Store user preferences and past decks for better generation
const memzeroContext = {
  user_id: user.id,
  previous_decks: await getPreviousDecks(user.id),
  industry: startup.industry,
  tone_preferences: user.settings.pitch_tone
}

// AI learns from user's past decks
const prompt = `
Based on user's previous successful decks, generate a new one.
Context: ${JSON.stringify(memzeroContext)}
...
`
```

---

## Success Metrics

### MVP (Phase 1)
- [ ] Users can generate 10-slide pitch deck in < 30 seconds
- [ ] 95% successful generation rate
- [ ] Mobile-responsive UI
- [ ] PDF export works on all browsers

### Advanced (Phase 2)
- [ ] 3+ template options available
- [ ] Conversational refinement working
- [ ] < 200ms database query performance

### Polish (Phase 3)
- [ ] 100% test coverage on critical paths
- [ ] < 800ms page load time
- [ ] Zero console errors in production

---

## Timeline Summary

| Phase | Features | Time | Priority |
|-------|----------|------|----------|
| **Phase 1: MVP** | Database + Basic UI + AI Generation | 6-8 hours | **CRITICAL** |
| **Phase 2: Advanced** | Templates + Chat + Preview | 4-5 hours | **HIGH** |
| **Phase 3: Polish** | PDF Export + Testing + Analytics | 2-3 hours | **MEDIUM** |
| **TOTAL** | Full-featured pitch deck generator | **12-16 hours** | - |

---

## Next.js → Vite Conversion Guide

### Pattern Conversions

| Next.js Pattern | Vite/React Equivalent |
|-----------------|----------------------|
| `export default function Page()` | `export const Page = () => {}` |
| `"use client"` directive | Remove (all Vite is client-side) |
| Server Actions `"use server"` | Supabase Edge Functions |
| `next/image` | `<img>` or vite-plugin-image |
| `next/link` | React Router `<Link>` |
| `useRouter()` from next/navigation | `useNavigate()` from react-router-dom |
| `searchParams` prop | `useSearchParams()` hook |
| API Routes `/app/api/*/route.ts` | `/supabase/functions/*/index.ts` |
| Middleware `/middleware.ts` | Protected Route wrapper component |
| `revalidatePath()` | `queryClient.invalidateQueries()` |
| Server Components | All client components (use React Query) |

### File Structure Mapping

```
presentation-ai (Next.js)          →  medellin-ai-hub (Vite)
─────────────────────────────────────────────────────────────
/src/app/page.tsx                  →  /src/pages/Index.tsx
/src/app/dashboard/page.tsx        →  /src/pages/Dashboard.tsx
/src/app/api/generate/route.ts     →  /supabase/functions/generate-pitch-deck/index.ts
/src/components/presentation/*     →  /src/components/pitch-deck/*
/public/*                          →  /public/*
```

---

## Deployment Checklist

### Supabase Setup
- [ ] Run database migration
- [ ] Enable RLS on `pitch_decks` table
- [ ] Test RLS policies with different users
- [ ] Create indexes for performance

### Edge Functions
- [ ] Deploy `/supabase/functions/generate-pitch-deck`
- [ ] Deploy `/supabase/functions/refine-pitch-deck` (Phase 2)
- [ ] Set environment variables (LOVABLE_AI_ENDPOINT, LOVABLE_AI_KEY)
- [ ] Test JWT verification
- [ ] Test rate limiting

### Frontend
- [ ] Build production bundle: `npm run build`
- [ ] Test production build: `npm run preview`
- [ ] Verify all API calls use correct endpoints
- [ ] Check mobile responsiveness
- [ ] Run lighthouse audit (target: >90 performance)

### Monitoring
- [ ] Set up error tracking (Sentry)
- [ ] Add analytics events (generation_started, generation_completed, pdf_exported)
- [ ] Monitor AI costs (Gemini Flash usage)
- [ ] Track user satisfaction (post-generation survey)

---

## Troubleshooting Guide

### Issue: AI generation returns empty slides
**Fix**: Check prompt engineering, ensure Gemini Flash response is properly parsed

### Issue: PDF export fails on mobile
**Fix**: Use cloud-based PDF generation (Supabase Edge Function with Puppeteer)

### Issue: Rate limiting too strict
**Fix**: Adjust `RATE_LIMIT` constant, consider tiered limits for premium users

### Issue: Slow page load
**Fix**: Lazy load PitchDeckPreview component, use React Query caching aggressively

---

## Future Enhancements (Post-Launch)

1. **Real-time Collaboration** (Supabase Realtime)
   - Multiple users edit same deck
   - Live cursor positions
   - Comment threads on slides

2. **Version History** (Supabase Versioning)
   - Track all changes
   - Restore previous versions
   - Compare versions side-by-side

3. **Advanced Templates**
   - Industry-specific templates (SaaS, Hardware, Biotech)
   - Import from PowerPoint/Keynote
   - Custom brand templates

4. **AI Enhancements**
   - Image generation for slides (DALL-E integration)
   - Voice narration (ElevenLabs)
   - Slide transition suggestions

5. **Presentation Mode**
   - Full-screen presenter view
   - Speaker notes display
   - Remote control via mobile

---

## Conclusion

This plan provides a **clear, phased approach** to building a production-ready pitch deck feature in **12-16 hours** by leveraging:

✅ Lovable AI best practices (Gemini 2.5 Flash, 99.7% time savings)
✅ Proven patterns from AllWeOne presentation-ai
✅ Vite + React + Supabase stack
✅ Security-first architecture (RLS, JWT, rate limiting)
✅ Component reusability from shadcn/ui

**Start with Phase 1 MVP** to validate the feature, then enhance with Phases 2-3 based on user feedback.

---

**Document Version**: 1.0
**Last Updated**: October 10, 2025
**Estimated Completion**: 2-3 days (at 6 hours/day development pace)
