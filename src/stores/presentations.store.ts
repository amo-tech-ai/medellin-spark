// ==================================================
// Presentations Store - Zustand State Management
// ==================================================
// Global state management for My Presentations page
// Created: January 13, 2025
// Design: Soft Intelligence system

import { create } from 'zustand';
import { supabase } from '@/integrations/supabase/client';
import type {
  Presentation,
  Template,
  PresentationCard,
  CreatePresentationInput,
  UpdatePresentationInput,
  SortOption,
  FilterOption,
  PresentationsStore,
} from '@/types/presentations.types';

// ==================================================
// ZUSTAND STORE IMPLEMENTATION
// ==================================================

export const usePresentationsStore = create<PresentationsStore>((set, get) => ({
  // ==================================================
  // STATE
  // ==================================================
  presentations: [],
  templates: [],
  sortBy: 'recent',
  filterBy: 'all',
  isLoading: false,
  error: null,

  // ==================================================
  // DATA FETCHING ACTIONS
  // ==================================================

  /**
   * Fetch all presentations for the current user
   * Filters out soft-deleted presentations (deleted_at IS NULL)
   */
  fetchPresentations: async () => {
    set({ isLoading: true, error: null });

    try {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        throw new Error('User not authenticated');
      }

      const { data, error } = await supabase
        .from('presentations')
        .select('*')
        .eq('profile_id', user.id)
        .is('deleted_at', null)
        .order('last_edited_at', { ascending: false });

      if (error) throw error;

      set({ presentations: (data || []) as Presentation[], isLoading: false });
    } catch (error) {
      console.error('Error fetching presentations:', error);
      set({
        error: error instanceof Error ? error.message : 'Failed to fetch presentations',
        isLoading: false
      });
    }
  },

  /**
   * Fetch templates for "Recommended Templates" section
   * @param limit - Number of templates to fetch (default: 8)
   */
  fetchTemplates: async (limit = 8) => {
    set({ isLoading: true, error: null });

    try {
      const { data, error } = await supabase
        .from('presentation_templates')
        .select('*')
        .order('usage_count', { ascending: false })
        .limit(limit);

      if (error) throw error;

      set({ templates: (data || []) as Template[], isLoading: false });
    } catch (error) {
      console.error('Error fetching templates:', error);
      set({
        error: error instanceof Error ? error.message : 'Failed to fetch templates',
        isLoading: false
      });
    }
  },

  // ==================================================
  // SORTING & FILTERING ACTIONS
  // ==================================================

  /**
   * Update sort option for presentation grid
   */
  setSortBy: (sort: SortOption) => {
    set({ sortBy: sort });
  },

  /**
   * Update filter option for presentation grid
   */
  setFilterBy: (filter: FilterOption) => {
    set({ filterBy: filter });
  },

  // ==================================================
  // CRUD OPERATIONS
  // ==================================================

  /**
   * Create a new presentation
   */
  createPresentation: async (data: CreatePresentationInput): Promise<Presentation> => {
    set({ isLoading: true, error: null });

    try {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        throw new Error('User not authenticated');
      }

      const { data: newPresentation, error } = await supabase
        .from('presentations')
        .insert({
          profile_id: user.id,
          title: data.title,
          description: data.description,
          status: data.status || 'draft',
          theme: data.theme || 'mystique',
          language: data.language || 'en-US',
          prompt: data.prompt,
          content: {} as any,
          slide_count: 0,
          is_public: false,
          view_count: 0,
        })
        .select()
        .single();

      if (error) throw error;

      // Add to local state
      set((state) => ({
        presentations: [newPresentation as Presentation, ...state.presentations],
        isLoading: false,
      }));

      return newPresentation as Presentation;
    } catch (error) {
      console.error('Error creating presentation:', error);
      set({
        error: error instanceof Error ? error.message : 'Failed to create presentation',
        isLoading: false
      });
      throw error;
    }
  },

  /**
   * Update an existing presentation
   */
  updatePresentation: async (
    id: string,
    data: UpdatePresentationInput
  ): Promise<Presentation> => {
    set({ isLoading: true, error: null });

    try {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        throw new Error('User not authenticated');
      }

      const updateData: any = {
        ...data,
        updated_at: new Date().toISOString(),
      };
      
      // Cast content to any to satisfy Supabase Json type
      if (data.content) {
        updateData.content = data.content as any;
      }
      
      const { data: updatedPresentation, error } = await supabase
        .from('presentations')
        .update(updateData)
        .eq('id', id)
        .eq('profile_id', user.id)
        .select()
        .single();

      if (error) throw error;

      // Update local state
      set((state) => ({
        presentations: state.presentations.map((p) =>
          p.id === id ? (updatedPresentation as Presentation) : p
        ),
        isLoading: false,
      }));

      return updatedPresentation as Presentation;
    } catch (error) {
      console.error('Error updating presentation:', error);
      set({
        error: error instanceof Error ? error.message : 'Failed to update presentation',
        isLoading: false
      });
      throw error;
    }
  },

  /**
   * Duplicate a presentation using the database function
   */
  duplicatePresentation: async (id: string): Promise<Presentation> => {
    set({ isLoading: true, error: null });

    try {
      // Call the database function
      const { data, error } = await supabase.rpc('duplicate_presentation', {
        source_id: id,
      });

      if (error) throw error;

      // Fetch the newly created presentation
      const { data: newPresentation, error: fetchError } = await supabase
        .from('presentations')
        .select('*')
        .eq('id', data)
        .single();

      if (fetchError) throw fetchError;

      // Add to local state
      set((state) => ({
        presentations: [newPresentation as Presentation, ...state.presentations],
        isLoading: false,
      }));

      return newPresentation as Presentation;
    } catch (error) {
      console.error('Error duplicating presentation:', error);
      set({
        error: error instanceof Error ? error.message : 'Failed to duplicate presentation',
        isLoading: false
      });
      throw error;
    }
  },

  /**
   * Soft delete a presentation (sets deleted_at timestamp)
   */
  deletePresentation: async (id: string): Promise<void> => {
    set({ isLoading: true, error: null });

    try {
      // Call the database function for soft delete
      const { data, error } = await supabase.rpc('soft_delete_presentation', {
        presentation_id: id,
      });

      if (error) throw error;

      if (!data) {
        throw new Error('Presentation not found or already deleted');
      }

      // Remove from local state
      set((state) => ({
        presentations: state.presentations.filter((p) => p.id !== id),
        isLoading: false,
      }));
    } catch (error) {
      console.error('Error deleting presentation:', error);
      set({
        error: error instanceof Error ? error.message : 'Failed to delete presentation',
        isLoading: false
      });
      throw error;
    }
  },

  // ==================================================
  // COMPUTED / DERIVED STATE
  // ==================================================

  /**
   * Get presentations sorted and filtered based on current settings
   * @returns Sorted and filtered array of presentations
   */
  sortedAndFilteredPresentations: (): Presentation[] => {
    const { presentations, sortBy, filterBy } = get();

    // Step 1: Apply filter
    let filtered = presentations;

    switch (filterBy) {
      case 'drafts':
        filtered = presentations.filter(
          (p) => p.status === 'draft' || p.status === 'generating'
        );
        break;
      case 'complete':
        filtered = presentations.filter(
          (p) => p.status === 'completed' || p.status === 'complete'
        );
        break;
      case 'shared':
        filtered = presentations.filter((p) => p.status === 'shared');
        break;
      case 'all':
      default:
        filtered = presentations;
    }

    // Step 2: Apply sort
    const sorted = [...filtered];

    switch (sortBy) {
      case 'recent':
        sorted.sort(
          (a, b) =>
            new Date(b.last_edited_at).getTime() -
            new Date(a.last_edited_at).getTime()
        );
        break;
      case 'name':
        sorted.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'created':
        sorted.sort(
          (a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
        break;
      default:
        // Default to recent
        sorted.sort(
          (a, b) =>
            new Date(b.last_edited_at).getTime() -
            new Date(a.last_edited_at).getTime()
        );
    }

    return sorted;
  },
}));

// ==================================================
// HELPER HOOKS (Optional convenience wrappers)
// ==================================================

/**
 * Hook to get presentation stats for PageHeader component
 */
export const usePresentationStats = () => {
  const presentations = usePresentationsStore((state) => state.presentations);

  const totalCount = presentations.length;
  const draftCount = presentations.filter(
    (p) => p.status === 'draft' || p.status === 'generating'
  ).length;
  const completeCount = presentations.filter(
    (p) => p.status === 'completed' || p.status === 'complete'
  ).length;
  const sharedCount = presentations.filter((p) => p.status === 'shared').length;

  const lastEditedAt =
    presentations.length > 0
      ? presentations.reduce((latest, p) =>
          new Date(p.last_edited_at) > new Date(latest)
            ? p.last_edited_at
            : latest,
          presentations[0].last_edited_at
        )
      : undefined;

  return {
    totalCount,
    draftCount,
    completeCount,
    sharedCount,
    lastEditedAt,
  };
};

/**
 * Hook to get sorted and filtered presentations
 * Convenience wrapper around computed state
 */
export const useSortedPresentations = () => {
  return usePresentationsStore((state) =>
    state.sortedAndFilteredPresentations()
  );
};
