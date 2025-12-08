import PrivateRouteWrapper from "@/src/components/private-route-wrapper/private-route-wrapper";
import ItemManagementRoute from "@/src/views/admin/item-management-route/item-management-route";

const Page = () => {
  return (
    <PrivateRouteWrapper>
      <ItemManagementRoute />
    </PrivateRouteWrapper>
  );
};

export default Page;
