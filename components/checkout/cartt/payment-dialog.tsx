"use client";

import { useState } from "react";
import { X, CheckCircle, CreditCard, Loader2 } from "lucide-react";
import { formatCurrency } from "./cart-data";

interface PaymentDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  isProcessing: boolean;
  isPaymentComplete: boolean;
  grandTotal: number;
  onPayment: () => void;
}

export default function PaymentDialog({
  isOpen,
  onOpenChange,
  isProcessing,
  isPaymentComplete,
  grandTotal,
  onPayment,
}: PaymentDialogProps) {
  if (!isOpen) return null;

  const handleClose = () => {
    if (!isProcessing) {
      onOpenChange(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4">
      <div className="bg-[#191919] w-full max-w-md rounded-lg overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-800">
          <h2 className="text-white font-medium text-xl">Төлбөр</h2>
          <button 
            onClick={handleClose} 
            className="text-gray-400 hover:text-white"
            disabled={isProcessing}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Payment Content */}
        <div className="p-6">
          {isPaymentComplete ? (
            <div className="flex flex-col items-center justify-center py-8">
              <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
              <h3 className="text-white text-xl font-medium mb-2">Амжилттай төлөгдлөө</h3>
              <p className="text-gray-400 text-center mb-6">
                Таны захиалга амжилттай бүртгэгдлээ. Бид танд удахгүй холбогдох болно.
              </p>
              <button
                className="w-full bg-yellow-500 text-black py-3 rounded-lg font-medium hover:bg-yellow-600 transition-colors"
                onClick={handleClose}
              >
                Үргэлжлүүлэх
              </button>
            </div>
          ) : (
            <>
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-400">Нийт төлөх дүн:</span>
                  <span className="text-white font-bold text-2xl">{formatCurrency(grandTotal)}</span>
                </div>
                <p className="text-gray-400 text-sm">
                  Төлбөр хийхдээ таны картын мэдээллийг аюулгүй байдлын шалгалтад оруулна.
                </p>
              </div>

              <div className="space-y-4 mb-6">
                <div className="bg-[#232323] p-4 rounded-lg">
                  <div className="flex items-center gap-3 mb-3">
                    <CreditCard className="w-5 h-5 text-gray-400" />
                    <span className="text-white font-medium">Картын мэдээлэл</span>
                  </div>
                  <div className="space-y-3">
                    <input
                      type="text"
                      placeholder="Картын дугаар"
                      className="w-full bg-[#191919] text-white px-3 py-2 rounded border border-gray-700 focus:outline-none focus:border-yellow-500"
                      disabled={isProcessing}
                    />
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="text"
                        placeholder="Сар/Он (MM/YY)"
                        className="w-full bg-[#191919] text-white px-3 py-2 rounded border border-gray-700 focus:outline-none focus:border-yellow-500"
                        disabled={isProcessing}
                      />
                      <input
                        type="text"
                        placeholder="CVV"
                        className="w-full bg-[#191919] text-white px-3 py-2 rounded border border-gray-700 focus:outline-none focus:border-yellow-500"
                        disabled={isProcessing}
                      />
                    </div>
                    <input
                      type="text"
                      placeholder="Карт эзэмшигчийн нэр"
                      className="w-full bg-[#191919] text-white px-3 py-2 rounded border border-gray-700 focus:outline-none focus:border-yellow-500"
                      disabled={isProcessing}
                    />
                  </div>
                </div>
              </div>

              <button
                className="w-full bg-yellow-500 text-black py-3 rounded-lg font-medium hover:bg-yellow-600 transition-colors flex items-center justify-center"
                onClick={onPayment}
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    <span>Төлбөр хийж байна...</span>
                  </>
                ) : (
                  "Төлбөр хийх"
                )}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
