"use client";
import Image from "next/image";
import { useState, useRef } from "react";
import { ArrowRight } from "lucide-react";

export default function DetailHome2() {
  const [hoveredCard, setHoveredCard] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const features = [
    {
      image: "/uul.jpg",
      title: "Хамгийн гоё View-тэй газрууд",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and",
      hasButton: true,
    },
    {
      image: "/uul.jpg",
      title: "Хамгийн гоё байршил-тэй газрууд",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      hasButton: true,
    },
    {
      image: "/uul.jpg",
      title: "Хамгийн гоё хоол-той газрууд",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      hasButton: true,
    },
    {
      image: "/uul.jpg",
      title: "Хамгийн гоё Interior-тэй газрууд",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      hasButton: true,
    },
  ];

  return (
    <div
      ref={containerRef}
      className="w-full h-[700px] flex flex-col justify-center bg-[#121212] overflow-hidden px-52">
      {/* Background with subtle gradient */}
      <div className=" bg-gradient-to-b from-black to-[#111] opacity-80"></div>

      {/* Features horizontal layout */}
      <div className=" w-full h-full flex">
        {features.map((feature, index) => (
          <div
            key={index}
            className={`relative h-full flex-1 transition-all duration-500 ${
              hoveredCard === index ? "flex-[2.3]" : "flex-1"
            }`}
            onMouseEnter={() => setHoveredCard(index)}
            onMouseLeave={() => setHoveredCard(0)}>
            <div className="h-full relative overflow-hidden">
              <Image
                src={feature.image || "/placeholder.svg"}
                alt={feature.title || "Feature image"}
                fill
                className={`object-cover transition-all duration-500 ${
                  hoveredCard === index ? "scale-110 grayscale-0" : "grayscale"
                }`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
            </div>

            {/* Content overlay - only show text when hovered */}
            <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
              {hoveredCard === index && (
                <>
                  {feature.title && (
                    <h3 className="text-3xl font-medium mb-3">
                      {feature.title}
                    </h3>
                  )}
                  {feature.description && (
                    <p className="text-sm text-gray-200 max-w-md">
                      {feature.description}
                    </p>
                  )}
                  {feature.hasButton && (
                    <div className="mt-6">
                      <button className="w-12 h-12 rounded-full border border-white/50 flex items-center justify-center transition-all hover:bg-white/10">
                        <ArrowRight className="w-5 h-5" />
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
