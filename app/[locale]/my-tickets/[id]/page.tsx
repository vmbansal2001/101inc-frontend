"use client";

import PrivateRouteWrapper from "@/src/components/private-route-wrapper/private-route-wrapper";
import MyTicketsIdRoute from "@/src/views/my-tickets/[id]/my-tickets-id-route";
import { useParams } from "next/navigation";

const Page = () => {
  const { id } = useParams();

  return (
    <PrivateRouteWrapper>
      <MyTicketsIdRoute id={id as string} />
    </PrivateRouteWrapper>
  );
};

export default Page;
