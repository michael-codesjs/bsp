"use client";

import React, { useEffect, useState } from "react";
import { Notification } from "iconsax-react";
import Image from "next/image";

export function DashboardHeader() {
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    // Sync with localStorage on mount
    const storedUser = localStorage.getItem("gymble_user");
    if (storedUser) {
      try {
        setUserData(JSON.parse(storedUser));
      } catch (e) {
        console.error("Failed to parse user data from localStorage", e);
      }
    }
  }, []);

  const businessName = userData?.brand || userData?.bisName || userData?.name || "Admin Demo";
  const initials = businessName
    .split(" ")
    .map((n: string) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2) || "AD";

  return (
    <header className="h-16 min-h-16 md:h-20 md:min-h-20 bg-transparent flex items-center justify-between px-6 md:px-8 sticky top-0 z-30 transition-all">
      <div className="flex items-center md:hidden">
        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center shadow-lg shadow-primary/20">
          <Image src="/gymble.png" alt="Gymble" width={20} height={20} className="brightness-0 invert" />
        </div>
      </div>

      <div className="flex-1" />

      <div className="flex items-center gap-3 md:gap-4">
        <button className="w-10 h-10 md:w-11 md:h-11 rounded-xl md:rounded-2xl bg-zinc-50 border border-zinc-100 flex items-center justify-center text-zinc-500 hover:text-primary hover:bg-white transition-all relative">
          <Notification size={20} color="currentColor" />
          <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
        </button>
        
        <div className="h-10 md:h-11 pl-1 pr-1 md:pr-4 rounded-xl md:rounded-2xl bg-zinc-50 border border-zinc-100 flex items-center gap-2 md:gap-3 hover:bg-white transition-all cursor-pointer">
          {userData?.logo ? (
            <div className="w-8 h-8 md:w-9 md:h-9 rounded-lg md:rounded-xl overflow-hidden relative">
              <Image src={userData.logo} alt={businessName} fill className="object-cover" />
            </div>
          ) : (
            <div className="w-8 h-8 md:w-9 md:h-9 rounded-lg md:rounded-xl overflow-hidden bg-primary/10 flex items-center justify-center text-primary font-black text-xs md:text-sm">
              {initials}
            </div>
          )}
          
          <div className="hidden sm:block">
            <p className="text-[12px] md:text-[13px] font-black text-zinc-900 leading-none truncate max-w-[120px]">
              {businessName}
            </p>
            <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider mt-0.5">Manager</p>
          </div>
        </div>
      </div>
    </header>
  );
}
