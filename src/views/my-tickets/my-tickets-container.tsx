import useUserData from "@/src/components/use-user-data/use-user-data";
import { useGetMechanicAssignmentsByUserIdQuery } from "@/src/services/mechanic-assignment/mechanic-assignment.query";
import React from "react";
import MechanicTicketCard from "./mechanic-ticket-card";

const MyTicketsContainer = () => {
  const { userData } = useUserData();
  const { data: mechanicAssignments } = useGetMechanicAssignmentsByUserIdQuery({
    user_id: userData.id,
  });

  const sortedMechanicAssignments =
    mechanicAssignments?.toSorted((a, b) => {
      return b.id - a.id;
    }) || [];

  return (
    <div className="common-frame-box py-10 space-y-10">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
          Assigned Jobs
        </h1>
        <p className="text-gray-600 font-medium">
          Track your assigned jobs here.
        </p>
      </div>

      <div className="space-y-3">
        {sortedMechanicAssignments.length === 0 ? (
          <p className="text-sm text-gray-500">
            You don&apos;t have any assigned jobs yet.
          </p>
        ) : (
          sortedMechanicAssignments.map((mechanicAssignment) => (
            <MechanicTicketCard
              key={mechanicAssignment.id}
              mechanicAssignment={mechanicAssignment}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default MyTicketsContainer;
