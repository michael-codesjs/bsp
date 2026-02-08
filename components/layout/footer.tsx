import Link from "next/link";

export function DashboardFooter() {
  return (
    <footer className="h-16 flex items-center justify-between px-8 text-xs font-medium text-zinc-400">
      <div className="flex items-center gap-6">
        <span>© 2026 Gymble Inc.</span>
        <Link href="#" className="hover:text-zinc-600 transition-colors">Privacy Policy</Link>
        <Link href="#" className="hover:text-zinc-600 transition-colors">Terms of Service</Link>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        <span>System Status: Optimal</span>
      </div>
    </footer>
  );
}
