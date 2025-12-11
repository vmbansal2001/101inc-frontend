"use client";

import AdminNavbar from "@/src/components/navbar/admin-navbar";
import ExistingInventoryItems from "./existing-inventory-items";
import AddNewInventoryItem from "./add-new-inventory-item";

const ItemManagementRoute = () => {
  return (
    <main>
      <AdminNavbar />
      <div className="common-frame-box py-10 space-y-10 h-full">
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
    </main>
  );
};

export default ItemManagementRoute;
