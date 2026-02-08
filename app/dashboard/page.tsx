import { getDashboardData } from "./actions";
import { DashboardClient } from "./_components/dashboard-client";

export default async function DashboardPage() {
  const result = await getDashboardData();
  const data = result.success ? result.data : null;

  return (
    <DashboardClient initialData={data} />
  );
}

