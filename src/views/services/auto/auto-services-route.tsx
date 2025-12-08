"use client";

import CustomerNavbar from "@/src/components/navbar/customer-navbar";
import AutoServicesContainer from "@/src/components/services-container/auto-services/auto-services-container";

const AutoServicesRoute = () => {
  return (
    <main>
      <CustomerNavbar />
      <AutoServicesContainer />
    </main>
  );
};

export default AutoServicesRoute;
