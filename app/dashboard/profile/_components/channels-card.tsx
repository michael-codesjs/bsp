"use client";

import { UseFormRegister } from "react-hook-form";
import { Input } from "@/components/ui/input/input";
import { DirectboxSend, Sms, Call, Location, Instagram, Global } from "iconsax-react";
import { ProfileFormValues } from "./types";

interface ChannelsCardProps {
  register: UseFormRegister<ProfileFormValues>;
}

export function ChannelsCard({ register }: ChannelsCardProps) {
  return (
    <section className="bg-white rounded-[32px] border border-zinc-100 p-8 shadow-sm space-y-8">
        <div className="flex items-center justify-between">
            <div className="space-y-1">
                <h2 className="text-lg font-black text-zinc-900 tracking-tight">Channels & Access</h2>
                <p className="text-xs text-zinc-400 font-bold uppercase tracking-widest">Contact details and social links</p>
            </div>
            <div className="w-10 h-10 bg-zinc-50 rounded-xl flex items-center justify-center text-zinc-300">
                <DirectboxSend size={20} variant="Bold" color="currentColor" />
            </div>
        </div>

        <div className="space-y-6">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                    label="Official Email"
                    type="email"
                    {...register("email")}
                    startIcon={<Sms variant="Bold" size={20} className="text-primary/40" color="currentColor" />}
                    className="bg-white border border-zinc-200 h-12 rounded-xl text-sm font-medium shadow-sm transition-all focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
                <Input
                    label="Public Phone"
                    {...register("mobile")}
                    startIcon={<Call variant="Bold" size={20} className="text-primary/40" color="currentColor" />}
                    className="bg-white border border-zinc-200 h-12 rounded-xl text-sm font-medium shadow-sm transition-all focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
            </div>
            <Input
                label="Business Location"
                {...register("location")}
                startIcon={<Location variant="Bold" size={20} className="text-primary/40" color="currentColor" />}
                className="bg-zinc-50 border-none h-12 rounded-xl focus:bg-white text-sm shadow-sm font-medium"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-zinc-50">
                <Input
                    label="Instagram"
                    placeholder="username"
                    {...register("instagram")}
                    startIcon={<Instagram variant="Bold" size={20} className="text-[#E1306C]/60" color="currentColor" />}
                    className="bg-white border border-zinc-200 h-12 rounded-xl text-sm font-medium shadow-sm transition-all focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
                <Input
                    label="X / Twitter"
                    placeholder="handle"
                    {...register("twitter")}
                    startIcon={<Global variant="Bold" size={20} className="text-zinc-400" color="currentColor" />}
                    className="bg-white border border-zinc-200 h-12 rounded-xl text-sm font-medium shadow-sm transition-all focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
            </div>
        </div>
    </section>
  );
}
