# Perks - Core (Perks Catalog Foundation)

**Phase**: Foundation
**Time**: 6-8 hours
**Priority**: 🟢 MEDIUM
**Difficulty**: Intermediate
**Prerequisites**: 00-setup complete, 01-dashboard/01-core.md complete

---

## Overview

Build perks marketplace where startups can browse and claim exclusive deals and benefits from partners.

**Outcome**: Working perks catalog with categories, search, and claim tracking

---

## Implementation Steps

### Step 1: Database Setup (2 hours)

```sql
-- Perks table
CREATE TABLE IF NOT EXISTS perks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  provider_name TEXT NOT NULL,
  provider_logo TEXT,
  category TEXT NOT NULL CHECK (category IN ('software', 'credits', 'consulting', 'events', 'education', 'legal')),
  value_amount INTEGER,
  value_currency TEXT DEFAULT 'USD',
  discount_percentage INTEGER,
  requirements TEXT[],
  redemption_instructions TEXT NOT NULL,
  code TEXT,
  url TEXT,
  expires_at TIMESTAMPTZ,
  is_active BOOLEAN DEFAULT true,
  max_claims INTEGER,
  current_claims INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_perks_category ON perks(category);
CREATE INDEX idx_perks_active ON perks(is_active);
CREATE INDEX idx_perks_provider ON perks(provider_name);

-- Perk claims table
CREATE TABLE IF NOT EXISTS perk_claims (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  perk_id UUID NOT NULL REFERENCES perks(id) ON DELETE CASCADE,
  profile_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'redeemed')),
  claimed_at TIMESTAMPTZ DEFAULT NOW(),
  redeemed_at TIMESTAMPTZ,
  UNIQUE(perk_id, profile_id)
);

CREATE INDEX idx_claims_profile ON perk_claims(profile_id);
CREATE INDEX idx_claims_perk ON perk_claims(perk_id);
CREATE INDEX idx_claims_status ON perk_claims(status);

-- RLS
ALTER TABLE perks ENABLE ROW LEVEL SECURITY;
ALTER TABLE perk_claims ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Perks are viewable by everyone"
  ON perks FOR SELECT
  USING (is_active = true);

CREATE POLICY "Users can view own claims"
  ON perk_claims FOR SELECT
  USING (auth.uid() = profile_id);

CREATE POLICY "Users can create claims"
  ON perk_claims FOR INSERT
  WITH CHECK (auth.uid() = profile_id);
```

---

### Step 2: Seed Sample Perks (30 minutes)

```sql
INSERT INTO perks (title, description, provider_name, category, value_amount, requirements, redemption_instructions) VALUES
('AWS Credits', '$5000 in AWS cloud credits for startups', 'Amazon Web Services', 'credits', 5000, ARRAY['Must be pre-seed or seed stage', 'Less than 2 years old'], 'Apply through AWS Activate program with your Medellin Spark membership'),
('GitHub Enterprise', 'Free GitHub Enterprise for 12 months', 'GitHub', 'software', 2100, ARRAY['Active startup', 'Team of 5+ developers'], 'Contact support@github.com with your membership details'),
('Legal Consultation', '2 hours of free legal consultation', 'StartupLaw Co', 'legal', 500, ARRAY['First-time founders'], 'Email legal@startup-law.co to schedule'),
('Marketing Credits', '$1000 Google Ads credit', 'Google', 'credits', 1000, ARRAY['New Google Ads account'], 'Redeem at ads.google.com/activate'),
('Startup Conference', 'Free ticket to TechCrunch Disrupt', 'TechCrunch', 'events', 2995, ARRAY['Active Medellin Spark members'], 'Use code MEDELLIN2025 at checkout');
```

---

### Step 3: Perks Hook (1 hour)

**Create**: `src/hooks/usePerks.ts`

```typescript
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export function usePerks(category?: string) {
  return useQuery({
    queryKey: ['perks', category],
    queryFn: async () => {
      let query = supabase
        .from('perks')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (category) {
        query = query.eq('category', category);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data;
    },
  });
}

export function useClaimPerk() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (perkId: string) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('perk_claims')
        .insert({
          perk_id: perkId,
          profile_id: user.id,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['perk-claims'] });
      queryClient.invalidateQueries({ queryKey: ['perks'] });
    },
  });
}

export function usePerkClaims() {
  return useQuery({
    queryKey: ['perk-claims'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return [];

      const { data, error } = await supabase
        .from('perk_claims')
        .select('*, perks(*)')
        .eq('profile_id', user.id)
        .order('claimed_at', { ascending: false });

      if (error) throw error;
      return data;
    },
  });
}
```

---

### Step 4: Perks Catalog Page (3 hours)

**Create**: `src/pages/Perks.tsx`

```typescript
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { usePerks, useClaimPerk } from '@/hooks/usePerks';
import { useToast } from '@/hooks/use-toast';
import { Gift, DollarSign, Calendar } from 'lucide-react';

export default function Perks() {
  const [category, setCategory] = useState<string>('');
  const { data: perks, isLoading } = usePerks(category);
  const claimMutation = useClaimPerk();
  const { toast } = useToast();

  const handleClaim = (perkId: string) => {
    claimMutation.mutate(perkId, {
      onSuccess: () => {
        toast({ title: 'Perk claimed!', description: 'Check your email for redemption details' });
      },
      onError: (error: any) => {
        toast({
          title: 'Error',
          description: error.message || 'Failed to claim perk',
          variant: 'destructive',
        });
      },
    });
  };

  const categories = ['software', 'credits', 'consulting', 'events', 'education', 'legal'];

  return (
    <div className="container max-w-6xl mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Startup Perks</h1>
        <p className="text-muted-foreground">
          Exclusive deals and benefits for Medellin Spark members
        </p>
      </div>

      <Tabs value={category || 'all'} onValueChange={(v) => setCategory(v === 'all' ? '' : v)}>
        <TabsList>
          <TabsTrigger value="all">All Perks</TabsTrigger>
          {categories.map((cat) => (
            <TabsTrigger key={cat} value={cat}>
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value={category || 'all'} className="mt-6">
          {isLoading ? (
            <div>Loading perks...</div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {perks?.map((perk) => (
                <Card key={perk.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{perk.title}</CardTitle>
                        <CardDescription>{perk.provider_name}</CardDescription>
                      </div>
                      <Badge>{perk.category}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm mb-4">{perk.description}</p>

                    <div className="space-y-2 mb-4">
                      {perk.value_amount && (
                        <div className="flex items-center gap-2 text-sm">
                          <DollarSign className="h-4 w-4 text-green-600" />
                          <span className="font-semibold text-green-600">
                            ${perk.value_amount.toLocaleString()} value
                          </span>
                        </div>
                      )}

                      {perk.expires_at && (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          Expires: {new Date(perk.expires_at).toLocaleDateString()}
                        </div>
                      )}
                    </div>

                    <Button
                      onClick={() => handleClaim(perk.id)}
                      disabled={claimMutation.isPending}
                      className="w-full"
                    >
                      <Gift className="h-4 w-4 mr-2" />
                      Claim Perk
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
```

---

## Success Criteria

- [ ] Perks table created
- [ ] Claims table created
- [ ] Sample perks seeded
- [ ] Perks display correctly
- [ ] Categories work
- [ ] Can claim perks
- [ ] No duplicate claims

---

## Testing

```bash
# Apply migration
npx supabase db push

# Verify tables
PGPASSWORD='password' psql -h project.supabase.co -U postgres -d postgres -c "\dt"

# Check sample perks
PGPASSWORD='password' psql -h project.supabase.co -U postgres -d postgres -c "SELECT COUNT(*) FROM perks;"

# Test in browser
# Open: http://localhost:8080/perks
```

---

## Next Steps

→ **04-perks/02-intermediate.md** - Verification workflow, usage tracking

---

**Time**: 6-8 hours
**Status**: ✅ Ready to implement
