import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export function useProfile(profileId: string) {
  return useQuery({
    queryKey: ['profile', profileId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('id, full_name, avatar_url, bio, company, job_title, linkedin_url, twitter_url, website_url, email')
        .eq('id', profileId)
        .single();
      
      if (error) throw error;
      return data;
    },
    enabled: !!profileId,
  });
}
