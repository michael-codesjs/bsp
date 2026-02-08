import { cookies } from "next/headers";
import { ProfileForm } from "./profile-form";

async function getBusinessDetails(token: string) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "https://test-api.gymble.us"}/website/business/profile/bisDetails`, {
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      next: { revalidate: 0 } // Don't cache for editing
    });
    
    if (!response.ok) return null;
    const data = await response.json();
    return data?.data || data;
  } catch (error) {
    console.error("Failed to fetch business details on server:", error);
    return null;
  }
}

export default async function ProfilePage() {
  const cookieStore = await cookies();
  
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

  const initialData = token ? await getBusinessDetails(token) : null;

  return (
    <ProfileForm initialData={initialData} />
  );
}
