"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { AlertCircle, Plus, Trash2, Music } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import ImageUploader from "../profile/image-uploader";

export interface LatestRelease {
  id: string;
  title: string;
  releaseDate: string;
  description: string;
  coverImage: string;
  streamingLink?: string;
}

interface LatestReleaseSectionProps {
  latestReleases: LatestRelease[];
  updateLatestReleases: (releases: LatestRelease[]) => void;
  error?: string;
}

export default function LatestReleaseSection({
  latestReleases,
  updateLatestReleases,
  error,
}: LatestReleaseSectionProps) {
  const [newRelease, setNewRelease] = useState<Omit<LatestRelease, "id">>({
    title: "",
    releaseDate: "",
    description: "",
    coverImage: "",
    streamingLink: "",
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const validateReleaseInput = () => {
    const errors: Record<string, string> = {};

    if (!newRelease.title.trim()) {
      errors.title = "Release title is required";
    }

    if (!newRelease.releaseDate) {
      errors.releaseDate = "Release date is required";
    }

    if (!newRelease.coverImage) {
      errors.coverImage = "Cover image is required";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const addRelease = () => {
    if (!validateReleaseInput()) return;

    const release: LatestRelease = {
      ...newRelease,
      id: Date.now().toString(),
    };

    updateLatestReleases([...latestReleases, release]);
    setNewRelease({
      title: "",
      releaseDate: "",
      description: "",
      coverImage: "",
      streamingLink: "",
    });
    setFormErrors({});
  };

  const removeRelease = (id: string) => {
    updateLatestReleases(latestReleases.filter((release) => release.id !== id));
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold mb-4">Latest Releases</h2>
        <p className="text-gray-400 mb-4">
          Add your most recent singles, EPs, or albums to highlight on your
          profile.
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
            <Label htmlFor="releaseTitle">Release Title</Label>
            <Input
              id="releaseTitle"
              value={newRelease.title}
              onChange={(e) =>
                setNewRelease({ ...newRelease, title: e.target.value })
              }
              placeholder="Enter release title"
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
            <Label htmlFor="releaseDate">Release Date</Label>
            <Input
              id="releaseDate"
              type="date"
              value={newRelease.releaseDate}
              onChange={(e) =>
                setNewRelease({ ...newRelease, releaseDate: e.target.value })
              }
              className={`mt-1 bg-white border-gray-600 ${
                formErrors.releaseDate ? "border-red-500" : ""
              }`}
            />
            {formErrors.releaseDate && (
              <div className="text-red-500 text-sm mt-1">
                {formErrors.releaseDate}
              </div>
            )}
          </div>

          <div>
            <Label htmlFor="streamingLink">Streaming Link (Optional)</Label>
            <Input
              id="streamingLink"
              value={newRelease.streamingLink || ""}
              onChange={(e) =>
                setNewRelease({ ...newRelease, streamingLink: e.target.value })
              }
              placeholder="e.g. https://open.spotify.com/album/..."
              className="mt-1 bg-white border-gray-600"
            />
            <p className="text-sm text-gray-500 mt-1">
              Link to Spotify, Apple Music, or other streaming platforms
            </p>
          </div>

          <div>
            <Label htmlFor="releaseDescription">Description (Optional)</Label>
            <Textarea
              id="releaseDescription"
              value={newRelease.description}
              onChange={(e) =>
                setNewRelease({ ...newRelease, description: e.target.value })
              }
              placeholder="Brief description of this release..."
              className="mt-1 bg-white border-gray-600 min-h-[100px]"
            />
          </div>

          <div>
            <Label>Cover Image</Label>
            <div className="mt-1">
              <ImageUploader
                onImageSelected={(url) =>
                  setNewRelease({ ...newRelease, coverImage: url })
                }
                currentImage={newRelease.coverImage}
                aspectRatio="1:1"
                height={200}
                error={formErrors.coverImage}
              />
            </div>
          </div>

          <Button
            onClick={addRelease}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white"
          >
            <Plus className="mr-2 h-4 w-4" />
            Нэмэх
          </Button>
        </div>

        <div>
          <Label>Latest Releases</Label>
          {latestReleases.length > 0 ? (
            <div className="grid grid-cols-2 gap-4 mt-1">
              {latestReleases.map((release) => (
                <div key={release.id} className="relative group">
                  <img
                    src={release.coverImage || "/placeholder.svg"}
                    alt={release.title}
                    className="w-full aspect-square object-cover rounded-md"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-3 rounded-md">
                    <Button
                      variant="destructive"
                      size="icon"
                      className="self-end h-8 w-8 bg-red-600 hover:bg-red-700"
                      onClick={() => removeRelease(release.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                    <div className="text-white">
                      <h3 className="font-medium">{release.title}</h3>
                      <div className="text-sm">
                        {new Date(release.releaseDate).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-1 border border-gray-700 rounded-md p-8 flex flex-col items-center justify-center text-gray-500">
              <Music className="h-12 w-12 mb-2" />
              <div>No releases added yet</div>
              <p className="text-sm">Add your latest music releases</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
