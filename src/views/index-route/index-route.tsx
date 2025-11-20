"use client";

import useUserData from "@/src/components/use-user-data/use-user-data";
import React from "react";

type Props = {};

const IndexRoute = (props: Props) => {
  const { userData } = useUserData();

  if (userData.role === "MECHANIC") {
    return (
      <div className="flex justify-center items-center h-screen">
        Mechanic Dashboard
      </div>
    );
  }

  if (userData.role === "CUSTOMER") {
    return (
      <div className="flex justify-center items-center h-screen">
        Customer Dashboard
      </div>
    );
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
