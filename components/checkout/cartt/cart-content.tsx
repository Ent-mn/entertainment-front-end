"use client";

import { useState } from "react";
import { BookingDetails } from "./types";
import { initialBookingDetails, venue } from "./cart-data";
import VenueInfo from "./venue-info";
import EventDetails from "./event-details";
import MenuDetails from "./menu-details";
import PriceSummary from "./price-summary";
import PaymentDialog from "./payment-dialog";
// import VenueInfo from "./venue-info";
// import EventDetails from "./event-details";
// import MenuDetails from "./menu-details";
// import PriceSummary from "./price-summary";
// import PaymentDialog from "./payment-dialog";
// import { initialBookingDetails, venue } from "./cart-data";
// import { BookingDetails } from "./types";

export default function CartContent() {
  const [bookingDetails, setBookingDetails] = useState<BookingDetails>(
    initialBookingDetails
  );
  const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isPaymentComplete, setIsPaymentComplete] = useState(false);

  // Calculate totals
  const subtotal = bookingDetails.menuPrice * bookingDetails.guestCount;
  const additionalTotal = bookingDetails.additionalServices.reduce(
    (sum, service) => sum + service.price * service.quantity,
    0
  );
  const total = subtotal + additionalTotal;
  const tax = Math.round(total * 0.1);
  const grandTotal = total + tax;

  // Handle payment process
  const handlePayment = () => {
    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setIsPaymentComplete(true);

      // Update booking status
      setBookingDetails({
        ...bookingDetails,
        isConfirmed: true,
      });

      // Close dialog after showing success message
      setTimeout(() => {
        setIsPaymentDialogOpen(false);
        setIsPaymentComplete(false);
      }, 2000);
    }, 2000);
  };

  return (
    <div className="transition-colors duration-300 flex flex-col gap-4 rounded-xl">
      <div className="flex flex-col">
        <VenueInfo venue={venue} />

        <div className="grid grid-cols-1 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="flex flex-col">
              <EventDetails bookingDetails={bookingDetails} />
              <MenuDetails
                bookingDetails={bookingDetails}
                subtotal={subtotal}
              />
            </div>
          </div>

          <PriceSummary
            bookingDetails={bookingDetails}
            subtotal={subtotal}
            additionalTotal={additionalTotal}
            total={total}
            tax={tax}
            grandTotal={grandTotal}
            onPaymentClick={() => setIsPaymentDialogOpen(true)}
          />
        </div>
      </div>

      <PaymentDialog
        isOpen={isPaymentDialogOpen}
        onOpenChange={setIsPaymentDialogOpen}
        isProcessing={isProcessing}
        isPaymentComplete={isPaymentComplete}
        grandTotal={grandTotal}
        onPayment={handlePayment}
      />
    </div>
  );
}
