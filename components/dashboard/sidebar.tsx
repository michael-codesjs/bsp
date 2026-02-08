"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Element3, 
  Calendar, 
  Setting2, 
  Logout, 
  ArrowLeft2,
  Profile
} from "iconsax-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

const menuItems = [
  { icon: Element3, label: "Overview", href: "/dashboard" },
  { icon: Profile, label: "Profile", href: "/dashboard/profile" },
  { icon: Calendar, label: "Schedules", href: "/dashboard/schedules" },
  { icon: Setting2, label: "Settings", href: "/dashboard/settings" },
];

interface SidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: (value: boolean) => void;
}

export function Sidebar({ isCollapsed, setIsCollapsed }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Desktop Sidebar */}
      <motion.aside
        initial={false}
        animate={{ width: isCollapsed ? 88 : 280 }}
        className="fixed left-0 top-0 bottom-0 z-40 bg-white border-r border-zinc-100 hidden md:flex flex-col transition-all duration-300 ease-in-out"
      >
        {/* Logo Area */}
        <div className="h-20 flex items-center px-6 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shrink-0 shadow-lg shadow-primary/20">
              <Image src="/gymble.png" alt="Gymble" width={24} height={24} className="brightness-0 invert" />
            </div>
            <AnimatePresence>
              {!isCollapsed && (
                <motion.span 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="font-black text-xl tracking-tight text-zinc-900"
                >
                  Gymble
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 space-y-2">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link 
                key={item.href} 
                href={item.href}
                className={cn(
                  "flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-200 group relative",
                  isActive 
                    ? "bg-primary text-white shadow-lg shadow-primary/30" 
                    : "text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900"
                )}
              >
                <item.icon 
                  variant={isActive ? "Bold" : "Linear"} 
                  size={22} 
                  color="currentColor"
                  className={cn("shrink-0", isActive ? "text-white" : "group-hover:scale-110 transition-transform")} 
                />
                <AnimatePresence>
                  {!isCollapsed && (
                    <motion.span
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      className="font-bold text-sm whitespace-nowrap"
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
                
                {isCollapsed && (
                  <div className="absolute left-full ml-4 px-3 py-2 bg-zinc-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity font-bold">
                    {item.label}
                  </div>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Bottom Actions */}
        <div className="p-4 space-y-2 border-t border-zinc-100">
          <button 
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900 transition-all group"
          >
            <motion.div
              animate={{ rotate: isCollapsed ? 180 : 0 }}
              className="shrink-0"
            >
              <ArrowLeft2 size={22} color="currentColor" />
            </motion.div>
            {!isCollapsed && <span className="font-bold text-sm">Collapse</span>}
          </button>

          <button className="w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl text-red-500 hover:bg-red-50 transition-all group">
            <Logout size={22} color="currentColor" className="shrink-0" />
            {!isCollapsed && <span className="font-bold text-sm">Log Out</span>}
          </button>
        </div>
      </motion.aside>

      {/* Mobile Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-t border-zinc-100 md:hidden pb-safe">
        <div className="flex items-center justify-around h-16 px-2">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link 
                key={item.href} 
                href={item.href}
                className={cn(
                  "flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all duration-200 min-w-[64px]",
                  isActive ? "text-primary scale-110" : "text-zinc-400"
                )}
              >
                <div className={cn(
                  "p-2 rounded-xl transition-colors",
                  isActive ? "bg-primary/10" : ""
                )}>
                  <item.icon 
                    variant={isActive ? "Bold" : "Linear"} 
                    size={20} 
                    color="currentColor"
                  />
                </div>
                <span className={cn(
                  "text-[10px] font-black uppercase tracking-widest mt-0.5 transition-all text-center",
                  isActive ? "opacity-100" : "opacity-0 h-0"
                )}>
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}
