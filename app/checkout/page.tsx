"use client";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import EventCard from "@/components/checkout/CartHeader";
import MenuSelection from "@/components/checkout/MenuSelection";
import ThemeToggleDemo from "@/components/theme/theme-toggle-demo";

const PaymentSection = () => {
  return (
    <div className="p-4 bg-gradient-to-r w-80 rounded-md flex flex-col items-end gap-4">
      <div className="dark:text-white text-black text-right w-[200px] ">
        <div className="flex justify-between">
          <p className="text-lg  flex gap">Нийт:</p>
          <span className="text-lg">70,800,000 ₮</span>
        </div>
        <div className="flex justify-between">
          <div className="text-lg">НӨАТ:</div> <p> 7,080,000 ₮</p>
        </div>
        <div className="flex justify-between">
          <div className="">БҮГД:</div>
          <p className="font-bold"> 77,080,000 ₮</p>
        </div>
      </div>
      <button className="mt-2 bg-yellow-400 dark:text-white text-black px-4 py-2 rounded-lg font-semibold from-yellow-400 to-orange-400 transition">
        Төлбөр төлөх
      </button>
    </div>
  );
};

const CheckoutPage = () => {
  const [expanded, setExpanded] = useState(false);

  const toggleMenu = () => {
    setExpanded((prev) => !prev);
  };

  return (
    <div className="flex flex-col gap-5 justify-center items-center py-28 dark:bg-stone-800 bg-stone-300 min-h-screen">
      <div className="w-[1510px] rounded-md flex flex-col dark:bg-[#121212] bg-[#F3F3F3] dark:text-white text-[#121212] relative">
        {/* Chevron icon шар хүрээтэй */}
        <div className="absolute  top-[-65px] flex justify-between gap-4 bg-yellow-400  border-yellow-600 rounded-xl p-2 cursor-pointer shadow-md w-[1510px]">
          <div className="flex justify-between items-center gap-4">
            <button
              onClick={toggleMenu}
              className="text-gray-800 hover:text-black dark:text-white transition-colors">
              {expanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>
            <div>ЗАХИАЛГА </div>
          </div>

          <ThemeToggleDemo />
        </div>

        <div className="flex justify-between items-center p-4">
          <EventCard />
          {!expanded && <PaymentSection />}
        </div>

        {expanded && <MenuSelection />}
      </div>
    </div>
  );
};

export default CheckoutPage;
