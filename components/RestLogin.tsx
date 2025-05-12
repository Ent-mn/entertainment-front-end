"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import axios from "axios";
import RestRegister from "./RestRegister";
import RestForgetPass from "./RestForgetPass";
import { useSession, signIn, signOut } from "next-auth/react";

const RestLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [register, setRegister] = useState(false);
  const [forget, setForget] = useState(false);
  const [langToggle, setLangToggle] = useState(true);

  const { login } = useUser();
  const router = useRouter();
  const { data: session, status } = useSession();

  const text = {
    mn: {
      mn: "mn",
      head: " Нэвтрэх",
      description1: "Бүртгэлгүй бол",
      description2: "Бүртгүүлэх",
      inputText1: "И-мэйл эсвэл Утасны дугаар",
      inputText2: "Нууц үг",
      text1: "Нүүц үг сэргээх",
      button: "Нэвтрэх",
      text2: "Эсвэл",
    },
    en: {
      en: "en",
      head: " Login",
      description1: "Don’t have an account?",
      description2: "Sign Up",
      inputText1: "e-mail or phone number",
      inputText2: "Password",
      text1: "Forgot password?",
      button: "Login",
      text2: "Or sign in with",
    },
  };

  const handleChange = () => {
    setError("");
  };

  const onSubmit = () => {
    const fetchData = async () => {
      try {
        const { data }: any = await axios.post("/api/api_open", {
          sn: "customer_login",
          phone: email,
          password: password,
        });
        if (data.result) {
          setError("");
          login(data.result);
          router.push("/restaurant");
        } else {
          setError("Нэр эсвэл нууц үг буруу байна ");
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  };

  const handleFb = async () => {
    await signIn("facebook");
  };

  if (status === "loading") return null;

  if (session) {
    return (
      <div className="flex items-center gap-3 relative">
        <img
          src={session.user?.image || "/default-profile.png"}
          alt="Profile"
          className="w-10 h-10 rounded-full border"
        />
        <div className="relative group">
          <button className="text-sm font-medium text-gray-800">
            {session.user?.name || "User"}
          </button>

          {/* Dropdown menu */}
          <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-md hidden group-hover:block z-10">
            <div className="px-4 py-2 text-sm text-gray-700 border-b">
              {session.user?.email}
            </div>
            <button
              onClick={() => signOut()}
              className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      {forget ? (
        <RestForgetPass />
      ) : register ? (
        <RestRegister />
      ) : (
        <div className="flex h-[752px] w-[587px] items-start pt-[48px] relative justify-center rounded-3xl bg-[#f3f3f3] p-4">
          <div className="w-full max-w-md space-y-8">
            <div className="text-start">
              <div className="flex justify-between">
                <img src="/login/login-logo.png" alt="" />
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
              <h1 className="text-4xl mt-[100px] font-medium text-[#161616]">
                {langToggle ? text.mn.head : text.en.head}
              </h1>
            </div>

            <div className="text-[#9A9A9A] font-normal text-base flex gap-2">
              {langToggle ? text.mn.description1 : text.en.description1}
              <div
                onClick={() => setRegister(true)}
                className="underline cursor-pointer"
              >
                {langToggle ? text.mn.description2 : text.en.description2}
              </div>
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
                    className="h-14 rounded-md border-[#e0e0e0] bg-[#ECECEC] px-4 text-lg placeholder:text-[#ababab]"
                  />
                </div>
                <div className="space-y-2" onChange={handleChange}>
                  <Input
                    id="password"
                    type="password"
                    placeholder={
                      langToggle ? text.mn.inputText2 : text.en.inputText2
                    }
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-14 rounded-md border-[#e0e0e0] bg-[#ECECEC] px-4 text-lg placeholder:text-[#ababab]"
                  />
                </div>
                <p className="text-sm text-red-500">{error}</p>
              </div>

              <div
                className="text-center cursor-pointer"
                onClick={() => setForget(true)}
              >
                <div className="text-[#7e7e7e] text-base hover:underline">
                  {langToggle ? text.mn.text1 : text.en.text1}
                </div>
              </div>

              <Button
                onClick={onSubmit}
                className="w-[360px] h-14 rounded-xl text-white text-lg font-medium bg-gradient-to-r from-[#EAC947] to-[#F6A253] hover:opacity-90"
              >
                {langToggle ? text.mn.button : text.en.button}
              </Button>

              <div className="flex justify-between items-center mt-6 w-[360px]">
                <img
                  className="h-[1px] w-[120px]"
                  src="/login/Line.png"
                  alt=""
                />
                <div className="text-[#676767] text-xs">
                  {langToggle ? text.mn.text2 : text.en.text2}
                </div>
                <img
                  className="h-[1px] w-[120px]"
                  src="/login/Line.png"
                  alt=""
                />
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4">
                <button
                  type="button"
                  onClick={handleFb}
                  className="flex items-center justify-center gap-2 p-3 border border-[#e0e0e0] rounded-xl bg-white"
                >
                  {/* Facebook icon here */}
                  <span className="text-[#8c8c8c] text-xs">
                    Sign in with Facebook
                  </span>
                </button>

                <button
                  onClick={() => signIn("google")}
                  type="button"
                  className="flex items-center justify-center gap-2 p-3 border border-[#e0e0e0] rounded-xl bg-white"
                >
                  {/* Google icon here */}
                  <span className="text-[#8c8c8c] text-xs">
                    Sign in with Google
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default RestLogin;
