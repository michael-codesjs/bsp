"use client";

import { UseFormRegister, FieldErrors } from "react-hook-form";
import { Input } from "@/components/ui/input/input";
import { Brush, Magicpen, Flash } from "iconsax-react";
import { ProfileFormValues } from "./types";

interface IdentityCardProps {
  register: UseFormRegister<ProfileFormValues>;
  errors: FieldErrors<ProfileFormValues>;
}

export function IdentityCard({ register, errors }: IdentityCardProps) {
  return (
    <section className="bg-white rounded-[32px] border border-zinc-100 p-8 shadow-sm space-y-8">
        <div className="flex items-center justify-between">
            <div className="space-y-1">
                <h2 className="text-lg font-black text-zinc-900 tracking-tight">Public Identity</h2>
                <p className="text-xs text-zinc-400 font-bold uppercase tracking-widest">Display name and narrative bio</p>
            </div>
            <div className="w-10 h-10 bg-zinc-50 rounded-xl flex items-center justify-center text-zinc-300">
                <Brush size={20} variant="Bold" color="currentColor" />
            </div>
        </div>

        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                    label="Storefront Name"
                    placeholder="e.g. Strongest Fitness"
                    {...register("businessName", { required: "Name is required" })}
                    error={errors.businessName?.message}
                    className="bg-white border border-zinc-200 h-12 rounded-xl text-sm font-medium shadow-sm transition-all focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
                <Input
                    label="Marketing Tagline"
                    placeholder="e.g. Unleash your potential"
                    {...register("tagline")}
                    className="bg-white border border-zinc-200 h-12 rounded-xl text-sm font-medium shadow-sm transition-all focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    endIcon={<Magicpen size={18} className="text-primary/50" variant="Bold" color="currentColor" />}
                />
            </div>

            <div className="space-y-2">
                 <div className="flex items-center justify-between">
                    <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">About Bio</label>
                    <div className="flex items-center gap-1.5 text-[10px] font-black text-primary uppercase tracking-widest">
                        <Flash size={12} variant="Bold" color="currentColor" />
                        AI Assist
                    </div>
                </div>
                <textarea 
                    {...register("description")}
                    placeholder="Tell your story. What makes your business unique?"
                    className="w-full min-h-[160px] bg-zinc-50 border-none rounded-[20px] p-5 text-sm font-medium text-zinc-600 outline-none focus:bg-white transition-all placeholder:text-zinc-300 resize-none shadow-sm"
                />
            </div>
        </div>
    </section>
  );
}
