import PrivateRouteWrapper from "@/src/components/private-route-wrapper/private-route-wrapper";
import HomeServicesRoute from "@/src/views/services/home/home-services-route";

const Page = () => {
  return (
    <PrivateRouteWrapper>
      <HomeServicesRoute />
    </PrivateRouteWrapper>
  );
};

export default Page;
