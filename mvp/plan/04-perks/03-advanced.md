# Perks - Advanced (Partner Integration & Analytics)

**Phase**: Professional Features
**Time**: 3-5 days
**Priority**: 🟢 LOW
**Difficulty**: Advanced
**Prerequisites**: 04-perks/02-intermediate.md complete

---

## Overview

Partner API integration for automated provisioning, ROI analytics, and partner dashboard.

**Outcome**: Fully automated perk provisioning with analytics

---

## Implementation Steps

### Step 1: Partner API Integration (2 days)

```typescript
// supabase/functions/provision-perk/index.ts
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

serve(async (req) => {
  const { claimId, providerApiKey } = await req.json();
  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
  );

  // Get claim details
  const { data: claim } = await supabase
    .from('perk_claims')
    .select('*, perks(*), profiles(*)')
    .eq('id', claimId)
    .single();

  // Auto-provision based on provider
  if (claim.perks.provider_name === 'AWS') {
    await fetch("https://api.aws-activate.com/provision", {
      method: "POST",
      headers: { "Authorization": `Bearer ${providerApiKey}` },
      body: JSON.stringify({
        email: claim.profiles.email,
        credits: claim.perks.value_amount,
      }),
    });
  }

  return new Response(JSON.stringify({ success: true }));
});
```

---

### Step 2: Analytics Dashboard (1 day)

```typescript
// src/pages/PerksAnalytics.tsx
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export default function PerksAnalytics() {
  const { data: stats } = useQuery({
    queryKey: ['perk-stats'],
    queryFn: async () => {
      const { data: claims } = await supabase
        .from('perk_claims')
        .select('*, perks(*)');

      const totalValue = claims?.reduce((sum, c) => sum + (c.perks.value_amount || 0), 0);
      const byCategory = claims?.reduce((acc, c) => {
        acc[c.perks.category] = (acc[c.perks.category] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

      return {
        totalClaims: claims?.length || 0,
        totalValue,
        byCategory,
      };
    },
  });

  return (
    <div className="container max-w-6xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Perks Analytics</h1>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Total Claims</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats?.totalClaims || 0}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Total Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">
              ${(stats?.totalValue || 0).toLocaleString()}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
```

---

## Success Criteria

- [ ] Partner APIs integrated
- [ ] Auto-provisioning works
- [ ] Analytics dashboard functional
- [ ] ROI tracking accurate

---

## Next Steps

→ **05-business-plan-ai/01-core.md** - Build AI business plan generator

---

**Time**: 3-5 days
**Status**: ✅ Ready to implement
