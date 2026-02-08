"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Refresh2 } from "iconsax-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center font-sans">
      <div className="space-y-6 max-w-md">
        <h2 className="text-3xl font-black text-zinc-900 tracking-tight">
          Something went wrong
        </h2>
        <p className="text-zinc-500 font-medium text-lg leading-relaxed">
          {error.message || "We encountered an unexpected error while loading this business profile."}
        </p>

        <div className="pt-4">
          <Button 
            onClick={() => reset()}
            className="h-14 px-8 rounded-full font-black text-xs uppercase tracking-widest bg-zinc-950 hover:bg-zinc-800 transition-colors shadow-xl"
          >
            <Refresh2 size={18} color="currentColor" className="mr-2" />
            Try Again
          </Button>
        </div>
      </div>
    </div>
  );
}
