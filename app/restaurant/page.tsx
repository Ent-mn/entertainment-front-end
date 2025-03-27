import RestaurantWebsite from "@/components/restaurant/1";

import RestLogin from "../../components/RestLogin";
import RestRegister from "../../components/RestRegister";

import ReservationForm from "@/components/restaurant/2";
import FeaturesSection from "@/components/restaurant/3";
import RestaurantSection from "@/components/restaurant/4";
import VenueGallery from "@/components/restaurant/5";
import RestaurantSlider from "@/components/restaurant/6";
import RestaurantHorizontalSlider from "@/components/restaurant/Footer";

const page = () => {
  return (
    <div>
      <RestaurantWebsite />
      <ReservationForm />
      <FeaturesSection />
      <RestaurantSection />
      <VenueGallery />
      <RestaurantSlider />
      <RestaurantHorizontalSlider />
    </div>
  );
};
export default page;
