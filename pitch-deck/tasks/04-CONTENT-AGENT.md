# 📦 TASK 4: CREATE CONTENT AGENT

**Priority**: 🟡 HIGH
**Estimated Time**: 30-40 minutes
**Dependencies**: Task 01
**Status**: 🔴 NOT STARTED

---

## 🎯 OBJECTIVE

Create `content_agent.py` to extract startup information from user conversations and update the database.

---

## 🔧 STEP-BY-STEP INSTRUCTIONS

### Step 1: Create Content Agent File

```bash
cd /home/sk/mde/template-copilot-kit-py/src
```

Create `content_agent.py`:

```python
from blaxel.langgraph import bl_model, bl_tools
from langgraph.prebuilt import create_react_agent
from langgraph.checkpoint.memory import MemorySaver

async def agent():
    """Content gathering agent for pitch deck wizard"""

    tools = await bl_tools(["explorer-mcp"])
    model = await bl_model("sandbox-openai")

    prompt = """You are an expert startup advisor conducting discovery conversations.

Your goal is to gather comprehensive information about the startup:

1. Company name and industry
2. Problem they're solving
3. Their solution
4. Target market and customers
5. Business model and revenue
6. Unique value proposition
7. Competition and advantages
8. Team background
9. Traction and metrics
10. Funding ask and use of funds

Ask thoughtful questions one at a time. Extract information naturally.
Be conversational and encouraging. Track completeness as you gather data.

Return structured data in this format:
{
  "company_name": "...",
  "industry": "...",
  "problem": "...",
  "solution": "...",
  "target_market": "...",
  "business_model": "...",
  "unique_value_proposition": "...",
  "competitive_advantage": "...",
  "team": "...",
  "traction": "...",
  "financials": "...",
  "ask": "..."
}
"""

    return create_react_agent(
        name="content-agent",
        model=model,
        tools=tools,
        prompt=prompt,
        checkpointer=MemorySaver(),
    )
```

---

### Step 2: Verify Import

```bash
cd /home/sk/mde/template-copilot-kit-py
source .venv/bin/activate

python3 -c "from src.content_agent import agent; print('✅ Content agent imported successfully')"
```

**Expected**: `✅ Content agent imported successfully`

---

### Step 3: Test Agent Creation

```bash
python3 << 'EOF'
import asyncio
from src.content_agent import agent

async def test():
    content_agent = await agent()
    print(f"✅ Agent created: {content_agent.name}")
    return True

asyncio.run(test())
EOF
```

**Expected**: `✅ Agent created: content-agent`

---

## ✅ SUCCESS CRITERIA

- [ ] File `src/content_agent.py` created
- [ ] Agent imports without errors
- [ ] Agent creates successfully
- [ ] Prompt focused on pitch deck content
- [ ] Uses OpenAI model and tools

---

## 🚨 TROUBLESHOOTING

### Import Error
```bash
# Make sure you're in the right directory
cd /home/sk/mde/template-copilot-kit-py
source .venv/bin/activate
```

### Model Not Found
```bash
# Check Blaxel configuration
bl model list
```

---

## 📝 PROOF OF COMPLETION

```bash
cd /home/sk/mde/template-copilot-kit-py
source .venv/bin/activate
python3 -c "from src.content_agent import agent; print('✅ TASK 4 COMPLETE')"
```

**Expected**: `✅ TASK 4 COMPLETE`

---

**Next Task**: TASK-05-SLIDES-AGENT.md
