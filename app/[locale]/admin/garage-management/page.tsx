import PrivateRouteWrapper from "@/src/components/private-route-wrapper/private-route-wrapper";
import GarageManagementRoute from "@/src/views/admin/garage-management/garage-management-route";
import React from "react";

const Page = () => {
  return (
    <PrivateRouteWrapper>
      <GarageManagementRoute />
    </PrivateRouteWrapper>
  );
};

export default Page;
