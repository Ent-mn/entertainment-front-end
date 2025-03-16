import { Play, Download, Heart, Share2, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Song } from "@/types/music";
import { useState } from "react";

interface SongCardProps {
  song: Song;
  index: number;
  isPlaying: boolean;
  onPlay: () => void;
}

export function SongCard({ song, index, isPlaying, onPlay }: SongCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = () => setIsFavorite((prev) => !prev);

  return (
    <div
      className={`group flex items-center gap-4 rounded-md p-2 transition-colors 
        ${isPlaying ? "bg-zinc-800" : "hover:bg-zinc-800"}`}>
      {/* ✅ Дууны дугаар */}
      <span className="w-6 text-sm text-zinc-400">{index + 1}</span>

      {/* ✅ Play товч */}
      <Button
        variant="ghost"
        size="icon"
        className="h-10 w-10"
        onClick={onPlay}>
        <Play className="h-5 w-5" />
      </Button>

      {/* ✅ Зураг */}
      <img
        src={song.coverUrl || "/placeholder.svg"}
        alt={song.title}
        className="h-10 w-10 rounded-md object-cover"
      />

      {/* ✅ Дууны нэр ба уран бүтээлч */}
      <div className="flex-1 min-w-0">
        <p className="truncate text-sm font-medium text-zinc-100">
          {song.title}
        </p>
        <p className="truncate text-xs text-zinc-400">{song.artist}</p>
      </div>

      {/* ✅ Хэрэгсэлүүд */}
      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <Button variant="ghost" size="icon">
          <Download className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" onClick={toggleFavorite}>
          <Heart
            className={`h-4 w-4 ${
              isFavorite ? "fill-red-500 text-red-500" : ""
            }`}
          />
        </Button>
        <Button variant="ghost" size="icon">
          <Share2 className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </div>

      {/* ✅ Үргэлжлэх хугацаа */}
      <span className="text-sm text-zinc-400">{song.duration}</span>
    </div>
  );
}
