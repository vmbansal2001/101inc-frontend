import React from "react";
import BookingDetailContainer from "./booking-detail-container";
import { useGetTicketByIdQuery } from "@/src/services/tickets/tickets.query";
import BookingServiceTimeline from "./booking-service-timeline";

type Props = {
  id: string;
};

const BookingIdContainer = ({ id }: Props) => {
  const { data: ticket } = useGetTicketByIdQuery({ ticket_id: Number(id) });

  return (
    <div className="common-frame-box py-10 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
          Ticket Details
        </h1>
        <p className="text-gray-600 font-medium">
          Ticket #{ticket?.ticket_code}
        </p>
      </div>

      {ticket && <BookingDetailContainer ticket={ticket} />}
      {ticket && <BookingServiceTimeline ticket={ticket} />}
    </div>
  );
};

export default BookingIdContainer;
