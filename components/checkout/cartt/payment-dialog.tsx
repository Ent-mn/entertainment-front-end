"use client";

import { CreditCard, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { formatCurrency } from "./cart-data";
import { PaymentDialogProps } from "./types";

export default function PaymentDialog({
  isOpen,
  onOpenChange,
  isProcessing,
  isPaymentComplete,
  grandTotal,
  onPayment,
}: PaymentDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#121212]">
        {!isProcessing && !isPaymentComplete ? (
          <div>
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-white">Төлбөр төлөх</h2>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="border rounded-md p-4 flex flex-col items-center justify-center cursor-pointer bg-[#121212] ">
                    <div className="w-12 h-12 bg-[#121212] dark:bg-blue-900 rounded-full flex items-center justify-center mb-2">
                      <CreditCard className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <span className="text-sm font-medium text-white">
                      Картаар төлөх
                    </span>
                  </div>
                  <div className="border rounded-md p-4 flex flex-col items-center justify-center cursor-pointer dark:border-gray-700">
                    <div className="w-12 h-12 bg-[#121212] rounded-full flex items-center justify-center mb-2">
                      <svg
                        className="h-6 w-6 text-gray-400"
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
                          d="M8 12L11 15L16 10"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <span className="text-sm font-medium text-white">
                      QR кодоор төлөх
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-white">
                    Картын дугаар
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border rounded-md bg-[#121212] dark:border-gray-700 text-white"
                    placeholder="1234 5678 9012 3456"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white">
                      Хүчинтэй хугацаа
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border rounded-md bg-[#121212] dark:border-gray-700 text-white"
                      placeholder="MM/YY"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white">
                      CVV
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border rounded-md bg-[#121212] dark:border-gray-700 text-white"
                      placeholder="123"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-white">
                    Картын эзэмшигчийн нэр
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border rounded-md bg-[#121212] dark:border-gray-700 text-white"
                    placeholder="BOLDBAATAR DORJ"
                  />
                </div>
              </div>

              <div className="bg-[#121212] border-gray-700 border-2 p-4 rounded-md">
                <div className="flex justify-between mb-2">
                  <span className="text-white">Нийт дүн:</span>
                  <span className="font-bold text-white">
                    {formatCurrency(grandTotal)}
                  </span>
                </div>
                <div className="text-xs text-gray-400">
                  "Төлбөр төлөх" товчийг дарснаар та манай үйлчилгээний нөхцөл
                  болон хувийн мэдээллийн бодлогыг хүлээн зөвшөөрч байна.
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={() => onOpenChange(false)}
                  className="dark:border-gray-700 text-white">
                  Цуцлах
                </Button>
                <Button
                  className="bg-amber-500 hover:bg-amber-600 text-white"
                  onClick={onPayment}>
                  Төлбөр төлөх
                </Button>
              </div>
            </div>
          </div>
        ) : isProcessing ? (
          <div className="flex flex-col items-center justify-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500 mb-4"></div>
            <p className="text-lg font-medium text-white">
              Төлбөр гүйцэтгэж байна...
            </p>
            <p className="text-sm text-gray-400">
              Энэ үйлдэл хэдэн секунд үргэлжилнэ
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-8">
            <div className="bg-green-100 dark:bg-green-900 p-3 rounded-full mb-4">
              <CheckCircle2 className="h-12 w-12 text-green-600 dark:text-green-400" />
            </div>
            <p className="text-lg font-medium text-white">Төлбөр амжилттай!</p>
            <p className="text-sm text-gray-400">Таны захиалга баталгаажлаа</p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
