// "use client";

// import { useState } from "react";
// import { useTheme } from "next-themes";
// import {
//   ChevronLeft,
//   ChevronRight,
//   MapPin,
//   Calendar,
//   Clock,
//   Users,
//   Utensils,
//   Plus,
//   RefreshCw,
//   CheckCircle2,
//   CreditCard,
// } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Dialog, DialogContent } from "@/components/ui/dialog";
// import { Checkbox } from "@/components/ui/checkbox";
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

// export default function BookingPage() {
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);
//   const [bookingDetails, setBookingDetails] = useState<BookingDetails>(
//     initialBookingDetails
//   );
//   const [isCartOpen, setIsCartOpen] = useState(true);
//   const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false);
//   const [isProcessing, setIsProcessing] = useState(false);
//   const [isPaymentComplete, setIsPaymentComplete] = useState(false);
//   const { theme, setTheme } = useTheme();

//   const subtotal = bookingDetails.menuPrice * bookingDetails.guestCount;
//   const additionalTotal = bookingDetails.additionalServices.reduce(
//     (sum, service) => sum + service.price * service.quantity,
//     0
//   );
//   const total = subtotal + additionalTotal;
//   const tax = Math.round(total * 0.1);
//   const grandTotal = total + tax;

//   // Format currency
//   const formatCurrency = (amount: number) => {
//     return new Intl.NumberFormat("mn-MN").format(amount) + " ₮";
//   };

//   // Handle image navigation
//   const nextImage = () => {
//     setCurrentImageIndex((prev) => (prev + 1) % venue.images.length);
//   };

//   const prevImage = () => {
//     setCurrentImageIndex(
//       (prev) => (prev - 1 + venue.images.length) % venue.images.length
//     );
//   };

//   // Handle payment process
//   const handlePayment = () => {
//     setIsProcessing(true);

//     // Simulate payment processing
//     setTimeout(() => {
//       setIsProcessing(false);
//       setIsPaymentComplete(true);

//       // Update booking status
//       setBookingDetails({
//         ...bookingDetails,
//         isConfirmed: true,
//       });

//       // Close dialog after showing success message
//       setTimeout(() => {
//         setIsPaymentDialogOpen(false);
//         setIsPaymentComplete(false);
//       }, 2000);
//     }, 2000);
//   };

//   // Generate star rating
//   const renderStars = (rating: number) => {
//     const stars = [];
//     const fullStars = Math.floor(rating);
//     const hasHalfStar = rating % 1 !== 0;

//     for (let i = 0; i < fullStars; i++) {
//       stars.push(
//         <span key={`star-${i}`} className="text-yellow-400">
//           ★
//         </span>
//       );
//     }

//     if (hasHalfStar) {
//       stars.push(
//         <span key="half-star" className="text-yellow-400">
//           ★
//         </span>
//       );
//     }

//     const remainingStars = 5 - stars.length;
//     for (let i = 0; i < remainingStars; i++) {
//       stars.push(
//         <span key={`empty-${i}`} className="text-gray-600">
//           ★
//         </span>
//       );
//     }

//     return stars;
//   };

//   //   const router = useRouter();

//   //   // Амжилттай рүүт хийх
//   //   const navigateToPayment = () => {
//   //     router.push("/payment");
//   //   };

//   return (
//     <div className=" transition-colors duration-300 flex flex-col gap-4 rounded-xl">
//       <header className=" flex justify-between items-center p-2 ">
//         {/* <div
//           className="flex items-center gap-1 rounded-xl justify-center h-8 w-30  cursor-pointer"
//           //   onClick={navigateToPayment}
//         >
//           <svg
//             className="w-6 h-6 text-black"
//             viewBox="0 0 24 24"
//             fill="none"
//             xmlns="http://www.w3.org/2000/svg">
//             <path
//               d="M4 12H20M4 12L8 8M4 12L8 16"
//               stroke="currentColor"
//               strokeWidth="2"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//             />
//           </svg>
//           <h1 className="text-xs font-bold text-black">My Cart</h1>
//         </div> */}
//         {/* <ThemeToggle /> */}
//       </header>

//       <main className=" flex bg-[#121212] w-80%">
//         {isCartOpen && (
//           <div className="flex flex-col">
//             <div className="flex justify-between px-10 py-5 border-b border-[#939393] ">
//               {" "}
//               <div className="flex gap-6">
//                 <div className="w-[230px] h-[288px] relative rounded-md overflow-hidden">
//                   <Image
//                     src={venue.images[0] || "/image copy 7.png"}
//                     alt={venue.name}
//                     fill
//                     className="object-cover "
//                   />
//                 </div>
//                 <div className="flex-1">
//                   <h2 className="text-lg font-bold uppercase text-white">
//                     {venue.name}
//                   </h2>
//                   <h3 className="text-md font-medium text-gray-300">
//                     {venue.subtype}
//                   </h3>
//                   <div className="my-1 text-lg">
//                     {renderStars(venue.rating)}
//                   </div>
//                   <div className="flex gap-2 items-center mt-2">
//                     <span className="text-gray-400">Төрөл:</span>
//                     <span className="text-white">{venue.type}</span>
//                   </div>
//                 </div>
//               </div>
//               <div className="flex flex-col gap-8">
//                 <div className="mt-4 relative w-auto">
//                   <div className="flex gap-2 overflow-x-auto py-2 ">
//                     {venue.images.map((image, index) => (
//                       <div
//                         key={index}
//                         className={` relative rounded overflow-hidden flex-shrink-0 w-[120px] h-36 ${
//                           index === currentImageIndex
//                             ? "ring-2 ring-primary"
//                             : ""
//                         }`}>
//                         <Image
//                           src={image || "/placeholder.svg"}
//                           alt={`${venue.name} ${index + 1}`}
//                           fill
//                           className="object-cover"
//                         />
//                       </div>
//                     ))}
//                   </div>
//                   <div className=" absolute top-44 left-2 -translate-y-1/2">
//                     <Button
//                       variant="outline"
//                       size="icon"
//                       className="rounded-full bg-gray-800/80 h-8 w-8"
//                       onClick={prevImage}>
//                       <ChevronLeft className="h-4 w-4" />
//                     </Button>
//                   </div>
//                   <div className="absolute top-44 left-14 -translate-y-1/2">
//                     <Button
//                       variant="outline"
//                       size="icon"
//                       className="rounded-full bg-gray-800/80  h-8 w-8"
//                       onClick={nextImage}>
//                       <ChevronRight className="h-4 w-4" />
//                     </Button>
//                   </div>
//                   {/* <div className="border border-white flex justify-center items-center px-10"></div> */}
//                   <div className="absolute top-42 right-1 text-white px-3 py-1 rounded-full text-xl font-bold">
//                     {String(currentImageIndex + 1).padStart(2, "0")}
//                   </div>
//                 </div>
//                 <div className="mt-4 flex items-start gap-2">
//                   <MapPin className="h-5 w-5 text-gray-400 mt-0.5" />
//                   <div>
//                     <p className="text-white">{venue.location}</p>
//                     <p className="text-sm  text-gray-400">Байршил</p>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Venue images */}

//             {/* Location */}

//             <div className="grid grid-cols-1 lg:grid-cols-3">
//               <div className="lg:col-span-2  ">
//                 <div className="flex flex-col">
//                   {/* Event details */}
//                   <div className="p-6 border-b border-gray-800">
//                     <h3 className="text-lg font-bold uppercase mb-4 text-white">
//                       EVENT
//                     </h3>
//                     <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                       <div className="flex items-start gap-3">
//                         <Users className="h-5 w-5 text-gray-400 mt-0.5" />
//                         <div>
//                           <p className="font-medium text-white">Хүрим</p>
//                           <p className="text-sm text-gray-400">
//                             Захиалгын төрөл
//                           </p>
//                         </div>
//                       </div>
//                       <div className="flex items-start gap-3">
//                         <Calendar className="h-5 w-5 text-gray-400 mt-0.5" />
//                         <div>
//                           <p className="font-medium text-white">
//                             {bookingDetails.date}
//                           </p>
//                           <p className="text-sm text-gray-400">Болох өдөр</p>
//                         </div>
//                       </div>
//                       <div className="flex items-start gap-3">
//                         <Clock className="h-5 w-5 text-gray-400 mt-0.5" />
//                         <div>
//                           <p className="font-medium text-white">
//                             {bookingDetails.startTime} -{" "}
//                             {bookingDetails.endTime}
//                           </p>
//                           <p className="text-sm text-gray-500 dark:text-gray-400">
//                             Эхлэх, дуусах цаг
//                           </p>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="p-6 border-b border-gray-800">
//                     <h3 className="text-lg font-bold uppercase mb-4 text-white">
//                       MENU
//                     </h3>
//                     <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                       <div className="flex items-start gap-3">
//                         <Utensils className="h-5 w-5 text-gray-400 mt-0.5" />
//                         <div>
//                           <p className="font-medium text-white">
//                             {formatCurrency(bookingDetails.menuPrice)}
//                           </p>
//                           <p className="text-sm text-gray-400">Сонгосон меню</p>
//                         </div>
//                       </div>
//                       <div className="flex items-start gap-3">
//                         <Users className="h-5 w-5 text-gray-400 mt-0.5" />
//                         <div>
//                           <p className="font-medium text-white">
//                             {bookingDetails.guestCount}
//                           </p>
//                           <p className="text-sm text-gray-400">Зочдын тоо</p>
//                         </div>
//                       </div>
//                       <div className="flex items-start gap-3">
//                         <div className="h-5 w-5 flex items-center justify-center text-gray-400 mt-0.5">
//                           ₮
//                         </div>
//                         <div>
//                           <p className="font-medium text-white">
//                             {formatCurrency(subtotal)}
//                           </p>
//                           <p className="text-sm text-gray-400">Нийт үнэ</p>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Menu details */}

//                 {/* Add more items button */}
//                 <div className="p-6 flex justify-center">
//                   <Button
//                     variant="ghost"
//                     className="flex items-center gap-2 text-gray-400">
//                     <Plus className="h-4 w-4" />
//                     <span>Бүтээгдэхүүн нэмэлтээр сонгох</span>
//                   </Button>
//                 </div>
//               </div>

//               {/* Right section - 1/3 width */}
//               <div className="p-6 border-l border-[#939393]">
//                 <div className="flex items-center justify-between mb-6">
//                   <div className="flex items-center gap-4">
//                     <Checkbox
//                       id="confirmed"
//                       checked={bookingDetails.isConfirmed}
//                       className="data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
//                     />
//                     <div className="flex flex-col">
//                       <label
//                         htmlFor="confirmed"
//                         className="text-sm font-medium cursor-pointer text-white">
//                         Боломжтой
//                       </label>
//                       <p className="text-xs text-gray-400">
//                         Тус цагт захиалга авах
//                       </p>
//                     </div>
//                   </div>
//                   <div className="flex items-center gap-4">
//                     <Checkbox id="unconfirmed" />
//                     <div className="flex flex-col">
//                       <label
//                         htmlFor="unconfirmed"
//                         className="text-sm font-medium cursor-pointer text-white">
//                         Баталгаажаагүй
//                       </label>
//                       <p className="text-xs text-gray-400">Захиалгын статус</p>
//                     </div>
//                   </div>
//                 </div>

//                 <h3 className="font-medium mb-4 text-white">Price Details</h3>
//                 <div className="text-sm text-gray-400 mb-2">Үнийн задаргаа</div>

//                 <div className="space-y-3 mb-6">
//                   <div className="flex justify-between">
//                     <div className="text-gray-300">Менюны нийт үнэ</div>
//                     <div className="flex gap-8">
//                       <span className="w-20 text-right text-white">
//                         {formatCurrency(bookingDetails.menuPrice)}
//                       </span>
//                       <span className="w-8 text-right text-white">
//                         {bookingDetails.guestCount}
//                       </span>
//                       <span className="w-24 text-right font-medium text-white">
//                         {formatCurrency(subtotal)}
//                       </span>
//                     </div>
//                   </div>

//                   {bookingDetails.additionalServices.map((service, index) => (
//                     <div key={index} className="flex justify-between">
//                       <div className="text-gray-300">{service.name}</div>
//                       <div className="flex gap-8">
//                         <span className="w-20 text-right text-white">
//                           {service.price > 0
//                             ? formatCurrency(service.price)
//                             : "-"}
//                         </span>
//                         <span className="w-8 text-right text-white">
//                           {service.quantity > 0 ? service.quantity : "-"}
//                         </span>
//                         <span className="w-24 text-right font-medium text-white">
//                           {service.price * service.quantity > 0
//                             ? formatCurrency(service.price * service.quantity)
//                             : "-"}
//                         </span>
//                       </div>
//                     </div>
//                   ))}
//                 </div>

//                 <div className="border-t pt-4 space-y-2 border-gray-700">
//                   <div className="flex justify-between">
//                     <div className="font-medium text-white">Нийт</div>
//                     <div className="font-medium text-white">
//                       {formatCurrency(total)}
//                     </div>
//                   </div>
//                   <div className="flex justify-between">
//                     <div className="text-gray-300">НӨАТ</div>
//                     <div className="text-gray-300">{formatCurrency(tax)}</div>
//                   </div>
//                   <div className="flex justify-between">
//                     <div className="font-bold text-white">БҮГД</div>
//                     <div className="font-bold text-white">
//                       {formatCurrency(grandTotal)}
//                     </div>
//                   </div>
//                 </div>

//                 <div className="mt-8 flex gap-2">
//                   <Button
//                     variant="outline"
//                     size="icon"
//                     className="rounded-full">
//                     <RefreshCw className="h-4 w-4 text-white" />
//                   </Button>
//                   <Button
//                     variant="outline"
//                     size="icon"
//                     className="rounded-full">
//                     <svg
//                       className="h-4 w-4 text-white"
//                       viewBox="0 0 24 24"
//                       fill="none"
//                       xmlns="http://www.w3.org/2000/svg">
//                       <path
//                         d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
//                         stroke="currentColor"
//                         strokeWidth="2"
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                       />
//                       <path
//                         d="M12 8V16"
//                         stroke="currentColor"
//                         strokeWidth="2"
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                       />
//                       <path
//                         d="M8 12H16"
//                         stroke="currentColor"
//                         strokeWidth="2"
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                       />
//                     </svg>
//                   </Button>
//                   <Button
//                     className="flex-1 bg-amber-500 hover:bg-amber-600 text-white"
//                     onClick={() => setIsPaymentDialogOpen(true)}>
//                     Төлбөр төлөх
//                   </Button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
//         <Dialog
//           open={isPaymentDialogOpen}
//           onOpenChange={setIsPaymentDialogOpen}>
//           <DialogContent className=" bg-[#121212]">
//             {!isProcessing && !isPaymentComplete ? (
//               <div>
//                 <div className="space-y-6">
//                   <h2 className="text-xl font-bold text-white">Төлбөр төлөх</h2>

//                   <div className="space-y-4">
//                     <div className="grid grid-cols-2 gap-4">
//                       <div className="border rounded-md p-4 flex flex-col items-center justify-center cursor-pointer bg-[#121212] ">
//                         <div className="w-12 h-12 bg-[#121212] dark:bg-blue-900 rounded-full flex items-center justify-center mb-2">
//                           <CreditCard className="h-6 w-6 text-blue-600 dark:text-blue-400" />
//                         </div>
//                         <span className="text-sm font-medium text-white">
//                           Картаар төлөх
//                         </span>
//                       </div>
//                       <div className="border rounded-md p-4 flex flex-col items-center justify-center cursor-pointer dark:border-gray-700">
//                         <div className="w-12 h-12 bg-[#121212] rounded-full flex items-center justify-center mb-2">
//                           <svg
//                             className="h-6 w-6 text-gray-400"
//                             viewBox="0 0 24 24"
//                             fill="none"
//                             xmlns="http://www.w3.org/2000/svg">
//                             <path
//                               d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
//                               stroke="currentColor"
//                               strokeWidth="2"
//                               strokeLinecap="round"
//                               strokeLinejoin="round"
//                             />
//                             <path
//                               d="M8 12L11 15L16 10"
//                               stroke="currentColor"
//                               strokeWidth="2"
//                               strokeLinecap="round"
//                               strokeLinejoin="round"
//                             />
//                           </svg>
//                         </div>
//                         <span className="text-sm font-medium text-white">
//                           QR кодоор төлөх
//                         </span>
//                       </div>
//                     </div>

//                     <div className="space-y-2">
//                       <label className="text-sm font-medium text-white">
//                         Картын дугаар
//                       </label>
//                       <input
//                         type="text"
//                         className="w-full px-3 py-2 border rounded-md bg-[#121212] dark:border-gray-700 text-white"
//                         placeholder="1234 5678 9012 3456"
//                       />
//                     </div>

//                     <div className="grid grid-cols-2 gap-4">
//                       <div className="space-y-2">
//                         <label className="text-sm font-medium text-white">
//                           Хүчинтэй хугацаа
//                         </label>
//                         <input
//                           type="text"
//                           className="w-full px-3 py-2 border rounded-md bg-[#121212] dark:border-gray-700 text-white"
//                           placeholder="MM/YY"
//                         />
//                       </div>

//                       <div className="space-y-2">
//                         <label className="text-sm font-medium text-white">
//                           CVV
//                         </label>
//                         <input
//                           type="text"
//                           className="w-full px-3 py-2 border rounded-md bg-[#121212] dark:border-gray-700 text-white"
//                           placeholder="123"
//                         />
//                       </div>
//                     </div>

//                     <div className="space-y-2">
//                       <label className="text-sm font-medium text-white">
//                         Картын эзэмшигчийн нэр
//                       </label>
//                       <input
//                         type="text"
//                         className="w-full px-3 py-2 border rounded-md bg-[#121212] dark:border-gray-700 text-white"
//                         placeholder="BOLDBAATAR DORJ"
//                       />
//                     </div>
//                   </div>

//                   <div className="bg-[#121212] border-gray-700 border-2 p-4 rounded-md">
//                     <div className="flex justify-between mb-2">
//                       <span className="text-white">Нийт дүн:</span>
//                       <span className="font-bold text-white">
//                         {formatCurrency(grandTotal)}
//                       </span>
//                     </div>
//                     <div className="text-xs  text-gray-400">
//                       "Төлбөр төлөх" товчийг дарснаар та манай үйлчилгээний
//                       нөхцөл болон хувийн мэдээллийн бодлогыг хүлээн зөвшөөрч
//                       байна.
//                     </div>
//                   </div>

//                   <div className="flex justify-end gap-2">
//                     <Button
//                       variant="outline"
//                       onClick={() => setIsPaymentDialogOpen(false)}
//                       className="dark:border-gray-700 text-white">
//                       Цуцлах
//                     </Button>
//                     <Button
//                       className="bg-amber-500 hover:bg-amber-600 text-white"
//                       onClick={handlePayment}>
//                       Төлбөр төлөх
//                     </Button>
//                   </div>
//                 </div>
//               </div>
//             ) : isProcessing ? (
//               <div className="flex flex-col items-center justify-center py-8">
//                 <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500 mb-4"></div>
//                 <p className="text-lg font-medium text-white">
//                   Төлбөр гүйцэтгэж байна...
//                 </p>
//                 <p className="text-sm text-gray-400">
//                   Энэ үйлдэл хэдэн секунд үргэлжилнэ
//                 </p>
//               </div>
//             ) : (
//               <div className="flex flex-col items-center justify-center py-8">
//                 <div className="bg-green-100 dark:bg-green-900 p-3 rounded-full mb-4">
//                   <CheckCircle2 className="h-12 w-12 text-green-600 dark:text-green-400" />
//                 </div>
//                 <p className="text-lg font-medium text-white">
//                   Төлбөр амжилттай!
//                 </p>
//                 <p className="text-sm  text-gray-400">
//                   Таны захиалга баталгаажлаа
//                 </p>
//               </div>
//             )}
//           </DialogContent>
//         </Dialog>
//       </main>
//     </div>
//   );
// }
