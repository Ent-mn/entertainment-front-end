"use client";

import type React from "react";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import ImageUploader from "../profile/image-uploader";
import type { ArtistData } from "../artist-admin";

interface HeroSectionProps {
  data: ArtistData;
  updateData: (name: string, heroImage: string) => void;
  error?: string;
}

export default function HeroSection({
  data,
  updateData,
  error,
}: HeroSectionProps) {
  const [name, setName] = useState(data.name);
  const [heroImage, setHeroImage] = useState(data.heroImage);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    setName(newName);
    updateData(newName, heroImage);

    if (!newName.trim()) {
      setFormErrors((prev) => ({ ...prev, name: "Artist name is required" }));
    } else {
      setFormErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors.name;
        return newErrors;
      });
    }
  };

  const handleImageChange = (imageUrl: string) => {
    setHeroImage(imageUrl);
    updateData(name, imageUrl);

    if (!imageUrl) {
      setFormErrors((prev) => ({
        ...prev,
        heroImage: "Hero image is required",
      }));
    } else {
      setFormErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors.heroImage;
        return newErrors;
      });
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold mb-4">Profile Home Section</h2>
      </div>

      {error && (
        <Alert variant="destructive" className="bg-red-900 border-red-800">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="space-y-4">
        <div>
          <Label htmlFor="artistName">Нэр</Label>
          <Input
            id="artistName"
            value={name}
            onChange={handleNameChange}
            placeholder="Enter artist name"
            className={`mt-1 bg-white border-gray-600 ${
              formErrors.name ? "border-red-500" : ""
            }`}
          />
          {formErrors.name && (
            <div className="text-red-500 text-sm mt-1">{formErrors.name}</div>
          )}
        </div>

        <div>
          <Label>Зураг</Label>
          <div className="mt-1">
            <ImageUploader
              onImageSelected={handleImageChange}
              currentImage={heroImage}
              aspectRatio="21:9"
              height={300}
              error={formErrors.heroImage}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
