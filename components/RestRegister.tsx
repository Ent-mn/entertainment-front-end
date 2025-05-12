"use client";

import { Eye } from "lucide-react";
import { Input } from "./ui/input";
import { useEffect, useState } from "react";
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

const RestRegister = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState("");
  const [eye, setEye] = useState(false);
  const [isopen, setIsopen] = useState(false);
  const [login, setLogin] = useState(false);

  const [langToggle, setLangToggle] = useState(true);

  const router = useRouter();

  const handleChange = () => {
    setError("");
  };

  const [id, setId] = useState("");
  const emailCHeker = async () => {
    try {
      const { data }: any = await axios.post("/api/api_open", {
        sn: "customer_email_check",
        id: id,
      });
      setIsopen(true);
    } catch (error) {
      console.log(error);
    }
  };
  const onSubmit = () => {
    if (repassword === password) {
      const fetchData = async () => {
        try {
          const { data }: any = await axios.post("/api/api_open", {
            sn: "customer_add",
            phone: email,
            password: password,
            email: `${email}`,
          });
          if (data.status == "success") {
            setError("");
            const user = data.result;
            const token = data.token;
            setId(data.new_id);
            emailCHeker();
          } else {
            setError(`${data.message}`);
            console.log(data);
            setIsopen(false);
          }
        } catch (error) {
          console.log(error);
        }
      };

      fetchData();
    } else {
      setError("нууц үг таарахгүй байна ");
    }
  };

  const text = {
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
      button: "Бүртгүүлэх",
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

  return (
    <div>
      {login ? (
        <RestLogin />
      ) : (
        <div className="flex w-[1059px] rounded-3xl h-[696px]  bg-[#f3f3f3]">
          {/* Left Panel */}
          <div className="hidden md:flex md:w-1/2 pl-12 py-[45px]  flex-col items-center justify-between p-12 text-white">
            <div className="w-full max-w-md">
              <div className="text-start ">
                <div className="flex justify-between">
                  <img
                    className="w-[160px] h-[25px]"
                    src="/login/login-logo.png"
                    alt=""
                  />
                  <div
                    onClick={() => {
                      setLangToggle((prev) => !prev);
                    }}
                    className="flex items-center cursor-pointer justify-center h-7 gap-1"
                  >
                    <img src="/login/Vector.png" alt="" />
                    <div className="text-[#5C5C5C] text-2xl w-9 ">
                      {langToggle ? text.mn.mn : text.en.en}
                    </div>
                  </div>
                </div>
                <h1 className="text-2xl mt-[50px] font-medium text-[#161616]">
                  {langToggle ? text.mn.head : text.en.head}
                  <span className="text-[#F5BE32] font-medium">
                    {langToggle ? text.mn.headTseg : text.en.headTseg}
                  </span>
                </h1>
              </div>
              <div className="text-[#9A9A9A] mt-3 font-normal text-sm flex gap-2">
                {langToggle ? text.mn.description1 : text.en.description1}
                <div
                  onClick={() => {
                    setLogin(true);
                  }}
                  className="underline cursor-pointer"
                >
                  {langToggle ? text.mn.description2 : text.en.description2}
                </div>
              </div>

              <div className=" flex mt-7 flex-col gap-4">
                <div className="flex w-full justify-between ">
                  <div onChange={handleChange}>
                    <Input
                      id="ovog"
                      type="text"
                      placeholder={
                        langToggle ? text.mn.inputText1 : text.en.inputText1
                      }
                      className="h-10 rounded-md w-52 text-black  border-[#e0e0e0] bg-[#ECECEC] px-4 text-lg placeholder:text-[#ababab]"
                    />
                  </div>
                  <div onChange={handleChange}>
                    <Input
                      id="ner"
                      type="text"
                      placeholder="Нэр"
                      className="h-10 rounded-md w-52 text-black  border-[#e0e0e0] bg-[#ECECEC] px-4 text-lg placeholder:text-[#ababab]"
                    />
                  </div>
                </div>
                <div onChange={handleChange}>
                  <Input
                    id="emailRegister"
                    type="text"
                    placeholder={
                      langToggle ? text.mn.inputText3 : text.en.inputText3
                    }
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-10 rounded-md text-black  border-[#e0e0e0] bg-[#ECECEC] px-4 text-lg placeholder:text-[#ababab]"
                  />
                </div>

                <div onChange={handleChange}>
                  <Input
                    id="passwordRegister"
                    type="password"
                    placeholder={
                      langToggle ? text.mn.inputText4 : text.en.inputText4
                    }
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-10 rounded-md text-black border-[#e0e0e0] bg-[#ECECEC] px-4 text-lg placeholder:text-[#ababab]"
                  />
                </div>

                <div onChange={handleChange}>
                  <div className="relative">
                    {eye ? (
                      <Input
                        id="repassword1"
                        type="text"
                        placeholder={
                          langToggle ? text.mn.inputText5 : text.en.inputText5
                        }
                        value={repassword}
                        onChange={(e) => setRepassword(e.target.value)}
                        className="h-10 rounded-md text-black border-[#e0e0e0] bg-[#ECECEC] px-4 text-lg placeholder:text-[#ababab]"
                      />
                    ) : (
                      <Input
                        id="repassword2"
                        type="password"
                        placeholder={
                          langToggle ? text.mn.inputText5 : text.en.inputText5
                        }
                        value={repassword}
                        onChange={(e) => setRepassword(e.target.value)}
                        className="h-10 rounded-md text-black border-[#e0e0e0] bg-[#ECECEC] px-4 text-lg placeholder:text-[#ababab]"
                      />
                    )}
                    <button
                      onMouseDown={() => {
                        setEye(true);
                      }}
                      onMouseUp={() => {
                        setEye(false);
                      }}
                      onMouseLeave={() => {
                        setEye(false);
                      }}
                      type="button"
                      className="absolute cursor-pointer right-3 top-1/2 transform -translate-y-1/2 text-[#828282]"
                    >
                      <Eye size={20} />
                    </button>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-red-500">{error}</p>
                  <div className="flex items-center  space-x-2">
                    <Checkbox
                      id="termsRegister"
                      checked={agreed}
                      onCheckedChange={(checked) => setAgreed(checked === true)}
                      className="h-5 w-5 border-[#828282] cursor-pointer data-[state=checked]:bg-[#fa742a] data-[state=checked]:border-[#fa742a]"
                    />
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline">
                          <div className="text-[#676767] cursor-pointer text-xs">
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
                  {agreed ? (
                    <div className="w-72 h-10 cursor-pointer rounded-xl text-white text-base font-normal bg-gradient-to-r from-[#EAC947] to-[#F6A253] hover:opacity-90">
                      <VerificationCodeModal
                        isopen={isopen}
                        setIsopen={setIsopen}
                        userId={id}
                        onSubmit={onSubmit}
                      />
                      {langToggle ? text.mn.button : text.en.button}
                    </div>
                  ) : (
                    <Button
                      disabled
                      onClick={() => {
                        onSubmit();
                      }}
                      className="w-72  h-10 cursor-pointer rounded-xl text-white text-base font-normal bg-gradient-to-r from-[#EAC947] to-[#F6A253] hover:opacity-90"
                    >
                      {langToggle ? text.mn.button : text.en.button}
                    </Button>
                  )}
                </div>
                <div className="w-[433.5px] flex flex-col items-center">
                  <div className="flex w-72 items-center flex-col">
                    <div className="flex justify-between w-64 items-center">
                      <img
                        className="h-[1px] w-[95px]"
                        src="/login/Line.png"
                        alt=""
                      />
                      <div className="text-[#676767] text-xs">
                        {langToggle ? text.mn.text2 : text.mn.text2}
                      </div>
                      <img
                        className="h-[1px] w-[95px]"
                        src="/login/Line.png"
                        alt=""
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3 mt-4 h-9 w-72">
                      <button
                        type="button"
                        onClick={() =>
                          signIn("facebook", { callbackUrl: "/restaurant" })
                        }
                        className="flex items-center justify-center h-9 px-1 border border-[#e0e0e0] rounded-xl bg-white"
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
                        <span className="text-[#8c8c8c] text-[10px] ml-1">
                          Sign up with Facebook
                        </span>
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          signIn("google", { callbackUrl: "/restaurant" })
                        }
                        className="flex items-center justify-center h-9 gap-1 px-1 border border-[#e0e0e0] rounded-xl bg-white"
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
                        <span className="text-[#8c8c8c] text-[10px]">
                          Sign up with Google
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel */}
          <div className="w-full md:w-1/2 flex flex-col  items-center justify-center">
            <img
              className="h-full rounded-r-3xl"
              src="/login/image.png"
              alt=""
            />
          </div>
        </div>
      )}
    </div>
  );
};
export default RestRegister;
