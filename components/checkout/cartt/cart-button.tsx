"use client";

import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import CartContent from "./cart-content";

export function CartButton() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="relative bg-amber-500 hover:bg-amber-600 text-white">
          <ShoppingCart className="h-5 w-5 mr-2" />
          <span>Миний сагс</span>
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            1
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-6xl p-0 bg-[#121212]">
        <CartContent />
      </DialogContent>
    </Dialog>
  );
}
