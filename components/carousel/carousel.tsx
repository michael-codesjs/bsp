"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export type CarouselItem = {
  id: string | number;
  image: string;
  title: string;
  description: string;
};

interface CarouselProps {
  items: CarouselItem[];
  autoPlayInterval?: number;
  className?: string;
}

export function Carousel({ items, autoPlayInterval = 5000, className }: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? "100%" : "-100%",
      opacity: 0,
    }),
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = useCallback((newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => (prevIndex + newDirection + items.length) % items.length);
  }, [items.length]);

  useEffect(() => {
    const timer = setInterval(() => {
      paginate(1);
    }, autoPlayInterval);

    return () => clearInterval(timer);
  }, [paginate, autoPlayInterval]);

  const currentItem = items[currentIndex];

  return (
    <div className={cn("relative w-full h-full overflow-hidden bg-white", className)}>
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
          }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragEnd={(e, { offset, velocity }) => {
            const swipe = swipePower(offset.x, velocity.x);

            if (swipe < -swipeConfidenceThreshold) {
              paginate(1);
            } else if (swipe > swipeConfidenceThreshold) {
              paginate(-1);
            }
          }}
          className="absolute inset-0 w-full h-full"
        >
          <Image
            src={currentItem.image}
            alt={currentItem.title}
            fill
            className="object-cover transition-transform duration-[20s] scale-105"
            priority
          />
          {/* Subtle Atmosphere Gradient */}
          <div className="absolute inset-0 bg-linear-to-tr from-black/20 via-transparent to-transparent"></div>
          {/* Bottom Content Gradient */}
          <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent"></div>

          {/* Content Overlay */}
          <div className="absolute bottom-32 left-16 right-16 space-y-4">
            <h2 className="text-5xl font-extrabold leading-[1.1] tracking-tight text-white drop-shadow-md max-w-xl">
              {currentItem.title}
            </h2>
            <p className="text-xl text-zinc-100 leading-relaxed font-medium max-w-lg opacity-90">
              {currentItem.description}
            </p>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Pagination Indicators */}
      <div className="absolute bottom-20 left-16 right-16 flex gap-2 z-10 pointer-events-none">
        {items.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              const newDirection = i > currentIndex ? 1 : -1;
              setDirection(newDirection);
              setCurrentIndex(i);
            }}
            className={cn(
              "h-1 rounded-full transition-all duration-500 shadow-sm pointer-events-auto",
              i === currentIndex ? "w-12 bg-primary" : "w-4 bg-white/20 hover:bg-white/40"
            )}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
