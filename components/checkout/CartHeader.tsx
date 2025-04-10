"use client";

import { useState } from "react";
import Image from "next/image";
import { MapPin, Star, Calendar, Clock } from "lucide-react";

export default function EventCard() {
  const [rating] = useState(4);

  return (
    <div className="flex flex-col md:flex-row w-full overflow-hidden rounded-md">
      {/* Left section - Image */}
      <div className="relative w-full md:w-1/4 h-60 md:h-auto">
        <Image
          src="/image copy 10.png"
          alt="Grand Ballroom"
          fill
          className="object-cover flex p-6 w-[230px]"
        />
      </div>

      <div className="p-6 flex flex-col justify-between md:w-1/3">
        <div className="space-y-2">
          <h2 className="text-xl font-semibold tracking-wide uppercase">
            Shangri-La Ulaanbaatar
          </h2>
          <p className="text-lg">Grand Ballroom</p>
          <div className="flex items-center space-x-1 py-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-5 h-5 ${
                  i < rating
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-500"
                }`}
              />
            ))}
          </div>
        </div>

        <div className="space-y-4 mt-4">
          <div className="flex items-center space-x-2">
            <span className="text-gray-300">Төрөл:</span>
            <span>Event Hall</span>
          </div>
          <div className="flex items-center space-x-2">
            <MapPin className="w-5 h-5 text-gray-300" />
          </div>
        </div>
      </div>

      <div className=" p-6  md:w-5/12">
        <h3 className="text-lg font-medium mb-4 uppercase">
          Event Information
        </h3>

        <div className="flex">
          <div className="flex flex-col justify-center items-center px-6  border-r border-l border-[#939393]">
            <div className="flex items-center justify-center gap-2">
              <Calendar className="w-6 h-6 text-gray-300" />
              <span className="text-lg">Хурим</span>
            </div>
            <span className="text-xs text-[#A4A4A4] mt-1">Эвентийн төрөл</span>
          </div>

          <div className="flex flex-col justify-center items-center px-2 border-r border-l border-[#939393]">
            <div className="flex items-center justify-center gap-2">
              <Calendar className="w-6 h-6 text-gray-300" />
              <span className="text-lg">2024.10.03</span>
            </div>
            <span className="text-xs text-[#A4A4A4] mt-1">Болох өдөр</span>
          </div>
          <div className="flex flex-col justify-center items-center px-2 border-r border-l border-[#939393]">
            <div className="flex items-center justify-center gap-2">
              <Clock className="w-6 h-6 text-gray-300" />
              <span className="text-lg">18:00 - 23:00</span>
            </div>
            <span className="text-xs text-[#A4A4A4] mt-1">
              {" "}
              Эхлэх, үргэлжлэх цаг
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
