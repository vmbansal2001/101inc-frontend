import InventoryGarage from "./InventoryGarage";

const inventoryGaragesTransformer = (
  inventoryGarages: any
): InventoryGarage[] => {
  return inventoryGarages.map((inventoryGarage: any) =>
    inventoryGarageTransformer(inventoryGarage)
  );
};

const inventoryGarageTransformer = (inventoryGarage: any): InventoryGarage => {
  const mappedInventoryGarage: InventoryGarage = {
    id: inventoryGarage.id,
    name: inventoryGarage.name,
    phone: inventoryGarage.phone,
    type: inventoryGarage.type,
  };

  return mappedInventoryGarage;
};

export { inventoryGaragesTransformer, inventoryGarageTransformer };
