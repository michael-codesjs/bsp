"use client";

import { Element3 } from "iconsax-react";
import { DateStrip } from "@/components/ui/date-strip";
import { CompactScheduleItem } from "@/components/ui/compact-schedule-item";
import { BusinessProfile } from "@/types/business";

interface ProfileScheduleProps {
  business: BusinessProfile;
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
  filteredSchedule: any[];
}

export function ProfileSchedule({ business, selectedDate, setSelectedDate, filteredSchedule }: ProfileScheduleProps) {
  return (
    <section className="space-y-6">
        <div className="flex items-center justify-between">
            <h3 className="text-xl font-black text-zinc-900">Upcoming Schedule</h3>
        </div>

         {/* Date Strip */}
        <div className="bg-white rounded-3xl p-1 shadow-sm border border-zinc-100/50 sticky top-20 z-30">
            <DateStrip 
                selectedDate={selectedDate} 
                onSelectDate={setSelectedDate}
            />
        </div>

        {/* Class List */}
        <div className="space-y-4">
            <div className="flex items-center justify-between px-2">
                <h3 className="text-sm font-bold text-zinc-900">
                    {selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric'})}
                </h3>
                <span className="text-xs font-bold text-zinc-400 uppercase tracking-wide">
                    {filteredSchedule.length} Classes
                </span>
            </div>

            {filteredSchedule.length > 0 ? (
                <div className="grid gap-4">
                    {filteredSchedule.map((item: any, i: number) => (
                        <CompactScheduleItem 
                            key={i} 
                            image={item.imageFileHash ? `https://gymble.us/storage/${item.imageFileHash}` : "/class-scheduling.png"}
                            title={item.title}
                            date={item.scheduleDate}
                            time={item.startTime}
                            duration={`${item.durationHr}H ${item.durationMin}M`}
                            location={item.location}
                            instructor={item.serviceTeamMemberDetail?.firstName || "Staff"}
                            slotsAvailable={item.remainQty}
                        />
                    ))}
                </div>
            ) : (
                <div className="py-12 flex flex-col items-center justify-center text-center bg-white rounded-3xl border border-dashed border-zinc-200">
                    <div className="w-12 h-12 bg-zinc-50 rounded-full flex items-center justify-center mb-3">
                        <Element3 size={20} className="text-zinc-300" variant="Bulk" color="currentColor" />
                    </div>
                    <p className="text-zinc-900 font-bold text-sm">No classes scheduled</p>
                    <p className="text-xs text-zinc-500 max-w-xs mt-1">
                        Select another date above.
                    </p>
                </div>
            )}
        </div>
    </section>
  );
}
