
import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LogInIcon, UserPlusIcon } from "lucide-react";

interface AuthLayoutProps {
  children: ReactNode;
  heading: string;
  subheading: string;
  isLogin?: boolean;
}

const AuthLayout = ({ children, heading, subheading, isLogin }: AuthLayoutProps) => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen">
      {/* Left Side - Auth Form */}
      <div className="flex-1 flex flex-col justify-center items-center p-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-center">{heading}</h1>
            <p className="mt-2 text-center text-gray-500">{subheading}</p>
          </div>
          {children}
        </div>
      </div>

      {/* Right Side - Feature Highlight */}
      <div className="hidden lg:flex flex-1 bg-auth bg-opacity-90 text-white flex-col justify-center items-center p-8">
        <div className="max-w-md space-y-8 text-center">
          <h2 className="text-3xl font-bold">UserAuth Hub Vietnam</h2>
          <p className="text-lg">
            Hệ thống quản lý người dùng đơn giản, bảo mật và dễ sử dụng.
          </p>
          <div className="space-y-4">
            <div className="flex flex-col items-center space-y-2">
              <div className="h-12 w-12 rounded-full bg-white bg-opacity-20 flex items-center justify-center">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="24" 
                  height="24" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
              </div>
              <p>Bảo mật hàng đầu</p>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <div className="h-12 w-12 rounded-full bg-white bg-opacity-20 flex items-center justify-center">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="24" 
                  height="24" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
              <p>Quản lý người dùng hiệu quả</p>
            </div>
          </div>

          <div className="pt-6">
            {isLogin ? (
              <Button
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-auth"
                onClick={() => navigate("/register")}
              >
                <UserPlusIcon className="mr-2 h-4 w-4" />
                Đăng ký
              </Button>
            ) : (
              <Button
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-auth"
                onClick={() => navigate("/login")}
              >
                <LogInIcon className="mr-2 h-4 w-4" />
                Đăng nhập
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
