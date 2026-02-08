"use client";

import { CompactScheduleItem } from "@/components/ui/compact-schedule-item";
import { BusinessProfile } from "@/types/business";

interface ProfileListingsProps {
  business: BusinessProfile;
}

export function ProfileListings({ business }: ProfileListingsProps) {
  if (!business.listings || business.listings.length === 0) return null;

  return (
    <section className="space-y-6">
         <div className="flex items-center justify-between">
            <h3 className="text-xl font-black text-zinc-900">Services & Appointments</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {business.listings.map((item: any, i: number) => {
                 const data = item.data || {};
                 // Find a more descriptive location if possible
                 const loc = data.serviceLocationData?.name || data.trmtLocations?.name || data.location || "-";
                 return (
                    <CompactScheduleItem 
                        key={i} 
                        image={data.imageFileHash ? `https://gymble.us/storage/${data.imageFileHash}` : "/booking-page.png"}
                        title={data.title || data.name || "Untitled Listing"}
                        date={"-"} 
                        time={"Appt"}
                        duration={"Var"}
                        location={loc}
                        instructor={data.staffName || "-"}
                        slotsAvailable={0} // Hide spots left for generic listings if not applicable
                    />
                 )
            })}
        </div>
    </section>
  );
}
