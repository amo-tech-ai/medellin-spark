# MVP Conversion Plan: Travel Copilot → Pitch Deck Wizard

**Goal**: Minimum viable conversion - just change prompts, keep everything else the same
**Risk Level**: LOW - Only changing text prompts, not touching infrastructure
**Time**: 1-2 hours for MVP, test immediately

---

## Current State Analysis

### What's Working (DON'T TOUCH)
- ✅ FastAPI server with CopilotKit integration
- ✅ LangGraph supervisor pattern
- ✅ Multi-agent orchestration
- ✅ Error handling and middleware
- ✅ Hot reload development (`bl serve --hotreload`)
- ✅ Blaxel deployment configuration

### Current Architecture
```
src/
├── main.py           # FastAPI server + CopilotKit endpoint
├── agent.py          # Supervisor agent (coordinates flight + hotel)
├── flight.py         # Flight search agent (uses explorer-mcp)
├── hotel.py          # Hotel search agent (uses explorer-mcp)
└── server/           # Error handlers & middleware (don't touch)
```

---

## MVP Conversion Strategy

### Phase 1: Minimal Prompt Changes Only (1 hour)

**Changes**:
1. Rename `flight.py` → `content.py` (ONLY change prompts)
2. Rename `hotel.py` → `slides.py` (ONLY change prompts)
3. Update supervisor prompt in `agent.py`
4. Update agent names in `main.py`

**What We're NOT Doing Yet**:
- ❌ No database integration
- ❌ No PPTX export
- ❌ No template selection
- ❌ No frontend changes
- ❌ No new features

**Test Criteria**: Can we have a conversation about a pitch deck and get a response?

---

## Step-by-Step Conversion

### Step 1: Rename and Update Content Agent (was flight.py)

**File**: `src/content.py` (rename from flight.py)

**Minimal Changes**:
```python
# src/content.py
from blaxel.langgraph import bl_model, bl_tools
from langgraph.checkpoint.memory import MemorySaver
from langgraph.prebuilt import create_react_agent


async def agent():
    """Content generation agent for pitch decks"""

    # KEEP THE SAME: Still use explorer-mcp tools (for now)
    tools = await bl_tools(["explorer-mcp"])
    model = await bl_model("sandbox-openai")

    # ONLY CHANGE: New prompt for pitch deck content
    prompt = """You are an expert pitch deck content creator.

Your primary responsibilities:
1. Ask users about their startup (company name, problem, solution, market, team)
2. Gather information through conversation
3. Generate structured content for presentation slides
4. Create compelling copy for investor pitches

When gathering information:
- Ask 5-8 key questions about the startup
- Focus on: problem, solution, market size, business model, traction, team
- Keep responses conversational and friendly
- Help founders articulate their vision clearly

Output format:
Present findings as structured content suitable for slides:
- Clear, concise bullet points
- Compelling headlines
- Investor-focused language
- Data-driven when possible

Remember to be helpful, ask clarifying questions, and help founders tell their story."""

    return create_react_agent(
        name="content-agent",  # Changed from "flight-agent"
        model=model,
        tools=tools,
        prompt=prompt,
        checkpointer=MemorySaver(),
    )
```

---

### Step 2: Rename and Update Slides Agent (was hotel.py)

**File**: `src/slides.py` (rename from hotel.py)

**Minimal Changes**:
```python
# src/slides.py
from blaxel.langgraph import bl_model, bl_tools
from langgraph.checkpoint.memory import MemorySaver
from langgraph.prebuilt import create_react_agent


async def agent():
    """Slide structure agent for pitch decks"""

    # KEEP THE SAME: Still use explorer-mcp tools (for now)
    tools = await bl_tools(["explorer-mcp"])
    model = await bl_model("sandbox-openai")

    # ONLY CHANGE: New prompt for slide structure
    prompt = """You are an expert presentation designer specializing in pitch decks.

Your primary responsibilities:
1. Organize content into logical slide structure
2. Suggest slide order and flow
3. Recommend standard pitch deck sections
4. Ensure narrative coherence across slides

Standard pitch deck structure:
1. Cover - Company name and tagline
2. Problem - What problem are you solving?
3. Solution - How does your product work?
4. Market - Who are your customers?
5. Business Model - How do you make money?
6. Traction - What progress have you made?
7. Team - Who is building this?
8. Ask - How much funding are you raising?

When organizing content:
- Suggest 8-10 slides for a standard pitch
- Ensure logical flow of information
- Recommend which content goes on which slide
- Keep slides focused (one idea per slide)

Output format:
Present slide structure as organized outline:
- Slide number and title
- 3-5 bullet points per slide
- Speaker notes for each slide

Remember to help create a compelling narrative arc."""

    return create_react_agent(
        name="slides-agent",  # Changed from "hotel-agent"
        model=model,
        tools=tools,
        prompt=prompt,
        checkpointer=MemorySaver(),
    )
```

---

### Step 3: Update Supervisor Agent

**File**: `src/agent.py`

**Minimal Changes**:
```python
from logging import getLogger

from blaxel.langgraph import bl_model
from langgraph.checkpoint.memory import MemorySaver
from langgraph_supervisor import create_supervisor

from .content import agent as content_agent  # Changed from flight_agent
from .slides import agent as slides_agent    # Changed from hotel_agent

logger = getLogger(__name__)


async def agent():
    model = await bl_model("sandbox-openai")

    # Initialize renamed agents
    content = await content_agent()
    slides = await slides_agent()

    supervisor_graph = create_supervisor(
        [content, slides],  # Changed from [flight, hotel]
        model=model,
        supervisor_name="pitch-deck-supervisor",  # Changed name
        prompt="""
        You are a pitch deck creation supervisor that coordinates AI agents
        to help startup founders create investor presentations.

        You have access to these agents:
        - content-agent: Gathers startup information and generates compelling content
        - slides-agent: Organizes content into a structured pitch deck

        Your workflow:
        1. Use content-agent to have a conversation with the founder
        2. Gather key information: problem, solution, market, team, traction, funding ask
        3. Use slides-agent to organize the content into 8-10 slides
        4. Present the structured outline to the user

        You can delegate tasks to agents as needed.
        Always be helpful and guide founders through creating their pitch deck.
        """,
    )

    agent = supervisor_graph.compile(
        name="pitch-deck-supervisor",  # Changed name
        checkpointer=MemorySaver()
    )
    return agent
```

---

### Step 4: Update Main Server

**File**: `src/main.py`

**Minimal Changes**:
```python
import os
from contextlib import asynccontextmanager
from logging import getLogger

from copilotkit import CopilotKitRemoteEndpoint, LangGraphAgent
from copilotkit.integrations.fastapi import add_fastapi_endpoint
from fastapi import FastAPI
from fastapi.responses import StreamingResponse
from opentelemetry.instrumentation.fastapi import FastAPIInstrumentor

from .agent import agent
from .content import agent as content_agent    # Changed from flight_agent
from .slides import agent as slides_agent      # Changed from hotel_agent
from .server.error import init_error_handlers
from .server.middleware import init_middleware

logger = getLogger(__name__)


@asynccontextmanager
async def lifespan(app: FastAPI):
    logger.info(f"Server running on port {os.getenv('BL_SERVER_PORT', 80)}")
    try:
        sdk = await get_sdk()
        app.state.sdk = sdk
        add_fastapi_endpoint(app, sdk, "/copilotkit")
        yield
        logger.info("Server shutting down")
    except Exception as e:
        logger.error(f"Error during startup: {str(e)}", exc_info=True)
        raise


async def get_sdk():
    supervisor = await agent()
    content = await content_agent()
    slides = await slides_agent()

    sdk = CopilotKitRemoteEndpoint(
        agents=[
            LangGraphAgent(
                name="pitch-deck-supervisor",
                description="Create a pitch deck",  # Changed description
                graph=supervisor
            ),
            LangGraphAgent(
                name="content-agent",
                description="Generate pitch deck content",  # Changed
                graph=content
            ),
            LangGraphAgent(
                name="slides-agent",
                description="Structure pitch deck slides",  # Changed
                graph=slides
            ),
        ],
    )
    return sdk


app = FastAPI(lifespan=lifespan)


@app.post("/")
def root():
    return StreamingResponse(
        "This is a pitch deck creation agent powered by CopilotKit.\n"  # Updated message
        "You can follow this documentation to use it: "
        "https://docs.blaxel.ai/Agents/Integrate-in-apps/CopilotKit#copilotkit-integration"
    )


init_error_handlers(app)
init_middleware(app)

FastAPIInstrumentor.instrument_app(app, exclude_spans=["receive", "send"])
```

---

## Testing the MVP

### Test 1: Start the Server

```bash
# Navigate to project
cd /home/sk/template-copilot-kit-py

# Start with hot reload
bl serve --hotreload

# Expected output:
# Server running on port 1338
# ✓ pitch-deck-supervisor agent loaded
# ✓ content-agent loaded
# ✓ slides-agent loaded
```

### Test 2: Test CopilotKit Endpoint

```bash
# Test agent discovery (GraphQL)
curl http://localhost:1338/copilotkit

# Expected: JSON response with 3 agents listed
```

### Test 3: Test Conversation

```bash
# Send a message
curl -X POST http://localhost:1338/copilotkit \
  -H "Content-Type: application/json" \
  -d '{
    "messages": [
      {
        "role": "user",
        "content": "I need to create a pitch deck for my SaaS startup"
      }
    ]
  }'

# Expected: AI responds with questions about the startup
```

### Test 4: Full Conversation Test

```bash
# Continue conversation
curl -X POST http://localhost:1338/copilotkit \
  -H "Content-Type: application/json" \
  -d '{
    "messages": [
      {
        "role": "user",
        "content": "I need to create a pitch deck for my SaaS startup"
      },
      {
        "role": "assistant",
        "content": "Great! Tell me about your startup..."
      },
      {
        "role": "user",
        "content": "We help retailers predict inventory demand with AI"
      }
    ]
  }'

# Expected: AI asks follow-up questions or starts organizing content
```

---

## File Changes Summary

### Files to Rename
```bash
# In src/ directory
mv flight.py content.py
mv hotel.py slides.py
```

### Files to Edit (Prompt Changes Only)
1. `src/content.py` - Update prompt (was flight.py)
2. `src/slides.py` - Update prompt (was hotel.py)
3. `src/agent.py` - Update imports, agent names, supervisor prompt
4. `src/main.py` - Update imports, agent descriptions

### Files NOT Touched
- `src/__main__.py` - No changes
- `src/server/` - No changes
- `blaxel.toml` - No changes (yet)
- `pyproject.toml` - No changes (yet)

---

## What Happens After MVP Works?

**Once we validate the MVP works** (agents respond to pitch deck questions), then we can:

### Phase 2: Add Structure (Week 2)
- Store conversation data (add to collected_data dict)
- Generate actual slide content (structured JSON)
- Return formatted response

### Phase 3: Database Integration (Week 3)
- Save to `pitch_conversations` table
- Create `presentations` entry
- Link conversation to presentation

### Phase 4: Export (Week 4)
- Add export agent
- Generate PPTX files
- Integrate with Supabase Storage

### Phase 5: Frontend (Week 5-6)
- Update `/pitch-deck-wizard` route
- Add CopilotKit UI
- Real-time preview

---

## Success Criteria for MVP

**MVP is successful if**:
- ✅ Server starts without errors
- ✅ CopilotKit endpoint responds
- ✅ User can ask about creating a pitch deck
- ✅ AI responds with relevant questions about startup
- ✅ Conversation maintains context
- ✅ No crashes or errors in logs

**MVP is NOT**:
- ❌ Generating actual slide files
- ❌ Saving to database
- ❌ Exporting to PPTX
- ❌ Connected to frontend
- ❌ Using templates

---

## Risk Assessment

**Low Risk Changes** (Safe):
- ✅ Renaming files (can revert easily)
- ✅ Changing prompts (text only)
- ✅ Updating agent names (cosmetic)

**Medium Risk Changes** (Not doing in MVP):
- ⚠️ Adding new dependencies
- ⚠️ Changing database schema
- ⚠️ Modifying error handlers

**High Risk Changes** (Absolutely not doing in MVP):
- ❌ Rewriting supervisor logic
- ❌ Changing FastAPI structure
- ❌ Modifying Blaxel configuration
- ❌ Touching middleware/error handling

---

## Rollback Plan

**If MVP doesn't work**:
```bash
# 1. Revert file renames
cd src/
mv content.py flight.py
mv slides.py hotel.py

# 2. Git reset (if using git)
git checkout agent.py main.py

# 3. Restart server
bl serve --hotreload

# Back to working travel copilot in <5 minutes
```

---

## Next Steps After MVP Validation

**Once MVP works**, we'll create a **structured data format**:

```python
# Example: What the agent should eventually return
{
  "presentation_id": "uuid",
  "title": "Acme Corp Pitch Deck",
  "slides": [
    {
      "slide_number": 1,
      "type": "cover",
      "title": "Acme Corp",
      "content": ["AI-Powered Inventory Forecasting", "Seeking $150K Seed"],
    },
    {
      "slide_number": 2,
      "type": "problem",
      "title": "Retailers Waste 30% of Inventory",
      "content": [
        "Poor demand forecasting leads to overstock",
        "Small retailers lack data science teams",
        "Manual processes are error-prone"
      ],
    },
    # ... 8 more slides
  ]
}
```

But first, **let's just get the conversation working**.

---

**Status**: Ready for MVP implementation
**Estimated Time**: 1-2 hours
**Risk**: LOW
**Rollback**: EASY
