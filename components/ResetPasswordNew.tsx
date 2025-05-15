"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { toast } from "react-toastify";
import { Eye, EyeOff } from "lucide-react";

interface ResetPasswordNewProps {
  email: string;
  id: number;
  onSuccess: () => void;
}

export default function ResetPasswordNew({
  email,
  id,
  onSuccess,
}: ResetPasswordNewProps) {
  const [password, setPassword] = useState("");
  const [repeat, setRepeat] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [langToggle, setLangToggle] = useState(true); // default to MN
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);

  const text = {
    mn: {
      mn: "mn",
      head: "Нууц үг шинэчлэх",
      description: "Шинэ нууц үгээ үүсгэнэ үү.",
      password1: "Шинэ нууц үг",
      password2: "Нууц үгээ давтах",
      save: "Хадгалах",
      errorShort: "Нууц үг хамгийн багадаа 8 тэмдэгт байх ёстой.",
      errorMismatch: "Нууц үг таарахгүй байна.",
      success: "Нууц үг амжилттай солигдлоо!",
      errorNetwork: "Сүлжээний алдаа.",
      signInText: "Эсвэл нэвтэрэх",
    },
    en: {
      en: "en",
      head: "Reset Password",
      description: "Create your new password.",
      password1: "Enter new password",
      password2: "Repeat new password",
      save: "Save",
      errorShort: "Password must be at least 8 characters.",
      errorMismatch: "Passwords do not match.",
      success: "Password successfully updated!",
      errorNetwork: "Network error.",
      signInText: "Or sign in with",
    },
  };

  const handleSave = async () => {
    setError("");
    const t = langToggle ? text.mn : text.en;

    if (password.length < 8) {
      setError(t.errorShort);
      return;
    }
    if (password !== repeat) {
      setError(t.errorMismatch);
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post("/api/api_open", {
        sn: "customer_pasword_new",
        id,
        password,
      });

      if (res.data.status === "success") {
        toast.success(t.success);
        onSuccess();
      } else {
        setError(res.data.message || "Error occurred.");
      }
    } catch {
      setError(t.errorNetwork);
    }
    setLoading(false);
  };

  const t = langToggle ? text.mn : text.en;

  return (
    <div className="flex h-[760px] w-[587px] items-start pt-[48px] relative justify-center rounded-3xl bg-[#f3f3f3] p-4 font-lato">
      <div className="w-full max-w-[462px] space-y-8">
        <div className="text-start">
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

          <h1 className="text-[32px] mt-[100px] flex font-semibold text-[#161616]">
            {t.head}
            <div className="text-[#F5BE32]">.</div>
          </h1>
        </div>

        <p className="text-[#9A9A9A] text-base">{t.description}</p>

        <div className="flex flex-col w-[464px] gap-4">
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder={t.password1}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-14 rounded-xl w-[464px] text-black border-[#e0e0e0] bg-[#ECECEC] px-4 text-lg placeholder:text-[#ababab] pr-12"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>
          
          <div className="relative">
            <Input
              type={showRepeatPassword ? "text" : "password"}
              placeholder={t.password2}
              value={repeat}
              onChange={(e) => setRepeat(e.target.value)}
              className="h-14 rounded-xl w-[464px] text-black border-[#e0e0e0] bg-[#ECECEC] px-4 text-lg placeholder:text-[#ababab] pr-12"
            />
            <button
              type="button"
              onClick={() => setShowRepeatPassword(!showRepeatPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
              aria-label={showRepeatPassword ? "Hide password" : "Show password"}
            >
              {showRepeatPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>
          
          {error && <p className="text-sm text-red-500">{error}</p>}
        </div>

        <div className="w-full pt-[12px] flex justify-center">
          <Button
            onClick={handleSave}
            disabled={loading}
            className="h-14 w-[360px] rounded-xl text-white text-lg font-medium bg-gradient-to-r from-[#EAC947] to-[#F6A253] hover:opacity-90"
          >
            {t.save}
          </Button>
        </div>

        <div className="flex justify-between items-center mt-[21px] w-full max-w-[360px] mx-auto">
          <img className="h-[1px] w-[130px]" src="/login/Line.png" alt="" />
          <div className="text-[#676767] text-xs">{t.signInText}</div>
          <img className="h-[1px] w-[130px]" src="/login/Line.png" alt="" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button
            type="button"
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
            <span className="text-[#8c8c8c] text-xs">Sign in with Google</span>
          </button>
        </div>
      </div>
    </div>
  );
}
