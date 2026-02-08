"use client";

import React from "react";
import { Calendar, ArrowDown2, Clock, TickCircle } from "iconsax-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { Popover } from "./popover";

interface DateRangePickerProps {
  startDate: string;
  endDate: string;
  activePreset?: string;
  onChange: (start: string, end: string, preset?: string) => void;
  className?: string;
}

const presets = [
  { label: "Last 24 Hours", value: "24H" },
  { label: "Last 7 Days", value: "7D" },
  { label: "Last 30 Days", value: "30D" },
  { label: "Last 12 Months", value: "1Y" },
];

export function DateRangePicker({ startDate, endDate, activePreset, onChange, className }: DateRangePickerProps) {
  const formatDate = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric"
      });
    } catch (e) {
      return dateStr;
    }
  };

  const handlePresetSelect = (preset: string, close: () => void) => {
    const today = new Date("2026-02-08"); // Current system date
    let start = new Date(today);
    let end = new Date(today);

    switch (preset) {
      case "24H":
        start.setDate(today.getDate() - 1);
        break;
      case "7D":
        start.setDate(today.getDate() - 7);
        break;
      case "30D":
        start.setDate(today.getDate() - 30);
        break;
      case "1Y":
        start = new Date("2026-01-01");
        end = new Date("2026-12-31");
        break;
    }

    const startStr = start.toISOString().split('T')[0];
    const endStr = end.toISOString().split('T')[0];
    
    onChange(startStr, endStr, preset);
    close();
  };

  const trigger = (
    <div className="flex items-center gap-3.5 pl-4 pr-3.5 h-12 bg-white rounded-xl border border-zinc-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:border-primary/20 transition-all group">
      <div className="w-8 h-8 rounded-lg bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
        <Calendar size={18} variant="Bold" color="currentColor" />
      </div>
      <div className="flex flex-col items-start min-w-[120px]">
        <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest leading-none mb-1">
          Window
        </span>
        <span className="text-[11px] font-black text-zinc-900 leading-none">
          {formatDate(startDate)} — {formatDate(endDate)}
        </span>
      </div>
      <div className="ml-1 h-6 w-px bg-zinc-100" />
      <ArrowDown2 
        size={14} 
        className="text-zinc-300 transition-transform duration-300 ease-out group-hover:text-primary" 
        color="currentColor"
      />
    </div>
  );

  return (
    <Popover 
      trigger={trigger} 
      className="w-[280px]" 
      triggerClassName={className}
    >
      {({ close }: { close: () => void }) => (
        <div className="p-5">
          <header className="mb-4">
            <h4 className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em] mb-3 px-1">Presets</h4>
            <div className="grid grid-cols-1 gap-1">
              {presets.map((preset) => {
                const isActive = activePreset === preset.value;
                return (
                  <button
                    key={preset.value}
                    onClick={() => handlePresetSelect(preset.value, close)}
                    className={cn(
                      "w-full h-11 px-4 rounded-xl flex items-center justify-between transition-all duration-300",
                      isActive 
                        ? "bg-primary/10 text-primary" 
                        : "hover:bg-zinc-50 text-zinc-600 hover:text-zinc-900"
                    )}
                  >
                    <span className="text-xs font-bold">{preset.label}</span>
                    {isActive && (
                      <TickCircle size={16} variant="Bold" color="currentColor" />
                    )}
                  </button>
                );
              })}
            </div>
          </header>

          <div className="h-px bg-zinc-50 my-4" />

          <button 
             className="w-full h-12 rounded-xl border border-dashed border-zinc-200 flex items-center justify-center gap-2.5 text-zinc-400 hover:border-primary/50 hover:text-primary transition-all group bg-zinc-50/50"
             onClick={() => {
                toast.info("Custom calendars coming in the next update!");
                close();
             }}
          >
            <Calendar size={16} color="currentColor" />
            <span className="text-[10px] font-black uppercase tracking-widest">Select Custom Range</span>
          </button>
          
          <div className="mt-5 pt-4 border-t border-zinc-50 flex items-center justify-center gap-1.5 grayscale opacity-50">
            <Clock size={12} color="currentColor" />
            <p className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest">
              UTC-5 (EST)
            </p>
          </div>
        </div>
      )}
    </Popover>
  );
}
