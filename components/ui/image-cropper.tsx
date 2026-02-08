"use client";

import React, { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import { Button } from "@/components/ui/button";
import getCroppedImg from "@/lib/canvas";
import { GalleryAdd, Trash, Camera } from "iconsax-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Modal } from "@/components/ui/modal";

interface ImageCropperProps {
  label: string;
  aspectRatio: number; // e.g. 1 for square, 16/9 for banner
  onImageCropped: (croppedImage: string) => void;
  currentImage?: string;
  className?: string;
  hideDefaultUI?: boolean;
}

export function ImageCropper({
  label,
  aspectRatio,
  onImageCropped,
  currentImage,
  className,
  hideDefaultUI = false,
}: ImageCropperProps) {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(currentImage || null);

  const onCropComplete = useCallback((croppedArea: any, croppedAreaPixels: any) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setImageSrc(reader.result as string);
        setIsModalOpen(true);
      });
      reader.readAsDataURL(file);
      // Reset input value so same file can be selected again
      e.target.value = "";
    }
  };

  const handleSaveCrop = async () => {
    if (imageSrc && croppedAreaPixels) {
      try {
        const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels);
        setPreviewImage(croppedImage);
        onImageCropped(croppedImage);
        setIsModalOpen(false);
        // Reset inputs
        setImageSrc(null);
        setZoom(1);
      } catch (e) {
        console.error(e);
      }
    }
  };

  const renderModal = () => (
    <Modal 
      isOpen={isModalOpen} 
      onClose={() => setIsModalOpen(false)}
      title="Adjust Image"
      maxWidth="2xl"
    >
      <div className="space-y-6">
        <div className="relative w-full h-[400px] bg-zinc-900 overflow-hidden">
          <Cropper
            image={imageSrc || ""}
            crop={crop}
            zoom={zoom}
            aspect={aspectRatio}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
            showGrid={false}
            classes={{
              containerClassName: "bg-[#111]",
              mediaClassName: "",
              cropAreaClassName: "border-2 border-primary shadow-[0_0_0_9999px_rgba(0,0,0,0.7)]"
            }}
          />
        </div>

        <div className="p-8 bg-white space-y-8">
          <div className="flex items-center gap-6">
            <span className="text-xs font-black text-zinc-400 uppercase tracking-widest w-16">Zoom</span>
            <input
              type="range"
              value={zoom}
              min={1}
              max={3}
              step={0.1}
              aria-labelledby="Zoom"
              onChange={(e) => setZoom(Number(e.target.value))}
              className="w-full h-2 bg-zinc-100 rounded-lg appearance-none cursor-pointer accent-primary hover:accent-primary/80 transition-all border-none"
            />
          </div>

          <div className="flex justify-end gap-3">
            <Button 
              variant="outline" 
              onClick={() => setIsModalOpen(false)}
              className="h-12 px-8 rounded-2xl font-bold text-sm border-zinc-200"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleSaveCrop}
              className="bg-zinc-900 hover:bg-black text-white h-12 px-10 rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl shadow-zinc-900/10 transition-all"
            >
              Save Changes
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );

  if (hideDefaultUI) {
    return (
      <>
        <div className={className}>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="absolute inset-0 opacity-0 cursor-pointer z-10"
          />
        </div>
        {renderModal()}
      </>
    );
  }

  return (
    <div className={cn("space-y-4", className)}>
      {label && (
        <label className="block text-sm font-bold text-zinc-900 uppercase tracking-wide">
          {label}
        </label>
      )}

      {previewImage ? (
        <div className="relative group overflow-hidden rounded-[32px] border border-zinc-100 bg-zinc-50 transition-all hover:border-primary/20">
           <div 
             className="relative w-full"
             style={{ 
               paddingBottom: `${(1 / aspectRatio) * 100}%`
             }}
           >
             <Image
               src={previewImage}
               alt="Preview"
               fill
               className="object-cover transition-transform duration-700 group-hover:scale-105"
             />
           </div>
           
           <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3 backdrop-blur-sm">
             <label className="cursor-pointer bg-white text-zinc-900 h-11 px-6 rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-zinc-100 transition-all shadow-xl flex items-center gap-2">
               <Camera size={18} variant="Bold" />
               Change
               <input
                 type="file"
                 accept="image/*"
                 onChange={handleFileChange}
                 className="hidden"
               />
             </label>
             <button 
               onClick={() => {
                 setPreviewImage(null);
                 onImageCropped("");
               }}
               className="bg-white text-red-500 w-11 h-11 rounded-2xl hover:bg-red-50 transition-all shadow-xl flex items-center justify-center group/trash"
             >
               <Trash size={18} variant="Bold" className="group-hover/trash:scale-110 transition-transform" />
             </button>
           </div>
        </div>
      ) : (
        <label className="flex flex-col items-center justify-center w-full min-h-[200px] border-2 border-dashed border-zinc-200 rounded-[32px] cursor-pointer bg-zinc-50/50 hover:bg-white hover:border-primary/50 transition-all group relative overflow-hidden shadow-sm">
          <div className="flex flex-col items-center justify-center p-8 text-center">
            <div className="w-16 h-16 rounded-3xl bg-white shadow-xl shadow-zinc-200/50 border border-zinc-100 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
              <GalleryAdd size={32} className="text-zinc-400 group-hover:text-primary transition-colors" variant="Bold" color="currentColor" />
            </div>
            <p className="text-sm text-zinc-600 font-bold mb-1">
              <span className="text-zinc-900 group-hover:text-primary transition-colors">Click to upload</span> {label}
            </p>
            <p className="text-[10px] text-zinc-400 font-black uppercase tracking-widest">
              JPG, PNG or WEBP (MAX 5MB)
            </p>
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </label>
      )}

      {renderModal()}
    </div>
  );
}
