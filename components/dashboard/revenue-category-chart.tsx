"use client";

import React, { useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { SegmentedControl } from "./segmented-control";

const data = [
  { name: "Experiences", value: 13.59, color: "#3b82f6" },
  { name: "Memberships", value: 44.27, color: "#2dd4bf" },
  { name: "Classes", value: 11.45, color: "#4ade80" },
  { name: "Packages", value: 21.77, color: "#a855f7" },
  { name: "Tournaments", value: 1.82, color: "#fbbf24" },
  { name: "Passes", value: 1.17, color: "#f472b6" },
  { name: "Rentals", value: 5.93, color: "#60a5fa" },
];

const timePeriods = [
  { label: "24H", value: "24H" },
  { label: "7D", value: "7D" },
  { label: "30D", value: "30D" },
  { label: "1Y", value: "1Y" },
];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-4 shadow-2xl rounded-2xl border border-zinc-100 outline-none">
        <div className="flex items-center gap-3 mb-1">
          <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: payload[0].payload.color }} />
          <p className="text-sm font-black text-zinc-900 uppercase tracking-tight">{payload[0].name}</p>
        </div>
        <p className="text-[10px] font-black text-zinc-400 tracking-widest uppercase ml-5">
          {payload[0].value}% OF TOTAL
        </p>
      </div>
    );
  }
  return null;
};

export function RevenueCategoryChart() {
  const [timeRange, setTimeRange] = useState("1Y");

  return (
    <div className="flex h-full min-h-[460px] flex-col gap-6 rounded-[32px] border border-zinc-100 bg-white p-8">
      <header className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-black text-zinc-900 tracking-tight">Revenue breakdown</h2>
          <p className="text-xs text-zinc-400 font-bold uppercase tracking-widest mt-0.5">Performance by category</p>
        </div>
        <SegmentedControl
          options={timePeriods}
          value={timeRange}
          onChange={setTimeRange}
        />
      </header>

      <hr className="border-t border-zinc-100" />

      <div className="flex-1 w-full min-h-0 relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={80}
              outerRadius={110}
              paddingAngle={4}
              dataKey="value"
              stroke="none"
              label={({ cx, cy, midAngle = 0, innerRadius = 0, outerRadius = 0, value }) => {
                const RADIAN = Math.PI / 180;
                const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
                const x = cx + radius * Math.cos(-midAngle * RADIAN);
                const y = cy + radius * Math.sin(-midAngle * RADIAN);

                return (
                  <text
                    x={x}
                    y={y}
                    fill="white"
                    textAnchor="middle"
                    dominantBaseline="central"
                    className="text-[9px] font-black"
                  >
                    {Math.round(value)}%
                  </text>
                );
              }}
              labelLine={false}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 pt-2 max-w-sm mx-auto">
        {data.map((entry, index) => (
          <div key={index} className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
            <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">
              {entry.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

