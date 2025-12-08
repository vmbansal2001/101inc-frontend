"use client";

import PrivateRouteWrapper from "@/src/components/private-route-wrapper/private-route-wrapper";
import RoleBasedWrapper from "@/src/components/role-based-wrapper";
import BookingsIdRoute from "@/src/views/my-bookings/[id]/bookings-id-route";
import { useParams } from "next/navigation";

const Page = () => {
  const { id } = useParams();

  return (
    <PrivateRouteWrapper>
      <RoleBasedWrapper allowedRoles={["CUSTOMER"]}>
        <BookingsIdRoute id={id as string} />
      </RoleBasedWrapper>
    </PrivateRouteWrapper>
  );
};

export default Page;
