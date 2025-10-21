import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";

export interface Event {
  id: string;
  title: string;
  description: string | null;
  start_date: string;
  end_date: string | null;
  location: string | null;
  capacity: number | null;
  category: string | null;
  image_url: string | null;
  is_active: boolean;
  created_at: string;
  registration_count?: number;
  is_registered?: boolean;
}

export interface EventRegistration {
  id: string;
  profile_id: string;
  event_id: string;
  status: "pending" | "confirmed" | "cancelled" | "attended" | "no_show";
  created_at: string;
  check_in_time: string | null;
  attended: boolean;
}

/**
 * Hook to fetch all active events
 *
 * @returns React Query result with events data
 */
export function useEvents() {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["events", user?.id],
    queryFn: async () => {
      // Fetch all active events
      const { data: events, error } = await supabase
        .from("events")
        .select("*")
        .eq("is_active", true)
        .order("start_date", { ascending: true });

      if (error) {
        console.error("Error fetching events:", error);
        throw error;
      }

      // If user is logged in, check which events they're registered for
      if (user?.id) {
        const { data: registrations } = await supabase
          .from("registrations")
          .select("event_id, status")
          .eq("profile_id", user.id)
          .in("status", ["confirmed", "attended"]);

        const registeredEventIds = new Set(
          registrations?.map((r) => r.event_id) ?? []
        );

        return (events ?? []).map((event) => ({
          ...event,
          is_registered: registeredEventIds.has(event.id),
        })) as Event[];
      }

      return (events ?? []) as Event[];
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: true,
  });
}

/**
 * Hook to fetch events the user is registered for
 */
export function useMyEvents() {
  const { user } = useAuth();

  // DEV MODE: Use existing test profile to enable Supabase query testing
  const MOCK_USER_ID = 'b67c1712-a7dd-49fe-bab1-dd5cead12d3e'; // Test Detective profile
  const userId = import.meta.env.DEV && !user?.id ? MOCK_USER_ID : user?.id;

  return useQuery({
    queryKey: ["my-events", userId],
    queryFn: async () => {
      if (!userId) {
        return [];
      }

      console.log('[useMyEvents] Fetching events for user:', userId, import.meta.env.DEV ? '(DEV MODE)' : '');

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
            image_url
          )
        `
        )
        .eq("profile_id", userId)
        .in("status", ["confirmed", "attended"])
        .order("created_at", { ascending: false });

      if (error) {
        console.error('[useMyEvents] Error fetching events:', error);
        throw error;
      }

      console.log('[useMyEvents] Successfully fetched events:', data?.length || 0);
      return data ?? [];
    },
    enabled: !!userId,
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
