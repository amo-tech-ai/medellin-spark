# 📦 TASK 6: SUPERVISOR & API INTEGRATION

**Priority**: 🟡 HIGH
**Estimated Time**: 20-30 minutes
**Dependencies**: Task 01, Task 04, Task 05
**Status**: 🔴 NOT STARTED

---

## 🎯 OBJECTIVE

Update supervisor agent to coordinate content and slides agents, and configure CopilotKit endpoint.

---

## 🔧 STEP-BY-STEP INSTRUCTIONS

### Step 1: Update Agent Supervisor

```bash
cd /home/sk/mde/template-copilot-kit-py/src
```

Edit `agent.py` - replace entire file:

```python
from blaxel.langgraph import bl_model
from langgraph_supervisor import create_supervisor

from .content_agent import agent as content_agent
from .slides_agent import agent as slides_agent

async def agent():
    """Pitch deck supervisor agent"""

    model = await bl_model("sandbox-openai")

    content = await content_agent()
    slides = await slides_agent()

    supervisor_graph = create_supervisor(
        [content, slides],
        model=model,
        supervisor_name="pitch-deck-supervisor",
        prompt="""You are a pitch deck consultant coordinating two specialists:

1. content-agent: Gathers startup information through conversation
2. slides-agent: Structures information into a 10-slide deck

Workflow:
- Start by using content-agent to gather all necessary information
- When you have comprehensive data (60%+ complete), use slides-agent to create the deck
- Guide the user through a natural conversation
- Be encouraging and professional

Your goal is to help founders create compelling pitch decks.
""",
    )

    return supervisor_graph
```

---

### Step 2: Verify Supervisor

```bash
cd /home/sk/mde/template-copilot-kit-py
source .venv/bin/activate

python3 << 'EOF'
import asyncio
from src.agent import agent

async def test():
    supervisor = await agent()
    print("✅ Supervisor created successfully")
    return True

asyncio.run(test())
EOF
```

**Expected**: `✅ Supervisor created successfully`

---

### Step 3: Test Backend Server

```bash
cd /home/sk/mde/template-copilot-kit-py
source .venv/bin/activate

# Start server (will run in foreground)
bl serve --hotreload
```

**Expected**:
```
🚀 Server running on http://localhost:1339
WebSocket endpoint: ws://localhost:1339/copilotkit
```

**Test**: Open http://localhost:1339/health (should return OK)

Press Ctrl+C to stop when verified.

---

## ✅ SUCCESS CRITERIA

- [ ] `src/agent.py` updated
- [ ] Imports content_agent and slides_agent
- [ ] Supervisor coordinates both agents
- [ ] Backend starts without errors
- [ ] Health endpoint responds

---

## 🚨 TROUBLESHOOTING

### Import Error
```bash
# Make sure both agent files exist
ls -la src/content_agent.py
ls -la src/slides_agent.py
```

### Server Won't Start
```bash
# Check port availability
lsof -i :1339

# Verify dependencies
uv pip list | grep -E "blaxel|copilotkit"
```

---

## 📝 PROOF OF COMPLETION

```bash
cd /home/sk/mde/template-copilot-kit-py
source .venv/bin/activate

# Test import
python3 -c "from src.agent import agent; print('✅ TASK 6 COMPLETE')"

# Quick server test (30 seconds)
timeout 30s bl serve --hotreload || echo "✅ Server starts successfully"
```

---

**Next Task**: TASK-07-TESTING-VALIDATION.md
