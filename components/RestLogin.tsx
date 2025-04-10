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

  const { login, isLoggedIn } = useUser();

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

  const router = useRouter();

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
          const user = data.result;
          const token = data.token;

          login(user);
          router.push("/restaurant");
        } else {
          console.log("false");
          setError("Нэр эсвэл нууц үг буруу байна ");
          console.log(data);
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

  return (
    <div>
      {forget ? (
        <RestForgetPass />
      ) : (
        <>
          {register ? (
            <RestRegister />
          ) : (
            <div className="flex h-[752px] w-[587px] items-start pt-[48px] relative justify-center rounded-3xl bg-[#f3f3f3] p-4">
              <div className="w-full max-w-md space-y-8">
                <div className="text-start ">
                  <div className="flex justify-between">
                    <img src="/login/login-logo.png" alt="" />
                    <div
                      onClick={() => {
                        setLangToggle((prev) => !prev);
                      }}
                      className="flex items-center cursor-pointer justify-center h-7 gap-1">
                      <img src="/login/Vector.png" alt="" />
                      <div className="text-[#5C5C5C] text-2xl w-9 ">
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
                    onClick={() => {
                      setRegister(true);
                    }}
                    className="underline cursor-pointer">
                    {langToggle ? text.mn.description2 : text.en.description2}
                  </div>
                </div>
                <div className="space-y-6 w-[448px] flex flex-col items-center">
                  <div className=" w-[448px] flex flex-col gap-4">
                    <div className="space-y-2" onChange={handleChange}>
                      <Input
                        id="email"
                        type="text"
                        placeholder={
                          langToggle ? text.mn.inputText1 : text.en.inputText1
                        }
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="h-14 rounded-md  border-[#e0e0e0] bg-[#ECECEC] px-4 text-lg placeholder:text-[#ababab]"
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
                    onClick={() => {
                      setForget(true);
                    }}>
                    <div className="text-[#7e7e7e] text-base hover:underline">
                      {langToggle ? text.mn.text1 : text.en.text1}
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 w-[360px]">
                    <Button
                      onClick={() => {
                        onSubmit();
                      }}
                      className="w-full  h-14 cursor-pointer rounded-xl text-white text-lg font-medium bg-gradient-to-r from-[#EAC947] to-[#F6A253] hover:opacity-90">
                      {langToggle ? text.mn.button : text.en.button}
                    </Button>
                    {langToggle ? (
                      <div className="flex justify-between items-center mt-6">
                        <img
                          className="h-[1px] w-[150px]"
                          src="/login/Line.png"
                          alt=""
                        />
                        <div className="text-[#676767] text-xs">
                          {text.mn.text2}
                        </div>
                        <img
                          className="h-[1px] w-[150px]"
                          src="/login/Line.png"
                          alt=""
                        />
                      </div>
                    ) : (
                      <div className="flex justify-between items-center mt-6">
                        <img
                          className="h-[1px] w-32"
                          src="/login/Line.png"
                          alt=""
                        />
                        <div className="text-[#676767] text-xs">
                          {text.en.text2}
                        </div>
                        <img
                          className="h-[1px] w-32"
                          src="/login/Line.png"
                          alt=""
                        />
                      </div>
                    )}

                    <div className="grid grid-cols-2 gap-4 pt-4">
                      <button
                        type="button"
                        onClick={handleFb}
                        className="flex items-center justify-center gap-2 p-3 border border-[#e0e0e0] rounded-xl bg-white">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="#1577f2">
                          <path d="M12 2.04C6.5 2.04 2 6.53 2 12.06C2 17.06 5.66 21.21 10.44 21.96V14.96H7.9V12.06H10.44V9.85C10.44 7.34 11.93 5.96 14.22 5.96C15.31 5.96 16.45 6.15 16.45 6.15V8.62H15.19C13.95 8.62 13.56 9.39 13.56 10.18V12.06H16.34L15.89 14.96H13.56V21.96C18.34 21.21 22 17.06 22 12.06C22 6.53 17.5 2.04 12 2.04Z" />
                        </svg>
                        <span className="text-[#8c8c8c] text-xs">
                          Sign in with Facebook
                        </span>
                      </button>
                      <div>
                        {status === "loading" ? (
                          <button
                            disabled
                            onClick={() => signIn("google")}
                            type="button"
                            className="flex items-center justify-center gap-2 p-3 border border-[#e0e0e0] rounded-xl bg-white">
                            <div className="mr-2 flex h-5 w-5 items-center justify-center">
                              <svg
                                width="18"
                                height="18"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24">
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
                            </div>
                            <span className="text-[#8c8c8c]">
                              Sign in with Google
                            </span>
                          </button>
                        ) : !session ? (
                          <button
                            onClick={() => signIn("google")}
                            type="button"
                            className="flex items-center justify-center gap-2 p-3 border border-[#e0e0e0] rounded-xl bg-white">
                            <div className="mr-2 flex h-5 w-5 items-center justify-center">
                              <svg
                                width="18"
                                height="18"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24">
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
                            </div>
                            <span className="text-[#8c8c8c] text-xs">
                              Sign in with Google
                            </span>
                          </button>
                        ) : (
                          <div>
                            <p>Welcome, {session.user?.name}</p>
                            <button onClick={() => signOut()}>Sign out</button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};
export default RestLogin;
