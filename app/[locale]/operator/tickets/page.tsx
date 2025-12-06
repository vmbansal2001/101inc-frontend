import PrivateRouteWrapper from "@/src/components/private-route-wrapper/private-route-wrapper";
import OperatorTicketsRoute from "@/src/views/operator/tickets/operator-tickets-route";

const Page = () => {
  return (
    <PrivateRouteWrapper>
      <OperatorTicketsRoute />
    </PrivateRouteWrapper>
  );
};

export default Page;
