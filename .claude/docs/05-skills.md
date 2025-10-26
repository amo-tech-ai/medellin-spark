---
name: Medellin Spark Pitch Deck Assistant
description: Create and edit AI-powered pitch deck presentations for Medellin Spark. Use when generating presentations, pitch decks, slides, or working with the PitchDeckWizard component. Handles conversation flow, data collection, and presentation generation.
---

# Medellin Spark Pitch Deck Assistant

## Purpose

This Skill guides AI-powered pitch deck generation through conversational data collection, structured presentation creation, and slide content generation for the Medellin Spark platform.

## Core Workflow

### 1. Understanding Requirements

**Gather through multi-turn conversation:**
- Company name and industry
- Problem statement (pain point)
- Solution description
- Business model (revenue strategy)
- Target audience/market
- Traction (metrics, milestones)
- Team background
- Funding ask

### 2. Presentation Structure (10-slide template)

Standard pitch deck follows this sequence:

1. **Cover Slide** - Company name, tagline, logo
2. **Problem** - Market pain point, why it matters
3. **Solution** - Your product/service, how it solves the problem
4. **Product Demo** - Screenshots, features, user flow
5. **Market Opportunity** - TAM/SAM/SOM, market size
6. **Business Model** - Revenue streams, pricing
7. **Traction** - Metrics, growth, achievements
8. **Competition** - Competitive landscape, differentiation
9. **Team** - Founders, advisors, key hires
10. **Ask** - Funding amount, use of funds

### 3. AI Chat Integration

**Edge Function: `/functions/v1/pitch-deck-assistant`**

```typescript
const response = await fetch(
  `${supabaseUrl}/functions/v1/pitch-deck-assistant`,
  {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${anonKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      messages: conversationHistory,
      collectedData: currentData,
      completeness: progressPercentage
    })
  }
)
```

**Response format:**
```json
{
  "message": "What problem does your company solve?",
  "collectedData": {
    "company": "TechCorp",
    "problem": "Developers waste time on repetitive tasks"
  },
  "completeness": 40,
  "canGenerate": false
}
```

### 4. Progress Tracking

**Completeness calculation:**
```typescript
const calculateCompleteness = (data: CollectedData): number => {
  const requiredFields = [
    'company', 'industry', 'problem', 'solution',
    'businessModel', 'targetAudience', 'traction', 'team', 'ask'
  ]

  const filledFields = requiredFields.filter(field =>
    data[field] && data[field].trim().length > 0
  )

  return Math.round((filledFields.length / requiredFields.length) * 100)
}
```

**Generate button appears at 80%+ completeness**

### 5. Database Storage

**Tables:**

```sql
-- Conversation history
CREATE TABLE pitch_conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID NOT NULL REFERENCES auth.users(id),
  collected_data JSONB DEFAULT '{}',
  completeness INTEGER DEFAULT 0,
  messages JSONB DEFAULT '[]',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Generated presentations
CREATE TABLE presentations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID NOT NULL REFERENCES auth.users(id),
  title TEXT NOT NULL,
  category TEXT DEFAULT 'pitch_deck',
  is_public BOOLEAN DEFAULT FALSE,
  slides JSONB DEFAULT '[]',
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

## Component Patterns

### PitchDeckWizard Component

**Location:** `src/pages/PitchDeckWizard.tsx`

**Key patterns:**

```typescript
interface Message {
  role: 'user' | 'assistant'
  content: string
}

interface CollectedData {
  company?: string
  industry?: string
  problem?: string
  solution?: string
  businessModel?: string
  targetAudience?: string
  traction?: string
  team?: string
  ask?: string
}

// State management
const [messages, setMessages] = useState<Message[]>([])
const [collectedData, setCollectedData] = useState<CollectedData>({})
const [completeness, setCompleteness] = useState(0)
const [isLoading, setIsLoading] = useState(false)

// Send message handler
const handleSendMessage = async (userMessage: string) => {
  setMessages(prev => [...prev, { role: 'user', content: userMessage }])
  setIsLoading(true)

  try {
    const response = await fetch(edgeFunctionUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        messages: [...messages, { role: 'user', content: userMessage }],
        collectedData,
        completeness
      })
    })

    const data = await response.json()

    setMessages(prev => [...prev, { role: 'assistant', content: data.message }])
    setCollectedData(data.collectedData)
    setCompleteness(data.completeness)
  } catch (error) {
    toast.error('Failed to send message. Please try again.')
  } finally {
    setIsLoading(false)
  }
}
```

## Slide Content Generation

### Slide Structure

```typescript
interface Slide {
  id: string
  slideNumber: number
  type: 'cover' | 'content' | 'closing'
  title: string
  content: string
  layout: 'title' | 'bullets' | 'image' | 'split'
  notes?: string
}
```

### Content Templates

**Cover Slide:**
```markdown
# {company_name}
{tagline}

{presenter_name}
{date}
```

**Problem Slide:**
```markdown
# The Problem

- {pain_point_1}
- {pain_point_2}
- {pain_point_3}

**Impact:** {market_impact}
```

**Solution Slide:**
```markdown
# Our Solution

{solution_description}

**Key Benefits:**
- {benefit_1}
- {benefit_2}
- {benefit_3}
```

## Error Handling

### Common Issues

**1. Incomplete data at generation:**
```typescript
if (completeness < 80) {
  toast.error('Please answer a few more questions before generating.')
  return
}
```

**2. Edge Function errors:**
```typescript
if (!response.ok) {
  const errorText = await response.text()
  console.error('Edge Function error:', errorText)
  toast.error('Failed to process request. Please try again.')
  throw new Error(`HTTP ${response.status}`)
}
```

**3. RLS policy errors:**
```typescript
// Ensure is_public = true for test presentations
const { error } = await supabase
  .from('presentations')
  .update({ is_public: true })
  .eq('id', presentationId)
```

## Security Guidelines

### API Key Protection

**✅ GOOD - Server-side only:**
```typescript
// supabase/functions/pitch-deck-assistant/index.ts
const openaiKey = Deno.env.get('OPENAI_API_KEY')
```

**❌ BAD - Never in frontend:**
```typescript
const apiKey = import.meta.env.VITE_OPENAI_API_KEY  // Security risk!
```

### User Data Isolation

**Always use profile_id:**
```sql
CREATE POLICY "Users view own conversations"
  ON pitch_conversations FOR SELECT
  USING (auth.uid() = profile_id);

CREATE POLICY "Users create own conversations"
  ON pitch_conversations FOR INSERT
  WITH CHECK (auth.uid() = profile_id);
```

## Prompt Engineering

### Conversation System Prompt

```typescript
const systemPrompt = `You are a pitch deck advisor for Medellin Spark.

Your role:
1. Ask focused questions to gather pitch deck information
2. Extract structured data from user responses
3. Track completeness (0-100%)
4. Maintain friendly, professional tone

Required information:
- Company name and industry
- Problem statement
- Solution description
- Business model
- Target audience
- Traction/metrics
- Team background
- Funding ask

Guidelines:
- Ask ONE question at a time
- Be conversational, not robotic
- Acknowledge previous answers
- Guide users if they're stuck
- Indicate when ready to generate (80%+ complete)

Response format (JSON):
{
  "message": "Your conversational response",
  "collectedData": { /* updated data */ },
  "completeness": 0-100,
  "canGenerate": boolean
}
`
```

### Data Extraction Pattern

```typescript
// Extract structured data from conversation
const extractData = (userMessage: string, currentData: CollectedData) => {
  // Use AI to parse user response and update structured data
  const prompt = `
Previous data: ${JSON.stringify(currentData)}
User said: "${userMessage}"

Extract any new information and update the data structure.
`
  // Returns updated CollectedData object
}
```

## Testing Checklist

### Manual Testing Flow

1. **Navigate to wizard:**
   ```
   http://localhost:8080/pitch-deck-wizard
   ```

2. **Send first message:**
   ```
   "I want to create a pitch deck for TestCorp, an AI code assistant"
   ```
   - Verify: AI responds, progress shows ~10%

3. **Answer 3-4 questions:**
   - Target audience
   - Problem statement
   - Solution
   - Business model
   - Verify: Progress increases to 80%+

4. **Generate deck:**
   - Click "Generate Deck" button
   - Verify: Redirects to `/presentations/{id}/outline`
   - Verify: All 10 slides render

5. **Check database:**
   ```sql
   SELECT * FROM pitch_conversations WHERE profile_id = '{user_id}';
   SELECT * FROM presentations WHERE profile_id = '{user_id}';
   ```

## Common Patterns

### Saving conversation state

```typescript
const saveConversation = async () => {
  const { error } = await supabase
    .from('pitch_conversations')
    .upsert({
      profile_id: user.id,
      collected_data: collectedData,
      completeness: completeness,
      messages: messages,
      updated_at: new Date().toISOString()
    })

  if (error) {
    console.error('Failed to save conversation:', error)
  }
}
```

### Loading existing conversation

```typescript
const loadConversation = async () => {
  const { data, error } = await supabase
    .from('pitch_conversations')
    .select('*')
    .eq('profile_id', user.id)
    .order('created_at', { ascending: false })
    .limit(1)
    .single()

  if (data) {
    setMessages(data.messages || [])
    setCollectedData(data.collected_data || {})
    setCompleteness(data.completeness || 0)
  }
}
```

## Resources

- **Component:** `src/pages/PitchDeckWizard.tsx`
- **Edge Function:** `supabase/functions/pitch-deck-assistant/`
- **Database Migrations:** `supabase/migrations/20251016210000_create_pitch_conversations.sql`
- **OpenAI Docs:** https://platform.openai.com/docs
- **React Query:** https://tanstack.com/query/latest
