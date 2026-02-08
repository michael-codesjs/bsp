"use client";

import Image from "next/image";
import { Star1, Location, Call, ArrowRight, Instagram, Global } from "iconsax-react";
import { Button } from "@/components/ui/button";
import { BusinessProfile } from "@/types/business";

interface ProfileHeroProps {
  business: BusinessProfile;
}

export function ProfileHero({ business }: ProfileHeroProps) {
  return (
    <div className="relative h-[45vh] md:h-[55vh] min-h-[400px] w-full overflow-hidden bg-zinc-900">
        {/* Banner Image */}
        <Image 
            src={business.banner} 
            alt={business.name} 
            fill 
            className="object-cover opacity-80"
            priority
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-zinc-900 via-zinc-900/40 to-transparent" />
        
        {/* Content Container */}
        <div className="absolute bottom-0 left-0 right-0 px-6 md:px-12 pb-12 pt-32 max-w-7xl mx-auto flex flex-col md:flex-row items-end gap-8">
            {/* Logo */}
            <div className="relative w-28 h-28 md:w-36 md:h-36 rounded-3xl overflow-hidden border-4 border-white/10 shadow-2xl shrink-0 bg-white">
                <Image 
                    src={business.logo} 
                    alt={business.name} 
                    fill 
                    className="object-cover"
                />
            </div>

            {/* Text Info */}
            <div className="flex-1 space-y-3 mb-2">
                <div className="flex items-center gap-3">
                    <span className="bg-primary/20 backdrop-blur-md text-primary-foreground px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-primary/20">
                        Verified Business
                    </span>
                    <div className="flex items-center gap-1 text-yellow-400">
                        <Star1 size={14} variant="Bold" color="currentColor" />
                        <span className="text-white font-bold text-sm">{business.rating || "5.0"}</span>
                        <span className="text-white/60 text-xs font-medium">({business.reviews || 24} reviews)</span>
                    </div>
                </div>
                
                <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-none">
                    {business.name}
                </h1>

                <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-white/80 text-sm font-medium">
                    <div className="flex items-center gap-2">
                        <Location size={18} variant="Bold" className="text-white/60" color="currentColor" />
                        {business.location}
                    </div>
                     {business.phone && (
                        <div className="hidden md:flex items-center gap-2">
                            <Call size={18} variant="Bold" className="text-white/60" color="currentColor" />
                            {business.phone}
                        </div>
                    )}
                </div>
            </div>

            {/* Action Buttons (Desktop) */}
            <div className="hidden md:flex flex-col gap-3 shrink-0 mb-2">
                 <Button className="h-12 px-8 text-sm font-bold bg-white text-zinc-900 hover:bg-zinc-100 rounded-xl shadow-xl shadow-black/20 transform hover:-translate-y-1 transition-all">
                    Book a Class
                    <ArrowRight size={18} className="ml-2" color="currentColor" />
                </Button>
                <div className="flex gap-2 justify-end">
                     {business.socials?.instagram && (
                         <a href={business.socials.instagram} target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-xl text-white transition-all border border-white/10">
                             <Instagram size={20} color="currentColor" />
                         </a>
                     )}
                     {business.website && (
                         <a href={business.website} target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-xl text-white transition-all border border-white/10">
                             <Global size={20} color="currentColor" />
                         </a>
                     )}
                </div>
            </div>
        </div>
    </div>
  );
}
