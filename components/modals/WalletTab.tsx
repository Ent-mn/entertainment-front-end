"use client";

import { useState } from "react";
import { Copy } from "lucide-react";
import { TopUpModal } from "./TopUpModal";

interface WalletTabProps {
  onClose: () => void;
}

export function WalletTab({ onClose }: WalletTabProps) {
  const [balance] = useState("6,850,000");
  const [accountId] = useState("MN123456789");
  const [showTopUpModal, setShowTopUpModal] = useState(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <>
      <div className="flex flex-col w-full h-full p-8">
        <div className="bg-[#1A1A1A] rounded-lg p-6 max-w-md mx-auto w-full">
          <div className="flex justify-between items-center mb-4">
            <span className="text-gray-400 text-sm">
              Хэтэвчний ID: {accountId}
            </span>
            <button
              onClick={() => copyToClipboard(accountId)}
              className="text-gray-400 hover:text-gray-300"
            >
              <Copy className="w-4 h-4" />
            </button>
          </div>

          <div className="text-center mb-6">
            <p className="text-gray-400 text-sm mb-2">Үлдэгдэл</p>
            <h2 className="text-white text-3xl font-bold">{balance} ₮</h2>
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => setShowTopUpModal(true)}
              className="flex-1 bg-amber-500 text-white py-3 px-6 rounded-lg font-medium hover:bg-amber-600 transition-colors"
            >
              Цэнэглэх
            </button>
            <button className="flex-1 bg-[#333333] text-white py-3 px-6 rounded-lg font-medium hover:bg-[#404040] transition-colors">
              Шилжүүлэх
            </button>
          </div>
        </div>

        <div className="mt-8">
          <h3 className="text-white text-xl font-medium mb-4">
            Гүйлгээний түүх
          </h3>
          <div className="space-y-4">
            <div className="bg-[#1A1A1A] rounded-lg p-4 flex justify-between items-center">
              <div>
                <h4 className="text-white font-medium">Payment for Event</h4>
                <p className="text-gray-400 text-sm">2024.01.15 15:30</p>
              </div>
              <span className="text-red-500">-315,000 ₮</span>
            </div>
            <div className="bg-[#1A1A1A] rounded-lg p-4 flex justify-between items-center">
              <div>
                <h4 className="text-white font-medium">Wallet Top-up</h4>
                <p className="text-gray-400 text-sm">2024.01.14 10:15</p>
              </div>
              <span className="text-green-500">+1,000,000 ₮</span>
            </div>
          </div>
        </div>
      </div>

      {showTopUpModal && (
        <TopUpModal onClose={() => setShowTopUpModal(false)} />
      )}
    </>
  );
}
