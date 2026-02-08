"use client";

import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { SegmentedControl } from "./segmented-control";
import { cn } from "@/lib/utils";

const data = [
  { name: "Jan", revenue: 16000, bookings: 12000, cancellations: 200 },
  { name: "Feb", revenue: 4000, bookings: 3000, cancellations: 300 },
  { name: "Mar", revenue: 5000, bookings: 4000, cancellations: 250 },
  { name: "Apr", revenue: 7000, bookings: 5500, cancellations: 200 },
  { name: "May", revenue: 8500, bookings: 6800, cancellations: 180 },
  { name: "Jun", revenue: 11000, bookings: 9000, cancellations: 150 },
  { name: "Jul", revenue: 13000, bookings: 10500, cancellations: 120 },
  { name: "Aug", revenue: 12500, bookings: 10000, cancellations: 140 },
  { name: "Sep", revenue: 14000, bookings: 11500, cancellations: 160 },
  { name: "Oct", revenue: 15500, bookings: 12800, cancellations: 130 },
  { name: "Nov", revenue: 17000, bookings: 14000, cancellations: 110 },
  { name: "Dec", revenue: 19000, bookings: 15500, cancellations: 100 },
];

const timePeriods = [
  { label: "24H", value: "24H" },
  { label: "7D", value: "7D" },
  { label: "30D", value: "30D" },
  { label: "1Y", value: "1Y" },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-4 shadow-2xl rounded-2xl border border-zinc-100 outline-none">
        <p className="text-sm font-black text-zinc-900 mb-2">{label}</p>
        <div className="space-y-1.5">
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex items-center gap-3 text-xs font-bold">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
              <span className="text-zinc-500 uppercase tracking-widest min-w-[100px]">{entry.name}:</span>
              <span className="text-zinc-900 ml-auto">{entry.name.includes('Revenue') ? `$${entry.value.toLocaleString()}` : entry.value}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return null;
};

export function ActivityChart() {
  const [timeRange, setTimeRange] = useState("1Y");

  return (
    <div className="flex h-full min-h-[460px] flex-col gap-6 rounded-[32px] border border-zinc-100 bg-white p-8">
      <header className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-black text-zinc-900 tracking-tight">Your Activity</h2>
          <p className="text-xs text-zinc-400 font-bold uppercase tracking-widest mt-0.5">Monthly activity trends</p>
        </div>
        <SegmentedControl
          options={timePeriods}
          value={timeRange}
          onChange={setTimeRange}
        />
      </header>

      <hr className="border-t border-zinc-100" />

      <div className="flex-1 w-full min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid vertical={false} stroke="#f4f4f5" strokeDasharray="3 3" />
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#a1a1aa', fontSize: 11, fontWeight: 700 }}
              dy={10}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#a1a1aa', fontSize: 11, fontWeight: 700 }}
              tickFormatter={(value) => `$${value/1000}k`}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#f4f4f5', strokeWidth: 2 }} />
            
            <Line
              type="monotone"
              dataKey="revenue"
              name="Total Revenue"
              stroke="#17A7A9"
              strokeWidth={3}
              dot={false}
              activeDot={{ r: 6, strokeWidth: 0, fill: '#17A7A9' }}
            />
            <Line
              type="monotone"
              dataKey="bookings"
              name="New Bookings"
              stroke="#F2AB3C"
              strokeWidth={3}
              dot={false}
              activeDot={{ r: 6, strokeWidth: 0, fill: '#F2AB3C' }}
            />
            <Line
              type="monotone"
              dataKey="cancellations"
              name="Cancellations"
              stroke="#ef4444"
              strokeWidth={3}
              dot={false}
              activeDot={{ r: 6, strokeWidth: 0, fill: '#ef4444' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Legend Footer */}
      <div className="flex items-center justify-center gap-8 pt-2">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-[#17A7A9]" />
          <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Revenue</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-[#F2AB3C]" />
          <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Bookings</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-[#ef4444]" />
          <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Cancellations</span>
        </div>
      </div>
    </div>
  );
}

