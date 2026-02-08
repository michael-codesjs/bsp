"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface Option {
  label: string;
  value: string;
}

interface SegmentedControlProps {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export function SegmentedControl({
  options,
  value,
  onChange,
  className,
}: SegmentedControlProps) {
  return (
    <div className={cn("inline-flex bg-zinc-50 p-1 rounded-xl border border-zinc-100", className)}>
      {options.map((option) => {
        const isActive = value === option.value;
        return (
          <button
            key={option.value}
            onClick={() => onChange(option.value)}
            className={cn(
              "relative px-4 py-1.5 text-xs font-black uppercase tracking-widest transition-all h-[33px] min-w-[54px]",
              isActive ? "text-zinc-900" : "text-zinc-400 hover:text-zinc-600"
            )}
          >
            {isActive && (
              <motion.div
                layoutId="segmented-bg"
                className="absolute inset-0 bg-white rounded-lg shadow-sm border border-zinc-100"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
            <span className="relative z-10">{option.label}</span>
          </button>
        );
      })}
    </div>
  );
}
