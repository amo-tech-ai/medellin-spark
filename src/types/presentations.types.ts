// ==================================================
// Presentation Types & Interfaces
// ==================================================
// TypeScript definitions for My Presentations page
// Created: January 13, 2025
// Design: Soft Intelligence system

// ==================================================
// ENUMS & CONSTANTS
// ==================================================

/**
 * Presentation workflow status
 * - draft: Work in progress (default)
 * - generating: AI is currently generating slides
 * - completed: Finished and ready
 * - complete: Legacy status (treat as completed)
 * - shared: Published with public link
 * - error: Generation failed
 */
export type PresentationStatus =
  | 'draft'
  | 'generating'
  | 'completed'
  | 'complete'
  | 'shared'
  | 'error';

/**
 * Template categories for organization
 */
export type TemplateCategory =
  | 'pitch-deck'
  | 'investor-deck'
  | 'product-launch'
  | 'sales-deck'
  | 'budgeting'
  | 'other';

/**
 * Sort options for My Presentations grid
 */
export type SortOption = 'recent' | 'name' | 'created';

/**
 * Filter options for My Presentations grid
 */
export type FilterOption = 'all' | 'drafts' | 'complete' | 'shared';

// ==================================================
// PRESENTATION INTERFACES
// ==================================================

/**
 * Theme configuration for presentations
 * Follows Soft Intelligence design system
 */
export interface PresentationTheme {
  primary_color: string; // e.g., "#F5A623" (Warm Amber)
  secondary_color: string; // e.g., "#4A5568" (Deep Indigo)
  font_family: string; // e.g., "Inter"
}

/**
 * Main presentation entity
 * Combines metadata, content, and theme
 */
export interface Presentation {
  id: string;
  profile_id: string; // Foreign key to profiles.id
  title: string;
  description?: string;
  content: Record<string, unknown>; // JSONB slide data
  theme: string; // Theme name (e.g., "mystique")
  image_source?: string; // "ai" | "unsplash" | "upload"
  prompt?: string; // Original AI generation prompt
  presentation_style?: string;
  language: string; // Default: "en-US"
  outline?: string[]; // Array of section titles
  search_results?: Record<string, unknown>;
  thumbnail_url?: string;
  cover_image_url?: string; // First slide or custom cover
  custom_theme_id?: string; // Foreign key to custom_themes
  is_public: boolean;
  status: PresentationStatus;
  slide_count: number;
  share_link?: string; // Unique public link token
  view_count: number;
  created_at: string; // ISO timestamp
  updated_at: string; // ISO timestamp
  last_edited_at: string; // ISO timestamp (for sorting)
  last_presented_at?: string; // ISO timestamp
  deleted_at?: string; // Soft delete timestamp
}

/**
 * Lightweight presentation card data
 * Used for grid display in My Presentations page
 */
export interface PresentationCard {
  id: string;
  title: string;
  cover_image_url?: string;
  thumbnail_url?: string;
  status: PresentationStatus;
  slide_count: number;
  created_at: string;
  last_edited_at: string;
}

/**
 * Input for creating new presentation
 */
export interface CreatePresentationInput {
  title: string;
  description?: string;
  status?: PresentationStatus;
  theme?: string;
  language?: string;
  prompt?: string;
}

/**
 * Input for updating existing presentation
 */
export interface UpdatePresentationInput {
  title?: string;
  description?: string;
  status?: PresentationStatus;
  cover_image_url?: string;
  theme?: string;
  is_public?: boolean;
  content?: Record<string, unknown>;
}

// ==================================================
// TEMPLATE INTERFACES
// ==================================================

/**
 * Presentation template entity
 * Pre-built decks for users to start with
 */
export interface Template {
  id: string;
  name: string;
  description?: string;
  cover_image_url: string;
  attribution?: string; // e.g., "By Airbnb"
  category: TemplateCategory;
  usage_count: number; // For popularity sorting
  like_count: number;
  is_premium: boolean;
  price_cents?: number; // e.g., 999 = $9.99
  tags: string[];
  slides: unknown[]; // JSONB slide definitions
  theme?: Record<string, unknown>; // JSONB theme config
  created_at: string;
  updated_at: string;
}

/**
 * Lightweight template card data
 * Used for template grid display
 */
export interface TemplateCard {
  id: string;
  name: string;
  cover_image_url: string;
  attribution?: string;
  usage_count: number;
  like_count: number;
  is_premium: boolean;
  category: TemplateCategory;
}

// ==================================================
// COMPONENT PROPS INTERFACES
// ==================================================

/**
 * Props for PageHeader component
 * Greeting + stats section at top of page
 */
export interface PageHeaderProps {
  userName: string;
  presentationCount: number;
  lastEditedAt?: string; // ISO timestamp
  weeklyActivity?: {
    created: number;
    edited: number;
  };
}

/**
 * Props for PresentationCard component
 * Individual presentation card in grid
 */
export interface PresentationCardProps {
  presentation: PresentationCard;
  onEdit: (id: string) => void;
  onDuplicate: (id: string) => void;
  onDelete: (id: string) => void;
  onShare: (id: string) => void;
  className?: string;
}

/**
 * Props for TemplateCard component
 * Template showcase card
 */
export interface TemplateCardProps {
  template: TemplateCard;
  onSelect: (id: string) => void;
  className?: string;
}

/**
 * Props for EmptyState component
 * Shown when user has no presentations
 */
export interface EmptyStateProps {
  userName: string;
  onCreateFirst: () => void;
  className?: string;
}

/**
 * Props for CreateNewSection component
 * 4 creation options (AI, Template, Blank, Budgeting)
 */
export interface CreateNewSectionProps {
  onAIGenerate: () => void;
  onUseTemplate: () => void;
  onCreateBlank: () => void;
  onBudgeting: () => void;
  className?: string;
}

/**
 * Props for MyPresentationsGrid component
 * Grid container for presentation cards
 */
export interface MyPresentationsGridProps {
  presentations: PresentationCard[];
  sortBy: SortOption;
  filterBy: FilterOption;
  onSortChange: (sort: SortOption) => void;
  onFilterChange: (filter: FilterOption) => void;
  onEdit: (id: string) => void;
  onDuplicate: (id: string) => void;
  onDelete: (id: string) => void;
  onShare: (id: string) => void;
  className?: string;
}

/**
 * Props for RecommendedTemplatesSection component
 * Template showcase at bottom of page
 */
export interface RecommendedTemplatesSectionProps {
  templates: TemplateCard[];
  onSelectTemplate: (id: string) => void;
  className?: string;
}

// ==================================================
// API RESPONSE INTERFACES
// ==================================================

/**
 * Response from get_my_presentations_stats() function
 */
export interface PresentationStats {
  total_count: number;
  draft_count: number;
  complete_count: number;
  shared_count: number;
  last_edited: string | null; // ISO timestamp
}

/**
 * Response from duplicate_presentation() function
 */
export interface DuplicatePresentationResponse {
  id: string;
  title: string;
}

/**
 * API error response
 */
export interface ApiError {
  message: string;
  code?: string;
  details?: string;
}

// ==================================================
// ZUSTAND STORE INTERFACE
// ==================================================

/**
 * Zustand store state and actions for presentations
 */
export interface PresentationsStore {
  // State
  presentations: Presentation[];
  templates: Template[];
  sortBy: SortOption;
  filterBy: FilterOption;
  isLoading: boolean;
  error: string | null;

  // Actions - Data fetching
  fetchPresentations: () => Promise<void>;
  fetchTemplates: (limit?: number) => Promise<void>;

  // Actions - Sorting & filtering
  setSortBy: (sort: SortOption) => void;
  setFilterBy: (filter: FilterOption) => void;

  // Actions - CRUD operations
  createPresentation: (data: CreatePresentationInput) => Promise<Presentation>;
  updatePresentation: (
    id: string,
    data: UpdatePresentationInput
  ) => Promise<Presentation>;
  duplicatePresentation: (id: string) => Promise<Presentation>;
  deletePresentation: (id: string) => Promise<void>;

  // Computed
  sortedAndFilteredPresentations: () => Presentation[];
}

// ==================================================
// UTILITY TYPES
// ==================================================

/**
 * Format for time-based greeting
 */
export type GreetingTime = 'morning' | 'afternoon' | 'evening';

/**
 * Card action menu item
 */
export interface CardAction {
  label: string;
  icon: string; // Lucide icon name
  onClick: () => void;
  variant?: 'default' | 'danger';
  disabled?: boolean;
}

/**
 * Toast notification for success/error messages
 */
export interface ToastMessage {
  type: 'success' | 'error' | 'info';
  title: string;
  description?: string;
  duration?: number; // ms
}
