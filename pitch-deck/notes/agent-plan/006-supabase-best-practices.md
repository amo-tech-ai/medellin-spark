# Supabase Edge Functions - Best Practices

**Source**: `/home/sk/medellin-spark/.cursor/rules/writing-supabase-edge-functions.mdc`
**Applied to**: Claude AI pitch-deck-assistant function

---

## ✅ Best Practices Applied

### 1. Import Syntax
**Rule**: Use `npm:` or `jsr:` prefix, never bare specifiers

**❌ Wrong**:
```typescript
import Anthropic from '@anthropic-ai/sdk';
import { createClient } from '@supabase/supabase-js';
```

**✅ Correct**:
```typescript
import Anthropic from 'npm:@anthropic-ai/sdk@0.32.1';
import { createClient } from 'npm:@supabase/supabase-js@2.47.10';
```

**Why**: Deno requires explicit package source + version pinning

---

### 2. Server Function
**Rule**: Use `Deno.serve()` not old `serve` import

**❌ Wrong**:
```typescript
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

serve(async (req) => {
  // ...
});
```

**✅ Correct**:
```typescript
Deno.serve(async (req: Request) => {
  // ...
});
```

**Why**: Built-in `Deno.serve` is faster and more reliable

---

### 3. Pre-populated Environment Variables
**Rule**: Don't manually set these - they're automatic

**Available by default**:
```typescript
const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!;
const SUPABASE_ANON_KEY = Deno.env.get('SUPABASE_PUBLISHABLE_OR_ANON_KEY')!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const SUPABASE_DB_URL = Deno.env.get('SUPABASE_DB_URL')!;
```

**Custom secrets** (manual):
```bash
supabase secrets set ANTHROPIC_API_KEY=sk-ant-api03-...
supabase secrets set ALLOWED_ORIGIN=https://your-domain.com
```

---

### 4. Minimize External Dependencies
**Rule**: Use Web APIs and Deno core APIs when possible

**❌ Avoid**:
```typescript
import axios from 'npm:axios';  // Prefer fetch
import ws from 'npm:node-ws';   // Prefer WebSocket API
```

**✅ Prefer**:
```typescript
const response = await fetch(url);  // Native Web API
const ws = new WebSocket(url);      // Native WebSocket API
```

**When to use external**:
- Anthropic SDK: No native alternative ✅
- Supabase client: Official library ✅

---

### 5. Node Built-in APIs
**Rule**: Use `node:` prefix when needed

**Example**:
```typescript
import { randomBytes } from 'node:crypto';
import process from 'node:process';
```

**Use when**: Deno APIs have gaps (rare)

---

### 6. File Operations
**Rule**: Only write to `/tmp` directory

**❌ Won't work**:
```typescript
await Deno.writeFile('./output.json', data);  // Permission denied
```

**✅ Allowed**:
```typescript
await Deno.writeFile('/tmp/output.json', data);  // OK
```

**Our use case**: No file writes needed (use database)

---

### 7. Cross-Function Dependencies
**Rule**: No imports between Edge Functions

**❌ Don't do**:
```typescript
// In pitch-deck-assistant/index.ts
import { helper } from '../chat/utils.ts';  // ❌ Bad
```

**✅ Do instead**:
```typescript
// Create shared utilities
// supabase/functions/_shared/utils.ts
export function helper() { ... }

// Import in both functions
import { helper } from '../_shared/utils.ts';  // ✅ Good
```

---

### 8. CORS Handling
**Best practice**: Configure properly for production

**Basic**:
```typescript
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',  // ⚠️ Development only
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }
  // ... handle request
});
```

**Production**:
```typescript
const ALLOWED_ORIGIN = Deno.env.get('ALLOWED_ORIGIN') || '*';

const corsHeaders = {
  'Access-Control-Allow-Origin': ALLOWED_ORIGIN,  // ✅ Configurable
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};
```

---

### 9. Response Format
**Best practice**: Always set Content-Type and Connection

**✅ Correct**:
```typescript
return new Response(
  JSON.stringify(data),
  {
    headers: {
      'Content-Type': 'application/json',
      'Connection': 'keep-alive',
      ...corsHeaders
    }
  }
);
```

**Why**: Ensures proper browser handling

---

### 10. Background Tasks
**Rule**: Use `EdgeRuntime.waitUntil()` for long-running tasks

**Example**:
```typescript
Deno.serve(async (req) => {
  // Quick response
  const response = new Response('Processing...');

  // Long task runs in background
  EdgeRuntime.waitUntil(
    processLargeFile().then(() => {
      console.log('Background task complete');
    })
  );

  return response;
});
```

**Our use case**: Not needed (Claude responses are fast enough)

---

## 📋 Checklist for pitch-deck-assistant

- [x] Imports use `npm:` prefix with versions
- [x] Uses `Deno.serve()` not old `serve`
- [x] Uses pre-populated env vars (SUPABASE_URL, etc.)
- [x] Custom secrets set via `supabase secrets set`
- [x] Minimal external dependencies (only SDK + client)
- [x] CORS configured properly
- [x] Response headers include Content-Type
- [x] No file write operations
- [x] No cross-function dependencies
- [x] Error handling in place

---

## 🎯 Applied in Our Code

### pitch-deck-assistant/index.ts

**Lines 1-10**: Correct imports ✅
```typescript
import Anthropic from 'npm:@anthropic-ai/sdk@0.32.1';
import { createClient } from 'npm:@supabase/supabase-js@2.47.10';
```

**Lines 12-16**: Pre-populated env vars ✅
```typescript
const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
```

**Line 17**: Custom secret ✅
```typescript
const ANTHROPIC_API_KEY = Deno.env.get('ANTHROPIC_API_KEY');
```

**Line 26**: Deno.serve ✅
```typescript
Deno.serve(async (req: Request) => {
```

**Lines 19-22**: CORS configured ✅
```typescript
const corsHeaders = {
  'Access-Control-Allow-Origin': ALLOWED_ORIGIN,
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};
```

**Line 201**: Response headers ✅
```typescript
return new Response(JSON.stringify(data), {
  headers: { ...corsHeaders, 'Content-Type': 'application/json' }
});
```

---

## 📚 Additional Resources

**Official Docs**:
- Deno Runtime: https://deno.land/manual
- Supabase Edge Functions: https://supabase.com/docs/guides/functions
- NPM specifiers: https://deno.land/manual/node/npm_specifiers

**Examples**:
- Supabase examples: https://github.com/supabase/supabase/tree/master/examples
- Anthropic + Deno: https://github.com/anthropics/anthropic-sdk-typescript

---

## 🔍 Common Mistakes to Avoid

### 1. Bare Imports
```typescript
import express from 'express';  // ❌ Error: Module not found
```

**Fix**: Add `npm:` prefix
```typescript
import express from 'npm:express@4.18.2';  // ✅
```

---

### 2. No Version Pinning
```typescript
import Anthropic from 'npm:@anthropic-ai/sdk';  // ⚠️ Risky
```

**Fix**: Pin version
```typescript
import Anthropic from 'npm:@anthropic-ai/sdk@0.32.1';  // ✅
```

---

### 3. Using Old serve Import
```typescript
import { serve } from "https://deno.land/std/http/server.ts";
```

**Fix**: Use built-in
```typescript
Deno.serve(async (req) => { ... });  // ✅
```

---

### 4. Missing CORS Preflight
```typescript
Deno.serve(async (req) => {
  // ❌ Missing OPTIONS handling
  const data = await req.json();
  return new Response(JSON.stringify(data));
});
```

**Fix**: Handle OPTIONS
```typescript
Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {  // ✅ Add this
    return new Response('ok', { headers: corsHeaders });
  }
  // ... rest of code
});
```

---

### 5. Hardcoding Origins
```typescript
const corsHeaders = {
  'Access-Control-Allow-Origin': 'http://localhost:8080',  // ❌ Not flexible
};
```

**Fix**: Use environment variable
```typescript
const ALLOWED_ORIGIN = Deno.env.get('ALLOWED_ORIGIN') || '*';
const corsHeaders = {
  'Access-Control-Allow-Origin': ALLOWED_ORIGIN,  // ✅ Configurable
};
```

---

## ✅ Verification

**Check your function**:

1. **Imports**: All have `npm:` or `jsr:` prefix? ✅
2. **Versions**: All dependencies pinned? ✅
3. **Serve**: Using `Deno.serve()`? ✅
4. **Env vars**: Using pre-populated ones correctly? ✅
5. **CORS**: OPTIONS handler exists? ✅
6. **Headers**: Content-Type set? ✅
7. **Dependencies**: Minimal and necessary? ✅

**Test locally**:
```bash
supabase functions serve pitch-deck-assistant

# Should start without errors
# Test CORS: Send OPTIONS request
curl -X OPTIONS http://localhost:54321/functions/v1/pitch-deck-assistant
```

---

**Remember**: These practices ensure your Edge Functions are:
- Fast (minimal dependencies)
- Reliable (versioned imports)
- Secure (proper CORS)
- Maintainable (follows standards)

---

**Applied to**: `pitch-deck-assistant` Edge Function ✅
**Status**: All best practices implemented
**Last Updated**: October 16, 2025
