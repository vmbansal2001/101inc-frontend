import PrivateRouteWrapper from "@/src/components/private-route-wrapper/private-route-wrapper";
import RoleBasedWrapper from "@/src/components/role-based-wrapper";
import ItemManagementRoute from "@/src/views/admin/item-management-route/item-management-route";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin | Items management",
};

const Page = () => {
  return (
    <PrivateRouteWrapper>
      <RoleBasedWrapper allowedRoles={["ADMIN"]}>
        <ItemManagementRoute />
      </RoleBasedWrapper>
    </PrivateRouteWrapper>
  );
};

export default Page;
