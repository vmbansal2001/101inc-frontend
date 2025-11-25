import { useGetMechanicUsersQuery } from "@/src/services/users/users.query";
import MechanicAssignment from "@/src/types/mechanic-assignment/MechanicAssignment";

type Props = {
  mechanicAssignment: MechanicAssignment;
};

const AlreadyAssignedMechanic = ({ mechanicAssignment }: Props) => {
  const { data: mechanicUsers } = useGetMechanicUsersQuery();

  const mechanic = mechanicUsers?.find(
    (user) => user.id === mechanicAssignment.mechanic_id
  );

  if (!mechanic) {
    return (
      <p className="font-bold text-red-500">
        Inactive Mechanic Assigned to this ticket.
      </p>
    );
  }

  return (
    <div className="flex gap-2 md:flex-row flex-col">
      <div className="md:w-1/2 w-full">
        <p className="text-sm text-gray-500">Mechanic Name</p>
        <p className="text-sm font-medium">{mechanic.full_name}</p>
      </div>

      <div className="md:w-1/2 w-full">
        <p className="text-sm text-gray-500">Mechanic Phone</p>
        <p className="text-sm font-medium">{mechanic.phone}</p>
      </div>
    </div>
  );
};

export default AlreadyAssignedMechanic;
