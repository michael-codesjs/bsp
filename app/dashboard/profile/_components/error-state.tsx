"use client";

import { Button } from "@/components/ui/button";
import { Refresh, Warning2 } from "iconsax-react";
import { useRouter } from "next/navigation";

export function ErrorState() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-8 space-y-6">
      <div className="w-20 h-20 bg-red-50 rounded-3xl flex items-center justify-center">
        <Warning2 size={40} className="text-red-500" variant="Bold" color="currentColor" />
      </div>
      
      <div className="space-y-2 max-w-md">
        <h3 className="text-xl font-black text-zinc-900 tracking-tight">Failed to load profile</h3>
        <p className="text-sm font-medium text-zinc-500">
          We couldn't retrieve your business details. This might be a temporary connection issue.
        </p>
      </div>

      <Button
        onClick={() => router.refresh()}
        className="h-12 px-8 rounded-xl bg-zinc-900 text-white font-black text-xs uppercase tracking-widest gap-2 hover:bg-zinc-800 transition-all shadow-xl shadow-zinc-900/10"
      >
        <Refresh size={18} variant="Bold" color="currentColor" />
        Retry Connection
      </Button>
    </div>
  );
}
