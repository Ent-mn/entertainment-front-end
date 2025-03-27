"use client";

import type React from "react";
import Image from "next/image";
import { useState, useRef } from "react";
import { useMotionValue, motion, useMotionTemplate } from "framer-motion";
import { CanvasRevealEffect } from "@/components/ui/canvas-reveal-effect";
import PaymentModal from "./PaymentModal";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Feature {
  image: string;
  title: string;
  description: string;
}

export default function FeaturesSection() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const [cart, setCart] = useState<Feature[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const features = [
    { image: "/hurim1.png", title: "Хурим", description: "1" },
    { image: "/hurim2.png", title: "Хурим", description: "2" },
    { image: "/hurim3.png", title: "Хурим", description: "3" },
    { image: "/hurim4.png", title: "Хурим", description: "4" },
  ];

  // 🖱️ Хулгана хөдөлгөөн хянах
  const handleMouseMove = (e: React.MouseEvent) => {
    if (containerRef.current) {
      const { left, top } = containerRef.current.getBoundingClientRect();
      mouseX.set(e.clientX - left);
      mouseY.set(e.clientY - top);
    }
  };

  const maskImage = useMotionTemplate`
    radial-gradient(800px circle at ${mouseX}px ${mouseY}px, white, transparent 70%)
  `;

  // ➕ Сагсанд нэмэх
  const handleAddToCart = (feature: Feature) => {
    setCart((prev) => [...prev, feature]);
  };

  // 🛒 Сагсны popup харуулах/хаах
  const toggleCart = () => setIsCartOpen((prev) => !prev);

  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);
  const handleConfirm = () => {
    console.log("Payment confirmed");
    setIsOpen(false);
  };

  const mockData = {
    venue: "SHANGRI-LA ULAANBAATAR",
    type: "Event Hall",
    location: "СБД, 1-р хороо, Замчдын гудамж, Юуны өргөн чөлөө, 1",
    eventType: "Хурим",
    eventDate: "2024.10.03",
    eventTime: "18:00 - 23:00",
    menuPrice: 240000,
    guestsCount: 260,
    totalMenuPrice: 62400000,
    additionalFee: 500000,
    totalPrice: 62900000,
    vat: 6290000,
    grandTotal: 69190000,
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full min-h-screen flex flex-col justify-center bg-[#0A0A0A] px-28"
      onMouseMove={handleMouseMove}>
      {/* Background with spotlight effect */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300"
        style={{
          backgroundColor: "#D4AF37",
          opacity: hoveredCard !== null ? 0.35 : 0,
          maskImage: maskImage,
        }}>
        <CanvasRevealEffect
          animationSpeed={3}
          containerClassName="bg-transparent absolute inset-0 pointer-events-none"
          colors={[
            [212, 175, 55],
            [255, 215, 0],
          ]}
          dotSize={2}
        />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h2 className="text-amber-500 font-serif italic text-2xl mb-6">
            Why Choose Us
          </h2>
          <p className="text-white text-3xl md:text-4xl font-medium max-w-4xl mx-auto leading-relaxed">
            Lorem Ipsum is simply dummy
          </p>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="relative overflow-hidden rounded-lg group cursor-pointer"
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
              onClick={() => handleAddToCart(feature)}>
              <div className="h-[400px] relative">
                <Image
                  src={feature.image || "/placeholder.svg"}
                  alt={feature.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="text-xl font-medium mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-200">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>

        <Tabs defaultValue="news" className="w-full px-30 py-10">
          <TabsList className=" w-[600px]  rounded-none bg-transparent ">
            <TabsTrigger
              value="news"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-amber-500 data-[state=active]:bg-transparent data-[state=active]:shadow-none text-white ">
              NEWS FEED
            </TabsTrigger>
            <TabsTrigger
              value="bio"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-amber-500 data-[state=active]:bg-transparent data-[state=active]:shadow-none text-white ">
              BIO
            </TabsTrigger>
            <TabsTrigger
              value="events"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-amber-500 data-[state=active]:bg-transparent data-[state=active]:shadow-none text-white ">
              EVENTS
            </TabsTrigger>
            <TabsTrigger
              value="gallery"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-amber-500 data-[state=active]:bg-transparent data-[state=active]:shadow-none text-white ">
              GALLERY
            </TabsTrigger>
            <TabsTrigger
              value="menu"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-amber-500 data-[state=active]:bg-transparent data-[state=active]:shadow-none text-white ">
              MENU
            </TabsTrigger>
          </TabsList>
          <TabsContent value="news" className="mt-4 flex gap-4 ">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className=" text-white bg-[#121212]  rounded-xl overflow-hidden">
                  <div className="h-48 relative">
                    <Image
                      src={`/image copy 7.png`}
                      alt={`News ${item}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold mb-2 dark:text-white">
                      Тусгай үйл ажиллагаа {item}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Тусгай үйл ажиллагааны талаарх мэдээлэл энд байршина.
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="bio">
            <div className="text-white bg-[#121212] p-6 rounded-lg shadow">
              <h2 className="text-xl font-bold mb-4 dark:text-white">
                Ресторан тухай
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                Энэхүү ресторан нь 2010 онд байгуулагдсан бөгөөд олон улсын
                стандартад нийцсэн үйлчилгээг үзүүлж байна. Манай ресторан нь
                өндөр чанартай хоол, уух зүйлс, таатай орчин, мэргэжлийн
                үйлчилгээгээрээ алдартай.
              </p>
            </div>
          </TabsContent>
          <TabsContent value="events">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4].map((item) => (
                <div
                  key={item}
                  className="bg-[#121212] rounded-lg shadow overflow-hidden">
                  <div className="h-48 relative">
                    <Image
                      src={`/image copy 7.png`}
                      alt={`Event ${item}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold mb-2 text-white">
                      Үйл ажиллагаа {item}
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400">
                      2024.11.{10 + item} | 18:00
                    </p>
                    <p className="text-gray-600 dark:text-gray-300 mt-2">
                      Тусгай үйл ажиллагааны талаарх мэдээлэл энд байршина.
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="gallery">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                <div
                  key={item}
                  className="aspect-square relative rounded-lg overflow-hidden">
                  <Image
                    src={`/image copy 7.png`}
                    alt={`Gallery ${item}`}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="menu">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  category: "Үндсэн хоол",
                  items: ["Хуурсан мах", "Тахиан махтай паста", "Далайн хоол"],
                },
                {
                  category: "Салад",
                  items: ["Цезарь салад", "Грек салад", "Жимсний салад"],
                },
                {
                  category: "Амттан",
                  items: ["Шоколадтай бялуу", "Зүсмэл жимс", "Мөсөн кофе"],
                },
                {
                  category: "Ундаа",
                  items: ["Дарс", "Коктейль", "Жимсний шүүс"],
                },
              ].map((menu, index) => (
                <div key={index} className="bg-gray-900 p-6 rounded-lg shadow">
                  <h3 className="text-lg font-bold mb-4 text-white">
                    {menu.category}
                  </h3>
                  <ul className="space-y-3">
                    {menu.items.map((item, idx) => (
                      <li key={idx} className="flex justify-between">
                        <span className="text-white">{item}</span>
                        <span className="text-gray-500">
                          {Math.floor(Math.random() * 50 + 20) * 1000} ₮
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* 🛒 Cart button */}
        <button
          // onClick={() => setIsOpen(true)}
          onClick={handleOpen}
          className="fixed bottom-80 right-5 bg-amber-500 text-white px-4 py-2 rounded-full"
          // onClick={toggleCart}
        >
          🛒 {cart.length}
        </button>

        <PaymentModal
        // isOpen={isOpen}
        // onClose={() => setIsOpen(false)}
        // data={mockData}
        // onClose={handleClose}
        />
        {/* 🛒 Cart Popup */}
        {/* {isCartOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-16 right-5 w-[350px] bg-[#1A1A1A] border border-gray-700 rounded-lg shadow-lg p-4">
            <h3 className="text-xl text-white mb-4">Миний сагс</h3>
            {cart.map((item, index) => (
              <div key={index} className="flex items-center gap-4 mb-2">
                <Image
                  src={item.image}
                  alt={item.title}
                  width={50}
                  height={50}
                  className="rounded-lg"
                />
                <div>
                  <p className="text-white font-medium">{item.title}</p>
                  <p className="text-gray-400 text-sm">{item.description}</p>
                </div>
              </div>
            ))}
            <button
              className="mt-4 w-full bg-amber-500 text-white py-2 rounded-lg"
              onClick={() => alert("Захиалга хийгдлээ!")}>
              Төлбөр төлөх
            </button>
          </motion.div>
        )} */}
      </div>
    </div>
  );
}
