"use client";

import React, { useState, useMemo } from "react";
import { ArrowLeft2, ArrowRight2 } from "iconsax-react";
import { cn } from "@/lib/utils";

interface CalendarProps {
  events?: { date: string }[]; // Array of objects with date string YYYY-MM-DD
  selectedDate?: Date | null;
  onSelectDate: (date: Date | null) => void;
  className?: string;
}

export function MinimalCalendar({ events = [], selectedDate, onSelectDate, className }: CalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // Helper to get days in month
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const days = new Date(year, month + 1, 0).getDate();
    return Array.from({ length: days }, (_, i) => new Date(year, month, i + 1));
  };

  const daysInMonth = getDaysInMonth(currentMonth);

  // Helper to get day of week for start of month (0-6, Sun-Sat)
  const startDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay();

  // Navigation
  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };
  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  // Check if a date has events
  const hasEvents = (date: Date) => {
    const dateString = date.toISOString().split("T")[0]; // YYYY-MM-DD
    return events.some(e => e.date === dateString);
  };

  // Check if dates are same day
  const isSameDay = (d1: Date, d2?: Date | null) => {
    if (!d2) return false;
    return (
      d1.getDate() === d2.getDate() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getFullYear() === d2.getFullYear()
    );
  };

    // Format YYYY-MM-DD for checking if date is today
    const today = new Date();
    const isToday = (date: Date) => isSameDay(date, today);

  return (
    <div className={cn("bg-white rounded-4xl p-6 border border-zinc-100 shadow-sm", className)}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-black text-zinc-900">
          {currentMonth.toLocaleString("default", { month: "long", year: "numeric" })}
        </h3>
        <div className="flex items-center gap-2">
          <button
            onClick={prevMonth}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-zinc-100 text-zinc-600 transition-colors"
          >
            <ArrowLeft2 size={16} />
          </button>
          <button
            onClick={nextMonth}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-zinc-100 text-zinc-600 transition-colors"
          >
            <ArrowRight2 size={16} />
          </button>
        </div>
      </div>

      {/* Days Header */}
      <div className="grid grid-cols-7 mb-2">
        {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map(day => (
          <div key={day} className="text-center text-[11px] font-bold text-zinc-400 uppercase tracking-wider py-2">
            {day}
          </div>
        ))}
      </div>

      {/* Days Grid */}
      <div className="grid grid-cols-7 gap-1">
        {/* Empty cells for start of month */}
        {Array.from({ length: startDay }).map((_, i) => (
          <div key={`empty-${i}`} />
        ))}

        {daysInMonth.map(date => {
          const isSelected = isSameDay(date, selectedDate);
          const hasEvent = hasEvents(date);
          const isDateToday = isToday(date);

          return (
            <button
              key={date.toISOString()}
              onClick={() => onSelectDate(isSelected ? null : date)}
              className={cn(
                "h-10 w-10 mx-auto rounded-full flex items-center justify-center text-sm font-medium transition-all relative group",
                isSelected
                  ? "bg-primary text-white shadow-lg shadow-primary/25 scale-110"
                  : "text-zinc-700 hover:bg-zinc-50",
                isDateToday && !isSelected && "text-primary font-bold bg-primary/5",
                !isSelected && hasEvent && "font-bold text-zinc-900" 
              )}
            >
              {date.getDate()}
              {/* Event Indicator */}
              {hasEvent && !isSelected && (
                <div className="absolute bottom-1.5 w-1 h-1 bg-primary rounded-full" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
