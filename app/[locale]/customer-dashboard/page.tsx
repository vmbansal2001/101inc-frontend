import PrivateRouteWrapper from "@/src/components/private-route-wrapper/private-route-wrapper";
import RoleBasedWrapper from "@/src/components/role-based-wrapper";
import CustomerDashboard from "@/src/views/customer-dashboard/customer-dashboard";

const Page = () => {
  return (
    <PrivateRouteWrapper>
      <RoleBasedWrapper allowedRoles={["CUSTOMER"]}>
        <CustomerDashboard />
      </RoleBasedWrapper>
    </PrivateRouteWrapper>
  );
};

export default Page;
