import Ticket from "@/src/types/ticket/Ticket";

type Props = {
  ticket: Ticket;
};

const BookingDetailContainer = ({ ticket }: Props) => {
  return (
    <div className="border md:p-5 p-3 rounded-xl border-gray-200 divide-y divide-gray-200 *:py-4 *:first:pt-0 *:last:pb-0">
      <div className="flex">
        <div className="w-1/2">
          <p className="text-sm text-gray-500 font-medium">Service Type</p>
          <p className="font-semibold">{ticket.service_type.name}</p>
        </div>

        <div className="w-1/2">
          <p className="text-sm text-gray-500 font-medium">Created At</p>
          <p className="font-semibold">
            {new Date(ticket.requested_at).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            })}
          </p>
        </div>
      </div>

      <div className="">
        <p className="text-sm text-gray-500 font-medium">Description</p>
        <p className="whitespace-pre-wrap">{ticket.description}</p>
      </div>
    </div>
  );
};

export default BookingDetailContainer;
