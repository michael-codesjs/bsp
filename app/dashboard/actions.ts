"use server";
import { cookies } from "next/headers";

export async function getDashboardData(startDate = "2026-01-01", endDate = "2026-12-31") {
  const cookieStore = await cookies();
  
  // Try to get token from auth-storage or direct token cookie
  let token = cookieStore.get("token")?.value;
  
  if (!token) {
    const authStorage = cookieStore.get("auth-storage")?.value;
    if (authStorage) {
      try {
        const decoded = decodeURIComponent(authStorage);
        const { state } = JSON.parse(decoded);
        token = state?.token;
      } catch (e) {
        console.error("Failed to parse auth token from cookie in dashboard action", e);
      }
    }
  }

  if (!token) {
    return { success: false, error: "No authentication token found" };
  }

  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://test-api.gymble.us";
    const response = await fetch(`${apiUrl}/test/finance`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token
      },
      body: JSON.stringify({
        locationId: 0,
        startDate: startDate,
        endDate: endDate
      }),
      cache: "no-store"
    });

    const resBody = await response.json();

    if (!response.ok) {
        return { success: false, error: resBody?.message || "Failed to fetch dashboard data" };
    }

    const data = resBody?.data || resBody;
    return { success: true, data };
  } catch (error: any) {
    console.error("Dashboard Data Fetch Error:", error);
    return { success: false, error: error.message };
  }
}
