"use client";
import { LightbulbIcon } from "lucide-react";
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
import { useUser } from "@/context/UserContext";
import { useRouter, useSearchParams } from "next/navigation";
import RestLogin from "@/components/RestLogin";

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

const DetailHeader = () => {
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

  const { user, isLoggedIn, logout } = useUser();
  const router = useRouter();

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
    <div>
      <header className="py-4 px-6 md:px-[100px]  bg-[#121212]/50 backdrop-blur-xl fixed inset-0 z-30 h-16 ">
        <div className="flex items-center justify-between">
          <Link href="/restaurant" className="flex items-center gap-2">
            <Image
              alt="Restaurant logo"
              width={30}
              height={30}
              priority
              src="/Logo.svg"
            />
            <span className="text-white font-medium">restaurant.mn</span>
          </Link>

          <div className="hidden md:flex items-center bg-[#333333]/80 rounded-md w-full max-w-[665px] mx-8 relative">
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
                  {venueTypes.map((type) => (
                    <div
                      key={type}
                      className="p-2 text-white hover:bg-amber-500/20 cursor-pointer text-sm"
                      onClick={() => handleBankClick(type)}
                    >
                      {type}
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
                      {merchant.stars || "N/A"}
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
                className={`text-white text-sm ${
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
                    className="w-10 h-10 rounded-2xl"
                  />
                  <div>
                    <p className="font-semibold text-sm text-white">
                      {user?.customer_name}
                    </p>
                  </div>
                </div>
                {showProfileDropdown && (
                  <div
                    id="profile-dropdown"
                    className="absolute right-0 mt-2 w-16 bg-[#333333] rounded-md shadow-lg py-1 z-50"
                  >
                    <Link href="/profiletest">
                      <button className="w-full text-center px-2 py-2 text-sm text-white hover:bg-[#444444] transition-colors duration-150">
                        Profile
                      </button>
                    </Link>
                    <button
                      onClick={() => {
                        logout();
                        setShowProfileDropdown(false);
                      }}
                      className="w-full text-center py-2 px-2 text-sm text-red-500 hover:bg-[#444444] transition-colors duration-150"
                    >
                      Logout
                    </button>
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
    </div>
  );
};

export default DetailHeader;
