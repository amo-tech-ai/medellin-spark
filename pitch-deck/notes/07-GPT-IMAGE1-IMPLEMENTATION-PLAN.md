# 07 - GPT-Image-1 Implementation Plan for Pitch Deck Wizard

**Created**: October 18, 2025
**Status**: Ready for Implementation
**Priority**: 🟡 High (Post-Production Enhancement)
**Estimated Time**: 2 weeks (80 hours)
**Estimated Cost**: $3,150 one-time development + $0.015 per image generated

---

## 📊 EXECUTIVE SUMMARY

### What We're Building

Add AI-powered custom image generation to the Medellin Spark Pitch Deck Wizard using OpenAI's GPT-Image-1 model. Users will get professional, branded visuals automatically generated based on their pitch deck conversation.

### Why GPT-Image-1?

**Chosen based on comprehensive API comparison** (see `IMAGE-API-COMPREHENSIVE-GUIDE.md`):

✅ **75% cheaper** than DALL-E 3 ($0.015 vs $0.04 per image)
✅ **Best text rendering** (perfect for charts, infographics, labels)
✅ **Image editing capability** (unique feature)
✅ **Photorealistic quality** for business presentations
✅ **Best for automation** (agent-ready, multimodal)

### Key Benefits

**For Users**:
- 🎨 Unique, branded visuals (not generic stock photos)
- ⚡ Automated generation (no design skills needed)
- 📊 Perfect charts with readable text
- 💰 Cost-effective ($0.105 per complete deck)

**For Business**:
- 🚀 Differentiation (competitors use stock photos)
- 💵 Revenue potential (premium feature)
- 🤖 Scalable (fully automated)
- 📈 Higher conversion (better pitch decks = more funding)

---

## 🎯 PROJECT OVERVIEW

### Scope

**Phase 1: Core Implementation** (1 week)
- Edge Function for image generation
- Database schema updates
- Frontend integration
- Basic prompt engineering

**Phase 2: Advanced Features** (1 week)
- Hybrid approach (AI + stock photos)
- Image editing/refinement
- Streaming progress indicators
- Caching & optimization

### Success Criteria

✅ Users can generate custom images for pitch deck slides
✅ Images generated in <90 seconds per slide
✅ Cost maintained at $0.015 per image
✅ 95%+ image quality satisfaction rate
✅ Zero API keys exposed to frontend

---

## 🏗️ ARCHITECTURE

### System Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    Pitch Deck Wizard                        │
│                    (React Frontend)                         │
└───────────────────┬─────────────────────────────────────────┘
                    │
                    │ 1. Request Image for Slide
                    ▼
┌─────────────────────────────────────────────────────────────┐
│              Supabase Edge Function                         │
│           /functions/v1/generate-slide-image                │
│                                                              │
│  ┌────────────────────────────────────────────────────┐    │
│  │  Decision Logic:                                   │    │
│  │  - Analyze slide type & content                   │    │
│  │  - Choose: AI generation vs Stock photo          │    │
│  │  - Build optimized prompt from context           │    │
│  └────────────────────────────────────────────────────┘    │
└───────────────────┬─────────────────────────────────────────┘
                    │
         ┌──────────┴──────────┐
         │                     │
         │ AI Path             │ Stock Path
         ▼                     ▼
┌─────────────────┐   ┌─────────────────┐
│  OpenAI API     │   │  Pexels API     │
│  GPT-Image-1    │   │  (Free)         │
│  $0.015/image   │   │  $0/image       │
└─────────┬───────┘   └─────────┬───────┘
          │                     │
          │ 2. Return base64   │ 2. Return URL
          ▼                     ▼
┌─────────────────────────────────────────────────────────────┐
│              Supabase Edge Function                         │
│          (Process & Store Result)                           │
└───────────────────┬─────────────────────────────────────────┘
                    │
                    │ 3. Save to Database
                    ▼
┌─────────────────────────────────────────────────────────────┐
│              Supabase Database                              │
│                                                              │
│  Tables:                                                    │
│  - generated_images (metadata, costs)                      │
│  - presentations (slide_images JSONB)                      │
│  - image_generation_cache (avoid duplicates)               │
└─────────────────────────────────────────────────────────────┘
```

### Data Flow

1. **User conversation** → AI extracts image needs
2. **Edge Function** → Analyzes slide type, decides AI vs stock
3. **Image Generation**:
   - **AI**: OpenAI GPT-Image-1 → base64 image
   - **Stock**: Pexels API → image URL
4. **Storage**: Save to Supabase Storage + metadata to DB
5. **Frontend**: Display image in slide preview

---

## 📋 IMPLEMENTATION PHASES

### Phase 1: Core Implementation (Week 1)

#### **Day 1-2: Database Setup**

**Create/Update Tables**:

```sql
-- Migration: 20251019000000_add_image_generation.sql

-- Table: generated_images
CREATE TABLE IF NOT EXISTS generated_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID NOT NULL REFERENCES profiles(id),
  presentation_id UUID REFERENCES presentations(id),
  slide_number INTEGER,

  -- Image data
  image_url TEXT, -- Supabase Storage URL
  thumbnail_url TEXT, -- Smaller preview

  -- Generation metadata
  source TEXT NOT NULL CHECK (source IN ('ai_gpt_image_1', 'ai_dalle_3', 'stock_pexels', 'stock_unsplash')),
  prompt TEXT, -- Original prompt used
  revised_prompt TEXT, -- AI-revised prompt (GPT-Image-1)

  -- Cost tracking
  cost_usd DECIMAL(10, 4) DEFAULT 0,
  tokens_used INTEGER,

  -- Quality metrics
  generation_time_ms INTEGER,
  model_version TEXT,

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS policies
ALTER TABLE generated_images ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own images"
  ON generated_images FOR SELECT
  USING (profile_id = auth.uid());

CREATE POLICY "Users can insert own images"
  ON generated_images FOR INSERT
  WITH CHECK (profile_id = auth.uid());

-- Indexes
CREATE INDEX idx_generated_images_profile ON generated_images(profile_id);
CREATE INDEX idx_generated_images_presentation ON generated_images(presentation_id);
CREATE INDEX idx_generated_images_created ON generated_images(created_at DESC);

-- Table: image_generation_cache (avoid duplicate API calls)
CREATE TABLE IF NOT EXISTS image_generation_cache (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  prompt_hash TEXT UNIQUE NOT NULL, -- SHA256 of normalized prompt
  prompt TEXT NOT NULL,

  -- Cached result
  image_url TEXT NOT NULL,
  source TEXT NOT NULL,
  cost_usd DECIMAL(10, 4),

  -- Cache metadata
  hit_count INTEGER DEFAULT 1,
  last_accessed_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  expires_at TIMESTAMPTZ DEFAULT (NOW() + INTERVAL '30 days')
);

-- RLS: Cache is shared across users (intentional)
ALTER TABLE image_generation_cache ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read cache"
  ON image_generation_cache FOR SELECT
  USING (true);

-- Only Edge Functions can write (via service role)
CREATE POLICY "Service role can manage cache"
  ON image_generation_cache FOR ALL
  USING (auth.jwt() ->> 'role' = 'service_role');

-- Indexes
CREATE INDEX idx_cache_prompt_hash ON image_generation_cache(prompt_hash);
CREATE INDEX idx_cache_expires ON image_generation_cache(expires_at);

-- Update presentations table
ALTER TABLE presentations
ADD COLUMN IF NOT EXISTS slide_images JSONB DEFAULT '{}';

-- Example structure: {"1": "uuid-of-image", "2": "uuid-of-image"}

COMMENT ON COLUMN presentations.slide_images IS 'Maps slide numbers to generated_images.id';
```

**Estimated Time**: 4 hours (including testing)

---

#### **Day 3-4: Edge Function - Image Generation**

**Create**: `supabase/functions/generate-slide-image/index.ts`

```typescript
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { OpenAI } from 'https://esm.sh/openai@4';
import { createHash } from 'https://deno.land/std@0.168.0/hash/mod.ts';

const openai = new OpenAI({
  apiKey: Deno.env.get('OPENAI_API_KEY')!
});

const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
);

interface ImageRequest {
  conversationId: string;
  slideNumber: number;
  slideType: string;
  slideContent: string;
  profileId: string;
  presentationId?: string;
}

serve(async (req) => {
  try {
    // CORS
    if (req.method === 'OPTIONS') {
      return new Response(null, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'authorization, content-type'
        }
      });
    }

    // Parse request
    const {
      conversationId,
      slideNumber,
      slideType,
      slideContent,
      profileId,
      presentationId
    }: ImageRequest = await req.json();

    console.log(`[Image Gen] Starting for slide ${slideNumber} (${slideType})`);

    // Retrieve conversation context
    const { data: conversation } = await supabase
      .from('pitch_conversations')
      .select('collected_data, completeness')
      .eq('id', conversationId)
      .single();

    if (!conversation) {
      throw new Error('Conversation not found');
    }

    // DECISION: AI or Stock?
    const useAI = shouldUseAI(slideType, slideContent);

    if (useAI) {
      return await generateWithAI({
        slideType,
        slideContent,
        conversation: conversation.collected_data,
        profileId,
        presentationId,
        slideNumber
      });
    } else {
      return await fetchStockImage({
        slideType,
        slideContent,
        profileId,
        presentationId,
        slideNumber
      });
    }

  } catch (error) {
    console.error('[Image Gen] Error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
});

/**
 * Decision logic: When to use AI vs stock photos
 */
function shouldUseAI(slideType: string, content: string): boolean {
  // AI-required slides (need custom/branded visuals)
  const aiSlides = [
    'cover',
    'product_demo',
    'solution',
    'market_size',
    'business_model',
    'traction',
    'ask'
  ];

  // Stock-suitable slides (generic scenarios)
  const stockSlides = [
    'problem',
    'team',
    'competition'
  ];

  if (aiSlides.includes(slideType)) return true;
  if (stockSlides.includes(slideType)) return false;

  // Check content for AI indicators
  const aiIndicators = [
    'chart', 'graph', 'diagram', 'screenshot',
    'dashboard', 'metrics', 'data', 'numbers',
    'custom', 'branded', 'logo'
  ];

  return aiIndicators.some(indicator =>
    content.toLowerCase().includes(indicator)
  );
}

/**
 * Generate image using GPT-Image-1
 */
async function generateWithAI(params: any) {
  const startTime = Date.now();

  // Build optimized prompt
  const prompt = await buildPromptFromContext(params);

  // Check cache first
  const promptHash = createHash('sha256')
    .update(prompt)
    .toString();

  const { data: cached } = await supabase
    .from('image_generation_cache')
    .select('*')
    .eq('prompt_hash', promptHash)
    .gt('expires_at', new Date().toISOString())
    .single();

  if (cached) {
    console.log('[Image Gen] Cache HIT');

    // Update hit count
    await supabase
      .from('image_generation_cache')
      .update({
        hit_count: cached.hit_count + 1,
        last_accessed_at: new Date().toISOString()
      })
      .eq('id', cached.id);

    return new Response(
      JSON.stringify({
        source: 'cache',
        imageUrl: cached.image_url,
        cost: 0,
        cached: true
      }),
      { headers: { 'Content-Type': 'application/json' } }
    );
  }

  console.log('[Image Gen] Calling OpenAI GPT-Image-1...');

  // Call OpenAI Image API
  const response = await openai.images.generate({
    model: 'gpt-image-1',
    prompt: prompt,
    size: '1024x1024',
    quality: 'medium', // medium is good balance
    n: 1
  });

  const imageBase64 = response.data[0].b64_json;
  const revisedPrompt = response.data[0].revised_prompt || prompt;
  const generationTime = Date.now() - startTime;

  // Upload to Supabase Storage
  const fileName = `${params.profileId}/${params.presentationId || 'temp'}/${params.slideNumber}-${Date.now()}.png`;
  const imageBuffer = Uint8Array.from(atob(imageBase64), c => c.charCodeAt(0));

  const { data: upload } = await supabase.storage
    .from('generated-images')
    .upload(fileName, imageBuffer, {
      contentType: 'image/png',
      cacheControl: '3600',
      upsert: false
    });

  if (!upload) {
    throw new Error('Failed to upload image');
  }

  const { data: { publicUrl } } = supabase.storage
    .from('generated-images')
    .getPublicUrl(fileName);

  // Save metadata to database
  const { data: imageRecord } = await supabase
    .from('generated_images')
    .insert({
      profile_id: params.profileId,
      presentation_id: params.presentationId,
      slide_number: params.slideNumber,
      image_url: publicUrl,
      source: 'ai_gpt_image_1',
      prompt: prompt,
      revised_prompt: revisedPrompt,
      cost_usd: 0.015, // GPT-Image-1 cost
      tokens_used: 1056, // Medium quality, 1024x1024
      generation_time_ms: generationTime,
      model_version: 'gpt-image-1'
    })
    .select()
    .single();

  // Cache the result
  await supabase
    .from('image_generation_cache')
    .insert({
      prompt_hash: promptHash,
      prompt: prompt,
      image_url: publicUrl,
      source: 'ai_gpt_image_1',
      cost_usd: 0.015
    });

  console.log(`[Image Gen] ✅ Success in ${generationTime}ms`);

  return new Response(
    JSON.stringify({
      source: 'ai',
      imageUrl: publicUrl,
      imageId: imageRecord.id,
      cost: 0.015,
      generationTime: generationTime,
      revisedPrompt: revisedPrompt
    }),
    {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    }
  );
}

/**
 * Build optimized prompt from conversation context
 */
async function buildPromptFromContext(params: any): Promise<string> {
  const { slideType, slideContent, conversation } = params;

  // Use GPT-4o-mini to create optimized prompt
  const systemPrompt = `You are an expert at creating image generation prompts for pitch deck slides.

Create a detailed prompt for GPT-Image-1 that will generate a professional,
high-quality image suitable for an investor presentation.

Requirements:
- Professional business style
- Modern and clean design
- Photorealistic when appropriate
- If text is needed, specify EXACT text with quotation marks
- Appropriate for investor audience
- Image should be 1024x1024 square format

Context from user's pitch:
${JSON.stringify(conversation, null, 2)}

Slide type: ${slideType}
Slide content: ${slideContent}

Return ONLY the image generation prompt, nothing else.`;

  const response = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: `Create image prompt for ${slideType} slide` }
    ],
    temperature: 0.7,
    max_tokens: 300
  });

  return response.choices[0].message.content || slideContent;
}

/**
 * Fetch stock image from Pexels
 */
async function fetchStockImage(params: any) {
  const keywords = extractKeywords(params.slideContent);

  const response = await fetch(
    `https://api.pexels.com/v1/search?query=${encodeURIComponent(keywords)}&per_page=1&orientation=landscape`,
    {
      headers: {
        'Authorization': Deno.env.get('PEXELS_API_KEY')!
      }
    }
  );

  const data = await response.json();

  if (!data.photos || data.photos.length === 0) {
    throw new Error('No stock images found');
  }

  const photo = data.photos[0];

  // Save metadata
  const { data: imageRecord } = await supabase
    .from('generated_images')
    .insert({
      profile_id: params.profileId,
      presentation_id: params.presentationId,
      slide_number: params.slideNumber,
      image_url: photo.src.large,
      thumbnail_url: photo.src.medium,
      source: 'stock_pexels',
      prompt: keywords,
      cost_usd: 0,
      generation_time_ms: 100
    })
    .select()
    .single();

  return new Response(
    JSON.stringify({
      source: 'stock',
      imageUrl: photo.src.large,
      imageId: imageRecord.id,
      cost: 0,
      photographer: photo.photographer
    }),
    {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    }
  );
}

/**
 * Extract keywords from content for stock photo search
 */
function extractKeywords(content: string): string {
  // Simple keyword extraction (can be enhanced with NLP)
  const words = content
    .toLowerCase()
    .replace(/[^\w\s]/g, '')
    .split(/\s+/)
    .filter(word => word.length > 3);

  return words.slice(0, 5).join(' ');
}
```

**Deploy**:
```bash
# Set secrets
supabase secrets set OPENAI_API_KEY=sk-...
supabase secrets set PEXELS_API_KEY=...

# Deploy function
supabase functions deploy generate-slide-image
```

**Estimated Time**: 12 hours (including testing)

---

#### **Day 5-6: Frontend Integration**

**Update**: `src/lib/imageService.ts`

```typescript
import { supabase } from './supabase';

interface GenerateImageParams {
  conversationId: string;
  slideNumber: number;
  slideType: string;
  slideContent: string;
  presentationId?: string;
}

interface ImageResult {
  source: 'ai' | 'stock' | 'cache';
  imageUrl: string;
  imageId: string;
  cost: number;
  generationTime?: number;
  cached?: boolean;
}

export class ImageService {
  /**
   * Generate image for a pitch deck slide
   */
  static async generateSlideImage(
    params: GenerateImageParams
  ): Promise<ImageResult> {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      throw new Error('Not authenticated');
    }

    const response = await supabase.functions.invoke('generate-slide-image', {
      body: {
        ...params,
        profileId: user.id
      }
    });

    if (response.error) {
      throw new Error(response.error.message);
    }

    return response.data as ImageResult;
  }

  /**
   * Generate images for all slides in a presentation
   */
  static async generateAllSlideImages(
    conversationId: string,
    slides: Array<{ number: number; type: string; content: string }>
  ): Promise<Map<number, ImageResult>> {
    const results = new Map<number, ImageResult>();

    // Generate sequentially to avoid rate limits
    for (const slide of slides) {
      try {
        const result = await this.generateSlideImage({
          conversationId,
          slideNumber: slide.number,
          slideType: slide.type,
          slideContent: slide.content
        });

        results.set(slide.number, result);

        // Optional: Add delay to respect rate limits
        await new Promise(resolve => setTimeout(resolve, 1000));
      } catch (error) {
        console.error(`Failed to generate image for slide ${slide.number}:`, error);
        // Continue with other slides
      }
    }

    return results;
  }

  /**
   * Get generated image by ID
   */
  static async getImage(imageId: string) {
    const { data, error } = await supabase
      .from('generated_images')
      .select('*')
      .eq('id', imageId)
      .single();

    if (error) throw error;
    return data;
  }

  /**
   * Get all images for a presentation
   */
  static async getPresentationImages(presentationId: string) {
    const { data, error } = await supabase
      .from('generated_images')
      .select('*')
      .eq('presentation_id', presentationId)
      .order('slide_number', { ascending: true });

    if (error) throw error;
    return data;
  }

  /**
   * Calculate total cost for a presentation
   */
  static async getPresentationCost(presentationId: string): Promise<number> {
    const { data, error } = await supabase
      .from('generated_images')
      .select('cost_usd')
      .eq('presentation_id', presentationId);

    if (error) throw error;

    return data.reduce((sum, img) => sum + (img.cost_usd || 0), 0);
  }
}
```

**Update**: `src/pages/PitchDeckWizard.tsx`

```typescript
import { ImageService } from '@/lib/imageService';
import { useState } from 'react';

// Add to component state
const [generatingImages, setGeneratingImages] = useState(false);
const [imageProgress, setImageProgress] = useState(0);

// After deck generation is triggered
async function generatePitchDeck() {
  try {
    // ... existing deck generation logic ...

    // Generate images for slides
    setGeneratingImages(true);
    setImageProgress(0);

    const slides = [
      { number: 1, type: 'cover', content: collectedData.companyName },
      { number: 2, type: 'problem', content: collectedData.problem },
      { number: 3, type: 'solution', content: collectedData.solution },
      // ... more slides
    ];

    const totalSlides = slides.length;
    const imageResults = new Map();

    for (let i = 0; i < slides.length; i++) {
      const slide = slides[i];

      const result = await ImageService.generateSlideImage({
        conversationId: conversationId,
        slideNumber: slide.number,
        slideType: slide.type,
        slideContent: slide.content,
        presentationId: presentationId
      });

      imageResults.set(slide.number, result);
      setImageProgress(((i + 1) / totalSlides) * 100);
    }

    // Save image mappings to presentation
    const slideImages = Object.fromEntries(
      Array.from(imageResults.entries()).map(([num, result]) => [
        num,
        result.imageId
      ])
    );

    await supabase
      .from('presentations')
      .update({ slide_images: slideImages })
      .eq('id', presentationId);

    setGeneratingImages(false);
    toast.success('✨ Pitch deck with custom images generated!');

    // Redirect to presentation
    navigate(`/presentations/${presentationId}/outline`);

  } catch (error) {
    console.error('Error generating deck:', error);
    toast.error('Failed to generate pitch deck');
    setGeneratingImages(false);
  }
}
```

**Add Progress UI**:

```tsx
{generatingImages && (
  <div className="space-y-4">
    <div className="flex items-center justify-between">
      <span className="text-sm font-medium">
        Generating custom images...
      </span>
      <span className="text-sm text-muted-foreground">
        {Math.round(imageProgress)}%
      </span>
    </div>
    <Progress value={imageProgress} className="h-2" />
    <p className="text-xs text-muted-foreground">
      Creating professional visuals for your pitch deck
    </p>
  </div>
)}
```

**Estimated Time**: 12 hours (including testing & UI)

---

#### **Day 7: Testing & Bug Fixes**

**Test Cases**:

1. **Slide Image Generation**
   - ✅ Generate image for each slide type
   - ✅ Verify AI used for custom slides
   - ✅ Verify stock used for generic slides
   - ✅ Check image quality and relevance

2. **Cost Tracking**
   - ✅ Verify $0.015 charged for AI images
   - ✅ Verify $0 charged for stock images
   - ✅ Total cost calculation accurate

3. **Caching**
   - ✅ Same prompt returns cached image
   - ✅ Cache hit increments count
   - ✅ Cache expires after 30 days

4. **Error Handling**
   - ✅ OpenAI API failure (fallback to stock)
   - ✅ Pexels API failure (retry logic)
   - ✅ Storage upload failure
   - ✅ Rate limit handling

5. **Performance**
   - ✅ Image generation < 90 seconds
   - ✅ Parallel processing when possible
   - ✅ UI remains responsive

**Create Test Suite**: `e2e/image-generation.spec.ts`

```typescript
import { test, expect } from '@playwright/test';

test.describe('Image Generation', () => {
  test('should generate AI image for solution slide', async ({ page }) => {
    await page.goto('/pitch-deck-wizard');

    // Complete conversation to solution slide
    // ... conversation steps ...

    // Trigger generation
    await page.click('button:has-text("Generate Deck")');

    // Wait for image generation
    await page.waitForSelector('text=Generating custom images');

    // Should show progress
    const progress = page.locator('[role="progressbar"]');
    await expect(progress).toBeVisible();

    // Wait for completion (max 2 minutes)
    await page.waitForSelector('text=Pitch deck with custom images generated', {
      timeout: 120000
    });

    // Verify redirected to presentation
    await expect(page).toHaveURL(/\/presentations\/.*\/outline/);

    // Verify images are displayed
    const slideImage = page.locator('[data-slide="3"] img');
    await expect(slideImage).toBeVisible();
  });

  test('should use stock image for problem slide', async ({ page }) => {
    // ... test for stock image usage ...
  });

  test('should cache identical prompts', async ({ page }) => {
    // ... test for caching behavior ...
  });
});
```

**Estimated Time**: 8 hours

---

### Phase 2: Advanced Features (Week 2)

#### **Day 8-9: Hybrid Optimization**

**Intelligent Source Selection**:

```typescript
// Enhanced decision logic with cost optimization
async function optimizeImageSource(
  slideType: string,
  content: string,
  budget: number
): Promise<'ai' | 'stock'> {
  // Check budget constraints
  const estimatedAICost = 0.015;

  if (budget < estimatedAICost) {
    return 'stock'; // Force stock if budget low
  }

  // AI quality score (0-100)
  const aiQualityScore = calculateAIQualityScore(slideType, content);

  // Stock availability score (0-100)
  const stockAvailabilityScore = await checkStockAvailability(content);

  // Decision matrix
  if (aiQualityScore > 80 && budget >= estimatedAICost) {
    return 'ai'; // High value, use AI
  }

  if (stockAvailabilityScore > 70) {
    return 'stock'; // Good stock match, save cost
  }

  return 'ai'; // Default to AI for best quality
}

function calculateAIQualityScore(slideType: string, content: string): number {
  let score = 0;

  // High-value AI slides
  const highValueAI = ['product_demo', 'solution', 'market_size'];
  if (highValueAI.includes(slideType)) score += 50;

  // Check for AI indicators
  const aiIndicators = ['chart', 'graph', 'metrics', 'custom', 'branded'];
  const matches = aiIndicators.filter(indicator =>
    content.toLowerCase().includes(indicator)
  );
  score += matches.length * 10;

  return Math.min(score, 100);
}
```

**Estimated Time**: 8 hours

---

#### **Day 10-11: Image Editing & Refinement**

**Add Image Editing Capability**:

```typescript
// supabase/functions/edit-slide-image/index.ts

interface EditRequest {
  imageId: string;
  editPrompt: string; // "Make text larger", "Change to blue color scheme"
  profileId: string;
}

async function editImage(params: EditRequest) {
  // Get original image
  const { data: original } = await supabase
    .from('generated_images')
    .select('*')
    .eq('id', params.imageId)
    .single();

  if (!original) {
    throw new Error('Image not found');
  }

  // Download original image
  const { data: imageBlob } = await supabase.storage
    .from('generated-images')
    .download(original.image_url);

  if (!imageBlob) {
    throw new Error('Failed to download image');
  }

  // Convert to base64
  const arrayBuffer = await imageBlob.arrayBuffer();
  const base64Image = btoa(
    String.fromCharCode(...new Uint8Array(arrayBuffer))
  );

  // Call OpenAI Image Edit API
  const response = await openai.images.edit({
    model: 'gpt-image-1',
    image: base64Image,
    prompt: `${original.prompt}. ${params.editPrompt}`,
    size: '1024x1024'
  });

  const editedBase64 = response.data[0].b64_json;

  // Upload edited image
  const fileName = `${params.profileId}/edited/${Date.now()}.png`;
  const imageBuffer = Uint8Array.from(atob(editedBase64), c => c.charCodeAt(0));

  const { data: upload } = await supabase.storage
    .from('generated-images')
    .upload(fileName, imageBuffer, {
      contentType: 'image/png'
    });

  const { data: { publicUrl } } = supabase.storage
    .from('generated-images')
    .getPublicUrl(fileName);

  // Update database
  await supabase
    .from('generated_images')
    .update({
      image_url: publicUrl,
      revised_prompt: `${original.prompt}. ${params.editPrompt}`,
      updated_at: new Date().toISOString()
    })
    .eq('id', params.imageId);

  return {
    imageUrl: publicUrl,
    cost: 0.015 // Editing costs same as generation
  };
}
```

**Frontend UI for Editing**:

```tsx
// Component: ImageEditor.tsx
function ImageEditor({ imageId }: { imageId: string }) {
  const [editPrompt, setEditPrompt] = useState('');
  const [editing, setEditing] = useState(false);

  async function handleEdit() {
    setEditing(true);

    try {
      const { data } = await supabase.functions.invoke('edit-slide-image', {
        body: {
          imageId,
          editPrompt
        }
      });

      toast.success('Image updated!');
      // Refresh image display
    } catch (error) {
      toast.error('Failed to edit image');
    } finally {
      setEditing(false);
    }
  }

  return (
    <div className="space-y-4">
      <Input
        placeholder="Describe changes (e.g., make text larger, change to blue)"
        value={editPrompt}
        onChange={(e) => setEditPrompt(e.target.value)}
      />
      <Button onClick={handleEdit} disabled={editing}>
        {editing ? 'Editing...' : 'Edit Image'}
      </Button>
    </div>
  );
}
```

**Estimated Time**: 10 hours

---

#### **Day 12-13: Streaming & Progress**

**Add Streaming Support**:

```typescript
// Use streaming for better UX
async function generateWithStreaming(prompt: string) {
  const stream = await openai.images.generate({
    model: 'gpt-image-1',
    prompt: prompt,
    size: '1024x1024',
    stream: true,
    partial_images: 2 // Get 2 partial previews
  });

  for await (const event of stream) {
    if (event.type === 'image_generation.partial_image') {
      const idx = event.partial_image_index;
      const partialBase64 = event.b64_json;

      // Send partial image to frontend
      // User sees progressive generation
      yield {
        type: 'partial',
        index: idx,
        image: partialBase64
      };
    }

    if (event.type === 'image_generation.done') {
      yield {
        type: 'complete',
        image: event.b64_json
      };
    }
  }
}
```

**Estimated Time**: 8 hours

---

#### **Day 14: Optimization & Caching**

**Performance Optimizations**:

1. **Parallel Generation** (when possible):
```typescript
// Generate multiple slides in parallel
const results = await Promise.all(
  slides.map(slide =>
    ImageService.generateSlideImage({
      conversationId,
      slideNumber: slide.number,
      slideType: slide.type,
      slideContent: slide.content
    })
  )
);
```

2. **Smart Caching**:
```typescript
// Cache popular prompts
// Automatically reuse for similar requests
// 30-day expiration
```

3. **Lazy Loading**:
```typescript
// Load images on-demand as user scrolls
<img
  src={imageUrl}
  loading="lazy"
  alt={slideTitle}
/>
```

4. **Thumbnail Generation**:
```typescript
// Generate smaller previews for faster loading
const thumbnail = await sharp(imageBuffer)
  .resize(300, 300)
  .toBuffer();
```

**Estimated Time**: 8 hours

---

## 💰 COST ANALYSIS

### Development Costs

| Phase | Hours | Rate | Cost |
|-------|-------|------|------|
| Database Setup | 4 | $150 | $600 |
| Edge Function | 12 | $150 | $1,800 |
| Frontend Integration | 12 | $150 | $1,800 |
| Testing | 8 | $150 | $1,200 |
| **Phase 1 Total** | **36** | - | **$5,400** |
| Advanced Features | 26 | $150 | $3,900 |
| Optimization | 8 | $150 | $1,200 |
| **Phase 2 Total** | **34** | - | **$5,100** |
| **Grand Total** | **70** | - | **$10,500** |

### Operational Costs

**Per Pitch Deck** (10 slides):
- 3 stock images: $0.00
- 7 AI images: $0.105 ($0.015 × 7)
- **Total: $0.105 per deck**

**At Scale**:
- 100 decks/month: $10.50
- 1,000 decks/month: $105
- 10,000 decks/month: $1,050

**Infrastructure**:
- Supabase Storage: ~$0.021/GB/month
- Edge Function execution: $0.40/million invocations
- **Estimated**: $5-20/month for 1,000 decks

### ROI Analysis

**Revenue Potential** (if monetized):
- Free tier: Stock images only ($0 cost)
- Premium tier: AI images ($10/month subscription)
- Enterprise tier: Unlimited AI + editing ($50/month)

**Break-even**:
- Development cost: $10,500
- Need 1,050 premium subscriptions (1 month)
- Or 210 enterprise subscriptions (1 month)
- **Expected break-even: 2-3 months**

---

## 📊 SUCCESS METRICS

### Technical Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| Image Generation Speed | < 90 seconds | Average API response time |
| Success Rate | > 95% | Successful generations / total attempts |
| Cost per Image (AI) | $0.015 | Actual OpenAI charges |
| Cost per Image (Stock) | $0.00 | Pexels is free |
| Cache Hit Rate | > 30% | Cached / total requests |
| Storage Usage | < 100MB/deck | Average presentation size |

### User Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| Image Quality Score | > 4.5/5 | User ratings |
| Image Relevance | > 90% | Images kept vs regenerated |
| Feature Usage Rate | > 70% | Users using AI images |
| Premium Conversion | > 15% | Free → Premium upgrades |

### Business Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| Deck Quality Improvement | +30% | Investor feedback scores |
| User Satisfaction | > 4.7/5 | NPS for image feature |
| Cost Efficiency | < $0.15/deck | Total cost / decks generated |
| Revenue Impact | +25% | Premium subscription revenue |

---

## 🧪 TESTING STRATEGY

### Unit Tests

```typescript
// Test: Image source decision logic
describe('shouldUseAI', () => {
  it('should use AI for product_demo slides', () => {
    expect(shouldUseAI('product_demo', 'Our product')).toBe(true);
  });

  it('should use stock for team slides', () => {
    expect(shouldUseAI('team', 'Our team')).toBe(false);
  });

  it('should use AI for content with charts', () => {
    expect(shouldUseAI('metrics', 'Show revenue chart')).toBe(true);
  });
});

// Test: Prompt building
describe('buildPromptFromContext', () => {
  it('should include slide type and content', async () => {
    const prompt = await buildPromptFromContext({
      slideType: 'solution',
      slideContent: 'AI-powered assistant',
      conversation: { companyName: 'TechCo' }
    });

    expect(prompt).toContain('solution');
    expect(prompt).toContain('AI-powered assistant');
  });
});

// Test: Cost calculation
describe('ImageService.getPresentationCost', () => {
  it('should calculate total cost correctly', async () => {
    const cost = await ImageService.getPresentationCost('test-id');
    expect(cost).toBe(0.105); // 7 AI images × $0.015
  });
});
```

### Integration Tests

```typescript
// Test: Full image generation flow
test('should generate and store image', async () => {
  const result = await ImageService.generateSlideImage({
    conversationId: 'test-conv',
    slideNumber: 1,
    slideType: 'solution',
    slideContent: 'AI assistant for developers'
  });

  expect(result.source).toBe('ai');
  expect(result.imageUrl).toMatch(/^https:/);
  expect(result.cost).toBe(0.015);

  // Verify database record
  const image = await ImageService.getImage(result.imageId);
  expect(image.source).toBe('ai_gpt_image_1');
});

// Test: Caching
test('should use cache for duplicate prompts', async () => {
  // First generation
  const result1 = await ImageService.generateSlideImage({
    conversationId: 'test',
    slideNumber: 1,
    slideType: 'solution',
    slideContent: 'Same content'
  });

  // Second generation (should be cached)
  const result2 = await ImageService.generateSlideImage({
    conversationId: 'test',
    slideNumber: 2,
    slideType: 'solution',
    slideContent: 'Same content'
  });

  expect(result2.cached).toBe(true);
  expect(result2.cost).toBe(0);
});
```

### E2E Tests

```typescript
// Test: Complete user journey
test('user can generate pitch deck with custom images', async ({ page }) => {
  // 1. Start wizard
  await page.goto('/pitch-deck-wizard');

  // 2. Complete conversation
  await completePitchDeckConversation(page);

  // 3. Generate deck with images
  await page.click('button:has-text("Generate Deck")');

  // 4. Wait for image generation
  await page.waitForSelector('text=Generating custom images');

  // 5. Verify progress
  const progress = page.locator('text=/\d+%/');
  await expect(progress).toBeVisible();

  // 6. Wait for completion (max 3 minutes for 10 images)
  await page.waitForSelector('text=Pitch deck with custom images generated', {
    timeout: 180000
  });

  // 7. Verify presentation page
  await expect(page).toHaveURL(/\/presentations\/.*\/outline/);

  // 8. Verify all images loaded
  const slideImages = page.locator('[data-slide-image]');
  await expect(slideImages).toHaveCount(10);
});
```

---

## 🚀 DEPLOYMENT PLAN

### Prerequisites

1. **Supabase Setup**:
   ```bash
   # Create storage bucket
   supabase storage create generated-images --public

   # Run migrations
   supabase db push

   # Set secrets
   supabase secrets set OPENAI_API_KEY=sk-...
   supabase secrets set PEXELS_API_KEY=...
   ```

2. **OpenAI Account**:
   - API key with GPT-Image-1 access
   - Organization verification complete
   - Billing enabled

3. **Pexels Account**:
   - Free API key obtained
   - Request unlimited quota (if needed)

### Deployment Steps

**Phase 1 Deployment** (Week 1):

```bash
# Day 1-2: Database
supabase db push
# Verify tables created

# Day 3-4: Edge Function
supabase functions deploy generate-slide-image
# Test with curl

# Day 5-6: Frontend
git add .
git commit -m "feat: Add GPT-Image-1 integration"
git push origin feature/image-generation

# Deploy to production (Vercel/Netlify)
vercel --prod

# Day 7: Testing
pnpm test:e2e
# Fix any issues

# Monitor
supabase logs --follow
```

**Phase 2 Deployment** (Week 2):

```bash
# Day 8-13: Advanced features
supabase functions deploy edit-slide-image
git push origin feature/image-editing

# Day 14: Optimization
# Deploy final version
vercel --prod

# Monitor performance
# Check costs in OpenAI dashboard
```

---

## 📈 MONITORING & MAINTENANCE

### Key Metrics to Track

1. **API Performance**:
   - OpenAI response times
   - Pexels response times
   - Edge Function execution time
   - Storage upload speed

2. **Costs**:
   - Daily OpenAI spend
   - Monthly Supabase storage costs
   - Edge Function invocations

3. **Quality**:
   - Image regeneration rate
   - User satisfaction scores
   - Cache hit rate

4. **Errors**:
   - Failed image generations
   - Timeout errors
   - Storage upload failures

### Monitoring Setup

```typescript
// Add to Edge Function
import { logError, logMetric } from './monitoring';

try {
  const startTime = Date.now();

  // ... image generation logic ...

  const duration = Date.now() - startTime;
  logMetric('image_generation_duration', duration);
  logMetric('image_generation_success', 1);

} catch (error) {
  logError('image_generation_failed', error);
  logMetric('image_generation_error', 1);
}
```

**Alerts**:
- Error rate > 5%
- Average generation time > 2 minutes
- Daily cost > $50
- Storage > 10GB

---

## 🛠️ TROUBLESHOOTING GUIDE

### Common Issues

**1. Image Generation Timeout**

**Symptom**: Generation takes > 2 minutes
**Cause**: Complex prompts or OpenAI API slow
**Solution**:
```typescript
// Add timeout with retry
const timeout = 120000; // 2 minutes

const controller = new AbortController();
const timeoutId = setTimeout(() => controller.abort(), timeout);

try {
  const response = await openai.images.generate({
    signal: controller.signal,
    // ... other params
  });
} catch (error) {
  if (error.name === 'AbortError') {
    // Retry with simpler prompt
    // Or fallback to stock image
  }
}
```

**2. Storage Upload Failure**

**Symptom**: Image generated but not saved
**Cause**: Storage quota exceeded or network issue
**Solution**:
```typescript
// Retry logic
async function uploadWithRetry(buffer, fileName, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      const { data } = await supabase.storage
        .from('generated-images')
        .upload(fileName, buffer);

      return data;
    } catch (error) {
      if (i === retries - 1) throw error;
      await new Promise(r => setTimeout(r, 1000 * (i + 1)));
    }
  }
}
```

**3. Poor Image Quality**

**Symptom**: Images don't match slide content
**Cause**: Generic prompts or insufficient context
**Solution**:
- Improve prompt engineering
- Include more conversation context
- Use revised_prompt from GPT-Image-1
- Add style modifiers

**4. High Costs**

**Symptom**: Monthly costs exceed budget
**Cause**: Too many AI generations, low cache hit rate
**Solution**:
- Increase cache duration
- Improve stock photo selection
- Batch generate during off-peak
- Implement usage quotas

---

## 📚 RESOURCES

### Documentation
- **OpenAI GPT-Image-1**: https://platform.openai.com/docs/guides/image-generation
- **Pexels API**: https://www.pexels.com/api/documentation/
- **Supabase Storage**: https://supabase.com/docs/guides/storage
- **Supabase Edge Functions**: https://supabase.com/docs/guides/functions

### Related Docs
- `IMAGE-API-COMPREHENSIVE-GUIDE.md` - Full API comparison
- `06-gpt-image1.md` - Official OpenAI documentation
- `01-PRODUCTION-PROGRESS-TRACKER.md` - Overall project status

### Code Examples
- Official OpenAI examples: https://github.com/openai/openai-cookbook
- Supabase examples: https://github.com/supabase/supabase/tree/master/examples

---

## ✅ CHECKLIST

### Pre-Implementation
- [ ] OpenAI API key obtained and verified
- [ ] Pexels API key obtained
- [ ] Supabase project ready
- [ ] Budget approved ($10,500 dev + operational)
- [ ] Timeline approved (2 weeks)

### Phase 1 (Week 1)
- [ ] Database migrations created and tested
- [ ] Edge Function deployed and working
- [ ] Frontend integration complete
- [ ] Basic tests passing
- [ ] Manual QA completed

### Phase 2 (Week 2)
- [ ] Hybrid optimization implemented
- [ ] Image editing feature working
- [ ] Streaming progress implemented
- [ ] Caching optimized
- [ ] E2E tests passing

### Post-Implementation
- [ ] Production deployment successful
- [ ] Monitoring setup and alerting
- [ ] Documentation updated
- [ ] User training materials created
- [ ] Performance baseline established

---

## 🎯 NEXT STEPS

1. **Review this plan** with team (1 hour)
2. **Obtain approvals** (budget, timeline) (1 day)
3. **Setup prerequisites** (APIs, accounts) (2 hours)
4. **Begin Phase 1 implementation** (Week 1)
5. **Conduct mid-point review** (after Day 7)
6. **Complete Phase 2** (Week 2)
7. **Deploy to production** (Day 14)
8. **Monitor and optimize** (ongoing)

---

**Document Version**: 1.0
**Created**: October 18, 2025
**Last Updated**: October 18, 2025
**Status**: ✅ Ready for Implementation
**Priority**: 🟡 High (Post-Production)

---

*This implementation plan provides a complete roadmap for adding GPT-Image-1 to the Medellin Spark Pitch Deck Wizard, with detailed architecture, code examples, cost analysis, and testing strategy.*
