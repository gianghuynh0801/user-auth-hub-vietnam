
import React, { createContext, useState, useContext, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Session } from "@supabase/supabase-js";
import { AppUser, NewUser, UpdateUser, ProfileData } from "@/types";

interface AuthContextType {
  currentUser: AppUser | null;
  users: AppUser[];
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, name: string, password: string) => Promise<boolean>;
  logout: () => void;
  addUser: (user: NewUser) => void;
  updateUser: (id: string, userData: UpdateUser) => void;
  deleteUser: (id: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<AppUser | null>(null);
  const [users, setUsers] = useState<AppUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [session, setSession] = useState<Session | null>(null);
  const { toast } = useToast();

  // Fetch all users (only for admin)
  const fetchUsers = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error("Error fetching users:", error);
        return;
      }

      // Map profiles to AppUser type
      if (data) {
        const formattedUsers: AppUser[] = data.map((profile: ProfileData) => ({
          id: profile.id,
          email: profile.email,
          name: profile.name || "",
          role: profile.role,
          createdAt: profile.created_at,
        }));
        
        setUsers(formattedUsers);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // Set up auth state listener and check for existing session
  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        
        if (session?.user) {
          // Fetch the user profile after a delay to avoid recursive auth issues
          setTimeout(async () => {
            const { data: profile, error } = await supabase
              .from("profiles")
              .select("*")
              .eq("id", session.user.id)
              .single();

            if (error) {
              console.error("Error fetching user profile:", error);
              return;
            }

            if (profile) {
              const user: AppUser = {
                id: profile.id,
                email: profile.email,
                name: profile.name || "",
                role: profile.role,
                createdAt: profile.created_at,
              };
              
              setCurrentUser(user);
              
              // If user is admin, fetch all users
              if (user.role === "admin") {
                fetchUsers();
              }
            }
          }, 0);
        } else {
          setCurrentUser(null);
        }
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      
      if (session?.user) {
        // Fetch the user profile
        supabase
          .from("profiles")
          .select("*")
          .eq("id", session.user.id)
          .single()
          .then(({ data: profile, error }) => {
            if (error) {
              console.error("Error fetching user profile:", error);
              setIsLoading(false);
              return;
            }

            if (profile) {
              const user: AppUser = {
                id: profile.id,
                email: profile.email,
                name: profile.name || "",
                role: profile.role,
                createdAt: profile.created_at,
              };
              
              setCurrentUser(user);
              
              // If user is admin, fetch all users
              if (user.role === "admin") {
                fetchUsers();
              }
            }
            
            setIsLoading(false);
          });
      } else {
        setIsLoading(false);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        toast({
          title: "Đăng nhập thất bại",
          description: error.message,
          variant: "destructive",
        });
        console.error("Login error:", error);
        setIsLoading(false);
        return false;
      }

      toast({
        title: "Đăng nhập thành công",
        description: `Xin chào, ${data.user.user_metadata.name || data.user.email}!`,
      });
      
      setIsLoading(false);
      return true;
    } catch (error) {
      console.error("Login error:", error);
      toast({
        title: "Đăng nhập thất bại",
        description: "Có lỗi xảy ra khi đăng nhập.",
        variant: "destructive",
      });
      setIsLoading(false);
      return false;
    }
  };

  const register = async (email: string, name: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
          },
        },
      });

      if (error) {
        toast({
          title: "Đăng ký thất bại",
          description: error.message,
          variant: "destructive",
        });
        console.error("Registration error:", error);
        setIsLoading(false);
        return false;
      }

      toast({
        title: "Đăng ký thành công",
        description: `Tài khoản ${email} đã được tạo.`,
      });
      
      setIsLoading(false);
      return true;
    } catch (error) {
      console.error("Registration error:", error);
      toast({
        title: "Đăng ký thất bại",
        description: "Có lỗi xảy ra khi đăng ký.",
        variant: "destructive",
      });
      setIsLoading(false);
      return false;
    }
  };

  const logout = async () => {
    try {
      await supabase.auth.signOut();
      setCurrentUser(null);
      toast({
        title: "Đăng xuất thành công",
        description: "Hẹn gặp lại bạn!",
      });
    } catch (error) {
      console.error("Logout error:", error);
      toast({
        title: "Đăng xuất thất bại",
        description: "Có lỗi xảy ra khi đăng xuất.",
        variant: "destructive",
      });
    }
  };

  const addUser = async (userData: NewUser) => {
    setIsLoading(true);
    
    try {
      // Generate a random password for the new user
      const tempPassword = Math.random().toString(36).slice(-8);
      
      // Create a new user in Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.admin.createUser({
        email: userData.email,
        password: tempPassword,
        email_confirm: true,
        user_metadata: {
          name: userData.name,
        },
      });

      if (authError) {
        toast({
          title: "Tạo người dùng thất bại",
          description: authError.message,
          variant: "destructive",
        });
        console.error("Create user error:", authError);
        setIsLoading(false);
        return;
      }

      // Update the user's role in the profiles table if needed
      if (userData.role === "admin" && authData.user) {
        const { error: updateError } = await supabase
          .from("profiles")
          .update({ role: "admin" })
          .eq("id", authData.user.id);

        if (updateError) {
          console.error("Error updating user role:", updateError);
        }
      }

      // Refresh the users list
      fetchUsers();
      
      toast({
        title: "Tạo người dùng thành công",
        description: `Đã tạo tài khoản cho ${userData.email}`,
      });
      
      setIsLoading(false);
    } catch (error) {
      console.error("Create user error:", error);
      toast({
        title: "Tạo người dùng thất bại",
        description: "Có lỗi xảy ra khi tạo người dùng.",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  const updateUser = async (id: string, userData: UpdateUser) => {
    setIsLoading(true);
    
    try {
      // Update the user in the profiles table
      const { error } = await supabase
        .from("profiles")
        .update({
          name: userData.name,
          email: userData.email,
          role: userData.role,
        })
        .eq("id", id);

      if (error) {
        toast({
          title: "Cập nhật thất bại",
          description: error.message,
          variant: "destructive",
        });
        console.error("Update user error:", error);
        setIsLoading(false);
        return;
      }

      // If we're updating the current user, also update the currentUser state
      if (currentUser && currentUser.id === id) {
        const updatedUser = { ...currentUser, ...userData };
        setCurrentUser(updatedUser);
      }

      // Refresh the users list
      fetchUsers();
      
      toast({
        title: "Cập nhật thành công",
        description: "Thông tin người dùng đã được cập nhật",
      });
      
      setIsLoading(false);
    } catch (error) {
      console.error("Update user error:", error);
      toast({
        title: "Cập nhật thất bại",
        description: "Có lỗi xảy ra khi cập nhật thông tin người dùng.",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  const deleteUser = async (id: string) => {
    setIsLoading(true);
    
    try {
      const { error } = await supabase.auth.admin.deleteUser(id);

      if (error) {
        toast({
          title: "Xóa người dùng thất bại",
          description: error.message,
          variant: "destructive",
        });
        console.error("Delete user error:", error);
        setIsLoading(false);
        return;
      }

      // The database trigger will automatically delete the profile
      // We just need to update the users list
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
      
      toast({
        title: "Xóa người dùng thành công",
        description: "Người dùng đã được xóa khỏi hệ thống",
      });
      
      setIsLoading(false);
    } catch (error) {
      console.error("Delete user error:", error);
      toast({
        title: "Xóa người dùng thất bại",
        description: "Có lỗi xảy ra khi xóa người dùng.",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        users,
        isAuthenticated: currentUser !== null,
        isLoading,
        login,
        register,
        logout,
        addUser,
        updateUser,
        deleteUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// Export types
export type { AppUser, NewUser, UpdateUser } from "@/types";
