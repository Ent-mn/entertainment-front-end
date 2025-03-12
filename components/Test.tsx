/** @format */

// /** @format */

// "use client";

// import { ClockIcon, MapPinIcon } from "lucide-react";
// import { useEffect, useState } from "react";

// interface EventCardProps {
//   variant?: "banner" | "horizontal" | "compact";
//   title: string;
//   subtitle?: string;
//   image: string;
//   date?: string;
//   time?: string;
//   venue?: string;
//   showCountdown?: boolean;
//   endDate?: Date;
//   buttonText?: string;
//   onButtonClick?: () => void;
//   backgroundColor?: string;
//   className?: string;
// }

// export default function EventCard({
//   variant = "horizontal",
//   title,
//   subtitle,
//   image,
//   date,
//   time,
//   venue,
//   showCountdown,
//   endDate,
//   buttonText = "Buy Ticket",
//   onButtonClick,
//   backgroundColor = "bg-gray-900",
//   className = "",
// }: EventCardProps) {
//   const [timeLeft, setTimeLeft] = useState({
//     days: 0,
//     hours: 0,
//     minutes: 0,
//     seconds: 0,
//   });

//   useEffect(() => {
//     if (!endDate) return;

//     const timer = setInterval(() => {
//       const now = new Date().getTime();
//       const distance = endDate.getTime() - now;

//       setTimeLeft({
//         days: Math.floor(distance / (1000 * 60 * 60 * 24)),
//         hours: Math.floor(
//           (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
//         ),
//         minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
//         seconds: Math.floor((distance % (1000 * 60)) / 1000),
//       });
//     }, 1000);

//     return () => clearInterval(timer);
//   }, [endDate]);

//   const renderCountdown = () => (
//     <div className="flex w-1/2 h-[300px] gap-2 mb-4">
//       <div className="bg-gray-800/80 rounded px-3 py-2 text-center">
//         <div className="text-xl font-bold">{timeLeft.days}</div>
//         <div className="text-xs text-gray-400">өдөр</div>
//       </div>
//       <div className="bg-gray-800/80 rounded px-3 py-2 text-center">
//         <div className="text-xl font-bold">{timeLeft.hours}</div>
//         <div className="text-xs text-gray-400">цаг</div>
//       </div>
//       <div className="bg-gray-800/80 rounded px-3 py-2 text-center">
//         <div className="text-xl font-bold">{timeLeft.minutes}</div>
//         <div className="text-xs text-gray-400">минут</div>
//       </div>
//       <div className="bg-gray-800/80 rounded px-3 py-2 text-center">
//         <div className="text-xl font-bold">{timeLeft.seconds}</div>
//         <div className="text-xs text-gray-400">секунд</div>
//       </div>
//     </div>
//   );

//   const renderEventInfo = () => (
//     <div className="flex gap-4 text-sm text-gray-400">
//       {date && (
//         <div className="flex items-center gap-1">
//           <CalendarIcon className="w-4 h-4" />
//           <span>{date}</span>
//         </div>
//       )}
//       {time && (
//         <div className="flex items-center gap-1">
//           <ClockIcon className="w-4 h-4" />
//           <span>{time}</span>
//         </div>
//       )}
//       {venue && (
//         <div className="flex items-center gap-1">
//           <MapPinIcon className="w-4 h-4" />
//           <span>{venue}</span>
//         </div>
//       )}
//     </div>
//   );

//   return (
//     <div
//       className={`h-[700px]relative overflow-hidden rounded-lg ${backgroundColor} ${className}`}
//     >
//       <div className="aspect-[21/9]">
//         <img
//           src={image || "/placeholder.svg"}
//           alt={title}
//           className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
//         />
//       </div>
//       <div className="p-4">
//         <h2 className="text-2xl font-bold text-white mb-2">{title}</h2>
//         {subtitle && <p className="text-gray-400 mb-3">{subtitle}</p>}
//         {renderEventInfo()}
//       </div>
//     </div>
//   );
// }

// function CalendarIcon(props: React.SVGProps<SVGSVGElement>) {
//   return (
//     <svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
//       <line x1="16" x2="16" y1="2" y2="6" />
//       <line x1="8" x2="8" y1="2" y2="6" />
//       <line x1="3" x2="21" y1="10" y2="10" />
//     </svg>
//   );
// }
