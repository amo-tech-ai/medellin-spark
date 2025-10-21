# The Simple Guide to Adding Claude AI to Your Pitch Deck Generator

**For developers who just want it to work**

---

## The Question You're Really Asking

> "I have a pitch deck wizard that doesn't actually create decks. How do I add Claude AI to make it work?"

**Answer in 10 seconds**: Use the standard Anthropic SDK in a Supabase Edge Function. It takes 2 hours.

---

## Why There's Confusion (And What You Actually Need)

### There Are 3 Different "Claude" Things

Think of it like ordering coffee:

**1. Claude API** (The Coffee)
- What: Anthropic's AI service
- Like: Calling Stripe's payment API
- You use: `@anthropic-ai/sdk` package
- Works in: Edge Functions ✅

**2. Claude Agent SDK** (The Coffee Shop)
- What: Full development environment with tools
- Like: Running VS Code with extensions
- You use: `@anthropic-ai/claude-agent-sdk` package
- Works in: Containers only ❌ (not Edge Functions)

**3. MCP (Model Context Protocol)** (The Coffee Delivery Service)
- What: Lets Claude Desktop access your services
- Like: DoorDash connecting you to restaurants
- You use: MCP servers
- Works for: Local development ✅ (not production APIs)

---

## What You Actually Need

**Your situation**: Users visit website → chat with AI → get pitch deck

**You need**: Claude API (the coffee)
**You don't need**: Full Agent SDK (the coffee shop)
**You might want later**: MCP (for local development)

---

## The Right Solution (Standard SDK)

### Real-World Example: What Actually Happens

```
1. User types: "I need a pitch deck for my AI startup"
   ↓
2. Frontend sends to: /functions/v1/pitch-deck-assistant
   ↓
3. Edge Function calls Claude: "Extract startup info from this message"
   ↓
4. Claude responds: { company_type: "AI startup", stage: "early" }
   ↓
5. Edge Function saves to database
   ↓
6. User sees: "Great! Tell me about the problem you're solving"
   ↓
[Repeat 8-10 times]
   ↓
7. When enough data collected → Generate deck
   ↓
8. User gets: Professional 10-slide pitch deck
```

---

## Working Code (Copy-Paste Ready)

### Step 1: Set Your API Key (2 minutes)

```bash
# Get key from: https://console.anthropic.com/
supabase secrets set ANTHROPIC_API_KEY=sk-ant-api03-YOUR_KEY_HERE
```

---

### Step 2: Create Edge Function (30 minutes)

```typescript
// supabase/functions/pitch-deck-assistant/index.ts

import Anthropic from 'npm:@anthropic-ai/sdk';
import { createClient } from 'npm:@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  // Handle CORS
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { conversation_id, message, profile_id } = await req.json();

    // Initialize Claude
    const claude = new Anthropic({
      apiKey: Deno.env.get('ANTHROPIC_API_KEY'),
    });

    // Initialize Supabase
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );

    // Load conversation history
    const { data: conv } = await supabase
      .from('pitch_conversations')
      .select('messages, collected_data')
      .eq('id', conversation_id)
      .single();

    const messages = conv?.messages || [];
    messages.push({ role: 'user', content: message });

    // Call Claude with function calling
    const response = await claude.messages.create({
      model: 'claude-sonnet-4-5-20250929',
      max_tokens: 1024,
      system: `You are a pitch deck consultant. Extract startup info from
               user messages and save it. When you have enough data (company
               name, problem, solution, market, model), tell them we can
               generate the deck.`,
      tools: [
        {
          name: 'save_startup_data',
          description: 'Save extracted startup information',
          input_schema: {
            type: 'object',
            properties: {
              company_name: { type: 'string' },
              industry: { type: 'string' },
              problem: { type: 'string' },
              solution: { type: 'string' },
              target_market: { type: 'string' },
              business_model: { type: 'string' }
            }
          }
        }
      ],
      messages: messages,
    });

    // Handle tool calls
    let assistantMessage = '';
    for (const block of response.content) {
      if (block.type === 'text') {
        assistantMessage = block.text;
      } else if (block.type === 'tool_use' && block.name === 'save_startup_data') {
        // Save the extracted data
        await supabase
          .from('pitch_conversations')
          .update({
            collected_data: { ...conv?.collected_data, ...block.input }
          })
          .eq('id', conversation_id);
      }
    }

    // Save conversation
    messages.push({ role: 'assistant', content: assistantMessage });
    await supabase
      .from('pitch_conversations')
      .update({ messages })
      .eq('id', conversation_id);

    return new Response(
      JSON.stringify({
        message: assistantMessage,
        data_completeness: calculateCompleteness(conv?.collected_data)
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

function calculateCompleteness(data: any): number {
  const required = ['company_name', 'problem', 'solution', 'target_market', 'business_model'];
  const filled = required.filter(field => data?.[field]).length;
  return (filled / required.length) * 100;
}
```

---

### Step 3: Update Frontend (30 minutes)

```typescript
// src/pages/PitchDeckWizard.tsx

const [conversationId, setConversationId] = useState<string | null>(null);
const [completeness, setCompleteness] = useState(0);

const handleSendMessage = async (message: string) => {
  const response = await fetch(
    `${SUPABASE_URL}/functions/v1/pitch-deck-assistant`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        conversation_id: conversationId,
        message: message,
        profile_id: user.id
      })
    }
  );

  const data = await response.json();

  // Update UI
  setMessages(prev => [...prev,
    { role: 'user', content: message },
    { role: 'assistant', content: data.message }
  ]);

  setCompleteness(data.data_completeness);

  // Show generate button when ready
  if (data.data_completeness >= 80) {
    setShowGenerateButton(true);
  }
};
```

---

## Real-World Conversation Flow

**Message 1**
```
User: "I need a pitch deck for my startup"
Claude: "I'd love to help! Let's start with the basics. What's your company name and what industry are you in?"
[Claude calls save_startup_data with: null - not enough info yet]
```

**Message 2**
```
User: "EventAI - we're in the event tech space"
Claude: "Perfect! EventAI in event tech. What problem are you solving for event organizers?"
[Claude calls save_startup_data with: { company_name: "EventAI", industry: "Event Technology" }]
[Saved to database ✅]
```

**Message 3**
```
User: "Event planning takes 20+ hours per event. It's manual and error-prone"
Claude: "That's a significant pain point. How does EventAI solve this?"
[Claude calls save_startup_data with: { problem: "Manual event planning, 20+ hours, error-prone" }]
[Completeness: 40%]
```

**Messages 4-8**
```
[Continue collecting: solution, market, model, traction, team]
[Completeness increases: 40% → 60% → 80%]
```

**Message 9**
```
User: "We're raising $2M"
Claude: "Excellent! I have all the information I need. Ready to generate your pitch deck?"
[Completeness: 100% ✅]
[Frontend shows "Generate Deck" button]
```

**User clicks "Generate Deck"**
```
→ Calls existing /generate-pitch-deck Edge Function
→ Creates 10 slides
→ Saves to database
→ Redirects to preview
→ Success! 🎉
```

---

## Why This Works Better Than Agent SDK

### Agent SDK Approach (Complex)
```
❌ Requires persistent containers
❌ Needs file system
❌ Complex setup
❌ Hard to scale
❌ Not serverless
✅ Great for local development
✅ Great for desktop apps
```

### Standard SDK Approach (Simple)
```
✅ Works in Edge Functions
✅ Stateless (scales automatically)
✅ 2-hour setup
✅ Low latency
✅ Production-ready
✅ Exactly what you need
```

---

## Cost Breakdown (Real Numbers)

### Claude Sonnet 4.5 Pricing
- Input: $3 per million tokens
- Output: $15 per million tokens

### Your Typical Conversation
- 10 messages back and forth
- Input tokens: ~2,000 (user messages + conversation history)
- Output tokens: ~1,000 (Claude responses)
- **Cost: $0.021 per conversation**

### Monthly Costs
| Users/Month | Conversations | Cost |
|-------------|---------------|------|
| 100 | 100 | $2.10 |
| 1,000 | 1,000 | $21.00 |
| 10,000 | 10,000 | $210.00 |

**Cheaper than Starbucks per user** ☕

---

## Common Mistakes (And How to Avoid Them)

### Mistake 1: Using Wrong SDK
```typescript
// ❌ WRONG - This won't work in Edge Functions
import { query } from 'npm:@anthropic-ai/claude-agent-sdk'

// ✅ CORRECT - This works perfectly
import Anthropic from 'npm:@anthropic-ai/sdk'
```

### Mistake 2: Not Saving Conversation
```typescript
// ❌ WRONG - Claude forgets everything
await claude.messages.create({
  messages: [{ role: 'user', content: message }]  // Only current message!
})

// ✅ CORRECT - Claude remembers context
await claude.messages.create({
  messages: conversationHistory  // Full history from database
})
```

### Mistake 3: Hardcoding API Key
```typescript
// ❌ WRONG - Security nightmare
const claude = new Anthropic({
  apiKey: 'sk-ant-api03-xxxxx'  // Exposed in code!
})

// ✅ CORRECT - Server-side secret
const claude = new Anthropic({
  apiKey: Deno.env.get('ANTHROPIC_API_KEY')  // Secure!
})
```

---

## Testing Your Implementation

### Test 1: Basic Response (5 minutes)
```bash
curl -X POST https://your-project.supabase.co/functions/v1/pitch-deck-assistant \
  -H "Content-Type: application/json" \
  -d '{
    "conversation_id": null,
    "message": "I need a pitch deck",
    "profile_id": "test-123"
  }'

# Expected: Claude's greeting message
```

### Test 2: Data Extraction (10 minutes)
```bash
# Send: "My company is EventAI in event tech"
# Expected: Database should have { company_name: "EventAI", industry: "Event Technology" }

# Check database:
supabase db execute "SELECT collected_data FROM pitch_conversations WHERE id = 'conv-id'"
```

### Test 3: Full Conversation (20 minutes)
```
1. Chat through 10 messages
2. Completeness should reach 80-100%
3. Generate button should appear
4. Deck should be created
5. User should see preview
```

---

## When to Use What

### Use Standard SDK (Your Case) When:
- ✅ Building web APIs
- ✅ Serverless/Edge Functions
- ✅ Stateless operations
- ✅ Production chat interfaces
- ✅ Quick responses needed
- ✅ Auto-scaling required

### Use Agent SDK When:
- ✅ Building desktop apps
- ✅ Local development tools
- ✅ Need file system access
- ✅ Multi-step code generation
- ✅ Long-running tasks (30+ minutes)
- ✅ Complex tool orchestration

### Use MCP When:
- ✅ Local development
- ✅ Connecting Claude Desktop to your services
- ✅ Testing integrations
- ✅ Building with Claude Code CLI
- ❌ Not for production APIs

---

## The 2-Hour Implementation Checklist

### Hour 1: Backend
- [ ] Set ANTHROPIC_API_KEY (2 min)
- [ ] Create database migration (10 min)
- [ ] Create Edge Function (30 min)
- [ ] Test with curl (15 min)
- [ ] Deploy function (3 min)

### Hour 2: Frontend
- [ ] Update API endpoint (10 min)
- [ ] Add conversation state (15 min)
- [ ] Show completeness indicator (10 min)
- [ ] Add "Generate" button (10 min)
- [ ] Test end-to-end (15 min)

---

## What Success Looks Like

**Before (Broken)**:
```
User: "Create my pitch deck"
AI: "Sure! What do you want to include?"
User: *gives all info*
AI: "That sounds great!"
User: "...where's my deck?"
AI: "I can help you plan it!"
User: 😡 *leaves*
```

**After (Working)**:
```
User: "Create my pitch deck"
AI: "Let's do it! What's your company name?"
User: "EventAI"
AI: "Great! What problem do you solve?"
[8 more questions]
AI: "Perfect! Ready to generate?"
User: *clicks Generate*
[15 seconds later]
User: 😊 *sees professional pitch deck*
```

---

## Next Steps

### Option 1: Start Building (Recommended)
1. Copy the code from this guide
2. Set your API key
3. Test locally
4. Deploy
5. Iterate based on user feedback

### Option 2: Try Agent SDK Anyway
1. Install Agent SDK locally
2. Test in Edge Function
3. See if it works
4. Report findings
5. Fall back to standard SDK if needed

### Option 3: Hybrid Approach
1. Use standard SDK for production
2. Use Agent SDK + MCP for local development
3. Best of both worlds

---

## FAQ

**Q: Can I use streaming for better UX?**
A: Yes! Add `stream: true` to `messages.create()`. See docs for SSE setup.

**Q: How do I handle long conversations?**
A: Summarize old messages after 20+ exchanges. Keep last 10 messages + summary.

**Q: What if Claude makes mistakes?**
A: Add validation tools. Have Claude verify extracted data before saving.

**Q: Can I use GPT-4 instead?**
A: Yes, but Claude is better at structured extraction and cheaper for this use case.

**Q: What about rate limits?**
A: Anthropic allows 50 requests/min on standard tier. More than enough for most apps.

---

## The Bottom Line

**What you need**: Standard Anthropic SDK in Edge Functions
**Time to build**: 2-4 hours
**Cost per user**: ~$0.02
**Complexity**: Low
**Scalability**: High
**Production-ready**: Yes

**Don't overthink it.** The simple solution works perfectly.

---

## Files You Need

```
supabase/
  functions/
    pitch-deck-assistant/
      index.ts                    ← Create this (30 min)
  migrations/
    YYYYMMDD_conversations.sql    ← Create this (10 min)

src/
  pages/
    PitchDeckWizard.tsx           ← Update this (30 min)
```

---

## Get Help

**Official docs**: https://docs.anthropic.com/en/api/messages
**This project**: See `/home/sk/medellin-spark/lovable-plan/agents/011-OFFICIAL-claude-sdk-setup-corrected.md`
**Questions**: Try the code first, then ask specific questions

---

**Ready to build?** Start with Hour 1 of the checklist above. You'll have a working prototype by lunch. 🚀
