"use client";

import OperatorNavbar from "@/src/components/navbar/operator-navbar";
import OperatorRouteSwitcher from "../operator-route-switcher";
import OperatorInventoryContainer from "./operator-inventory-container/operator-inventory-container";

const OperatorInventoryRoute = () => {
  return (
    <main>
      <OperatorNavbar />
      <div className="common-frame-box py-10 space-y-6">
        <OperatorRouteSwitcher />
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
            Inventory Management
          </h1>
          <p className="text-gray-600 font-medium">
            Manage your inventory and stock levels.
          </p>
        </div>
        <OperatorInventoryContainer />
      </div>
    </main>
  );
};

export default OperatorInventoryRoute;
