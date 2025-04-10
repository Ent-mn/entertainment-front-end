// Define or import the Venue type
type Venue = {
  id: string;
  name: string;
  location: string;
  type: string;
  subtype: string;
  rating: number;
  images: string[];
  pricePerPerson: number;
};

export const venue: Venue = {
  id: "shangri-la-1",
  name: "SHANGRI-LA ULAANBAATAR",
  location: "СБД, 1-р хороо, Замчдын гудамж, Юуны өргөн чөлөө, 1",
  type: "Event Hall",
  subtype: "Grand Ballroom",
  rating: 4.5,
  images: [
    "/image copy 7.png",
    "/image copy 7.png",
    "/image copy 7.png",
    "/image copy 7.png",
    "/image copy 7.png",
  ],
  pricePerPerson: 240000,
};

type BookingDetails = {
  date: string;
  startTime: string;
  endTime: string;
  guestCount: number;
  menuPrice: number;
  additionalServices: {
    name: string;
    price: number;
    quantity: number;
  }[];
  isConfirmed: boolean;
};

export const initialBookingDetails: BookingDetails = {
  date: "2024.10.03",
  startTime: "18:00",
  endTime: "23:00",
  guestCount: 260,
  menuPrice: 240000,
  additionalServices: [
    {
      name: "Цагийн нэмэлт төлбөр",
      price: 500000,
      quantity: 1,
    },
    {
      name: "Бүсэд төлбөр",
      price: 0,
      quantity: 0,
    },
    {
      name: "Нэмэлт хөгжмийн төлбөр",
      price: 0,
      quantity: 0,
    },
    {
      name: "Нэмэлт архины төлбөр",
      price: 0,
      quantity: 0,
    },
  ],
  isConfirmed: false,
};

// Format currency helper
export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("mn-MN").format(amount) + " ₮";
};
