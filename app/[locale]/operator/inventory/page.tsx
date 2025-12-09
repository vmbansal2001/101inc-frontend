import PrivateRouteWrapper from "@/src/components/private-route-wrapper/private-route-wrapper";
import RoleBasedWrapper from "@/src/components/role-based-wrapper";
import OperatorInventoryRoute from "@/src/views/operator/inventory/operator-inventory-route";
import React from "react";

type Props = {};

const Page = (props: Props) => {
  return (
    <PrivateRouteWrapper>
      <RoleBasedWrapper allowedRoles={["OPERATOR"]}>
        Page
        {/* <OperatorInventoryRoute /> */}
      </RoleBasedWrapper>
    </PrivateRouteWrapper>
  );
};

export default Page;
