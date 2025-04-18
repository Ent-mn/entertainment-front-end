"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  User,
  UserPen,
  Search,
  Sun,
  ShoppingCart,
  Heart,
  Headphones,
  Calendar,
  Clock,
  MapPin,
  Users,
  Briefcase,
  Receipt,
  HelpCircle,
  LogOut,
  LightbulbIcon,
  Wallet,
} from "lucide-react";
import { useUser } from "@/context/UserContext";

interface ProfileSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    coverImage?: string;
  };
}

export function ProfileSettingsModal({
  isOpen,
  onClose,
  profile,
}: ProfileSettingsModalProps) {
  const [selectedTab, setSelectedTab] = useState("account"); // "account" | "security"
  const { user, isLoggedIn, logout } = useUser();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="flex w-[90vw] justify-between items-center absolute top-8 z-10">
        <div className="text-4xl gap-5 flex items-center font-extrabold text-white">
          <UserPen className="text-[#F5be32] w-[35px] h-[35px] " />
          Profile
          <p className="text-[#f5be32]">.</p>
        </div>
        <button
          onClick={onClose}
          className="relative w-10 h-10 flex items-center justify-center hover:opacity-80 transition-opacity"
        >
          <div className="absolute inset-0 border-2 border-[#F5BE32] rounded-full"></div>
          <svg
            className="w-5 h-5 text-[#F5BE32]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
      <div className="relative w-[90vw]  top-10 flex justify-between h-[90vh] bg-[#121212] rounded-lg shadow-xl overflow-hidden">
        {/* Header with close button */}

        <div className="p-[30px] w-[300px] border-r-[1px] border-[#939393] pt-[43px]">
          <div className="flex justify-center text-center">
            <div className="flex items-center gap-2">
              <Image
                alt="Restaurant logo"
                width={30}
                height={30}
                priority
                src="/Logo.svg"
              />
              <span className="text-white text-base font-medium">
                Restaurant.mn
              </span>
            </div>
          </div>
          <div className="pt-[70px] flex flex-col gap-[44px]">
            <button className="w-full text-start px-2 py-2 text-xl text-white rounded-lg transition-all duration-300 hover:bg-gradient-to-r hover:from-amber-500/20 hover:to-transparent flex items-center gap-[22px]">
              <User className="w-5 h-5" />
              Profile
            </button>
            <button className="w-full text-start py-2 px-2 text-xl text-white rounded-lg transition-all duration-300 hover:bg-gradient-to-r hover:from-amber-500/20 hover:to-transparent flex items-center gap-[22px]">
              {" "}
              <Heart className="w-5 h-5" />
              Таалагдсан
            </button>
            <Link href="/orders" className="w-full">
              <button className="w-full text-start py-2 px-2 text-xl text-white rounded-lg transition-all duration-300 hover:bg-gradient-to-r hover:from-amber-500/20 hover:to-transparent flex items-center gap-[22px]">
                <ShoppingCart className="w-5 h-5" />
                Миний захиалгууд
              </button>
            </Link>
            <Link href="/business" className="w-full">
              <button className="w-full text-start py-2 px-2 text-xl text-white rounded-lg transition-all duration-300 hover:bg-gradient-to-r hover:from-amber-500/20 hover:to-transparent flex items-center gap-[22px]">
                <Briefcase className="w-5 h-5" />
                My business
              </button>
            </Link>
            <Link href="/wallet" className="w-full">
              <button className="w-full text-start py-2 px-2 text-xl text-white rounded-lg transition-all duration-300 hover:bg-gradient-to-r hover:from-amber-500/20 hover:to-transparent flex items-center gap-[22px]">
                <Wallet className="w-5 h-5" />
                Миний хэтэвч
              </button>
            </Link>
            <Link href="/help" className="w-full">
              <button className="w-full text-start py-2 px-2 text-xl text-white rounded-lg transition-all duration-300 hover:bg-gradient-to-r hover:from-amber-500/20 hover:to-transparent flex items-center gap-[22px]">
                <HelpCircle className="w-5 h-5" />
                Тусламж
              </button>
            </Link>
          </div>
        </div>
        <div className="flex relative flex-col w-[72vw]">
          <div className="absolute w-full top-24 h-[30vh]">
            <Image
              src={profile.coverImage || "/default-cover.jpg"}
              alt="Cover"
              fill
              className="object-cover"
            />
            <button className="absolute bottom-4 right-4 bg-white/10 backdrop-blur-md text-white px-4 py-2 rounded-lg text-sm hover:bg-white/20 transition-colors">
              Change Cover
            </button>
          </div>

          {/* Profile Content */}
          <div className="absolute w-[72vw] bottom-2 top-100px z-10">
            <div className="flex w-[72vw] justify-evenly ">
              {/* Profile Image and Stats */}
              <div className="flex flex-col items-center w-[276px] rounded-2xl py-[33px] px-4 h-[620px] bg-[#191919] gap-8">
                <div className="relative">
                  <Image
                    src="/bold.png"
                    alt="Profile"
                    width={105}
                    height={105}
                    className="rounded-full w-[105px] h-[105px]"
                  />
                </div>
                <div className="text-center">
                  <h3 className="text-white text-xl">Bold Dorjsuren</h3>
                  <p className="text-gray-400 text-base">Броски</p>
                </div>
                <div className="flex flex-col w-[245px] gap-4 text-center text-white">
                  <div className="flex justify-between">
                    <div className="text-base text-gray-400">
                      Идвэхтэй захиалга
                    </div>
                    <div className="text-amber-500">4</div>
                  </div>
                  <div className="flex justify-between">
                    <div className="text- text-gray-400">
                      Гүйцэтгэсэн захиалга
                    </div>
                    <div className="text-amber-500">1</div>
                  </div>
                  <div className="flex justify-between">
                    <div className="text-base text-gray-400">Follower</div>
                    <div className="text-amber-500">35</div>
                  </div>
                  <div className="flex justify-between">
                    <div className="text-base text-gray-400">
                      Гүйцэтгэсэн захиалга
                    </div>
                    <div className="text-amber-500">0</div>
                  </div>
                  <button
                    onClick={() => {
                      logout();
                    }}
                    className="w-full mt-[100px] text-start py-2 px-2 text-xl  text-white rounded-lg transition-all duration-300 hover:bg-gradient-to-r hover:from-amber-500/20 hover:to-transparent flex items-center gap-2 justify-center"
                  >
                    <LogOut className="w-5 h-5" />
                    Sign out
                  </button>
                </div>
              </div>
              <div className="flex flex-col bg-[#1A1A1A] w-[1044px] bottom-4 h-[620px] rounded-xl p-8">
                <div className="flex gap-6 mb-8">
                  <button
                    className={`px-6  rounded-lg text-base ${
                      selectedTab === "account" ? "text-white" : "text-gray-400"
                    }`}
                    onClick={() => setSelectedTab("account")}
                  >
                    Account settings
                  </button>
                  <button
                    className={`px-6 rounded-lg text-base ${
                      selectedTab === "security"
                        ? "bg-amber-500 text-white"
                        : "text-gray-400"
                    }`}
                    onClick={() => setSelectedTab("security")}
                  >
                    Security settings
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <label className="text-gray-400 text-base">Овог</label>
                    <input
                      type="text"
                      className="w-full bg-[#333333] rounded-lg p-3 text-white "
                      placeholder="Дорж"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-gray-400 text-base">Нэр</label>
                    <input
                      type="text"
                      className="w-full bg-[#333333] rounded-lg p-3 text-white "
                      placeholder="Болд"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-gray-400 text-base">Утас</label>
                    <div className="relative">
                      <input
                        type="text"
                        className="w-full bg-[#333333] rounded-lg p-3 text-white "
                        placeholder="Selected"
                      />
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 bg-amber-500 w-8 h-8 rounded-full flex items-center justify-center">
                        ✓
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <label className="text-gray-400 ">Хот</label>
                    <input
                      type="text"
                      className="w-full bg-[#333333] rounded-lg p-3 text-white "
                      placeholder="Not selected Corner radius 8"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-gray-400 ">Дүүрэг</label>
                    <input
                      type="text"
                      className="w-full bg-[#333333] rounded-lg p-3 text-white "
                      placeholder="Not selected"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-gray-400 ">Хороо</label>
                    <input
                      type="text"
                      className="w-full bg-[#333333] rounded-lg p-3 text-white"
                      placeholder="Not selected"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-gray-400">Хаяг</label>
                    <input
                      type="text"
                      className="w-full bg-[#333333] rounded-lg p-3 text-white text-base"
                      placeholder="Not selected Corner radius 8"
                    />
                  </div>
                </div>

                <button className="mt-8 w-[145px] bg-gradient-to-r from-[#EAC947] to-[#F6A253] text-white py-3 rounded-lg hover:opacity-90 transition-opacity text-base">
                  Хадгалах
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
