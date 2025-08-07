import { LoginForm } from "@/components/molecules/LoginForm";
import CommonBreadcrumbs from "@/components/organisms/breadcrumbs/CommonBreadcrumbs";

const Login = () => {
  return (
    <>
      <CommonBreadcrumbs page="Sign In" />

      <div className="bg-white pt-5 pb-12 md:pt-16 md:pb-32">
        <div className="max-w-[90%] md:max-w-[1200px] px-0 md:px-5 xl:px-0 w-full mx-auto flex justify-center items-center">
          <div className="mt-5 flex justify-center items-center min-h-[60vh] md:min-h-[calc(100vh-520px)] w-full md:max-w-[400px]">
            <LoginForm />
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
