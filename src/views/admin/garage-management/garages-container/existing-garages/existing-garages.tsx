"use client";

import { useGetInventoryGaragesQuery } from "@/src/services/inventory/inventory.query";
import InventoryGarage from "@/src/types/inventory-garage/InventoryGarage";
import React, { useMemo } from "react";
import ExistingGaragesList from "./existing-garages-list";

const ExistingGarages = () => {
  const {
    data: inventoryGarages,
    isLoading,
    isError,
  } = useGetInventoryGaragesQuery();

  const { publicGarages, privateGarages, totalGarages } = useMemo(() => {
    if (!inventoryGarages) {
      return {
        publicGarages: [] as InventoryGarage[],
        privateGarages: [] as InventoryGarage[],
        totalGarages: 0,
      };
    }

    return inventoryGarages.reduce(
      (acc, garage) => {
        if (garage.type === "Public") {
          acc.publicGarages.push(garage);
        } else {
          acc.privateGarages.push(garage);
        }
        acc.totalGarages += 1;
        return acc;
      },
      {
        publicGarages: [] as InventoryGarage[],
        privateGarages: [] as InventoryGarage[],
        totalGarages: 0,
      }
    );
  }, [inventoryGarages]);

  return (
    <div className="space-y-6">
      <ExistingGaragesList
        title="Public Garages"
        subtitle="Verified garages open to the public."
        garages={publicGarages}
        isLoading={isLoading}
        isError={isError}
      />

      <ExistingGaragesList
        title="Independent Operators"
        subtitle="Private or partner-operated locations."
        garages={privateGarages}
        isLoading={isLoading}
        isError={isError}
      />
    </div>
  );
};

export default ExistingGarages;
