
import { Database as OriginalDatabase } from "@/integrations/supabase/types";

// Extend the original Database type to include our custom tables
export interface CustomDatabase extends OriginalDatabase {
  public: {
    Tables: {
      heart_confessions: OriginalDatabase['public']['Tables']['heart_confessions'];
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
        Relationships: []; // Add this missing property
      };
    };
    Views: OriginalDatabase['public']['Views'];
    Functions: OriginalDatabase['public']['Functions'];
    Enums: OriginalDatabase['public']['Enums'];
    CompositeTypes: OriginalDatabase['public']['CompositeTypes'];
  };
}
