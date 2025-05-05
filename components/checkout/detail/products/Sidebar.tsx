"use client";

import { useState, useEffect } from "react";
import {
  Star,
  ChevronDown,
  ChevronRight,
  Monitor,
  Sparkles,
} from "lucide-react";
import { ReactNode } from "react";
import { serviceMenu, productMenu, sharedData } from "@/data/sidebarData";

interface NestedMenuItem {
  name: string;
  count: number;
}

interface SubMenuItem {
  name: string;
  count: number;
  subItems?: NestedMenuItem[];
}

interface MenuItem {
  title: string;
  count: number;
  icon?: ReactNode;
  subItems?: SubMenuItem[];
}

interface SidebarProps {
  selectedRating: number | null;
  onRatingChange: (rating: number) => void;
  selectedPriceRanges: string[];
  onPriceRangeChange: (range: string) => void;
  onCategoryChange: (category: string) => void;
  selectedCategory: string;
}

export default function Sidebar({
  selectedRating,
  onRatingChange,
  selectedPriceRanges,
  onPriceRangeChange,
  onCategoryChange,
  selectedCategory,
}: SidebarProps) {
  const [expandedItems, setExpandedItems] = useState<{
    [key: string]: boolean;
  }>(() => {
    if (typeof window !== "undefined") {
      const savedExpandedItems = localStorage.getItem("sidebarExpandedItems");
      return savedExpandedItems
        ? JSON.parse(savedExpandedItems)
        : {
            "Хуримын чимэглэл": true,
            "Багц чимэглэлүүд": true,
            "Уух зүйлс": true,
            Алкохолтой: true,
          };
    }
    return {
      "Хуримын чимэглэл": true,
      "Багц чимэглэлүүд": true,
      "Уух зүйлс": true,
      Алкохолтой: true,
    };
  });

  const [activeSection, setActiveSection] = useState<"service" | "product">(
    () => {
      if (typeof window !== "undefined") {
        return (
          (localStorage.getItem("sidebarActiveSection") as
            | "service"
            | "product") || "service"
        );
      }
      return "service";
    }
  );

  // Save expanded items to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("sidebarExpandedItems", JSON.stringify(expandedItems));
  }, [expandedItems]);

  // Save active section to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("sidebarActiveSection", activeSection);
  }, [activeSection]);

  // Update active section based on selected category
  useEffect(() => {
    if (selectedCategory) {
      const serviceCategories = [
        "Багц чимэглэлүүд",
        "Толгой ширээний чимэглэл",
        "Хуримын чимэглэл",
      ];
      const productCategories = ["Архи", "Виски", "Уух зүйлс"];

      if (serviceCategories.includes(selectedCategory)) {
        setActiveSection("service");
      } else if (productCategories.includes(selectedCategory)) {
        setActiveSection("product");
      }
    }
  }, [selectedCategory]);

  const activeMenu = activeSection === "service" ? serviceMenu : productMenu;

  // Handle category selection with dynamic expansion
  const handleCategorySelect = (category: string, parentTitle?: string) => {
    // Update the selected category in the parent component
    onCategoryChange(category);

    // Find and expand the parent item if it exists
    if (parentTitle) {
      setExpandedItems((prev) => ({
        ...prev,
        [parentTitle]: true,
      }));
    } else {
      // If no parent title is provided, find the parent item
      const parentItem = activeMenu.find((item) =>
        item.subItems?.some(
          (subItem) =>
            subItem.name === category ||
            subItem.subItems?.some((nestedItem) => nestedItem.name === category)
        )
      );

      if (parentItem) {
        setExpandedItems((prev) => ({
          ...prev,
          [parentItem.title]: true,
        }));
      }
    }
  };

  // Toggle section with animation
  const toggleSection = (section: "service" | "product") => {
    setActiveSection(section);
    // Reset expanded items when switching sections
    setExpandedItems({});
    // Clear selected category when switching sections
    onCategoryChange("");
  };

  // Toggle menu item expansion with animation
  const toggleExpandedItem = (title: string) => {
    setExpandedItems((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  return (
    <div className="w-[400px] rounded-xl bg-[#1a1a1a] shadow-lg">
      {/* Logo and Title Section */}
      <div className="flex items-center gap-6 px-14 py-5 rounded-t-lg ">
        <div
          className={`flex items-center gap-2 cursor-pointer transition-colors duration-200 ${
            activeSection === "service"
              ? "text-yellow-500"
              : "text-white hover:text-yellow-400"
          }`}
          onClick={() => toggleSection("service")}>
          <Sparkles className="w-5 h-5" />
          <span className="font-medium text-sm">ҮЙЛЧИЛГЭЭ</span>
        </div>
        <div
          className={`flex items-center gap-2 cursor-pointer transition-colors duration-200 ${
            activeSection === "product"
              ? "text-yellow-500"
              : "text-white hover:text-yellow-400"
          }`}
          onClick={() => toggleSection("product")}>
          <Monitor className="w-5 h-5" />
          <span className="font-medium text-sm">БҮТЭЭГДЭХҮҮН</span>
        </div>
      </div>

      {/* Main Menu */}
      <div className="py-4 bg-[#343434]">
        <h2 className="px-4 mb-3 text-white text-base font-medium">
          {activeSection === "service" ? "ЧИМЭГЛЭЛ" : "ТӨРӨЛ"}
        </h2>
        <div className="space-y-1">
          {activeMenu.map((item, index) => (
            <div key={index} className="space-y-1">
              <div
                className="flex items-center justify-between cursor-pointer px-4 py-2  transition-colors duration-200"
                onClick={() => toggleExpandedItem(item.title)}>
                <div className="flex items-center gap-2">
                  {item.icon}
                  <span className="font-medium text-sm">{item.title}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-400">({item.count})</span>
                  {item.subItems &&
                    (expandedItems[item.title] ? (
                      <ChevronDown className="w-4 h-4 " />
                    ) : (
                      <ChevronRight className="w-4 h-4 transition-transform duration-200" />
                    ))}
                </div>
              </div>

              {expandedItems[item.title] && item.subItems && (
                <div className="ml-4 space-y-1 transition-all duration-200">
                  {item.subItems.map(
                    (subItem: SubMenuItem, subIndex: number) => (
                      <div key={subIndex} className="space-y-1">
                        <div
                          className={`flex items-center justify-between cursor-pointer py-1.5 px-3   transition-colors duration-200 rounded ${
                            selectedCategory === subItem.name
                              ? "text-yellow-500 "
                              : ""
                          }`}
                          onClick={() => {
                            if (subItem.subItems) {
                              toggleExpandedItem(subItem.name);
                            }
                            handleCategorySelect(subItem.name, item.title);
                          }}>
                          <span className="text-sm">{subItem.name}</span>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-gray-400">
                              ({subItem.count})
                            </span>
                            {subItem.subItems ? (
                              expandedItems[subItem.name] ? (
                                <ChevronDown className="w-3.5 h-3.5 transition-transform duration-200" />
                              ) : (
                                <ChevronRight className="w-3.5 h-3.5 transition-transform duration-200" />
                              )
                            ) : null}
                          </div>
                        </div>
                        {expandedItems[subItem.name] &&
                          subItem.subItems?.map(
                            (
                              nestedItem: NestedMenuItem,
                              nestedIndex: number
                            ) => (
                              <div
                                key={nestedIndex}
                                className={`ml-4 flex items-center justify-between cursor-pointer py-1.5 px-3  transition-colors duration-200 rounded ${
                                  selectedCategory === nestedItem.name
                                    ? "text-yellow-500 "
                                    : ""
                                }`}
                                onClick={() =>
                                  handleCategorySelect(
                                    nestedItem.name,
                                    item.title
                                  )
                                }>
                                <span className="text-xs">
                                  {nestedItem.name}
                                </span>
                                <span className="text-xs text-gray-400">
                                  ({nestedItem.count})
                                </span>
                              </div>
                            )
                          )}
                      </div>
                    )
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Rating Section */}
      <div className="px-4 py-5 border-t border-gray-800">
        <h2 className="text-white font-medium mb-3 text-base">RATING</h2>
        <div className="space-y-2">
          {[5, 4, 3, 2, 1].map((rating) => (
            <label
              key={rating}
              className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedRating === rating}
                onChange={() => onRatingChange(rating)}
                className="hidden"
              />
              <div
                className={`flex items-center ${
                  selectedRating === rating
                    ? "text-yellow-500"
                    : "text-gray-400"
                }`}>
                <div className="w-4 h-4 border border-current rounded mr-2 flex items-center justify-center">
                  {selectedRating === rating && (
                    <div className="w-2 h-2 bg-yellow-500 rounded-sm" />
                  )}
                </div>
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star
                      key={index}
                      className={`h-3.5 w-3.5 ${
                        index < rating
                          ? "fill-current"
                          : "fill-gray-600 text-gray-600"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Menu Price Section */}
      <div className="px-4 py-5 border-t border-gray-800">
        <h2 className="text-white font-medium mb-3 text-base">MENU PRICE</h2>
        <div>
          {/* Price Range Slider */}
          <div className="mb-5">
            <div className="relative h-1 bg-gray-700 rounded-full">
              <div className="absolute left-[30%] top-1/2 -translate-y-1/2 w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="absolute right-[30%] top-1/2 -translate-y-1/2 w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="absolute left-[30%] right-[30%] h-full bg-yellow-500"></div>
            </div>
            <div className="flex justify-between mt-2 text-xs text-gray-400">
              <span>90,000₮</span>
              <span>180,000₮</span>
              <span>300,000₮</span>
            </div>
          </div>

          {/* Price Range Checkboxes */}
          <div className="space-y-2">
            {[
              "90,000₮ - 120,000₮",
              "120,000₮ - 140,000₮",
              "140,000₮ - 160,000₮",
              "160,000₮ - 200,000₮",
              "200,000₮ - 250,000₮",
            ].map((range) => (
              <label
                key={range}
                className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedPriceRanges.includes(range)}
                  onChange={() => onPriceRangeChange(range)}
                  className="hidden"
                />
                <div
                  className={`w-4 h-4 border rounded flex items-center justify-center ${
                    selectedPriceRanges.includes(range)
                      ? "border-yellow-500 text-yellow-500"
                      : "border-gray-600 text-gray-600"
                  }`}>
                  {selectedPriceRanges.includes(range) && (
                    <div className="w-2 h-2 bg-yellow-500 rounded-sm" />
                  )}
                </div>
                <span className="text-sm text-gray-400">{range}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
