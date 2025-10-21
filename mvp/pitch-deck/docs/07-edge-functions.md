# 08 - Edge Functions Specifications

**Created:** 2025-01-15
**Purpose:** Complete implementation guide for Supabase Edge Functions

---

## 🎯 Overview

Two Edge Functions power the AI generation:
1. **`generate-outline`** - Creates slide titles from user description
2. **`generate-content`** - Generates full slide content

**Technology Stack:**
- Deno runtime (TypeScript)
- Anthropic Claude API (Sonnet 4.5)
- Supabase client for database operations

---

## 📁 File Structure

```
supabase/
└── functions/
    ├── generate-outline/
    │   ├── index.ts
    │   └── README.md
    ├── generate-content/
    │   ├── index.ts
    │   └── README.md
    └── _shared/
        ├── anthropic.ts      # Claude API client
        ├── cors.ts           # CORS headers
        ├── validation.ts     # Input validation
        └── types.ts          # Shared types
```

---

## 🔧 Function 1: generate-outline

### Purpose
Generate 5-20 slide titles based on user's startup description.

### File: `supabase/functions/generate-outline/index.ts`

```typescript
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import Anthropic from 'https://esm.sh/@anthropic-ai/sdk@0.20.0';
import { corsHeaders } from '../_shared/cors.ts';

// Types
interface GenerateOutlineRequest {
  topic: string;
  slideCount: number;
  language: string;
  presentationStyle: 'professional' | 'casual' | 'technical';
}

interface GenerateOutlineResponse {
  presentationId: string;
  outline: string[];
  slideCount: number;
}

// Main handler
serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // 1. Parse and validate request
    const {
      topic,
      slideCount = 10,
      language = 'en-US',
      presentationStyle = 'professional'
    }: GenerateOutlineRequest = await req.json();

    // Validation
    if (!topic || topic.trim().length < 50) {
      return new Response(
        JSON.stringify({ error: 'Topic must be at least 50 characters' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (slideCount < 5 || slideCount > 20) {
      return new Response(
        JSON.stringify({ error: 'Slide count must be between 5 and 20' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // 2. Get user from JWT
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: 'Missing authorization header' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const token = authHeader.replace('Bearer ', '');

    // 3. Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey, {
      global: { headers: { Authorization: authHeader } }
    });

    // Verify user
    const { data: { user }, error: userError } = await supabase.auth.getUser(token);
    if (userError || !user) {
      return new Response(
        JSON.stringify({ error: 'Invalid or expired token' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // 4. Call Claude API
    const anthropic = new Anthropic({
      apiKey: Deno.env.get('ANTHROPIC_API_KEY')!,
    });

    const systemPrompt = `You are an experienced pitch deck consultant who has helped 500+ startups raise funding. Your task is to create a compelling, investor-ready pitch deck outline.`;

    const userPrompt = `Create an investor pitch deck outline with exactly ${slideCount} slide titles for this startup:

**STARTUP DESCRIPTION:**
${topic}

**REQUIREMENTS:**
- Style: ${presentationStyle}
- Target Audience: Venture Capital Investors & Angel Investors
- Stage: Seed to Series A
- Slide Count: Exactly ${slideCount} slides

**PITCH DECK STRUCTURE:**
${slideCount === 10 ? `
1. Title Slide (company name & tagline)
2. Problem Statement (pain points, market need)
3. Solution Overview (your product/service)
4. Market Opportunity (TAM/SAM/SOM)
5. Business Model (revenue streams)
6. Traction & Metrics (early results, KPIs)
7. Team & Advisors (founders, key hires)
8. Competition Analysis (competitive advantage)
9. Financial Projections (3-5 year forecast)
10. Investment Ask (amount, use of funds, contact)
` : `Create ${slideCount} slides following standard pitch deck structure`}

**GUIDELINES:**
- Use action-oriented, clear titles (not generic)
- Start strong with problem/opportunity
- Build narrative momentum slide-by-slide
- End with clear call-to-action (investment ask)
- Avoid buzzwords; be specific and concrete
- Consider investor psychology and common questions

**OUTPUT FORMAT:**
Return ONLY a valid JSON array of exactly ${slideCount} slide titles.
Example: ["Problem: Event Planning Chaos", "Solution: AI-Powered Automation", ...]

Do not include any other text, explanations, or markdown formatting.`;

    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-5-20250929',
      max_tokens: 1024,
      temperature: 0.7,
      system: systemPrompt,
      messages: [{
        role: 'user',
        content: userPrompt
      }]
    });

    // 5. Parse AI response
    const responseText = message.content[0].type === 'text'
      ? message.content[0].text
      : '';

    // Extract JSON array from response
    let outline: string[];
    try {
      // Try direct JSON parse
      outline = JSON.parse(responseText);
    } catch {
      // Try to extract JSON array from text
      const jsonMatch = responseText.match(/\[.*\]/s);
      if (!jsonMatch) {
        throw new Error('Could not extract outline from AI response');
      }
      outline = JSON.parse(jsonMatch[0]);
    }

    // Validate outline
    if (!Array.isArray(outline) || outline.length < 3) {
      throw new Error('Invalid outline format from AI');
    }

    // Trim to requested count
    outline = outline.slice(0, slideCount);

    // 6. Create presentation in database
    const { data: presentation, error: dbError } = await supabase
      .from('presentations')
      .insert({
        profile_id: user.id,
        title: topic.substring(0, 100),
        prompt: topic,
        presentation_style: presentationStyle,
        language,
        slide_count: slideCount,
        outline,
        theme: 'purple',
        status: 'outline'
      })
      .select('id')
      .single();

    if (dbError) {
      console.error('Database error:', dbError);
      throw new Error('Failed to save presentation');
    }

    // 7. Log AI usage for billing
    await supabase.from('ai_usage_logs').insert({
      presentation_id: presentation.id,
      operation: 'outline',
      input_tokens: message.usage.input_tokens,
      output_tokens: message.usage.output_tokens,
      estimated_cost: (message.usage.input_tokens / 1000) * 0.003 +
                     (message.usage.output_tokens / 1000) * 0.015
    });

    // 8. Return success response
    const response: GenerateOutlineResponse = {
      presentationId: presentation.id,
      outline,
      slideCount: outline.length
    };

    return new Response(
      JSON.stringify(response),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );

  } catch (error) {
    console.error('Error in generate-outline:', error);

    return new Response(
      JSON.stringify({
        error: error.message || 'Internal server error',
        details: Deno.env.get('ENVIRONMENT') === 'development' ? error.stack : undefined
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});
```

---

## 🔧 Function 2: generate-content

### Purpose
Generate full slide content for all slides in the outline.

### File: `supabase/functions/generate-content/index.ts`

```typescript
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import Anthropic from 'https://esm.sh/@anthropic-ai/sdk@0.20.0';
import { corsHeaders } from '../_shared/cors.ts';

// Types
interface GenerateContentRequest {
  presentationId: string;
}

interface Slide {
  id: string;
  title: string;
  content: string;
  layout: 'title' | 'content';
  notes: string;
}

interface GenerateContentResponse {
  presentationId: string;
  slides: Slide[];
  slideCount: number;
}

// Main handler
serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // 1. Parse request
    const { presentationId }: GenerateContentRequest = await req.json();

    if (!presentationId) {
      return new Response(
        JSON.stringify({ error: 'Presentation ID is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // 2. Authenticate user
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: 'Missing authorization header' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const token = authHeader.replace('Bearer ', '');
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey, {
      global: { headers: { Authorization: authHeader } }
    });

    const { data: { user }, error: userError } = await supabase.auth.getUser(token);
    if (userError || !user) {
      return new Response(
        JSON.stringify({ error: 'Invalid or expired token' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // 3. Fetch presentation
    const { data: presentation, error: fetchError } = await supabase
      .from('presentations')
      .select('*')
      .eq('id', presentationId)
      .eq('profile_id', user.id)
      .single();

    if (fetchError || !presentation) {
      return new Response(
        JSON.stringify({ error: 'Presentation not found or access denied' }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (!presentation.outline || presentation.outline.length < 3) {
      return new Response(
        JSON.stringify({ error: 'Presentation outline is missing or invalid' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // 4. Initialize Claude API
    const anthropic = new Anthropic({
      apiKey: Deno.env.get('ANTHROPIC_API_KEY')!,
    });

    // 5. Generate content for each slide
    const slides: Slide[] = [];
    const outline: string[] = presentation.outline;
    let totalInputTokens = 0;
    let totalOutputTokens = 0;

    for (let i = 0; i < outline.length; i++) {
      const slideTitle = outline[i];
      const isFirstSlide = i === 0;
      const isLastSlide = i === outline.length - 1;

      // Build context from previous slides
      const previousContext = slides.length > 0
        ? `\n**PREVIOUS SLIDES FOR CONTEXT:**\n${slides.slice(-2).map(s =>
            `${s.title}: ${s.content.substring(0, 100)}...`
          ).join('\n')}`
        : '';

      const systemPrompt = `You are an expert pitch deck writer specializing in investor presentations. Write compelling, data-driven content that tells a clear story.`;

      const userPrompt = `Create content for slide ${i + 1} of ${outline.length} in an investor pitch deck.

**STARTUP DESCRIPTION:**
${presentation.prompt}

**COMPLETE DECK OUTLINE:**
${outline.map((title, idx) => `${idx + 1}. ${title}`).join('\n')}
${previousContext}

**CURRENT SLIDE:**
Title: "${slideTitle}"
Position: Slide ${i + 1} of ${outline.length}
${isFirstSlide ? 'This is the TITLE SLIDE' : ''}
${isLastSlide ? 'This is the CLOSING SLIDE with call-to-action' : ''}

**CONTENT REQUIREMENTS:**
${isFirstSlide ? `
- Company name and one-line tagline
- Keep it minimal and impactful
- Example: "EventOS\\nAI-Powered Event Management for Modern Organizers"
` : `
- Write ${presentation.presentation_style} content for investors
- Use bullet points for clarity (3-5 points optimal)
- Include specific metrics, numbers, percentages when relevant
- Be concrete, not abstract (avoid buzzwords)
- Target length: 150-250 words or 3-5 bullet points
- Consider what investors want to know at this stage
- Build on the narrative from previous slides
`}

**STYLE GUIDE:**
${presentation.presentation_style === 'professional' ? '- Formal tone, data-driven, metrics-focused' : ''}
${presentation.presentation_style === 'casual' ? '- Conversational but credible, story-driven' : ''}
${presentation.presentation_style === 'technical' ? '- Technical depth, architecture details, specs' : ''}

**OUTPUT FORMAT:**
Return ONLY the slide content.
${isFirstSlide ? 'Format: Company Name on one line, tagline on next line' : 'Use bullet points (•) or short paragraphs'}
Do not include the slide title (we already have it).
Do not use markdown headers or formatting.
Do not include speaker notes.`;

      // Call Claude API with retry
      let content = '';
      let usage = { input_tokens: 0, output_tokens: 0 };
      let attempts = 0;
      const maxAttempts = 2;

      while (attempts < maxAttempts) {
        try {
          const message = await anthropic.messages.create({
            model: 'claude-sonnet-4-5-20250929',
            max_tokens: 512,
            temperature: 0.8,
            system: systemPrompt,
            messages: [{
              role: 'user',
              content: userPrompt
            }]
          });

          content = message.content[0].type === 'text'
            ? message.content[0].text.trim()
            : '';

          usage = message.usage;
          totalInputTokens += usage.input_tokens;
          totalOutputTokens += usage.output_tokens;
          break;

        } catch (error) {
          attempts++;
          if (attempts >= maxAttempts) {
            throw new Error(`Failed to generate content for slide ${i + 1}: ${error.message}`);
          }
          // Wait before retry
          await new Promise(resolve => setTimeout(resolve, 2000));
        }
      }

      // Create slide object
      slides.push({
        id: `slide-${i + 1}`,
        title: slideTitle,
        content,
        layout: i === 0 ? 'title' : 'content',
        notes: ''
      });

      // Send progress update (optional - would need SSE setup)
      console.log(`Generated slide ${i + 1}/${outline.length}: ${slideTitle}`);
    }

    // 6. Save complete content to database
    const contentJson = {
      slides,
      slideCount: slides.length,
      metadata: {
        generatedAt: new Date().toISOString(),
        aiModel: 'claude-sonnet-4-5-20250929',
        version: '1.0'
      }
    };

    const { error: updateError } = await supabase
      .from('presentations')
      .update({
        content: contentJson,
        status: 'complete',
        updated_at: new Date().toISOString()
      })
      .eq('id', presentationId);

    if (updateError) {
      console.error('Database update error:', updateError);
      throw new Error('Failed to save generated content');
    }

    // 7. Log AI usage
    const estimatedCost = (totalInputTokens / 1000) * 0.003 +
                         (totalOutputTokens / 1000) * 0.015;

    await supabase.from('ai_usage_logs').insert({
      presentation_id: presentationId,
      operation: 'content',
      input_tokens: totalInputTokens,
      output_tokens: totalOutputTokens,
      estimated_cost: estimatedCost
    });

    // 8. Return success
    const response: GenerateContentResponse = {
      presentationId,
      slides,
      slideCount: slides.length
    };

    return new Response(
      JSON.stringify(response),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );

  } catch (error) {
    console.error('Error in generate-content:', error);

    return new Response(
      JSON.stringify({
        error: error.message || 'Internal server error',
        details: Deno.env.get('ENVIRONMENT') === 'development' ? error.stack : undefined
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});
```

---

## 📦 Shared Utilities

### File: `supabase/functions/_shared/cors.ts`

```typescript
export const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT, DELETE',
};
```

### File: `supabase/functions/_shared/types.ts`

```typescript
export interface Slide {
  id: string;
  title: string;
  content: string;
  layout: 'title' | 'content';
  notes: string;
}

export interface PresentationContent {
  slides: Slide[];
  slideCount: number;
  metadata: {
    generatedAt: string;
    aiModel: string;
    version: string;
  };
}

export interface AIUsageLog {
  presentation_id: string;
  operation: 'outline' | 'content';
  input_tokens: number;
  output_tokens: number;
  estimated_cost: number;
  timestamp?: string;
}
```

---

## 🚀 Deployment

### 1. Set Environment Variables

```bash
# In Supabase Dashboard > Project Settings > Edge Functions
ANTHROPIC_API_KEY=sk-ant-api03-...
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...
ENVIRONMENT=production
```

### 2. Deploy Functions

```bash
# Deploy outline generator
supabase functions deploy generate-outline

# Deploy content generator
supabase functions deploy generate-content

# Verify deployment
supabase functions list
```

### 3. Test Functions

```bash
# Test generate-outline
curl -X POST https://your-project.supabase.co/functions/v1/generate-outline \
  -H "Authorization: Bearer YOUR_USER_JWT" \
  -H "Content-Type: application/json" \
  -d '{
    "topic": "We are building an AI-powered event management platform...",
    "slideCount": 10,
    "language": "en-US",
    "presentationStyle": "professional"
  }'

# Test generate-content
curl -X POST https://your-project.supabase.co/functions/v1/generate-content \
  -H "Authorization: Bearer YOUR_USER_JWT" \
  -H "Content-Type: application/json" \
  -d '{
    "presentationId": "uuid-here"
  }'
```

---

## 📊 AI Usage Logging Table

Create table to track AI costs:

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

CREATE INDEX idx_ai_usage_presentation ON ai_usage_logs(presentation_id);
CREATE INDEX idx_ai_usage_timestamp ON ai_usage_logs(timestamp DESC);

-- Enable RLS
ALTER TABLE ai_usage_logs ENABLE ROW LEVEL SECURITY;

-- Only service role can access
CREATE POLICY "Service role only" ON ai_usage_logs
  FOR ALL USING (auth.role() = 'service_role');
```

---

## ⚡ Performance Optimization

### Rate Limiting

Add rate limiting to prevent abuse:

```typescript
// Track requests per user
const rateLimitMap = new Map<string, number[]>();

function checkRateLimit(userId: string): boolean {
  const now = Date.now();
  const windowMs = 60000; // 1 minute
  const maxRequests = 10; // Max 10 requests per minute

  if (!rateLimitMap.has(userId)) {
    rateLimitMap.set(userId, []);
  }

  const userRequests = rateLimitMap.get(userId)!;

  // Remove old requests
  const recentRequests = userRequests.filter(time => now - time < windowMs);

  if (recentRequests.length >= maxRequests) {
    return false; // Rate limit exceeded
  }

  recentRequests.push(now);
  rateLimitMap.set(userId, recentRequests);

  return true;
}
```

### Caching

Consider caching common outline patterns:

```typescript
// Simple in-memory cache (for demonstration)
const outlineCache = new Map<string, { outline: string[], timestamp: number }>();

function getCachedOutline(cacheKey: string): string[] | null {
  const cached = outlineCache.get(cacheKey);
  if (cached && Date.now() - cached.timestamp < 3600000) { // 1 hour
    return cached.outline;
  }
  return null;
}
```

---

## 🔗 Next Steps

1. ✅ Understand Edge Function architecture
2. → Deploy functions to Supabase
3. → Test with real user tokens
4. → Monitor AI costs and usage
5. → Set up error tracking (Sentry)
