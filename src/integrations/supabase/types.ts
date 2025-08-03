export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.12 (cd3cf9e)"
  }
  public: {
    Tables: {
      blog_posts: {
        Row: {
          author: string | null
          category: string | null
          content: string
          id: string
          published_at: string | null
          summary: string | null
          title: string
        }
        Insert: {
          author?: string | null
          category?: string | null
          content: string
          id?: string
          published_at?: string | null
          summary?: string | null
          title: string
        }
        Update: {
          author?: string | null
          category?: string | null
          content?: string
          id?: string
          published_at?: string | null
          summary?: string | null
          title?: string
        }
        Relationships: []
      }
      drug_categories: {
        Row: {
          availability: boolean | null
          created_at: string | null
          description: string | null
          id: string
          name: string
          price: number | null
          type: string
        }
        Insert: {
          availability?: boolean | null
          created_at?: string | null
          description?: string | null
          id?: string
          name: string
          price?: number | null
          type: string
        }
        Update: {
          availability?: boolean | null
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string
          price?: number | null
          type?: string
        }
        Relationships: []
      }
      drug_orders: {
        Row: {
          country: string | null
          delivery_address: string | null
          drug_id: string
          email_address: string | null
          full_name: string | null
          id: string
          order_date: string | null
          phone_number: string | null
          quantity: number | null
          reference_number: string | null
          status: string | null
          total_amount: number | null
          user_id: string
        }
        Insert: {
          country?: string | null
          delivery_address?: string | null
          drug_id: string
          email_address?: string | null
          full_name?: string | null
          id?: string
          order_date?: string | null
          phone_number?: string | null
          quantity?: number | null
          reference_number?: string | null
          status?: string | null
          total_amount?: number | null
          user_id: string
        }
        Update: {
          country?: string | null
          delivery_address?: string | null
          drug_id?: string
          email_address?: string | null
          full_name?: string | null
          id?: string
          order_date?: string | null
          phone_number?: string | null
          quantity?: number | null
          reference_number?: string | null
          status?: string | null
          total_amount?: number | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "drug_orders_drug_id_fkey"
            columns: ["drug_id"]
            isOneToOne: false
            referencedRelation: "drug_categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "drug_orders_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      health_metrics: {
        Row: {
          blood_pressure_diastolic: number | null
          blood_pressure_systolic: number | null
          blood_sugar: number | null
          id: string
          recorded_at: string | null
          user_id: string | null
          weight: number | null
        }
        Insert: {
          blood_pressure_diastolic?: number | null
          blood_pressure_systolic?: number | null
          blood_sugar?: number | null
          id?: string
          recorded_at?: string | null
          user_id?: string | null
          weight?: number | null
        }
        Update: {
          blood_pressure_diastolic?: number | null
          blood_pressure_systolic?: number | null
          blood_sugar?: number | null
          id?: string
          recorded_at?: string | null
          user_id?: string | null
          weight?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "health_metrics_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      hospital_bookings: {
        Row: {
          address: string | null
          appointment_date: string
          country: string | null
          created_at: string | null
          email_address: string | null
          full_name: string | null
          hospital_email: string | null
          hospital_name: string
          id: string
          phone_number: string | null
          reason: string | null
          reference_number: string | null
          status: string | null
          user_id: string | null
        }
        Insert: {
          address?: string | null
          appointment_date: string
          country?: string | null
          created_at?: string | null
          email_address?: string | null
          full_name?: string | null
          hospital_email?: string | null
          hospital_name: string
          id?: string
          phone_number?: string | null
          reason?: string | null
          reference_number?: string | null
          status?: string | null
          user_id?: string | null
        }
        Update: {
          address?: string | null
          appointment_date?: string
          country?: string | null
          created_at?: string | null
          email_address?: string | null
          full_name?: string | null
          hospital_email?: string | null
          hospital_name?: string
          id?: string
          phone_number?: string | null
          reason?: string | null
          reference_number?: string | null
          status?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "hospital_bookings_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      meal_completions: {
        Row: {
          budget_type: string
          completed: boolean
          created_at: string
          id: string
          meal_date: string
          meal_time: string
          user_id: string
        }
        Insert: {
          budget_type: string
          completed?: boolean
          created_at?: string
          id?: string
          meal_date: string
          meal_time: string
          user_id: string
        }
        Update: {
          budget_type?: string
          completed?: boolean
          created_at?: string
          id?: string
          meal_date?: string
          meal_time?: string
          user_id?: string
        }
        Relationships: []
      }
      meal_tracking: {
        Row: {
          completed: boolean | null
          created_at: string | null
          id: string
          illness_type: string
          meal_date: string
          meal_time: string
          user_id: string
        }
        Insert: {
          completed?: boolean | null
          created_at?: string | null
          id?: string
          illness_type: string
          meal_date: string
          meal_time: string
          user_id: string
        }
        Update: {
          completed?: boolean | null
          created_at?: string | null
          id?: string
          illness_type?: string
          meal_date?: string
          meal_time?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "meal_tracking_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      payments: {
        Row: {
          amount: number
          created_at: string | null
          currency: string | null
          id: string
          payment_date: string | null
          payment_method: string | null
          status: string | null
          transaction_id: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          amount: number
          created_at?: string | null
          currency?: string | null
          id?: string
          payment_date?: string | null
          payment_method?: string | null
          status?: string | null
          transaction_id?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          amount?: number
          created_at?: string | null
          currency?: string | null
          id?: string
          payment_date?: string | null
          payment_method?: string | null
          status?: string | null
          transaction_id?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      premium_users: {
        Row: {
          added_by: string | null
          created_at: string
          expires_at: string | null
          id: string
          is_active: boolean
          notes: string | null
          subscription_type: string
          user_id: string
        }
        Insert: {
          added_by?: string | null
          created_at?: string
          expires_at?: string | null
          id?: string
          is_active?: boolean
          notes?: string | null
          subscription_type?: string
          user_id: string
        }
        Update: {
          added_by?: string | null
          created_at?: string
          expires_at?: string | null
          id?: string
          is_active?: boolean
          notes?: string | null
          subscription_type?: string
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          country: string | null
          created_at: string | null
          email: string | null
          first_name: string | null
          gender: string | null
          id: string
          illness_type: string | null
          last_name: string | null
          updated_at: string | null
        }
        Insert: {
          country?: string | null
          created_at?: string | null
          email?: string | null
          first_name?: string | null
          gender?: string | null
          id: string
          illness_type?: string | null
          last_name?: string | null
          updated_at?: string | null
        }
        Update: {
          country?: string | null
          created_at?: string | null
          email?: string | null
          first_name?: string | null
          gender?: string | null
          id?: string
          illness_type?: string | null
          last_name?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      reminders: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          is_completed: boolean | null
          reminder_date: string
          title: string
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          is_completed?: boolean | null
          reminder_date: string
          title: string
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          is_completed?: boolean | null
          reminder_date?: string
          title?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "reminders_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      shopping_lists: {
        Row: {
          country: string | null
          created_at: string | null
          email_address: string | null
          full_name: string | null
          id: string
          is_purchased: boolean | null
          medication_name: string
          pharmacy_name: string | null
          phone_number: string | null
          reference_number: string | null
          user_id: string | null
        }
        Insert: {
          country?: string | null
          created_at?: string | null
          email_address?: string | null
          full_name?: string | null
          id?: string
          is_purchased?: boolean | null
          medication_name: string
          pharmacy_name?: string | null
          phone_number?: string | null
          reference_number?: string | null
          user_id?: string | null
        }
        Update: {
          country?: string | null
          created_at?: string | null
          email_address?: string | null
          full_name?: string | null
          id?: string
          is_purchased?: boolean | null
          medication_name?: string
          pharmacy_name?: string | null
          phone_number?: string | null
          reference_number?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "shopping_lists_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      subscriptions: {
        Row: {
          auto_renew: boolean | null
          created_at: string | null
          end_date: string | null
          id: string
          payment_id: string | null
          plan_type: string | null
          start_date: string | null
          status: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          auto_renew?: boolean | null
          created_at?: string | null
          end_date?: string | null
          id?: string
          payment_id?: string | null
          plan_type?: string | null
          start_date?: string | null
          status?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          auto_renew?: boolean | null
          created_at?: string | null
          end_date?: string | null
          id?: string
          payment_id?: string | null
          plan_type?: string | null
          start_date?: string | null
          status?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "subscriptions_payment_id_fkey"
            columns: ["payment_id"]
            isOneToOne: false
            referencedRelation: "payments"
            referencedColumns: ["id"]
          },
        ]
      }
      symptoms: {
        Row: {
          additional_notes: string | null
          created_at: string | null
          feedback: string | null
          id: string
          severity: number | null
          symptoms: string
          user_id: string | null
        }
        Insert: {
          additional_notes?: string | null
          created_at?: string | null
          feedback?: string | null
          id?: string
          severity?: number | null
          symptoms: string
          user_id?: string | null
        }
        Update: {
          additional_notes?: string | null
          created_at?: string | null
          feedback?: string | null
          id?: string
          severity?: number | null
          symptoms?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "symptoms_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_analytics: {
        Row: {
          created_at: string | null
          date: string
          id: string
          metric_type: string
          user_id: string
          value: number
        }
        Insert: {
          created_at?: string | null
          date: string
          id?: string
          metric_type: string
          user_id: string
          value: number
        }
        Update: {
          created_at?: string | null
          date?: string
          id?: string
          metric_type?: string
          user_id?: string
          value?: number
        }
        Relationships: [
          {
            foreignKeyName: "user_analytics_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_hospitals: {
        Row: {
          address: string | null
          created_at: string | null
          email: string | null
          hospital_name: string
          id: string
          is_default: boolean | null
          phone: string | null
          user_id: string
        }
        Insert: {
          address?: string | null
          created_at?: string | null
          email?: string | null
          hospital_name: string
          id?: string
          is_default?: boolean | null
          phone?: string | null
          user_id: string
        }
        Update: {
          address?: string | null
          created_at?: string | null
          email?: string | null
          hospital_name?: string
          id?: string
          is_default?: boolean | null
          phone?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_hospitals_user_id_fkey"
            columns: ["user_id"]
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
      get_user_subscription: {
        Args: { check_user_id: string }
        Returns: {
          is_premium: boolean
          plan_type: string
          status: string
          end_date: string
          days_remaining: number
        }[]
      }
      is_user_premium: {
        Args: { check_user_id: string }
        Returns: boolean
      }
    }
    Enums: {
      [_ in never]: never
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
    Enums: {},
  },
} as const
