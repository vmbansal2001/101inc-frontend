import Inventory from "@/src/types/inventory/Inventory";
import { useState } from "react";
import dynamic from "next/dynamic";
import Button from "@/src/components/buttons/common-button";

const RestockModal = dynamic(() => import("./restock-modal"), {
  ssr: false,
});

type Props = {
  inventory: Inventory;
  children: React.ReactNode;
  garageId: number;
  className?: string;
};

const RestockButton = ({ inventory, className, children, garageId }: Props) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)} className={className}>
        {children}
      </Button>
      <RestockModal
        open={open}
        handleClose={() => setOpen(false)}
        inventory={inventory}
        garageId={garageId}
      />
    </>
  );
};

export default RestockButton;
