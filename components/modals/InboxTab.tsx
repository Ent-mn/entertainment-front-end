"use client";

import { useState } from "react";
import Image from "next/image";
import { Binary, Clock, Delete, Trash } from "lucide-react";

interface InboxTabProps {
  onClose: () => void;
}

interface Message {
  id: number;
  sender: string;
  avatar: string;
  content: string;
  timestamp: string;
  status: "needs_attention" | "needs_reply" | "completed";
}

export function InboxTab({ onClose }: InboxTabProps) {
  const [selectedTab, setSelectedTab] = useState<"all" | "unread">("all");

  // Sample messages - replace with actual data
  const messages: Message[] = [
    {
      id: 1,
      sender: "Shangri-La Ulaanbaatar",
      avatar: "/bold.png",
      content: "Та Timeline - аа тохирно уу,",
      timestamp: "1h 35min ago",
      status: "needs_attention",
    },
    {
      id: 2,
      sender: "Shangri-La Ulaanbaatar",
      avatar: "/bold.png",
      content: "Таны захиалгыг амжилттай баталгаажууллаа.",
      timestamp: "1h 35min ago",
      status: "needs_reply",
    },
    {
      id: 3,
      sender: "restaurant.mn",
      avatar: "/Logo.svg",
      content:
        "Та гэрээний дагуу Event болохоос 5 хоногийн өмнө төлбөрийн үлдэгдэл дүүсгэнэ үү!",
      timestamp: "1h 35min ago",
      status: "completed",
    },
  ];

  const getStatusButton = (status: Message["status"]) => {
    switch (status) {
      case "needs_attention":
        return (
          <button className=" py-1.5 w-[200px] text-sm font-medium text-white rounded-xl bg-[#FE7C1E]">
            Needs attention!
          </button>
        );
      case "needs_reply":
        return (
          <button className="py-1.5 text-sm w-[200px] font-medium text-white rounded-xl bg-[#F5BE32]">
            Needs reply!
          </button>
        );
      case "completed":
        return (
          <button className=" py-1.5 text-sm w-[200px] font-medium text-white rounded-xl bg-[#6B7280]">
            Completed
          </button>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col w-full h-full p-8">
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setSelectedTab("all")}
          className={`px-6 py-2 rounded-lg text-base font-medium ${
            selectedTab === "all" ? "bg-amber-500 text-white" : "text-gray-400"
          }`}
        >
          All Messages
        </button>
        <button
          onClick={() => setSelectedTab("unread")}
          className={`px-6 py-2 rounded-lg text-base font-medium ${
            selectedTab === "unread"
              ? "bg-amber-500 text-white"
              : "text-gray-400"
          }`}
        >
          Unread
        </button>
      </div>

      <div className="flex flex-col gap-[59px]">
        {messages
          .filter((message) =>
            selectedTab === "all" ? true : message.status !== "completed"
          )
          .map((message) => (
            <div
              key={message.id}
              className="bg-[#1A1A1A] border-[1px] border-[#2C2C2C] rounded-xl p-4 relative"
            >
              <div className="absolute top-16 right-6">
                {getStatusButton(message.status)}
              </div>
              <div className="flex justify-between">
                <div className="flex items-center gap-4">
                  <Image
                    src={message.avatar}
                    alt={message.sender}
                    width={38}
                    height={38}
                    className="rounded-full h-[38px] w-[38px]"
                  />
                  <div className="flex items-center gap-4">
                    <h3 className="text-white font-medium text-base">
                      {message.sender}
                    </h3>
                    <p className="text-gray-400 mt-1 text-base">
                      {message.content}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                  <button className="bg-[#252525] p-2 rounded-xl">
                    <Trash className="w-4 h-4" />
                  </button>
                  <span className="text-sm">{message.timestamp}</span>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
