import { inventoryItemTransformer } from "../inventory-item/inventory-item.transformer";
import Inventory from "./Inventory";

const inventoryTransformer = (inventory: any): Inventory => {
  const mappedInventory: Inventory = {
    id: inventory.id,
    item_id: inventory.item_id,
    garage_id: inventory.garage_id,
    operator_user_id: inventory.operator_user_id,
    quantity: inventory.quantity,
    minimum_quantity: inventory.minimum_quantity,
    maximum_quantity: inventory.maximum_quantity,
    item: inventory.item ? inventoryItemTransformer(inventory.item) : undefined,
  };

  return mappedInventory;
};

const inventoriesTransformer = (inventories: any): Inventory[] => {
  return inventories.map((inventory: any) => inventoryTransformer(inventory));
};

export { inventoryTransformer, inventoriesTransformer };
