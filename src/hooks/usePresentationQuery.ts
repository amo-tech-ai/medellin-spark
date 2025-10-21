import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";
import type { Presentation } from "./usePresentationsQuery";

/**
 * Hook to fetch a single presentation by ID
 *
 * @param presentationId - The ID of the presentation to fetch
 * @returns React Query result with presentation data
 */
export function usePresentationQuery(presentationId: string | undefined) {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["presentation", presentationId],
    queryFn: async () => {
      if (!presentationId) {
        throw new Error("Presentation ID is required");
      }

      const { data, error } = await supabase
        .from("presentations")
        .select("*")
        .eq("id", presentationId)
        .single();

      if (error) {
        console.error("Error fetching presentation:", error);
        throw error;
      }

      // Check if user has access (owns it or it's public)
      // In development mode (no user), allow access to test presentations
      const isDevMode = !user && data.profile_id === '00000000-0000-0000-0000-000000000000';
      if (!isDevMode && data.profile_id !== user?.id && !data.is_public) {
        throw new Error("Access denied: You don't have permission to view this presentation");
      }

      return data as Presentation;
    },
    enabled: !!presentationId, // Allow queries without auth for public presentations
    staleTime: 1000 * 30, // 30 seconds
    retry: 1,
  });
}

/**
 * Hook to check if current user can edit a presentation
 */
export function useCanEditPresentation(presentationId: string | undefined) {
  const { user } = useAuth();
  const { data: presentation } = usePresentationQuery(presentationId);

  return {
    canEdit: presentation?.profile_id === user?.id,
    isOwner: presentation?.profile_id === user?.id,
  };
}
