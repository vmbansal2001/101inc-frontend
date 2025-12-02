import PrivateRouteWrapper from "@/src/components/private-route-wrapper/private-route-wrapper";
import AutoServicesRoute from "@/src/views/services/auto/auto-services-route";

const Page = () => {
  return (
    <PrivateRouteWrapper>
      <AutoServicesRoute />
    </PrivateRouteWrapper>
  );
};

export default Page;
