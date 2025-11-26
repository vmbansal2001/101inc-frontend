"use client";

import MechanicNavbar from "@/src/components/navbar/mechanic-navbar";
import useUserData from "@/src/components/use-user-data/use-user-data";
import MyTicketsContainer from "./my-tickets-container";

const MyTicketsRoute = () => {
  const { userData } = useUserData();

  if (userData.role !== "MECHANIC") {
    return (
      <div className="flex justify-center items-center h-screen">
        You are not authorized to access this page
      </div>
    );
  }

  return (
    <main>
      <MechanicNavbar />
      <MyTicketsContainer />
    </main>
  );
};

export default MyTicketsRoute;
