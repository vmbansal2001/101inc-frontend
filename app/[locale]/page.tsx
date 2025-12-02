import PrivateRouteWrapper from "@/src/components/private-route-wrapper/private-route-wrapper";
import IndexRoute from "@/src/views/index-route/index-route";

export default function Home() {
  return (
    <PrivateRouteWrapper>
      <IndexRoute />
    </PrivateRouteWrapper>
  );
}
