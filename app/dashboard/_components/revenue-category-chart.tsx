"use client";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

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

const COLORS = ["#3b82f6", "#2dd4bf", "#4ade80", "#a855f7", "#fbbf24", "#f472b6", "#60a5fa"];

interface RevenueCategoryChartProps {
  data?: any;
  timeRange?: string;
}

export function RevenueCategoryChart({ data: incomingData, timeRange = "1Y" }: RevenueCategoryChartProps) {
  const getGrainLabel = () => {
    switch (timeRange) {
      case "24H": return "Hourly";
      case "7D": 
      case "30D": return "Daily";
      case "1Y": return "Monthly";
      default: return "Activity";
    }
  };

  // Map API piChart data { labels, percentages } to Recharts { name, value, color }
  const chartData = incomingData?.labels?.map((label: string, index: number) => ({
    name: label,
    value: incomingData.percentages[index] || 0,
    color: COLORS[index % COLORS.length]
  })) || [];

  return (
    <div className="flex h-full min-h-[460px] flex-col gap-6 rounded-[32px] border border-zinc-100 bg-white p-5 md:p-8">
      <header className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-black text-zinc-900 tracking-tight">Revenue breakdown</h2>
          <p className="text-xs text-zinc-400 font-bold uppercase tracking-widest mt-0.5">{getGrainLabel()} performance by category</p>
        </div>
      </header>

      <hr className="border-t border-zinc-100" />

      <div className="flex-1 w-full min-h-0 relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius="60%"
              outerRadius="80%"
              paddingAngle={4}
              dataKey="value"
              stroke="none"
              label={({ cx, cy, midAngle = 0, innerRadius = 0, outerRadius = 0, value }) => {
                const RADIAN = Math.PI / 180;
                // Recharts provides radius in pixels even if props are %, we can use them
                // Calculate position for label (centered in slice arc)
                const rInner = Number(innerRadius); 
                const rOuter = Number(outerRadius);
                const radius = rInner + (rOuter - rInner) * 0.5;
                const x = cx + radius * Math.cos(-midAngle * RADIAN);
                const y = cy + radius * Math.sin(-midAngle * RADIAN);

                return (
                  <text
                    x={x}
                    y={y}
                    fill="white"
                    textAnchor="middle"
                    dominantBaseline="central"
                    className="text-[9px] font-black pointer-events-none"
                  >
                    {Math.round(value)}%
                  </text>
                );
              }}
              labelLine={false}
            >
              {chartData.map((entry: any, index: number) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 pt-2 max-w-sm mx-auto">
        {chartData.map((entry: any, index: number) => (
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
