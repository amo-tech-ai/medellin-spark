# 🎯 CORRECTED Implementation Plan - Claude for Pitch Deck Generator

**Date**: October 16, 2025
**Status**: Ready to Build
**Based on**: Official Claude Documentation (Verified)

---

## ⚡ THE SIMPLE TRUTH (Revised)

After reviewing official Claude SDK documentation:

**Agent SDK** → For desktop apps with file systems ❌ (NOT for us)
**Anthropic API SDK** → For web apps, serverless ✅ (PERFECT for us)

---

## 🏗️ ARCHITECTURE OVERVIEW

```
User types message
    ↓
Frontend (PitchDeckWizard.tsx)
    ↓
Edge Function (pitch-deck-assistant)
    ↓
Claude API (with function calling)
    ↓
Extract data → Save to DB → Generate when ready
    ↓
Return response to user
```

**No complex agents needed** - Just smart function calling

---

## 🛠️ THE 4 ESSENTIAL TOOLS (Function Calling)

### 1. **extract_startup_data**
**Type**: Claude Function (not MCP server)
**Purpose**: Parse unstructured user input into structured data

```typescript
{
  name: 'extract_startup_data',
  description: 'Extract startup information from user message',
  input_schema: {
    type: 'object',
    properties: {
      company_name: { type: 'string', description: 'Company name' },
      industry: { type: 'string', description: 'Industry/sector' },
      problem: { type: 'string', description: 'Problem being solved' },
      solution: { type: 'string', description: 'Product/solution' },
      target_market: { type: 'string', description: 'Target customers' },
      business_model: { type: 'string', description: 'Revenue model' },
      traction: { type: 'string', description: 'Metrics/milestones' },
      team: { type: 'string', description: 'Founders/team info' },
      fundraising: { type: 'string', description: 'Funding ask' }
    }
  }
}
```

**Implementation**:
```typescript
if (toolUse.name === 'extract_startup_data') {
  // Save extracted data to database
  await supabase
    .from('pitch_conversations')
    .update({
      collected_data: {
        ...existingData,
        ...toolUse.input
      }
    })
    .eq('id', conversation_id);

  return { success: true, data: toolUse.input };
}
```

---

### 2. **validate_completeness**
**Type**: Claude Function
**Purpose**: Check if we have enough data to generate deck

```typescript
{
  name: 'validate_completeness',
  description: 'Check if enough information collected to generate pitch deck',
  input_schema: {
    type: 'object',
    properties: {
      completeness_score: {
        type: 'number',
        description: 'Percentage of required data collected (0-100)'
      },
      missing_fields: {
        type: 'array',
        items: { type: 'string' },
        description: 'List of required fields still needed'
      },
      ready_to_generate: {
        type: 'boolean',
        description: 'True if we can generate deck now'
      }
    }
  }
}
```

**Implementation**:
```typescript
if (toolUse.name === 'validate_completeness') {
  const { ready_to_generate } = toolUse.input;

  if (ready_to_generate) {
    // Update conversation status
    await supabase
      .from('pitch_conversations')
      .update({ status: 'ready_to_generate' })
      .eq('id', conversation_id);

    // Tell frontend to show "Generate Deck" button
    return { show_generate_button: true };
  }

  return {
    completeness: toolUse.input.completeness_score,
    missing: toolUse.input.missing_fields
  };
}
```

---

### 3. **generate_pitch_deck**
**Type**: Claude Function
**Purpose**: Trigger deck generation (calls existing Edge Function)

```typescript
{
  name: 'generate_pitch_deck',
  description: 'Generate the complete pitch deck using collected data',
  input_schema: {
    type: 'object',
    properties: {
      confirm: {
        type: 'boolean',
        description: 'User confirmed they want to generate deck'
      }
    },
    required: ['confirm']
  }
}
```

**Implementation**:
```typescript
if (toolUse.name === 'generate_pitch_deck') {
  // Get collected data
  const { data: conv } = await supabase
    .from('pitch_conversations')
    .select('collected_data, profile_id')
    .eq('id', conversation_id)
    .single();

  // Format as prompt for existing generate-pitch-deck function
  const prompt = formatCollectedDataAsPrompt(conv.collected_data);

  // Call existing Edge Function
  const { data: deckData } = await supabase.functions.invoke(
    'generate-pitch-deck',
    {
      body: {
        prompt,
        profile_id: conv.profile_id
      }
    }
  );

  // Update conversation with deck_id
  await supabase
    .from('pitch_conversations')
    .update({
      status: 'completed',
      deck_id: deckData.deck_id
    })
    .eq('id', conversation_id);

  return {
    success: true,
    deck_id: deckData.deck_id,
    redirect_url: `/pitch-deck/${deckData.deck_id}/preview`
  };
}
```

---

### 4. **save_conversation** (Internal, not Claude function)
**Type**: Database operation
**Purpose**: Persist conversation state

```typescript
async function saveConversation(
  conversation_id: string,
  messages: any[],
  collected_data: any
) {
  return await supabase
    .from('pitch_conversations')
    .upsert({
      id: conversation_id,
      messages,
      collected_data,
      updated_at: new Date().toISOString()
    });
}
```

---

## 📝 SYSTEM PROMPT

```typescript
const SYSTEM_PROMPT = `You are an expert pitch deck consultant helping startup founders.

Your goal: Guide the user through a natural conversation to collect information, then generate a professional investor pitch deck.

CONVERSATION FLOW:
1. Welcome user, explain the process (10 questions, ~5 minutes)
2. Ask questions naturally (not a rigid form)
3. As user answers, use extract_startup_data tool to save info
4. After collecting enough data, use validate_completeness tool
5. When ready (8+ fields), suggest generating the deck
6. When user confirms, use generate_pitch_deck tool

REQUIRED INFORMATION:
- Company name
- Industry/sector
- Problem being solved
- Solution/product
- Target market
- Business model
- Traction (if any)
- Team info
- Funding ask

PERSONALITY:
- Conversational, not robotic
- Ask 1-2 questions at a time
- Acknowledge answers before moving on
- Suggest improvements when appropriate
- Be encouraging

IMPORTANT:
- Use tools automatically (user doesn't see tool calls)
- Don't ask permission to use tools
- When data is complete, proactively suggest generation`;
```

---

## 🔄 COMPLETE WORKFLOW EXAMPLE

### Message 1: User arrives
```
User: [Lands on /pitch-deck-wizard]

Assistant (system prompt loads):
"Hi! I'll help you create a professional pitch deck. This takes about
 10 questions and 5 minutes. Ready to start?"
```

### Message 2: User confirms
```
User: "Yes, let's do it"