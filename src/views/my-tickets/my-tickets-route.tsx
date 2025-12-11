"use client";

import MechanicNavbar from "@/src/components/navbar/mechanic-navbar";
import MyTicketsContainer from "./my-tickets-container";

const MyTicketsRoute = () => {
  return (
    <main>
      <MechanicNavbar />
      <MyTicketsContainer />
    </main>
  );
};

export default MyTicketsRoute;
