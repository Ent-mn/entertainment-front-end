"use client";

import { useState } from "react";
import { Search, ChevronDown } from "lucide-react";
import Link from "next/link";

export default function Header() {
  const [activeFilter, setActiveFilter] = useState("all");

  return (
    <div className="bg-[#191919] text-white">
      {/* Top Navigation */}
      <div className="border-b border-gray-800"></div>

      {/* Filters Bar */}
      <div className="border-b border-gray-800">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-xs text-gray-400">APPLIED FILTERS:</span>
              <div className="flex items-center space-x-2">
                <button className="bg-gray-800 text-gray-300 px-3 py-1 rounded-md text-sm flex items-center space-x-1">
                  <span>Зөвхөн топ 150</span>
                  <span className="text-gray-500">×</span>
                </button>
                <button className="bg-gray-800 text-gray-300 px-3 py-1 rounded-md text-sm flex items-center space-x-1">
                  <span>Ресторан</span>
                  <span className="text-gray-500">×</span>
                </button>
                <button className="bg-gray-800 text-gray-300 px-3 py-1 rounded-md text-sm flex items-center space-x-1">
                  <span>★★★★★</span>
                  <span className="text-gray-500">×</span>
                </button>
                <button className="bg-gray-800 text-gray-300 px-3 py-1 rounded-md text-sm flex items-center space-x-1">
                  <span>150,000₮ - 180,000₮</span>
                  <span className="text-gray-500">×</span>
                </button>
              </div>
              <button className="text-gray-400 hover:text-white text-sm">
                Delete filters
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Options */}
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button className="bg-gray-800 text-gray-300 px-4 py-2 rounded-md text-sm flex items-center">
              <span>Үүх зүйлс</span>
              <ChevronDown className="ml-2 h-4 w-4" />
            </button>
            <button className="bg-gray-800 text-gray-300 px-4 py-2 rounded-md text-sm flex items-center">
              <span>Алкоголтой</span>
              <ChevronDown className="ml-2 h-4 w-4" />
            </button>
            <button className="bg-gray-800 text-gray-300 px-4 py-2 rounded-md text-sm flex items-center">
              <span>Архи</span>
              <ChevronDown className="ml-2 h-4 w-4" />
            </button>
            <div className="relative">
              <button className="bg-gray-800 text-gray-300 px-4 py-2 rounded-md text-sm flex items-center">
                <span>Төрөл</span>
                <ChevronDown className="ml-2 h-4 w-4" />
              </button>
            </div>
            <div className="relative flex-1 max-w-xs">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Хайлт"
                  className="w-full bg-gray-800 text-white pl-10 pr-4 py-2 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-yellow-500"
                />
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button className="p-2 hover:bg-gray-800 rounded-md">
              <svg
                className="h-5 w-5 text-gray-400"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor">
                <path
                  d="M4 6h16M4 12h16M4 18h16"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button className="p-2 hover:bg-gray-800 rounded-md">
              <svg
                className="h-5 w-5 text-gray-400"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor">
                <path
                  d="M4 5h16v16H4V5zm4 4h8v8H8V9z"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
