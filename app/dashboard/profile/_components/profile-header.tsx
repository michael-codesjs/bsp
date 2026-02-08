"use client";

import { Button } from "@/components/ui/button";
import { Save2 } from "iconsax-react";
import { useRouter } from "next/navigation";

interface ProfileHeaderProps {
  isSaving: boolean;
  onSave: () => void;
  onCancel: () => void;
}

export function ProfileHeader({ isSaving, onSave, onCancel }: ProfileHeaderProps) {
  return (
    <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-black text-zinc-900 tracking-tight">Business Profile</h1>
        <p className="text-zinc-500 font-medium mt-1">Manage your public storefront and brand identity.</p>
      </div>
      <div className="flex items-center gap-3">
           <Button 
              variant="outline" 
              className="h-11 px-6 rounded-2xl font-black text-xs uppercase tracking-widest text-zinc-400 border-zinc-200 hover:bg-zinc-50 transition-all hover:text-zinc-900"
              onClick={onCancel}
          >
              Cancel
          </Button>
          <Button 
              onClick={onSave}
              disabled={isSaving}
              className="h-11 px-8 rounded-2xl bg-primary hover:bg-primary/90 text-white font-black text-xs uppercase tracking-widest shadow-xl shadow-primary/20 transition-all flex items-center gap-2 active:scale-95"
          >
              {isSaving ? (
                  <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
              ) : (
                  <Save2 size={18} variant="Bold" color="currentColor" />
              )}
              {isSaving ? "Syncing..." : "Publish Changes"}
          </Button>
      </div>
    </header>
  );
}
