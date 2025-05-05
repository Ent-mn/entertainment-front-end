import {
  Users,
  Calendar,
  Clock,
  MapPin,
  MonitorPlay,
  Table2,
  Speaker,
  Eye,
  Heart,
  CheckCircle,
  LayoutGrid,
  Columns,
  Grid3X3,
  Grid2X2,
  LayoutPanelTop,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

interface LayoutDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  layout: {
    image: string;
    title: string;
    capacity: string;
    duration: string;
    price: string;
    service: string;
    details: {
      tables: number;
      chairs: number;
      area: string;
      features: string[];
      amenities: string[];
      images: string[];
    };
  };
}

export function LayoutDetailsModal({
  isOpen,
  onClose,
  layout,
}: LayoutDetailsModalProps) {
  const [selectedImage, setSelectedImage] = useState(layout.image);
  const demoImages = [
    "/detail/map/1.svg",
    "/cover2.png",
    "/eng.png",
    "/5cover1.jpg",
    "/4.jpg",
    "/5cover.jpg",
  ];

  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscapeKey);
    }

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center">
      <div className="flex md:px-[68px] w-full justify-between items-center">
        <div className="text-4xl flex items-center gap-4 font-extrabold z-10">
          <LayoutPanelTop className="w-11 h-11 text-[#f5be32]" />
          Layout map Detail
          <p className="text-[#f5be32]">.</p>
        </div>
        <button
          onClick={onClose}
          className=" z-10 relative w-10 h-10 flex items-center justify-center hover:opacity-80 transition-opacity"
        >
          <div className="absolute inset-0 border-2 border-[#F5BE32] rounded-full"></div>
          <svg
            className="w-5 h-5 text-[#F5BE32] absolute"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative w-[100vw] h-[90vh] bg-[#121212] rounded-lg shadow-xl overflow-hidden">
        {/* Header */}

        {/* Content */}
        <div
          className="p-6 overflow-y-auto"
          style={{ height: "calc(95vh - 120px)" }}
        >
          <div className="flex h-full mx-12 gap-4">
            <div className="text-white  w-1/5 p-4 border-2 flex overflow-y-auto flex-col justify-between border-[#ffffff]/20 rounded-xl">
              <div className="p-6 pt-4  text-center">
                <h2 className="text-xl font-['Great_Vibes'] text-[#F5BE32]">
                  Map
                </h2>
                <h2 className="text-xl text-white">DETAIL</h2>
                <div className="h-[1px] w-full bg-[#FFFFFF3B]/30 mt-2"></div>
              </div>
              <div>
                <h3 className="text-xl text-white font-['Playfair_Display'] mb-4">
                  {layout.title}
                </h3>
                <p className="text-gray-400 mb-2">Хуримын чимэглэлтэй зураг</p>
              </div>
              <div className="h-[1px] w-[50%] bg-[#F5BE32]"></div>

              <div className="flex  flex-col gap-2 my-4">
                <div className="flex  items-center gap-2">
                  <div className="w-6">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      className="w-5 h-5 text-gray-400"
                    >
                      <path
                        d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <span>{layout.capacity}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6">
                    <Table2 className="w-4 h-4 text-gray-400" />
                  </div>
                  <span>{layout.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6">
                    <MonitorPlay className="w-4 h-4 text-gray-400" />
                  </div>
                  <span>LED дэлгэц 10x6м</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6">
                    <Speaker className="w-4 h-4 text-gray-400" />
                  </div>
                  <span>Хөгжим 300 хүртэл хүн, JBL brand</span>
                </div>
                <div className="mt-8 flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <div className="w-6">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        className="w-5 h-5 text-gray-400"
                      >
                        <path
                          d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <span>Ширээ 160см Диаметртэй 12ш</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-6">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        className="w-5 h-5 text-gray-400"
                      >
                        <path
                          d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <span>Ширээ 140см Диаметртэй 3ш</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-6">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        className="w-5 h-5 text-gray-400"
                      >
                        <path
                          d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <span>Ширээ 140см Диаметртэй 3ш</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-6">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        className="w-5 h-5 text-gray-400"
                      >
                        <path
                          d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <span>Ширээ 140см Диаметртэй 3ш</span>
                  </div>
                </div>
                <div className="mt-8 flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <div className="w-6">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        className="w-5 h-5 text-gray-400"
                      >
                        <path
                          d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <span>Ширээ 160см Диаметртэй 12ш</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-6">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        className="w-5 h-5 text-gray-400"
                      >
                        <path
                          d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <span>Ширээ 140см Диаметртэй 3ш</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-6">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        className="w-5 h-5 text-gray-400"
                      >
                        <path
                          d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <span>Ширээ 140см Диаметртэй 3ш</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-6">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        className="w-5 h-5 text-gray-400"
                      >
                        <path
                          d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <span>Ширээ 140см Диаметртэй 3ш</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right side - Images */}
            <div className="relative w-4/5">
              {/* Main Image */}
              <div className="relative h-full rounded-lg overflow-hidden">
                <Image
                  src={selectedImage}
                  alt={layout.title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Thumbnail Images */}
              <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-4 p-2">
                <div className="flex gap-[21px] overflow-x-auto max-w-full px-4">
                  {demoImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(img)}
                      className={`relative w-[147px] h-[123px] shrink-0 rounded-[12px] transition-all ${
                        selectedImage === img
                          ? "ring-2 ring-[#F5BE32]"
                          : "opacity-70 hover:opacity-100"
                      }`}
                    >
                      <Image
                        src={img}
                        alt={`Thumbnail ${idx + 1}`}
                        fill
                        className="object-cover rounded-[12px]"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
