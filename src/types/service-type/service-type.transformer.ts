import ServiceType from "./ServiceType";

/* eslint-disable @typescript-eslint/no-explicit-any */
const servicesTypeTransformer = (services: any): ServiceType[] => {
  return services.map((service: any) => serviceTypeTransformer(service));
};

/* eslint-disable @typescript-eslint/no-explicit-any */
const serviceTypeTransformer = (serviceTypes: any): ServiceType => {
  return {
    id: serviceTypes.id,
    category_id: serviceTypes.category_id,
    name: serviceTypes.name,
    description: serviceTypes.description,
  };
};

export { serviceTypeTransformer, servicesTypeTransformer };
