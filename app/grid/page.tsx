"use client";

import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Image from "next/image";
import { motion, useMotionValue, useMotionTemplate } from "framer-motion";
import { CanvasRevealEffect } from "@/components/ui/canvas-reveal-effect";

// --- 1. Define your data shapes ---
interface CardItem {
  id: number;
  card_item_value: string;
  card_item_name: string;
}

interface SectionItem {
  id: number;
  item_name: string;
  item_note: string;
  card_items: CardItem[];
}

interface Template {
  id: number;
  template_name: string;
  template_note: string;
  section_items: SectionItem[];
}

const Page = () => {
  // --- 2. Initialize `data` as an array of `Template` ---
  const [data, setData] = useState<Template[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const isValidUrl = (url: string) => {
    try {
      const isAbsolute =
        url.startsWith("http://") || url.startsWith("https://");
      const isRelative = url.startsWith("/");
      return isAbsolute || isRelative;
    } catch {
      return false;
    }
  };

  const fetchData = async () => {
    try {
      setIsSaving(true);
      const response = await axios.post(
        "/api/api",
        {
          sn: "section_template_get_all",
          id: 3,
        },
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.Q9eW!zD0EeL7@ANeyJ1c2VyX2lkIjoiMSIsImlhdCI6MTcxODU5OTU0NywiZXhwIjoxNzUwMTM1NTQ3fQ.muFJPyUNLrjjeHTVI4Vjj-wkHoGJ7YceHPIsDNuhlOQ",
          },
        }
      );
      // now `response.data.result` should be an array of Template
      setData(response.data.result);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsSaving(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (containerRef.current) {
      const { left, top } = containerRef.current.getBoundingClientRect();
      mouseX.set(e.clientX - left);
      mouseY.set(e.clientY - top);
    }
  };

  const maskImage = useMotionTemplate`
    radial-gradient(
      800px circle at ${mouseX}px ${mouseY}px,
      white,
      transparent 70%
    )
  `;

  if (isSaving) return <div className="text-center text-white">Loading...</div>;

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[1000px] flex flex-col justify-center bg-[#0A0A0A] overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Background with subtle gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black to-[#111] opacity-80"></div>

      {/* Spotlight effect */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300"
        style={{
          backgroundColor: "#D4AF37", // Gold color
          opacity: hoveredCard !== null ? 0.35 : 0,
          maskImage: maskImage,
        }}
      >
        <CanvasRevealEffect
          animationSpeed={3}
          containerClassName="bg-transparent absolute inset-0 pointer-events-none"
          colors={[
            [212, 175, 55], // Gold
            [255, 215, 0], // Golden yellow
          ]}
          dotSize={2}
        />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-16">
        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-amber-500 font-serif italic text-2xl mb-6">
            Why Choose Us
          </h2>
          <p className="text-white font-lato text-3xl md:text-4xl font-medium max-w-4xl mx-auto leading-relaxed">
            Эрэлттэй эвентүүдээр шүүж <br /> хайх
          </p>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {data.length > 0 ? (
            data.map((template) => (
              <div key={template.id} className="my-6">
                <h1 className="text-2xl font-bold text-center text-orange-500">
                  {template.template_name}
                </h1>
                <h2 className="text-xl text-center mt-2">
                  {template.template_note}
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
                  {template.section_items.length > 0 ? (
                    template.section_items.map((item) => (
                      <div
                        key={item.id}
                        className="relative rounded-xl group"
                        onMouseEnter={() => setHoveredCard(item.id)}
                        onMouseLeave={() => setHoveredCard(null)}
                      >
                        {item.card_items.length > 0 ? (
                          <div className="h-[300px] w-[200px] relative rounded-lg overflow-hidden">
                            <Image
                              src={
                                isValidUrl(item.card_items[0].card_item_value)
                                  ? item.card_items[0].card_item_value
                                  : "/placeholder.svg"
                              }
                              alt={item.card_items[0].card_item_name}
                              fill
                              className="transition-all duration-500 object-cover group-hover:scale-110"
                            />

                            <motion.div
                              className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent rounded-lg transition-all duration-500"
                              style={{
                                opacity: hoveredCard === item.id ? 0.5 : 0,
                              }}
                            />
                          </div>
                        ) : (
                          <div className="w-full h-48 bg-gray-500 rounded-lg flex items-center justify-center">
                            <span>No Image</span>
                          </div>
                        )}

                        <p className="absolute top-4 left-4 right-4 text-gray-400 text-center">
                          {item.item_note}
                        </p>

                        <h3 className="text-lg font-semibold mt-4 text-center text-white">
                          {item.item_name}
                        </h3>
                      </div>
                    ))
                  ) : (
                    <p className="text-center col-span-4">
                      No items available.
                    </p>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p className="text-center col-span-4">No data available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
