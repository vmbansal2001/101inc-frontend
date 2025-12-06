import { useGetAllTicketsQuery } from "@/src/services/tickets/tickets.query";
import TicketsStatsPanel from "./tickets-stats-panel";
import TicketsListContainer from "./tickets-list-container/tickets-list-container";

const OperatorTicketsContainer = () => {
  const { data: tickets } = useGetAllTicketsQuery();

  const sortedTickets = tickets?.toSorted((a, b) => {
    return b.id - a.id;
  });

  return (
    <>
      {sortedTickets && <TicketsStatsPanel tickets={sortedTickets} />}
      {sortedTickets && <TicketsListContainer tickets={sortedTickets} />}
    </>
  );
};

export default OperatorTicketsContainer;
