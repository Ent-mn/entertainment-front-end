"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect, Suspense } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Search,
  Users,
  Calendar,
  Clock,
  MapPin,
  User,
  Sun,
  ShoppingCart,
  Heart,
  Headphones,
  Phone,
} from "lucide-react";
import { useUser } from "@/context/UserContext";
import Image from "next/image";
import Link from "next/link";
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
    <DialogContent className="sm:max-w-[425px] bg-[#272727] border-none">
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

export default function OrderTestPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <OrderTestContent />
    </Suspense>
  );
}

function OrderTestContent() {
  const searchParams = useSearchParams();
  const { user, isLoggedIn, logout } = useUser();
  const [category, setCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredMerchants, setFilteredMerchants] = useState<VenueData[]>([]);
  const [error, setError] = useState("");
  const [selectedMerchant, setSelectedMerchant] = useState<VenueData | null>(
    null
  );
  const [showBankDropdown, setShowBankDropdown] = useState(false);
  const [selectedBank, setSelectedBank] = useState<string | null>(null);
  const [headerSearch, setHeaderSearch] = useState("");
  const [headerResults, setHeaderResults] = useState<any[]>([]);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [merchants, setMerchants] = useState<any[]>([]);
  const [showAnnouncement, setShowAnnouncement] = useState(true);
  const [sortType, setSortType] = useState<string | null>(null);
  const [selectedVenueTypes, setSelectedVenueTypes] = useState<string[]>([]);
  const [selectedRatings, setSelectedRatings] = useState<number[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 0]);
  const [maxPrice, setMaxPrice] = useState(0);
  const [selectedPriceRanges, setSelectedPriceRanges] = useState<
    [number, number][]
  >([]);
  const [showCapacityModal, setShowCapacityModal] = useState(false);

  const navLinks = [
    { name: "Захиалах", href: "#", active: true },
    { name: "Түрээслэх", href: "#", active: false },
    { name: "Зөвлөгөө", href: "#", active: false },
    { name: "Contact", href: "#", active: false },
  ];

  // Get unique bank names
  const uniqueBanks = Array.from(
    new Set(merchants.map((m) => m.bank_name).filter(Boolean))
  );

  const handleBankClick = (bank: string) => {
    setSelectedBank(bank === "Capitron Bank" ? "Capitron" : bank);
    setCategory("Банк");
    setSearchQuery(bank);
    setShowBankDropdown(false);
  };

  const handleHeaderResultClick = (merchant: any) => {
    setSelectedMerchant(merchant);
    setHeaderSearch("");
    setHeaderResults([]);
  };

  const handleSeeMore = () => {
    // Implement see more functionality if needed
  };

  useEffect(() => {
    const max = Math.max(
      ...Object.values(staticData)
        .flat()
        .map((v) => v.price)
    );
    setMaxPrice(max);
    setPriceRange([0, max]);
  }, []);

  // Real-time header search filtering
  useEffect(() => {
    if (headerSearch.trim() === "") {
      setHeaderResults([]);
      return;
    }

    let filteredMerchants = merchants;

    // Apply bank filter if a bank is selected from "Төрөл"
    if (selectedBank) {
      filteredMerchants = filteredMerchants.filter((merchant) =>
        merchant.bank_name?.toLowerCase().includes(selectedBank.toLowerCase())
      );
    }

    const filtered = filteredMerchants.filter((merchant) =>
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
  }, [headerSearch, merchants, selectedBank]);

  // Add this useEffect to handle clicking outside the dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const dropdown = document.getElementById("profile-dropdown");
      const button = document.getElementById("profile-button");
      if (
        dropdown &&
        button &&
        !dropdown.contains(event.target as Node) &&
        !button.contains(event.target as Node)
      ) {
        setShowProfileDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const reservationFields = [
    {
      icon: <Users className="w-5 h-5" />,
      label: "Зочдын тоо",
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

  const staticData = {
    "Зочдын тоо": [
      {
        id: 1001,
        name: "Restaurant",
        capacity: 2,
        stars: 5,
        price: 90000,
        date: "2024-04-01",
        sale: 20,
        image: "/static/1.avif",
        type: "Ресторан",
      },
      {
        id: 1002,
        name: "Restaurant",
        capacity: 4,
        stars: 4,
        price: 120000,
        date: "2024-04-02",
        image: "/static/2.avif",
        type: "Ресторан",
      },
      {
        id: 1003,
        name: "Restaurant",
        capacity: 6,
        stars: 5,
        price: 150000,
        date: "2024-04-03",
        sale: 15,
        image: "/static/3.avif",
        type: "Ресторан",
      },
      {
        id: 1004,
        name: "Restaurant",
        capacity: 8,
        stars: 3,
        price: 180000,
        date: "2024-03-30",
        image: "/static/4.avif",
        type: "Ресторан",
      },
      {
        id: 1005,
        name: "Restaurant",
        capacity: 10,
        stars: 4,
        price: 200000,
        date: "2024-04-01",
        sale: 10,
        image: "/static/5.avif",
        type: "Ресторан",
      },
      {
        id: 1006,
        name: "Restaurant",
        capacity: 15,
        stars: 5,
        price: 250000,
        date: "2024-03-29",
        image: "/static/6.avif",
        type: "Ресторан",
      },
      {
        id: 1007,
        name: "Restaurant",
        capacity: 30,
        stars: 4,
        price: 300000,
        date: "2024-03-28",
        sale: 25,
        image: "/static/7.avif",
        type: "Ресторан",
      },
      {
        id: 1008,
        name: "Restaurant",
        capacity: 50,
        stars: 5,
        price: 400000,
        date: "2024-03-27",
        image: "/static/8.avif",
        type: "Ресторан",
      },
      {
        id: 1009,
        name: "Restaurant",
        capacity: 100,
        stars: 3,
        price: 500000,
        date: "2024-03-26",
        sale: 30,
        image: "/static/1.avif",
        type: "Ресторан",
      },
      {
        id: 1010,
        name: "Restaurant",
        capacity: 200,
        stars: 4,
        price: 600000,
        date: "2024-03-25",
        image: "/static/2.avif",
        type: "Ресторан",
      },
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
      },
      {
        id: 2002,
        name: "Corporate Center",
        capacity: 200,
        stars: 4,
        price: 1200000,
        date: "2024-04-02",
        image: "/static/4.avif",
        type: "Event Hall",
      },
      {
        id: 2003,
        name: "Luxury Hall",
        capacity: 500,
        stars: 5,
        price: 2000000,
        date: "2024-04-03",
        sale: 20,
        image: "/static/5.avif",
        type: "Event Hall",
      },
      {
        id: 2004,
        name: "Conference Hall",
        capacity: 150,
        stars: 4,
        price: 800000,
        date: "2024-03-30",
        image: "/static/6.avif",
        type: "Event Hall",
      },
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
      },
      {
        id: 3002,
        name: "Богд Хан Resort",
        capacity: 150,
        stars: 4,
        price: 1100000,
        date: "2024-04-02",
        image: "/static/8.avif",
        type: "Гэр Талбай",
      },
      {
        id: 3003,
        name: "Хөвсгөл Resort",
        capacity: 200,
        stars: 5,
        price: 1300000,
        date: "2024-04-03",
        sale: 15,
        image: "/static/1.avif",
        type: "Гэр Талбай",
      },
    ],
    Театр: [
      {
        id: 4001,
        name: "Драмын Театр",
        capacity: 400,
        stars: 5,
        price: 1800000,
        date: "2024-04-01",
        sale: 20,
        image: "/static/2.avif",
        type: "Театр",
      },
      {
        id: 4002,
        name: "Дуурь Бүжгийн Театр",
        capacity: 500,
        stars: 5,
        price: 2000000,
        date: "2024-04-02",
        image: "/static/3.avif",
        type: "Театр",
      },
      {
        id: 4003,
        name: "Хүүхдийн Театр",
        capacity: 300,
        stars: 4,
        price: 1500000,
        date: "2024-04-03",
        sale: 15,
        image: "/static/4.avif",
        type: "Театр",
      },
    ],
    Complex: [
      {
        id: 5001,
        name: "Blue Sky Tower",
        capacity: 1000,
        stars: 5,
        price: 3000000,
        date: "2024-04-01",
        sale: 10,
        image: "/static/5.avif",
        type: "Complex",
      },
      {
        id: 5002,
        name: "Shangri-La Center",
        capacity: 800,
        stars: 5,
        price: 2500000,
        date: "2024-04-02",
        image: "/static/6.avif",
        type: "Complex",
      },
      {
        id: 5003,
        name: "Corporate Hotel",
        capacity: 600,
        stars: 4,
        price: 2000000,
        date: "2024-04-03",
        sale: 15,
        image: "/static/7.avif",
        type: "Complex",
      },
      {
        id: 5004,
        name: "Central Tower",
        capacity: 500,
        stars: 4,
        price: 1800000,
        date: "2024-03-30",
        image: "/static/8.avif",
        type: "Complex",
      },
    ],
    дугаар: [
      {
        id: 6001,
        phone: "99119911",
        name: "Болд",
        stars: 5,
        price: 95000,
        date: "2024-04-01",
        sale: 20,
      },
      {
        id: 6002,
        phone: "99229922",
        name: "Сараа",
        stars: 4,
        price: 125000,
        date: "2024-04-02",
      },
      {
        id: 6003,
        phone: "99339933",
        name: "Бат",
        stars: 3,
        price: 155000,
        date: "2024-04-03",
      },
      {
        id: 6004,
        phone: "99449944",
        name: "Дорж",
        stars: 5,
        price: 185000,
        date: "2024-03-30",
        sale: 15,
      },
      {
        id: 6005,
        phone: "99559955",
        name: "Ганбаатар",
        stars: 4,
        price: 205000,
        date: "2024-04-01",
      },
    ],
    имэйл: [
      {
        id: 7001,
        email: "bold@example.com",
        name: "Болд",
        stars: 5,
        price: 92000,
        date: "2024-04-01",
        sale: 20,
      },
      {
        id: 7002,
        email: "saraa@example.com",
        name: "Сараа",
        stars: 4,
        price: 122000,
        date: "2024-04-02",
      },
      {
        id: 7003,
        email: "bat@example.com",
        name: "Бат",
        stars: 3,
        price: 152000,
        date: "2024-04-03",
        sale: 15,
      },
      {
        id: 7004,
        email: "dorj@example.com",
        name: "Дорж",
        stars: 5,
        price: 182000,
        date: "2024-03-30",
      },
      {
        id: 7005,
        email: "ganbaatar@example.com",
        name: "Ганбаатар",
        stars: 4,
        price: 202000,
        date: "2024-04-01",
        sale: 10,
      },
    ],
    Банк: [
      {
        id: 8001,
        bank_name: "Хаан банк",
        account: "123456789",
        stars: 5,
        price: 98000,
        date: "2024-04-01",
        sale: 20,
      },
      {
        id: 8002,
        bank_name: "Төрийн банк",
        account: "987654321",
        stars: 4,
        price: 128000,
        date: "2024-04-02",
      },
      {
        id: 8003,
        bank_name: "Голомт банк",
        account: "456789123",
        stars: 5,
        price: 158000,
        date: "2024-04-03",
        sale: 15,
      },
      {
        id: 8004,
        bank_name: "Хас банк",
        account: "789123456",
        stars: 3,
        price: 188000,
        date: "2024-03-30",
      },
      {
        id: 8005,
        bank_name: "Монгол банк",
        account: "321654987",
        stars: 4,
        price: 208000,
        date: "2024-04-01",
        sale: 10,
      },
    ],
  };

  useEffect(() => {
    if (searchParams) {
      const queryCategory = searchParams.get("category");
      const querySearch = searchParams.get("searchQuery");
      const queryData = searchParams.get("data");
      const queryType = searchParams.get("type");

      // Get all venues from staticData
      const allVenues = Object.values(staticData).flat() as VenueData[];
      let filtered = allVenues;

      // Apply type filter if present
      if (queryType) {
        const decodedType = decodeURIComponent(queryType);
        setSelectedVenueTypes([decodedType]);
        setCategory(decodedType);
        filtered = filtered.filter((item) => item.type === decodedType);
      }

      // Apply category and search filters if present
      if (queryCategory) {
        setCategory(decodeURIComponent(queryCategory));
        if (querySearch) {
          setSearchQuery(decodeURIComponent(querySearch));
          const searchNumber = parseInt(querySearch);
          if (queryCategory === "Зочдын тоо" && !isNaN(searchNumber)) {
            filtered = filtered.filter(
              (item) => item.capacity && item.capacity >= searchNumber
            );
          } else {
            filtered = filtered.filter((item) =>
              Object.values(item)
                .filter((value) => value !== undefined)
                .join(" ")
                .toLowerCase()
                .includes(querySearch.toLowerCase())
            );
          }
        }
      }

      // Apply data filter if present
      if (queryData) {
        try {
          const decodedData = decodeURIComponent(queryData);
          const parsedData = JSON.parse(decodedData);
          filtered = parsedData;
        } catch (err) {
          console.error("Error parsing data from URL:", err);
          setError("Failed to load data from URL");
        }
      }

      setFilteredMerchants(filtered);
    }
  }, [searchParams]);

  // Filter data based on category and search query changes
  useEffect(() => {
    const allVenues = Object.values(staticData).flat() as VenueData[];
    let filtered = allVenues;

    // Apply venue type filter if selected
    if (selectedVenueTypes.length > 0) {
      filtered = filtered.filter((item) =>
        selectedVenueTypes.includes(item.type || "Ресторан")
      );
    }

    // Apply category and search query filters if they exist
    if (category && searchQuery) {
      filtered = filtered.filter((item) => {
        if (category === "Зочдын тоо" && !isNaN(parseInt(searchQuery))) {
          return item.capacity && item.capacity >= parseInt(searchQuery);
        }
        return Object.values(item)
          .filter((value) => value !== undefined)
          .join(" ")
          .toLowerCase()
          .includes(searchQuery.toLowerCase());
      });
    }

    setFilteredMerchants(filtered);
  }, [searchQuery, category, selectedVenueTypes]);

  // Add function to handle checkbox changes
  const handleVenueTypeChange = (venueType: string) => {
    setSelectedVenueTypes((prev) => {
      const newTypes = prev.includes(venueType)
        ? prev.filter((type) => type !== venueType)
        : [...prev, venueType];

      // Filter data based on the venue types
      const allVenues = Object.values(staticData).flat() as VenueData[];
      let filtered = allVenues;

      // Apply venue type filter
      if (newTypes.length > 0) {
        filtered = filtered.filter((item) =>
          newTypes.includes(item.type || "Ресторан")
        );
      }

      // Apply additional filters if they exist
      if (category && searchQuery) {
        filtered = filtered.filter((item) => {
          if (category === "Зочдын тоо" && !isNaN(parseInt(searchQuery))) {
            return item.capacity && item.capacity >= parseInt(searchQuery);
          }
          return Object.values(item)
            .filter((value) => value !== undefined)
            .join(" ")
            .toLowerCase()
            .includes(searchQuery.toLowerCase());
        });
      }

      setFilteredMerchants(filtered);
      return newTypes;
    });
  };

  const handleCategoryClick = (label: string) => {
    setCategory(label);
    setSearchQuery("");
    setSelectedMerchant(null);

    // Update filtered merchants based on category
    if (staticData[label as keyof typeof staticData]) {
      setFilteredMerchants(
        staticData[label as keyof typeof staticData] as VenueData[]
      );
    } else {
      setFilteredMerchants([]);
    }
  };

  const handleMerchantClick = (merchant: any) => {
    setSelectedMerchant(merchant);
  };

  const handleSort = (type: string) => {
    setSortType(type);
    if (filteredMerchants.length > 0) {
      let sortedMerchants = [...filteredMerchants];
      switch (type) {
        case "stars":
          sortedMerchants.sort((a, b) => b.stars - a.stars);
          break;
        case "new":
          sortedMerchants.sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
          );
          break;
        case "discount":
          sortedMerchants.sort((a, b) => (b.sale || 0) - (a.sale || 0));
          break;
        case "price":
          sortedMerchants.sort((a, b) => {
            const priceA = a.sale ? a.price * (1 - a.sale / 100) : a.price;
            const priceB = b.sale ? b.price * (1 - b.sale / 100) : b.price;
            return priceA - priceB;
          });
          break;
        default:
          break;
      }
      setFilteredMerchants(sortedMerchants);
    }
  };

  // Add function to handle rating changes
  const handleRatingChange = (rating: number) => {
    setSelectedRatings((prev) => {
      const newRatings = prev.includes(rating)
        ? prev.filter((r) => r !== rating)
        : [...prev, rating];

      // Filter data based on the ratings
      const allVenues = Object.values(staticData).flat() as VenueData[];
      let filtered = allVenues;

      // Apply rating filter
      if (newRatings.length > 0) {
        filtered = filtered.filter((item) => newRatings.includes(item.stars));
      }

      // Apply venue type filter
      if (selectedVenueTypes.length > 0) {
        filtered = filtered.filter((item) =>
          selectedVenueTypes.includes(item.type || "Ресторан")
        );
      }

      // Apply additional filters if they exist
      if (category && searchQuery) {
        filtered = filtered.filter((item) => {
          if (category === "Зочдын тоо" && !isNaN(parseInt(searchQuery))) {
            return item.capacity && item.capacity >= parseInt(searchQuery);
          }
          return Object.values(item)
            .filter((value) => value !== undefined)
            .join(" ")
            .toLowerCase()
            .includes(searchQuery.toLowerCase());
        });
      }

      setFilteredMerchants(filtered);
      return newRatings;
    });
  };

  const handlePriceRangeChange = (value: [number, number]) => {
    setPriceRange(value);

    // Filter data based on price range
    const allVenues = Object.values(staticData).flat() as VenueData[];
    let filtered = allVenues;

    // Apply price range filter
    filtered = filtered.filter(
      (item) => item.price >= value[0] && item.price <= value[1]
    );

    // Apply existing filters
    if (selectedVenueTypes.length > 0) {
      filtered = filtered.filter((item) =>
        selectedVenueTypes.includes(item.type || "Ресторан")
      );
    }

    if (selectedRatings.length > 0) {
      filtered = filtered.filter((item) =>
        selectedRatings.includes(item.stars)
      );
    }

    if (category && searchQuery) {
      filtered = filtered.filter((item) => {
        if (category === "Зочдын тоо" && !isNaN(parseInt(searchQuery))) {
          return item.capacity && item.capacity >= parseInt(searchQuery);
        }
        return Object.values(item)
          .filter((value) => value !== undefined)
          .join(" ")
          .toLowerCase()
          .includes(searchQuery.toLowerCase());
      });
    }

    setFilteredMerchants(filtered);
  };

  const handlePriceRangeCheckboxChange = (range: [number, number]) => {
    setSelectedPriceRanges((prev) => {
      const isSelected = prev.some(
        ([min, max]) => min === range[0] && max === range[1]
      );

      const newRanges = isSelected
        ? prev.filter(([min, max]) => !(min === range[0] && max === range[1]))
        : [...prev, range];

      // Filter data based on the price ranges
      const allVenues = Object.values(staticData).flat() as VenueData[];
      let filtered = allVenues;

      // Apply price range filter
      if (newRanges.length > 0) {
        filtered = filtered.filter((item) =>
          newRanges.some(([min, max]) => item.price >= min && item.price <= max)
        );
      }

      // Apply existing filters
      if (selectedVenueTypes.length > 0) {
        filtered = filtered.filter((item) =>
          selectedVenueTypes.includes(item.type || "Ресторан")
        );
      }

      if (selectedRatings.length > 0) {
        filtered = filtered.filter((item) =>
          selectedRatings.includes(item.stars)
        );
      }

      if (category && searchQuery) {
        filtered = filtered.filter((item) => {
          if (category === "Зочдын тоо" && !isNaN(parseInt(searchQuery))) {
            return item.capacity && item.capacity >= parseInt(searchQuery);
          }
          return Object.values(item)
            .filter((value) => value !== undefined)
            .join(" ")
            .toLowerCase()
            .includes(searchQuery.toLowerCase());
        });
      }

      setFilteredMerchants(filtered);
      return newRanges;
    });
  };

  const handleCapacitySearch = (capacity: number) => {
    setCategory("Зочдын тоо");
    setSearchQuery(capacity.toString());
    setShowCapacityModal(false);
  };

  if (error) {
    return (
      <div className="p-6 text-red-500 bg-gray-800 min-h-screen flex items-center justify-center">
        <p>{error}</p>
      </div>
    );
  }

  const renderMerchantField = (merchant: any) => {
    if (!category) return <p className="text-gray-400">No category selected</p>;
    return (
      <div className="flex flex-col mt-2 gap-[55px]">
        {renderBasicInfo(merchant)}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-amber-500">
            {Array.from({ length: merchant.stars }, (_, i) => (
              <span key={i}>★</span>
            ))}
            {Array.from({ length: 5 - merchant.stars }, (_, i) => (
              <span key={i + merchant.stars} className="text-gray-600">
                ★
              </span>
            ))}
          </div>
          <div className="flex items-center gap-4">
            {merchant.sale && (
              <span className="text-green-500 text-sm">-{merchant.sale}%</span>
            )}
            <div className="flex flex-col items-end">
              {merchant.sale && (
                <span className="text-gray-400 text-sm line-through">
                  {merchant.price.toLocaleString()}₮
                </span>
              )}
              <span className="text-white font-medium">
                {merchant.sale
                  ? (
                      merchant.price *
                      (1 - merchant.sale / 100)
                    ).toLocaleString()
                  : merchant.price.toLocaleString()}
                ₮
              </span>
            </div>
          </div>
        </div>
        <div className="text-gray-400 text-sm">
          Added: {new Date(merchant.date).toLocaleDateString()}
        </div>
      </div>
    );
  };

  const renderBasicInfo = (merchant: any) => {
    switch (category) {
      case "Зочдын тоо":
        return (
          <p className="text-white">
            {merchant.name} (Capacity: {merchant.capacity})
          </p>
        );
      case "дугаар":
        return (
          <p className="text-white">
            <strong>Утас:</strong> {merchant.phone}
          </p>
        );
      case "имэйл":
        return (
          <p className="text-white">
            <strong>Имэйл:</strong> {merchant.email}
          </p>
        );
      case "Банк":
        return (
          <p className="text-white">
            <strong>Банк:</strong> {merchant.bank_name}
          </p>
        );
      default:
        return <p className="text-white">{merchant.name}</p>;
    }
  };

  const renderAllData = (merchant: any) => {
    if (!merchant) return null;
    return (
      <div className="mt-4 bg-[#333333] p-4 rounded-md space-y-2">
        <h2 className="text-lg font-semibold text-white">Selected Data</h2>
        {Object.entries(merchant).map(([key, value]) => (
          <p key={key} className="text-white">
            <strong>{key}:</strong> {String(value)}
          </p>
        ))}
      </div>
    );
  };

  return (
    <div className="relative min-h-screen w-full bg-[#141414] flex flex-col">
      <div className="relative z-10 flex flex-col min-h-screen">
        {showAnnouncement && (
          <div className="bg-[#2C2C2C] text-white w-full py-2 px-4 flex items-center justify-between">
            <div className="flex-1 text-center text-sm md:text-base">
              Novotel hotel - MoD/n Tok Restaurant - Хуримын урьдчилсан захиалга
              20% хямдрал....
            </div>
            <button
              onClick={() => setShowAnnouncement(false)}
              className="text-white hover:text-gray-300 p-1"
              aria-label="Close announcement">
              <svg
                className="w-4 h-4"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
        )}
        <header className="py-4 md:px-[100px] px-6">
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

            <div className="hidden md:flex items-center bg-[#333333]/80 rounded-md   w-full max-w-[665px] mx-8 relative">
              <div
                onClick={() => setShowBankDropdown(!showBankDropdown)}
                className="flex bg-[#78787866] py-2 px-4 cursor-pointer rounded-l-lg  items-center gap-2 border-r border-gray-500  relative">
                <span className="text-white  text-sm cursor-pointer">
                  {selectedBank || "Төрөл"}
                </span>
                <svg
                  className="w-4 h-4 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor">
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
                        onClick={() => handleBankClick(bank)}>
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
                      onClick={() => handleHeaderResultClick(merchant)}>
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
                      onClick={handleSeeMore}>
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
                  }`}>
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
                    onClick={() =>
                      setShowProfileDropdown(!showProfileDropdown)
                    }>
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
                      className="absolute right-0 mt-2 w-16 bg-[#333333] rounded-md shadow-lg py-1 z-50">
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
                        className="w-full text-center py-2 px-2 text-sm text-red-500 hover:bg-[#444444] transition-colors duration-150">
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
                stroke="currentColor">
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
        <main className="flex-1 flex flex-col items-center px-4 py-8">
          <div className="w-full max-w-7xl flex gap-6">
            {/* Left sidebar with categories */}
            <div className="w-72 flex-shrink-0">
              <div className="bg-[#272727] rounded-2xl p-6">
                <div className="flex items-center justify-center mb-4">
                  <span className="text-gray-400 text-sm">FILTERS</span>
                </div>

                {/* Categories section */}
                <div className="mb-6">
                  <h3 className="text-gray-400 text-sm mb-3">CATEGORIES</h3>
                  <div className="space-y-2">
                    <label className="flex items-center justify-between group cursor-pointer">
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={selectedVenueTypes.includes("Ресторан")}
                          onChange={() => handleVenueTypeChange("Ресторан")}
                          className="rounded border-gray-600 text-amber-500 focus:ring-amber-500 bg-transparent"
                        />
                        <span className="text-white text-sm">Ресторан</span>
                      </div>
                      <span className="text-gray-400 text-sm">156</span>
                    </label>
                    <label className="flex items-center justify-between group cursor-pointer">
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={selectedVenueTypes.includes("Event Hall")}
                          onChange={() => handleVenueTypeChange("Event Hall")}
                          className="rounded border-gray-600 text-amber-500 focus:ring-amber-500 bg-transparent"
                        />
                        <span className="text-white text-sm">Event Hall</span>
                      </div>
                      <span className="text-gray-400 text-sm">17</span>
                    </label>
                    <label className="flex items-center justify-between group cursor-pointer">
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={selectedVenueTypes.includes("Гэр Талбай")}
                          onChange={() => handleVenueTypeChange("Гэр Талбай")}
                          className="rounded border-gray-600 text-amber-500 focus:ring-amber-500 bg-transparent"
                        />
                        <span className="text-white text-sm">Гэр Талбай</span>
                      </div>
                      <span className="text-gray-400 text-sm">5</span>
                    </label>
                    <label className="flex items-center justify-between group cursor-pointer">
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={selectedVenueTypes.includes("Театр")}
                          onChange={() => handleVenueTypeChange("Театр")}
                          className="rounded border-gray-600 text-amber-500 focus:ring-amber-500 bg-transparent"
                        />
                        <span className="text-white text-sm">Театр</span>
                      </div>
                      <span className="text-gray-400 text-sm">3</span>
                    </label>
                    <label className="flex items-center justify-between group cursor-pointer">
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={selectedVenueTypes.includes("Complex")}
                          onChange={() => handleVenueTypeChange("Complex")}
                          className="rounded border-gray-600 text-amber-500 focus:ring-amber-500 bg-transparent"
                        />
                        <span className="text-white text-sm">Complex</span>
                      </div>
                      <span className="text-gray-400 text-sm">4</span>
                    </label>
                  </div>
                </div>

                {/* Rating section */}
                <div className="mb-6">
                  <h3 className="text-gray-400 text-sm mb-3">RATING</h3>
                  <div className="space-y-2">
                    <label className="flex items-center justify-between group cursor-pointer">
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={selectedRatings.includes(5)}
                          onChange={() => handleRatingChange(5)}
                          className="rounded border-gray-600 text-amber-500 focus:ring-amber-500 bg-transparent"
                        />
                        <div className="flex items-center">{"★".repeat(5)}</div>
                      </div>
                    </label>
                    <label className="flex items-center justify-between group cursor-pointer">
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={selectedRatings.includes(4)}
                          onChange={() => handleRatingChange(4)}
                          className="rounded border-gray-600 text-amber-500 focus:ring-amber-500 bg-transparent"
                        />
                        <div className="flex items-center">{"★".repeat(4)}</div>
                      </div>
                    </label>
                    <label className="flex items-center justify-between group cursor-pointer">
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={selectedRatings.includes(3)}
                          onChange={() => handleRatingChange(3)}
                          className="rounded border-gray-600 text-amber-500 focus:ring-amber-500 bg-transparent"
                        />
                        <div className="flex items-center">{"★".repeat(3)}</div>
                      </div>
                    </label>
                    <label className="flex items-center justify-between group cursor-pointer">
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={selectedRatings.includes(2)}
                          onChange={() => handleRatingChange(2)}
                          className="rounded border-gray-600 text-amber-500 focus:ring-amber-500 bg-transparent"
                        />
                        <div className="flex items-center">{"★".repeat(2)}</div>
                      </div>
                    </label>
                    <label className="flex items-center justify-between group cursor-pointer">
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={selectedRatings.includes(1)}
                          onChange={() => handleRatingChange(1)}
                          className="rounded border-gray-600 text-amber-500 focus:ring-amber-500 bg-transparent"
                        />
                        <div className="flex items-center">{"★".repeat(1)}</div>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Menu Price section */}
                <div className="mb-6">
                  <h3 className="text-gray-400 text-sm mb-3">MENU PRICE</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-400">
                        {priceRange[0].toLocaleString()}₮
                      </span>
                      <span className="text-xs text-gray-400">
                        {priceRange[1].toLocaleString()}₮
                      </span>
                    </div>
                    <div className="relative h-2">
                      <div className="absolute w-full h-2 bg-gray-700 rounded-lg"></div>
                      <div
                        className="absolute h-2 bg-amber-500 rounded-lg"
                        style={{
                          left: `${(priceRange[0] / maxPrice) * 100}%`,
                          width: `${
                            ((priceRange[1] - priceRange[0]) / maxPrice) * 100
                          }%`,
                        }}
                      />
                      <input
                        type="range"
                        min={0}
                        max={maxPrice}
                        value={priceRange[0]}
                        onChange={(e) =>
                          handlePriceRangeChange([
                            parseInt(e.target.value),
                            priceRange[1],
                          ])
                        }
                        className="absolute top-0 w-full h-2 opacity-0 cursor-pointer"
                      />
                      <input
                        type="range"
                        min={0}
                        max={maxPrice}
                        value={priceRange[1]}
                        onChange={(e) =>
                          handlePriceRangeChange([
                            priceRange[0],
                            parseInt(e.target.value),
                          ])
                        }
                        className="absolute top-0 w-full h-2 opacity-0 cursor-pointer"
                      />
                    </div>
                  </div>
                </div>

                {/* Price Range section */}
                <div>
                  <h3 className="text-gray-400 text-sm mb-3">PRICE RANGE</h3>
                  <div className="space-y-2">
                    <label className="flex items-center justify-between group cursor-pointer">
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={selectedPriceRanges.some(
                            ([min, max]) => min === 0 && max === 750000
                          )}
                          onChange={() =>
                            handlePriceRangeCheckboxChange([0, 750000])
                          }
                          className="rounded border-gray-600 text-amber-500 focus:ring-amber-500 bg-transparent"
                        />
                        <span className="text-white text-sm">
                          0₮ - 750,000₮
                        </span>
                      </div>
                    </label>
                    <label className="flex items-center justify-between group cursor-pointer">
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={selectedPriceRanges.some(
                            ([min, max]) => min === 750000 && max === 1500000
                          )}
                          onChange={() =>
                            handlePriceRangeCheckboxChange([750000, 1500000])
                          }
                          className="rounded border-gray-600 text-amber-500 focus:ring-amber-500 bg-transparent"
                        />
                        <span className="text-white text-sm">
                          750,000₮ - 1,500,000₮
                        </span>
                      </div>
                    </label>
                    <label className="flex items-center justify-between group cursor-pointer">
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={selectedPriceRanges.some(
                            ([min, max]) => min === 1500000 && max === 2250000
                          )}
                          onChange={() =>
                            handlePriceRangeCheckboxChange([1500000, 2250000])
                          }
                          className="rounded border-gray-600 text-amber-500 focus:ring-amber-500 bg-transparent"
                        />
                        <span className="text-white text-sm">
                          1,500,000₮ - 2,250,000₮
                        </span>
                      </div>
                    </label>
                    <label className="flex items-center justify-between group cursor-pointer">
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={selectedPriceRanges.some(
                            ([min, max]) => min === 2250000 && max === 3000000
                          )}
                          onChange={() =>
                            handlePriceRangeCheckboxChange([2250000, 3000000])
                          }
                          className="rounded border-gray-600 text-amber-500 focus:ring-amber-500 bg-transparent"
                        />
                        <span className="text-white text-sm">
                          2,250,000₮ - 3,000,000₮
                        </span>
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Main content */}
            <div className="flex-1">
              <div className="relative">
                <div className="relative w-full h-[200px] rounded-2xl overflow-hidden">
                  <Image
                    src="/static/1.avif"
                    alt="Mountain landscape"
                    fill
                    priority
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>
                  <div className="absolute inset-x-0 bottom-0 h-full bg-gradient-to-t from-black/10 to-transparent"></div>
                </div>
                <div className="absolute left-1/2 -translate-x-1/2 w-[90%] top-[150px]">
                  <div className="w-full bg-gray-400/10 backdrop-blur-4xl rounded-[24px] p-8 shadow-lg border border-white/10">
                    <div className="flex items-center justify-between">
                      <div className="flex cursor-pointer items-center gap-2">
                        <Dialog
                          open={showCapacityModal}
                          onOpenChange={setShowCapacityModal}>
                          <DialogTrigger asChild>
                            <div className="flex items-center gap-2 cursor-pointer">
                              <Users className="w-5 h-5 text-gray-400" />
                              <span className="text-white">
                                {searchQuery || "0"}
                              </span>
                            </div>
                          </DialogTrigger>
                          <CapacitySearchModal
                            onSearch={handleCapacitySearch}
                          />
                        </Dialog>
                      </div>
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

                  {/* <div className="w-full rounded-[24px] shadow-lg mt-4">
                    <div className="flex items-center gap-3">
                      <div className="text-sm py-2 text-white">
                        APPLIED FILTERS:
                      </div>

                      <div className="flex flex-wrap items-center gap-2">
                        {category && searchQuery && (
                          <div className="bg-[#9E9D9C]/50 text-white px-4 py-2 rounded-lg text-sm flex items-center gap-2">
                            {category === "Зочдын тоо"
                              ? `${category} ${searchQuery}`
                              : searchQuery}
                            <button
                              onClick={() => {
                                setCategory(null);
                                setSearchQuery("");
                              }}
                              className="text-gray-400 hover:text-white ml-2"
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
                        {selectedBank && (
                          <div className="bg-[#9E9D9C]/50 text-white px-4 py-2 rounded-lg text-sm flex items-center gap-2">
                            {selectedBank}
                            <button
                              onClick={() => setSelectedBank(null)}
                              className="text-gray-400 hover:text-white ml-2"
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
                        {selectedVenueTypes.length > 0 && (
                          <div className="bg-[#9E9D9C]/50 text-white px-4 py-2 rounded-lg text-sm flex items-center gap-2">
                            {selectedVenueTypes.join(", ")}
                            <button
                              onClick={() => setSelectedVenueTypes([])}
                              className="text-gray-400 hover:text-white ml-2"
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
                        {selectedRatings.length > 0 && (
                          <div className="bg-[#9E9D9C]/50 text-white px-4 py-2 rounded-lg text-sm flex items-center gap-2">
                            {selectedRatings
                              .map((rating) => "★".repeat(rating))
                              .join(", ")}
                            <button
                              onClick={() => setSelectedRatings([])}
                              className="text-gray-400 hover:text-white ml-2"
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
                        {selectedPriceRanges.length > 0 && (
                          <div className="bg-[#9E9D9C]/50 text-white px-4 py-2 rounded-lg text-sm flex items-center gap-2">
                            {selectedPriceRanges
                              .map(
                                ([min, max]) =>
                                  `${min.toLocaleString()}₮ - ${max.toLocaleString()}₮`
                              )
                              .join(", ")}
                            <button
                              onClick={() => setSelectedPriceRanges([])}
                              className="text-gray-400 hover:text-white ml-2"
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
                        {(priceRange[0] > 0 || priceRange[1] < maxPrice) && (
                          <div className="bg-[#1C1C1C] text-white px-4 py-2 rounded-lg text-sm flex items-center gap-2">
                            {`${priceRange[0].toLocaleString()}₮ - ${priceRange[1].toLocaleString()}₮`}
                            <button
                              onClick={() => {
                                setPriceRange([0, maxPrice]);
                              }}
                              className="text-gray-400 hover:text-white ml-2"
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
                      </div>
                    </div>

                    <div className="w-full text-sm flex items-center justify-between py-4 mt-4">
                      <div
                        className={`text-white/60 hover:text-white cursor-pointer ${
                          sortType === "stars" ? "text-white" : ""
                        }`}
                        onClick={() => handleSort("stars")}
                      >
                        ӨНДӨР ҮНЭЛГЭЭТЭЙ НЬ ЭХЭНДЭЭ
                      </div>
                      <div
                        className={`text-white/60 hover:text-white cursor-pointer ${
                          sortType === "new" ? "text-white" : ""
                        }`}
                        onClick={() => handleSort("new")}
                      >
                        ШИНЭ НЬ ЭХЭНДЭЭ
                      </div>
                      <div
                        className={`text-white/60 hover:text-white cursor-pointer ${
                          sortType === "discount" ? "text-white" : ""
                        }`}
                        onClick={() => handleSort("discount")}
                      >
                        ХЯМДРАЛТАЙ НЬ ЭХЭНДЭЭ
                      </div>
                      <div
                        className={`text-white/60 hover:text-white cursor-pointer ${
                          sortType === "price" ? "text-white" : ""
                        }`}
                        onClick={() => handleSort("price")}
                      >
                        ХЯМД НЬ ЭХЭНДЭЭ
                      </div>
                    </div>
                    {(category ||
                      selectedBank ||
                      selectedVenueTypes.length > 0 ||
                      selectedRatings.length > 0 ||
                      priceRange[0] > 0 ||
                      priceRange[1] < maxPrice) && (
                      <div className="mt-6 pt-6">
                        <div className="flex items-center justify-between mb-4">
                          <div className="text-white text-sm">
                            {selectedVenueTypes.length > 0
                              ? `${selectedVenueTypes.join(", ")} (${
                                  filteredMerchants.length
                                })`
                              : selectedRatings.length > 0
                              ? `${selectedRatings
                                  .map((r) => "★".repeat(r))
                                  .join(", ")} (${filteredMerchants.length})`
                              : priceRange[0] > 0 || priceRange[1] < maxPrice
                              ? `${priceRange[0].toLocaleString()}₮ - ${priceRange[1].toLocaleString()}₮ (${
                                  filteredMerchants.length
                                })`
                              : category || selectedBank
                              ? `All (${filteredMerchants.length})`
                              : "All"}
                          </div>
                        </div>
                        <div className="grid grid-cols-1 gap-4 min-h-[200px]">
                          {filteredMerchants.length > 0 ? (
                            filteredMerchants.map((merchant) => (
                              <div
                                key={merchant.id}
                                className={`relative bg-[#1C1C1C] p-4 rounded-lg cursor-pointer overflow-hidden h-[250px] transition-all duration-300 ease-in-out ${
                                  selectedMerchant?.id === merchant.id
                                    ? "border-2 border-amber-500"
                                    : "border border-white/10"
                                }`}
                                onClick={() => handleMerchantClick(merchant)}
                              >
                                {merchant.image && (
                                  <>
                                    <div className="absolute inset-0">
                                      <Image
                                        src={merchant.image}
                                        alt={merchant.name || ""}
                                        fill
                                        className="object-cover"
                                      />
                                    </div>
                                  </>
                                )}
                                <div className="relative z-10">
                                  {renderMerchantField(merchant)}
                                </div>
                              </div>
                            ))
                          ) : (
                            <div className="flex items-center justify-center h-[200px]">
                              <p className="text-gray-400 text-center">
                                {searchQuery
                                  ? "Таны хүссэн хүний тоонд тохирох ресторан олдсонгүй"
                                  : "Хайлтын утга оруулна уу"}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
      <div className="fixed right-6 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-20 bg-gray-100/5 backdrop-blur-xl rounded-[24px] px-2 py-4 shadow-lg border border-white/10">
        <Button
          variant="outline"
          size="icon"
          className="bg-[#333333] border-0 text-amber-500 rounded-full w-10 h-10">
          <Sun className="w-5 h-5" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="bg-[#333333] border-0 text-white rounded-full w-10 h-10">
          <ShoppingCart className="w-5 h-5" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="bg-[#333333] border-0 text-white rounded-full w-10 h-10">
          <Heart className="w-5 h-5" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="bg-[#333333] border-0 text-white rounded-full w-10 h-10">
          <Headphones className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
}
