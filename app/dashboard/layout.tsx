import { cookies } from "next/headers";
import { DashboardClientLayout } from "@/components/dashboard/client-layout";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const initialCollapsed = cookieStore.get("sidebar-collapsed")?.value === "true";

  return (
    <DashboardClientLayout initialCollapsed={initialCollapsed}>
      {children}
    </DashboardClientLayout>
  );
}
