import { useState, useCallback, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { analytics } from '@/lib/analytics';
import { useAuth } from './useAuth';

export const useEventRegistration = (eventId?: string) => {
  const { user } = useAuth();
  const [isRegistered, setIsRegistered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isChecking, setIsChecking] = useState(false);

  const checkStatus = useCallback(async () => {
    if (!eventId || !user?.id) {
      setIsRegistered(false);
      setIsChecking(false);
      return;
    }

    setIsChecking(true);

    const { count, error } = await supabase
      .from('registrations')
      .select('*', { head: true, count: 'exact' })
      .eq('event_id', eventId)
      .eq('profile_id', user.id)
      .in('status', ['confirmed', 'attended']);

    if (error) {
      console.error('[useEventRegistration] Check error:', error);
    } else {
      setIsRegistered((count || 0) > 0);
    }

    setIsChecking(false);
  }, [eventId, user?.id]);

  useEffect(() => {
    checkStatus();
  }, [checkStatus]);

  const register = useCallback(async () => {
    if (!user?.id) {
      analytics.track('Registration Failed', { eventId, reason: 'Not authenticated' });
      toast.error('Please log in to register for this event');
      return false;
    }

    if (!eventId) {
      analytics.track('Registration Failed', { reason: 'Invalid event ID' });
      toast.error('Invalid event');
      return false;
    }

    analytics.track('Registration Started', { eventId, userId: user.id });
    setIsLoading(true);

    try {
      const { error: insertError } = await supabase
        .from('registrations')
        .insert({
          event_id: eventId,
          profile_id: user.id, // CRITICAL: Uses profile_id, not user_id
          status: 'confirmed',
        });

      if (insertError) {
        // Handle duplicate registration (Postgres unique violation)
        if ((insertError as any).code === '23505') {
          analytics.track('Registration Failed', { 
            eventId, 
            reason: 'Duplicate registration',
            userId: user.id 
          });
          toast.error('You are already registered for this event');
          await checkStatus(); // Sync state
          return false;
        }

        console.error('[useEventRegistration] Register error:', insertError);
        analytics.track('Registration Failed', { 
          eventId, 
          reason: insertError.message,
          userId: user.id 
        });
        toast.error('Registration failed. Please try again.');
        return false;
      }

      analytics.track('Registration Completed', { 
        eventId, 
        userId: user.id,
        timestamp: new Date().toISOString() 
      });
      toast.success("You're registered! 🎉");
      setIsRegistered(true);
      return true;
    } catch (err) {
      console.error('[useEventRegistration] Unexpected error:', err);
      analytics.track('Registration Failed', { 
        eventId, 
        reason: 'Unexpected error',
        error: err instanceof Error ? err.message : 'Unknown',
        userId: user.id 
      });
      toast.error('Something went wrong. Please try again.');
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [eventId, user?.id, checkStatus]);

  const cancel = useCallback(async () => {
    if (!user?.id || !eventId) return false;

    analytics.track('Registration Cancellation Started', { eventId, userId: user.id });
    setIsLoading(true);

    try {
      const { error: updateError } = await supabase
        .from('registrations')
        .update({ status: 'cancelled' })
        .eq('event_id', eventId)
        .eq('profile_id', user.id);

      if (updateError) {
        console.error('[useEventRegistration] Cancel error:', updateError);
        analytics.track('Registration Cancellation Failed', { 
          eventId, 
          userId: user.id,
          error: updateError.message 
        });
        toast.error('Failed to cancel registration');
        return false;
      }

      analytics.track('Registration Cancelled', { eventId, userId: user.id });
      toast.success('Registration cancelled');
      setIsRegistered(false);
      return true;
    } catch (err) {
      console.error('[useEventRegistration] Unexpected error:', err);
      analytics.track('Registration Cancellation Failed', { 
        eventId, 
        userId: user.id,
        error: err instanceof Error ? err.message : 'Unknown' 
      });
      toast.error('Something went wrong');
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [eventId, user?.id]);

  return {
    isRegistered,
    isChecking,
    isLoading,
    register,
    cancel,
    refetch: checkStatus,
  };
};
