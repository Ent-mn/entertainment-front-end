
import Image from "next/image";
import {
  ThumbsUp,
  ThumbsDown,
  Heart,
  MessageCircle,
  Facebook,
  Instagram,
  Share2,
  Calendar,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";


export function AboutUs() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);

  // Sample image data - 6 images for the slider
  const images = [
    {
      id: 1,
      src: "uul.jpg",
      alt: "Elegant dining hall with fairy lights ceiling",
      title: "Lorem Ipsum is simply dummy text of the printing and",
      date: "20.03.2025",
    },
    {
      id: 2,
      src: "5cover1.jpg",
      alt: "Couple at elegant bar counter",
      title: "Lorem Ipsum is simply dummy text of the printing and",
      date: "20.03.2025",
    },
    {
      id: 3,
      src: "uul.jpg",
      alt: "Restaurant with chandeliers and city view",
      title: "Lorem Ipsum is simply dummy text of the printing and",
      date: "20.03.2025",
    },
    {
      id: 4,
      src: "5cover1.jpg",
      alt: "Outdoor dining area with greenery",
      title: "Lorem Ipsum is simply dummy text of the printing and",
      date: "20.03.2025",
    },
    {
      id: 5,
      src: "uul.jpg",
      alt: "Waterfront dining with sunset view",
      title: "Lorem Ipsum is simply dummy text of the printing and",
      date: "20.03.2025",
    },
    {
      id: 6,
      src: "5cover1.jpg",
      alt: "Private dining room with elegant decor",
      title: "Lorem Ipsum is simply dummy text of the printing and",
      date: "20.03.2025",
    },
  ];

  // Function to scroll left
  const scrollLeft = () => {
    if (sliderRef.current) {
      const containerWidth = sliderRef.current.clientWidth;
      const itemWidth = sliderRef.current.scrollWidth / images.length;
      const newPosition = scrollPosition - itemWidth;

      // If at the beginning, loop to the end
      if (newPosition < 0) {
        const maxScroll = sliderRef.current.scrollWidth - containerWidth;
        setScrollPosition(maxScroll);
        sliderRef.current.scrollTo({ left: maxScroll, behavior: "smooth" });
      } else {
        setScrollPosition(newPosition);
        sliderRef.current.scrollTo({ left: newPosition, behavior: "smooth" });
      }
    }
  };

  // Function to scroll right
  const scrollRight = () => {
    if (sliderRef.current) {
      const containerWidth = sliderRef.current.clientWidth;
      const itemWidth = sliderRef.current.scrollWidth / images.length;
      const newPosition = scrollPosition + itemWidth;
      const maxScroll = sliderRef.current.scrollWidth - containerWidth;

      // If at the end, loop to the beginning
      if (newPosition > maxScroll) {
        setScrollPosition(0);
        sliderRef.current.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        setScrollPosition(newPosition);
        sliderRef.current.scrollTo({ left: newPosition, behavior: "smooth" });
      }
    }
  };

  // Auto-scroll every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      scrollRight();
    }, 5000);

    return () => clearInterval(interval);
  }, [scrollPosition]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex mx-[204px] gap-6 mt-[105px]">
        <div className="flex flex-col justify-between w-[1000px] h-[691px]">
          <div className="flex flex-col gap-4">
            <div className="font-semibold text-xl">
              Bourique Bond - Restaurant
            </div>
            <div className="h-[1px] w-[20%] bg-[#F5BE32]"></div>
            <div className="text-[#9A9A9A]">
              Күэ за тэгээд ийм сайхан хотын төвд, ийм сайхан зуны гадаа ийм
              сайхан вино уугаад суух Күэ за тэгээд ийм сайхан хотын төвд, ийм
              сайхан зуны гадаа ийм сайхан вино уугаад суух Күэ за тэгээд ийм
              сайхан хотын төвд, ийм сайхан зуны гадаа ийм сайхан вино уугаад
              суух Күэ за тэгээд ийм сайхан хотын төвд, ийм сайхан зуны гадаа
              ийм сайхан вино уугаад суух Күэ за тэгээд ийм сайхан хотын төвд,
              ийм сайхан зуны гадаа ийм сайхан вино уугаад суух Күэ за тэгээд
              ийм сайхан хотын төвд, ийм сайхан зуны гадаа ийм сайхан вино
              уугаад суух Күэ за тэгээд ийм сайхан хотын төвд, ийм сайхан зуны
              гадаа ийм сайхан вино уугаад суух Күэ за тэгээд ийм сайхан хотын
              төвд, ийм сайхан зуны гадаа ийм сайхан вино уугаад суух Күэ за
              тэгээд ийм сайхан хотын төвд, ийм сайхан зуны гадаа ийм сайхан
              вино уугаад суух Күэ за тэгээд ийм сайхан хотын төвд, ийм сайхан
              зуны гадаа ийм сайхан вино уугаад суух Күэ за тэгээд ийм сайхан
              хотын төвд, ийм сайхан зуны гадаа ийм сайхан вино уугаад суух Күэ
              за тэгээд ийм сайхан хотын төвд, ийм сайхан зуны гадаа ийм сайхан
              вино уу гаад суух Күэ за тэгээд ийм сайхан хотын төвд, ийм сайхан
              зуны гадаа ийм сайхан вино уугаад суух Күэ за тэгээд ийм сайхан
              хотын төвд, ийм
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="font-semibold text-xl">
              Bourique Bond - Restaurant
            </div>
            <div className="h-[1px] w-[20%] bg-[#F5BE32]"></div>
            <div className="text-[#9A9A9A]">
              Күэ за тэгээд ийм сайхан хотын төвд, ийм сайхан зуны гадаа ийм
              сайхан вино уугаад суух Күэ за тэгээд ийм сайхан хотын төвд, ийм
              сайхан зуны гадаа ийм сайхан вино уугаад суух Күэ за тэгээд ийм
              сайхан хотын төвд, ийм сайхан зуны гадаа ийм сайхан вино уугаад
              суух Күэ за тэгээд ийм сайхан хотын төвд, ийм сайхан зуны гадаа
              ийм сайхан вино уугаад суух Күэ за тэгээд ийм сайхан хотын төвд,
              ийм сайхан зуны гадаа ийм сайхан вино уугаад суух Күэ за тэгээд
              ийм сайхан хотын төвд, ийм сайхан зуны гадаа ийм сайхан вино
              уугаад суух Күэ за тэгээд ийм сайхан хотын төвд, ийм сайхан зуны
              гадаа ийм сайхан вино уугаад суух Күэ за тэгээд ийм сайхан хотын
              төвд, ийм сайхан зуны гадаа ийм сайхан вино уугаад суух Күэ за
              тэгээд ийм сайхан хотын төвд, ийм сайхан зуны гадаа ийм сайхан
              вино уугаад суух Күэ за тэгээд ийм сайхан хотын төвд, ийм сайхан
              зуны гадаа ийм сайхан вино уугаад суух Күэ за тэгээд ийм сайхан
              хотын төвд, ийм сайхан зуны гадаа ийм сайхан вино уугаад суух Күэ
              за тэгээд ийм сайхан хотын төвд, ийм сайхан зуны гадаа ийм сайхан
              вино уу гаад суух Күэ за тэгээд ийм сайхан хотын төвд, ийм сайхан
              зуны гадаа ийм сайхан вино уугаад суух Күэ за тэгээд ийм сайхан
              хотын төвд, ийм
            </div>
          </div>
        </div>
        <div className="flex w-[488px] flex-col gap-4">
          <div className="gap-4 flex flex-col">
            <div className="font-semibold text-xl">
              Bourique Bond - Restaurant
            </div>
            <div className="h-[1px] w-[50%] bg-[#F5BE32]"></div>
            <div className="text-[#9a9a9a]">
              Күэ за тэгээд ийм сайхан хотын төвд, ийм сайхан зуны гадаа ийм
              сайхан вино уугаад суух see more...
            </div>
            <div className="flex items-center gap-2">
              <Calendar size={24} />
              <span>2025.10.05 21:30 </span>
            </div>
          </div>
          <div className="relative h-[510px] w-[488px]">
            <Image
              src={"/detail/aboutus/1.svg"}
              alt="aboutus"
              fill
              className="object-cover rounded-2xl"
            />
          </div>
          <div className="flex items-center text-[#9a9a9a] justify-between w-full">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <ThumbsUp size={24} />
                <span>23</span>
              </div>
              <div className="flex items-center gap-2">
                <ThumbsDown size={24} />
                <span>23</span>
              </div>
              <div className="flex items-center gap-2">
                <Heart size={24} />
                <span>23</span>
              </div>
              <div className="flex items-center gap-2">
                <MessageCircle size={24} />
                <span>23</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Facebook size={24} />
              <Instagram size={24} />
              <Share2 size={24} />
            </div>
          </div>
        </div>
      </div>
      <div className="mx-[204px] py-16">
        {/* Header */}
        <h2 className="text-2xl md:text-3xl font-bold mb-8">Gallery</h2>

        {/* Image Slider */}
        <div className="relative">
          <div
            ref={sliderRef}
            className="flex overflow-x-auto gap-4 pb-4 hide-scrollbar snap-x snap-mandatory"
            style={{ scrollBehavior: "smooth" }}
          >
            {images.map((image) => (
              <div
                key={image.id}
                className="min-w-[280px] md:min-w-[320px] snap-start"
              >
                <div className="aspect-[4/3] relative rounded-md overflow-hidden mb-3">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 hover:scale-105"
                    style={{
                      backgroundImage: `url(${image.src})`,
                      backgroundPosition: `${(image.id % 5) * 25}% center`,
                    }}
                  />
                </div>
                <h3 className="font-medium text-sm md:text-base line-clamp-2">
                  {image.title}
                </h3>
                <p className="text-gray-400 text-sm mt-1">{image.date}</p>
              </div>
            ))}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-start mt-6 gap-4">
            <button
              onClick={scrollLeft}
              className="w-10 h-10 rounded-full border border-gray-600 flex items-center justify-center hover:bg-gray-800 transition-colors"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={scrollRight}
              className="w-10 h-10 rounded-full border border-gray-600 flex items-center justify-center hover:bg-gray-800 transition-colors"
              aria-label="Next slide"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Custom CSS for hiding scrollbar */}
      <style jsx global>{`
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}
