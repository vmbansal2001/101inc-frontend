import ServiceType from "@/src/types/service-type/ServiceType";
import CarpenterImage from "../assets/carpenter.png";
import ElectricianImage from "../assets/electrician.png";
import PlumberImage from "../assets/plumber.png";
import ConstructionImage from "../assets/construction.png";
import HandymanImage from "../assets/handyman.png";
import Image from "next/image";
import { useState } from "react";
import HomeServiceBookingModal from "./home-service-booking-modal/home-service-booking-modal";

type Props = {
  serviceType: ServiceType;
};

const HomeServiceCard = ({ serviceType }: Props) => {
  const renderServiceImage = (serviceId: number) => {
    switch (serviceId) {
      case 3:
        return PlumberImage;
      case 4:
        return ElectricianImage;
      case 5:
        return CarpenterImage;
      case 6:
        return ConstructionImage;
      default:
        return HandymanImage;
    }
  };

  const [bookingModalOpen, setBookingModalOpen] = useState(false);

  const handleBookingModalOpen = () => {
    setBookingModalOpen(true);
  };

  return (
    <>
      <button
        className="border rounded-lg transition-all hover:-translate-y-1 duration-200 cursor-pointer hover:shadow-sm overflow-hidden border-gray-200 w-full text-left"
        onClick={handleBookingModalOpen}
      >
        <div className="p-5 bg-[#f5f5f5] flex items-center justify-center">
          <Image
            src={renderServiceImage(serviceType.id).src}
            alt={serviceType.name}
            width={100}
            height={100}
          />
        </div>

        <div className="p-5">
          <h3 className="text-lg font-semibold text-gray-900 tracking-tight">
            {serviceType.name}
          </h3>
          <p className="text-sm text-gray-500">{serviceType.description}</p>
        </div>
      </button>

      <HomeServiceBookingModal
        open={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        serviceType={serviceType}
      />
    </>
  );
};

export default HomeServiceCard;
