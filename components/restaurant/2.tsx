"use client";

import type React from "react";

import Image from "next/image";
import { useMotionValue, motion, useMotionTemplate } from "framer-motion";
import { useState, useRef } from "react";
import { CanvasRevealEffect } from "@/components/ui/canvas-reveal-effect";

export default function FeaturesSection() {
  // State to track which card is being hovered and mouse position
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Feature data
  const features = [
    {
      image: "/hurim1.png",
      title: "Хурим",
      description: "Lorem Ipsum is simply dummy text of the",
    },
    {
      image: "/hurim2.png",
      title: "Хурим",
      description: "Lorem Ipsum is simply dummy text of the",
    },
    {
      image: "/hurim3.png",
      title: "Хурим",
      description: "Lorem Ipsum is simply dummy text of the",
    },
    {
      image: "/hurim4.png",
      title: "Хурим",
      description: "Lorem Ipsum is simply dummy text of the",
    },
  ];

  // Handle mouse movement over the container
  const handleMouseMove = (e: React.MouseEvent) => {
    if (containerRef.current) {
      const { left, top } = containerRef.current.getBoundingClientRect();
      mouseX.set(e.clientX - left);
      mouseY.set(e.clientY - top);
    }
  };

  // Create the mask image template once
  const maskImage = useMotionTemplate`
    radial-gradient(
      800px circle at ${mouseX}px ${mouseY}px,
      white,
      transparent 70%
    )
  `;

  return (
    <div
      ref={containerRef}
      className="relative w-full min-h-screen flex flex-col justify-center bg-[#0A0A0A] overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Background with subtle gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black to-[#111] opacity-80"></div>

      {/* Spotlight effect on background - always rendered but opacity controlled by hoveredCard */}
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
          <p className="text-white text-3xl md:text-4xl font-medium max-w-4xl mx-auto leading-relaxed">
            Lorem Ipsum is simply dummy
          </p>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="relative overflow-hidden rounded-lg group"
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
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
      </div>
    </div>
  );
}
