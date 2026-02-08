import React from "react";
import Image from "next/image";
import { Clock, Location, User } from "iconsax-react";
import { cn } from "@/lib/utils";

interface ScheduleItemProps {
  image: string;
  title: string;
  date: string;
  time: string;
  duration: string;
  location: string;
  instructor?: string;
  slotsAvailable: number;
}

export function CompactScheduleItem({
  image,
  title,
  date,
  time,
  duration,
  location,
  instructor,
  slotsAvailable,
}: ScheduleItemProps) {
  const timeParts = time.split(' ');
  const displayTime = timeParts[0];
  const timeSuffix = timeParts[1] || "";

  return (
    <div className="flex items-center gap-4 p-3 border border-zinc-100 rounded-2xl hover:border-zinc-200 hover:shadow-md transition-all bg-white group select-none cursor-pointer">
      {/* Time/Type Column */}
      <div className="w-16 shrink-0 flex flex-col items-center justify-center text-center">
        <span className={cn("text-base font-black leading-none", displayTime === "Appt" ? "text-primary" : "text-zinc-900")}>
            {displayTime}
        </span>
        {timeSuffix && <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-tighter mt-0.5">{timeSuffix}</span>}
        <span className="text-[9px] font-bold text-zinc-400 mt-1 uppercase tracking-tighter">{duration}</span>
      </div>

      {/* Image */}
      <div className="relative w-14 h-14 shrink-0 rounded-xl overflow-hidden bg-zinc-50 border border-zinc-100/50">
        <Image src={image} alt={title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
      </div>

      {/* Details */}
      <div className="flex-1 min-w-0 flex flex-col gap-0.5">
        <h3 className="font-bold text-zinc-900 text-[13px] leading-tight line-clamp-2 group-hover:text-primary transition-colors">{title}</h3>
        <div className="flex flex-col gap-0.5 text-zinc-500">
            <div className="flex items-center gap-1">
                <Location size={12} variant="Linear" color="currentColor" className="shrink-0" />
                <span className="text-[10px] font-medium truncate">{location === "-" ? "Online / TBD" : location}</span>
            </div>
            {instructor && instructor !== "-" && (
                <div className="flex items-center gap-1">
                    <User size={12} variant="Linear" color="currentColor" className="shrink-0" />
                    <span className="text-[10px] font-medium truncate">{instructor}</span>
                </div>
            )}
        </div>
      </div>

      {/* Action Area */}
      <div className="flex flex-col items-center gap-1.5 shrink-0 ml-auto">
         {slotsAvailable > 0 && (
            <span className="text-[9px] font-bold text-zinc-400 whitespace-nowrap px-2 py-0.5 bg-zinc-50 rounded-full border border-zinc-100">
                {slotsAvailable} LEFT
            </span>
         )}
         <button className="text-[10px] font-black text-white bg-primary px-4 py-1.5 rounded-full hover:bg-primary/90 transition-all shadow-sm shadow-primary/20 active:scale-95">
            BOOK
         </button>
      </div>
    </div>
  );
}
