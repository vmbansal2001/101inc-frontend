"use client";

import AdminNavbar from "@/src/components/navbar/admin-navbar";
import ExistingGarages from "./garages-container/existing-garages/existing-garages";
import AddNewGarage from "./garages-container/add-new-garage/add-new-garage";

const GarageManagementRoute = () => {
  return (
    <main>
      <AdminNavbar />
      <div className="common-frame-box py-10 space-y-10 h-full">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
            Garage Management
          </h1>
          <p className="text-gray-600 font-medium">Manage all garages here.</p>
        </div>

        <ExistingGarages />
        <AddNewGarage />
      </div>
    </main>
  );
};

export default GarageManagementRoute;
