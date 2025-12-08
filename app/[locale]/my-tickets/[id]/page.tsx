"use client";

import PrivateRouteWrapper from "@/src/components/private-route-wrapper/private-route-wrapper";
import RoleBasedWrapper from "@/src/components/role-based-wrapper";
import MyTicketsIdRoute from "@/src/views/my-tickets/[id]/my-tickets-id-route";
import { useParams } from "next/navigation";

const Page = () => {
  const { id } = useParams();

  return (
    <PrivateRouteWrapper>
      <RoleBasedWrapper allowedRoles={["MECHANIC"]}>
        <MyTicketsIdRoute id={id as string} />
      </RoleBasedWrapper>
    </PrivateRouteWrapper>
  );
};

export default Page;
