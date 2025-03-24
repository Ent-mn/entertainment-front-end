"use client";
import React, { useState } from "react";
import axios from "axios";

interface CartItem {
  id: number;
  section_item_id: number;
  cart_item_type_id: number;
  cart_item_value: string;
  x1: number;
  x2: number;
  y1: number;
  y2: number;
  is_active: number;
}

const CartItemViewer = () => {
  const [cartItem, setCartItem] = useState<CartItem | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCartItem = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log("Making API request with payload:", {
        sn: "section_cart_item_get",
        id: 2,
      });

      // Explicitly set full URL and headers to match Postman
      const response = await axios.post(
        "/api/api_open", // Replace with your actual API URL from Postman
        {
          sn: "section_cart_item_get",
          id: 2,
        },
        {
          headers: {
            "Content-Type": "application/json",
            // Add any other headers from Postman if present
          },
        }
      );

      console.log("Raw response:", response);
      console.log("Response data:", response.data);

      if (!response.data || typeof response.data !== "object") {
        throw new Error("Empty or invalid response from API");
      }

      if (response.data.status === "success" && response.data.result) {
        setCartItem(response.data.result);
        console.log("Cart item set:", response.data.result);
      } else {
        throw new Error("API response missing success status or result");
      }

      setLoading(false);
    } catch (err) {
      console.error("Fetch error:", err);
      setError(err instanceof Error ? err.message : "An error occurred");
      setLoading(false);
    }
  };

  console.log("Current state:", { cartItem, loading, error });

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-4">Cart Item Details</h1>

      <button
        onClick={fetchCartItem}
        disabled={loading}
        className={`mb-5 px-4 py-2 text-white rounded ${
          loading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-500 hover:bg-blue-600 cursor-pointer"
        }`}
      >
        {loading ? "Loading..." : "Get Cart Item"}
      </button>

      {error && <div className="text-red-500 mb-4">Error: {error}</div>}

      {!cartItem && !loading && !error && (
        <div className="text-gray-500 mb-4">Click button to load data</div>
      )}

      {cartItem && (
        <div className="max-w-md">
          <div className="flex mb-2">
            <span className="font-bold w-32">ID:</span>
            <span>{cartItem.id}</span>
          </div>
          <div className="flex mb-2">
            <span className="font-bold w-32">Section Item ID:</span>
            <span>{cartItem.section_item_id}</span>
          </div>
          <div className="flex mb-2">
            <span className="font-bold w-32">Item Type ID:</span>
            <span>{cartItem.cart_item_type_id}</span>
          </div>
          <div className="flex mb-2">
            <span className="font-bold w-32">Value:</span>
            <span>{cartItem.cart_item_value}</span>
          </div>
          <div className="flex mb-2">
            <span className="font-bold w-32">X Range:</span>
            <span>
              {cartItem.x1} - {cartItem.x2}
            </span>
          </div>
          <div className="flex mb-2">
            <span className="font-bold w-32">Y Range:</span>
            <span>
              {cartItem.y1} - {cartItem.y2}
            </span>
          </div>
          <div className="flex mb-2">
            <span className="font-bold w-32">Status:</span>
            <span>{cartItem.is_active === 1 ? "Active" : "Inactive"}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartItemViewer;
