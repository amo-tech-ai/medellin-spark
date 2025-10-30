import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export function useExperiences(profileId: string) {
  return useQuery({
    queryKey: ['experiences', profileId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('experiences')
        .select('*')
        .eq('profile_id', profileId)
        .order('start_date', { ascending: false });
      
      if (error) throw error;
      return data ?? [];
    },
    enabled: !!profileId,
  });
}

export function useAddExperience(profileId: string) {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (experience: {
      company: string;
      role: string;
      start_date: string;
      end_date?: string | null;
      description?: string;
      achievements?: string[];
      logo_url?: string;
    }) => {
      const { data, error } = await supabase
        .from('experiences')
        .insert({ ...experience, profile_id: profileId })
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['experiences', profileId] });
      toast.success('Experience added successfully');
    },
    onError: (error) => {
      toast.error('Failed to add experience');
      console.error(error);
    },
  });
}

export function useUpdateExperience(profileId: string) {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, ...updates }: {
      id: string;
      company?: string;
      role?: string;
      start_date?: string;
      end_date?: string | null;
      description?: string;
      achievements?: string[];
      logo_url?: string;
    }) => {
      const { data, error } = await supabase
        .from('experiences')
        .update(updates)
        .eq('id', id)
        .eq('profile_id', profileId)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['experiences', profileId] });
      toast.success('Experience updated successfully');
    },
    onError: (error) => {
      toast.error('Failed to update experience');
      console.error(error);
    },
  });
}

export function useDeleteExperience(profileId: string) {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('experiences')
        .delete()
        .eq('id', id)
        .eq('profile_id', profileId);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['experiences', profileId] });
      toast.success('Experience deleted successfully');
    },
    onError: (error) => {
      toast.error('Failed to delete experience');
      console.error(error);
    },
  });
}
