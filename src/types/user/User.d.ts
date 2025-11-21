type User = {
  id: number;
  full_name: string;
  phone: string;
  email: string;
  role: string;
  service_type_ids?: number[];
};

export default User;
