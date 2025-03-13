"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { GalleryImage } from "../artist-admin";
import { Trash2, Plus, AlertCircle, ImageIcon } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import ImageUploader from "../profile/image-uploader";

interface GallerySectionProps {
  gallery: GalleryImage[];
  updateGallery: (gallery: GalleryImage[]) => void;
  error?: string;
}

export default function GallerySection({
  gallery,
  updateGallery,
  error,
}: GallerySectionProps) {
  const [newImage, setNewImage] = useState<Omit<GalleryImage, "id">>({
    url: "",
    alt: "",
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const validateImageInput = () => {
    const errors: Record<string, string> = {};

    if (!newImage.url) {
      errors.url = "Image is required";
    }

    if (!newImage.alt.trim()) {
      errors.alt = "Image description is required";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const addImage = () => {
    if (!validateImageInput()) return;

    const image: GalleryImage = {
      ...newImage,
      id: Date.now().toString(),
    };

    updateGallery([...gallery, image]);
    setNewImage({ url: "", alt: "" });
    setFormErrors({});
  };

  const removeImage = (id: string) => {
    updateGallery(gallery.filter((image) => image.id !== id));
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold mb-4">Gallery</h2>
        <p className="text-gray-400 mb-4">
          Add photos to the artist's gallery section.
        </p>
      </div>

      {error && (
        <Alert variant="destructive" className="bg-red-900 border-red-800">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <Label>Gallery Image</Label>
            <div className="mt-1">
              <ImageUploader
                onImageSelected={(url) => setNewImage({ ...newImage, url })}
                currentImage={newImage.url}
                aspectRatio="4:3"
                height={200}
                error={formErrors.url}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="imageAlt">Image Description</Label>
            <Input
              id="imageAlt"
              value={newImage.alt}
              onChange={(e) =>
                setNewImage({ ...newImage, alt: e.target.value })
              }
              placeholder="Describe the image"
              className={`mt-1 bg-white border-gray-600 ${
                formErrors.alt ? "border-red-500" : ""
              }`}
            />
            {formErrors.alt && (
              <div className="text-red-500 text-sm mt-1">{formErrors.alt}</div>
            )}
          </div>

          <Button
            onClick={addImage}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white"
          >
            <Plus className="mr-2 h-4 w-4" />
            Нэмэх
          </Button>
        </div>

        <div>
          <Label>Gallery Images</Label>
          {gallery.length > 0 ? (
            <div className="grid grid-cols-2 gap-4 mt-1">
              {gallery.map((image) => (
                <div key={image.id} className="relative group">
                  <img
                    src={image.url || "/placeholder.svg"}
                    alt={image.alt}
                    className="w-full aspect-[4/3] object-cover rounded-md"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-3 rounded-md">
                    <Button
                      variant="destructive"
                      size="icon"
                      className="self-end h-8 w-8 bg-red-600 hover:bg-red-700"
                      onClick={() => removeImage(image.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                    <div className="text-white">
                      <div className="text-sm">{image.alt}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-1 border border-gray-700 rounded-md p-8 flex flex-col items-center justify-center text-gray-500">
              <ImageIcon className="h-12 w-12 mb-2" />
              <div>No images added yet</div>
              <p className="text-sm">Add images to the gallery</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
