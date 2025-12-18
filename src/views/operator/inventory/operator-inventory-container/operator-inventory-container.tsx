import { useGetInventoryGarageByIdQuery } from "@/src/services/inventory/inventory.query";
import OperatorInventoryStock from "./operator-inventory-stock";
import useUserData from "@/src/components/use-user-data/use-user-data";

const OperatorInventoryContainer = () => {
  const { userData } = useUserData();
  const garageId = userData.garage_users?.[0]?.garage_id;

  const { data: inventoryGarage, isLoading } = useGetInventoryGarageByIdQuery(
    {
      garageId: garageId || 0,
    },
    { skip: !garageId }
  );

  if (!garageId) {
    return (
      <div className="text-center text-gray-500">
        No garage found, please contact the administrator to create your garage.
      </div>
    );
  }

  if (isLoading) {
    return <div className="text-center text-gray-500">Loading...</div>;
  }

  return (
    <div>
      {inventoryGarage?.inventory ? (
        <OperatorInventoryStock
          inventory={inventoryGarage.inventory}
          garageId={inventoryGarage.id}
        />
      ) : (
        <div className="text-center text-gray-500">
          No inventory exists, please contact the administrator to create your
          inventory.
        </div>
      )}
    </div>
  );
};

export default OperatorInventoryContainer;
