---
version: 1.1
created: 2025-10-21
lastUpdated: 2025-10-21
owner: Development Team, Security Team
status: Production Ready
---

# CopilotKit LangGraph - Implementation Guardrails

**Date**: October 21, 2025  
**Purpose**: Security, reliability, and best practices for production deployment  
**Audience**: Developers, DevOps, Security Team

---

## Overview

**Guardrails ensure**:
- ✅ User data security and isolation
- ✅ Reliable conversation recovery
- ✅ Cost control and optimization
- ✅ Performance at scale
- ✅ Quality AI outputs

---

## Node Failure Recovery Matrix

**Critical Reference**: Use this table to handle all agent/node failures

| Node Type | Failure Scenario | Fallback Action | User Impact | Recovery Time | Max Retries | Logging |
|-----------|------------------|-----------------|-------------|---------------|-------------|---------|
| **collect_info_node** | GPT-4 API timeout | Retry with GPT-3.5-turbo | "Processing..." delay | 5s | 3 | Error + request_id |
| **collect_info_node** | Invalid data extraction | Ask clarifying question | "Let me rephrase..." | Instant | Unlimited | Warning |
| **generate_outline_node** | Invalid JSON output | Return to collect_info | "Need more details..." | 2s | 2 | Error + state dump |
| **generate_outline_node** | Rate limit (429) | Queue for 60s, retry | "High demand, please wait..." | 60s | 1 | Warning + user_id |
| **generate_slides_node** | API timeout (mid-generation) | Resume from last completed slide | "Continuing from slide 5..." | 3s | 3 | Error + slide_number |
| **generate_slides_node** | Token limit exceeded | Switch to GPT-3.5, summarize | Slightly lower quality | 5s | 1 | Warning + token_count |
| **checkpoint_save** | Database connection lost | Store in Redis temp, retry | No visible impact | 3s | 5 | Critical + db_error |
| **checkpoint_save** | PostgreSQL full disk | Clear old checkpoints, retry | "Saving..." delay | 10s | 2 | Critical + disk_usage |
| **HITL approval** | User closes browser | Save state, resume on return | Session paused | N/A | N/A | Info + thread_id |
| **export_pdf** | jsPDF fails | Fallback to basic PDF | Reduced formatting | 2s | 1 | Error + deck_id |

**Implementation Rule**: Every node MUST have defined fallback behavior (no undefined error states)

---

## 1. Authentication & Authorization

### Supabase Auth + RLS (Row-Level Security)

**Critical Rule**: Every user sees ONLY their own decks.

**Implementation**:
```sql
-- Enable RLS on all tables
ALTER TABLE pitch_conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE pitch_decks ENABLE ROW LEVEL SECURITY;
ALTER TABLE slides ENABLE ROW LEVEL SECURITY;

-- Policy: Users can only access their own data
CREATE POLICY "Users can only see their own conversations"
  ON pitch_conversations
  FOR ALL
  USING (auth.uid() = profile_id);

CREATE POLICY "Users can only see their own decks"
  ON pitch_decks
  FOR ALL
  USING (auth.uid() = profile_id);

CREATE POLICY "Users can only see their own slides"
  ON slides
  FOR ALL
  USING (
    deck_id IN (
      SELECT id FROM pitch_decks WHERE profile_id = auth.uid()
    )
  );
```

**[Source: Supabase RLS best practices]**

---

### JWT Validation on Agent Backend

**Critical Rule**: Agent must validate JWT before processing requests.

**Implementation (Python)**:
```python
from supabase import create_client
from fastapi import HTTPException, Header

async def validate_user(authorization: str = Header(None)):
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Missing auth token")
    
    token = authorization.replace("Bearer ", "")
    
    try:
        supabase = create_client(SUPABASE_URL, SUPABASE_KEY)
        user = supabase.auth.get_user(token)
        return user
    except Exception:
        raise HTTPException(status_code=401, detail="Invalid token")

# Use in agent endpoint
@app.post("/agent")
async def agent_endpoint(request: dict, user = Depends(validate_user)):
    # user.id is verified profile_id
    state = {**request, "profile_id": user.id}
    response = await agent.invoke(state)
    return response
```

**[Source: Authentication patterns from CopilotKit docs](https://www.copilotkit.ai/blog/build-full-stack-apps-with-langgraph-and-copilotkit)**

---

### Never Expose API Keys in Frontend

**Critical Rule**: OpenAI API key NEVER touches browser.

**❌ WRONG (Dangerous)**:
```typescript
// frontend/src/config.ts
export const OPENAI_API_KEY = "sk-..."; // NEVER DO THIS!
```

**✅ CORRECT (Secure)**:
```python
# backend/agent.py
import os
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")  # Environment variable only

# frontend calls backend, backend calls OpenAI
```

**Environment Setup**:
```bash
# .env (never commit to git)
OPENAI_API_KEY=sk-...
SUPABASE_SERVICE_ROLE_KEY=...  # Server-side only
ANTHROPIC_API_KEY=...  # If using Claude

# .env.local (for frontend, safe to expose)
VITE_SUPABASE_URL=https://...supabase.co
VITE_SUPABASE_ANON_KEY=...  # Public key, safe
VITE_COPILOTKIT_PUBLIC_KEY=...  # Public key, safe
```

**[Source: Security best practices]**

---

## 2. Persistence & Recovery

### Checkpoint Strategy

**Critical Rule**: Save state at every decision point, not every message.

**Good Checkpoints** (Save These):
- ✅ After completing information collection (80%)
- ✅ After outline generation
- ✅ After outline approval
- ✅ After deck generation complete

**Bad Checkpoints** (Don't Save These):
- ❌ After every single message (expensive, slow)
- ❌ During mid-sentence streaming (incomplete state)

**Implementation**:
```python
from langgraph.checkpoint.postgres import PostgresSaver
from langgraph.graph import StateGraph

# Configure checkpointer
checkpointer = PostgresSaver.from_conn_string(
    "postgresql://user:pass@host:port/db"
)

# Compile graph with checkpointer
graph = StateGraph(PitchDeckState)
# ... add nodes ...
compiled_graph = graph.compile(checkpointer=checkpointer)

# Use thread_id for user-specific sessions
thread_id = f"{user_id}_{deck_id}"
response = compiled_graph.invoke(
    {"messages": messages},
    {"configurable": {"thread_id": thread_id}}
)
```

**[Source: LangGraph checkpoint patterns](https://www.copilotkit.ai/blog/build-full-stack-apps-with-langgraph-and-copilotkit)**

---

### Resume Session Logic

**Critical Rule**: Always show "Resume" UI if checkpoint exists.

**Implementation (React)**:
```typescript
const { state } = useCoAgent<PitchDeckState>({
  name: "pitch_deck_agent",
  initialState: { completeness: 0 }
});

// On component mount, check for existing session
useEffect(() => {
  async function checkExistingSession() {
    const { data: existingConversation } = await supabase
      .from('pitch_conversations')
      .select('*')
      .eq('profile_id', user.id)
      .eq('status', 'in_progress')
      .single();
    
    if (existingConversation) {
      const resume = confirm(
        `You have an in-progress deck (${existingConversation.completeness}% complete). Resume?`
      );
      
      if (resume) {
        // Load checkpoint and continue
        loadCheckpoint(existingConversation.thread_id);
      } else {
        // Start fresh, archive old session
        archiveSession(existingConversation.id);
      }
    }
  }
  
  checkExistingSession();
}, [user.id]);
```

---

### Message Persistence

**Critical Rule**: Store message history for audit and replay.

**Schema**:
```sql
CREATE TABLE conversation_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  conversation_id UUID REFERENCES pitch_conversations(id),
  role TEXT CHECK (role IN ('user', 'assistant', 'system')),
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_messages_conversation 
  ON conversation_messages(conversation_id, created_at);
```

**Insert on Every Message**:
```typescript
async function saveMessage(conversationId: string, role: string, content: string) {
  await supabase
    .from('conversation_messages')
    .insert({
      conversation_id: conversationId,
      role,
      content
    });
}
```

---

## 3. Error Handling & Recovery

### Agent Failure Recovery

**Critical Rule**: Never leave user in broken state.

**Implementation (Python)**:
```python
from langgraph.types import Command

async def chat_node(state: PitchDeckState, config: RunnableConfig):
    try:
        # Attempt AI generation
        response = await model.ainvoke(state["messages"])
        return {"messages": [response]}
    
    except Exception as e:
        # Log error
        logger.error(f"Agent failed: {e}")
        
        # Return graceful fallback
        return {
            "messages": [AIMessage(
                content="I'm experiencing technical difficulties. Let's try that again. Could you rephrase your question?"
            )],
            "error_count": state.get("error_count", 0) + 1
        }

# Add error limit check
def should_exit(state: PitchDeckState):
    if state.get("error_count", 0) >= 3:
        # Too many errors, gracefully exit
        return "exit_node"
    return "continue_node"
```

---

### Retry Logic for API Calls

**Critical Rule**: Retry transient failures (network, rate limits) but not permanent errors (auth, quota).

**Implementation**:
```python
import asyncio
from tenacity import retry, stop_after_attempt, wait_exponential, retry_if_exception_type

@retry(
    stop=stop_after_attempt(3),
    wait=wait_exponential(multiplier=1, min=2, max=10),
    retry=retry_if_exception_type((TimeoutError, ConnectionError))
)
async def call_openai(messages):
    response = await openai_client.chat.completions.create(
        model="gpt-4",
        messages=messages
    )
    return response
```

---

### Frontend Error Boundaries

**Critical Rule**: Catch React errors before they crash the app.

**Implementation (React)**:
```typescript
import { ErrorBoundary } from 'react-error-boundary';

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div className="error-container">
      <h2>Something went wrong</h2>
      <p>{error.message}</p>
      <button onClick={resetErrorBoundary}>Try Again</button>
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <CopilotKit>
        <PitchDeckWizard />
      </CopilotKit>
    </ErrorBoundary>
  );
}
```

---

## 4. Cost Control & Optimization

### Token Tracking

**Critical Rule**: Monitor API costs per user to detect abuse.

**Implementation**:
```python
import tiktoken

def count_tokens(messages: list) -> int:
    encoding = tiktoken.encoding_for_model("gpt-4")
    return sum(len(encoding.encode(msg.content)) for msg in messages)

async def chat_node(state: PitchDeckState):
    input_tokens = count_tokens(state["messages"])
    
    # Log usage
    await log_api_usage(
        user_id=state["profile_id"],
        model="gpt-4",
        input_tokens=input_tokens,
        timestamp=datetime.utcnow()
    )
    
    # Check if user exceeded quota
    if await is_over_quota(state["profile_id"]):
        return {"messages": [AIMessage(
            content="You've reached your monthly limit. Upgrade to Pro for unlimited access."
        )]}
    
    response = await model.ainvoke(state["messages"])
    output_tokens = count_tokens([response])
    
    await log_api_usage(
        user_id=state["profile_id"],
        model="gpt-4",
        output_tokens=output_tokens,
        timestamp=datetime.utcnow()
    )
    
    return {"messages": [response]}
```

---

### Model Selection by Tier

**Critical Rule**: Free users get GPT-3.5, Pro users get GPT-4.

**Implementation**:
```python
def get_model_for_user(user_tier: str) -> str:
    if user_tier == "pro":
        return "gpt-4"  # $0.03/1K input, $0.06/1K output
    else:
        return "gpt-3.5-turbo"  # $0.0015/1K input, $0.002/1K output

async def chat_node(state: PitchDeckState, config: RunnableConfig):
    user_tier = await get_user_tier(state["profile_id"])
    model_name = get_model_for_user(user_tier)
    
    model = ChatOpenAI(model=model_name)
    response = await model.ainvoke(state["messages"])
    return {"messages": [response]}
```

**Cost Comparison**:
- Free user (GPT-3.5): ~$0.10 per deck
- Pro user (GPT-4): ~$1.50 per deck

---

### Response Caching

**Critical Rule**: Cache common AI responses to reduce API calls.

**Implementation (Redis)**:
```python
import hashlib
import redis

redis_client = redis.Redis(host='localhost', port=6379, db=0)

async def get_cached_response(messages: list):
    # Create cache key from messages
    cache_key = hashlib.md5(
        json.dumps([m.content for m in messages]).encode()
    ).hexdigest()
    
    cached = redis_client.get(cache_key)
    if cached:
        return json.loads(cached)
    
    return None

async def cache_response(messages: list, response: AIMessage):
    cache_key = hashlib.md5(
        json.dumps([m.content for m in messages]).encode()
    ).hexdigest()
    
    redis_client.setex(
        cache_key,
        3600,  # 1 hour TTL
        json.dumps({"content": response.content})
    )
```

---

## 5. Quality Assurance

### HITL (Human-in-the-Loop) Checkpoints

**Critical Rule**: Always require approval before expensive operations.

**Approval Points**:
1. ✅ Outline generation (before full deck)
2. ✅ Final deck (before marking complete)
3. ✅ Theme customization (before applying to all slides)
4. ✅ Export (before generating PDF/PPTX)

**Implementation**:
```typescript
useCopilotAction({
  name: "generateFullDeck",
  description: "Generate all 10 slides",
  renderAndWaitForResponse: ({ args, respond, status }) => {
    return (
      <ApprovalModal>
        <h3>Ready to Generate Deck?</h3>
        <p>This will create 10 slides and cost ~$1.50 in API credits.</p>
        <button onClick={() => respond({ approved: true })}>
          Yes, Generate Deck
        </button>
        <button onClick={() => respond({ approved: false })}>
          No, Edit Outline First
        </button>
      </ApprovalModal>
    );
  }
});
```

---

### Output Validation

**Critical Rule**: Validate AI outputs before saving to database.

**Implementation**:
```python
from pydantic import BaseModel, Field

class SlideOutput(BaseModel):
    title: str = Field(..., max_length=100)
    content: list[str] = Field(..., max_items=5)  # Max 5 bullet points
    slide_number: int = Field(..., ge=1, le=10)

def validate_deck(slides: list[dict]) -> bool:
    if len(slides) != 10:
        return False  # Must have exactly 10 slides
    
    try:
        for slide_data in slides:
            SlideOutput(**slide_data)  # Validate structure
        return True
    except Exception:
        return False

async def generate_deck_node(state: PitchDeckState):
    slides = await generate_slides(state)
    
    if not validate_deck(slides):
        return {
            "error": "Invalid deck generated. Please try again.",
            "status": "error"
        }
    
    return {"slides": slides, "status": "complete"}
```

---

### Content Moderation

**Critical Rule**: Block inappropriate content before generation.

**Implementation (OpenAI Moderation API)**:
```python
async def moderate_content(text: str) -> bool:
    response = await openai_client.moderations.create(input=text)
    result = response.results[0]
    
    if result.flagged:
        return False  # Block inappropriate content
    return True

async def chat_node(state: PitchDeckState):
    user_message = state["messages"][-1].content
    
    if not await moderate_content(user_message):
        return {"messages": [AIMessage(
            content="I can't process that request. Please rephrase."
        )]}
    
    # Continue with normal processing
    response = await model.ainvoke(state["messages"])
    return {"messages": [response]}
```

---

## 6. Cost Protection & Rate Limiting

### Per-User Quotas

**Critical Rule**: Enforce strict quotas to prevent cost overruns.

**Quota Definitions**:
```python
QUOTAS = {
    "free": {
        "requests_per_hour": 100,
        "tokens_per_day": 5_000,
        "decks_per_month": 1,
        "max_cost_per_day": 1.00  # $1.00/day
    },
    "pro": {
        "requests_per_hour": 1_000,
        "tokens_per_day": 100_000,
        "decks_per_month": -1,  # Unlimited
        "max_cost_per_day": 50.00  # $50.00/day
    }
}
```

**Cost Tracking**:
```python
async def track_cost(user_id: str, tokens: int, model: str):
    cost = calculate_cost(tokens, model)
    
    daily_total = await get_daily_cost(user_id)
    user_tier = await get_user_tier(user_id)
    max_daily = QUOTAS[user_tier]["max_cost_per_day"]
    
    if daily_total + cost > max_daily:
        # Send alert
        await send_admin_alert(f"User {user_id} exceeded daily cost: ${daily_total + cost}")
        
        # Block if over 120% of limit
        if daily_total + cost > max_daily * 1.2:
            raise HTTPException(
                status_code=429,
                detail=f"Daily cost limit exceeded. Max: ${max_daily}"
            )
    
    await log_cost(user_id, cost, tokens, model)
```

**Alert Thresholds**:
- **80% quota**: Warning to user ("You've used 80% of your daily limit")
- **100% quota**: Block new requests, show upgrade prompt
- **Admin alert**: Any user spending >$10/day (potential abuse)

---

## 7. Performance & Scalability

### Rate Limiting

**Critical Rule**: Limit requests per user to prevent abuse and API overload.

**Implementation (Redis)**:
```python
from fastapi import HTTPException

async def check_rate_limit(user_id: str):
    key = f"rate_limit:{user_id}"
    count = redis_client.incr(key)
    
    if count == 1:
        redis_client.expire(key, 3600)  # 1 hour window
    
    if count > 100:  # Max 100 requests/hour
        raise HTTPException(
            status_code=429,
            detail="Rate limit exceeded. Try again in an hour."
        )

@app.post("/agent")
async def agent_endpoint(request: dict, user = Depends(validate_user)):
    await check_rate_limit(user.id)
    # ... process request ...
```

---

### Database Indexing

**Critical Rule**: Index all foreign keys and frequently queried columns.

**Implementation**:
```sql
-- Essential indexes
CREATE INDEX idx_conversations_profile_id 
  ON pitch_conversations(profile_id);

CREATE INDEX idx_conversations_status 
  ON pitch_conversations(profile_id, status);

CREATE INDEX idx_decks_profile_id 
  ON pitch_decks(profile_id);

CREATE INDEX idx_slides_deck_id 
  ON slides(deck_id, slide_number);

-- Composite index for common query
CREATE INDEX idx_conversations_profile_status_created 
  ON pitch_conversations(profile_id, status, created_at DESC);
```

---

### Connection Pooling

**Critical Rule**: Use connection pooling for database queries.

**Implementation (Supabase)**:
```typescript
import { createClient } from '@supabase/supabase-js';

// Configure connection pool
const supabase = createClient(
  process.env.VITE_SUPABASE_URL!,
  process.env.VITE_SUPABASE_ANON_KEY!,
  {
    db: {
      schema: 'public',
    },
    auth: {
      persistSession: true,
    },
    global: {
      headers: {
        'x-connection-pool': 'true'  // Enable pooling
      }
    }
  }
);
```

---

## 8. Monitoring & Observability

### Request ID Tracking

**Critical Rule**: Assign unique ID to every request for debugging.

**Implementation**:
```python
import uuid

async def agent_endpoint(request: dict):
    request_id = str(uuid.uuid4())
    logger.info(f"[{request_id}] Agent request started", extra={
        "user_id": request.get("profile_id"),
        "request_id": request_id
    })
    
    try:
        response = await agent.invoke(request)
        logger.info(f"[{request_id}] Agent request completed")
        return response
    except Exception as e:
        logger.error(f"[{request_id}] Agent request failed: {e}")
        raise
```

---

### Error Categorization

**Critical Rule**: Categorize errors for better debugging.

**Categories**:
1. **User Error** (400): Bad input, missing data
2. **Auth Error** (401/403): Invalid token, insufficient permissions
3. **Rate Limit** (429): Too many requests
4. **Server Error** (500): Agent crash, database failure
5. **External API Error** (502): OpenAI timeout, Supabase down

**Logging**:
```python
class ErrorCategory(Enum):
    USER_ERROR = "user_error"
    AUTH_ERROR = "auth_error"
    RATE_LIMIT = "rate_limit"
    SERVER_ERROR = "server_error"
    EXTERNAL_API_ERROR = "external_api_error"

def categorize_error(error: Exception) -> ErrorCategory:
    if isinstance(error, ValidationError):
        return ErrorCategory.USER_ERROR
    elif isinstance(error, HTTPException) and error.status_code == 429:
        return ErrorCategory.RATE_LIMIT
    # ... etc ...

async def agent_endpoint(request: dict):
    try:
        return await agent.invoke(request)
    except Exception as e:
        category = categorize_error(e)
        logger.error(f"Error: {category.value}", extra={
            "error_message": str(e),
            "user_id": request.get("profile_id")
        })
        raise
```

---

## 9. Compliance & Legal

### Data Retention Policy

**Critical Rule**: Delete user data on request (GDPR/CCPA).

**Implementation**:
```sql
-- Soft delete (preserve for 30 days)
UPDATE pitch_conversations 
SET deleted_at = NOW() 
WHERE profile_id = $1;

-- Hard delete (after 30 days or on explicit request)
DELETE FROM conversation_messages 
WHERE conversation_id IN (
  SELECT id FROM pitch_conversations WHERE profile_id = $1
);

DELETE FROM slides 
WHERE deck_id IN (
  SELECT id FROM pitch_decks WHERE profile_id = $1
);

DELETE FROM pitch_decks WHERE profile_id = $1;
DELETE FROM pitch_conversations WHERE profile_id = $1;
```

---

### Terms of Service Enforcement

**Critical Rule**: Require TOS acceptance before first use.

**Implementation**:
```typescript
const { data: profile } = await supabase
  .from('profiles')
  .select('tos_accepted_at')
  .eq('id', user.id)
  .single();

if (!profile.tos_accepted_at) {
  return <TOSModal onAccept={async () => {
    await supabase
      .from('profiles')
      .update({ tos_accepted_at: new Date().toISOString() })
      .eq('id', user.id);
  }} />;
}
```

---

## 10. Testing Checklist

### Before Deployment

**Security**:
- [ ] RLS policies tested (users can't access others' data)
- [ ] JWT validation working
- [ ] API keys not exposed in frontend
- [ ] Rate limiting active

**Functionality**:
- [ ] Conversation persists across refreshes
- [ ] Resume from checkpoint works
- [ ] HITL approval gates functional
- [ ] Deck generation completes successfully
- [ ] Export produces valid PDFs

**Performance**:
- [ ] API response time < 3s
- [ ] Database queries use indexes
- [ ] No N+1 query problems
- [ ] Connection pooling enabled

**Error Handling**:
- [ ] Agent failures handled gracefully
- [ ] Retry logic works for transient errors
- [ ] Frontend error boundaries catch crashes
- [ ] User sees helpful error messages

**Cost Control**:
- [ ] Token tracking active
- [ ] Tier-based model selection working
- [ ] Response caching functional
- [ ] Monthly quotas enforced

---

## 11. Production Deployment Checklist

### Environment Configuration

```bash
# Production .env
NODE_ENV=production
SUPABASE_URL=https://...supabase.co
SUPABASE_SERVICE_ROLE_KEY=...  # Never expose
OPENAI_API_KEY=sk-...  # Never expose
REDIS_URL=redis://...
DATABASE_URL=postgresql://...
SENTRY_DSN=...  # Error tracking
```

### Monitoring Setup

**Tools**:
- **Sentry**: Error tracking and alerting
- **Supabase Logs**: Database query performance
- **OpenAI Dashboard**: API usage and costs
- **Grafana**: Custom metrics (requests/min, latency, etc.)

### Backup Strategy

```bash
# Daily automated backups
0 2 * * * pg_dump $DATABASE_URL > /backups/db-$(date +\%Y\%m\%d).sql

# Keep last 30 days
find /backups -name "db-*.sql" -mtime +30 -delete
```

---

**Created**: October 21, 2025  
**Status**: ✅ Complete guardrails documentation  
**Next**: See `06-pitch-deck-outline.md` for investor presentation  
**Compliance**: GDPR, CCPA, SOC 2 patterns included

---

## Navigation

**Previous**: [04-stakeholder-packs.md](./04-stakeholder-packs.md) - Stakeholder Benefits  
**Next**: [06-pitch-deck-outline.md](./06-pitch-deck-outline.md) - Investor Pitch  
**Index**: [00-INDEX.md](./00-INDEX.md)

---

*This guardrails document ensures the AI pitch deck generator is secure, reliable, cost-effective, and production-ready with complete failure recovery strategies.*


