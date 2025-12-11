import PrivateRouteWrapper from "@/src/components/private-route-wrapper/private-route-wrapper";
import RoleBasedWrapper from "@/src/components/role-based-wrapper";
import AdminIndexRoute from "@/src/views/admin/index-route/admin-index-route";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin | Operations control",
};

type Props = {};

const Page = (props: Props) => {
  return (
    <PrivateRouteWrapper>
      <RoleBasedWrapper allowedRoles={["ADMIN"]}>
        <AdminIndexRoute />
      </RoleBasedWrapper>
    </PrivateRouteWrapper>
  );
};

export default Page;
