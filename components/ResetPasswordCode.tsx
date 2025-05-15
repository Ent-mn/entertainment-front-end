"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { toast } from "react-toastify";

interface OtpInputProps {
  value: string;
  onChange: (v: string) => void;
  onComplete?: () => void;
}

const OtpInput = ({
  value,
  onChange,
  isVerifying,
}: OtpInputProps & { isVerifying?: boolean }) => {
  const inputs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    inputs.current[0]?.focus();
  }, []);

  // Auto-submit when all 6 digits are entered
  // useEffect(() => {
  //   if (value.length === 6 && onComplete && !isVerifying) {
  //     onComplete()
  //   }
  // }, [value, onComplete, isVerifying])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    idx: number
  ) => {
    const val = e.target.value.replace(/[^0-9]/g, "");
    if (!val) return;
    const arr = value.split("");
    arr[idx] = val;
    const newValue = arr.join("").slice(0, 6);
    onChange(newValue);
    if (val && idx < 5) inputs.current[idx + 1]?.focus();
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    idx: number
  ) => {
    if (e.key === "Backspace") {
      const arr = value.split("");

      if (value[idx]) {
        arr[idx] = "";
        onChange(arr.join(""));
      } else if (idx > 0) {
        arr[idx - 1] = "";
        onChange(arr.join(""));
        inputs.current[idx - 1]?.focus();
      }
    } else if (e.key === "ArrowLeft" && idx > 0) {
      inputs.current[idx - 1]?.focus();
    } else if (e.key === "ArrowRight" && idx < 5) {
      inputs.current[idx + 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const paste = e.clipboardData.getData("text").replace(/[^0-9]/g, "");
    if (paste.length === 6) {
      onChange(paste);
      // Focus last input
      setTimeout(() => {
        inputs.current[5]?.focus();
      }, 0);
    }
    e.preventDefault();
  };

  // Get input status for styling
  const getInputStatus = (index: number) => {
    if (isVerifying) return "verifying";
    if (value[index]) return "filled";
    return "empty";
  };

  return (
    <div
      className="flex gap-4 py-2 justify-center"
      role="group"
      aria-label="OTP input"
    >
      {[...Array(6)].map((_, i) => {
        const status = getInputStatus(i);
        return (
          <div key={i} className="relative">
            <input
              type="text"
              inputMode="numeric"
              maxLength={1}
              ref={(el) => {
                inputs.current[i] = el;
              }}
              value={value[i] || ""}
              onChange={(e) => handleChange(e, i)}
              onKeyDown={(e) => handleKeyDown(e, i)}
              onPaste={handlePaste}
              disabled={isVerifying}
              aria-label={`Digit ${i + 1} of 6`}
              className={`w-[54px] h-[58px] text-center bg-transparent text-xl border text-black rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-400 ${
                status === "filled"
                  ? "border-green-500 border-2"
                  : status === "verifying"
                  ? "border-yellow-400 border-2 opacity-70"
                  : "border-[#CDCDCD]"
              }`}
            />
            {status === "verifying" && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-5 h-5 border-2 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

interface ResetPasswordCodeProps {
  email: string;
  sentCode: string;
  onSuccess: () => void;
  onBack: () => void;
  setSentCode?: (code: string) => void;
  langToggle: boolean; // ✅ Add this
  setLangToggle: React.Dispatch<React.SetStateAction<boolean>>; // ✅ And this
}

export default function ResetPasswordCode({
  email,
  sentCode: initialSentCode,
  onSuccess,
  onBack,
  setSentCode,
  langToggle,
  setLangToggle,
}: ResetPasswordCodeProps) {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [timer, setTimer] = useState(45);
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [verifying, setVerifying] = useState(false);
  // Track the current valid code locally
  const [currentValidCode, setCurrentValidCode] = useState(initialSentCode);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((t) => t - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  // Update local state when prop changes
  useEffect(() => {
    setCurrentValidCode(initialSentCode);
  }, [initialSentCode]);

  const handleVerify = () => {
    // Prevent duplicate verification attempts
    if (verifying) return;

    setError("");
    if (code.length !== 6) {
      setError("6 оронтой кодоо бүрэн оруулна уу.");
      return;
    }

    setVerifying(true);

    // Simulate a slight delay for verification to show loading state
    setTimeout(() => {
      // Compare with the current valid code
      if (code === currentValidCode) {
        toast.success("Код амжилттай баталгаажлаа!");
        onSuccess();
      } else {
        setError("Код буруу байна.");
        setVerifying(false);
      }
    }, 1000);
  };

  const handleResend = async () => {
    setTimer(45);
    setResendLoading(true);
    try {
      const res = await fetch("/api/api_open", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sn: "customer_email_code_send_password_reset",
          email,
        }),
      });
      const data = await res.json();
      if (data.status === "success") {
        const newCode = data.code || "000000";
        // Update both the parent state and local state
        if (setSentCode) setSentCode(newCode);
        setCurrentValidCode(newCode);
        toast.success("Код дахин илгээгдлээ!");
      } else {
        toast.error("Код илгээхэд алдаа гарлаа!");
      }
    } catch (e) {
      toast.error("Сүлжээний алдаа!");
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <div
      className="flex items-center justify-start min-h-[760px] w-[1146px] rounded-[24px] bg-cover bg-center"
      style={{ backgroundImage: "url(/login/image.png)" }}
    >
      <div className="bg-white rounded-3xl p-8 ml-[99px] shadow-md h-[569px] w-[474px]">
        <button
          onClick={onBack}
          className="mb-4 flex items-center text-gray-500"
        >
          <ChevronLeft />
        </button>
        <h1 className="text-[32px] text-black mt-[49px] font-medium mb-2">
          Баталгаажуулах<span className="text-yellow-400">.</span>
        </h1>
        <p className="mb-6 text-[16px] font-light text-[#707070]">
          Таны и-мэйл хаягаар илгээсэн кодыг оруулна уу
        </p>
        <OtpInput value={code} onChange={setCode} isVerifying={verifying} />
        <div className="text-base font-semibold text-[#707070] mt-4 flex items-center">
          <span>Дахин илгээх</span>
          {timer > 0 ? (
            <div className="ml-2 relative">
              <div className="flex items-center justify-center">
                <svg className="w-6 h-6">
                  <circle
                    className="text-gray-200"
                    strokeWidth="2"
                    stroke="currentColor"
                    fill="transparent"
                    r="10"
                    cx="12"
                    cy="12"
                  />
                  <circle
                    className="text-yellow-400"
                    strokeWidth="2"
                    strokeDasharray={63}
                    strokeDashoffset={63 - (63 * timer) / 5}
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="transparent"
                    r="10"
                    cx="12"
                    cy="12"
                  />
                </svg>
                <span className="absolute text-xs">{timer}</span>
              </div>
            </div>
          ) : (
            <button
              onClick={handleResend}
              className="ml-2 underline text-yellow-500 hover:text-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 rounded-sm"
              disabled={resendLoading}
              aria-label="Resend verification code"
            >
              {resendLoading ? "Илгээж байна..." : "Илгээх"}
            </button>
          )}
        </div>
        <div className="text-[#707070] text-[16px] font-thin mt-4 cursor-pointer">
          Өөр аргаар баталгаажуулах
        </div>
        <Button
          onClick={handleVerify}
          disabled={loading || code.length !== 6 || verifying}
          className="w-[280px] h-[56px] mt-8 cursor-pointer items-center justify-center rounded-xl text-white text-lg font-medium bg-gradient-to-r from-[#EAC947] to-[#F6A253] hover:opacity-90 disabled:opacity-50 transition-opacity duration-200"
          aria-label="Verify code"
        >
          {verifying ? (
            <div className="flex items-center justify-center w-full">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
              <span>Баталгаажуулж байна...</span>
            </div>
          ) : (
            "Баталгаажуулах"
          )}
        </Button>
        {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
      </div>
    </div>
  );
}
