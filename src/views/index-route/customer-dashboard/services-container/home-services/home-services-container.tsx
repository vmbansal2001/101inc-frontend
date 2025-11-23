import { useGetServiceTypesQuery } from "@/src/services/service-types/service-types.query";
import HomeServiceCard from "./home-service-card";

const HomeServicesContainer = () => {
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
          <HomeServiceCard key={serviceType.id} serviceType={serviceType} />
        ))}
      </div>
    </div>
  );
};

export default HomeServicesContainer;
