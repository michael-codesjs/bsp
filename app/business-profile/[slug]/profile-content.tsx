"use client";

import React, { useState } from "react";
import Image from "next/image";
import { 
  Location,
  Verify,
  CalendarTick,
  Tag,
  Star1,
  Flash,
  Clock,
  Heart,
  Element3,
  MessageQuestion,
  ArrowRight
} from "iconsax-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { BusinessProfile } from "@/types/business";
import { ScheduleCard } from "@/components/ui/schedule-card";

interface ProfileContentProps {
  business: BusinessProfile;
}

const MOCK_SCHEDULE = [
  {
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=400&auto=format&fit=crop",
    title: "Sundays Exp",
    date: "02-08-2026",
    time: "9:00 AM",
    duration: "3H 0M",
    location: "Strongest NY",
    instructor: "-",
    slotsAvailable: 20
  },
  {
    image: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=400&auto=format&fit=crop",
    title: "strongest class",
    date: "02-08-2026",
    time: "9:00 AM",
    duration: "2H 0M",
    location: "Strongest NY",
    instructor: "-",
    slotsAvailable: 5
  },
  {
    image: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?q=80&w=400&auto=format&fit=crop",
    title: "Commander class",
    date: "02-08-2026",
    time: "9:00 AM",
    duration: "2H 0M",
    location: "Strongest NY",
    instructor: "-",
    slotsAvailable: 2
  }
];

export default function ProfileContent({ business }: ProfileContentProps) {
  const [activeTab, setActiveTab] = useState("schedule");

  return (
    <div className="min-h-screen bg-white font-sans text-black selection:bg-primary selection:text-white pb-20">
      
      {/* Search Header */}
      <header className="h-16 flex items-center justify-between px-6 md:px-12 border-b border-zinc-100 bg-white sticky top-0 z-50">
        <div className="flex items-center gap-8">
          <Image src="/gymble.png" alt="Gymble" width={110} height={110} className="object-contain" />
        </div>

        <div className="hidden md:flex items-center gap-6">
          <button className="text-[13px] font-bold text-zinc-900 hover:text-primary transition-colors">Login</button>
          <div className="flex items-center gap-2 text-[13px] font-bold text-zinc-900 group cursor-pointer">
            <Location size={18} variant="Linear" color="currentColor" className="text-primary" />
            <span>New Jersey</span>
          </div>
          <button className="w-10 h-10 flex items-center justify-center text-zinc-900 hover:bg-zinc-50 rounded-full transition-colors">
            <Element3 size={24} variant="Linear" />
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 md:px-12 py-8 space-y-12">
        
        {/* Hero Section */}
        <section className="space-y-6">
          <div className="relative h-[320px] md:h-[400px] w-full rounded-4xl overflow-hidden shadow-sm">
            <Image 
              src={business.banner} 
              alt={business.name} 
              fill 
              className="object-cover"
              priority
            />
          </div>

          <div className="flex flex-col md:flex-row md:items-center gap-6 px-4">
            {/* Logo Container */}
            <div className="relative -mt-20 md:-mt-24 w-32 h-32 md:w-36 md:h-36 rounded-full bg-white p-1.5 shadow-2xl shadow-black/5 z-10 flex items-center justify-center">
              <div className="relative w-full h-full rounded-full overflow-hidden bg-zinc-50 border border-zinc-100 flex items-center justify-center">
                <Image 
                  src={business.logo} 
                  alt={business.name} 
                  fill 
                  className="object-cover"
                  sizes="(max-width: 768px) 128px, 144px"
                />
              </div>
            </div>

            <div className="space-y-1.5 py-4">
              <h1 className="text-2xl md:text-4xl font-black tracking-tight text-zinc-900 leading-[1.1]">
                {business.name}
              </h1>
              <div className="flex items-center gap-2 text-zinc-400">
                <Location size={16} variant="Linear" className="text-primary shrink-0 opacity-80" />
                <span className="text-sm font-bold uppercase tracking-[0.1em]">{business.location}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Tabs & Content */}
        <section className="space-y-8">
          <div className="flex items-center gap-8 border-b border-zinc-100 px-4">
            <button 
              onClick={() => setActiveTab("schedule")}
              className={cn(
                "pb-4 text-[13px] font-black uppercase tracking-widest transition-all relative",
                activeTab === "schedule" ? "text-primary" : "text-zinc-400 hover:text-zinc-600"
              )}
            >
              Upcoming Schedule
              {activeTab === "schedule" && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />
              )}
            </button>
            <button 
              onClick={() => setActiveTab("listings")}
              className={cn(
                "pb-4 text-[13px] font-black uppercase tracking-widest transition-all relative",
                activeTab === "listings" ? "text-primary" : "text-zinc-400 hover:text-zinc-600"
              )}
            >
              Our Listings
              {activeTab === "listings" && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />
              )}
            </button>
          </div>

          <div className="px-4 space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl md:text-3xl font-black tracking-tight text-zinc-900">Upcoming Schedule</h2>
              <button className="flex items-center gap-2 text-[13px] font-bold text-primary hover:underline">
                View All
                <ArrowRight size={16} />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {MOCK_SCHEDULE.map((item, i) => (
                <ScheduleCard key={i} {...item} />
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Floating Chat */}
      <button className="fixed bottom-8 right-8 w-14 h-14 bg-black text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all z-50">
        <MessageQuestion size={28} variant="Bold" color="currentColor" />
      </button>

    </div>
  );
}
