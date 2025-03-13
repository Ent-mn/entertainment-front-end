/** @format */

"use client";

import { useEffect, useState } from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface CountdownCardProps {
  title?: string;
  subtitle?: string;
  discountPercentage?: number;
  leasing?: {
    percentage: number;
    rating: number;
  };
  priceRange?: {
    min: number;
    max: number;
  };
  finalPrice: number;
  endDate?: Date;
  image: string;
  gradient?: string;
  buttonText?: string;
  onButtonClick?: () => void;
  className?: string;

  // Customizable Styles
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

export default function CountdownCard({
  title,
  subtitle,
  leasing,
  priceRange,
  finalPrice,
  endDate,
  image,
  gradient = "from-orange-400 to-orange-500",
  buttonText = "Buy now",
  onButtonClick,
  className,
  // Default styles
  textColorMode = "dark",
  bgColor = "bg-gradient-to-r from-orange-400 to-orange-500",
  badgeColor = "bg-purple-600",
  buttonColor = "bg-purple-600 hover:bg-purple-700",
  timerBgColor = "bg-white/20",

  titleSize = "text-3xl",
  subtitleSize = "text-sm",
  priceSize = "text-xl",
  buttonSize = "px-4 py-2 text-base",

  borderRadius = "rounded-lg",
  shadow = "shadow-lg",
  spacing = "p-6",
}: CountdownCardProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = endDate?.getTime() ?? 0 - now;

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

  const formatPrice = (price: number) => {
    return (
      price.toLocaleString("en-US", {
        maximumFractionDigits: 0,
      }) + "₮"
    );
  };

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
      <div
        className={cn(
          "flex flex-col md:flex-row items-center",
          spacing,
          bgColor
        )}
      >
        <div className="relative w-1/3 mb-6 md:mb-0">
          <img
            src={image || "/placeholder.svg"}
            alt={title}
            className={cn("w-full h-auto object-contain", borderRadius)}
          />
        </div>
        <div className="w-1/3 flex flex-col justify-center items-center">
          {leasing && (
            <div className={cn("flex flex-col gap-1", textColor)}>
              <span>Лизинг {leasing.percentage}%</span>
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      "w-4 h-4",
                      i < leasing.rating
                        ? "fill-current text-current"
                        : "fill-white/20 text-white/20"
                    )}
                  />
                ))}
              </div>
              {priceRange && (
                <p className="text-sm opacity-90">
                  {formatPrice(priceRange.min)} - {formatPrice(priceRange.max)}
                </p>
              )}
            </div>
          )}
        </div>
        <div className={cn("w-1/3", textColor)}>
          <h2 className={cn("font-bold", titleSize)}>{title}</h2>
          {subtitle && (
            <p className={cn("opacity-90", subtitleSize)}>{subtitle}</p>
          )}

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

          <div className="flex flex-col items-center justify-between mt-6 gap-1">
            <p className={cn("opacity-90", subtitleSize)}>{subtitle}</p>
            <div className={cn("font-bold", priceSize)}>
              {formatPrice(finalPrice)}
            </div>
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
