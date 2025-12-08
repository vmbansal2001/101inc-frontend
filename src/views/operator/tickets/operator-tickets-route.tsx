"use client";

import OperatorNavbar from "@/src/components/navbar/operator-navbar";
import OperatorTicketsContainer from "./operator-tickets-container/operator-tickets-container";

const OperatorTicketsRoute = () => {
  return (
    <main>
      <OperatorNavbar />
      <div className="common-frame-box py-10 space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
            Ticket Management
          </h1>
          <p className="text-gray-600 font-medium">
            Monitor and manage all service tickets.
          </p>
        </div>

        <OperatorTicketsContainer />
      </div>
    </main>
  );
};

export default OperatorTicketsRoute;
