"use client";

import DetailHeader from "@/components/checkout/detail/DetailHeader";
import DetailActive from "@/components/checkout/detail/DetailActive";
import ThemeToggleDemo from "@/components/theme/theme-toggle-demo";
import { Headphones, Heart, ShoppingCart } from "lucide-react";
import MainDetail from "@/components/checkout/detail/MainDetail";
import { Button } from "@/components/ui/button";
import React, { Suspense } from "react";

const Detail = () => {
  return (
    <div>
      <Suspense
        fallback={
          <div className="flex justify-center items-center">Loading...</div>
        }>
        <DetailHeader />
        <MainDetail />
        <DetailActive />
        <div className="fixed right-6 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-20 bg-gray-100/5 backdrop-blur-xl rounded-[24px] px-2 py-4 shadow-lg border border-white/10">
          <ThemeToggleDemo />
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
      </Suspense>
    </div>
  );
};

export default Detail;
