/** @format */

import React from "react";
import clsx from "clsx";
import { Star } from "lucide-react";

interface CardProps {
  title: string;
  image?: string;
  imageSize?: "sm" | "md" | "lg" | "full";
  background?: "white" | "gray" | "black";
  textColor?: "black" | "white" | "gray";
  size?: "sm" | "md" | "lg";
  border?: "none" | "rounded" | "shadow";
  hoverEffect?: boolean;
  rating?: number;
  price?: string | number;
  onSale?: boolean;
  logo?: string;
}

const formatPrice = (price: string | number) => {
  return typeof price === "number" ? price.toLocaleString("MGL") + "₮" : price;
};

const Card: React.FC<CardProps> = ({
  title,
  imageSize = "md",
  image,
  logo,
  background = "white",
  textColor = "black",
  size = "md",
  border = "rounded",
  hoverEffect = false,
  rating = 0,
  price,
  onSale = false,
}) => {
  const imageSizeStyles = {
    sm: "h-32 ",
    md: "h-[250px] w-full px-5",
    lg: "h-full w-full",
    full: "rounded-full h-[250px]",
  };
  const backgroundStyles = {
    white: "bg-white",
    gray: "bg-gray-800",
    black: "bg-black",
  };
  const textColorStyles = {
    black: "text-black",
    white: "text-white",
    gray: "text-gray-700",
  };
  const sizeStyles = {
    sm: "h-[300px] w-[220px]",
    md: "h-[350px] w-[250px]",
    lg: "h-[400px] w-[270px]",
  };
  const borderStyles = {
    none: "",
    rounded: "rounded-lg",
    shadow: "shadow-lg",
  };

  return (
    <div
      className={clsx(
        "overflow-hidden transition-all cursor-pointer p-2",
        backgroundStyles[background],
        textColorStyles[textColor],
        sizeStyles[size],
        borderStyles[border],
        hoverEffect && "hover:scale-105 shadow-xl"
      )}
    >
      <div className="flex items-center justify-between px-2">
        {onSale && (
          <span className="bg-[#811AE0] text-white text-sm font-semibold px-6 py-1 rounded-md cursor-pointer">
            On Sale
          </span>
        )}
        {logo && (
          <img className="w-[85px] h-[30px]" src={logo} alt="Brand Logo" />
        )}
      </div>
      {image && (
        <div
          className={clsx(
            "w-full overflow-hidden mt-2 text-center",
            imageSizeStyles[imageSize]
          )}
        >
          <img src={image} alt={title} className="w-full h-full object-cover" />
        </div>
      )}
      <div className="flex flex-col justify-end p-2 text-center ">
        <div className="font-semibold text-center">{title}</div>
        <div className="flex justify-center text-center p-1 gap-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={clsx(
                "h-4 w-4",
                i < rating ? "text-yellow-400" : "text-gray-500"
              )}
              fill={i < rating ? "#FACC15" : "#9CA3AF"}
            />
          ))}
        </div>

        {price && <p className="text-lg font-bold">{formatPrice(price)}</p>}
      </div>{" "}
    </div>
  );
};

export default Card;
