import React from "react";
import Image from "next/image";
import { Calendar, Clock, Location, User } from "iconsax-react";
import { cn } from "@/lib/utils";

interface ScheduleCardProps {
  image: string;
  title: string;
  date: string;
  time: string;
  duration: string;
  location: string;
  instructor?: string;
  slotsAvailable: number;
  className?: string;
}

export function ScheduleCard({
  image,
  title,
  date,
  time,
  duration,
  location,
  instructor,
  slotsAvailable,
  className,
}: ScheduleCardProps) {
  return (
    <div className={cn("bg-white rounded-2xl border border-zinc-100 overflow-hidden flex flex-col group", className)}>
      <div className="p-4 flex gap-4">
        {/* Card Image */}
        <div className="relative w-24 h-24 shrink-0 rounded-xl overflow-hidden">
          <Image src={image} alt={title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
        </div>

        {/* Card Info */}
        <div className="flex-1 space-y-3">
          <h3 className="font-bold text-zinc-900 leading-tight">{title}</h3>
          
          <div className="grid grid-cols-2 gap-x-4 gap-y-2">
            <div className="flex items-center gap-1.5 text-zinc-500">
              <Calendar size={14} color="currentColor" />
              <span className="text-[11px] font-medium">{date}</span>
            </div>
            <div className="flex items-center gap-1.5 text-zinc-500">
              <Clock size={14} color="currentColor" />
              <span className="text-[11px] font-medium">{time}, {duration}</span>
            </div>
            <div className="flex items-center gap-1.5 text-zinc-500">
              <Location size={14} color="currentColor" />
              <span className="text-[11px] font-medium truncate">{location}</span>
            </div>
            <div className="flex items-center gap-1.5 text-zinc-500">
              <User size={14} color="currentColor" />
              <span className="text-[11px] font-medium">{instructor || "-"}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Card Footer */}
      <div className="mt-auto px-4 py-3 border-t border-zinc-50 flex items-center justify-between">
        <span className="text-[11px] font-bold text-zinc-900">{slotsAvailable} Slots Available</span>
        <button className="text-[11px] font-black text-primary hover:underline uppercase tracking-tight">
          Book Now
        </button>
      </div>
    </div>
  );
}
