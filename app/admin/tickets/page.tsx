import PrivateRouteWrapper from "@/src/components/private-route-wrapper/private-route-wrapper";
import AdminTicketsRoute from "@/src/views/admin/tickets/admin-tickets-route";

const Page = () => {
  return (
    <PrivateRouteWrapper>
      <AdminTicketsRoute />
    </PrivateRouteWrapper>
  );
};

export default Page;
