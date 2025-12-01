"use client";

import CustomerNavbar from "@/src/components/navbar/customer-navbar";
import AutoServicesContainer from "@/src/components/services-container/auto-services/auto-services-container";
import useUserData from "@/src/components/use-user-data/use-user-data";
import { useRouter } from "@/navigation";
import { useEffect } from "react";

const AutoServicesRoute = () => {
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

  if (userData.role !== "CUSTOMER") {
    return null;
  }

  return (
    <main className="flex flex-col">
      <CustomerNavbar />

      <div className="common-frame-box py-10 space-y-10 h-full">
        <AutoServicesContainer />
      </div>
    </main>
  );
};

export default AutoServicesRoute;
