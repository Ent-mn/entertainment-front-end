"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Eye, EyeOff } from "lucide-react";
import axios from "axios";
import { useUser } from "@/context/UserContext";

const Login = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [showPassword, setShowPassword] = useState(false);

  const { login, isLoggedIn } = useUser();

  const [error, setError] = useState("");

  const handleChange = () => {
    setError("");
  };

  useEffect(() => {
    if (isLoggedIn) {
      router.push("/");
    }
  }, [isLoggedIn, router]);

  const onSubmit = (userdata: Record<string, any>) => {
    userdata.sn = "customer_login";

    const fetchData = async () => {
      try {
        const { data }: any = await axios.post(
          "http://202.179.6.27:7000/api_open",
          {
            sn: userdata.sn,
            phone: userdata.phone,
            password: userdata.password,
          }
        );
        if (data.status !== "error") {
          setError("");
          const user = data.result;
          const token = data.token;

          login(user, token);
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

  const images = ["/image copy.png", "/perfume.png", "/image copy.png"];

  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 3000); // 3 секунд тутамд зураг солигдоно

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen p-4">
      {/* Left side */}
      <div className="relative hidden md:flex md:w-[464px] h-auto md:h-[600px] flex-col items-center justify-center bg-orange-400 text-white">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-semibold">
            Бүх төрлийн төхөөрөмжөөс хялбар ашиглах боломжтой
          </h2>
          <p className="text-white/80">Fully Responsive</p>
        </div>

        <div className="space-y-4 w-full flex flex-col items-center">
          <div className="relative w-full h-64 mb-8">
            {images.map((src, index) => (
              <Image
                key={index}
                src={src}
                alt={`Preview ${index}`}
                fill
                className={`object-contain w-[352px] h-[235px] transition-opacity duration-500 ${
                  activeImage === index ? "opacity-100" : "opacity-0"
                }`}
              />
            ))}
          </div>

          <div className="relative w-32 h-32">
            <Image
              src="/image copy 4.png"
              alt="QR Code"
              fill
              className="object-contain"
            />
          </div>

          {/* Товчлуурууд */}
          <div className="flex gap-2">
            {images.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                  activeImage === index ? "bg-white" : "bg-white/50"
                }`}
                onClick={() => setActiveImage(index)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Right side */}
      <div className="w-full max-w-xl h-[600px] flex flex-col justify-center items-center p-4 shadow-xl bg-white rounded-lg">
        <div className="flex flex-col items-center mb-6">
          <Image
            src="/image.png"
            alt="Entertainment.mn"
            width={180}
            height={40}
            className="object-contain"
          />
          <h3 className="text-xl font-semibold">Нэвтрэх / Login</h3>
          <p>Хэрэглэгчээр, харилцагчаар нэвтрэх</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full">
          <div onChange={handleChange}>
            <label htmlFor="string" className="block text-sm font-semibold">
              Нэвтрэх нэр
            </label>
            <input
              id="name"
              type="name"
              placeholder="Имэйл хаяг"
              {...register("phone", { required: "Нэвтрэх нэр эсвэл Имэйл" })}
              className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400 ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.string && (
              <p className="text-sm text-red-500">
                {typeof errors === "string" ? errors : "123"}
              </p>
            )}
          </div>

          <div>
            <div onChange={handleChange}>
              <label htmlFor="password" className="block text-sm font-semibold">
                Нууц үг
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Нууц үг"
                  {...register("password", { required: "Нууц үг оруулна уу!" })}
                  className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400 ${
                    errors.password ? "border-red-500" : "border-gray-300"
                  }`}
                />
                <button
                  type="button"
                  className="absolute right-2 top-1/2 -translate-y-1/2"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-sm text-red-500">
                  {typeof errors.password.message === "string"
                    ? errors.password.message
                    : ""}
                </p>
              )}
            </div>
            <p className="text-sm text-red-500">{error}</p>
          </div>

          <button
            type="submit"
            className="w-full py-2  cursor-pointer bg-orange-400 text-white rounded-md hover:bg-orange-500 transition duration-200"
          >
            Нэвтрэх
          </button>

          <div className="text-center">
            <button
              type="button"
              className="text-sm text-gray-500 underline"
              onClick={() => router.push("/forgot-password")}
            >
              Нууц үг сэргээх
            </button>
          </div>

          <button
            className="w-full py-2 bg-[#811AE0] text-white rounded-md hover:bg-[#6C13B3] transition duration-200"
            onClick={() => router.push("/register")}
          >
            Бүртгүүлэх
          </button>

          <div className="grid grid-cols-2 gap-4 pb-9">
            <button
              type="button"
              className="w-full py-2 border border-gray-300 rounded-md flex items-center cursor-pointer justify-center gap-2 hover:bg-gray-100"
            >
              <Image
                src="/image copy 3.png"
                alt="Facebook"
                width={20}
                height={20}
              />
              <span className="text-gray-600">Facebook</span>
            </button>
            <button
              type="button"
              className="w-full py-2 border border-gray-300 rounded-md flex items-center cursor-pointer justify-center gap-2 hover:bg-gray-100"
            >
              <Image
                src="/image copy 2.png"
                alt="Google"
                width={20}
                height={20}
              />
              <span className="text-gray-600">Google</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
