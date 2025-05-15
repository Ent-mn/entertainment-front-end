"use client";

import { ChevronLeft, Earth, Eye, EyeOff } from "lucide-react";
import { Input } from "./ui/input";
import { useEffect, useState, useRef } from "react";
import { Checkbox } from "./ui/checkbox";
import { Button } from "./ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";
import RestLogin from "./RestLogin";
import { signIn } from "next-auth/react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import TermsPage from "./TermsPage";
import VerificationCodeModal from "./Verification";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface TranslationText {
  mn: {
    mn: string;
    head: string;
    headTseg: string;
    description1: string;
    description2: string;
    inputText1: string;
    inputText2: string;
    inputText3: string;
    inputText4: string;
    inputText5: string;
    text1: string;
    button: string;
    text2: string;
  };
  en: {
    en: string;
    head: string;
    headTseg: string;
    description1: string;
    description2: string;
    inputText1: string;
    inputText2: string;
    inputText3: string;
    inputText4: string;
    inputText5: string;
    text1: string;
    button: string;
    text2: string;
  };
}

// DisabledInput component
interface DisabledInputProps {
  value: string;
}

const DisabledInput: React.FC<DisabledInputProps> = ({ value }) => (
  <input
    type="text"
    value={value}
    disabled
    className="h-[54px] w-full rounded-xl text-black border-[#e0e0e0] bg-[#ECECEC] px-4 text-[15px] placeholder:text-[#ababab] opacity-80 cursor-not-allowed mb-2"
  />
);

// OtpInput component
interface OtpInputProps {
  value: string;
  onChange: (v: string) => void;
}

const OtpInput: React.FC<OtpInputProps> = ({ value, onChange }) => {
  const inputs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    inputs.current[0]?.focus();
  }, []);

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
      setTimeout(() => {
        inputs.current[5]?.focus();
      }, 0);
    }
    e.preventDefault();
  };

  return (
    <div className="flex gap-2 py-2">
      {[...Array(6)].map((_, i) => (
        <input
          key={i}
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
          className="w-[54px] h-[58px] text-center text-xl text-black border-[#e0e0e0] bg-[#ECECEC] rounded-md"
        />
      ))}
    </div>
  );
};

// SocialLogin component
interface SocialLoginProps {
  signIn: typeof signIn;
  langToggle: boolean;
  text: TranslationText;
}

const SocialLogin: React.FC<SocialLoginProps> = ({
  signIn,
  langToggle,
  text,
}) => (
  <div className="w-[585px] flex flex-col items-center">
    <div className="flex w-72 items-center flex-col">
      <div className="flex justify-between w-[333px] items-center">
        <img className="h-[1px] w-[135px]" src="/login/Line.png" alt="" />
        <div className="text-[#676767] text-xs">
          {langToggle ? text.mn.text2 : text.en.text2}
        </div>
        <img className="h-[1px] w-[135px]" src="/login/Line.png" alt="" />
      </div>
      <div className="grid grid-cols-2 gap-2 mt-4 h-9 w-[367px]">
        <button
          type="button"
          onClick={() => signIn("facebook", { callbackUrl: "/restaurant" })}
          className="flex items-center justify-center gap-2 p-3 border border-[#e0e0e0] rounded-2xl bg-white"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            viewBox="0 0 24 24"
            fill="#1577F2"
          >
            <path d="M12 2.04C6.5 2.04 2 6.53 2 12.06C2 17.06 5.66 21.21 10.44 21.96V14.96H7.9V12.06H10.44V9.85C10.44 7.34 11.93 5.96 14.22 5.96C15.31 5.96 16.45 6.15 16.45 6.15V8.62H15.19C13.95 8.62 13.56 9.39 13.56 10.18V12.06H16.34L15.89 14.96H13.56V21.96C18.34 21.21 22 17.06 22 12.06C22 6.53 17.5 2.04 12 2.04Z" />
          </svg>
          <span className="text-[#8c8c8c] font-normal text-[11px]">
            Sign up with Facebook
          </span>
        </button>
        <button
          type="button"
          onClick={() => signIn("google", { callbackUrl: "/restaurant" })}
          className="flex items-center justify-center gap-2 p-3 border border-[#e0e0e0] rounded-2xl bg-white"
        >
          <svg
            width="24"
            height="24"
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
          <span className="text-[#8c8c8c] font-normal text-[11px]">
            Sign up with Google
          </span>
        </button>
      </div>
    </div>
  </div>
);

// Step1 component
interface Step1Props {
  lastName: string;
  setLastName: (lastName: string) => void;
  firstName: string;
  setFirstName: (firstName: string) => void;
  contactInfo: string;
  setContactInfo: (contactInfo: string) => void;
  error: string;
  setError: (error: string) => void;
  agreed: boolean;
  setAgreed: (agreed: boolean) => void;
  setStep: (step: number) => void;
  langToggle: boolean;
  setLangToggle: (langToggle: boolean) => void;
  text: TranslationText;
  signIn: typeof signIn;
  setLogin: (login: boolean) => void;
  setSentCode: (code: string) => void;
}

const Step1: React.FC<Step1Props> = ({
  lastName,
  setLastName,
  firstName,
  setFirstName,
  contactInfo,
  setContactInfo,
  error,
  setError,
  agreed,
  setAgreed,
  setStep,
  langToggle,
  setLangToggle,
  text,
  signIn,
  setLogin,
  setSentCode,
}) => (
  <div className="font-lato flex w-[1586px] rounded-3xl h-[900px] bg-[#f3f3f3]">
    <div className="hidden md:flex md:w-1/2 pl-12 flex-col items-center justify-center p-12 pt-[80px] text-white">
      <div className="w-full justify-between items-center h-full max-w-[585px]">
        <div className="text-start">
          <div className="flex justify-between">
            <div className="flex items-center gap-1">
              <img className="w-[30px] h-[30px]" src="/blacklogo.png" alt="" />
              <p className="text-2xl text-[#5C5C5C]">restaurant.mn</p>
            </div>
            <div
              onClick={() => setLangToggle(!langToggle)}
              className="flex items-center cursor-pointer justify-center h-7 gap-1"
            >
              <Earth className="text-black h-[30px] w-[30px]" />
              <div className="text-black text-2xl w-9">
                {langToggle ? text.mn.mn : text.en.en}
              </div>
            </div>
          </div>
        </div>
        <div className="text-[#9A9A9A] mt-3 flex-col font-normal text-sm flex gap-2">
          <h1 className="text-[32px] mt-[130px] font-semibold text-[#161616]">
            {langToggle ? text.mn.head : text.en.head}
            <span className="text-[#F5BE32] font-medium">
              {langToggle ? text.mn.headTseg : text.en.headTseg}
            </span>
          </h1>
          <div className="flex gap-2 text-base font-normal mt-[17px]">
            {langToggle ? text.mn.description1 : text.en.description1}
            <div
              onClick={() => setLogin(true)}
              className="underline cursor-pointer"
            >
              {langToggle ? text.mn.description2 : text.en.description2}
            </div>
          </div>
        </div>
        <div className="flex mt-7 flex-col gap-4">
          <div className="flex w-[584px] justify-between">
            <Input
              id="ovog"
              type="text"
              placeholder={langToggle ? text.mn.inputText1 : text.en.inputText1}
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="h-[54px] rounded-xl w-[284px] text-black border-[#e0e0e0] bg-[#ECECEC] px-4 text-2xl placeholder:text-[#ababab]"
            />
            <Input
              id="ner"
              type="text"
              placeholder={langToggle ? text.mn.inputText2 : text.en.inputText2}
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="h-[54px] rounded-xl w-[284px] text-black border-[#e0e0e0] bg-[#ECECEC] px-4 text-lg placeholder:text-[#ababab]"
            />
          </div>
          <div className="flex gap-4">
            <Input
              id="contactInfo"
              type="text"
              placeholder={langToggle ? text.mn.inputText3 : text.en.inputText3}
              value={contactInfo}
              onChange={(e) => {
                setContactInfo(e.target.value);
                setError("");
              }}
              className="h-[54px] w-full rounded-xl text-black border-[#e0e0e0] bg-[#ECECEC] px-4 text-lg placeholder:text-[#ababab]"
            />
          </div>
          <div>
            <p className="text-sm text-red-500 mb-2">{error}</p>
            <div className="flex items-center gap-[11px]">
              <Checkbox
                id="termsRegister"
                checked={agreed}
                onCheckedChange={(checked) => setAgreed(checked === true)}
                className="h-5 w-5 border-[#828282] cursor-pointer data-[state=checked]:bg-[#fa742a] data-[state=checked]:border-[#fa742a]"
              />
              <Dialog>
                <DialogTrigger asChild>
                  <Button>
                    <div className="text-[#9A9A9A] hover:text-black cursor-pointer text-base">
                      {langToggle ? text.mn.text1 : text.en.text1}
                    </div>
                  </Button>
                </DialogTrigger>
                <DialogContent className="p-0 border-none w-auto sm:max-w-auto">
                  <TermsPage />
                  <DialogHeader>
                    <DialogTitle></DialogTitle>
                    <DialogDescription></DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </div>
          </div>
          <div className="flex flex-col mt-3 items-center">
            <Button
              onClick={async () => {
                if (!firstName || !lastName) {
                  setError("Овог, нэрээ оруулна уу.");
                  toast.error(
                    langToggle
                      ? "Овог, нэрээ оруулна уу."
                      : "Please enter your first and last name."
                  );
                  return;
                }

                const isValidEmail =
                  contactInfo.includes("@") &&
                  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactInfo);
                const isPhone = /^\d{8}$/.test(contactInfo);

                if (!contactInfo) {
                  setError("И-мэйл эсвэл утасны дугаараа оруулна уу.");
                  toast.error(
                    langToggle
                      ? "И-мэйл эсвэл утасны дугаараа оруулна уу."
                      : "Please enter your email or phone number."
                  );
                  return;
                }

                if (!isValidEmail && !isPhone) {
                  setError("Имэйл эсвэл утасны дугаар оруулна уу.");
                  toast.error(
                    langToggle
                      ? "Имэйл эсвэл утасны дугаар оруулна уу."
                      : "Please enter a valid email or phone number."
                  );
                  return;
                }

                try {
                  const payload: Record<string, string> = {
                    sn: "customer_send_code_signup",
                    to_value: contactInfo,
                    type: isValidEmail ? "1" : "2",
                  };

                  const res = await axios.post("/api/api_open", payload);

                  // Check if the response indicates the email is already registered
                  if (res.data.status === "error") {
                    setError(
                      res.data.message ||
                        (langToggle
                          ? "И-мэйл бүртгэлтэй байна. Нэвтэрнэ үү."
                          : "Email already registered. Please login.")
                    );
                    toast.error(
                      res.data.message ||
                        (langToggle
                          ? "И-мэйл бүртгэлтэй байна. Нэвтэрнэ үү."
                          : "Email already registered. Please login.")
                    );
                    return;
                  }

                  // If we get here, the email is not registered, and we have received a verification code
                  setSentCode(res.data.code);
                  toast.success(
                    langToggle
                      ? "Баталгаажуулах код илгээгдлээ!"
                      : "Verification code sent!"
                  );
                  setError("");
                  setStep(2);
                } catch (error: any) {
                  console.error("API error:", error);
                  setError(
                    error.response?.data?.message ||
                      "Алдаа гарлаа. Та дахин оролдоно уу."
                  );
                  toast.error(
                    error.response?.data?.message ||
                      "An error occurred. Please try again."
                  );
                }
              }}
              disabled={!agreed}
              className="w-[367px] h-[56px] cursor-pointer rounded-xl text-white text-lg font-medium bg-gradient-to-r from-[#EAC947] to-[#F6A253] hover:opacity-90"
            >
              {langToggle ? text.mn.button : text.en.button}
            </Button>
          </div>
          <SocialLogin signIn={signIn} langToggle={langToggle} text={text} />
        </div>
      </div>
    </div>
    <div className="w-full md:w-1/2 flex flex-col items-center justify-center">
      <img
        className="h-full md:w-full rounded-r-3xl"
        src="/login/image.png"
        alt=""
      />
    </div>
  </div>
);

// Step2 component
interface Step2Props {
  lastName: string;
  firstName: string;
  contactInfo: string;
  confirmationCode: string;
  setConfirmationCode: (code: string) => void;
  error: string;
  setStep: (step: number) => void;
  isEmail: (value: string) => boolean;
  isPhone: (value: string) => boolean;
  timer: number;
  onResend: () => void;
  langToggle: boolean;
  setLangToggle: (langToggle: boolean) => void;
  text: TranslationText;
  signIn: typeof signIn;
  setLogin: (login: boolean) => void;
  sentCode: string;
  setSentCode: (code: string) => void;
}

const Step2: React.FC<Step2Props> = ({
  lastName,
  firstName,
  contactInfo,
  confirmationCode,
  setConfirmationCode,
  error,
  setStep,
  isEmail,
  isPhone,
  timer,
  onResend,
  langToggle,
  setLangToggle,
  text,
  signIn,
  setLogin,
  sentCode,
  setSentCode,
}) => {
  const [localError, setLocalError] = useState("");
  const [verifying, setVerifying] = useState(false);

  const handleVerifyCode = async () => {
    if (verifying) return;

    setLocalError("");
    if (confirmationCode.length !== 6) {
      setLocalError(
        langToggle
          ? "6 оронтой кодоо бүрэн оруулна уу."
          : "Please enter the full 6-digit code."
      );
      toast.error(
        langToggle
          ? "6 оронтой кодоо бүрэн оруулна уу."
          : "Please enter the full 6-digit code."
      );
      return;
    }

    setVerifying(true);

    try {
      console.log("Entered code:", confirmationCode);
      console.log("Expected code from server:", sentCode);

      if (confirmationCode === sentCode) {
        toast.success(
          langToggle
            ? "Код амжилттай баталгаажлаа!"
            : "Code verified successfully!"
        );
        setStep(3);
        return;
      }

      const isEmailFormat = isEmail(contactInfo);
      const isPhoneFormat = isPhone(contactInfo);

      const payload = {
        sn: "customer_verify_email",
        code: confirmationCode,
        email: isEmailFormat ? contactInfo : "",
        phone: isPhoneFormat ? contactInfo : "",
      };

      console.log("Verifying with API payload:", payload);

      const res = await axios.post("/api/api_open", payload);
      console.log("API verification response:", res.data);

      if (res.data.status === "success") {
        toast.success(
          langToggle
            ? "Код амжилттай баталгаажлаа!"
            : "Code verified successfully!"
        );
        setStep(3);
      } else {
        setLocalError(
          res.data.message ||
            (langToggle ? "Код буруу байна." : "Invalid code.")
        );
        toast.error(
          res.data.message ||
            (langToggle ? "Код буруу байна." : "Invalid code.")
        );
      }
    } catch (error: any) {
      console.error("Verification error:", error);
      setLocalError(
        error.response?.data?.message ||
          (langToggle
            ? "Алдаа гарлаа. Та дахин оролдоно уу."
            : "An error occurred. Please try again.")
      );
      toast.error(
        error.response?.data?.message ||
          (langToggle
            ? "Алдаа гарлаа. Та дахин оролдоно уу."
            : "An error occurred. Please try again.")
      );
    } finally {
      setVerifying(false);
    }
  };

  const handleResend = async () => {
    onResend();

    try {
      const isEmailFormat = isEmail(contactInfo);
      const isPhoneFormat = isPhone(contactInfo);
      const payload: Record<string, string> = {
        sn: "customer_send_code_signup",
        to_value: contactInfo,
        type: isEmailFormat ? "1" : "2",
      };

      console.log("Resending code with payload:", payload);
      const res = await axios.post("/api/api_open", payload);
      console.log("Resend API response:", res.data);

      if (res.data.status === "success") {
        if (res.data.code) {
          console.log("New code received:", res.data.code);
          setSentCode(res.data.code);
          toast.success(
            langToggle ? "Код дахин илгээгдлээ!" : "Code resent successfully!"
          );
        } else {
          console.warn("No code in response", res.data);
          toast.warning(
            langToggle
              ? "Код хүлээн авах боломжгүй байна"
              : "Unable to receive verification code"
          );
        }
      } else {
        console.error("API error response:", res.data);
        toast.error(
          res.data.message ||
            (langToggle ? "Код илгээхэд алдаа гарлаа!" : "Error sending code!")
        );
      }
    } catch (error: any) {
      console.error("API error:", error);
      toast.error(
        error.response?.data?.message ||
          (langToggle ? "Сүлжээний алдаа!" : "Network error!")
      );
    }
  };

  return (
    <div className="font-lato flex w-[1586px] rounded-3xl h-[900px] bg-[#f3f3f3]">
      <div className="hidden md:flex md:w-1/2 pl-12 flex-col items-center justify-center p-12 pt-[80px] text-white">
        <div className="w-full justify-between items-center h-full max-w-[585px]">
          <div className="text-start">
            <div className="flex justify-between">
              <div className="flex items-center gap-1">
                <img
                  className="w-[30px] h-[30px]"
                  src="/blacklogo.png"
                  alt=""
                />
                <p className="text-2xl text-[#5C5C5C]">restaurant.mn</p>
              </div>
              <div
                onClick={() => setLangToggle(!langToggle)}
                className="flex items-center cursor-pointer justify-center h-7 gap-1"
              >
                <Earth className="text-black h-[30px] w-[30px]" />
                <div className="text-black text-2xl w-9">
                  {langToggle ? text.mn.mn : text.en.en}
                </div>
              </div>
            </div>
            <button
              onClick={() => setStep(1)}
              className="h-8 text-start flex mt-[10px] items-center justify-start text-sm text-gray-700 mb-2"
            >
              <ChevronLeft className="w-5 h-5" />
              {langToggle ? "Буцах" : "back"}
            </button>
            <div className="text-[#9A9A9A] mt-3 flex-col font-normal text-sm flex gap-2">
              <h1 className="text-[32px] mt-[28px] font-semibold text-[#161616]">
                {langToggle ? text.mn.head : text.en.head}
                <span className="text-[#F5BE32] font-medium">
                  {langToggle ? text.mn.headTseg : text.en.headTseg}
                </span>
              </h1>
              <div className="flex gap-2 mt-[17px]">
                {langToggle ? text.mn.description1 : text.en.description1}
                <div
                  onClick={() => setLogin(true)}
                  className="underline cursor-pointer"
                >
                  {langToggle ? text.mn.description2 : text.en.description2}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-[44px]">
            <div className="flex gap-4">
              <DisabledInput value={lastName} />
              <DisabledInput value={firstName} />
            </div>
            <DisabledInput value={contactInfo} />
          </div>
          <div className="text-[32px] flex gap-2 pb-1 pt-[36px] text-black font-semibold">
            Confirmation
            <p className="text-[#F5BE32]">.</p>
          </div>
          <div className="text-sm py-1 text-[#9A9A9A]">
            {isEmail(contactInfo)
              ? "Enter the code we sent to your e-mail."
              : "Enter the code we sent to your phone."}
          </div>
          <OtpInput value={confirmationCode} onChange={setConfirmationCode} />
          <div className="text-base font-semibold text-[#707070] mt-4 flex items-center">
            <span>{langToggle ? "Дахин илгээх" : "Resend code"}</span>
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
                      strokeDashoffset={63 - (63 * timer) / 60}
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
                disabled={timer > 0}
                aria-label="Resend verification code"
              >
                {langToggle ? "Илгээх" : "Send"}
              </button>
            )}
          </div>
          <div className="flex flex-col mt-[60px] items-center">
            <Button
              onClick={handleVerifyCode}
              disabled={verifying || confirmationCode.length !== 6}
              className="w-[367px] h-[56px] cursor-pointer items-center rounded-xl text-white text-lg font-medium bg-gradient-to-r from-[#EAC947] to-[#F6A253] hover:opacity-90 disabled:opacity-50 transition-opacity duration-200"
            >
              {verifying ? (
                <div className="flex items-center justify-center w-full">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  <span>
                    {langToggle ? "Баталгаажуулж байна..." : "Verifying..."}
                  </span>
                </div>
              ) : langToggle ? (
                "Үргэлжлүүлэх"
              ) : (
                "Continue"
              )}
            </Button>
          </div>
          <p className="text-sm text-red-500 mt-2">{localError || error}</p>
          <SocialLogin signIn={signIn} langToggle={langToggle} text={text} />
        </div>
      </div>
      <div className="w-full md:w-1/2 flex flex-col items-center justify-center">
        <img
          className="h-full md:w-full rounded-r-3xl"
          src="/login/image.png"
          alt=""
        />
      </div>
    </div>
  );
};

// Step3 component
interface Step3Props {
  lastName: string;
  firstName: string;
  contactInfo: string;
  password: string;
  repassword: string;
  setPassword: (password: string) => void;
  setRepassword: (repassword: string) => void;
  onSubmit: () => void;
  error: string;
  setError: (error: string) => void;
  langToggle: boolean;
  setLangToggle: (langToggle: boolean) => void;
  text: TranslationText;
  signIn: typeof signIn;
  setStep: (step: number) => void;
  setLogin: (login: boolean) => void;
}

const Step3: React.FC<Step3Props> = ({
  lastName,
  firstName,
  contactInfo,
  password,
  repassword,
  setPassword,
  setRepassword,
  onSubmit,
  error,
  setError,
  langToggle,
  setLangToggle,
  text,
  signIn,
  setStep,
  setLogin,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);

  return (
    <div className="font-lato flex w-[1586px] rounded-3xl h-[900px] bg-[#f3f3f3]">
      <div className="hidden md:flex md:w-1/2 pl-12 flex-col items-center justify-center p-12 pt-[80px] text-white">
        <div className="w-full justify-between items-center h-full max-w-[585px]">
          <div className="text-start">
            <div className="flex justify-between">
              <div className="flex items-center gap-1">
                <img
                  className="w-[30px] h-[30px]"
                  src="/blacklogo.png"
                  alt=""
                />
                <p className="text-2xl text-[#5C5C5C]">restaurant.mn</p>
              </div>
              <div
                onClick={() => setLangToggle(!langToggle)}
                className="flex items-center cursor-pointer justify-center h-7 gap-1"
              >
                <Earth className="text-black h-[30px] w-[30px]" />
                <div className="text-black text-2xl w-9">
                  {langToggle ? text.mn.mn : text.en.en}
                </div>
              </div>
            </div>
            <button
              onClick={() => setStep(2)}
              className="h-8 text-start flex mt-[10px] items-center justify-start text-sm text-gray-700 mb-2"
            >
              <ChevronLeft className="w-5 h-5" />
              {langToggle ? "Буцах" : "back"}
            </button>
            <div className="text-[#9A9A9A] mt-3 flex-col font-normal text-sm flex gap-2">
              <h1 className="text-[32px] mt-[28px] font-semibold text-[#161616]">
                {langToggle ? text.mn.head : text.en.head}
                <span className="text-[#F5BE32] font-medium">
                  {langToggle ? text.mn.headTseg : text.en.headTseg}
                </span>
              </h1>
              <div className="flex gap-2 mt-[17px]">
                {langToggle ? text.mn.description1 : text.en.description1}
                <div
                  onClick={() => setLogin(true)}
                  className="underline cursor-pointer"
                >
                  {langToggle ? text.mn.description2 : text.en.description2}
                </div>
              </div>
            </div>
          </div>
          <div className="mb-4 pt-[44px]">
            <div className="flex gap-4">
              <DisabledInput value={lastName} />
              <DisabledInput value={firstName} />
            </div>
            <DisabledInput value={contactInfo} />
          </div>
          <div className="mt-7 flex flex-col gap-4">
            <div className="relative">
              <Input
                id="passwordRegister"
                type={showPassword ? "text" : "password"}
                placeholder={
                  langToggle ? text.mn.inputText4 : text.en.inputText4
                }
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-[58px] rounded-md text-black border-[#e0e0e0] bg-[#ECECEC] px-4 text-lg placeholder:text-[#ababab] pr-12"
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
                id="repasswordRegister"
                type={showRePassword ? "text" : "password"}
                placeholder={
                  langToggle ? text.mn.inputText5 : text.en.inputText5
                }
                value={repassword}
                onChange={(e) => setRepassword(e.target.value)}
                className="h-[58px] rounded-md text-black border-[#e0e0e0] bg-[#ECECEC] px-4 text-lg placeholder:text-[#ababab] pr-12"
              />
              <button
                type="button"
                onClick={() => setShowRePassword(!showRePassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                aria-label={showRePassword ? "Hide password" : "Show password"}
              >
                {showRePassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>

            <div className="flex flex-col mt-3 items-center">
              <Button
                onClick={() => {
                  if (password.length < 8) {
                    setError(
                      langToggle
                        ? "Нууц үг хамгийн багадаа 8 тэмдэгт байх ёстой."
                        : "Password must be at least 8 characters."
                    );
                    toast.error(
                      langToggle
                        ? "Нууц үг хамгийн багадаа 8 тэмдэгт байх ёстой."
                        : "Password must be at least 8 characters."
                    );
                    return;
                  }

                  if (repassword !== password) {
                    setError("Нууц үг таарахгүй байна");
                    toast.error(
                      langToggle
                        ? "Нууц үг таарахгүй байна"
                        : "Passwords do not match"
                    );
                    return;
                  }

                  onSubmit();
                }}
                className="w-[367px] h-[56px] cursor-pointer rounded-xl text-white text-lg font-medium bg-gradient-to-r from-[#EAC947] to-[#F6A253] hover:opacity-90"
              >
                {langToggle ? text.mn.button : text.en.button}
              </Button>
            </div>
            <p className="text-sm text-red-500 mt-2">{error}</p>
          </div>
          <SocialLogin signIn={signIn} langToggle={langToggle} text={text} />
        </div>
      </div>
      <div className="w-full md:w-1/2 flex flex-col items-center justify-center">
        <img
          className="h-full md:w-full rounded-r-3xl"
          src="/login/image.png"
          alt=""
        />
      </div>
    </div>
  );
};

const RestRegister: React.FC = () => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState("");
  const [eye, setEye] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [login, setLogin] = useState(false);
  const [langToggle, setLangToggle] = useState(true);
  const router = useRouter();

  // Stepper state
  const [step, setStep] = useState(1);
  const [contactInfo, setContactInfo] = useState("");
  const [confirmationCode, setConfirmationCode] = useState("");
  const [id, setId] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [sentCode, setSentCode] = useState("");

  const text: TranslationText = {
    mn: {
      mn: "mn",
      head: " Бүртгүүлэх",
      headTseg: " .",
      description1: "Бүртгэлтэй бол",
      description2: "Нэвтрэх",
      inputText1: "Овог",
      inputText2: "Нэр",
      inputText3: "И-мэйл эсвэл Утасны дугаар",
      inputText4: "Нууц үг",
      inputText5: "Нууц үг давтах",
      text1: "Үйлчилгээний нөхцлийг зөвшөөрөх",
      button: "Үргэлжлүүлэх",
      text2: "Эсвэл",
    },
    en: {
      en: "en",
      head: " Create new account",
      headTseg: ".",
      description1: "Already have an account?",
      description2: "Log in",
      inputText1: "Last name",
      inputText2: "First name",
      inputText3: "e-mail or phone number",
      inputText4: "Password",
      inputText5: "Repeat password",
      text1: "I agree Terms & Conditions",
      button: "Create account",
      text2: "Or register with",
    },
  };

  const handleChange = () => {
    setError("");
  };

  const onSubmit = async () => {
    const contactInfoValue = contactInfo;
    const customerName = `${lastName} ${firstName}`;

    if (!contactInfoValue) {
      setError("И-мэйл эсвэл утасны дугаараа оруулна уу.");
      return;
    }

    if (password.length < 8) {
      setError(
        langToggle
          ? "Нууц үг хамгийн багадаа 8 тэмдэгт байх ёстой."
          : "Password must be at least 8 characters."
      );
      return;
    }

    if (repassword !== password) {
      setError("Нууц үг таарахгүй байна");
      return;
    }

    try {
      const isEmailFormat = isEmail(contactInfoValue);
      
      const payload = {
        sn: "customer_add",
        first_name: firstName,
        last_name: lastName,
        password,
        phone: isEmailFormat ? "" : contactInfoValue,
        email: isEmailFormat ? contactInfoValue : "",
      };

      const response = await axios.post("/api/api_open", payload);

      if (response.data.status === "success") {
        setError("");
        setId(response.data.new_id || "");
        toast.success(
          langToggle ? "Амжилттай бүртгэгдлээ!" : "Successfully registered!",
          {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          }
        );
        setLogin(true);
      } else if (response.data.message === "И-мэйл бүртгэлтэй байна.") {
        // If email is already registered
        toast.info(
          langToggle 
            ? "Таны и-мэйл бүртгэлтэй байна. Нэвтрэх хуудас руу шилжүүлж байна."
            : "Your email is already registered. Redirecting to login page.",
          {
            position: "top-right",
            autoClose: 3000,
          }
        );
        setTimeout(() => {
          setLogin(true);
        }, 2000);
      } else {
        setError(
          response.data.message ||
            (langToggle ? "Бүртгэл амжилтгүй боллоо" : "Registration failed")
        );
      }
    } catch (error: any) {
      console.error("Registration error:", error);
      
      // Check if the error is about already registered email
      if (error.response?.data?.message === "И-мэйл бүртгэлтэй байна.") {
        toast.info(
          langToggle 
            ? "Таны и-мэйл бүртгэлтэй байна. Нэвтрэх хуудас руу шилжүүлж байна."
            : "Your email is already registered. Redirecting to login page.",
          {
            position: "top-right",
            autoClose: 3000,
          }
        );
        setTimeout(() => {
          setLogin(true);
        }, 2000);
      } else {
        setError(
          error.response?.data?.message ||
            (langToggle
              ? "Бүртгэлийн явцад алдаа гарлаа"
              : "An error occurred during registration")
        );
      }
    }
  };

  const isEmail = (value: string): boolean =>
    value.includes("@") && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  const isPhone = (value: string): boolean => /^\d{8}$/.test(value);

  const [timer, setTimer] = useState(45);
  useEffect(() => {
    if (step === 2 && timer > 0) {
      const interval = setInterval(() => setTimer((t) => t - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [step, timer]);

  const onResend = async () => {
    setTimer(45);
    try {
      const isEmailFormat = isEmail(contactInfo);
      const isPhoneFormat = isPhone(contactInfo);
      const payload: Record<string, string> = {
        sn: "customer_send_code_signup",
        to_value: contactInfo,
        type: isEmailFormat ? "1" : "2",
      };

      console.log("Resending code with payload:", payload);
      const res = await axios.post("/api/api_open", payload);
      console.log("Resend API response:", res.data);

      if (res.data.status === "success") {
        if (res.data.code) {
          console.log("New code received:", res.data.code);
          setSentCode(res.data.code);
          toast.success(
            langToggle ? "Код дахин илгээгдлээ!" : "Code resent successfully!"
          );
        } else {
          console.warn("No code in response", res.data);
          toast.warning(
            langToggle
              ? "Код хүлээн авах боломжгүй байна"
              : "Unable to receive verification code"
          );
        }
      } else {
        console.error("API error response:", res.data);
        toast.error(
          res.data.message ||
            (langToggle ? "Код илгээхэд алдаа гарлаа!" : "Error sending code!")
        );
      }
    } catch (error: any) {
      console.error("API error:", error);
      toast.error(
        error.response?.data?.message ||
          (langToggle ? "Сүлжээний алдаа!" : "Network error!")
      );
    }
  };

  let content: JSX.Element;
  if (login) {
    content = <RestLogin />;
  } else if (step === 1) {
    content = (
      <Step1
        lastName={lastName}
        setLastName={setLastName}
        firstName={firstName}
        setFirstName={setFirstName}
        contactInfo={contactInfo}
        setContactInfo={setContactInfo}
        error={error}
        setError={setError}
        agreed={agreed}
        setAgreed={setAgreed}
        setStep={setStep}
        langToggle={langToggle}
        setLangToggle={setLangToggle}
        text={text}
        signIn={signIn}
        setLogin={setLogin}
        setSentCode={setSentCode}
      />
    );
  } else if (step === 2) {
    content = (
      <Step2
        lastName={lastName}
        firstName={firstName}
        contactInfo={contactInfo}
        confirmationCode={confirmationCode}
        setConfirmationCode={setConfirmationCode}
        error={error}
        setStep={setStep}
        timer={timer}
        onResend={onResend}
        langToggle={langToggle}
        setLangToggle={setLangToggle}
        text={text}
        signIn={signIn}
        setLogin={setLogin}
        sentCode={sentCode}
        setSentCode={setSentCode}
        isEmail={isEmail}
        isPhone={isPhone}
      />
    );
  } else {
    content = (
      <Step3
        lastName={lastName}
        firstName={firstName}
        contactInfo={contactInfo}
        password={password}
        repassword={repassword}
        setPassword={setPassword}
        setRepassword={setRepassword}
        onSubmit={onSubmit}
        error={error}
        setError={setError}
        langToggle={langToggle}
        setLangToggle={setLangToggle}
        text={text}
        signIn={signIn}
        setStep={setStep}
        setLogin={setLogin}
      />
    );
  }

  return (
    <div className="font-lato">
      {content}
      <ToastContainer />
    </div>
  );
};

export default RestRegister;
