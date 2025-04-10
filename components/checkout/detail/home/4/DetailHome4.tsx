"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function DetailHome4() {
  // Auto carousel state
  const [currentSlide, setCurrentSlide] = useState(0);
  const autoCarouselRef = useRef<HTMLDivElement>(null);

  // Manual carousel state
  const [manualSlide, setManualSlide] = useState(0);
  const manualCarouselRef = useRef<HTMLDivElement>(null);

  const autoImages = [
    {
      src: "/detail/image copy 2.png",
      alt: "Elegant table setting",
      info: "Detailed information",
      capacity: "Max capacity available",
    },
    {
      src: "/detail/image copy.png",
      alt: "Colorful flower arrangement",
      info: "Detailed information",
      capacity: "Max capacity available",
    },
    {
      src: "/detail/image copy 2.png",
      alt: "Dining table with wine glasses",
      info: "Detailed information",
      capacity: "Max capacity available",
    },
    {
      src: "/detail/image copy.png",
      alt: "Dessert tower",
      info: "Detailed information",
      capacity: "Max capacity available",
    },
    {
      src: "/detail/image copy 2.png",
      alt: "Outdoor dining setup",
      info: "Detailed information",
      capacity: "Max capacity available",
    },
  ];

  const manualImages = [
    {
      src: "/detail/image copy.png",
      alt: "Restaurant with sunset view",
    },
    {
      src: "/detail/image copy 2.png",
      alt: "Modern restaurant interior",
    },
    {
      src: "/detail/image copy.png",
      alt: "Elegant white dining room",
    },
    {
      src: "/detail/image copy 2.png",
      alt: "Contemporary dining space",
    },
  ];

  // Auto carousel effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % autoImages.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [autoImages.length]);

  // Update auto carousel position
  useEffect(() => {
    if (autoCarouselRef.current) {
      autoCarouselRef.current.style.transform = `translateX(-${
        currentSlide * 20
      }%)`;
    }
  }, [currentSlide]);

  // Manual carousel navigation
  const prevSlide = () => {
    setManualSlide((prev) => (prev === 0 ? manualImages.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setManualSlide((prev) => (prev + 1) % manualImages.length);
  };

  // Update manual carousel position
  useEffect(() => {
    if (manualCarouselRef.current) {
      manualCarouselRef.current.style.transform = `translateX(-${
        manualSlide * 33.33
      }%)`;
    }
  }, [manualSlide]);

  return (
    <main className="min-h-screen bg-[#121212] text-white">
      {/* Header */}
      <div className=" pt-16 pb-8">
        <div className="flex flex-col items-center mb-12">
          <h2 className="text-2xl md:text-3xl font-medium mb-6 relative  flex flex-col gap-2 justify-center items-center">
            <img src="/detail/image copy 3.png" alt="" className="h-7" />
            <span className="relative z-10 px-4 bg-[#121212] text-[#FEFEFE]">
              Lorem Ipsum is simply dummy
            </span>
          </h2>
        </div>
      </div>

      {/* Auto Carousel */}
      <div className=" mb-16 overflow-hidden">
        <div
          ref={autoCarouselRef}
          className="flex transition-transform duration-1000 ease-in-out"
          style={{ width: `${autoImages.length * 20}%` }}>
          {autoImages.map((image, index) => (
            <div key={index} className="w-1/5 px-2">
              <div className="relative w-[350px] h-[470px]  rounded-lg overflow-hidden">
                <Image
                  src={image.src || "/placeholder.svg"}
                  alt={image.alt}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="mt-3 text-start">
                <h3 className="text-sm font-extrabold text-white">
                  {image.info}
                </h3>
                <p className="text-xs font-normal text-[#9A9A9A]">
                  {image.capacity}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Manual Carousel */}
      <div className=" pb-16 relative px-52">
        <div className="overflow-hidden">
          <div
            ref={manualCarouselRef}
            className="flex transition-transform duration-500 ease-in-out"
            style={{ width: `${manualImages.length * 28}%` }}>
            {manualImages.map((image, index) => (
              <div key={index} className="w-1/4 px-2">
                <div className="relative w-[400px] h-[300px]  rounded-lg overflow-hidden">
                  <Image
                    src={image.src || "/placeholder.svg"}
                    alt={image.alt}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-start mt-6 gap-2">
          <Button
            onClick={prevSlide}
            variant="outline"
            size="icon"
            className="rounded-full  bg-[#D9D9D94D] border-gray-400">
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button
            onClick={nextSlide}
            variant="outline"
            size="icon"
            className="rounded-full bg-[#D9D9D94D] border-gray-400 ">
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </main>
  );
}
