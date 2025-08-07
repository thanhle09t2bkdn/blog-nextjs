import PageContainer from "@/components/templates/admin/page-container";
import type { Metadata } from "next";
import DashboardAdmin from "@/components/organisms/dashboard-admin/DashboardAdmin";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Dashboard",
};

export default function page() {
  return (
    <PageContainer scrollable={true}>
      <div className="space-y-5">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-2xl font-bold tracking-tight">
            Hi, Welcome back 👋
          </h2>
        </div>
        <DashboardAdmin />
      </div>
    </PageContainer>
  );
}
