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
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      admissions: {
        Row: {
          academic_year: string | null
          application_no: string | null
          child_dob: string | null
          child_name: string
          choice_level: string | null
          class_of_interest: string
          created_at: string
          current_school: string | null
          home_language: string | null
          id: string
          kcpe_index: string | null
          last_grade: string | null
          learner_gender: string | null
          message: string | null
          nationality: string | null
          other_remarks: string | null
          parent_address: string | null
          parent_email: string
          parent_id_no: string | null
          parent_name: string
          parent_phone: string
          parent_relationship: string | null
          place_of_birth: string | null
          preferred_grade: string | null
          religion: string | null
          special_needs: string | null
          status: string
          updated_at: string
        }
        Insert: {
          academic_year?: string | null
          application_no?: string | null
          child_dob?: string | null
          child_name: string
          choice_level?: string | null
          class_of_interest: string
          created_at?: string
          current_school?: string | null
          home_language?: string | null
          id?: string
          kcpe_index?: string | null
          last_grade?: string | null
          learner_gender?: string | null
          message?: string | null
          nationality?: string | null
          other_remarks?: string | null
          parent_address?: string | null
          parent_email: string
          parent_id_no?: string | null
          parent_name: string
          parent_phone: string
          parent_relationship?: string | null
          place_of_birth?: string | null
          preferred_grade?: string | null
          religion?: string | null
          special_needs?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          academic_year?: string | null
          application_no?: string | null
          child_dob?: string | null
          child_name?: string
          choice_level?: string | null
          class_of_interest?: string
          created_at?: string
          current_school?: string | null
          home_language?: string | null
          id?: string
          kcpe_index?: string | null
          last_grade?: string | null
          learner_gender?: string | null
          message?: string | null
          nationality?: string | null
          other_remarks?: string | null
          parent_address?: string | null
          parent_email?: string
          parent_id_no?: string | null
          parent_name?: string
          parent_phone?: string
          parent_relationship?: string | null
          place_of_birth?: string | null
          preferred_grade?: string | null
          religion?: string | null
          special_needs?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      donations: {
        Row: {
          amount: number
          created_at: string
          currency: string
          designation: string
          donor_email: string
          donor_name: string
          donor_phone: string | null
          frequency: string
          id: string
          message: string | null
          method: string
          reference: string | null
          status: string
          updated_at: string
        }
        Insert: {
          amount: number
          created_at?: string
          currency?: string
          designation?: string
          donor_email: string
          donor_name: string
          donor_phone?: string | null
          frequency?: string
          id?: string
          message?: string | null
          method: string
          reference?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          amount?: number
          created_at?: string
          currency?: string
          designation?: string
          donor_email?: string
          donor_name?: string
          donor_phone?: string | null
          frequency?: string
          id?: string
          message?: string | null
          method?: string
          reference?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      event_registrations: {
        Row: {
          created_at: string
          email: string
          event_id: string | null
          id: string
          name: string
          notes: string | null
          phone: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          email: string
          event_id?: string | null
          id?: string
          name: string
          notes?: string | null
          phone?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string
          event_id?: string | null
          id?: string
          name?: string
          notes?: string | null
          phone?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "event_registrations_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
        ]
      }
      events: {
        Row: {
          cover_url: string | null
          created_at: string
          description: string | null
          id: string
          location: string | null
          starts_at: string
          title: string
          updated_at: string
        }
        Insert: {
          cover_url?: string | null
          created_at?: string
          description?: string | null
          id?: string
          location?: string | null
          starts_at: string
          title: string
          updated_at?: string
        }
        Update: {
          cover_url?: string | null
          created_at?: string
          description?: string | null
          id?: string
          location?: string | null
          starts_at?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      gallery_items: {
        Row: {
          caption: string | null
          created_at: string
          id: string
          kind: string
          section: string
          title: string | null
          updated_at: string
          url: string
        }
        Insert: {
          caption?: string | null
          created_at?: string
          id?: string
          kind?: string
          section: string
          title?: string | null
          updated_at?: string
          url: string
        }
        Update: {
          caption?: string | null
          created_at?: string
          id?: string
          kind?: string
          section?: string
          title?: string | null
          updated_at?: string
          url?: string
        }
        Relationships: []
      }
      inquiries: {
        Row: {
          category: string
          created_at: string
          email: string
          id: string
          message: string
          name: string
          phone: string | null
          status: string
          subject: string | null
          updated_at: string
        }
        Insert: {
          category?: string
          created_at?: string
          email: string
          id?: string
          message: string
          name: string
          phone?: string | null
          status?: string
          subject?: string | null
          updated_at?: string
        }
        Update: {
          category?: string
          created_at?: string
          email?: string
          id?: string
          message?: string
          name?: string
          phone?: string | null
          status?: string
          subject?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      live_settings: {
        Row: {
          id: string
          is_live: boolean
          message: string | null
          upcoming_at: string | null
          upcoming_title: string | null
          updated_at: string
          youtube_url: string | null
        }
        Insert: {
          id?: string
          is_live?: boolean
          message?: string | null
          upcoming_at?: string | null
          upcoming_title?: string | null
          updated_at?: string
          youtube_url?: string | null
        }
        Update: {
          id?: string
          is_live?: boolean
          message?: string | null
          upcoming_at?: string | null
          upcoming_title?: string | null
          updated_at?: string
          youtube_url?: string | null
        }
        Relationships: []
      }
      prayer_requests: {
        Row: {
          created_at: string
          email: string | null
          id: string
          is_private: boolean
          name: string
          request: string
          status: string
        }
        Insert: {
          created_at?: string
          email?: string | null
          id?: string
          is_private?: boolean
          name: string
          request: string
          status?: string
        }
        Update: {
          created_at?: string
          email?: string | null
          id?: string
          is_private?: boolean
          name?: string
          request?: string
          status?: string
        }
        Relationships: []
      }
      properties_projects: {
        Row: {
          cover_url: string | null
          created_at: string
          description: string | null
          id: string
          location: string
          price_from: string | null
          status: string | null
          title: string
          updated_at: string
        }
        Insert: {
          cover_url?: string | null
          created_at?: string
          description?: string | null
          id?: string
          location: string
          price_from?: string | null
          status?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          cover_url?: string | null
          created_at?: string
          description?: string | null
          id?: string
          location?: string
          price_from?: string | null
          status?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      sponsorships: {
        Row: {
          amount_usd: number | null
          cause: string | null
          created_at: string
          email: string
          id: string
          message: string | null
          phone: string | null
          sponsor_name: string
          status: string
          tier: string
          updated_at: string
        }
        Insert: {
          amount_usd?: number | null
          cause?: string | null
          created_at?: string
          email: string
          id?: string
          message?: string | null
          phone?: string | null
          sponsor_name: string
          status?: string
          tier: string
          updated_at?: string
        }
        Update: {
          amount_usd?: number | null
          cause?: string | null
          created_at?: string
          email?: string
          id?: string
          message?: string | null
          phone?: string | null
          sponsor_name?: string
          status?: string
          tier?: string
          updated_at?: string
        }
        Relationships: []
      }
      tour_bookings: {
        Row: {
          adults: number | null
          children: number | null
          created_at: string
          email: string
          full_name: string
          id: string
          notes: string | null
          package: string
          phone: string
          status: string
          travel_date: string | null
          updated_at: string
        }
        Insert: {
          adults?: number | null
          children?: number | null
          created_at?: string
          email: string
          full_name: string
          id?: string
          notes?: string | null
          package: string
          phone: string
          status?: string
          travel_date?: string | null
          updated_at?: string
        }
        Update: {
          adults?: number | null
          children?: number | null
          created_at?: string
          email?: string
          full_name?: string
          id?: string
          notes?: string | null
          package?: string
          phone?: string
          status?: string
          travel_date?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      tour_packages: {
        Row: {
          cover_url: string | null
          created_at: string
          description: string | null
          destination: string
          duration_days: number | null
          id: string
          price_from: string | null
          title: string
          updated_at: string
        }
        Insert: {
          cover_url?: string | null
          created_at?: string
          description?: string | null
          destination: string
          duration_days?: number | null
          id?: string
          price_from?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          cover_url?: string | null
          created_at?: string
          description?: string | null
          destination?: string
          duration_days?: number | null
          id?: string
          price_from?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      volunteer_signups: {
        Row: {
          availability: string | null
          cause: string | null
          created_at: string
          email: string
          full_name: string
          id: string
          phone: string
          skills: string | null
          status: string
          updated_at: string
        }
        Insert: {
          availability?: string | null
          cause?: string | null
          created_at?: string
          email: string
          full_name: string
          id?: string
          phone: string
          skills?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          availability?: string | null
          cause?: string | null
          created_at?: string
          email?: string
          full_name?: string
          id?: string
          phone?: string
          skills?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      gen_admission_no: { Args: never; Returns: string }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "moderator" | "user"
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
      app_role: ["admin", "moderator", "user"],
    },
  },
} as const
