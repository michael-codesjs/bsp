"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import axios from "@/lib/api";
import { toast } from "sonner";
import { ProfileHeader } from "./profile-header";
import { BrandingCard } from "./branding-card";
import { IdentityCard } from "./identity-card";
import { ChannelsCard } from "./channels-card";
import { PreviewCard } from "./preview-card";
import { ErrorState } from "./error-state";
import { ProfileFormValues } from "./types";

interface ProfileFormProps {
  initialData: any;
}

export function ProfileForm({ initialData }: ProfileFormProps) {
  const router = useRouter();

  const business = initialData;

  // Handle Loading/Error State
  if (!business || !business.id) {
    return <ErrorState />;
  }

  const [logoPreview, setLogoPreview] = useState<string | null>(business?.bisUserData?.logoUrl || business?.logo || null);
  const [bannerPreview, setBannerPreview] = useState<string | null>(business?.bisUserData?.coverUrl || business?.cover || business?.banner || null);
  const [isSaving, setIsSaving] = useState(false);

  const { register, handleSubmit, setValue, formState: { errors } } = useForm<ProfileFormValues>({
    defaultValues: {
      businessName: business?.brand || business?.bisName || "",
      email: business?.email || "",
      mobile: business?.mobile || "",
      logo: business?.bisUserData?.logoUrl || business?.logo || "",
      banner: business?.bisUserData?.coverUrl || business?.cover || "",
      description: business?.bisUserData?.about || business?.about || "",
      tagline: business?.bisUserData?.tagline || business?.tagline || "",
      location: business?.location || "New York, NY",
      twitter: business?.socialMediaDetails?.find((s: any) => s.socialMediaTypeId === 1 || s.type === "twitter")?.link || "",
      instagram: business?.socialMediaDetails?.find((s: any) => s.socialMediaTypeId === 2 || s.type === "instagram")?.link || ""
    }
  });

  const onSubmit = async (data: ProfileFormValues) => {
    setIsSaving(true);
    const saveToast = toast.loading("Updating your public profile...");
    try {
      const formData = new FormData();
      // Using the correct ID from bisUserData as requested
      formData.append("businessId", business.bisUserData?.id);
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
      <ProfileHeader 
        isSaving={isSaving} 
        onSave={handleSubmit(onSubmit)} 
        onCancel={() => router.push("/dashboard")} 
      />

      <BrandingCard 
        bannerPreview={bannerPreview}
        setBannerPreview={setBannerPreview}
        logoPreview={logoPreview}
        setLogoPreview={setLogoPreview}
        setValue={setValue}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <IdentityCard register={register} errors={errors} />
        <ChannelsCard register={register} />
        <PreviewCard businessLink={business?.link} />
      </div>
    </div>
  );
}
