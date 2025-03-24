"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import {
  Search,
  User,
  Sun,
  ShoppingCart,
  Heart,
  Headphones,
  Calendar,
  Clock,
  MapPin,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ThemeToggle from "@/components/ThemeToggle";
import ChatInput from "@/components/chat/Bot";

interface Restaurant {
  id: number;
  name: string;
  merchant_name: string;
  product_images: Array<{ image_url: string }>;
  product_details: Array<{ price: number }>;
}

export default function RestaurantWebsite() {
  const [activeTab, setActiveTab] = useState("all");
  const [restaurantData, setRestaurantData] = useState<Restaurant[] | null>(null);

  const navLinks = [
    { name: "Home", href: "#", active: true },
    { name: "Restaurants", href: "#", active: false },
    { name: "Event Hall", href: "#", active: false },
    { name: "Contact", href: "#", active: false },
  ];

  const reservationFields = [
    {
      icon: <Users className="w-5 h-5" />,
      label: "Зочид",
      placeholder: "Та хэдэн хүн бодож байна?",
    },
    {
      icon: <Calendar className="w-5 h-5" />,
      label: "Хаана",
      placeholder: "Та хаана гэж бодож байна?",
    },
    {
      icon: <Clock className="w-5 h-5" />,
      label: "Цаг",
      placeholder: "Та хэдэд гэж бодож байна?",
    },
    {
      icon: <MapPin className="w-5 h-5" />,
      label: "Хаана",
      placeholder: "Та хаана гэж бодож байна?",
    },
  ];

  const tabOptions = [
    { value: "all", label: "Бүгд" },
    { value: "restaurant", label: "Ресторан" },
    { value: "event-hall", label: "Event Hall" },
    { value: "food-delivery", label: "Гадаа талбай" },
    { value: "catering", label: "Гадаа Асар" },
  ];

  const fetchRestaurants = async () => {
    try {
      const { data } = await axios.post("/api/api_open", {
        sn: "product_list_all",
        is_hot_deal: 1,
        page_number: 1,
        page_size: 10,
      });
      setRestaurantData(data.result);
    } catch (error) {
      console.error("Error fetching restaurant data:", error);
    }
  };

  const handleTabChange = (value: any) => {
    setActiveTab(value);
    if (value === "restaurant") {
      fetchRestaurants();
    } else {
      setRestaurantData(null);
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col">
      <div className="absolute inset-0 z-0">
        <Image
          src="/backround.jpg"
          alt="Restaurant interior"
          fill
          className="object-cover brightness-[0.8]"
          priority
        />
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        <header className="py-4 px-6 bg-[#00000080] md:px-[150px]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Image
                alt="Restaurant interior"
                width={30}
                height={30}
                priority
                src="/Logo.svg"
              />
              <span className="text-white font-medium">restaurant.mn</span>
            </div>

            <div className="hidden md:flex items-center bg-[#333333]/80 rounded-md px-3 py-1 w-full max-w-[665px] mx-8">
              <div className="flex items-center gap-2 border-r border-gray-500 pr-2">
                <span className="text-white text-sm">Төрөл</span>
                <svg
                  className="w-4 h-4 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
              <Search className="w-5 h-5 text-gray-400 mx-2" />
              <Input
                type="text"
                placeholder="Хайлт"
                className="bg-transparent border-0 text-white focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-gray-400"
              />
            </div>

            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-white w-fit text-sm ${
                    link.active ? "border-b-2 border-amber-500 pb-1" : ""
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <User className="w-5 h-5 text-white" />
            </nav>

            <button className="md:hidden text-white">
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </header>

        <main className="flex-1 gap-8 flex flex-col items-center justify-center text-center px-6 py-12">
          <h1 className="text-4xl md:text-5xl lg:text-[64px] font-bold text-white max-w-8xl mb-6">
            There are many variations of passages of
          </h1>
          <p className="text-gray-300 max-w-2xl mb-16">
            Lorem Ipsum available, but the majority have suffered alteration in
            some form, by injected humour, or randomised words which don't look
            even
          </p>

          <div className="w-full max-w-4xl bg-[#222222]/90 rounded-lg p-6 mt-auto">
            <Tabs
              defaultValue="all"
              className="w-full"
              onValueChange={handleTabChange}
            >
              <TabsList className="bg-transparent border-b border-gray-700 rounded-none w-full justify-start mb-6 gap-8">
                {tabOptions.map((tab) => (
                  <TabsTrigger
                    key={tab.value}
                    value={tab.value}
                    className={`text-gray-400 data-[state=active]:text-amber-500 data-[state=active]:border-b-2 data-[state=active]:border-amber-500 rounded-none pb-2 px-0 mx-2`}
                  >
                    {tab.label}
                  </TabsTrigger>
                ))}
              </TabsList>

              {activeTab === "restaurant" && restaurantData ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {restaurantData.slice(0, 10).map((restaurant) => (
                    <div
                      key={restaurant.id}
                      className="bg-[#333333]/50 rounded-lg p-4"
                    >
                      <Image
                        src="/backround.jpg"
                        alt={restaurant.name}
                        width={400}
                        height={200}
                        className="object-cover rounded-md mb-4"
                        onError={(e) => {
                          console.log(
                            `Failed to load: ${restaurant.product_images[0]?.image_url}`
                          );
                          (e.target as HTMLImageElement).src = "/fallback-image.jpg";
                        }}
                        onLoad={() =>
                          console.log(
                            `Loaded: ${restaurant.product_images[0]?.image_url}`
                          )
                        }
                      />
                      <h3 className="text-white text-lg">{restaurant.name}</h3>
                      <p className="text-gray-400 text-sm">
                        {restaurant.merchant_name}
                      </p>
                      <p className="text-amber-500 text-sm mt-2">
                        Starting at ₮
                        {Math.min(
                          ...restaurant.product_details.map((d) => d.price)
                        ).toLocaleString()}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:flex justify-between">
                  {reservationFields.map((field, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 rounded-md p-3"
                    >
                      {field.icon}
                      <div className="flex flex-col">
                        <span className="text-xs text-gray-400">
                          {field.label}
                        </span>
                        <span className="text-[7px] text-gray-500">
                          {field.placeholder}
                        </span>
                      </div>
                    </div>
                  ))}
                  <Button className="bg-gradient-to-b from-[#fd8e2e] to-[#f5be32] w-[67px] h-[67px] hover:opacity-80 text-white rounded-xl">
                    <Search className="w-5 h-5" />
                  </Button>
                </div>
              )}
            </Tabs>
          </div>
        </main>
      </div>

      <div className="fixed right-6 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-20">
        <Button
          variant="outline"
          size="icon"
          className="bg-[#333333] border-0 text-amber-500 rounded-full w-10 h-10"
        >
          <ThemeToggle />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="bg-[#333333] border-0 text-white rounded-full w-10 h-10"
        >
          <ShoppingCart className="w-5 h-5" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="bg-[#333333] border-0 text-white rounded-full w-10 h-10"
        >
          <Heart className="w-5 h-5" />
        </Button>
      </div>
      <ChatInput />
    </div>
  );
}
