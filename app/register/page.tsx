"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Image from "next/image";

const Register = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const onSubmit = (data: Record<string, any>) => {
    console.log("Бүртгэлийн мэдээлэл:", data);
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
    <div className="flex justify-center items-center p-4 bg-gray-100 min-h-screen">
      <div className="relative hidden md:flex md:w-[464px] h-auto md:h-[600px] flex-col items-center justify-center bg-orange-400 text-white">
        <div className="text-center">
          <h2 className="text-2xl">
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

      <div className="w-[774px] h-[600px] shadow-lg p-6 bg-white rounded-lg ">
        <div className="flex flex-col items-center p-0 m-0">
          <Image
            src="/image.png"
            alt="Entertainment.mn"
            width={180}
            height={40}
            className="object-contain"
          />
          <h2>Бүртгүүлэх / Create Account</h2>
          <p>Хэрэглэгчээр, харилцагчаар бүртгүүлэх</p>
        </div>

        <div className="flex flex-col ">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4 grid grid-cols-2 gap-4"
          >
            <div className="col-span-1 pt-4">
              <label htmlFor="firstName">Нэр</label>
              <input
                id="firstName"
                placeholder="Нэр"
                className="w-full p-2 border rounded-md"
                {...register("firstName", { required: "Нэр шаардлагатай" })}
              />
              {errors.firstName && (
                <p className="text-red-500 text-sm">
                  {errors.firstName.message?.toString()}
                </p>
              )}
            </div>

            <div className="col-span-1">
              <label htmlFor="lastName">Овог</label>
              <input
                id="lastName"
                placeholder="Овог"
                className="w-full p-2 border rounded-md"
                {...register("lastName", { required: "Овог шаардлагатай" })}
              />
              {errors.lastName && (
                <p className="text-red-500 text-sm">
                  {errors.lastName.message?.toString()}
                </p>
              )}
            </div>

            <div className="col-span-1">
              <label htmlFor="email">Имэйл</label>
              <input
                id="email"
                type="email"
                placeholder="Имэйл хаяг"
                className="w-full p-2 border rounded-md"
                {...register("email", { required: "Имэйл шаардлагатай" })}
              />
              {errors.email && (
                <p className="text-red-500 text-sm">
                  {errors.email.message?.toString()}
                </p>
              )}
            </div>

            <div className="col-span-1">
              <label htmlFor="phone">Утасны дугаар</label>
              <input
                id="phone"
                type="tel"
                placeholder="Утасны дугаар"
                className="w-full p-2 border rounded-md"
                {...register("phone", {
                  required: "Утасны дугаар шаардлагатай",
                })}
              />
              {errors.phone && (
                <p className="text-red-500 text-sm">
                  {errors.phone.message?.toString()}
                </p>
              )}
            </div>

            <div className="col-span-1">
              <label htmlFor="birthDate">Төрсөн огноо</label>
              <input
                id="birthDate"
                type="date"
                className="w-full p-2 border rounded-md"
                {...register("birthDate", {
                  required: "Төрсөн огноо шаардлагатай",
                })}
              />
              {errors.birthDate && (
                <p className="text-red-500 text-sm">
                  {errors.birthDate.message?.toString()}
                </p>
              )}
            </div>

            <div className="col-span-1">
              <label htmlFor="gender">Хүйс</label>
              <select
                id="gender"
                {...register("gender", {
                  required: "Хүйс сонгох шаардлагатай",
                })}
                className="w-full p-2 border rounded-md"
              >
                <option value="">Сонгох</option>
                <option value="male">Эрэгтэй</option>
                <option value="female">Эмэгтэй</option>
                <option value="other">Бусад</option>
              </select>
              {errors.gender && (
                <p className="text-red-500 text-sm">
                  {errors.gender.message?.toString()}
                </p>
              )}
            </div>

            <div className="col-span-1">
              <label htmlFor="password">Нууц үг</label>
              <input
                id="password"
                type="password"
                placeholder="Нууц үг"
                className="w-full p-2 border rounded-md"
                {...register("password", { required: "Нууц үг шаардлагатай" })}
              />
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message?.toString()}
                </p>
              )}
            </div>

            <div className="col-span-1">
              <label htmlFor="confirmPassword">Нууц үг давтах</label>
              <input
                id="confirmPassword"
                type="password"
                placeholder="Нууц үг давтах"
                className="w-full p-2 border rounded-md"
                {...register("confirmPassword", {
                  required: "Нууц үг давтах шаардлагатай",
                  validate: (value) =>
                    value === watch("password") || "Нууц үг таарахгүй байна",
                })}
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm">
                  {errors.confirmPassword.message?.toString()}
                </p>
              )}
            </div>
          </form>
        </div>

        <div className="flex px-6 justify-between w-full">
          <button
            type="submit"
            className="w-[168px] bg-[#811AE0] hover:bg-[#6C13B3] text-white py-2 px-4 rounded"
          >
            Бүртгүүлэх
          </button>

          <button
            type="submit"
            onClick={() => router.push("/login")}
            className="w-[168px] bg-orange-400 hover:bg-orange-500 text-white py-2 px-4 rounded"
          >
            Нэвтрэх
          </button>

          <button
            variant="outline"
            type="button"
            className="w-[148px] flex items-center gap-2 border rounded-md px-4 py-2"
          >
            <Image
              src="/image copy 3.png"
              alt="Facebook"
              width={20}
              height={20}
            />
            <span className="text-[#828282]">Facebook</span>
          </button>
          <button
            variant="outline"
            type="button"
            className="w-[148px] flex items-center gap-2 border rounded-md px-4 py-2"
          >
            <Image
              src="/image copy 2.png"
              alt="Google"
              width={20}
              height={20}
            />
            <span className="text-[#828282]">Google</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
