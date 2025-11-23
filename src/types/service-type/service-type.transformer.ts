import ServiceType from "./ServiceType";

/* eslint-disable @typescript-eslint/no-explicit-any */
const serviceTypeTransformer = (serviceTypes: any): ServiceType[] => {
  return serviceTypes.map((serviceType: any) => ({
    id: serviceType.id,
    category_id: serviceType.category_id,
    name: serviceType.name,
    description: serviceType.description,
  }));
};

export default serviceTypeTransformer;
