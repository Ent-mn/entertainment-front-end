import { PackageSearch } from "lucide-react";

export default function NoProducts() {
  return (
    <div className="flex flex-col items-center justify-center h-[400px] w-full">
      <PackageSearch className="w-16 h-16 text-gray-400 mb-4" />
      <h3 className="text-xl font-semibold text-gray-700 mb-2">
        Бүтээгдэхүүн олдсонгүй
      </h3>
      <p className="text-gray-500 text-center max-w-[300px]">
        Таны хайсан шүүлтүүрт тохирох бүтээгдэхүүн олдсонгүй. Өөр шүүлтүүр
        сонгоно уу.
      </p>
    </div>
  );
}
