export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      agencies: {
        Row: {
          id: string
          name: string
          email: string
          subscription_tier: 'free' | 'pro' | 'enterprise'
          stripe_customer_id: string | null
          stripe_subscription_id: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          email: string
          subscription_tier?: 'free' | 'pro' | 'enterprise'
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          subscription_tier?: 'free' | 'pro' | 'enterprise'
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      users: {
        Row: {
          id: string
          agency_id: string
          email: string
          full_name: string | null
          avatar_url: string | null
          role: 'owner' | 'admin' | 'member' | 'client_viewer'
          is_active: boolean
          last_login: string | null
          created_at: string
        }
        Insert: {
          id: string
          agency_id: string
          email: string
          full_name?: string | null
          avatar_url?: string | null
          role?: 'owner' | 'admin' | 'member' | 'client_viewer'
          is_active?: boolean
          last_login?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          agency_id?: string
          email?: string
          full_name?: string | null
          avatar_url?: string | null
          role?: 'owner' | 'admin' | 'member' | 'client_viewer'
          is_active?: boolean
          last_login?: string | null
          created_at?: string
        }
      }
      clients: {
        Row: {
          id: string
          agency_id: string
          name: string
          industry: string | null
          website: string | null
          target_keywords: string[] | null
          contact_name: string | null
          contact_email: string | null
          notes: string | null
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          agency_id: string
          name: string
          industry?: string | null
          website?: string | null
          target_keywords?: string[] | null
          contact_name?: string | null
          contact_email?: string | null
          notes?: string | null
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          agency_id?: string
          name?: string
          industry?: string | null
          website?: string | null
          target_keywords?: string[] | null
          contact_name?: string | null
          contact_email?: string | null
          notes?: string | null
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      monitoring_queries: {
        Row: {
          id: string
          client_id: string
          query: string
          platforms: ('chatgpt' | 'claude' | 'perplexity' | 'gemini')[]
          check_frequency: 'hourly' | 'daily' | 'weekly'
          priority: 'high' | 'medium' | 'low'
          is_active: boolean
          last_checked: string | null
          next_check: string | null
          created_at: string
        }
        Insert: {
          id?: string
          client_id: string
          query: string
          platforms?: ('chatgpt' | 'claude' | 'perplexity' | 'gemini')[]
          check_frequency?: 'hourly' | 'daily' | 'weekly'
          priority?: 'high' | 'medium' | 'low'
          is_active?: boolean
          last_checked?: string | null
          next_check?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          client_id?: string
          query?: string
          platforms?: ('chatgpt' | 'claude' | 'perplexity' | 'gemini')[]
          check_frequency?: 'hourly' | 'daily' | 'weekly'
          priority?: 'high' | 'medium' | 'low'
          is_active?: boolean
          last_checked?: string | null
          next_check?: string | null
          created_at?: string
        }
      }
      citations: {
        Row: {
          id: string
          client_id: string
          query_id: string
          platform: 'chatgpt' | 'claude' | 'perplexity' | 'gemini'
          query: string
          position: number | null
          context: string | null
          full_response: string | null
          sentiment: 'positive' | 'neutral' | 'negative'
          sentiment_score: number | null
          url: string | null
          metadata: Json | null
          detected_at: string
          created_at: string
        }
        Insert: {
          id?: string
          client_id: string
          query_id: string
          platform: 'chatgpt' | 'claude' | 'perplexity' | 'gemini'
          query: string
          position?: number | null
          context?: string | null
          full_response?: string | null
          sentiment: 'positive' | 'neutral' | 'negative'
          sentiment_score?: number | null
          url?: string | null
          metadata?: Json | null
          detected_at?: string
          created_at?: string
        }
        Update: {
          id?: string
          client_id?: string
          query_id?: string
          platform?: 'chatgpt' | 'claude' | 'perplexity' | 'gemini'
          query?: string
          position?: number | null
          context?: string | null
          full_response?: string | null
          sentiment?: 'positive' | 'neutral' | 'negative'
          sentiment_score?: number | null
          url?: string | null
          metadata?: Json | null
          detected_at?: string
          created_at?: string
        }
      }
      ad_campaigns: {
        Row: {
          id: string
          client_id: string
          name: string
          platform: 'google' | 'meta' | 'linkedin'
          campaign_type: 'search' | 'display' | 'social' | 'video'
          external_id: string | null
          budget: number | null
          spent: number
          impressions: number
          clicks: number
          conversions: number
          status: 'active' | 'paused' | 'completed'
          start_date: string | null
          end_date: string | null
          keywords: string[] | null
          last_synced: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          client_id: string
          name: string
          platform: 'google' | 'meta' | 'linkedin'
          campaign_type: 'search' | 'display' | 'social' | 'video'
          external_id?: string | null
          budget?: number | null
          spent?: number
          impressions?: number
          clicks?: number
          conversions?: number
          status?: 'active' | 'paused' | 'completed'
          start_date?: string | null
          end_date?: string | null
          keywords?: string[] | null
          last_synced?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          client_id?: string
          name?: string
          platform?: 'google' | 'meta' | 'linkedin'
          campaign_type?: 'search' | 'display' | 'social' | 'video'
          external_id?: string | null
          budget?: number | null
          spent?: number
          impressions?: number
          clicks?: number
          conversions?: number
          status?: 'active' | 'paused' | 'completed'
          start_date?: string | null
          end_date?: string | null
          keywords?: string[] | null
          last_synced?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      email_campaigns: {
        Row: {
          id: string
          agency_id: string
          name: string
          subject: string
          template_id: string | null
          recipient_list: Json | null
          recipient_count: number
          sent_count: number
          opened_count: number
          clicked_count: number
          bounced_count: number
          status: 'draft' | 'scheduled' | 'sending' | 'sent' | 'failed'
          scheduled_at: string | null
          sent_at: string | null
          created_at: string
        }
        Insert: {
          id?: string
          agency_id: string
          name: string
          subject: string
          template_id?: string | null
          recipient_list?: Json | null
          recipient_count?: number
          sent_count?: number
          opened_count?: number
          clicked_count?: number
          bounced_count?: number
          status?: 'draft' | 'scheduled' | 'sending' | 'sent' | 'failed'
          scheduled_at?: string | null
          sent_at?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          agency_id?: string
          name?: string
          subject?: string
          template_id?: string | null
          recipient_list?: Json | null
          recipient_count?: number
          sent_count?: number
          opened_count?: number
          clicked_count?: number
          bounced_count?: number
          status?: 'draft' | 'scheduled' | 'sending' | 'sent' | 'failed'
          scheduled_at?: string | null
          sent_at?: string | null
          created_at?: string
        }
      }
      scrape_jobs: {
        Row: {
          id: string
          client_id: string
          url: string
          status: 'pending' | 'running' | 'completed' | 'failed'
          pages_scraped: number
          duration_seconds: number | null
          error_message: string | null
          result_data: Json | null
          schedule: string | null
          last_run: string | null
          next_run: string | null
          created_at: string
        }
        Insert: {
          id?: string
          client_id: string
          url: string
          status?: 'pending' | 'running' | 'completed' | 'failed'
          pages_scraped?: number
          duration_seconds?: number | null
          error_message?: string | null
          result_data?: Json | null
          schedule?: string | null
          last_run?: string | null
          next_run?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          client_id?: string
          url?: string
          status?: 'pending' | 'running' | 'completed' | 'failed'
          pages_scraped?: number
          duration_seconds?: number | null
          error_message?: string | null
          result_data?: Json | null
          schedule?: string | null
          last_run?: string | null
          next_run?: string | null
          created_at?: string
        }
      }
      api_keys: {
        Row: {
          id: string
          agency_id: string
          service: string
          encrypted_key: string
          is_active: boolean
          last_used: string | null
          created_at: string
        }
        Insert: {
          id?: string
          agency_id: string
          service: string
          encrypted_key: string
          is_active?: boolean
          last_used?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          agency_id?: string
          service?: string
          encrypted_key?: string
          is_active?: boolean
          last_used?: string | null
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row']
export type TablesInsert<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Insert']
export type TablesUpdate<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Update']