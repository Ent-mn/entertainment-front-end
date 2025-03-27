"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function RestaurantSection() {
  const [mounted, setMounted] = useState(false);

  // Ensure the component is mounted before rendering to avoid hydration issues
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="relative w-full bg-[#191919]  text-white min-h-screen flex items-center justify-center py-16">
      <div className="container mx-auto px-4 md:px-8 lg:px-12 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="relative">
            <div className="absolute top-0 left-0 w-4 h-32 bg-amber-500" />
            <div className="relative overflow-hidden rounded-md">
              <Image
                src="/uul.jpg"
                alt="Elegant restaurant interior with warm lighting and comfortable seating"
                width={600}
                height={500}
                className="w-full h-[615px] object-cover"
                style={{
                  backgroundColor: "#1a1a1a",
                  filter: "brightness(0.9) contrast(1.1)",
                }}
              />
            </div>
          </div>

          <div className="space-y-6 z-50">
            <h3 className="text-amber-500 font-serif italic text-xl">
              Why Choose Us
            </h3>

            <h2 className="text-3xl md:text-4xl font-bold leading-tight">
              Lorem Ipsum is simply dummy text of the printing and typesetting
            </h2>

            <p className="text-gray-300 leading-relaxed">
              There are many variations of passages of Lorem Ipsum available,
              but the majority have suffered alteration in some form, by
              injected humour, or randomised words which don&apos;t look even
              slightly believable. If you are going to use a passage of Lorem
              Ipsum, you need to be sure there isn&apos;t anything embarrassing
              hidden in the middle of text. All the Lorem Ipsum generators on
              the
            </p>

            <div className="grid grid-cols-2 gap-8 pt-6">
              <div>
                <h3 className="text-4xl md:text-5xl font-bold text-white">
                  120<span className="text-amber-500">+</span>
                </h3>
                <p className="text-gray-300 mt-2">Lorem Ipsum</p>
              </div>

              <div>
                <h3 className="text-4xl md:text-5xl font-bold text-white">
                  4.9
                </h3>
                <p className="text-gray-300 mt-2">Lorem Ipsum</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
