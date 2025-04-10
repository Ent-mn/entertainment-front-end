import { Calendar, Clock, Users } from "lucide-react";
import { BookingDetails } from "./types";

interface EventDetailsProps {
  bookingDetails: BookingDetails;
}

export default function EventDetails({ bookingDetails }: EventDetailsProps) {
  return (
    <div className="p-6 border-b border-gray-800">
      <h3 className="text-lg font-bold uppercase mb-4 text-white">EVENT</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="flex items-start gap-3">
          <Users className="h-5 w-5 text-gray-400 mt-0.5" />
          <div>
            <p className="font-medium text-white">Хүрим</p>
            <p className="text-sm text-gray-400">Захиалгын төрөл</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <Calendar className="h-5 w-5 text-gray-400 mt-0.5" />
          <div>
            <p className="font-medium text-white">{bookingDetails.date}</p>
            <p className="text-sm text-gray-400">Болох өдөр</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <Clock className="h-5 w-5 text-gray-400 mt-0.5" />
          <div>
            <p className="font-medium text-white">
              {bookingDetails.startTime} - {bookingDetails.endTime}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Эхлэх, дуусах цаг
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
