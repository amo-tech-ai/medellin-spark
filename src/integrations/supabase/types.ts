export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      applications: {
        Row: {
          candidate_id: string
          cover_letter: string | null
          created_at: string
          fit_score: number | null
          id: string
          job_id: string
          notes: string | null
          stage: Database["public"]["Enums"]["application_stage"]
          updated_at: string
        }
        Insert: {
          candidate_id: string
          cover_letter?: string | null
          created_at?: string
          fit_score?: number | null
          id?: string
          job_id: string
          notes?: string | null
          stage?: Database["public"]["Enums"]["application_stage"]
          updated_at?: string
        }
        Update: {
          candidate_id?: string
          cover_letter?: string | null
          created_at?: string
          fit_score?: number | null
          id?: string
          job_id?: string
          notes?: string | null
          stage?: Database["public"]["Enums"]["application_stage"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "applications_candidate_id_fkey"
            columns: ["candidate_id"]
            isOneToOne: false
            referencedRelation: "candidates"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "applications_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "jobs"
            referencedColumns: ["id"]
          },
        ]
      }
      candidate_skills: {
        Row: {
          candidate_id: string
          created_at: string
          proficiency_level: string | null
          skill_name: string
        }
        Insert: {
          candidate_id: string
          created_at?: string
          proficiency_level?: string | null
          skill_name: string
        }
        Update: {
          candidate_id?: string
          created_at?: string
          proficiency_level?: string | null
          skill_name?: string
        }
        Relationships: [
          {
            foreignKeyName: "candidate_skills_candidate_id_fkey"
            columns: ["candidate_id"]
            isOneToOne: false
            referencedRelation: "candidates"
            referencedColumns: ["id"]
          },
        ]
      }
      candidates: {
        Row: {
          created_at: string
          id: string
          open_to_opportunities: boolean
          portfolio_url: string | null
          preferred_locations: string[] | null
          preferred_remote: boolean
          profile_id: string
          resume_url: string | null
          updated_at: string
          years_experience: number | null
        }
        Insert: {
          created_at?: string
          id?: string
          open_to_opportunities?: boolean
          portfolio_url?: string | null
          preferred_locations?: string[] | null
          preferred_remote?: boolean
          profile_id: string
          resume_url?: string | null
          updated_at?: string
          years_experience?: number | null
        }
        Update: {
          created_at?: string
          id?: string
          open_to_opportunities?: boolean
          portfolio_url?: string | null
          preferred_locations?: string[] | null
          preferred_remote?: boolean
          profile_id?: string
          resume_url?: string | null
          updated_at?: string
          years_experience?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "candidates_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      companies: {
        Row: {
          created_at: string
          description: string | null
          id: string
          industry: string | null
          location: string | null
          logo_url: string | null
          name: string
          profile_id: string
          published: boolean
          size_range: string | null
          updated_at: string
          website_url: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          industry?: string | null
          location?: string | null
          logo_url?: string | null
          name: string
          profile_id: string
          published?: boolean
          size_range?: string | null
          updated_at?: string
          website_url?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          industry?: string | null
          location?: string | null
          logo_url?: string | null
          name?: string
          profile_id?: string
          published?: boolean
          size_range?: string | null
          updated_at?: string
          website_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "companies_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      custom_themes: {
        Row: {
          colors: Json
          created_at: string | null
          fonts: Json
          id: string
          is_default: boolean | null
          name: string
          profile_id: string
          updated_at: string | null
        }
        Insert: {
          colors?: Json
          created_at?: string | null
          fonts?: Json
          id?: string
          is_default?: boolean | null
          name: string
          profile_id: string
          updated_at?: string | null
        }
        Update: {
          colors?: Json
          created_at?: string | null
          fonts?: Json
          id?: string
          is_default?: boolean | null
          name?: string
          profile_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "custom_themes_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      event_venues: {
        Row: {
          created_at: string
          event_id: string
          venue_id: string
        }
        Insert: {
          created_at?: string
          event_id: string
          venue_id: string
        }
        Update: {
          created_at?: string
          event_id?: string
          venue_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "event_venues_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "event_venues_venue_id_fkey"
            columns: ["venue_id"]
            isOneToOne: false
            referencedRelation: "venues"
            referencedColumns: ["id"]
          },
        ]
      }
      events: {
        Row: {
          capacity: number | null
          created_at: string
          deleted_at: string | null
          description: string
          end_date: string | null
          event_date: string
          id: string
          image_url: string | null
          is_virtual: boolean
          organizer_id: string
          registered_count: number
          slug: string
          status: Database["public"]["Enums"]["event_status"]
          tags: string[] | null
          title: string
          updated_at: string
          virtual_url: string | null
        }
        Insert: {
          capacity?: number | null
          created_at?: string
          deleted_at?: string | null
          description: string
          end_date?: string | null
          event_date: string
          id?: string
          image_url?: string | null
          is_virtual?: boolean
          organizer_id: string
          registered_count?: number
          slug: string
          status?: Database["public"]["Enums"]["event_status"]
          tags?: string[] | null
          title: string
          updated_at?: string
          virtual_url?: string | null
        }
        Update: {
          capacity?: number | null
          created_at?: string
          deleted_at?: string | null
          description?: string
          end_date?: string | null
          event_date?: string
          id?: string
          image_url?: string | null
          is_virtual?: boolean
          organizer_id?: string
          registered_count?: number
          slug?: string
          status?: Database["public"]["Enums"]["event_status"]
          tags?: string[] | null
          title?: string
          updated_at?: string
          virtual_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "events_organizer_id_fkey"
            columns: ["organizer_id"]
            isOneToOne: false
            referencedRelation: "organizers"
            referencedColumns: ["id"]
          },
        ]
      }
      favorite_presentations: {
        Row: {
          created_at: string | null
          id: string
          presentation_id: string
          profile_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          presentation_id: string
          profile_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          presentation_id?: string
          profile_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "favorite_presentations_presentation_id_fkey"
            columns: ["presentation_id"]
            isOneToOne: false
            referencedRelation: "presentations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "favorite_presentations_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      generated_images: {
        Row: {
          created_at: string | null
          id: string
          presentation_id: string | null
          profile_id: string | null
          prompt: string
          provider: string | null
          slide_index: number
          url: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          presentation_id?: string | null
          profile_id?: string | null
          prompt: string
          provider?: string | null
          slide_index: number
          url: string
        }
        Update: {
          created_at?: string | null
          id?: string
          presentation_id?: string | null
          profile_id?: string | null
          prompt?: string
          provider?: string | null
          slide_index?: number
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "generated_images_presentation_id_fkey"
            columns: ["presentation_id"]
            isOneToOne: false
            referencedRelation: "presentations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "generated_images_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      job_applications: {
        Row: {
          applied_at: string | null
          cover_letter: string | null
          id: string
          job_id: string
          notes: string | null
          profile_id: string
          resume_url: string | null
          status: string
          updated_at: string | null
        }
        Insert: {
          applied_at?: string | null
          cover_letter?: string | null
          id?: string
          job_id: string
          notes?: string | null
          profile_id: string
          resume_url?: string | null
          status?: string
          updated_at?: string | null
        }
        Update: {
          applied_at?: string | null
          cover_letter?: string | null
          id?: string
          job_id?: string
          notes?: string | null
          profile_id?: string
          resume_url?: string | null
          status?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "job_applications_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "jobs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "job_applications_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      job_skills: {
        Row: {
          created_at: string
          job_id: string
          required: boolean
          skill_name: string
        }
        Insert: {
          created_at?: string
          job_id: string
          required?: boolean
          skill_name: string
        }
        Update: {
          created_at?: string
          job_id?: string
          required?: boolean
          skill_name?: string
        }
        Relationships: [
          {
            foreignKeyName: "job_skills_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "jobs"
            referencedColumns: ["id"]
          },
        ]
      }
      jobs: {
        Row: {
          company_id: string
          created_at: string
          deleted_at: string | null
          description: string
          id: string
          location: string | null
          remote_allowed: boolean
          requirements: string | null
          responsibilities: string | null
          salary_currency: string | null
          salary_max: number | null
          salary_min: number | null
          slug: string
          status: Database["public"]["Enums"]["job_status"]
          title: string
          type: Database["public"]["Enums"]["job_type"]
          updated_at: string
        }
        Insert: {
          company_id: string
          created_at?: string
          deleted_at?: string | null
          description: string
          id?: string
          location?: string | null
          remote_allowed?: boolean
          requirements?: string | null
          responsibilities?: string | null
          salary_currency?: string | null
          salary_max?: number | null
          salary_min?: number | null
          slug: string
          status?: Database["public"]["Enums"]["job_status"]
          title: string
          type: Database["public"]["Enums"]["job_type"]
          updated_at?: string
        }
        Update: {
          company_id?: string
          created_at?: string
          deleted_at?: string | null
          description?: string
          id?: string
          location?: string | null
          remote_allowed?: boolean
          requirements?: string | null
          responsibilities?: string | null
          salary_currency?: string | null
          salary_max?: number | null
          salary_min?: number | null
          slug?: string
          status?: Database["public"]["Enums"]["job_status"]
          title?: string
          type?: Database["public"]["Enums"]["job_type"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "jobs_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      matches: {
        Row: {
          candidate_id: string
          created_at: string
          id: string
          job_id: string
          match_score: number
          reasons: string[] | null
        }
        Insert: {
          candidate_id: string
          created_at?: string
          id?: string
          job_id: string
          match_score: number
          reasons?: string[] | null
        }
        Update: {
          candidate_id?: string
          created_at?: string
          id?: string
          job_id?: string
          match_score?: number
          reasons?: string[] | null
        }
        Relationships: [
          {
            foreignKeyName: "matches_candidate_id_fkey"
            columns: ["candidate_id"]
            isOneToOne: false
            referencedRelation: "candidates"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "matches_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "jobs"
            referencedColumns: ["id"]
          },
        ]
      }
      organizers: {
        Row: {
          contact_email: string
          created_at: string
          description: string | null
          id: string
          logo_url: string | null
          name: string
          profile_id: string
          updated_at: string
          website_url: string | null
        }
        Insert: {
          contact_email: string
          created_at?: string
          description?: string | null
          id?: string
          logo_url?: string | null
          name: string
          profile_id: string
          updated_at?: string
          website_url?: string | null
        }
        Update: {
          contact_email?: string
          created_at?: string
          description?: string | null
          id?: string
          logo_url?: string | null
          name?: string
          profile_id?: string
          updated_at?: string
          website_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "organizers_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      perk_claims: {
        Row: {
          approval_notes: string | null
          approved_at: string | null
          claim_details: Json | null
          claimed_at: string
          created_at: string
          expires_at: string | null
          id: string
          perk_id: string
          redeemed_at: string | null
          startup_profile_id: string
          status: Database["public"]["Enums"]["claim_status"]
          updated_at: string
        }
        Insert: {
          approval_notes?: string | null
          approved_at?: string | null
          claim_details?: Json | null
          claimed_at?: string
          created_at?: string
          expires_at?: string | null
          id?: string
          perk_id: string
          redeemed_at?: string | null
          startup_profile_id: string
          status?: Database["public"]["Enums"]["claim_status"]
          updated_at?: string
        }
        Update: {
          approval_notes?: string | null
          approved_at?: string | null
          claim_details?: Json | null
          claimed_at?: string
          created_at?: string
          expires_at?: string | null
          id?: string
          perk_id?: string
          redeemed_at?: string | null
          startup_profile_id?: string
          status?: Database["public"]["Enums"]["claim_status"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "perk_claims_perk_id_fkey"
            columns: ["perk_id"]
            isOneToOne: false
            referencedRelation: "perks"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "perk_claims_startup_profile_id_fkey"
            columns: ["startup_profile_id"]
            isOneToOne: false
            referencedRelation: "startup_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      perks: {
        Row: {
          active: boolean
          category: string
          created_at: string
          description: string
          eligibility_criteria: string | null
          featured: boolean
          how_to_claim: string
          id: string
          provider_logo_url: string | null
          provider_name: string
          slug: string
          terms_url: string | null
          title: string
          updated_at: string
          value_description: string | null
        }
        Insert: {
          active?: boolean
          category: string
          created_at?: string
          description: string
          eligibility_criteria?: string | null
          featured?: boolean
          how_to_claim: string
          id?: string
          provider_logo_url?: string | null
          provider_name: string
          slug: string
          terms_url?: string | null
          title: string
          updated_at?: string
          value_description?: string | null
        }
        Update: {
          active?: boolean
          category?: string
          created_at?: string
          description?: string
          eligibility_criteria?: string | null
          featured?: boolean
          how_to_claim?: string
          id?: string
          provider_logo_url?: string | null
          provider_name?: string
          slug?: string
          terms_url?: string | null
          title?: string
          updated_at?: string
          value_description?: string | null
        }
        Relationships: []
      }
      pitch_conversations: {
        Row: {
          collected_data: Json
          created_at: string
          deck_id: string | null
          id: string
          messages: Json
          profile_id: string
          status: string | null
          updated_at: string
        }
        Insert: {
          collected_data?: Json
          created_at?: string
          deck_id?: string | null
          id?: string
          messages?: Json
          profile_id: string
          status?: string | null
          updated_at?: string
        }
        Update: {
          collected_data?: Json
          created_at?: string
          deck_id?: string | null
          id?: string
          messages?: Json
          profile_id?: string
          status?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      presentation_templates: {
        Row: {
          attribution: string | null
          category: string
          cover_image_url: string
          created_at: string | null
          description: string | null
          id: string
          is_premium: boolean | null
          like_count: number | null
          name: string
          price_cents: number | null
          slides: Json
          tags: string[] | null
          theme: Json | null
          updated_at: string | null
          usage_count: number | null
        }
        Insert: {
          attribution?: string | null
          category?: string
          cover_image_url: string
          created_at?: string | null
          description?: string | null
          id?: string
          is_premium?: boolean | null
          like_count?: number | null
          name: string
          price_cents?: number | null
          slides?: Json
          tags?: string[] | null
          theme?: Json | null
          updated_at?: string | null
          usage_count?: number | null
        }
        Update: {
          attribution?: string | null
          category?: string
          cover_image_url?: string
          created_at?: string | null
          description?: string | null
          id?: string
          is_premium?: boolean | null
          like_count?: number | null
          name?: string
          price_cents?: number | null
          slides?: Json
          tags?: string[] | null
          theme?: Json | null
          updated_at?: string | null
          usage_count?: number | null
        }
        Relationships: []
      }
      presentations: {
        Row: {
          category: string | null
          content: Json
          cover_image_url: string | null
          created_at: string | null
          custom_theme_id: string | null
          deleted_at: string | null
          description: string | null
          id: string
          image_source: string | null
          is_public: boolean | null
          language: string | null
          last_edited_at: string | null
          last_presented_at: string | null
          outline: string[] | null
          presentation_style: string | null
          profile_id: string
          prompt: string | null
          search_results: Json | null
          share_link: string | null
          slide_count: number | null
          status: string | null
          template_id: string | null
          theme: string | null
          thumbnail_url: string | null
          title: string
          updated_at: string | null
          view_count: number | null
        }
        Insert: {
          category?: string | null
          content?: Json
          cover_image_url?: string | null
          created_at?: string | null
          custom_theme_id?: string | null
          deleted_at?: string | null
          description?: string | null
          id?: string
          image_source?: string | null
          is_public?: boolean | null
          language?: string | null
          last_edited_at?: string | null
          last_presented_at?: string | null
          outline?: string[] | null
          presentation_style?: string | null
          profile_id: string
          prompt?: string | null
          search_results?: Json | null
          share_link?: string | null
          slide_count?: number | null
          status?: string | null
          template_id?: string | null
          theme?: string | null
          thumbnail_url?: string | null
          title: string
          updated_at?: string | null
          view_count?: number | null
        }
        Update: {
          category?: string | null
          content?: Json
          cover_image_url?: string | null
          created_at?: string | null
          custom_theme_id?: string | null
          deleted_at?: string | null
          description?: string | null
          id?: string
          image_source?: string | null
          is_public?: boolean | null
          language?: string | null
          last_edited_at?: string | null
          last_presented_at?: string | null
          outline?: string[] | null
          presentation_style?: string | null
          profile_id?: string
          prompt?: string | null
          search_results?: Json | null
          share_link?: string | null
          slide_count?: number | null
          status?: string | null
          template_id?: string | null
          theme?: string | null
          thumbnail_url?: string | null
          title?: string
          updated_at?: string | null
          view_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "presentations_custom_theme_id_fkey"
            columns: ["custom_theme_id"]
            isOneToOne: false
            referencedRelation: "custom_themes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "presentations_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "presentations_template_id_fkey"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "presentation_templates"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          company: string | null
          created_at: string
          email: string
          full_name: string
          id: string
          job_title: string | null
          linkedin_url: string | null
          twitter_url: string | null
          updated_at: string
          user_id: string
          website_url: string | null
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          company?: string | null
          created_at?: string
          email: string
          full_name: string
          id?: string
          job_title?: string | null
          linkedin_url?: string | null
          twitter_url?: string | null
          updated_at?: string
          user_id: string
          website_url?: string | null
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          company?: string | null
          created_at?: string
          email?: string
          full_name?: string
          id?: string
          job_title?: string | null
          linkedin_url?: string | null
          twitter_url?: string | null
          updated_at?: string
          user_id?: string
          website_url?: string | null
        }
        Relationships: []
      }
      registrations: {
        Row: {
          attended: boolean
          check_in_time: string | null
          created_at: string
          event_id: string
          id: string
          payment_amount: number | null
          payment_reference: string | null
          payment_status: Database["public"]["Enums"]["payment_status"]
          profile_id: string
          status: Database["public"]["Enums"]["registration_status"]
          ticket_id: string | null
          updated_at: string
        }
        Insert: {
          attended?: boolean
          check_in_time?: string | null
          created_at?: string
          event_id: string
          id?: string
          payment_amount?: number | null
          payment_reference?: string | null
          payment_status?: Database["public"]["Enums"]["payment_status"]
          profile_id: string
          status?: Database["public"]["Enums"]["registration_status"]
          ticket_id?: string | null
          updated_at?: string
        }
        Update: {
          attended?: boolean
          check_in_time?: string | null
          created_at?: string
          event_id?: string
          id?: string
          payment_amount?: number | null
          payment_reference?: string | null
          payment_status?: Database["public"]["Enums"]["payment_status"]
          profile_id?: string
          status?: Database["public"]["Enums"]["registration_status"]
          ticket_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "registrations_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "registrations_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "registrations_ticket_id_fkey"
            columns: ["ticket_id"]
            isOneToOne: false
            referencedRelation: "tickets"
            referencedColumns: ["id"]
          },
        ]
      }
      saved_jobs: {
        Row: {
          id: string
          job_id: string
          notes: string | null
          profile_id: string
          saved_at: string | null
        }
        Insert: {
          id?: string
          job_id: string
          notes?: string | null
          profile_id: string
          saved_at?: string | null
        }
        Update: {
          id?: string
          job_id?: string
          notes?: string | null
          profile_id?: string
          saved_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "saved_jobs_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "jobs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "saved_jobs_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      saved_perks: {
        Row: {
          created_at: string
          perk_id: string
          startup_profile_id: string
        }
        Insert: {
          created_at?: string
          perk_id: string
          startup_profile_id: string
        }
        Update: {
          created_at?: string
          perk_id?: string
          startup_profile_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "saved_perks_perk_id_fkey"
            columns: ["perk_id"]
            isOneToOne: false
            referencedRelation: "perks"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "saved_perks_startup_profile_id_fkey"
            columns: ["startup_profile_id"]
            isOneToOne: false
            referencedRelation: "startup_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      sponsors: {
        Row: {
          company_name: string
          created_at: string
          description: string | null
          event_id: string
          id: string
          logo_url: string | null
          tier: Database["public"]["Enums"]["sponsor_tier"]
          updated_at: string
          website_url: string | null
        }
        Insert: {
          company_name: string
          created_at?: string
          description?: string | null
          event_id: string
          id?: string
          logo_url?: string | null
          tier: Database["public"]["Enums"]["sponsor_tier"]
          updated_at?: string
          website_url?: string | null
        }
        Update: {
          company_name?: string
          created_at?: string
          description?: string | null
          event_id?: string
          id?: string
          logo_url?: string | null
          tier?: Database["public"]["Enums"]["sponsor_tier"]
          updated_at?: string
          website_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "sponsors_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
        ]
      }
      startup_profiles: {
        Row: {
          company_name: string
          created_at: string
          description: string | null
          id: string
          industry: string | null
          logo_url: string | null
          profile_id: string
          stage: string | null
          team_size: number | null
          updated_at: string
          verified: boolean
          website_url: string | null
        }
        Insert: {
          company_name: string
          created_at?: string
          description?: string | null
          id?: string
          industry?: string | null
          logo_url?: string | null
          profile_id: string
          stage?: string | null
          team_size?: number | null
          updated_at?: string
          verified?: boolean
          website_url?: string | null
        }
        Update: {
          company_name?: string
          created_at?: string
          description?: string | null
          id?: string
          industry?: string | null
          logo_url?: string | null
          profile_id?: string
          stage?: string | null
          team_size?: number | null
          updated_at?: string
          verified?: boolean
          website_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "startup_profiles_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      tickets: {
        Row: {
          capacity: number | null
          created_at: string
          description: string | null
          early_bird: boolean
          early_bird_deadline: string | null
          event_id: string
          id: string
          name: string
          price: number
          sold_count: number
          updated_at: string
        }
        Insert: {
          capacity?: number | null
          created_at?: string
          description?: string | null
          early_bird?: boolean
          early_bird_deadline?: string | null
          event_id: string
          id?: string
          name: string
          price?: number
          sold_count?: number
          updated_at?: string
        }
        Update: {
          capacity?: number | null
          created_at?: string
          description?: string | null
          early_bird?: boolean
          early_bird_deadline?: string | null
          event_id?: string
          id?: string
          name?: string
          price?: number
          sold_count?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "tickets_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
        ]
      }
      venues: {
        Row: {
          address: string
          amenities: string[] | null
          capacity: number | null
          city: string
          country: string
          created_at: string
          created_by: string | null
          description: string | null
          id: string
          image_url: string | null
          latitude: number | null
          longitude: number | null
          name: string
          updated_at: string
        }
        Insert: {
          address: string
          amenities?: string[] | null
          capacity?: number | null
          city?: string
          country?: string
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          latitude?: number | null
          longitude?: number | null
          name: string
          updated_at?: string
        }
        Update: {
          address?: string
          amenities?: string[] | null
          capacity?: number | null
          city?: string
          country?: string
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          latitude?: number | null
          longitude?: number | null
          name?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "venues_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      waitlist: {
        Row: {
          created_at: string
          event_id: string
          id: string
          notified: boolean
          position: number
          profile_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          event_id: string
          id?: string
          notified?: boolean
          position: number
          profile_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          event_id?: string
          id?: string
          notified?: boolean
          position?: number
          profile_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "waitlist_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "waitlist_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      wizard_sessions: {
        Row: {
          completed: boolean
          created_at: string
          deck_url: string | null
          id: string
          profile_id: string
          session_data: Json
          startup_name: string
          updated_at: string
        }
        Insert: {
          completed?: boolean
          created_at?: string
          deck_url?: string | null
          id?: string
          profile_id: string
          session_data?: Json
          startup_name: string
          updated_at?: string
        }
        Update: {
          completed?: boolean
          created_at?: string
          deck_url?: string | null
          id?: string
          profile_id?: string
          session_data?: Json
          startup_name?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "wizard_sessions_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      citext: {
        Args: { "": boolean } | { "": string } | { "": unknown }
        Returns: string
      }
      citext_hash: {
        Args: { "": string }
        Returns: number
      }
      citextin: {
        Args: { "": unknown }
        Returns: string
      }
      citextout: {
        Args: { "": string }
        Returns: unknown
      }
      citextrecv: {
        Args: { "": unknown }
        Returns: string
      }
      citextsend: {
        Args: { "": string }
        Returns: string
      }
      count_deck_slides: {
        Args: { deck_uuid: string }
        Returns: number
      }
      current_profile_id: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      duplicate_presentation: {
        Args: { source_id: string }
        Returns: string
      }
      get_application_count_by_status: {
        Args: { user_id: string }
        Returns: {
          count: number
          status: string
        }[]
      }
      get_my_presentations_stats: {
        Args: { user_profile_id: string }
        Returns: {
          complete_count: number
          draft_count: number
          last_edited: string
          shared_count: number
          total_count: number
        }[]
      }
      get_pitch_deck_with_slides: {
        Args: { deck_uuid: string }
        Returns: Json
      }
      get_presentation_stats: {
        Args: { user_id: string }
        Returns: {
          completed_presentations: number
          draft_presentations: number
          public_presentations: number
          total_favorites: number
          total_presentations: number
        }[]
      }
      get_presentations_with_favorites: {
        Args: { user_id: string }
        Returns: {
          content: Json
          created_at: string
          id: string
          is_favorited: boolean
          is_public: boolean
          profile_id: string
          status: string
          theme: string
          thumbnail_url: string
          title: string
          updated_at: string
        }[]
      }
      get_saved_jobs_count: {
        Args: { user_id: string }
        Returns: number
      }
      get_user_deck_count: {
        Args: { user_uuid: string }
        Returns: number
      }
      has_role: {
        Args: { role_name: string }
        Returns: boolean
      }
      is_owner: {
        Args: { owner_column?: string; record_id: string; table_name: string }
        Returns: boolean
      }
      soft_delete_presentation: {
        Args: { presentation_id: string }
        Returns: boolean
      }
    }
    Enums: {
      application_stage:
        | "submitted"
        | "screening"
        | "interview"
        | "offer"
        | "hired"
        | "rejected"
      claim_status: "pending" | "approved" | "redeemed" | "expired" | "rejected"
      event_status: "draft" | "published" | "cancelled" | "completed"
      job_status: "draft" | "published" | "closed" | "filled"
      job_type: "full_time" | "part_time" | "contract" | "internship"
      payment_status: "pending" | "completed" | "failed" | "refunded"
      registration_status:
        | "pending"
        | "confirmed"
        | "cancelled"
        | "attended"
        | "no_show"
      sponsor_tier: "platinum" | "gold" | "silver" | "bronze"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      application_stage: [
        "submitted",
        "screening",
        "interview",
        "offer",
        "hired",
        "rejected",
      ],
      claim_status: ["pending", "approved", "redeemed", "expired", "rejected"],
      event_status: ["draft", "published", "cancelled", "completed"],
      job_status: ["draft", "published", "closed", "filled"],
      job_type: ["full_time", "part_time", "contract", "internship"],
      payment_status: ["pending", "completed", "failed", "refunded"],
      registration_status: [
        "pending",
        "confirmed",
        "cancelled",
        "attended",
        "no_show",
      ],
      sponsor_tier: ["platinum", "gold", "silver", "bronze"],
    },
  },
} as const
