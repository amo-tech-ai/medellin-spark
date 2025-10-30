import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

export function useToggleSaveJob() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ jobId, isSaved }: { jobId: string; isSaved: boolean }) => {
      if (!user?.id) throw new Error("Not authenticated");

      if (isSaved) {
        // Delete saved job
        const { error } = await supabase
          .from("saved_jobs")
          .delete()
          .eq("profile_id", user.id)
          .eq("job_id", jobId);

        if (error) throw error;
        return { action: "removed" as const };
      } else {
        // Insert saved job
        const { error } = await supabase
          .from("saved_jobs")
          .insert({ profile_id: user.id, job_id: jobId });

        if (error) throw error;
        return { action: "saved" as const };
      }
    },
    onMutate: async ({ jobId, isSaved }) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: ["saved-jobs", user?.id] });

      // Snapshot previous value
      const previousSaved = queryClient.getQueryData(["saved-jobs", user?.id]);

      // Optimistically update
      queryClient.setQueryData(["saved-jobs", user?.id], (old: any) => {
        if (!old) return old;
        if (isSaved) {
          return old.filter((item: any) => item.job_id !== jobId);
        }
        return old;
      });

      return { previousSaved };
    },
    onError: (err, variables, context) => {
      // Rollback on error
      if (context?.previousSaved) {
        queryClient.setQueryData(["saved-jobs", user?.id], context.previousSaved);
      }
      toast.error("Failed to update saved jobs");
      console.error(err);
    },
    onSuccess: (data) => {
      toast.success(data.action === "saved" ? "Job saved" : "Job removed");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["saved-jobs", user?.id] });
    },
  });
}
