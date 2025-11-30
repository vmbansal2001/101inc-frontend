import MechanicAssignment from "@/src/types/mechanic-assignment/MechanicAssignment";
import { useTranslations } from "next-intl";
import Link from "next/link";

type MechanicTicketCardProps = {
  mechanicAssignment: MechanicAssignment;
};

const MechanicTicketCard = ({
  mechanicAssignment,
}: MechanicTicketCardProps) => {
  const { ticket, status: assignmentStatus } = mechanicAssignment;

  const tct = useTranslations("mechanicTicketCard");
  const st = useTranslations("status");

  return (
    <Link
      href={`/my-tickets/${ticket.id}`}
      className="border p-4 flex justify-between gap-4 rounded-md border-gray-300 hover:shadow-md transition-all duration-200 cursor-pointer bg-white"
    >
      <div className="flex-1">
        <p className="text-xs text-gray-500 font-semibold tracking-wide">
          #{ticket.ticket_code}
        </p>

        <p className="mt-1 text-sm font-semibold text-gray-900">
          {ticket.description}
        </p>

        <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-600">
          <span>
            {tct("ticketStatus")}:{" "}
            <span className="font-semibold text-gray-800">
              {st(ticket.status)}
            </span>
          </span>
        </div>
      </div>

      <div className="flex flex-col items-end justify-between">
        <span className="inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium text-blue-700 border-blue-200 bg-blue-50">
          {st(assignmentStatus)}
        </span>

        <span className="mt-3 text-xs font-semibold text-blue-600">
          {tct("viewDetails")} →
        </span>
      </div>
    </Link>
  );
};

export default MechanicTicketCard;
