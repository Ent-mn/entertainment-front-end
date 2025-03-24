"use client";

import type React from "react";
import { useState, useRef, useEffect } from "react";
import { Headphones, Send } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

interface Message {
  role: string;
  content: string;
}

const renderFormattedText = (text: string) => {
  const sentences = text.split(/(?<=[.!?])\s+/).filter(Boolean);

  // Process each sentence for bold text
  const formattedSentences = sentences.map((sentence, index) => {
    const parts = sentence.split(/(\*\*[^*]+\*\*)/g);
    const renderedParts = parts.map((part, partIndex) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        const boldContent = part.slice(2, -2);
        return (
          <span key={partIndex} className="text-white font-bold">
            {boldContent}
          </span>
        );
      }
      return part;
    });
    return <div key={index}>{renderedParts}</div>; // Each sentence on a new line
  });

  return formattedSentences;
};

export default function ChatInput() {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState<Message[]>([]);
  const [isChatVisible, setIsChatVisible] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory]);

  const fetchResponse = async () => {
    if (!input) return;
    setLoading(true);
    setInput("");

    const newChatHistory = [...chatHistory, { role: "user", content: input }];
    setChatHistory(newChatHistory);

    try {
      const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization:
            "Bearer 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",
          "HTTP-Referer": "<YOUR_SITE_URL>",
          "X-Title": "<YOUR_SITE_NAME>",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-2.0-pro-exp-02-05:free",
          messages: [
            {
              role: "system",
              content: `
              You are a chatbot for Entertainment.mn system, an entertainment company based in Ulaanbaatar, Mongolia. Entertainment.mn is a leading provider of entertainment services, specializing in event management, media production, talent representation, and digital content creation. The company is dedicated to delivering high-quality entertainment experiences to individuals, businesses, and audiences across Mongolia, offering creative solutions, professional event planning, and engaging media content.

Entertainment.mn helps clients bring their entertainment ideas to life, whether through organizing concerts and cultural events, producing films and online videos, or managing artists and performers. With a strong focus on creativity and customer satisfaction, Entertainment.mn leverages innovative technology, industry expertise, and a passionate team to provide unforgettable entertainment experiences.

When responding to user inquiries, your focus should be on offering detailed, helpful, and relevant information about Entertainment.mn’s offerings, always in Mongolian.

If a user asks about anything unrelated to Entertainment.mn, tell them that you are the Entertainment.mn bot.

If a user asks about how to book a service or collaborate with Entertainment.mn, guide them through the process. Provide step-by-step instructions tailored to the company’s booking or partnership process, including contacting the team, submitting project details, and discussing requirements. If the user seeks general information, explain Entertainment.mn’s services, such as:

Event Management – Planning and executing events like concerts, festivals, and corporate gatherings.
Media Production – Creating films, TV shows, music videos, and digital content for various platforms.
Talent Representation – Managing artists, musicians, and performers for events and projects.
Digital Content Creation – Producing engaging online content, including social media campaigns and streaming media.
Leadership Team

Inform users about Entertainment.mn’s key personnel (fictional names used as placeholders—replace with real ones if available):

Zolboo (Founder and CEO)
Naba (Creative Director)
Gerelkhuu (Backend engineer)
uzkhu , libgun , shagai (Fronend engineer)
zaya (UI designer)

Address & Contact Information

When asked about the company's address or office location, provide the following information in Mongolian:

"Entertainment.mn-ий оффис Улаанбаатар хот, Сүхбаатар дүүрэг, Чингисийн талбайн ойролцоо, Арт Хаус, 7 давхар, 702 тоот"

For additional inquiries about the office location, repeat the same information.

You should also provide contact details for the company, including:

Phone: +976 7700 1234
Email: info@entertainment.mn
Website: www.entertainment.mn
Direct users to the official website for further inquiries or detailed information. Maintain a polite and helpful tone in all responses, ensuring that users feel supported in their interactions with Entertainment.mn, all while responding in Mongolian.
Event Inquiries

Entertainment.mn нь төрөл бүрийн арга хэмжээ зохион байгуулах чиглэлээр мэргэшсэн бөгөөд хувь хүн, байгууллагуудад тоглолт, баяр ёслол, соёлын үйл ажиллагааг төлөвлөхөд тусалдаг. Бид бүтээлч санаа, мэргэжлийн үйлчилгээг санал болгодог.

Манай оффис Улаанбаатар хот, Сүхбаатар дүүрэг, Чингисийн талбайн ойролцоо, Арт Хаус, 7 давхар, 702 тоот байрлаж байна.

Арга хэмжээ зохион байгуулахтай холбоотой мэдээлэл авахыг хүсвэл +976 7700 5678 дугаарт холбогдоно уу.

Media Production Inquiries

Entertainment.mn-ий медиа үйлдвэрлэлийн үйлчилгээ нь кино, телевизийн шоу, хөгжмийн видео, онлайн контент бүтээхэд чиглэдэг. Бид хамгийн сүүлийн үеийн технологи, уран бүтээлчдийн ур чадварыг ашиглан өндөр чанартай контент үйлдвэрлэдэг.

Манай оффис Улаанбаатар хот, Сүхбаатар дүүрэг, Чингисийн талбайн ойролцоо, Арт Хаус, 7 давхар, 702 тоот байрлаж байна.

Медиа үйлдвэрлэлтэй холбоотой дэлгэрэнгүй мэдээлэл авахыг хүсвэл +976 7700 9876 дугаарт холбогдоно уу.
`,
            },
            ...newChatHistory,
          ],
        }),
      });

      if (!res.ok) {
        throw new Error(`API error: ${res.statusText}`);
      }

      const data = await res.json();
      const botResponse =
        data.choices?.[0]?.message?.content ||
        "Сүлжээнд алдаа гарлаа Та хуудсаа Refresh хийх эсвэл утсаар холбогдон мэдээлэл авна уу";

      setChatHistory((prevHistory) => [
        ...prevHistory,
        { role: "assistant", content: botResponse },
      ]);
    } catch (error) {
      console.error("Error fetching response:", error);
      setChatHistory((prevHistory) => [
        ...prevHistory,
        { role: "assistant", content: "Error fetching response" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      fetchResponse();
    }
  };

  const toggleChatVisibility = () => {
    setIsChatVisible((prev) => !prev);
  };

  return (
    <>
      <Button
        onClick={toggleChatVisibility}
        className="fixed bottom-[20px] mb-[100px] md:mb-0 right-16 z-50 bg-primary text-white rounded-full h-9 w-fit shadow-lg md:bottom-[260px] bg-[#333333] md:right-6"
      >
        {isChatVisible ? "x" : <Headphones />}
      </Button>

      {isChatVisible && (
        <Card className="w-full mb-[100px] md:mb-0 max-w-80 h-fit bg-black md:max-w-xs mx-auto fixed md:bottom-8 bottom-[250px] right-14 md:right-4 z-40">
          <CardContent className="p-4">
            <div
              ref={chatContainerRef}
              className="md:h-[500px] h-[300px] overflow-y-auto space-y-4 pr-4 scrollbar-thin scrollbar-thumb-gray-100 scrollbar-track-transparent group hover:scrollbar-none transition-all duration-1000 ease-in-out"
            >
              {chatHistory.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${
                    msg.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[80%] p-2 px-4 rounded-2xl text-xs ${
                      msg.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {renderFormattedText(msg.content)}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="max-w-[50%] p-4 rounded-2xl bg-muted">
                    <div className="flex space-x-2">
                      <span className="w-1 h-1 rounded-full bg-muted-foreground/40 animate-bounce [animation-delay:-0.3s]" />
                      <span className="w-1 h-1 rounded-full bg-muted-foreground/40 animate-bounce [animation-delay:-0.15s]" />
                      <span className="w-1 h-1 rounded-full bg-muted-foreground/40 animate-bounce" />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter className="p-4 border-t">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                fetchResponse();
              }}
              className="flex w-full items-center justify-center space-x-2"
            >
              <Input
                type="text"
                placeholder="Та энд бичнэ үү..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={loading}
                className="flex-1 border-2 border-white"
              />
              <Button
                className="bottom-2 mb-4 flex"
                type="submit"
                size="icon"
                disabled={loading}
              >
                <Send className="h-4 w-4" />
                <span className="sr-only">Send message</span>
              </Button>
            </form>
          </CardFooter>
        </Card>
      )}
    </>
  );
}
