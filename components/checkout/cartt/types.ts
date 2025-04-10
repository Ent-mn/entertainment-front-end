export interface Venue {
  id: string;
  name: string;
  location: string;
  type: string;
  subtype: string;
  rating: number;
  images: string[];
  pricePerPerson: number;
}

export interface BookingDetails {
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
}

export interface PriceSummaryProps {
  bookingDetails: BookingDetails;
  subtotal: number;
  additionalTotal: number;
  total: number;
  tax: number;
  grandTotal: number;
  onPaymentClick: () => void;
}

export interface PaymentDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  isProcessing: boolean;
  isPaymentComplete: boolean;
  grandTotal: number;
  onPayment: () => void;
}
