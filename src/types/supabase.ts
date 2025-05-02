
import { Database as OriginalDatabase } from "@/integrations/supabase/types";

// Extend the original Database type to include our custom tables
export interface CustomDatabase extends OriginalDatabase {
  public: {
    Tables: OriginalDatabase['public']['Tables'] & {
      // Giữ lại type cho bảng cũ trong schema public nếu cần
    };
    Views: OriginalDatabase['public']['Views'];
    Functions: OriginalDatabase['public']['Functions'];
    Enums: OriginalDatabase['public']['Enums'];
    CompositeTypes: OriginalDatabase['public']['CompositeTypes'];
  };
  // Using a custom scheme for our profiles
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
      get_user_role: {
        Args: {
          user_id: string;
        };
        Returns: string;
      };
      handle_new_user: {
        Args: Record<string, never>;
        Returns: unknown;
      };
    };
    Enums: {};
    CompositeTypes: {};
  };
}
