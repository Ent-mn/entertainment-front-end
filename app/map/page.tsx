// pages/map.tsx
"use client";

import dynamic from "next/dynamic";
import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import Image from "next/image";
import {
  Search,
  User,
  X,
  Users,
  Calendar,
  Clock,
  MapPin,
  Sun,
  ShoppingCart,
  Heart,
  Headphones,
  Expand,
  Shrink,
} from "lucide-react";
import { useUser } from "@/context/UserContext";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import RestLogin from "@/components/RestLogin";
import { Label } from "@/components/ui/label";

type VenueType =
  | "A Area"
  | "B Area"
  | "C Area"
  | "Ресторан"
  | "Event Hall"
  | "Гэр Талбай";

interface Venue {
  id: number;
  name: string;
  type: VenueType;
  location: [number, number];
  stars: number;
  image: string;
  capacity: number;
  price: number;
  date: string;
  sale?: number;
}

interface VenueTypeConfig {
  color: string;
  icon?: string;
  label?: string;
}

// Dynamic import for LeafletMap to disable SSR
const LeafletMap = dynamic(() => import("@/components/LeafletMap"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-[85vh]">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-500"></div>
    </div>
  ),
});

// Static data
const staticData: Record<string, Venue[]> = {
  Ресторан: [
    {
      id: 1001,
      name: "Modern Bistro",
      capacity: 2,
      stars: 5,
      price: 90000,
      date: "2024-04-01",
      sale: 20,
      image: "/static/1.avif",
      type: "Ресторан",
      location: [47.9184, 106.9177],
    },
    // ... (other Ресторан entries)
  ],
  "Event Hall": [
    {
      id: 2001,
      name: "Wedding Palace",
      capacity: 300,
      stars: 5,
      price: 1500000,
      date: "2024-04-01",
      sale: 15,
      image: "/static/3.avif",
      type: "Event Hall",
      location: [47.9194, 106.9287],
    },
    // ... (other Event Hall entries)
  ],
  "Гэр Талбай": [
    {
      id: 3001,
      name: "Тэрэлж Resort",
      capacity: 100,
      stars: 5,
      price: 900000,
      date: "2024-04-01",
      sale: 10,
      image: "/static/7.avif",
      type: "Гэр Талбай",
      location: [47.9164, 106.9367],
    },
    // ... (other Гэр Талбай entries)
  ],
};

const venueTypeConfig: Record<VenueType, VenueTypeConfig> = {
  "A Area": { color: "#F5BE32" },
  "B Area": { color: "#3B82F6" },
  "C Area": { color: "#22C55E" },
  Ресторан: { color: "#F5BE32", icon: "Utensils", label: "Ресторан" },
  "Event Hall": { color: "#3b82f6", icon: "Building2", label: "Event Hall" },
  "Гэр Талбай": { color: "#22c55e", icon: "Tent", label: "Гэр Талбай" },
};

function CapacitySearchModal({
  onSearch,
}: {
  onSearch: (capacity: number) => void;
}) {
  const [capacity, setCapacity] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (capacity) {
      onSearch(capacity);
    }
  };

  return (
    <DialogContent className="sm:max-w-[719px] bg-[#272727] border-none z-[1100]">
      <DialogHeader>
        <DialogTitle className="text-white">Зочдын тоо</DialogTitle>
        <DialogDescription className="text-gray-400">
          Та хэдэн хүн бодож байна?
        </DialogDescription>
      </DialogHeader>
      <form onSubmit={handleSubmit} className="grid gap-4 py-4">
        <div className="grid gap-2">
          <Label htmlFor="capacity" className="text-white">
            Хүний тоо
          </Label>
          <Input
            id="capacity"
            type="number"
            min="1"
            value={capacity || ""}
            onChange={(e) => setCapacity(Number(e.target.value))}
            className="bg-[#1C1C1C] border-gray-700 text-white"
            placeholder="Жишээ нь: 10"
          />
        </div>
        <Button type="submit" className="bg-amber-500 hover:bg-amber-600">
          Хайх
        </Button>
      </form>
    </DialogContent>
  );
}

function getAreaCategory(location: [number, number]): VenueType {
  const centerPoint = [47.9184, 106.9177];
  const distance = Math.sqrt(
    Math.pow(location[0] - centerPoint[0], 2) +
      Math.pow(location[1] - centerPoint[1], 2)
  );
  if (distance <= 0.005) return "A Area";
  if (distance <= 0.015) return "B Area";
  return "C Area";
}

export default function MapPage() {
  const { user, isLoggedIn, logout } = useUser();
  const [selectedVenueTypes, setSelectedVenueTypes] = useState<VenueType[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 3000000]);
  const [maxPrice] = useState(3000000);
  const [sortType, setSortType] = useState<"new" | "discount" | "price" | null>(
    null
  );
  const [headerSearch, setHeaderSearch] = useState("");
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [selectedVenue, setSelectedVenue] = useState<Venue | null>(null);
  const [showAnnouncement, setShowAnnouncement] = useState(true);
  const [showCapacityModal, setShowCapacityModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState<string | null>(null);
  const [selectedRatings, setSelectedRatings] = useState<number[]>([]);
  const [selectedArea, setSelectedArea] = useState<
    "All" | "A Area" | "B Area" | "C Area"
  >("All");

  const navLinks = [
    { name: "Захиалах", href: "#", active: true },
    { name: "Түрээслэх", href: "#", active: false },
    { name: "Зөвлөгөө", href: "#", active: false },
    { name: "Contact", href: "#", active: false },
  ];

  const handleCapacitySearch = (capacity: number) => {
    setCategory("Зочдын тоо");
    setSearchQuery(capacity.toString());
    setShowCapacityModal(false);
  };

  // Get all venues
  const allVenues = Object.values(staticData).flat();

  // Filter venues
  const filteredVenues = allVenues.filter((venue) => {
    const matchesType =
      selectedVenueTypes.length === 0 ||
      selectedVenueTypes.includes(venue.type);
    const matchesPrice =
      venue.price >= priceRange[0] && venue.price <= priceRange[1];
    const matchesCapacity =
      !category ||
      category !== "Зочдын тоо" ||
      !searchQuery ||
      (venue.capacity && venue.capacity >= parseInt(searchQuery));
    const matchesRating =
      selectedRatings.length === 0 || selectedRatings.includes(venue.stars);
    const matchesArea =
      selectedArea === "All" ||
      getAreaCategory(venue.location) === selectedArea;
    return (
      matchesType &&
      matchesPrice &&
      matchesCapacity &&
      matchesRating &&
      matchesArea
    );
  });

  // Sort venues
  const sortedVenues = useMemo(() => {
    return filteredVenues.sort((a, b) => {
      if (sortType === "new") {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      } else if (sortType === "discount") {
        return (b.sale || 0) - (a.sale || 0);
      } else if (sortType === "price") {
        const priceA = a.sale ? a.price * (1 - a.sale / 100) : a.price;
        const priceB = b.sale ? b.price * (1 - b.sale / 100) : b.price;
        return priceA - priceB;
      }
      return 0;
    });
  }, [filteredVenues, sortType]);

  const handleVenueTypeChange = (venueType: VenueType) => {
    setSelectedVenueTypes((prev) =>
      prev.includes(venueType)
        ? prev.filter((type) => type !== venueType)
        : [...prev, venueType]
    );
  };

  const handleSort = (type: "new" | "discount" | "price") => {
    setSortType(type);
  };

  const handleRatingChange = (rating: number) => {
    setSelectedRatings((prev) =>
      prev.includes(rating)
        ? prev.filter((r) => r !== rating)
        : [...prev, rating]
    );
  };

  return (
    <div className="h-screen flex flex-col bg-[#141414]">
      {/* Announcement */}
      {showAnnouncement && (
        <div className="bg-[#2C2C2C]/50 text-white w-full py-2 px-4 flex items-center justify-between">
          <div className="flex-1 text-center text-sm md:text-base">
            Novotel hotel - MoD/n Tok Restaurant - Хуримын урьдчилсан захиалга
            20% хямдрал....
          </div>
          <button
            onClick={() => setShowAnnouncement(false)}
            className="text-white hover:text-gray-300 p-1"
            aria-label="Close announcement"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Header */}
      <header className="py-2 md:px-[140px] px-6 border-b border-gray-800 shrink-0">
        <div className="flex items-center justify-between">
          <Link href="/restaurant" className="flex items-center gap-2">
            <Image
              alt="Restaurant logo"
              width={30}
              height={30}
              priority
              src="/Logo.svg"
            />
            <span className="text-white text-lg font-medium">
              restaurant.mn
            </span>
          </Link>

          <div className="hidden md:flex items-center bg-[#333333]/80 rounded-md h-[40px] py-4 w-full max-w-[665px] mx-8">
            <Search className="w-5 h-5 text-gray-400 ml-2" />
            <Input
              type="text"
              placeholder="Хайлт"
              value={headerSearch}
              onChange={(e) => setHeaderSearch(e.target.value)}
              className="bg-transparent border-0 text-white focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-gray-400"
            />
          </div>

          <nav className="hidden md:flex items-center gap-8">
            {!isLoggedIn ? (
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline">
                    <User className="w-5 h-5 text-white" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="p-0 border-none w-auto sm:max-w-auto">
                  <RestLogin />
                </DialogContent>
              </Dialog>
            ) : (
              <div className="relative">
                <div
                  className="flex items-center gap-3 cursor-pointer"
                  onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                >
                  <img
                    src="/bold.png"
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
                  <div className="absolute right-0 mt-2 w-16 bg-[#333333] rounded-md shadow-lg py-1 z-50">
                    <Link href="/profiletest">
                      <button className="w-full text-center px-2 py-2 text-sm text-white hover:bg-[#444444]">
                        Profile
                      </button>
                    </Link>
                    <button
                      onClick={() => {
                        logout();
                        setShowProfileDropdown(false);
                      }}
                      className="w-full text-center py-2 px-2 text-sm text-red-500 hover:bg-[#444444]"
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

      <h3 className="text-[#F5BE32] py-4 md:px-[140px] justify-start items-center flex font-['Great_Vibes'] text-2xl">
        Map View
      </h3>

      <div className="flex flex-1 md:px-[140px] mb-4 overflow-hidden">
        {/* Left Sidebar - Filters */}
        {!isFullscreen && (
          <div className="w-[278px] border-r border-gray-800 overflow-y-auto h-[85vh]">
            <div className="p-6 bg-[#272727] rounded-xl rounded-r-none h-[85vh] flex flex-col gap-10">
              {/* Categories */}
              <div>
                <h3 className="text-white font-bold text-xl mb-3">
                  CATEGORIES
                </h3>
                <div className="space-y-2">
                  {Object.keys(staticData).map((venueType) => (
                    <label
                      key={venueType}
                      className="flex items-center justify-between group cursor-pointer"
                    >
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={selectedVenueTypes.includes(
                            venueType as VenueType
                          )}
                          onChange={() =>
                            handleVenueTypeChange(venueType as VenueType)
                          }
                          className="rounded border-gray-600 text-amber-500 focus:ring-amber-500 bg-transparent"
                        />
                        <span
                          className="text-sm"
                          style={{
                            color:
                              venueTypeConfig[venueType as VenueType]?.color ||
                              "#ef4444",
                          }}
                        >
                          {venueType}
                        </span>
                      </div>
                      <span className="text-gray-400 text-sm">
                        {
                          staticData[venueType as keyof typeof staticData]
                            .length
                        }
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Star Rating */}
              <div>
                <h3 className="text-gray-400 text-sm mb-3">STAR RATING</h3>
                <div className="space-y-2">
                  {[5, 4, 3, 2, 1].map((rating) => (
                    <label
                      key={rating}
                      className="flex items-center justify-between group cursor-pointer"
                    >
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={selectedRatings.includes(rating)}
                          onChange={() => handleRatingChange(rating)}
                          className="rounded border-gray-600 text-amber-500 focus:ring-amber-500 bg-transparent"
                        />
                        <div className="flex items-center gap-1">
                          {Array.from({ length: rating }, (_, i) => (
                            <span key={i} className="text-amber-500">
                              ★
                            </span>
                          ))}
                          {Array.from({ length: 5 - rating }, (_, i) => (
                            <span key={i + rating} className="text-gray-600">
                              ★
                            </span>
                          ))}
                        </div>
                      </div>
                      <span className="text-gray-400 text-sm">
                        {
                          sortedVenues.filter((venue) => venue.stars === rating)
                            .length
                        }
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <h3 className="text-gray-400 text-sm mb-3">MENU PRICE</h3>
                <div className="px-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400">
                      {priceRange[0].toLocaleString()}₮
                    </span>
                    <span className="text-xs text-gray-400">
                      {priceRange[1].toLocaleString()}₮
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max={maxPrice}
                    value={priceRange[1]}
                    onChange={(e) =>
                      setPriceRange([priceRange[0], parseInt(e.target.value)])
                    }
                    className="w-full h-1 accent-amber-500 bg-amber-500/50 rounded-full"
                  />
                </div>
              </div>

              {/* Sort Options */}
              <div>
                <h3 className="text-gray-400 text-sm mb-3">SORT BY</h3>
                <div className="space-y-2">
                  <Button
                    variant="ghost"
                    className={`w-full justify-start ${
                      sortType === "new" ? "text-amber-500" : "text-white"
                    }`}
                    onClick={() => handleSort("new")}
                  >
                    Newest First
                  </Button>
                  <Button
                    variant="ghost"
                    className={`w-full justify-start ${
                      sortType === "discount" ? "text-amber-500" : "text-white"
                    }`}
                    onClick={() => handleSort("discount")}
                  >
                    Best Discount
                  </Button>
                  <Button
                    variant="ghost"
                    className={`w-full justify-start ${
                      sortType === "price" ? "text-amber-500" : "text-white"
                    }`}
                    onClick={() => handleSort("price")}
                  >
                    Lowest Price
                  </Button>
                </div>
              </div>

              <Button
                onClick={() => {
                  setSelectedVenueTypes([]);
                  setPriceRange([0, maxPrice]);
                  setSortType(null);
                  setSelectedRatings([]);
                  setSearchQuery("");
                }}
                className="mx-auto flex justify-center w-[150px] items-center rounded-xl bg-gradient-to-r from-[#3E3E3E] to-[#787878B2]/70 hover:opacity-90 text-white"
              >
                Reset filter
              </Button>
            </div>
          </div>
        )}

        {/* Center - Map */}
        <div className={`${isFullscreen ? "w-full" : "flex-1"} relative`}>
          <Button
            variant="outline"
            className="absolute top-4 right-4 z-[1000] bg-[#121212C7]/80 backdrop-blur-4xl"
            onClick={() => setIsFullscreen(!isFullscreen)}
          >
            {isFullscreen ? (
              <Shrink className="h-6 w-6 text-white" />
            ) : (
              <Expand className="h-6 w-6 text-white" />
            )}
          </Button>
          <div
            className={`absolute ${
              isFullscreen
                ? "top-4 left-1/2 transform -translate-x-1/2"
                : "top-4 left-1/2 transform -translate-x-1/2"
            } w-[720px] z-[1000]`}
          >
            <div className="w-full bg-[#121212C7]/80 backdrop-blur-4xl rounded-[24px] p-8 shadow-lg border border-white/10 mx-4">
              <div className="flex items-center justify-between">
                <Dialog
                  open={showCapacityModal}
                  onOpenChange={setShowCapacityModal}
                >
                  <DialogTrigger asChild>
                    <div className="flex items-center gap-2 cursor-pointer">
                      <Users className="w-5 h-5 text-gray-400" />
                      <span className="text-white">{searchQuery || "0"}</span>
                    </div>
                  </DialogTrigger>
                  <CapacitySearchModal onSearch={handleCapacitySearch} />
                </Dialog>
                <div className="h-6 w-[1px] bg-gray-600"></div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-gray-400" />
                  <span className="text-white">2025.10.03</span>
                </div>
                <div className="h-6 w-[1px] bg-gray-600"></div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-gray-400" />
                  <span className="text-white">18:00 - 23:00</span>
                </div>
                <div className="h-6 w-[1px] bg-gray-600"></div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-gray-400" />
                  <span className="text-white">Хурим</span>
                </div>
              </div>
            </div>
          </div>
          <LeafletMap
            center={[47.9184, 106.9177]}
            zoom={13}
            style={{
              height: isFullscreen ? "100vh" : "85vh",
              width: "100%",
              borderRadius: "0 24px 24px 0",
              overflow: "hidden",
            }}
            venues={sortedVenues}
            selectedVenue={selectedVenue}
            onVenueClick={setSelectedVenue}
            venueTypeConfig={venueTypeConfig}
            isFullscreen={isFullscreen}
            setIsFullscreen={setIsFullscreen}
          />
        </div>

        {/* Right Sidebar - Venue Listings */}
        {!isFullscreen && (
          <div className="w-[400px] border-l border-gray-800 overflow-hidden flex flex-col h-[85vh]">
            <div className="p-4 border-b border-gray-800 shrink-0">
              <div className="flex items-center justify-between">
                <div className="flex flex-col gap-1">
                  <h2 className="text-white font-medium">Area Categories</h2>
                  <select
                    value={selectedArea}
                    onChange={(e) =>
                      setSelectedArea(
                        e.target.value as "All" | "A Area" | "B Area" | "C Area"
                      )
                    }
                    className="bg-[#1F1F1F] text-white rounded-lg px-3 py-2 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  >
                    <option value="All">All Areas</option>
                    <option value="A Area">A Area (0-500m)</option>
                    <option value="B Area">B Area (500-1500m)</option>
                    <option value="C Area">C Area (1500m+)</option>
                  </select>
                </div>
                <span className="text-gray-400 text-sm">
                  {sortedVenues.length} results
                </span>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto">
              <div className="p-4 space-y-4">
                {sortedVenues.map((venue) => (
                  <div
                    key={venue.id}
                    className={`bg-[#1F1F1F] rounded-lg p-4 cursor-pointer transition-all ${
                      selectedVenue?.id === venue.id
                        ? "ring-2 ring-amber-500"
                        : ""
                    }`}
                    onClick={() => setSelectedVenue(venue)}
                  >
                    <div className="flex gap-4">
                      <div className="relative w-[120px] h-[110px] rounded-lg overflow-hidden shrink-0">
                        <Image
                          src={venue.image}
                          alt={venue.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div
                              style={{
                                backgroundColor:
                                  venueTypeConfig[
                                    getAreaCategory(venue.location)
                                  ]?.color || "#ef4444",
                                width: "24px",
                                height: "24px",
                                borderRadius: "50%",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
                                border: "2px solid white",
                              }}
                            >
                              <span className="text-white text-xs font-bold">
                                {getAreaCategory(venue.location).charAt(0)}
                              </span>
                            </div>
                            <h3 className="text-white font-semibold">
                              {venue.name}
                            </h3>
                          </div>
                        </div>
                        <p
                          className="text-gray-400 text-sm mt-1"
                          style={{
                            color:
                              venueTypeConfig[venue.type]?.color || "#ef4444",
                          }}
                        >
                          {venue.type}
                        </p>
                        <div className="flex flex-col gap-2 mt-2">
                          <div className="flex items-center justify-between w-full">
                            <div className="flex items-center gap-1">
                              <span className="text-gray-400">👥</span>
                              <span className="text-white text-sm">
                                {venue.capacity}
                              </span>
                            </div>
                            <div className="flex items-center gap-1">
                              {Array.from({ length: venue.stars }, (_, i) => (
                                <span key={i} className="text-amber-500">
                                  ★
                                </span>
                              ))}
                              {Array.from(
                                { length: 5 - venue.stars },
                                (_, i) => (
                                  <span
                                    key={i + venue.stars}
                                    className="text-gray-600"
                                  >
                                    ★
                                  </span>
                                )
                              )}
                            </div>
                          </div>
                          <div className="flex items-center gap-1">
                            {venue.sale ? (
                              <>
                                <span className="text-gray-400 line-through text-sm">
                                  {venue.price.toLocaleString()}₮
                                </span>
                                <span className="text-green-500 text-sm">
                                  -{venue.sale}%
                                </span>
                                <span className="text-white text-sm">
                                  {(
                                    venue.price *
                                    (1 - venue.sale / 100)
                                  ).toLocaleString()}
                                  ₮
                                </span>
                              </>
                            ) : (
                              <span className="text-white text-sm">
                                {venue.price.toLocaleString()}₮
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Floating Buttons */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-20 bg-gray-100/5 backdrop-blur-xl rounded-[24px] px-2 py-4 shadow-lg border border-white/10">
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
