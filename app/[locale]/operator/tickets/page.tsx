import PrivateRouteWrapper from "@/src/components/private-route-wrapper/private-route-wrapper";
import RoleBasedWrapper from "@/src/components/role-based-wrapper";
import OperatorTicketsRoute from "@/src/views/operator/tickets/operator-tickets-route";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Operator | Ticket management",
};

const Page = () => {
  return (
    <PrivateRouteWrapper>
      <RoleBasedWrapper allowedRoles={["OPERATOR"]}>
        <OperatorTicketsRoute />
      </RoleBasedWrapper>
    </PrivateRouteWrapper>
  );
};

export default Page;
