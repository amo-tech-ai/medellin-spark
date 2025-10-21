# AI Pitch Deck Generation Research Summary

**Date**: October 17, 2025
**Scope**: GitHub repositories, agent architectures, and AI presentation generation patterns

---

## Executive Summary

After comprehensive research of 8+ GitHub repositories and AI agent patterns, **Presenton** emerges as the clear leader for production AI presentation generation, while **slide-deck-ai** serves as an excellent learning resource. Multi-agent architectures combined with RAG show the most promise for advanced use cases.

---

## Top 5 Most Impressive Repositories

### 1. **presenton/presenton** ⭐️⭐️⭐️⭐️⭐️ (95/100)
- **Stars**: 2,500+ | **Status**: Active (Oct 2025)
- **Why it's impressive**:
  - Most production-ready open-source solution
  - Built-in MCP (Model Context Protocol) server
  - Enterprise-focused with cloud offering
  - Supports OpenAI, Google Gemini, Anthropic Claude, Ollama
  - Docker deployment with GPU support
  - Custom HTML/Tailwind templates
  - Export to PPTX and PDF
  - API-first architecture
  - Template creation from existing PPTX files
- **Tech**: TypeScript, Next.js, Python, FastAPI, Docker
- **License**: Apache-2.0
- **Best for**: Self-hosted enterprise solutions, API deployments

### 2. **barun-saha/slide-deck-ai** ⭐️⭐️⭐️⭐️ (85/100)
- **Stars**: 274 | **Status**: Active (Mar 2025)
- **Why it's impressive**:
  - Won 3rd place in Llama 2 Hackathon
  - Excellent documentation
  - Supports 10+ LLM providers
  - Offline mode with Ollama
  - PDF-based generation
  - Chat-based refinement
  - Multi-template support
  - Image search integration
- **Tech**: Python, Streamlit, LangChain, python-pptx
- **License**: MIT
- **Best for**: Learning, prototyping, local deployment

### 3. **noahmeurer/pitch-deck-teardown-agent** ⭐️⭐️⭐️ (40/100)
- **Stars**: 0 | **Status**: Stale (Jun 2025)
- **Why it's interesting**:
  - Multi-agent architecture (analysis-focused)
  - Emulates VC analyst workflow
  - Supabase integration
  - Vector embeddings for analysis
  - Executive summary generation
  - Monorepo with pnpm workspace
- **Tech**: TypeScript, Next.js, Supabase, Google Gemini
- **Best for**: Architectural reference for multi-agent systems

### 4. **shadowaxe99/decker** ⭐️⭐️ (25/100)
- **Stars**: 0 | **Status**: Stale (Dec 2023)
- **Why it's notable**:
  - Investor-specific personalization concept
  - Web scraping (X.com, Crunchbase)
  - Interesting but abandoned
- **Tech**: Python, Flask
- **Best for**: Historical reference only

### 5. **aryan-Patel-web/PitchPal-AI** ⭐️ (15/100)
- **Status**: Unknown (commercial product)
- **Why it's mentioned**:
  - Commercial product (pitchpal.app)
  - Accelerator application generation
  - Analysis over generation focus
- **Best for**: Understanding commercial offerings

---

## Key Patterns Discovered

### 1. **OpenAI Function Calling vs Claude Tool Use**

| Aspect | OpenAI Function Calling | Claude Tool Use + MCP |
|--------|------------------------|----------------------|
| **Philosophy** | Centralized, product-first | Developer control, flexible |
| **Integration** | Automated, tight coupling | Manual, loose coupling |
| **Portability** | OpenAI-only | Cross-model (Claude, GPT, Llama) |
| **Best for** | Rapid prototyping | Enterprise, multi-model |
| **Governance** | Limited | Strong |
| **Learning curve** | Easy | Moderate |

**Recommendation**: Use Claude/MCP for enterprise and long-term maintainability. Use OpenAI for rapid prototyping.

### 2. **Multi-Agent Architectures**

**Key Insight**: Multi-agent systems reduce query resolution time by 35-50% and hallucinations by 60-80%.

**Agent Types**:
- **Coordinator Agents**: Workflow orchestration
- **Retrieval Agents**: Data access from specific sources
- **Reasoning Agents**: Synthesis and analysis
- **Specialized Task Agents**: Domain-specific operations

**Frameworks**:
- LangGraph (most flexible)
- CrewAI (easiest to start)
- LlamaIndex (best for RAG)
- AutoGen (Microsoft's approach)

**Application to Pitch Decks**:
```
Research Agent → Content Agent → Design Agent → Review Agent
     ↓                ↓               ↓              ↓
  Web search    Generate slides   Apply theme    Check quality
  Investor DB   Write content     Add images     Suggest edits
```

### 3. **RAG Implementations**

**Agentic RAG** = RAG + Agent-based architectures

**Benefits**:
- Dynamic tool use
- Multiple knowledge bases
- Adaptive problem-solving
- 60-80% fewer hallucinations

**Use Cases for Pitch Decks**:
- Document analysis (competitor decks)
- Market research integration
- Template library search
- Investor preference matching

### 4. **Structured Output Generation**

**Critical for presentation generation** - slides must have consistent structure.

**Approaches**:
1. **Prompt-based**: Include schema in prompt
2. **Grammar-based**: Constrained decoding (Outlines, Jsonformer)
3. **Function calling**: OpenAI native support
4. **Tool use**: Claude/MCP
5. **Pydantic models**: Type-safe validation

**Best Practices**:
```python
# Always include in prompts
"Respond with valid JSON only."

# Provide schema upfront
schema = {
  "type": "object",
  "properties": {
    "slides": {
      "type": "array",
      "items": {"type": "object"}
    }
  }
}
```

---

## Technologies to Adopt

### Core Stack
1. **Frontend**: Next.js (TypeScript) - modern, SSR, API routes
2. **Backend**: FastAPI (Python) - fast, async, OpenAPI support
3. **LLM Integration**:
   - Primary: Anthropic Claude (MCP support)
   - Fallback: OpenAI GPT-4
   - Local: Ollama (privacy)
4. **Database**: Supabase (Postgres + RLS + Storage + Edge Functions)
5. **File Generation**: python-pptx (PPTX), reportlab (PDF)
6. **Agent Framework**: LangGraph (flexibility) or CrewAI (simplicity)
7. **Deployment**: Docker + Docker Compose

### Key Libraries
```json
{
  "python": [
    "python-pptx",
    "langchain",
    "langgraph",
    "instructor",
    "pydantic",
    "fastapi",
    "anthropic",
    "openai"
  ],
  "typescript": [
    "next.js",
    "@anthropic-ai/sdk",
    "openai",
    "@modelcontextprotocol/sdk",
    "zod"
  ]
}
```

### Image Generation
- **Paid**: DALL-E 3 (OpenAI), Gemini Flash (Google)
- **Free**: Pexels API, Pixabay API
- **Recommendation**: Start with Pexels, offer DALL-E as premium

---

## Features to Implement

### Phase 1: Core Generation (MVP)
- [ ] Multi-stage generation (outline → content → slides)
- [ ] Support multiple LLM providers (OpenAI, Claude, Ollama)
- [ ] Template system (3-5 built-in templates)
- [ ] Export to PPTX and PDF
- [ ] Basic image integration (Pexels)

### Phase 2: Enhanced Features
- [ ] Chat-based refinement
- [ ] Template creation from PPTX upload
- [ ] Custom themes (colors, fonts)
- [ ] RAG for document analysis
- [ ] Web search integration

### Phase 3: Advanced Features
- [ ] Multi-agent architecture
  - Research agent (web, databases)
  - Content agent (slide generation)
  - Design agent (layout, images)
  - Review agent (quality check)
- [ ] Investor personalization
- [ ] Pitch deck analysis/coaching
- [ ] API for programmatic access
- [ ] Team collaboration

### Phase 4: Enterprise
- [ ] White-label deployment
- [ ] SSO/SAML integration
- [ ] Custom model hosting
- [ ] Advanced analytics
- [ ] Version control
- [ ] Comment system

---

## Architecture Recommendations

### Recommended Stack
```
┌─────────────────────────────────────┐
│         Next.js Frontend            │
│   (TypeScript, React, Tailwind)     │
└─────────────┬───────────────────────┘
              │
┌─────────────┴───────────────────────┐
│      FastAPI Backend (Python)       │
│  ┌──────────────────────────────┐   │
│  │   Agent Coordinator          │   │
│  │  ┌────────┬────────┬────────┐│   │
│  │  │Research│Content │Design  ││   │
│  │  │ Agent  │ Agent  │ Agent  ││   │
│  │  └────────┴────────┴────────┘│   │
│  └──────────────────────────────┘   │
└─────────────┬───────────────────────┘
              │
┌─────────────┴───────────────────────┐
│       Supabase Backend              │
│  • Postgres (data)                  │
│  • Storage (PPTX/PDF files)         │
│  • RLS (security)                   │
│  • Edge Functions (serverless)      │
└─────────────────────────────────────┘
```

### Agent Architecture (Multi-Agent Approach)
```
User Input
    ↓
Coordinator Agent
    ↓
    ├─→ Research Agent (parallel)
    │   • Web search
    │   • Competitor analysis
    │   • Market data
    ↓
    ├─→ Content Agent
    │   • Outline generation
    │   • Slide content
    │   • Structured JSON output
    ↓
    ├─→ Design Agent
    │   • Template selection
    │   • Image generation/search
    │   • Layout optimization
    ↓
    ├─→ Review Agent
    │   • Quality check
    │   • Consistency validation
    │   • Suggestions
    ↓
PPTX/PDF Output
```

---

## Competitive Analysis

### Open-Source Leaders
1. **Presenton**: 2.5k stars, production-ready, MCP integration
2. **slide-deck-ai**: 274 stars, mature, well-documented

### Commercial Alternatives
- Gamma (market leader)
- Beautiful.ai
- Decktopus
- PitchBob
- PitchGrade

### Market Gap
- Most solutions focus on **generation only**
- Few handle **analysis and coaching**
- **Investor-specific personalization** is rare
- **Multi-agent architectures** underexplored
- **RAG integration** for market research missing

### Opportunity
Combine:
- Presenton's generation quality
- pitch-deck-teardown-agent's analysis capabilities
- decker's investor personalization
- Multi-agent architecture for complex workflows
- RAG for market research and competitor analysis

---

## Implementation Roadmap

### Week 1-2: Foundation
- Set up Next.js + FastAPI + Supabase
- Implement basic LLM integration (OpenAI/Claude)
- Create structured output schemas
- Build simple PPTX generation

### Week 3-4: Core Features
- Multi-stage generation (outline → content → slides)
- Template system
- Image integration (Pexels)
- PDF export

### Week 5-6: Enhanced Features
- Chat-based refinement
- Multiple LLM provider support
- Template customization
- Ollama integration (offline mode)

### Week 7-8: Advanced Features
- Multi-agent architecture
- RAG for document analysis
- Web search integration
- API mode

### Week 9-10: Polish & Deploy
- UI/UX improvements
- Performance optimization
- Docker deployment
- Documentation
- Launch

---

## Key Takeaways

1. **Presenton is the gold standard** for open-source AI presentation generation
2. **Multi-agent + RAG** is the future for complex workflows
3. **Claude/MCP** is better than OpenAI for enterprise and flexibility
4. **Structured output** with JSON schemas is critical for consistency
5. **python-pptx** is the standard for PPTX generation
6. **Market gap exists** for analysis, coaching, and personalization
7. **Offline mode** (Ollama) is increasingly important for privacy
8. **API-first architecture** enables broader adoption

---

## Next Steps

1. **Clone and study** Presenton and slide-deck-ai codebases
2. **Test** MCP integration with Claude
3. **Prototype** multi-agent architecture with LangGraph
4. **Experiment** with structured output generation
5. **Build MVP** following Phase 1 feature list
6. **Deploy** with Docker for easy self-hosting
7. **Open-source** the project to build community

---

## Resources

### Documentation
- [Presenton Docs](https://docs.presenton.ai/)
- [slide-deck-ai GitHub](https://github.com/barun-saha/slide-deck-ai)
- [python-pptx Docs](https://python-pptx.readthedocs.io/)
- [MCP Protocol](https://modelcontextprotocol.io/)

### Frameworks
- [LangGraph](https://github.com/langchain-ai/langgraph)
- [CrewAI](https://github.com/joaomdmoura/crewAI)
- [LlamaIndex](https://github.com/run-llama/llama_index)

### Agent Patterns
- [Anthropic Claude SDK](https://github.com/anthropics/anthropic-sdk-python)
- [OpenAI AgentKit](https://github.com/openai/swarm)

---

**Generated**: October 17, 2025
**Research Time**: ~2 hours
**Repositories Analyzed**: 8+
**Web Sources**: 30+
