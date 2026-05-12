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
      filtratie_unit: {
        Row: {
          aangemaakt_op: string
          id: string
          locatie: string
          naam: string
          status: Database["public"]["Enums"]["unit_status"]
        }
        Insert: {
          aangemaakt_op?: string
          id?: string
          locatie: string
          naam: string
          status?: Database["public"]["Enums"]["unit_status"]
        }
        Update: {
          aangemaakt_op?: string
          id?: string
          locatie?: string
          naam?: string
          status?: Database["public"]["Enums"]["unit_status"]
        }
        Relationships: []
      }
      filtratie_waarden: {
        Row: {
          foto_url: string | null
          gemeten_op: string
          id: string
          medewerker_id: string
          microbiologie: number | null
          notitie: string | null
          ph: number | null
          temperatuur: number | null
          unit_id: string
          water_level: number | null
          zoutgehalte: number | null
        }
        Insert: {
          foto_url?: string | null
          gemeten_op?: string
          id?: string
          medewerker_id: string
          microbiologie?: number | null
          notitie?: string | null
          ph?: number | null
          temperatuur?: number | null
          unit_id: string
          water_level?: number | null
          zoutgehalte?: number | null
        }
        Update: {
          foto_url?: string | null
          gemeten_op?: string
          id?: string
          medewerker_id?: string
          microbiologie?: number | null
          notitie?: string | null
          ph?: number | null
          temperatuur?: number | null
          unit_id?: string
          water_level?: number | null
          zoutgehalte?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "filtratie_waarden_medewerker_id_fkey"
            columns: ["medewerker_id"]
            isOneToOne: false
            referencedRelation: "gebruiker"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "filtratie_waarden_unit_id_fkey"
            columns: ["unit_id"]
            isOneToOne: false
            referencedRelation: "filtratie_unit"
            referencedColumns: ["id"]
          },
        ]
      }
      gebruiker: {
        Row: {
          aangemaakt_op: string
          email: string
          id: string
          naam: string
          rol: Database["public"]["Enums"]["gebruiker_rol"]
          wachtwoord_hash: string
        }
        Insert: {
          aangemaakt_op?: string
          email: string
          id?: string
          naam: string
          rol?: Database["public"]["Enums"]["gebruiker_rol"]
          wachtwoord_hash: string
        }
        Update: {
          aangemaakt_op?: string
          email?: string
          id?: string
          naam?: string
          rol?: Database["public"]["Enums"]["gebruiker_rol"]
          wachtwoord_hash?: string
        }
        Relationships: []
      }
      onderhoud: {
        Row: {
          bijgewerkt_op: string
          frequentie: Database["public"]["Enums"]["onderhoud_frequentie"]
          id: string
          notitie: string | null
          start_datum: string
          status: Database["public"]["Enums"]["onderhoud_status"]
          toegewezen_aan: string | null
          unit_id: string
          volgende_datum: string
        }
        Insert: {
          bijgewerkt_op?: string
          frequentie: Database["public"]["Enums"]["onderhoud_frequentie"]
          id?: string
          notitie?: string | null
          start_datum: string
          status?: Database["public"]["Enums"]["onderhoud_status"]
          toegewezen_aan?: string | null
          unit_id: string
          volgende_datum: string
        }
        Update: {
          bijgewerkt_op?: string
          frequentie?: Database["public"]["Enums"]["onderhoud_frequentie"]
          id?: string
          notitie?: string | null
          start_datum?: string
          status?: Database["public"]["Enums"]["onderhoud_status"]
          toegewezen_aan?: string | null
          unit_id?: string
          volgende_datum?: string
        }
        Relationships: [
          {
            foreignKeyName: "onderhoud_toegewezen_aan_fkey"
            columns: ["toegewezen_aan"]
            isOneToOne: false
            referencedRelation: "gebruiker"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "onderhoud_unit_id_fkey"
            columns: ["unit_id"]
            isOneToOne: false
            referencedRelation: "filtratie_unit"
            referencedColumns: ["id"]
          },
        ]
      }
      waarden_range: {
        Row: {
          id: string
          microbiologie_max: number
          ph_max: number
          ph_min: number
          temperatuur_max: number
          temperatuur_min: number
          unit_id: string
          water_level_max: number
          water_level_min: number
          zoutgehalte_max: number
          zoutgehalte_min: number
        }
        Insert: {
          id?: string
          microbiologie_max: number
          ph_max?: number
          ph_min?: number
          temperatuur_max: number
          temperatuur_min: number
          unit_id: string
          water_level_max: number
          water_level_min: number
          zoutgehalte_max: number
          zoutgehalte_min: number
        }
        Update: {
          id?: string
          microbiologie_max?: number
          ph_max?: number
          ph_min?: number
          temperatuur_max?: number
          temperatuur_min?: number
          unit_id?: string
          water_level_max?: number
          water_level_min?: number
          zoutgehalte_max?: number
          zoutgehalte_min?: number
        }
        Relationships: [
          {
            foreignKeyName: "waarden_range_unit_id_fkey"
            columns: ["unit_id"]
            isOneToOne: true
            referencedRelation: "filtratie_unit"
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
      gebruiker_rol: "technieker" | "supervisor" | "admin"
      onderhoud_frequentie: "dagelijks" | "wekelijks" | "maandelijks"
      onderhoud_status: "gepland" | "voltooid" | "overgeslagen"
      unit_status: "actief" | "onderhoud_nodig" | "storing"
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
      gebruiker_rol: ["technieker", "supervisor", "admin"],
      onderhoud_frequentie: ["dagelijks", "wekelijks", "maandelijks"],
      onderhoud_status: ["gepland", "voltooid", "overgeslagen"],
      unit_status: ["actief", "onderhoud_nodig", "storing"],
    },
  },
} as const
