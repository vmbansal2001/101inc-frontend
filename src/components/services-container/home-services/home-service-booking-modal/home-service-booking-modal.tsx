import SheetModal from "@/src/components/modals/sheet-modal";
import ServiceType from "@/src/types/service-type/ServiceType";
import dynamic from "next/dynamic";

const HomeServiceBookingModalContainer = dynamic(
  () => import("./home-service-booking-modal-container"),
  {
    ssr: false,
  }
);

type Props = {
  open: boolean;
  onClose: () => void;
  serviceType: ServiceType;
};

const HomeServiceBookingModal = ({ open, onClose, serviceType }: Props) => {
  return (
    <SheetModal open={open} handleClose={onClose}>
      <HomeServiceBookingModalContainer
        serviceType={serviceType}
        handleClose={onClose}
      />
    </SheetModal>
  );
};

export default HomeServiceBookingModal;
