import RestaurantWebsite from "@/components/restaurant/1";

import RestLogin from "../../components/RestLogin";
import RestRegister from "../../components/RestRegister";

import ReservationForm from "@/components/restaurant/2";
import FeaturesSection from "@/components/restaurant/3";

const page = () => {
  return (
    <div>
      <RestaurantWebsite />
      <ReservationForm />
      <FeaturesSection />
    </div>
  );
};
export default page;
