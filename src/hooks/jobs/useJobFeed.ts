import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

export interface JobWithFlags {
  id: string;
  title: string;
  description: string;
  type: string;
  location: string | null;
  remote_allowed: boolean;
  salary_min: number | null;
  salary_max: number | null;
  salary_currency: string | null;
  created_at: string;
  companies: {
    name: string;
  };
  isSaved: boolean;
  hasApplied: boolean;
}

export function useJobFeed() {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["job-feed", user?.id],
    enabled: !!user?.id,
    queryFn: async () => {
      // Get all published jobs
      const { data: jobs, error: jobsError } = await supabase
        .from("jobs")
        .select(`
          id,
          title,
          description,
          type,
          location,
          remote_allowed,
          salary_min,
          salary_max,
          salary_currency,
          created_at,
          companies:company_id (
            name
          )
        `)
        .eq("status", "published")
        .is("deleted_at", null)
        .order("created_at", { ascending: false })
        .limit(50);

      if (jobsError) throw jobsError;

      // Get user's saved jobs
      const { data: savedJobs } = await supabase
        .from("saved_jobs")
        .select("job_id")
        .eq("profile_id", user.id);

      // Get user's applications
      const { data: applications } = await supabase
        .from("job_applications")
        .select("job_id")
        .eq("profile_id", user.id);

      const savedJobIds = new Set(savedJobs?.map((s) => s.job_id) || []);
      const appliedJobIds = new Set(applications?.map((a) => a.job_id) || []);

      return (jobs || []).map((job) => ({
        ...job,
        isSaved: savedJobIds.has(job.id),
        hasApplied: appliedJobIds.has(job.id),
      })) as JobWithFlags[];
    },
  });
}
