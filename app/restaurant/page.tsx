import RestaurantWebsite from "@/components/restaurant/1";
import RestLogin from "../../components/RestLogin";
import RestRegister from "../../components/RestRegister";

const page = () => {
  return (
    <div className=" flex-col gap-7 flex">
      restaurant
      <RestLogin />
      <RestRegister />
      <RestaurantWebsite />
    </div>
  );
};
