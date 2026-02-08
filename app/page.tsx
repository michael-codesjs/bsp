import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { ArrowRight, Verify } from "iconsax-react";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-white font-sans selection:bg-primary selection:text-white">
      {/* Header */}
      <nav className="h-20 flex items-center px-12 border-b border-zinc-100">
        <div className="flex items-center gap-2">
          <Image src="/gymble.png" alt="Gymble" width={32} height={32} />
          <span className="font-black text-xl tracking-tighter uppercase">Gymble <span className="text-primary italic">BSP</span></span>
        </div>
      </nav>

      <main className="flex-1 flex flex-col items-center justify-center p-12">
        <div className="w-full max-w-4xl grid md:grid-cols-2 gap-20 items-center">
          
          <div className="space-y-10">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-primary">
                <Verify size={18} variant="Bold" color="currentColor" />
                <span className="text-[10px] font-black uppercase tracking-[0.3em]">Official Submission Portal</span>
              </div>
              <h1 className="text-6xl md:text-7xl font-black tracking-tighter leading-[0.9] uppercase">
                Building the <br/> <span className="text-primary italic">Future</span> of Sport.
              </h1>
              <p className="text-lg text-zinc-500 font-medium max-w-sm">
                A technical showcase for the Gymble Business Support Portal, featuring premium components and real-time API integrations.
              </p>
            </div>

            <div className="flex flex-col gap-4">
              <a href="/business-profile/strongest-fitness">
                <Button className="h-16 px-10 rounded-full font-black text-xs uppercase tracking-widest shadow-2xl shadow-primary/25 group">
                  View Profile Demo
                  <ArrowRight size={18} color="currentColor" className="ml-3 group-hover:translate-x-1 transition-transform" />
                </Button>
              </a>
              <a href="/login">
                <Button variant="outline" className="h-16 px-10 rounded-full border-zinc-200 font-black text-xs uppercase tracking-widest hover:bg-zinc-950 hover:text-white hover:border-zinc-950 transition-all">
                  Go to Login Admin
                </Button>
              </a>
            </div>
          </div>

          <div className="bg-zinc-50 rounded-[3rem] p-12 border border-zinc-100 shadow-sm space-y-12">
             <div className="space-y-6">
                <h2 className="text-xl font-black uppercase tracking-tighter">Component Playground</h2>
                <div className="space-y-6">
                   <Input 
                      label="Test Property" 
                      placeholder="e.g. Member Retention" 
                      className="bg-white border-zinc-200"
                   />
                   <div className="flex flex-wrap gap-3">
                      <Button size="sm">Action</Button>
                      <Button variant="secondary" size="sm">Secondary</Button>
                      <Button variant="outline" size="sm">Outline</Button>
                   </div>
                </div>
             </div>

             <div className="pt-8 border-t border-zinc-200/50">
                <div className="flex items-center gap-4">
                   <div className="flex -space-x-3">
                      {[1,2,3].map(i => (
                        <div key={i} className="w-10 h-10 rounded-full border-2 border-zinc-50 bg-zinc-200" />
                      ))}
                   </div>
                   <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest leading-tight">
                     Join <span className="text-zinc-900">12,000+</span> businesses <br/> using Gymble today.
                   </p>
                </div>
             </div>
          </div>

        </div>
      </main>

      <footer className="h-20 flex items-center justify-center border-t border-zinc-50">
        <span className="text-[10px] font-black text-zinc-300 uppercase tracking-[0.4em]">Proprietary Gymble Technology 2026</span>
      </footer>
    </div>
  );
}
