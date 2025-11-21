import SheetModal from "@/src/components/modals/sheet-modal";
import ServiceType from "@/src/types/service-type/ServiceType";
import AutoServiceBookingModalContainer from "./auto-service-booking-modal-container";

type Props = {
  open: boolean;
  onClose: () => void;
  serviceType: ServiceType;
};

const AutoServiceBookingModal = ({ open, onClose, serviceType }: Props) => {
  return (
    <SheetModal open={open} handleClose={onClose}>
      <AutoServiceBookingModalContainer
        serviceType={serviceType}
        handleClose={onClose}
      />
    </SheetModal>
  );
};
export default AutoServiceBookingModal;
