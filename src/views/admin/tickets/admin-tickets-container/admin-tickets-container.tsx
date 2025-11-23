import { useGetAllTicketsQuery } from "@/src/services/tickets/tickets.query";
import TicketsStatsPanel from "./tickets-stats-panel";
import TicketsListContainer from "./tickets-list-container/tickets-list-container";

const AdminTicketsContainer = () => {
  const { data: tickets } = useGetAllTicketsQuery();

  return (
    <>
      {tickets && <TicketsStatsPanel tickets={tickets} />}
      {tickets && <TicketsListContainer tickets={tickets} />}
    </>
  );
};

export default AdminTicketsContainer;
