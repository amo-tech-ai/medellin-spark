import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";
import { useToast } from "./use-toast";
import type { Presentation } from "./usePresentationsQuery";

interface CreatePresentationInput {
  title: string;
  theme?: string;
  category?: string;
  outline?: string[];
  content?: Record<string, unknown>;
}

interface UpdatePresentationInput {
  id: string;
  title?: string;
  content?: Record<string, unknown>;
  theme?: string;
  status?: string;
  outline?: string[];
  is_public?: boolean;
  category?: string;
  slide_count?: number;
}

/**
 * Hook to create a new presentation
 */
export function useCreatePresentation() {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: CreatePresentationInput) => {
      if (!user?.id) {
        throw new Error("User not authenticated");
      }

      const { data, error } = await supabase
        .from("presentations")
        .insert({
          profile_id: user.id,
          title: input.title,
          theme: input.theme || "mystique",
          category: input.category || "general",
          outline: input.outline || [],
          content: input.content || {},
          status: "draft",
          slide_count: input.outline?.length || 0,
          is_public: false,
        })
        .select()
        .single();

      if (error) {
        console.error("Error creating presentation:", error);
        throw error;
      }

      return data as Presentation;
    },
    onSuccess: (data) => {
      // Invalidate presentations list
      queryClient.invalidateQueries({ queryKey: ["presentations"] });
      queryClient.invalidateQueries({ queryKey: ["presentation-stats"] });

      toast({
        title: "Presentation created",
        description: `"${data.title}" has been created successfully.`,
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error creating presentation",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}

/**
 * Hook to update an existing presentation
 */
export function useUpdatePresentation() {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: UpdatePresentationInput) => {
      if (!user?.id) {
        throw new Error("User not authenticated");
      }

      const { id, ...updates } = input;

      // Always update last_edited_at
      const { data, error } = await supabase
        .from("presentations")
        .update({
          ...updates,
          last_edited_at: new Date().toISOString(),
        })
        .eq("id", id)
        .eq("profile_id", user.id) // Ensure user owns it
        .select()
        .single();

      if (error) {
        console.error("Error updating presentation:", error);
        throw error;
      }

      return data as Presentation;
    },
    onSuccess: (data) => {
      // Update cache
      queryClient.invalidateQueries({ queryKey: ["presentation", data.id] });
      queryClient.invalidateQueries({ queryKey: ["presentations"] });
    },
    onError: (error: Error) => {
      console.error("Update failed:", error);
      toast({
        title: "Error saving changes",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}

/**
 * Hook to soft-delete a presentation
 */
export function useDeletePresentation() {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (presentationId: string) => {
      if (!user?.id) {
        throw new Error("User not authenticated");
      }

      const { error } = await supabase
        .from("presentations")
        .update({ deleted_at: new Date().toISOString() })
        .eq("id", presentationId)
        .eq("profile_id", user.id);

      if (error) {
        console.error("Error deleting presentation:", error);
        throw error;
      }

      return presentationId;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["presentations"] });
      queryClient.invalidateQueries({ queryKey: ["presentation-stats"] });

      toast({
        title: "Presentation deleted",
        description: "The presentation has been moved to trash.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error deleting presentation",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}

/**
 * Hook to duplicate a presentation
 */
export function useDuplicatePresentation() {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (presentationId: string) => {
      if (!user?.id) {
        throw new Error("User not authenticated");
      }

      const { data, error } = await supabase
        .rpc("duplicate_presentation", { presentation_id: presentationId });

      if (error) {
        console.error("Error duplicating presentation:", error);
        throw error;
      }

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["presentations"] });
      queryClient.invalidateQueries({ queryKey: ["presentation-stats"] });

      toast({
        title: "Presentation duplicated",
        description: "A copy has been created successfully.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error duplicating presentation",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}
