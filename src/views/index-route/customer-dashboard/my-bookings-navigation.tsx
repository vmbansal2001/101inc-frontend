import { Link } from "@/navigation";
import { CalendarClock } from "lucide-react";

import useUserData from "@/src/components/use-user-data/use-user-data";
import { useGetTicketsByUserIdQuery } from "@/src/services/tickets/tickets.query";

const MyBookingsNavigation = () => {
  const { userData } = useUserData();
  const { data: tickets, isLoading } = useGetTicketsByUserIdQuery({
    user_id: userData.id,
  });

  if (!tickets || tickets.length === 0) {
    return null;
  }

  return (
    <section>
      <Link href="/my-bookings" className="group block">
        <article className="flex items-center justify-between rounded-2xl border border-blue-100 bg-blue-50/60 px-4 py-3 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-200 hover:bg-blue-50 hover:shadow-md sm:px-5 sm:py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm sm:h-11 sm:w-11">
              <CalendarClock size={20} strokeWidth={2.4} />
            </div>

            <div className="space-y-0.5">
              <p className="text-sm font-semibold text-gray-900 sm:text-[15px]">
                View my bookings
              </p>
              <p className="text-xs font-medium text-gray-600">
                {isLoading
                  ? "Loading your recent bookings..."
                  : "Check status, reschedule, or book again in a few taps."}
              </p>
            </div>
          </div>

          <div className="flex flex-col items-end gap-1 text-xs font-semibold text-blue-700">
            <span className="inline-flex items-center gap-1">
              Go to bookings
              <span
                aria-hidden="true"
                className="translate-x-0 transition group-hover:translate-x-0.5"
              >
                →
              </span>
            </span>

            {tickets && tickets.length > 0 && (
              <span className="rounded-full bg-white/80 px-2 py-0.5 text-[11px] font-semibold text-blue-700 shadow-sm">
                {tickets.length}{" "}
                {tickets.length === 1
                  ? "active or past booking"
                  : "active or past bookings"}
              </span>
            )}
          </div>
        </article>
      </Link>
    </section>
  );
};

export default MyBookingsNavigation;
