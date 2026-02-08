import React from "react";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  label: string;
  title: React.ReactNode;
  description?: string;
  className?: string;
  align?: "left" | "center";
}

export function SectionHeader({ label, title, description, className, align = "left" }: SectionHeaderProps) {
  return (
    <div className={cn(
      "space-y-4", 
      align === "center" && "text-center flex flex-col items-center",
      className
    )}>
      <span className="text-primary font-black text-xs uppercase tracking-[0.3em] block">
        {label}
      </span>
      <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight leading-none max-w-2xl">
        {title}
      </h2>
      {description && (
        <p className="text-lg text-zinc-500 font-medium max-w-xl leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
