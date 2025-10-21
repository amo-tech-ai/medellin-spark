# CopilotKit - Complete Guide (Simple Version)

**Date**: October 18, 2025
**Decision**: Consider CopilotKit as Alternative to ChatKit ✅

---

## TL;DR (Too Long; Didn't Read)

**What**: CopilotKit is an open-source React framework for building AI chat interfaces in your app
**Why**: Easier than ChatKit, no vendor lock-in, works with any AI provider
**Should you use it**: Maybe - better than ChatKit, but you're still 85% done with custom
**Best for**: New projects, or if you want to rebuild with more flexibility

---

## What is CopilotKit?

### The Simple Explanation

CopilotKit is like a "chat widget builder" for React apps that makes it easy to add AI assistants to your product.

**Think of it as**:
- Ready-made chat UI components (like ChatKit)
- Support for ANY AI provider (unlike ChatKit which locks you to OpenAI)
- Real-time state sharing between your app and the AI
- Open-source and free (12,000+ GitHub stars)

### What Makes It Different

**CopilotKit vs. ChatKit**:
```
ChatKit:
- OpenAI only (vendor lock-in)
- Frontend + OpenAI-hosted backend
- Newer, less mature
- OpenAI-specific features

CopilotKit:
- Works with ANY AI (OpenAI, Anthropic, Google, etc.)
- You control the backend
- Mature, 12K+ stars
- Framework-agnostic (LangGraph, CrewAI, etc.)
```

---

## The AG-UI Protocol (Key Innovation)

### What is AG-UI?

**AG-UI** = **Agent-User Interaction Protocol**

It's like a "universal language" that lets your frontend talk to any AI agent backend.

**Simple Analogy**:
- **USB-C**: One cable works with any device
- **AG-UI**: One protocol works with any AI framework

### Why AG-UI Matters

**Before AG-UI**:
```
Your React App → Custom API → LangGraph
Your React App → Different Custom API → CrewAI
Your React App → Another Custom API → OpenAI
```
*You build 3 different integrations*

**With AG-UI**:
```
Your React App → AG-UI Protocol → LangGraph
                → AG-UI Protocol → CrewAI
                → AG-UI Protocol → OpenAI
```
*You build ONE integration, works with everything*

### AG-UI Features

**1. Real-Time State Sharing**
```typescript
// Your app and AI agent share the same data
const { state } = useCoAgent({
  name: "pitchDeckAgent",
  initialState: {
    companyName: "",
    problem: "",
    solution: ""
  }
});

// When AI updates state, your UI updates automatically
// When user updates state, AI knows about it
```

**2. Streaming Responses**
- Text appears word-by-word as AI generates
- No waiting for complete responses

**3. Tool Visualization**
- Shows when AI calls functions/APIs
- "🔍 Searching database..."
- "📊 Analyzing data..."

**4. Human-in-the-Loop (HITL)**
- AI can ask for approval before actions
- "Should I send this email?" [Yes] [No]

---

## Supported AI Frameworks (First-Party Integrations)

CopilotKit works with 10+ agent frameworks:

### 1. **LangGraph** (Most Popular)
- **What**: Visual workflow builder for AI agents
- **Use case**: Multi-step agents, complex workflows
- **Integration**: Native AG-UI support

### 2. **Pydantic AI** (Type-Safe)
- **What**: Type-safe AI framework from Pydantic creators
- **Use case**: Production apps needing validation
- **Integration**: Native AG-UI support

### 3. **Google ADK** (Agent Development Kit)
- **What**: Google's official agent framework
- **Use case**: Enterprise Google Cloud users
- **Integration**: AG-UI bridge

### 4. **Mastra**
- **What**: Lightweight agent framework
- **Use case**: Simple agents, quick prototyping
- **Integration**: Native AG-UI support

### 5. **CrewAI & CrewAI Flows**
- **What**: Multi-agent orchestration
- **Use case**: Team of specialized AI agents
- **Integration**: Native AG-UI support

### 6. **AG2** (Multi-Agent)
- **What**: Microsoft's multi-agent framework
- **Use case**: Complex multi-agent systems
- **Integration**: Native AG-UI support

### 7. **LlamaIndex**
- **What**: Data indexing and retrieval
- **Use case**: RAG (Retrieval-Augmented Generation)
- **Integration**: Native AG-UI support

### 8. **Agno**
- **What**: Agent orchestration
- **Use case**: Portfolio apps, financial agents
- **Integration**: Native AG-UI support

### 9. **Direct to LLM**
- **What**: Direct OpenAI, Anthropic, Google API calls
- **Use case**: Simple chatbots without frameworks
- **Integration**: Native CopilotKit support

### 10. **Custom Backends**
- **What**: Build your own with AG-UI protocol
- **Use case**: Maximum control
- **Integration**: Implement AG-UI events

---

## Core Components

### Frontend (React)

**1. CopilotChat**
```tsx
import { CopilotChat } from "@copilotkit/react-ui";

<CopilotChat
  instructions="You're a pitch deck assistant"
  labels={{
    title: "Pitch Deck AI",
    placeholder: "Describe your startup..."
  }}
/>
```
- Pre-built chat UI
- Customizable styling
- Streaming responses
- Message history

**2. CopilotTextarea**
```tsx
import { CopilotTextarea } from "@copilotkit/react-textarea";

<CopilotTextarea
  placeholder="Describe your problem..."
  autosuggestionsConfig={{
    textareaPurpose: "Pitch deck problem statement",
    chatApiConfigs: {}
  }}
/>
```
- AI-powered text editing
- Autocompletions
- Suggestions

**3. useCoAgent Hook**
```tsx
import { useCoAgent } from "@copilotkit/react-core";

const { state, setState } = useCoAgent({
  name: "myAgent",
  initialState: { data: {} }
});
```
- Share state between app and agent
- Real-time synchronization
- Bi-directional updates

**4. useCopilotAction Hook**
```tsx
import { useCopilotAction } from "@copilotkit/react-core";

useCopilotAction({
  name: "generateSlides",
  description: "Generate pitch deck slides",
  parameters: [
    { name: "companyData", type: "object" }
  ],
  handler: async ({ companyData }) => {
    // Your logic here
  }
});
```
- Define actions AI can trigger
- Function calling
- Tool execution

---

## 10 Key Features

### 1. **Framework Agnostic** 🔄
Works with ANY AI framework (LangGraph, CrewAI, etc.)

**Example**: Start with OpenAI, switch to Claude in 1 hour

---

### 2. **Real-Time State Sharing** 🔄
Your app and AI agent share same data

**Example**:
```tsx
// User types company name in form
setState({ companyName: "TechCorp" });

// AI immediately knows and asks about industry
"Great! Tell me about TechCorp's industry..."
```

---

### 3. **Generative UI** 🎨
AI can create custom UI components in chat

**Example**:
```tsx
// AI generates interactive pitch preview
<PitchDeckPreview
  slides={[...]}
  onEdit={() => {}}
/>
```

---

### 4. **Streaming Responses** ⚡
Text appears as AI generates (like ChatGPT)

**Example**: "I... think... your... startup..." → instant feedback

---

### 5. **Tool Visualization** 🔧
Shows when AI calls functions

**Example**:
```
🔍 Searching similar startups...
📊 Analyzing market size...
✅ Found 3 competitors
```

---

### 6. **Human-in-the-Loop (HITL)** 👤
AI asks for approval before actions

**Example**:
```
AI: "Should I generate the deck now?"
[Yes, generate] [Not yet, refine more]
```

---

### 7. **No Vendor Lock-in** ✅
Switch AI providers anytime

**Example**:
```typescript
// Day 1: OpenAI
const openai = new OpenAI({ apiKey: "..." });

// Day 2: Anthropic Claude
const anthropic = new Anthropic({ apiKey: "..." });
```

---

### 8. **Open Source** 🌟
Free, 12K+ GitHub stars, active community

**Benefit**: No surprise fees, full control, community support

---

### 9. **TypeScript First** 📝
Full TypeScript support, type-safe

**Example**:
```typescript
interface PitchDeckState {
  companyName: string;
  problem: string;
  solution: string;
  slides: Slide[];
}

const { state } = useCoAgent<PitchDeckState>({...});
```

---

### 10. **Production Ready** 🚀
Used by real companies, battle-tested

**Benefit**: Not experimental, ready for production use

---

## 10 Real-World Use Cases

### 1. **AI Researcher** 🔍
Search the web, compile findings, create reports

**How CopilotKit Helps**:
- Streaming search results
- Tool calls visualization (searching, analyzing)
- State management (collected research)

**Example App**: AI Researcher on copilotkit.ai/examples

---

### 2. **Travel Planner** ✈️
Plan trips, book hotels, create itineraries

**How CopilotKit Helps**:
- Generative UI (calendar widget, map preview)
- Tool calls (Google Maps API, booking sites)
- HITL (confirm booking before purchase)

**Example**: AI Travel Planner with LangGraph + Google Maps

---

### 3. **Investment Portfolio Manager** 💰
Analyze stocks, suggest portfolio changes

**How CopilotKit Helps**:
- Real-time stock data sharing
- Chart generation in chat
- Tool calls (fetch market data)

**Example**: Stock Portfolio Agent (Pydantic AI + AG-UI)

---

### 4. **Form Filling Assistant** 📝
Help users fill complex forms (insurance, tax, legal)

**How CopilotKit Helps**:
- CopilotTextarea for autocomplete
- Step-by-step guidance
- Validation and suggestions

**Example**: Form Filling Copilot on copilotkit.ai/examples

---

### 5. **Data Dashboard Chatbot** 📊
"Chat with your data" - ask questions about analytics

**How CopilotKit Helps**:
- Query database via tool calls
- Generate charts in chat
- Real-time data updates

**Example**: AI-Powered Dashboard on copilotkit.ai/examples

---

### 6. **Resume/Cover Letter Generator** 📄
Help job seekers create tailored applications

**How CopilotKit Helps**:
- Generative UI (resume preview)
- Export to PDF
- Customization options

**Common Use Case**: Portfolio project for developers

---

### 7. **Social Media Scheduler** 📱
Generate posts, schedule content, analyze performance

**How CopilotKit Helps**:
- Content generation
- Calendar widget (generative UI)
- Multi-platform posting (tool calls)

**Common Use Case**: Marketing automation

---

### 8. **Research Canvas** 📚
Organize research, take notes, plan projects

**How CopilotKit Helps**:
- State management (notes, structure)
- Real-time collaboration
- AI suggestions for organization

**Example**: Research Canvas on copilotkit.ai/examples

---

### 9. **Code Assistant** 💻
Help developers write, debug, explain code

**How CopilotKit Helps**:
- CopilotTextarea for code completion
- Tool calls (run tests, format code)
- Streaming explanations

**Common Use Case**: Internal dev tools

---

### 10. **Customer Support Chatbot** 🎧
Answer questions, handle requests, escalate to human

**How CopilotKit Helps**:
- Tool calls (search knowledge base, check status)
- HITL (escalate complex issues)
- Conversation history

**Common Use Case**: Support automation

---

## CopilotKit for Pitch Deck Wizard?

### ✅ Pros (Why CopilotKit Could Work)

**1. No Vendor Lock-in**
- Works with OpenAI, Claude, Gemini
- Switch providers anytime
- Future-proof

**2. Better Than ChatKit**
- More mature (12K stars vs. new)
- Open-source (free)
- No hidden costs
- Active community

**3. Rich Features**
- Real-time state sharing (perfect for progress tracking)
- Generative UI (embed pitch preview in chat)
- Tool visualization (show AI thinking)
- HITL (confirm before generating deck)

**4. Examples Exist**
- Presentation demo: github.com/CopilotKit/demo-presentation
- PowerPoint-like web app built with CopilotKit
- Can learn from existing implementations

### 🔴 Cons (Why You Might Not Want It)

**1. Still Requires Rewrite**
- Your chat is 85% done
- CopilotKit would be complete rebuild
- 2-3 weeks of work

**2. Learning Curve**
- New framework to learn
- AG-UI protocol
- React hooks patterns

**3. You Don't Need Many Features**
- Your wizard doesn't use tools
- Don't need generative UI (simple text)
- Don't need multi-agent (single conversation)

**4. Adds Complexity**
- Extra dependency
- More abstraction
- Potential bugs

### 🤔 Decision Matrix

**Use CopilotKit if**:
- ✅ Starting from scratch
- ✅ Want to avoid vendor lock-in (vs. ChatKit)
- ✅ Need rich features (tools, generative UI)
- ✅ Building complex multi-step agent
- ✅ Want open-source solution

**Keep Custom Implementation if**:
- ✅ Already 85% done (you are!)
- ✅ Simple requirements (just chat)
- ✅ Want full control
- ✅ Prefer minimal dependencies
- ✅ Limited time (11 hours vs. 2-3 weeks)

---

## Comparison: ChatKit vs CopilotKit vs Custom

| Feature | ChatKit | CopilotKit | Your Custom |
|---------|---------|------------|-------------|
| **Vendor Lock-in** | 🔴 High (OpenAI only) | ✅ None (any AI) | ✅ None |
| **Cost** | $595-2,275/mo | $45-75/mo | $45-75/mo |
| **Open Source** | 🔴 No | ✅ Yes (12K stars) | ✅ Your code |
| **Development Time** | 2-4 weeks | 2-3 weeks | 11 hours |
| **Complexity** | 🔴 High | 🟡 Medium | ✅ Low (you know it) |
| **Features** | Streaming, widgets | Streaming, state, tools, UI | Basic chat |
| **Flexibility** | 🔴 Limited | ✅ High | ✅ Unlimited |
| **Backend** | Build yourself | Build yourself | ✅ Done (Supabase) |
| **Learning Curve** | High | Medium | ✅ None (yours) |
| **Production Ready** | 🟡 New | ✅ Yes | ✅ Yes (85%) |
| **Community** | Small | Large (12K stars) | Just you |

### Recommendation

**For Medellin Spark Pitch Deck Wizard**:

1. **Best Option**: Keep your custom implementation, add 4 features (11 hours)
2. **Good Option**: Rebuild with CopilotKit if you want flexibility
3. **Bad Option**: Use ChatKit (vendor lock-in)

---

## How to Add CopilotKit (If You Decide To)

### Quick Start (30 Minutes)

**Step 1: Install**
```bash
npm install @copilotkit/react-core @copilotkit/react-ui
```

**Step 2: Wrap App**
```tsx
import { CopilotKit } from "@copilotkit/react-core";

<CopilotKit runtimeUrl="/api/copilotkit">
  <YourApp />
</CopilotKit>
```

**Step 3: Add Chat**
```tsx
import { CopilotChat } from "@copilotkit/react-ui";

<CopilotChat
  instructions="You're a pitch deck assistant..."
  labels={{
    title: "Pitch Deck AI"
  }}
/>
```

**Step 4: Create Backend Endpoint**
```typescript
// app/api/copilotkit/route.ts
import { CopilotRuntime, OpenAIAdapter } from "@copilotkit/runtime";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const { handleRequest } = CopilotRuntime.create({
    endpoint: req.url,
    adapter: new OpenAIAdapter({ apiKey: process.env.OPENAI_API_KEY }),
  });

  return handleRequest(req);
}
```

**Total Time**: 30 minutes for basic setup
**Full Implementation**: 2-3 weeks with state management, tools, etc.

---

## Resources

### Official

- **Website**: https://www.copilotkit.ai/
- **Docs**: https://docs.copilotkit.ai/
- **GitHub**: https://github.com/CopilotKit/CopilotKit
- **Examples**: https://www.copilotkit.ai/examples

### Key Integrations

- **LangGraph**: https://docs.copilotkit.ai/langgraph/
- **Pydantic AI**: https://docs.copilotkit.ai/pydantic-ai
- **Google ADK**: https://docs.copilotkit.ai/adk
- **Mastra**: https://docs.copilotkit.ai/mastra
- **CrewAI**: https://docs.copilotkit.ai/crewai-flows
- **AG2**: https://docs.copilotkit.ai/ag2
- **LlamaIndex**: https://docs.copilotkit.ai/llamaindex

### Tutorials

- **State Machine**: https://docs.copilotkit.ai/direct-to-llm/cookbook/state-machine
- **Multi-Agent**: https://www.copilotkit.ai/blog/how-to-make-agents-talk-to-each-other
- **Stock Portfolio**: https://www.copilotkit.ai/blog/build-a-stock-portfolio-ai-agent-fullstack-pydantic-ai
- **ADK Frontend**: https://www.copilotkit.ai/blog/build-a-frontend-for-your-adk-agents
- **LangGraph + Gemini**: https://www.copilotkit.ai/blog/heres-how-to-build-fullstack-agent-apps-gemini-copilotkit-langgraph
- **Mastra Real-Time**: https://www.copilotkit.ai/blog/how-copilotkit-mastra-enable-real-time-agent-interaction

### Examples on GitHub

- **Presentation Demo**: https://github.com/CopilotKit/demo-presentation
- **MCP Demo**: https://github.com/CopilotKit/copilotkit-mcp-demo
- **Pydantic AI**: https://github.com/CopilotKit/with-pydantic-ai
- **State Machine**: https://github.com/CopilotKit/CopilotKit/tree/main/examples/copilot-state-machine

---

## FAQ

### Q: Is CopilotKit better than ChatKit?

**A**: Yes, for most use cases:
- ✅ No vendor lock-in (works with any AI)
- ✅ Open source and free
- ✅ More mature (12K+ stars)
- ✅ Larger community
- ✅ More flexible

**But**: ChatKit has simpler setup if you're OK with OpenAI-only

---

### Q: Should I use CopilotKit for my pitch deck wizard?

**A**: Probably not, because:
- Your custom implementation is 85% done
- You don't need complex features (tools, multi-agent)
- 11 hours to finish custom vs. 2-3 weeks for CopilotKit
- You'd lose custom progress tracking sidebar

**Use CopilotKit if**: Starting from scratch or want future flexibility

---

### Q: Can I add streaming to my current chat without CopilotKit?

**A**: Yes! Use Server-Sent Events (SSE) with your Supabase Edge Function:
```typescript
// 4 hours of work, no framework needed
const stream = await openai.chat.completions.create({ stream: true });
for await (const chunk of stream) {
  // Send to frontend via SSE
}
```

---

### Q: What if I want to switch from OpenAI to Claude later?

**A**:
- **With ChatKit**: Can't switch (vendor lock-in)
- **With CopilotKit**: Switch in 1 hour
- **With Custom**: Switch in 1 hour

Your custom implementation and CopilotKit are equally flexible.

---

### Q: Is CopilotKit production-ready?

**A**: Yes:
- 12,000+ GitHub stars
- Used by real companies
- Active development
- Good documentation
- Large community

---

### Q: What's the cost?

**A**: CopilotKit is free (open source)

**Operating Costs**:
- OpenAI API: $20-50/month (1,000 conversations)
- Supabase: $25/month (Pro plan)
- **Total**: $45-75/month

Same as your current setup.

---

### Q: Can CopilotKit work with Supabase?

**A**: Yes! CopilotKit is backend-agnostic:
```typescript
// Use Supabase Edge Functions as backend
// CopilotKit calls your Supabase endpoint
// Your endpoint uses OpenAI/Claude/etc.
```

---

### Q: How hard is the learning curve?

**A**:
- **Basic setup**: 30 minutes
- **Simple chat**: 2-4 hours
- **State management**: 8-12 hours
- **Advanced features**: 1-2 weeks

Medium complexity, good documentation.

---

## Bottom Line

### What is CopilotKit?

**CopilotKit** is an open-source React framework that makes it easy to add AI chat to your app, with no vendor lock-in and support for any AI provider.

### Key Features

1. Works with ANY AI (OpenAI, Claude, Gemini, etc.)
2. Real-time state sharing
3. Generative UI (AI creates UI components)
4. Streaming responses
5. Tool visualization
6. Human-in-the-loop
7. Open source (12K+ stars)
8. Production ready

### Should You Use It?

**For your pitch deck wizard**: Probably not
- You're 85% done with custom
- Don't need complex features
- 11 hours to finish vs. 2-3 weeks to rebuild

**For new projects**: Yes, if you:
- Want to avoid vendor lock-in
- Need rich features (tools, multi-agent)
- Prefer open-source solutions
- Want framework flexibility

### Better Than ChatKit?

**Yes, CopilotKit is better than ChatKit** for most use cases:
- ✅ No vendor lock-in
- ✅ Open source
- ✅ More flexible
- ✅ Lower cost
- ✅ Larger community

### Final Recommendation

**For Medellin Spark**:
1. **Best**: Finish your custom implementation (11 hours)
2. **Good**: Rebuild with CopilotKit if you want future flexibility
3. **Bad**: Use ChatKit (vendor lock-in, higher cost)

---

**Status**: ✅ Analysis Complete
**Decision**: CopilotKit is better than ChatKit, but custom is better than both for your use case
**Next Step**: Add streaming to your custom implementation (Priority 1)

---

*CopilotKit is an excellent framework for new projects. For your 85%-complete custom implementation, finishing what you started is still the best path forward.*
