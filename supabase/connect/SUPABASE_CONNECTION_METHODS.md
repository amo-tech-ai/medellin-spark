# 🔌 SUPABASE CONNECTION METHODS - COMPLETE GUIDE

## 📊 Status Summary

| Method | Status | Use Case | Network Requirement |
|--------|--------|----------|---------------------|
| **REST API** | ✅ WORKING | Frontend apps | None (HTTPS) |
| **Edge Functions** | ✅ WORKING | Server-side proxy | None (HTTPS) |
| **Dashboard SQL** | ✅ WORKING | Manual queries | None (Browser) |
| **Supabase CLI** | ⚠️ INTERMITTENT | Migrations | Ports 5432/6543 open |
| **Direct Connection** | ❓ UNTESTED | Long-running servers | IPv6 support |
| **Session Mode** | ⚠️ INTERMITTENT | Persistent clients | Ports 5432/6543 open |
| **Transaction Mode** | ❌ BLOCKED | Serverless functions | Port 6543 open |
| **psql Direct** | ❌ BLOCKED | CLI tool | Port 5432 open |

---

## ✅ WORKING METHODS (No Firewall Issues)

### 1. REST API (PostgREST)

**Perfect for**: Frontend applications

**Connection**:
```javascript
// Using fetch
const response = await fetch(
  'https://dhesktsqhcxhqfjypulk.supabase.co/rest/v1/presentations?select=*',
  {
    headers: {
      'apikey': 'YOUR_ANON_KEY',
      'Authorization': 'Bearer YOUR_ANON_KEY'
    }
  }
);
```

**Tested**: ✅ Working perfectly
```bash
curl "$VITE_SUPABASE_URL/rest/v1/presentation_templates?select=id,name&limit=3" \
  -H "apikey: $VITE_SUPABASE_ANON_KEY"
# Result: 200 OK with data
```

**Reference**: [Supabase REST API Docs](https://supabase.com/docs/guides/database/connecting-to-postgres#data-apis-and-client-libraries)

---

### 2. Supabase JavaScript Client

**Perfect for**: Frontend and backend JavaScript/TypeScript

**Connection**:
```javascript
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://dhesktsqhcxhqfjypulk.supabase.co',
  'YOUR_ANON_KEY'
)

// Query data
const { data, error } = await supabase
  .from('presentations')
  .select('*')
```

**Tested**: ✅ Working (uses REST API internally)

**Reference**: [JavaScript Client Docs](https://supabase.com/docs/reference/javascript/introduction)

---

### 3. Edge Functions (Server-Side)

**Perfect for**: Keeping API keys secure

**Example**: Our `/functions/chat` endpoint
```bash
curl "$VITE_SUPABASE_URL/functions/v1/chat" \
  -H "Authorization: Bearer $VITE_SUPABASE_ANON_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model":"gpt-4o-mini","messages":[...]}'
# Result: 200 OK with AI response
```

**Tested**: ✅ Working perfectly

**Reference**: [Edge Functions Docs](https://supabase.com/docs/guides/functions)

---

### 4. Dashboard SQL Editor

**Perfect for**: Manual queries, migrations when CLI fails

**URL**: https://supabase.com/dashboard/project/dhesktsqhcxhqfjypulk/sql/new

**Advantages**:
- No network restrictions (browser-based)
- Full SQL support
- Can run migrations manually
- View query results instantly

**Tested**: ✅ Working (used for previous migrations)

**Reference**: [SQL Editor Docs](https://supabase.com/docs/guides/database/overview)

---

## ⚠️ INTERMITTENT METHODS (Network Dependent)

### 5. Supabase CLI

**Perfect for**: Migrations, local development

**Connection**: Uses session mode pooler by default
```bash
export SUPABASE_ACCESS_TOKEN=sbp_xxx
supabase db push --include-all
```

**Tested**: ⚠️ Works when pooler accessible
- ✅ Applied 5/7 migrations successfully
- ❌ Occasional "connection refused" errors

**Root Cause**: Network/firewall blocking ports 5432/6543

**Fallback**: Use Dashboard SQL Editor

**Reference**: [CLI Docs](https://supabase.com/docs/guides/cli)

---

### 6. Supavisor Session Mode (Shared Pooler)

**Perfect for**: Persistent servers without IPv6

**Connection String**:
```
postgres://postgres.dhesktsqhcxhqfjypulk:[PASSWORD]@aws-1-us-east-2.pooler.supabase.com:5432/postgres
```

**Tested**: ⚠️ Intermittent (same issue as CLI)

**Per [Supabase Docs](https://supabase.com/docs/guides/database/connecting-to-postgres#supavisor-session-mode)**:
> The session mode connection string connects to your Postgres instance via a proxy. This is ideal for persistent servers when IPv6 is not supported.

**Port**: 5432
**Supports**: Both IPv4 and IPv6
**Limitation**: Network/firewall blocking

---

## ❌ BLOCKED METHODS (Current Network)

### 7. Supavisor Transaction Mode

**Perfect for**: Serverless functions (Vercel, AWS Lambda)

**Connection String**:
```
postgres://postgres.dhesktsqhcxhqfjypulk:[PASSWORD]@aws-1-us-east-2.pooler.supabase.com:6543/postgres
```

**Tested**: ❌ Port 6543 blocked

**Important** ([per docs](https://supabase.com/docs/guides/database/connecting-to-postgres#supavisor-transaction-mode)):
> Transaction mode does not support prepared statements. To avoid errors, turn off prepared statements for your connection library.

**Port**: 6543
**Use Case**: Short-lived connections
**Current Status**: Blocked by firewall

---

### 8. Direct Database Connection

**Perfect for**: Long-running servers with IPv6

**Connection String**:
```
postgresql://postgres:[PASSWORD]@db.dhesktsqhcxhqfjypulk.supabase.co:5432/postgres
```

**Tested**: ❓ Not tested (requires IPv6)

**Per [Supabase Docs](https://supabase.com/docs/guides/database/connecting-to-postgres#direct-connection)**:
> Direct connections use IPv6 by default. If your environment doesn't support IPv6, use Supavisor session mode or get the IPv4 add-on.

**Port**: 5432
**Requirement**: IPv6 support
**Alternative**: Use Supavisor session mode for IPv4

---

### 9. psql Command-Line Tool

**Perfect for**: Database administration, dumps

**Example**:
```bash
PGPASSWORD="$DATABASE_PASSWORD" psql \
  "postgresql://postgres.dhesktsqhcxhqfjypulk:[PASSWORD]@aws-1-us-east-2.pooler.supabase.com:5432/postgres"
```

**Tested**: ❌ Connection refused (same pooler issue)

**Reference**: [psql Docs](https://supabase.com/docs/guides/database/connecting-to-postgres#psql)

---

### 10. postgres.js Library

**Perfect for**: Node.js backend with Postgres

**Example** ([per docs](https://supabase.com/docs/guides/database/postgres-js)):
```javascript
import postgres from 'postgres'

const sql = postgres(
  'postgres://postgres.dhesktsqhcxhqfjypulk:[PASSWORD]@aws-1-us-east-2.pooler.supabase.com:6543/postgres',
  { prepare: false } // Required for transaction mode
)

const users = await sql`
  select name, age from users where age > ${18}
`
```

**Status**: ❓ Not tested (would use same blocked pooler)

**Reference**: [postgres.js Docs](https://supabase.com/docs/guides/database/postgres-js)

---

## 🎯 RECOMMENDED APPROACH (Current Network)

### For Current Work (Migrations)

**Use Dashboard SQL Editor** ✅
- No network restrictions
- 100% reliable
- Copy SQL from migration files
- Execute and verify

### For Frontend Development

**Use REST API or Supabase JS Client** ✅
- No network issues (HTTPS)
- RLS-aware
- Automatic auth handling

### For Backend/Server-Side

**Use Edge Functions** ✅
- Keep secrets secure
- No direct database connection needed
- Supabase handles pooling

---

## 🔧 TROUBLESHOOTING GUIDE

### Connection Refused Errors

**Problem**: 
```
connection refused to aws-1-us-east-2.pooler.supabase.com
```

**Root Causes**:
1. **Firewall**: Ports 5432/6543 blocked
2. **ISP**: Some ISPs block database ports
3. **Network**: Corporate/school networks often restrict
4. **Pooler**: Occasional Supabase pooler overload

**Solutions**:
1. ✅ **Use Dashboard SQL Editor** (bypasses all issues)
2. Try different network (mobile hotspot, VPN)
3. Contact IT to whitelist Supabase IPs
4. Use REST API instead of direct connection

**Reference**: [Connection Troubleshooting](https://supabase.com/docs/guides/database/connecting-to-postgres#troubleshooting-and-postgres-connection-string-faqs)

---

### IPv6 Not Supported

**Problem**: Direct connection requires IPv6

**Per [Supabase Docs](https://supabase.com/docs/guides/database/connecting-to-postgres#how-do-you-connect-using-ipv4)**:
> Supabase's default direct connection supports IPv6 only. To connect over IPv4, consider using the Supavisor session or transaction modes, or a connection pooler (shared or dedicated), which support both IPv4 and IPv6.

**Solutions**:
1. Use Supavisor session mode (supports IPv4)
2. Get IPv4 add-on from Supabase
3. Use REST API (no IPv6 requirement)

---

### Prepared Statements Error

**Problem**: Transaction mode doesn't support prepared statements

**Per [Supabase Docs](https://supabase.com/docs/guides/database/connecting-to-postgres#supavisor-transaction-mode)**:
> Transaction mode does not support prepared statements. To avoid errors, turn off prepared statements for your connection library.

**Example Fix** (postgres.js):
```javascript
const sql = postgres(connectionString, {
  prepare: false // Disable prepared statements
})
```

---

## 📋 PRODUCTION RECOMMENDATIONS

### Frontend Apps
- ✅ **Use**: Supabase JS Client (via REST API)
- ✅ **Enable**: Row Level Security (RLS)
- ✅ **Store**: Only anon key client-side

### Backend Apps (Persistent Servers)
- ✅ **Use**: Supavisor session mode (if IPv4 needed)
- ✅ **Use**: Direct connection (if IPv6 available)
- ✅ **Store**: Service role key in .env

### Serverless Functions
- ✅ **Use**: Supavisor transaction mode
- ✅ **Disable**: Prepared statements
- ✅ **Configure**: Connection pooling

### Current Network (Firewall Issues)
- ✅ **Use**: Dashboard SQL Editor for migrations
- ✅ **Use**: REST API for queries
- ✅ **Use**: Edge Functions for server logic

---

## 🔗 HELPFUL RESOURCES

- [Connection Methods Guide](https://supabase.com/docs/guides/database/connecting-to-postgres)
- [Connection Pooling Explained](https://supabase.com/docs/guides/database/connecting-to-postgres#more-about-connection-pooling)
- [Troubleshooting FAQs](https://supabase.com/docs/guides/database/connecting-to-postgres#troubleshooting-and-postgres-connection-string-faqs)
- [postgres.js Quickstart](https://supabase.com/docs/guides/database/postgres-js)
- [psql Guide](https://supabase.com/docs/guides/database/psql)

---

**Created**: October 16, 2025  
**Tested**: REST API ✅, Edge Functions ✅, CLI ⚠️, Pooler ❌  
**Recommendation**: Use Dashboard + REST API until network issues resolved


