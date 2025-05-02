
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";

const Settings = () => {
  const { toast } = useToast();

  const handleToggle = () => {
    toast({
      title: "Tính năng sắp ra mắt",
      description: "Cài đặt này sẽ sớm được kích hoạt trong các bản cập nhật tới",
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Cài đặt</h1>
        <p className="text-gray-500">
          Quản lý cài đặt và tùy chọn tài khoản của bạn.
        </p>

        <div className="grid grid-cols-1 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Thông báo</CardTitle>
              <CardDescription>
                Quản lý cách bạn nhận thông báo từ hệ thống
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="email-notifications">Thông báo qua email</Label>
                  <p className="text-sm text-gray-500">
                    Nhận thông báo về các hoạt động tài khoản qua email
                  </p>
                </div>
                <Switch id="email-notifications" onCheckedChange={handleToggle} />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="security-alerts">Cảnh báo bảo mật</Label>
                  <p className="text-sm text-gray-500">
                    Nhận cảnh báo khi có hoạt động đáng ngờ trên tài khoản của bạn
                  </p>
                </div>
                <Switch id="security-alerts" defaultChecked onCheckedChange={handleToggle} />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Bảo mật</CardTitle>
              <CardDescription>
                Cài đặt bảo mật cho tài khoản của bạn
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="two-factor">Xác thực hai yếu tố</Label>
                  <p className="text-sm text-gray-500">
                    Bảo vệ tài khoản của bạn với xác thực hai yếu tố
                  </p>
                </div>
                <Switch id="two-factor" onCheckedChange={handleToggle} />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="activity-log">Nhật ký hoạt động</Label>
                  <p className="text-sm text-gray-500">
                    Lưu trữ lịch sử đăng nhập và hoạt động
                  </p>
                </div>
                <Switch id="activity-log" defaultChecked onCheckedChange={handleToggle} />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Settings;
