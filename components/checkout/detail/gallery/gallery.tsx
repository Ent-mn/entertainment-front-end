
"use client";


  
import RestaurantSlider from "@/components/restaurant/6";
import VenueShowcase from "@/components/restaurant/7";
import VenueGrid from "@/components/restaurant/8";
import RestaurantHorizontalSlider from "@/components/restaurant/Footer";


export function Gallery() {
  return (
    <div className="space-y-6">
      <RestaurantSlider />
      <VenueShowcase />
      <VenueGrid />
      <RestaurantHorizontalSlider />
    </div>
  );
}
