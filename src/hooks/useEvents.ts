import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";
import type { Event } from "@/types/events";

/**
 * Hook to fetch all published events with optional registration status
 * 
 * @returns React Query result with events data
 */
export function useEvents() {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["events", user?.id],
    queryFn: async () => {
      // Fetch all published events (not deleted)
      const { data: events, error } = await supabase
        .from("events")
        .select("*")
        .eq("status", "published")
        .is("deleted_at", null)
        .order("event_date", { ascending: true })
        .limit(100);

      if (error) {
        console.error("[useEvents] Error fetching events:", error);
        throw error;
      }

      // If user is logged in, check which events they're registered for
      if (user?.id) {
        const { data: registrations } = await supabase
          .from("registrations")
          .select("event_id")
          .eq("profile_id", user.id)
          .in("status", ["confirmed", "attended"]);

        const registeredEventIds = new Set(
          registrations?.map((r) => r.event_id) ?? []
        );

        return (events ?? []).map((event) => ({
          ...event,
          is_registered: registeredEventIds.has(event.id),
        }));
      }

      return events ?? [];
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: true,
  });
}

/**
 * Hook to fetch events the user is registered for
 * Requires authentication
 */
export function useMyEvents() {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["my-events", user?.id],
    queryFn: async () => {
      if (!user?.id) {
        return [];
      }

      console.log('[useMyEvents] Fetching events for user:', user.id);

      const { data, error } = await supabase
        .from("registrations")
        .select(
          `
          *,
          events:event_id (
            id,
            title,
            description,
            event_date,
            end_date,
            image_url,
            is_virtual,
            virtual_url,
            capacity,
            registered_count
          )
        `
        )
        .eq("profile_id", user.id)
        .in("status", ["confirmed", "attended"])
        .order("created_at", { ascending: false });

      if (error) {
        console.error('[useMyEvents] Error fetching events:', error);
        throw error;
      }

      console.log('[useMyEvents] Successfully fetched events:', data?.length || 0);
      return data ?? [];
    },
    enabled: !!user?.id,
    staleTime: 1000 * 60, // 1 minute
  });
}

/**
 * Hook to register for an event
 */
export function useRegisterForEvent() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async (eventId: string) => {
      if (!user?.id) {
        throw new Error("Must be logged in to register for events");
      }

      const { data, error } = await supabase
        .from("registrations")
        .insert({
          profile_id: user.id,
          event_id: eventId,
          status: "confirmed",
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      // Invalidate events queries to update registration status
      queryClient.invalidateQueries({ queryKey: ["events"] });
      queryClient.invalidateQueries({ queryKey: ["my-events"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard-metrics"] });
    },
  });
}

/**
 * Hook to cancel event registration
 */
export function useCancelEventRegistration() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async (eventId: string) => {
      if (!user?.id) {
        throw new Error("Must be logged in to cancel registration");
      }

      const { error } = await supabase
        .from("registrations")
        .update({ status: "cancelled" })
        .eq("profile_id", user.id)
        .eq("event_id", eventId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
      queryClient.invalidateQueries({ queryKey: ["my-events"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard-metrics"] });
    },
  });
}
