"use client";

import AdminNavbar from "@/src/components/navbar/admin-navbar";
import useUserData from "@/src/components/use-user-data/use-user-data";
import AdminTicketsContainer from "./admin-tickets-container/admin-tickets-container";

const AdminTicketsRoute = () => {
  const { userData } = useUserData();

  if (userData.role !== "ADMIN") {
    return (
      <div className="flex justify-center items-center h-screen">
        You are not authorized to access this page
      </div>
    );
  }

  return (
    <div>
      <AdminNavbar />
      <div className="common-frame-box py-10 space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
            Ticket Management
          </h1>
          <p className="text-gray-600 font-medium">
            Monitor and manage all service tickets.
          </p>
        </div>

        <AdminTicketsContainer />
      </div>
    </div>
  );
};

export default AdminTicketsRoute;
