/** @format */

"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface EventCardProps {
  title: string;
  subtitle?: string;
  discountPercentage?: number;
  endDate: Date;
  image: string;
  gradient?: string;
  buttonText?: string;
  desc?: string;
  onButtonClick?: () => void;
  className?: string;

  textColorMode?: "dark" | "light";
  bgColor?: string;
  badgeColor?: string;
  buttonColor?: string;
  timerBgColor?: string;

  titleSize?: string;
  subtitleSize?: string;
  priceSize?: string;
  buttonSize?: string;

  borderRadius?: string;
  shadow?: string;
  spacing?: string;
}

export default function EventCard2({
  title,
  subtitle,
  endDate,
  image,
  buttonText = "Buy ticket",
  onButtonClick,
  className,
  // Default styles
  textColorMode = "dark",
  bgColor = "bg-[#333333]",
  buttonColor = "bg-purple-600 hover:bg-purple-700",
  timerBgColor = "bg-white/20",
  titleSize = "text-3xl",
  subtitleSize = "text-sm",
  desc = "text-lg",
  buttonSize = "px-4 py-2 text-base",
  borderRadius = "rounded-lg",
  shadow = "shadow-lg",
}: EventCardProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = endDate.getTime() - now;

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

  const textColor = textColorMode === "light" ? "text-white" : "text-black";

  return (
    <div
      className={cn(
        "rounded-lg shadow-lg cursor-pointer",
        borderRadius,
        shadow,
        className
      )}
    >
      <div className={cn("flex ", bgColor)}>
        {/* Left Side: Image */}
        <div className="relative w-2/3">
          <img
            src={image || "/placeholder.svg"}
            alt={title}
            className={cn("w-full h-auto object-cover", borderRadius)}
          />
        </div>

        {/* Right Side: Text Content */}
        <div
          className={cn(
            "w-1/3 pr-4 flex flex-col justify-center items-center",
            textColor
          )}
        >
          <h2 className={cn("font-bold", titleSize)}>{title}</h2>
          {subtitle && (
            <p className={cn("opacity-90", subtitleSize)}>{subtitle}</p>
          )}

          {/* Countdown Timer */}
          <div className="grid grid-cols-4 gap-2 mt-4">
            {["өдөр", "цаг", "минут", "секунд"].map((unit, index) => (
              <div
                key={index}
                className={cn(timerBgColor, borderRadius, "p-2 text-center")}
              >
                <div className="text-2xl font-bold">
                  {index === 0
                    ? timeLeft.days
                    : index === 1
                    ? timeLeft.hours
                    : index === 2
                    ? timeLeft.minutes
                    : timeLeft.seconds}
                </div>
                <div className="text-xs">{unit}</div>
              </div>
            ))}
          </div>

          {/* Description and Button */}
          <div className="flex flex-col items-center justify-between mt-6 gap-1">
            {desc && <p className={cn("opacity-90", desc)}>{desc}</p>}
            <button
              onClick={onButtonClick}
              className={cn(
                buttonColor,
                "text-white transition",
                buttonSize,
                borderRadius
              )}
            >
              {buttonText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
