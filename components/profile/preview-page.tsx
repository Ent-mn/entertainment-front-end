"use client";

import type React from "react";

import { useState, useEffect } from "react";
import type { ArtistData } from "./artist-admin";
import {
  Play,
  Heart,
  MoreHorizontal,
  Search,
  Calendar,
  Clock,
  MapPin,
  Check,
  Maximize2,
  GripVertical,
} from "lucide-react";
import YouTubeModal from "./youtube-modal";
import { Input } from "@/components/ui/input";
import { DownloadDialog } from "../ui/download-dialog";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

interface PreviewPageProps {
  artistData: ArtistData;
}

interface SectionDimensions {
  width: number;
  height?: number;
  order?: number;
}

export default function PreviewPage({ artistData }: PreviewPageProps) {
  const [activeVideo, setActiveVideo] = useState<{
    id: string | null;
    title: string;
  } | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Track which sections are being edited
  const [editingSections, setEditingSections] = useState<
    Record<string, boolean>
  >({});

  // Store dimensions for each section
  const [sectionDimensions, setSectionDimensions] = useState<
    Record<string, SectionDimensions>
  >({
    topSongs: { width: 800 },
    bio: { width: 350 },
    latestReleases: { width: 350 },
    albums: { width: 300 },
    gallery: { width: 300 },
    events: { width: 400 },
  });

  // Toggle edit mode for a section
  const toggleEditSection = (sectionId: string) => {
    setEditingSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

  // Update dimensions for a section
  const updateDimensions = (
    sectionId: string,
    dimensions: Partial<SectionDimensions>
  ) => {
    setSectionDimensions((prev) => ({
      ...prev,
      [sectionId]: {
        ...prev[sectionId],
        ...dimensions,
      },
    }));
  };

  const extractYoutubeId = (url: string) => {
    if (!url) return null;
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  const handlePlayClick = (song: { title: string; youtubeUrl?: string }) => {
    if (song.youtubeUrl) {
      const videoId = extractYoutubeId(song.youtubeUrl);
      setActiveVideo({ id: videoId, title: song.title });
    }
  };

  const handleDownload = (songTitle: string) => {
    // In a real app, this would trigger an actual download
    console.log(`Downloading ${songTitle}...`);

    // Create a fake download to demonstrate functionality
    const link = document.createElement("a");
    link.href = `data:video/mp4;base64,AAAAIGZ0eXBpc29tAAACAGlzb21pc28yYXZjMW1wNDEAAAAIZnJlZQAAA`;
    link.download = `${songTitle.replace(/\s+/g, "_")}.mp4`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredSongs = artistData.songs.filter((song) =>
    song.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Component for section edit controls
  const SectionEditControls = ({ sectionId }: { sectionId: string }) => {
    const isEditing = editingSections[sectionId] || false;
    const dimensions = sectionDimensions[sectionId] || { width: 300 };

    return (
      <div className="flex items-center gap-2">
        {isEditing ? (
          <>
            <div className="flex items-center gap-2 bg-gray-800 p-2 rounded-md">
              <span className="text-xs text-gray-400">Width:</span>
              <div className="w-32">
                <Slider
                  value={[dimensions.width]}
                  min={200}
                  max={1500}
                  step={10}
                  onValueChange={(value) =>
                    updateDimensions(sectionId, { width: value[0] })
                  }
                />
              </div>
              <span className="text-xs text-gray-400">
                {dimensions.width}px
              </span>

              {dimensions.height !== undefined && (
                <>
                  <span className="text-xs text-gray-400 ml-2">Height:</span>
                  <div className="w-32">
                    <Slider
                      value={[dimensions.height]}
                      min={100}
                      max={600}
                      step={10}
                      onValueChange={(value) =>
                        updateDimensions(sectionId, { height: value[0] })
                      }
                    />
                  </div>
                  <span className="text-xs text-gray-400">
                    {dimensions.height}px
                  </span>
                </>
              )}
            </div>
            <Button
              size="icon"
              variant="ghost"
              onClick={() => toggleEditSection(sectionId)}
              className="h-8 w-8 text-green-500 hover:text-green-400 z-10 hover:bg-gray-800"
            >
              <Check size={16} />
            </Button>
          </>
        ) : (
          <Button
            size="icon"
            variant="ghost"
            onClick={() => toggleEditSection(sectionId)}
            className="h-8 w-8 text-gray-400 hover:text-white hover:bg-gray-800"
          >
            <Maximize2 size={16} />
          </Button>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#1C1C1C] text-white">
      {/* YouTube Modal */}
      <YouTubeModal
        videoId={activeVideo?.id || null}
        isOpen={!!activeVideo}
        onClose={() => setActiveVideo(null)}
        title={activeVideo?.title || ""}
      />

      {/* Hero Section */}
      <div className="relative">
        {artistData.heroImage ? (
          <div className="h-[400px] relative">
            <img
              src={artistData.heroImage || "/placeholder.svg"}
              alt={artistData.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
          </div>
        ) : (
          <div className="h-[400px] bg-gradient-to-r from-gray-800 to-gray-900"></div>
        )}

        <div className="absolute bottom-0 left-0 w-full p-8">
          <h1 className="text-5xl font-bold">
            {artistData.name || "Artist Name"}
          </h1>
        </div>
      </div>

      {/* Navigation */}
      <nav className="border-b border-gray-800 bg-[#1C1C1C] sticky top-0 z-10">
        <div className="container mx-auto px-4">
          <div className="flex space-x-6 py-4 text-sm overflow-x-auto">
            <NavLink href="#" active>
              Home
            </NavLink>
            <NavLink href="#">News feed</NavLink>
            <NavLink href="#">Events & Concerts</NavLink>
            <NavLink href="#">Songs</NavLink>
            <NavLink href="#">Album</NavLink>
            <NavLink href="#">Gallery</NavLink>
            <NavLink href="#">Bio</NavLink>
            <NavLink href="#">Products & Services</NavLink>
            <NavLink href="#">Comments</NavLink>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Top Songs Section */}
        <div className="mb-12">
          <div className="flex flex-wrap gap-8">
            <div
              className={`flex-1 min-w-[${
                sectionDimensions.topSongs.width < 400
                  ? sectionDimensions.topSongs.width
                  : 400
              }px]`}
              style={{
                flexBasis: `${sectionDimensions.topSongs.width}px`,
                maxWidth: `${sectionDimensions.topSongs.width}px`,
                order: sectionDimensions.topSongs.width > 500 ? "0" : "0",
              }}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Top songs</h2>
                <div className="flex items-center gap-4">
                  <div className="relative w-64">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                    <Input
                      type="text"
                      placeholder="Search"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-8 bg-gray-800 border-gray-700 focus:ring-orange-500"
                    />
                  </div>
                  <SectionEditControls sectionId="topSongs" />
                </div>
              </div>

              <div
                className="space-y-2 mx-auto md:mx-0 transition-all duration-300"
                style={{ maxWidth: `${sectionDimensions.topSongs.width}px` }}
              >
                {filteredSongs.map((song, index) => (
                  <div
                    key={song.id}
                    className="flex items-center space-x-4 p-2 hover:bg-gray-800 rounded-md group cursor-pointer"
                    onClick={() => handlePlayClick(song)}
                  >
                    <span className="w-6 text-gray-500">{index + 1}</span>
                    <button className="text-gray-400 group-hover:text-orange-500">
                      <Play size={20} />
                    </button>
                    {song.youtubeUrl ? (
                      <img
                        src={`https://img.youtube.com/vi/${extractYoutubeId(
                          song.youtubeUrl
                        )}/default.jpg`}
                        alt={song.title}
                        className="w-12 h-12 object-cover rounded"
                      />
                    ) : (
                      <div className="w-12 h-12 bg-gray-800 rounded" />
                    )}
                    <div className="flex-1">
                      <h3 className="font-medium">{song.title}</h3>
                    </div>
                    <span className="text-gray-500">{song.duration}</span>
                    <div className="flex items-center space-x-2 text-gray-500">
                      <DownloadDialog
                        songTitle={song.title}
                        onConfirm={() => handleDownload(song.title)}
                      />
                      <button className="hover:text-orange-500">
                        <Heart size={18} />
                      </button>
                      <button className="hover:text-orange-500">
                        <MoreHorizontal size={18} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {filteredSongs.length > 10 && (
                <div className="mt-4 text-center">
                  <button className="text-gray-400 hover:text-orange-500 text-sm">
                    show more
                  </button>
                </div>
              )}
            </div>

            {/* Bio Section */}
            <div
              className="flex-1 min-w-[300px]"
              style={{
                flexBasis: `${sectionDimensions.bio.width}px`,
                maxWidth: `${sectionDimensions.bio.width}px`,
                order: sectionDimensions.bio.width > 500 ? "0" : "1",
              }}
            >
              <div className="mb-8 mx-auto transition-all duration-300">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold">Bio</h2>
                  <SectionEditControls sectionId="bio" />
                </div>
                <div
                  className="text-gray-400 space-y-4 p-4 rounded-lg hover:bg-gray-800/50 cursor-pointer"
                  style={{ maxWidth: `${sectionDimensions.bio.width}px` }}
                >
                  <div dangerouslySetInnerHTML={{ __html: artistData.bio }} />
                </div>
                <button className="text-gray-400 hover:text-orange-500 text-sm mt-4">
                  show more
                </button>
              </div>

              <div className="mx-auto transition-all duration-300">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold">Latest Releases</h2>
                  <SectionEditControls sectionId="latestReleases" />
                </div>
                <div
                  className="grid grid-cols-2 gap-4"
                  style={{
                    maxWidth: `${sectionDimensions.latestReleases.width}px`,
                  }}
                >
                  {artistData.latestReleases.slice(0, 2).map((release) => (
                    <div key={release.id} className="group cursor-pointer">
                      <div className="relative overflow-hidden rounded-lg">
                        <img
                          src={release.coverImage || "/placeholder.svg"}
                          alt={release.title}
                          className="w-full aspect-square object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0  bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <button className="bg-orange-500 text-white rounded-full p-3">
                            <Play size={20} />
                          </button>
                        </div>
                      </div>
                      <h3 className="mt-2 font-medium">{release.title}</h3>
                      <div className="text-sm text-gray-500">
                        {new Date(release.releaseDate).toLocaleDateString()}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Albums Section */}
        {artistData.albums.length > 0 && (
          <section className="mb-12">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Albums</h2>
              <div className="flex items-center gap-2">
                <button className="text-sm text-orange-500 hover:text-orange-400">
                  Show all
                </button>
                <SectionEditControls sectionId="albums" />
              </div>
            </div>
            <div
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mx-auto transition-all duration-300"
              style={{
                maxWidth: `${Math.min(
                  1200,
                  sectionDimensions.albums.width * 5
                )}px`,
              }}
            >
              {artistData.albums.map((album) => (
                <div
                  key={album.id}
                  className="group cursor-pointer w-full"
                  style={{ maxWidth: `${sectionDimensions.albums.width}px` }}
                >
                  <div className="relative overflow-hidden rounded-lg">
                    <img
                      src={album.coverImage || "/placeholder.svg"}
                      alt={album.title}
                      className="w-full aspect-square object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <button className="bg-orange-500 text-white rounded-full p-3">
                        <Play size={20} />
                      </button>
                    </div>
                  </div>
                  <h3 className="mt-2 font-medium">{album.title}</h3>
                  <div className="text-sm text-gray-500">{album.year}</div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Gallery Section */}
        {artistData.gallery.length > 0 && (
          <section className="mb-12">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Gallery</h2>
              <div className="flex items-center gap-2">
                <button className="text-sm text-orange-500 hover:text-orange-400">
                  Show all
                </button>
                <SectionEditControls sectionId="gallery" />
              </div>
            </div>
            <div
              className="grid grid-cols-2 md:grid-cols-4 gap-6 mx-auto transition-all duration-300"
              style={{
                maxWidth: `${Math.min(
                  1200,
                  sectionDimensions.gallery.width * 4
                )}px`,
              }}
            >
              {artistData.gallery.map((image) => (
                <div
                  key={image.id}
                  className="overflow-hidden rounded-lg cursor-pointer w-full"
                  style={{ maxWidth: `${sectionDimensions.gallery.width}px` }}
                >
                  <img
                    src={image.url || "/placeholder.svg"}
                    alt={image.alt}
                    className="w-full aspect-[4/3] object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Events Section */}
        {artistData.events.length > 0 && (
          <section className="mb-12">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Upcoming Events</h2>
              <div className="flex items-center gap-2">
                <button className="text-sm text-orange-500 hover:text-orange-400">
                  Show all
                </button>
                <SectionEditControls sectionId="events" />
              </div>
            </div>
            <div
              className="grid grid-cols-1 md:grid-cols-2 gap-6 mx-auto transition-all duration-300"
              style={{
                maxWidth: `${Math.min(
                  900,
                  sectionDimensions.events.width * 2
                )}px`,
              }}
            >
              {artistData.events.map((event) => (
                <div
                  key={event.id}
                  className="bg-gray-800 rounded-lg overflow-hidden flex cursor-pointer w-full"
                  style={{ maxWidth: `${sectionDimensions.events.width}px` }}
                >
                  {event.image ? (
                    <div className="w-1/3">
                      <img
                        src={event.image || "/placeholder.svg"}
                        alt={event.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-1/3 bg-gray-700"></div>
                  )}
                  <div className="w-2/3 p-4">
                    <h3 className="font-bold text-lg">{event.title}</h3>
                    <div className="mt-2 space-y-1 text-sm">
                      <div className="flex items-center text-gray-300">
                        <Calendar className="h-4 w-4 mr-2" />
                        {new Date(event.date).toLocaleDateString()}
                      </div>
                      <div className="flex items-center text-gray-300">
                        <Clock className="h-4 w-4 mr-2" />
                        {event.time}
                      </div>
                      <div className="flex items-center text-gray-300">
                        <MapPin className="h-4 w-4 mr-2" />
                        {event.venue}
                      </div>
                    </div>
                    <button className="mt-4 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md text-sm">
                      Get Tickets
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

function NavLink({
  href,
  children,
  active = false,
}: {
  href: string;
  children: React.ReactNode;
  active?: boolean;
}) {
  return (
    <a
      href={href}
      className={`${
        active ? "text-orange-500" : "text-gray-400 hover:text-white"
      }`}
    >
      {children}
    </a>
  );
}

function SocialIcon({ children }: { children: React.ReactNode }) {
  return (
    <a
      href="#"
      className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-orange-500 hover:text-white transition-colors"
    >
      {children}
    </a>
  );
}
