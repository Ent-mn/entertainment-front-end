"use client";

import FacebookLogin, {
  SuccessResponse,
} from "@greatsumini/react-facebook-login";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Facebook } from "lucide-react";
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

  const { login, isLoggedIn } = useUser();

  const { data: session, status } = useSession();

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

  // facebook login heseg

  const [message, setMessage] = useState<{
    text: string;
    severity: "error" | "success";
  }>();

  const onSuccessHandler = async (response: SuccessResponse) => {
    try {
      const apiResponse = await fetch("/api/facebook-login", {
        method: "POST",
        body: JSON.stringify({
          userId: response.userID,
          accessToken: response.accessToken,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await apiResponse.json();
      if (data.success) {
        setMessage({ text: "Login Successful.", severity: "success" });
        login(data.user);
        router.push("/restaurant");
      } else {
        setMessage({ text: "Facebook login failed.", severity: "error" });
      }
    } catch (error) {
      setMessage({
        text: "An error occurred while logging in with Facebook.",
        severity: "error",
      });
    }
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
            <div className="flex h-[802px] w-[587px] items-start pt-[48px] relative justify-center rounded-3xl bg-[#f3f3f3] p-4">
              <div className="w-full max-w-md space-y-8">
                <div className="text-start ">
                  <img src="/login/login-logo.png" alt="" />
                  <h1 className="text-4xl mt-[100px] font-medium text-[#161616]">
                    Нэвтрэх
                  </h1>
                </div>
                <div className="text-[#9A9A9A] font-normal text-base flex gap-2">
                  Бүртгэлгүй бол
                  <div
                    onClick={() => {
                      setRegister(true);
                    }}
                    className="underline cursor-pointer"
                  >
                    Бүртгүүлэх
                  </div>
                </div>
                <div className="space-y-6">
                  <div className="space-y-2" onChange={handleChange}>
                    <Input
                      id="email"
                      type="text"
                      placeholder="И-мэйл эсвэл  Утасны дугаар"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="h-14 rounded-md  border-[#e0e0e0] bg-[#ECECEC] px-4 text-lg placeholder:text-[#ababab]"
                    />
                  </div>

                  <div className="space-y-2" onChange={handleChange}>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Нууц үг"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="h-14 rounded-md border-[#e0e0e0] bg-[#ECECEC] px-4 text-lg placeholder:text-[#ababab]"
                    />
                  </div>
                  <p className="text-sm text-red-500">{error}</p>

                  <div
                    className="text-center cursor-pointer"
                    onClick={() => {
                      setForget(true);
                    }}
                  >
                    <div className="text-[#7e7e7e] text-base hover:underline">
                      Нүүц үг сэргээх
                    </div>
                  </div>

                  <Button
                    onClick={() => {
                      onSubmit();
                    }}
                    className="w-full  h-14 cursor-pointer rounded-md text-white text-lg font-medium bg-gradient-to-r from-[#ffc107] to-[#ff3d00] hover:opacity-90"
                  >
                    Нэвтрэх
                  </Button>

                  <div className="grid grid-cols-2 gap-4 pt-4">
                    <FacebookLogin
                      appId="614567378085067"
                      onSuccess={onSuccessHandler}
                      onFail={(error) => {
                        setMessage({
                          text: "Error occured",
                          severity: "error",
                        });
                      }}
                      render={({ onClick }) => (
                        <Button
                          onClick={onClick}
                          variant="outline"
                          className="h-12 rounded-md border cursor-pointer border-[#e0e0e0] bg-white hover:bg-white/90 text-[#676767]"
                        >
                          <Facebook className="mr-2 h-5 w-5 text-[#1577f2]" />
                          Sign in with Facebook
                        </Button>
                      )}
                    />
                    {message && (
                      <div
                        className={`${
                          message.severity === "error"
                            ? "text-red-600"
                            : "text-green-600"
                        }`}
                      >
                        {message.text}
                      </div>
                    )}
                    <div>
                      {status === "loading" ? (
                        <Button
                          disabled
                          variant="outline"
                          className="h-12 rounded-md border cursor-pointer border-[#e0e0e0] bg-white hover:bg-white/90 text-[#676767]"
                        >
                          <div className="mr-2 flex h-5 w-5 items-center justify-center">
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
                          </div>
                          Sign in with Google
                        </Button>
                      ) : !session ? (
                        <Button
                          onClick={() => signIn("google")}
                          variant="outline"
                          className="h-12 rounded-md border cursor-pointer border-[#e0e0e0] bg-white hover:bg-white/90 text-[#676767]"
                        >
                          <div className="mr-2 flex h-5 w-5 items-center justify-center">
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
                          </div>
                          Sign in with Google
                        </Button>
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
          )}
        </>
      )}
    </div>
  );
};
export default RestLogin;
