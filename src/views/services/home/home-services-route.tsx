"use client";

import CustomerNavbar from "@/src/components/navbar/customer-navbar";
import HomeServicesContainer from "@/src/components/services-container/home-services/home-services-container";

const HomeServicesRoute = () => {
  return (
    <main>
      <CustomerNavbar />
      <HomeServicesContainer />
    </main>
  );
};

export default HomeServicesRoute;
