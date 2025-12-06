"use client";

import OperatorNavbar from "@/src/components/navbar/operator-navbar";
import useUserData from "@/src/components/use-user-data/use-user-data";
import OperatorTicketsContainer from "./operator-tickets-container/operator-tickets-container";

const OperatorTicketsRoute = () => {
  const { userData } = useUserData();

  if (userData.role !== "OPERATOR") {
    return (
      <div className="flex justify-center items-center h-screen">
        You are not authorized to access this page
      </div>
    );
  }

  return (
    <div>
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
    </div>
  );
};

export default OperatorTicketsRoute;
