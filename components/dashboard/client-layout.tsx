"use client";

import React, { useState } from "react";
import { Sidebar } from "@/components/dashboard/sidebar";
import { DashboardFooter } from "@/components/dashboard/footer";
import { Notification } from "iconsax-react";
import { cn } from "@/lib/utils";
import Cookies from "js-cookie";

interface DashboardClientLayoutProps {
  children: React.ReactNode;
  initialCollapsed: boolean;
}

export function DashboardClientLayout({ children, initialCollapsed }: DashboardClientLayoutProps) {
  const [isCollapsed, setIsCollapsed] = useState(initialCollapsed);

  const handleToggle = (value: boolean) => {
    setIsCollapsed(value);
    Cookies.set("sidebar-collapsed", value.toString(), { expires: 365 });
  };
  
  return (
    <div className="min-h-screen bg-zinc-50 flex flex-col md:flex-row">
      <Sidebar isCollapsed={isCollapsed} setIsCollapsed={handleToggle} />
      
      <div 
        className={cn(
            "flex-1 flex flex-col min-w-0 transition-all duration-300 ease-in-out pb-20 md:pb-0",
            isCollapsed ? "md:pl-[88px]" : "md:pl-[280px]"
        )}
      >
        {/* Header */}
        <header className="h-16 md:h-20 bg-white/80 backdrop-blur-md border-b border-zinc-100 flex items-center justify-between px-6 md:px-8 sticky top-0 z-30">
          <div className="flex items-center md:hidden">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center shadow-lg shadow-primary/20">
               <img src="/gymble.png" alt="Gymble" className="w-5 h-5 brightness-0 invert" />
            </div>
          </div>

          <div className="flex-1" />

          <div className="flex items-center gap-3 md:gap-4">
            <button className="w-10 h-10 md:w-11 md:h-11 rounded-xl md:rounded-2xl bg-zinc-50 border border-zinc-100 flex items-center justify-center text-zinc-500 hover:text-primary hover:bg-white transition-all relative">
              <Notification size={20} color="currentColor" />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
            </button>
            <div className="h-10 md:h-11 pl-1 pr-1 md:pr-4 rounded-xl md:rounded-2xl bg-zinc-50 border border-zinc-100 flex items-center gap-2 md:gap-3 hover:bg-white transition-all cursor-pointer">
              <div className="w-8 h-8 md:w-9 md:h-9 rounded-lg md:rounded-xl overflow-hidden bg-primary/10 flex items-center justify-center text-primary font-black text-xs md:text-sm">
                AD
              </div>
              <div className="hidden sm:block">
                <p className="text-[12px] md:text-[13px] font-black text-zinc-900 leading-none">Admin Demo</p>
                <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider mt-0.5">Manager</p>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-8">
          {children}
        </main>

        <div className="hidden md:block">
            <DashboardFooter />
        </div>
      </div>
    </div>
  );
}
