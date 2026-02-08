import { cookies } from "next/headers";
import { ProfileForm } from "./_components";

async function getBusinessDetails(token: string) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "https://test-api.gymble.us"}/website/business/profile/bisDetails`, {
      method: "GET",
      headers: {
        "x-auth-token": token,
        "Content-Type": "application/json",
      },
      next: { revalidate: 0 } // Don't cache for editing
    });
    
    if (!response.ok) return null;
    const data = await response.json();
    return (data?.data || data).businessData;
  } catch (error) {
    console.error("Failed to fetch business details on server:", error);
    return null;
  }
}

export default async function ProfilePage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value!;
  const initialData = await getBusinessDetails(token);

  console.log('initialData:', initialData)

  return (
    <ProfileForm initialData={initialData} />
  );
}
