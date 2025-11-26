import ServiceType from "@/src/types/service-type/ServiceType";
import Image from "next/image";

import CarImage from "../assets/car.png";
import MotorbikeImage from "../assets/motorbike.png";
import { useState } from "react";
import AutoServiceBookingModal from "./auto-service-booking-modal/auto-service-booking-modal";

type Props = {
  serviceType: ServiceType;
};

const AutoServiceCard = ({ serviceType }: Props) => {
  const [bookingModalOpen, setBookingModalOpen] = useState(false);

  const handleBookingModalOpen = () => {
    setBookingModalOpen(true);
  };

  const renderServiceImage = (serviceId: number) => {
    switch (serviceId) {
      case 1:
        return MotorbikeImage;
      default:
        return CarImage;
    }
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

      <AutoServiceBookingModal
        open={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        serviceType={serviceType}
      />
    </>
  );
};

export default AutoServiceCard;
