import PrivateRouteWrapper from "@/src/components/private-route-wrapper/private-route-wrapper";
import RoleBasedWrapper from "@/src/components/role-based-wrapper";
import GarageManagementRoute from "@/src/views/admin/garage-management/garage-management-route";

const Page = () => {
  return (
    <PrivateRouteWrapper>
      {/* TODO: Replace mechanic role with admin role */}
      <RoleBasedWrapper allowedRoles={["MECHANIC"]}>
        <GarageManagementRoute />
      </RoleBasedWrapper>
    </PrivateRouteWrapper>
  );
};

export default Page;
