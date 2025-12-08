import PrivateRouteWrapper from "@/src/components/private-route-wrapper/private-route-wrapper";
import AdminIndexRoute from "@/src/views/admin/index-route/admin-index-route";
import React from "react";

type Props = {};

const Page = (props: Props) => {
  return (
    <PrivateRouteWrapper>
      <AdminIndexRoute />
    </PrivateRouteWrapper>
  );
};

export default Page;
