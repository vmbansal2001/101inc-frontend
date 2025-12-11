import { usePostInventoryUseItemMutation } from "@/src/services/inventory/inventory.query";
import Inventory from "@/src/types/inventory/Inventory";
import React, { useMemo, useState } from "react";

type Props = {
  item: Inventory;
  handleClose: () => void;
};

const UseUpInventoryItemContainer = ({ item, handleClose }: Props) => {
  const [quantityToUse, setQuantityToUse] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [postInventoryUseItem, { isLoading }] =
    usePostInventoryUseItemMutation();

  const currentQuantity = item?.quantity || 0;
  const itemName = item.item?.name || "Unnamed item";
  const itemType = item.item?.item_type || "N/A";
  const unit = item.item?.unit || "";

  const remainingQuantity = useMemo(() => {
    const delta = Number(quantityToUse);
    if (Number.isNaN(delta) || delta < 0) return currentQuantity;
    return currentQuantity - delta;
  }, [currentQuantity, quantityToUse]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage(null);
    setError(null);

    const delta = Number(quantityToUse);
    if (Number.isNaN(delta) || delta <= 0) {
      setError("Please enter a quantity greater than zero.");
      return;
    }

    if (delta > currentQuantity) {
      setError("Quantity exceeds available stock.");
      return;
    }

    const payload = {
      item_id: item.item_id,
      garage_id: item.garage_id,
      quantity: delta,
    };

    try {
      await postInventoryUseItem({ body: payload }).unwrap();
      setMessage("Item usage recorded.");
      setQuantityToUse("");
      handleClose();
    } catch {
      setError("Unable to record usage. Please try again.");
    }
  };

  return (
    <div className="bg-white rounded-xl p-4 space-y-5">
      <div className="space-y-1">
        <p className="text-xs font-semibold text-gray-500 uppercase">
          Use item
        </p>
        <h3 className="text-lg font-semibold text-gray-900">{itemName}</h3>
        <p className="text-sm text-gray-600">
          Type: {itemType} {unit ? `• Unit: ${unit}` : ""}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 text-sm">
        <div className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-2">
          <p className="text-xs text-gray-500">Available quantity</p>
          <p className="text-base font-semibold text-gray-900">
            {currentQuantity} {unit}
          </p>
        </div>
        <div className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-2">
          <p className="text-xs text-gray-500">Remaining after use</p>
          <p className="text-base font-semibold text-gray-900">
            {remainingQuantity < 0 ? 0 : remainingQuantity} {unit}
          </p>
        </div>
      </div>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-800">
            Quantity to use
          </label>
          <input
            type="number"
            min={1}
            value={quantityToUse}
            onChange={(e) => {
              setQuantityToUse(e.target.value);
              setMessage(null);
              setError(null);
            }}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-200"
            placeholder="e.g. 3"
          />
          <p className="text-xs text-gray-500">
            This will reduce available stock for this item.
          </p>
        </div>

        {(error || message) && (
          <div
            className={`rounded-lg px-3 py-2 text-sm ${
              error
                ? "bg-red-50 text-red-700 ring-1 ring-red-100"
                : "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100"
            }`}
          >
            {error || message}
          </div>
        )}

        <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={handleClose}
            className="inline-flex items-center justify-center rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-1"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="inline-flex items-center justify-center rounded-lg bg-violet-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-300 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isLoading ? "Saving..." : "Use Item"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UseUpInventoryItemContainer;
