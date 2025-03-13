"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { Play } from "lucide-react";

interface HeroVideoDialogProps {
  videoSrc: string;
  thumbnailSrc: string;
  className?: string;
  animationStyle?: "from-center" | "from-top";
}

export function HeroVideoDialog({
  videoSrc,
  thumbnailSrc,
  className,
  animationStyle = "from-center",
}: HeroVideoDialogProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <div
          className={cn(
            "relative w-full h-full cursor-pointer group overflow-hidden rounded-lg",
            className
          )}
        >
          <img
            src={thumbnailSrc || "/placeholder.svg"}
            alt="Video thumbnail"
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <div className="bg-orange-500 rounded-full p-4 transform transition-transform duration-300 group-hover:scale-110">
              <Play className="h-8 w-8 text-white" />
            </div>
          </div>
        </div>
      </DialogTrigger>
      <DialogContent
        className={cn(
          "sm:max-w-[900px] p-0 bg-transparent border-none",
          animationStyle === "from-top"
            ? "slide-in-from-top"
            : "slide-in-from-center"
        )}
      >
        <div className="aspect-video w-full">
          <iframe
            width="100%"
            height="100%"
            src={`${videoSrc}?autoplay=1`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="rounded-lg"
          ></iframe>
        </div>
      </DialogContent>
    </Dialog>
  );
}
