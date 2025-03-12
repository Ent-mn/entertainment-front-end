/** @format */
"use client";

import { useEffect, useState } from "react";
import { CalendarIcon, ClockIcon, MapPinIcon } from "lucide-react";

interface EventCardProps {
  title: string;
  image: string;
  date?: string;
  time?: string;
  location?: string;
  buttonText?: string;
  backgroundColor?: string;
  endDate?: string; // Өмнө нь Date байсан, одоо string болгож, хөрвүүлэх логик нэмж өглөө
}

export default function EventCard({
  title,
  image,
  date,
  time,
  location,
  buttonText,
  backgroundColor,
  endDate,
}: EventCardProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    if (!endDate) return;

    const targetDate = new Date(endDate); // String-ийг Date болгон хөрвүүлэх
    if (isNaN(targetDate.getTime())) return; // Хэрэв буруу форматтай бол ажиллуулахгүй

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      if (distance < 0) {
        clearInterval(timer);
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        ),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [endDate]);

  return (
    <div
      className={`p-4 rounded-lg shadow-md w-1/2 cursor-pointer ${
        backgroundColor || "bg-gray-800"
      }`}
    >
      <div className=" overflow-hidden rounded-lg">
        <img
          src={image || "/placeholder.svg"}
          alt={title}
          className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
        />
      </div>

      <div className="p-4">
        <h2 className="text-2xl font-bold text-white mb-2">{title}</h2>
        <div className="flex gap-4 text-sm text-gray-400">
          {date && (
            <div className="flex items-center gap-1">
              <CalendarIcon className="w-4 h-4" />
              <span>{date}</span>
            </div>
          )}
          {time && (
            <div className="flex items-center gap-1">
              <ClockIcon className="w-4 h-4" />
              <span>{time}</span>
            </div>
          )}
          {location && (
            <div className="flex items-center gap-1">
              <MapPinIcon className="w-4 h-4" />
              <span>{location}</span>
            </div>
          )}
        </div>

        {endDate && (
          <div className="mt-4 text-white text-sm">
            <p>
              Remaining Time: {timeLeft.days}d {timeLeft.hours}h{" "}
              {timeLeft.minutes}m {timeLeft.seconds}s
            </p>
          </div>
        )}

        {buttonText && (
          <button className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition">
            {buttonText}
          </button>
        )}
      </div>
    </div>
  );
}
