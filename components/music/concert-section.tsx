"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { GalleryImage } from "@/types/music";

interface EventSectionProps {
  images: GalleryImage[];
}

export function GallerySection({ images }: EventSectionProps) {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  return (
    <div className="w-full bg-gray-200 flex justify-center p-5">
      <div className="flex max-w-[1500px] items-center flex-col">
        {/* Гарчиг хэсэг */}
        <h1 className="font-bold text-[35px] text-center text-[#200052]">
          Gallery
        </h1>
        <h2 className="font-light text-[15px] text-center text-[#200052]">
          Latest Uploads
        </h2>

        {/* Show All товч */}
        <div className="w-full flex justify-end">
          <button className="font-light text-[15px] text-[#6B6B6B]">
            бүгдийг үзэх...
          </button>
        </div>

        {/* MD болон Mobile-д тохирсон Grid Layout */}
        <div className="w-full flex flex-col justify-center">
          <div className="flex flex-col gap-2">
            {/* MD хувилбар */}
            <div className="hidden md:flex gap-2">
              {images.slice(0, 2).map((image) => (
                <button
                  key={image.id}
                  className="group relative flex-1 h-[250px] overflow-hidden rounded-md"
                  onClick={() => setSelectedImage(image)}>
                  <img
                    src={image.url || "/placeholder.svg"}
                    alt={image.alt}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </button>
              ))}
            </div>

            {/* Mobile хувилбар */}
            <div className="flex flex-col w-full items-center md:hidden gap-2">
              {images.map((image) => (
                <button
                  key={image.id}
                  className="group relative w-full h-[200px] overflow-hidden rounded-md"
                  onClick={() => setSelectedImage(image)}>
                  <img
                    src={image.url || "/placeholder.svg"}
                    alt={image.alt}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Том зураг харах Dialog */}
      <Dialog
        open={!!selectedImage}
        onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-4xl border-zinc-800 bg-zinc-900 p-0">
          {selectedImage && (
            <img
              src={selectedImage.url || "/placeholder.svg"}
              alt={selectedImage.alt}
              className="h-full w-full object-contain"
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
