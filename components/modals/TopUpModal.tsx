"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { X, Loader2, CheckCircle } from "lucide-react";

interface TopUpModalProps {
  onClose: () => void;
}

const BANKS = [
  { id: 1, name: "Хаан банк", logo: "/bank/khanbank.png" },
  { id: 2, name: "Худалдаа хөгжлийн банк", logo: "/bank/tdb.png" },
  { id: 3, name: "Голомт банк", logo: "/bank/golomt.png" },
  { id: 4, name: "Төрийн банк", logo: "/bank/turiin.png" },
  { id: 5, name: "Хас банк", logo: "/bank/has.png" },
  { id: 6, name: "Капитрон банк", logo: "/bank/capitron.png" },
];

type Step = "amount" | "bank" | "qr";
type QRStatus = "waiting" | "loading" | "completed";

export function TopUpModal({ onClose }: TopUpModalProps) {
  const [amount, setAmount] = useState("");
  const [step, setStep] = useState<Step>("amount");
  const [selectedBank, setSelectedBank] = useState<number | null>(null);
  const [qrStatus, setQRStatus] = useState<QRStatus>("waiting");

  // Simulate QR code scanning process
  useEffect(() => {
    if (step === "qr" && qrStatus === "waiting") {
      // Start checking for QR scan after 3 seconds
      const timeout = setTimeout(() => {
        setQRStatus("loading");
        
        // Simulate successful scan after 2 more seconds
        setTimeout(() => {
          setQRStatus("completed");
        }, 2000);
      }, 3000);

      return () => clearTimeout(timeout);
    }
  }, [step, qrStatus]);

  const handleAmountSubmit = () => {
    if (!amount || isNaN(Number(amount))) return;
    setStep("bank");
  };

  const handleBankSelect = (bankId: number) => {
    setSelectedBank(bankId);
    setStep("qr");
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center">
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative bg-[#1A1A1A] rounded-lg p-6 w-full max-w-md">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        {step === "amount" && (
          <div className="text-center">
            <h2 className="text-gray-400 text-sm mb-2">Цэнэглэх дүн</h2>
            <div className="flex items-baseline justify-center mb-6">
              <input
                type="text"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="bg-transparent text-center text-3xl font-bold text-white w-40 focus:outline-none"
                placeholder="0"
              />
              <span className="text-white text-3xl font-bold">₮</span>
            </div>
            <p className="text-gray-400 text-sm mb-6">
              Банк руу шилжүүлэх дүнгээ оруулна уу.
            </p>
            <button
              onClick={handleAmountSubmit}
              className="w-full bg-gradient-to-r from-[#EAC947] to-[#F6A253] text-white py-3 rounded-lg hover:opacity-90 transition-colors"
            >
              Цэнэглэх
            </button>
          </div>
        )}

        {step === "bank" && (
          <div>
            <h2 className="text-white text-xl font-medium mb-6">Банк сонгох</h2>
            <div className="grid grid-cols-2 gap-4">
              {BANKS.map((bank) => (
                <button
                  key={bank.id}
                  onClick={() => handleBankSelect(bank.id)}
                  className="bg-[#333333] rounded-lg p-4 hover:bg-[#404040] transition-colors flex flex-col items-center gap-2"
                >
                  <Image
                    src={bank.logo}
                    alt={bank.name}
                    width={40}
                    height={40}
                    className="rounded-lg"
                  />
                  <span className="text-white text-sm text-center">
                    {bank.name}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === "qr" && (
          <div className="text-center">
            <h2 className="text-white text-xl font-medium mb-6">
              QR код уншуулах
            </h2>
            <div className="bg-white p-4 rounded-lg mb-6 mx-auto w-64 h-64 flex items-center justify-center relative">
              <Image
                src="/bank/qr.png"
                alt="QR Code"
                width={200}
                height={200}
                className={qrStatus === "completed" ? "opacity-50" : ""}
              />
              {qrStatus === "loading" && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/10">
                  <Loader2 className="w-12 h-12 text-amber-500 animate-spin" />
                </div>
              )}
              {qrStatus === "completed" && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/10">
                  <CheckCircle className="w-12 h-12 text-green-500" />
                </div>
              )}
            </div>
            <div className="text-gray-400 text-sm">
              <p>Шилжүүлэх дүн: {amount}₮</p>
              <p>Банк: {BANKS.find((b) => b.id === selectedBank)?.name}</p>
              {qrStatus === "waiting" && (
                <p className="mt-4 text-amber-500">QR кодыг уншуулна уу</p>
              )}
              {qrStatus === "loading" && (
                <p className="mt-4 text-amber-500">Гүйлгээг шалгаж байна...</p>
              )}
              {qrStatus === "completed" && (
                <p className="mt-4 text-green-500">Гүйлгээ амжилттай!</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
