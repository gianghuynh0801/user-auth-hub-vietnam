
import React, { createContext, useState, useContext, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";

// User type definition
export interface User {
  id: string;
  email: string;
  name: string;
  role: "admin" | "user";
  createdAt: string;
}

// Mock users for demonstration
const MOCK_USERS: User[] = [
  {
    id: "1",
    email: "admin@example.com",
    name: "Admin User",
    role: "admin",
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    email: "user@example.com",
    name: "Test User",
    role: "user",
    createdAt: new Date().toISOString(),
  },
];

interface AuthContextType {
  currentUser: User | null;
  users: User[];
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, name: string, password: string) => Promise<boolean>;
  logout: () => void;
  addUser: (user: Omit<User, "id" | "createdAt">) => void;
  updateUser: (id: string, userData: Partial<User>) => void;
  deleteUser: (id: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>(MOCK_USERS);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  // Check for saved user on load
  useEffect(() => {
    const savedUser = localStorage.getItem("currentUser");
    if (savedUser) {
      try {
        setCurrentUser(JSON.parse(savedUser));
      } catch (error) {
        console.error("Failed to parse saved user:", error);
        localStorage.removeItem("currentUser");
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        const user = users.find((u) => u.email === email);
        
        if (user && password === "password") { // In a real app, you'd check hashed passwords
          setCurrentUser(user);
          localStorage.setItem("currentUser", JSON.stringify(user));
          toast({
            title: "Đăng nhập thành công",
            description: `Xin chào, ${user.name}!`,
          });
          resolve(true);
        } else {
          toast({
            title: "Đăng nhập thất bại",
            description: "Email hoặc mật khẩu không đúng",
            variant: "destructive",
          });
          resolve(false);
        }
        setIsLoading(false);
      }, 1000);
    });
  };

  const register = async (email: string, name: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        const existingUser = users.find((u) => u.email === email);
        
        if (existingUser) {
          toast({
            title: "Đăng ký thất bại",
            description: "Email đã được sử dụng",
            variant: "destructive",
          });
          resolve(false);
        } else {
          const newUser: User = {
            id: `${users.length + 1}`,
            email,
            name,
            role: "user",
            createdAt: new Date().toISOString(),
          };
          
          setUsers((prevUsers) => [...prevUsers, newUser]);
          setCurrentUser(newUser);
          localStorage.setItem("currentUser", JSON.stringify(newUser));
          
          toast({
            title: "Đăng ký thành công",
            description: `Tài khoản ${email} đã được tạo.`,
          });
          resolve(true);
        }
        setIsLoading(false);
      }, 1000);
    });
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem("currentUser");
    toast({
      title: "Đăng xuất thành công",
      description: "Hẹn gặp lại bạn!",
    });
  };

  const addUser = (userData: Omit<User, "id" | "createdAt">) => {
    const newUser: User = {
      ...userData,
      id: `${users.length + 1}`,
      createdAt: new Date().toISOString(),
    };
    
    setUsers((prevUsers) => [...prevUsers, newUser]);
    toast({
      title: "Tạo người dùng thành công",
      description: `Đã tạo tài khoản cho ${userData.email}`,
    });
  };

  const updateUser = (id: string, userData: Partial<User>) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === id ? { ...user, ...userData } : user
      )
    );
    
    // If updating the current user, also update currentUser state
    if (currentUser && currentUser.id === id) {
      const updatedUser = { ...currentUser, ...userData };
      setCurrentUser(updatedUser);
      localStorage.setItem("currentUser", JSON.stringify(updatedUser));
    }
    
    toast({
      title: "Cập nhật thành công",
      description: "Thông tin người dùng đã được cập nhật",
    });
  };

  const deleteUser = (id: string) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
    
    toast({
      title: "Xóa người dùng thành công",
      description: "Người dùng đã được xóa khỏi hệ thống",
    });
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
