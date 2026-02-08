"use client";

import React, { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import { Button } from "@/components/ui/button";
// Custom built-in modal used instead of external Dialog component to avoid dependencies
// import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"; 
// import { Slider } from "@/components/ui/slider"; 
import getCroppedImg from "@/lib/canvas";
import { CloudPlus, GalleryAdd, Trash } from "iconsax-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface ImageCropperProps {
  label: string;
  aspectRatio: number; // e.g. 1 for square, 16/9 for banner
  onImageCropped: (croppedImage: string) => void;
  currentImage?: string;
  className?: string;
}

export function ImageCropper({
  label,
  aspectRatio,
  onImageCropped,
  currentImage,
  className,
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

  return (
    <div className={cn("space-y-4", className)}>
      <label className="block text-sm font-bold text-zinc-900 uppercase tracking-wide">
        {label}
      </label>

      {previewImage ? (
        <div className="relative group overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-50 transition-all hover:border-zinc-300">
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
               className="object-cover transition-transform duration-500 group-hover:scale-105"
             />
           </div>
           
           <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4 backdrop-blur-[2px]">
             <label className="cursor-pointer bg-white text-black px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-zinc-100 transition-colors shadow-lg">
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
               className="bg-red-500 text-white p-2 rounded-xl hover:bg-red-600 transition-colors shadow-lg"
             >
               <Trash size={16} variant="Bold" />
             </button>
           </div>
        </div>
      ) : (
        <label className="flex flex-col items-center justify-center w-full min-h-[160px] border-2 border-dashed border-zinc-200 rounded-2xl cursor-pointer bg-zinc-50/50 hover:bg-zinc-50 hover:border-primary/50 transition-all group">
          <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center px-4">
            <div className="w-12 h-12 rounded-full bg-white shadow-sm border border-zinc-100 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <GalleryAdd size={24} className="text-zinc-400 group-hover:text-primary transition-colors" variant="Bold" />
            </div>
            <p className="text-sm text-zinc-600 font-medium">
              <span className="font-bold text-zinc-900 group-hover:text-primary transition-colors">Click to upload</span> {label}
            </p>
            <p className="text-xs text-zinc-400 mt-1">
              SVG, PNG, JPG (max. 2MB)
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

      {/* Custom Modal Overlay */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200 border border-zinc-100/20">
            <div className="p-6 border-b border-zinc-100 bg-white z-10 relative flex justify-between items-center">
              <div>
                <h3 className="text-lg font-black tracking-tight text-zinc-900">Adjust Image</h3>
                <p className="text-sm text-zinc-500 font-medium">Drag to reposition and scroll/slider to zoom</p>
              </div>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-zinc-400 hover:text-red-500 transition-colors"
              >
                Cancel
              </button>
            </div>
            
            <div className="relative w-full h-[400px] bg-zinc-900">
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

            <div className="p-6 bg-white space-y-6">
              <div className="flex items-center gap-4">
                <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider w-12">Zoom</span>
                <input
                  type="range"
                  value={zoom}
                  min={1}
                  max={3}
                  step={0.1}
                  aria-labelledby="Zoom"
                  onChange={(e) => setZoom(Number(e.target.value))}
                  className="w-full h-1.5 bg-zinc-100 rounded-lg appearance-none cursor-pointer accent-primary hover:accent-primary/80 transition-all"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <Button 
                  variant="outline" 
                  onClick={() => setIsModalOpen(false)}
                  className="text-xs font-bold border-zinc-200 h-10 px-6"
                >
                  Cancel
                </Button>
                <Button 
                  onClick={handleSaveCrop}
                  className="bg-primary hover:bg-primary/90 text-white text-xs font-bold uppercase tracking-widest h-10 px-6 shadow-lg shadow-primary/25"
                >
                  Save Changes
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
