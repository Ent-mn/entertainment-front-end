export interface Product {
  id: string;
  name: string;
  category: string;
  subCategory?: string;
  price: number;
  rating: number;
  image: string;
}

export const mockProducts: Product[] = [
  {
    id: "1",
    name: "Архи 1",
    category: "Алкохолтой",
    subCategory: "Архи",
    price: 95000,
    rating: 4,
    image: "/products/arhi1.jpg"
  },
  {
    id: "2",
    name: "Архи 2",
    category: "Алкохолтой",
    subCategory: "Архи",
    price: 150000,
    rating: 5,
    image: "/products/arhi2.jpg"
  },
  {
    id: "3",
    name: "Виски 1",
    category: "Алкохолтой",
    subCategory: "Виски",
    price: 180000,
    rating: 4,
    image: "/products/whiskey1.jpg"
  },
  {
    id: "4",
    name: "Багц чимэглэл 1",
    category: "Хуримын чимэглэл",
    subCategory: "Багц чимэглэлүүд",
    price: 120000,
    rating: 5,
    image: "/products/wedding-decor1.jpg"
  },
  {
    id: "5",
    name: "Багц чимэглэл 2",
    category: "Хуримын чимэглэл",
    subCategory: "Багц чимэглэлүүд",
    price: 140000,
    rating: 4,
    image: "/products/wedding-decor2.jpg"
  },
  {
    id: "6",
    name: "Толгой ширээний чимэглэл 1",
    category: "Хуримын чимэглэл",
    subCategory: "Толгой ширээний чимэглэл",
    price: 90000,
    rating: 5,
    image: "/products/table-decor1.jpg"
  },
  {
    id: "7",
    name: "Виски 2",
    category: "Алкохолтой",
    subCategory: "Виски",
    price: 220000,
    rating: 5,
    image: "/products/whiskey2.jpg"
  },
  {
    id: "8",
    name: "Вин 1",
    category: "Алкохолтой",
    subCategory: "Вин",
    price: 85000,
    rating: 4,
    image: "/products/wine1.jpg"
  },
  {
    id: "9",
    name: "Вин 2",
    category: "Алкохолтой",
    subCategory: "Вин",
    price: 95000,
    rating: 5,
    image: "/products/wine2.jpg"
  },
  {
    id: "10",
    name: "Толгой ширээний чимэглэл 2",
    category: "Хуримын чимэглэл",
    subCategory: "Толгой ширээний чимэглэл",
    price: 110000,
    rating: 4,
    image: "/products/table-decor2.jpg"
  },
  {
    id: "11",
    name: "Толгой ширээний чимэглэл 3",
    category: "Хуримын чимэглэл",
    subCategory: "Толгой ширээний чимэглэл",
    price: 130000,
    rating: 5,
    image: "/products/table-decor3.jpg"
  },
  {
    id: "12",
    name: "Багц чимэглэл 3",
    category: "Хуримын чимэглэл",
    subCategory: "Багц чимэглэлүүд",
    price: 160000,
    rating: 5,
    image: "/products/wedding-decor3.jpg"
  }
];

// Helper function to filter products
export const filterProducts = (
  products: Product[],
  category?: string,
  subCategory?: string,
  minPrice?: number,
  maxPrice?: number,
  rating?: number
): Product[] => {
  return products.filter(product => {
    const matchesCategory = !category || product.category === category;
    const matchesSubCategory = !subCategory || product.subCategory === subCategory;
    const matchesPrice = (!minPrice || product.price >= minPrice) && 
                        (!maxPrice || product.price <= maxPrice);
    const matchesRating = !rating || product.rating >= rating;

    return matchesCategory && matchesSubCategory && matchesPrice && matchesRating;
  });
}; 