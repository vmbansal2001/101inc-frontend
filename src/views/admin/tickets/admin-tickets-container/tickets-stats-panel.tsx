import Ticket from "@/src/types/ticket/Ticket";
import {
  CheckCircle2,
  ClipboardList,
  IndianRupee,
  Ticket as TicketIcon,
  UserCheck,
  Wrench,
  XCircle,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

type TicketStatus =
  | "REQUESTED"
  | "ASSIGNED"
  | "ESTIMATE_PROVIDED"
  | "WORK_IN_PROGRESS"
  | "REJECTED"
  | "COMPLETED";

type Props = {
  tickets: Ticket[];
};

type StatId = "TOTAL" | TicketStatus;

type StatConfig = {
  id: StatId;
  label: string;
  description: string;
  accentClassNames: {
    pill: string;
    value: string;
  };
  icon: LucideIcon;
};

const STAT_CONFIGS: StatConfig[] = [
  {
    id: "TOTAL",
    label: "Total tickets",
    description: "All tickets in the system",
    accentClassNames: {
      pill: "bg-gray-50 text-gray-600",
      value: "text-gray-900",
    },
    icon: TicketIcon,
  },
  {
    id: "REQUESTED",
    label: "Requested",
    description: "New requests awaiting assignment",
    accentClassNames: {
      pill: "bg-sky-50 text-sky-700",
      value: "text-sky-700",
    },
    icon: ClipboardList,
  },
  {
    id: "ASSIGNED",
    label: "Assigned",
    description: "Tickets assigned to a professional",
    accentClassNames: {
      pill: "bg-indigo-50 text-indigo-700",
      value: "text-indigo-700",
    },
    icon: UserCheck,
  },
  {
    id: "ESTIMATE_PROVIDED",
    label: "Estimate provided",
    description: "Waiting for customer confirmation",
    accentClassNames: {
      pill: "bg-amber-50 text-amber-700",
      value: "text-amber-700",
    },
    icon: IndianRupee,
  },
  {
    id: "WORK_IN_PROGRESS",
    label: "Work in progress",
    description: "Services that are currently ongoing",
    accentClassNames: {
      pill: "bg-blue-50 text-blue-700",
      value: "text-blue-700",
    },
    icon: Wrench,
  },
  {
    id: "REJECTED",
    label: "Rejected",
    description: "Requests rejected after estimate",
    accentClassNames: {
      pill: "bg-red-50 text-red-700",
      value: "text-red-700",
    },
    icon: XCircle,
  },
  {
    id: "COMPLETED",
    label: "Completed",
    description: "Successfully completed services",
    accentClassNames: {
      pill: "bg-emerald-50 text-emerald-700",
      value: "text-emerald-700",
    },
    icon: CheckCircle2,
  },
];

const TicketsStatsPanel = ({ tickets }: Props) => {
  const totalTickets = tickets.length;

  const statusCounts: Record<TicketStatus, number> = {
    REQUESTED: 0,
    ASSIGNED: 0,
    ESTIMATE_PROVIDED: 0,
    WORK_IN_PROGRESS: 0,
    REJECTED: 0,
    COMPLETED: 0,
  };

  tickets.forEach((ticket) => {
    const status = ticket.status as TicketStatus | undefined;
    if (status && statusCounts[status] !== undefined) {
      statusCounts[status] += 1;
    }
  });

  const statsWithValues = STAT_CONFIGS.map((stat) => {
    if (stat.id === "TOTAL") {
      return {
        ...stat,
        value: totalTickets,
      };
    }

    return {
      ...stat,
      value: statusCounts[stat.id as TicketStatus] ?? 0,
    };
  });

  return (
    <section className="border md:p-5 p-4 rounded-xl border-gray-200 bg-white">
      <div className="flex flex-col gap-2 mb-4 sm:mb-6">
        <h2 className="text-xl font-semibold text-gray-900 tracking-tight">
          Tickets overview
        </h2>
        <p className="text-sm text-gray-600 font-medium">
          Monitor volume and progress across every ticket status.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statsWithValues.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.id}
              className="rounded-xl border border-gray-200 bg-white px-4 py-3 flex flex-col gap-3 shadow-sm hover:shadow-md transition-shadow duration-150"
            >
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-gray-500">
                    {stat.id === "TOTAL"
                      ? "Total"
                      : stat.id.replace(/_/g, " ").toLowerCase()}
                  </p>
                  <p className="text-sm font-semibold text-gray-900">
                    {stat.label}
                  </p>
                </div>

                <span
                  className={`inline-flex items-center justify-center rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide ${stat.accentClassNames.pill}`}
                >
                  <Icon size={16} strokeWidth={2.4} />
                </span>
              </div>

              <div className="flex items-baseline justify-between gap-2">
                <p
                  className={`text-2xl font-semibold tabular-nums ${stat.accentClassNames.value}`}
                >
                  {stat.value}
                </p>
                <p className="text-xs font-medium text-gray-500 max-w-40 text-right">
                  {stat.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default TicketsStatsPanel;
