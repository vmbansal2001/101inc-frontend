import PrivateRouteWrapper from "@/src/components/private-route-wrapper/private-route-wrapper";
import MyBookingsRoute from "@/src/views/my-bookings/my-bookings-route";

const Page = () => {
  return (
    <PrivateRouteWrapper>
      <MyBookingsRoute />
    </PrivateRouteWrapper>
  );
};

export default Page;
