import React from "react";

export const BannerCarousel = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
      <div className="relative aspect-[7/8] group cursor-pointer overflow-hidden rounded-xl">
        <img
          src={"slideimg-1.png"}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
      </div>
      <div className="relative aspect-[7/8] group cursor-pointer overflow-hidden hidden md:block rounded-xl">
        <img
          src={"slideimg-2.png"}
          alt={"slideimg-2.png"}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
      </div>
      <div className="relative aspect-[7/8] group cursor-pointer overflow-hidden hidden lg:block rounded-xl">
        <img
          src={"slideimg-3.png"}
          alt={"slideimg-3.png"}
          className="w-full h-full object-cover transition-transform  duration-300 group-hover:scale-110"
        />
      </div>
    </div>
  );
};
