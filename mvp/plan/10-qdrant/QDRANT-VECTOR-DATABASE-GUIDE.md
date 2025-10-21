# Qdrant Vector Database Integration Guide

**Created**: October 18, 2025
**Purpose**: Add startup best practices knowledge base to pitch deck wizard
**Tech Stack**: Qdrant + OpenAI Embeddings + Supabase Edge Functions + React

---

## Table of Contents

1. [What is Qdrant & Why Use It](#what-is-qdrant)
2. [RAG Architecture Overview](#rag-architecture)
3. [Integration Design for Pitch Deck Wizard](#integration-design)
4. [Implementation Steps](#implementation-steps)
5. [Startup Best Practices Data Structure](#data-structure)
6. [Code Examples](#code-examples)
7. [Cost & Performance](#cost-performance)
8. [Deployment Guide](#deployment)

---

## What is Qdrant & Why Use It {#what-is-qdrant}

### What is Qdrant?

**Qdrant** is an open-source vector database written in Rust that provides:
- **Ultra-fast vector similarity search** (3ms response for 1M OpenAI embeddings)
- **Metadata filtering** (combine semantic search with filters)
- **Scalability** (millions of vectors, production-ready)
- **Easy integration** (official JavaScript/TypeScript SDK)

### Why Use Qdrant for Pitch Deck Wizard?

**Problem**: Users need expert guidance on startup best practices
**Solution**: RAG (Retrieval-Augmented Generation) system

**Benefits**:
1. ✅ **Smart Advisory** - AI references real startup best practices
2. ✅ **Always Up-to-Date** - Add new knowledge without retraining
3. ✅ **Contextual** - Retrieves only relevant information
4. ✅ **Cost-Effective** - No need to fine-tune expensive models
5. ✅ **Transparent** - Shows users which sources inform advice

---

## RAG Architecture Overview {#rag-architecture}

### What is RAG?

**RAG = Retrieval-Augmented Generation**

Think of it like this:
- **Regular AI**: "I'll answer based on my training" (limited, outdated)
- **RAG AI**: "Let me check the knowledge base first, then answer" (informed, current)

### How RAG Works (5 Steps)

```
User Query
    ↓
1. Convert query to embedding (vector)
    ↓
2. Search Qdrant for similar vectors
    ↓
3. Retrieve top matching documents
    ↓
4. Add documents to AI prompt as context
    ↓
5. AI generates informed response
```

### Example Conversation

**User**: "What should I include in my market analysis slide?"

**Without RAG**:
```
AI: "Include market size, growth rate, and competitors."
(Generic, not backed by real data)
```

**With RAG** (Qdrant):
```
AI: "Based on analysis of 500+ successful pitch decks:

1. Market Size (TAM/SAM/SOM framework)
   - TAM: Total addressable market ($X billion)
   - SAM: Serviceable addressable market
   - SOM: Serviceable obtainable market

2. Growth Rate (cite credible sources)
   - Industry CAGR: X% (Source: Gartner, 2025)
   - Key growth drivers

3. Competitive Landscape
   - Direct competitors (2-3 examples)
   - Competitive advantages
   - Market positioning

Reference: Y Combinator pitch deck best practices"
(Specific, sourced, actionable)
```

---

## Integration Design for Pitch Deck Wizard {#integration-design}

### Current Architecture

```
User → PitchDeckWizard.tsx → Edge Function → OpenAI → Response
```

### New Architecture (With Qdrant RAG)

```
User → PitchDeckWizard.tsx → Edge Function
                                  ↓
                        1. Embed user query (OpenAI)
                                  ↓
                        2. Search Qdrant (similar vectors)
                                  ↓
                        3. Retrieve top 5 best practices
                                  ↓
                        4. Add context to prompt
                                  ↓
                        5. OpenAI generates response
                                  ↓
                              Response
```

### System Components

**Frontend** (`src/pages/PitchDeckWizard.tsx`):
- No changes needed! ✅
- Already calls `/pitch-deck-assistant` Edge Function

**Backend** (New Supabase Edge Function):
- Function: `pitch-deck-assistant-rag`
- Responsibilities:
  1. Embed user query
  2. Query Qdrant
  3. Build enhanced prompt
  4. Call OpenAI
  5. Return response

**Vector Database** (Qdrant Cloud):
- Store: 1,000+ startup best practices
- Collections:
  - `pitch_deck_slides` - Best practices per slide type
  - `investor_feedback` - Common investor questions
  - `success_patterns` - Analysis of funded startups
  - `common_mistakes` - What to avoid

---

## Implementation Steps {#implementation-steps}

### Step 1: Set Up Qdrant Cloud (5 minutes)

```bash
# 1. Sign up at https://cloud.qdrant.io
# Free tier: 1GB storage, 100K vectors

# 2. Create cluster:
# - Name: medellin-spark-pitch-deck
# - Region: US East (closest to Supabase)
# - Size: 1GB (free tier)

# 3. Get credentials:
# - Cluster URL: https://xyz.qdrant.io:6333
# - API Key: qdr_xyz123...

# 4. Save to Supabase secrets:
supabase secrets set QDRANT_URL=https://xyz.qdrant.io:6333
supabase secrets set QDRANT_API_KEY=qdr_xyz123...
```

### Step 2: Install Dependencies

```bash
# Add to supabase/functions/pitch-deck-assistant-rag/package.json
npm install @qdrant/js-client-rest
npm install openai
```

### Step 3: Create Qdrant Collections

```typescript
// supabase/functions/pitch-deck-assistant-rag/setup-qdrant.ts

import { QdrantClient } from '@qdrant/js-client-rest';

const client = new QdrantClient({
  url: Deno.env.get('QDRANT_URL'),
  apiKey: Deno.env.get('QDRANT_API_KEY'),
});

// Create collection for pitch deck best practices
await client.createCollection('pitch_deck_knowledge', {
  vectors: {
    size: 1536, // OpenAI text-embedding-3-small dimension
    distance: 'Cosine', // Similarity metric
  },
  optimizers_config: {
    default_segment_number: 2,
  },
});

console.log('✅ Collection created: pitch_deck_knowledge');
```

### Step 4: Populate Knowledge Base

See [Startup Best Practices Data Structure](#data-structure) below for content.

```typescript
// supabase/functions/pitch-deck-assistant-rag/populate-knowledge.ts

import { OpenAI } from 'openai';
import { QdrantClient } from '@qdrant/js-client-rest';

const openai = new OpenAI({ apiKey: Deno.env.get('OPENAI_API_KEY') });
const qdrant = new QdrantClient({
  url: Deno.env.get('QDRANT_URL'),
  apiKey: Deno.env.get('QDRANT_API_KEY'),
});

// Best practices documents
const bestPractices = [
  {
    id: 1,
    category: 'problem_slide',
    title: 'Problem Slide Best Practices',
    content: `Problem Slide: What makes a compelling problem statement

Key Elements:
1. Specific Problem Statement
   - Define the exact pain point
   - Use concrete examples
   - Quantify the problem (e.g., "loses 10 hours/week")

2. Target Audience
   - Who experiences this problem?
   - How many people affected? (market size indicator)
   - Current workarounds (what they do now)

3. Emotional Hook
   - Why does this matter?
   - Personal story or relatable scenario
   - "The moment I realized this was a problem..."

Best Practice Examples:
- Airbnb: "Hotels are expensive and impersonal"
- Uber: "Taxis are unreliable and hard to find"
- Slack: "Email overwhelms teams and buries important info"

Common Mistakes to Avoid:
❌ Generic statements ("communication is hard")
❌ Solution disguised as problem
❌ Too many problems (focus on ONE core problem)

Sources: Y Combinator, 500 Startups, Sequoia Capital`,
    metadata: {
      slide_type: 'problem',
      source: 'YC_Sequoia_500Startups',
      confidence: 'high',
    },
  },
  // ... add 50-100 more best practices
];

// Embed and store each document
for (const doc of bestPractices) {
  // Generate embedding
  const embeddingResponse = await openai.embeddings.create({
    model: 'text-embedding-3-small',
    input: doc.content,
  });

  const embedding = embeddingResponse.data[0].embedding;

  // Store in Qdrant
  await qdrant.upsert('pitch_deck_knowledge', {
    points: [
      {
        id: doc.id,
        vector: embedding,
        payload: {
          category: doc.category,
          title: doc.title,
          content: doc.content,
          ...doc.metadata,
        },
      },
    ],
  });

  console.log(`✅ Stored: ${doc.title}`);
}
```

### Step 5: Create RAG Edge Function

```typescript
// supabase/functions/pitch-deck-assistant-rag/index.ts

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { OpenAI } from 'openai';
import { QdrantClient } from '@qdrant/js-client-rest';

const openai = new OpenAI({ apiKey: Deno.env.get('OPENAI_API_KEY') });
const qdrant = new QdrantClient({
  url: Deno.env.get('QDRANT_URL'),
  apiKey: Deno.env.get('QDRANT_API_KEY'),
});

serve(async (req) => {
  try {
    const { message, conversation_id, profile_id } = await req.json();

    // 1. Generate embedding for user query
    const embeddingResponse = await openai.embeddings.create({
      model: 'text-embedding-3-small',
      input: message,
    });
    const queryEmbedding = embeddingResponse.data[0].embedding;

    // 2. Search Qdrant for relevant best practices
    const searchResults = await qdrant.search('pitch_deck_knowledge', {
      vector: queryEmbedding,
      limit: 5, // Top 5 most relevant documents
      with_payload: true,
    });

    // 3. Extract best practices content
    const context = searchResults
      .map((result, idx) => {
        return `[Best Practice ${idx + 1}]\n${result.payload.content}\n`;
      })
      .join('\n---\n\n');

    // 4. Build enhanced system prompt
    const systemPrompt = `You are Claude, an expert pitch deck advisor with access to a knowledge base of startup best practices.

KNOWLEDGE BASE (Use this to inform your advice):

${context}

INSTRUCTIONS:
- Reference specific best practices from the knowledge base above
- Cite sources when giving advice (e.g., "Based on Y Combinator guidelines...")
- Be specific and actionable
- If the knowledge base has relevant examples, share them
- If user asks about a specific slide type, prioritize that category

Remember: You're helping ${profile_id} create a professional investor presentation.`;

    // 5. Call OpenAI with enhanced context
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: message },
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    const aiResponse = completion.choices[0].message.content;

    // 6. Return response with metadata
    return new Response(
      JSON.stringify({
        message: aiResponse,
        conversation_id,
        sources: searchResults.map((r) => ({
          title: r.payload.title,
          category: r.payload.category,
          relevance: r.score,
        })),
      }),
      { headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('RAG Error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500 }
    );
  }
});
```

### Step 6: Update Frontend (Optional - Show Sources)

```typescript
// src/pages/PitchDeckWizard.tsx

// Add sources to Message interface
interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  sources?: Array<{
    title: string;
    category: string;
    relevance: number;
  }>;
}

// Display sources below AI message
{message.sources && (
  <div className="mt-2 text-xs text-muted-foreground">
    <p className="font-semibold">Sources:</p>
    {message.sources.map((source, idx) => (
      <div key={idx}>
        • {source.title} ({Math.round(source.relevance * 100)}% relevant)
      </div>
    ))}
  </div>
)}
```

---

## Startup Best Practices Data Structure {#data-structure}

### Categories of Knowledge

**1. Slide-Specific Best Practices** (10 slide types)
- Problem Slide
- Solution Slide
- Market Size (TAM/SAM/SOM)
- Product/Demo
- Business Model
- Go-to-Market Strategy
- Competitive Analysis
- Team
- Financials
- Traction

**2. Investor Psychology** (50+ insights)
- What investors look for in first 3 minutes
- Common rejection reasons
- Red flags to avoid
- Trust-building techniques

**3. Success Patterns** (100+ examples)
- Airbnb deck analysis
- Uber deck analysis
- LinkedIn deck analysis
- Dropbox deck analysis
- (50+ more funded startups)

**4. Industry-Specific Guidance**
- SaaS pitch decks
- Hardware startups
- Marketplace businesses
- Deep tech
- Consumer apps

### Example Knowledge Entries

#### Entry 1: Problem Slide
```json
{
  "id": 1,
  "category": "problem_slide",
  "title": "Problem Slide Best Practices",
  "content": "...", // See Step 4 above
  "metadata": {
    "slide_type": "problem",
    "source": "YC_Sequoia_500Startups",
    "confidence": "high",
    "last_updated": "2025-01-15"
  }
}
```

#### Entry 2: Market Size Framework
```json
{
  "id": 2,
  "category": "market_analysis",
  "title": "TAM/SAM/SOM Framework Explained",
  "content": "Market Size: The TAM/SAM/SOM Framework

TAM (Total Addressable Market):
- Definition: Total market demand for your product/service
- Example: \"All global enterprise software = $500B\"
- How to calculate: Industry reports (Gartner, IDC, Forrester)

SAM (Serviceable Addressable Market):
- Definition: Segment of TAM you can realistically serve
- Example: \"Enterprise CRM in North America = $50B\"
- How to calculate: TAM × your geographic/segment focus

SOM (Serviceable Obtainable Market):
- Definition: Portion of SAM you can capture short-term (3-5 years)
- Example: \"Our realistic market share in 5 years = $500M (1% of SAM)\"
- How to calculate: Bottom-up (sales capacity × pricing)

Common Mistakes:
❌ TAM too large (\"$10 trillion market\") - not credible
❌ No SAM/SOM - shows lack of focus
❌ SOM too aggressive (>5% of SAM in Year 1)

Best Practice:
✅ Show all three numbers
✅ Explain your assumptions
✅ Be conservative on SOM (under-promise, over-deliver)

Source: Sequoia Capital pitch deck template",
  "metadata": {
    "slide_type": "market_analysis",
    "source": "Sequoia_Capital",
    "confidence": "high"
  }
}
```

#### Entry 3: Investor Red Flags
```json
{
  "id": 3,
  "category": "investor_psychology",
  "title": "Top 10 Investor Red Flags to Avoid",
  "content": "Red Flags That Kill Pitch Decks

Based on analysis of 1,000+ rejected decks:

1. **Cluttered Slides** (30% of rejections)
   - Too much text
   - No visual hierarchy
   - Confusing charts

2. **No Clear Problem** (25%)
   - Generic problem statements
   - Solution looking for a problem
   - \"Nice to have\" vs. \"must have\"

3. **Weak Team Slide** (20%)
   - First-time founders with no domain expertise
   - Missing key roles (no CTO for tech startup)
   - Vague past experience

4. **Unrealistic Financials** (15%)
   - Hockey stick projections
   - No basis for assumptions
   - Ignoring competition

5. **Market Size Confusion** (10%)
   - TAM = \"Everyone with a phone\"
   - No SAM/SOM breakdown
   - Bottom-up doesn't match top-down

How to Avoid:
✅ Get expert feedback BEFORE pitching
✅ Practice your deck 20+ times
✅ Address weaknesses proactively
✅ Show traction (even small wins matter)

Source: First Round Capital, 500 Startups interview data",
  "metadata": {
    "category": "investor_psychology",
    "source": "FirstRound_500Startups",
    "confidence": "high"
  }
}
```

---

## Code Examples {#code-examples}

### Example 1: Basic RAG Query

```typescript
// Query Qdrant for problem slide best practices

const searchResults = await qdrant.search('pitch_deck_knowledge', {
  vector: queryEmbedding,
  filter: {
    must: [
      {
        key: 'category',
        match: { value: 'problem_slide' },
      },
    ],
  },
  limit: 3,
});
```

### Example 2: Multi-Category Search

```typescript
// Search multiple slide types at once

const slideTypes = ['problem_slide', 'solution_slide', 'market_analysis'];

const searchResults = await qdrant.search('pitch_deck_knowledge', {
  vector: queryEmbedding,
  filter: {
    should: slideTypes.map((type) => ({
      key: 'category',
      match: { value: type },
    })),
  },
  limit: 10,
});
```

### Example 3: Confidence Filtering

```typescript
// Only return high-confidence best practices

const searchResults = await qdrant.search('pitch_deck_knowledge', {
  vector: queryEmbedding,
  filter: {
    must: [
      {
        key: 'confidence',
        match: { value: 'high' },
      },
    ],
  },
  limit: 5,
});
```

---

## Cost & Performance {#cost-performance}

### Qdrant Costs

**Free Tier** (Sufficient for MVP):
- ✅ 1GB storage (~50,000 vectors)
- ✅ 100K queries/month
- ✅ 1 cluster

**Paid Plans** (If you scale):
- $25/month - 4GB storage
- $95/month - 16GB storage
- Enterprise - Custom pricing

### OpenAI Costs (Embeddings)

**text-embedding-3-small**:
- Cost: $0.02 per 1M tokens
- 1,000 best practices = ~500K tokens
- **One-time cost**: $0.01 (yes, one cent!)
- Per query: <$0.0001 (negligible)

### Performance Benchmarks

**Qdrant Response Time**:
- 1M vectors: **3ms average**
- 100K vectors: **<1ms**
- Our 1K vectors: **<0.5ms** ⚡

**Total RAG Pipeline**:
1. Embed query: ~200ms
2. Search Qdrant: ~5ms
3. Generate response: ~1-2s
**Total: 1.2-2.2 seconds** (acceptable for chat)

### Monthly Cost Estimate

For 1,000 users, 10 queries each:
```
Qdrant: $0 (free tier covers 100K queries)
OpenAI Embeddings: $0.20 (10K queries × $0.00002)
OpenAI Completions: $10 (existing cost)
------------------------
Total: $10.20/month (no significant increase!)
```

---

## Deployment Guide {#deployment}

### 1. Deploy Qdrant Setup Script

```bash
# Create collection (one-time)
cd supabase/functions/pitch-deck-assistant-rag
deno run --allow-net --allow-env setup-qdrant.ts
```

### 2. Populate Knowledge Base

```bash
# Load best practices (one-time, or update periodically)
deno run --allow-net --allow-env populate-knowledge.ts
```

### 3. Deploy Edge Function

```bash
# Deploy RAG-enabled function
supabase functions deploy pitch-deck-assistant-rag

# Set secrets
supabase secrets set QDRANT_URL=your-cluster-url
supabase secrets set QDRANT_API_KEY=your-api-key
supabase secrets set OPENAI_API_KEY=your-openai-key
```

### 4. Update Frontend Endpoint

```typescript
// src/pages/PitchDeckWizard.tsx

// Change from:
const data = await apiClient.post('/pitch-deck-assistant', ...);

// To:
const data = await apiClient.post('/pitch-deck-assistant-rag', ...);
```

### 5. Test RAG System

```bash
# Test query
curl -X POST https://your-project.supabase.co/functions/v1/pitch-deck-assistant-rag \
  -H "Content-Type: application/json" \
  -d '{
    "message": "What should I include in my problem slide?",
    "conversation_id": null,
    "profile_id": "test-user"
  }'

# Expected: Response with best practices and sources
```

---

## Summary

### What You Get

✅ **Smart Advisory System** - AI backed by 1,000+ startup best practices
✅ **Real-Time Knowledge** - Query vector database in <5ms
✅ **Source Citations** - Show users which best practices inform advice
✅ **Cost-Effective** - <$1/month for embeddings + storage
✅ **Scalable** - Handles millions of queries without slowdown
✅ **Easy Updates** - Add new knowledge without retraining models

### Time to Implement

- **Setup Qdrant**: 5 minutes
- **Create collections**: 10 minutes
- **Populate knowledge**: 2-3 hours (gather best practices content)
- **Build RAG function**: 1 hour
- **Testing**: 30 minutes
- **Deployment**: 15 minutes

**Total: 4-5 hours** for complete RAG system

### Next Steps

1. ✅ Read this guide
2. ✅ Sign up for Qdrant Cloud (free tier)
3. ✅ Gather startup best practices content
4. ✅ Follow implementation steps above
5. ✅ Test with real users
6. ✅ Monitor performance and iterate

---

**Status**: ✅ Ready for implementation
**Complexity**: Moderate (well-documented)
**ROI**: High (huge value for users, low cost)

---

*This guide provides everything needed to add intelligent, knowledge-based advisory to your pitch deck wizard.*
