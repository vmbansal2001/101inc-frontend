import PrivateRouteWrapper from "@/src/components/private-route-wrapper/private-route-wrapper";
import RoleBasedWrapper from "@/src/components/role-based-wrapper";
import MyTicketsRoute from "@/src/views/my-tickets/my-tickets-route";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mechanic | My tickets",
};

const Page = () => {
  return (
    <PrivateRouteWrapper>
      <RoleBasedWrapper allowedRoles={["MECHANIC"]}>
        <MyTicketsRoute />
      </RoleBasedWrapper>
    </PrivateRouteWrapper>
  );
};

export default Page;
