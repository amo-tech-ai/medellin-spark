# Jobs AI - Advanced (Smart Alerts & Analytics)

**Phase**: Professional Features
**Time**: 3-5 days
**Priority**: 🟢 MEDIUM
**Difficulty**: Advanced
**Prerequisites**: 03-jobs-ai/02-intermediate.md complete

---

## Overview

Add email alerts for new matching jobs, engagement analytics, and application tracking dashboard.

**Outcome**: Complete job platform with smart notifications and insights

---

## Implementation Steps

### Step 1: Job Alerts Table (1 hour)

```sql
CREATE TABLE IF NOT EXISTS job_alerts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  keywords TEXT[],
  location_type TEXT,
  job_type TEXT,
  salary_min INTEGER,
  is_active BOOLEAN DEFAULT true,
  frequency TEXT DEFAULT 'daily' CHECK (frequency IN ('instant', 'daily', 'weekly')),
  last_sent_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_alerts_profile ON job_alerts(profile_id);
CREATE INDEX idx_alerts_active ON job_alerts(is_active);

ALTER TABLE job_alerts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users manage own alerts"
  ON job_alerts FOR ALL
  USING (auth.uid() = profile_id);
```

---

### Step 2: Email Notification Function (2 days)

**Create**: `supabase/functions/send-job-alerts/index.ts`

```typescript
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

serve(async (req) => {
  const supabase = createClient(supabaseUrl, supabaseKey);

  // Get all active alerts
  const { data: alerts } = await supabase
    .from('job_alerts')
    .select('*, profiles(*)')
    .eq('is_active', true);

  for (const alert of alerts || []) {
    // Find matching new jobs
    let query = supabase
      .from('jobs')
      .select('*')
      .eq('is_active', true);

    if (alert.last_sent_at) {
      query = query.gt('posted_date', alert.last_sent_at);
    }

    const { data: jobs } = await query;

    if (jobs && jobs.length > 0) {
      // Send email via Resend
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "jobs@medellin.ai",
          to: alert.profiles.email,
          subject: `${jobs.length} new jobs match your criteria`,
          html: `
            <h2>New Job Opportunities</h2>
            ${jobs.map(j => `
              <div>
                <h3>${j.title}</h3>
                <p>${j.company_name} - ${j.location}</p>
              </div>
            `).join('')}
          `,
        }),
      });

      // Update last_sent_at
      await supabase
        .from('job_alerts')
        .update({ last_sent_at: new Date().toISOString() })
        .eq('id', alert.id);
    }
  }

  return new Response(JSON.stringify({ success: true }), {
    headers: { "Content-Type": "application/json" },
  });
});
```

---

### Step 3: Application Analytics (1 day)

**Create**: `src/hooks/useJobAnalytics.ts`

```typescript
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export function useJobAnalytics() {
  return useQuery({
    queryKey: ['job-analytics'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return null;

      const { data: applications } = await supabase
        .from('job_applications')
        .select('*')
        .eq('profile_id', user.id);

      const statusCounts = applications?.reduce((acc, app) => {
        acc[app.status] = (acc[app.status] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

      return {
        total: applications?.length || 0,
        byStatus: statusCounts,
        recentApplications: applications?.slice(0, 5),
      };
    },
  });
}
```

---

### Step 4: Analytics Dashboard (1 day)

**Create**: `src/pages/JobAnalytics.tsx`

```typescript
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useJobAnalytics } from '@/hooks/useJobAnalytics';
import { TrendingUp, Send, CheckCircle, XCircle } from 'lucide-react';

export default function JobAnalytics() {
  const { data: analytics } = useJobAnalytics();

  return (
    <div className="container max-w-6xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Application Analytics</h1>

      <div className="grid gap-4 md:grid-cols-4 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Applied</CardTitle>
            <Send className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics?.total || 0}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {(analytics?.byStatus?.['screening'] || 0) + (analytics?.byStatus?.['interview'] || 0)}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Offers</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {analytics?.byStatus?.['offer'] || 0}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Rejected</CardTitle>
            <XCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {analytics?.byStatus?.['rejected'] || 0}
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

- [ ] Job alerts created and managed
- [ ] Email notifications sent
- [ ] Analytics dashboard shows stats
- [ ] Application tracking works
- [ ] Charts display correctly

---

## Testing

```bash
# Deploy alert function
npx supabase functions deploy send-job-alerts

# Test manually
curl -X POST https://your-project.supabase.co/functions/v1/send-job-alerts

# Check analytics
# Open: http://localhost:8080/jobs/analytics
```

---

## Next Steps

After Jobs AI complete:
→ **04-perks/01-core.md** - Build startup perks marketplace

---

**Time**: 3-5 days
**Status**: ✅ Ready to implement
