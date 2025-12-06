import Button from "@/src/components/buttons/common-button";
import { usePatchTicketByIdMutation } from "@/src/services/tickets/tickets.query";
import Ticket from "@/src/types/ticket/Ticket";
import { InfoIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import toast from "react-hot-toast";

type Props = {
  ticket: Ticket;
};

const TicketCompletionCard = ({ ticket }: Props) => {
  const t = useTranslations("mechanicTicketId");
  const [patchTicketById] = usePatchTicketByIdMutation();

  const [buttonLoading, setButtonLoading] = useState(false);

  const handleMarkAsComplete = async () => {
    setButtonLoading(true);
    const payload = {
      ticket_id: ticket.id,
      body: {
        status: "COMPLETED",
        payment_id: ticket.payments[0].id,
      },
    };

    const patchTicketByIdPromise = patchTicketById(payload);

    toast.promise(patchTicketByIdPromise, {
      loading: "Marking ticket as complete...",
      success: "Ticket marked as complete",
      error: "Failed to mark ticket as complete",
    });

    await patchTicketByIdPromise;
  };

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-3 shadow-[0_10px_30px_rgba(15,23,42,0.06)] md:p-5 space-y-5">
      <div className="flex flex-col md:flex-row items-start md:gap-3 gap-2">
        <div className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 ring-1 ring-emerald-100">
          <span className="text-lg leading-none">✓</span>
        </div>

        <div className="space-y-1">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-emerald-600">
            {t("ticketCompletion")}
          </p>
          <p className="text-sm font-semibold text-gray-900">
            {t("markAsCompleteDescription")}
          </p>
        </div>
      </div>

      <div className="rounded-xl flex md:items-center border border-dashed border-gray-200 bg-gray-50 px-3 py-2.5">
        <InfoIcon className="min-w-[16px] min-h-[16px] md:mt-0 mt-1 w-4 h-4 text-gray-500 mr-2" />
        <p className="text-xs leading-relaxed text-gray-600">
          {t("noticePaymentReceived")}
        </p>
      </div>

      <div className="w-full space-y-3">
        <Button
          loading={buttonLoading}
          loaderColor="#fff"
          onClick={handleMarkAsComplete}
          className="inline-flex w-full items-center justify-center rounded-md bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
        >
          {t("markAsComplete")}
        </Button>

        <p className="text-[11px] text-gray-500">
          {t("thisActionCannotBeUndone")}
        </p>
      </div>
    </div>
  );
};

export default TicketCompletionCard;
