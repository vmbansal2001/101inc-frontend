import PrivateRouteWrapper from "@/src/components/private-route-wrapper/private-route-wrapper";
import RoleBasedWrapper from "@/src/components/role-based-wrapper";
import HomeServicesRoute from "@/src/views/services/home/home-services-route";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home services | 101 Inc",
};

const Page = () => {
  return (
    <PrivateRouteWrapper>
      <RoleBasedWrapper allowedRoles={["CUSTOMER"]}>
        <HomeServicesRoute />
      </RoleBasedWrapper>
    </PrivateRouteWrapper>
  );
};

export default Page;
