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
import { ActivityChart } from "@/components/dashboard/activity-chart";
import { RevenueCategoryChart } from "@/components/dashboard/revenue-category-chart";
import { StatCard } from "@/components/dashboard/stat-card";

const stats = [
  { 
    label: "Total Revenue", 
    value: 12450, 
    displayValue: "$12,450", 
    change: "+12.5%", 
    icon: Wallet3, 
    gradient: "linear-gradient(135deg, #0b5cff 0%, #00d1ff 100%)" 
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
  { 
    label: "Profile Views", 
    value: 4120, 
    displayValue: "4,120", 
    change: "+24.1%", 
    icon: Flash, 
    gradient: "linear-gradient(135deg, #1e293b 0%, #334155 100%)" 
  },
];

export default function DashboardPage() {
  return (
    <div className="space-y-10">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
          >
            <StatCard {...stat} />
          </motion.div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Activity Chart */}
        <div>
             <ActivityChart />
        </div>

        {/* Revenue Category Chart */}
        <div>
             <RevenueCategoryChart />
        </div>
      </div>
    </div>
  );
}

