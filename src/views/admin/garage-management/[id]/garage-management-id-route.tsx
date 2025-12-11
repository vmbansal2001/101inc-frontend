"use client";

import AdminNavbar from "@/src/components/navbar/admin-navbar";
import ExistingInventoryStock from "./existing-inventory-stock/existing-inventory-stock";
import { useGetInventoryGarageByIdQuery } from "@/src/services/inventory/inventory.query";
import AddNewInventoryStock from "./add-new-inventory-stock/add-new-inventory-stock";

type Props = {
  garageId: string;
};

const GarageManagementIdRoute = ({ garageId }: Props) => {
  const { data: inventoryGarage } = useGetInventoryGarageByIdQuery({
    garageId: Number(garageId),
  });

  const garageType =
    inventoryGarage?.type === "Public"
      ? "Public Garage"
      : "Independent Operator";

  return (
    <main>
      <AdminNavbar />
      <div className="common-frame-box py-10 space-y-10 h-full">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
            {inventoryGarage?.name}
          </h1>
          <p className="text-gray-600 font-medium">{garageType}</p>
        </div>

        {inventoryGarage?.inventory && (
          <ExistingInventoryStock
            inventory={inventoryGarage.inventory}
            garageId={Number(garageId)}
          />
        )}

        <AddNewInventoryStock
          garageId={Number(garageId)}
          existingInventory={inventoryGarage?.inventory || []}
        />
      </div>
    </main>
  );
};

export default GarageManagementIdRoute;
