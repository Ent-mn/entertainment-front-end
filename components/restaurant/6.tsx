"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function RestaurantSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);

  // Sample slider data with 4 images
  const slides = [
    {
      id: 1,
      image: "/uul.jpg",
      title: "There are many variations",
      description:
        "Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even",
      buttonText: "дэлгэрэнгүй",
    },
    {
      id: 2,
      image: "uul.jpg",
      title: "Elegant Dining Experience",
      description:
        "Enjoy our carefully crafted menu in an atmosphere of refined luxury and exceptional service",
      buttonText: "Learn More",
    },
    {
      id: 3,
      image: "uul.jpg",
      title: "Perfect for Special Events",
      description:
        "Our venue offers the ideal setting for weddings, corporate events, and private celebrations",
      buttonText: "Book Now",
    },
    {
      id: 4,
      image: "uul.jpg",
      title: "Award-Winning Cuisine",
      description:
        "Experience the culinary masterpieces created by our team of internationally recognized chefs",
      buttonText: "View Menu",
    },
  ];

  // Function to go to next slide
  const nextSlide = () => {
    setDirection(1);
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  // Function to go to previous slide
  const prevSlide = () => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  // Auto-advance slides every 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      nextSlide();
    }, 5000);

    return () => clearTimeout(timer);
  }, [currentSlide]);

  // Animation variants
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -1000 : 1000,
      opacity: 0,
    }),
  };

  return (
    <div className="bg-black relative text-white min-h-screen">
      <div className="container mx-auto px-4 py-16 max-w-7xl">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h3 className="text-amber-500 font-serif italic text-xl mb-4">
            Why Choose Us
          </h3>

          <div className="flex items-center justify-center gap-4">
            <div className="h-px bg-gray-700 w-24" />
            <h2 className="text-3xl md:text-4xl font-bold">
              Lorem Ipsum is simply dummy
            </h2>
            <div className="h-px bg-gray-700 w-24" />
          </div>
        </div>

        {/* Slider Section */}
        <div className="relative w-full h-[500px] rounded-lg overflow-hidden">
          {/* Left Navigation Button */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-black/30 backdrop-blur-sm p-2 rounded-full hover:bg-black/50 transition-colors"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>

          {/* Right Navigation Button */}
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-black/30 backdrop-blur-sm p-2 rounded-full hover:bg-black/50 transition-colors"
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>

          {/* Slides */}
          <AnimatePresence initial={false} custom={direction} mode="popLayout">
            <motion.div
              key={currentSlide}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
              className="absolute inset-0"
            >
              {/* Slide Background Image */}
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: `url('${slides[currentSlide].image}')`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />

              {/* Dark Overlay */}
              <div className="absolute inset-0 bg-black/40" />

              {/* Slide Content */}
              <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
                <h3 className="text-2xl md:text-3xl font-bold mb-2">
                  {slides[currentSlide].title}
                </h3>
                <p className="text-gray-200 mb-6 max-w-lg">
                  {slides[currentSlide].description}
                </p>
                <button className="px-6 py-2 bg-black/50 backdrop-blur-sm rounded-full border border-gray-600 hover:bg-black/70 transition-colors">
                  {slides[currentSlide].buttonText}
                </button>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Slide Indicators */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setDirection(index > currentSlide ? 1 : -1);
                  setCurrentSlide(index);
                }}
                className={`w-2 h-2 rounded-full transition-all ${
                  currentSlide === index ? "bg-amber-500 w-4" : "bg-white/50"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
