# 🚨 CRITICAL ACTION PLAN - MDE Project

**Overall Score: 72/100** ⚠️  
**Status: NOT PRODUCTION READY**  
**Priority: IMMEDIATE ACTION REQUIRED**

---

## 🔴 STOP - READ THIS FIRST

### The #1 Problem: ARCHITECTURE MISMATCH

Your backend is configured for **flight/hotel booking**, but your frontend is a **pitch deck generator**.

```
Frontend (React)          Backend (Python)
     ↓                         ↓
Pitch Deck Wizard      Flight/Hotel Agents
     ↓                         ↓
"Generate deck"   →     ❌ NO HANDLER
```

**This will NEVER work without fixing the backend agents.**


---

### 2️⃣ FIX BACKEND AGENTS (2-3 hours) 🔴

**Current situation**:
```python
# src/agent.py - WRONG
supervisor_graph = create_supervisor(
    [flight, hotel],  # ❌ These don't exist for pitch decks
    ...
)
```

**What you need**:
```python
# src/agent.py - CORRECT
supervisor_graph = create_supervisor(
    [content_agent, slides_agent],  # ✅ For pitch decks
    ...
)
```

**Action**:
```bash
cd /home/sk/mde/template-copilot-kit-py/src

# Create content agent
cat > content.py << 'EOF'
from blaxel.langgraph import bl_model, bl_tools
from langgraph.checkpoint.memory import MemorySaver
from langgraph.prebuilt import create_react_agent

async def agent():
    tools = await bl_tools(["explorer-mcp"])
    model = await bl_model("sandbox-openai")
    
    prompt = """You are a pitch deck content expert.
    
Your role:
1. Ask focused questions about the startup
2. Gather: company name, industry, problem, solution, market, model
3. Track completeness (0-100%)
4. Signal when ready to generate

Be conversational and efficient."""
    
    return create_react_agent(
        name="content-agent",
        model=model,
        tools=tools,
        prompt=prompt,
        checkpointer=MemorySaver(),
    )
EOF

# Create slides agent  
cat > slides.py << 'EOF'
from blaxel.langgraph import bl_model, bl_tools
from langgraph.checkpoint.memory import MemorySaver
from langgraph.prebuilt import create_react_agent

async def agent():
    tools = await bl_tools(["explorer-mcp"])
    model = await bl_model("sandbox-openai")
    
    prompt = """You are a pitch deck structure expert.

Your role:
1. Take collected startup data
2. Structure into 10 professional slides
3. Generate compelling content for each slide
4. Return formatted slide data

Slide order: Cover, Problem, Solution, Market, Product, 
Business Model, Traction, Team, Financials, Ask."""
    
    return create_react_agent(
        name="slides-agent",
        model=model,
        tools=tools,
        prompt=prompt,
        checkpointer=MemorySaver(),
    )
EOF

# Update supervisor
cat > agent.py << 'EOF'
from logging import getLogger
from blaxel.langgraph import bl_model
from langgraph.checkpoint.memory import MemorySaver
from langgraph_supervisor import create_supervisor
from .content import agent as content_agent
from .slides import agent as slides_agent

logger = getLogger(__name__)

async def agent():
    model = await bl_model("sandbox-openai")
    
    content = await content_agent()
    slides = await slides_agent()
    
    supervisor_graph = create_supervisor(
        [content, slides],
        model=model,
        supervisor_name="pitch-deck-supervisor",
        prompt="""You are a pitch deck generation supervisor.
        
        Agents available:
        - content-agent: Gathers startup information
        - slides-agent: Structures presentation
        
        Process:
        1. Use content-agent to collect startup data
        2. When data is complete, use slides-agent to generate deck
        3. Return structured presentation data
        """,
    )
    
    return supervisor_graph.compile(
        name="pitch-deck-supervisor", 
        checkpointer=MemorySaver()
    )
EOF

# Update main.py to use new supervisor
sed -i 's/from \.flight import agent as flight_agent/from \.content import agent as content_agent/' main.py
sed -i 's/from \.hotel import agent as hotel_agent/from \.slides import agent as slides_agent/' main.py
sed -i 's/flight = await flight_agent()/content = await content_agent()/' main.py
sed -i 's/hotel = await hotel_agent()/slides = await slides_agent()/' main.py
sed -i 's/"supervisor", description="Book a trip"/"pitch-deck-supervisor", description="Generate pitch deck"/' main.py
sed -i 's/"hotel-agent"/"content-agent"/' main.py
sed -i 's/"flight-agent"/"slides-agent"/' main.py

# Test import
python -c "from src.agent import agent; print('✅ Agent imports work')"
```

---

### 3️⃣ ENABLE PITCH DECK WIZARD (5 minutes) 🟡

**Action**:
```bash
cd /home/sk/mde/src/pages

# Edit PitchDeckWizard.tsx
# Change line 12 from:
#   const EDGE_FUNCTIONS_DISABLED = true;
# To:
#   const EDGE_FUNCTIONS_DISABLED = false;

sed -i 's/const EDGE_FUNCTIONS_DISABLED = true/const EDGE_FUNCTIONS_DISABLED = false/' PitchDeckWizard.tsx

# Verify
grep "EDGE_FUNCTIONS_DISABLED" PitchDeckWizard.tsx
```

---

## 📋 VERIFICATION CHECKLIST

After completing the immediate actions, verify:

```bash
# ✅ Backend validation
cd /home/sk/mde/template-copilot-kit-py
bash scripts/validate-environment.sh
bash scripts/validate-dependencies.sh
python -c "from src.agent import agent; print('✅ Agents OK')"

# ✅ Frontend validation  
cd /home/sk/mde
npm run lint
npx tsc --noEmit
npm run build

# ✅ Integration test
# Terminal 1
cd /home/sk/mde/template-copilot-kit-py
bl serve --hotreload

# Terminal 2
cd /home/sk/mde
npm run dev

# Open browser: http://localhost:8080/pitch-deck-wizard
# Test: Send a message to the AI
```

---

## 🎯 SUCCESS CRITERIA

### ✅ Day 1 Complete When:

- [ ] All API keys rotated
- [ ] New .env created with new keys
- [ ] .env added to .gitignore
- [ ] Old .env removed from Git
- [ ] content.py created
- [ ] slides.py created  
- [ ] agent.py updated
- [ ] main.py updated
- [ ] EDGE_FUNCTIONS_DISABLED = false
- [ ] Backend starts without errors
- [ ] Frontend builds successfully
- [ ] Can send message in wizard

### ✅ Week 1 Complete When:

- [ ] All Day 1 items done
- [ ] End-to-end test passes (user → AI → response)
- [ ] TypeScript strict mode enabled
- [ ] Lint errors fixed
- [ ] Documentation updated

---

## 🚀 QUICK START (After Actions Complete)

```bash
# Terminal 1: Backend
cd /home/sk/mde/template-copilot-kit-py
source .venv/bin/activate  # or: . .venv/bin/activate
bl serve --hotreload

# Terminal 2: Frontend
cd /home/sk/mde
npm run dev

# Browser
open http://localhost:8080/pitch-deck-wizard
```

---

## 📞 TROUBLESHOOTING

### Backend won't start

```bash
# Check Python version
python3 --version  # Need 3.10+

# Check Blaxel
bl version

# Check imports
cd /home/sk/mde/template-copilot-kit-py
python -c "from src.agent import agent"
```

### Frontend errors

```bash
# Clear cache
rm -rf node_modules/.vite
npm install

# Check TypeScript
npx tsc --noEmit
```

### Agent errors

```bash
# Verify .env has correct keys
cd /home/sk/mde/template-copilot-kit-py
grep "OPENAI_API_KEY" .env  # Should NOT start with sk-proj (old key)

# Test OpenAI connection
python -c "import openai; openai.api_key='YOUR_NEW_KEY'; print(openai.Model.list())"
```

---

## 📊 CURRENT STATE SUMMARY

| Component | Status | Action Needed |
|-----------|--------|---------------|
| Environment | ✅ 95% | None |
| Dependencies | ✅ 90% | None |
| **Backend Agents** | ❌ 0% | **CREATE NEW** |
| **Security** | 🔴 40% | **ROTATE KEYS** |
| Frontend Code | ⚠️ 85% | Enable wizard |
| Database | ✅ 85% | None |
| Documentation | ⚠️ 60% | Update ports |

---

## 🎓 WHY THIS MATTERS

### Business Impact

Without these fixes:
- ❌ Pitch deck wizard doesn't work
- ❌ Users get "under construction" message  
- ❌ No revenue generation possible
- ❌ Security vulnerability (exposed keys)

With these fixes:
- ✅ Core feature functional
- ✅ Users can create pitch decks
- ✅ Revenue generation starts
- ✅ Security hardened

---

## 📈 PROGRESS TRACKING

### Time Estimate

- **Immediate Actions**: 3-4 hours
- **Week 1 Goals**: 12-16 hours
- **Production Ready**: 2-3 weeks

### Milestones

1. **Day 1**: Security + Basic agents ← **START HERE**
2. **Day 3**: Full agent integration working
3. **Week 1**: Quality improvements done
4. **Week 2**: Testing complete
5. **Week 3**: Production deployment

---

**Last Updated**: October 25, 2025  
**Status**: CRITICAL ACTIONS PENDING  
**Next Review**: After Day 1 actions complete

---

## 🆘 NEED HELP?

If stuck on any step:
1. Check `/home/sk/mde/FORENSIC-AUDIT-REPORT.md` for details
2. Run validation scripts: `bash scripts/validate-*.sh`
3. Check logs: Backend errors in terminal, Frontend in browser console
4. Review CLAUDE.md for architecture overview

**Remember**: The #1 priority is **creating the correct agents**. Everything else is secondary.

✅ **You got this!** Start with rotating API keys, then create the agents. One step at a time.

