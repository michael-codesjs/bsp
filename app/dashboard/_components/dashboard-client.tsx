"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { 
  Flash, 
  TrendUp, 
  Profile2User, 
  Wallet3,
  CalendarTick
} from "iconsax-react";
import { StatCard } from "@/components/layout/stat-card";
import { ActivityChart } from "./activity-chart";
import { RevenueCategoryChart } from "./revenue-category-chart";
import { getDashboardData } from "../actions";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { cn } from "@/lib/utils";

interface DashboardClientProps {
  initialData: any;
}

export function DashboardClient({ initialData }: DashboardClientProps) {
  const [data, setData] = useState(initialData);
  const [timeRange, setTimeRange] = useState("1Y");
  const [dates, setDates] = useState({
    start: "2026-01-01",
    end: "2026-12-31"
  });
  const [loading, setLoading] = useState(false);

  // Initial load sync if needed
  useEffect(() => {
    if (initialData) setData(initialData);
  }, [initialData]);

  const handleDateChange = async (start: string, end: string, preset?: string) => {
    setLoading(true);
    setDates({ start, end });
    if (preset) setTimeRange(preset);

    const result = await getDashboardData(start, end);
    if (result.success) {
      setData(result.data);
    }
    setLoading(false);
  };

  const stats = [
    { 
      label: "Total Revenue", 
      value: data?.totalRevenue || 0, 
      displayValue: `$${(data?.totalRevenue || 0).toLocaleString()}`, 
      change: "+12.5%", 
      icon: Wallet3, 
      gradient: "linear-gradient(135deg, #0b5cff 0%, #00d1ff 100%)" 
    },
    { 
      label: "Profile Views", 
      value: data?.profileViews || 0, 
      displayValue: (data?.profileViews || 0).toLocaleString(), 
      change: "+24.1%", 
      icon: Flash, 
      gradient: "linear-gradient(135deg, #1e293b 0%, #334155 100%)" 
    },
    { 
      label: "Active Members", 
      value: 1240, 
      displayValue: "1,240", 
      change: "+4.2%", 
      icon: Profile2User, 
      gradient: "linear-gradient(135deg, #a855f7 0%, #ea580c 100%)" 
    },
    { 
      label: "Class Bookings", 
      value: 842, 
      displayValue: "842", 
      change: "+18.3%", 
      icon: CalendarTick, 
      gradient: "linear-gradient(135deg, #10b981 0%, #3b82f6 100%)" 
    },
  ];

  return (
    <div className="space-y-10 pb-20">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-4">
        <div className="space-y-2">
          <h1 className="text-3xl md:text-4xl font-extrabold text-zinc-900 tracking-tight leading-none">Dashboard</h1>
          <p className="text-sm font-semibold text-zinc-400 uppercase tracking-[0.2em]">Market Intelligence & Performance</p>
        </div>
        
        <DateRangePicker 
            startDate={dates.start}
            endDate={dates.end}
            activePreset={timeRange}
            onChange={handleDateChange}
        />
      </header>
      
      {/* Stats Grid */}
      <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 transition-all duration-500", loading ? "opacity-50 blur-[2px] pointer-events-none" : "opacity-100")}>
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, type: "spring", damping: 20 }}
          >
            <StatCard {...stat} />
          </motion.div>
        ))}
      </div>

      {/* Charts Section */}
      <div className={cn("grid grid-cols-1 lg:grid-cols-2 gap-10 transition-all duration-500", loading ? "opacity-30 scale-[0.99]" : "opacity-100")}>
        {/* Activity Chart */}
        <div className="relative group">
            <div className="absolute -inset-1 bg-linear-to-r from-primary/5 to-transparent rounded-[40px] opacity-0 group-hover:opacity-100 transition-opacity blur-2xl" />
            <ActivityChart data={data?.salesChart} timeRange={timeRange} />
        </div>

        {/* Revenue Category Chart */}
        <div className="relative group">
            <div className="absolute -inset-1 bg-linear-to-r from-emerald-500/5 to-transparent rounded-[40px] opacity-0 group-hover:opacity-100 transition-opacity blur-2xl" />
            <RevenueCategoryChart data={data?.piChart} timeRange={timeRange} />
        </div>
      </div>
    </div>
  );
}
