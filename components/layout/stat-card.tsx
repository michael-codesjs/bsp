"use client";

import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export interface StatCardProps {
  label: string;
  value: string | number;
  displayValue: string;
  change?: string;
  icon: any; // Icon type
  gradient: string;
  bgImage?: string;
  loading?: boolean;
  className?: string;
}

export function StatCard({
  label,
  value,
  displayValue,
  change,
  icon: IconComponent,
  gradient,
  bgImage,
  loading = false,
  className,
}: StatCardProps) {
  return (
    <div 
      className={cn(
        "relative flex-1 h-[168px] flex flex-col p-6 gap-5 border border-white/10 rounded-[20px] overflow-hidden isolate transition-all hover:shadow-xl group",
        className
      )}
      style={{ background: gradient }}
    >
      {bgImage && (
        <div 
          className="absolute w-[417px] h-[278px] -right-[223px] -top-[105px] bg-cover bg-center opacity-100 transition-opacity"
          style={{ 
            backgroundImage: `url(${bgImage})`,
            mixBlendMode: 'soft-light',
            zIndex: 0
          }}
        />
      )}
      
      <div className="relative z-10 flex flex-col h-full justify-between">
        <div className="flex justify-between items-center">
          <p className="text-white font-semibold text-base leading-[120%]">{label}</p>
          <div className="w-11 h-11 flex items-center justify-center bg-white/95 rounded-full p-2.5 shadow-sm text-zinc-950">
            <IconComponent size={24} color="currentColor" variant="Bold" />
          </div>
        </div>
        
        {loading ? (
             <div className="space-y-2">
                <Skeleton className="h-10 w-32 bg-white/20" />
                <Skeleton className="h-4 w-24 bg-white/10" />
             </div>
        ) : (
          <div>
            <p className="text-white font-semibold text-[32px] leading-[121.1%] tracking-tight">{displayValue}</p>
            {change && (
                <p className={`text-sm font-bold mt-1 ${change.startsWith('+') ? 'text-white' : 'text-red-200'}`}>
                    {change} <span className="text-white/60 font-semibold text-xs ml-1 uppercase tracking-widest">from last month</span>
                </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
