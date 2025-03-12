"use client";

import { useState } from "react";
import Card from "../Card";

interface FavoriteService {
  servicedata: {
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
  }[];
}

const FavoriteService = ({ servicedata }: FavoriteService) => {
  const sliceData = servicedata.slice(0, 5);
  const [allServie, setAllService] = useState(false);

  const HandleClick = () => {
    setAllService(!allServie);
  };
  return (
    <div className="w-full bg-gray-200 flex justify-center p-5">
      <div className="flex max-w-[1500px]  items-center flex-col">
        <h1 className="font-bold text-[35px] text-center text-[#200052]">
          Онцлох үйлчилгээ
        </h1>
        <h2 className="font-light text-[15px] text-center text-[#200052]">
          Заавар видео
        </h2>
        <div className="w-full flex justify-end">
          <button
            onClick={() => {
              HandleClick();
            }}
            className="font-light text-[15px] text-[#6B6B6B]"
          >
            {allServie ? " хураах .." : "бүгдийг үзэх..."}
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5  gap-3">
          {allServie
            ? servicedata.map((el, index) => {
                return (
                  <div key={index}>
                    <Card
                      size={el.size}
                      title={el.title}
                      image={el.image}
                      imageSize={el.imageSize}
                      background={el.background}
                      price={el.price}
                      textColor={el.textColor}
                      border={el.border}
                      hoverEffect
                      rating={el.rating}
                      logo={el.logo}
                      onSale={el.onSale}
                    />
                  </div>
                );
              })
            : sliceData.map((el, index) => {
                return (
                  <div key={index}>
                    <Card
                      size={el.size}
                      title={el.title}
                      image={el.image}
                      imageSize={el.imageSize}
                      background={el.background}
                      price={el.price}
                      textColor={el.textColor}
                      border={el.border}
                      hoverEffect
                      rating={el.rating}
                      logo={el.logo}
                      onSale={el.onSale}
                    />
                  </div>
                );
              })}
        </div>
      </div>
    </div>
  );
};

export default FavoriteService;
