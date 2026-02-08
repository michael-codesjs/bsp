"use client";

import { motion } from "framer-motion";
import { 
  Flash, 
  TrendUp, 
  Profile2User, 
  Wallet3,
  CalendarTick,
  ArrowRight
} from "iconsax-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const stats = [
  { label: "Total Revenue", value: "$12,450", change: "+12.5%", icon: Wallet3, color: "bg-emerald-500" },
  { label: "Active Members", value: "1,240", change: "+4.2%", icon: Profile2User, color: "bg-blue-500" },
  { label: "Class Bookings", value: "842", change: "+18.3%", icon: CalendarTick, color: "bg-orange-500" },
  { label: "Profile Views", value: "4,120", change: "+24.1%", icon: Flash, color: "bg-purple-500" },
];

export default function DashboardPage() {
  const router = useRouter();

  return (
    <div className="space-y-10">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-zinc-900 tracking-tight">System Overview</h1>
          <p className="text-zinc-500 font-medium mt-1">Welcome back. Here's what's happening today.</p>
        </div>
        <Button 
            onClick={() => router.push("/dashboard/profile")}
            className="h-14 px-8 rounded-2xl bg-primary text-white font-black uppercase tracking-widest shadow-xl shadow-primary/20 text-sm hover:scale-105 transition-all"
        >
            Update Profile
            <ArrowRight size={20} color="currentColor" className="ml-2" />
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-8 rounded-[32px] border border-zinc-100 shadow-sm space-y-4 group hover:shadow-xl transition-all"
          >
            <div className={`w-12 h-12 ${stat.color} rounded-2xl flex items-center justify-center text-white shadow-lg`}>
              <stat.icon variant="Bold" color="currentColor" />
            </div>
            <div>
              <p className="text-sm font-bold text-zinc-400 uppercase tracking-widest">{stat.label}</p>
              <div className="flex items-end gap-3 mt-1">
                <h3 className="text-3xl font-black text-zinc-900">{stat.value}</h3>
                <span className="text-xs font-black text-emerald-500 bg-emerald-50 px-2 py-1 rounded-lg mb-1">
                  {stat.change}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Placeholder for Charts/Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-[40px] p-10 border border-zinc-100 shadow-sm h-[400px] flex flex-col items-center justify-center text-center space-y-4">
             <div className="w-20 h-20 bg-zinc-50 rounded-full flex items-center justify-center text-zinc-200">
                <TrendUp size={40} variant="Bold" color="currentColor" />
             </div>
             <div>
                <h4 className="text-xl font-black text-zinc-900">Analytics coming soon</h4>
                <p className="text-zinc-400 font-medium max-w-xs mx-auto">We're currently processing your data to generate detailed performance insights.</p>
             </div>
        </div>

        <div className="bg-zinc-900 rounded-[40px] p-10 shadow-2xl space-y-8 flex flex-col justify-between">
            <div className="space-y-4">
                <div className="w-12 h-12 bg-primary/20 rounded-2xl flex items-center justify-center text-primary">
                    <Flash variant="Bold" color="currentColor" />
                </div>
                <h4 className="text-2xl font-black text-white">Unlock Premium Features</h4>
                <p className="text-white/50 text-sm font-medium leading-relaxed">
                    Get access to advanced scheduling, automated marketing, and detailed member analytics.
                </p>
            </div>
            <Button className="w-full h-14 bg-white text-zinc-900 font-black rounded-2xl uppercase tracking-widest text-sm hover:bg-zinc-100 transition-all">
                Upgrade Now
            </Button>
        </div>
      </div>
    </div>
  );
}
