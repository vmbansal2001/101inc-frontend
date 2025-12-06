"use client";

import CustomerNavbar from "@/src/components/navbar/customer-navbar";
import HomeServicesContainer from "@/src/components/services-container/home-services/home-services-container";
import useUserData from "@/src/components/use-user-data/use-user-data";
import { useRouter } from "@/navigation";
import { useEffect } from "react";

const HomeServicesRoute = () => {
  const { userData } = useUserData();
  const router = useRouter();

  useEffect(() => {
    if (userData.role === "OPERATOR") {
      router.replace("/operator/tickets");
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
        <HomeServicesContainer />
      </div>
    </main>
  );
};

export default HomeServicesRoute;
