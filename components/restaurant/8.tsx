"use client";

import { useState } from "react";
import Image from "next/image";
import { Heart } from "lucide-react";

export default function VenueGrid() {
  // State to track which venues are favorited
  const [favorites, setFavorites] = useState<Record<number, boolean>>({});

  // Toggle favorite status
  const toggleFavorite = (id: number) => {
    setFavorites((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Venue data - all showing the same ballroom image
  const venues = Array(6)
    .fill(null)
    .map((_, index) => ({
      id: index + 1,
      image: "/uul.jpg", // Ballroom image
      name: "Shangrilla Restaurant",
      location: "Grand Ball Room",
      rating: 4.5,
    }));

  return (
    <div className="w-full relative bg-black py-16 px-4 md:px-8">
      {/* Header */}
      <div className="text-center mb-16">
        <h2 className="text-amber-500 font-serif italic text-xl">
          Why Choose Us
        </h2>

        <div className="flex items-center justify-center gap-4 mt-6">
          <div className="w-16 h-px bg-gray-700"></div>
          <h3 className="text-white text-2xl md:text-3xl font-medium">
            Lorem Ipsum is simply dummy
          </h3>
          <div className="w-16 h-px bg-gray-700"></div>
        </div>
      </div>

      {/* Venue Grid - Simple 3x2 grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-7xl mx-auto">
        {venues.map((venue) => (
          <div
            key={venue.id}
            className="relative rounded-lg overflow-hidden aspect-[4/3]"
          >
            <Image
              src={venue.image || "/placeholder.svg"}
              alt={venue.name}
              fill
              className="object-cover"
            />

            {/* Favorite button */}
            <button
              onClick={() => toggleFavorite(venue.id)}
              className="absolute top-3 right-3 z-10 p-2 rounded-full bg-black/30 backdrop-blur-sm transition-all hover:bg-black/50"
            >
              <Heart
                className={`w-5 h-5 transition-colors ${
                  favorites[venue.id] ? "fill-white text-white" : "text-white"
                }`}
              />
            </button>

            {/* Venue info */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
              <div className="flex justify-between items-end">
                <div>
                  <h3 className="text-white font-medium">{venue.name}</h3>
                  <p className="text-white/80 text-sm">{venue.location}</p>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-amber-400">★</span>
                  <span className="text-white">{venue.rating}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
