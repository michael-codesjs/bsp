"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input/input";
import { ImageCropper } from "@/components/ui/image-cropper";
import { useRouter } from "next/navigation";
import { 
  Sms, 
  Global, 
  Call, 
  Verify, 
  Camera,
  Magicpen,
  Save2,
  Location,
  Instagram,
  Brush,
  DirectboxSend,
  ArrowRight,
  Maximize1,
  Flash,
  Edit,
  Trash
} from "iconsax-react";
import axios from "@/lib/api";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

type ProfileFormValues = {
  businessName: string;
  email: string;
  mobile: string;
  twitter: string;
  instagram: string;
  logo: string;
  banner: string;
  description: string;
  tagline: string;
  location: string;
};

interface ProfileFormProps {
  initialData: any;
}

export function ProfileForm({ initialData }: ProfileFormProps) {
  const router = useRouter();
  const [logoPreview, setLogoPreview] = useState<string | null>(initialData?.logo || null);
  const [bannerPreview, setBannerPreview] = useState<string | null>(initialData?.cover || initialData?.banner || null);
  const [isSaving, setIsSaving] = useState(false);

  const { register, handleSubmit, setValue, formState: { errors } } = useForm<ProfileFormValues>({
    defaultValues: {
      businessName: initialData?.bisName || initialData?.name || "",
      email: initialData?.email || "",
      mobile: initialData?.mobile || initialData?.phone || "",
      logo: initialData?.logo || "",
      banner: initialData?.cover || initialData?.banner || "",
      description: initialData?.about || "",
      tagline: initialData?.tagline || "",
      location: initialData?.location || "New York, NY",
      twitter: initialData?.socialMedia?.find((s: any) => s.socialMediaTypeId === 1 || s.type === "twitter")?.link || "",
      instagram: initialData?.socialMedia?.find((s: any) => s.socialMediaTypeId === 2 || s.type === "instagram")?.link || ""
    }
  });

  const onSubmit = async (data: ProfileFormValues) => {
    setIsSaving(true);
    const saveToast = toast.loading("Updating your public profile...");
    try {
      const formData = new FormData();
      formData.append("businessId", initialData?.id || initialData?.businessId || "30");
      formData.append("brand", data.businessName);
      formData.append("mobile", data.mobile);
      formData.append("email", data.email);
      formData.append("about", data.description);
      formData.append("tagline", data.tagline);
      
      if (data.logo && data.logo.startsWith("data:image")) {
        const logoFile = dataURLtoFile(data.logo, "logo.jpg");
        formData.append("logo", logoFile);
      }
      
      if (data.banner && data.banner.startsWith("data:image")) {
        const bannerFile = dataURLtoFile(data.banner, "banner.jpg");
        formData.append("cover", bannerFile);
      }

      formData.append("socialMedia[0][socialMediaTypeId]", "1");
      formData.append("socialMedia[0][link]", data.twitter);
      
      formData.append("socialMedia[1][socialMediaTypeId]", "2");
      formData.append("socialMedia[1][link]", data.instagram);

      await axios.put("website/business/profile/edit", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Profile saved successfully", { id: saveToast });
      router.refresh();
    } catch (error) {
      console.error("Failed to save profile", error);
      toast.error("Failed to update profile", { id: saveToast });
    } finally {
      setIsSaving(false);
    }
  };

  const dataURLtoFile = (dataurl: string, filename: string) => {
    const arr = dataurl.split(',');
    const mime = arr[0].match(/:(.*?);/)![1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  };

  return (
    <div className="space-y-10 pb-20">
      {/* Refined Header - Exact Dashboard Style */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-zinc-900 tracking-tight">Business Profile</h1>
          <p className="text-zinc-500 font-medium mt-1">Manage your public storefront and brand identity.</p>
        </div>
        <div className="flex items-center gap-3">
             <Button 
                variant="outline" 
                className="h-11 px-6 rounded-2xl font-black text-xs uppercase tracking-widest text-zinc-400 border-zinc-200 hover:bg-zinc-50 transition-all hover:text-zinc-900"
                onClick={() => router.push("/dashboard")}
            >
                Cancel
            </Button>
            <Button 
                onClick={handleSubmit(onSubmit)}
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

      {/* Hero Branding Section - Clean & Integrated */}
      <div className="bg-white rounded-[32px] border border-zinc-100 p-8 shadow-sm">
         <div className="relative group">
            {/* Banner Preview */}
            <div className="relative h-64 w-full rounded-[24px] bg-zinc-50 border border-zinc-100 overflow-hidden group/banner">
                {bannerPreview ? (
                    <img src={bannerPreview} alt="Banner" className="w-full h-full object-cover transition-transform duration-700 group-hover/banner:scale-105" />
                ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-zinc-300 gap-3">
                        <Maximize1 size={40} className="text-zinc-200" color="currentColor" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Add Brand Cover</span>
                    </div>
                )}
                
                <div className="absolute top-6 right-6 flex items-center gap-2 opacity-0 group-hover/banner:opacity-100 transition-opacity">
                    <div className="relative overflow-hidden">
                        <ImageCropper 
                            label=""
                            hideDefaultUI={true}
                            aspectRatio={16/5} 
                            className="w-full h-full absolute inset-0 opacity-0 cursor-pointer z-10"
                            currentImage={bannerPreview || undefined}
                            onImageCropped={(img) => {
                                setBannerPreview(img);
                                setValue("banner", img);
                            }}
                        />
                        <Button variant="secondary" size="sm" className="rounded-xl shadow-lg border border-zinc-100 font-black text-[10px] uppercase tracking-widest gap-2 bg-white/90 backdrop-blur-sm">
                            <Edit size={14} variant="Bold" color="currentColor" />
                            Update Cover
                        </Button>
                    </div>
                </div>
            </div>

            {/* Logo Overlap - Polished */}
            <div className="absolute -bottom-8 left-10">
                <div className="relative group/logo">
                    <div className="w-32 h-32 rounded-[28px] bg-white p-1.5 shadow-xl border border-zinc-100 overflow-hidden ring-4 ring-white/10 transition-transform duration-500 group-hover/logo:scale-105">
                        <div className="w-full h-full rounded-[20px] bg-zinc-50 border-2 border-dashed border-zinc-100 flex items-center justify-center overflow-hidden transition-all group-hover/logo:border-primary/50 relative">
                            {logoPreview ? (
                                <img src={logoPreview} alt="Logo" className="w-full h-full object-cover" />
                            ) : (
                                <Camera size={28} className="text-zinc-200" color="currentColor" />
                            )}
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/logo:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                                 <ImageCropper 
                                    label=""
                                    hideDefaultUI={true}
                                    aspectRatio={1} 
                                    className="w-full h-full absolute inset-0 opacity-0 cursor-pointer z-20"
                                    currentImage={logoPreview || undefined}
                                    onImageCropped={(img) => {
                                        setLogoPreview(img);
                                        setValue("logo", img);
                                    }}
                                />
                                <Edit size={20} className="text-white" variant="Bold" color="currentColor" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
         </div>
         <div className="h-12" /> {/* Spacer for logo overlap */}
      </div>

      {/* Form Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Core Identity Card */}
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
                        className="bg-white border border-zinc-200 h-12 rounded-xl text-sm font-bold shadow-sm transition-all focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    />
                    <Input
                        label="Marketing Tagline"
                        placeholder="e.g. Unleash your potential"
                        {...register("tagline")}
                        className="bg-white border border-zinc-200 h-12 rounded-xl text-sm font-bold shadow-sm transition-all focus:ring-2 focus:ring-primary/20 focus:border-primary"
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
                        className="w-full min-h-[160px] bg-white border border-zinc-200 rounded-[20px] p-5 text-sm font-medium text-zinc-600 outline-none transition-all placeholder:text-zinc-300 resize-none shadow-sm focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    />
                </div>
            </div>
        </section>

        {/* Reach & Social Card */}
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
                        className="bg-white border border-zinc-200 h-12 rounded-xl text-sm font-bold shadow-sm transition-all focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    />
                    <Input
                        label="Public Phone"
                        {...register("mobile")}
                        startIcon={<Call variant="Bold" size={20} className="text-primary/40" color="currentColor" />}
                        className="bg-white border border-zinc-200 h-12 rounded-xl text-sm font-bold shadow-sm transition-all focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    />
                </div>
                <Input
                    label="Business Location"
                    {...register("location")}
                    startIcon={<Location variant="Bold" size={20} className="text-primary/40" color="currentColor" />}
                    className="bg-zinc-50 border-none h-12 rounded-xl focus:bg-white text-sm shadow-sm font-bold"
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-zinc-50">
                    <Input
                        label="Instagram"
                        placeholder="username"
                        {...register("instagram")}
                        startIcon={<Instagram variant="Bold" size={20} className="text-[#E1306C]/60" color="currentColor" />}
                        className="bg-white border border-zinc-200 h-12 rounded-xl text-sm font-bold shadow-sm transition-all focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    />
                    <Input
                        label="X / Twitter"
                        placeholder="handle"
                        {...register("twitter")}
                        startIcon={<Global variant="Bold" size={20} className="text-zinc-400" color="currentColor" />}
                        className="bg-white border border-zinc-200 h-12 rounded-xl text-sm font-bold shadow-sm transition-all focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    />
                </div>
            </div>
        </section>

        {/* Live Preview / Link Card - More Integrated */}
        <section 
            className="lg:col-span-2 group relative p-8 rounded-[32px] bg-zinc-900 overflow-hidden cursor-pointer shadow-xl shadow-zinc-950/10 transition-all hover:translate-y-[-2px]"
            onClick={() => router.push(`/business-profile/${initialData?.link || "strongest-fitness"}`)}
        >
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[60px] transition-all group-hover:bg-primary/20" />
            
            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-2">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Active Storefront</span>
                    </div>
                    <h3 className="text-xl font-black text-white tracking-tight">View your public portal live</h3>
                    <p className="text-sm font-medium text-zinc-500">Check how your brand appears to athletes across the world.</p>
                </div>
                <Button className="h-12 px-8 rounded-xl bg-white text-zinc-950 hover:bg-zinc-100 font-black text-xs uppercase tracking-widest gap-3 shadow-2xl">
                    Open Portal
                    <ArrowRight size={18} variant="Bold" color="currentColor" />
                </Button>
            </div>
        </section>
      </div>
    </div>
  );
}
