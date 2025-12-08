"use client";

import AdminNavbar from "@/src/components/navbar/admin-navbar";
import ItemManagementContainer from "./item-management-container";

const ItemManagementRoute = () => {
  return (
    <div className="">
      <AdminNavbar />
      <div className="common-frame-box py-10 space-y-10 h-full">
        <ItemManagementContainer />
      </div>
    </div>
  );
};

export default ItemManagementRoute;
