// "use client";

// import { Button } from "@/components/ui/button";
// import { Release } from "@/types/music";

// interface LatestReleasesProps {
//   releases: Release[];
//   onReleaseClick: (release: Release) => void;
// }

// export function LatestReleases({
//   releases,
//   onReleaseClick,
// }: LatestReleasesProps) {
//   return (
//     <div className="space-y-4">
//       <div className="flex items-center justify-between">
//         <h2 className="text-2xl font-bold">Latest Releases</h2>
//         <Button
//           variant="ghost"
//           className="text-sm text-zinc-400 cursor-pointer hover:bg-red hover:text-white">
//           Show all
//         </Button>
//       </div>

//       <div className="grid grid-cols-4 gap-4 md:grid-cols-3 lg:grid-cols-2">
//         {releases.map((release) => (
//           <button
//             key={release.id}
//             className="group relative aspect-square overflow-hidden rounded-md"
//             onClick={() => onReleaseClick(release)}>
//             <img
//               src={release.coverUrl || "/placeholder.svg"}
//               alt={release.title}
//               className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
//             />
//             <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
//             <div className="absolute bottom-0 left-0 right-0 p-4 text-left opacity-0 transition-opacity duration-300 group-hover:opacity-100">
//               <p className="font-medium text-white">{release.title}</p>
//               <p className="text-sm text-zinc-300">{release.artist}</p>
//             </div>
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// }
