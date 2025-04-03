"use client";

import { useState } from "react";
import Image from "next/image";
import { Heart } from "lucide-react";

export default function VenueShowcase() {
  // State to track which venues are favorited
  const [favorites, setFavorites] = useState<Record<number, boolean>>({});

  // Toggle favorite status
  const toggleFavorite = (id: number) => {
    setFavorites((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Venue data - alternating between couple and ballroom images
  const venues = [
    {
      id: 1,
      image: "/uul.jpg", // Couple at bar image
      name: "",
      location: "",
      rating: 0,
      type: "couple",
      size: "large",
    },
    {
      id: 2,
      image: "/uul.jpg", // Ballroom image
      name: "Shangrilla Restaurant",
      location: "Grand Ball Room",
      rating: 4.5,
      type: "ballroom",
      size: "small",
    },
    {
      id: 3,
      image: "/uul.jpg", // Ballroom image
      name: "Shangrilla Restaurant",
      location: "Grand Ball Room",
      rating: 4.5,
      type: "ballroom",
      size: "small",
    },
    {
      id: 4,
      image: "/uul.jpg", // Ballroom image
      name: "Shangrilla Restaurant",
      location: "Grand Ball Room",
      rating: 4.5,
      type: "ballroom",
      size: "small",
    },
    {
      id: 5,
      image: "/uul.jpg", // Couple at bar image
      name: "",
      location: "",
      rating: 0,
      type: "couple",
      size: "large",
    },
    {
      id: 6,
      image: "/uul.jpg", // Ballroom image
      name: "Shangrilla Restaurant",
      location: "Grand Ball Room",
      rating: 4.5,
      type: "ballroom",
      size: "small",
    },
  ];

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

      {/* Venue Grid - Custom layout to match the image */}
      <div className="max-w-7xl mx-auto">
        {/* Top row */}
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          {/* Large image (couple) */}
          <div className="md:w-1/2 h-80 relative">
            <Image
              src={venues[0].image || "/placeholder.svg"}
              alt="Wedding couple at bar"
              fill
              className="object-cover rounded-lg"
            />
          </div>

          {/* Two small images (ballrooms) */}
          <div className="md:w-1/2 flex flex-col md:flex-row gap-4">
            {venues.slice(1, 3).map((venue, index) => (
              <div
                key={index}
                className="flex-1 h-80 md:h-auto relative rounded-lg overflow-hidden"
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
                      favorites[venue.id]
                        ? "fill-white text-white"
                        : "text-white"
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

        {/* Bottom row */}
        <div className="flex flex-col md:flex-row gap-4">
          {/* Small image (ballroom) */}
          <div className="md:w-1/4 h-80 md:h-auto relative rounded-lg overflow-hidden">
            <Image
              src={venues[3].image || "/placeholder.svg"}
              alt={venues[3].name}
              fill
              className="object-cover"
            />

            {/* Favorite button */}
            <button
              onClick={() => toggleFavorite(venues[3].id)}
              className="absolute top-3 right-3 z-10 p-2 rounded-full bg-black/30 backdrop-blur-sm transition-all hover:bg-black/50"
            >
              <Heart
                className={`w-5 h-5 transition-colors ${
                  favorites[venues[3].id]
                    ? "fill-white text-white"
                    : "text-white"
                }`}
              />
            </button>

            {/* Venue info */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
              <div className="flex justify-between items-end">
                <div>
                  <h3 className="text-white font-medium">{venues[3].name}</h3>
                  <p className="text-white/80 text-sm">{venues[3].location}</p>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-amber-400">★</span>
                  <span className="text-white">{venues[3].rating}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Large image (couple) */}
          <div className="md:w-1/2 h-80 relative">
            <Image
              src={venues[4].image || "/placeholder.svg"}
              alt="Wedding couple at bar"
              fill
              className="object-cover rounded-lg"
            />
          </div>

          {/* Small image (ballroom) */}
          <div className="md:w-1/4 h-80 md:h-auto relative rounded-lg overflow-hidden">
            <Image
              src={venues[5].image || "/placeholder.svg"}
              alt={venues[5].name}
              fill
              className="object-cover"
            />

            {/* Favorite button */}
            <button
              onClick={() => toggleFavorite(venues[5].id)}
              className="absolute top-3 right-3 z-10 p-2 rounded-full bg-black/30 backdrop-blur-sm transition-all hover:bg-black/50"
            >
              <Heart
                className={`w-5 h-5 transition-colors ${
                  favorites[venues[5].id]
                    ? "fill-white text-white"
                    : "text-white"
                }`}
              />
            </button>

            {/* Venue info */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
              <div className="flex justify-between items-end">
                <div>
                  <h3 className="text-white font-medium">{venues[5].name}</h3>
                  <p className="text-white/80 text-sm">{venues[5].location}</p>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-amber-400">★</span>
                  <span className="text-white">{venues[5].rating}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
