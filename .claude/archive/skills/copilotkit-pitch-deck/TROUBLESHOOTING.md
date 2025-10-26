# CopilotKit + LangGraph Troubleshooting Guide

## Service Startup Issues

### Runtime Won't Start

**Error**: "Cannot find module '@copilotkit/runtime'"
```bash
cd runtime
pnpm install
```

**Error**: "Port 4000 already in use"
```bash
# Find and kill process
lsof -ti:4000 | xargs kill -9
```

**Error**: TypeScript compilation errors
```bash
# Check tsconfig.json exists
cat runtime/tsconfig.json

# Reinstall TypeScript
cd runtime
pnpm add -D typescript
```

### Agent Won't Start

**Error**: "Connection refused to LangGraph"
```bash
# Check agent is running
curl http://localhost:8000/health

# Start agent manually
cd agent
npx @langchain/langgraph-cli dev --port 8000
```

**Error**: "Module not found" in agent
```bash
cd agent
pnpm install
```

---

## Connection Issues

### Frontend Can't Connect to Runtime

**Symptom**: CORS errors in browser console

**Check**:
```typescript
// runtime/src/server.ts should have:
res.setHeader("Access-Control-Allow-Origin", "*");
res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
```

**Symptom**: 404 errors on /copilotkit

**Check**:
```typescript
// src/main.tsx should have:
<CopilotKit runtimeUrl="http://localhost:4000/copilotkit">
//                                            ^^^^^^^^^^^^^ Correct path
```

### Runtime Can't Connect to Agent

**Symptom**: "Agent not found: pitchDeckAgent"

**Check**:
```bash
# 1. Verify agent is running
curl http://localhost:8000/health

# 2. Check agent name in langgraph.json
cat agent/langgraph.json | grep pitchDeckAgent

# 3. Check runtime points to correct URL
# runtime/src/server.ts should have:
const LANGGRAPH_URL = "http://localhost:8000";
```

---

## State Synchronization Issues

### Progress Bar Not Updating

**Symptom**: Progress stays at 0%

**Debug Steps**:
1. **Check agent name matches**:
```typescript
// src/main.tsx
agent="pitchDeckAgent"

// src/App.tsx
useCoAgent({ name: "pitchDeckAgent" })

// agent/langgraph.json
"pitchDeckAgent": "./src/agent.ts:graph"
```

2. **Verify agent returns completeness**:
```typescript
// agent/src/agent.ts - chat_node should return:
return {
  messages: response,
  completeness: updatedCompleteness,  // ✅ Must return this
  readyToGenerate,
};
```

3. **Check browser console**:
```javascript
// Should see state updates
console.log('State updated:', state);
```

### Collected Data Not Appearing

**Symptom**: Data collection doesn't show in UI

**Check**:
1. **Frontend action registered**:
```typescript
// src/App.tsx should have:
useCopilotAction({
  name: "updateCollectedData",
  handler: ({ field, value }) => {
    console.log(`📝 Updating ${field}: ${value}`); // ✅ Add this
    setState({...});
  },
});
```

2. **Agent calls the action**:
```typescript
// agent/src/agent.ts system message should mention:
"When user provides information, call updateCollectedData action"
```

3. **Check console for action calls**:
```
Expected: 📝 Updating company_name: TestCorp
```

---

## Message Flow Issues

### No AI Response

**Symptom**: Message sent but no response appears

**Debug**:
```bash
# 1. Check runtime logs
cd runtime
pnpm run dev
# Look for incoming requests

# 2. Check agent logs
cd agent
npx @langchain/langgraph-cli dev
# Look for request processing

# 3. Check browser Network tab
# POST to http://localhost:4000/copilotkit
# Should return 200 OK with streaming response
```

**Common Causes**:
- Agent not processing requests → Check agent logs
- Runtime not forwarding → Check runtime logs
- Frontend not sending → Check browser console

### Messages Timeout

**Symptom**: Request hangs then times out

**Check**:
1. **OpenAI API key set**:
```bash
# agent/.env should have:
OPENAI_API_KEY=sk-...
```

2. **Network connectivity**:
```bash
# Test OpenAI from agent
curl https://api.openai.com/v1/models \
  -H "Authorization: Bearer $OPENAI_API_KEY"
```

3. **Increase timeout** (if needed):
```typescript
// src/main.tsx
<CopilotKit
  runtimeUrl="http://localhost:4000/copilotkit"
  timeout={30000}  // ✅ 30 seconds
>
```

---

## TypeScript Errors

### Type Mismatch in State

**Error**: "Property 'completeness' does not exist on type 'AgentState'"

**Fix**:
```typescript
// src/App.tsx - Ensure type matches:
type AgentState = {
  completeness: number;
  collectedData: Record<string, any>;
  slides: any[];
  readyToGenerate: boolean;
}
```

### Import Errors

**Error**: "Cannot find module '@copilotkit/runtime'"

**Fix**:
```bash
# Check package is installed
cd runtime
pnpm list | grep copilotkit

# If missing, install
pnpm add @copilotkit/runtime
```

---

## Performance Issues

### Slow Response Time

**Symptom**: AI takes 10+ seconds to respond

**Solutions**:
1. **Use streaming** (already implemented):
```typescript
// Runtime should stream chunks immediately
await runtime.handleRequest(req, res);
// ✅ Streams by default
```

2. **Check OpenAI model**:
```typescript
// agent/src/agent.ts - Use faster model
const model = new ChatOpenAI({
  modelName: "gpt-4o-mini",  // ✅ Faster than gpt-4
});
```

3. **Reduce context window**:
```typescript
// Keep messages array smaller
const messages = state.messages.slice(-10); // Last 10 messages only
```

### High Memory Usage

**Symptom**: Services consuming lots of RAM

**Solutions**:
1. **Clear conversation history periodically**
2. **Limit stored messages**
3. **Use React.memo for chat components**

---

## Build Issues

### Build Fails

**Error**: TypeScript compilation errors

**Fix**:
```bash
# Check all TypeScript compiles
pnpm tsc --noEmit

# Check specific package
cd runtime
pnpm tsc --noEmit
```

**Error**: Missing dependencies

**Fix**:
```bash
# Clean install
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

---

## Environment Issues

### Different Behavior on Different Machines

**Symptom**: Works on one machine, not another

**Check**:
1. **Node version**:
```bash
node --version
# Should be 20+
```

2. **pnpm version**:
```bash
pnpm --version
# Should be 8+
```

3. **Ports available**:
```bash
# Check no conflicts
lsof -i :5173
lsof -i :4000
lsof -i :8000
```

---

## Quick Diagnostic Script

```bash
#!/bin/bash
echo "=== CopilotKit Diagnostic ==="

echo -n "Frontend (5173): "
curl -s http://localhost:5173 > /dev/null && echo "✅" || echo "❌"

echo -n "Runtime (4000): "
curl -s http://localhost:4000/health > /dev/null && echo "✅" || echo "❌"

echo -n "Agent (8000): "
curl -s http://localhost:8000/health > /dev/null && echo "✅" || echo "❌"

echo -n "TypeScript: "
pnpm tsc --noEmit > /dev/null 2>&1 && echo "✅" || echo "❌"

echo -n "Node version: "
node --version

echo -n "pnpm version: "
pnpm --version
```

Save as `copilotkit-langraph/debug.sh` and run:
```bash
chmod +x debug.sh
./debug.sh
```

---

## Getting Help

If none of these solutions work:

1. **Check Implementation Plan**: `/home/sk/template-copilot-kit-py/copilotkit-langraph/copilotkit-docsm/plan/`
2. **Review Skill Guide**: `.claude/skills/copilotkit-pitch-deck/SKILL.md`
3. **Invoke Subagent**: Use `copilotkit-architect` subagent for complex issues
4. **Check Official Docs**: https://docs.copilotkit.ai/langgraph
