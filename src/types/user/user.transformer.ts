import User from "./User";

/* eslint-disable @typescript-eslint/no-explicit-any */
const userTransformer = (user: any): User => {
  return {
    id: user.id,
    full_name: user.full_name || "",
    phone: user.phone || "",
    email: user.email || "",
    role: user.role || "",
    service_type_ids: user.service_type_ids || [],
  };
};

export default userTransformer;
