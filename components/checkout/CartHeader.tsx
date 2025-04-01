// "use client";

// import { useState } from "react";
// import { useTheme } from "next-themes";
// import { ChevronLeft, ChevronRight, MapPin } from "lucide-react";
// import { Button } from "@/components/ui/button";

// import Image from "next/image";

// interface Venue {
//   id: string;
//   name: string;
//   location: string;
//   type: string;
//   subtype: string;
//   rating: number;
//   images: string[];
//   pricePerPerson: number;
// }

// interface BookingDetails {
//   date: string;
//   startTime: string;
//   endTime: string;
//   guestCount: number;
//   menuPrice: number;
//   additionalServices: {
//     name: string;
//     price: number;
//     quantity: number;
//   }[];
//   isConfirmed: boolean;
// }

// const venue: Venue = {
//   id: "shangri-la-1",
//   name: "SHANGRI-LA ULAANBAATAR",
//   location: "СБД, 1-р хороо, Замчдын гудамж, Юуны өргөн чөлөө, 1",
//   type: "Event Hall",
//   subtype: "Grand Ballroom",
//   rating: 4.5,
//   images: [
//     "/image copy 7.png",
//     "/image copy 7.png",
//     "/image copy 7.png",
//     "/image copy 7.png",
//     "/image copy 7.png",
//   ],
//   pricePerPerson: 240000,
// };

// const initialBookingDetails: BookingDetails = {
//   date: "2024.10.03",
//   startTime: "18:00",
//   endTime: "23:00",
//   guestCount: 260,
//   menuPrice: 240000,
//   additionalServices: [
//     {
//       name: "Цагийн нэмэлт төлбөр",
//       price: 500000,
//       quantity: 1,
//     },
//     {
//       name: "Бүсэд төлбөр",
//       price: 0,
//       quantity: 0,
//     },
//     {
//       name: "Нэмэлт хөгжмийн төлбөр",
//       price: 0,
//       quantity: 0,
//     },
//     {
//       name: "Нэмэлт архины төлбөр",
//       price: 0,
//       quantity: 0,
//     },
//   ],
//   isConfirmed: false,
// };

// const [currentImageIndex, setCurrentImageIndex] = useState(0);
// const [bookingDetails, setBookingDetails] = useState<BookingDetails>(
//   initialBookingDetails
// );
// const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false);
// const [isProcessing, setIsProcessing] = useState(false);
// const [isPaymentComplete, setIsPaymentComplete] = useState(false);
// const { theme, setTheme } = useTheme();

// const subtotal = bookingDetails.menuPrice * bookingDetails.guestCount;
// const additionalTotal = bookingDetails.additionalServices.reduce(
//   (sum, service) => sum + service.price * service.quantity,
//   0
// );
// const total = subtotal + additionalTotal;
// const tax = Math.round(total * 0.1);
// const grandTotal = total + tax;

// // Format currency
// const formatCurrency = (amount: number) => {
//   return new Intl.NumberFormat("mn-MN").format(amount) + " ₮";
// };

// // Handle image navigation
// const nextImage = () => {
//   setCurrentImageIndex((prev) => (prev + 1) % venue.images.length);
// };

// const prevImage = () => {
//   setCurrentImageIndex(
//     (prev) => (prev - 1 + venue.images.length) % venue.images.length
//   );
// };

// const handlePayment = () => {
//   setIsProcessing(true);

//   setTimeout(() => {
//     setIsProcessing(false);
//     setIsPaymentComplete(true);

//     setBookingDetails({
//       ...bookingDetails,
//       isConfirmed: true,
//     });

//     setTimeout(() => {
//       setIsPaymentDialogOpen(false);
//       setIsPaymentComplete(false);
//     }, 2000);
//   }, 2000);
// };

// const renderStars = (rating: number) => {
//   const stars = [];
//   const fullStars = Math.floor(rating);
//   const hasHalfStar = rating % 1 !== 0;

//   for (let i = 0; i < fullStars; i++) {
//     stars.push(
//       <span key={`star-${i}`} className="text-yellow-400">
//         ★
//       </span>
//     );
//   }

//   if (hasHalfStar) {
//     stars.push(
//       <span key="half-star" className="text-yellow-400">
//         ★
//       </span>
//     );
//   }

//   const remainingStars = 5 - stars.length;
//   for (let i = 0; i < remainingStars; i++) {
//     stars.push(
//       <span key={`empty-${i}`} className="text-gray-600">
//         ★
//       </span>
//     );
//   }

//   return stars;
// };

// const CartHeader = () => {
//   return (
//     <div className="flex flex-col">
//       <div className="flex justify-between px-10 py-5 border-b border-[#939393] ">
//         {" "}
//         <div className="flex gap-6">
//           <div className="w-[230px] h-[288px] relative rounded-md overflow-hidden">
//             <Image
//               src={venue.images[0] || "/image copy 7.png"}
//               alt={venue.name}
//               fill
//               className="object-cover "
//             />
//           </div>
//           <div className="flex-1">
//             <h2 className="text-lg font-bold uppercase text-white">
//               {venue.name}
//             </h2>
//             <h3 className="text-md font-medium text-gray-300">
//               {venue.subtype}
//             </h3>
//             <div className="my-1 text-lg">{renderStars(venue.rating)}</div>
//             <div className="flex gap-2 items-center mt-2">
//               <span className="text-gray-400">Төрөл:</span>
//               <span className="text-white">{venue.type}</span>
//             </div>
//           </div>
//         </div>
//         <div className="flex flex-col gap-8">
//           <div className="mt-4 relative w-auto">
//             <div className="flex gap-2 overflow-x-auto py-2 ">
//               {venue.images.map((image, index) => (
//                 <div
//                   key={index}
//                   className={` relative rounded overflow-hidden flex-shrink-0 w-[120px] h-36 ${
//                     index === currentImageIndex ? "ring-2 ring-primary" : ""
//                   }`}>
//                   <Image
//                     src={image || "/placeholder.svg"}
//                     alt={`${venue.name} ${index + 1}`}
//                     fill
//                     className="object-cover"
//                   />
//                 </div>
//               ))}
//             </div>
//             <div className=" absolute top-44 left-2 -translate-y-1/2">
//               <Button
//                 variant="outline"
//                 size="icon"
//                 className="rounded-full bg-gray-800/80 h-8 w-8"
//                 onClick={prevImage}>
//                 <ChevronLeft className="h-4 w-4" />
//               </Button>
//             </div>
//             <div className="absolute top-44 left-14 -translate-y-1/2">
//               <Button
//                 variant="outline"
//                 size="icon"
//                 className="rounded-full bg-gray-800/80  h-8 w-8"
//                 onClick={nextImage}>
//                 <ChevronRight className="h-4 w-4" />
//               </Button>
//             </div>
//             <div className="absolute top-42 right-1 text-white px-3 py-1 rounded-full text-xl font-bold">
//               {String(currentImageIndex + 1).padStart(2, "0")}
//             </div>
//           </div>
//           <div className="mt-4 flex items-start gap-2">
//             <MapPin className="h-5 w-5 text-gray-400 mt-0.5" />
//             <div>
//               <p className="text-white">{venue.location}</p>
//               <p className="text-sm  text-gray-400">Байршил</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CartHeader;

"use client";

import { useState } from "react";
import Image from "next/image";
import { MapPin, Star, Calendar, Clock } from "lucide-react";

export default function EventCard() {
  const [rating] = useState(4);

  return (
    <div className="flex flex-col md:flex-row w-full overflow-hidden rounded-md">
      {/* Left section - Image */}
      <div className="relative w-full md:w-1/4 h-60 md:h-auto">
        <Image
          src="/image copy 10.png"
          alt="Grand Ballroom"
          fill
          className="object-cover flex p-6 w-[230px]"
        />
      </div>

      {/* Middle section - Venue information */}
      <div className="p-6 flex flex-col justify-between md:w-1/3">
        <div className="space-y-2">
          <h2 className="text-xl font-semibold tracking-wide uppercase">
            Shangri-La Ulaanbaatar
          </h2>
          <p className="text-lg">Grand Ballroom</p>
          <div className="flex items-center space-x-1 py-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-5 h-5 ${
                  i < rating
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-500"
                }`}
              />
            ))}
          </div>
        </div>

        <div className="space-y-4 mt-4">
          <div className="flex items-center space-x-2">
            <span className="text-gray-300">Төрөл:</span>
            <span>Event Hall</span>
          </div>
          <div className="flex items-center space-x-2">
            <MapPin className="w-5 h-5 text-gray-300" />
          </div>
        </div>
      </div>

      {/* Right section - Event information */}
      <div className=" p-6  md:w-5/12">
        <h3 className="text-lg font-medium mb-4 uppercase">
          Event Information
        </h3>

        <div className="flex">
          <div className="flex flex-col justify-center items-center px-6  border-r border-l border-[#939393]">
            <div className="flex items-center justify-center gap-2">
              <Calendar className="w-6 h-6 text-gray-300" />
              <span className="text-lg">Хурим</span>
            </div>
            <span className="text-xs text-[#A4A4A4] mt-1">Эвентийн төрөл</span>
          </div>

          <div className="flex flex-col justify-center items-center px-2 border-r border-l border-[#939393]">
            <div className="flex items-center justify-center gap-2">
              <Calendar className="w-6 h-6 text-gray-300" />
              <span className="text-lg">2024.10.03</span>
            </div>
            <span className="text-xs text-[#A4A4A4] mt-1">Болох өдөр</span>
          </div>
          <div className="flex flex-col justify-center items-center px-2 border-r border-l border-[#939393]">
            <div className="flex items-center justify-center gap-2">
              <Clock className="w-6 h-6 text-gray-300" />
              <span className="text-lg">18:00 - 23:00</span>
            </div>
            <span className="text-xs text-[#A4A4A4] mt-1">
              {" "}
              Эхлэх, үргэлжлэх цаг
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
