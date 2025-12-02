import { useGetTicketByIdQuery } from "@/src/services/tickets/tickets.query";
import CustomerDetailsCard from "./customer-details-card";
import ServiceDetailsCard from "./service-details-card/service-details-card";
import TicketCompletionCard from "./ticket-completion-card";
import { useTranslations } from "next-intl";

type Props = {
  id: string;
};

const MyTicketsIdContainer = ({ id }: Props) => {
  const { data: ticket } = useGetTicketByIdQuery({ ticket_id: Number(id) });
  const t = useTranslations("mechanicTicketId");

  return (
    <div className="common-frame-box py-10 space-y-10">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
          {t("title")}
        </h1>
        <p className="text-gray-600 font-medium">#{ticket?.ticket_code}</p>
      </div>

      {ticket && <CustomerDetailsCard customer={ticket.customer} />}
      {ticket && <ServiceDetailsCard ticket={ticket} />}
      {ticket && ticket.status === "WORK_IN_PROGRESS" && (
        <TicketCompletionCard ticket={ticket} />
      )}
    </div>
  );
};

export default MyTicketsIdContainer;
