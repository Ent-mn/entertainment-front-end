"use client";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { DialogClose } from "@radix-ui/react-dialog";

export default function TermsPage() {
  return (
    <div className="w-[1500px] h-[800px] bg-[#191919] text-[#ffffff] relative">
      <div className="flex justify-between">
        <img
          className="w-[160px] h-[25px] ml-12 mt-8"
          src="/login/logo-restaurant.png"
          alt=""
        />
        <DialogClose>
          <img className="mr-12 mt-8" src="/login/x-button.png" alt="" />
        </DialogClose>
      </div>

      <div className="p-8">
        <h1 className="text-center text-2xl font-medium mb-8">
          Үйлчилгээний нөхцөл <span className="text-[#ffffff]">.</span>
        </h1>
        <ScrollArea
          className="h-[630px] pr-6   
          [&::-webkit-scrollbar]:w-2
  [&::-webkit-scrollbar-track]:bg-gray-100
  [&::-webkit-scrollbar-thumb]:bg-gray-300"
        >
          <div className="max-w-[1250px] mx-auto">
            <section className="mb-3">
              <h2 className="text-base font-medium mb-3">НЭГ. НИЙТЛЭГ ЖУРАМ</h2>
              <div className=" text-[#5C5C5C]">
                <p className="text-sm  leading-relaxed">
                  1.1 Үйлчилгээний нөхцөл нь "entertainment.mn" цахим хуудсанд
                  хэрэглэгчээр бүртгүүлэх, хэрэглэгчийн зөвшөөрлөөр хувийн
                  мэдээллийг цуглуулах, тус платформыг ашиглахад хэрэглэгчдийн
                  баримтлах журмыг тодорхойлно.
                </p>
                <p className="text-sm  leading-relaxed">
                  1.2 Хэрэглэгч нь "entertainment.mn" цахим хуудсанд хандаж,
                  бүртгүүлсэн үeэс эхлэн үйлчилгээний нөхцөлийг мөрдөх үүрэгтэй.
                </p>
                <p className="text-sm leading-relaxed">
                  1.3 Үйлчилгээний нөхцөл нь "entertainment.mn" цахим хуудас
                  болон бусад төхөөрөмжөөр нэвтрэн "entertainment.mn" цахим
                  хуудсанд үйлчилгээ авахад нэгэн адил үйлчилнэ.
                </p>
              </div>
            </section>

            <section className="mb-3">
              <h2 className="text-base font-medium mb-3">
                ХОЁР. ХЭРЭГЛЭГЧИЙН БҮРТГЭЛ, ШААРДЛАГА
              </h2>
              <div className=" text-[#5C5C5C]">
                <p className="text-sm leading-relaxed ">
                  2.1 "entertainment.mn" цахим хуудасны хэрэглэгчийн бүртгэл
                  (LOG IN-&gt;SIGN UP) хэсэгт та өөрийн утасны дугаар, и-мэйл
                  хаяг дээр суурилж бүртгэл хийнэ. Ингэхдээ "entertainment.mn"
                  цахим хуудаснаас өгсөн заавpын дагуу и-мэйл хаягт ирсэн
                  баталгаажуулах кодыг оруулсны дараа өөрийн нууц кодыг үүсгэж
                  бүртгүүлэх шаардлагатай.
                </p>
                <p className="text-sm leading-relaxed">
                  2.2 Хэрэглэгч нь бүртгэлээ баталгаажуулахаас өмнө Үйлчилгээний
                  нөхцөл, Нууцлалын бодлоготой танилцах үүрэгтэй. Үйлчилгээний
                  нөхцөлийг хүлээн зөвшөөрсөн гэсэн сонголтыг сонгон, чагтлах
                  хэсгийг дарж идэвхжүүлснээр дээрх нөхцөлүүдийг дагаж мөрдөнө.
                </p>
              </div>
            </section>

            <section className="mb-3">
              <h2 className="text-base font-medium mb-3">
                ГУРАВ. ХЭРЭГЛЭГЧИЙН ЗӨВШӨӨРӨЛ
              </h2>
              <div className=" text-[#5C5C5C]">
                <p className="text-sm leading-relaxed">
                  3.1 Хэрэглэгч нь "entertainment.mn" цахим хуудас ашиглах явцад
                  оруулж буй өөрийн хувийн мэдээллийг цуглуулах, боловсруулах,
                  ашиглахыг "entertainment.mn" цахим хуудсанд цахимаар
                  зөвшөөрсөн болно.
                </p>
                <p className="text-sm leading-relaxed">
                  3.2 Хэрэглэгчийг таньж мэдэх, баталгаажуулах зорилгоор
                  "entertainment.mn" цахим хуудасны хүсэлтээр өөрийн, и-мэйл
                  хаяг, гар утасны дугаар баталгаажуулахыг хүлээн зөвшөөрсөн
                  болно.
                </p>
              </div>
            </section>

            <section className="mb-3">
              <h2 className="text-base font-medium mb-3">
                ДӨРӨВ. ТӨЛБӨР ТООЦООНЫ НӨХЦӨЛ
              </h2>
              <div className=" text-[#5C5C5C]">
                <p className="text-sm leading-relaxed">
                  4.1 Хэрэглэгч нь сонгосон суудал болон өрөөний төлбөрийг
                  "entertainment.mn" цахим хуудасны төлбөрийн хэрэгслүүдээр
                  төлөх боломжтой. Хэрэглэгчээс сонгосон суудал болон өрөөний
                  нийт үнийн дүнг шилжүүлснээр захиалга баталгаажна. Захиалгыг
                  хүлээлгийн хугацаа болох 5 минутад баталгаажуулах шаардлагатай
                  бөгөөд хугацаа хэтэрсэн тохиолдолд таны сонгосон суудал болон
                  өрөө нээлттэй төлөвт автоматаар шилжиж баталгаажуулалт
                  амжилтгүй болно.
                </p>
                <p className="text-sm leading-relaxed">
                  4.2 Захиалгын и-баримтыг "Энтертайнмент Кочинг Групп" ХХК
                  Монгол Улсын хууль тогтоомжийн дагуу хэрэглэгчид олгоно.
                </p>
              </div>
            </section>

            <section className="mb-3">
              <h2 className="text-base font-medium mb-3">
                ТАВ. ЗАХИАЛГА ЦУЦЛАХ
              </h2>
              <div className=" text-[#5C5C5C]">
                <p className="text-sm leading-relaxed">
                  5.1 Хэрэглэгч нь сонгосон суудал болон өрөөний мэдээлэлтэй
                  сайтар танилцаж, захиалгаа давхар нягтлах үүрэгтэй бөгөөд
                  захиалгын төлбөрийг төлсөн тохиолдолд буцаах, цуцлах
                  боломжгүй.
                </p>
              </div>
            </section>

            <section className="mb-3">
              <h2 className="text-base font-medium mb-3">ЗУРГАА. БУСАД</h2>
            </section>
            <section className="mb-3">
              <h2 className="text-base font-medium mb-3">ЗУРГАА. БУСАД</h2>
            </section>
            <section className="mb-3">
              <h2 className="text-base font-medium mb-3">ЗУРГАА. БУСАД</h2>
            </section>
            <section className="mb-3">
              <h2 className="text-base font-medium mb-3">ЗУРГАА. БУСАД</h2>
            </section>
          </div>
          <ScrollBar orientation="vertical" />
        </ScrollArea>
      </div>
    </div>
  );
}
