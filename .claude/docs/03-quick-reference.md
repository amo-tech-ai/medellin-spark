# Claude Code Quick Reference

**Fast lookup for common patterns, commands, and workflows**

---

## 🚀 Quick Start Commands

### Development Workflow
```bash
# Start development
pnpm dev                          # Dev server (http://localhost:8080)

# Type checking
pnpm tsc --noEmit                 # Check TypeScript errors
pnpm lint                         # Run ESLint

# Build
pnpm build                        # Production build
pnpm preview                      # Preview production build
```

### Supabase Commands
```bash
# Database
supabase status                   # Check local Supabase status
supabase db reset                 # Reset local database
supabase db push --linked         # Push migrations to production
supabase db execute "SELECT 1"    # Execute SQL query

# Migrations
supabase migration new <name>     # Create new migration
supabase db diff                  # Generate diff migration

# Edge Functions
supabase functions deploy <name>  # Deploy function
supabase functions list           # List all functions
supabase functions logs <name> --tail  # Monitor logs

# Secrets
supabase secrets set KEY=value    # Set secret
supabase secrets list             # List all secrets
```

---

## 💾 Database Patterns

### Create Table (Idempotent)
```sql
CREATE TABLE IF NOT EXISTS table_name (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  profile_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  data JSONB DEFAULT '{}'::JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Enable RLS
ALTER TABLE table_name ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view own data"
  ON table_name FOR SELECT
  USING (auth.uid() = profile_id);

CREATE POLICY "Users can insert own data"
  ON table_name FOR INSERT
  WITH CHECK (auth.uid() = profile_id);

CREATE POLICY "Users can update own data"
  ON table_name FOR UPDATE
  USING (auth.uid() = profile_id)
  WITH CHECK (auth.uid() = profile_id);

CREATE POLICY "Users can delete own data"
  ON table_name FOR DELETE
  USING (auth.uid() = profile_id);

-- Add indexes
CREATE INDEX IF NOT EXISTS idx_table_profile_id
  ON table_name(profile_id);

CREATE INDEX IF NOT EXISTS idx_table_created_at
  ON table_name(created_at DESC);

-- Auto-update trigger
CREATE OR REPLACE FUNCTION update_table_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE TRIGGER trigger_update_table_updated_at
  BEFORE UPDATE ON table_name
  FOR EACH ROW
  EXECUTE FUNCTION update_table_updated_at();
```

---

## 🔐 Security Patterns

### JWT Authentication (Edge Function)
```typescript
import { createClient } from 'npm:@supabase/supabase-js@2';

const authHeader = req.headers.get('authorization') ?? '';
const jwt = authHeader.replace(/^Bearer\s+/i, '');

if (!jwt) {
  return new Response(
    JSON.stringify({ code: 401, message: 'Missing authorization header' }),
    { status: 401, headers: { 'Content-Type': 'application/json' } }
  );
}

const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_ANON_KEY') ?? ''
);

const { data: { user }, error: authError } = await supabase.auth.getUser(jwt);

if (authError || !user) {
  return new Response(
    JSON.stringify({ code: 401, message: 'Invalid or expired token' }),
    { status: 401, headers: { 'Content-Type': 'application/json' } }
  );
}

// Verify profile_id matches
if (user.id !== profile_id) {
  return new Response(
    JSON.stringify({ code: 403, message: 'Unauthorized: profile_id mismatch' }),
    { status: 403, headers: { 'Content-Type': 'application/json' } }
  );
}
```

### CORS Headers (Edge Function)
```typescript
const ALLOWED_ORIGIN = Deno.env.get('ALLOWED_ORIGIN');

const corsHeaders = {
  'Access-Control-Allow-Origin': ALLOWED_ORIGIN || '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Handle OPTIONS request
if (req.method === 'OPTIONS') {
  return new Response('ok', { headers: corsHeaders });
}
```

---

## 🎨 Frontend Patterns

### Get Authenticated User (React)
```typescript
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';

const supabase = useSupabaseClient();
const user = useUser();

// Check if authenticated
if (!user) {
  toast.error('Please sign in');
  return;
}

// Get JWT token
const { data: sessionData } = await supabase.auth.getSession();
const jwt = sessionData.session?.access_token;
```

### Call Edge Function (Authenticated)
```typescript
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;

const response = await fetch(`${SUPABASE_URL}/functions/v1/function-name`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${jwt}`,
  },
  body: JSON.stringify({
    profile_id: user.id,
    data: yourData,
  }),
});

if (!response.ok) {
  const error = await response.json();
  throw new Error(error.message || `API error: ${response.status}`);
}

const data = await response.json();
```

### Database Query (Client)
```typescript
// Fetch data (RLS automatically filters by auth.uid())
const { data, error } = await supabase
  .from('table_name')
  .select('*')
  .eq('profile_id', user.id)  // Additional filter
  .order('created_at', { ascending: false })
  .limit(10);

if (error) {
  console.error('Database error:', error);
  toast.error('Failed to load data');
  return;
}

// Insert data
const { data: newData, error: insertError } = await supabase
  .from('table_name')
  .insert({
    profile_id: user.id,
    data: yourData,
  })
  .select()
  .single();

// Update data
const { error: updateError } = await supabase
  .from('table_name')
  .update({ data: updatedData })
  .eq('id', recordId)
  .eq('profile_id', user.id);  // Security: ensure user owns record

// Delete data
const { error: deleteError } = await supabase
  .from('table_name')
  .delete()
  .eq('id', recordId)
  .eq('profile_id', user.id);  // Security: ensure user owns record
```

---

## 🔄 Retry Logic Pattern

### Exponential Backoff (Edge Function)
```typescript
async function withRetry<T>(
  fn: () => Promise<T>,
  maxRetries = 3,
  baseDelay = 250
): Promise<T> {
  let lastError: any;

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error: any) {
      lastError = error;

      // Don't retry on client errors (4xx except 429)
      if (error?.status && error.status >= 400 && error.status < 500 && error.status !== 429) {
        throw error;
      }

      if (attempt === maxRetries - 1) throw error;

      // Exponential backoff: 250ms, 750ms, 2.25s
      const delay = baseDelay * Math.pow(3, attempt);
      console.log(`[retry] Attempt ${attempt + 1} failed, retrying in ${delay}ms`);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }

  throw lastError;
}

// Usage
const result = await withRetry(() =>
  claude.messages.create({ model: 'claude-3-5-sonnet-latest', ... })
);
```

---

## 🧪 Testing & Verification

### Check RLS Status
```sql
-- Check if RLS is enabled
SELECT relname, relrowsecurity
FROM pg_class
WHERE relname = 'table_name' AND relkind = 'r';

-- List all policies
SELECT policyname, cmd
FROM pg_policies
WHERE tablename = 'table_name'
ORDER BY policyname;

-- Test RLS (as authenticated user)
SELECT * FROM table_name;  -- Should only return user's data
```

### Verify Edge Function Security
```bash
# Test 1: No auth (should return 401)
curl -X POST https://PROJECT.supabase.co/functions/v1/function-name \
  -H "Content-Type: application/json" \
  -d '{"test": "data"}'

# Test 2: Invalid token (should return 401)
curl -X POST https://PROJECT.supabase.co/functions/v1/function-name \
  -H "Authorization: Bearer INVALID_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"test": "data"}'

# Test 3: Valid token (should work)
curl -X POST https://PROJECT.supabase.co/functions/v1/function-name \
  -H "Authorization: Bearer ${VALID_JWT}" \
  -H "Content-Type: application/json" \
  -d '{"profile_id": "user-id", "test": "data"}'
```

### Monitor Edge Function Logs
```bash
# Real-time logs
supabase functions logs function-name --tail

# Filter for errors
supabase functions logs function-name --tail | grep -i error

# Last 100 lines
supabase functions logs function-name --limit 100
```

---

## 📊 Database Queries (Common)

### Get Table Info
```sql
-- List all columns
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns
WHERE table_schema = 'public' AND table_name = 'table_name'
ORDER BY ordinal_position;

-- List all indexes
SELECT indexname, indexdef
FROM pg_indexes
WHERE tablename = 'table_name' AND schemaname = 'public';

-- List all triggers
SELECT trigger_name, event_manipulation, action_timing
FROM information_schema.triggers
WHERE event_object_table = 'table_name' AND trigger_schema = 'public';

-- List all constraints
SELECT conname, contype, pg_get_constraintdef(oid)
FROM pg_constraint
WHERE conrelid = 'table_name'::regclass;
```

### Performance Queries
```sql
-- Find slow queries (requires pg_stat_statements)
SELECT query, calls, mean_exec_time, total_exec_time
FROM pg_stat_statements
ORDER BY mean_exec_time DESC
LIMIT 10;

-- Table sizes
SELECT
  schemaname,
  tablename,
  pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) as size
FROM pg_tables
WHERE schemaname = 'public'
ORDER BY pg_total_relation_size(schemaname||'.'||tablename) DESC;

-- Index usage
SELECT
  schemaname,
  tablename,
  indexname,
  idx_scan as scans,
  idx_tup_read as tuples_read
FROM pg_stat_user_indexes
WHERE schemaname = 'public'
ORDER BY idx_scan DESC;
```

---

## 🎯 Task Workflow Template

### Step-by-Step Implementation
```markdown
## Task: [Task Name]

### 1. Prerequisites Check
- [ ] Required API keys available
- [ ] Dependencies installed
- [ ] Environment variables set
- [ ] Database accessible

### 2. Plan
Files to modify:
- file1.ts (20 lines)
- file2.tsx (50 lines)

Dependencies needed:
- package-name@version

Success criteria:
- Feature works as expected
- No TypeScript errors
- All tests pass

### 3. Implementation
[ ] Step 1: [Description]
[ ] Step 2: [Description]
[ ] Step 3: [Description]

### 4. Testing
[ ] Unit tests pass
[ ] Integration tests pass
[ ] Manual testing complete
[ ] Edge cases verified

### 5. Verification
[ ] TypeScript compiles: `pnpm tsc --noEmit`
[ ] Linter passes: `pnpm lint`
[ ] Security verified
[ ] Documentation updated

### 6. Deployment
[ ] Committed to git
[ ] Deployed to staging
[ ] Tested in staging
[ ] Deployed to production
```

---

## ⚡ Performance Optimization

### Frontend
```typescript
// Code splitting
const Component = lazy(() => import('./Component'));

// Memoization
const MemoizedComponent = memo(Component);

const memoizedValue = useMemo(() => {
  return expensiveCalculation(data);
}, [data]);

const memoizedCallback = useCallback(() => {
  handleClick(data);
}, [data]);

// Debounce inputs
const debouncedSearch = debounce((value) => {
  performSearch(value);
}, 300);
```

### Database
```sql
-- Add indexes for common queries
CREATE INDEX IF NOT EXISTS idx_table_filter_column
  ON table_name(filter_column);

-- Composite index for multiple filters
CREATE INDEX IF NOT EXISTS idx_table_multi
  ON table_name(column1, column2);

-- Partial index for specific conditions
CREATE INDEX IF NOT EXISTS idx_table_active
  ON table_name(status)
  WHERE status = 'active';

-- Use EXPLAIN ANALYZE to check query performance
EXPLAIN ANALYZE
SELECT * FROM table_name WHERE column = 'value';
```

---

## 🐛 Debugging Checklist

### Frontend Issues
```
[ ] Check browser console for errors
[ ] Verify network tab (failed requests?)
[ ] Check React DevTools (component state)
[ ] Verify environment variables loaded
[ ] Check if user is authenticated
[ ] Verify API endpoint URL correct
[ ] Check CORS headers
```

### Backend Issues
```
[ ] Check Edge Function logs
[ ] Verify secrets are set
[ ] Check function deployment status
[ ] Verify JWT token valid
[ ] Check RLS policies
[ ] Verify database connection
[ ] Check for SQL errors
```

### Database Issues
```sql
-- Check if table exists
SELECT tablename FROM pg_tables
WHERE schemaname = 'public' AND tablename = 'table_name';

-- Check RLS enabled
SELECT relrowsecurity FROM pg_class WHERE relname = 'table_name';

-- Check policies exist
SELECT count(*) FROM pg_policies WHERE tablename = 'table_name';

-- Check for blocking queries
SELECT pid, query, state, wait_event_type
FROM pg_stat_activity
WHERE state != 'idle';
```

---

## 📝 Git Workflow

### Commit Message Template
```bash
git commit -m "$(cat <<'EOF'
feat: Add pitch deck conversation tracking

- Created pitch_conversations table with RLS
- Deployed pitch-deck-assistant Edge Function
- Updated frontend with progress tracking
- Added data collection checklist

Fixes #123

🤖 Generated with Claude Code
Co-Authored-By: Claude <noreply@anthropic.com>
EOF
)"
```

### Useful Git Commands
```bash
# Check status
git status

# Create branch
git checkout -b feature/new-feature

# Stage changes
git add .

# Commit with message
git commit -m "feat: Description"

# Push to remote
git push origin feature/new-feature

# View diff
git diff
git diff --staged

# Undo last commit (keep changes)
git reset --soft HEAD~1

# Undo all changes (DANGEROUS)
git reset --hard HEAD

# View commit history
git log --oneline -10
```

---

## 🔍 Common Error Solutions

### Error: "Module not found"
```bash
# Solution: Install missing package
pnpm add package-name

# Check package.json
cat package.json | grep package-name

# Reinstall all dependencies
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

### Error: "relation does not exist"
```bash
# Solution: Apply migrations
supabase db reset           # Local
supabase db push --linked   # Production
```

### Error: "RLS policy violation"
```sql
-- Solution: Check policies
SELECT * FROM pg_policies WHERE tablename = 'table_name';

-- Verify user ID matches
SELECT auth.uid();  -- Returns current user ID
```

### Error: "CORS policy blocked"
```typescript
// Solution: Add CORS headers to Edge Function
const corsHeaders = {
  'Access-Control-Allow-Origin': Deno.env.get('ALLOWED_ORIGIN') || '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

return new Response(JSON.stringify(data), {
  headers: { ...corsHeaders, 'Content-Type': 'application/json' }
});
```

---

## 📦 Environment Variables

### Required Variables
```bash
# .env (Frontend - with VITE_ prefix)
VITE_SUPABASE_URL=https://project.supabase.co
VITE_SUPABASE_ANON_KEY=eyJ...

# Supabase Secrets (Backend - no prefix)
supabase secrets set ANTHROPIC_API_KEY=sk-ant-...
supabase secrets set OPENAI_API_KEY=sk-...
supabase secrets set ALLOWED_ORIGIN=http://localhost:8080
```

### Verify Secrets
```bash
# List all secrets
supabase secrets list

# Should see hashed values (not actual secrets)
```

---

## 🚦 Production Deployment Checklist

```
Pre-Deployment:
[ ] All tests pass
[ ] TypeScript compiles without errors
[ ] No console.log statements
[ ] Environment variables documented in .env.example
[ ] Security audit complete (RLS, JWT, CORS)
[ ] Database migrations tested locally
[ ] Edge Functions tested locally

Deployment:
[ ] Set production secrets
[ ] Push database migrations
[ ] Deploy Edge Functions
[ ] Build and deploy frontend
[ ] Verify production environment variables

Post-Deployment:
[ ] Test authentication flow
[ ] Test critical user journeys
[ ] Monitor error rates
[ ] Check performance metrics
[ ] Verify logs are working
```

---

## 💡 Pro Tips

1. **Always use idempotent migrations** - Use `IF NOT EXISTS`, `DROP IF EXISTS`
2. **Test security first** - Try to break your own auth before deploying
3. **Log everything** - You can't debug what you can't see
4. **Fail fast** - Return errors immediately, don't continue with bad state
5. **One task at a time** - Finish, verify, then move to next
6. **Git commits often** - Small, focused commits with clear messages
7. **Document as you go** - Future you will thank present you
8. **Test the unhappy path** - What happens when things fail?
9. **Use TypeScript strictly** - No `any` types, catch errors at compile time
10. **Monitor production** - Set up alerts for errors and performance

---

## 📚 Quick Links

- [Supabase Docs](https://supabase.com/docs)
- [React Docs](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Anthropic API Docs](https://docs.anthropic.com/)
- [Vite Docs](https://vitejs.dev/)

---

**Last Updated**: 2025-10-17
**Companion to**: 02-tips.md (Detailed best practices)
**Purpose**: Fast reference for common tasks and patterns
