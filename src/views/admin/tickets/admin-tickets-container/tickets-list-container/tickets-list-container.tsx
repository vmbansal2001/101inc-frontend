import { useGetMechanicUsersQuery } from "@/src/services/users/users.query";
import Ticket from "@/src/types/ticket/Ticket";
import TicketListItem from "./ticket-list-item";

type Props = {
  tickets: Ticket[];
};

const TicketsListContainer = ({ tickets }: Props) => {
  useGetMechanicUsersQuery();

  if (!tickets.length) {
    return (
      <section className="border md:p-5 p-4 rounded-xl border-dashed border-gray-200 bg-white">
        <header className="mb-2">
          <h2 className="text-lg font-semibold text-gray-900 tracking-tight">
            All tickets
          </h2>
        </header>
        <p className="text-sm text-gray-600">
          There are no tickets to display yet. New tickets will appear here as
          soon as customers create them.
        </p>
      </section>
    );
  }

  return (
    <section className="border md:p-5 p-4 rounded-xl border-gray-200 bg-white shadow-sm">
      <header className="mb-3.5 md:mb-4">
        <div className="grid gap-1 md:grid-cols-[minmax(0,1fr),auto] md:items-end">
          <div>
            <h2 className="text-lg md:text-xl font-semibold text-gray-900 tracking-tight">
              All tickets
            </h2>
            <p className="text-xs md:text-sm text-gray-600 font-medium">
              Detailed view of every ticket, customer and service.
            </p>
          </div>
          <p className="text-[11px] md:text-xs text-gray-500 md:text-right">
            Showing{" "}
            <span className="font-semibold text-gray-800 tabular-nums">
              {tickets.length}
            </span>{" "}
            {tickets.length === 1 ? "ticket" : "tickets"}
          </p>
        </div>
      </header>

      <div className="space-y-2 md:space-y-3">
        <div className="hidden md:grid md:grid-cols-[minmax(0,0.7fr)_minmax(0,1.6fr)_minmax(0,2.1fr)_minmax(0,1.2fr)] text-[11px] font-semibold uppercase tracking-wide text-gray-500 pb-2 border-b border-gray-100">
          <span className="pl-1">Ticket ID</span>
          <span>Customer</span>
          <span>Service</span>
          <span>Status</span>
        </div>

        <ul className="divide-y divide-gray-100">
          {tickets.map((ticket) => {
            return <TicketListItem key={ticket.id} ticket={ticket} />;
          })}
        </ul>
      </div>
    </section>
  );
};

export default TicketsListContainer;
