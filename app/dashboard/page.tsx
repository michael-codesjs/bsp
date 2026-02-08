"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
  const router = useRouter();

  const handleLogout = () => {
    // Clear the auth cookie
    document.cookie = "auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    router.push("/login");
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-8 font-sans">
      <div className="w-full max-w-2xl space-y-6 text-center">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome to your private dashboard. This area is protected.
        </p>
        <div className="flex justify-center gap-4">
          <Button onClick={handleLogout} variant="secondary">
            Sign Out
          </Button>
          <Button onClick={() => router.push("/")}>
            Go Home
          </Button>
        </div>
      </div>
    </div>
  );
}
