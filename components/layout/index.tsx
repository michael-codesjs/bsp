import React from "react";
import { Sidebar } from "./sidebar";
import { DashboardFooter } from "./footer";
import { DashboardHeader } from "./header";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ 
  children, 
}: DashboardLayoutProps) {
  return (
    <div className="flex h-screen w-full bg-zinc-50 overflow-hidden">
      <Sidebar />
      
      <div className="flex-1 flex flex-col h-full w-full overflow-hidden transition-all duration-300 ease-in-out">
        {/* Header is part of the fixed flex column, so it stays at the top */}
        <DashboardHeader />

        {/* Main scrolls independently */}
        <main className="flex-1 overflow-y-auto px-4 md:px-8 pb-32 md:pb-8 w-full scroll-smooth">
          <div className="flex flex-col min-h-full">
            <div className="flex-1">
                {children}
            </div>
            
            <div className="hidden md:block pt-8">
                <DashboardFooter />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
