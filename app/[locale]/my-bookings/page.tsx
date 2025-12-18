import PrivateRouteWrapper from "@/src/components/private-route-wrapper/private-route-wrapper";
import RoleBasedWrapper from "@/src/components/role-based-wrapper";
import MyBookingsRoute from "@/src/views/my-bookings/my-bookings-route";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My bookings | 101 Inc",
};

const Page = () => {
  return (
    <PrivateRouteWrapper>
      <RoleBasedWrapper allowedRoles={["CUSTOMER"]}>
        <MyBookingsRoute />
      </RoleBasedWrapper>
    </PrivateRouteWrapper>
  );
};

export default Page;
