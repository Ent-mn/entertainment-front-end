"use client";

import { useState, useEffect } from "react";
import {
  Star,
  Eye,
  Heart,
  ShoppingCart,
  ChevronDown,
  LayoutGrid,
  List,
} from "lucide-react";
import Image from "next/image";
import Header from "./header";
import Sidebar from "./Sidebar";
import Link from "next/link";
import ProductDetailModal from "../../ProductDetailModal";
import { useRouter } from "next/navigation";
// import { CartButton } from "@/components/checkout/cartt";

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  salePrice?: number;
  image: string;
  rating: number;
  ingredients: string[];
  category: string;
  subCategory?: string;
  quantity?: number;
}

export function ProductsServices() {
  const router = useRouter();
  const [selectedRating, setSelectedRating] = useState<number | null>(() => {
    if (typeof window !== "undefined") {
      const savedRating = localStorage.getItem("selectedRating");
      return savedRating ? parseInt(savedRating) : null;
    }
    return null;
  });

  const [selectedPriceRanges, setSelectedPriceRanges] = useState<string[]>(
    () => {
      if (typeof window !== "undefined") {
        const savedRanges = localStorage.getItem("selectedPriceRanges");
        return savedRanges ? JSON.parse(savedRanges) : [];
      }
      return [];
    }
  );

  const [selectedCategory, setSelectedCategory] = useState<string>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("selectedCategory") || "";
    }
    return "";
  });

  const [viewMode, setViewMode] = useState<"grid" | "list">(() => {
    if (typeof window !== "undefined") {
      return (localStorage.getItem("viewMode") as "grid" | "list") || "grid";
    }
    return "grid";
  });

  const [sortOption, setSortOption] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("sortOption") || "newest";
    }
    return "newest";
  });

  const [appliedFilters, setAppliedFilters] = useState<string[]>(() => {
    if (typeof window !== "undefined") {
      const savedFilters = localStorage.getItem("appliedFilters");
      return savedFilters ? JSON.parse(savedFilters) : [];
    }
    return [];
  });

  const [likedProducts, setLikedProducts] = useState<number[]>(() => {
    if (typeof window !== "undefined") {
      const savedLikes = localStorage.getItem("likedProducts");
      return savedLikes ? JSON.parse(savedLikes) : [];
    }
    return [];
  });

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [cartItems, setCartItems] = useState<Product[]>(() => {
    if (typeof window !== "undefined") {
      const savedCart = localStorage.getItem("cartItems");
      return savedCart ? JSON.parse(savedCart) : [];
    }
    return [];
  });

  // Save filter states to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("selectedRating", selectedRating?.toString() || "");
    localStorage.setItem(
      "selectedPriceRanges",
      JSON.stringify(selectedPriceRanges)
    );
    localStorage.setItem("selectedCategory", selectedCategory);
    localStorage.setItem("viewMode", viewMode);
    localStorage.setItem("sortOption", sortOption);
    localStorage.setItem("appliedFilters", JSON.stringify(appliedFilters));
  }, [
    selectedRating,
    selectedPriceRanges,
    selectedCategory,
    viewMode,
    sortOption,
    appliedFilters,
  ]);

  // Save liked products to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("likedProducts", JSON.stringify(likedProducts));
  }, [likedProducts]);

  // Save cart items to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  // Update applied filters whenever filter states change
  useEffect(() => {
    const newFilters: string[] = [];

    if (selectedCategory) {
      newFilters.push(`Төрөл: ${selectedCategory}`);
    }

    if (selectedRating) {
      newFilters.push("★".repeat(selectedRating));
    }

    if (selectedPriceRanges.length > 0) {
      newFilters.push(...selectedPriceRanges);
    }

    setAppliedFilters(newFilters);
  }, [selectedCategory, selectedRating, selectedPriceRanges]);

  // Sample data with multiple products and categories
  const products: Product[] = [
    {
      id: 1,
      title: "Diamond Package",
      description: "Багц чимэглэл",
      price: 4500000,
      salePrice: 3150000,
      image: "/images/products/diamond.jpg",
      rating: 5,
      category: "Багц чимэглэлүүд",
      ingredients: [
        "1. Ассорти зууш",
        "2. Салмон стейк",
        "3. Үхрийн гол махан стейк",
        "4. Лемонтой салхин дарс",
        "5. Soft Drink сонголтоор 1ш",
        "6. Цагаан үс 1ш",
        "7. Улаан дарс",
        "8. Шинэтэй Пино сонголтоор 1ш",
        "9. Grey Goose 500гр",
        "10. La Viva cheesecake 1ш",
        "11. Орчуулуу дарс 10 хүний дүнд 'bin25'",
      ],
    },
    {
      id: 2,
      title: "Premium Package",
      description: "Багц чимэглэл",
      price: 3500000,
      salePrice: 2450000,
      image: "/images/products/premium.jpg",
      rating: 4,
      category: "Багц чимэглэлүүд",
      ingredients: [
        "1. Ассорти зууш",
        "2. Салмон стейк",
        "3. Үхрийн гол махан стейк",
        "4. Лемонтой салхин дарс",
        "5. Soft Drink сонголтоор 1ш",
        "6. Цагаан үс 1ш",
        "7. Улаан дарс",
        "8. Шинэтэй Пино сонголтоор 1ш",
        "9. Grey Goose 500гр",
        "10. La Viva cheesecake 1ш",
      ],
    },
    {
      id: 3,
      title: "Standard Package",
      description: "Багц чимэглэл",
      price: 2500000,
      salePrice: 1750000,
      image: "/images/products/standard.jpg",
      rating: 4,
      category: "Багц чимэглэлүүд",
      ingredients: [
        "1. Ассорти зууш",
        "2. Салмон стейк",
        "3. Үхрийн гол махан стейк",
        "4. Лемонтой салхин дарс",
        "5. Soft Drink сонголтоор 1ш",
        "6. Цагаан үс 1ш",
        "7. Улаан дарс",
      ],
    },
    {
      id: 4,
      title: "Jack Daniel's",
      description: "Архи",
      price: 150000,
      image: "/images/products/jack.jpg",
      rating: 5,
      category: "Алкохолтой",
      subCategory: "Архи",
      ingredients: ["1. Jack Daniel's 750ml", "2. Мөс", "3. Cola", "4. Лимон"],
    },
    {
      id: 5,
      title: "Johnnie Walker Black",
      description: "Архи",
      price: 180000,
      image: "/images/products/johnnie.jpg",
      rating: 5,
      category: "Алкохолтой",
      subCategory: "Архи",
      ingredients: [
        "1. Johnnie Walker Black 750ml",
        "2. Мөс",
        "3. Cola",
        "4. Лимон",
      ],
    },
    {
      id: 6,
      title: "Macallan 12",
      description: "Архи",
      price: 250000,
      image: "/images/products/macallan.jpg",
      rating: 5,
      category: "Алкохолтой",
      subCategory: "Архи",
      ingredients: [
        "1. Macallan 12 Year 750ml",
        "2. Мөс",
        "3. Cola",
        "4. Лимон",
      ],
    },
    {
      id: 7,
      title: "Wedding Package Gold",
      description: "Хуримын чимэглэл",
      price: 5500000,
      salePrice: 3850000,
      image: "/images/products/wedding-gold.jpg",
      rating: 5,
      category: "Хуримын чимэглэл",
      ingredients: [
        "1. Ассорти зууш",
        "2. Салмон стейк",
        "3. Үхрийн гол махан стейк",
        "4. Лемонтой салхин дарс",
        "5. Soft Drink сонголтоор 1ш",
        "6. Цагаан үс 1ш",
        "7. Улаан дарс",
        "8. Шинэтэй Пино сонголтоор 1ш",
        "9. Grey Goose 500гр",
        "10. La Viva cheesecake 1ш",
      ],
    },
    {
      id: 8,
      title: "Wedding Package Silver",
      description: "Хуримын чимэглэл",
      price: 4500000,
      salePrice: 3150000,
      image: "/images/products/wedding-silver.jpg",
      rating: 4,
      category: "Хуримын чимэглэл",
      ingredients: [
        "1. Ассорти зууш",
        "2. Салмон стейк",
        "3. Үхрийн гол махан стейк",
        "4. Лемонтой салхин дарс",
        "5. Soft Drink сонголтоор 1ш",
        "6. Цагаан үс 1ш",
        "7. Улаан дарс",
      ],
    },
  ];

  const handleRatingChange = (rating: number) => {
    setSelectedRating(selectedRating === rating ? null : rating);
  };

  const handlePriceRangeChange = (range: string) => {
    setSelectedPriceRanges((prev) =>
      prev.includes(range) ? prev.filter((r) => r !== range) : [...prev, range]
    );
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const removeFilter = (filter: string) => {
    if (filter.includes("★")) {
      setSelectedRating(null);
    } else if (filter.includes("₮")) {
      setSelectedPriceRanges((prev) => prev.filter((r) => r !== filter));
    } else if (filter.includes("Төрөл:")) {
      setSelectedCategory("");
    }
  };

  const clearAllFilters = () => {
    setSelectedRating(null);
    setSelectedPriceRanges([]);
    setSelectedCategory("");
    setAppliedFilters([]);
  };

  // Filter products based on selected filters
  const filteredProducts = products.filter((product) => {
    // Rating filter
    if (selectedRating && product.rating !== selectedRating) {
      return false;
    }

    // Price range filter
    if (selectedPriceRanges.length > 0) {
      const priceInRange = selectedPriceRanges.some((range) => {
        const [min, max] = range
          .split(" - ")
          .map((p) => parseInt(p.replace(/[₮,]/g, "")));
        return product.price >= min && product.price <= max;
      });
      if (!priceInRange) return false;
    }

    // Category filter
    if (selectedCategory) {
      // Check if the product belongs to the selected category or subcategory
      const isInCategory =
        product.category === selectedCategory ||
        product.subCategory === selectedCategory;
      if (!isInCategory) return false;
    }

    return true;
  });

  // Sort products based on selected sort option
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortOption) {
      case "price-asc":
        return a.price - b.price;
      case "price-desc":
        return b.price - a.price;
      case "rating":
        return b.rating - a.rating;
      case "newest":
      default:
        return b.id - a.id;
    }
  });

  // Get the current section title based on selected category
  const getSectionTitle = () => {
    if (!selectedCategory) return "БҮХ БҮТЭЭГДЭХҮҮН";

    const serviceCategories = [
      "Багц чимэглэлүүд",
      "Толгой ширээний чимэглэл",
      "Хуримын чимэглэл",
    ];
    const productCategories = ["Архи", "Виски", "Уух зүйлс"];

    if (serviceCategories.includes(selectedCategory)) {
      return "ҮЙЛЧИЛГЭЭ";
    } else if (productCategories.includes(selectedCategory)) {
      return "БҮТЭЭГДЭХҮҮН";
    }

    return selectedCategory;
  };

  const handleViewProduct = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleLikeProduct = (productId: number) => {
    setLikedProducts((prev) => {
      if (prev.includes(productId)) {
        return prev.filter((id) => id !== productId);
      } else {
        return [...prev, productId];
      }
    });
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  const handleAddToCart = (product: Product) => {
    // Check if the product is already in the cart
    const existingProductIndex = cartItems.findIndex(
      (item) => item.id === product.id
    );

    if (existingProductIndex >= 0) {
      // If the product is already in the cart, increase its quantity
      const updatedCart = [...cartItems];
      updatedCart[existingProductIndex] = {
        ...updatedCart[existingProductIndex],
        quantity: (updatedCart[existingProductIndex].quantity || 1) + 1,
      };

      setCartItems(updatedCart);

      // Save to localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem("cartItems", JSON.stringify(updatedCart));
      }
    } else {
      // If the product is not in the cart, add it with quantity 1
      const productWithQuantity = {
        ...product,
        quantity: 1,
      };

      setCartItems((prev) => [...prev, productWithQuantity]);

      // Save to localStorage
      if (typeof window !== "undefined") {
        const updatedCart = [...cartItems, productWithQuantity];
        localStorage.setItem("cartItems", JSON.stringify(updatedCart));
      }
    }

    // Show notification
    if (typeof window !== "undefined") {
      const notification = document.createElement("div");
      notification.className =
        "fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50";
      notification.textContent = `${product.title} сагсанд нэмэгдлээ`;
      document.body.appendChild(notification);

      // Remove notification after 3 seconds
      setTimeout(() => {
        notification.remove();
      }, 3000);

      // Dispatch a custom event to notify other components about cart update
      window.dispatchEvent(new Event("cartUpdated"));
    }
  };

  return (
    <div className="min-h-screen dark:bg-[#121212] bg-[#F3F3F3]">
      {/* <Header /> */}
      <div className="flex px-[204px] py-24">
        <Sidebar
          selectedRating={selectedRating}
          onRatingChange={handleRatingChange}
          selectedPriceRanges={selectedPriceRanges}
          onPriceRangeChange={handlePriceRangeChange}
          onCategoryChange={handleCategoryChange}
          selectedCategory={selectedCategory}
        />

        <div className="flex-1 px-6 py-4">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-6">
              <nav className="flex items-center space-x-8 text-sm">
                <Link
                  href="/checkout/detail/products"
                  className={`py-4 border-b-2 ${
                    selectedCategory === "" ||
                    selectedCategory.includes("чимэглэл")
                      ? "border-yellow-500 text-yellow-500"
                      : "border-transparent text-gray-400 hover:text-white"
                  }`}>
                  ҮЙЛЧИЛГЭЭ
                </Link>
                <Link
                  href="/checkout/detail/products"
                  className={`py-4 border-b-2 ${
                    selectedCategory.includes("Архи") ||
                    selectedCategory.includes("Виски")
                      ? "border-yellow-500 text-yellow-500"
                      : "border-transparent text-gray-400 hover:text-white"
                  }`}>
                  БҮТЭЭГДЭХҮҮН
                </Link>
                <div className="text-gray-500 py-4">
                  {getSectionTitle()} ({sortedProducts.length})
                </div>
              </nav>
              <div className="flex items-center gap-4">
                {/* <CartButton /> */}
              </div>
            </div>

            {appliedFilters.length > 0 && (
              <div className="flex items-center gap-2 mb-4 text-sm">
                <span className="text-gray-400">APPLIED FILTERS:</span>
                <div className="flex items-center gap-2 flex-wrap">
                  {appliedFilters.map((filter, index) => (
                    <span
                      key={index}
                      className="bg-gray-700 text-white px-2 py-1 rounded flex items-center gap-1">
                      {filter}
                      <button
                        className="text-gray-400 hover:text-white"
                        onClick={() => removeFilter(filter)}>
                        ×
                      </button>
                    </span>
                  ))}
                  <button
                    className="text-gray-400 hover:text-white"
                    onClick={clearAllFilters}>
                    Delete filters
                  </button>
                </div>
              </div>
            )}

            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="text-gray-400">ЭРЭМБЭЛЭХ:</span>
                <select
                  className="bg-[#232323] text-white px-3 py-2 rounded hover:bg-gray-700 cursor-pointer"
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}>
                  <option value="newest">Шинэ</option>
                  <option value="price-asc">Үнэ өсөх</option>
                  <option value="price-desc">Үнэ буурах</option>
                  <option value="rating">Үнэлгээ</option>
                </select>
              </div>
              <div className="flex items-center gap-4">
                <button
                  className={`p-2 rounded transition-colors duration-200 ${
                    viewMode === "grid"
                      ? "bg-yellow-500 text-black"
                      : "text-gray-400 hover:text-white"
                  }`}
                  onClick={() => setViewMode("grid")}>
                  <LayoutGrid className="w-5 h-5" />
                </button>
                <button
                  className={`p-2 rounded transition-colors duration-200 ${
                    viewMode === "list"
                      ? "bg-yellow-500 text-black"
                      : "text-gray-400 hover:text-white"
                  }`}
                  onClick={() => setViewMode("list")}>
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div
              className={`${
                viewMode === "grid"
                  ? "grid grid-cols-1 md:grid-cols-2 gap-4"
                  : "flex flex-col gap-4"
              }`}>
              {sortedProducts.length > 0 ? (
                sortedProducts.map((product) => (
                  <div
                    key={product.id}
                    className="bg-[#121212] rounded-lg p-4 overflow-hidden hover:shadow-lg transition-shadow border border-[#54545440] h-[282px] w-[488px]">
                    <div
                      className={`flex ${viewMode === "list" ? "w-full" : ""}`}>
                      <div
                        className={`relative ${
                          viewMode === "grid"
                            ? "w-[180px] h-[180px]"
                            : "w-[220px] h-[220px]"
                        } group`}>
                        <div className="w-full h-full bg-gray-800 flex items-center rounded-lg justify-center overflow-hidden relative">
                          <Image
                            src="/image copy 7.png"
                            alt={product.title}
                            width={viewMode === "grid" ? 180 : 220}
                            height={viewMode === "grid" ? 180 : 220}
                            className="object-cover"
                          />
                        </div>
                        <div className="flex justify-between items-center gap-3 mt-2">
                          <button
                            className="p-3.5 bg-[#252525]  rounded-lg transition-colors"
                            onClick={() => handleViewProduct(product)}>
                            <Eye className="h-5 w-5 text-white" />
                          </button>
                          <button
                            className="p-3.5 bg-[#252525]  rounded-lg transition-colors"
                            onClick={() => handleLikeProduct(product.id)}>
                            <Heart
                              className={`h-5 w-5 ${
                                likedProducts.includes(product.id)
                                  ? "text-red-500 fill-red-500"
                                  : "text-white"
                              }`}
                            />
                          </button>
                          <button
                            className="p-3.5 bg-[#252525]  rounded-lg transition-colors"
                            onClick={() => handleAddToCart(product)}>
                            <ShoppingCart className="h-5 w-5 text-white" />
                          </button>
                        </div>
                      </div>

                      <div className="flex-1 p-6">
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex flex-col gap-1">
                            <h3 className="text-lg font-semibold text-white flex items-center gap-3 border-b border-[#F5BE32] pb-1">
                              {product.title}
                              <span className="text-sm text-[#A4A4A4]">
                                {product.description}
                              </span>
                            </h3>
                            <div className="text-lg font-bold text-white">
                              {product.price.toLocaleString()}₮
                            </div>
                          </div>
                          {product.salePrice && (
                            <div className="text-right">
                              <div className="flex top-3 right-3 bg-yellow-500 text-black px-2 py-0 rounded-lg text-sm font-semibold ">
                                Sale{" "}
                                {Math.round(
                                  ((product.price - product.salePrice) /
                                    product.price) *
                                    100
                                )}
                                %
                              </div>
                            </div>
                          )}
                        </div>

                        <div className="mt-2">
                          <ul className="text-sm text-gray-400 grid grid-cols-1 gap-0.5">
                            {product.ingredients.map((ingredient, index) => (
                              <li key={index} className="flex items-start">
                                <span>{ingredient}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-2 text-center py-10">
                  <p className="text-gray-400 text-lg">
                    No products found matching your criteria
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && selectedProduct && (
        <ProductDetailModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          product={selectedProduct}
          isLiked={likedProducts.includes(selectedProduct.id)}
          onLikeToggle={handleLikeProduct}
          onAddToCart={handleAddToCart}
        />
      )}
    </div>
  );
}
