# Business Plan AI - Intermediate (AI Content Generation)

**Phase**: Core Features
**Time**: 1 week
**Priority**: 🟢 MEDIUM
**Difficulty**: Advanced
**Prerequisites**: 05-business-plan-ai/01-core.md complete

---

## Overview

Add AI-powered content generation for each business plan section.

**Outcome**: AI assists users in writing compelling business plan sections

---

## Implementation Steps

### Step 1: AI Generation Edge Function (2 days)

```typescript
// supabase/functions/generate-plan-section/index.ts
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const openAiKey = Deno.env.get("OPENAI_API_KEY");

serve(async (req) => {
  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  };

  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { section, companyData } = await req.json();

    const prompts = {
      executive_summary: "Write a compelling executive summary for this business...",
      market_analysis: "Analyze the market opportunity and competitive landscape...",
      financials: "Create financial projections and revenue models...",
    };

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${openAiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: prompts[section as keyof typeof prompts] || "Write professional business plan content",
          },
          {
            role: "user",
            content: `Company: ${companyData.companyName}\nIndustry: ${companyData.industry || 'Technology'}\nGenerate detailed content.`,
          },
        ],
        temperature: 0.7,
      }),
    });

    const data = await response.json();
    const content = data.choices[0].message.content;

    return new Response(
      JSON.stringify({ content }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
```

**Deploy**:
```bash
npx supabase functions deploy generate-plan-section
```

---

### Step 2: AI Generation UI (2 days)

Update editor with AI button:

```typescript
// In BusinessPlanEditor.tsx
import { Sparkles } from 'lucide-react';

const generateContent = async (sectionKey: string) => {
  setGenerating(true);

  const { data, error } = await supabase.functions.invoke('generate-plan-section', {
    body: {
      section: sectionKey,
      companyData: {
        companyName: plan.company_name,
        industry: plan.industry,
      },
    },
  });

  if (!error && data.content) {
    updateSection(sectionKey, data.content);
    toast({ title: 'Generated!', description: 'AI content added' });
  }

  setGenerating(false);
};

// Add to each section
<Button
  onClick={() => generateContent(key)}
  variant="outline"
  size="sm"
  disabled={generating}
>
  <Sparkles className="h-4 w-4 mr-2" />
  Generate with AI
</Button>
```

---

### Step 3: Progress Tracking (1 day)

Track section completion:

```typescript
const calculateProgress = () => {
  const total = Object.keys(sections).length;
  const completed = Object.values(sections).filter(
    (s: any) => s.content && s.content.length > 100
  ).length;

  return Math.round((completed / total) * 100);
};

// Show progress bar
<Progress value={calculateProgress()} className="mb-6" />
```

---

## Success Criteria

- [ ] AI generates section content
- [ ] Content is relevant and professional
- [ ] Progress tracking works
- [ ] Can regenerate sections
- [ ] Saves properly

---

## Testing

```bash
# Deploy function
npx supabase functions deploy generate-plan-section

# Test generation
# Click "Generate with AI" in editor
```

---

## Next Steps

→ **05-business-plan-ai/03-advanced.md** - Financial modeling, export

---

**Time**: 1 week
**Status**: ✅ Ready to implement
