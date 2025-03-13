"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import HeroSection from "../section/hero-section";
import SongsSection from "../section/songs-section";
import BioSection from "../section/bio-section";
import AlbumsSection from "../section/albums-section";
import GallerySection from "../section/gallery-section";
import EventsSection from "../section/events-section";
import LatestReleaseSection, {
  type LatestRelease,
} from "../section/latest-release-section";
import PreviewPage from "./preview-page";

export interface Song {
  id: string;
  title: string;
  duration: string;
  youtubeUrl?: string;
}

export interface Album {
  id: string;
  title: string;
  year: string;
  coverImage: string;
}

export interface GalleryImage {
  id: string;
  url: string;
  alt: string;
}

export interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  venue: string;
  image?: string;
}

export interface ArtistData {
  name: string;
  heroImage: string;
  bio: string;
  songs: Song[];
  albums: Album[];
  gallery: GalleryImage[];
  events: Event[];
  latestReleases: LatestRelease[];
}

export default function ArtistAdmin() {
  const [artistData, setArtistData] = useState<ArtistData>({
    name: "",
    heroImage: "",
    bio: "",
    songs: [],
    albums: [],
    gallery: [],
    events: [],
    latestReleases: [],
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showValidation, setShowValidation] = useState(false);

  const updateArtistData = (key: keyof ArtistData, value: any) => {
    setArtistData((prev) => ({
      ...prev,
      [key]: value,
    }));

    // Clear error for this field if it exists
    if (errors[key]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[key];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!artistData.name.trim()) {
      newErrors.name = "Artist name is required";
    }

    if (!artistData.heroImage) {
      newErrors.heroImage = "Hero image is required";
    }

    if (artistData.songs.length === 0) {
      newErrors.songs = "At least one song is required";
    } else {
      const invalidSongs = artistData.songs.filter(
        (song) =>
          !song.title.trim() ||
          !song.duration.trim() ||
          !song.youtubeUrl?.trim()
      );
      if (invalidSongs.length > 0) {
        newErrors.songs =
          "All songs must have a title, duration, and YouTube URL";
      }
    }

    if (!artistData.bio.trim()) {
      newErrors.bio = "Bio is required";
    }

    if (artistData.albums.length === 0) {
      newErrors.albums = "At least one album is required";
    } else {
      const invalidAlbums = artistData.albums.filter(
        (album) =>
          !album.title.trim() || !album.year.trim() || !album.coverImage
      );
      if (invalidAlbums.length > 0) {
        newErrors.albums =
          "All albums must have a title, year, and cover image";
      }
    }

    if (artistData.latestReleases.length === 0) {
      newErrors.latestReleases = "At least one latest release is required";
    }

    setErrors(newErrors);
    setShowValidation(true);
    return Object.keys(newErrors).length === 0;
  };

  const handlePublish = () => {
    if (validateForm()) {
      alert("Profile published successfully!");
      // In a real app, you would save to a database here
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <header className="bg-black text-white border-b border-gray-800 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Profile засах хэсэг</h1>
          <div className="flex gap-2">
            <Button
              className="bg-orange-500 hover:bg-orange-600 text-white"
              onClick={handlePublish}
            >
              Хадгалах
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        {showValidation && Object.keys(errors).length > 0 && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Please fix the following errors before publishing:
              <ul className="list-disc pl-5 mt-2">
                {Object.values(errors).map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </AlertDescription>
          </Alert>
        )}

        <Tabs defaultValue="edit" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6 bg-white">
            <TabsTrigger
              value="edit"
              className="data-[state=active]:bg-black data-[state=active]:text-white"
            >
              Засах хэсэг
            </TabsTrigger>
            <TabsTrigger
              value="preview"
              className="data-[state=active]:bg-black data-[state=active]:text-white"
            >
              Preview
            </TabsTrigger>
          </TabsList>

          <TabsContent value="edit">
            <div className="grid grid-cols-1 gap-6">
              <Card className="p-6 border-gray-800 bg-white text-black">
                <HeroSection
                  data={artistData}
                  updateData={(name, heroImage) => {
                    updateArtistData("name", name);
                    updateArtistData("heroImage", heroImage);
                  }}
                  error={errors.name || errors.heroImage}
                />
              </Card>

              <Card className="p-6 border-gray bg-white text-black">
                <SongsSection
                  songs={artistData.songs}
                  updateSongs={(songs) => updateArtistData("songs", songs)}
                  error={errors.songs}
                />
              </Card>

              <Card className="p-6 border-gray-800 bg-white text-black">
                <BioSection
                  bio={artistData.bio}
                  updateBio={(bio) => updateArtistData("bio", bio)}
                  error={errors.bio}
                />
              </Card>

              <Card className="p-6 border-gray-800 bg-white text-black">
                <LatestReleaseSection
                  latestReleases={artistData.latestReleases}
                  updateLatestReleases={(latestReleases) =>
                    updateArtistData("latestReleases", latestReleases)
                  }
                  error={errors.latestReleases}
                />
              </Card>

              <Card className="p-6 border-gray-800 bg-white text-black">
                <AlbumsSection
                  albums={artistData.albums}
                  updateAlbums={(albums) => updateArtistData("albums", albums)}
                  error={errors.albums}
                />
              </Card>

              <Card className="p-6 border-gray-800 bg-white text-black">
                <GallerySection
                  gallery={artistData.gallery}
                  updateGallery={(gallery) =>
                    updateArtistData("gallery", gallery)
                  }
                  error={errors.gallery}
                />
              </Card>

              <Card className="p-6 border-gray-800 bg-white text-black">
                <EventsSection
                  events={artistData.events}
                  updateEvents={(events) => updateArtistData("events", events)}
                  error={errors.events}
                />
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="preview">
            <PreviewPage artistData={artistData} />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
