import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

export interface SavedJobWithDetails {
  id: string;
  saved_at: string;
  job_id: string;
  jobs: {
    id: string;
    title: string;
    location: string | null;
    type: string;
    salary_min: number | null;
    salary_max: number | null;
    salary_currency: string | null;
    remote_allowed: boolean;
    description: string;
    created_at: string;
    companies: {
      name: string;
    };
  };
}

export function useSavedJobs() {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["saved-jobs", user?.id],
    enabled: !!user?.id,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("saved_jobs")
        .select(
          `
          id,
          saved_at,
          job_id,
          jobs:job_id (
            id,
            title,
            location,
            type,
            salary_min,
            salary_max,
            salary_currency,
            remote_allowed,
            description,
            created_at,
            companies:company_id (
              name
            )
          )
        `
        )
        .eq("profile_id", user.id)
        .order("saved_at", { ascending: false });

      if (error) throw error;
      return (data || []) as SavedJobWithDetails[];
    },
  });
}
