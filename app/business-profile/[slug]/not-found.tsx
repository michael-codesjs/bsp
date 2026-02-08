import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Flash } from "iconsax-react";

export default function BusinessNotFound() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center font-sans">
      <div className="space-y-10 max-w-xl">
        <div className="relative inline-block">
          <div className="w-24 h-24 bg-zinc-50 rounded-3xl flex items-center justify-center text-zinc-300 mx-auto rotate-12">
            <Flash size={48} variant="Bold" color="currentColor" />
          </div>
          <div className="absolute -top-4 -right-4 w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary animate-bounce">
            <span className="font-black text-xs">404</span>
          </div>
        </div>

        <div className="space-y-4">
          <h1 className="text-5xl md:text-6xl font-black uppercase tracking-tighter leading-none">
            Business <br/> <span className="text-zinc-300">Not Found.</span>
          </h1>
          <p className="text-zinc-500 font-medium text-lg leading-relaxed">
            We couldn't find the business you're looking for. It might have changed its slug or requested to be private.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
          <Link href="/">
            <Button className="h-16 px-10 rounded-full font-black text-xs uppercase tracking-widest bg-zinc-950 hover:bg-zinc-800 transition-colors">
              <ArrowLeft size={18} color="currentColor" className="mr-3" />
              Back to Safety
            </Button>
          </Link>
          <a href="mailto:help@gymble.us">
            <Button variant="outline" className="h-16 px-10 rounded-full border-zinc-200 font-black text-xs uppercase tracking-widest">
              Report an Issue
            </Button>
          </a>
        </div>
      </div>

      <footer className="fixed bottom-12 w-full text-[10px] font-black text-zinc-200 uppercase tracking-[0.4em]">
        Gymble BSP Proprietary Technology
      </footer>
    </div>
  );
}
