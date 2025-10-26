# Layer 2: Backend Testing

**Test Edge Functions - 3 minutes**

---

## Quick Tests

### 1. Functions Deployed
```bash
supabase functions list
```
✅ All show `ACTIVE`

### 2. Test Auth Required
```bash
curl -X POST \
  "https://dhesktsqhcxhqfjypulk.supabase.co/functions/v1/chat" \
  -H "Content-Type: application/json" \
  -d '{"messages":[]}'
```
✅ Returns `401 Unauthorized`

### 3. Check Logs
```bash
supabase functions logs chat --tail
```
✅ No errors

### 4. Verify Secrets
```bash
supabase secrets list
```
✅ `OPENAI_API_KEY` present

---

## Checklist

- [ ] All functions deployed
- [ ] Auth validation works
- [ ] No errors in logs
- [ ] Secrets configured

**Simple and done!**
