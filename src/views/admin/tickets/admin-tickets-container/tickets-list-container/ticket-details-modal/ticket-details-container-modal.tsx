import Ticket from "@/src/types/ticket/Ticket";
import React from "react";
import AlreadyAssignedMechanic from "./already-assigned-mechanic";
import AssignNewMechanic from "./assign-new-mechanic";

type Props = {
  ticket: Ticket;
  onClose: () => void;
};

const TicketDetailsContainerModal = ({ ticket, onClose }: Props) => {
  return (
    <div className="bg-white rounded-lg p-4 space-y-6">
      <div className="flex gap-2 md:flex-row flex-col justify-between items-center">
        <div>
          <p className="text-lg font-semibold">Ticket Details</p>
          <p className="text-sm text-gray-500">
            #{ticket.id} - {ticket.ticket_code}
          </p>
        </div>

        <div className="border rounded-md py-0.5 px-2 text-xs text-red-700 border-red-700 h-fit bg-red-50 font-medium">
          {ticket.status}
        </div>
      </div>

      <div className="flex gap-2">
        <div className="md:w-1/2 w-full">
          <p className="text-sm text-gray-500">Service Type</p>
          <p className="text-sm font-medium">{ticket.service_type.name}</p>
        </div>

        <div className="md:w-1/2 w-full">
          <p className="text-sm text-gray-500">Created At</p>
          <p className="text-sm font-medium">
            {new Date(ticket.requested_at).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            })}
          </p>
        </div>
      </div>

      <div className="flex gap-2 md:flex-row flex-col">
        <div className="md:w-1/2 w-full">
          <p className="text-sm text-gray-500">Customer Name</p>
          <p className="text-sm font-medium">{ticket.customer.full_name}</p>
        </div>

        <div className="md:w-1/2 w-full">
          <p className="text-sm text-gray-500">Customer Phone</p>
          <p className="text-sm font-medium">{ticket.customer.phone}</p>
        </div>
      </div>

      <div className="md:flex-row flex-col">
        <p className="text-sm text-gray-500">Description</p>
        <p className="text-sm font-medium whitespace-pre-wrap">
          {ticket.description}
        </p>
      </div>

      {ticket.estimates.length > 0 && (
        <div>
          <p className="text-sm text-gray-500">Estimate</p>
          {ticket.estimates.map((estimate, index) => (
            <p className="text-sm font-medium" key={index}>
              {estimate.currency} {estimate.amount}
            </p>
          ))}
        </div>
      )}

      {ticket.assignments.length > 0 ? (
        ticket.assignments.map((assignment, index) => (
          <AlreadyAssignedMechanic
            key={index}
            mechanicAssignment={assignment}
          />
        ))
      ) : (
        <AssignNewMechanic ticket={ticket} handleSuccess={onClose} />
      )}
    </div>
  );
};

export default TicketDetailsContainerModal;
