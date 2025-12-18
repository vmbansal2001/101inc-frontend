import InventoryItem from "./InventoryItem";

const inventoryItemsTransformer = (inventoryItems: any): InventoryItem[] => {
  return inventoryItems.map((inventoryItem: any) =>
    inventoryItemTransformer(inventoryItem)
  );
};

const inventoryItemTransformer = (inventoryItem: any): InventoryItem => {
  const mappedInventoryItem: InventoryItem = {
    id: inventoryItem.id,
    name: inventoryItem.name,
    item_type: inventoryItem.item_type,
    unit: inventoryItem.unit,
  };

  return mappedInventoryItem;
};

export { inventoryItemTransformer, inventoryItemsTransformer };
