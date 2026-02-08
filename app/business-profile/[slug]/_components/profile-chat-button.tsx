"use client";

import { MessageQuestion } from "iconsax-react";

export function ProfileChatButton() {
  return (
    <button className="fixed bottom-8 right-8 w-14 h-14 bg-primary text-white rounded-full flex items-center justify-center shadow-lg shadow-primary/30 hover:scale-110 active:scale-95 transition-all z-50 group">
        <MessageQuestion size={28} variant="Bold" className="group-hover:rotate-12 transition-transform" color="currentColor" />
    </button>
  );
}
