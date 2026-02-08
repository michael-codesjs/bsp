"use client";

import { BusinessProfile } from "@/types/business";

interface ProfileAboutProps {
  business: BusinessProfile;
}

export function ProfileAbout({ business }: ProfileAboutProps) {
  return (
    <section className="space-y-6">
        <h3 className="text-xl font-black text-zinc-900">About {business.name}</h3>
        <div className="bg-white p-8 rounded-3xl border border-zinc-100">
            <div className="prose prose-zinc max-w-none text-zinc-600 leading-relaxed text-sm">
                {business.description || "No description provided."}
            </div>
        </div>
    </section>
  );
}
