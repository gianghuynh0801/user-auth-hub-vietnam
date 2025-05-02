
import { User as SupabaseUser } from "@supabase/supabase-js";

// Custom application user type that includes profile data
export interface AppUser {
  id: string;
  email: string;
  name: string;
  role: "admin" | "user";
  createdAt: string;
}

// For when we need to create a new user
export type NewUser = Omit<AppUser, "id" | "createdAt">;

// For when we need to update a user
export type UpdateUser = Partial<Omit<AppUser, "id">>;

// We include the original Supabase User type for reference
export type { User as SupabaseUser } from "@supabase/supabase-js";

// Mock profile type for use with Supabase
export interface ProfileData {
  id: string;
  email: string;
  name: string;
  role: "admin" | "user";
  created_at: string;
}
