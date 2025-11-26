import ServiceType from "../service-type/ServiceType";

type User = {
  id: number;
  full_name: string;
  phone: string;
  email: string;
  role: string;
  service_type_ids?: number[];
  mechanic_services?: ServiceType[];
};

export default User;
