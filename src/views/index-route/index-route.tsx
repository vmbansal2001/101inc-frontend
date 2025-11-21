"use client";

import CustomerDashboard from "@/src/components/customer-dashboard/customer-dashboard";
import useUserData from "@/src/components/use-user-data/use-user-data";

const IndexRoute = () => {
  const { userData } = useUserData();

  if (userData.role === "MECHANIC") {
    return (
      <div className="flex justify-center items-center h-screen">
        Mechanic Dashboard
      </div>
    );
  }

  if (userData.role === "CUSTOMER") {
    return <CustomerDashboard />;
  }

  if (userData.role === "ADMIN") {
    return (
      <div className="flex justify-center items-center h-screen">
        Admin Dashboard
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center h-screen">
      INVALID USER
    </div>
  );
};

export default IndexRoute;
