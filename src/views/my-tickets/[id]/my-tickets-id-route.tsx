import MechanicNavbar from "@/src/components/navbar/mechanic-navbar";
import MyTicketsIdContainer from "./my-ticket-id-container/my-tickets-id-container";

type Props = {
  id: string;
};

const MyTicketsIdRoute = ({ id }: Props) => {
  return (
    <main>
      <MechanicNavbar />
      <MyTicketsIdContainer id={id} />
    </main>
  );
};

export default MyTicketsIdRoute;
