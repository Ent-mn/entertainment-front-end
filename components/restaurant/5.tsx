"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Heart, Sun, ShoppingCart, Headphones } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useUser } from "@/context/UserContext";
import { ProfileSettingsModal } from "@/components/modals/ProfileSettingsModal";

interface Venue {
  id: number;
  name: string;
  location: string;
  rating: number;
  image: string;
}

export default function VenueGallery() {
  const { user } = useUser();
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [favorites, setFavorites] = useState<Venue[]>([]);

  // Load favorites from localStorage on component mount
  useEffect(() => {
    const savedFavorites = localStorage.getItem("venue-favorites");
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  // Toggle favorite status for a venue
  const toggleFavorite = (venue: Venue) => {
    setFavorites((prev) => {
      const isFavorited = prev.some((fav) => fav.id === venue.id);
      const newFavorites = isFavorited
        ? prev.filter((fav) => fav.id !== venue.id)
        : [...prev, venue];

      // Save to localStorage
      localStorage.setItem("venue-favorites", JSON.stringify(newFavorites));
      return newFavorites;
    });
  };

  // Sample venue data
  const venues: Venue[] = [
    {
      id: 1,
      name: "Shangrilla Restaurant",
      location: "Grand Ball Room",
      rating: 4.5,
      image: "/5cover1.jpg",
    },
    {
      id: 2,
      name: "Shangrilla Restaurant",
      location: "Grand Ball Room",
      rating: 4.5,
      image: "/5cover1.jpg",
    },
    {
      id: 3,
      name: "Shangrilla Restaurant",
      location: "Grand Ball Room",
      rating: 4.5,
      image: "/5cover1.jpg",
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
                onClick={() => toggleFavorite(venue)}
                className="absolute top-3 right-3 z-10 p-2 rounded-full bg-black/30 backdrop-blur-sm transition-colors hover:bg-black/50"
              >
                <Heart
                  className={`w-5 h-5 transition-colors ${
                    favorites.some((fav) => fav.id === venue.id)
                      ? "fill-amber-500 text-amber-500"
                      : "text-white"
                  }`}
                />
              </button>

              {/* Venue Image */}
              <div className="relative h-64 w-full">
                <Image
                  src={venue.image}
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

        {/* Fixed Sidebar */}
        <div className="fixed right-6 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-20 bg-gray-200/20 backdrop-blur-[12px] rounded-[24px] px-2 py-4 shadow-lg border border-white/10">
          <Button
            variant="outline"
            size="icon"
            className="bg-[#333333] border-0 text-amber-500 rounded-full w-10 h-10"
          >
            <Sun className="w-5 h-5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="bg-[#333333] border-0 text-white rounded-full w-10 h-10"
          >
            <ShoppingCart className="w-5 h-5" />
          </Button>
          <div className="relative">
            <Button
              variant="outline"
              size="icon"
              className="bg-[#333333] border-0 text-white rounded-full w-10 h-10"
              onClick={() => setIsProfileModalOpen(true)}
            >
              <Heart className="w-5 h-5" />
            </Button>
            {favorites.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-amber-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {favorites.length}
              </span>
            )}
          </div>
          <Button
            variant="outline"
            size="icon"
            className="bg-[#333333] border-0 text-white rounded-full w-10 h-10"
          >
            <Headphones className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Profile Modal */}
      <ProfileSettingsModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        profile={{
          first_name: user?.first_name || "",
          org_name: user?.org_name || "",
          email: user?.email || "",
          phone: user?.phone || "",
          coverImage: "/5cover1.jpg",
        }}
        initialView="favorites"
      />
    </div>
  );
}
