import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export function useSkills(profileId: string) {
  return useQuery({
    queryKey: ['skills', profileId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('candidate_skills')
        .select('*')
        .eq('profile_id', profileId)
        .order('level', { ascending: false });
      
      if (error) throw error;
      return data ?? [];
    },
    enabled: !!profileId,
  });
}

export function useAddSkill(profileId: string) {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (skill: {
      skill_name: string;
      category?: string;
      level: number;
      endorsements?: number;
      proof?: string;
    }) => {
      const { data, error } = await supabase
        .from('candidate_skills')
        .insert({ ...skill, profile_id: profileId })
        .select()
        .single();
      
      if (error) {
        if (error.code === '23505') {
          throw new Error('Skill already exists');
        }
        throw error;
      }
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['skills', profileId] });
      toast.success('Skill added successfully');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to add skill');
      console.error(error);
    },
  });
}

export function useUpdateSkill(profileId: string) {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, ...updates }: {
      id: string;
      skill_name?: string;
      category?: string;
      level?: number;
      endorsements?: number;
      proof?: string;
    }) => {
      const { data, error } = await supabase
        .from('candidate_skills')
        .update(updates)
        .eq('id', id)
        .eq('profile_id', profileId)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['skills', profileId] });
      toast.success('Skill updated successfully');
    },
    onError: (error) => {
      toast.error('Failed to update skill');
      console.error(error);
    },
  });
}

export function useDeleteSkill(profileId: string) {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('candidate_skills')
        .delete()
        .eq('id', id)
        .eq('profile_id', profileId);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['skills', profileId] });
      toast.success('Skill deleted successfully');
    },
    onError: (error) => {
      toast.error('Failed to delete skill');
      console.error(error);
    },
  });
}
