import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export function useStartupProfile(profileId: string) {
  return useQuery({
    queryKey: ['startup_profile', profileId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('startup_profiles')
        .select('*')
        .eq('profile_id', profileId)
        .maybeSingle();
      
      if (error) throw error;
      return data;
    },
    enabled: !!profileId,
  });
}
