import PrivateRouteWrapper from "@/src/components/private-route-wrapper/private-route-wrapper";
import RoleBasedWrapper from "@/src/components/role-based-wrapper";
import BookingsIdRoute from "@/src/views/my-bookings/[id]/bookings-id-route";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ id: string; locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  return {
    title: `Booking ticket #${id}`,
  };
}

const Page = async ({ params }: Props) => {
  const { id } = await params;

  return (
    <PrivateRouteWrapper>
      <RoleBasedWrapper allowedRoles={["CUSTOMER"]}>
        <BookingsIdRoute id={id} />
      </RoleBasedWrapper>
    </PrivateRouteWrapper>
  );
};

export default Page;
