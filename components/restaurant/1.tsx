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
import RestLogin from "../RestLogin";
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

function FeatureCard({ icon, title, description }: any) {
  return (
    <div className="text-center px-6 py-8">
      <div className="flex flex-row items-center justify-center mb-6">
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
  const [activeTab, setActiveTab] = useState("all");
  const [merchants, setMerchants] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedMerchant, setSelectedMerchant] = useState<any | null>(null);
  const [searchQuery, setSearchQuery] = useState(""); // Category search
  const [headerSearch, setHeaderSearch] = useState(""); // Header search
  const [headerResults, setHeaderResults] = useState<any[]>([]); // Header search results
  const [showBankDropdown, setShowBankDropdown] = useState(false); // Toggle bank dropdown
  const { data: session, status } = useSession();

  const features = [
    {
      icon: <LightbulbIcon className="w-6 h-6 text-amber-500" />,
      title: "Lorem ipsum",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. ",
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
      title: "Lorem ipsum",
      description:
        "LLorem Ipsum is simply dummy text of the printing and typesetting industry. ",
    },
    {
      icon: <LightbulbIcon className="w-6 h-6 text-amber-500" />,
      title: "Lorem ipsum",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. ",
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
      title: "Lorem ipsum",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. ",
    },
  ];

  const { user, isLoggedIn, login, logout } = useUser();
  const router = useRouter();

  const hardcodedToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.Q9eW!zD0EeL7@ANeyJ1c2VyX2lkIjoiMSIsImlhdCI6MTcxODU5OTU0NywiZXhwIjoxNzUwMTM1NTQ3fQ.muFJPyUNLrjjeHTVI4Vjj-wkHoGJ7YceHPIsDNuhlOQ";

  const navLinks = [
    { name: "Home", href: "#", active: true },
    { name: "Restaurants", href: "#", active: false },
    { name: "Event Hall", href: "#", active: false },
    { name: "Contact", href: "#", active: false },
  ];

  const reservationFields = [
    {
      icon: <Users className="w-5 h-5" />,
      label: "Нэр",
      placeholder: "Та хэдэн хүн бодож байна?",
    },
    {
      icon: <Calendar className="w-5 h-5" />,
      label: "дугаар",
      placeholder: "Та хэзээ гэж бодож байна?",
    },
    {
      icon: <Clock className="w-5 h-5" />,
      label: "имэйл",
      placeholder: "Та хэдэн хүн бодож байна?",
    },
    {
      icon: <MapPin className="w-5 h-5" />,
      label: "Банк",
      placeholder: "Та хаана гэж бодож байна?",
    },
  ];

  const tabOptions = [
    { value: "all", label: "Бүгд" },
    { value: "Ресторан", label: "Ресторан" },
    { value: "Event Hall", label: "Event Hall" },
    { value: "Гадаа талбай", label: "Гадаа талбай" },
    { value: "Голын цаад эрэг", label: "Голын цаад эрэг" },
  ];

  useEffect(() => {
    const fetchMerchants = async () => {
      try {
        const customerId = user?.id || localStorage.getItem("user_id") || "8";
        const { data } = await axios.post(
          "/api",
          {
            sn: "merchant_list",
            page_number: 1,
            page_size: 50,
            service_type_id: "204",
          },
          {
            headers: {
              Authorization: `Bearer ${hardcodedToken}`,
            },
          }
        );
        if (data.status === "success") {
          setMerchants(data.result);
        } else {
          setError(`Failed to fetch data: ${data.message || "Unknown error"}`);
        }
      } catch (err: any) {
        setError(
          `Error fetching data: ${err.response?.data?.message || err.message}`
        );
      } finally {
        setLoading(false);
      }
    };

    fetchMerchants();
  }, [user]);

  // Real-time header search filtering
  useEffect(() => {
    if (headerSearch.trim() === "") {
      setHeaderResults([]);
      return;
    }

    const filtered = merchants.filter((merchant) =>
      [
        merchant.name || "",
        merchant.phone || "",
        merchant.email || "",
        merchant.bank_name || "",
        merchant.merchant_type_name || "",
      ].some((field) =>
        field.toLowerCase().includes(headerSearch.toLowerCase())
      )
    );

    setHeaderResults(filtered.slice(0, 6)); // Limit to 6 results
  }, [headerSearch, merchants]);

  // Get unique bank names
  const uniqueBanks = Array.from(
    new Set(merchants.map((m) => m.bank_name).filter(Boolean))
  );

  const filteredMerchants =
    activeTab === "all"
      ? merchants
      : merchants.filter((merchant) =>
          merchant.merchant_type_name?.includes(activeTab)
        );

  const categorizedMerchants = (() => {
    let result = filteredMerchants;

    if (selectedMerchant) {
      result = [selectedMerchant];
      if (selectedCategory) {
        const value = (() => {
          switch (selectedCategory) {
            case "Нэр":
              return selectedMerchant.name;
            case "дугаар":
              return selectedMerchant.phone;
            case "имэйл":
              return selectedMerchant.email;
            case "Банк":
              return selectedMerchant.bank_name;
            default:
              return "";
          }
        })();
        if (
          !value ||
          !value.toLowerCase().includes(searchQuery.toLowerCase())
        ) {
          return [];
        }
      }
      return result;
    }

    if (selectedCategory) {
      result = filteredMerchants.filter((merchant) => {
        const value = (() => {
          switch (selectedCategory) {
            case "Нэр":
              return merchant.name;
            case "дугаар":
              return merchant.phone;
            case "имэйл":
              return merchant.email;
            case "Банк":
              return merchant.bank_name;
            default:
              return "";
          }
        })();

        return value && value.toLowerCase().includes(searchQuery.toLowerCase());
      });
    }

    return result.length > 0 ? result : [];
  })();

  const handleCategoryClick = (label: string) => {
    setSelectedCategory(label);
    setSearchQuery("");
  };

  const handleItemClick = (merchant: any) => {
    setSelectedMerchant(merchant);
  };

  const handleSearchClick = () => {
    if (selectedCategory && selectedMerchant) {
      router.push(
        `/ordertest?category=${selectedCategory}&merchant=${encodeURIComponent(
          JSON.stringify(selectedMerchant)
        )}`
      );
    } else if (selectedCategory) {
      router.push(
        `/ordertest?category=${selectedCategory}&data=${encodeURIComponent(
          JSON.stringify(categorizedMerchants)
        )}`
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

  const handleBankClick = (bank: string) => {
    setSelectedCategory("Банк"); // Set category to "Банк"
    setSearchQuery(bank); // Filter by selected bank
    setShowBankDropdown(false); // Hide dropdown
  };

  const renderMerchantField = (merchant: any) => {
    switch (selectedCategory) {
      case "Нэр":
        return (
          <p className="text-xs text-gray-400">Нэр: {merchant.name || "N/A"}</p>
        );
      case "дугаар":
        return (
          <p className="text-xs text-gray-400">
            Утас: {merchant.phone || "N/A"}
          </p>
        );
      case "имэйл":
        return (
          <p className="text-xs text-gray-400">
            Имэйл: {merchant.email || "N/A"}
          </p>
        );
      case "Банк":
        return (
          <p className="text-xs text-gray-400">
            Банк: {merchant.bank_name || "N/A"}
          </p>
        );
      default:
        return (
          <p className="text-xs text-gray-400">
            Банк: {merchant.bank_name || "N/A"}
          </p>
        );
    }
  };

  useEffect(() => {
    if (session) {
      const fetchData = async () => {
        try {
          const { data }: any = await axios.post("/api/api_open", {
            sn: "customer_login_fb",
            email: session?.user?.email,
            customer_name: session?.user?.name,
          });
          if (data.result) {
            setError("");
            const user = data.result;
            const token = data.token;

            login(user);
            router.push("/restaurant");
          } else {
            console.log("false");
            setError("Нэр эсвэл нууц үг буруу байна ");
            console.log(data);
          }
        } catch (error) {
          console.log(error);
        }
      };

      fetchData();
    }
  }, [session]);

  return (
    <div className="relative min-h-screen flex flex-col">
      <div className="fixed inset-0 z-0">
        <Image
          src="/backround.jpg"
          alt="Restaurant interior"
          fill
          className="object-cover brightness-[0.8]"
          priority
        />
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        <header className="py-4 px-6 bg-[#00000080] md:px-[100px]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Image
                alt="Restaurant logo"
                width={30}
                height={30}
                priority
                src="/Logo.svg"
              />
              <span className="text-white font-medium">restaurant.mn</span>
            </div>

            <div className="hidden md:flex items-center bg-[#333333]/80 rounded-md px-3 py-1 w-full max-w-[665px] mx-8 relative">
              <div
                onClick={() => setShowBankDropdown(!showBankDropdown)}
                className="flex cursor-pointer items-center gap-2 border-r border-gray-500 pr-2 relative"
              >
                <span className="text-white text-sm cursor-pointer">Төрөл</span>
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
              <Search className="w-5 h-5 text-gray-400 mx-2" />
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
                <div>
                  <div
                    className="flex items-center gap-3 cursor-pointer"
                    onClick={() => router.push("/profiletest")}
                  >
                    <img
                      src="bold.png"
                      alt="User profile"
                      className="w-10 h-10 rounded-2xl"
                    />
                    <div>
                      <p className="font-semibold text-sm">
                        {user?.customer_name}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={logout}
                    className="text-red-500 cursor-pointer"
                  >
                    Logout
                  </button>
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  rounded-lg overflow-hidden">
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </div>

          <div className="w-full max-w-4xl bg-[#222222]/90 rounded-lg p-6">
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
                    className={`flex items-center gap-3 rounded-md p-3 cursor-pointer ${
                      selectedCategory === field.label
                        ? "bg-amber-500 text-white"
                        : "text-gray-400"
                    }`}
                    onClick={() => handleCategoryClick(field.label)}
                  >
                    {field.icon}
                    <div className="flex flex-col">
                      <span className="text-xs">{field.label}</span>
                      <span className="text-[7px]">{field.placeholder}</span>
                    </div>
                  </div>
                ))}
                <Button
                  className="bg-gradient-to-b from-[#fd8e2e] to-[#f5be32] w-[67px] h-[67px] hover:opacity-80 text-white rounded-xl"
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

          <div className="w-full max-w-4xl mt-8 min-h-[300px]">
            {loading ? (
              <p className="text-white">Loading data...</p>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : selectedCategory || selectedMerchant ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categorizedMerchants.length > 0 ? (
                  categorizedMerchants.map((merchant) => (
                    <div
                      key={merchant.id}
                      className={`bg-[#333333]/80 p-4 rounded-lg text-white cursor-pointer ${
                        selectedMerchant?.id === merchant.id
                          ? "border-2 border-amber-500"
                          : ""
                      }`}
                      onClick={() => handleItemClick(merchant)}
                    >
                      {renderMerchantField(merchant)}
                    </div>
                  ))
                ) : (
                  <p className="text-gray-400">No merchants found</p>
                )}
              </div>
            ) : (
              <p className="text-gray-400"></p>
            )}
          </div>
        </main>
      </div>

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
