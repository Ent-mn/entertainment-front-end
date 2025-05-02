"use client";

import { useState } from "react";
import Image from "next/image";
import { Building2, Mail, Phone, FileText, X } from "lucide-react";
import SignaturePad from "../components/SignaturePad";
import StampPad from "../components/StampPad";

export default function ContractPage() {
  const [selectedTab, setSelectedTab] = useState<"personal" | "company">(
    "personal"
  );
  const [companyName, setCompanyName] = useState("");
  const [isSignatureModalOpen, setIsSignatureModalOpen] = useState(false);
  const [isStampModalOpen, setIsStampModalOpen] = useState(false);
  const [signature, setSignature] = useState<string | null>(null);
  const [stamp, setStamp] = useState<string | null>(null);

  const handleSignatureSave = (signatureData: string) => {
    setSignature(signatureData);
  };

  const handleStampSave = (stampData: string) => {
    setStamp(stampData);
  };

  return (
    <div className="min-h-screen bg-[#121212] text-white">
      <div className="max-w-[1400px] mx-auto p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <FileText className="text-[#F5be32] w-[35px] h-[35px]" />
            <h1 className="text-4xl font-extrabold">
              Contract<span className="text-[#f5be32]">.</span>
            </h1>
          </div>
          <button className="relative w-10 h-10 flex items-center justify-center hover:opacity-80 transition-opacity">
            <div className="absolute inset-0 border-2 border-[#F5BE32] rounded-full"></div>
            <X className="w-5 h-5 text-[#F5BE32]" />
          </button>
        </div>

        <div className="flex gap-8">
          {/* Left Sidebar */}
          <div className="w-[350px] h-[calc(100vh-100px)] bg-white text-black border-[1px] border-[#939393] rounded-2xl relative">
            <div className="h-full overflow-y-auto p-[30px] scrollbar-thin scrollbar-thumb-amber-500 scrollbar-track-amber-100 hover:scrollbar-thumb-amber-600">
              <div className="flex flex-col">
                <div className="flex text-black items-center justify-center mb-4">
                  <span className="text-black text-xl font-bold ml-2">
                    Мэдээлэл
                  </span>
                </div>

                <div className="space-y-6">
                  <div className="space-y-2">
                    <h3 className="text-black font-bold">
                      Харилцагчийн мэдээлэл
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 text-sm">
                        <Building2 className="w-4 h-4" />
                        <select
                          className="bg-white border text-sm rounded px-2 py-1"
                          value={selectedTab}
                          onChange={(e) =>
                            setSelectedTab(
                              e.target.value === "company"
                                ? "company"
                                : "personal"
                            )
                          }
                        >
                          <option value="personal">Хувь хүн</option>
                          <option value="company">Байгууллага</option>
                        </select>
                      </div>

                      <div className="flex items-center gap-2 text-sm">
                        <Mail className="w-4 h-4" />
                        <span>info@entertainment.mn</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Phone className="w-4 h-4" />
                        <span>7000-0000</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-black font-bold">Компанийн мэдээлэл</h3>
                    <div className="space-y-4">
                      <div className="text-sm">
                        <input
                          type="text"
                          placeholder="Байгууллагын нэр"
                          className="w-full p-2 border rounded bg-white h-10"
                          value={companyName}
                          onChange={(e) => setCompanyName(e.target.value)}
                        />
                      </div>
                      <div className="text-sm">
                        <div className="text-black font-bold">
                          Улсын бүртгэлийн гэрчилгэний дугаар
                        </div>
                        <input
                          type="text"
                          placeholder="Улсын бүртгэлийн гэрчилгэлийн дугаар"
                          className="w-full p-2 border rounded bg-white h-10"
                        />
                      </div>
                      <div className="text-sm">
                        <div className="text-black font-bold">
                          Регистрийн дугаар
                        </div>
                        <input
                          type="text"
                          placeholder="Регистрийн дугаар"
                          className="w-full p-2 border rounded bg-white h-10"
                        />
                      </div>
                      <div className="text-sm">
                        <div className="text-black font-bold">
                          Үйл ажиллагааны чиглэл
                        </div>
                        <input
                          type="text"
                          placeholder="Үйл ажиллагааны чиглэл"
                          className="w-full p-2 border rounded bg-white h-10"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-black font-bold">Байгууллагын хаяг</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between text-sm">
                        <input
                          type="text"
                          placeholder="26-р хороо"
                          className="w-1/2 p-2 border rounded bg-white h-10"
                        />
                        <input
                          type="text"
                          placeholder="Union building C block 201 тоот"
                          className="w-1/2 p-2 border rounded bg-white h-10"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-black text-sm font-bold">
                      Гэрээ баталгаажуулагчийн мэдээлэл
                    </h3>
                    <div className="space-y-4">
                      <div className="flex justify-between text-sm">
                        <input
                          type="text"
                          placeholder="Овог"
                          className="w-1/2 p-2 border rounded bg-white h-10"
                        />
                        <input
                          type="text"
                          placeholder="Нэр"
                          className="w-1/2 p-2 border rounded bg-white h-10"
                        />
                      </div>
                      <div className="flex justify-between text-sm">
                        <input
                          type="text"
                          placeholder="Регистрийн дугаар"
                          className="w-1/2 p-2 border rounded bg-white h-10"
                        />
                        <input
                          type="text"
                          placeholder="Албан тушаал"
                          className="w-1/2 p-2 border rounded bg-white h-10"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Signature / Stamp / DAN buttons */}
                  <div
                    className={`mt-6 ${
                      selectedTab === "personal"
                        ? "flex flex-col gap-2"
                        : "flex gap-2"
                    }`}
                  >
                    {selectedTab === "company" ? (
                      <>
                        {/* Company: signature + stamp (side by side) */}
                        <button
                          onClick={() => setIsSignatureModalOpen(true)}
                          className="flex-1 bg-[#333333] text-white py-2 px-4 rounded-lg text-sm hover:bg-opacity-90 transition-opacity"
                        >
                          {signature ? "Гарын үсэг засах" : "Гарын үсэг"}
                        </button>
                        <button
                          onClick={() => setIsStampModalOpen(true)}
                          className="flex-1 bg-[#333333] text-white py-2 px-4 rounded-lg text-sm hover:bg-opacity-90 transition-opacity"
                        >
                          {stamp ? "Тамга засах" : "Тамга"}
                        </button>
                      </>
                    ) : (
                      <>
                        {/* Personal: DAN confirm (top), then signature */}
                        <button
                          onClick={() => {
                            /* your DAN handler here */
                          }}
                          className="flex-1 flex items-center justify-center gap-2 bg-white text-black border border-gray-300 rounded-lg py-2 px-4 hover:bg-gray-100 transition-colors"
                        >
                          <Image
                            src="/dan.png"
                            alt="DAN"
                            width={44}
                            height={24}
                          />
                          <span className="text-sm font-medium">
                            ДАН-р баталгаажуулах
                          </span>
                        </button>
                        <button
                          onClick={() => setIsSignatureModalOpen(true)}
                          className="flex-1 bg-[#333333] text-white py-2 px-4 rounded-lg text-sm hover:bg-opacity-90 transition-opacity"
                        >
                          {signature ? "Гарын үсэг засах" : "Гарын үсэг"}
                        </button>
                      </>
                    )}
                  </div>

                  {signature && (
                    <div className="mt-4 border-2 border-gray-200 rounded-lg p-4 flex flex-col items-center">
                      <img
                        src={signature}
                        alt="Signature"
                        className="h-[80px] w-auto mx-auto object-contain"
                      />
                      <span className="mt-2 text-xs text-gray-600">
                        Гарын үсэг
                      </span>
                    </div>
                  )}

                  {stamp && (
                    <div className="mt-4 border-2 border-gray-200 rounded-lg p-4 flex flex-col items-center">
                      <img
                        src={stamp}
                        alt="Stamp"
                        className="h-[80px] w-auto mx-auto object-contain"
                      />
                      <span className="mt-2 text-xs text-gray-600">Тамга</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right Side Content */}
          <div className="flex-1 bg-white text-black border-[1px] border-[#939393] rounded-xl p-8">
            {selectedTab === "company" ? (
              <>
                <div className="flex justify-center mb-8">
                  <Image
                    alt="Restaurant logo"
                    width={30}
                    height={30}
                    priority
                    src="/logowhite.svg"
                  />
                  <span className="text-black text-base font-medium ml-2">
                    Байгууллагын гэрээ байгуулах
                  </span>
                </div>
                <div className="text-center mb-8">
                  <h2 className="text-lg font-medium mb-2">
                    ХАМТРАН АЖИЛЛАХ ГЭРЭЭ
                  </h2>
                  <div className="flex justify-between text-sm text-gray-400">
                    <span>2024 оны 9 сарын 20-ны өдөр</span>
                    <span>Дугаар</span>
                    <span>Улаанбаатар хот</span>
                  </div>
                </div>
                <div className="space-y-6">
                  <div className="text-sm max-h-[400px] overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-amber-500 scrollbar-track-amber-100 hover:scrollbar-thumb-amber-600">
                    <div className="space-y-4">
                      <p className="font-medium">
                        Нэг талаас: Entertainment Конвей Групп ХХК (цаашид
                        "тал")
                      </p>
                      <p className="font-medium">
                        Нөгөө талаас: Entertainment Конвей Групп ХХК цаашид{" "}
                        <span className="font-bold">
                          {companyName || "тал"}
                        </span>{" "}
                        нар харилцан тохиролцсоны үндсэн дээр энэхүү Хамтран
                        ажиллах гэрээ (цаашид "Гэрээ" гэх)-г Монгол Улсын
                        Иргэний хууль, Компанийн тухай хууль болон бусад хууль
                        тогтоомжийг үндэслэн байгуулав.
                      </p>
                    </div>

                    {/* 1. Нийтлэг үндэслэл */}
                    <div className="space-y-4 mt-6">
                      <h3 className="font-medium">1. Нийтлэг үндэслэл</h3>
                      <div className="space-y-2 text-sm">
                        <p>
                          1.1 Entertainment Конвей Групп ХХК (цаашид "тал") нар
                          харилцан тохиролцсоны үндсэн дээр энэхүү
                        </p>
                        <p>
                          1.2 Хамтран ажиллах гэрээ (цаашид "Гэрээ" гэх)-г
                          Монгол Улсын Иргэний хууль, Компанийн тухай хууль
                          болон бусад хууль тогтоомжийг үндэслэн байгуулав.
                        </p>
                        <p>1.3 хууль тогтоомжийг үндэслэн байгуулав.</p>
                      </div>
                    </div>

                    {/* 2. Гэрээний зорилго */}
                    <div className="space-y-4 mt-6">
                      <h3 className="font-medium">2. Гэрээний зорилго</h3>
                      <div className="space-y-2 text-sm">
                        <p>
                          2.1 Энэхүү гэрээ нь талуудын хооронд хамтын ажиллагааг
                          тогтоох, хөгжүүлэх, хамтран ажиллах үйл ажиллагааг
                          зохицуулах зорилготой.
                        </p>
                        <p>
                          2.2 Гэрээний талууд нь харилцан ашиг сонирхолтой, тэгш
                          эрхтэй, сайн дураараа гэрээ байгуулж байгаа бөгөөд
                          гэрээний үүргийг биелүүлэхдээ хууль тогтоомжид
                          нийцүүлэн ажиллана.
                        </p>
                      </div>
                    </div>

                    {/* 3. Гэрээний хугацаа */}
                    <div className="space-y-4 mt-6">
                      <h3 className="font-medium">3. Гэрээний хугацаа</h3>
                      <div className="space-y-2 text-sm">
                        <p>
                          3.1 Энэхүү гэрээ нь 2024 оны 9 сарын 20-ны өдрөөс
                          эхлэн 2025 оны 9 сарын 20-ны өдрийг дуустал хүчинтэй
                          байна.
                        </p>
                        <p>
                          3.2 Гэрээний хугацаа дуусахаас 30 хоногийн өмнө
                          талуудын аль нэг нь гэрээг сунгах хүсэлт гаргаагүй бол
                          гэрээ автоматаар дуусна.
                        </p>
                      </div>
                    </div>

                    {/* 4. Гэрээний үүрэг */}
                    <div className="space-y-4 mt-6">
                      <h3 className="font-medium">4. Гэрээний үүрэг</h3>
                      <div className="space-y-2 text-sm">
                        <p>4.1 Тал нь дараах үүргийг хүлээнэ:</p>
                        <ul className="list-disc pl-6 space-y-2">
                          <li>
                            Гэрээний дагуу тодорхойлсон үйлчилгээг цаг хугацаанд
                            нь үзүүлэх
                          </li>
                          <li>Үйлчилгээний чанарыг баталгаажуулах</li>
                          <li>Харилцагчийн мэдээллийг нууцлахад анхаарах</li>
                        </ul>
                        <p>4.2 Тал нь дараах үүргийг хүлээнэ:</p>
                        <ul className="list-disc pl-6 space-y-2">
                          <li>Гэрээний дагуу төлбөр төлөх</li>
                          <li>Үйлчилгээний нөхцөлийг дагаж мөрдөх</li>
                          <li>Шаардлагатай мэдээллийг цаг тухайд нь өгөх</li>
                        </ul>
                      </div>
                    </div>

                    {/* 5. Төлбөр */}
                    <div className="space-y-4 mt-6">
                      <h3 className="font-medium">5. Төлбөр</h3>
                      <div className="space-y-2 text-sm">
                        <p>
                          5.1 Үйлчилгээний төлбөр нь сар бүр 1,000,000 төгрөг
                          байна.
                        </p>
                        <p>5.2 Төлбөрийг сар бүрийн 1-ний өдөр төлнө.</p>
                        <p>
                          5.3 Хугацаа хэтэрсэн төлбөрт өдөрт 0.1%-ийн хүү
                          ногдуулах.
                        </p>
                      </div>
                    </div>

                    {/* 6. Гэрээний зөрчил */}
                    {/* 6. Гэрээний зөрчил */}
                    <div className="space-y-4 mt-6">
                      <h3 className="font-medium">6. Гэрээний зөрчил</h3>
                      <div className="space-y-2 text-sm">
                        <p>
                          6.1 Гэрээний зөрчил гарсан тохиолдолд талууд эхлээд
                          гэрээний зөрчил гарсан асуудлыг харилцан
                          тохиролцоогоор шийдвэрлэх оролдлого хийх үүрэгтэй.
                        </p>
                        <p>
                          6.2 Харилцан тохиролцоогоор шийдвэрлэх боломжгүй бол
                          Монгол Улсын хууль тогтоомжийн дагуу шийдвэрлэнэ.
                        </p>
                      </div>
                    </div>
                  </div>{" "}
                  {/* end of scrollable content */}
                  {/* Чухал зааллтуудыг хүлээн зөвшөөрөх */}
                  <div className="space-y-4">
                    <h3 className="font-medium">
                      Чухал зааллтуудыг хүлээн зөвшөөрөх
                    </h3>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          className="form-checkbox text-amber-500"
                        />
                        <span className="text-sm">
                          3.3.5 Харилцагч үйлчилгээний нөхцөлийг дэлгэрэнгүйгээр
                          мэдээлэх.
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          className="form-checkbox text-amber-500"
                        />
                        <span className="text-sm">
                          4.3.5 Харилцагч үйлчилгээний нөхцөлийг дэлгэрэнгүйгээр
                          мэдээлэх.
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          className="form-checkbox text-amber-500"
                        />
                        <span className="text-sm">
                          6.3.5 Харилцагч үйлчилгээний нөхцөлийг дэлгэрэнгүйгээр
                          мэдээлэх.
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          className="form-checkbox text-amber-500"
                        />
                        <span className="text-sm">
                          7.1.2 Харилцагч үйлчилгээний нөхцөлийг дэлгэрэнгүйгээр
                          мэдээлэх.
                        </span>
                      </div>
                    </div>
                  </div>
                </div>{" "}
                {/* end of company space-y-6 */}
                <div className="flex justify-end mt-8">
                  <button className="bg-gradient-to-r from-[#EAC947] to-[#F6A253] text-white py-3 px-6 rounded-lg hover:opacity-90 transition-opacity">
                    Баталгаажуулах
                  </button>
                </div>
              </>
            ) : (
              <>
                {/* Хувь хүний гэрээ */}
                <div className="flex justify-center mb-8">
                  <Image
                    alt="Restaurant logo"
                    width={30}
                    height={30}
                    priority
                    src="/logowhite.svg"
                  />
                  <span className="text-black text-base font-medium ml-2">
                    Хувь хүний гэрээ байгуулах
                  </span>
                </div>
                <div className="text-center mb-8">
                  <h2 className="text-lg font-medium mb-2">
                    ХАМТРАН АЖИЛЛАХ ГЭРЭЭ
                  </h2>
                  <div className="flex justify-between text-sm text-gray-400">
                    <span>2024 оны 9 сарын 20-ны өдөр</span>
                    <span>Дугаар</span>
                    <span>Улаанбаатар хот</span>
                  </div>
                </div>
                <div className="space-y-6">
                  <div className="text-sm max-h-[400px] overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-amber-500 scrollbar-track-amber-100 hover:scrollbar-thumb-amber-600">
                    <div className="space-y-4">
                      <p className="font-medium">
                        Нэг талаас: Entertainment Конвей Групп ХХК (цаашид
                        "тал")
                      </p>
                      <p className="font-medium">
                        Нөгөө талаас: {companyName || "Хувь хүн"} (цаашид "тал")
                        нар харилцан тохиролцсоны үндсэн дээр энэхүү Хамтран
                        ажиллах гэрээг Монгол Улсын Иргэний хууль, Компанийн
                        тухай хууль болон бусад хууль тогтоомжийг үндэслэн
                        байгуулав.
                      </p>
                    </div>

                    {/* 1. Нийтлэг үндэслэл */}
                    <div className="space-y-4 mt-6">
                      <h3 className="font-medium">1. Нийтлэг үндэслэл</h3>
                      <div className="space-y-2 text-sm">
                        <p>
                          1.1 Entertainment Конвей Групп ХХК (цаашид "тал") нар
                          харилцан тохиролцсоны үндсэн дээр энэхүү гэрээг
                          байгуулна.
                        </p>
                        <p>
                          1.2 Монгол Улсын Иргэний хууль, Компанийн тухай хууль
                          болон бусад хууль тогтоомжид нийцүүлэн хэрэгжүүлнэ.
                        </p>
                        <p>1.3 Хууль тогтоомжийн шаардлагыг чандлан дагана.</p>
                      </div>
                    </div>

                    {/* 2. Гэрээний зорилго */}
                    <div className="space-y-4 mt-6">
                      <h3 className="font-medium">2. Гэрээний зорилго</h3>
                      <div className="space-y-2 text-sm">
                        <p>
                          2.1 Энэхүү гэрээ нь талуудын хооронд хамтын ажиллагааг
                          тогтоох, хөгжүүлэх зорилготой.
                        </p>
                        <p>
                          2.2 Гэрээний үүрэг, эрх, хариуцлагыг тодорхой болгож
                          санал солилцоно.
                        </p>
                      </div>
                    </div>

                    {/* 3. Гэрээний хугацаа */}
                    <div className="space-y-4 mt-6">
                      <h3 className="font-medium">3. Гэрээний хугацаа</h3>
                      <div className="space-y-2 text-sm">
                        <p>
                          3.1 Энэхүү гэрээ нь 2024 оны 9 сарын 20-ны өдрөөс
                          эхлэн 2025 оны 9 сарын 20-ны өдрийг хүртэл хүчинтэй
                          байна.
                        </p>
                        <p>
                          3.2 Сунгах бол 30 хоногийн өмнө бичгээр мэдэгдэнэ.
                        </p>
                      </div>
                    </div>

                    {/* 4. Гэрээний үүрэг */}
                    <div className="space-y-4 mt-6">
                      <h3 className="font-medium">4. Гэрээний үүрэг</h3>
                      <div className="space-y-2 text-sm">
                        <p>
                          4.1 Тал нь тодорхойлсон үйлчилгээний үүргийг
                          биелүүлнэ:
                        </p>
                        <ul className="list-disc pl-6 space-y-2">
                          <li>Үйлчилгээг хугацаанд гүйцэтгэх</li>
                          <li>Үйлчилгээний чанарыг хангах</li>
                          <li>Нууцлалыг сахих</li>
                        </ul>
                        <p>
                          4.2 Харилцагч тал төлбөрөө цагт нь хийж, нөхцөлүүдийг
                          дагана.
                        </p>
                      </div>
                    </div>

                    {/* 5. Төлбөр */}
                    <div className="space-y-4 mt-6">
                      <h3 className="font-medium">5. Төлбөр</h3>
                      <div className="space-y-2 text-sm">
                        <p>5.1 Төлбөр нь 1,000,000₮/сар байна.</p>
                        <p>
                          5.2 Сарын 1-нд хийх ба хойшлогдвол 0.1%-ийн хүү бодно.
                        </p>
                        <p>
                          5.3 Хугацаа хэтэрсэн тохиолдолд торгуул ногдуулна.
                        </p>
                      </div>
                    </div>

                    {/* 6. Гэрээний зөрчил */}
                    <div className="space-y-4 mt-6">
                      <h3 className="font-medium">6. Гэрээний зөрчил</h3>
                      <div className="space-y-2 text-sm">
                        <p>
                          6.1 Зөрчил гарсан тохиолдолд талууд харилцан
                          тохиролцож шийдвэрлэнэ.
                        </p>
                        <p>
                          6.2 Шийдвэрлэж чадахгүй бол Монгол Улсын хууль
                          тогтоомжийн дагуу шүүхэд хандана.
                        </p>
                      </div>
                    </div>
                  </div>{" "}
                  {/* end personal scrollable */}
                  {/* Чухал зааллтуудыг хүлээн зөвшөөрөх */}
                  <div className="space-y-4">
                    <h3 className="font-medium">
                      Чухал зааллтуудыг хүлээн зөвшөөрөх
                    </h3>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          className="form-checkbox text-amber-500"
                        />
                        <span className="text-sm">3.3.5 ...</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          className="form-checkbox text-amber-500"
                        />
                        <span className="text-sm">4.3.5 ...</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          className="form-checkbox text-amber-500"
                        />
                        <span className="text-sm">6.3.5 ...</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          className="form-checkbox text-amber-500"
                        />
                        <span className="text-sm">7.1.2 ...</span>
                      </div>
                    </div>
                  </div>
                </div>{" "}
                {/* end personal space-y-6 */}
                <div className="flex justify-end mt-8">
                  <button className="bg-gradient-to-r from-[#EAC947] to-[#F6A253] text-white py-3 px-6 rounded-lg hover:opacity-90 transition-opacity">
                    Баталгаажуулах
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Modals */}
      <SignaturePad
        isOpen={isSignatureModalOpen}
        onClose={() => setIsSignatureModalOpen(false)}
        onSave={handleSignatureSave}
      />
      <StampPad
        isOpen={isStampModalOpen}
        onClose={() => setIsStampModalOpen(false)}
        onSave={handleStampSave}
      />
    </div>
  );
}
