import { Product, filterProducts, mockProducts } from "@/data/mockProducts";
import NoProducts from "@/components/ui/NoProducts";
import Image from "next/image";
import { Star } from "lucide-react";

interface ProductGridProps {
  category?: string;
  subCategory?: string;
  minPrice?: number;
  maxPrice?: number;
  rating?: number;
}

export default function ProductGrid({
  category,
  subCategory,
  minPrice,
  maxPrice,
  rating
}: ProductGridProps) {
  const filteredProducts = filterProducts(
    mockProducts,
    category,
    subCategory,
    minPrice,
    maxPrice,
    rating
  );

  if (filteredProducts.length === 0) {
    return <NoProducts />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredProducts.map((product) => (
        <div
          key={product.id}
          className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
        >
          <div className="relative h-48">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
            />
          </div>
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
            <div className="flex items-center gap-1 mb-2">
              {Array.from({ length: 5 }).map((_, index) => (
                <Star
                  key={index}
                  className={`h-4 w-4 ${
                    index < product.rating
                      ? "text-yellow-500 fill-current"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <p className="text-gray-600 font-medium">
              {product.price.toLocaleString()}₮
            </p>
          </div>
        </div>
      ))}
    </div>
  );
} 