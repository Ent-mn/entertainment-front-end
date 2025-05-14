"use client";
import { LightbulbIcon, Wallet } from "lucide-react";
import { useState, useEffect } from "react";
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
  Briefcase,
  Receipt,
  HelpCircle,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import RestLogin from "../RestLogin";
import { useUser } from "@/context/UserContext";
import { useRouter, useSearchParams } from "next/navigation";
import { ProfileSettingsModal } from "@/components/modals/ProfileSettingsModal";

interface VenueData {
  id: number;
  name?: string;
  capacity?: number;
  stars: number;
  price: number;
  date: string;
  sale?: number;
  image?: string;
  type?: string;
  phone?: string;
  email?: string;
  bank_name?: string;
  account?: string;
}

const staticData = {
  restaurants: [
    {
      id: 1001,
      name: "Restaurant",
      capacity: 2,
      stars: 5,
      price: 90000,
      date: "2024-04-01",
      sale: 20,
      image: "/uul.jpg",
      type: "Ресторан",
    },
    {
      id: 1002,
      name: "Restaurant",
      capacity: 4,
      stars: 4,
      price: 120000,
      date: "2024-04-02",
      image: "/uul.jpg",
      type: "Ресторан",
    },
  ],
  eventHalls: [
    {
      id: 2001,
      name: "Wedding Palace",
      capacity: 300,
      stars: 5,
      price: 1500000,
      date: "2024-04-01",
      sale: 15,
      image: "/uul.jpg",
      type: "Event Hall",
    },
  ],
  outdoorVenues: [
    {
      id: 3001,
      name: "Тэрэлж Resort",
      capacity: 100,
      stars: 5,
      price: 900000,
      date: "2024-04-01",
      sale: 10,
      image: "/uul.jpg",
      type: "Гэр Талбай",
    },
  ],
  theaters: [
    {
      id: 4001,
      name: "Драмын Театр",
      capacity: 400,
      stars: 5,
      price: 1800000,
      date: "2024-04-01",
      sale: 20,
      image: "/uul.jpg",
      type: "Театр",
    },
  ],
  complexes: [
    {
      id: 5001,
      name: "Blue Sky Tower",
      capacity: 1000,
      stars: 5,
      price: 3000000,
      date: "2024-04-01",
      sale: 10,
      image: "/uul.jpg",
      type: "Complex",
    },
  ],
};

function FeatureCard({ icon, title, description }: any) {
  return (
    <div className="text-center mt-12 px-6 py-8">
      <div className="flex flex-col items-center justify-center mb-6">
        <div className="w-12 h-12 rounded-full bg-[#1A1A1A] flex items-center justify-center">
          {icon}
        </div>
        <div className="flex flex-col">
          <h3 className="text-white text-xl font-medium mb-4">{title}</h3>
          <p className="text-gray-400 text-[10px] w-[230px] leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function RestaurantWebsite() {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMerchant, setSelectedMerchant] = useState<any>(null);
  const [showBankDropdown, setShowBankDropdown] = useState(false);
  const [selectedBank, setSelectedBank] = useState<string | null>(null);
  const [headerSearch, setHeaderSearch] = useState("");
  const [headerResults, setHeaderResults] = useState<any[]>([]);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [merchants, setMerchants] = useState<any[]>([]);
  const [showAnnouncement, setShowAnnouncement] = useState(true);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [initialProfileView, setInitialProfileView] = useState<
    "favorites" | "orders" | "inbox" | "profile"
  >("profile");

  const { user, isLoggedIn, logout } = useUser();
  const router = useRouter();

  // Initialize merchants data from staticData
  useEffect(() => {
    const allVenues = [
      ...staticData.restaurants,
      ...staticData.eventHalls,
      ...staticData.outdoorVenues,
      ...staticData.theaters,
      ...staticData.complexes,
    ];
    setMerchants(allVenues);
  }, []);

  const navLinks = [
    { name: "Захиалах", href: "#", active: true },
    { name: "Түрээслэх", href: "#", active: false },
    { name: "Зөвлөгөө", href: "#", active: false },
    { name: "Contact", href: "#", active: false },
  ];

  const tabOptions = [
    { value: "all", label: "Бүгд" },
    { value: "Ресторан", label: "Ресторан" },
    { value: "Event Hall", label: "Event Hall" },
    { value: "Гэр Талбай", label: "Гэр Талбай" },
    { value: "Театр", label: "Театр" },
    { value: "Complex", label: "Complex" },
  ];

  const venueTypes = [
    "Ресторан",
    "Event Hall",
    "Гэр Талбай",
    "Театр",
    "Complex",
  ];

  const features = [
    {
      icon: <LightbulbIcon className="w-6 h-6 text-amber-500" />,
      title: "Хайлт & Шүүлт",
      description:
        "Хайлтын болон шүүлтийн систем ашиглан та өөрийн эвентэд яг тохирох газрыг олох боломжтой. ",
    },
    {
      icon: (
        <svg
          className="w-6 h-6 text-amber-500"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16 16V8H8V16H16Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12 20V16"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12 8V4"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M16 12H20"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M4 12H8"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      title: "Бодит Календарь",
      description:
        "Таны захиалахыг хүссэн өдөр, цагт захиалга авах боломжтой байгаа эсэхийг 30секунд тутамд шалгаж танд харуулах болно. ",
    },
    {
      icon: <LightbulbIcon className="w-6 h-6 text-amber-500" />,
      title: "Онлайн захиалга",
      description:
        "Та заавал биеэр очилгүйгээр 100% онлайнаар тухайн газартай танилцаж, захиалгаа баталгаажуулах боломжтой.",
    },
    {
      icon: (
        <svg
          className="w-6 h-6 text-amber-500"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16 16V8H8V16H16Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12 20V16"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12 8V4"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M16 12H20"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M4 12H8"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      title: "Гүйцэтгэлийн систем",
      description:
        "Таны Эвент болох хүртэл бэлтгэл ажлыг онлайнаар гүйцэтгэх, бүх зүйлсийг хяналттайгаар удирдах систем.",
    },
  ];

  const reservationFields = [
    {
      icon: <Users className="w-5 h-5" />,
      label: "Зочдын тоо",
      placeholder: "Зочдын тоогоо оруулна уу.",
    },
    {
      icon: <Calendar className="w-5 h-5" />,
      label: "Өдөр",
      placeholder: "Эвент болох өдөр",
    },
    {
      icon: <Clock className="w-5 h-5" />,
      label: "Цаг",
      placeholder: "Эхлэх, үргэжлэх цаг",
    },
    {
      icon: <MapPin className="w-5 h-5" />,
      label: "Эвент",
      placeholder: "Эвентийн төрлөө сонгоно уу.",
    },
  ];

  // Get unique bank names
  const uniqueBanks = Array.from(
    new Set(merchants.map((m) => m.bank_name).filter(Boolean))
  );

  const handleBankClick = (type: string) => {
    setSelectedBank(type);
    setShowBankDropdown(false); // Hide dropdown
    router.push(`/ordertest?type=${encodeURIComponent(type)}`);
  };

  // Real-time header search filtering
  useEffect(() => {
    if (headerSearch.trim() === "") {
      setHeaderResults([]);
      return;
    }

    let filteredVenues = merchants;

    // Apply bank filter if a bank is selected from "Төрөл"
    if (selectedBank) {
      filteredVenues = filteredVenues.filter((venue) =>
        venue.type?.toLowerCase().includes(selectedBank.toLowerCase())
      );
    }

    const filtered = filteredVenues.filter((venue) =>
      [
        venue.name || "",
        venue.phone || "",
        venue.email || "",
        venue.bank_name || "",
        venue.type || "",
      ].some((field) =>
        field.toLowerCase().includes(headerSearch.toLowerCase())
      )
    );

    setHeaderResults(filtered.slice(0, 6)); // Limit to 6 results
  }, [headerSearch, selectedBank]);

  const handleCategoryClick = (label: string) => {
    setSelectedCategory(label);
    setSearchQuery(""); // Reset search query when changing category
  };

  const handleItemClick = (merchant: any) => {
    setSelectedMerchant(merchant);
  };

  const handleSearchClick = () => {
    if (selectedCategory === "Зочдын тоо" && searchQuery) {
      const searchNumber = parseInt(searchQuery);
      if (!isNaN(searchNumber)) {
        const filteredMerchants = merchants.filter((merchant) => {
          if ("capacity" in merchant) {
            return merchant.capacity >= searchNumber; // Filter for capacity >= searchQuery
          }
          return false;
        });

        router.push(
          `/ordertest?category=${encodeURIComponent(
            selectedCategory
          )}&searchQuery=${encodeURIComponent(
            searchQuery
          )}&data=${encodeURIComponent(JSON.stringify(filteredMerchants))}`
        );
      }
    } else if (selectedCategory && selectedMerchant) {
      router.push(
        `/ordertest?category=${encodeURIComponent(
          selectedCategory
        )}&merchant=${encodeURIComponent(JSON.stringify(selectedMerchant))}`
      );
    } else if (selectedCategory) {
      router.push(
        `/ordertest?category=${encodeURIComponent(
          selectedCategory
        )}&data=${encodeURIComponent(JSON.stringify(merchants))}`
      );
    } else {
      router.push(
        `/ordertest?data=${encodeURIComponent(JSON.stringify(merchants))}`
      );
    }
  };

  const handleHeaderResultClick = (merchant: any) => {
    setSelectedMerchant(merchant);
    setHeaderSearch("");
    setHeaderResults([]);
  };

  const handleSeeMore = () => {
    router.push(
      `/ordertest?data=${encodeURIComponent(
        JSON.stringify(
          merchants.filter((merchant) =>
            [
              merchant.name || "",
              merchant.phone || "",
              merchant.email || "",
              merchant.bank_name || "",
              merchant.merchant_type_name || "",
            ].some((field) =>
              field.toLowerCase().includes(headerSearch.toLowerCase())
            )
          )
        )
      )}`
    );
  };

  // Add this useEffect to handle clicking outside the dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const button = document.getElementById("profile-button");
      const dropdown = document.getElementById("profile-dropdown");
      if (
        button &&
        dropdown &&
        !button.contains(event.target as Node) &&
        !dropdown.contains(event.target as Node)
      ) {
        setShowProfileDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative h-[1000px] flex flex-col">
      <div className="fixed inset-0 z-0">
        <Image
          src="/5cover1.jpg"
          alt="Restaurant interior"
          fill
          className="object-cover brightness-[0.8]"
          priority
        />
      </div>
      <div className="relative z-10 flex flex-col min-h-screen">
        {showAnnouncement && (
          <div className="bg-[#2C2C2C]/70 text-white w-full py-2 px-4 flex items-center justify-between">
            <div className="flex-1 text-center text-sm md:text-base">
              Novotel hotel - MoD/n Tok Restaurant - Хуримын урьдчилсан захиалга
              20% хямдрал....
            </div>
            <button
              onClick={() => setShowAnnouncement(false)}
              className="text-white hover:text-gray-300 p-1"
              aria-label="Close announcement"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
        )}
        <header className="py-4 md:px-[180px] px-6 border-b border-gray-800 shrink-0">
          <div className="flex items-center justify-between">
            <Link href="/restaurant" className="flex items-center gap-4">
              <Image
                alt="Restaurant logo"
                width={30}
                height={30}
                priority
                src="/Logo.svg"
              />
              <span className="text-white text-lg font-medium">
                Restaurant.mn
              </span>
            </Link>

            <div className="hidden md:flex items-center bg-[#333333]/80 rounded-md   w-full max-w-[665px] mx-8 relative">
              <div
                onClick={() => setShowBankDropdown(!showBankDropdown)}
                className="flex bg-[#78787866] py-2 px-4 cursor-pointer rounded-l-md items-center gap-2 border-r border-gray-500 relative"
              >
                <span className="text-white text-sm cursor-pointer">
                  {selectedBank || "Төрөл"}
                </span>
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
                {showBankDropdown && (
                  <div className="absolute top-full left-[-12px] border-[1px] border-black mt-4 w-48 bg-[#333333]/90 rounded-md shadow-lg z-20 max-h-70 overflow-y-auto">
                    {uniqueBanks.map((bank) => (
                      <div
                        key={bank}
                        className="p-2 text-white hover:bg-amber-500/20 cursor-pointer text-sm"
                        onClick={() => handleBankClick(bank)}
                      >
                        {bank}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <Search className="w-5 h-5 text-gray-400 ml-2" />
              <Input
                type="text"
                placeholder="Хайлт"
                value={headerSearch}
                onChange={(e) => setHeaderSearch(e.target.value)}
                className="bg-transparent border-0 text-white focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-gray-400"
              />
              {headerResults.length > 0 && (
                <div className="absolute top-full left-0 mt-2 w-full bg-[#333333]/90 rounded-md shadow-lg z-20 max-h-100 overflow-y-auto">
                  {headerResults.map((merchant) => (
                    <div
                      key={merchant.id}
                      className="p-3 text-white hover:bg-amber-500/20 cursor-pointer"
                      onClick={() => handleHeaderResultClick(merchant)}
                    >
                      <p className="text-sm">{merchant.name || "N/A"}</p>
                      <p className="text-xs text-gray-400">
                        {merchant.phone || "N/A"}
                      </p>
                    </div>
                  ))}
                  {merchants.filter((merchant) =>
                    [
                      merchant.name || "",
                      merchant.phone || "",
                      merchant.email || "",
                      merchant.bank_name || "",
                      merchant.merchant_type_name || "",
                    ].some((field) =>
                      field.toLowerCase().includes(headerSearch.toLowerCase())
                    )
                  ).length > 6 && (
                    <Button
                      variant="outline"
                      className="w-full mt-2 text-amber-500 border-amber-500 hover:bg-amber-500/20"
                      onClick={handleSeeMore}
                    >
                      See More
                    </Button>
                  )}
                </div>
              )}
            </div>

            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-white text-lg ${
                    link.active ? "border-b-2 border-amber-500 pb-1" : ""
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              {!isLoggedIn ? (
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
              ) : (
                <div className="relative">
                  <div
                    id="profile-button"
                    className="flex items-center gap-3 cursor-pointer"
                    onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                  >
                    <img
                      src="bold.png"
                      alt="User profile"
                      className="w-7 h-7 rounded-full"
                    />
                    <div className="flex gap-2">
                      <p className="font-semibold text-sm text-white">
                        {user?.first_name}
                      </p>
                      <p className="font-semibold text-sm text-[#9E9D9C]">
                        {user?.last_name}
                      </p>
                    </div>
                  </div>
                  {showProfileDropdown && (
                    <div
                      id="profile-dropdown"
                      className="absolute p-8 flex flex-col items-start justify-between w-[300px] h-[340px] right-[-82px] mt-2  bg-gray-200/20 backdrop-blur-[12px] rounded-3xl shadow-lg z-50"
                    >
                      <button
                        onClick={() => {
                          setInitialProfileView("profile");
                          setIsProfileModalOpen(true);
                          setShowProfileDropdown(false);
                        }}
                        className="w-full text-start px-2 py-2 text-sm text-white rounded-lg transition-all duration-300 hover:bg-gradient-to-r hover:from-amber-500/20 hover:to-transparent flex items-center gap-2"
                      >
                        <User className="w-4 h-4" />
                        Profile
                      </button>
                      <button className="w-full text-start py-2 px-2 text-sm text-white rounded-lg transition-all duration-300 hover:bg-gradient-to-r hover:from-amber-500/20 hover:to-transparent flex items-center gap-2">
                        <Heart className="w-4 h-4" />
                        Таалагдсан
                      </button>
                      <button
                        onClick={() => {
                          setInitialProfileView("orders");
                          setIsProfileModalOpen(true);
                          setShowProfileDropdown(false);
                        }}
                        className="w-full text-start py-2 px-2 text-sm text-white rounded-lg transition-all duration-300 hover:bg-gradient-to-r hover:from-amber-500/20 hover:to-transparent flex items-center gap-2"
                      >
                        <ShoppingCart className="w-4 h-4" />
                        Миний захиалгууд
                      </button>
                      <Link href="/business" className="w-full">
                        <button className="w-full text-start py-2 px-2 text-sm text-white rounded-lg transition-all duration-300 hover:bg-gradient-to-r hover:from-amber-500/20 hover:to-transparent flex items-center gap-2">
                          <Briefcase className="w-4 h-4" />
                          My business
                        </button>
                      </Link>
                      <Link href="/wallet" className="w-full">
                        <button className="w-full text-start py-2 px-2 text-sm text-white rounded-lg transition-all duration-300 hover:bg-gradient-to-r hover:from-amber-500/20 hover:to-transparent flex items-center gap-2">
                          <Wallet className="w-4 h-4" />
                          Миний хэтэвч
                        </button>
                      </Link>
                      <div className="flex flex-col gap-[1px] mt-4 w-full">
                        <Link href="/help" className="w-full">
                          <button className="w-full text-start py-2 px-2 text-sm text-white rounded-lg transition-all duration-300 hover:bg-gradient-to-r hover:from-amber-500/20 hover:to-transparent flex items-center gap-2">
                            <HelpCircle className="w-4 h-4" />
                            Тусламж
                          </button>
                        </Link>
                        <button
                          onClick={() => {
                            logout();
                            setShowProfileDropdown(false);
                          }}
                          className="w-full text-start py-2 px-2 text-sm text-white rounded-lg transition-all duration-300 hover:bg-gradient-to-r hover:from-amber-500/20 hover:to-transparent flex items-center gap-2"
                        >
                          <LogOut className="w-4 h-4" />
                          Sign out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
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
        <main className="flex-1 flex flex-col items-center justify-center text-center px-6 py-12 overflow-auto">
          <h1 className="text-4xl md:text-5xl mt-12 lg:text-[54px] font-bold text-white max-w-8xl mb-6">
            There are many variations of passages of{" "}
          </h1>
          <p className="text-gray-300 max-w-2xl mb-16">
            Lorem Ipsum available, but the majority have suffered alteration in
            some form, by injected humour, or randomised words which don't look
            even
          </p>

          <div className="w-full max-w-4xl bg-gray-200/20 backdrop-blur-[12px] rounded-[24px] p-4 shadow-lg border border-white/10">
            <Tabs
              defaultValue="all"
              className="w-full"
              onValueChange={setActiveTab}
            >
              <TabsList className="bg-transparent border-b border-white rounded-none w-full justify-start gap-8">
                {tabOptions.map((tab) => (
                  <TabsTrigger
                    key={tab.value}
                    value={tab.value}
                    className={`text-gray-400 data-[state=active]:text-amber-500 data-[state=active]:border-b-2 data-[state=active]:border-amber-500 rounded-none pb-3 px-0 mx-2`}
                  >
                    {tab.label}
                  </TabsTrigger>
                ))}
              </TabsList>

              <div className="grid grid-cols-1 mt-2 md:flex justify-between">
                {reservationFields.map((field, index) => (
                  <div key={index} className="flex items-center">
                    {index > 0 && (
                      <div className="h-[50px] w-[1px] bg-gray-600 mx-2" />
                    )}
                    <div
                      className={`flex items-center gap-3 rounded-md p-3 cursor-pointer ${
                        selectedCategory === field.label
                          ? "bg-amber-500 text-white"
                          : "text-gray-400"
                      }`}
                      onClick={() => handleCategoryClick(field.label)}
                    >
                      {field.icon}
                      <div className="flex text-start flex-col">
                        <span className="text-xs text-white">
                          {field.label}
                        </span>
                        <span className="text-[7px]">{field.placeholder}</span>
                      </div>
                    </div>
                  </div>
                ))}
                <Button
                  className="bg-gradient-to-b from-[#fd8e2e] to-[#f5be32] w-[56px] h-[56px] hover:opacity-80 text-white rounded-xl"
                  onClick={handleSearchClick}
                >
                  <Search className="w-5 h-5" />
                </Button>
              </div>
            </Tabs>

            {selectedCategory && (
              <div className="mt-4">
                <Input
                  type="text"
                  placeholder={`Хайх (${selectedCategory})`}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-[#333333]/80 text-white border-none rounded-md p-2 w-full max-w-md mx-auto"
                />
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mt-24 rounded-lg overflow-hidden">
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </div>
        </main>
      </div>

      <div className="fixed right-6 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-20 bg-gray-200/20 backdrop-blur-[12px] rounded-[24px] px-2 py-4 shadow-lg border border-white/10">
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

      <ProfileSettingsModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        profile={{
          first_name: user?.first_name || "",
          org_name: user?.org_name || "",
          email: user?.email || "",
          phone: user?.phone || "",
          coverImage: "/5cover1.jpg",
        }}
        initialView={initialProfileView}
      />
    </div>
  );
}
