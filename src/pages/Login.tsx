
import AuthLayout from "@/components/layouts/AuthLayout";
import LoginForm from "@/components/auth/LoginForm";

const LoginPage = () => {
  return (
    <AuthLayout
      heading="Đăng nhập"
      subheading="Đăng nhập để truy cập vào tài khoản của bạn"
      isLogin
    >
      <LoginForm />
    </AuthLayout>
  );
};

export default LoginPage;
