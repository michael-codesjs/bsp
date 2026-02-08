import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface AvatarStackProps {
  avatars: string[];
  size?: "sm" | "md" | "lg";
  className?: string;
  limit?: number;
}

export function AvatarStack({ avatars, size = "md", className, limit = 4 }: AvatarStackProps) {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16",
  };

  const visibleAvatars = avatars.slice(0, limit);
  const remainingCount = avatars.length - limit;

  return (
    <div className={cn("flex -space-x-3 items-center", className)}>
      {visibleAvatars.map((src, i) => (
        <div 
          key={i} 
          className={cn(
            "rounded-full border-2 border-zinc-950 bg-zinc-800 overflow-hidden relative shadow-lg",
            sizeClasses[size]
          )}
        >
          <Image 
            src={src} 
            alt={`Avatar ${i + 1}`} 
            fill 
            className="object-cover"
          />
        </div>
      ))}
      {remainingCount > 0 && (
        <div 
          className={cn(
            "rounded-full border-2 border-zinc-950 bg-zinc-900 flex items-center justify-center text-[10px] font-black text-white shadow-lg",
            sizeClasses[size]
          )}
        >
          +{remainingCount}
        </div>
      )}
    </div>
  );
}
