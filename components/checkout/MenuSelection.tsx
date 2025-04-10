"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  ChevronUp,
  ChevronDown,
  Plus,
  Users,
  DollarSign,
  Trash2,
  Edit2,
} from "lucide-react";
import ProductModal, { Product } from "./ProductModal";
import PriceDetails from "./PriceDetails";

interface MenuItem {
  id: number;
  title: string;
  subtitle: string;
  secondaryText?: string;
  price: string;
  serves: number;
  totalCost: string;
  items: string[];
  image: string;
  products?: Product[];
}

export default function MenuSelection() {
  const [expandedMenus, setExpandedMenus] = useState<number[]>([1, 2, 3]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState<number | null>(null);
  const [editingMenu, setEditingMenu] = useState<number | null>(null);
  const [editValues, setEditValues] = useState({ serves: 0, price: "" });
  const [showPriceDetails, setShowPriceDetails] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);

  const [menuItems, setMenuItems] = useState<MenuItem[]>([
    {
      id: 1,
      title: "Меню 1",
      subtitle: "Тоо хүний мэню",
      secondaryText: "Стейк багц",
      price: "240,000 ₮",
      serves: 260,
      totalCost: "62,400,000 ₮",
      items: [
        "1. Ассорти зууш",
        "2. Салмон стейк",
        "3. Үхрийн гол махан стейк",
        "4. Лемонтой залуун дарс",
        "5. Soft Drink сонголтоор 1ш",
        "6. Цагаан ус 1ш",
        "7. Улаан дарс",
        "8. Шампан Пино сонголтоор 1ш",
        "9. Кофе 100гр",
        "10. La Viva cheesecake 1ш",
        "11. Оргилуун дарс 10 хүний дунд 'bin25'",
      ],
      image: "/image copy 7.png",
      products: [],
    },
    {
      id: 2,
      title: "Меню 2",
      subtitle: "Хүүхдийн мэню",
      secondaryText: "Пизза багц",
      price: "100,000 ₮",
      serves: 40,
      totalCost: "4,000,000 ₮",
      items: [
        "1. Pizza Lemon",
        "2. Wine",
        "3. Үхрийн гол махан стейк",
        "4. Лемонтой залуун дарс",
        "5. Soft Drink сонголтоор 1ш",
        "6. Цагаан ус 1ш",
        "7. Улаан дарс",
      ],
      image: "/image copy 7.png",
      products: [],
    },
    {
      id: 3,
      title: "Danzka Black",
      subtitle: "1 Litre",
      price: "150,000 ₮",
      serves: 26,
      totalCost: "3,900,000 ₮",
      items: ["1. Danska - Black", "2. 1 litre"],
      image: "/image copy 7.png",
      products: [],
    },
  ]);

  // Calculate total price from all menus and products
  useEffect(() => {
    let total = 0;

    menuItems.forEach((menu) => {
      // Add menu total cost
      const menuCost =
        Number.parseInt(menu.totalCost.replace(/[₮,\s]/g, "")) || 0;
      total += menuCost;
    });

    total += 500000;

    setTotalPrice(total);
  }, [menuItems]);

  useEffect(() => {
    if (editingMenu !== null) {
      const menu = menuItems.find((m) => m.id === editingMenu);
      if (menu) {
        const priceValue =
          Number.parseInt(editValues.price.replace(/[₮,\s]/g, "")) || 0;
        const totalCost = priceValue * editValues.serves;
        const formattedTotalCost = totalCost.toLocaleString() + " ₮";
        setMenuItems((prev) =>
          prev.map((m) =>
            m.id === editingMenu ? { ...m, totalCost: formattedTotalCost } : m
          )
        );
      }
    }
  }, [editValues, editingMenu, menuItems]);

  const toggleMenu = (id: number) => {
    setExpandedMenus((prev) =>
      prev.includes(id) ? prev.filter((menuId) => menuId !== id) : [...prev, id]
    );
  };

  const openModal = (menuId: number) => {
    setSelectedMenu(menuId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMenu(null);
  };

  const handleAddProducts = (products: Product[]) => {
    if (selectedMenu === null) return;

    setMenuItems((prev) =>
      prev.map((menu) => {
        if (menu.id === selectedMenu) {
          // Add new products to the menu
          const existingProductIds = (menu.products || []).map((p) => p.id);
          const newProducts = products.filter(
            (p) => !existingProductIds.includes(p.id)
          );
          const updatedProducts = [...(menu.products || []), ...newProducts];
          return {
            ...menu,
            products: updatedProducts,
          };
        }
        return menu;
      })
    );
  };

  const handleRemoveProduct = (menuId: number, productId: number) => {
    setMenuItems((prev) =>
      prev.map((menu) => {
        if (menu.id === menuId && menu.products) {
          return {
            ...menu,
            products: menu.products.filter((p) => p.id !== productId),
          };
        }
        return menu;
      })
    );
  };

  const createNewMenu = () => {
    const newId = Math.max(0, ...menuItems.map((item) => item.id)) + 1;
    const newMenu: MenuItem = {
      id: newId,
      title: `Меню ${newId}`,
      subtitle: "Шинэ мэню",
      price: "0 ₮",
      serves: 0,
      totalCost: "0 ₮",
      items: [],
      image: "/placeholder.svg?height=120&width=120",
      products: [],
    };

    setMenuItems((prev) => [...prev, newMenu]);
    setExpandedMenus((prev) => [...prev, newId]);
  };

  const startEditing = (menuId: number) => {
    const menu = menuItems.find((m) => m.id === menuId);
    if (menu) {
      setEditingMenu(menuId);
      setEditValues({
        serves: menu.serves,
        price: menu.price.replace(" ₮", ""),
      });
    }
  };

  const saveEditing = () => {
    if (editingMenu === null) return;
    const formattedPrice = editValues.price.includes("₮")
      ? editValues.price
      : editValues.price + " ₮";

    setMenuItems((prev) =>
      prev.map((menu) =>
        menu.id === editingMenu
          ? {
              ...menu,
              serves: editValues.serves,
              price: formattedPrice,
            }
          : menu
      )
    );

    setEditingMenu(null);
  };

  const handleEditChange = (field: "serves" | "price", value: string) => {
    if (field === "serves") {
      setEditValues((prev) => ({
        ...prev,
        serves: Number.parseInt(value) || 0,
      }));
    } else {
      setEditValues((prev) => ({ ...prev, price: value }));
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 w-full p-6">
      <div className="flex flex-col space-y-4 w-full md:w-3/5 dark:bg-[#121212] bg-[#F3F3F3] dark:text-white text-[#121212]">
        {menuItems.map((menu) => (
          <div
            key={menu.id}
            className="flex bg-opacity-80 border p-3 cursor-pointer border-[#343434] hover:border-[#403f3f] rounded-xl overflow-hidden ">
            {/* Left - Image */}
            <div className="relative w-[146px] h-[152px] rounded-lg overflow-hidden mr-4 flex-shrink-0">
              <Image
                src={menu.image || "/image copy 7.png"}
                alt={menu.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex flex-col p-4 w-full">
              <div className="flex items-start">
                <div className="flex-1">
                  <div className="flex justify-between ">
                    <div className="flex justify-center items-center gap-3 pb-2 border-b border-[#F5BE32]">
                      <h2 className=" text-xl font-medium">{menu.title}</h2>
                      <div className="flex text-gray-400 text-sm space-x-2">
                        <span>{menu.subtitle}</span>
                        {menu.secondaryText && (
                          <>
                            <span>•</span>
                            <span>{menu.secondaryText}</span>
                          </>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={() => toggleMenu(menu.id)}
                      className="text-gray-400 hover:text-white transition-colors">
                      {expandedMenus.includes(menu.id) ? (
                        <ChevronUp size={20} />
                      ) : (
                        <ChevronDown size={20} />
                      )}
                    </button>
                  </div>

                  <div className="pt-3 flex items-center justify-between">
                    {editingMenu === menu.id ? (
                      <>
                        <div className="flex items-center justify-center pb-3">
                          <DollarSign className="text-gray-400" size={18} />
                          <input
                            type="text"
                            value={editValues.price}
                            onChange={(e) =>
                              handleEditChange("price", e.target.value)
                            }
                            className=" rounded  px-2 py-1 border border-[#343434]"
                          />
                        </div>

                        <div className="flex flex-col items-center justify-center">
                          <div className="flex justify-center items-center gap-2">
                            <Users size={18} />
                            <input
                              type="text"
                              value={editValues.serves}
                              onChange={(e) =>
                                handleEditChange("serves", e.target.value)
                              }
                              className=" px-2 py-1 rounded w-16 border border-[#343434]"
                            />
                          </div>
                          <span className="text-xs flex pr-4 text-[#A4A4A4]">
                            Зочдын тоо
                          </span>
                        </div>
                        <div className="flex flex-col items-center gap-1">
                          <div className="flex items-center justify-center gap-3">
                            <DollarSign className="text-gray-400" size={18} />
                            <input
                              type="text"
                              value={editValues.price}
                              onChange={(e) =>
                                handleEditChange("serves", e.target.value)
                              }
                              className=" px-2 py-1 rounded w-16 border border-[#343434]"
                            />
                          </div>
                          <span className="text-xs text-[#A4A4A4]">Нийт</span>
                        </div>

                        <div className="flex items-center space-x-2 pb-4">
                          <button
                            onClick={saveEditing}
                            className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-500">
                            Хадгалах
                          </button>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="flex items-center space-x-2 pb-3">
                          <DollarSign className="" size={18} />
                          <span className=" font-medium">{menu.price}</span>
                        </div>

                        <div className="flex items-center space-x-2 ">
                          <div className="flex flex-col items-center justify-center gap-1">
                            <div className="flex items-center justify-center gap-3">
                              <Users size={18} />
                              <span>{menu.serves}</span>
                            </div>

                            <span className="text-xs text-[#A4A4A4]">
                              Зочдын тоо
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center space-x-2">
                          <div className="flex flex-col items-center gap-1">
                            <div className="flex items-center justify-center gap-3">
                              <DollarSign className="" size={18} />
                              <span className="">{menu.totalCost}</span>
                            </div>
                            <span className="text-xs text-[#A4A4A4]">Нийт</span>
                          </div>

                          <button
                            onClick={() => startEditing(menu.id)}
                            className="ml-2 ">
                            <Edit2 size={16} />
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Expanded content */}
              {expandedMenus.includes(menu.id) && (
                <div className="mt-4">
                  <ul className="space-y-1 text-sm text-[#A4A4A4]">
                    {menu.items.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>

                  {/* Added products section - Consistent design across all menus */}
                  <div className="mt-4 border-t  pt-3">
                    <h4 className=" mb-2 flex items-center justify-between">
                      <span>Нэмсэн бүтээгдэхүүн:</span>
                      <button
                        onClick={() => openModal(menu.id)}
                        className="text-sm text-blue-400 hover:text-blue-300 flex items-center">
                        <Plus size={16} className="mr-1" /> Бүтээгдэхүүн нэмэх
                      </button>
                    </h4>

                    {menu.products && menu.products.length > 0 ? (
                      <ul className="space-y-2 ">
                        {menu.products.map((product) => (
                          <li
                            key={product.id}
                            className="flex items-center justify-between text-[#A4A4A4] rounded p-2">
                            <div className="flex items-center">
                              <div className="relative w-8 h-10 mr-2">
                                <Image
                                  src={product.image || "/image copy 8.png"}
                                  alt={product.name}
                                  fill
                                  className="object-contain"
                                />
                              </div>
                              <div>
                                <p className=" text-sm">{product.name}</p>
                                <p className=" text-xs">{product.subtitle}</p>
                              </div>
                            </div>
                            <div className="flex items-center">
                              <span className=" text-sm mr-3">
                                {product.price}
                              </span>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleRemoveProduct(menu.id, product.id);
                                }}
                                className="text-gray-400 hover:text-red-500">
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className=" text-sm italic text-[#A4A4A4]">
                        Бүтээгдэхүүн нэмэгдээгүй байна!
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}

        {/* Add new menu button */}
        <div className="flex flex-col items-center justify-center text-center text-gray-500 py-4">
          <button
            onClick={createNewMenu}
            className="w-10 h-10 rounded-full border border-gray-700 flex items-center justify-center mb-2 hover:bg-gray-800 transition-colors">
            <Plus size={20} />
          </button>
          <button
            onClick={createNewMenu}
            className="text-xs hover:text-gray-300 transition-colors">
            <p>Бүтээгдэхүүн, үйлчилгээ</p>
            <p>сонгох</p>
          </button>
        </div>

        {/* View Price Details button (mobile only) */}
        <div className="md:hidden">
          <button
            onClick={() => setShowPriceDetails(!showPriceDetails)}
            className="w-full bg-blue-600 text-white font-medium py-3 rounded-md hover:bg-blue-500 transition-colors">
            {showPriceDetails ? "Нуух" : "Үнийн дэлгэрэнгүй харах"}
          </button>
        </div>
      </div>

      {/* Price Details section */}
      <div
        className={`w-full md:w-2/5 ${
          showPriceDetails ? "block" : "hidden md:block"
        }`}>
        <PriceDetails menuItems={menuItems} totalPrice={totalPrice} />
      </div>

      {/* Product selection modal */}
      <ProductModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onAddProducts={handleAddProducts}
      />
    </div>
  );
}
