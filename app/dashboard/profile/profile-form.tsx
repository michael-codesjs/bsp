"use client";

import { useState, useEffect } from "react";
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
  InfoCircle, 
  Camera,
  Magicpen,
  Save2,
  Location,
  Instagram,
  Brush,
  DirectboxSend
} from "iconsax-react";
import axios from "@/lib/api";

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
  const [businessId] = useState<string | null>(initialData?.id || initialData?.businessId || "30");

  const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm<ProfileFormValues>({
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
    try {
      const formData = new FormData();
      formData.append("businessId", businessId || "30");
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

      router.push("/business-profile/strongest-fitness");
    } catch (error) {
      console.error("Failed to save profile", error);
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
    <div className="max-w-6xl mx-auto pb-20 px-4">
      {/* Refined Header */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div className="space-y-1">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                    <Brush size={22} variant="Bold" color="currentColor" />
                </div>
                <h1 className="text-2xl font-black text-zinc-900 tracking-tight">Profile Settings</h1>
            </div>
            <p className="text-sm font-medium text-zinc-400 ml-13">Configure your public storefront and branding.</p>
        </div>

        <div className="flex items-center gap-3">
             <Button 
                variant="outline" 
                className="h-11 px-6 rounded-xl font-bold text-zinc-500 border-zinc-200 hover:bg-zinc-50"
                onClick={() => router.push("/dashboard")}
            >
                Discard
            </Button>
            <Button 
                onClick={handleSubmit(onSubmit)}
                disabled={isSaving}
                className="h-11 px-8 rounded-xl bg-zinc-900 hover:bg-black text-white font-bold text-sm shadow-lg shadow-zinc-900/10 transition-all flex items-center gap-2"
            >
                {isSaving ? (
                    <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                ) : (
                    <Save2 size={18} variant="Bold" color="currentColor" />
                )}
                {isSaving ? "Saving..." : "Save Changes"}
            </Button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Content Column */}
        <div className="lg:col-span-8 space-y-8">
            
            {/* Business Identity Card */}
            <section className="bg-white rounded-3xl border border-zinc-100 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-zinc-50 flex items-center justify-between">
                    <h2 className="font-black text-zinc-900 uppercase tracking-wider text-xs flex items-center gap-2">
                        <Verify size={16} variant="Bold" className="text-primary" color="currentColor" />
                        Business Identity
                    </h2>
                </div>
                <div className="p-8 space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        {/* Logo Upload - More Compact */}
                        <div className="md:col-span-1 flex flex-col items-center space-y-3">
                            <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest block">Business Logo</label>
                            <div className="relative group">
                                <div className="w-32 h-32 rounded-2xl bg-zinc-50 border-2 border-dashed border-zinc-200 flex items-center justify-center overflow-hidden transition-all group-hover:border-primary/50 relative text-center">
                                    {logoPreview ? (
                                        <img src={logoPreview} alt="Logo" className="w-full h-full object-cover" />
                                    ) : (
                                        <Camera size={32} className="text-zinc-300 mx-auto" color="currentColor" />
                                    )}
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                         <ImageCropper 
                                            label=""
                                            hideDefaultUI={true}
                                            aspectRatio={1} 
                                            className="w-full h-full absolute inset-0 opacity-0 cursor-pointer"
                                            currentImage={logoPreview || undefined}
                                            onImageCropped={(img) => {
                                                setLogoPreview(img);
                                                setValue("logo", img);
                                            }}
                                        />
                                        <Camera size={20} className="text-white" variant="Bold" color="currentColor" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Name & Bio */}
                        <div className="md:col-span-3 space-y-6">
                            <Input
                                label="Display Name"
                                placeholder="e.g. Strongest Fitness"
                                {...register("businessName", { required: "Business Name is required" })}
                                error={errors.businessName?.message}
                                className="bg-zinc-50 border-none h-12 rounded-xl focus:bg-white text-sm font-medium"
                            />
                            <Input
                                label="Tagline"
                                placeholder="e.g. Excellence in every move"
                                {...register("tagline")}
                                className="bg-zinc-50 border-none h-12 rounded-xl focus:bg-white text-sm font-medium"
                            />
                            <div className="space-y-1.5">
                                <div className="flex items-center justify-between">
                                    <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest block">About Bio</label>
                                    <span className="text-[10px] font-black text-primary uppercase tracking-widest flex items-center gap-1">
                                        <Magicpen size={12} variant="Bold" color="currentColor" />
                                        AI Enhance Available
                                    </span>
                                </div>
                                <textarea 
                                    {...register("description")}
                                    placeholder="Briefly describe what your business offers..."
                                    className="w-full min-h-[120px] bg-zinc-50 border-none rounded-xl p-4 text-sm font-medium text-zinc-600 outline-none focus:bg-white transition-all placeholder:text-zinc-300 resize-none"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Details Card */}
            <section className="bg-white rounded-3xl border border-zinc-100 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-zinc-50">
                    <h2 className="font-black text-zinc-900 uppercase tracking-wider text-xs flex items-center gap-2">
                        <DirectboxSend size={16} variant="Bold" className="text-primary" color="currentColor" />
                        Contact & Location
                    </h2>
                </div>
                <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input
                        label="Support Email"
                        type="email"
                        {...register("email")}
                        startIcon={<Sms variant="Linear" size={18} className="text-zinc-400" color="currentColor" />}
                        className="bg-zinc-50 border-none h-12 rounded-xl focus:bg-white text-sm"
                    />
                    <Input
                        label="Public Phone"
                        {...register("mobile")}
                        startIcon={<Call variant="Linear" size={18} className="text-zinc-400" color="currentColor" />}
                        className="bg-zinc-50 border-none h-12 rounded-xl focus:bg-white text-sm"
                    />
                    <div className="md:col-span-2">
                         <Input
                            label="Physical Address"
                            {...register("location")}
                            startIcon={<Location variant="Linear" size={18} className="text-zinc-400" color="currentColor" />}
                            className="bg-zinc-50 border-none h-12 rounded-xl focus:bg-white text-sm"
                        />
                    </div>
                </div>
            </section>
        </div>

        {/* Sidebar Column */}
        <div className="lg:col-span-4 space-y-8">
            
            {/* Visual Media Card */}
            <section className="bg-white rounded-3xl border border-zinc-100 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-zinc-50">
                    <h2 className="font-black text-zinc-900 uppercase tracking-wider text-xs">Page Styling</h2>
                </div>
                <div className="p-6 space-y-4">
                     <div className="space-y-2">
                        <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest block">Cover Banner</label>
                        <div className="relative h-32 w-full rounded-2xl bg-zinc-50 border-2 border-dashed border-zinc-200 flex items-center justify-center overflow-hidden group hover:border-primary/50 transition-all">
                            {bannerPreview ? (
                                <img src={bannerPreview} alt="Banner" className="w-full h-full object-cover" />
                            ) : (
                                <Camera size={24} className="text-zinc-300" color="currentColor" />
                            )}
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <ImageCropper 
                                    label=""
                                    hideDefaultUI={true}
                                    aspectRatio={16/5} 
                                    className="w-full h-full absolute inset-0 opacity-0 cursor-pointer"
                                    currentImage={bannerPreview || undefined}
                                    onImageCropped={(img) => {
                                        setBannerPreview(img);
                                        setValue("banner", img);
                                    }}
                                />
                                <Camera size={20} className="text-white" variant="Bold" color="currentColor" />
                            </div>
                        </div>
                    </div>
                    <div className="p-4 bg-zinc-50 rounded-xl">
                        <div className="flex items-center gap-2 mb-1">
                            <InfoCircle size={14} className="text-primary" variant="Bold" color="currentColor" />
                            <p className="text-[10px] font-black text-zinc-600 uppercase tracking-wider">Format Guides</p>
                        </div>
                        <p className="text-[10px] font-bold text-zinc-400 leading-relaxed uppercase tracking-widest">
                            Logo: 400x400 JPG/PNG<br/>
                            Banner: 1920x600 JPG
                        </p>
                    </div>
                </div>
            </section>

             {/* Social Links Card */}
             <section className="bg-white rounded-3xl border border-zinc-100 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-zinc-50">
                    <h2 className="font-black text-zinc-900 uppercase tracking-wider text-xs flex items-center gap-2">
                        <Global size={16} variant="Bold" className="text-primary" color="currentColor" />
                        Online Presence
                    </h2>
                </div>
                <div className="p-6 space-y-4">
                    <Input
                        label="Instagram"
                        placeholder="username"
                        {...register("instagram")}
                        startIcon={<Instagram variant="Linear" size={18} className="text-zinc-400" color="currentColor" />}
                        className="bg-zinc-50 border-none h-12 rounded-xl focus:bg-white text-sm"
                    />
                    <Input
                        label="Twitter / X"
                        placeholder="handle"
                        {...register("twitter")}
                        startIcon={<Global variant="Linear" size={18} className="text-zinc-400" color="currentColor" />}
                        className="bg-zinc-50 border-none h-12 rounded-xl focus:bg-white text-sm"
                    />
                </div>
            </section>

            {/* Live Preview Button */}
            <Button 
                onClick={() => router.push("/business-profile/strongest-fitness")}
                variant="outline"
                className="w-full h-14 rounded-2xl border-white bg-zinc-900 text-white hover:bg-black font-black uppercase tracking-widest text-xs shadow-xl shadow-zinc-900/10 transition-all"
            >
                Preview Live Page
            </Button>
        </div>
      </div>
    </div>
  );
}
