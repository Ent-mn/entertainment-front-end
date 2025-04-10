"use client";

import { Suspense } from "react";
import dynamic from "next/dynamic";
import RestLogin from "@/components/RestLogin";
import RestRegister from "@/components/RestRegister";
import ReservationForm from "@/components/restaurant/2";
import FeaturesSection from "@/components/restaurant/3";
import RestaurantSection from "@/components/restaurant/4";
import VenueGallery from "@/components/restaurant/5";
import RestaurantSlider from "@/components/restaurant/6";
import RestaurantHorizontalSlider from "@/components/restaurant/Footer";
import Hover from "@/components/restaurant/2.5";
import VenueShowcase from "@/components/restaurant/7";
import VenueGrid from "@/components/restaurant/8";
import TemplateTest from "@/components/restaurant/templateTest";

const TemplatePage = () => {
  return (
    <div>
      <TemplateTest />
      {/* <ReservationForm />
      <Hover />
      <FeaturesSection />
      <RestaurantSection />
      <VenueGallery />
      <RestaurantSlider />
      <VenueShowcase />
      <VenueGrid />
      <RestaurantHorizontalSlider /> */}
    </div>
  );
};

export default TemplatePage;
