# Perks - Intermediate (Verification & Tracking)

**Phase**: Core Features
**Time**: 2-3 days
**Priority**: 🟢 MEDIUM
**Difficulty**: Intermediate
**Prerequisites**: 04-perks/01-core.md complete

---

## Overview

Add admin verification workflow, usage tracking, and expiration management.

**Outcome**: Complete perk claim verification system with analytics

---

## Implementation Steps

### Step 1: Admin Verification (1 day)

**Update claims with verification fields**:

```sql
ALTER TABLE perk_claims ADD COLUMN IF NOT EXISTS verified_by UUID REFERENCES profiles(id);
ALTER TABLE perk_claims ADD COLUMN IF NOT EXISTS verified_at TIMESTAMPTZ;
ALTER TABLE perk_claims ADD COLUMN IF NOT EXISTS rejection_reason TEXT;
```

**Create admin hook**:

```typescript
// src/hooks/useAdminPerks.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export function usePendingClaims() {
  return useQuery({
    queryKey: ['pending-claims'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('perk_claims')
        .select('*, perks(*), profiles(*)')
        .eq('status', 'pending')
        .order('claimed_at', { ascending: true });

      if (error) throw error;
      return data;
    },
  });
}

export function useVerifyClaim() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ claimId, approved }: { claimId: string; approved: boolean }) => {
      const { data: { user } } = await supabase.auth.getUser();

      const { error } = await supabase
        .from('perk_claims')
        .update({
          status: approved ? 'approved' : 'rejected',
          verified_by: user?.id,
          verified_at: new Date().toISOString(),
        })
        .eq('id', claimId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pending-claims'] });
    },
  });
}
```

---

### Step 2: Usage Tracking (1 day)

**Add usage table**:

```sql
CREATE TABLE IF NOT EXISTS perk_usage (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  claim_id UUID NOT NULL REFERENCES perk_claims(id) ON DELETE CASCADE,
  used_at TIMESTAMPTZ DEFAULT NOW(),
  notes TEXT
);

CREATE INDEX idx_usage_claim ON perk_usage(claim_id);
```

---

### Step 3: My Claims Page (1 day)

**Create**: `src/pages/MyPerks.tsx`

```typescript
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { usePerkClaims } from '@/hooks/usePerks';
import { CheckCircle, Clock, XCircle } from 'lucide-react';

export default function MyPerks() {
  const { data: claims } = usePerkClaims();

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'pending': return <Clock className="h-4 w-4 text-yellow-600" />;
      case 'rejected': return <XCircle className="h-4 w-4 text-red-600" />;
      default: return null;
    }
  };

  return (
    <div className="container max-w-4xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">My Claimed Perks</h1>

      <div className="space-y-4">
        {claims?.map((claim: any) => (
          <Card key={claim.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle>{claim.perks.title}</CardTitle>
                <div className="flex items-center gap-2">
                  {getStatusIcon(claim.status)}
                  <Badge>{claim.status}</Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Claimed: {new Date(claim.claimed_at).toLocaleDateString()}
              </p>

              {claim.status === 'approved' && (
                <div className="mt-4 p-4 bg-green-50 rounded-lg">
                  <h4 className="font-semibold mb-2">Redemption Instructions:</h4>
                  <p className="text-sm">{claim.perks.redemption_instructions}</p>
                  {claim.perks.code && (
                    <div className="mt-2">
                      <span className="text-sm font-semibold">Code: </span>
                      <code className="bg-white px-2 py-1 rounded">{claim.perks.code}</code>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
```

---

## Success Criteria

- [ ] Admin can approve/reject claims
- [ ] Users see claim status
- [ ] Usage tracking works
- [ ] Redemption instructions shown
- [ ] Expiration dates enforced

---

## Testing

```bash
# Check claims
PGPASSWORD='password' psql -h project.supabase.co -U postgres -d postgres -c "SELECT * FROM perk_claims;"

# Test My Perks page
# Open: http://localhost:8080/my-perks
```

---

## Next Steps

→ **04-perks/03-advanced.md** - Partner API integration, analytics

---

**Time**: 2-3 days
**Status**: ✅ Ready to implement
