/** @format */

"use client";
import { PlayCircle } from "lucide-react";
import { useRef } from "react";
interface Album {
  id: string;
  title: string;
  year: string;
  type: string;
  imageUrl: string;
}
interface Event {
  id: string;
  title: string;
  imageUrl: string;
}
export default function EntertainmentPage() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const albums: Album[] = [
    {
      id: "1",
      title: "Өөрийн эвент үүсгэх заавар",
      year: "Та өөрийн эвентээ үүсгэх шаардлагатай бүх бүрдэл зүйлсийг захиалах боломжтой.",
      type: "Guide",
      imageUrl: "image copy 2.png",
    },
    {
      id: "2",
      title: "doo-wops & hooligans",
      year: "2019 Single album",
      type: "Album",
      imageUrl: "image copy 2.png",
    },
    {
      id: "3",
      title: "Silk Sonic",
      year: "2020 Album ft Anderson Paak",
      type: "Album",
      imageUrl: "image copy 2.png",
    },
    {
      id: "4",
      title: "Ymar ch nergui Shar",
      year: "2022 Album",
      type: "Album",
      imageUrl: "image copy 2.png",
    },
    {
      id: "5",
      title: "24k Magic",
      year: "2023 Album",
      type: "Album",
      imageUrl: "image copy 2.png",
    },
  ];
  const events: Event[] = [
    { id: "1", title: "Байгууллагын эвент", imageUrl: "image copy 2.png" },
    { id: "2", title: "Хувь хүний эвент", imageUrl: "image copy 2.png" },
    { id: "3", title: "Хүүхдийн эвент", imageUrl: "image copy 2.png" },
    { id: "4", title: "Анги, хамт олны эвент", imageUrl: "image copy 2.png" },
  ];
  return (
    <div className="min-h-screen bg-white pb-0 p-8">
      {" "}
      <section className="mb-12">
        {" "}
        <div className="flex justify-between items-center mb-6">
          {" "}
          <div></div>{" "}
          <div className="flex items-center ml-[190px] flex-col">
            {" "}
            <h2 className="text-2xl font-bold text-purple-900 mb-2">
              {" "}
              Видео заавар{" "}
            </h2>{" "}
            <p className="text-gray-600 text-sm">
              {" "}
              Та веб дээрээс хэрхэн өөрийн хүссэн зүйлийг хийх талаарх заавартай
              танилцаарай{" "}
            </p>{" "}
          </div>{" "}
          <button className="px-4 mr-20 flex py-2 border border-gray-200 rounded-lg text-sm">
            {" "}
            бүгдийг үзэх...{" "}
          </button>{" "}
        </div>{" "}
        <div
          ref={scrollRef}
          className="flex justify-between overflow-x-auto pb-6 -mx-2 px-20 scroll-smooth"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {""}
          {albums.map((album) => (
            <div
              key={album.id}
              className="flex-none w-[250px] group cursor-pointer"
            >
              {" "}
              <div className="relative aspect-square mb-3">
                {" "}
                <img
                  src={album.imageUrl || "/placeholder.svg"}
                  alt={album.title}
                  className="w-full h-full object-cover rounded-lg"
                />{" "}
                <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-30 transition-all rounded-lg flex items-center justify-center">
                  {" "}
                  <PlayCircle className="w-12 h-12 text-orange-400" />{" "}
                </div>{" "}
              </div>{" "}
              <h3 className="font-medium text-gray-900 mb-1">{album.title}</h3>{" "}
              <p className="text-sm text-gray-500">{album.year}</p>{" "}
            </div>
          ))}{" "}
        </div>{" "}
      </section>{" "}
      <section className="bg-gray-50 -mx-8 px-24 py-10">
        {" "}
        <div className="max-w-8xl mx-auto">
          {" "}
          <h2 className="text-2xl font-bold text-purple-900 text-center mb-2">
            {" "}
            Event үүсгэх{" "}
          </h2>{" "}
          <p className="text-center text-gray-600 mb-8">
            {" "}
            Эвентийн өрөнхий төрлөөс эвент үүсгэх{" "}
          </p>{" "}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
            {events.map((event) => (
              <div
                key={event.id}
                className="relative aspect-[7/8] group cursor-pointer overflow-hidden rounded-xl"
              >
                <img
                  src={event.imageUrl || "/placeholder.svg"}
                  alt={event.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/0 flex items-end">
                  <h3 className="text-white font-medium p-6">{event.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>{" "}
      </section>{" "}
    </div>
  );
}
