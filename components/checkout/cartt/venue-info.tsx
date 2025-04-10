"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Venue } from "./types";

interface VenueInfoProps {
  venue: Venue;
}

export default function VenueInfo({ venue }: VenueInfoProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Handle image navigation
  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % venue.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + venue.images.length) % venue.images.length
    );
  };

  // Generate star rating
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <span key={`star-${i}`} className="text-yellow-400">
          ★
        </span>
      );
    }

    if (hasHalfStar) {
      stars.push(
        <span key="half-star" className="text-yellow-400">
          ★
        </span>
      );
    }

    const remainingStars = 5 - stars.length;
    for (let i = 0; i < remainingStars; i++) {
      stars.push(
        <span key={`empty-${i}`} className="text-gray-600">
          ★
        </span>
      );
    }

    return stars;
  };

  return (
    <div className="flex justify-between px-10 py-5 border-b border-[#939393]">
      <div className="flex gap-6">
        <div className="w-[230px] h-[288px] relative rounded-md overflow-hidden">
          <Image
            src={venue.images[0] || "/image copy 7.png"}
            alt={venue.name}
            fill
            className="object-cover"
          />
        </div>
        <div className="flex-1">
          <h2 className="text-lg font-bold uppercase text-white">
            {venue.name}
          </h2>
          <h3 className="text-md font-medium text-gray-300">{venue.subtype}</h3>
          <div className="my-1 text-lg">{renderStars(venue.rating)}</div>
          <div className="flex gap-2 items-center mt-2">
            <span className="text-gray-400">Төрөл:</span>
            <span className="text-white">{venue.type}</span>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-8">
        <div className="mt-4 relative w-auto">
          <div className="flex gap-2 overflow-x-auto py-2">
            {venue.images.map((image, index) => (
              <div
                key={index}
                className={`relative rounded overflow-hidden flex-shrink-0 w-[120px] h-36 ${
                  index === currentImageIndex ? "ring-2 ring-primary" : ""
                }`}>
                <Image
                  src={image || "/placeholder.svg"}
                  alt={`${venue.name} ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
          <div className="absolute top-44 left-2 -translate-y-1/2">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full bg-gray-800/80 h-8 w-8"
              onClick={prevImage}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
          </div>
          <div className="absolute top-44 left-14 -translate-y-1/2">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full bg-gray-800/80 h-8 w-8"
              onClick={nextImage}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          <div className="absolute top-42 right-1 text-white px-3 py-1 rounded-full text-xl font-bold">
            {String(currentImageIndex + 1).padStart(2, "0")}
          </div>
        </div>
        <div className="mt-4 flex items-start gap-2">
          <MapPin className="h-5 w-5 text-gray-400 mt-0.5" />
          <div>
            <p className="text-white">{venue.location}</p>
            <p className="text-sm text-gray-400">Байршил</p>
          </div>
        </div>
      </div>
    </div>
  );
}
