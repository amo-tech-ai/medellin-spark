# AI Pitch Deck Generation - Implementation Playbook

**Date**: October 17, 2025
**Project**: Medellin Spark Technical Guide
**Focus**: OpenAI + Claude patterns, best practices, code snippets

---

## Table of Contents

- [Model Selection Guide](#model-selection-guide)
- [Agent & Tool Patterns](#agent--tool-patterns)
- [Retrieval Strategies](#retrieval-strategies)
- [Streaming & Real-Time](#streaming--real-time)
- [Webhooks & Automation](#webhooks--automation)
- [Prompt Engineering](#prompt-engineering)
- [Production Best Practices](#production-best-practices)
- [Code Snippets Library](#code-snippets-library)

---

## Model Selection Guide

### When to Use OpenAI (GPT-5 mini, GPT-4o)

**Best For**:
- Conversational interfaces (pitch deck wizard)
- Function calling (data extraction)
- Structured outputs (JSON deck generation)
- Speed-critical applications (GPT-5 mini: 400k context, fast)
- Cost optimization (GPT-5 mini: $0.25/$2.00 per 1M tokens)

**Use Cases**:
- ✅ UC-1: First-Time Founder conversational flow
- ✅ UC-3: Real-time slide editing suggestions
- ✅ UC-4: Template-based generation
- ✅ UC-5: Multi-deck personalization

**Example Decision**:
```python
# When to choose GPT-5 mini
if use_case in ["conversation", "quick_gen", "editing"]:
    model = "gpt-5-mini"  # Fast, cheap, 400k context
elif use_case == "deep_research":
    model = "gpt-4o"  # Better reasoning for complex tasks
```

---

### When to Use Claude (Opus 4, Sonnet 4.5)

**Best For**:
- Long document analysis (200k+ context)
- Deep reasoning tasks (investment analysis)
- Tool use with multiple steps
- Document Q&A (PDF pitch deck analysis)
- Extended thinking (showing reasoning process)

**Use Cases**:
- ✅ UC-2: PDF upload → deck conversion (long PDFs)
- ✅ UC-7: Multi-agent deep research
- ✅ UC-8: Deck analysis & scoring (investor perspective)

**Example Decision**:
```python
# When to choose Claude
if use_case == "pdf_analysis":
    model = "claude-opus-4"  # Best for long documents
elif use_case == "investor_analysis":
    model = "claude-sonnet-4.5"  # Cost-effective reasoning
```

---

### Model Comparison Table

| Feature | GPT-5 mini | GPT-4o | Claude Opus 4 | Claude Sonnet 4.5 |
|---------|------------|--------|---------------|-------------------|
| **Context** | 400k tokens | 128k tokens | 200k tokens | 200k tokens |
| **Speed** | ⚡ Fastest | 🟢 Fast | 🟡 Medium | 🟢 Fast |
| **Cost** | $0.25/$2.00 | $5/$15 | $15/$75 | $3/$15 |
| **Function Calling** | ✅ Excellent | ✅ Excellent | ✅ Tool Use | ✅ Tool Use |
| **JSON Mode** | ✅ Yes | ✅ Yes | ❌ No | ❌ No |
| **Streaming** | ✅ Yes | ✅ Yes | ✅ Yes | ✅ Yes |
| **Best For** | Conversation | Research | Long docs | Balanced |

**Medellin Spark Current Stack**: GPT-5 mini (primary), GPT-4o (fallback for complex tasks)

---

## Agent & Tool Patterns

### Pattern 1: OpenAI Function Calling (Current Implementation)

**Use Case**: Conversational data collection with structured extraction

**Code Snippet**:
```typescript
// Edge Function: pitch-deck-assistant
import OpenAI from "npm:openai@4.75.0";

const openai = new OpenAI({ apiKey: Deno.env.get("OPENAI_API_KEY") });

// Define tools
const tools = [
  {
    type: "function",
    function: {
      name: "save_startup_data",
      description: "Save extracted startup information",
      parameters: {
        type: "object",
        properties: {
          company_name: { type: "string" },
          industry: { type: "string" },
          problem: { type: "string" },
          solution: { type: "string" },
          target_market: { type: "string" },
          business_model: { type: "string" }
        }
      }
    }
  }
];

// Conversation loop with function calling
const response = await openai.chat.completions.create({
  model: "gpt-5-mini",
  messages: conversationHistory,
  tools: tools,
  tool_choice: "auto",  // Let GPT decide when to call
  max_completion_tokens: 1024,  // GPT-5 uses max_completion_tokens
  // Note: temperature uses default (1) for GPT-5 mini
});

// Handle tool calls
if (response.choices[0].message.tool_calls) {
  const toolCall = response.choices[0].message.tool_calls[0];
  const args = JSON.parse(toolCall.function.arguments);

  // Save to database
  await supabase
    .from('pitch_conversations')
    .update({ collected_data: args })
    .eq('id', conversation_id);

  // Calculate completeness
  const completeness = calculateCompleteness(args);

  // Continue conversation
  return {
    message: "Got it! What's your target market?",
    completeness: completeness
  };
}
```

**Key Patterns**:
- ✅ Use `tool_choice: "auto"` for flexible calling
- ✅ Stream function calls for real-time progress
- ✅ Validate extracted data before saving
- ✅ Provide feedback to user after each extraction

---

### Pattern 2: OpenAI Structured Outputs (Recommended Upgrade)

**Use Case**: Reliable deck generation with guaranteed JSON structure

**Why Better Than Function Calling**:
- Enforces schema adherence (no invalid JSON)
- Reduces errors by 50%+
- Built-in validation

**Code Snippet**:
```typescript
// Deck generation with structured outputs
const response = await openai.chat.completions.create({
  model: "gpt-5-mini",
  messages: [
    { role: "system", content: "Generate a 10-slide pitch deck structure" },
    { role: "user", content: `Company: ${company_data}` }
  ],
  response_format: {
    type: "json_schema",
    json_schema: {
      name: "pitch_deck",
      strict: true,  // Enforce strict schema adherence
      schema: {
        type: "object",
        properties: {
          title: { type: "string" },
          slides: {
            type: "array",
            items: {
              type: "object",
              properties: {
                slide_number: { type: "number" },
                title: { type: "string" },
                layout: { enum: ["title_content", "two_column", "full_image"] },
                content: {
                  type: "object",
                  properties: {
                    headline: { type: "string" },
                    bullets: { type: "array", items: { type: "string" } },
                    notes: { type: "string" }
                  },
                  required: ["headline", "bullets", "notes"]
                }
              },
              required: ["slide_number", "title", "layout", "content"]
            }
          }
        },
        required: ["title", "slides"]
      }
    }
  },
  max_completion_tokens: 4000
});

// Response is GUARANTEED to match schema
const deck = JSON.parse(response.choices[0].message.content);
```

**Benefits**:
- ✅ No JSON parsing errors
- ✅ Type-safe output
- ✅ Automatic validation
- ❌ Only available in OpenAI (not Claude)

---

### Pattern 3: Claude Tool Use (Multi-Step Workflows)

**Use Case**: PDF analysis with web research and data validation

**Code Snippet**:
```typescript
// Claude Opus 4 with Tool Use
import Anthropic from "npm:@anthropic-ai/sdk@0.24.0";

const anthropic = new Anthropic({ apiKey: Deno.env.get("ANTHROPIC_API_KEY") });

// Define tools
const tools = [
  {
    name: "web_search",
    description: "Search the web for market data and statistics",
    input_schema: {
      type: "object",
      properties: {
        query: { type: "string" }
      },
      required: ["query"]
    }
  },
  {
    name: "extract_pdf_content",
    description: "Extract and analyze PDF content",
    input_schema: {
      type: "object",
      properties: {
        pdf_url: { type: "string" },
        focus: { type: "string", description: "What to extract (problem, solution, market, etc.)" }
      },
      required: ["pdf_url", "focus"]
    }
  }
];

// Multi-turn tool use conversation
let messages = [
  {
    role: "user",
    content: "Analyze this pitch deck PDF and create a competitive analysis"
  }
];

while (true) {
  const response = await anthropic.messages.create({
    model: "claude-opus-4",
    max_tokens: 4096,
    tools: tools,
    messages: messages
  });

  // Check if Claude wants to use a tool
  if (response.stop_reason === "tool_use") {
    const toolUse = response.content.find(block => block.type === "tool_use");

    let toolResult;
    if (toolUse.name === "web_search") {
      toolResult = await performWebSearch(toolUse.input.query);
    } else if (toolUse.name === "extract_pdf_content") {
      toolResult = await extractPDF(toolUse.input.pdf_url, toolUse.input.focus);
    }

    // Send tool result back to Claude
    messages.push({
      role: "assistant",
      content: response.content
    });
    messages.push({
      role: "user",
      content: [
        {
          type: "tool_result",
          tool_use_id: toolUse.id,
          content: JSON.stringify(toolResult)
        }
      ]
    });
  } else {
    // Claude is done, return final response
    break;
  }
}
```

**Key Patterns**:
- ✅ Claude decides when to use tools (autonomous agents)
- ✅ Multi-turn conversations for complex tasks
- ✅ Best for PDF + web research workflows
- ❌ No JSON mode (use prompt engineering instead)

---

### Pattern 4: Multi-Agent Orchestration (Advanced)

**Use Case**: Deep Research Mode with specialized agents (UC-7)

**Architecture**:
```
Orchestrator
  ├─ Research Agent (Web search, Crunchbase)
  ├─ Analysis Agent (Synthesize insights)
  ├─ Writer Agent (Generate slides)
  └─ Reviewer Agent (Score & feedback)
```

**Code Snippet** (Using LangChain/LlamaIndex):
```typescript
import { LlamaIndexTS } from "npm:llamaindex";

// Define agents
const researchAgent = new Agent({
  name: "Research",
  model: "gpt-4o",
  tools: [webSearchTool, crunchbaseTool],
  instructions: "Find market data, competitors, and trends"
});

const analysisAgent = new Agent({
  name: "Analysis",
  model: "claude-opus-4",  // Better reasoning
  tools: [],
  instructions: "Synthesize research into insights and gaps"
});

const writerAgent = new Agent({
  name: "Writer",
  model: "gpt-5-mini",  // Fast generation
  tools: [],
  instructions: "Create 10-slide deck with citations"
});

const reviewerAgent = new Agent({
  name: "Reviewer",
  model: "gpt-4o",
  tools: [],
  instructions: "Score deck on 10 criteria, provide feedback"
});

// Orchestration workflow
async function deepResearchDeck(company: string, industry: string) {
  // Phase 1: Research
  const researchData = await researchAgent.run(
    `Research ${company} in ${industry}: market size, competitors, trends`
  );

  // Phase 2: Analysis
  const analysis = await analysisAgent.run(
    `Analyze this research and identify market gaps: ${researchData}`
  );

  // Phase 3: Write
  const deck = await writerAgent.run(
    `Generate 10-slide deck with research: ${researchData} and analysis: ${analysis}`
  );

  // Phase 4: Review
  const review = await reviewerAgent.run(
    `Score this deck and provide feedback: ${deck}`
  );

  // Phase 5: Iterate (if score < 90)
  if (review.score < 90) {
    const improvedDeck = await writerAgent.run(
      `Improve deck based on feedback: ${review.feedback}. Original: ${deck}`
    );
    return improvedDeck;
  }

  return deck;
}
```

**Benefits**:
- ✅ Specialization: Each agent excels at one task
- ✅ Quality: Reviewer agent ensures high scores
- ✅ Mix models: Use GPT-5 mini for speed, Claude for reasoning
- ❌ Complexity: More moving parts, harder to debug

---

## Retrieval Strategies

### Strategy 1: Simple Web Search (Current Approach)

**Use Case**: Real-time fact-checking, market data lookup

**Code Snippet**:
```typescript
// Firecrawl for web search
import { FirecrawlApp } from "npm:@firecrawl/firecrawl-ai-sdk";

const firecrawl = new FirecrawlApp({ apiKey: Deno.env.get("FIRECRAWL_API_KEY") });

async function searchMarketData(query: string) {
  const searchResults = await firecrawl.search(query, {
    limit: 5,
    scrapeOptions: { formats: ["markdown"] }
  });

  // Extract relevant data
  const data = searchResults.map(result => ({
    title: result.title,
    snippet: result.markdown.substring(0, 500),
    source: result.url
  }));

  // Feed to GPT for summarization
  const summary = await openai.chat.completions.create({
    model: "gpt-5-mini",
    messages: [
      { role: "system", content: "Summarize market data with citations" },
      { role: "user", content: JSON.stringify(data) }
    ]
  });

  return summary.choices[0].message.content;
}
```

**When to Use**:
- ✅ Real-time data (market size, trends, news)
- ✅ Citation-backed claims
- ✅ Low latency requirements (<5 seconds)

---

### Strategy 2: RAG (Retrieval-Augmented Generation)

**Use Case**: Internal knowledge base (pitch deck templates, best practices)

**Code Snippet**:
```typescript
import { Pinecone } from "npm:@pinecone-database/pinecone";
import { OpenAIEmbeddings } from "npm:langchain/embeddings/openai";

// Initialize Pinecone
const pinecone = new Pinecone({ apiKey: Deno.env.get("PINECONE_API_KEY") });
const index = pinecone.index("pitch-deck-knowledge");

// Embed user query
const embeddings = new OpenAIEmbeddings();
const queryEmbedding = await embeddings.embedQuery(
  "How to structure a market size slide?"
);

// Search vector database
const results = await index.query({
  vector: queryEmbedding,
  topK: 3,
  includeMetadata: true
});

// Feed to GPT with context
const response = await openai.chat.completions.create({
  model: "gpt-5-mini",
  messages: [
    {
      role: "system",
      content: "You are a pitch deck expert. Use the provided knowledge to answer questions."
    },
    {
      role: "user",
      content: `Context: ${results.matches.map(m => m.metadata.content).join("\\n\\n")}

      Question: How to structure a market size slide?`
    }
  ]
});
```

**When to Use**:
- ✅ Internal documentation retrieval
- ✅ Template selection based on user needs
- ✅ Best practice recommendations

---

### Strategy 3: Hybrid (Web Search + RAG)

**Use Case**: Combining internal knowledge with real-time data

**Pattern**:
```
1. Check RAG first (internal templates, best practices)
2. If not found, fallback to web search
3. Combine both sources in final response
```

---

## Streaming & Real-Time

### Pattern 1: OpenAI Streaming (Real-Time Deck Generation)

**Use Case**: Show progress while generating 10 slides

**Code Snippet**:
```typescript
// Streaming deck generation
const stream = await openai.chat.completions.create({
  model: "gpt-5-mini",
  messages: [{ role: "user", content: "Generate 10-slide pitch deck..." }],
  stream: true,
  max_completion_tokens: 4000
});

// Stream to client via Server-Sent Events (SSE)
for await (const chunk of stream) {
  const content = chunk.choices[0]?.delta?.content || "";

  // Send to frontend
  await sendSSE({
    type: "generation_progress",
    content: content,
    slide_number: extractSlideNumber(content)
  });
}
```

**Frontend (React)**:
```typescript
const [generationProgress, setGenerationProgress] = useState("");

// Listen to SSE
useEffect(() => {
  const eventSource = new EventSource("/api/generate-deck-stream");

  eventSource.onmessage = (event) => {
    const data = JSON.parse(event.data);
    setGenerationProgress(prev => prev + data.content);
  };

  return () => eventSource.close();
}, []);
```

**Benefits**:
- ✅ User sees progress in real-time
- ✅ Perceived performance (feels faster)
- ✅ Can show "Slide 1... Slide 2..." updates

---

### Pattern 2: Supabase Real-Time (Collaborative Editing)

**Use Case**: Multiple users editing same deck (UC-9)

**Code Snippet**:
```typescript
// Subscribe to presentation changes
const channel = supabase
  .channel(`presentation:${presentationId}`)
  .on(
    'postgres_changes',
    {
      event: '*',  // INSERT, UPDATE, DELETE
      schema: 'public',
      table: 'presentation_slides',
      filter: `presentation_id=eq.${presentationId}`
    },
    (payload) => {
      console.log('Slide changed:', payload);

      // Update UI optimistically
      if (payload.eventType === 'UPDATE') {
        updateSlideInUI(payload.new);
      }
    }
  )
  .subscribe();
```

**Benefits**:
- ✅ Real-time collaboration (Google Docs-style)
- ✅ No polling required
- ✅ Built into Supabase (no extra cost)

---

## Webhooks & Automation

### Pattern 1: Async Deck Generation with Webhooks

**Use Case**: Long-running deck generation (>30 seconds)

**Workflow**:
```
1. User requests deck → Return job_id immediately
2. Generate deck asynchronously
3. Webhook notifies user when complete
```

**Code Snippet**:
```typescript
// API endpoint: Start async generation
app.post("/api/generate-deck-async", async (req) => {
  const { startup_data, webhook_url } = req.body;

  // Create job
  const job = await createJob({
    type: "generate_deck",
    data: startup_data,
    status: "pending"
  });

  // Start background task
  generateDeckInBackground(job.id, startup_data, webhook_url);

  // Return immediately
  return { job_id: job.id, status: "processing" };
});

// Background function
async function generateDeckInBackground(jobId, data, webhookUrl) {
  // Generate deck (15-30 seconds)
  const deck = await generateDeck(data);

  // Update job status
  await updateJob(jobId, { status: "completed", result: deck });

  // Send webhook notification
  await fetch(webhookUrl, {
    method: "POST",
    body: JSON.stringify({
      job_id: jobId,
      status: "completed",
      presentation_id: deck.id
    })
  });
}
```

**When to Use**:
- ✅ Deep research mode (5-20 minutes)
- ✅ Batch processing (20 decks at once)
- ✅ Background jobs (nightly deck updates)

---

## Prompt Engineering

### Best Practice 1: System Prompts for Consistency

**Example**: Pitch Deck Assistant System Prompt

```typescript
const SYSTEM_PROMPT = `You are a friendly AI pitch deck assistant helping founders create investor-ready presentations.

## Your Role
- Ask clear, focused questions one at a time
- Extract key information using the save_startup_data function
- Provide encouragement and guidance
- Suggest improvements based on investor expectations

## Tone
- Conversational and supportive
- Professional but not overly formal
- Enthusiastic about the founder's vision

## Data Collection Strategy
1. Start with company name and industry
2. Ask about the problem they're solving
3. Explore their solution
4. Understand target market
5. Discuss business model
6. Gather any traction or team info

## Function Calling
- Call save_startup_data whenever you have new information
- Update collected_data incrementally
- Track completeness (0-100%)

## Example Conversation
User: "I'm building AI tutors"
You: "Exciting! AI in education is a huge opportunity. What's your company called?"
User: "EduTech AI"
You: [Call save_startup_data with company_name: "EduTech AI"]
You: "Great name! Now, tell me about the specific problem you're solving in education."`;
```

**Key Patterns**:
- ✅ Define role clearly
- ✅ Specify tone (conversational, professional, etc.)
- ✅ Provide examples (few-shot prompting)
- ✅ Explain when to use tools/functions

---

### Best Practice 2: Few-Shot Prompting for Quality

**Example**: Deck Generation with Examples

```typescript
const DECK_GENERATION_PROMPT = `Generate a 10-slide pitch deck for: ${startup_data}

## Example Slide Structure (Follow this format):

Slide 2: Problem
{
  "title": "Problem",
  "layout": "title_content",
  "content": {
    "headline": "60% of students are chronically disengaged (Gallup, 2024)",
    "bullets": [
      "One-size-fits-all education fails diverse learners",
      "Teachers manage 30+ students with varying needs",
      "Personalized learning is too expensive at scale"
    ],
    "notes": "Frame the problem with a compelling stat. Show the pain point clearly. Set up the solution."
  }
}

Slide 3: Solution
{
  "title": "Solution",
  "layout": "title_content",
  "content": {
    "headline": "AI tutors that adapt to each student's learning style",
    "bullets": [
      "Real-time assessment of student understanding",
      "Personalized lesson plans generated by AI",
      "Scales to unlimited students at low cost"
    ],
    "notes": "Show how your solution directly addresses the problem. Emphasize the AI advantage."
  }
}

## Now generate all 10 slides following this structure.`;
```

**Benefits**:
- ✅ Consistent output format
- ✅ Higher quality (examples guide the model)
- ✅ Fewer errors (model understands expectations)

---

### Best Practice 3: Chain-of-Thought for Complex Tasks

**Example**: Competitive Analysis

```typescript
const COMPETITIVE_ANALYSIS_PROMPT = `Analyze the competitive landscape for ${company_name}.

Think step-by-step:
1. First, identify the industry and market segment
2. Then, list 5-7 direct competitors
3. For each competitor, note:
   - Funding amount
   - Key differentiator
   - Market position (leader, challenger, niche)
4. Identify gaps in the market (what competitors miss)
5. Finally, position ${company_name} relative to competitors

Show your reasoning for each step, then provide the final competitive matrix.`;
```

**Why It Works**:
- ✅ Model "thinks out loud"
- ✅ Better reasoning on complex tasks
- ✅ Explainable outputs

---

## Production Best Practices

### 1. Rate Limiting & Retry Logic

```typescript
// Exponential backoff for API calls
async function callOpenAIWithRetry(params, maxRetries = 3) {
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return await openai.chat.completions.create(params);
    } catch (error) {
      if (error.status === 429) {  // Rate limit
        const waitTime = Math.pow(2, attempt) * 1000;  // 1s, 2s, 4s
        console.log(`Rate limited, waiting ${waitTime}ms...`);
        await sleep(waitTime);
      } else {
        throw error;  // Non-retryable error
      }
    }
  }
  throw new Error("Max retries exceeded");
}
```

---

### 2. Cost Monitoring

```typescript
// Track token usage per request
function calculateCost(model, promptTokens, completionTokens) {
  const pricing = {
    "gpt-5-mini": { input: 0.25 / 1_000_000, output: 2.00 / 1_000_000 },
    "gpt-4o": { input: 5.00 / 1_000_000, output: 15.00 / 1_000_000 }
  };

  const cost =
    promptTokens * pricing[model].input +
    completionTokens * pricing[model].output;

  // Log to analytics
  logMetric("ai_cost", cost, { model, user_id });

  return cost;
}
```

---

### 3. Error Handling & Fallbacks

```typescript
async function generateDeck(data) {
  try {
    // Try GPT-5 mini first (fast & cheap)
    return await generateWithGPT5Mini(data);
  } catch (error) {
    console.error("GPT-5 mini failed:", error);

    // Fallback to GPT-4o (more reliable)
    try {
      return await generateWithGPT4o(data);
    } catch (error2) {
      console.error("GPT-4o also failed:", error2);

      // Final fallback: Return template-based deck
      return generateTemplateBasedDeck(data);
    }
  }
}
```

---

### 4. Security: API Key Management

```typescript
// ❌ NEVER do this (exposing API key to frontend)
const OPENAI_API_KEY = "sk-proj-...";  // BAD!

// ✅ Always use Edge Functions (server-side)
// Edge Function (Supabase/Deno)
Deno.serve(async (req) => {
  const apiKey = Deno.env.get("OPENAI_API_KEY");  // Server-side only

  const openai = new OpenAI({ apiKey });
  const response = await openai.chat.completions.create({...});

  return new Response(JSON.stringify(response));
});
```

---

### 5. Caching for Repeated Queries

```typescript
// Cache expensive API calls (Redis/Upstash)
import { Redis } from "npm:@upstash/redis";

const redis = new Redis({
  url: Deno.env.get("UPSTASH_URL"),
  token: Deno.env.get("UPSTASH_TOKEN")
});

async function searchWithCache(query: string) {
  // Check cache first
  const cached = await redis.get(`search:${query}`);
  if (cached) {
    console.log("Cache hit!");
    return cached;
  }

  // Cache miss - fetch from API
  const result = await firecrawl.search(query);

  // Cache for 24 hours
  await redis.set(`search:${query}`, result, { ex: 86400 });

  return result;
}
```

---

## Code Snippets Library

### Snippet 1: Supabase Edge Function Template

```typescript
// supabase/functions/my-function/index.ts
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.47.10";

serve(async (req) => {
  // CORS handling
  if (req.method === "OPTIONS") {
    return new Response(null, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type"
      }
    });
  }

  try {
    // Get request body
    const { data } = await req.json();

    // Initialize Supabase client
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    // Your logic here
    const result = await processData(data);

    return new Response(JSON.stringify({ success: true, result }), {
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
});
```

---

### Snippet 2: React Hook for AI Conversation

```typescript
// hooks/usePitchDeckConversation.ts
import { useState, useCallback } from "react";
import { apiClient } from "@/lib/apiClient";

export function usePitchDeckConversation() {
  const [messages, setMessages] = useState([]);
  const [completeness, setCompleteness] = useState(0);
  const [loading, setLoading] = useState(false);

  const sendMessage = useCallback(async (message: string) => {
    setLoading(true);

    // Add user message optimistically
    setMessages(prev => [...prev, { role: "user", content: message }]);

    try {
      const response = await apiClient.post("/pitch-deck-assistant", {
        message,
        conversation_id: conversationId
      });

      // Add AI response
      setMessages(prev => [...prev, {
        role: "assistant",
        content: response.message
      }]);

      setCompleteness(response.completeness);
    } catch (error) {
      console.error("Failed to send message:", error);
    } finally {
      setLoading(false);
    }
  }, [conversationId]);

  return { messages, completeness, loading, sendMessage };
}
```

---

### Snippet 3: PPTX Export with pptxgenjs

```typescript
// lib/exportPPTX.ts
import pptxgen from "npm:pptxgenjs@3.12.0";

export async function exportToPPTX(presentation: Presentation) {
  const pptx = new pptxgen();

  // Iterate through slides
  for (const slideData of presentation.slides) {
    const slide = pptx.addSlide();

    // Add title
    slide.addText(slideData.content.headline, {
      x: 0.5,
      y: 0.5,
      w: 9,
      h: 1,
      fontSize: 32,
      bold: true,
      color: "363636"
    });

    // Add bullets
    slide.addText(slideData.content.bullets, {
      x: 0.5,
      y: 2,
      w: 9,
      h: 4,
      fontSize: 18,
      bullet: true,
      color: "666666"
    });

    // Add speaker notes
    slide.addNotes(slideData.content.notes);
  }

  // Generate file
  const buffer = await pptx.write({ outputType: "arraybuffer" });
  return new Blob([buffer], {
    type: "application/vnd.openxmlformats-officedocument.presentationml.presentation"
  });
}
```

---

## Summary & Decision Matrix

### Quick Reference: Which Model?

| Task | Best Model | Rationale |
|------|------------|-----------|
| Conversational wizard | GPT-5 mini | Fast, cheap, great function calling |
| Deck generation | GPT-5 mini | JSON mode, structured outputs |
| PDF analysis (long) | Claude Opus 4 | 200k context, document Q&A |
| Investor analysis | Claude Sonnet 4.5 | Deep reasoning, cost-effective |
| Real-time suggestions | GPT-5 mini | Low latency, streaming |
| Web research | GPT-4o | Better synthesis of search results |
| Multi-agent orchestration | Mixed (GPT-5 + Claude) | Use best model per agent role |

### Quick Reference: Which Pattern?

| Use Case | Pattern | Tools |
|----------|---------|-------|
| Extract data from chat | Function Calling | OpenAI tools |
| Generate structured deck | Structured Outputs | JSON schema (OpenAI) |
| Analyze PDF | Tool Use | Claude + PDF parser |
| Real-time editing | Streaming | SSE + GPT-5 mini |
| Collaborative editing | Real-time DB | Supabase Real-time |
| Deep research | Multi-Agent | LlamaIndex + GPT/Claude |

---

**Prepared by**: Claude AI (Sonnet 4.5)
**Last Updated**: October 17, 2025
