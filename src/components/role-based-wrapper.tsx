"use client";

import React, { useEffect } from "react";
import useUserData from "./use-user-data/use-user-data";
import { useRouter } from "@/navigation";

type Props = {
  children: React.ReactNode;
  allowedRoles: UserRole[];
};

const RoleBasedWrapper = ({ children, allowedRoles }: Props) => {
  const { userData } = useUserData();
  const router = useRouter();

  useEffect(() => {
    if (!allowedRoles.includes(userData.role as UserRole)) {
      router.replace("/");
    }
  }, [userData.role, allowedRoles]);

  if (!allowedRoles.includes(userData.role as UserRole)) {
    return <div>You are not authorized to access this page</div>;
  }

  return children;
};

export default RoleBasedWrapper;
