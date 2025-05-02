"use client";

import { useState, useEffect } from "react";
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
  Bell,
  Eye,
  EyeOff,
} from "lucide-react";
import { useUser } from "@/context/UserContext";
import axios from "axios";
import { toast } from "react-toastify";
import { FavoritesTab } from "./FavoritesTab";
import { InboxTab } from "./InboxTab";
import { WalletTab } from "./WalletTab";
import { OrderTab } from "./OrderTab";

interface ProfileSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: {
    customer_name: string;
    org_name: string;
    email: string;
    phone: string;
    coverImage?: string;
  };
  initialView?: "profile" | "favorites" | "inbox" | "wallet" | "orders";
}

type MainTabType = "profile" | "favorites" | "inbox" | "wallet" | "orders";
type SettingsTabType = "account" | "security";

export function ProfileSettingsModal({
  isOpen,
  onClose,
  profile,
  initialView = "profile",
}: ProfileSettingsModalProps) {
  const [selectedTab, setSelectedTab] = useState<MainTabType>(initialView);
  const [settingsTab, setSettingsTab] = useState<SettingsTabType>("account");
  const { user, isLoggedIn, logout } = useUser();
  const [editedName, setEditedName] = useState(profile.customer_name);
  const [isSaving, setIsSaving] = useState(false);
  const [isCoverModalOpen, setIsCoverModalOpen] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPasswordSaving, setIsPasswordSaving] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState(profile.phone);

  // Add keyboard event listener for ESC key
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsCoverModalOpen(false);
      }
    };

    window.addEventListener("keydown", handleEscKey);
    return () => window.removeEventListener("keydown", handleEscKey);
  }, []);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedName(e.target.value);
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);
      const { data } = await axios.post("/api/api_open", {
        sn: "customer_edit_profile",
        id: user?.id,
        customer_name: editedName,
        org_name: profile.org_name,
        email: profile.email,
        phone: phoneNumber,
      });

      console.log("API Response:", data);

      if (data.status === "success") {
        // Update the user context with new name
        const updatedUser = { ...user, customer_name: editedName };
        localStorage.setItem("userData", JSON.stringify(updatedUser));
        toast.success("Profile updated successfully!");
      } else {
        console.error("Failed to update profile. Response:", data);
        alert(data.message || "Failed to update profile. Please try again.");
      }
    } catch (err) {
      console.error("Error updating profile:", err);
      alert("An error occurred while updating your profile. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const handlePasswordChange = async () => {
    if (newPassword !== confirmPassword) {
      toast.error("Шинэ нууц үг таарахгүй байна");
      return;
    }

    try {
      setIsPasswordSaving(true);
      const { data } = await axios.post("/api/api_open", {
        sn: "customer_change_password",
        id: user?.id,
        password: newPassword,
        password_old: currentPassword,
      });

      if (data.status === "success") {
        toast.success("Нууц үг амжилттай солигдлоо");
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        toast.error(data.message || "Нууц үг солиход алдаа гарлаа");
      }
    } catch (err) {
      console.error("Error changing password:", err);
      toast.error("Нууц үг солиход алдаа гарлаа");
    } finally {
      setIsPasswordSaving(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        {/* Backdrop */}
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        />

        <div className="flex w-[90vw] justify-between items-center absolute top-8 z-10">
          <div className="text-4xl gap-5 flex items-center font-extrabold text-white">
            {selectedTab === "profile" ? (
              <UserPen className="text-[#F5be32] w-[35px] h-[35px]" />
            ) : selectedTab === "favorites" ? (
              <Heart className="text-[#F5be32] w-[35px] h-[35px]" />
            ) : selectedTab === "inbox" ? (
              <Bell className="text-[#F5be32] w-[35px] h-[35px]" />
            ) : selectedTab === "wallet" ? (
              <Wallet className="text-[#F5be32] w-[35px] h-[35px]" />
            ) : (
              <ShoppingCart className="text-[#F5be32] w-[35px] h-[35px]" />
            )}
            {selectedTab === "profile"
              ? "Profile"
              : selectedTab === "favorites"
              ? "Таалагдсан"
              : selectedTab === "inbox"
              ? "Inbox"
              : selectedTab === "wallet"
              ? "Wallet"
              : "Orders"}
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
        <div className="relative w-[90vw] top-10 flex justify-between h-[90vh] bg-[#121212] rounded-lg shadow-xl overflow-hidden">
          {/* Header with close button */}

          <div className="p-[30px] w-[350px] border-r-[1px] border-[#939393] pt-[43px]">
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
              <button
                onClick={() => setSelectedTab("profile")}
                className={`w-full text-start px-2 py-2 text-xl text-white rounded-lg transition-all duration-300 hover:bg-gradient-to-r hover:from-amber-500/20 hover:to-transparent flex items-center gap-[22px] ${
                  selectedTab === "profile" ? "text-yellow-400" : ""
                }`}
              >
                <User className="w-5 h-5" />
                Profile
              </button>
              <button
                onClick={() => setSelectedTab("inbox")}
                className={`w-full text-start px-2 py-2 text-xl text-white rounded-lg transition-all duration-300 hover:bg-gradient-to-r hover:from-amber-500/20 hover:to-transparent flex items-center gap-[22px] ${
                  selectedTab === "inbox" ? "text-yellow-400" : ""
                }`}
              >
                <Bell className="w-5 h-5" />
                Inbox
              </button>
              <button
                onClick={() => setSelectedTab("favorites")}
                className={`w-full text-start py-2 px-2 text-xl text-white rounded-lg transition-all duration-300 hover:bg-gradient-to-r hover:from-amber-500/20 hover:to-transparent flex items-center gap-[22px] ${
                  selectedTab === "favorites" ? "text-yellow-400" : ""
                }`}
              >
                <Heart className="w-5 h-5" />
                Таалагдсан
              </button>
              <button
                onClick={() => setSelectedTab("orders")}
                className={`w-full text-start py-2 px-2 text-xl text-white rounded-lg transition-all duration-300 hover:bg-gradient-to-r hover:from-amber-500/20 hover:to-transparent flex items-center gap-[22px] ${
                  selectedTab === "orders" ? "text-yellow-400" : ""
                }`}
              >
                <ShoppingCart className="w-5 h-5" />
                Миний захиалгууд
              </button>
              <Link href="/business" className="w-full">
                <button className="w-full text-start py-2 px-2 text-xl text-white rounded-lg transition-all duration-300 hover:bg-gradient-to-r hover:from-amber-500/20 hover:to-transparent flex items-center gap-[22px]">
                  <Briefcase className="w-5 h-5" />
                  My business
                </button>
              </Link>
              <Link href="/wallet" className="w-full">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setSelectedTab("wallet");
                  }}
                  className={`w-full text-start py-2 px-2 text-xl text-white rounded-lg transition-all duration-300 hover:bg-gradient-to-r hover:from-amber-500/20 hover:to-transparent flex items-center gap-[22px] ${
                    selectedTab === "wallet" ? "text-yellow-400" : ""
                  }`}
                >
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
            {selectedTab === "profile" ? (
              <>
                <div className="absolute w-full top-0 h-[45vh]">
                  <div
                    className="relative w-full h-full cursor-pointer"
                    onClick={() => setIsCoverModalOpen(true)}
                  >
                    <Image
                      src={profile.coverImage || "/default-cover.jpg"}
                      alt="Cover"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <button className="absolute bottom-4 right-4 bg-white/10 backdrop-blur-md text-white px-4 py-2 rounded-lg text-sm hover:bg-white/20 transition-colors">
                    Change Cover
                  </button>
                </div>

                {/* Profile Content */}
                <div className="absolute w-[72vw] bottom-12 top-100px z-10">
                  <div className="flex w-[72vw] justify-evenly ">
                    {/* Profile Image and Stats */}
                    <div className="flex flex-col border-[1px] border-[#939393] items-center w-[276px] rounded-2xl py-[33px] px-4 h-[620px] bg-[#191919] gap-8">
                      <div className="relative">
                        <Image
                          src="/bold.png"
                          alt="Profile"
                          width={105}
                          height={105}
                          className="rounded-full object-cover w-[105px] h-[105px]"
                        />
                      </div>
                      <div className="text-center">
                        <h3 className="text-white text-xl">
                          {profile.customer_name}
                        </h3>
                        <p className="text-gray-400 text-base">
                          {profile.org_name}
                        </p>
                      </div>
                      <div className="flex flex-col w-[245px] gap-4 text-center text-white">
                        <div className="flex justify-between">
                          <div className="text-base text-gray-400">
                            Идвэхтэй захиалга
                          </div>
                          <div className="text-amber-500">0</div>
                        </div>
                        <div className="flex justify-between">
                          <div className="text- text-gray-400">
                            Гүйцэтгэсэн захиалга
                          </div>
                          <div className="text-amber-500">0</div>
                        </div>
                        <div className="flex justify-between">
                          <div className="text-base text-gray-400">
                            Follower
                          </div>
                          <div className="text-amber-500">0</div>
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
                    <div className="flex flex-col bg-[#1A1A1A] w-[1044px] border-[1px] border-[#939393] bottom-4 h-[620px] rounded-xl p-8">
                      <div className="flex gap-6 mb-8">
                        <button
                          className={`px-6 rounded-lg text-base ${
                            settingsTab === "account"
                              ? "text-amber-500"
                              : "text-gray-400"
                          }`}
                          onClick={() => setSettingsTab("account")}
                        >
                          Account settings
                        </button>
                        <button
                          className={`px-6 rounded-lg text-base ${
                            settingsTab === "security"
                              ? "text-amber-500 "
                              : "text-gray-400"
                          }`}
                          onClick={() => setSettingsTab("security")}
                        >
                          Security settings
                        </button>
                      </div>

                      {settingsTab === "account" ? (
                        <div className="grid grid-cols-2 gap-6">
                          <div className="space-y-3">
                            <label className="text-gray-400 text-base">
                              Нэр
                            </label>
                            <input
                              type="text"
                              className="w-full bg-[#333333] rounded-lg p-3 text-white"
                              value={editedName}
                              onChange={handleNameChange}
                            />
                          </div>
                          <div className="space-y-3">
                            <label className="text-gray-400 text-base">
                              Организацын нэр
                            </label>
                            <input
                              type="text"
                              className="w-full bg-[#333333] rounded-lg p-3 text-white "
                              placeholder={profile.org_name}
                              defaultValue={profile.org_name}
                            />
                          </div>
                          <div className="space-y-3">
                            <label className="text-gray-400 text-base">
                              Утас
                            </label>
                            <div className="relative">
                              <input
                                type="text"
                                className="w-full bg-[#333333] rounded-lg p-3 text-white"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
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
                      ) : (
                        <div className="space-y-6">
                          <div className="space-y-3">
                            <label className="text-gray-400 text-base">
                              Одоогийн нууц үг
                            </label>
                            <div className="relative">
                              <input
                                type={showCurrentPassword ? "text" : "password"}
                                className="w-full bg-[#333333] rounded-lg p-3 text-white pr-12"
                                placeholder="Enter current password"
                                value={currentPassword}
                                onChange={(e) =>
                                  setCurrentPassword(e.target.value)
                                }
                              />
                              <button
                                type="button"
                                onClick={() =>
                                  setShowCurrentPassword(!showCurrentPassword)
                                }
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                              >
                                {showCurrentPassword ? (
                                  <EyeOff size={18} />
                                ) : (
                                  <Eye size={18} />
                                )}
                              </button>
                            </div>
                          </div>
                          <div className="space-y-3">
                            <label className="text-gray-400 text-base">
                              Шинэ нууц үг
                            </label>
                            <div className="relative">
                              <input
                                type={showNewPassword ? "text" : "password"}
                                className="w-full bg-[#333333] rounded-lg p-3 text-white pr-12"
                                placeholder="Enter new password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                              />
                              <button
                                type="button"
                                onClick={() =>
                                  setShowNewPassword(!showNewPassword)
                                }
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                              >
                                {showNewPassword ? (
                                  <EyeOff size={18} />
                                ) : (
                                  <Eye size={18} />
                                )}
                              </button>
                            </div>
                          </div>
                          <div className="space-y-3">
                            <label className="text-gray-400 text-base">
                              Шинэ нууц үг давтах
                            </label>
                            <div className="relative">
                              <input
                                type={showConfirmPassword ? "text" : "password"}
                                className="w-full bg-[#333333] rounded-lg p-3 text-white pr-12"
                                placeholder="Confirm new password"
                                value={confirmPassword}
                                onChange={(e) =>
                                  setConfirmPassword(e.target.value)
                                }
                              />
                              <button
                                type="button"
                                onClick={() =>
                                  setShowConfirmPassword(!showConfirmPassword)
                                }
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                              >
                                {showConfirmPassword ? (
                                  <EyeOff size={18} />
                                ) : (
                                  <Eye size={18} />
                                )}
                              </button>
                            </div>
                          </div>
                          <button
                            onClick={handlePasswordChange}
                            disabled={isPasswordSaving}
                            className="mt-4 w-[145px] bg-gradient-to-r from-[#EAC947] to-[#F6A253] text-white py-3 rounded-lg hover:opacity-90 transition-opacity text-base disabled:opacity-50"
                          >
                            {isPasswordSaving ? "Хадгалж байна..." : "Хадгалах"}
                          </button>
                        </div>
                      )}

                      {settingsTab === "account" && (
                        <button
                          onClick={handleSave}
                          disabled={isSaving}
                          className="mt-8 w-[145px] bg-gradient-to-r from-[#EAC947] to-[#F6A253] text-white py-3 rounded-lg hover:opacity-90 transition-opacity text-base disabled:opacity-50"
                        >
                          {isSaving ? "Хадгалж байна..." : "Хадгалах"}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </>
            ) : selectedTab === "favorites" ? (
              <FavoritesTab onClose={onClose} />
            ) : selectedTab === "inbox" ? (
              <InboxTab onClose={onClose} />
            ) : selectedTab === "wallet" ? (
              <WalletTab onClose={onClose} />
            ) : (
              <OrderTab onClose={onClose} />
            )}
          </div>
        </div>
      </div>
      {/* Cover Image Modal */}
      {isCoverModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center">
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm cursor-pointer"
            onClick={() => setIsCoverModalOpen(false)}
          />
          <div
            className="relative z-[101] w-[90vw] h-[90vh] cursor-default"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={profile.coverImage || "/default-cover.jpg"}
              alt="Cover Full Size"
              fill
              className="object-cover"
            />
          </div>
        </div>
      )}
    </>
  );
}
