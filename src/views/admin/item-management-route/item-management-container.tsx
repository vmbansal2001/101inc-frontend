import AddNewInventoryItem from "./add-new-inventory-item";
import ExistingInventoryItems from "./existing-inventory-items";

const ItemManagementContainer = () => {
  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
          Items Management
        </h1>
        <p className="text-gray-600 font-medium">
          Add items in the inventory from here.
        </p>
      </div>

      <ExistingInventoryItems />
      <AddNewInventoryItem />
    </div>
  );
};

export default ItemManagementContainer;
