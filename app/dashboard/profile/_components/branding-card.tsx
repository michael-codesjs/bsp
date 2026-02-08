"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ImageCropper } from "@/components/ui/image-cropper";
import { Maximize1, Camera, GalleryAdd, Edit } from "iconsax-react";

interface BrandingCardProps {
  bannerPreview: string | null;
  setBannerPreview: (preview: string | null) => void;
  logoPreview: string | null;
  setLogoPreview: (preview: string | null) => void;
  setValue: (field: any, value: any) => void;
}

export function BrandingCard({ 
  bannerPreview, 
  setBannerPreview, 
  logoPreview, 
  setLogoPreview, 
  setValue 
}: BrandingCardProps) {
  return (
    <div className="bg-white rounded-[32px] border border-zinc-100 p-8 shadow-sm">
       <div className="relative group mb-12">
          {/* Banner Uploader */}
          <div className="relative h-64 w-full rounded-[24px] bg-zinc-50 border border-zinc-100 overflow-hidden group/banner">
              {bannerPreview ? (
                  <img src={bannerPreview} alt="Banner" className="w-full h-full object-cover transition-transform duration-700 group-hover/banner:scale-105" />
              ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-zinc-300 gap-3">
                      <Maximize1 size={40} className="text-zinc-200" variant="Bulk" />
                      <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Add Brand Cover</span>
                  </div>
              )}

              {/* Cropper Trigger Overlay */}
              <div className="absolute inset-0 z-10">
                 <ImageCropper 
                    label="Banner"
                    hideDefaultUI={true}
                    aspectRatio={16/5}
                    currentImage={bannerPreview || undefined}
                    onImageCropped={(img) => {
                        setBannerPreview(img);
                        setValue("banner", img);
                    }}
                    className="w-full h-full opacity-0 cursor-pointer"
                 />
              </div>

               {/* Hover Overlay Visual */}
               <div className="absolute top-6 right-6 opacity-0 group-hover/banner:opacity-100 transition-opacity pointer-events-none z-20">
                  <Button variant="secondary" size="sm" className="rounded-xl shadow-lg border border-zinc-100 font-black text-[10px] uppercase tracking-widest gap-2 bg-white/90 backdrop-blur-sm pointer-events-none">
                      <Edit size={14} variant="Bold" color="currentColor" />
                      Update Cover
                  </Button>
              </div>
          </div>

          {/* Logo Uploader - Overlap */}
          <div className="absolute -bottom-16 left-10 z-30">
              <div className="relative w-32 h-32 rounded-[28px] bg-white p-1.5 shadow-xl ring-4 ring-white/50 group/logo">
                  <div className="w-full h-full rounded-[20px] overflow-hidden bg-zinc-50 border-2 border-dashed border-zinc-100 hover:border-primary/50 transition-all relative">
                      {logoPreview ? (
                          <img src={logoPreview} alt="Logo" className="w-full h-full object-cover" />
                      ) : (
                          <div className="w-full h-full flex items-center justify-center">
                             <Camera size={24} className="text-zinc-300" variant="Bold" />
                          </div>
                      )}

                       {/* Cropper Trigger Overlay */}
                      <div className="absolute inset-0 z-10">
                        <ImageCropper 
                            label="Logo"
                            hideDefaultUI={true}
                            aspectRatio={1}
                            currentImage={logoPreview || undefined}
                            onImageCropped={(img) => {
                                setLogoPreview(img);
                                setValue("logo", img);
                            }}
                            className="w-full h-full opacity-0 cursor-pointer"
                        />
                      </div>

                       {/* Hover Overlay Visual */}
                       <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/logo:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px] pointer-events-none z-20">
                           <Edit size={20} className="text-white" variant="Bold" color="currentColor" />
                       </div>
                  </div>
              </div>
          </div>
       </div>
    </div>
  );
}
