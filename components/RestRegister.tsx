"use client";

import Image from "next/image";
import Link from "next/link";
import { Eye } from "lucide-react";

const RestRegister = () => {
  return (
    <div>
      <div className="flex w-[1059px] rounded-3xl h-[696px] px-12 py-[45px] bg-[#eaeaea]">
        {/* Left Panel */}
        <div className="hidden md:flex md:w-1/2 bg-[#ffa726] flex-col items-center justify-between p-12 text-white">
          <div className="text-center max-w-md">
            <h1 className="text-3xl font-bold mb-2">
              Бүх төрлийн төхөөрөмжөөс хялбар ашиглах боломжтой
            </h1>
            <p className="text-sm">fully responsibilty</p>
          </div>

          <div className="w-full max-w-md my-8">
            <Image
              src="/placeholder.svg?height=300&width=400"
              alt="Responsive website showcase"
              width={400}
              height={300}
              className="rounded-lg shadow-lg w-full"
            />
          </div>

          <div className="flex flex-col items-center">
            <div className="bg-white p-2 rounded-md mb-2">
              <Image
                src="/placeholder.svg?height=100&width=100"
                alt="QR Code"
                width={100}
                height={100}
              />
            </div>
            <div className="flex items-center">
              <svg
                viewBox="0 0 24 24"
                width="24"
                height="24"
                className="transform -rotate-45"
              >
                <path
                  d="M7,2L17,12L7,22"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="font-bold italic ml-1">SCAN ME</span>
            </div>
          </div>
        </div>

        {/* Right Panel */}
        <div className="w-full md:w-1/2 flex flex-col py-[26px] items-center justify-center p-8">
          <div className="w-full max-w-md">
            <h2 className="text-3xl font-bold mb-2 text-[#000000]">
              Бүртгүүлэх
            </h2>
            <p className="text-[#9a9a9a] mb-8">
              Already have an account?{" "}
              <Link href="#" className="text-[#000000] underline">
                Log in
              </Link>
            </p>

            <form className=" flex flex-col gap-1.5">
              <div>
                <label htmlFor="email" className="block text-[#5c5c5c] mb-2">
                  E-mail or phone number
                </label>
                <input
                  type="text"
                  id="email"
                  placeholder="E-mail or phone number"
                  className="w-full p-3 border border-[#e3e3e3] rounded-lg bg-[#ffffff]"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-[#5c5c5c] mb-2">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  placeholder="Password"
                  className="w-full p-3 border border-[#e3e3e3] rounded-lg bg-[#ffffff]"
                />
              </div>

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-[#5c5c5c] mb-2"
                >
                  re-password
                </label>
                <div className="relative">
                  <input
                    type="password"
                    id="confirmPassword"
                    placeholder="Password"
                    className="w-full p-3 border border-[#e3e3e3] rounded-lg bg-[#ffffff]"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#828282]"
                  >
                    <Eye size={20} />
                  </button>
                </div>
              </div>

              <div className="flex items-start">
                <input
                  type="checkbox"
                  id="terms"
                  className="mt-1 border-[#cdcdcd] rounded"
                />
                <label htmlFor="terms" className="ml-2 text-[#656565]">
                  I agree to the
                </label>
              </div>

              <button
                type="submit"
                className="w-full p-3 rounded-lg font-medium text-white bg-gradient-to-r from-[#ffc107] to-[#ffa726]"
              >
                Create account
              </button>

              <div className="relative flex items-center justify-center my-4">
                <div className="border-t border-[#e0e0e0] absolute w-full"></div>
                <span className="bg-[#eaeaea] px-4 relative text-[#878787]">
                  Or register with
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  className="flex items-center justify-center gap-2 p-3 border border-[#e0e0e0] rounded-lg bg-white"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="#1577f2"
                  >
                    <path d="M12 2.04C6.5 2.04 2 6.53 2 12.06C2 17.06 5.66 21.21 10.44 21.96V14.96H7.9V12.06H10.44V9.85C10.44 7.34 11.93 5.96 14.22 5.96C15.31 5.96 16.45 6.15 16.45 6.15V8.62H15.19C13.95 8.62 13.56 9.39 13.56 10.18V12.06H16.34L15.89 14.96H13.56V21.96C18.34 21.21 22 17.06 22 12.06C22 6.53 17.5 2.04 12 2.04Z" />
                  </svg>
                  <span className="text-[#8c8c8c]">Sign in with Facebook</span>
                </button>
                <button
                  type="button"
                  className="flex items-center justify-center gap-2 p-3 border border-[#e0e0e0] rounded-lg bg-white"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"
                      fill="#4285F4"
                    />
                    <path
                      d="M7.545,9.909v3.4h5.689c-0.732,2.236-2.484,3.382-5.689,3.382c-3.326,0-6.033-2.58-6.033-5.906c0-3.326,2.707-5.906,6.033-5.906c1.582,0,3.062,0.572,4.213,1.622l2.388-2.333C12.004,2.404,9.881,1.545,7.545,1.545C3.019,1.545,0,4.637,0,9.909c0,5.272,3.019,8.364,7.545,8.364c4.35,0,7.455-3.044,7.455-7.636c0-0.568-0.049-1.118-0.146-1.637H7.545z"
                      fill="#EA4335"
                    />
                    <path
                      d="M7.545,9.909v3.4h5.689c-0.732,2.236-2.484,3.382-5.689,3.382c-3.326,0-6.033-2.58-6.033-5.906c0-3.326,2.707-5.906,6.033-5.906c1.582,0,3.062,0.572,4.213,1.622l2.388-2.333C12.004,2.404,9.881,1.545,7.545,1.545C3.019,1.545,0,4.637,0,9.909c0,5.272,3.019,8.364,7.545,8.364c4.35,0,7.455-3.044,7.455-7.636c0-0.568-0.049-1.118-0.146-1.637H7.545z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M7.545,9.909v3.4h5.689c-0.732,2.236-2.484,3.382-5.689,3.382c-3.326,0-6.033-2.58-6.033-5.906c0-3.326,2.707-5.906,6.033-5.906c1.582,0,3.062,0.572,4.213,1.622l2.388-2.333C12.004,2.404,9.881,1.545,7.545,1.545C3.019,1.545,0,4.637,0,9.909c0,5.272,3.019,8.364,7.545,8.364c4.35,0,7.455-3.044,7.455-7.636c0-0.568-0.049-1.118-0.146-1.637H7.545z"
                      fill="#34A853"
                    />
                  </svg>
                  <span className="text-[#8c8c8c]">Sign in with Google</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default RestRegister;
