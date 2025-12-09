"use client";

import PrivateRouteWrapper from "@/src/components/private-route-wrapper/private-route-wrapper";
import RoleBasedWrapper from "@/src/components/role-based-wrapper";
import GarageManagementIdRoute from "@/src/views/admin/garage-management/[id]/garage-management-id-route";
import { useParams } from "next/navigation";
import React from "react";

const Page = () => {
  const { id } = useParams();

  return (
    <PrivateRouteWrapper>
      <RoleBasedWrapper allowedRoles={["ADMIN"]}>
        <GarageManagementIdRoute garageId={id as string} />
      </RoleBasedWrapper>
    </PrivateRouteWrapper>
  );
};

export default Page;
