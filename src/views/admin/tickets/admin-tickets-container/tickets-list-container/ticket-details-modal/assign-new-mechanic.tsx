import Button from "@/src/components/buttons/common-button";
import { usePostMechanicAssignmentMutation } from "@/src/services/mechanic-assignment/mechanic-assignment.query";
import { useGetMechanicUsersQuery } from "@/src/services/users/users.query";
import Ticket from "@/src/types/ticket/Ticket";
import { useState } from "react";
import { toast } from "react-hot-toast";

type Props = {
  ticket: Ticket;
  handleSuccess: () => void;
};

const AssignNewMechanic = ({ ticket, handleSuccess }: Props) => {
  const {
    data: mechanicUsers,
    isLoading,
    isError,
  } = useGetMechanicUsersQuery();

  const [selectedMechanicId, setSelectedMechanicId] = useState<number | null>(
    null
  );

  const [buttonLoading, setButtonLoading] = useState(false);

  const handleSelectMechanic = (mechanicId: number) => {
    setSelectedMechanicId(mechanicId);
  };

  const selectedMechanic =
    selectedMechanicId != null
      ? mechanicUsers?.find((user) => user.id === selectedMechanicId)
      : null;

  const [postMechanicAssignment] = usePostMechanicAssignmentMutation();

  const handleAssignMechanic = async () => {
    if (!selectedMechanicId) {
      toast.error("Please select a mechanic to assign");
      return;
    }

    setButtonLoading(true);

    const payloadBody = {
      mechanic_user_id: selectedMechanicId,
      ticket_id: ticket.id,
    };

    const postMechanicAssignmentPromise = postMechanicAssignment({
      body: payloadBody,
    });

    toast.promise(postMechanicAssignmentPromise, {
      loading: "Assigning mechanic...",
      success: "Mechanic assigned successfully",
      error: "Failed to assign mechanic",
    });

    await postMechanicAssignmentPromise;

    handleSuccess();
  };

  return (
    <section className="border rounded-lg px-3 py-3.5 bg-gray-50 space-y-3">
      <header className="flex items-baseline justify-between gap-2">
        <div>
          <p className="text-sm font-semibold text-gray-900">
            Assign a mechanic
          </p>
          <p className="text-xs text-gray-500">
            Choose a mechanic to handle ticket #{ticket.ticket_code}.
          </p>
        </div>
      </header>

      {isLoading && (
        <p className="text-xs text-gray-500">Loading available mechanics…</p>
      )}

      {isError && (
        <p className="text-xs text-red-600">
          Could not load mechanics. Please try again in a moment.
        </p>
      )}

      {!isLoading && !isError && (
        <>
          {(!mechanicUsers || mechanicUsers.length === 0) && (
            <p className="text-xs text-gray-500">
              There are no active mechanics available to assign right now.
            </p>
          )}

          {mechanicUsers && mechanicUsers.length > 0 && (
            <div className="space-y-2">
              <label className="block text-xs font-medium text-gray-700">
                Select mechanic
              </label>

              <select
                className="block w-full rounded-md border border-gray-300 bg-white py-1.5 px-2 text-sm text-gray-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                value={selectedMechanicId ?? ""}
                onChange={(event) => {
                  const value = event.target.value;
                  if (!value) {
                    setSelectedMechanicId(null);
                    return;
                  }
                  const mechanicId = Number(value);
                  if (!Number.isNaN(mechanicId)) {
                    handleSelectMechanic(mechanicId);
                  }
                }}
              >
                <option value="">Choose a mechanic…</option>
                {mechanicUsers.map((mechanic) => (
                  <option key={mechanic.id} value={mechanic.id}>
                    {mechanic.full_name} ({mechanic.phone})
                  </option>
                ))}
              </select>

              {selectedMechanic && (
                <div className="mt-1 rounded-md border border-gray-200 bg-white px-2 py-1.5 text-xs text-gray-700">
                  <p className="font-semibold text-gray-900">
                    {selectedMechanic.full_name}
                  </p>
                  <p className="text-gray-600">📞 {selectedMechanic.phone}</p>
                </div>
              )}
            </div>
          )}
        </>
      )}

      <Button
        loading={buttonLoading}
        loaderColor="#fff"
        className="w-full rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        onClick={handleAssignMechanic}
      >
        Assign Mechanic
      </Button>
    </section>
  );
};

export default AssignNewMechanic;
