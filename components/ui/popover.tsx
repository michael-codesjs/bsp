"use client";

import React, { useState, useRef, useEffect, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface PopoverProps {
  trigger: ReactNode;
  children: ReactNode | ((props: { close: () => void }) => ReactNode);
  className?: string;
  triggerClassName?: string;
  align?: "left" | "right" | "center";
}

export function Popover({ 
  trigger, 
  children, 
  className, 
  triggerClassName,
  align = "right" 
}: PopoverProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const alignmentClasses = {
    left: "left-0",
    right: "right-0",
    center: "left-1/2 -translate-x-1/2"
  };

  return (
    <div className={cn("relative inline-block", triggerClassName)} ref={containerRef}>
      <div onClick={() => setIsOpen(!isOpen)} className="cursor-pointer">
        {trigger}
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className={cn(
              "absolute top-full mt-3 z-50",
              alignmentClasses[align],
              className
            )}
          >
            <div className="bg-white rounded-[32px] border border-zinc-100 shadow-[0_32px_64px_-12px_rgba(0,0,0,0.12)] overflow-hidden">
                {typeof children === 'function' ? (children as any)({ close: () => setIsOpen(false) }) : children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
