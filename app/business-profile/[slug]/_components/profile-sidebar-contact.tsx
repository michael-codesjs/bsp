"use client";

import { Map, Call, Sms } from "iconsax-react";
import { Button } from "@/components/ui/button";
import { BusinessProfile } from "@/types/business";

interface ProfileSidebarContactProps {
  business: BusinessProfile;
}

export function ProfileSidebarContact({ business }: ProfileSidebarContactProps) {
  return (
    <div className="space-y-6">
        {/* Map Card */}
        <div className="bg-white p-1 rounded-3xl border border-zinc-100 shadow-sm overflow-hidden group">
            <div className="relative h-48 w-full bg-zinc-100 rounded-2xl overflow-hidden mb-4">
                <iframe 
                    width="100%" 
                    height="100%" 
                    frameBorder="0" 
                    scrolling="no" 
                    marginHeight={0} 
                    marginWidth={0} 
                    src={`https://maps.google.com/maps?q=${encodeURIComponent(business.location)}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
                    className="filter grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
                ></iframe>
            </div>
            <div className="px-5 pb-5">
                <h4 className="font-bold text-zinc-900 mb-1">Visit Us</h4>
                <p className="text-xs text-zinc-500 font-medium mb-4 leading-relaxed line-clamp-2">
                    {business.location}
                </p>
                <Button variant="outline" className="w-full h-10 text-xs font-bold rounded-xl border-zinc-200 hover:bg-zinc-50 hover:text-zinc-900">
                    <Map size={16} className="mr-2" color="currentColor" />
                    Get Directions
                </Button>
            </div>
        </div>

        {/* Contact Card */}
        <div className="bg-white p-6 rounded-3xl border border-zinc-100 shadow-sm space-y-4">
            <h4 className="font-bold text-zinc-900">Contact Info</h4>
            <div className="space-y-3">
                {business.phone && (
                    <a href={`tel:${business.phone}`} className="flex items-center gap-3 text-sm font-medium text-zinc-600 hover:text-black transition-colors p-3 hover:bg-zinc-50 rounded-xl -mx-3">
                        <div className="w-8 h-8 rounded-full bg-zinc-100 flex items-center justify-center shrink-0">
                            <Call size={16} className="text-zinc-900" color="currentColor" />
                        </div>
                        {business.phone}
                    </a>
                )}
                {business.email && (
                    <a href={`mailto:${business.email}`} className="flex items-center gap-3 text-sm font-medium text-zinc-600 hover:text-black transition-colors p-3 hover:bg-zinc-50 rounded-xl -mx-3">
                        <div className="w-8 h-8 rounded-full bg-zinc-100 flex items-center justify-center shrink-0">
                            <Sms size={16} className="text-zinc-900" color="currentColor" />
                        </div>
                        <span className="truncate">{business.email}</span>
                    </a>
                )}
            </div>
        </div>
    </div>
  );
}
