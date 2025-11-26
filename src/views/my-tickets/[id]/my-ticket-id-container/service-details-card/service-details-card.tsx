import Ticket from "@/src/types/ticket/Ticket";
import AddMechanicEstimates from "./add-mechanic-estimates";
import ShowMechanicEstimates from "./show-mechanic-estimates";

type Props = {
  ticket: Ticket;
};

const ServiceDetailsCard = ({ ticket }: Props) => {
  return (
    <div className="md:p-5 p-3 rounded-2xl border border-gray-100 shadow-[0_10px_30px_rgba(15,23,42,0.06)] divide-y divide-gray-200 *:py-4 *:first:pt-0 *:last:pb-0 bg-white">
      <div className="flex flex-wrap gap-4">
        <div className="md:w-1/2 w-full">
          <p className="text-sm text-gray-500 font-medium">Opted Service</p>
          <p className="font-semibold text-gray-900">
            {ticket.service_type.name}
          </p>
        </div>

        <div className="md:w-1/2 w-full">
          <p className="text-sm text-gray-500 font-medium">Requested At</p>
          <p className="font-semibold text-gray-900">
            {new Date(ticket.requested_at).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            })}
          </p>
        </div>
      </div>

      <div>
        <p className="text-sm text-gray-500 font-medium">
          Detailed Description
        </p>
        <p className="text-sm text-gray-900 whitespace-pre-wrap">
          {ticket.description || "No description provided"}
        </p>
      </div>

      <div className="flex flex-wrap gap-4">
        <div className="md:w-1/3 w-full">
          <p className="text-sm text-gray-500 font-medium">Ticket Code</p>
          <p className="text-sm font-semibold text-gray-900">
            #{ticket.ticket_code}
          </p>
        </div>

        <div className="md:w-1/3 w-full">
          <p className="text-sm text-gray-500 font-medium">Status</p>
          <p className="inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium text-blue-700 border-blue-200 bg-blue-50">
            {ticket.status}
          </p>
        </div>

        {ticket.estimates.length > 0 ? (
          <ShowMechanicEstimates ticket={ticket} />
        ) : (
          <AddMechanicEstimates ticket={ticket} />
        )}
      </div>
    </div>
  );
};

export default ServiceDetailsCard;
