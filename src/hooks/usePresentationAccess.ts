import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { toast } from 'sonner';

export function usePresentationAccess(presentationId: string | undefined) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [hasAccess, setHasAccess] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkAccess() {
      if (!presentationId || !user) {
        setLoading(false);
        return;
      }

      try {
        const client: any = supabase;
        const { data, error } = await client
          .from('presentations')
          .select('profile_id')
          .eq('id', presentationId)
          .maybeSingle();

        if (error) throw error;
        if (!data) {
          toast.error('Presentation not found');
          navigate('/presentations');
          return;
        }

        // Check if user owns this presentation
        const userHasAccess = data.profile_id === user.id;
        setHasAccess(userHasAccess);

        if (!userHasAccess) {
          toast.error('You do not have access to this presentation');
          navigate('/presentations');
        }
      } catch (error) {
        console.error('Error checking presentation access:', error);
        toast.error('Presentation not found');
        navigate('/presentations');
      } finally {
        setLoading(false);
      }
    }

    checkAccess();
  }, [presentationId, user, navigate]);

  return { hasAccess, loading };
}
