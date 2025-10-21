# Claude AI Agent - MVP Overview

**Goal**: Add Claude AI conversation agent to pitch deck wizard
**Timeline**: 6-8 hours
**Status**: Planning

---

## What We're Building

**Current State**: OpenAI chat (works but basic)
**MVP State**: Claude AI with data extraction + conversation memory

**Core Features (MVP Only)**:
1. Claude conversation via Edge Function
2. Extract startup data (company, problem, solution, market)
3. Save conversation to database
4. Show "Generate" button when ready
5. Create pitch deck from collected data

**NOT in MVP**: Streaming, rate limiting, advanced error handling, cost tracking

---

## Architecture (Simple)

```
User types in chat
    ↓
Frontend (PitchDeckWizard.tsx)
    ↓
Edge Function (pitch-deck-assistant)
    ↓
Claude API (Anthropic)
    ↓ (extracts data)
Database (pitch_conversations)
    ↓ (when complete)
Generate Deck (existing function)
```

---

## 4 Steps to MVP

**Step 1**: Database (15 min)
- Create `pitch_conversations` table
- Enable RLS
- Apply migration

**Step 2**: Edge Function (2-3 hours)
- Create `pitch-deck-assistant` function
- Implement Claude with tool calling
- Handle data extraction
- Save to database

**Step 3**: Frontend (1 hour)
- Update endpoint from `/chat` to `/pitch-deck-assistant`
- Add conversation state
- Show "Generate" button

**Step 4**: Test (30 min)
- Test conversation flow
- Verify data extraction
- Test deck generation

**Total**: 6-8 hours

---

## Success Criteria

**Must Work**:
- [ ] User chats with Claude
- [ ] Claude extracts company data
- [ ] Data saves to database
- [ ] "Generate" button appears
- [ ] Deck generates successfully

**Can Skip for MVP**:
- Streaming responses
- Rate limiting
- Retry logic
- Cost tracking
- Message compaction

---

## Tech Stack

**Database**: Supabase Postgres
- Table: `pitch_conversations`
- RLS: Enabled

**Backend**: Supabase Edge Function (Deno)
- SDK: `npm:@anthropic-ai/sdk`
- Model: `claude-3-5-sonnet-latest`

**Frontend**: React + TypeScript
- File: `src/pages/PitchDeckWizard.tsx`
- State: conversation_id, completeness

---

## Key Decisions

**Why Claude over OpenAI?**
- Better at structured data extraction
- More reliable function calling
- Cheaper for this use case

**Why Edge Functions?**
- API keys server-side only (secure)
- Scales automatically
- Built into Supabase

**Why conversation table?**
- Persist conversation across page reloads
- Track extracted data
- Resume conversations later

---

## File Changes

**Create** (2 files):
```
supabase/migrations/20251016210000_create_pitch_conversations.sql
supabase/functions/pitch-deck-assistant/index.ts
```

**Modify** (1 file):
```
src/pages/PitchDeckWizard.tsx
```

**Total LOC**: ~350 lines

---

## Prerequisites

**Before Starting**:
- [ ] Anthropic API key (`ANTHROPIC_API_KEY`)
- [ ] Supabase project running locally
- [ ] Frontend dev server running

**Check**:
```bash
# Verify Supabase
supabase status

# Verify env vars
echo $ANTHROPIC_API_KEY

# Verify frontend
pnpm dev
```

---

## Next Steps

1. Read `002-database-setup.md` → Create table
2. Read `003-edge-function-setup.md` → Build Claude function
3. Read `004-frontend-integration.md` → Update UI
4. Read `005-deployment-checklist.md` → Deploy

---

**Remember**: MVP = Minimum Viable Product. Make it work first, optimize later.
