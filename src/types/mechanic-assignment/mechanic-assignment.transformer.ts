import MechanicAssignment from "./MechanicAssignment";

/* eslint-disable @typescript-eslint/no-explicit-any */
const mechanicAssignmentsTransformer = (
  mechanicAssignments: any
): MechanicAssignment[] => {
  return mechanicAssignments.map((mechanicAssignment: any) =>
    mechanicAssignmentTransformer(mechanicAssignment)
  );
};

const mechanicAssignmentTransformer = (
  mechanicAssignment: any
): MechanicAssignment => {
  return {
    id: mechanicAssignment.id,
    ticket_id: mechanicAssignment.ticket_id,
    mechanic_id: mechanicAssignment.mechanic_id,
    status: mechanicAssignment.status,
    ticket: {
      id: mechanicAssignment.ticket.id,
      ticket_code: mechanicAssignment.ticket.ticket_code,
      status: mechanicAssignment.ticket.status,
      service_type_id: mechanicAssignment.ticket.service_type_id,
      vehicle_id: mechanicAssignment.ticket.vehicle_id,
      customer_location_id: mechanicAssignment.ticket.customer_location_id,
      description: mechanicAssignment.ticket.description,
    },
  };
};

export { mechanicAssignmentTransformer, mechanicAssignmentsTransformer };
