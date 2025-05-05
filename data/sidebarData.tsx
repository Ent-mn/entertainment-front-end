import { ReactNode } from "react";
import {
  Star,
  ChevronDown,
  ChevronRight,
  Monitor,
  Sparkles,
  Gift,
  Wine,
  GlassWater,
  Flower,
  Package,
  Table,
  Crown,
  Martini,
  Beer,
  Coffee,
  Heart,
  Cake,
  PartyPopper,
  Utensils,
  Music,
  Camera,
  Users,
  Palette,
} from "lucide-react";

interface NestedMenuItem {
  name: string;
  count: number;
  image?: string;
  price?: string;
}

interface SubMenuItem {
  name: string;
  count: number;
  icon?: ReactNode;
  image?: string;
  price?: string;
  subItems?: NestedMenuItem[];
}

interface MenuItem {
  title: string;
  count: number;
  icon?: ReactNode;
  image?: string;
  subItems?: SubMenuItem[];
}

// Service Menu Data
export const serviceMenu: MenuItem[] = [
  {
    title: "Хуримын чимэглэл",
    count: 12,
    icon: <Crown className="w-4 h-4 text-yellow-400" />,
    image: "/images/wedding-decor.jpg",
    subItems: [
      {
        name: "Багц чимэглэлүүд",
        count: 6,
        icon: <Package className="w-4 h-4 text-pink-400" />,
        image: "/images/wedding-package.jpg",
        subItems: [
          { 
            name: "Романтик багц", 
            count: 3,
            price: "450,000₮",
            image: "/images/romantic-package.jpg"
          },
          { 
            name: "Хосын ширээ", 
            count: 2,
            price: "280,000₮",
            image: "/images/couple-table.jpg"
          },
          { 
            name: "VIP багц", 
            count: 1,
            price: "850,000₮",
            image: "/images/vip-package.jpg"
          },
        ],
      },
      {
        name: "Толгой ширээний чимэглэл",
        count: 4,
        icon: <Table className="w-4 h-4 text-purple-400" />,
        image: "/images/head-table.jpg",
        subItems: [
          { 
            name: "Цэцэгт чимэглэл", 
            count: 2,
            price: "320,000₮",
            image: "/images/flower-decor.jpg"
          },
          { 
            name: "Гэрэлт чимэглэл", 
            count: 2,
            price: "280,000₮",
            image: "/images/light-decor.jpg"
          },
        ],
      },
      {
        name: "Нэмэлт үйлчилгээ",
        count: 2,
        icon: <Heart className="w-4 h-4 text-red-400" />,
        image: "/images/additional-service.jpg",
        subItems: [
          { 
            name: "Гэрэл зураг", 
            count: 1,
            price: "200,000₮",
            image: "/images/photo-service.jpg"
          },
          { 
            name: "Хөгжим", 
            count: 1,
            price: "150,000₮",
            image: "/images/music-service.jpg"
          },
        ],
      },
    ],
  },
  {
    title: "Шинэ жилийн чимэглэл",
    count: 8,
    icon: <PartyPopper className="w-4 h-4 text-blue-400" />,
    image: "/images/new-year.jpg",
    subItems: [
      {
        name: "Гэр бүлийн багц",
        count: 3,
        icon: <Users className="w-4 h-4 text-green-400" />,
        image: "/images/family-package.jpg",
      },
      {
        name: "Байгууллагын багц",
        count: 5,
        icon: <Users className="w-4 h-4 text-blue-400" />,
        image: "/images/corporate-package.jpg",
      },
    ],
  },
  {
    title: "Хурал",
    count: 10,
    icon: <Users className="w-4 h-4 text-indigo-400" />,
    image: "/images/conference.jpg",
    subItems: [
      {
        name: "Бизнес хурал",
        count: 4,
        icon: <Monitor className="w-4 h-4 text-gray-400" />,
        image: "/images/business-meeting.jpg",
      },
      {
        name: "Семинар",
        count: 3,
        icon: <Users className="w-4 h-4 text-blue-400" />,
        image: "/images/seminar.jpg",
      },
      {
        name: "Сургалт",
        count: 3,
        icon: <Users className="w-4 h-4 text-green-400" />,
        image: "/images/training.jpg",
      },
    ],
  },
];

// Product Menu Data
export const productMenu: MenuItem[] = [
  {
    title: "Уух зүйлс",
    count: 25,
    icon: <GlassWater className="w-4 h-4 text-blue-400" />,
    image: "/images/beverages.jpg",
    subItems: [
      {
        name: "Алкохолтой",
        count: 15,
        icon: <Wine className="w-4 h-4 text-red-400" />,
        image: "/images/alcoholic.jpg",
        subItems: [
          { 
            name: "Архи", 
            count: 5,
            price: "85,000₮-450,000₮",
            image: "/images/vodka.jpg"
          },
          { 
            name: "Виски", 
            count: 6,
            price: "120,000₮-980,000₮",
            image: "/images/whiskey.jpg"
          },
          { 
            name: "Дарс", 
            count: 4,
            price: "45,000₮-280,000₮",
            image: "/images/wine.jpg"
          },
        ],
      },
      {
        name: "Алкохолгүй",
        count: 10,
        icon: <Coffee className="w-4 h-4 text-brown-400" />,
        image: "/images/non-alcoholic.jpg",
        subItems: [
          { 
            name: "Ус", 
            count: 3,
            price: "2,500₮-12,000₮",
            image: "/images/water.jpg"
          },
          { 
            name: "Жүүс", 
            count: 4,
            price: "4,500₮-15,000₮",
            image: "/images/juice.jpg"
          },
          { 
            name: "Кофе", 
            count: 3,
            price: "6,000₮-12,000₮",
            image: "/images/coffee.jpg"
          },
        ],
      },
    ],
  },
  {
    title: "Коктэйл",
    count: 12,
    icon: <Martini className="w-4 h-4 text-purple-400" />,
    image: "/images/cocktails.jpg",
    subItems: [
      {
        name: "Классик коктэйл",
        count: 6,
        price: "18,000₮-35,000₮",
        image: "/images/classic-cocktails.jpg",
      },
      {
        name: "Signature коктэйл",
        count: 6,
        price: "25,000₮-45,000₮",
        image: "/images/signature-cocktails.jpg",
      },
    ],
  },
  {
    title: "Шампанск",
    count: 8,
    icon: <Wine className="w-4 h-4 text-yellow-400" />,
    image: "/images/champagne.jpg",
    subItems: [
      {
        name: "Импорт шампанск",
        count: 5,
        price: "120,000₮-980,000₮",
        image: "/images/import-champagne.jpg",
      },
      {
        name: "Дотоодын шампанск",
        count: 3,
        price: "45,000₮-150,000₮",
        image: "/images/local-champagne.jpg",
      },
    ],
  },
  {
    title: "Пиво",
    count: 10,
    icon: <Beer className="w-4 h-4 text-amber-400" />,
    image: "/images/beer.jpg",
    subItems: [
      {
        name: "Импорт пиво",
        count: 6,
        price: "12,000₮-25,000₮",
        image: "/images/import-beer.jpg",
      },
      {
        name: "Дотоодын пиво",
        count: 4,
        price: "5,000₮-12,000₮",
        image: "/images/local-beer.jpg",
      },
    ],
  },
];

// Common Data
export const sharedData = {
  ratings: [5, 4, 3, 2, 1],
  priceRanges: [
    {
      range: "90,000₮ - 120,000₮",
      count: 15,
    },
    {
      range: "120,000₮ - 140,000₮",
      count: 12,
    },
    {
      range: "140,000₮ - 160,000₮",
      count: 8,
    },
    {
      range: "160,000₮ - 200,000₮",
      count: 6,
    },
    {
      range: "200,000₮ - 250,000₮",
      count: 4,
    }
  ],
  popularTags: [
    "Хурим",
    "Хүүхдийн баяр",
    "Шинэ жил",
    "Төрсөн өдөр",
    "Компанийн арга хэмжээ",
    "VIP үйлчилгээ"
  ]
}; 