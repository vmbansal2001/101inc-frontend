import PrivateRouteWrapper from "@/src/components/private-route-wrapper/private-route-wrapper";
import RoleBasedWrapper from "@/src/components/role-based-wrapper";
import GarageManagementRoute from "@/src/views/admin/garage-management/garage-management-route";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin | Garage management",
};

const Page = () => {
  return (
    <PrivateRouteWrapper>
      <RoleBasedWrapper allowedRoles={["ADMIN"]}>
        <GarageManagementRoute />
      </RoleBasedWrapper>
    </PrivateRouteWrapper>
  );
};

export default Page;
