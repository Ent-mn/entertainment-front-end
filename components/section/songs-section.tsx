"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { Song } from "../artist-admin";
import {
  Trash2,
  Music,
  GripVertical,
  Plus,
  AlertCircle,
  Youtube,
} from "lucide-react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface SongsSectionProps {
  songs: Song[];
  updateSongs: (songs: Song[]) => void;
  error?: string;
}

export default function SongsSection({
  songs,
  updateSongs,
  error,
}: SongsSectionProps) {
  const [newSong, setNewSong] = useState<Omit<Song, "id">>({
    title: "",
    duration: "",
    youtubeUrl: "",
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const validateSongInput = () => {
    const errors: Record<string, string> = {};

    if (!newSong.title.trim()) {
      errors.title = "Дууны гарчиг оруулна уу";
    }

    if (!newSong.duration.trim()) {
      errors.duration = "Duration is required";
    }

    if (!newSong.youtubeUrl?.trim()) {
      errors.youtubeUrl = "YouTube URL is required";
    } else if (!isValidYoutubeUrl(newSong.youtubeUrl)) {
      errors.youtubeUrl = "Invalid YouTube URL";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const isValidYoutubeUrl = (url: string) => {
    const pattern =
      /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})$/;
    return pattern.test(url);
  };

  const extractYoutubeId = (url: string) => {
    if (!url) return null;

    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);

    return match && match[2].length === 11 ? match[2] : null;
  };

  const addSong = () => {
    if (!validateSongInput()) return;

    const song: Song = {
      ...newSong,
      id: Date.now().toString(),
    };

    updateSongs([...songs, song]);
    setNewSong({ title: "", duration: "", youtubeUrl: "" });
    setFormErrors({});
  };

  const removeSong = (id: string) => {
    updateSongs(songs.filter((song) => song.id !== id));
  };

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const items = Array.from(songs);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    updateSongs(items);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold mb-4">Songs</h2>
        <p className="text-gray-400 mb-4">
          Add and manage the artist's songs. Include YouTube links for each
          song.
        </p>
      </div>

      {error && (
        <Alert variant="destructive" className="bg-red-900 border-red-800">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="songTitle">Song Title</Label>
          <Input
            id="songTitle"
            value={newSong.title}
            onChange={(e) => setNewSong({ ...newSong, title: e.target.value })}
            placeholder="Enter song title"
            className={`mt-1 bg-white border-gray-600 ${
              formErrors.title ? "border-red-500" : ""
            }`}
          />
          {formErrors.title && (
            <div className="text-red-500 text-sm mt-1">{formErrors.title}</div>
          )}
        </div>

        <div>
          <Label htmlFor="songDuration">Duration</Label>
          <Input
            id="songDuration"
            value={newSong.duration}
            onChange={(e) =>
              setNewSong({ ...newSong, duration: e.target.value })
            }
            placeholder="e.g. 3:42"
            className={`mt-1 bg-white border-gray-600 ${
              formErrors.duration ? "border-red-500" : ""
            }`}
          />
          {formErrors.duration && (
            <div className="text-red-500 text-sm mt-1">
              {formErrors.duration}
            </div>
          )}
        </div>
      </div>

      <div>
        <Label htmlFor="youtubeUrl">YouTube URL</Label>
        <div className="flex gap-2">
          <Input
            id="youtubeUrl"
            value={newSong.youtubeUrl || ""}
            onChange={(e) =>
              setNewSong({ ...newSong, youtubeUrl: e.target.value })
            }
            placeholder="e.g. https://www.youtube.com/watch?v=dQw4w9WgXcQ"
            className={`mt-1 bg-white border-gray-600 ${
              formErrors.youtubeUrl ? "border-red-500" : ""
            }`}
          />
          <div className="mt-1 w-24 h-16 bg-black rounded-md flex items-center justify-center">
            {newSong.youtubeUrl && isValidYoutubeUrl(newSong.youtubeUrl) ? (
              <img
                src={`https://img.youtube.com/vi/${extractYoutubeId(
                  newSong.youtubeUrl
                )}/default.jpg`}
                alt="YouTube thumbnail"
                className="w-full h-full object-cover rounded-md"
              />
            ) : (
              <Youtube className="text-gray-500" size={24} />
            )}
          </div>
        </div>
        {formErrors.youtubeUrl && (
          <div className="text-red-500 text-sm mt-1">
            {formErrors.youtubeUrl}
          </div>
        )}
      </div>

      <Button
        onClick={addSong}
        className="mt-2 bg-black hover:bg-orange-600 text-white"
      >
        <Plus className="mr-2 h-4 w-4" />
        Нэмэх
      </Button>

      {songs.length > 0 && (
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="songs">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="mt-6 border border-gray-700 rounded-md"
              >
                <div className="divide-y divide-gray-700">
                  {songs.map((song, index) => (
                    <Draggable
                      key={song.id}
                      draggableId={song.id}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          className="flex items-center p-3 bg-white hover:bg-gray-700"
                        >
                          <div
                            {...provided.dragHandleProps}
                            className="cursor-grab px-2"
                          >
                            <GripVertical className="h-4 w-4 text-gray-500" />
                          </div>
                          <div className="w-12 h-12 mr-3">
                            {song.youtubeUrl ? (
                              <img
                                src={`https://img.youtube.com/vi/${extractYoutubeId(
                                  song.youtubeUrl
                                )}/default.jpg`}
                                alt={song.title}
                                className="w-full h-full object-cover rounded"
                              />
                            ) : (
                              <div className="w-full h-full bg-gray-700 rounded flex items-center justify-center">
                                <Music className="h-4 w-4 text-gray-500" />
                              </div>
                            )}
                          </div>
                          <div className="flex-1">
                            <h3 className="font-medium">{song.title}</h3>
                            <div className="text-sm text-gray-400">
                              {song.duration}
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeSong(song.id)}
                            className="hover:bg-red-900 hover:text-white"
                          >
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              </div>
            )}
          </Droppable>
        </DragDropContext>
      )}
    </div>
  );
}
