"use client";

import { useState } from "react";
import { CalendarIcon, ChevronDown, ChevronUp } from "lucide-react";
import EventCard from "@/components/checkout/CartHeader";
import MenuSelection from "@/components/checkout/MenuSelection";
import ThemeToggleDemo from "@/components/theme/theme-toggle-demo";

const PaymentSection = () => {
  return (
    <div className="p-4 bg-[#1A1A1A] rounded-lg flex flex-col gap-2 w-[300px]">
      <div className="text-white text-right">
        <div className="flex justify-between text-sm">
          <p>Нийт:</p>
          <span>70,800,000 ₮</span>
        </div>
        <div className="flex justify-between text-sm">
          <div>НӨАТ:</div>
          <p>7,080,000 ₮</p>
        </div>
        <div className="flex justify-between text-sm">
          <div>БҮГД:</div>
          <p className="font-bold">77,080,000 ₮</p>
        </div>
      </div>
      <button className="mt-2 bg-green-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-600 transition">
        Баталгаажуулах
      </button>
    </div>
  );
};

interface OrderTabProps {
  onClose: () => void;
}

export function OrderTab({ onClose }: OrderTabProps) {
  const [expanded, setExpanded] = useState(false);

  const toggleMenu = () => {
    setExpanded((prev) => !prev);
  };

  return (
    <div className="flex flex-col mt-12 px-[26px] w-full h-full">
      <div
        className={`w-full rounded-lg flex flex-col gap-[17px]  dark:text-white text-white relative ${
          expanded ? "h-[calc(100vh-200px)] overflow-y-auto" : ""
        }`}
      >
        <div className="sticky top-0 z-10 flex justify-between border-[1px] border-[#2C2C2C]  bg-[#191919]  items-center gap-2  rounded-xl p-3 cursor-pointer shadow-md w-full">
          <div className="flex items-center gap-2">
            <button
              onClick={toggleMenu}
              className="text-white hover:text-gray-300 transition-colors"
            >
              {expanded ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
            </button>
            <div className="flex items-center gap-2">
              <span className="font-bold text-[20px]">ЗАХИАЛГА 1</span>
            </div>
          </div>
          <div className="flex items-center gap-2  text-sm">
            <span className=" text-white bg-green-500 text-[20px] px-3 py-3 rounded-full"></span>
            <span className=" text-white font-bold text-[20px] px-2 py-1 rounded-full">
              Идэвхтэй
            </span>
            <div className="font-semibold items-center flex gap-8 ml-[68px] text-[20px]">
              <CalendarIcon size={24} />
              <div>14 цаг</div>
              <div>22 мин</div>
              <div>43 сек</div>
              <ThemeToggleDemo />
            </div>
          </div>
        </div>

        <div className="flex justify-between border-[1px] border-[#2C2C2C] bg-[#191919] rounded-xl items-start p-4 gap-4">
          <EventCard />
          {!expanded && <PaymentSection />}
        </div>

        {expanded && (
          <div className="p-4">
            <MenuSelection />
          </div>
        )}
      </div>
    </div>
  );
}
