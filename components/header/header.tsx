"use client";
import Link from "next/link";
import Input from "../Input";
import SiteHeader from "./SiteHeader";
import { useRouter } from "next/navigation";

export const Header = () => {
  const router = useRouter();
  return (
    <div className="w-screen flex flex-col">
      <header className="flex items-center justify-between px-6 py-3 bg-white border-b border-gray-200">
        <div className="flex items-center gap-2">
          <div className="bg-[#fb752b] rounded p-1"></div>
          <span className="text-lg font-semibold">Entertainment.mn</span>
        </div>

        <div className="flex-1 max-w-xl mx-12">
          <div className="relative">
            <Input iconLeft={"magnifier.png"} />
          </div>
        </div>

        <div className="flex items-center gap-6">
          {!window.localStorage.user ? (
            <Link href={"/login"}>
              <div className="cursor-pointer">Login</div>
            </Link>
          ) : (
            <div
              className="flex items-center gap-3 cursor-pointer"
              onClick={() => {
                router.push("/profile");
              }}
            >
              <img src="bold.png" alt="" className="w-10 h-10 rounded-2xl" />
              <div>
                <p className="font-semibold text-sm">Bold</p>
                <p className="text-xs text-gray-500">Admin</p>
              </div>
            </div>
          )}
        </div>
      </header>
      <div className="bg-gradient-to-r from-[#FF7324] via-[#FF4E93] to-[#B84EFF] py-4">
        <div className="container mx-auto px-4">
          <p className="text-white text-center">
            Хуримын урьдчилсан захиалга 20% off. Дэлгэрэнгүй.
          </p>
        </div>
      </div>
      <SiteHeader />
    </div>
  );
};
