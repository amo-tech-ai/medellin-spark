import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";

export interface DashboardMetrics {
  presentationsCount: number;
  eventsRegistered: number;
  jobsApplied: number;
  savedJobs: number;
}

/**
 * Hook to fetch dashboard metrics for the current user
 *
 * Fetches counts for:
 * - Presentations created
 * - Events registered
 * - Jobs applied to
 * - Jobs/perks saved
 *
 * @returns React Query result with metrics data
 */
export function useDashboardMetrics() {
  const { user } = useAuth();

  // DEV MODE: Use existing test profile to enable Supabase query testing
  const MOCK_USER_ID = 'b67c1712-a7dd-49fe-bab1-dd5cead12d3e'; // Test Detective profile
  const userId = import.meta.env.DEV && !user?.id ? MOCK_USER_ID : user?.id;

  return useQuery({
    queryKey: ["dashboard-metrics", userId],
    queryFn: async (): Promise<DashboardMetrics> => {
      if (!userId) {
        console.warn('[useDashboardMetrics] No user ID available');
        return {
          presentationsCount: 0,
          eventsRegistered: 0,
          jobsApplied: 0,
          savedJobs: 0,
        };
      }

      console.log('[useDashboardMetrics] Fetching metrics for user:', userId, import.meta.env.DEV ? '(DEV MODE)' : '');

      // Fetch all metrics in parallel
      const [presentations, eventRegs, jobApps, savedJobsData] = await Promise.all([
        // Count presentations
        supabase
          .from("presentations")
          .select("id", { count: "exact", head: true })
          .eq("profile_id", userId)
          .is("deleted_at", null),

        // Count event registrations
        supabase
          .from("registrations")
          .select("id", { count: "exact", head: true })
          .eq("profile_id", userId)
          .in("status", ["confirmed", "attended"]),

        // Count job applications
        supabase
          .from("job_applications")
          .select("id", { count: "exact", head: true })
          .eq("profile_id", userId),

        // Count saved jobs
        supabase
          .from("saved_jobs")
          .select("id", { count: "exact", head: true })
          .eq("profile_id", userId),
      ]);

      // Check for errors in individual queries
      if (presentations.error) console.error('[useDashboardMetrics] Presentations error:', presentations.error);
      if (eventRegs.error) console.error('[useDashboardMetrics] Events error:', eventRegs.error);
      if (jobApps.error) console.error('[useDashboardMetrics] Job apps error:', jobApps.error);
      if (savedJobsData.error) console.error('[useDashboardMetrics] Saved jobs error:', savedJobsData.error);

      const metrics = {
        presentationsCount: presentations.count ?? 0,
        eventsRegistered: eventRegs.count ?? 0,
        jobsApplied: jobApps.count ?? 0,
        savedJobs: savedJobsData.count ?? 0,
      };

      console.log('[useDashboardMetrics] Successfully fetched metrics:', metrics);
      return metrics;
    },
    enabled: !!userId,
    staleTime: 1000 * 30, // 30 seconds
    refetchOnWindowFocus: true,
  });
}

/**
 * Hook to fetch detailed application status breakdown
 */
export function useJobApplicationStats() {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["job-application-stats", user?.id],
    queryFn: async () => {
      if (!user?.id) {
        return {
          pending: 0,
          reviewing: 0,
          interview: 0,
          rejected: 0,
          accepted: 0,
        };
      }

      const { data, error } = await supabase
        .from("job_applications")
        .select("status")
        .eq("profile_id", user.id);

      if (error) {
        console.error("Error fetching job application stats:", error);
        return {
          pending: 0,
          reviewing: 0,
          interview: 0,
          rejected: 0,
          accepted: 0,
        };
      }

      // Count by status
      const stats = {
        pending: 0,
        reviewing: 0,
        interview: 0,
        rejected: 0,
        accepted: 0,
      };

      data?.forEach((app) => {
        if (app.status && app.status in stats) {
          stats[app.status as keyof typeof stats]++;
        }
      });

      return stats;
    },
    enabled: !!user?.id,
    staleTime: 1000 * 60, // 1 minute
  });
}
