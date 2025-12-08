"use client";

import CustomerNavbar from "@/src/components/navbar/customer-navbar";
import BookingIdContainer from "./booking-id-container";

type Props = {
  id: string;
};

const BookingsIdRoute = ({ id }: Props) => {
  return (
    <main>
      <CustomerNavbar />
      <BookingIdContainer id={id} />
    </main>
  );
};

export default BookingsIdRoute;
