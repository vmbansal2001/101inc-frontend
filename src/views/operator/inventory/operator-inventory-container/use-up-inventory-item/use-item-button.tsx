import Button from "@/src/components/buttons/common-button";
import InventoryItem from "@/src/types/inventory-item/InventoryItem";
import React, { useState } from "react";
import UseUpInventoryItemModal from "./use-up-inventory-item-modal";
import Inventory from "@/src/types/inventory/Inventory";

type Props = {
  item: Inventory;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
};

const UseItemButton = ({ item, children, className, disabled }: Props) => {
  const [openModal, setOpenModal] = useState(false);
  return (
    <>
      <Button
        onClick={() => setOpenModal(true)}
        className={className}
        disabled={disabled}
      >
        {children}
      </Button>
      <UseUpInventoryItemModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        item={item}
      />
    </>
  );
};

export default UseItemButton;
