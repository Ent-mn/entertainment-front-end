"use client";

import { useState } from "react";
import Image from "next/image";
import { X, Heart, ShoppingCart } from "lucide-react";

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
}

interface ProductDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
  isLiked: boolean;
  onLikeToggle: (productId: number) => void;
  onAddToCart: (product: Product) => void;
}

export default function ProductDetailModal({
  isOpen,
  onClose,
  product,
  isLiked,
  onLikeToggle,
  onAddToCart,
}: ProductDetailModalProps) {
  if (!isOpen || !product) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4">
      <div className="bg-[#191919] w-full max-w-3xl max-h-[90vh] rounded-lg overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-800">
          <h2 className="text-white font-medium text-xl">{product.title}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Product Details */}
        <div className="flex flex-col md:flex-row p-6 gap-6 overflow-y-auto">
          {/* Image */}
          <div className="w-full md:w-1/2">
            <div className="relative w-full h-[300px] bg-gray-800 rounded-lg overflow-hidden">
              <Image
                src="/image copy 7.png"
                alt={product.title}
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Details */}
          <div className="w-full md:w-1/2 flex flex-col">
            <div className="mb-4">
              <h3 className="text-white text-lg font-medium mb-2">{product.title}</h3>
              <p className="text-gray-400 text-sm">{product.description}</p>
            </div>

            <div className="mb-4">
              <div className="flex items-center gap-2">
                <span className="text-white text-xl font-bold">
                  {product.price.toLocaleString()}₮
                </span>
                {product.salePrice && (
                  <span className="text-gray-400 line-through">
                    {product.salePrice.toLocaleString()}₮
                  </span>
                )}
              </div>
              {product.salePrice && (
                <div className="mt-1">
                  <span className="bg-yellow-500 text-black px-2 py-1 rounded text-xs font-medium">
                    Sale {Math.round(((product.price - product.salePrice) / product.price) * 100)}%
                  </span>
                </div>
              )}
            </div>

            <div className="mb-4">
              <h4 className="text-white font-medium mb-2">Ingredients</h4>
              <ul className="text-gray-400 text-sm space-y-1">
                {product.ingredients.map((ingredient, index) => (
                  <li key={index} className="flex items-start">
                    <span>{ingredient}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-auto">
              <div className="flex items-center gap-3">
                <button 
                  className="flex-1 bg-yellow-500 text-black py-2 px-4 rounded-lg font-medium hover:bg-yellow-600 transition-colors"
                  onClick={() => onAddToCart(product)}
                >
                  Сагслах
                </button>
                <button 
                  className={`p-2 rounded-lg transition-colors ${
                    isLiked 
                      ? "bg-red-500 text-white" 
                      : "bg-gray-700 text-gray-400 hover:bg-gray-600"
                  }`}
                  onClick={() => onLikeToggle(product.id)}
                >
                  <Heart className={`w-5 h-5 ${isLiked ? "fill-current" : ""}`} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 