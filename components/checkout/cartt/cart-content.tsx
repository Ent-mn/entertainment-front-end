"use client";

import { useState } from "react";
import { formatCurrency } from "./cart-data";
import { ChevronDown } from "lucide-react";
import Image from "next/image";

interface MenuItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
  total: number;
  ingredients: string[];
  image: string;
}

interface CartContentProps {
  onCartUpdated?: () => void;
}

const menuItems: MenuItem[] = [
  {
    id: 1,
    title: "MENU 1",
    price: 240000,
    quantity: 260,
    total: 62400000,
    image: "/menu1.jpg",
    ingredients: [
      "1. Ассорти зууш",
      "2. Салмон стейк",
      "3. Үхрийн гол махан стейк",
      "4. Лемонтой салхин дарс",
      "5. Soft Drink сонголтоор 1ш",
      "6. Цагаан үс 1ш",
      "7. Улаан дарс",
      "8. Шинэтэй Пино сонголтоор 1ш",
      "9. Grey Goose 500гр",
      "10. La Viva cheesecake 1ш",
      "11. Орчуулуу дарс 10 хүний дүнд 'bin25'",
    ],
  },
  {
    id: 2,
    title: "MENU 2",
    price: 100000,
    quantity: 40,
    total: 4000000,
    image: "/menu2.jpg",
    ingredients: [
      "1. Pizza Lemon",
      "2. Зууш",
      "3. Үхрийн гол махан стейк",
      "4. Лемонтой салхин дарс",
      "5. Soft Drink сонголтоор 1ш",
      "6. Цагаан үс 1ш",
      "7. Улаан дарс",
    ],
  },
];

const drinks = [
  {
    id: 3,
    title: "Vodka",
    subtitle: "Danika - Black",
    price: 150000,
    quantity: 26,
    total: 3900000,
    image: "/vodka.jpg",
    ingredients: ["1. Danika - Black", "2. 1 Litre"],
  },
];

export default function CartContent({ onCartUpdated }: CartContentProps) {
  const [expandedItems, setExpandedItems] = useState<number[]>([]);

  const toggleItem = (id: number) => {
    setExpandedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const totalAmount = [...menuItems, ...drinks].reduce(
    (sum, item) => sum + item.total,
    0
  );
  const tax = Math.round(totalAmount * 0.1);
  const grandTotal = totalAmount + tax;

  return (
    <div className=" absolute top-0 bottom-0 left-0 flex items-center right-0  bg-[#1A1A1A]">
      <div className="w-[1000px] h-[800px] bg-[#1A1A1A] rounded-xl overflow-hidden flex flex-col my-8">
        <div>my Cart</div>
        <div className="p-4 flex justify-between items-center bg-gradient-to-r from-[#E4A853] to-[#E17543] rounded-t-xl">
          <h2 className="text-white text-lg font-medium">ЗАХИАЛГА 1</h2>
          <div className="flex gap-2">
            <button className="p-2 bg-whitee/20 rounded">
              <Image src="/share-icon.svg" alt="Share" width={20} height={20} />
            </button>
            <button className="p-2 bg-white/20 rounded">
              <Image
                src="/delete-icon.svg"
                alt="Delete"
                width={20}
                height={20}
              />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-auto">
          <div className="p-6 border-b border-gray-800">
            <div className="flex gap-6">
              <Image
                src="/venue-image.jpg"
                alt="Shangri-La"
                width={140}
                height={140}
                className="rounded-lg object-cover"
              />
              <div className="space-y-2">
                <h3 className="text-white text-2xl font-bold">
                  SHANGRI-LA ULAANAATAR
                </h3>
                <p className="text-white text-lg">Grand Ballroom</p>
                <div className="flex text-yellow-500 text-xl">★★★★★</div>
                <p className="text-gray-400">Төрөл: Event Hall</p>
              </div>
            </div>
          </div>

          <div className="p-6 border-b border-gray-800">
            <h3 className="text-white text-lg mb-4">EVENT INFORMATION</h3>
            <div className="grid grid-cols-3 gap-8">
              <div className="flex items-center gap-3">
                <Image
                  src="/calendar-icon.svg"
                  alt="Calendar"
                  width={24}
                  height={24}
                />
                <span className="text-white text-lg">2024.10.03</span>
              </div>
              <div className="flex items-center gap-3">
                <Image src="/time-icon.svg" alt="Time" width={24} height={24} />
                <span className="text-white text-lg">18:00 - 23:00</span>
              </div>
              <div className="flex items-center gap-3">
                <Image
                  src="/person-icon.svg"
                  alt="People"
                  width={24}
                  height={24}
                />
                <span className="text-white text-lg">Хүрим</span>
              </div>
            </div>
          </div>

          <div className="space-y-4 p-6">
            {[...menuItems, ...drinks].map((item) => (
              <div
                key={item.id}
                className="bg-[#232323] rounded-lg overflow-hidden shadow-lg">
                <div
                  className="p-4 flex items-center justify-between cursor-pointer hover:bg-[#2a2a2a] transition-colors"
                  onClick={() => toggleItem(item.id)}>
                  <div className="flex gap-4">
                    <Image
                      src={item.image}
                      alt={item.title}
                      width={100}
                      height={100}
                      className="rounded-lg object-cover"
                    />
                    <div className="space-y-1">
                      <h4 className="text-white text-xl font-medium">
                        {item.title}
                      </h4>
                      <p className="text-gray-400 text-lg">
                        {formatCurrency(item.price)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <span className="text-white text-lg">
                      {item.quantity} хүн
                    </span>
                    <span className="text-white text-lg font-medium min-w-[120px] text-right">
                      {formatCurrency(item.total)}
                    </span>
                    <ChevronDown
                      className={`w-6 h-6 text-gray-400 transform transition-transform ${
                        expandedItems.includes(item.id) ? "rotate-180" : ""
                      }`}
                    />
                  </div>
                </div>
                {expandedItems.includes(item.id) && (
                  <div className="p-4 border-t border-gray-700 space-y-2">
                    {item.ingredients.map((ingredient, index) => (
                      <p key={index} className="text-gray-400 text-base">
                        {ingredient}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 bg-[#232323]">
          <div className="space-y-3">
            <div className="flex justify-between text-gray-400 text-lg">
              <span>Нийт</span>
              <span>{formatCurrency(totalAmount)}</span>
            </div>
            <div className="flex justify-between text-gray-400 text-lg">
              <span>НӨАТ</span>
              <span>{formatCurrency(tax)}</span>
            </div>
            <div className="flex justify-between text-gray-400 text-lg">
              <span>БҮГД</span>
              <span className="text-white font-bold text-xl">
                {formatCurrency(grandTotal)}
              </span>
            </div>
          </div>
          <button className="w-full bg-[#E4A853] hover:bg-[#d39843] text-white py-4 rounded-lg mt-6 font-medium text-lg transition-colors">
            Төлбөр төлөх
          </button>
        </div>
      </div>
    </div>
  );
}
