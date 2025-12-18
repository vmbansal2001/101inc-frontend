import { usePostInventoryAddItemMutation } from "@/src/services/inventory/inventory.query";
import Inventory from "@/src/types/inventory/Inventory";
import React, { useMemo, useState } from "react";

type Props = {
  inventory: Inventory;
  garageId: number;
  handleClose?: () => void;
};

const RestockModalContainer = ({ inventory, garageId, handleClose }: Props) => {
  const currentQuantity = inventory?.quantity || 0;

  const [quantityToAdd, setQuantityToAdd] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [postInventoryAddItem, { isLoading }] =
    usePostInventoryAddItemMutation();

  const itemName = inventory.item?.name || "Unnamed item";
  const itemType = inventory.item?.item_type || "N/A";
  const unit = inventory.item?.unit || "";

  const newQuantity = useMemo(() => {
    const delta = Number(quantityToAdd);
    if (Number.isNaN(delta) || delta < 0) return currentQuantity;
    return currentQuantity + delta;
  }, [currentQuantity, quantityToAdd]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage(null);
    setError(null);

    const delta = Number(quantityToAdd);
    if (Number.isNaN(delta) || delta <= 0) {
      setError("Please enter a quantity greater than zero.");
      return;
    }

    const payload = {
      item_id: inventory.item_id,
      garage_id: garageId,
      quantity: delta,
    };

    try {
      await postInventoryAddItem({ body: payload }).unwrap();
      setMessage("Inventory updated successfully.");
      setQuantityToAdd("");
      handleClose?.();
    } catch {
      setError("Unable to update inventory. Please try again.");
    }
  };

  return (
    <div className="bg-white rounded-xl p-4 space-y-5">
      <div className="space-y-1">
        <p className="text-xs font-semibold text-gray-500 uppercase">
          Restock Item
        </p>
        <h3 className="text-lg font-semibold text-gray-900">{itemName}</h3>
        <p className="text-sm text-gray-600">
          Type: {itemType} {unit ? `• Unit: ${unit}` : ""}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 text-sm">
        <div className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-2">
          <p className="text-xs text-gray-500">Current quantity</p>
          <p className="text-base font-semibold text-gray-900">
            {currentQuantity} {unit}
          </p>
        </div>
        <div className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-2">
          <p className="text-xs text-gray-500">Minimum / Maximum</p>
          <p className="text-base font-semibold text-gray-900">
            {inventory.minimum_quantity} / {inventory.maximum_quantity} {unit}
          </p>
        </div>
      </div>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-800">
            Quantity to add
          </label>
          <input
            type="number"
            min={1}
            value={quantityToAdd}
            onChange={(e) => {
              setQuantityToAdd(e.target.value);
              setMessage(null);
              setError(null);
            }}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-200"
            placeholder="e.g. 10"
          />
          <p className="text-xs text-gray-500">
            New quantity after restock:{" "}
            <span className="font-semibold text-gray-900">
              {newQuantity} {unit}
            </span>
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
            className="inline-flex items-center justify-center rounded-lg bg-gray-900 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isLoading ? "Updating..." : "Update Quantity"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default RestockModalContainer;
