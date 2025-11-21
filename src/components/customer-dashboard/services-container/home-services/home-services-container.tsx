import { useGetServiceTypesQuery } from "@/src/services/service-types/service-types.query";
import CarpenterImage from "../assets/carpenter.png";
import ElectricianImage from "../assets/electrician.png";
import PlumberImage from "../assets/plumber.png";
import ConstructionImage from "../assets/construction.png";
import HandymanImage from "../assets/handyman.png";
import Image from "next/image";

const HomeServicesContainer = () => {
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

  const { data: serviceTypes } = useGetServiceTypesQuery();
  const homeServiceTypes = serviceTypes?.filter(
    (serviceType) => serviceType.category_id === 2
  );

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-900 tracking-tight">
        Home Services
      </h2>
      <p className="text-sm text-gray-600 font-medium">
        Professional Home Repair Services
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-4">
        {homeServiceTypes?.map((serviceType) => (
          <div
            key={serviceType.id}
            className="border rounded-lg transition-all hover:-translate-y-1 duration-200 cursor-pointer hover:shadow-sm overflow-hidden border-gray-200"
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
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeServicesContainer;
