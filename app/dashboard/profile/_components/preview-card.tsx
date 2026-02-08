"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "iconsax-react";
import { useRouter } from "next/navigation";

interface PreviewCardProps {
  businessLink?: string;
}

export function PreviewCard({ businessLink }: PreviewCardProps) {
  const router = useRouter();
  
  return (
    <section 
        className="lg:col-span-2 group relative p-8 rounded-[32px] bg-zinc-900 overflow-hidden cursor-pointer shadow-xl shadow-zinc-950/10 transition-all hover:translate-y-[-2px]"
        onClick={() => router.push(`/business-profile/${businessLink || "strongest-fitness"}`)}
    >
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[60px] transition-all group-hover:bg-primary/20" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Active Storefront</span>
                </div>
                <h3 className="text-xl font-black text-white tracking-tight">View your public portal live</h3>
                <p className="text-sm font-medium text-zinc-500">Check how your brand appears to athletes across the world.</p>
            </div>
            <Button className="h-12 px-8 rounded-xl bg-white text-zinc-950 hover:bg-zinc-100 font-black text-xs uppercase tracking-widest gap-3 shadow-2xl">
                Open Portal
                <ArrowRight size={18} variant="Bold" color="currentColor" />
            </Button>
        </div>
    </section>
  );
}
