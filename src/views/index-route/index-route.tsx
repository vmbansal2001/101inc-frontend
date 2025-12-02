"use client";

import { useEffect } from "react";
import { useRouter } from "@/navigation";

import CustomerDashboard from "@/src/views/index-route/customer-dashboard/customer-dashboard";
import useUserData from "@/src/components/use-user-data/use-user-data";

const IndexRoute = () => {
  const { userData } = useUserData();
  const router = useRouter();

  useEffect(() => {
    if (userData.role === "ADMIN") {
      router.replace("/admin/tickets");
    }

    if (userData.role === "MECHANIC") {
      router.replace("/my-tickets");
    }
  }, [userData.role, router]);

  if (userData.role === "MECHANIC") {
    return null;
  }

  if (userData.role === "CUSTOMER") {
    return <CustomerDashboard />;
  }

  if (userData.role === "ADMIN") {
    return null;
  }

  return (
    <div className="flex justify-center items-center h-screen">
      INVALID USER
    </div>
  );
};

export default IndexRoute;
