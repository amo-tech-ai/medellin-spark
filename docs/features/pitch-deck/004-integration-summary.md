# Integration Summary: Medellin AI + Presentation-AI

**Quick Reference Guide** | **Date:** 2025-10-13

---

## 🎯 What We're Doing

Integrating **Presentation-AI** as a **pitch deck generator module** inside Medellin AI, allowing startup founders to generate professional presentations with one click.

---

## 🏗️ Architecture Overview

```
Medellin AI (React + Supabase)
    ↓ [User clicks "Generate Deck"]
Supabase Edge Function (generate_deck)
    ↓ [Calls API with startup data]
Presentation-AI API (/api/external/generate-deck)
    ↓ [AI generates slides]
Webhook (deck_webhook)
    ↓ [Returns PDF/PPTX URLs]
Medellin AI Dashboard (displays deck)
```

---

## 📊 Integration Flow Diagram

The complete Mermaid flowchart is in **007-integration-strategy-presentation-ai.md** showing:
- User initiates deck generation from Medellin AI dashboard
- Supabase Edge Function prepares sanitized JSON prompt
- Presentation-AI generates slides using AI (OpenAI/TogetherAI)
- Exports to PDF/PPTX and returns URLs via webhook
- Medellin AI stores URLs in `wizard_sessions` table
- User downloads deck from Supabase Storage

---

## 🔐 Authentication: Shared JWT (Recommended)

**How it works:**
1. User logs in to Medellin AI (Supabase Auth) → Gets JWT
2. Medellin AI passes JWT to Presentation-AI API
3. Presentation-AI validates JWT using Supabase public key
4. Presentation-AI creates user record with same `user_id` (linked accounts)

**Benefits:**
- ✅ Single source of truth for authentication
- ✅ RLS policies automatically enforced
- ✅ User can access Presentation-AI directly if needed
- ✅ No password sync required

---

## 📦 Key Endpoints to Create

### Presentation-AI API (New Endpoints)

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/external/generate-deck` | POST | Generate pitch deck from startup data |
| `/api/external/presentation/:id` | GET | Retrieve presentation metadata |
| `/api/external/export` | POST | Re-export deck to PDF/PPTX |

### Medellin AI Edge Functions (New)

| Function | Purpose |
|----------|---------|
| `generate_deck` | Prepare startup data, call Presentation-AI API |
| `deck_webhook` | Receive webhook, update `wizard_sessions` table |

---

## 🗄️ Database Changes

### Medellin AI: Update `wizard_sessions` Table

```sql
-- Add new columns to store presentation data
ALTER TABLE wizard_sessions
  ADD COLUMN presentation_id TEXT,
  ADD COLUMN pdf_url TEXT,
  ADD COLUMN pptx_url TEXT,
  ADD COLUMN thumbnail_url TEXT;

-- Update session_data JSONB to include:
-- { "presentation_id": "pres_abc123", "status": "completed", "pdf_url": "...", "pptx_url": "..." }
```

### Presentation-AI: No Changes Required ✅

Existing `User` and `Presentation` tables support external users via JWT validation.

---

## 📂 File Storage Strategy (Recommended: Hybrid)

| File Type | Stored In | Accessed By | Why |
|-----------|-----------|-------------|-----|
| **Slide Content** | Presentation-AI DB | Presentation-AI | Allows editing, versioning |
| **PDF Export** | Supabase Storage | Medellin AI users | RLS policies, faster downloads |
| **PPTX Export** | Supabase Storage | Medellin AI users | RLS policies, no CORS issues |
| **Thumbnails** | Supabase Storage | Medellin AI dashboard | Preview before download |

---

## 🚀 Implementation Roadmap

### Phase 1: Core Integration (Week 1-2) ⭐ START HERE

**Presentation-AI:**
- [ ] Create `/api/external/generate-deck` endpoint
- [ ] Implement JWT validation middleware
- [ ] Add webhook support for async generation

**Medellin AI:**
- [ ] Create Supabase Edge Function `generate_deck`
- [ ] Create Supabase Edge Function `deck_webhook`
- [ ] Add "Generate Pitch Deck" button in dashboard
- [ ] Update `wizard_sessions` table schema

**Testing:**
- [ ] End-to-end test: Click button → Deck generated → URLs displayed
- [ ] Verify RLS policies (users can only see their own decks)

### Phase 2: Enhanced Features (Week 3-4)

- [ ] Add theme customization (logo, colors)
- [ ] Add event presentation generator
- [ ] Add "Edit in Presentation-AI" button

### Phase 3: Production Optimization (Week 5+)

- [ ] Add caching layer (Redis)
- [ ] Set up monitoring (Sentry, PostHog)
- [ ] Optimize performance (CDN, lazy loading)

---

## 🛡️ Security Best Practices

1. **Rate Limiting** - Limit API calls per client (100 requests/hour)
2. **Webhook Signature Verification** - Use HMAC-SHA256 to verify webhooks
3. **Sanitize Inputs** - Remove PII, validate all fields before AI processing
4. **HTTPS Only** - Enforce TLS for all API calls
5. **Audit Logs** - Log all API calls with timestamps and results

---

## 💡 Example User Flow

**Founder Generates Pitch Deck:**

1. **Login** → Founder authenticates with Medellin AI
2. **Navigate** → Dashboard → Startup Profile → "Generate Pitch Deck"
3. **Click** → Button triggers Supabase Edge Function
4. **Generate** → AI creates slides (15-30 seconds)
5. **Webhook** → Presentation-AI returns deck URLs
6. **Notify** → Toast: "Your pitch deck is ready!"
7. **Download** → Founder downloads PDF or PPTX
8. **Share** → Founder shares deck URL with investors

**Total Time:** <1 minute from click to download ⚡

---

## 📚 Full Documentation

Read **007-integration-strategy-presentation-ai.md** for:
- Complete API specifications with request/response examples
- Detailed code examples for Edge Functions
- Authentication implementation guide
- Storage strategy comparison
- Best practices and recommendations
- Long-term optimization strategies

---

## 🤝 Why This Approach Works

✅ **Modular** - Presentation-AI remains independent, reusable
✅ **Secure** - RLS policies + JWT validation ensure privacy
✅ **Scalable** - Each system scales independently
✅ **Simple** - No schema sync, no direct DB coupling
✅ **Fast** - Async webhooks prevent UI blocking

---

**Document Version:** 1.0
**Last Updated:** 2025-10-13
**For Questions:** See full strategy document (007-integration-strategy-presentation-ai.md)
