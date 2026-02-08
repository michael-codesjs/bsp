"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sms, Lock1, Google, Apple } from "iconsax-react";
import { useAuthStore } from "@/store/use-auth-store";
import { motion } from "framer-motion";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "admin@gymble.us",
      password: "password123",
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    clearErrors("root");
    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (data.email === "admin@gymble.us" && data.password === "password123") {
      setAuth(
        { id: "1", email: data.email, name: "Admin User" },
        "mock-jwt-token-behavior"
      );
      router.push("/dashboard");
    } else {
      setError("root", {
        message: "Invalid email or password. Hint: admin@gymble.us / password123",
      });
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center relative bg-zinc-50 overflow-hidden font-sans selection:bg-primary/10 selection:text-primary">
      {/* Abstract Background Texture */}
      <div className="absolute inset-0 z-0 opacity-[0.4]" style={{ backgroundImage: "radial-gradient(#5bbce4 0.5px, transparent 0.5px)", backgroundSize: "24px 24px" }} />
      <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-primary/5 blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[50%] h-[50%] rounded-full bg-primary/5 blur-[100px]" />

      <motion.div 
        initial={{ opacity: 0, scale: 0.98, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-md mx-4 relative z-10"
      >
        {/* The Login Card */}
        <div className="bg-white rounded-[2.5rem] p-10 md:p-12 shadow-[0_32px_80px_-16px_rgba(0,0,0,0.08)] border border-white">
          <div className="flex flex-col items-center mb-10 text-center">
            <Image 
              src="/gymble.png" 
              alt="Gymble Logo" 
              width={110} 
              height={110} 
              priority
              className="mb-8"
            />
            <div className="space-y-2 text-center md:text-left">
              <h1 className="text-4xl font-extrabold tracking-tight text-black text-center">Welcome back</h1>
              <p className="text-sm text-zinc-500 font-medium text-center">
                Don't have an account?{" "}
                <button className="text-primary font-bold hover:underline decoration-2 underline-offset-4 transition-all">Sign up</button>
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <Input
              label="Email Address"
              type="email"
              placeholder="name@example.com"
              inputSize="default"
              startIcon={<Sms variant="Linear" size={18} color="currentColor" className="text-zinc-400" />}
              className="bg-zinc-50 border-zinc-200 text-black placeholder:text-zinc-500 focus:border-primary focus:bg-white h-13 rounded-2xl transition-all text-base"
              {...register("email")}
              error={errors.email?.message}
              disabled={isSubmitting}
            />

            <div className="space-y-2">
              <Input
                label="Password"
                type="password"
                placeholder="Enter your password"
                inputSize="default"
                startIcon={<Lock1 variant="Linear" size={18} color="currentColor" className="text-zinc-400" />}
                className="bg-zinc-50 border-zinc-200 text-black placeholder:text-zinc-500 focus:border-primary focus:bg-white h-13 rounded-2xl transition-all text-base"
                {...register("password")}
                error={errors.password?.message}
                disabled={isSubmitting}
              />
              <div className="flex justify-end pt-1">
                <button type="button" className="text-xs font-semibold text-zinc-400 hover:text-primary transition-colors">
                  Forgot password?
                </button>
              </div>
            </div>

            {errors.root && (
              <div className="rounded-2xl bg-destructive/5 p-4 text-xs font-semibold text-destructive border border-destructive/10 animate-in fade-in slide-in-from-top-1">
                {errors.root.message}
              </div>
            )}

            <Button
              type="submit"
              className="w-full h-13 rounded-2xl text-base font-black shadow-xl shadow-primary/10 transition-all hover:scale-[1.01] active:scale-[0.98] mt-4 uppercase tracking-widest"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          <div className="relative my-12 text-center text-zinc-200">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-current opacity-50"></div>
            </div>
            <span className="relative bg-white px-6 text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400">
              Or continue with
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Button variant="outline" className="bg-white border-zinc-200 text-black hover:bg-zinc-50 h-13 rounded-2xl transition-all hover:border-zinc-300 text-xs font-black shadow-sm group">
              <Google color="currentColor" variant="Bold" size={20} />
            </Button>
            <Button variant="outline" className="bg-white border-zinc-200 text-black hover:bg-zinc-50 h-13 rounded-2xl transition-all hover:border-zinc-300 text-xs font-black shadow-sm group">
              <Apple color="currentColor" variant="Bold" size={20} />
            </Button>
          </div>
        </div>

        {/* Floating Footer Below Card */}
        <div className="mt-8 flex justify-between items-center px-4 text-[9px] text-zinc-400 font-bold uppercase tracking-[0.3em]">
          <span>© Gymble 2026</span>
          <div className="flex items-center gap-1 hover:text-black transition-colors cursor-pointer">
            <span className="font-black">System Support</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
