"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { 
  Profile2User, 
  Chart21, 
  Calendar, 
  Monitor, 
  Hierarchy, 
  Shop 
} from "iconsax-react";

export type FeatureItem = {
  id: string;
  title: string;
  description: string;
  image: string;
  icon: React.ReactNode;
  className?: string;
};

const FEATURES: FeatureItem[] = [
  {
    id: "member-management",
    title: "Member CRM",
    description: "Automate memberships and communications.",
    image: "/member-management.png",
    icon: <Profile2User size={24} variant="Bulk" />,
    className: "md:col-span-2 md:row-span-2 bg-zinc-50",
  },
  {
    id: "business-analytics",
    title: "Analytics",
    description: "Real-time revenue tracking.",
    image: "/business-analytics.png",
    icon: <Chart21 size={24} variant="Bulk" />,
    className: "bg-blue-50 text-primary",
  },
  {
    id: "class-scheduling",
    title: "Scheduling",
    description: "Smart booking system.",
    image: "/class-scheduling.png",
    icon: <Calendar size={24} variant="Bulk" />,
    className: "bg-zinc-950 text-white",
  },
  {
    id: "booking-page",
    title: "Web Booking",
    description: "Custom storefronts.",
    image: "/booking-page.png",
    icon: <Monitor size={24} variant="Bulk" />,
    className: "md:col-span-2 bg-zinc-100",
  },
  {
    id: "multi-location",
    title: "Enterprise",
    description: "Manage multiple gyms.",
    image: "/multi-location.png",
    icon: <Hierarchy size={24} variant="Bulk" />,
    className: "bg-zinc-50",
  },
  {
    id: "pos-retail",
    title: "Point of Sale",
    description: "Inventory & retail sales.",
    image: "/pos-retail.png",
    icon: <Shop size={24} variant="Bulk" />,
    className: "bg-zinc-50",
  },
];

export function BentoGrid() {
  return (
    <div className="h-full w-full bg-zinc-50/50 p-8 lg:p-12 overflow-y-auto">
      <div className="max-w-4xl mx-auto h-full flex flex-col justify-center">
        <div className="mb-12 space-y-2">
          <h3 className="text-3xl font-black tracking-tighter uppercase italic">
            Built for <span className="text-primary">Performance.</span>
          </h3>
          <p className="text-zinc-500 font-medium max-w-md">
            The all-in-one operating system for modern boutique fitness and combat sports clubs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[180px]">
          {FEATURES.map((feature, i) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className={cn(
                "relative group overflow-hidden rounded-4xl p-8 border border-zinc-100 flex flex-col justify-between transition-all hover:shadow-2xl hover:shadow-zinc-200/50",
                feature.className
              )}
            >
              <div className="relative z-10">
                <div className={cn(
                  "w-12 h-12 rounded-2xl flex items-center justify-center mb-6 shadow-sm",
                  feature.id === "class-scheduling" ? "bg-white/10" : "bg-white"
                )}>
                  <span className={cn(
                    "text-primary",
                    feature.id === "class-scheduling" && "text-white"
                  )}>
                    {feature.icon}
                  </span>
                </div>
                <h4 className="text-lg font-black tracking-tight mb-2 leading-none uppercase">{feature.title}</h4>
                <p className={cn(
                  "text-xs font-bold leading-tight opacity-60",
                  feature.id === "class-scheduling" ? "text-zinc-400" : "text-zinc-500"
                )}>
                  {feature.description}
                </p>
              </div>

              {/* Decorative Abstract "UI" element */}
              <div className="absolute right-[-10%] bottom-[-10%] w-2/3 h-2/3 opacity-20 group-hover:opacity-40 transition-opacity blur-2xl rounded-full bg-primary/20 pointer-events-none" />
            </motion.div>
          ))}
        </div>

        <div className="mt-12 flex items-center justify-between pt-8 border-t border-zinc-200/50">
          <div className="flex -space-x-3">
            {[1,2,3,4].map(i => (
              <div key={i} className="w-10 h-10 rounded-full border-4 border-white bg-zinc-200" />
            ))}
          </div>
          <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">
            Join 12k+ gyms worldwide
          </p>
        </div>
      </div>
    </div>
  );
}
