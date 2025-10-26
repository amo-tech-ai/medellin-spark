# Layer 1: Database Testing

**Simple SQL tests - 2 minutes**

---

## Quick Tests

### 1. RLS Enabled
```sql
SELECT tablename, rowsecurity
FROM pg_tables
WHERE schemaname = 'public';
```
✅ All = `true`

### 2. Insert Test Data
```sql
INSERT INTO pitch_conversations (profile_id, collected_data, completeness)
VALUES (auth.uid(), '{}', 0)
RETURNING id;
```
✅ Returns UUID

### 3. Query Own Data
```sql
SELECT * FROM presentations
WHERE profile_id = auth.uid();
```
✅ Only your presentations

### 4. Query Public Data
```sql
SELECT * FROM presentations
WHERE is_public = true;
```
✅ All public presentations

---

## Checklist

- [ ] All tables have RLS enabled
- [ ] Can insert test data
- [ ] Can query own data
- [ ] Public access works
- [ ] Foreign keys use `profile_id`

**Simple and done!**
