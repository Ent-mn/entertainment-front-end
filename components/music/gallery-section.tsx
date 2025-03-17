// "use client";

// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Dialog, DialogContent } from "@/components/ui/dialog";
// import { GalleryImage } from "@/types/music";

// interface GallerySectionProps {
//   images: GalleryImage[];
// }

// export function GallerySection({ images }: GallerySectionProps) {
//   const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

//   return (
//     <div className="space-y-4">
//       <div className="flex items-center justify-between">
//         <h2 className="text-2xl font-bold">Gallery</h2>
//         <Button
//           variant="ghost"
//           className="text-sm text-zinc-400 cursor-pointer hover:bg-red hover:text-white">
//           Show all
//         </Button>
//       </div>

//       <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
//         {images.map((image) => (
//           <button
//             key={image.id}
//             className="group relative aspect-square overflow-hidden rounded-md"
//             onClick={() => setSelectedImage(image)}>
//             <img
//               src={image.url || "/placeholder.svg"}
//               alt={image.alt}
//               className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
//             />
//             <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
//           </button>
//         ))}
//       </div>

//       <Dialog
//         open={!!selectedImage}
//         onOpenChange={() => setSelectedImage(null)}>
//         <DialogContent className="max-w-4xl border-zinc-800 bg-zinc-900 p-0">
//           {selectedImage && (
//             <img
//               src={selectedImage.url || "/placeholder.svg"}
//               alt={selectedImage.alt}
//               className="h-full w-full object-contain"
//             />
//           )}
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// }
