import { useCallback, useEffect, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface UseAutoSaveOptions {
  presentationId: string;
  delay?: number;
  onSaveStart?: () => void;
  onSaveComplete?: () => void;
  onSaveError?: (error: Error) => void;
}

export function useAutoSave({
  presentationId,
  delay = 2000,
  onSaveStart,
  onSaveComplete,
  onSaveError,
}: UseAutoSaveOptions) {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isSavingRef = useRef(false);

  const saveChanges = useCallback(
    async (updates: Record<string, any>) => {
      if (isSavingRef.current) return;

      isSavingRef.current = true;
      onSaveStart?.();

      try {
        const { error } = await supabase
          .from('presentations')
          .update({
            ...updates,
            updated_at: new Date().toISOString(),
            last_edited_at: new Date().toISOString(),
          })
          .eq('id', presentationId);

        if (error) throw error;

        onSaveComplete?.();
      } catch (error) {
        console.error('Auto-save error:', error);
        const err = error instanceof Error ? error : new Error('Failed to save');
        onSaveError?.(err);
        toast.error('Failed to save changes');
      } finally {
        isSavingRef.current = false;
      }
    },
    [presentationId, onSaveStart, onSaveComplete, onSaveError]
  );

  const debouncedSave = useCallback(
    (updates: Record<string, any>) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        saveChanges(updates);
      }, delay);
    },
    [saveChanges, delay]
  );

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return { debouncedSave, saveNow: saveChanges };
}
