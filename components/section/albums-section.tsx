"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { Album } from "../artist-admin";
import { Trash2, Plus, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import ImageUploader from "../profile/image-uploader";

interface AlbumsSectionProps {
  albums: Album[];
  updateAlbums: (albums: Album[]) => void;
  error?: string;
}

export default function AlbumsSection({
  albums,
  updateAlbums,
  error,
}: AlbumsSectionProps) {
  const [newAlbum, setNewAlbum] = useState<Omit<Album, "id">>({
    title: "",
    year: "",
    coverImage: "",
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const validateAlbumInput = () => {
    const errors: Record<string, string> = {};

    if (!newAlbum.title.trim()) {
      errors.title = "Album title is required";
    }

    if (!newAlbum.year.trim()) {
      errors.year = "Release year is required";
    }

    if (!newAlbum.coverImage) {
      errors.coverImage = "Album cover is required";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const addAlbum = () => {
    if (!validateAlbumInput()) return;

    const album: Album = {
      ...newAlbum,
      id: Date.now().toString(),
    };

    updateAlbums([...albums, album]);
    setNewAlbum({ title: "", year: "", coverImage: "" });
    setFormErrors({});
  };

  const removeAlbum = (id: string) => {
    updateAlbums(albums.filter((album) => album.id !== id));
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold mb-4">Albums</h2>
        <div className="text-gray-400 mb-4">
          Add the artist's albums with cover images.
        </div>
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
            <Label htmlFor="albumTitle">Album Title</Label>
            <Input
              id="albumTitle"
              value={newAlbum.title}
              onChange={(e) =>
                setNewAlbum({ ...newAlbum, title: e.target.value })
              }
              placeholder="Enter album title"
              className={`mt-1 bg-white border-gray-600 ${
                formErrors.title ? "border-red-500" : ""
              }`}
            />
            {formErrors.title && (
              <div className="text-red-500 text-sm mt-1">
                {formErrors.title}
              </div>
            )}
          </div>

          <div>
            <Label htmlFor="albumYear">Release Year</Label>
            <Input
              id="albumYear"
              value={newAlbum.year}
              onChange={(e) =>
                setNewAlbum({ ...newAlbum, year: e.target.value })
              }
              placeholder="e.g. 2023"
              className={`mt-1 bg-white border-gray-600 ${
                formErrors.year ? "border-red-500" : ""
              }`}
            />
            {formErrors.year && (
              <div className="text-red-500 text-sm mt-1">{formErrors.year}</div>
            )}
          </div>

          <div>
            <Label>Album Cover</Label>
            <div className="mt-1">
              <ImageUploader
                onImageSelected={(url) =>
                  setNewAlbum({ ...newAlbum, coverImage: url })
                }
                currentImage={newAlbum.coverImage}
                aspectRatio="1:1"
                height={200}
                error={formErrors.coverImage}
              />
            </div>
          </div>

          <Button
            onClick={addAlbum}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white"
          >
            <Plus className="mr-2 h-4 w-4" />
            Нэмэх
          </Button>
        </div>

        <div>
          <Label>Added Albums</Label>
          <div className="grid grid-cols-2 gap-4 mt-1">
            {albums.map((album) => (
              <div key={album.id} className="relative group">
                <img
                  src={album.coverImage || "/placeholder.svg"}
                  alt={album.title}
                  className="w-full aspect-square object-cover rounded-md"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-3 rounded-md">
                  <Button
                    variant="destructive"
                    size="icon"
                    className="self-end h-8 w-8 bg-red-600 hover:bg-red-700"
                    onClick={() => removeAlbum(album.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                  <div className="text-white">
                    <h3 className="font-medium">{album.title}</h3>
                    <div className="text-sm">{album.year}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
