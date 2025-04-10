"use client";

import type React from "react";
import Image from "next/image";
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Fullscreen } from "lucide-react";

interface Feature {
  image: string;
  title: string;
  description: string;
  buttonText: string;
}

export default function DetailHome3() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const features: Feature[] = [
    {
      image: "/video.mp4",
      title: "SHANGRI-LAULAANBAATAR",
      description:
        "Улаанбаатар хотын хамгийн өндөр зэрэглэлийн ресторан бөгөөд байршлын хувь ч мөн хотын хамгийн төв хэсэгт байршдаг. Хурим найр, байгууллагын томоохон хүлээн авалтыг хамгийн өндөр зэрэглэлд танд үйлчлэхэд Шангри-Ла Улаанбаатар рестораны мэргэжлийн хамт олон бэлэн байна.   ",
      buttonText: "ДЭЛГЭРЭНГҮЙ",
    },
    {
      image: "/video1.mp4",
      title: "ASDADASD",
      description:
        "УЛААНБААТАР ХОТЫН ХАМГИЙН ТАНСАГ ЗААЛЫГ ТАНД ЗОРИУЛЖ БЭЛТГЭЛЭЭ. Ballroom 202: ОНЫ ХУРЫМЫН УЛИРЛЫГ УРДЧИЛСАН ЗАХИАЛГА АВЧ БАЙНА.",
      buttonText: "ДЭЛГЭРЭНГҮЙ",
    },
    {
      image: "/video2.mp4",
      title: "ASDASDASD",
      description:
        "testttrgjwetoprw gjwre[gwerg[ewjweo irgjweorigkweorigmwe ogrirjtokfepltriokeptijfkorep lwtjigrkofelpritgjgrke lopdoritgjhgkorfe",
      buttonText: "ДЭЛГЭРЭНГҮЙ",
    },
  ];

  const handleNext = () => {
    setCurrentSlide((prev) => (prev === features.length - 1 ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev === 0 ? features.length - 1 : prev - 1));
  };

  return (
    <div
      ref={containerRef}
      className="   py-28 px-0 justify-center bg-[#121212]  overflow-hidden relative z-0 flex flex-col min-h-screen">
      <div className="  bg-gradient-to-b from-black to-[#111] opacity-80"></div>
      <div className="">
        <div className="relative w-full h-screen flex items-center">
          <div className="absolute inset-0">
            <AnimatePresence initial={false}>
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0.5 }}
                transition={{
                  duration: 0.5,
                  ease: "easeInOut",
                }}
                className="absolute inset-0">
                <Image
                  alt="Restaurant logo"
                  layout="fill"
                  priority
                  src="/detail/image.png"
                  className="absolute inset-0 w-full h-full object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="relative z-20 w-1/2 p-8 pl-24 text-white overflow-hidden">
            <div className="h-16 relative overflow-hidden mb-4">
              <AnimatePresence initial={false}>
                <motion.h2
                  key={`title-${currentSlide}`}
                  initial={{ y: 100 }}
                  animate={{ y: 0 }}
                  exit={{ y: -100 }}
                  transition={{
                    duration: 0.8,
                    ease: "easeOut",
                  }}
                  className="text-4xl font-bold absolute w-full">
                  {features[currentSlide].title}
                </motion.h2>
              </AnimatePresence>
            </div>

            {/* Description with rolling effect */}
            <div className="h-24 relative overflow-hidden mb-6">
              <AnimatePresence initial={false}>
                <motion.p
                  key={`desc-${currentSlide}`}
                  initial={{ y: 100 }}
                  animate={{ y: 0 }}
                  exit={{ y: -100 }}
                  transition={{
                    duration: 0.8,
                    ease: "easeInOut",
                    delay: 0.1,
                  }}
                  className="text-sm absolute w-[200px]">
                  {features[currentSlide].description}
                </motion.p>
              </AnimatePresence>
            </div>

            <button className="px-6 py-2 border border-white rounded-full text-sm hover:bg-white hover:text-black transition">
              {features[currentSlide].buttonText}
            </button>
          </div>

          {/* Thumbnails */}
          <div className="relative z-20 w-1/2 flex items-end gap-4">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ x: 0 }}
                animate={{
                  x: index < currentSlide ? "-100%" : `-${currentSlide * 100}%`,
                  opacity: index < currentSlide ? 0 : 1,
                }}
                transition={{
                  duration: 0.4,
                  ease: "easeInOut",
                }}
                className="relative w-[750px] h-[400px] rounded-lg overflow-x-hidden cursor-pointer"
                onClick={() => setCurrentSlide(index)}>
                <video
                  src={feature.image}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/30 flex items-end p-2">
                  <p className="text-white text-xs">TRIPPLE EVENT-HALL</p>
                </div>
                <div
                  className={`absolute inset-0 bg-black/30 ${
                    currentSlide === index ? "opacity-0" : "opacity-50"
                  }`}></div>
              </motion.div>
            ))}
          </div>

          {/* Navigation Arrows */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-4 z-20">
            <button
              onClick={handlePrev}
              className="w-10 h-10 flex items-center justify-center rounded-full border border-white text-white hover:bg-white hover:text-black transition">
              ←
            </button>
            <button
              onClick={handleNext}
              className="w-10 h-10 flex items-center justify-center rounded-full border border-white text-white hover:bg-white hover:text-black transition">
              →
            </button>
          </div>

          {/* Slide Indicator */}
          <div className="absolute bottom-8 right-8 text-white z-20">
            {String(currentSlide + 1).padStart(2, "0")}
          </div>
        </div>
      </div>
    </div>
  );
}
