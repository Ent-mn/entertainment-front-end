import RestLogin from "../../components/RestLogin";
import RestRegister from "../../components/RestRegister";

const page = () => {
  return (
    <div className=" flex-col gap-7 flex">
      restaurant
      <RestLogin />
      <RestRegister />
    </div>
  );
};
export default page;
