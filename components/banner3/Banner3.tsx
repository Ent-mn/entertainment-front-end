import React from "react";
import CountdownCard from "../CountdownCard";

export const Banner3 = () => {
  return (
    <div className="w-full bg-gray-200 flex justify-center p-5">
      <div className="flex max-w-[1500px]  items-center flex-col">
        <CountdownCard
          title="Хямдрал"
          textColorMode="light"
          subtitle="Iphone 12 pro"
          discountPercentage={15}
          leasing={{ percentage: 6, rating: 4 }}
          priceRange={{ min: 500000, max: 650000 }}
          finalPrice={4500000}
          endDate={new Date("2025-02-14T00:00:00")}
          image="/image copy 4.png"
          gradient="from-blue-500 to-blue-700"
          buttonText="Buy now"
          onButtonClick={() => alert("Захиалсан!")}
        />
      </div>
    </div>
  );
};
