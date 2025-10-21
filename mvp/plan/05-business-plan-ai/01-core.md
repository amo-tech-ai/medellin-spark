# Business Plan AI - Core (Plan Builder Foundation)

**Phase**: Foundation
**Time**: 8-10 hours
**Priority**: 🟢 MEDIUM
**Difficulty**: Intermediate
**Prerequisites**: 00-setup complete, 02-pitch-deck/01-core.md helpful

---

## Overview

Build business plan generator with section templates and basic editor.

**Outcome**: Users can create, edit, and save business plans

---

## Implementation Steps

### Step 1: Database Setup (2 hours)

```sql
CREATE TABLE IF NOT EXISTS business_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  company_name TEXT NOT NULL,
  sections JSONB DEFAULT '{}'::jsonb,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'complete', 'published')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_plans_profile ON business_plans(profile_id);

ALTER TABLE business_plans ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users manage own plans"
  ON business_plans FOR ALL
  USING (auth.uid() = profile_id);

-- Section templates
CREATE TABLE IF NOT EXISTS plan_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  sections JSONB NOT NULL,
  is_public BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Default template
INSERT INTO plan_templates (name, sections) VALUES
('Standard Business Plan', '{
  "executive_summary": {"title": "Executive Summary", "content": "", "order": 1},
  "company_description": {"title": "Company Description", "content": "", "order": 2},
  "market_analysis": {"title": "Market Analysis", "content": "", "order": 3},
  "organization": {"title": "Organization & Management", "content": "", "order": 4},
  "products_services": {"title": "Products & Services", "content": "", "order": 5},
  "marketing": {"title": "Marketing & Sales", "content": "", "order": 6},
  "financials": {"title": "Financial Projections", "content": "", "order": 7},
  "funding": {"title": "Funding Request", "content": "", "order": 8}
}'::jsonb);
```

---

### Step 2: Business Plan Hooks (2 hours)

```typescript
// src/hooks/useBusinessPlans.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export function useBusinessPlans() {
  return useQuery({
    queryKey: ['business-plans'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return [];

      const { data, error } = await supabase
        .from('business_plans')
        .select('*')
        .eq('profile_id', user.id)
        .order('updated_at', { ascending: false });

      if (error) throw error;
      return data;
    },
  });
}

export function useCreateBusinessPlan() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ title, companyName }: { title: string; companyName: string }) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      // Get default template
      const { data: template } = await supabase
        .from('plan_templates')
        .select('*')
        .eq('name', 'Standard Business Plan')
        .single();

      const { data, error } = await supabase
        .from('business_plans')
        .insert({
          profile_id: user.id,
          title,
          company_name: companyName,
          sections: template?.sections || {},
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['business-plans'] });
    },
  });
}

export function useUpdateBusinessPlan() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, sections }: { id: string; sections: any }) => {
      const { error } = await supabase
        .from('business_plans')
        .update({
          sections,
          updated_at: new Date().toISOString(),
        })
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['business-plans'] });
    },
  });
}
```

---

### Step 3: Plan Editor (4 hours)

```typescript
// src/pages/BusinessPlanEditor.tsx
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useUpdateBusinessPlan } from '@/hooks/useBusinessPlans';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export default function BusinessPlanEditor() {
  const { id } = useParams();
  const [plan, setPlan] = useState<any>(null);
  const [sections, setSections] = useState<any>({});
  const updateMutation = useUpdateBusinessPlan();
  const { toast } = useToast();

  useEffect(() => {
    const loadPlan = async () => {
      const { data } = await supabase
        .from('business_plans')
        .select('*')
        .eq('id', id)
        .single();

      if (data) {
        setPlan(data);
        setSections(data.sections);
      }
    };
    loadPlan();
  }, [id]);

  const handleSave = () => {
    updateMutation.mutate({ id: id!, sections }, {
      onSuccess: () => {
        toast({ title: 'Saved!', description: 'Business plan updated' });
      },
    });
  };

  const updateSection = (key: string, content: string) => {
    setSections({
      ...sections,
      [key]: { ...sections[key], content },
    });
  };

  const sectionOrder = Object.entries(sections)
    .sort(([,a]: any, [,b]: any) => a.order - b.order);

  return (
    <div className="container max-w-4xl mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">{plan?.title}</h1>
        <Button onClick={handleSave}>Save Plan</Button>
      </div>

      <div className="space-y-6">
        {sectionOrder.map(([key, section]: any) => (
          <Card key={key}>
            <CardHeader>
              <CardTitle>{section.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder={`Enter ${section.title.toLowerCase()} content...`}
                value={section.content || ''}
                onChange={(e) => updateSection(key, e.target.value)}
                className="min-h-[200px]"
              />
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

- [ ] Business plans table created
- [ ] Templates table seeded
- [ ] Can create new plan
- [ ] Can edit sections
- [ ] Changes save correctly
- [ ] Plans list correctly

---

## Testing

```bash
# Apply migration
npx supabase db push

# Test in browser
# Open: http://localhost:8080/business-plans
```

---

## Next Steps

→ **05-business-plan-ai/02-intermediate.md** - AI content generation

---

**Time**: 8-10 hours
**Status**: ✅ Ready to implement
