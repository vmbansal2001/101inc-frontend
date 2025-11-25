import SheetModal from "@/src/components/modals/sheet-modal";
import Ticket from "@/src/types/ticket/Ticket";
import dynamic from "next/dynamic";

const TicketDetailsContainerModal = dynamic(
  () => import("./ticket-details-container-modal"),
  {
    ssr: false,
  }
);

type Props = {
  ticket: Ticket;
  open: boolean;
  onClose: () => void;
};

const TicketDetailsModal = ({ ticket, open, onClose }: Props) => {
  return (
    <SheetModal open={open} handleClose={onClose}>
      <TicketDetailsContainerModal ticket={ticket} onClose={onClose} />
    </SheetModal>
  );
};

export default TicketDetailsModal;
