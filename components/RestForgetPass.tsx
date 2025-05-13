"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Earth, ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import axios from "axios";

const RestForgetPass = ({ onBack }: { onBack?: () => void }) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [load, setLoad] = useState(false);
  const [langToggle, setLangToggle] = useState(true);
  const [success, setSuccess] = useState("");

  const router = useRouter();

  const text = {
    mn: {
      mn: "mn",
      head: "Нууц үг сэргээх.",
      inputText1: "И-мэйл эсвэл Утасны дугаар",
      button: "Баталгаажуулах код илгээх",

      success: "Шинэ нууц үг таны и-мэйл хаяг руу илгээгдлээ",
      error: "Алдаа гарлаа, дахин оролдоно уу",
    },
    en: {
      en: "en",
      head: "Forgot Password",
      inputText1: "E-mail or Phone number",
      button: "Send confirmation Code",

      success: "A new password has been sent to your email address",
      error: "An error occurred, please try again",
    },
  };

  const handleChange = () => {
    setError("");
    setSuccess("");
  };

  const onSubmit = () => {
    setLoad(true);
    setError("");
    setSuccess("");
    let emailToSend = "";
    let phoneToSend = "";
    if (email.includes("@")) {
      emailToSend = email;
      phoneToSend = "";
    } else if (/^\d{8}$/.test(email)) {
      phoneToSend = email;
      emailToSend = "";
    } else {
      setError(langToggle ? "Зөв имэйл эсвэл 8 оронтой утасны дугаар оруулна уу" : "Please enter a valid email or 8-digit phone number");
      setLoad(false);
      return;
    }
    const fetchData = async () => {
      try {
        const { data }: any = await axios.post("/api/api_open", {
          sn: "customer_password_reset",
          phone: phoneToSend,
          email: emailToSend,
        });
        if (data.status == "success") {
          setSuccess(langToggle ? text.mn.success : text.en.success);
        } else {
          setError(langToggle ? text.mn.error : text.en.error);
        }
      } catch (error) {
        setError(langToggle ? text.mn.error : text.en.error);
      } finally {
        setLoad(false);
      }
    };
    fetchData();
  };

  return (
    <div className="flex h-[310px] w-[587px] items-start pt-[48px] relative justify-center rounded-3xl bg-[#f3f3f3] p-4">
      <div className="w-full flex-col flex h-full  max-w-md justify-around items-between">
        <div className="text-start">
          <button
            onClick={onBack ? onBack : () => router.back()}
            className="h-8 text-start flex items-center justify-start text-sm text-gray-700 mb-2"
          >
            <ChevronLeft className="w-5 h-5" />
            {langToggle ? "Буцах" : "Back"}
          </button>
          <h1 className="text-3xl text-center font-semibold text-[#161616]">
            {langToggle ? text.mn.head : text.en.head}
          </h1>
        </div>
        <div className="space-y-6 w-[448px] flex flex-col items-center">
          <div className="w-[448px] flex flex-col gap-4">
            <div className="space-y-2" onChange={handleChange}>
              <Input
                id="email"
                type="text"
                placeholder={
                  langToggle ? text.mn.inputText1 : text.en.inputText1
                }
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-14 rounded-xl border-[#e0e0e0] text-black bg-[#ECECEC] px-4 text-lg placeholder:text-[black]"
              />
            </div>
            {error && <p className="text-sm text-red-500">{error}</p>}
            {success && <p className="text-sm text-green-600">{success}</p>}
          </div>
          <Button
            onClick={onSubmit}
            disabled={!email || load}
            className="w-[360px] h-14 rounded-xl text-white text-lg font-medium bg-gradient-to-r from-[#EAC947] to-[#F6A253] hover:opacity-90"
          >
            {langToggle ? text.mn.button : text.en.button}
          </Button>
        </div>
      </div>
    </div>
  );
};
export default RestForgetPass;
