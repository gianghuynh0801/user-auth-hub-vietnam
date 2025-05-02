
import { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import Navbar from "@/components/dashboard/Navbar";

interface DashboardLayoutProps {
  children: ReactNode;
  requireAdmin?: boolean;
}

const DashboardLayout = ({ children, requireAdmin = false }: DashboardLayoutProps) => {
  const { currentUser, isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate("/login");
    }

    if (!isLoading && requireAdmin && currentUser?.role !== "admin") {
      navigate("/dashboard");
    }
  }, [isAuthenticated, isLoading, navigate, requireAdmin, currentUser]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-auth border-t-transparent"></div>
          <p className="text-gray-500">Đang tải...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container pt-24 pb-12">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
