"use client";

import { useState } from "react";
import Image from "next/image";
import { X, ChevronDown, Search, ArrowLeft, Check } from "lucide-react";

export interface Product {
  id: number;
  name: string;
  subtitle: string;
  price: string;
  description: string;
  image: string;
}

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddProducts: (products: Product[]) => void;
}

export default function ProductModal({
  isOpen,
  onClose,
  onAddProducts,
}: ProductModalProps) {
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const products: Product[] = [
    {
      id: 1,
      name: "Danska",
      subtitle: "1 litre (Black edition)",
      price: "750,000 ₮",
      description:
        "Европын шилдэг бүтээгдэхүүн нэн ч чанартай бэлэг ч чанартай хүнээ шанагчдад ч чанартай",
      image: "/image copy 7.png",
    },
    {
      id: 2,
      name: "Danska",
      subtitle: "1 litre (Black edition)",
      price: "750,000 ₮",
      description:
        "Европын шилдэг бүтээгдэхүүн нэн ч чанартай бэлэг ч чанартай хүнээ шанагчдад ч чанартай",
      image: "/image copy 7.png",
    },
    {
      id: 3,
      name: "Danska",
      subtitle: "1 litre (Black edition)",
      price: "750,000 ₮",
      description:
        "Европын шилдэг бүтээгдэхүүн нэн ч чанартай бэлэг ч чанартай хүнээ шанагчдад ч чанартай",
      image: "/image copy 7.png",
    },
    {
      id: 4,
      name: "Danska",
      subtitle: "1 litre (Black edition)",
      price: "750,000 ₮",
      description:
        "Европын шилдэг бүтээгдэхүүн нэн ч чанартай бэлэг ч чанартай хүнээ шанагчдад ч чанартай",
      image: "/image copy 7.png",
    },
    {
      id: 5,
      name: "Danska",
      subtitle: "1 litre (Black edition)",
      price: "750,000 ₮",
      description:
        "Европын шилдэг бүтээгдэхүүн нэн ч чанартай бэлэг ч чанартай хүнээ шанагчдад ч чанартай",
      image: "/image copy 7.png",
    },
    {
      id: 6,
      name: "Danska",
      subtitle: "1 litre (Black edition)",
      price: "750,000 ₮",
      description:
        "Европын шилдэг бүтээгдэхүүн нэн ч чанартай бэлэг ч чанартай хүнээ шанагчдад ч чанартай",
      image: "/image copy 7.png",
    },
    {
      id: 7,
      name: "Danska",
      subtitle: "1 litre (Black edition)",
      price: "750,000 ₮",
      description:
        "Европын шилдэг бүтээгдэхүүн нэн ч чанартай бэлэг ч чанартай хүнээ шанагчдад ч чанартай",
      image: "/image copy 7.png",
    },
    {
      id: 8,
      name: "Danska",
      subtitle: "1 litre (Black edition)",
      price: "750,000 ₮",
      description:
        "Европын шилдэг бүтээгдэхүүн нэн ч чанартай бэлэг ч чанартай хүнээ шанагчдад ч чанартай",
      image: "/image copy 7.png",
    },
  ];

  const toggleProductSelection = (product: Product) => {
    setSelectedProducts((prev) => {
      const isSelected = prev.some((p) => p.id === product.id);
      if (isSelected) {
        return prev.filter((p) => p.id !== product.id);
      } else {
        return [...prev, product];
      }
    });
  };

  const handleAddProducts = () => {
    onAddProducts(selectedProducts);
    setSelectedProducts([]);
    onClose();
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.subtitle.toLowerCase().includes(searchTerm.toLowerCase());

    if (activeCategory === "all") return matchesSearch;
    // Add more category filtering logic here if needed
    return matchesSearch;
  });

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 w-full max-w-2xl max-h-[90vh] rounded-lg overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-800">
          <div className="flex items-center">
            <ArrowLeft className="w-5 h-5 text-gray-400 mr-2" />
            <h2 className="text-white font-medium">
              БҮТЭЭГДЭХҮҮН & ҮЙЛЧИЛГЭЭ НЭМЭХ
            </h2>
            <span className="text-gray-500 text-sm ml-2">Хүүхдийн мэню</span>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filters */}
        <div className="flex items-center p-3 gap-2 border-b border-gray-800 flex-wrap">
          <button
            className={`flex items-center rounded px-3 py-1.5 text-sm ${
              activeCategory === "all"
                ? "bg-gray-700 text-white"
                : "bg-gray-800 text-gray-300"
            }`}
            onClick={() => handleCategoryChange("all")}>
            Үүх зүйлс <ChevronDown className="w-4 h-4 ml-1" />
          </button>
          <button
            className={`flex items-center rounded px-3 py-1.5 text-sm ${
              activeCategory === "alcoholic"
                ? "bg-gray-700 text-white"
                : "bg-gray-800 text-gray-300"
            }`}
            onClick={() => handleCategoryChange("alcoholic")}>
            Алкоголтой <ChevronDown className="w-4 h-4 ml-1" />
          </button>
          <button
            className={`flex items-center rounded px-3 py-1.5 text-sm ${
              activeCategory === "spirits"
                ? "bg-gray-700 text-white"
                : "bg-gray-800 text-gray-300"
            }`}
            onClick={() => handleCategoryChange("spirits")}>
            Архи <ChevronDown className="w-4 h-4 ml-1" />
          </button>
          <div className="flex items-center ml-2 flex-1">
            <div className="flex items-center bg-gray-800 rounded px-3 py-1.5 text-sm text-white mr-1">
              Төрөл <ChevronDown className="w-4 h-4 ml-1" />
            </div>
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
              <input
                type="text"
                placeholder="Хайлт"
                className="w-full bg-gray-800 rounded py-1.5 pl-9 pr-3 text-sm text-white focus:outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Product list */}
        <div className="flex-1 overflow-y-auto">
          {filteredProducts.map((product) => {
            const isSelected = selectedProducts.some(
              (p) => p.id === product.id
            );
            return (
              <div
                key={product.id}
                className={`flex items-center p-4 border-b border-gray-800 hover:bg-gray-800 cursor-pointer ${
                  isSelected ? "bg-gray-800" : ""
                }`}
                onClick={() => toggleProductSelection(product)}>
                <div className="relative w-12 h-16 mr-4">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-white font-medium">{product.name}</h3>
                      <p className="text-gray-400 text-sm">
                        {product.subtitle}
                      </p>
                    </div>
                    <div className="flex items-center">
                      <span className="text-white font-medium mr-3">
                        {product.price}
                      </span>
                      {isSelected && (
                        <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                          <Check className="w-4 h-4 text-white" />
                        </div>
                      )}
                    </div>
                  </div>
                  <p className="text-gray-400 text-xs mt-1 pr-4">
                    {product.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer with action buttons */}
        <div className="p-4 border-t border-gray-800 flex justify-between items-center">
          <div className="text-white">
            <span className="text-gray-400">Сонгосон: </span>
            {selectedProducts.length} бүтээгдэхүүн
          </div>
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded bg-gray-800 text-white hover:bg-gray-700 transition-colors">
              Цуцлах
            </button>
            <button
              onClick={handleAddProducts}
              className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={selectedProducts.length === 0}>
              Нэмэх
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
