
import DashboardLayout from "@/components/layouts/DashboardLayout";
import UserTable from "@/components/admin/UserTable";

const AdminPage = () => {
  return (
    <DashboardLayout requireAdmin>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Quản lý người dùng</h1>
        <p className="text-gray-500">
          Quản lý tất cả người dùng trong hệ thống.
        </p>
        
        <UserTable />
      </div>
    </DashboardLayout>
  );
};

export default AdminPage;
