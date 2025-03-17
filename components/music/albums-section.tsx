// "use client";

// import { useRef } from "react";
// import { ChevronLeft, ChevronRight } from "lucide-react";

// import { Button } from "../ui/button";
// import { Album } from "../profile/artist-admin";

// interface AlbumsSectionProps {
//   albums: Album[];
//   onAlbumClick: (album: Album) => void;
// }

// export function AlbumsSection({ albums, onAlbumClick }: AlbumsSectionProps) {
//   const scrollContainerRef = useRef<HTMLDivElement>(null);

//   const scroll = (direction: "left" | "right") => {
//     if (scrollContainerRef.current) {
//       const scrollAmount = direction === "left" ? -300 : 300;
//       scrollContainerRef.current.scrollBy({
//         left: scrollAmount,
//         behavior: "smooth",
//       });
//     }
//   };

//   // 👉 "Show all" товч дээр бүх цомгийг харуулах функц
//   const showAll = () => {
//     scrollContainerRef.current?.scrollTo({
//       left: 0,
//       behavior: "smooth",
//     });
//   };

//   return (
//     <div className="space-y-4">
//       <div className="flex items-center justify-between">
//         <h2 className="text-2xl font-bold">Albums</h2>
//         <Button
//           variant="ghost"
//           className="text-sm text-zinc-400 cursor-pointer hover:bg-red hover:text-white"
//           onClick={showAll}>
//           Show all
//         </Button>
//       </div>

//       <div className="relative">
//         {/* 🔽 Зүүн талын товч */}
//         <Button
//           variant="ghost"
//           size="icon"
//           className="absolute -left-4 top-1/2 z-10 h-8 w-8 -translate-y-1/2 rounded-full bg-zinc-900/80"
//           onClick={() => scroll("left")}>
//           <ChevronLeft className="h-4 w-4" />
//         </Button>

//         {/* 🔥 scrollbar-ийг нуух */}
//         <div
//           ref={scrollContainerRef}
//           className="flex gap-4 overflow-x-auto scrollbar-hide">
//           {albums.map((album) => (
//             <button
//               key={album.id}
//               className="group flex-shrink-0"
//               onClick={() => onAlbumClick(album)}>
//               <div className="relative aspect-square w-48 overflow-hidden rounded-md">
//                 <img
//                   src={album.coverUrl || "/placeholder.svg"}
//                   alt={album.title}
//                   className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
//                 />
//                 <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
//               </div>
//               <div className="mt-2">
//                 <p className="font-medium">{album.title}</p>
//                 <p className="text-sm text-zinc-400">
//                   {album.type} • {album.year}
//                 </p>
//               </div>
//             </button>
//           ))}
//         </div>

//         {/* 🔽 Баруун талын товч */}
//         <Button
//           variant="ghost"
//           size="icon"
//           className="absolute -right-4 top-1/2 z-10 h-8 w-8 -translate-y-1/2 rounded-full bg-zinc-900/80"
//           onClick={() => scroll("right")}>
//           <ChevronRight className="h-4 w-4" />
//         </Button>
//       </div>
//     </div>
//   );
// }
