import MechanicAssignment from "./MechanicAssignment";

/* eslint-disable @typescript-eslint/no-explicit-any */
const mechanicAssignmentsTransformer = (
  mechanicAssignments: any[]
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
  };
};

export { mechanicAssignmentTransformer, mechanicAssignmentsTransformer };
