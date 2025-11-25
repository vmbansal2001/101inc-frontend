import Ticket from "@/src/types/ticket/Ticket";
import { useState } from "react";
import TicketDetailsModal from "./ticket-details-modal/ticket-details-modal";

type Props = {
  ticket: Ticket;
};

type TicketStatus =
  | "REQUESTED"
  | "ASSIGNED"
  | "ESTIMATE_PROVIDED"
  | "WORK_IN_PROGRESS"
  | "REJECTED"
  | "COMPLETED";

type StatusConfig = {
  label: string;
  pillClassName: string;
  dotClassName: string;
};

const STATUS_CONFIG: Record<TicketStatus | "DEFAULT", StatusConfig> = {
  REQUESTED: {
    label: "Requested",
    pillClassName: "bg-sky-50 text-sky-700 ring-1 ring-inset ring-sky-100/80",
    dotClassName: "bg-sky-500",
  },
  ASSIGNED: {
    label: "Assigned",
    pillClassName:
      "bg-indigo-50 text-indigo-700 ring-1 ring-inset ring-indigo-100/80",
    dotClassName: "bg-indigo-500",
  },
  ESTIMATE_PROVIDED: {
    label: "Estimate provided",
    pillClassName:
      "bg-orange-50 text-orange-700 ring-1 ring-inset ring-orange-100/80",
    dotClassName: "bg-orange-500",
  },
  WORK_IN_PROGRESS: {
    label: "In progress",
    pillClassName: "bg-red-50 text-red-700 ring-1 ring-inset ring-red-100/80",
    dotClassName: "bg-red-500",
  },
  REJECTED: {
    label: "Rejected",
    pillClassName: "bg-slate-50 text-slate-700 ring-1 ring-slate-100/80",
    dotClassName: "bg-slate-500",
  },
  COMPLETED: {
    label: "Completed",
    pillClassName:
      "bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-100/80",
    dotClassName: "bg-emerald-500",
  },
  DEFAULT: {
    label: "Unknown",
    pillClassName: "bg-gray-50 text-gray-600 ring-1 ring-gray-100/80",
    dotClassName: "bg-gray-400",
  },
};

const formatRequestedAt = (requestedAt: string) => {
  const date = new Date(requestedAt);
  if (Number.isNaN(date.getTime())) return "";

  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const StatusPill = ({ status }: { status: string }) => {
  const key =
    (status as TicketStatus) in STATUS_CONFIG
      ? (status as TicketStatus)
      : "DEFAULT";
  const config = STATUS_CONFIG[key];

  return (
    <span
      className={`inline-grid grid-flow-col auto-cols-max items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold tracking-wide ${config.pillClassName}`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${config.dotClassName}`}
        aria-hidden="true"
      />
      <span className="whitespace-nowrap">{config.label}</span>
    </span>
  );
};

const TicketListItem = ({ ticket }: Props) => {
  const [openTicketDetailsModal, setOpenTicketDetailsModal] = useState(false);

  const handleOpenTicketDetailsModal = () => {
    setOpenTicketDetailsModal(true);
  };

  const handleCloseTicketDetailsModal = () => {
    setOpenTicketDetailsModal(false);
  };

  const requestedOn = formatRequestedAt(ticket.requested_at);

  return (
    <>
      <li
        onClick={handleOpenTicketDetailsModal}
        className="cursor-pointer py-8 md:py-3.5 grid gap-3 md:gap-4 md:grid-cols-[minmax(0,0.6fr)_minmax(0,1.6fr)_minmax(0,2.1fr)_minmax(0,1.2fr)] md:rounded-lg md:px-2 md:hover:bg-slate-50/80 md:transition-colors"
      >
        {/* Ticket ID + requested date (mobile also shows status here) */}
        <section className="grid gap-1 md:gap-1.5">
          <div className="flex justify-between items-center gap-2 md:block">
            <div>
              <p className="md:hidden text-[11px] font-semibold uppercase tracking-wide text-gray-500">
                Ticket ID
              </p>
              <p className="text-sm md:text-base font-semibold text-gray-900 tabular-nums">
                #{ticket.id}
              </p>
            </div>

            <div className="md:hidden justify-self-end">
              <StatusPill status={ticket.status} />
            </div>
          </div>

          {requestedOn && (
            <p className="text-[11px] text-gray-500 font-medium">
              {requestedOn}
            </p>
          )}
        </section>

        {/* Customer */}
        <section className="grid gap-0.5">
          <p className="md:hidden text-[11px] font-semibold uppercase tracking-wide text-gray-500">
            Customer
          </p>
          <p className="text-sm font-semibold text-gray-900">
            {ticket.customer.full_name}
          </p>
          <a
            href={`tel:${ticket.customer.phone}`}
            className="text-xs font-medium text-sky-700 hover:text-sky-800 underline-offset-2 hover:underline"
          >
            {ticket.customer.phone}
          </a>
        </section>

        {/* Service */}
        <section className="grid gap-0.5">
          <p className="md:hidden text-[11px] font-semibold uppercase tracking-wide text-gray-500">
            Service
          </p>
          <p className="text-sm font-semibold text-gray-900">
            {ticket.service_type.name}
          </p>
          {ticket.service_type.description && (
            <p className="text-xs font-medium text-slate-600 line-clamp-2 md:max-w-xl">
              {ticket.description}
            </p>
          )}
        </section>

        {/* Status (desktop only, pill moves to first column on mobile) */}
        <section className="hidden md:block">
          <StatusPill status={ticket.status} />
        </section>
      </li>

      <TicketDetailsModal
        ticket={ticket}
        open={openTicketDetailsModal}
        onClose={handleCloseTicketDetailsModal}
      />
    </>
  );
};

export default TicketListItem;
