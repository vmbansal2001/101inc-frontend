"use client";

import CustomerNavbar from "@/src/components/navbar/customer-navbar";
import useUserData from "@/src/components/use-user-data/use-user-data";
import BookingsContainer from "./bookings-container/bookings-container";

const MyBookingsRoute = () => {
  const { userData } = useUserData();

  if (userData.role !== "CUSTOMER") {
    return (
      <div className="flex justify-center items-center h-screen">
        You are not authorized to access this page
      </div>
    );
  }

  return (
    <div className="">
      <CustomerNavbar />
      <BookingsContainer />
    </div>
  );
};

export default MyBookingsRoute;
