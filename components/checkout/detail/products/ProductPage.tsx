import { useState } from "react";
// import { Sidebar } from "./Sidebar";
import { ProductGrid } from "./ProductGrid";
import { ChevronRight, LayoutGrid, LayoutList } from "lucide-react";
import Sidebar from "./Sidebar";

const sampleProducts = [
  {
    id: "1",
    name: "Diamond Package",
    badge: "Diamond",
    badgeLabel: "Багц",
    price: 4500000,
    salePercentage: 30,
    image: "/food-1.jpg",
    items: [
      "Ассорти зууш",
      "Салмон стейк",
      "Үхрийн гол махан стейк",
      "Лемонтой халуун дарс",
      "Soft Drink сонголтоор 1ш",
      "Цэвэр ус 1ш",
      "Улаан дарс",
      "Шилтэй Пиво сонголтоор 1ш",
      "Grey Goose 100гр",
      "La Viva cheesecake 1ш",
      "Орилуун дарс 10 хүний дунд 'bin25'",
    ],
  },
  {
    id: "2",
    name: "Diamond Package",
    badge: "Diamond",
    badgeLabel: "Багц",
    price: 4500000,
    salePercentage: 30,
    image: "/food-2.jpg",
    items: [
      "Ассорти зууш",
      "Салмон стейк",
      "Үхрийн гол махан стейк",
      "Лемонтой халуун дарс",
      "Soft Drink сонголтоор 1ш",
      "Цэвэр ус 1ш",
      "Улаан дарс",
      "Шилтэй Пиво сонголтоор 1ш",
      "Grey Goose 100гр",
      "La Viva cheesecake 1ш",
      "Орилуун дарс 10 хүний дунд 'bin25'",
    ],
  },
];

export function ProductPage() {
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [selectedPriceRanges, setSelectedPriceRanges] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

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

  return (
    <div className="flex min-h-screen bg-black text-white">
      <Sidebar
        selectedRating={selectedRating}
        onRatingChange={handleRatingChange}
        selectedPriceRanges={selectedPriceRanges}
        onPriceRangeChange={handlePriceRangeChange}
        onCategoryChange={handleCategoryChange}
        selectedCategory={selectedCategory}
      />
      <div className="flex-1">
        {/* Breadcrumb */}
        <div className="px-4 py-2.5 border-b border-[#232323]">
          <div className="flex items-center gap-2 text-[13px]">
            <span className="text-gray-400 hover:text-white cursor-pointer">
              ҮЙЛЧИЛГЭЭ
            </span>
            <ChevronRight className="w-3.5 h-3.5 text-gray-600" />
            <span className="text-gray-400 hover:text-white cursor-pointer">
              Чимэглэл
            </span>
            <ChevronRight className="w-3.5 h-3.5 text-gray-600" />
            <span className="text-gray-400 hover:text-white cursor-pointer">
              Хуримын чимэглэл
            </span>
            <ChevronRight className="w-3.5 h-3.5 text-gray-600" />
            <span className="text-white">Багц чимэглэлүүд ( 10 )</span>
          </div>
        </div>

        {/* Applied Filters */}
        <div className="px-4 py-2.5 border-b border-[#232323] flex justify-between items-center">
          <div className="flex items-center gap-2 text-[13px]">
            <div className="flex items-center gap-1.5 bg-[#232323] px-2 py-1 rounded">
              <span className="text-gray-400">Зөвхөн тоо 150</span>
              <button className="text-gray-600 hover:text-white">×</button>
            </div>
            <div className="flex items-center gap-1.5 bg-[#232323] px-2 py-1 rounded">
              <span className="text-gray-400">Ресторан</span>
              <button className="text-gray-600 hover:text-white">×</button>
            </div>
            <div className="flex items-center gap-1.5 bg-[#232323] px-2 py-1 rounded">
              <span className="text-yellow-500">★★★★★</span>
              <button className="text-gray-600 hover:text-white">×</button>
            </div>
            <div className="flex items-center gap-1.5 bg-[#232323] px-2 py-1 rounded">
              <span className="text-gray-400">150,000₮ - 180,000₮</span>
              <button className="text-gray-600 hover:text-white">×</button>
            </div>
            <button className="text-gray-400 hover:text-white ml-1">
              Delete filters
            </button>
          </div>
          <div className="flex items-center gap-1.5">
            <button
              className={`p-1.5 rounded ${
                viewMode === "grid" ? "bg-[#232323]" : "hover:bg-[#232323]"
              }`}
              onClick={() => setViewMode("grid")}>
              <LayoutGrid className="w-[18px] h-[18px]" />
            </button>
            <button
              className={`p-1.5 rounded ${
                viewMode === "list" ? "bg-[#232323]" : "hover:bg-[#232323]"
              }`}
              onClick={() => setViewMode("list")}>
              <LayoutList className="w-[18px] h-[18px]" />
            </button>
          </div>
        </div>

        {/* Sort Dropdown */}
        {/* <div className="px-4 py-2.5 border-b border-[#232323]">
          <button className="text-[13px] text-gray-400 hover:text-white flex items-center gap-1">
            <span>ӨНДӨР ҮНЭЛГЭЭТЭЙ НЬ ЭХЭНДЭЭ</span>
            <ChevronRight className="w-3.5 h-3.5 rotate-90" />
          </button>
        </div> */}

        <ProductGrid products={sampleProducts} />
      </div>
    </div>
  );
}
