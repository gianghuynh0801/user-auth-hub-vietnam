
import { Database as OriginalDatabase } from "@/integrations/supabase/types";

// Extend the original Database type to include our custom tables
export interface CustomDatabase extends OriginalDatabase {
  public: {
    Tables: OriginalDatabase['public']['Tables'];
    Views: OriginalDatabase['public']['Views'];
    Functions: OriginalDatabase['public']['Functions'];
    Enums: OriginalDatabase['public']['Enums'];
    CompositeTypes: OriginalDatabase['public']['CompositeTypes'];
  };
  login_project: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          name: string | null;
          role: "admin" | "user";
          created_at: string;
        };
        Insert: {
          id: string;
          email: string;
          name?: string | null;
          role?: "admin" | "user";
          created_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          name?: string | null;
          role?: "admin" | "user";
          created_at?: string;
        };
      };
    };
    Views: {};
    Functions: {
      handle_new_user: {
        Args: Record<string, unknown>;
        Returns: unknown;
      };
    };
    Enums: {};
    CompositeTypes: {};
  };
}
