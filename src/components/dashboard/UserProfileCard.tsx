
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { formatDistance } from "date-fns";
import { vi } from "date-fns/locale";

const UserProfileCard = () => {
  const { currentUser } = useAuth();

  if (!currentUser) return null;

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return formatDistance(date, new Date(), { 
        addSuffix: true,
        locale: vi
      });
    } catch (error) {
      return "Không xác định";
    }
  };

  const getRoleName = (role: string) => {
    return role === "admin" ? "Quản trị viên" : "Người dùng";
  };

  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-2xl">Thông tin tài khoản</CardTitle>
        <CardDescription>
          Chi tiết thông tin tài khoản của bạn
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col md:flex-row gap-6 items-center md:items-start">
        <Avatar className="h-24 w-24 border-4 border-auth-muted">
          <AvatarFallback className="text-2xl bg-auth text-auth-foreground">
            {getInitials(currentUser.name)}
          </AvatarFallback>
        </Avatar>
        <div className="space-y-4 text-center md:text-left">
          <div>
            <h3 className="text-xl font-semibold">{currentUser.name}</h3>
            <p className="text-gray-500">{currentUser.email}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Vai trò</p>
              <p className="font-medium">{getRoleName(currentUser.role)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Tham gia</p>
              <p className="font-medium">{formatDate(currentUser.createdAt)}</p>
            </div>
          </div>
          
          <div className="bg-auth-muted text-auth p-3 rounded-md inline-block">
            <p className="text-sm">
              ID: <span className="font-mono">{currentUser.id}</span>
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserProfileCard;
