import { Database } from "@/integrations/supabase/types";

export type Event = Database['public']['Tables']['events']['Row'];
export type EventInsert = Database['public']['Tables']['events']['Insert'];
export type EventUpdate = Database['public']['Tables']['events']['Update'];

export type Registration = Database['public']['Tables']['registrations']['Row'];
export type RegistrationInsert = Database['public']['Tables']['registrations']['Insert'];
export type RegistrationUpdate = Database['public']['Tables']['registrations']['Update'];

export type EventStatus = Database['public']['Enums']['event_status'];
export type RegistrationStatus = Database['public']['Enums']['registration_status'];
export type PaymentStatus = Database['public']['Enums']['payment_status'];
