import MechanicNavbar from "@/src/components/navbar/mechanic-navbar";
import useUserData from "@/src/components/use-user-data/use-user-data";
import MyTicketsIdContainer from "./my-ticket-id-container/my-tickets-id-container";

type Props = {
  id: string;
};

const MyTicketsIdRoute = ({ id }: Props) => {
  const { userData } = useUserData();

  if (userData.role !== "MECHANIC") {
    return (
      <div className="flex justify-center items-center h-screen">
        You are not authorized to access this page
      </div>
    );
  }

  return (
    <div className="">
      <MechanicNavbar />

      <MyTicketsIdContainer id={id} />
    </div>
  );
};

export default MyTicketsIdRoute;
