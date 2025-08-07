import { Toaster } from "@/components/atoms/toaster";
import Header from "@/components/templates/admin/header";
import Sidebar from "@/components/templates/admin/sidebar";
import { getCurrentUserServer } from "@/lib/servers/user.actions";
import NextTopLoader from "nextjs-toploader";
// import Loading from "@/app/loading_screen";
import { Role } from "@/types";
import { redirect } from "next/navigation";

const AdminLayout = async ({ children }: { children: React.ReactNode }) => {
  const res = await getCurrentUserServer();
  const user = res?.result;
  if (user?.role !== Role.Admin) {
    return redirect("/");
  }

  return (
    <>
      <NextTopLoader showSpinner={false} />
      <Toaster />
      <div className="flex">
        <Sidebar />
        <main className="w-full flex-1 overflow-hidden">
          <Header />
          {children}
        </main>
      </div>
    </>
  );
};

export default AdminLayout;
