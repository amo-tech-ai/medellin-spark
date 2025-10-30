import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

export function useApplyToJob() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (jobId: string) => {
      if (!user?.id) throw new Error("Not authenticated");

      const { error } = await supabase
        .from("job_applications")
        .upsert(
          { profile_id: user.id, job_id: jobId, status: "submitted" },
          { onConflict: "profile_id,job_id" }
        );

      if (error) throw error;
    },
    onMutate: async (jobId) => {
      await queryClient.cancelQueries({ queryKey: ["applications", user?.id] });
      const previousApps = queryClient.getQueryData(["applications", user?.id]);
      return { previousApps };
    },
    onError: (err, variables, context) => {
      if (context?.previousApps) {
        queryClient.setQueryData(["applications", user?.id], context.previousApps);
      }
      toast.error("Failed to apply to job");
      console.error(err);
    },
    onSuccess: () => {
      toast.success("Application submitted successfully");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["applications", user?.id] });
    },
  });
}
