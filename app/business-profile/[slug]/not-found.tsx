import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function BusinessNotFound() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center font-sans">
      <div className="max-w-md space-y-8">
        <div className="space-y-4">
          <h1 className="text-8xl font-black text-primary tracking-tighter opacity-10">404</h1>
          <h2 className="text-2xl font-bold text-zinc-900 -mt-8 relative z-10">Business Not Found</h2>
          <p className="text-zinc-500 text-sm leading-relaxed max-w-xs mx-auto">
            The business profile you are looking for does not exist or has been moved.
          </p>
        </div>

        <div className="flex flex-col gap-3 justify-center pt-4">
          <Link href="/">
            <Button className="h-12 px-8 rounded-full font-bold text-xs uppercase tracking-wide bg-black text-white hover:bg-zinc-800 transition-all w-full sm:w-auto">
              Return Home
            </Button>
          </Link>
          <a href="mailto:help@gymble.us" className="text-xs font-semibold text-zinc-400 hover:text-primary transition-colors">
            Report an issue
          </a>
        </div>
      </div>
    </div>
  );
}
