"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Eye, Facebook } from "lucide-react";
import Link from "next/link";
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import axios from "axios";
import RestRegister from "./RestRegister";

const RestForgetPass = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState("");
  const [repassword, setRepassword] = useState("");
  const [eye, setEye] = useState(false);

  const { login, isLoggedIn } = useUser();

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
          router.push("/");
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

  return (
    <div>
      <div className="flex h-[802px] w-[587px] items-center justify-center rounded-3xl bg-[#f3f3f3] p-4">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h1 className="text-4xl font-medium text-[#161616]">
              Нүүц үг сэргээх
            </h1>
          </div>

          <div className="space-y-6">
            <div className="space-y-2" onChange={handleChange}>
              <label htmlFor="email" className="text-[#727272] text-lg">
                E-mail or Phone number
              </label>
              <Input
                id="email"
                type="text"
                placeholder="E-mail or Phone number"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-14 rounded-md  border-[#e0e0e0] bg-[#ECECEC] px-4 text-lg placeholder:text-[#ababab]"
              />
            </div>

            <div className="space-y-2" onChange={handleChange}>
              <label htmlFor="password" className="text-[#727272] text-lg">
                Password
              </label>
              <Input
                id="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-14 rounded-md border-[#e0e0e0] bg-[#ECECEC] px-4 text-lg placeholder:text-[#ababab]"
              />
            </div>
            <label htmlFor="password" className="text-[#727272] text-lg">
              Re-enter Password
            </label>
            <div className="relative items-center">
              {eye ? (
                <Input
                  id="repassword1"
                  type="text"
                  placeholder="Password"
                  value={repassword}
                  onChange={(e) => setRepassword(e.target.value)}
                  className="h-14 rounded-md border-[#e0e0e0] bg-[#ECECEC] px-4 text-lg placeholder:text-[#ababab]"
                />
              ) : (
                <Input
                  id="repassword2"
                  type="password"
                  placeholder="Password"
                  value={repassword}
                  onChange={(e) => setRepassword(e.target.value)}
                  className="h-14 rounded-md border-[#e0e0e0] bg-[#ECECEC] px-4 text-lg placeholder:text-[#ababab]"
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
                className="absolute cursor-pointer right-3 top-1/2 transform -translate-y-1/2 text-[#828282]"
              >
                <Eye size={20} />
              </button>
            </div>
            <p className="text-sm text-red-500">{error}</p>

            <div className="flex items-center  space-x-2">
              <Checkbox
                id="termslogin"
                checked={agreed}
                onCheckedChange={(checked) => setAgreed(checked === true)}
                className="h-5 w-5 border-[#828282] cursor-pointer data-[state=checked]:bg-[#fa742a] data-[state=checked]:border-[#fa742a]"
              />
              <label
                htmlFor="termslogin"
                className="text-[#676767] cursor-pointer text-base"
              >
                I agree to the
              </label>
            </div>
            {agreed ? (
              <Button
                onClick={() => {
                  onSubmit();
                }}
                className="w-full  h-14 cursor-pointer rounded-md text-white text-lg font-medium bg-gradient-to-r from-[#ffc107] to-[#ff3d00] hover:opacity-90"
              >
                Нууц үг сэргээх
              </Button>
            ) : (
              <Button
                disabled
                onClick={() => {
                  onSubmit();
                }}
                className="w-full  h-14 cursor-pointer rounded-md text-white text-lg font-medium bg-gradient-to-r from-[#ffc107] to-[#ff3d00] hover:opacity-90"
              >
                Нууц үг сэргээх
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default RestForgetPass;
