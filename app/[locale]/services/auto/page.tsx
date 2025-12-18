import PrivateRouteWrapper from "@/src/components/private-route-wrapper/private-route-wrapper";
import RoleBasedWrapper from "@/src/components/role-based-wrapper";
import AutoServicesRoute from "@/src/views/services/auto/auto-services-route";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Auto services | 101 Inc",
};

const Page = () => {
  return (
    <PrivateRouteWrapper>
      <RoleBasedWrapper allowedRoles={["CUSTOMER"]}>
        <AutoServicesRoute />
      </RoleBasedWrapper>
    </PrivateRouteWrapper>
  );
};

export default Page;
