import Link from "next/link";
import {
  Headphones,
  Heart,
  ShoppingCart,
  User,
  Search,
  Calendar,
  ShoppingBag,
  Store,
  UtensilsCrossed,
} from "lucide-react";
import Input from "../Input";

export default function SiteHeader() {
  return (
    <header className="w-full bg-white">
      {/* Top bar */}
      <div className=" bg-gray-100 flex items-center justify-between px-6 py-2 text-sm text-gray-600">
        <div className="flex items-center gap-6">
          <Link href="#" className="hover:text-gray-900">
            Хамтран ажиллах
          </Link>
          <Link href="#" className="hover:text-gray-900">
            Download App
          </Link>
          <Link href="#" className="hover:text-gray-900">
            Санал хүсэлт
          </Link>
          <Link href="#" className="hover:text-gray-900">
            Тусламж
          </Link>
        </div>
      </div>

      {/* Main header */}
      <div className="border-y">
        <div className="flex items-center justify-between px-6 py-2">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            Entertainment.mn
          </Link>

          {/* Search */}
          <div className="flex items-center max-w-xl flex-1 mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input />
            </div>
          </div>

          {/* Actions */}
          <select className="block md:hidden">
            <option value=" support"> support</option>
            <option value="Миний сагс">Миний сагс</option>
            <option value="Login">Login</option>
            <option value="register">register</option>
          </select>
          <div className="md:flex items-center gap-6 hidden">
            <Link
              href="#"
              className="flex items-center gap-2 text-sm hover:text-purple-600">
              <Headphones className="w-5 h-5" />
              <div className="flex flex-col">
                <span>24/7</span>
                <span className="text-purple-600">support</span>
              </div>
            </Link>
            <Link href="#" className="relative hover:text-purple-600">
              <Heart className="w-6 h-6" />
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-purple-600 text-[10px] text-white">
                1
              </span>
            </Link>
            <Link
              href="#"
              className="relative flex gap-3 items-center hover:text-purple-600">
              <ShoppingCart className="w-6 h-6" />
              <span className="absolute top-1 right-10 flex h-4 w-4 items-center justify-center rounded-full bg-purple-600 text-[10px] text-white">
                2
              </span>
              <div className=" top-full right-0 mt-1 text-xs whitespace-nowrap">
                <div>Миний</div>
                <div>сагс</div>
              </div>
            </Link>
            <Link
              href="#"
              className="flex items-center gap-2 text-sm hover:text-purple-600">
              <User className="w-5 h-5" />
              <div className="flex flex-col">
                <span>Login</span>
                <span className="text-purple-600">or register</span>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className=" p-6">
        <select className="block md:hidden">
          <option value=" Үйлчилгээ"> Үйлчилгээ</option>
          <option value="Бүтээгдэхүүн">Бүтээгдэхүүн</option>
          <option value="Эвент захиалах">Эвент захиалах</option>
          <option value="Тасалбар авах">Тасалбар авах</option>
          <option value="Тасалбар авах">Урлагийн сургалт, багш захиалах</option>
          <option value="Тасалбар авах">Ресторан захиалах</option>
        </select>
        <ul className=" items-center gap-8 text-sm md:flex hidden">
          <li>
            <Link
              href="#"
              className="flex items-center gap-2 hover:text-purple-600">
              <User className="w-4 h-4" />
              Үйлчилгээ
            </Link>
          </li>
          <li>
            <Link
              href="#"
              className="flex items-center gap-2 hover:text-purple-600">
              <ShoppingCart className="w-4 h-4" />
              Бүтээгдэхүүн
            </Link>
          </li>
          <li>
            <Link
              href="#"
              className="flex items-center gap-2 hover:text-purple-600">
              <Calendar className="w-4 h-4" />
              Эвент захиалах
            </Link>
          </li>
          <li>
            <Link
              href="#"
              className="flex items-center gap-2 hover:text-purple-600">
              <ShoppingBag className="w-4 h-4" />
              Тасалбар авах
            </Link>
          </li>
          <li>
            <Link
              href="#"
              className="flex items-center gap-2 hover:text-purple-600">
              <Store className="w-4 h-4" />
              Урлагийн сургалт, багш захиалах
            </Link>
          </li>
          <li>
            <Link
              href="#"
              className="flex items-center gap-2 hover:text-purple-600">
              <UtensilsCrossed className="w-4 h-4" />
              Ресторан захиалах
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
