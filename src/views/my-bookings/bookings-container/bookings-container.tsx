import useUserData from "@/src/components/use-user-data/use-user-data";
import { useGetTicketsByUserIdQuery } from "@/src/services/tickets/tickets.query";
import Link from "next/link";

const BookingsContainer = () => {
  const { userData } = useUserData();
  const { data: tickets } = useGetTicketsByUserIdQuery({
    user_id: userData.id,
  });

  const sortedTickets =
    tickets?.toSorted((a, b) => {
      return (
        new Date(b.requested_at).getTime() - new Date(a.requested_at).getTime()
      );
    }) || [];

  return (
    <div className="common-frame-box py-10 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
          My Bookings
        </h1>
        <p className="text-gray-600 font-medium">
          Track your service requests here.
        </p>
      </div>

      <div className="space-y-3">
        {sortedTickets.map((ticket) => (
          <Link
            href={`/my-bookings/${ticket.id}`}
            key={ticket.id}
            className="border p-4 flex justify-between rounded-md border-gray-300 hover:shadow-md transition-all duration-200 cursor-pointer"
          >
            <div className="">
              <p className="text-sm text-gray-500 font-semibold">
                #{ticket.ticket_code}
              </p>
              <p className="font-semibold">{ticket.service_type.name}</p>
              <p className="mt-2 font-medium text-sm">
                {new Date(ticket.requested_at).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}
              </p>
            </div>
            <div className="border rounded-md py-0.5 px-2 text-xs text-red-700 border-red-700 h-fit bg-red-50 font-medium">
              {ticket.status}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BookingsContainer;
