"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import { ChevronLeft } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  DialogClose,
  DialogDescription,
  DialogTitle,
} from "@radix-ui/react-dialog";
import axios from "axios";

export default function VerificationCodeModal({
  isopen,
  setIsopen,
  userId,
  onSubmit,
}: any) {
  return (
    <div className="flex items-center justify-center bg-gray-100">
      <Dialog open={isopen}>
        <Button
          onClick={onSubmit}
          className="w-72  h-10 cursor-pointer rounded-xl text-white text-base font-normal bg-gradient-to-r from-[#EAC947] to-[#F6A253] hover:opacity-90"
        >
          Бүртгүүлэх
        </Button>

        <DialogContent className="p-0 border-none max-w-md bg-transparent shadow-none ">
          <DialogHeader>
            <DialogTitle></DialogTitle>
          </DialogHeader>
          <VerificationCode
            onComplete={() => setIsopen(false)}
            userId={userId}
            setIsopen={setIsopen}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}

function VerificationCode({
  onComplete,
  setIsopen,
  userId,
}: {
  onComplete: () => void;
  setIsopen: any;
  userId: any;
}) {
  const [code, setCode] = useState<string[]>(Array(4).fill(""));
  const [timer, setTimer] = useState(45);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleChange = (index: number, value: string) => {
    if (value.length <= 1) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);

      // Move to next input if current input is filled
      if (value !== "" && index < 3) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    // Move to previous input on backspace if current input is empty
    if (e.key === "Backspace" && index > 0 && code[index] === "") {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const formatTime = (seconds: number) => {
    return `${Math.floor(seconds / 60)}:${(seconds % 60)
      .toString()
      .padStart(2, "0")}`;
  };

  const handleSubmit = () => {
    onComplete();
  };

  return (
    <div className="w-full bg-white rounded-3xl p-6 shadow-sm">
      <DialogClose asChild>
        <button
          onClick={() => setIsopen(false)}
          type="button"
          className="text-[#656565] mb-8"
        >
          <ChevronLeft size={28} />
        </button>
      </DialogClose>

      <h1 className="text-3xl font-bold text-black mb-2">
        Баталгаажуулах<span className="text-yellow-400">.</span>
      </h1>

      <p className="text-[#8e8e8e] mb-8">
        Таны и-мэйл хаягаар илгээсэн кодыг оруулна уу
      </p>

      <div className="flex gap-2 mb-8 justify-between">
        {Array(4)
          .fill(null)
          .map((_, index) => (
            <input
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              type="text"
              maxLength={1}
              value={code[index]}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className={`w-14 h-14 text-center text-2xl font-bold border border-[#dedede] rounded-lg focus:outline-none focus:border-[#9a9a9a] focus:ring-1 focus:ring-[#9a9a9a]`}
            />
          ))}
      </div>

      <div className="flex items-center gap-2 mb-4">
        <span className="text-[#707070]">Дахин илгээх</span>
        <span className="text-[#707070]">{formatTime(timer)}</span>
      </div>

      <p className="text-[#8e8e8e] mb-8">Өөр аргаар баталгаажуулах</p>

      <button
        onClick={() => {
          console.log(userId);
        }}
        className="w-full py-4 px-6 rounded-full text-white font-medium text-lg bg-gradient-to-r from-yellow-400 to-orange-400 hover:from-yellow-500 hover:to-orange-500"
      >
        Баталгаажуулах
      </button>
    </div>
  );
}
