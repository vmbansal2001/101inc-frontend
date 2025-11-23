import { useGetServiceTypesQuery } from "@/src/services/service-types/service-types.query";
import AutoServiceCard from "./auto-service-card";

const AutoServicesContainer = () => {
  const { data: serviceTypes } = useGetServiceTypesQuery();
  const autoServiceTypes = serviceTypes?.filter(
    (serviceType) => serviceType.category_id === 1
  );

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-900 tracking-tight">
        Auto Services
      </h2>
      <p className="text-sm text-gray-600 font-medium">
        Bike and Car Repair Services
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-4">
        {autoServiceTypes?.map((serviceType) => (
          <AutoServiceCard key={serviceType.id} serviceType={serviceType} />
        ))}
      </div>
    </div>
  );
};

export default AutoServicesContainer;
