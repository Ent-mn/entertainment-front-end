// "use client";

// import { TopSongs } from "@/components/music/top-songs";
// import { ArtistBio } from "@/components/music/artist-bio";
// import { LatestReleases } from "@/components/music/latest-releases";
// import { AlbumsSection } from "@/components/music/albums-section";
// import { GallerySection } from "@/components/music/gallery-section";
// import {
//   templateAlbums,
//   templateBio,
//   templateGalleryImages,
//   templateReleases,
//   templateSongs,
// } from "@/app/template-data";

// export default function ProfileSection() {
//   return (
//     <div className="min-h-screen bg-[#1c1c1c] text-white">
//       <div>
//         <img
//           src="https://mgl.gogo.mn/news/2013/9/5/bold.jpg"
//           alt=""
//           className=" mx-auto w-full
//            h-[530px] bg-cover"
//         />
//       </div>
//       <div className="mx-auto max-w-7xl space-y-8 p-6">
//         <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
//           <div className="lg:col-span-2">
//             <TopSongs
//               songs={templateSongs}
//               onPlay={(song) => console.log("Playing:", song.title)}
//             />
//           </div>
//           <div className="flex flex-col space-y-4 gap-4 lg:col-span-1">
//             <ArtistBio bio={templateBio} />
//             <LatestReleases
//               releases={templateReleases}
//               onReleaseClick={(release) =>
//                 console.log("Selected release:", release.title)
//               }
//             />
//           </div>
//         </div>

//         <AlbumsSection
//           albums={templateAlbums}
//           onAlbumClick={(album) => console.log("Selected album:", album.title)}
//         />

//         <GallerySection images={templateGalleryImages} />
//         {/* <Concert images={EventSectionProps} /> */}
//       </div>
//     </div>
//   );
// }
