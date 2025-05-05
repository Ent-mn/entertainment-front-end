"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Heart, X } from "lucide-react";

interface FavoritesTabProps {
  onClose: () => void;
}

interface FavoriteItem {
  id: number;
  name: string;
  location: string;
  rating: number;
  image: string;
}

export function FavoritesTab({ onClose }: FavoritesTabProps) {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);

  useEffect(() => {
    // Load favorites from localStorage
    const savedFavorites = localStorage.getItem("venue-favorites");
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  const removeFavorite = (id: number) => {
    setFavorites((prev) => {
      const newFavorites = prev.filter((fav) => fav.id !== id);
      localStorage.setItem("venue-favorites", JSON.stringify(newFavorites));
      return newFavorites;
    });
  };

  return (
    <div className="w-full h-full p-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-white">Таалагдсан</h2>
      </div>

      {favorites.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-[60vh] text-gray-400">
          <Heart className="w-16 h-16 mb-4" />
          <p className="text-xl">Таалагдсан зүйлс байхгүй байна</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map((item) => (
            <div
              key={item.id}
              className="relative rounded-lg overflow-hidden bg-[#1A1A1A]"
            >
              <div className="relative h-48 w-full">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      {item.name}
                    </h3>
                    <p className="text-sm text-gray-400">{item.location}</p>
                  </div>
                  <button
                    onClick={() => removeFavorite(item.id)}
                    className="p-2 rounded-full hover:bg-gray-800 transition-colors"
                  >
                    <Heart className="w-5 h-5 fill-amber-500 text-amber-500" />
                  </button>
                </div>
                <div className="flex items-center gap-1 mt-2">
                  <span className="text-amber-500">★</span>
                  <span className="text-white">{item.rating}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
