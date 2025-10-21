# Jobs AI - Intermediate (AI Matching & Recommendations)

**Phase**: Core Features
**Time**: 1 week
**Priority**: 🟡 HIGH
**Difficulty**: Intermediate-Advanced
**Prerequisites**: 03-jobs-ai/01-core.md complete

---

## Overview

Add AI-powered job matching, personalized recommendations, and saved jobs functionality.

**Outcome**: Smart job recommendations based on user profile and preferences

---

## Implementation Steps

### Step 1: User Skills & Preferences (1 day)

**Update profiles table**:

```sql
-- Add to profiles table
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS job_preferences JSONB DEFAULT '{}'::jsonb;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS resume_url TEXT;

-- Example structure for job_preferences:
-- {
--   "desired_roles": ["Frontend Developer", "Full Stack"],
--   "skills": ["React", "TypeScript", "Node.js"],
--   "location_preference": "remote",
--   "salary_min": 80000,
--   "experience_years": 5
-- }
```

**Create preferences form**:

```typescript
// src/pages/JobPreferences.tsx
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

export default function JobPreferences() {
  const [preferences, setPreferences] = useState({
    desired_roles: [],
    skills: [],
    location_preference: 'remote',
    salary_min: 0,
  });
  const { toast } = useToast();

  const savePreferences = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { error } = await supabase
      .from('profiles')
      .update({ job_preferences: preferences })
      .eq('id', user.id);

    if (error) {
      toast({ title: 'Error', description: 'Failed to save preferences', variant: 'destructive' });
    } else {
      toast({ title: 'Success', description: 'Preferences saved!' });
    }
  };

  return (
    <div className="container max-w-2xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Job Preferences</h1>

      <div className="space-y-6">
        <div>
          <Label>Skills (comma separated)</Label>
          <Input
            placeholder="React, TypeScript, Node.js"
            onChange={(e) => setPreferences({
              ...preferences,
              skills: e.target.value.split(',').map(s => s.trim())
            })}
          />
        </div>

        <div>
          <Label>Minimum Salary</Label>
          <Input
            type="number"
            placeholder="80000"
            onChange={(e) => setPreferences({
              ...preferences,
              salary_min: parseInt(e.target.value)
            })}
          />
        </div>

        <Button onClick={savePreferences} className="w-full">
          Save Preferences
        </Button>
      </div>
    </div>
  );
}
```

---

### Step 2: AI Job Matching Edge Function (2 days)

**Create**: `supabase/functions/job-matching/index.ts`

```typescript
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const openAiKey = Deno.env.get("OPENAI_API_KEY");
const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

serve(async (req) => {
  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  };

  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { profileId } = await req.json();
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Get user profile and preferences
    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', profileId)
      .single();

    if (!profile) throw new Error('Profile not found');

    // Get all active jobs
    const { data: jobs } = await supabase
      .from('jobs')
      .select('*')
      .eq('is_active', true);

    // Use OpenAI to score and rank jobs
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
            content: "You are a job matching AI. Score jobs from 0-100 based on fit with user profile. Return JSON array of job IDs with scores.",
          },
          {
            role: "user",
            content: `User: ${JSON.stringify(profile.job_preferences)}\n\nJobs: ${JSON.stringify(jobs?.map(j => ({ id: j.id, title: j.title, skills: j.skills, salary: j.salary_min })))}`,
          },
        ],
        response_format: { type: "json_object" },
        temperature: 0.3,
      }),
    });

    const aiData = await response.json();
    const scores = JSON.parse(aiData.choices[0].message.content);

    // Return ranked job IDs
    return new Response(
      JSON.stringify({ matches: scores.matches || [] }),
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
npx supabase functions deploy job-matching
```

---

### Step 3: Recommendations Hook (1 day)

**Create**: `src/hooks/useJobRecommendations.ts`

```typescript
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export function useJobRecommendations() {
  return useQuery({
    queryKey: ['job-recommendations'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return [];

      // Call AI matching function
      const { data, error } = await supabase.functions.invoke('job-matching', {
        body: { profileId: user.id },
      });

      if (error) throw error;

      // Get full job details for matched IDs
      const jobIds = data.matches.map((m: any) => m.id);
      const { data: jobs } = await supabase
        .from('jobs')
        .select('*')
        .in('id', jobIds);

      return jobs || [];
    },
    staleTime: 60 * 60 * 1000, // Cache for 1 hour
  });
}
```

---

### Step 4: Saved Jobs Feature (1 day)

**Create**: `src/hooks/useSavedJobs.ts`

```typescript
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export function useSavedJobs() {
  return useQuery({
    queryKey: ['saved-jobs'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return [];

      const { data, error } = await supabase
        .from('saved_jobs')
        .select('*, jobs(*)')
        .eq('profile_id', user.id)
        .order('saved_at', { ascending: false });

      if (error) throw error;
      return data;
    },
  });
}

export function useSaveJob() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (jobId: string) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('saved_jobs')
        .insert({ job_id: jobId, profile_id: user.id })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['saved-jobs'] });
    },
  });
}

export function useUnsaveJob() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (jobId: string) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { error } = await supabase
        .from('saved_jobs')
        .delete()
        .eq('job_id', jobId)
        .eq('profile_id', user.id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['saved-jobs'] });
    },
  });
}
```

---

### Step 5: Recommended Jobs Page (1 day)

**Create**: `src/pages/RecommendedJobs.tsx`

```typescript
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useJobRecommendations } from '@/hooks/useJobRecommendations';
import { useSaveJob } from '@/hooks/useSavedJobs';
import { useToast } from '@/hooks/use-toast';
import { Sparkles, Bookmark } from 'lucide-react';

export default function RecommendedJobs() {
  const { data: recommendations, isLoading } = useJobRecommendations();
  const saveMutation = useSaveJob();
  const { toast } = useToast();

  const handleSave = (jobId: string) => {
    saveMutation.mutate(jobId, {
      onSuccess: () => {
        toast({ title: 'Job saved!', description: 'Added to your saved jobs' });
      },
    });
  };

  return (
    <div className="container max-w-6xl mx-auto py-8">
      <div className="flex items-center gap-2 mb-8">
        <Sparkles className="h-8 w-8 text-primary" />
        <h1 className="text-3xl font-bold">Recommended for You</h1>
      </div>

      {isLoading ? (
        <div>Finding your perfect matches...</div>
      ) : (
        <div className="space-y-4">
          {recommendations?.map((job: any) => (
            <Card key={job.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{job.title}</CardTitle>
                    <p className="text-muted-foreground">{job.company_name}</p>
                  </div>
                  <Button variant="outline" onClick={() => handleSave(job.id)}>
                    <Bookmark className="h-4 w-4 mr-2" />
                    Save
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm mb-4">{job.description}</p>
                <div className="flex flex-wrap gap-2">
                  {job.skills.map((skill: string) => (
                    <Badge key={skill}>{skill}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
```

---

## Success Criteria

### AI Matching
- [ ] User preferences saved
- [ ] AI matching function deployed
- [ ] Recommendations generated
- [ ] Jobs ranked by relevance
- [ ] Cache working (1 hour)

### Saved Jobs
- [ ] Can save jobs
- [ ] Can view saved jobs
- [ ] Can unsave jobs
- [ ] No duplicates allowed

### UX
- [ ] Recommendations page loads
- [ ] AI recommendations feel relevant
- [ ] Save button works
- [ ] Loading states clear

---

## Testing Commands

```bash
# 1. Deploy function
npx supabase functions deploy job-matching

# 2. Test function
curl -X POST https://your-project.supabase.co/functions/v1/job-matching \
  -H "Authorization: Bearer YOUR_ANON_KEY" \
  -d '{"profileId":"user-id-here"}'

# 3. Check saved jobs
# Open: http://localhost:8080/jobs/recommended
```

---

## Next Steps

→ **03-jobs-ai/03-advanced.md** - Smart alerts, analytics, engagement tracking

---

**Time**: 1 week
**Status**: ✅ Ready to implement
