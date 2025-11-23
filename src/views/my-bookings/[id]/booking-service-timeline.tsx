import Ticket from "@/src/types/ticket/Ticket";
import type { LucideIcon } from "lucide-react";
import {
  CheckCircle2,
  ClipboardList,
  IndianRupee,
  UserCheck,
  Wrench,
  XCircle,
} from "lucide-react";

type Props = {
  ticket: Ticket;
};

type TimelineStepId =
  | "REQUESTED"
  | "ASSIGNED"
  | "ESTIMATE_PROVIDED"
  | "WORK_IN_PROGRESS"
  | "COMPLETED"
  | "REJECTED";

type TimelineStep = {
  id: TimelineStepId;
  label: string;
  description: string;
  icon: LucideIcon;
};

const baseSteps: TimelineStep[] = [
  {
    id: "REQUESTED",
    label: "Requested",
    description:
      "We have received your request and are assigning a professional.",
    icon: ClipboardList,
  },
  {
    id: "ASSIGNED",
    label: "Assigned",
    description: "A professional has been assigned to your booking.",
    icon: UserCheck,
  },
  {
    id: "ESTIMATE_PROVIDED",
    label: "Estimate provided",
    description: "You will receive a cost estimate for the service.",
    icon: IndianRupee,
  },
  {
    id: "WORK_IN_PROGRESS",
    label: "Work in progress",
    description: "Your service is currently in progress.",
    icon: Wrench,
  },
  {
    id: "COMPLETED",
    label: "Completed",
    description: "The service has been completed.",
    icon: CheckCircle2,
  },
];

const rejectedStep: TimelineStep = {
  id: "REJECTED",
  label: "Rejected",
  description: "This booking was rejected after the estimate.",
  icon: XCircle,
};

const BookingServiceTimeline = ({ ticket }: Props) => {
  const ticketStatus = ticket?.status || "";
  const isRejected = ticketStatus === "REJECTED";

  // If rejected, show steps up to estimate + a final rejected step.
  const steps: TimelineStep[] = isRejected
    ? [...baseSteps.slice(0, 3), rejectedStep]
    : baseSteps;

  const currentIndex =
    steps.findIndex((step) => step.id === ticketStatus) ?? -1;

  return (
    <section className="border md:p-5 p-3 rounded-xl border-gray-200">
      <div className="flex md:flex-row flex-col-reverse items-baseline justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-gray-900 tracking-tight">
            Service timeline
          </h2>
          <p className="text-sm text-gray-600 font-medium">
            Track how your booking is progressing.
          </p>
        </div>

        <span className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-gray-700">
          <span className="h-2 w-2 rounded-full bg-emerald-500" />
          Status: {ticketStatus.replace(/_/g, " ")}
        </span>
      </div>

      <ol className="mt-6 space-y-4">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isCurrent = index === currentIndex;
          const isCompleted = currentIndex !== -1 && index < currentIndex;
          const isUpcoming =
            currentIndex === -1 || (!isCurrent && !isCompleted);

          const isError = step.id === "REJECTED" && isCurrent;

          const circleClasses = (() => {
            if (isError) {
              return "flex h-9 w-9 items-center justify-center rounded-full border-2 border-red-500 bg-red-50 text-red-600";
            }
            if (isCompleted || isCurrent) {
              return "flex h-9 w-9 items-center justify-center rounded-full border-2 border-emerald-500 bg-emerald-50 text-emerald-700";
            }
            return "flex h-9 w-9 items-center justify-center rounded-full border border-gray-300 bg-gray-50 text-gray-400";
          })();

          const lineClasses = (() => {
            if (isError) {
              return "w-px flex-1 bg-red-100";
            }
            if (isCompleted) {
              return "w-px flex-1 bg-emerald-100";
            }
            return "w-px flex-1 bg-gray-200";
          })();

          const titleClasses = (() => {
            if (isError) {
              return "text-sm font-semibold text-red-700";
            }
            if (isCompleted || isCurrent) {
              return "text-sm font-semibold text-gray-900";
            }
            return "text-sm font-semibold text-gray-400";
          })();

          const descriptionClasses = (() => {
            if (isError) {
              return "text-xs font-medium text-red-600";
            }
            if (isCompleted || isCurrent) {
              return "text-xs font-medium text-gray-600";
            }
            return "text-xs font-medium text-gray-400";
          })();

          return (
            <li key={step.id} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className={circleClasses}>
                  <Icon size={18} strokeWidth={2.4} />
                </div>
                {index < steps.length - 1 && (
                  <div className={lineClasses} aria-hidden="true" />
                )}
              </div>

              <div className="pt-1.5">
                <p className={titleClasses}>{step.label}</p>
                <p className={descriptionClasses}>{step.description}</p>
                {isCurrent && !isError && (
                  <p className="mt-1 inline-flex rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-emerald-700">
                    Current stage
                  </p>
                )}
                {isError && (
                  <p className="mt-1 inline-flex rounded-full bg-red-50 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-red-700">
                    Final status
                  </p>
                )}
                {isUpcoming && !isError && (
                  <p className="mt-1 text-[11px] font-semibold uppercase tracking-wide text-gray-400">
                    Upcoming
                  </p>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
};

export default BookingServiceTimeline;
