import React from "react";
import RestockModalContainer from "./restock-modal-container";
import SheetModal from "@/src/components/modals/sheet-modal";
import Inventory from "@/src/types/inventory/Inventory";

type Props = {
  open: boolean;
  handleClose: () => void;
  inventory: Inventory;
  garageId: number;
};

const RestockModal = ({ open, handleClose, inventory, garageId }: Props) => {
  return (
    <SheetModal open={open} handleClose={handleClose}>
      <RestockModalContainer
        inventory={inventory}
        garageId={garageId}
        handleClose={handleClose}
      />
    </SheetModal>
  );
};

export default RestockModal;
