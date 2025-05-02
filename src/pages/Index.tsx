
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { LogInIcon, UserPlusIcon } from "lucide-react";

const Index = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center p-8 bg-gradient-to-b from-white to-auth-muted">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h1 className="text-4xl md:text-6xl font-bold">
            <span className="text-auth">UserAuth</span> Hub Vietnam
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto">
            Giải pháp quản lý người dùng đơn giản, bảo mật và hiệu quả cho doanh nghiệp của bạn.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button
              className="bg-auth hover:bg-auth-hover text-lg py-6 px-8"
              onClick={() => navigate("/login")}
            >
              <LogInIcon className="mr-2 h-5 w-5" />
              Đăng nhập
            </Button>
            <Button
              variant="outline"
              className="text-lg py-6 px-8"
              onClick={() => navigate("/register")}
            >
              <UserPlusIcon className="mr-2 h-5 w-5" />
              Đăng ký
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-16">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="h-12 w-12 rounded-full bg-auth-muted text-auth flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-center mb-2">Nhanh chóng & Dễ sử dụng</h3>
              <p className="text-gray-600 text-center">
                Thiết lập và quản lý người dùng chỉ trong vài phút với giao diện thân thiện.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="h-12 w-12 rounded-full bg-auth-muted text-auth flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-center mb-2">Bảo mật hàng đầu</h3>
              <p className="text-gray-600 text-center">
                Bảo vệ dữ liệu người dùng với công nghệ mã hóa tiên tiến.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="h-12 w-12 rounded-full bg-auth-muted text-auth flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-center mb-2">Quản lý toàn diện</h3>
              <p className="text-gray-600 text-center">
                Quản lý người dùng, phân quyền và theo dõi hoạt động từ một giao diện thống nhất.
              </p>
            </div>
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="bg-white py-8 border-t">
        <div className="container mx-auto px-6">
          <p className="text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} UserAuth Hub Vietnam. Tất cả các quyền được bảo lưu.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
