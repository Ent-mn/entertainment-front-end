import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function DetailHome1() {
  return (
    <main className="min-h-screen dark:bg-[#121212] bg-[#F3F3F3] text-[#121212] dark:text-white px-52 py-28">
      {/* Header */}
      <div className=" pt-16 pb-8">
        <div className="flex flex-col items-center mb-12">
          <h2 className="text-2xl md:text-3xl font-medium mb-6 relative  flex flex-col gap-2 justify-center items-center">
            <img src="/detail/image copy 3.png" alt="" className="h-7" />
            <span className="relative z-10 px-4 bg-[#121212] text-[#FEFEFE]">
              Lorem Ipsum is simply dummy
            </span>
          </h2>
        </div>
      </div>

      <div className="container mx-auto mb-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* First Image */}

          <div className="relative rounded-lg overflow-hidden">
            <div className="relative h-60 w-[360px]">
              <Image
                src="/image copy 6.png"
                alt="Restaurant interior"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Second Image */}
          <div className="relative rounded-lg overflow-hidden">
            <div className="relative h-60 w-[360px]">
              <Image
                src="/image copy 6.png"
                alt="Restaurant interior"
                fill
                className="object-cover"
              />
            </div>
          </div>
          <div className="relative rounded-lg overflow-hidden">
            <div className="relative h-60 w-[360px]">
              <Image
                src="/image copy 6.png"
                alt="Restaurant interior"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Third Image with Text */}
          <div className="relative rounded-lg overflow-hidden">
            {/* <div className="relative h-64 w-full">
              <Image
                src="/image copy 6.png"
                alt="Restaurant food"
                fill
                className="object-cover"
              />
            </div> */}
            <div className="absolute pl-6 text-left">
              <h3 className="text-lg font-medium text-white">TITLE IS HERE</h3>
              <p className="text-sm text-gray-300 mb-2">Description is here</p>
              {/* <span className="border-t-2 border-[#F5BE32] bg-[#F5BE32]"></span> */}
              <span className="block w-[118px] border-t mb-4 mt-4 border-[#F5BE32] bg-[#F5BE32]"></span>

              <p className="text-xs text-gray-400 max-w-[300px]">
                Тэгээд одоо яахав дээ гоё юм чинь үнэтэй шдээ. Үнэтэй юманд
                дуртай лаг юманд дуртай л биз дээ.
              </p>
              <Button
                variant="link"
                className="text-amber-500 p-0 hover:text-amber-400">
                Дэлгэрэнгүй
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Middle Section - Text Left, Image Right */}
      <div className=" mb-16">
        <div className="flex gap-16">
          {/* Text Section */}
          <div className=" text-left">
            <h3 className="text-lg font-medium text-white">TITLE IS HERE</h3>
            <p className="text-sm text-gray-300 mb-2">Description is here</p>
            {/* <span className="border-t-2 border-[#F5BE32] bg-[#F5BE32]"></span> */}
            <span className="block w-[118px] border-t mb-4 mt-4 border-[#F5BE32] bg-[#F5BE32]"></span>

            <p className="text-xs text-gray-400 max-w-[348px]">
              Тэгээд одоо яахав дээ гоё юм чинь үнэтэй шдээ. Үнэтэй юманд дуртай
              лаг юманд дуртай л биз дээ.
            </p>
            <Button
              variant="link"
              className="text-amber-500 p-0 hover:text-amber-400">
              Дэлгэрэнгүй
            </Button>
          </div>

          {/* Large Image */}
          <div className="relative rounded-lg overflow-hidden ">
            <div className="relative h-[250px] w-[700px]">
              <Image
                src="/image copy 6.png"
                alt="Restaurant interior"
                fill
                className="object-cover"
              />
            </div>
          </div>
          {/* <div className=" w-[300px] h-[530px] fixed inset-0 z-20 left-3/4 bg-red-900">
            <div className="relative h-[530px] rounded-lg overflow-hidden">
              <Image
                src="/image copy 6.png"
                alt="Food presentation"
                fill
                className="object-cover"
              />
              <div className="absolute bottom-0 right-0 p-6">
                <Button
                  variant="link"
                  className="text-amber-500 p-0 hover:text-amber-400">
                  Дэлгэрэнгүй
                </Button>
              </div>
            </div>
          </div> */}
        </div>
      </div>

      <div className=" ">
        <div className="flex justify-between">
          <div className="relative rounded-lg overflow-hidden ">
            <div className="relative h-[250px] w-[700px]">
              <Image
                src="/image copy 10.png"
                alt="Restaurant interior"
                fill
                className="object-cover"
              />
            </div>
          </div>
          <div className="relative rounded-lg overflow-hidden ">
            <div className="relative h-[250px] w-[800px]">
              <Image
                src="/image copy 9.png"
                alt="Restaurant interior"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
