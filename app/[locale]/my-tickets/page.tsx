import PrivateRouteWrapper from "@/src/components/private-route-wrapper/private-route-wrapper";
import MyTicketsRoute from "@/src/views/my-tickets/my-tickets-route";

const Page = () => {
  return (
    <PrivateRouteWrapper>
      <MyTicketsRoute />
    </PrivateRouteWrapper>
  );
};

export default Page;
