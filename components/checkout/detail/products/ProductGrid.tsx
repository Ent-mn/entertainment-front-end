import { Eye, Heart, ShoppingCart } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface Product {
  id: string;
  name: string;
  badge: string;
  badgeLabel: string;
  price: number;
  salePercentage?: number;
  items: string[];
  image: string;
}

interface ProductGridProps {
  products: Product[];
}

const shimmer = (w: number, h: number) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#333" offset="20%" />
      <stop stop-color="#222" offset="50%" />
      <stop stop-color="#333" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#333" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`;

const toBase64 = (str: string) =>
  typeof window === 'undefined'
    ? Buffer.from(str).toString('base64')
    : window.btoa(str);

export function ProductGrid({ products }: ProductGridProps) {
  return (
    <div className="grid grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 p-4">
      {products.map((product) => (
        <div
          key={product.id}
          className="bg-[#232323] rounded-lg overflow-hidden relative group cursor-pointer"
        >
          {/* Product Image with Overlay */}
          <div className="relative h-[180px] w-full bg-gray-800">
            <div className="absolute inset-0 bg-[#1a1a1a]" />
            <img
              src={product.image}
              alt={product.name}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            {/* Action Buttons */}
            <div className="absolute bottom-3 left-3 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
              <button className="p-2 bg-[#232323]/90 hover:bg-[#232323] rounded transition-colors">
                <Eye className="w-[18px] h-[18px] text-white" />
              </button>
              <button className="p-2 bg-[#232323]/90 hover:bg-[#232323] rounded transition-colors">
                <Heart className="w-[18px] h-[18px] text-white" />
              </button>
              <button className="p-2 bg-[#232323]/90 hover:bg-[#232323] rounded transition-colors">
                <ShoppingCart className="w-[18px] h-[18px] text-white" />
              </button>
            </div>
          </div>

          {/* Badge and Sale */}
          <div className="absolute top-3 left-3 flex gap-1.5">
            <div className="bg-[#232323]/90 text-white px-2.5 py-1 rounded flex items-center gap-1.5 text-[13px]">
              <span className="font-medium">{product.badge}</span>
              <span className="text-gray-400">{product.badgeLabel}</span>
            </div>
            {product.salePercentage && (
              <div className="bg-yellow-500 text-black px-2.5 py-1 rounded text-[13px] font-medium">
                Sale {product.salePercentage}%
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="p-3">
            <div className="flex justify-between items-center mb-2">
              <span className="text-[15px] font-medium text-white">
                {product.price.toLocaleString()}₮
              </span>
            </div>

            {/* Items List */}
            <div className="space-y-1">
              {product.items.map((item, index) => (
                <div key={index} className="text-[13px] leading-tight text-gray-400 flex gap-1.5">
                  <span className="text-gray-500 shrink-0">{index + 1}.</span>
                  <span className="hover:text-white transition-colors">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
} 