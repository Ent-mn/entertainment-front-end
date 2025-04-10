"use client";

import { RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { formatCurrency } from "./cart-data";
import { PriceSummaryProps } from "./types";

export default function PriceSummary({
  bookingDetails,
  subtotal,
  additionalTotal,
  total,
  tax,
  grandTotal,
  onPaymentClick,
}: PriceSummaryProps) {
  return (
    <div className="p-6 border-l border-[#939393]">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Checkbox
            id="confirmed"
            checked={bookingDetails.isConfirmed}
            className="data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
          />
          <div className="flex flex-col">
            <label
              htmlFor="confirmed"
              className="text-sm font-medium cursor-pointer text-white">
              Боломжтой
            </label>
            <p className="text-xs text-gray-400">Тус цагт захиалга авах</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Checkbox id="unconfirmed" />
          <div className="flex flex-col">
            <label
              htmlFor="unconfirmed"
              className="text-sm font-medium cursor-pointer text-white">
              Баталгаажаагүй
            </label>
            <p className="text-xs text-gray-400">Захиалгын статус</p>
          </div>
        </div>
      </div>

      <h3 className="font-medium mb-4 text-white">Price Details</h3>
      <div className="text-sm text-gray-400 mb-2">Үнийн задаргаа</div>

      <div className="space-y-3 mb-6">
        <div className="flex justify-between">
          <div className="text-gray-300">Менюны нийт үнэ</div>
          <div className="flex gap-8">
            <span className="w-20 text-right text-white">
              {formatCurrency(bookingDetails.menuPrice)}
            </span>
            <span className="w-8 text-right text-white">
              {bookingDetails.guestCount}
            </span>
            <span className="w-24 text-right font-medium text-white">
              {formatCurrency(subtotal)}
            </span>
          </div>
        </div>

        {bookingDetails.additionalServices.map((service, index) => (
          <div key={index} className="flex justify-between">
            <div className="text-gray-300">{service.name}</div>
            <div className="flex gap-8">
              <span className="w-20 text-right text-white">
                {service.price > 0 ? formatCurrency(service.price) : "-"}
              </span>
              <span className="w-8 text-right text-white">
                {service.quantity > 0 ? service.quantity : "-"}
              </span>
              <span className="w-24 text-right font-medium text-white">
                {service.price * service.quantity > 0
                  ? formatCurrency(service.price * service.quantity)
                  : "-"}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t pt-4 space-y-2 border-gray-700">
        <div className="flex justify-between">
          <div className="font-medium text-white">Нийт</div>
          <div className="font-medium text-white">{formatCurrency(total)}</div>
        </div>
        <div className="flex justify-between">
          <div className="text-gray-300">НӨАТ</div>
          <div className="text-gray-300">{formatCurrency(tax)}</div>
        </div>
        <div className="flex justify-between">
          <div className="font-bold text-white">БҮГД</div>
          <div className="font-bold text-white">
            {formatCurrency(grandTotal)}
          </div>
        </div>
      </div>

      <div className="mt-8 flex gap-2">
        <Button variant="outline" size="icon" className="rounded-full">
          <RefreshCw className="h-4 w-4 text-white" />
        </Button>
        <Button variant="outline" size="icon" className="rounded-full">
          <svg
            className="h-4 w-4 text-white"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M12 8V16"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M8 12H16"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Button>
        <Button
          className="flex-1 bg-amber-500 hover:bg-amber-600 text-white"
          onClick={onPaymentClick}>
          Төлбөр төлөх
        </Button>
      </div>
    </div>
  );
}
