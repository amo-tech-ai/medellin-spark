import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

export interface ApplicationWithDetails {
  id: string;
  status: string;
  applied_at: string;
  updated_at: string;
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

export function useApplications() {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["applications", user?.id],
    enabled: !!user?.id,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("job_applications")
        .select(
          `
          id,
          status,
          applied_at,
          updated_at,
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
        .order("updated_at", { ascending: false });

      if (error) throw error;
      return (data || []) as ApplicationWithDetails[];
    },
  });
}
