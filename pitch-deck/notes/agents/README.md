# 🤖 Claude for Pitch Deck Generator - START HERE

**Last Updated**: October 16, 2025
**Status**: Production Ready

---

## ⚡ THE ONLY DOC YOU NEED

**Read this first**: **`015-SIMPLE-GUIDE-claude-for-pitch-decks.md`**

It explains everything in plain English with real examples and working code.

---

## 🎯 QUICK ANSWERS

**"What do I use?"** → Standard Anthropic SDK (`@anthropic-ai/sdk`)

**"Does it work in Edge Functions?"** → Yes, perfectly

**"How long to build?"** → 2-4 hours

**"How much does it cost?"** → ~$0.02 per conversation

**"Can I just copy-paste code?"** → Yes, see the guide above

---

## 📚 DOCUMENTATION GUIDE

### 🟢 USE THESE (New & Correct)

**Choose based on your learning style:**

| File | Best For | Time |
|------|----------|------|
| **015-SIMPLE-GUIDE-claude-for-pitch-decks.md** | Complete beginners, want everything explained simply | 15 min |
| **016-VISUAL-DECISION-GUIDE.md** | Visual learners, want diagrams and flowcharts | 10 min |
| **011-OFFICIAL-claude-sdk-setup-corrected.md** | Technical details, API reference | 30 min |
| **013-FINAL-SUMMARY.md** | Step-by-step implementation checklist | 20 min |
| **014-CLARIFICATION-agent-sdk-vs-mcp.md** | Confused about different approaches | 10 min |

**Recommendation**: Start with #015 or #016, then reference others as needed.

### 🔴 OUTDATED (Ignore These)

Files 001-010, 012 - Based on incorrect Agent SDK approach that doesn't work in Edge Functions

---

## 🚀 QUICK START (5 Steps)

### 1. Set API Key
```bash
supabase secrets set ANTHROPIC_API_KEY=sk-ant-api03-YOUR_KEY
```

### 2. Create Database
```bash
supabase migration new pitch_conversations
# Copy SQL from 013-FINAL-SUMMARY.md
supabase db reset
```

### 3. Create Edge Function
```bash
supabase functions new pitch-deck-assistant
# Copy code from 011-OFFICIAL-claude-sdk-setup-corrected.md
```

### 4. Test Locally
```bash
supabase functions serve pitch-deck-assistant
# Test with curl (see examples in docs)
```

### 5. Deploy
```bash
supabase functions deploy pitch-deck-assistant
```

---

## 💡 KEY CONCEPTS

### What SDK to Use
```typescript
// ✅ CORRECT (for Edge Functions)
import Anthropic from 'npm:@anthropic-ai/sdk';

// ❌ WRONG (for containers only)
import { query } from 'npm:@anthropic-ai/claude-agent-sdk';
```

### Function Calling (Tools)
```typescript
const tools = [
  {
    name: 'extract_startup_data',
    description: 'Extract company info from message',
    input_schema: { /* ... */ }
  }
];

const response = await client.messages.create({
  model: 'claude-sonnet-4-5-20250929',
  max_tokens: 1024,
  tools: tools, // ← Claude can call these
  messages: messages
});
```

### Session Management
```typescript
// Save conversation to database
await supabase
  .from('pitch_conversations')
  .upsert({
    id: conversation_id,
    messages: messages,
    collected_data: extractedData
  });

// Load on next message
const { data } = await supabase
  .from('pitch_conversations')
  .select('messages, collected_data')
  .eq('id', conversation_id)
  .single();
```

---

## 🛠️ THE 3 TOOLS

1. **extract_startup_data** - Parse user input
2. **validate_completeness** - Check if ready
3. **generate_pitch_deck** - Create the deck

See `012-CORRECTED-implementation-plan.md` for full code

---

## 📖 OFFICIAL RESOURCES

- **Anthropic Docs**: https://docs.anthropic.com/en/api/getting-started
- **Function Calling**: https://docs.anthropic.com/en/docs/build-with-claude/tool-use
- **SDK GitHub**: https://github.com/anthropics/anthropic-sdk-typescript
- **Pricing**: https://www.anthropic.com/pricing

---

## 🆘 COMMON ISSUES

### "Agent SDK not working"
→ Don't use Agent SDK. Use `@anthropic-ai/sdk` instead

### "Can't find session"
→ Sessions are manual via database, not built-in

### "Tools not working"
→ Use function calling, not MCP servers

### "Import error in Deno"
→ Use `npm:@anthropic-ai/sdk` not `@anthropic-ai/sdk`

---

## ✅ VERIFICATION

Working correctly if:
- [ ] Conversation saves to database
- [ ] Claude extracts structured data
- [ ] "Generate" button appears when ready
- [ ] Deck created successfully
- [ ] User redirected to preview

---

## 📊 ARCHITECTURE DIAGRAM

```
Frontend (Chat UI)
    ↓
Edge Function (pitch-deck-assistant)
    ↓
Claude API (Anthropic)
    ↓
Function Tools (extract, validate, generate)
    ↓
Database (save conversation)
    ↓
Existing Edge Function (generate-pitch-deck)
    ↓
Success! (preview deck)
```

---

## 💰 PRICING

**Claude Sonnet 4.5**:
- Input: $3 per 1M tokens
- Output: $15 per 1M tokens

**Per conversation**: ~$0.02
**Per 1000 users/month**: ~$20

---

## 🎯 NEXT STEPS

1. Read **013-FINAL-SUMMARY.md** (complete roadmap)
2. Reference **011-OFFICIAL-claude-sdk-setup-corrected.md** (technical)
3. Copy code from **012-CORRECTED-implementation-plan.md**
4. Follow 5-step Quick Start above
5. Deploy and test

---

**Time to first working prototype**: ~4 hours

**Questions?** All answers in the 3 main docs above

**Last verified**: October 16, 2025 ✅
