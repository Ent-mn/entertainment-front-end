"use client";

import { useState, useEffect } from "react";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import CartContent from "./cart-content";
import CheckoutPage from "@/app/checkout/page";

export function CartButton() {
  const [cartItemCount, setCartItemCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Get cart items from localStorage
    const getCartItems = () => {
      if (typeof window !== "undefined") {
        try {
          const savedCart = localStorage.getItem("cartItems");
          const cartItems = savedCart ? JSON.parse(savedCart) : [];

          // Calculate total quantity of all items in the cart
          const totalQuantity = cartItems.reduce(
            (sum: number, item: { quantity?: number }) =>
              sum + (item.quantity || 1),
            0
          );
          setCartItemCount(totalQuantity);
        } catch (error) {
          console.error("Error parsing cart items:", error);
          setCartItemCount(0);
        }
      }
    };

    // Initial load
    getCartItems();

    // Listen for storage events to update cart count when it changes in other tabs
    window.addEventListener("storage", (e) => {
      if (e.key === "cartItems") {
        getCartItems();
      }
    });

    // Add a custom event listener for cart updates
    window.addEventListener("cartUpdated", getCartItems);

    return () => {
      window.removeEventListener("storage", getCartItems);
      window.removeEventListener("cartUpdated", getCartItems);
    };
  }, []);

  // Function to dispatch a custom event when cart is updated
  const dispatchCartUpdateEvent = () => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event("cartUpdated"));
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="bg-[#333333] border-0 text-white rounded-full w-10 h-10">
          <ShoppingCart className="h-5 w-5 ml-2" />
          <span></span>
        </Button>
      </DialogTrigger>
      <DialogContent className="pb-160 bg-[#121212]">
        {/* <CartContent onCartUpdated={dispatchCartUpdateEvent} /> */}
        <CheckoutPage />
      </DialogContent>
    </Dialog>
  );
}
