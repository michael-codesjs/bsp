"use client";

import React, { useState, useEffect, useMemo } from "react";
import { BusinessProfile } from "@/types/business";
import { ProfileNavbar } from "./profile-navbar";
import { ProfileHero } from "./profile-hero";
import { ProfileAbout } from "./profile-about";
import { ProfileSidebarContact } from "./profile-sidebar-contact";
import { ProfileSchedule } from "./profile-schedule";
import { ProfileListings } from "./profile-listings";
import { ProfileChatButton } from "./profile-chat-button";

interface ProfileContentProps {
  business: BusinessProfile;
}

export default function ProfileContent({ business }: ProfileContentProps) {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  
  // Create a scroll listener for sticky nav effects if needed
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const filteredSchedule = useMemo(() => {
     if (!selectedDate) return business.upcoming || [];
     const dateString = selectedDate.toISOString().split("T")[0];
     return (business.upcoming || []).filter((item: any) => item.scheduleDate === dateString);
  }, [selectedDate, business.upcoming]);

  return (
    <div className="min-h-screen bg-zinc-50 font-sans text-zinc-900 pb-32">
        <ProfileNavbar scrolled={scrolled} />
        <ProfileHero business={business} />

        {/* Main Content Layout */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Right Column: Sticky Info (4 cols) */}
            <div className="lg:col-span-4 space-y-6">
                <div className="sticky top-24 space-y-6">
                    <ProfileAbout business={business} />
                    <ProfileSidebarContact business={business} />
                </div>
            </div>
            
            {/* Left Column: Schedule & Feed (8 cols) */}
            <div className="lg:col-span-8 space-y-10">
                <div className="space-y-12">
                    <ProfileSchedule 
                        business={business} 
                        selectedDate={selectedDate} 
                        setSelectedDate={setSelectedDate} 
                        filteredSchedule={filteredSchedule} 
                    />
                    <ProfileListings business={business} />
                </div>
            </div>
        </div>

        <ProfileChatButton />
    </div>
  );
}
