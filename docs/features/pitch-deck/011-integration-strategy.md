# Integration Strategy: Medellin AI + Presentation-AI

**Document Version:** 1.0
**Date:** 2025-10-13
**Purpose:** Define integration strategy for Presentation-AI as pitch-deck generator module in Medellin AI

---

## Table of Contents

1. [Executive Summary](#executive-summary)
2. [System Overview](#system-overview)
3. [Integration Architecture](#integration-architecture)
4. [API & Data Flow](#api--data-flow)
5. [Authentication & Security](#authentication--security)
6. [Storage & Export Strategy](#storage--export-strategy)
7. [Implementation Roadmap](#implementation-roadmap)
8. [Best Practices](#best-practices)
9. [Recommendations](#recommendations)

---

## Executive Summary

### Integration Goal

Transform **Presentation-AI** from a standalone pitch deck generator into a **first-class module** of the Medellin AI platform, enabling startup founders and event organizers to generate professional presentations with a single click.

### Key Benefits

✅ **One-Click Deck Generation** - Founders generate startup pitch decks directly from their startup profile
✅ **Event Presentations** - Organizers create event slides with branding and agenda
✅ **Data Reusability** - Leverage existing Medellin AI data (profiles, events, perks)
✅ **Privacy First** - RLS policies ensure users only access their own decks
✅ **Export Flexibility** - PDF, PPTX, and shareable links

### Integration Approach

**API-First Architecture**: Presentation-AI exposes REST API endpoints consumed by Medellin AI via Supabase Edge Functions. No direct database coupling - clean separation of concerns.

---

## System Overview

### Medellin AI Platform

**Tech Stack:**
- **Frontend:** React 18 + TypeScript + Vite
- **UI:** shadcn/ui + Tailwind CSS 3.x
- **Backend:** Supabase (PostgreSQL 15 + Auth + Storage + RLS)
- **Deployment:** Vercel (frontend) + Supabase Cloud (backend)

**Core Features:**
- Events Management (9 tables)
- Jobs Marketplace (6 tables)
- Startup Perks (4 tables)
- Pitch Deck Wizard (1 table: `wizard_sessions`)

**Key Tables for Integration:**
- `profiles` - User authentication and identity
- `startup_profiles` - Startup company data (name, description, stage, industry)
- `wizard_sessions` - Wizard state and generated deck URLs
- `events` - Event data for presentation generation

### Presentation-AI System

**Tech Stack:**
- **Frontend:** Next.js 15 + React 19 + TypeScript
- **Editor:** Plate.js (rich text) + custom layouts
- **Backend:** Prisma + PostgreSQL + NextAuth
- **AI:** OpenAI GPT-4 / TogetherAI (Llama 3.3) for generation
- **Export:** pdf-lib (PDF) + pptxgenjs (PowerPoint)

**Core Features:**
- Outline generation with web search (Tavily API)
- Slide generation with 15+ layouts (COLUMNS, BULLETS, ICONS, etc.)
- Rich text editing with Plate.js
- Image generation (Unsplash, AI, or custom)
- Export to PDF/PPTX with theme customization

**Key Tables:**
- `User` - Authentication (NextAuth)
- `BaseDocument` - Generic document wrapper
- `Presentation` - Presentation content (slides, theme, outline)
- `CustomTheme` - Custom branding themes

---

## Integration Architecture

### Architecture Pattern: API Gateway via Supabase Edge Functions

**Why This Approach?**

1. **Separation of Concerns** - Presentation-AI remains independent, testable, and reusable
2. **Security** - Medellin AI never directly accesses Presentation-AI database
3. **Scalability** - Presentation-AI can scale independently (e.g., containerized on AWS ECS)
4. **Simplicity** - No schema synchronization, no migration coordination

### Integration Flow: Mermaid Diagram

```mermaid
flowchart LR
    subgraph MedellinAI[Medellin AI Platform]
        A[User Dashboard<br/>React + Supabase Client]
        B[Supabase Edge Function<br/>generate_deck]
        C[Supabase DB<br/>wizard_sessions table]
    end

    subgraph PresentationAI[Presentation-AI Service]
        D[API Endpoint<br/>/api/presentation/generate]
        E[AI Generation Engine<br/>OpenAI / TogetherAI]
        F[Prisma DB<br/>Presentation table]
        G[Export Service<br/>PDF / PPTX]
    end

    subgraph Storage[File Storage]
        H[Supabase Storage<br/>Bucket: pitch-decks]
        I[Presentation-AI Storage<br/>Uploads / Generated]
    end

    A -->|1. Click Generate Deck| B
    B -->|2. Prepare JSON Prompt<br/>Sanitize PII| D
    D -->|3. Generate Outline + Slides| E
    E -->|4. Store Presentation| F
    F -->|5. Export PDF/PPTX| G
    G -->|6. Upload to Storage| I
    I -->|7. Return URLs + Metadata| D
    D -->|8. Webhook Response| B
    B -->|9. Update wizard_sessions<br/>Store deck_url| C
    C -->|10. Notify User<br/>Display Deck| A

    style A fill:#e3f2fd
    style B fill:#fff3e0
    style C fill:#e8f5e9
    style D fill:#fce4ec
    style E fill:#f3e5f5
    style F fill:#fce4ec
    style G fill:#f3e5f5
    style H fill:#e8f5e9
    style I fill:#fce4ec
```

### Flow Explanation

**Step 1-2: User Initiates Deck Generation**
- User clicks "Generate Pitch Deck" button in Medellin AI dashboard
- Supabase Edge Function `generate_deck` retrieves user's startup profile data
- Function sanitizes data (removes PII, prepares JSON prompt)

**Step 3-5: AI Generation**
- Edge Function calls Presentation-AI API `/api/presentation/generate`
- Presentation-AI generates outline (optional web search via Tavily)
- AI generates slides with layouts, images, and content
- Presentation stored in Presentation-AI database

**Step 6-7: Export & Storage**
- Presentation-AI exports to PDF and PPTX
- Files uploaded to Presentation-AI's storage (or Supabase Storage via webhook)
- URLs returned to Medellin AI

**Step 8-10: Update & Notify**
- Webhook response updates `wizard_sessions.deck_url` in Medellin AI
- User receives notification (toast, email)
- Dashboard displays generated deck with preview and download buttons

---

## API & Data Flow

### Presentation-AI API Endpoints (To Be Created)

#### 1. **POST /api/external/generate-deck**

**Purpose:** Generate pitch deck from external system (Medellin AI)

**Request:**
```json
{
  "api_key": "medellin_api_key_here",
  "user_id": "external_user_id",
  "prompt": "Create a pitch deck for a SaaS startup in fintech",
  "data": {
    "startup_name": "FinFlow",
    "description": "AI-powered financial planning for SMEs",
    "industry": "Fintech",
    "stage": "Seed",
    "team_size": 8,
    "problem": "SMEs lack affordable financial planning tools",
    "solution": "AI-driven insights with subscription model",
    "market_size": "$50B TAM",
    "business_model": "SaaS subscription $99/mo",
    "traction": "500 users, $10k MRR"
  },
  "theme": "default",
  "language": "en-US",
  "image_source": "unsplash",
  "webhook_url": "https://<project>.supabase.co/functions/v1/deck-webhook"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "presentation_id": "pres_abc123",
  "status": "generating",
  "message": "Deck generation started. Webhook will be called on completion."
}
```

**Webhook Payload (POST to webhook_url):**
```json
{
  "presentation_id": "pres_abc123",
  "status": "completed",
  "deck_url": "https://medellin-presentation.com/view/pres_abc123",
  "pdf_url": "https://storage.medellin.com/decks/pres_abc123.pdf",
  "pptx_url": "https://storage.medellin.com/decks/pres_abc123.pptx",
  "thumbnail_url": "https://storage.medellin.com/decks/pres_abc123_thumb.png",
  "slide_count": 12,
  "created_at": "2025-10-13T15:30:00Z"
}
```

#### 2. **GET /api/external/presentation/:id**

**Purpose:** Retrieve presentation metadata and content

**Request:**
```http
GET /api/external/presentation/pres_abc123
Authorization: Bearer medellin_api_key_here
```

**Response (200 OK):**
```json
{
  "success": true,
  "presentation": {
    "id": "pres_abc123",
    "title": "FinFlow - Pitch Deck",
    "slide_count": 12,
    "theme": "default",
    "created_at": "2025-10-13T15:30:00Z",
    "updated_at": "2025-10-13T15:35:00Z",
    "urls": {
      "view": "https://medellin-presentation.com/view/pres_abc123",
      "pdf": "https://storage.medellin.com/decks/pres_abc123.pdf",
      "pptx": "https://storage.medellin.com/decks/pres_abc123.pptx"
    }
  }
}
```

#### 3. **POST /api/external/export**

**Purpose:** Trigger re-export to PDF/PPTX (e.g., after theme change)

**Request:**
```json
{
  "api_key": "medellin_api_key_here",
  "presentation_id": "pres_abc123",
  "formats": ["pdf", "pptx"],
  "theme": "corporate"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "exports": [
    {
      "format": "pdf",
      "url": "https://storage.medellin.com/decks/pres_abc123_v2.pdf"
    },
    {
      "format": "pptx",
      "url": "https://storage.medellin.com/decks/pres_abc123_v2.pptx"
    }
  ]
}
```

### Supabase Edge Function: `generate_deck`

**Location:** `/supabase/functions/generate_deck/index.ts`

**Function Logic:**

```typescript
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

serve(async (req) => {
  try {
    // 1. Authenticate user
    const authHeader = req.headers.get("Authorization")!;
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_ANON_KEY")!,
      { global: { headers: { Authorization: authHeader } } }
    );

    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }

    // 2. Get startup profile
    const { data: profile, error: profileError } = await supabase
      .from("startup_profiles")
      .select("*, profiles(*)")
      .eq("profile_id", user.id)
      .single();

    if (profileError || !profile) {
      return new Response(JSON.stringify({ error: "Startup profile not found" }), { status: 404 });
    }

    // 3. Prepare sanitized prompt data (NO PII)
    const promptData = {
      startup_name: profile.company_name,
      description: profile.description,
      industry: profile.industry,
      stage: profile.stage,
      team_size: profile.team_size,
      // Add more fields as needed (problem, solution, traction, etc.)
    };

    // 4. Call Presentation-AI API
    const presentationApiKey = Deno.env.get("PRESENTATION_AI_API_KEY")!;
    const presentationApiUrl = Deno.env.get("PRESENTATION_AI_URL")!;

    const response = await fetch(`${presentationApiUrl}/api/external/generate-deck`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${presentationApiKey}`
      },
      body: JSON.stringify({
        user_id: user.id,
        prompt: `Create a pitch deck for ${profile.company_name}`,
        data: promptData,
        theme: "default",
        language: "en-US",
        image_source: "unsplash",
        webhook_url: `${Deno.env.get("SUPABASE_URL")}/functions/v1/deck-webhook`
      })
    });

    const result = await response.json();

    // 5. Create wizard session record
    const { data: session, error: sessionError } = await supabase
      .from("wizard_sessions")
      .insert({
        profile_id: user.id,
        startup_name: profile.company_name,
        session_data: {
          presentation_id: result.presentation_id,
          status: "generating"
        },
        completed: false
      })
      .select()
      .single();

    return new Response(
      JSON.stringify({
        success: true,
        message: "Deck generation started",
        session_id: session.id,
        presentation_id: result.presentation_id
      }),
      { headers: { "Content-Type": "application/json" }, status: 200 }
    );

  } catch (error) {
    console.error("Error generating deck:", error);
    return new Response(
      JSON.stringify({ error: "Failed to generate deck" }),
      { status: 500 }
    );
  }
});
```

### Webhook Handler: `deck_webhook`

**Location:** `/supabase/functions/deck_webhook/index.ts`

**Function Logic:**

```typescript
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

serve(async (req) => {
  try {
    // 1. Verify webhook signature (IMPORTANT: Prevent unauthorized calls)
    const webhookSecret = Deno.env.get("PRESENTATION_AI_WEBHOOK_SECRET")!;
    const signature = req.headers.get("X-Webhook-Signature");
    // TODO: Implement HMAC signature verification

    // 2. Parse webhook payload
    const payload = await req.json();
    const { presentation_id, status, deck_url, pdf_url, pptx_url, thumbnail_url } = payload;

    // 3. Update wizard_sessions table
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")! // Service role for server-side updates
    );

    const { data, error } = await supabase
      .from("wizard_sessions")
      .update({
        deck_url: deck_url,
        session_data: {
          presentation_id,
          status,
          pdf_url,
          pptx_url,
          thumbnail_url
        },
        completed: status === "completed",
        updated_at: new Date().toISOString()
      })
      .eq("session_data->presentation_id", presentation_id)
      .select()
      .single();

    if (error) {
      console.error("Error updating wizard session:", error);
      return new Response(JSON.stringify({ error: "Failed to update session" }), { status: 500 });
    }

    // 4. (Optional) Send email notification to user
    // await sendEmail(data.profile_id, "Your pitch deck is ready!", deck_url);

    return new Response(
      JSON.stringify({ success: true, message: "Webhook processed" }),
      { status: 200 }
    );

  } catch (error) {
    console.error("Error processing webhook:", error);
    return new Response(JSON.stringify({ error: "Webhook processing failed" }), { status: 500 });
  }
});
```

---

## Authentication & Security

### Option 1: Shared JWT (Supabase Auth) ⭐ RECOMMENDED

**How It Works:**

1. User authenticates with Medellin AI (Supabase Auth)
2. Medellin AI Edge Function calls Presentation-AI with user's JWT
3. Presentation-AI validates JWT using Supabase public key
4. Presentation-AI creates/links user record using JWT claims (`sub` = user_id)

**Benefits:**
- ✅ Single source of truth for authentication
- ✅ No password sync required
- ✅ RLS policies automatically enforced
- ✅ User can access Presentation-AI directly if needed

**Implementation:**

**Presentation-AI: JWT Validation Middleware**

```typescript
// /src/middleware/supabase-auth.ts
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function validateSupabaseJWT(req: NextRequest) {
  const authHeader = req.headers.get("Authorization");
  if (!authHeader?.startsWith("Bearer ")) {
    return { valid: false, user: null };
  }

  const token = authHeader.substring(7);
  const supabase = createClient(
    process.env.MEDELLIN_SUPABASE_URL!,
    process.env.MEDELLIN_SUPABASE_ANON_KEY!
  );

  const { data: { user }, error } = await supabase.auth.getUser(token);

  return { valid: !error && !!user, user };
}
```

**Presentation-AI: API Route Protection**

```typescript
// /src/app/api/external/generate-deck/route.ts
import { validateSupabaseJWT } from "@/middleware/supabase-auth";

export async function POST(req: Request) {
  // 1. Validate JWT
  const { valid, user } = await validateSupabaseJWT(req);
  if (!valid || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // 2. Find or create user in Presentation-AI DB
  const presentationUser = await db.user.upsert({
    where: { id: user.id },
    update: { email: user.email, name: user.user_metadata.full_name },
    create: {
      id: user.id,
      email: user.email!,
      name: user.user_metadata.full_name,
      hasAccess: true
    }
  });

  // 3. Continue with deck generation...
}
```

### Option 2: API Key Authentication (Fallback)

**How It Works:**

1. Presentation-AI generates API key for Medellin AI
2. Medellin AI includes API key in all requests
3. Presentation-AI validates API key, associates with Medellin AI account
4. Presentation-AI creates internal user records with external ID mapping

**Benefits:**
- ✅ Simple to implement
- ✅ No JWT validation required
- ✅ Works even if Supabase Auth changes

**Drawbacks:**
- ❌ Requires user ID mapping (external_id → internal_id)
- ❌ No direct user access to Presentation-AI
- ❌ Revocation requires API key rotation

**Implementation:**

**Presentation-AI: API Key Table**

```sql
CREATE TABLE api_keys (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT NOT NULL UNIQUE,
  client_name TEXT NOT NULL, -- e.g., "Medellin AI"
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  expires_at TIMESTAMPTZ,
  revoked_at TIMESTAMPTZ
);

CREATE INDEX idx_api_keys_key ON api_keys(key) WHERE revoked_at IS NULL;
```

**Presentation-AI: API Key Validation**

```typescript
// /src/middleware/api-key-auth.ts
import { db } from "@/server/db";

export async function validateApiKey(req: Request): Promise<{ valid: boolean; client: string | null }> {
  const apiKey = req.headers.get("X-API-Key");
  if (!apiKey) return { valid: false, client: null };

  const key = await db.apiKey.findFirst({
    where: {
      key: apiKey,
      revoked_at: null,
      OR: [
        { expires_at: null },
        { expires_at: { gt: new Date() } }
      ]
    }
  });

  return { valid: !!key, client: key?.client_name ?? null };
}
```

### Security Best Practices

1. **Rate Limiting** - Limit API calls per client (e.g., 100 requests/hour)
2. **Webhook Signature Verification** - Use HMAC-SHA256 to verify webhook authenticity
3. **HTTPS Only** - Enforce TLS for all API calls
4. **Sanitize Inputs** - Remove PII, validate all fields before processing
5. **Audit Logs** - Log all API calls with timestamps, user IDs, and results

---

## Storage & Export Strategy

### Option 1: Hybrid Storage ⭐ RECOMMENDED

**Approach:**

- **Presentation-AI** stores presentation content (slides, JSON) in its own database
- **Medellin AI** stores exported files (PDF, PPTX) in Supabase Storage bucket `pitch-decks`
- Webhook delivers URLs to both systems

**Benefits:**
- ✅ Medellin AI controls access to exported files (RLS policies)
- ✅ Presentation-AI can regenerate exports without external dependency
- ✅ Users download files directly from Medellin AI (faster, no CORS issues)

**Implementation:**

**Supabase Storage Bucket: `pitch-decks`**

```sql
-- Create storage bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('pitch-decks', 'pitch-decks', false);

-- RLS policy: Users can only access their own decks
CREATE POLICY "Users can view their own pitch decks"
  ON storage.objects FOR SELECT
  TO authenticated
  USING (
    bucket_id = 'pitch-decks'
    AND (storage.foldername(name))[1] = auth.uid()::text
  );

-- RLS policy: Edge functions can upload decks
CREATE POLICY "Service role can upload pitch decks"
  ON storage.objects FOR INSERT
  TO service_role
  WITH CHECK (bucket_id = 'pitch-decks');
```

**Webhook Handler: Upload to Supabase Storage**

```typescript
// /supabase/functions/deck_webhook/index.ts (continued)
async function uploadToSupabaseStorage(userId: string, presentationId: string, pdfUrl: string, pptxUrl: string) {
  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
  );

  // Download PDF from Presentation-AI
  const pdfResponse = await fetch(pdfUrl);
  const pdfBlob = await pdfResponse.blob();

  // Upload to Supabase Storage
  const pdfPath = `${userId}/${presentationId}.pdf`;
  const { data: pdfData, error: pdfError } = await supabase.storage
    .from("pitch-decks")
    .upload(pdfPath, pdfBlob, { contentType: "application/pdf", upsert: true });

  if (pdfError) throw pdfError;

  // Repeat for PPTX
  const pptxResponse = await fetch(pptxUrl);
  const pptxBlob = await pptxResponse.blob();
  const pptxPath = `${userId}/${presentationId}.pptx`;
  const { data: pptxData, error: pptxError } = await supabase.storage
    .from("pitch-decks")
    .upload(pptxPath, pptxBlob, {
      contentType: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
      upsert: true
    });

  if (pptxError) throw pptxError;

  // Generate public URLs
  const { data: pdfPublicUrl } = supabase.storage
    .from("pitch-decks")
    .getPublicUrl(pdfPath);

  const { data: pptxPublicUrl } = supabase.storage
    .from("pitch-decks")
    .getPublicUrl(pptxPath);

  return {
    pdf_url: pdfPublicUrl.publicUrl,
    pptx_url: pptxPublicUrl.publicUrl
  };
}
```

### Option 2: Presentation-AI Storage Only

**Approach:**

- Presentation-AI hosts all files (slides, exports)
- Medellin AI displays iframes or links to Presentation-AI

**Benefits:**
- ✅ Simple implementation (no file transfers)
- ✅ Presentation-AI controls access and versioning

**Drawbacks:**
- ❌ CORS issues for downloads
- ❌ Medellin AI depends on Presentation-AI uptime
- ❌ No RLS enforcement on exports

---

## Implementation Roadmap

### Phase 1: Core Integration (Week 1-2)

**Goal:** Enable basic deck generation from Medellin AI

**Tasks:**

1. **Presentation-AI:**
   - ✅ Create `/api/external/generate-deck` endpoint
   - ✅ Implement JWT validation middleware
   - ✅ Add webhook support for async generation
   - ✅ Test with Postman / curl

2. **Medellin AI:**
   - ✅ Create Supabase Edge Function `generate_deck`
   - ✅ Create Supabase Edge Function `deck_webhook`
   - ✅ Add "Generate Pitch Deck" button in dashboard
   - ✅ Update `wizard_sessions` table schema (add `presentation_id`, `pdf_url`, `pptx_url`)

3. **Testing:**
   - ✅ End-to-end test: Click button → Deck generated → URLs displayed
   - ✅ Verify RLS policies (users can only see their own decks)
   - ✅ Verify error handling (API down, invalid data, etc.)

**Success Criteria:**
- User clicks "Generate Pitch Deck" and receives deck URL within 30 seconds
- PDF and PPTX downloads work correctly
- No errors in production logs

### Phase 2: Enhanced Features (Week 3-4)

**Goal:** Add customization and event presentation support

**Tasks:**

1. **Customization:**
   - ✅ Add theme selector (default, corporate, modern, minimal)
   - ✅ Allow logo upload (stored in `startup_profiles.logo_url`)
   - ✅ Pass logo URL to Presentation-AI (injected in slides)

2. **Event Presentations:**
   - ✅ Add "Generate Event Slides" button in event management
   - ✅ Create Edge Function `generate_event_deck` (similar to `generate_deck`)
   - ✅ Prepare event data prompt (title, date, venue, sponsors, agenda)

3. **UI Improvements:**
   - ✅ Show deck generation progress (loading spinner)
   - ✅ Display thumbnail preview of generated deck
   - ✅ Add "Edit in Presentation-AI" link (opens editor with pre-filled data)

**Success Criteria:**
- Users can generate event presentations with custom branding
- Users can preview decks before downloading
- Users can edit decks in Presentation-AI (seamless redirect)

### Phase 3: Production Optimization (Week 5+)

**Goal:** Scale, monitor, and optimize integration

**Tasks:**

1. **Performance:**
   - ✅ Add caching layer (Redis) for API responses
   - ✅ Implement CDN for exported files (CloudFlare, AWS CloudFront)
   - ✅ Optimize image generation (lazy loading, compression)

2. **Monitoring:**
   - ✅ Add Sentry error tracking for Edge Functions
   - ✅ Add PostHog analytics for deck generation events
   - ✅ Set up alerts for API failures (PagerDuty, Slack)

3. **User Feedback:**
   - ✅ Add "Rate this deck" feature (thumbs up/down)
   - ✅ Collect feedback on generated content quality
   - ✅ A/B test different AI models (GPT-4 vs Llama 3.3)

**Success Criteria:**
- 95% of deck generation requests succeed within 30 seconds
- <1% error rate on API calls
- Average user rating >4.0/5.0

---

## Best Practices

### 1. **Keep Systems Loosely Coupled**

✅ **DO:** Use REST APIs with well-defined contracts
❌ **DON'T:** Share database credentials or direct DB access

**Why:** If Presentation-AI needs to migrate databases (e.g., Prisma → Drizzle, Postgres → MongoDB), Medellin AI is unaffected.

### 2. **Sanitize All Data Before Sending to External APIs**

✅ **DO:** Remove PII (emails, phone numbers) from prompts
✅ **DO:** Validate all fields (max length, allowed characters)
❌ **DON'T:** Send raw user input directly to AI models

**Example:**

```typescript
// BAD: Sends raw email
const prompt = `Create pitch deck for ${profile.email}`;

// GOOD: Sanitizes email
const sanitizedName = profile.company_name.replace(/[^a-zA-Z0-9\s]/g, "");
const prompt = `Create pitch deck for ${sanitizedName}`;
```

### 3. **Use Webhooks for Async Operations**

✅ **DO:** Return 202 Accepted immediately, process in background
❌ **DON'T:** Block HTTP request until deck generation completes (30+ seconds)

**Why:** Browsers timeout after 30 seconds. Webhooks allow users to continue working while deck generates.

### 4. **Implement Idempotency**

✅ **DO:** Allow duplicate API calls (same presentation_id) without side effects
❌ **DON'T:** Create duplicate presentations on retry

**Implementation:**

```typescript
// Check if presentation already exists
const existing = await db.presentation.findFirst({
  where: {
    id: requestBody.presentation_id,
    userId: user.id
  }
});

if (existing) {
  return NextResponse.json({
    success: true,
    presentation_id: existing.id,
    message: "Presentation already exists"
  });
}
```

### 5. **Version Your APIs**

✅ **DO:** Use versioned endpoints (`/api/v1/external/generate-deck`)
❌ **DON'T:** Change API contracts without versioning

**Why:** Medellin AI can continue using `/api/v1` while Presentation-AI develops `/api/v2` with breaking changes.

### 6. **Log Everything (But Redact Secrets)**

✅ **DO:** Log API calls, response times, errors
✅ **DO:** Redact API keys, JWTs, user emails from logs
❌ **DON'T:** Log sensitive data in plain text

**Example:**

```typescript
console.log("API call to Presentation-AI:", {
  endpoint: "/api/external/generate-deck",
  user_id: user.id, // OK to log
  api_key: "REDACTED", // Never log full key
  response_time_ms: 1234
});
```

### 7. **Fail Gracefully**

✅ **DO:** Show user-friendly error messages
✅ **DO:** Provide retry mechanisms
❌ **DON'T:** Show stack traces or internal errors to users

**Example:**

```typescript
try {
  await generateDeck();
} catch (error) {
  // Log internal error
  console.error("Deck generation failed:", error);

  // Show user-friendly message
  return NextResponse.json({
    error: "Failed to generate deck. Please try again later.",
    retry: true
  }, { status: 500 });
}
```

---

## Recommendations

### Short-Term (Next 2 Weeks)

1. **Implement Shared JWT Authentication** ⭐ HIGH PRIORITY
   **Why:** Simplifies user management, enables RLS, allows direct Presentation-AI access
   **Effort:** 2-3 days (middleware, testing)

2. **Create Minimal Viable API Endpoints** ⭐ HIGH PRIORITY
   **Endpoints:** `/api/external/generate-deck`, `/api/external/presentation/:id`
   **Effort:** 3-5 days (API routes, database updates, testing)

3. **Build Supabase Edge Functions** ⭐ HIGH PRIORITY
   **Functions:** `generate_deck`, `deck_webhook`
   **Effort:** 2-3 days (function logic, deployment, testing)

4. **Add "Generate Pitch Deck" Button to Dashboard** ⭐ HIGH PRIORITY
   **Effort:** 1-2 days (UI component, API integration)

5. **Test End-to-End Flow with 10 Beta Users**
   **Goal:** Identify bugs, collect feedback, measure latency
   **Effort:** 1 week (recruitment, testing, iteration)

### Medium-Term (Next 4-8 Weeks)

6. **Add Custom Branding Support**
   **Features:** Logo upload, theme selection, color customization
   **Effort:** 1-2 weeks (UI, API updates, export logic)

7. **Implement Event Presentation Generator**
   **Use Case:** Organizers generate slides for events
   **Effort:** 1 week (Edge Function, UI, testing)

8. **Add Deck Editing in Presentation-AI**
   **Flow:** Medellin AI → "Edit Deck" button → Redirect to Presentation-AI editor → Save → Sync back
   **Effort:** 2-3 weeks (OAuth flow, data sync, UI integration)

9. **Set Up Production Monitoring**
   **Tools:** Sentry (errors), PostHog (analytics), PagerDuty (alerts)
   **Effort:** 1 week (setup, configuration, testing)

### Long-Term (Next 3-6 Months)

10. **Build Multi-Language Support**
    **Languages:** Spanish, Portuguese (LatAm markets)
    **Effort:** 2-3 weeks (i18n setup, translation, AI prompt tuning)

11. **Add AI-Powered Content Suggestions**
    **Feature:** AI analyzes startup profile, suggests improvements to pitch deck
    **Effort:** 3-4 weeks (AI model training, API integration, UI)

12. **Implement Real-Time Collaboration**
    **Feature:** Multiple team members edit deck simultaneously (like Google Slides)
    **Effort:** 8-12 weeks (WebSocket infrastructure, CRDT, conflict resolution)

13. **Optimize for Scale**
    **Goal:** Support 10,000+ concurrent users
    **Tasks:** Horizontal scaling (Kubernetes), caching (Redis), CDN (CloudFlare)
    **Effort:** 4-6 weeks (infrastructure, load testing, optimization)

---

## Summary

### Why This Integration Strategy Works

✅ **Modular Architecture** - Presentation-AI remains independent, testable, reusable
✅ **Security First** - RLS policies + JWT validation ensure data privacy
✅ **Scalable** - Each system can scale independently
✅ **Simple** - No schema synchronization, no direct DB coupling
✅ **Fast** - Async generation with webhooks prevents UI blocking

### User Journey: Founder Generates Pitch Deck

1. **Login** - Founder authenticates with Medellin AI (Supabase Auth)
2. **Navigate** - Goes to Dashboard → Startup Profile → "Generate Pitch Deck"
3. **Click** - Clicks button, loading spinner appears
4. **Generate** - Supabase Edge Function calls Presentation-AI API
5. **Wait** - AI generates outline + slides (15-30 seconds)
6. **Webhook** - Presentation-AI calls webhook with deck URLs
7. **Notify** - Toast notification: "Your pitch deck is ready!"
8. **Preview** - Founder sees thumbnail, clicks "View Deck"
9. **Download** - Downloads PDF or PPTX from Supabase Storage
10. **Share** - Shares deck URL with investors

**Total Time:** <1 minute from click to download

---

**Document Version:** 1.0
**Last Updated:** 2025-10-13
**Authors:** Claude Code + Database Architect Agent
**Review Status:** Ready for Implementation
