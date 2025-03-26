"use client"; // Required for client-side hooks in the app directory

import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Users, Calendar, Clock, MapPin } from "lucide-react";
import axios from "axios";
import { useUser } from "@/context/UserContext"; // Assuming this is available
import { Suspense } from "react"; // Import Suspense

export default function OrderTest() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <OrderTestContent />
    </Suspense>
  );
}

function OrderTestContent() {
  const searchParams = useSearchParams();
  const { user } = useUser(); // Get user context
  const [category, setCategory] = useState<string | null>(null);
  const [merchants, setMerchants] = useState<any[]>([]); // List of all merchants
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(""); // State for search input
  const [filteredMerchants, setFilteredMerchants] = useState<any[]>([]); // Filtered merchant list
  const [error, setError] = useState("");
  const [selectedMerchant, setSelectedMerchant] = useState<any | null>(null); // Selected merchant for details

  const hardcodedToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.Q9eW!zD0EeL7@ANeyJ1c2VyX2lkIjoiMSIsImlhdCI6MTcxODU5OTU0NywiZXhwIjoxNzUwMTM1NTQ3fQ.muFJPyUNLrjjeHTVI4Vjj-wkHoGJ7YceHPIsDNuhlOQ";

  // Define reservation fields for category selection
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

  // Fetch merchants from API
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
          setFilteredMerchants(data.result); // Initially set filtered to all merchants
        } else {
          setError(`Failed to fetch data: ${data.message || "Unknown error"}`);
        }
      } catch (err: any) {
        setError(
          `Error fetching data: ${err.response?.data?.message || err.message}`
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchMerchants();
  }, [user]);

  // Load initial category and merchant from URL
  useEffect(() => {
    if (searchParams) {
      const queryCategory = searchParams.get("category");
      const queryMerchant = searchParams.get("merchant");

      if (queryCategory) {
        setCategory(decodeURIComponent(queryCategory));
      }

      if (queryMerchant) {
        try {
          const decodedMerchant = decodeURIComponent(queryMerchant);
          const parsedMerchant = JSON.parse(decodedMerchant);
          setSelectedMerchant(parsedMerchant); // Set the merchant from URL instantly
        } catch (err) {
          console.error("Error parsing merchant from URL:", err);
          setError("Failed to load merchant from URL");
        }
      }
    }
  }, [searchParams]);

  // Real-time filtering based on searchQuery and category
  useEffect(() => {
    if (merchants.length > 0 && category) {
      const filtered = merchants.filter((merchant) => {
        const valueToFilter = (() => {
          switch (category) {
            case "Нэр":
              return merchant.name || "";
            case "дугаар":
              return merchant.phone || "";
            case "имэйл":
              return merchant.email || "";
            case "Банк":
              return merchant.bank_name || "";
            default:
              return "";
          }
        })();

        return (
          valueToFilter &&
          valueToFilter.toLowerCase().includes(searchQuery.toLowerCase())
        );
      });
      setFilteredMerchants(filtered);
    } else {
      setFilteredMerchants(merchants); // Reset to all merchants if no category or query
    }
  }, [searchQuery, category, merchants]);

  // Handle category selection
  const handleCategoryClick = (label: string) => {
    setCategory(label);
    setSearchQuery(""); // Reset search query when category changes
    setSelectedMerchant(null); // Reset selected merchant unless URL overrides
  };

  // Handle merchant selection from list
  const handleMerchantClick = (merchant: any) => {
    setSelectedMerchant(merchant);
  };

  if (isLoading) {
    return (
      <div className="p-6 text-white bg-gray-800 min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-red-500 bg-gray-800 min-h-screen flex items-center justify-center">
        <p>{error}</p>
      </div>
    );
  }

  const renderMerchantField = (merchant: any) => {
    if (!category) return <p className="text-gray-400">No category selected</p>;
    switch (category) {
      case "Нэр":
        return (
          <p className="text-white">
            <strong>Нэр:</strong> {merchant.name || "N/A"}
          </p>
        );
      case "дугаар":
        return (
          <p className="text-white">
            <strong>Утас:</strong> {merchant.phone || "N/A"}
          </p>
        );
      case "имэйл":
        return (
          <p className="text-white">
            <strong>Имэйл:</strong> {merchant.email || "N/A"}
          </p>
        );
      case "Банк":
        return (
          <p className="text-white">
            <strong>Банк:</strong> {merchant.bank_name || "N/A"}
          </p>
        );
      default:
        return (
          <p className="text-white">
            <strong>Банк:</strong> {merchant.bank_name || "N/A"}
          </p>
        );
    }
  };

  const renderAllData = (merchant: any) => {
    if (!merchant) return null;
    return (
      <div className="mt-4 bg-[#333333] p-4 rounded-md space-y-2">
        <h2 className="text-lg font-semibold text-white">All Merchant Data</h2>
        <p className="text-white">
          <strong>Нэр:</strong> {merchant.name || "N/A"}
        </p>
        <p className="text-white">
          <strong>Төрөл:</strong> {merchant.merchant_type_name || "N/A"}
        </p>
        <p className="text-white">
          <strong>Утас:</strong> {merchant.phone || "N/A"}
        </p>
        <p className="text-white">
          <strong>Имэйл:</strong> {merchant.email || "N/A"}
        </p>
        <p className="text-white">
          <strong>Банк:</strong> {merchant.bank_name || "N/A"}
        </p>
        {merchant.id && (
          <p className="text-white">
            <strong>ID:</strong> {merchant.id}
          </p>
        )}
        {merchant.bank_id && (
          <p className="text-white">
            <strong>Bank ID:</strong> {merchant.bank_id}
          </p>
        )}
        {merchant.bank_account && (
          <p className="text-white">
            <strong>Bank Account:</strong> {merchant.bank_account}
          </p>
        )}
        {merchant.is_active !== undefined && (
          <p className="text-white">
            <strong>Is Active:</strong> {merchant.is_active ? "Yes" : "No"}
          </p>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-4xl bg-[#222222]/90 rounded-lg p-6 shadow-lg">
        <h1 className="text-2xl font-bold text-white mb-6 text-center">
          Merchant Filter Page
        </h1>

        {/* Category Selection and Search UI */}
        <div className="mb-6">
          <div className="grid grid-cols-1 md:flex justify-between items-center gap-4">
            {reservationFields.map((field, index) => (
              <div
                key={index}
                className={`flex items-center gap-3 rounded-md p-3 cursor-pointer ${
                  category === field.label
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
              onClick={() => console.log("Search clicked")} // Placeholder for search action
            >
              <Search className="w-5 h-5" />
            </Button>
          </div>

          {/* Search Input */}
          {category && (
            <div className="mt-4">
              <Input
                type="text"
                placeholder={`Хайх (${category})`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-[#333333]/80 text-white border-none rounded-md p-2 w-full max-w-md mx-auto"
              />
            </div>
          )}
        </div>
        {selectedMerchant && renderAllData(selectedMerchant)}

        {/* Filtered Merchants List */}
        <div className="grid grid-cols-1 md:grid-cols-2 mt-4 lg:grid-cols-3 gap-4 mb-6">
          {filteredMerchants.length > 0 ? (
            filteredMerchants.map((merchant) => (
              <div
                key={merchant.id}
                className={`bg-[#333333]/80 p-4 rounded-md cursor-pointer ${
                  selectedMerchant?.id === merchant.id
                    ? "border-2 border-amber-500"
                    : ""
                }`}
                onClick={() => handleMerchantClick(merchant)}
              >
                {renderMerchantField(merchant)}
              </div>
            ))
          ) : (
            <p className="text-gray-400 text-center col-span-full">
              {searchQuery
                ? "No matching merchants found"
                : "No merchants available"}
            </p>
          )}
        </div>

        {/* Selected Merchant Full Data (Instantly from URL or manually selected) */}
      </div>
    </div>
  );
}
