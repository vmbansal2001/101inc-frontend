import InventoryItem from "../inventory-item/InventoryItem";

type Inventory = {
  id: number;
  item_id: number;
  garage_id: number;
  operator_user_id: number | null;
  quantity: number;
  minimum_quantity: number;
  maximum_quantity: number;
  item?: InventoryItem;
};

export default Inventory;
