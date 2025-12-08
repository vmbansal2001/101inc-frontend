"use client";

import { useEffect } from "react";
import { useRouter } from "@/navigation";
import useUserData from "@/src/components/use-user-data/use-user-data";

const IndexRoute = () => {
  const { userData } = useUserData();
  const router = useRouter();

  useEffect(() => {
    if (userData.role === "OPERATOR") {
      router.replace("/operator/tickets");
    }

    if (userData.role === "MECHANIC") {
      router.replace("/my-tickets");
    }

    if (userData.role === "ADMIN") {
      router.replace("/admin");
    }

    if (userData.role === "CUSTOMER") {
      router.replace("/customer-dashboard");
    }
  }, [userData.role, router]);

  return null;
};

export default IndexRoute;
