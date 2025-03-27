"use client";

import { useState } from "react";
import Image from "next/image";
import { Heart } from "lucide-react";

export default function VenueGallery() {
  // State to track which venues are favorited
  const [favorites, setFavorites] = useState<Record<number, boolean>>({});

  // Toggle favorite status for a venue
  const toggleFavorite = (id: number) => {
    setFavorites((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Sample venue data
  const venues = [
    {
      id: 1,
      name: "Shangrilla Restaurant",
      location: "Grand Ball Room",
      rating: 4.5,
    },
    {
      id: 2,
      name: "Shangrilla Restaurant",
      location: "Grand Ball Room",
      rating: 4.5,
    },
    {
      id: 3,
      name: "Shangrilla Restaurant",
      location: "Grand Ball Room",
      rating: 4.5,
    },
  ];

  return (
    <div className="bg-black relative text-white min-h-screen">
      {/* Header Section */}
      <div className="container mx-auto px-4 py-16 max-w-7xl">
        <div className="text-center mb-8">
          <h3 className="text-amber-500 font-serif italic text-xl mb-4">
            Why Choose Us
          </h3>

          <div className="flex items-center justify-center gap-4">
            <div className="h-px bg-gray-700 w-24" />
            <h2 className="text-3xl md:text-4xl font-bold">
              Lorem Ipsum is simply dummy
            </h2>
            <div className="h-px bg-gray-700 w-24" />
          </div>
        </div>

        <div className="relative w-full h-[300px] md:h-[300px] rounded-xl overflow-hidden mb-8">
          <Image
            alt="Elegant restaurant interior with warm lighting and comfortable seating"
            fill
            src="/uul.jpg"
            className="absolute object-cover inset-0 bg-cover bg-center"
          />
        </div>

        {/* Venue Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {venues.map((venue) => (
            <div
              key={venue.id}
              className="relative rounded-lg overflow-hidden group"
            >
              {/* Favorite Button */}
              <button
                onClick={() => toggleFavorite(venue.id)}
                className="absolute top-3 right-3 z-10 p-2 rounded-full bg-black/30 backdrop-blur-sm transition-colors"
              >
                <Heart
                  className={`w-5 h-5 transition-colors ${
                    favorites[venue.id]
                      ? "fill-amber-500 text-amber-500"
                      : "text-white"
                  }`}
                />
              </button>

              {/* Venue Image */}
              <div className="relative h-64 w-full">
                <Image
                  src="/5cover1.jpg"
                  alt={venue.name}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Venue Info */}
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 to-black/0">
                <div className="flex justify-between items-end">
                  <div>
                    <h3 className="text-lg font-semibold">{venue.name}</h3>
                    <p className="text-sm text-gray-300">{venue.location}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-amber-500">★</span>
                    <span>{venue.rating}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
