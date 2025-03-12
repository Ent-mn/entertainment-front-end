import React from "react";
import EventCard from "../EventCard";
import EventCard2 from "../EventCard2";
import EventCardMd from "../EventCardMd";

export const Events = () => {
  return (
    <div className="w-full bg-gray-200 flex justify-center p-5">
      <div className="flex max-w-[1500px]  items-center flex-col">
        <h1 className="font-bold text-[35px] text-center text-[#200052]">
          Events & Concerts
        </h1>
        <h2 className="font-light text-[15px] text-center text-[#200052]">
          Upcoming
        </h2>
        <div className="w-full flex justify-end">
          <button className="font-light text-[15px] text-[#6B6B6B]">
            бүгдийг үзэх...
          </button>
        </div>
        <div className="w-full flex flex-col justify-center">
          <div className="flex flex-col gap-2 ">
            <div className="hidden md:block">
              <EventCard2
                title="The Perfume Night"
                textColorMode="light"
                subtitle="Нэгдсэн шинэ жил"
                discountPercentage={15}
                desc="Цөөн суудал үлдлээ"
                endDate={new Date("2025-02-14T00:00:00")}
                image="/image copy 5.png"
                gradient="[gray-500]"
                buttonText="Buy ticket"
                onButtonClick={() => alert("Захиалсан!")}
              />
            </div>
            <div className="md:flex gap-2 hidden">
              <EventCard
                title="BOLD-24 concert"
                image="image copy 5.png"
                date="2025.03.08"
                time="19:00"
                location="Shangri-La Ballroom"
                backgroundColor="bg-gray-900"
              />
              <EventCard
                title="BOLD-24 concert"
                image="image copy 5.png"
                date="2025.03.08"
                time="19:00"
                location="Shangri-La Ballroom"
                backgroundColor="bg-gray-900"
              />
            </div>
            <div className="flex flex-col w-full items-center md:hidden gap-2 ">
              <EventCardMd
                title="BOLD-24 concert"
                image="image copy 5.png"
                date="2025.03.08"
                time="19:00"
                location="Shangri-La Ballroom"
                backgroundColor="bg-gray-900"
              />
              <EventCardMd
                title="BOLD-24 concert"
                image="image copy 5.png"
                date="2025.03.08"
                time="19:00"
                location="Shangri-La Ballroom"
                backgroundColor="bg-gray-900"
              />
              <EventCardMd
                title="BOLD-24 concert"
                image="image copy 5.png"
                date="2025.03.08"
                time="19:00"
                location="Shangri-La Ballroom"
                backgroundColor="bg-gray-900"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
// aa
