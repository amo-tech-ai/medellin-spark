-- Migration: Add Presentation AI Tables
-- Description: Create tables for Presentation AI integration (BaseDocument, Presentation, CustomTheme, GeneratedImage, FavoriteDocument)
-- Date: 2025-10-13
-- Author: Claude Code

-- =====================================================
-- PART 1: CREATE TABLES
-- =====================================================

-- Custom Types (Enums)
create type user_role as enum ('ADMIN', 'USER');
create type document_type as enum ('PRESENTATION', 'NOTE', 'DOCUMENT', 'DRAWING', 'DESIGN', 'STICKY_NOTES', 'MIND_MAP', 'RAG', 'RESEARCH_PAPER', 'FLIPBOOK');
create type presentation_style as enum ('professional', 'casual');
create type image_source as enum ('ai', 'unsplash', 'none');

-- =====================================================
-- 1. Base Document Table (Polymorphic Parent)
-- =====================================================
create table base_documents (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  type document_type not null default 'PRESENTATION',
  profile_id uuid not null references profiles(id) on delete cascade,
  thumbnail_url text,
  is_public boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

comment on table base_documents is 'Polymorphic parent table for all document types (presentations, notes, etc.)';
comment on column base_documents.type is 'Document type determines which child table to join';
comment on column base_documents.thumbnail_url is 'Preview image URL for dashboard grid view';
comment on column base_documents.is_public is 'Enables public sharing via URL';

-- =====================================================
-- 2. Presentation Table (Type-Specific Data)
-- =====================================================
create table presentations (
  id uuid primary key references base_documents(id) on delete cascade,
  content jsonb not null default '{}'::jsonb,
  theme text not null default 'default',
  image_source image_source not null default 'none',
  prompt text,
  presentation_style presentation_style not null default 'professional',
  language text not null default 'en-US',
  outline text[] not null default array[]::text[],
  search_results jsonb,
  template_id uuid,
  custom_theme_id uuid,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

comment on table presentations is 'Presentation-specific data including slides, outline, and AI metadata';
comment on column presentations.content is 'Complete slide structure as JSON (slides array with layout, content, images)';
comment on column presentations.outline is 'Array of outline topics generated during creation';
comment on column presentations.search_results is 'Tavily API search results when web search enabled';
comment on column presentations.prompt is 'Original user prompt used to generate presentation';
comment on column presentations.language is 'ISO language code (en-US, es, fr, de, etc.)';

-- =====================================================
-- 3. Custom Theme Table
-- =====================================================
create table custom_themes (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references profiles(id) on delete cascade,
  name text not null,
  description text,
  logo_url text,
  is_public boolean not null default false,
  theme_data jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

comment on table custom_themes is 'User-created presentation themes (colors, fonts, layouts)';
comment on column custom_themes.theme_data is 'Complete theme configuration: colors, fonts, spacing, layouts';
comment on column custom_themes.is_public is 'If true, theme appears in community gallery';
comment on column custom_themes.logo_url is 'Custom logo for branded presentations';

-- =====================================================
-- 4. Generated Image Table
-- =====================================================
create table generated_images (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references profiles(id) on delete cascade,
  url text not null,
  prompt text not null,
  source image_source not null default 'ai',
  created_at timestamptz not null default now()
);

comment on table generated_images is 'Track AI-generated and fetched images for caching and quota management';
comment on column generated_images.prompt is 'Text prompt used to generate image (used for caching/reuse)';
comment on column generated_images.source is 'Image source: ai (Together AI), unsplash, or none';

-- =====================================================
-- 5. Favorite Document Table (Junction Table)
-- =====================================================
create table favorite_documents (
  profile_id uuid not null references profiles(id) on delete cascade,
  document_id uuid not null references base_documents(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (profile_id, document_id)
);

comment on table favorite_documents is 'Many-to-many relationship: users can favorite multiple documents';

-- =====================================================
-- 6. Add Foreign Key for CustomTheme in Presentations
-- =====================================================
alter table presentations
  add constraint fk_presentations_custom_theme
  foreign key (custom_theme_id) references custom_themes(id) on delete set null;

-- =====================================================
-- PART 2: CREATE INDEXES
-- =====================================================

-- Base Document Indexes (Dashboard queries)
create index idx_base_documents_profile_id on base_documents(profile_id);
create index idx_base_documents_type on base_documents(type);
create index idx_base_documents_is_public on base_documents(is_public);
create index idx_base_documents_created_at on base_documents(created_at desc);
create index idx_base_documents_updated_at on base_documents(updated_at desc);

-- Composite index for common query pattern (user's presentations, sorted by date)
create index idx_base_documents_profile_type_updated on base_documents(profile_id, type, updated_at desc);

-- Presentation Indexes
create index idx_presentations_theme on presentations(theme);
create index idx_presentations_language on presentations(language);
create index idx_presentations_custom_theme_id on presentations(custom_theme_id);
create index idx_presentations_presentation_style on presentations(presentation_style);

-- Custom Theme Indexes
create index idx_custom_themes_profile_id on custom_themes(profile_id);
create index idx_custom_themes_is_public on custom_themes(is_public);
create index idx_custom_themes_created_at on custom_themes(created_at desc);

-- Generated Image Indexes (Caching lookups)
create index idx_generated_images_profile_id on generated_images(profile_id);
create index idx_generated_images_prompt on generated_images(prompt);
create index idx_generated_images_profile_prompt on generated_images(profile_id, prompt);

-- Favorite Document Indexes
create index idx_favorite_documents_profile_id on favorite_documents(profile_id);
create index idx_favorite_documents_document_id on favorite_documents(document_id);

-- =====================================================
-- PART 3: CREATE TRIGGERS
-- =====================================================

-- Trigger to update updated_at timestamp on base_documents
create or replace function update_base_documents_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger trigger_update_base_documents_updated_at
  before update on base_documents
  for each row
  execute function update_base_documents_updated_at();

-- Trigger to update updated_at timestamp on presentations
create or replace function update_presentations_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger trigger_update_presentations_updated_at
  before update on presentations
  for each row
  execute function update_presentations_updated_at();

-- Trigger to update updated_at timestamp on custom_themes
create or replace function update_custom_themes_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger trigger_update_custom_themes_updated_at
  before update on custom_themes
  for each row
  execute function update_custom_themes_updated_at();

-- Trigger to sync base_documents.updated_at when presentation is updated
create or replace function sync_base_document_updated_at()
returns trigger as $$
begin
  update base_documents
  set updated_at = new.updated_at
  where id = new.id;
  return new;
end;
$$ language plpgsql;

create trigger trigger_sync_base_document_updated_at
  after update on presentations
  for each row
  execute function sync_base_document_updated_at();

-- =====================================================
-- PART 4: ROW LEVEL SECURITY (RLS) POLICIES
-- =====================================================

-- Enable RLS on all tables
alter table base_documents enable row level security;
alter table presentations enable row level security;
alter table custom_themes enable row level security;
alter table generated_images enable row level security;
alter table favorite_documents enable row level security;

-- =====================================================
-- Base Documents Policies
-- =====================================================

-- Policy: Users can view their own documents
create policy "Users can view own documents"
  on base_documents for select
  to authenticated
  using (profile_id = current_profile_id());

-- Policy: Users can view public documents
create policy "Anyone can view public documents"
  on base_documents for select
  to authenticated, anon
  using (is_public = true);

-- Policy: Users can insert their own documents
create policy "Users can insert own documents"
  on base_documents for insert
  to authenticated
  with check (profile_id = current_profile_id());

-- Policy: Users can update their own documents
create policy "Users can update own documents"
  on base_documents for update
  to authenticated
  using (profile_id = current_profile_id());

-- Policy: Users can delete their own documents
create policy "Users can delete own documents"
  on base_documents for delete
  to authenticated
  using (profile_id = current_profile_id());

-- =====================================================
-- Presentations Policies
-- =====================================================

-- Policy: Users can view presentations they own (via base_documents)
create policy "Users can view own presentations"
  on presentations for select
  to authenticated
  using (
    exists (
      select 1 from base_documents bd
      where bd.id = presentations.id
        and bd.profile_id = current_profile_id()
    )
  );

-- Policy: Anyone can view public presentations
create policy "Anyone can view public presentations"
  on presentations for select
  to authenticated, anon
  using (
    exists (
      select 1 from base_documents bd
      where bd.id = presentations.id
        and bd.is_public = true
    )
  );

-- Policy: Users can insert presentations for their own documents
create policy "Users can insert own presentations"
  on presentations for insert
  to authenticated
  with check (
    exists (
      select 1 from base_documents bd
      where bd.id = presentations.id
        and bd.profile_id = current_profile_id()
    )
  );

-- Policy: Users can update their own presentations
create policy "Users can update own presentations"
  on presentations for update
  to authenticated
  using (
    exists (
      select 1 from base_documents bd
      where bd.id = presentations.id
        and bd.profile_id = current_profile_id()
    )
  );

-- Policy: Users can delete their own presentations
create policy "Users can delete own presentations"
  on presentations for delete
  to authenticated
  using (
    exists (
      select 1 from base_documents bd
      where bd.id = presentations.id
        and bd.profile_id = current_profile_id()
    )
  );

-- =====================================================
-- Custom Themes Policies
-- =====================================================

-- Policy: Users can view their own themes
create policy "Users can view own themes"
  on custom_themes for select
  to authenticated
  using (profile_id = current_profile_id());

-- Policy: Users can view public themes
create policy "Anyone can view public themes"
  on custom_themes for select
  to authenticated, anon
  using (is_public = true);

-- Policy: Users can insert their own themes
create policy "Users can insert own themes"
  on custom_themes for insert
  to authenticated
  with check (profile_id = current_profile_id());

-- Policy: Users can update their own themes
create policy "Users can update own themes"
  on custom_themes for update
  to authenticated
  using (profile_id = current_profile_id());

-- Policy: Users can delete their own themes
create policy "Users can delete own themes"
  on custom_themes for delete
  to authenticated
  using (profile_id = current_profile_id());

-- =====================================================
-- Generated Images Policies
-- =====================================================

-- Policy: Users can view their own images
create policy "Users can view own images"
  on generated_images for select
  to authenticated
  using (profile_id = current_profile_id());

-- Policy: Users can insert their own images
create policy "Users can insert own images"
  on generated_images for insert
  to authenticated
  with check (profile_id = current_profile_id());

-- Policy: Users can delete their own images
create policy "Users can delete own images"
  on generated_images for delete
  to authenticated
  using (profile_id = current_profile_id());

-- =====================================================
-- Favorite Documents Policies
-- =====================================================

-- Policy: Users can view their own favorites
create policy "Users can view own favorites"
  on favorite_documents for select
  to authenticated
  using (profile_id = current_profile_id());

-- Policy: Users can insert their own favorites
create policy "Users can insert own favorites"
  on favorite_documents for insert
  to authenticated
  with check (profile_id = current_profile_id());

-- Policy: Users can delete their own favorites
create policy "Users can delete own favorites"
  on favorite_documents for delete
  to authenticated
  using (profile_id = current_profile_id());

-- =====================================================
-- PART 5: HELPER FUNCTIONS
-- =====================================================

-- Function to get user's presentation count
create or replace function get_user_presentation_count(user_id uuid)
returns bigint as $$
  select count(*)
  from base_documents
  where profile_id = user_id
    and type = 'PRESENTATION'
    and deleted_at is null;
$$ language sql security definer;

-- Function to check if image prompt exists (for caching)
create or replace function get_cached_image(user_id uuid, image_prompt text)
returns text as $$
  select url
  from generated_images
  where profile_id = user_id
    and prompt = image_prompt
  order by created_at desc
  limit 1;
$$ language sql security definer;

-- Function to get user's most used themes
create or replace function get_user_theme_usage(user_id uuid)
returns table(theme_name text, usage_count bigint) as $$
  select
    coalesce(ct.name, p.theme) as theme_name,
    count(*) as usage_count
  from presentations p
  join base_documents bd on bd.id = p.id
  left join custom_themes ct on ct.id = p.custom_theme_id
  where bd.profile_id = user_id
  group by coalesce(ct.name, p.theme)
  order by usage_count desc;
$$ language sql security definer;

-- =====================================================
-- PART 6: SAMPLE DATA (Optional - Comment out for production)
-- =====================================================

-- Note: This section is commented out for production deployment
-- Uncomment for development/testing environments

/*
-- Insert sample custom theme
insert into custom_themes (profile_id, name, description, is_public, theme_data)
values (
  (select id from profiles limit 1),
  'Corporate Blue',
  'Professional blue theme for business presentations',
  true,
  '{
    "colors": {
      "primary": "#3b82f6",
      "secondary": "#8b5cf6",
      "background": "#ffffff",
      "text": "#1f2937",
      "accent": "#06b6d4"
    },
    "fonts": {
      "heading": "Inter",
      "body": "Inter"
    },
    "spacing": {
      "slide": "2rem",
      "element": "1rem"
    }
  }'::jsonb
);
*/

-- =====================================================
-- END OF MIGRATION
-- =====================================================
