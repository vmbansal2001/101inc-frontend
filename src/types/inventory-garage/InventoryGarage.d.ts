import Inventory from "../inventory/Inventory";

type InventoryGarage = {
  id: number;
  name: string;
  phone: string;
  // address: string;
  // latitude: number;
  // longitude: number;
  type: string;
  inventory?: Inventory[];
};

export default InventoryGarage;
