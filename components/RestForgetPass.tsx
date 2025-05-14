"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Earth, ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
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
      head: "Нууц үг сэргээх",
      inputText1: "И-мэйл эсвэл Утасны дугаар",
      button: "Баталгаажуулах код илгээх",
      success: "Шинэ нууц үг таны и-мэйл хаяг руу илгээгдлээ",
      error: "Алдаа гарлаа, дахин оролдоно уу",
      description1: "Бүртгэлгүй бол",
      description2: "Бүртгүүлэх",
      text2: "Эсвэл",
    },
    en: {
      en: "en",
      head: "Forgot Password",
      inputText1: "E-mail or Phone number",
      button: "Send confirmation Code",
      success: "A new password has been sent to your email address",
      error: "An error occurred, please try again",
      description1: "Don't have an account?",
      description2: "Sign Up",
      text2: "Or sign in with",
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
    } else if (/^\d{8}$/.test(email)) {
      phoneToSend = email;
    } else {
      setError(
        langToggle
          ? "Зөв имэйл эсвэл 8 оронтой утасны дугаар оруулна уу"
          : "Please enter a valid email or 8-digit phone number"
      );
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
    <div className="flex h-[760px] w-[587px] items-start pt-[48px] relative justify-center rounded-3xl bg-[#f3f3f3] p-4">
      <div className="w-full max-w-md">
        <div className="flex justify-between">
          <div className="flex items-center gap-[6px]">
            <img className="w-[30px] h-[30px]" src="/blacklogo.png" alt="" />
            <p className="text-2xl text-[#5C5C5C]">restaurant.mn</p>
          </div>
          <div
            onClick={() => setLangToggle((prev) => !prev)}
            className="flex items-center cursor-pointer justify-center h-7 gap-1"
          >
            <img src="/login/Vector.png" alt="" />
            <div className="text-[#5C5C5C] text-2xl w-9">
              {langToggle ? text.mn.mn : text.en.en}
            </div>
          </div>
        </div>
        {/* Back button and header */}
        <div className="text-start pt-4">
          <button
            onClick={onBack ? onBack : () => router.back()}
            className="h-8 text-start flex items-center justify-start text-sm text-gray-700 mb-2"
          >
            <ChevronLeft className="w-5 h-5" />
            {langToggle ? "Буцах" : "Back"}
          </button>
          <h1 className="text-[32px] mt-[90px] flex font-semibold text-[#161616]">
            {langToggle ? text.mn.head : text.en.head}
            <div className="text-[#F5BE32]">.</div>
          </h1>
        </div>
        {/* Description: Don't have an account? Sign Up */}
        <div className="text-[#9A9A9A] font-normal text-base pt-4 flex gap-2">
          {langToggle ? text.mn.description1 : text.en.description1}
          <div className="underline cursor-pointer">
            {langToggle ? text.mn.description2 : text.en.description2}
          </div>
        </div>
        {/* Main form */}
        <div className="w-[448px] pt-[44px] flex flex-col items-center">
          <div className="w-[448px] pb-[44px] flex flex-col gap-4">
            <div className="space-y-2 " onChange={handleChange}>
              <Input
                id="email"
                type="text"
                placeholder={
                  langToggle ? text.mn.inputText1 : text.en.inputText1
                }
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-14 rounded-xl text-black border-[#e0e0e0] bg-[#ECECEC] px-4 text-lg placeholder:text-[#ababab]"
              />
            </div>
            {error && <p className="text-sm text-red-500">{error}</p>}
            {success && <p className="text-sm text-green-600">{success}</p>}
          </div>
          <Button
            onClick={onSubmit}
            disabled={!email || load}
            className="w-[367px] h-14 rounded-xl text-white text-lg font-medium bg-gradient-to-r from-[#EAC947] to-[#F6A253] hover:opacity-90"
          >
            {langToggle ? text.mn.button : text.en.button}
          </Button>
          {/* Divider */}
          <div className="flex gap-4 justify-center items-center my-[21px] w-[360px]">
            <img className="h-[1px] w-[130px]" src="/login/Line.png" alt="" />
            <div className="text-[#676767] text-[10px]">
              {langToggle ? text.mn.text2 : text.en.text2}
            </div>
            <img className="h-[1px] w-[130px]" src="/login/Line.png" alt="" />
          </div>
          {/* Social login buttons */}
          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => signIn("facebook")}
              className="flex items-center justify-center gap-2 p-3 border border-[#e0e0e0] rounded-2xl bg-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                viewBox="0 0 24 24"
                fill="#1577f2"
              >
                <path d="M12 2.04C6.5 2.04 2 6.53 2 12.06C2 17.06 5.66 21.21 10.44 21.96V14.96H7.9V12.06H10.44V9.85C10.44 7.34 11.93 5.96 14.22 5.96C15.31 5.96 16.45 6.15 16.45 6.15V8.62H15.19C13.95 8.62 13.56 9.39 13.56 10.18V12.06H16.34L15.89 14.96H13.56V21.96C18.34 21.21 22 17.06 22 12.06C22 6.53 17.5 2.04 12 2.04Z" />
              </svg>
              <span className="text-[#8c8c8c] text-xs">
                Sign in with Facebook
              </span>
            </button>
            <button
              type="button"
              onClick={() => signIn("google")}
              className="flex items-center justify-center gap-2 p-3 border border-[#e0e0e0] rounded-2xl bg-white"
            >
              <svg
                width="18"
                height="18"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              <span className="text-[#8c8c8c] text-xs">
                Sign in with Google
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestForgetPass;
