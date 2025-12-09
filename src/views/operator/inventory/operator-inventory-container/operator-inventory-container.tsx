import { useGetInventoryGarageByIdQuery } from "@/src/services/inventory/inventory.query";
import OperatorInventoryStock from "./operator-inventory-stock";

const OperatorInventoryContainer = () => {
  const { data: inventoryGarage, isLoading } = useGetInventoryGarageByIdQuery({
    garageId: 1,
  });

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
