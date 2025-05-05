"use client";

export function Gallery() {
  const images = [
    {
      id: 1,
      src: "/placeholder.svg?height=300&width=400",
      alt: "Hotel Exterior",
    },
    { id: 2, src: "/placeholder.svg?height=300&width=400", alt: "Lobby" },
    { id: 3, src: "/placeholder.svg?height=300&width=400", alt: "Deluxe Room" },
    {
      id: 4,
      src: "/placeholder.svg?height=300&width=400",
      alt: "Executive Suite",
    },
    { id: 5, src: "/placeholder.svg?height=300&width=400", alt: "Restaurant" },
    {
      id: 6,
      src: "/placeholder.svg?height=300&width=400",
      alt: "Swimming Pool",
    },
    { id: 7, src: "/placeholder.svg?height=300&width=400", alt: "Spa" },
    {
      id: 8,
      src: "/placeholder.svg?height=300&width=400",
      alt: "Grand Ballroom",
    },
    {
      id: 9,
      src: "/placeholder.svg?height=300&width=400",
      alt: "Meeting Room",
    },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">Gallery</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {images.map((image) => (
          <div key={image.id} className="overflow-hidden rounded-lg">
            <img
              src={image.src || "/placeholder.svg"}
              alt={image.alt}
              className="w-full h-64 object-cover transition-transform hover:scale-105 cursor-pointer"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
