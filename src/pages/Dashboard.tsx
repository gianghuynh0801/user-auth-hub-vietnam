
import DashboardLayout from "@/components/layouts/DashboardLayout";
import UserProfileCard from "@/components/dashboard/UserProfileCard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";

const Dashboard = () => {
  const { currentUser } = useAuth();

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Xin chào, {currentUser?.name}!</h1>
        <p className="text-gray-500">
          Chào mừng đến với hệ thống quản lý người dùng của chúng tôi.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <UserProfileCard />
          </div>
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Hướng dẫn</CardTitle>
                <CardDescription>Cách sử dụng hệ thống</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h3 className="font-semibold">1. Quản lý tài khoản</h3>
                  <p className="text-sm text-gray-500">
                    Bạn có thể quản lý thông tin tài khoản từ trang Hồ sơ.
                  </p>
                </div>
                {currentUser?.role === "admin" && (
                  <div className="space-y-2">
                    <h3 className="font-semibold">2. Quản lý người dùng</h3>
                    <p className="text-sm text-gray-500">
                      Với tư cách quản trị viên, bạn có thể quản lý người dùng từ trang Quản lý.
                    </p>
                  </div>
                )}
                <div className="space-y-2">
                  <h3 className="font-semibold">{currentUser?.role === "admin" ? "3" : "2"}. Bảo mật</h3>
                  <p className="text-sm text-gray-500">
                    Hãy đảm bảo bạn luôn đăng xuất khi sử dụng thiết bị công cộng.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
