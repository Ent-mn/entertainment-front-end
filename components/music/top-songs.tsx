// "use client";

// import { useState } from "react";
// import { Play, Download, Heart, Share2, MoreHorizontal, X } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Song } from "@/types/music";

// interface TopSongsProps {
//   songs: Song[];
// }

// export function TopSongs({ songs }: TopSongsProps) {
//   const [favorites, setFavorites] = useState<Set<string>>(new Set());
//   const [showAll, setShowAll] = useState(false);
//   const [currentSong, setCurrentSong] = useState<Song | null>(null);

//   // ✅ Дуртай дууг тэмдэглэх
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

//   // ✅ Show more / Show less функцийг зохицуулах
//   const toggleShowAll = () => setShowAll((prev) => !prev);

//   // ✅ Сонгосон дууг тоглуулах
//   const handlePlay = (song: Song) => setCurrentSong(song);

//   // ✅ Одоогийн тоглогдож буй дууг хаах
//   const closePlayer = () => setCurrentSong(null);

//   const visibleSongs = showAll ? songs : songs.slice(0, 5);

//   const getYoutubeEmbedUrl = (url: string) => {
//     const videoIdMatch = url.match(/(?:v=|\/)([0-9A-Za-z_-]{11})/);
//     return videoIdMatch
//       ? `https://www.youtube.com/embed/${videoIdMatch[1]}?autoplay=1`
//       : null;
//   };

//   return (
//     <div className="space-y-4">
//       {/* ✅ Гарчиг болон Show more товч */}
//       <div className="flex items-center justify-between">
//         <h2 className="text-2xl font-bold">Top Songs</h2>
//         <Button
//           variant="ghost"
//           className="text-sm text-zinc-400 cursor-pointer hover:bg-red hover:text-white"
//           onClick={toggleShowAll}>
//           {showAll ? "Show less" : "Show more"}
//         </Button>
//       </div>

//       {/* ✅ Дууны жагсаалт */}
//       <div className="space-y-2">
//         {visibleSongs.map((song, index) => (
//           <div
//             key={song.id}
//             className="group flex items-center gap-4 rounded-md p-2 hover:bg-zinc-800 cursor-pointer transition-colors">
//             {/* ✅ Дууны дугаар */}
//             <span className="w-6 text-sm text-zinc-400">{index + 1}</span>

//             {/* ✅ Play товч */}
//             <Button
//               variant="ghost"
//               size="icon"
//               className="h-10 w-10"
//               onClick={() => handlePlay(song)}>
//               <Play className="h-5 w-5" />
//             </Button>

//             {/* ✅ Зураг */}
//             <img
//               src={song.coverUrl || "/placeholder.svg"}
//               alt={song.title}
//               className="h-10 w-10 rounded-md object-cover"
//             />

//             {/* ✅ Дууны нэр ба уран бүтээлч */}
//             <div className="flex-1 min-w-0">
//               <p className="truncate text-sm font-medium text-zinc-100">
//                 {song.title}
//               </p>
//               <p className="truncate text-xs text-zinc-400">{song.artist}</p>
//             </div>

//             {/* ✅ Хэрэгсэлүүд */}
//             <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
//               {/* ✅ Татах товч */}
//               <Button variant="ghost" size="icon" className="h-8 w-8">
//                 <Download className="h-4 w-4" />
//               </Button>

//               {/* ✅ Дуртай дууг тэмдэглэх товч */}
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

//               {/* ✅ Хуваалцах товч */}
//               <Button variant="ghost" size="icon" className="h-8 w-8">
//                 <Share2 className="h-4 w-4" />
//               </Button>

//               {/* ✅ Бусад хэрэгсэл товч */}
//               <Button variant="ghost" size="icon" className="h-8 w-8">
//                 <MoreHorizontal className="h-4 w-4" />
//               </Button>
//             </div>

//             {/* ✅ Үргэлжлэх хугацаа */}
//             <span className="text-sm text-zinc-400">{song.duration}</span>
//           </div>
//         ))}
//       </div>

//       {/* ✅ Тоглогдож буй дуу */}
//       {currentSong && (
//         <div className="mt-4 border rounded-lg overflow-hidden bg-zinc-900">
//           <div className="flex justify-between items-center p-4">
//             <div>
//               <p className="text-lg font-bold text-white">
//                 {currentSong.title}
//               </p>
//               <p className="text-sm text-zinc-400">{currentSong.artist}</p>
//             </div>
//             <Button variant="ghost" size="icon" onClick={closePlayer}>
//               <X className="h-5 w-5" />
//             </Button>
//           </div>
//           <div className="relative w-full aspect-video">
//             <iframe
//               className="w-full h-full"
//               src={
//                 getYoutubeEmbedUrl(
//                   "https://www.youtube.com/watch?v=B1KbM-WrMK4"
//                 ) || ""
//               }
//               title="Video title"
//               allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//               allowFullScreen
//             />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// // "use client";

// // import { useState } from "react";
// // import {
// //   Play,
// //   Download,
// //   Heart,
// //   Share2,
// //   MoreHorizontal,
// //   X,
// //   Music,
// //   Video,
// // } from "lucide-react";
// // import { Button } from "@/components/ui/button";
// // import { Song } from "@/types/music";

// // interface TopSongsProps {
// //   songs: Song[];
// // }

// // export function TopSongs({ songs }: TopSongsProps) {
// //   const [favorites, setFavorites] = useState<Set<string>>(new Set());
// //   const [showAll, setShowAll] = useState(false);
// //   const [currentSong, setCurrentSong] = useState<Song | null>(null);
// //   const [playMode, setPlayMode] = useState<"video" | "audio">("video");

// //   const toggleFavorite = (songId: string) => {
// //     setFavorites((prev) => {
// //       const newFavorites = new Set(prev);
// //       if (newFavorites.has(songId)) {
// //         newFavorites.delete(songId);
// //       } else {
// //         newFavorites.add(songId);
// //       }
// //       return newFavorites;
// //     });
// //   };

// //   const toggleShowAll = () => setShowAll((prev) => !prev);

// //   const handlePlay = (song: Song) => setCurrentSong(song);

// //   const closePlayer = () => setCurrentSong(null);

// //   const visibleSongs = showAll ? songs : songs.slice(0, 5);

// //   const getYoutubeEmbedUrl = (url?: string) => {
// //     if (!url) return null; // Утга байхгүй үед шууд буцаана
// //     const videoIdMatch = url.match(/(?:v=|\/)([0-9A-Za-z_-]{11})/);
// //     return videoIdMatch
// //       ? `https://www.youtube.com/embed/${videoIdMatch[1]}?autoplay=1`
// //       : null;
// //   };

// //   const getYoutubeAudioUrl = (url?: string) => {
// //     if (!url) return null; // Утга байхгүй үед шууд буцаана
// //     const videoIdMatch = url.match(/(?:v=|\/)([0-9A-Za-z_-]{11})/);
// //     return videoIdMatch
// //       ? `https://www.youtube.com/watch?v=${videoIdMatch[1]}`
// //       : null;
// //   };

// //   return (
// //     <div className="space-y-4">
// //       {/* ✅ Гарчиг болон Show more товч */}
// //       <div className="flex items-center justify-between">
// //         <h2 className="text-2xl font-bold">Top Songs</h2>
// //         <Button
// //           variant="ghost"
// //           className="text-sm text-zinc-400 cursor-pointer hover:bg-red hover:text-white"
// //           onClick={toggleShowAll}>
// //           {showAll ? "Show less" : "Show more"}
// //         </Button>
// //       </div>

// //       {/* ✅ Дууны жагсаалт */}
// //       <div className="space-y-2">
// //         {visibleSongs.map((song, index) => (
// //           <div
// //             key={song.id}
// //             className="group flex items-center gap-4 rounded-md p-2 hover:bg-zinc-800 cursor-pointer transition-colors">
// //             {/* ✅ Дууны дугаар */}
// //             <span className="w-6 text-sm text-zinc-400">{index + 1}</span>

// //             {/* ✅ Play товч */}
// //             <Button
// //               variant="ghost"
// //               size="icon"
// //               className="h-10 w-10"
// //               onClick={() => handlePlay(song)}>
// //               <Play className="h-5 w-5" />
// //             </Button>

// //             {/* ✅ Зураг */}
// //             <img
// //               src={song.coverUrl || "/placeholder.svg"}
// //               alt={song.title}
// //               className="h-10 w-10 rounded-md object-cover"
// //             />

// //             {/* ✅ Дууны нэр ба уран бүтээлч */}
// //             <div className="flex-1 min-w-0">
// //               <p className="truncate text-sm font-medium text-zinc-100">
// //                 {song.title}
// //               </p>
// //               <p className="truncate text-xs text-zinc-400">{song.artist}</p>
// //             </div>

// //             {/* ✅ Хэрэгсэлүүд */}
// //             <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
// //               <Button variant="ghost" size="icon" className="h-8 w-8">
// //                 <Download className="h-4 w-4" />
// //               </Button>

// //               <Button
// //                 variant="ghost"
// //                 size="icon"
// //                 className="h-8 w-8"
// //                 onClick={() => toggleFavorite(song.id)}>
// //                 <Heart
// //                   className={`h-4 w-4 ${
// //                     favorites.has(song.id) ? "fill-red-500 text-red-500" : ""
// //                   }`}
// //                 />
// //               </Button>

// //               <Button variant="ghost" size="icon" className="h-8 w-8">
// //                 <Share2 className="h-4 w-4" />
// //               </Button>
// //             </div>

// //             {/* ✅ Үргэлжлэх хугацаа */}
// //             <span className="text-sm text-zinc-400">{song.duration}</span>
// //           </div>
// //         ))}
// //       </div>

// //       {/* ✅ Тоглогдож буй дуу */}
// //       {currentSong && (
// //         <div className="mt-4 border rounded-lg overflow-hidden bg-zinc-900">
// //           <div className="flex justify-between items-center p-4">
// //             <div>
// //               <p className="text-lg font-bold text-white">
// //                 {currentSong.title}
// //               </p>
// //               <p className="text-sm text-zinc-400">{currentSong.artist}</p>
// //             </div>

// //             {/* ✅ Видео/Аудио toggle товч */}
// //             <Button
// //               variant="ghost"
// //               size="icon"
// //               onClick={() =>
// //                 setPlayMode(playMode === "video" ? "audio" : "video")
// //               }>
// //               {playMode === "video" ? (
// //                 <Music className="h-5 w-5" />
// //               ) : (
// //                 <Video className="h-5 w-5" />
// //               )}
// //             </Button>

// //             <Button variant="ghost" size="icon" onClick={closePlayer}>
// //               <X className="h-5 w-5" />
// //             </Button>
// //           </div>

// //           {playMode === "video" ? (
// //             <iframe
// //               className="w-full h-full"
// //               src={getYoutubeEmbedUrl(currentSong.youtubeUrl) || ""}
// //               allow="autoplay; encrypted-media"
// //               allowFullScreen
// //             />
// //           ) : (
// //             <audio controls autoPlay className="w-full">
// //               <source
// //                 src={getYoutubeAudioUrl(currentSong.youtubeUrl) || ""}
// //                 type="audio/mp3"
// //               />
// //               Таны хөтөч аудио тоглуулагчийг дэмжихгүй байна.
// //             </audio>
// //           )}
// //         </div>
// //       )}
// //     </div>
// //   );
// // }
