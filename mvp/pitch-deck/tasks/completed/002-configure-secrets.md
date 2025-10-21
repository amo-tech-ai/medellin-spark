# Task 002: Configure Secrets

**Status**: Pending
**Priority**: Critical
**Time**: 5 minutes
**Dependencies**: 001-verify-prerequisites

---

## Objective

Set up Anthropic API key and CORS configuration as Supabase secrets for the Edge Function.

---

## Steps

### 1. Set Anthropic API Key

```bash
# CRITICAL: Set your Anthropic API key
supabase secrets set ANTHROPIC_API_KEY=sk-ant-api03-YOUR_KEY_HERE

# Replace YOUR_KEY_HERE with actual key from console.anthropic.com
```

**Expected output**:
```
Finished supabase secrets set.
```

### 2. Set CORS Origin

**For development**:
```bash
# Allow localhost for development
supabase secrets set ALLOWED_ORIGIN=http://localhost:8080
```

**For production** (update later):
```bash
# Replace with your production domain
supabase secrets set ALLOWED_ORIGIN=https://your-production-domain.com
```

### 3. Verify Secrets

```bash
# List all secrets (values hidden for security)
supabase secrets list
```

**Expected output**:
```
ANTHROPIC_API_KEY
ALLOWED_ORIGIN
SUPABASE_URL (automatic)
SUPABASE_SERVICE_ROLE_KEY (automatic)
```

---

## Important Notes

### Security Rules
- ✅ Secrets are stored server-side only
- ✅ Never commit secrets to git
- ✅ Never expose secrets in frontend code
- ✅ Secrets are automatically available in Edge Functions

### CORS Configuration
- **Development**: `http://localhost:8080`
- **Production**: Your actual domain (e.g., `https://medellin-spark.com`)
- **NEVER use `*`** (allows any origin - security risk)

---

## Verification

```bash
# Check secrets are set
supabase secrets list | grep ANTHROPIC_API_KEY
supabase secrets list | grep ALLOWED_ORIGIN
```

Both should appear in the list.

---

## Troubleshooting

### "supabase: command not found"
```bash
# Install Supabase CLI
npm install -g supabase
```

### Secrets not showing
```bash
# Make sure Supabase is running
supabase status

# Restart if needed
supabase stop
supabase start
```

---

## Success Criteria

- [ ] ANTHROPIC_API_KEY set
- [ ] ALLOWED_ORIGIN set to localhost
- [ ] Secrets verified in list
- [ ] No errors during configuration

---

## Next Task

✅ Once complete → Proceed to **003-apply-database-migration.md**
