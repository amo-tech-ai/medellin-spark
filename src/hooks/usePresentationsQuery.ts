import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";

export interface Presentation {
  id: string;
  profile_id: string;
  title: string;
  content: Record<string, unknown>; // JSONB
  theme: string | null;
  status: string | null;
  created_at: string | null;
  updated_at: string | null;
  last_edited_at: string | null;
  slide_count: number | null;
  thumbnail_url: string | null;
  deleted_at: string | null;
  is_public: boolean | null;
  outline: string[] | null;
  description: string | null;
  category: string | null;
}

export interface PresentationsQueryOptions {
  includeDeleted?: boolean;
  status?: string;
  category?: string;
}

/**
 * Hook to fetch all presentations for the current user
 *
 * @param options - Query options to filter presentations
 * @returns React Query result with presentations data
 */
export function usePresentationsQuery(options: PresentationsQueryOptions = {}) {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["presentations", user?.id, options],
    queryFn: async () => {
      if (!user?.id) {
        throw new Error("User not authenticated");
      }

      let query = supabase
        .from("presentations")
        .select("*")
        .eq("profile_id", user.id)
        .order("updated_at", { ascending: false });

      // Filter out deleted presentations by default
      if (!options.includeDeleted) {
        query = query.is("deleted_at", null);
      }

      // Filter by status if provided
      if (options.status) {
        query = query.eq("status", options.status);
      }

      // Filter by category if provided
      if (options.category) {
        query = query.eq("category", options.category);
      }

      const { data, error } = await query;

      if (error) {
        console.error("Error fetching presentations:", error);
        throw error;
      }

      return (data as Presentation[]) || [];
    },
    enabled: !!user?.id,
    staleTime: 1000 * 60, // 1 minute
    refetchOnWindowFocus: true,
  });
}

/**
 * Hook to get presentation statistics
 */
export function usePresentationStats() {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["presentation-stats", user?.id],
    queryFn: async () => {
      if (!user?.id) {
        return { total: 0, drafts: 0, completed: 0 };
      }

      const { data, error } = await supabase
        .rpc("get_my_presentations_stats")
        .single();

      if (error) {
        console.error("Error fetching stats:", error);
        return { total: 0, drafts: 0, completed: 0 };
      }

      return data || { total: 0, drafts: 0, completed: 0 };
    },
    enabled: !!user?.id,
    staleTime: 1000 * 30, // 30 seconds
  });
}
