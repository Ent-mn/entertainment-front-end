"use client";

import { useState } from "react";
import { Check } from "lucide-react";

interface PriceDetailsProps {
  menuItems: any[];
  totalPrice: number;
}

export default function PriceDetails({
  menuItems,
  totalPrice,
}: PriceDetailsProps) {
  const [isAvailable, setIsAvailable] = useState(true);
  const [isConfirmed, setIsConfirmed] = useState(false);

  // Calculate VAT (10%)
  const vat = totalPrice * 0.1;
  const grandTotal = totalPrice + vat;

  return (
    <div className=" bg-opacity-80 rounded-xl overflow-hidden  p-4 w-full max-w-md">
      {/* Status checkboxes */}
      <div className="flex justify-between mb-6">
        <div className="flex items-start">
          <button
            className="flex items-center justify-center w-6 h-6 rounded border border-green-500 mr-2 mt-0.5"
            onClick={() => setIsAvailable(!isAvailable)}>
            {isAvailable && <Check size={16} className="text-green-500" />}
          </button>
          <div>
            <p className="text-green-500 font-medium">Боломжтой</p>
            <p className=" text-black dark:text-white text-sm">
              Тус цагт захиалга авах
            </p>
          </div>
        </div>

        <div className="flex items-start">
          <button
            className="flex items-center justify-center w-6 h-6 rounded border border-gray-400 mr-2 mt-0.5"
            onClick={() => setIsConfirmed(!isConfirmed)}>
            {isConfirmed && (
              <Check size={16} className=" text-black dark:text-white" />
            )}
          </button>
          <div>
            <p className=" text-black dark:text-white font-medium">
              Баталгаажаагүй
            </p>
            <p className=" text-black dark:text-white text-sm">
              Захиалгын статус
            </p>
          </div>
        </div>
      </div>

      {/* Price Details header */}
      <div className="border-b border-gray-700 pb-2 mb-4">
        <h2 className=" text-black dark:text-white text-lg font-medium">
          Price Details
        </h2>
        <p className=" text-black dark:text-white text-sm">Үнийн задаргаа</p>
      </div>

      {/* Table headers */}
      <div className="grid grid-cols-4 text-gray-600 dark:text-gray-400 text-sm mb-2">
        <div className="col-span-1"></div>
        <div className="col-span-1 text-right">Нэг бүр үнэ</div>
        <div className="col-span-1 text-right">Тоо ширхэг</div>
        <div className="col-span-1 text-right">Нийт</div>
      </div>

      {/* Menu items */}
      <div className="space-y-3 mb-6">
        {menuItems.map((menu) => (
          <div
            key={menu.id}
            className="grid grid-cols-4  text-black dark:text-white">
            <div className="col-span-1">{menu.title} нийт үнэ</div>
            <div className="col-span-1 text-right">{menu.price}</div>
            <div className="col-span-1 text-right">{menu.serves}</div>
            <div className="col-span-1 text-right">{menu.totalCost}</div>
          </div>
        ))}

        {/* Products from menus */}
        {menuItems.map(
          (menu) =>
            menu.products &&
            menu.products.length > 0 &&
            menu.products.map((product: any) => (
              <div
                key={`${menu.id}-${product.id}`}
                className="grid grid-cols-4 text-white">
                <div className="col-span-1">{product.name}</div>
                <div className="col-span-1 text-right">{product.price}</div>
                <div className="col-span-1 text-right">1</div>
                <div className="col-span-1 text-right">{product.price}</div>
              </div>
            ))
        )}

        {/* Additional services */}
        <div className="grid grid-cols-4  text-black dark:text-white">
          <div className="col-span-1">Цэгийн нэмэлт төлбөр</div>
          <div className="col-span-1 text-right">-</div>
          <div className="col-span-1 text-right">-</div>
          <div className="col-span-1 text-right">500,000 ₮</div>
        </div>

        <div className="grid grid-cols-4  text-black dark:text-white">
          <div className="col-span-1">Бусад төлбөр</div>
          <div className="col-span-1 text-right">-</div>
          <div className="col-span-1 text-right">-</div>
          <div className="col-span-1 text-right">-</div>
        </div>

        <div className="grid grid-cols-4  text-black dark:text-white">
          <div className="col-span-1">Нэмэлт хөгжмийн төлбөр</div>
          <div className="col-span-1 text-right">-</div>
          <div className="col-span-1 text-right">-</div>
          <div className="col-span-1 text-right">-</div>
        </div>

        <div className="grid grid-cols-4  text-black dark:text-white">
          <div className="col-span-1">Нэмэлт архины төлбөр</div>
          <div className="col-span-1 text-right">-</div>
          <div className="col-span-1 text-right">-</div>
          <div className="col-span-1 text-right">-</div>
        </div>
      </div>

      {/* Totals */}
      <div className="border-t border-gray-700 pt-4 space-y-2">
        <div className="grid grid-cols-2  text-black dark:text-white">
          <div className="col-span-1 text-right font-medium">Нийт</div>
          <div className="col-span-1 text-right font-medium">
            {totalPrice.toLocaleString()} ₮
          </div>
        </div>

        <div className="grid grid-cols-2  text-black dark:text-white">
          <div className="col-span-1 text-right">НӨАТ</div>
          <div className="col-span-1 text-right">{vat.toLocaleString()} ₮</div>
        </div>

        <div className="grid grid-cols-2  text-black dark:text-white">
          <div className="col-span-1 text-right font-medium">БҮГД</div>
          <div className="col-span-1 text-right font-medium">
            {grandTotal.toLocaleString()} ₮
          </div>
        </div>
      </div>

      {/* Pay button */}
      <button 
        className="w-full bg-yellow-400 text-black font-medium py-4 rounded-md mt-6 hover:bg-yellow-500 transition-colors text-lg flex items-center justify-center gap-2 shadow-lg"
        onClick={() => {
          // Here you would typically redirect to a payment gateway or checkout page
          alert("Төлбөр төлөх хэсэг рүү шилжиж байна...");
        }}>
        <span>Төлбөр төлөх</span>
        <span className="font-bold">{grandTotal.toLocaleString()} ₮</span>
      </button>
    </div>
  );
}
