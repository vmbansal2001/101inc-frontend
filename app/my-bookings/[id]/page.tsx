"use client";

import PrivateRouteWrapper from "@/src/components/private-route-wrapper/private-route-wrapper";
import BookingsIdRoute from "@/src/views/my-bookings/[id]/bookings-id-route";
import { useParams } from "next/navigation";

const Page = () => {
  const { id } = useParams();

  return (
    <PrivateRouteWrapper>
      <BookingsIdRoute id={id as string} />
    </PrivateRouteWrapper>
  );
};

export default Page;
