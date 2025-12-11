import PrivateRouteWrapper from "@/src/components/private-route-wrapper/private-route-wrapper";
import IndexRoute from "@/src/views/index-route/index-route";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "101 Inc | Redirecting to your dashboard",
};

export default function Home() {
  return (
    <PrivateRouteWrapper>
      <IndexRoute />
    </PrivateRouteWrapper>
  );
}
