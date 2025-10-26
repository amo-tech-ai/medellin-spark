# CopilotKit + LangGraph Quick Start Guide

## 0-to-Working in 30 Minutes

### Prerequisites

```bash
# Verify versions
node --version  # Should be 20+
pnpm --version  # Should be 8+
```

---

## Phase 1: Create Runtime Service (10 minutes)

### Step 1: Create Folder Structure
```bash
cd /home/sk/template-copilot-kit-py/copilotkit-langraph
mkdir -p runtime/src
cd runtime
```

### Step 2: Initialize Package
```bash
pnpm init
```

Edit `runtime/package.json`:
```json
{
  "name": "copilot-runtime-service",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "tsx src/server.ts"
  },
  "dependencies": {
    "@copilotkit/runtime": "^1.10.6",
    "@langchain/langgraph-sdk": "^0.0.23"
  },
  "devDependencies": {
    "@types/node": "^20",
    "tsx": "^4",
    "typescript": "^5"
  }
}
```

### Step 3: Install Dependencies
```bash
pnpm install
```

### Step 4: Create TypeScript Config
Create `runtime/tsconfig.json`:
```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "lib": ["ES2022"],
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "types": ["node"]
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

### Step 5: Create Server File
Create `runtime/src/server.ts`:
```typescript
import { createServer } from "node:http";
import { CopilotRuntime, LangGraphAgent } from "@copilotkit/runtime";
import { LangGraphPlatformClient } from "@langchain/langgraph-sdk";

const RUNTIME_PORT = 4000;
const LANGGRAPH_URL = "http://localhost:8000";
const AGENT_NAME = "pitchDeckAgent";

console.log("🚀 Starting CopilotKit Runtime Service...");

const langGraphClient = new LangGraphPlatformClient({
  apiUrl: LANGGRAPH_URL,
});

const runtime = new CopilotRuntime({
  agents: [
    new LangGraphAgent({
      name: AGENT_NAME,
      description: "Pitch deck creation assistant",
      client: langGraphClient,
      graphId: AGENT_NAME,
    }),
  ],
});

const server = createServer(async (req, res) => {
  console.log(`📥 ${req.method} ${req.url}`);

  // CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    res.writeHead(200);
    res.end();
    return;
  }

  if (req.url === "/health") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ status: "ok", agent: AGENT_NAME }));
    return;
  }

  if (req.url === "/copilotkit" || req.url?.startsWith("/copilotkit/")) {
    try {
      await runtime.handleRequest(req, res);
    } catch (error) {
      console.error("❌ Runtime error:", error);
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Internal server error" }));
    }
    return;
  }

  res.writeHead(404, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ error: "Not found" }));
});

server.listen(RUNTIME_PORT, () => {
  console.log(`✅ Runtime service running on http://localhost:${RUNTIME_PORT}`);
  console.log(`📍 CopilotKit endpoint: http://localhost:${RUNTIME_PORT}/copilotkit`);
  console.log(`🏥 Health check: http://localhost:${RUNTIME_PORT}/health`);
});
```

### Step 6: Test Runtime
```bash
# Start runtime
pnpm run dev

# In another terminal, test health check
curl http://localhost:4000/health
# Expected: {"status":"ok","agent":"pitchDeckAgent"}
```

---

## Phase 2: Fix Configuration (5 minutes)

### Step 1: Update Frontend Runtime URL
Edit `src/main.tsx` line 10:
```typescript
// BEFORE:
<CopilotKit runtimeUrl="http://localhost:8000" agent="pitchDeckAgent">

// AFTER:
<CopilotKit runtimeUrl="http://localhost:4000/copilotkit" agent="pitchDeckAgent">
```

### Step 2: Fix Agent Name
Edit `src/App.tsx` line 45:
```typescript
// BEFORE:
const {state, setState} = useCoAgent<AgentState>({
  name: "starterAgent",

// AFTER:
const {state, setState} = useCoAgent<AgentState>({
  name: "pitchDeckAgent",
```

### Step 3: Update State Type
Edit `src/App.tsx` lines 38-40:
```typescript
// BEFORE:
type AgentState = {
  proverbs: string[];
}

// AFTER:
type AgentState = {
  completeness: number;
  collectedData: Record<string, any>;
  slides: any[];
  readyToGenerate: boolean;
}
```

### Step 4: Update Initial State
Edit `src/App.tsx` line 47:
```typescript
// BEFORE:
initialState: {
  proverbs: ["CopilotKit may be new..."],
}

// AFTER:
initialState: {
  completeness: 0,
  collectedData: {},
  slides: [],
  readyToGenerate: false,
}
```

### Step 5: Update Root Package.json
Edit `package.json` scripts:
```json
{
  "scripts": {
    "dev": "concurrently \"npm run dev:ui\" \"npm run dev:runtime\" \"npm run dev:agent\" --names ui,runtime,agent --prefix-colors blue,green,yellow --kill-others",
    "dev:ui": "vite",
    "dev:runtime": "cd runtime && pnpm run dev",
    "dev:agent": "cd agent && npx @langchain/langgraph-cli dev --port 8000 --no-browser"
  }
}
```

---

## Phase 3: Start Everything (5 minutes)

### Step 1: Type Check
```bash
cd /home/sk/template-copilot-kit-py/copilotkit-langraph
pnpm tsc --noEmit
```
Expected: 0 errors

### Step 2: Start All Services
```bash
pnpm run dev
```

Expected output:
```
[ui]      VITE ready in 234 ms
[ui]      ➜  Local:   http://localhost:5173/
[runtime] ✅ Runtime service running on http://localhost:4000
[agent]   LangGraph server started on http://localhost:8000
```

### Step 3: Verify Services
Open 3 terminals and run:
```bash
# Terminal 1: Runtime health
curl http://localhost:4000/health
# Expected: {"status":"ok","agent":"pitchDeckAgent"}

# Terminal 2: Agent health
curl http://localhost:8000/health
# Expected: 200 OK

# Terminal 3: Frontend
curl -I http://localhost:5173
# Expected: HTTP/1.1 200 OK
```

---

## Phase 4: Test in Browser (10 minutes)

### Step 1: Open Browser
Navigate to: `http://localhost:5173`

### Step 2: Check Console
Open Developer Tools (F12)
- No CORS errors ✅
- No connection errors ✅
- CopilotKit initialized ✅

### Step 3: Send Test Message
In chat sidebar:
1. Type: "I want to create a pitch deck for TestCorp"
2. Click Send
3. Wait for response

**Expected**:
- Message appears in chat ✅
- Loading indicator shows ✅
- AI responds ✅
- Progress bar appears ✅
- No errors in console ✅

### Step 4: Continue Conversation
Send 2-3 more messages:
- "We're an AI software company"
- "We solve slow code reviews"
- "SaaS at $20/month"

**Expected**:
- Each response appears ✅
- Progress bar increases ✅
- No lag or errors ✅

---

## Success Checklist

At this point, you should have:

### Services
- [ ] Runtime running on port 4000
- [ ] Agent running on port 8000
- [ ] Frontend running on port 5173
- [ ] All services start with `pnpm run dev`

### Health Checks
- [ ] `curl http://localhost:4000/health` returns OK
- [ ] `curl http://localhost:8000/health` returns 200
- [ ] `curl http://localhost:5173` returns HTML

### Configuration
- [ ] Frontend points to `:4000/copilotkit`
- [ ] Agent name is "pitchDeckAgent" everywhere
- [ ] State type matches agent
- [ ] TypeScript compiles (0 errors)

### Functionality
- [ ] Chat interface loads in browser
- [ ] Can send messages
- [ ] AI responds
- [ ] No CORS errors
- [ ] Progress bar visible

---

## Next Steps

Now that basic setup works, proceed to Phase 3:

**Add Pitch Deck Features**:
- Progress calculation logic
- Data collection frontend actions
- Generate deck button logic

See: `03-IMPLEMENT-FEATURES.md` in the plan folder

---

## If Something's Wrong

**Services won't start**:
- Check Node version: `node --version` (need 20+)
- Check ports available: `lsof -i :4000 :5173 :8000`
- Kill existing processes: `lsof -ti :4000 | xargs kill -9`

**TypeScript errors**:
- Run: `pnpm tsc --noEmit` to see all errors
- Check state type matches in `App.tsx`
- Verify imports are correct

**Connection errors**:
- Verify runtime URL is `:4000/copilotkit`
- Check CORS headers in `runtime/src/server.ts`
- Verify agent name matches everywhere

**Still stuck**:
- See `TROUBLESHOOTING.md` for detailed solutions
- Invoke `copilotkit-architect` subagent
- Check plan files in `copilotkit-docsm/plan/`
