"use client";

import CustomerNavbar from "@/src/components/navbar/customer-navbar";
import useUserData from "@/src/components/use-user-data/use-user-data";
import BookingDetailContainer from "./booking-detail-container";
import BookingIdContainer from "./booking-id-container";

type Props = {
  id: string;
};

const BookingsIdRoute = ({ id }: Props) => {
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

      <BookingIdContainer id={id} />
    </div>
  );
};

export default BookingsIdRoute;
