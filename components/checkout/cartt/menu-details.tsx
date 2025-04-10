import { Utensils, Users, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "./cart-data";
import { BookingDetails } from "./types";

interface MenuDetailsProps {
  bookingDetails: BookingDetails;
  subtotal: number;
}

export default function MenuDetails({
  bookingDetails,
  subtotal,
}: MenuDetailsProps) {
  return (
    <>
      <div className="p-6 border-b border-gray-800">
        <h3 className="text-lg font-bold uppercase mb-4 text-white">MENU</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-start gap-3">
            <Utensils className="h-5 w-5 text-gray-400 mt-0.5" />
            <div>
              <p className="font-medium text-white">
                {formatCurrency(bookingDetails.menuPrice)}
              </p>
              <p className="text-sm text-gray-400">Сонгосон меню</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Users className="h-5 w-5 text-gray-400 mt-0.5" />
            <div>
              <p className="font-medium text-white">
                {bookingDetails.guestCount}
              </p>
              <p className="text-sm text-gray-400">Зочдын тоо</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="h-5 w-5 flex items-center justify-center text-gray-400 mt-0.5">
              ₮
            </div>
            <div>
              <p className="font-medium text-white">
                {formatCurrency(subtotal)}
              </p>
              <p className="text-sm text-gray-400">Нийт үнэ</p>
            </div>
          </div>
        </div>
      </div>

      {/* Add more items button */}
      <div className="p-6 flex justify-center">
        <Button
          variant="ghost"
          className="flex items-center gap-2 text-gray-400">
          <Plus className="h-4 w-4" />
          <span>Бүтээгдэхүүн нэмэлтээр сонгох</span>
        </Button>
      </div>
    </>
  );
}
