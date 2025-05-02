
import AuthLayout from "@/components/layouts/AuthLayout";
import RegisterForm from "@/components/auth/RegisterForm";

const RegisterPage = () => {
  return (
    <AuthLayout
      heading="Đăng ký"
      subheading="Tạo tài khoản mới để sử dụng dịch vụ"
    >
      <RegisterForm />
    </AuthLayout>
  );
};

export default RegisterPage;
