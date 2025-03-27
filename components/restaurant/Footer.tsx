"use client";

import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, MapPin, Phone } from "lucide-react";
import Image from "next/image";

export default function RestaurantHorizontalSlider() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);

  // Sample image data - 6 images for the slider
  const images = [
    {
      id: 1,
      src: "uul.jpg",
      alt: "Elegant dining hall with fairy lights ceiling",
      title: "Lorem Ipsum is simply dummy text of the printing and",
      date: "20.03.2025",
    },
    {
      id: 2,
      src: "5cover1.jpg",
      alt: "Couple at elegant bar counter",
      title: "Lorem Ipsum is simply dummy text of the printing and",
      date: "20.03.2025",
    },
    {
      id: 3,
      src: "uul.jpg",
      alt: "Restaurant with chandeliers and city view",
      title: "Lorem Ipsum is simply dummy text of the printing and",
      date: "20.03.2025",
    },
    {
      id: 4,
      src: "5cover1.jpg",
      alt: "Outdoor dining area with greenery",
      title: "Lorem Ipsum is simply dummy text of the printing and",
      date: "20.03.2025",
    },
    {
      id: 5,
      src: "uul.jpg",
      alt: "Waterfront dining with sunset view",
      title: "Lorem Ipsum is simply dummy text of the printing and",
      date: "20.03.2025",
    },
    {
      id: 6,
      src: "5cover1.jpg",
      alt: "Private dining room with elegant decor",
      title: "Lorem Ipsum is simply dummy text of the printing and",
      date: "20.03.2025",
    },
  ];

  // Function to scroll left
  const scrollLeft = () => {
    if (sliderRef.current) {
      const containerWidth = sliderRef.current.clientWidth;
      const itemWidth = sliderRef.current.scrollWidth / images.length;
      const newPosition = scrollPosition - itemWidth;

      // If at the beginning, loop to the end
      if (newPosition < 0) {
        const maxScroll = sliderRef.current.scrollWidth - containerWidth;
        setScrollPosition(maxScroll);
        sliderRef.current.scrollTo({ left: maxScroll, behavior: "smooth" });
      } else {
        setScrollPosition(newPosition);
        sliderRef.current.scrollTo({ left: newPosition, behavior: "smooth" });
      }
    }
  };

  // Function to scroll right
  const scrollRight = () => {
    if (sliderRef.current) {
      const containerWidth = sliderRef.current.clientWidth;
      const itemWidth = sliderRef.current.scrollWidth / images.length;
      const newPosition = scrollPosition + itemWidth;
      const maxScroll = sliderRef.current.scrollWidth - containerWidth;

      // If at the end, loop to the beginning
      if (newPosition > maxScroll) {
        setScrollPosition(0);
        sliderRef.current.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        setScrollPosition(newPosition);
        sliderRef.current.scrollTo({ left: newPosition, behavior: "smooth" });
      }
    }
  };

  // Auto-scroll every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      scrollRight();
    }, 5000);

    return () => clearInterval(interval);
  }, [scrollPosition]);

  return (
    <div className="bg-black relative text-white min-h-screen flex flex-col">
      <main className="flex-1">
        <div className="container mx-auto px-4 py-16">
          {/* Header */}
          <h2 className="text-2xl md:text-3xl font-bold mb-8">
            Мэдээ мэдээлэл
          </h2>

          {/* Image Slider */}
          <div className="relative">
            <div
              ref={sliderRef}
              className="flex overflow-x-auto gap-4 pb-4 hide-scrollbar snap-x snap-mandatory"
              style={{ scrollBehavior: "smooth" }}
            >
              {images.map((image) => (
                <div
                  key={image.id}
                  className="min-w-[280px] md:min-w-[320px] snap-start"
                >
                  <div className="aspect-[4/3] relative rounded-md overflow-hidden mb-3">
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-500 hover:scale-105"
                      style={{
                        backgroundImage: `url(${image.src})`,
                        backgroundPosition: `${(image.id % 5) * 25}% center`,
                      }}
                    />
                  </div>
                  <h3 className="font-medium text-sm md:text-base line-clamp-2">
                    {image.title}
                  </h3>
                  <p className="text-gray-400 text-sm mt-1">{image.date}</p>
                </div>
              ))}
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-center mt-6 gap-4">
              <button
                onClick={scrollLeft}
                className="w-10 h-10 rounded-full border border-gray-600 flex items-center justify-center hover:bg-gray-800 transition-colors"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={scrollRight}
                className="w-10 h-10 rounded-full border border-gray-600 flex items-center justify-center hover:bg-gray-800 transition-colors"
                aria-label="Next slide"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-800 mt-12">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div className="mb-6 md:mb-0">
              <div className="flex items-center gap-2">
                <Image
                  className="w-4 object-cover h-4"
                  alt="restaurant.mn logo"
                  width={4}
                  height={4}
                  src="/logo.png"
                />
                <span className="text-lg font-medium">restaurant.mn</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-400">
              <a href="#" className="hover:text-white transition-colors">
                Алл татах
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Ажлын байр
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Тусламж
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Ресторанууд
              </a>
            </div>

            <div className="mt-6 md:mt-0">
              <h4 className="text-sm font-medium mb-2">Холбоо барих:</h4>
              <div className="flex items-center gap-2 text-sm text-gray-400 mb-1">
                <MapPin className="w-4 h-4" />
                <span>
                  Wisconsin Ave, Suite 700
                  <br />
                  Chevy Chase, Maryland 20815
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Phone className="w-4 h-4" />
                <span>+1 891 989-11-91</span>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-gray-500 mb-4 md:mb-0">
              © 2021 All Rights Reserved
            </div>
            <div className="flex gap-4 text-sm">
              <a
                href="#"
                className="text-gray-500 hover:text-white transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-gray-500 hover:text-white transition-colors"
              >
                Terms of Use
              </a>
              <a
                href="#"
                className="text-gray-500 hover:text-white transition-colors"
              >
                Sales and Refunds
              </a>
              <a
                href="#"
                className="text-gray-500 hover:text-white transition-colors"
              >
                Legal
              </a>
              <a
                href="#"
                className="text-gray-500 hover:text-white transition-colors"
              >
                Site Map
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Custom CSS for hiding scrollbar */}
      <style jsx global>{`
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}
