"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ProfileNavbarProps {
  scrolled: boolean;
}

export function ProfileNavbar({ scrolled }: ProfileNavbarProps) {
  return (
    <nav className={cn(
        "fixed top-0 left-0 right-0 h-16 z-50 transition-all duration-300 flex items-center px-6 md:px-12 backdrop-blur-md border-b",
        scrolled ? "bg-white/80 border-zinc-200 shadow-sm" : "bg-transparent border-transparent"
    )}>
        <div className="flex items-center gap-2 mr-auto">
            <Image src="/gymble.png" alt="Gymble" width={100} height={32} className="object-contain" />
           
        </div>

        <div className="hidden md:flex items-center gap-6">
            <button className={cn("text-[13px] font-bold hover:text-primary transition-colors", scrolled ? "text-zinc-900" : "text-white/90 hover:text-white")}>
                Search
            </button>
            <button className={cn("text-[13px] font-bold hover:text-primary transition-colors", scrolled ? "text-zinc-900" : "text-white/90 hover:text-white")}>
                Log In
            </button>
            <Button 
                size="sm" 
                className={cn(
                    "rounded-full px-5 h-9 text-[11px] font-bold uppercase tracking-wide transition-all",
                    scrolled ? "bg-primary text-white hover:bg-primary/90" : "bg-white text-primary hover:bg-zinc-50"
                )}
            >
                Get App
            </Button>
        </div>
    </nav>
  );
}
