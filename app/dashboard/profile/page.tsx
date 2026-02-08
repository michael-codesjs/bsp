"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAuthStore } from "@/store/use-auth-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ImageCropper } from "@/components/ui/image-cropper";
import { useRouter } from "next/navigation";
import { User, Sms, Global, Call, Verify } from "iconsax-react";
import { BusinessProfile } from "@/types/business";
import axios from "@/lib/api";

type ProfileFormValues = {
  businessName: string;
  email: string;
  mobile: string;
  twitter: string;
  instagram: string;
  logo: string;
  banner: string;
};

export default function ProfilePage() {
  const router = useRouter();
  const { user } = useAuthStore();
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [bannerPreview, setBannerPreview] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // Initialize form with default values (could be fetched from API)
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<ProfileFormValues>({
    defaultValues: {
      businessName: "Strongest Fitness",
      email: "hello@strongest.fitness",
      mobile: "+1 (555) 000-0000",
      twitter: "@strongest",
      instagram: "@strongest_fit",
      logo: "",
      banner: ""
    }
  });

  // Watch for image changes to update local state if needed
  // (In this implementation, we use callbacks from ImageCropper to set values)

  // Hydrate form with mock data on load
  useEffect(() => {
    // Ideally fetch from API here. For now validation is static but persistent logic will be handled in submit
    // We'll verify this works via the public page flow later
    setValue("logo", "https://images.unsplash.com/photo-1599058917232-d750d2009aa7?q=80&w=200&auto=format&fit=crop");
    setValue("banner", "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=2000&auto=format&fit=crop");
    
    setLogoPreview("https://images.unsplash.com/photo-1599058917232-d750d2009aa7?q=80&w=200&auto=format&fit=crop");
    setBannerPreview("https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=2000&auto=format&fit=crop");
  }, [setValue]);

  const onSubmit = async (data: ProfileFormValues) => {
    setIsSaving(true);
    try {
      // 1. Prepare payload matching BusinessProfile type partially or as the API expects
      // Since it's a mock backend via local storage or just a demo API endpoint check
      // We will simulate a save.
      
      const payload: Partial<BusinessProfile> = {
        name: data.businessName,
        email: data.email,
        phone: data.mobile,
        logo: data.logo,
        banner: data.banner,
        socials: {
          twitter: data.twitter,
          instagram: data.instagram
        }
      };

      console.log("Saving profile:", payload);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      // In a real app, we'd POST to /edit-business-profile
      // For this prototype, we'll store in localStorage to persist across navigation demo if needed
      if (typeof window !== "undefined") {
        localStorage.setItem("business_profile_demo", JSON.stringify(payload));
      }

      // Redirect to public page to see changes (using the slug)
      // Assuming slug is static for demo as 'strongest-fitness'
      router.push("/business-profile/strongest-fitness");

    } catch (error) {
      console.error("Failed to save profile", error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-20">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-black tracking-tight text-zinc-900">Edit Profile</h1>
        <p className="text-zinc-500 font-medium">Manage your business information and appearance.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
        
        {/* Media Section */}
        <section className="bg-white rounded-3xl p-8 border border-zinc-100 shadow-sm space-y-8">
          <div className="flex items-center gap-3 pb-4 border-b border-zinc-50">
            <h2 className="text-lg font-bold text-zinc-900">Media Assets</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-1">
              <ImageCropper 
                label="Logo" 
                aspectRatio={1} 
                className="w-full"
                currentImage={logoPreview || undefined}
                onImageCropped={(img) => {
                  setLogoPreview(img);
                  setValue("logo", img);
                }}
              />
              <p className="text-[10px] text-zinc-400 mt-2 font-medium">
                Recommended: 500x500px. Square crop.
              </p>
            </div>
            
            <div className="md:col-span-2">
              <ImageCropper 
                label="Cover Banner" 
                aspectRatio={16/5} 
                className="w-full"
                currentImage={bannerPreview || undefined}
                onImageCropped={(img) => {
                  setBannerPreview(img);
                  setValue("banner", img);
                }}
              />
              <p className="text-[10px] text-zinc-400 mt-2 font-medium">
                Recommended: 1500x500px. Wide landscape crop.
              </p>
            </div>
          </div>
        </section>

        {/* Business Details */}
        <section className="bg-white rounded-3xl p-8 border border-zinc-100 shadow-sm space-y-8">
          <div className="flex items-center gap-3 pb-4 border-b border-zinc-50">
            <h2 className="text-lg font-bold text-zinc-900">Business Details</h2>
          </div>

          <div className="grid gap-6">
            <Input
              label="Business Name"
              {...register("businessName", { required: "Business Name is required" })}
              error={errors.businessName?.message}
              startIcon={<Verify variant="Linear" size={18} className="text-zinc-400" />}
              className="bg-zinc-50 border-zinc-200 h-12 rounded-xl"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Email Address"
                type="email"
                {...register("email", { required: "Email is required" })}
                error={errors.email?.message}
                startIcon={<Sms variant="Linear" size={18} className="text-zinc-400" />}
                className="bg-zinc-50 border-zinc-200 h-12 rounded-xl"
              />
              <Input
                label="Phone Number"
                {...register("mobile", { required: "Phone is required" })}
                error={errors.mobile?.message}
                startIcon={<Call variant="Linear" size={18} className="text-zinc-400" />}
                className="bg-zinc-50 border-zinc-200 h-12 rounded-xl"
              />
            </div>
          </div>
        </section>

        {/* Social Links */}
        <section className="bg-white rounded-3xl p-8 border border-zinc-100 shadow-sm space-y-8">
          <div className="flex items-center gap-3 pb-4 border-b border-zinc-50">
            <h2 className="text-lg font-bold text-zinc-900">Social Connections</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Twitter Handle"
              placeholder="@username"
              {...register("twitter")}
              startIcon={<Global variant="Linear" size={18} className="text-zinc-400" />}
              className="bg-zinc-50 border-zinc-200 h-12 rounded-xl"
            />
            <Input
              label="Instagram Handle"
              placeholder="@username"
              {...register("instagram")}
              startIcon={<Global variant="Linear" size={18} className="text-zinc-400" />}
              className="bg-zinc-50 border-zinc-200 h-12 rounded-xl"
            />
          </div>
        </section>

        {/* Actions */}
        <div className="flex justify-end gap-4 sticky bottom-8 pt-4">
          <Button 
            type="button" 
            variant="ghost" 
            className="h-14 px-8 rounded-2xl font-bold text-zinc-500 hover:text-zinc-900"
            onClick={() => router.back()}
          >
            Cancel
          </Button>
          <Button 
            type="submit" 
            disabled={isSaving}
            className="h-14 px-10 rounded-2xl bg-primary hover:bg-primary-hover text-white font-black uppercase tracking-widest shadow-xl shadow-primary/20 text-sm hover:scale-105 transition-all active:scale-95"
          >
            {isSaving ? "Saving..." : "Save Changes"}
          </Button>
        </div>

      </form>
    </div>
  );
}
