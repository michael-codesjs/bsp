import { cookies } from "next/headers";
import { DashboardClientLayout } from "@/components/dashboard/client-layout";

async function getBusinessDetails(token: string) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "https://test-api.gymble.us"}/website/business/profile/bisDetails`, {
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      next: { revalidate: 60 } // Cache for 60 seconds
    });
    
    if (!response.ok) return null;
    const data = await response.json();
    return data?.data || data;
  } catch (error) {
    console.error("Failed to fetch business details on server:", error);
    return null;
  }
}

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const initialCollapsed = cookieStore.get("sidebar-collapsed")?.value === "true";
  
  // Extract token from auth-storage cookie
  const authStorage = cookieStore.get("auth-storage")?.value;
  let token = null;
  if (authStorage) {
    try {
      const decoded = decodeURIComponent(authStorage);
      const { state } = JSON.parse(decoded);
      token = state?.token;
    } catch (e) {
      console.error("Failed to parse auth token from cookie", e);
    }
  }

  const businessData = token ? await getBusinessDetails(token) : null;

  return (
    <DashboardClientLayout 
      initialCollapsed={initialCollapsed} 
      initialBusinessData={businessData}
    >
      {children}
    </DashboardClientLayout>
  );
}
