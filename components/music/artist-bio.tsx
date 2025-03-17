// "use client";

// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import type { ArtistBio } from "@/types/music";

// interface ArtistBioProps {
//   bio: ArtistBio;
// }

// export function ArtistBio({ bio }: ArtistBioProps) {
//   const [isExpanded, setIsExpanded] = useState(false);

//   return (
//     <div className="space-y-2">
//       <h2 className="text-2xl font-bold">Bio</h2>

//       <div className="space-y-4">
//         <p className="text-sm text-zinc-300 line-clamp-3">
//           {isExpanded ? bio.fullBio : bio.shortBio}
//         </p>

//         {bio.monthlyListeners && (
//           <div className="text-sm text-zinc-400">
//             <span className="font-medium text-white">
//               {bio.monthlyListeners.toLocaleString()}
//             </span>{" "}
//             monthly listeners
//           </div>
//         )}

//         {/* {bio.topCities && (
//           <div className="space-y-2">
//             <p className="text-sm font-medium">Top Cities</p>
//             <div className="flex flex-wrap gap-2">
//               {bio.topCities.map((city) => (
//                 <span
//                   key={city}
//                   className="rounded-full bg-zinc-800 px-3 py-1 text-xs">
//                   {city}
//                 </span>
//               ))}
//             </div>
//           </div>
//         )} */}

//         <Button
//           variant="ghost"
//           className="text-sm text-zinc-400 cursor-pointer hover:bg-red hover:text-white"
//           onClick={() => setIsExpanded(!isExpanded)}>
//           {isExpanded ? "Show less" : "Show more"}
//         </Button>
//       </div>
//     </div>
//   );
// }
