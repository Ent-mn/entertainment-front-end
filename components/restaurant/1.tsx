"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
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

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import RestLogin from "../RestLogin";
import RestForgetPass from "../RestForgetPass";

export default function RestaurantWebsite() {
  const [activeTab, setActiveTab] = useState("all");

  // Navigation links
  const navLinks = [
    { name: "Home", href: "#", active: true },
    { name: "Restaurants", href: "#", active: false },
    { name: "Event Hall", href: "#", active: false },
    { name: "Contact", href: "#", active: false },
  ];

  // Reservation form fields
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

  // Tab options
  const tabOptions = [
    { value: "all", label: "Бүгд" },
    { value: "restaurant", label: "Ресторан" },
    { value: "event-hall", label: "Event Hall" },
    { value: "food-delivery", label: "Гадаа талбай" },
    { value: "catering", label: "Гадаа Асар" },
  ];

  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Hero background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/backround.jpg"
          alt="Restaurant interior"
          fill
          className="object-cover brightness-[0.8]"
          priority
        />
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Header */}
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

            {/* Search */}
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
                  className={`text-white text-sm ${
                    link.active ? "border-b-2 border-amber-500 pb-1" : ""
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline">
                    <User className="w-5 h-5 text-white" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="p-0 border-none w-auto sm:max-w-auto">
                  <RestLogin />
                  <DialogHeader>
                    <DialogTitle></DialogTitle>
                    <DialogDescription></DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
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

        {/* Hero content */}
        <main className="flex-1 gap-8 flex flex-col items-center justify-center text-center px-6 py-12">
          <h1 className="text-4xl md:text-5xl lg:text-[64px] font-bold text-white max-w-4xl mb-6">
            There are many variations of passages of
          </h1>
          <p className="text-gray-300 max-w-2xl mb-16">
            Lorem Ipsum available, but the majority have suffered alteration in
            some form, by injected humour, or randomised words which don't look
            even
          </p>

          {/* Reservation form */}
          <div className="w-full max-w-4xl bg-[#222222]/90 rounded-lg p-6 mt-auto">
            <Tabs
              defaultValue="all"
              className="w-full"
              onValueChange={setActiveTab}
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

              <div className="grid grid-cols-1 md:flex justify-between">
                {reservationFields.map((field, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3  rounded-md p-3"
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
            </Tabs>
          </div>
        </main>
      </div>

      {/* Side icons */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-20">
        <Button
          variant="outline"
          size="icon"
          className="bg-[#333333] border-0 text-amber-500 rounded-full w-10 h-10"
        >
          <Sun className="w-5 h-5" />
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
        <Button
          variant="outline"
          size="icon"
          className="bg-[#333333] border-0 text-white rounded-full w-10 h-10"
        >
          <Headphones className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
}
