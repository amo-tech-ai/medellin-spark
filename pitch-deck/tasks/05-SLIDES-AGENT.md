# 📦 TASK 5: CREATE SLIDES AGENT

**Priority**: 🟡 HIGH
**Estimated Time**: 30-40 minutes
**Dependencies**: Task 01, Task 04
**Status**: 🔴 NOT STARTED

---

## 🎯 OBJECTIVE

Create `slides_agent.py` to structure startup information into a 10-slide pitch deck.

---

## 🔧 STEP-BY-STEP INSTRUCTIONS

### Step 1: Create Slides Agent File

```bash
cd /home/sk/mde/template-copilot-kit-py/src
```

Create `slides_agent.py`:

```python
from blaxel.langgraph import bl_model, bl_tools
from langgraph.prebuilt import create_react_agent
from langgraph.checkpoint.memory import MemorySaver

async def agent():
    """Slide structuring agent for pitch deck wizard"""

    tools = await bl_tools(["explorer-mcp"])
    model = await bl_model("sandbox-openai")

    prompt = """You are an expert pitch deck designer.

Your job is to take startup information and structure it into a compelling 10-slide deck.

Standard Pitch Deck Structure:
1. Title Slide - Company name, tagline, logo
2. Problem - The pain point your customers face
3. Solution - Your product/service
4. Market Opportunity - TAM, SAM, SOM
5. Product - How it works, key features
6. Traction - Metrics, customers, growth
7. Business Model - How you make money
8. Competition - Competitive landscape
9. Team - Key members and expertise
10. Ask - Funding amount and use of funds

For each slide, create:
{
  "title": "Slide title",
  "layout": "bullet-list",
  "content": {
    "headline": "3-5 word headline",
    "bullets": ["Point 1", "Point 2", "Point 3"],
    "notes": "Speaker notes"
  }
}

Keep slides focused and visual. Use bullet points sparingly (3-5 max).
Make headlines punchy and memorable.
"""

    return create_react_agent(
        name="slides-agent",
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

python3 -c "from src.slides_agent import agent; print('✅ Slides agent imported successfully')"
```

**Expected**: `✅ Slides agent imported successfully`

---

### Step 3: Test Agent Creation

```bash
python3 << 'EOF'
import asyncio
from src.slides_agent import agent

async def test():
    slides_agent = await agent()
    print(f"✅ Agent created: {slides_agent.name}")
    return True

asyncio.run(test())
EOF
```

**Expected**: `✅ Agent created: slides-agent`

---

## ✅ SUCCESS CRITERIA

- [ ] File `src/slides_agent.py` created
- [ ] Agent imports without errors
- [ ] Agent creates successfully
- [ ] Prompt defines 10-slide structure
- [ ] Uses OpenAI model and tools

---

## 🚨 TROUBLESHOOTING

### Import Error
```bash
cd /home/sk/mde/template-copilot-kit-py
source .venv/bin/activate
```

### Agent Creation Fails
```bash
# Verify Blaxel setup
bl version
bl model list
```

---

## 📝 PROOF OF COMPLETION

```bash
cd /home/sk/mde/template-copilot-kit-py
source .venv/bin/activate
python3 -c "from src.slides_agent import agent; print('✅ TASK 5 COMPLETE')"
```

**Expected**: `✅ TASK 5 COMPLETE`

---

**Next Task**: TASK-06-SUPERVISOR-API.md
