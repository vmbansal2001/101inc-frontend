"use client";

import CustomerNavbar from "@/src/components/navbar/customer-navbar";
import BookingsContainer from "./bookings-container/bookings-container";

const MyBookingsRoute = () => {
  return (
    <main>
      <CustomerNavbar />
      <BookingsContainer />
    </main>
  );
};

export default MyBookingsRoute;
