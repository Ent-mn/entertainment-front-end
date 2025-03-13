// "use client";

// import { useState } from "react";
// import { Play, Download, Heart, Share2, MoreHorizontal } from "lucide-react";
// import { Button } from "@/components/ui/button";
// // import { formatDuration } from "@/lib/utils";
// import { Song } from "@/types/music";

// interface TopSongsProps {
//   songs: Song[];
//   onPlay: (song: Song) => void;
// }

// export function TopSongs({ songs, onPlay }: TopSongsProps) {
//   const [favorites, setFavorites] = useState<Set<string>>(new Set());

//   const toggleFavorite = (songId: string) => {
//     setFavorites((prev) => {
//       const newFavorites = new Set(prev);
//       if (newFavorites.has(songId)) {
//         newFavorites.delete(songId);
//       } else {
//         newFavorites.add(songId);
//       }
//       return newFavorites;
//     });
//   };

//   return (
//     <div className="space-y-4">
//       <div className="flex items-center justify-between">
//         <h2 className="text-2xl font-bold">Top songs</h2>
//         <Button
//           variant="ghost"
//           className="text-sm text-zinc-400 cursor-pointer">
//           Show more
//         </Button>
//       </div>

//       <div className="space-y-1 ">
//         {songs.map((song, index) => (
//           <div
//             key={song.id}
//             className="group flex items-center gap-4 rounded-md p-2 hover:bg-[#484848] cursor-pointer transition-colors">
//             <span className="w-6 text-sm text-zinc-400">{index + 1}</span>

//             <Button
//               variant="ghost"
//               size="icon"
//               className="h-10 w-10"
//               onClick={() => onPlay(song)}>
//               <Play className="h-5 w-5" />
//             </Button>

//             <img
//               src={song.coverUrl || "/placeholder.svg"}
//               alt={song.title}
//               className="h-10 w-10 rounded-md object-cover"
//             />

//             <div className="flex-1 min-w-0">
//               <p className="truncate text-sm font-medium">{song.title}</p>
//               <p className="truncate text-xs text-zinc-400">{song.artist}</p>
//             </div>

//             <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
//               <Button variant="ghost" size="icon" className="h-8 w-8">
//                 <Download className="h-4 w-4" />
//               </Button>
//               <Button
//                 variant="ghost"
//                 size="icon"
//                 className="h-8 w-8"
//                 onClick={() => toggleFavorite(song.id)}>
//                 <Heart
//                   className={`h-4 w-4 ${
//                     favorites.has(song.id) ? "fill-red-500 text-red-500" : ""
//                   }`}
//                 />
//               </Button>
//               <Button variant="ghost" size="icon" className="h-8 w-8">
//                 <Share2 className="h-4 w-4" />
//               </Button>
//               <Button variant="ghost" size="icon" className="h-8 w-8">
//                 <MoreHorizontal className="h-4 w-4" />
//               </Button>
//             </div>

//             <span className="text-sm text-zinc-400">{song.duration}</span>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import { Play, Download, Heart, Share2, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Song } from "@/types/music";

interface TopSongsProps {
  songs: Song[];
  onPlay: (song: Song) => void;
}

export function TopSongs({ songs, onPlay }: TopSongsProps) {
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [showAll, setShowAll] = useState(false);

  const toggleFavorite = (songId: string) => {
    setFavorites((prev) => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(songId)) {
        newFavorites.delete(songId);
      } else {
        newFavorites.add(songId);
      }
      return newFavorites;
    });
  };

  const toggleShowAll = () => {
    setShowAll((prev) => !prev);
  };

  const visibleSongs = showAll ? songs : songs.slice(0, 5);

  return (
    <div className="space-y-4">
      {/* ✅ Гарчиг болон Show more товч */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Top songs</h2>
        <Button
          variant="ghost"
          className="text-sm text-zinc-400 cursor-pointer hover:bg-red hover:text-white"
          onClick={toggleShowAll}>
          {showAll ? "Show less" : "Show more"}
        </Button>
      </div>

      {/* ✅ Дууны жагсаалт */}
      <div className="space-y-1">
        {visibleSongs.map((song, index) => (
          <div
            key={song.id}
            className="group flex items-center gap-4 rounded-md p-2 hover:bg-zinc-800 cursor-pointer transition-colors">
            {/* ✅ Дууны дугаар */}
            <span className="w-6 text-sm text-zinc-400">{index + 1}</span>

            {/* ✅ Play товч */}
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10 cursor-pointer"
              onClick={() => onPlay(song)}>
              <Play className="h-5 w-5 cursor-pointer" />
            </Button>

            {/* ✅ Зураг */}
            <img
              src={song.coverUrl || "/placeholder.svg"}
              alt={song.title}
              className="h-10 w-10 rounded-md object-cover cursor-pointer"
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
              {/* ✅ Татах товч */}
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 cursor-pointer">
                <Download className="h-4 w-4" />
              </Button>

              {/* ✅ Дуртай дууг тэмдэглэх товч */}
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 cursor-pointer"
                onClick={() => toggleFavorite(song.id)}>
                <Heart
                  className={`h-4 w-4 ${
                    favorites.has(song.id) ? "fill-red-500 text-red-500" : ""
                  }`}
                />
              </Button>

              {/* ✅ Хуваалцах товч */}
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 cursor-pointer">
                <Share2 className="h-4 w-4" />
              </Button>

              {/* ✅ Бусад хэрэгсэл товч */}
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 cursor-pointer">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>

            {/* ✅ Үргэлжлэх хугацаа */}
            <span className="text-sm text-zinc-400">{song.duration}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
