"use client";

import React, { useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { ArrowLeft2, ArrowRight2 } from "iconsax-react";

interface DateStripProps {
  selectedDate: Date | null;
  onSelectDate: (date: Date) => void;
  className?: string;
}

export function DateStrip({ selectedDate, onSelectDate, className }: DateStripProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Generate next 30 days
  const days = React.useMemo(() => {
    const arr = [];
    const today = new Date();
    for (let i = 0; i < 30; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      arr.push(d);
    }
    return arr;
  }, []);

  const isSameDate = (d1: Date, d2: Date | null) => {
    if (!d2) return false;
    return (
      d1.getDate() === d2.getDate() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getFullYear() === d2.getFullYear()
    );
  };

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
        const amount = 200;
        scrollContainerRef.current.scrollBy({ left: direction === "left" ? -amount : amount, behavior: "smooth" });
    }
  };

  return (
    <div className={cn("relative group", className)}>
        {/* Gradients to hint scroll */}
        <div className="absolute left-0 top-0 bottom-0 w-8 bg-linear-to-r from-white to-transparent z-10 pointer-events-none md:hidden" />
        <div className="absolute right-0 top-0 bottom-0 w-8 bg-linear-to-l from-white to-transparent z-10 pointer-events-none md:hidden" />

        <button 
            onClick={() => scroll("left")}
            className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-8 h-8 items-center justify-center bg-white border border-zinc-100 rounded-full shadow-md z-20 text-zinc-500 hover:text-primary transition-colors disabled:opacity-0"
        >
            <ArrowLeft2 size={16} color="currentColor" />
        </button>

        <div 
            ref={scrollContainerRef}
            className="flex gap-3 overflow-x-auto scrollbar-hide py-2 px-1 relative no-scrollbar"
        >
            {days.map((date, i) => {
                const isSelected = isSameDate(date, selectedDate);
                const isToday = isSameDate(date, new Date());
                
                return (
                    <button
                        key={i}
                        onClick={() => onSelectDate(date)}
                        className={cn(
                            "flex flex-col items-center justify-center min-w-18 h-20 rounded-2xl border transition-all duration-300 shrink-0",
                            isSelected 
                                ? "bg-primary border-primary text-white shadow-lg shadow-primary/30 transform -translate-y-0.5" 
                                : "bg-white border-zinc-100 text-zinc-500 hover:border-primary/50 hover:bg-zinc-50"
                        )}
                    >
                        <span className={cn(
                            "text-[11px] font-bold uppercase tracking-wider mb-1",
                            isSelected ? "text-zinc-400" : "text-zinc-400"
                        )}>
                            {date.toLocaleDateString('en-US', { weekday: 'short' })}
                        </span>
                        <span className={cn(
                            "text-xl font-black",
                            isSelected ? "text-white" : "text-zinc-900"
                        )}>
                            {date.getDate()}
                        </span>
                        {isToday && (
                             <div className={cn("absolute top-2 right-2 w-1.5 h-1.5 rounded-full", isSelected ? "bg-white" : "bg-primary")} />
                        )}
                    </button>
                );
            })}
        </div>

        <button 
            onClick={() => scroll("right")}
            className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-8 h-8 items-center justify-center bg-white border border-zinc-100 rounded-full shadow-md z-20 text-zinc-500 hover:text-primary transition-colors"
        >
            <ArrowRight2 size={16} color="currentColor" />
        </button>
    </div>
  );
}
