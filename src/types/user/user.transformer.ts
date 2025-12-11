import User from "./User";

/* eslint-disable @typescript-eslint/no-explicit-any */
const usersTransformer = (users: any): User[] => {
  return users.map((user: any) => userTransformer(user));
};

/* eslint-disable @typescript-eslint/no-explicit-any */
const userTransformer = (user: any): User => {
  return {
    id: user.id,
    full_name: user.full_name || "",
    phone: user.phone || "",
    email: user.email || "",
    role: user.role || "",
    service_type_ids: user.service_type_ids || [],
    mechanic_services: user.mechanic_services || [],
    garage_users:
      user?.garage_users?.map((garage_user: any) => ({
        user_id: garage_user.user_id,
        id: garage_user.id,
        garage_id: garage_user.garage_id,
      })) || undefined,
  };
};

export { userTransformer, usersTransformer };
