import SheetModal from "@/src/components/modals/sheet-modal";
import Inventory from "@/src/types/inventory/Inventory";
import dynamic from "next/dynamic";

const UseUpInventoryItemContainer = dynamic(
  () => import("./use-up-inventory-item-container"),
  {
    ssr: false,
  }
);

type Props = {
  item: Inventory;
  open: boolean;
  onClose: () => void;
};

const UseUpInventoryItemModal = ({ item, open, onClose }: Props) => {
  return (
    <SheetModal open={open} handleClose={onClose}>
      <UseUpInventoryItemContainer item={item} handleClose={onClose} />
    </SheetModal>
  );
};

export default UseUpInventoryItemModal;
