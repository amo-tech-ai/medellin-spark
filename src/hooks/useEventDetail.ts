import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { Event } from '@/types/events';

export const useEventDetail = (eventId?: string) => {
  const [data, setData] = useState<Event | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchEvent = async () => {
    if (!eventId) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    const { data: event, error: fetchError } = await supabase
      .from('events')
      .select('*')
      .eq('id', eventId)
      .maybeSingle(); // Returns null if not found, not an error

    if (fetchError) {
      console.error('[useEventDetail] Error:', fetchError);
      setError(fetchError as unknown as Error);
    } else {
      setData(event);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    fetchEvent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eventId]);

  return { data, isLoading, error, refetch: fetchEvent };
};
