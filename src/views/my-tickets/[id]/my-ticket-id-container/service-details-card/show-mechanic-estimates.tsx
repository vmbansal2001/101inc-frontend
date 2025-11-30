import Ticket from "@/src/types/ticket/Ticket";
import { useTranslations } from "next-intl";
import React from "react";

type Props = {
  ticket: Ticket;
};

const ShowMechanicEstimates = ({ ticket }: Props) => {
  const t = useTranslations("mechanicTicketId");
  const st = useTranslations("status");

  return (
    <div className="border w-full rounded-lg px-3 py-3.5 bg-gray-50 space-y-3 h-full">
      <header className="flex items-baseline justify-between gap-2">
        <div>
          <p className="text-sm font-semibold text-gray-900">
            {t("estimates")}
          </p>
          <p className="text-xs text-gray-500">{t("haveSharedEstimate")}</p>
        </div>
      </header>

      <ul className="space-y-2">
        {ticket.estimates.map((estimate) => (
          <li
            key={estimate.id}
            className="flex items-center justify-between rounded-md border border-gray-200 bg-white px-3 py-2"
          >
            <div>
              <p className="text-sm font-semibold text-gray-900">
                {estimate.currency} {estimate.amount.toLocaleString()}
              </p>
              <p className="text-xs text-gray-500">
                {t("estimate")} #{estimate.id}
              </p>
            </div>
            <span
              className={`inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium ring-1 ring-inset bg-blue-50 text-blue-700 ring-blue-600/20`}
            >
              {st(estimate.status)}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShowMechanicEstimates;
