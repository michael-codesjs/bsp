import { DashboardLayout } from "@/components/layout";

export default async function DashboardLayoutPage({ children }: { children: React.ReactNode }) {
  return (
    <DashboardLayout>
      {children}
    </DashboardLayout>
  );
}
