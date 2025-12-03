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
      campaign_metrics: {
        Row: {
          active_vehicles: number | null
          campaign_id: string
          coverage_area: number | null
          created_at: string | null
          date: string
          estimated_impressions: number | null
          id: string
          total_distance: number | null
          updated_at: string | null
        }
        Insert: {
          active_vehicles?: number | null
          campaign_id: string
          coverage_area?: number | null
          created_at?: string | null
          date: string
          estimated_impressions?: number | null
          id?: string
          total_distance?: number | null
          updated_at?: string | null
        }
        Update: {
          active_vehicles?: number | null
          campaign_id?: string
          coverage_area?: number | null
          created_at?: string | null
          date?: string
          estimated_impressions?: number | null
          id?: string
          total_distance?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "campaign_metrics_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "campaigns"
            referencedColumns: ["id"]
          },
        ]
      }
      campaigns: {
        Row: {
          budget: number | null
          business_name: string
          campaign_name: string
          created_at: string | null
          end_date: string | null
          id: string
          start_date: string
          status: string
          target_area: string | null
          updated_at: string | null
        }
        Insert: {
          budget?: number | null
          business_name: string
          campaign_name: string
          created_at?: string | null
          end_date?: string | null
          id?: string
          start_date: string
          status?: string
          target_area?: string | null
          updated_at?: string | null
        }
        Update: {
          budget?: number | null
          business_name?: string
          campaign_name?: string
          created_at?: string | null
          end_date?: string | null
          id?: string
          start_date?: string
          status?: string
          target_area?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      contact_inquiries: {
        Row: {
          company: string | null
          created_at: string
          email: string
          id: string
          message: string
          name: string
          phone: string | null
          status: string
          updated_at: string
        }
        Insert: {
          company?: string | null
          created_at?: string
          email: string
          id?: string
          message: string
          name: string
          phone?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          company?: string | null
          created_at?: string
          email?: string
          id?: string
          message?: string
          name?: string
          phone?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      driver_applications: {
        Row: {
          additional_info: string | null
          approval_status: Database["public"]["Enums"]["approval_status"]
          city: string
          created_at: string
          email: string | null
          id: string
          license_number: string | null
          license_photo_url: string | null
          name: string
          phone: string
          registration_photo_url: string | null
          updated_at: string
          vehicle_model: string | null
          vehicle_type: string
          vehicle_year: string | null
        }
        Insert: {
          additional_info?: string | null
          approval_status?: Database["public"]["Enums"]["approval_status"]
          city: string
          created_at?: string
          email?: string | null
          id?: string
          license_number?: string | null
          license_photo_url?: string | null
          name: string
          phone: string
          registration_photo_url?: string | null
          updated_at?: string
          vehicle_model?: string | null
          vehicle_type: string
          vehicle_year?: string | null
        }
        Update: {
          additional_info?: string | null
          approval_status?: Database["public"]["Enums"]["approval_status"]
          city?: string
          created_at?: string
          email?: string | null
          id?: string
          license_number?: string | null
          license_photo_url?: string | null
          name?: string
          phone?: string
          registration_photo_url?: string | null
          updated_at?: string
          vehicle_model?: string | null
          vehicle_type?: string
          vehicle_year?: string | null
        }
        Relationships: []
      }
      geofence_events: {
        Row: {
          created_at: string | null
          event_type: string
          geofence_id: string
          id: string
          latitude: number
          longitude: number
          timestamp: string | null
          vehicle_id: string
        }
        Insert: {
          created_at?: string | null
          event_type: string
          geofence_id: string
          id?: string
          latitude: number
          longitude: number
          timestamp?: string | null
          vehicle_id: string
        }
        Update: {
          created_at?: string | null
          event_type?: string
          geofence_id?: string
          id?: string
          latitude?: number
          longitude?: number
          timestamp?: string | null
          vehicle_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "geofence_events_geofence_id_fkey"
            columns: ["geofence_id"]
            isOneToOne: false
            referencedRelation: "geofences"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "geofence_events_vehicle_id_fkey"
            columns: ["vehicle_id"]
            isOneToOne: false
            referencedRelation: "vehicles"
            referencedColumns: ["id"]
          },
        ]
      }
      geofences: {
        Row: {
          campaign_id: string
          center_lat: number
          center_lng: number
          created_at: string | null
          description: string | null
          id: string
          is_active: boolean | null
          min_impressions_threshold: number | null
          name: string
          radius_meters: number
          updated_at: string | null
        }
        Insert: {
          campaign_id: string
          center_lat: number
          center_lng: number
          created_at?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          min_impressions_threshold?: number | null
          name: string
          radius_meters?: number
          updated_at?: string | null
        }
        Update: {
          campaign_id?: string
          center_lat?: number
          center_lng?: number
          created_at?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          min_impressions_threshold?: number | null
          name?: string
          radius_meters?: number
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "geofences_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "campaigns"
            referencedColumns: ["id"]
          },
        ]
      }
      gps_tracking: {
        Row: {
          accuracy: number | null
          created_at: string | null
          heading: number | null
          id: string
          latitude: number
          longitude: number
          speed: number | null
          timestamp: string | null
          vehicle_id: string
        }
        Insert: {
          accuracy?: number | null
          created_at?: string | null
          heading?: number | null
          id?: string
          latitude: number
          longitude: number
          speed?: number | null
          timestamp?: string | null
          vehicle_id: string
        }
        Update: {
          accuracy?: number | null
          created_at?: string | null
          heading?: number | null
          id?: string
          latitude?: number
          longitude?: number
          speed?: number | null
          timestamp?: string | null
          vehicle_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "gps_tracking_vehicle_id_fkey"
            columns: ["vehicle_id"]
            isOneToOne: false
            referencedRelation: "vehicles"
            referencedColumns: ["id"]
          },
        ]
      }
      job_applications: {
        Row: {
          cover_letter: string | null
          created_at: string
          email: string
          experience: string | null
          id: string
          name: string
          phone: string
          position: string
          resume_url: string | null
          status: string
          updated_at: string
        }
        Insert: {
          cover_letter?: string | null
          created_at?: string
          email: string
          experience?: string | null
          id?: string
          name: string
          phone: string
          position: string
          resume_url?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          cover_letter?: string | null
          created_at?: string
          email?: string
          experience?: string | null
          id?: string
          name?: string
          phone?: string
          position?: string
          resume_url?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      vehicles: {
        Row: {
          campaign_id: string | null
          created_at: string | null
          driver_name: string
          id: string
          is_active: boolean | null
          phone: string
          updated_at: string | null
          vehicle_number: string
          vehicle_type: string
        }
        Insert: {
          campaign_id?: string | null
          created_at?: string | null
          driver_name: string
          id?: string
          is_active?: boolean | null
          phone: string
          updated_at?: string | null
          vehicle_number: string
          vehicle_type: string
        }
        Update: {
          campaign_id?: string | null
          created_at?: string | null
          driver_name?: string
          id?: string
          is_active?: boolean | null
          phone?: string
          updated_at?: string | null
          vehicle_number?: string
          vehicle_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "vehicles_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "campaigns"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      approval_status: "pending" | "approved" | "rejected"
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
      approval_status: ["pending", "approved", "rejected"],
    },
  },
} as const
