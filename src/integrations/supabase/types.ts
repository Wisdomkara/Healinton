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
          drug_id: string
          id: string
          order_date: string | null
          quantity: number | null
          reference_number: string | null
          status: string | null
          total_amount: number | null
          user_id: string
        }
        Insert: {
          country?: string | null
          drug_id: string
          id?: string
          order_date?: string | null
          quantity?: number | null
          reference_number?: string | null
          status?: string | null
          total_amount?: number | null
          user_id: string
        }
        Update: {
          country?: string | null
          drug_id?: string
          id?: string
          order_date?: string | null
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
        ]
      }
      health_metrics: {
        Row: {
          blood_pressure_diastolic: number | null
          blood_pressure_systolic: number | null
          blood_sugar: number | null
          id: string
          recorded_at: string | null
          user_id: string
          weight: number | null
        }
        Insert: {
          blood_pressure_diastolic?: number | null
          blood_pressure_systolic?: number | null
          blood_sugar?: number | null
          id?: string
          recorded_at?: string | null
          user_id: string
          weight?: number | null
        }
        Update: {
          blood_pressure_diastolic?: number | null
          blood_pressure_systolic?: number | null
          blood_sugar?: number | null
          id?: string
          recorded_at?: string | null
          user_id?: string
          weight?: number | null
        }
        Relationships: []
      }
      hospital_bookings: {
        Row: {
          appointment_date: string
          country: string | null
          created_at: string | null
          hospital_email: string | null
          hospital_name: string
          id: string
          reason: string | null
          reference_number: string | null
          status: string | null
          user_id: string
        }
        Insert: {
          appointment_date: string
          country?: string | null
          created_at?: string | null
          hospital_email?: string | null
          hospital_name: string
          id?: string
          reason?: string | null
          reference_number?: string | null
          status?: string | null
          user_id: string
        }
        Update: {
          appointment_date?: string
          country?: string | null
          created_at?: string | null
          hospital_email?: string | null
          hospital_name?: string
          id?: string
          reason?: string | null
          reference_number?: string | null
          status?: string | null
          user_id?: string
        }
        Relationships: []
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
        Relationships: [
          {
            foreignKeyName: "meal_completions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
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
      premium_form_submissions: {
        Row: {
          country: string
          created_at: string
          email: string
          full_name: string
          id: string
          phone_number: string
          submitted_at: string
          surname: string
          user_id: string | null
        }
        Insert: {
          country: string
          created_at?: string
          email: string
          full_name: string
          id?: string
          phone_number: string
          submitted_at?: string
          surname: string
          user_id?: string | null
        }
        Update: {
          country?: string
          created_at?: string
          email?: string
          full_name?: string
          id?: string
          phone_number?: string
          submitted_at?: string
          surname?: string
          user_id?: string | null
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
      premium_users_admin: {
        Row: {
          added_at: string
          added_by: string | null
          email: string
          expires_at: string | null
          full_name: string | null
          id: string
          is_active: boolean
          notes: string | null
          user_id: string
        }
        Insert: {
          added_at?: string
          added_by?: string | null
          email: string
          expires_at?: string | null
          full_name?: string | null
          id?: string
          is_active?: boolean
          notes?: string | null
          user_id: string
        }
        Update: {
          added_at?: string
          added_by?: string | null
          email?: string
          expires_at?: string | null
          full_name?: string | null
          id?: string
          is_active?: boolean
          notes?: string | null
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          country: string | null
          created_at: string | null
          delivery_address: string | null
          email: string | null
          first_name: string | null
          gender: string | null
          id: string
          illness_type: string | null
          last_name: string | null
          phone_number: string | null
          updated_at: string | null
        }
        Insert: {
          country?: string | null
          created_at?: string | null
          delivery_address?: string | null
          email?: string | null
          first_name?: string | null
          gender?: string | null
          id: string
          illness_type?: string | null
          last_name?: string | null
          phone_number?: string | null
          updated_at?: string | null
        }
        Update: {
          country?: string | null
          created_at?: string | null
          delivery_address?: string | null
          email?: string | null
          first_name?: string | null
          gender?: string | null
          id?: string
          illness_type?: string | null
          last_name?: string | null
          phone_number?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      ratings: {
        Row: {
          created_at: string
          feedback: string | null
          id: string
          rating: number
          user_email: string | null
          user_id: string
          user_name: string | null
        }
        Insert: {
          created_at?: string
          feedback?: string | null
          id?: string
          rating: number
          user_email?: string | null
          user_id: string
          user_name?: string | null
        }
        Update: {
          created_at?: string
          feedback?: string | null
          id?: string
          rating?: number
          user_email?: string | null
          user_id?: string
          user_name?: string | null
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
          user_id: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          is_completed?: boolean | null
          reminder_date: string
          title: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          is_completed?: boolean | null
          reminder_date?: string
          title?: string
          user_id?: string
        }
        Relationships: []
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
          user_id: string
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
          user_id: string
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
          user_id?: string
        }
        Relationships: []
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
          user_id: string
        }
        Insert: {
          additional_notes?: string | null
          created_at?: string | null
          feedback?: string | null
          id?: string
          severity?: number | null
          symptoms: string
          user_id: string
        }
        Update: {
          additional_notes?: string | null
          created_at?: string | null
          feedback?: string | null
          id?: string
          severity?: number | null
          symptoms?: string
          user_id?: string
        }
        Relationships: []
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
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      weekly_meal_plans: {
        Row: {
          completed_at: string | null
          created_at: string
          day_of_week: number
          id: string
          is_completed: boolean | null
          meal_name: string
          meal_type: string
          user_id: string
          week_start_date: string
        }
        Insert: {
          completed_at?: string | null
          created_at?: string
          day_of_week: number
          id?: string
          is_completed?: boolean | null
          meal_name: string
          meal_type: string
          user_id: string
          week_start_date: string
        }
        Update: {
          completed_at?: string | null
          created_at?: string
          day_of_week?: number
          id?: string
          is_completed?: boolean | null
          meal_name?: string
          meal_type?: string
          user_id?: string
          week_start_date?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      add_premium_user_manual: {
        Args: {
          p_added_by?: string
          p_duration_months?: number
          p_notes?: string
          p_user_email: string
        }
        Returns: boolean
      }
      check_and_update_subscription_status: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      demote_admin_to_user: {
        Args: { target_user_email: string }
        Returns: boolean
      }
      ensure_user_profile: {
        Args: { user_uuid: string }
        Returns: undefined
      }
      generate_weekly_meal_plan: {
        Args: { p_user_id: string }
        Returns: undefined
      }
      get_current_user_role: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      get_premium_users_admin_data: {
        Args: Record<PropertyKey, never>
        Returns: {
          added_by: string
          country: string
          days_remaining: number
          email: string
          end_date: string
          full_name: string
          notes: string
          plan_type: string
          status: string
          subscription_type: string
          user_created_at: string
          user_id: string
        }[]
      }
      get_user_subscription: {
        Args: { check_user_id: string }
        Returns: {
          days_remaining: number
          end_date: string
          is_premium: boolean
          plan_type: string
          status: string
        }[]
      }
      get_user_subscription_free: {
        Args: { check_user_id: string }
        Returns: {
          days_remaining: number
          end_date: string
          is_premium: boolean
          plan_type: string
          status: string
        }[]
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      is_admin: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      is_user_premium: {
        Args: { check_user_id: string }
        Returns: boolean
      }
      promote_user_to_admin: {
        Args: { target_user_email: string }
        Returns: boolean
      }
      remove_premium_user_manual: {
        Args: { p_user_email: string }
        Returns: boolean
      }
      renew_premium_subscription: {
        Args: { p_user_id: string }
        Returns: boolean
      }
      update_expired_subscriptions: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
    }
    Enums: {
      app_role: "admin" | "user"
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
      app_role: ["admin", "user"],
    },
  },
} as const
