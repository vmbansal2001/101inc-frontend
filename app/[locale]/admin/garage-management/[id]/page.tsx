import PrivateRouteWrapper from "@/src/components/private-route-wrapper/private-route-wrapper";
import RoleBasedWrapper from "@/src/components/role-based-wrapper";
import GarageManagementIdRoute from "@/src/views/admin/garage-management/[id]/garage-management-id-route";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ id: string; locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  return {
    title: `Admin | Garage ${id}`,
  };
}

const Page = async ({ params }: Props) => {
  const { id } = await params;

  return (
    <PrivateRouteWrapper>
      <RoleBasedWrapper allowedRoles={["ADMIN"]}>
        <GarageManagementIdRoute garageId={id} />
      </RoleBasedWrapper>
    </PrivateRouteWrapper>
  );
};

export default Page;
