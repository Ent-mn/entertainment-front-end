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
} from "lucide-react";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";
import { CapacitySearchModal } from "./capacity-search-modal";
import { LayoutDetailsModal } from "./layout-details-modal";
import Image from "next/image";
import { divIcon } from "leaflet";

export function LayoutMap() {
  const [showCapacityModal, setShowCapacityModal] = useState(false);
  const [selectedLayout, setSelectedLayout] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [gridColumns, setGridColumns] = useState(4);

  const handleCapacitySearch = (capacity: number) => {
    setSearchQuery(capacity.toString());
    setShowCapacityModal(false);
  };

  const layouts = [
    {
      image: "/detail/map/1.svg",
      description: "Хуримын чимэглэлтэй зураг",
      title: "Grand Ballroom",
      capacity: "150",
      duration: "Толгой ширээ  1-100 хүн",
      price: "LED дэлгэц 10x5",
      service: "300 хүртэлх хүнд JBL brand",
      details: {
        tables: 25,
        chairs: 150,
        area: "500 sq.m",
        features: [
          "High ceiling with crystal chandeliers",
          "Stage area with professional lighting",
          "Premium sound system",
          "LED wall display",
          "Dance floor",
        ],
        amenities: [
          "Private bridal suite",
          "Catering kitchen",
          "VIP entrance",
          "Coat check",
          "Valet parking",
        ],
        images: [
          "/detail/map/grand-1.jpg",
          "/detail/map/grand-2.jpg",
          "/detail/map/grand-3.jpg",
        ],
      },
    },
    {
      image: "/detail/map/1.svg",
      description: "Хуримын чимэглэлтэй зураг",

      title: "Garden Terrace",
      capacity: "50",
      duration: "Толгой ширээ  80-100 хүн",
      price: "LED дэлгэц 10x2",
      service: "300 хүртэлх хүнд JBL brand",
      details: {
        tables: 10,
        chairs: 50,
        area: "200 sq.m",
        features: [
          "Outdoor covered space",
          "Garden views",
          "Natural lighting",
          "Bistro lighting",
          "Water features",
        ],
        amenities: [
          "Weather protection",
          "Outdoor heaters",
          "Built-in bar",
          "Private restrooms",
          "Garden access",
        ],
        images: [
          "/detail/map/garden-1.jpg",
          "/detail/map/garden-2.jpg",
          "/detail/map/garden-3.jpg",
        ],
      },
    },
    {
      image: "/detail/map/1.svg",
      description: "Хуримын чимэглэлтэй зураг",

      title: "Executive Lounge",
      capacity: "20",
      duration: "Толгой ширээ  5-40 хүн",
      price: "LED дэлгэц 40x4",
      service: "300 хүртэлх хүнд JBL brand",
      details: {
        tables: 5,
        chairs: 20,
        area: "100 sq.m",
        features: [
          "Intimate setting",
          "Business facilities",
          "Private bar",
          "Multimedia setup",
          "City views",
        ],
        amenities: [
          "Private butler service",
          "Premium bar package",
          "High-speed internet",
          "Video conferencing",
          "Executive catering",
        ],
        images: [
          "/detail/map/exec-1.jpg",
          "/detail/map/exec-2.jpg",
          "/detail/map/exec-3.jpg",
        ],
      },
    },
    {
      image: "/detail/map/1.svg",
      description: "Хуримын чимэглэлтэй зураг",

      title: "Celebration Hall",
      capacity: "30",
      duration: "Толгой ширээ  3-60 хүн",
      price: "LED дэлгэц 20x5",
      service: "300 хүртэлх хүнд JBL brand",
      details: {
        tables: 8,
        chairs: 30,
        area: "150 sq.m",
        features: [
          "Modern design",
          "Flexible space",
          "Built-in AV system",
          "Adjustable lighting",
          "Private entrance",
        ],
        amenities: [
          "Dedicated event coordinator",
          "Custom menu options",
          "Setup and cleanup",
          "Decoration services",
          "Photography area",
        ],
        images: [
          "/detail/map/celeb-1.jpg",
          "/detail/map/celeb-2.jpg",
          "/detail/map/celeb-3.jpg",
        ],
      },
    },
  ];

  return (
    <div className="space-y-6">
      <div className="relative">
        <div className="relative h-[270px] mx-[110px] rounded-2xl">
          <Image
            src="/static/1.avif"
            alt="Mountain landscape"
            fill
            priority
            className="object-cover rounded-2xl"
          />
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm rounded-2xl"></div>
          <div className="absolute inset-x-0 bottom-0 h-full bg-gradient-to-t from-black/10 to-transparent rounded-2xl"></div>
        </div>
        <div className="absolute left-1/2 -translate-x-1/2 w-[90%] top-[220px]">
          <div className="max-w-6xl mx-auto bg-gray-200/10 backdrop-blur-4xl rounded-[24px] p-8 shadow-lg border border-white/10">
            <div className="flex items-center justify-between">
              <div className="flex cursor-pointer items-center gap-2">
                <Dialog
                  open={showCapacityModal}
                  onOpenChange={setShowCapacityModal}
                >
                  <DialogTrigger asChild>
                    <div className="flex items-center gap-2 cursor-pointer">
                      <Users className="w-5 h-5 text-gray-400" />
                      <div className="flex flex-col">
                        <span className="text-white">Ballroom</span>
                        <span className="text-xs text-gray-400">
                          Зочдын тоо
                        </span>
                      </div>
                    </div>
                  </DialogTrigger>
                  <CapacitySearchModal onSearch={handleCapacitySearch} />
                </Dialog>
              </div>
              <div className="h-6 w-[1px] bg-gray-600"></div>
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-gray-400" />
                <div className="flex flex-col">
                  <span className="text-white">Ширээний байгуулалт</span>
                  <span className="text-xs text-gray-400">
                    Зурдаг төрлөө сонгоно уу
                  </span>
                </div>
              </div>
              <div className="h-6 w-[1px] bg-gray-600"></div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-gray-400" />
                <div className="flex flex-col">
                  <span className="text-white">150</span>
                  <span className="text-xs text-gray-400">
                    Зочдын тоогоо оруулна уу
                  </span>
                </div>
              </div>
              <div className="h-6 w-[1px] bg-gray-600"></div>
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-gray-400" />
                <div className="flex flex-col">
                  <span className="text-white">Хурим</span>
                  <span className="text-xs text-gray-400">
                    Захиалгын төрлөө сонгоно уу
                  </span>
                </div>
              </div>
              <div className="h-6 w-[1px] bg-gray-600"></div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-gray-400" />
                <div className="flex flex-col">
                  <span className="text-white">Ягаан чимэглэл</span>
                  <span className="text-xs text-gray-400">
                    Чимэглэлийн төрлөө сонгоно уу
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center gap-4 mx-[110px] mt-[90px]">
          <h2 className="text-4xl font-['Great_Vibes'] text-[#F5BE32]">
            Pictures
          </h2>
          <div className="h-[1px] w-full bg-[#939393]"></div>
        </div>

        <div className="mx-[110px] mt-4">
          <div className="flex justify-end gap-2 mb-4">
            <button
              className={`p-2 rounded-lg transition-colors ${
                gridColumns === 3
                  ? "bg-[#F5BE32] text-black"
                  : "bg-gray-800 text-gray-400"
              }`}
              onClick={() => setGridColumns(3)}
            >
              <Grid3X3 className="w-5 h-5" />
            </button>
            <button
              className={`p-2 rounded-lg transition-colors ${
                gridColumns === 4
                  ? "bg-[#F5BE32] text-black"
                  : "bg-gray-800 text-gray-400"
              }`}
              onClick={() => setGridColumns(4)}
            >
              <Grid2X2 className="w-5 h-5" />
            </button>
          </div>
          <div
            className={`grid grid-cols-2 ${
              gridColumns === 3 ? "md:grid-cols-3" : "md:grid-cols-4"
            } gap-4`}
          >
            {layouts.map((layout, index) => (
              <div
                key={index}
                className="rounded-2xl overflow-hidden border border-white/5 cursor-pointer"
                onClick={() => setSelectedLayout(index)}
              >
                <div className="relative h-[300px] group">
                  <Image
                    src={layout.image}
                    alt={layout.title}
                    fill
                    className="object-cover rounded-2xl"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/20 to-transparent rounded-2xl"></div>
                  <div className="absolute bottom-4 left-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="p-2 bg-gray-800/50 backdrop-blur-sm  rounded-full cursor-pointer hover:bg-gray-700/50">
                      <Eye className="w-4 h-4 text-white" />
                    </div>
                    <div className="p-2 bg-gray-800/50 backdrop-blur-sm rounded-full cursor-pointer hover:bg-gray-700/50">
                      <Heart className="w-4 h-4 text-white" />
                    </div>
                    <div className="p-2 bg-gray-800/50 backdrop-blur-sm rounded-full cursor-pointer hover:bg-gray-700/50">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                  </div>
                </div>
                <div className="py-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-white font-['Playfair_Display']">
                      {layout.title}
                    </h3>
                  </div>
                  <p className="text-sm pb-2 text-gray-400">
                    {layout.description}
                  </p>
                  <div className="h-[1px] w-[50%] bg-[#F5BE32]"></div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-gray-400" />
                    <p className="text-sm text-gray-400">{layout.capacity}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Table2 className="w-4 h-4 text-gray-400" />
                    <p className="text-sm text-gray-400">{layout.duration}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <MonitorPlay className="w-4 h-4 text-gray-400" />
                    <p className="text-sm text-gray-400">{layout.price}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Speaker className="w-4 h-4 text-gray-400" />
                    <p className="text-sm text-gray-400">{layout.service}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {selectedLayout !== null && (
        <LayoutDetailsModal
          isOpen={selectedLayout !== null}
          onClose={() => setSelectedLayout(null)}
          layout={layouts[selectedLayout]}
        />
      )}
    </div>
  );
}
