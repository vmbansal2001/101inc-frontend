import {
  useGetInventoryItemsQuery,
  usePostInventoryMutation,
} from "@/src/services/inventory/inventory.query";
import Inventory from "@/src/types/inventory/Inventory";
import React, { useMemo, useState } from "react";

type Props = {
  garageId: number;
  existingInventory: Inventory[];
};

const AddNewInventoryStock = ({ garageId, existingInventory }: Props) => {
  const [postInventory, { isLoading }] = usePostInventoryMutation();
  const { data: inventoryItems } = useGetInventoryItemsQuery();

  const [form, setForm] = useState({
    itemId: "",
    quantity: "",
    minimumQuantity: "",
    maximumQuantity: "",
  });

  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const existingItemIds = useMemo(
    () => new Set(existingInventory.map((inv) => inv.item_id)),
    [existingInventory]
  );

  const parsedItems = useMemo(
    () =>
      (inventoryItems || []).map((item) => ({
        label: item.name,
        value: String(item.id),
        unit: item.unit,
        type: item.item_type,
      })),
    [inventoryItems]
  );

  const selectedItem = useMemo(
    () => parsedItems.find((option) => option.value === form.itemId),
    [form.itemId, parsedItems]
  );

  const isDuplicateSelection =
    form.itemId !== "" && existingItemIds.has(Number(form.itemId));

  const onChange =
    (field: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
      setMessage(null);
      setError(null);
    };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage(null);
    setError(null);

    if (!form.itemId) {
      setError("Please select an inventory item.");
      return;
    }

    const payload = {
      item_id: Number(form.itemId),
      garage_id: garageId,
      minimum_quantity: Number(form.minimumQuantity),
      maximum_quantity: Number(form.maximumQuantity),
      quantity: Number(form.quantity),
    };

    if (
      Number.isNaN(payload.minimum_quantity) ||
      Number.isNaN(payload.maximum_quantity) ||
      Number.isNaN(payload.quantity)
    ) {
      setError("Please enter valid numbers for quantity and thresholds.");
      return;
    }

    if (existingItemIds.has(payload.item_id)) {
      setError(
        "Item already exists in the garage, please use Restock button to restock the item"
      );
      return;
    }

    if (payload.minimum_quantity > payload.maximum_quantity) {
      setError("Minimum quantity cannot exceed maximum quantity.");
      return;
    }

    try {
      await postInventory({ body: payload }).unwrap();
      setMessage("Inventory item added successfully.");
      setForm({
        itemId: "",
        quantity: "",
        minimumQuantity: "",
        maximumQuantity: "",
      });
    } catch {
      setError("Unable to add inventory item. Please try again.");
    }
  };

  return (
    <div>
      <div className="space-y-2">
        <h2 className="text-xl font-semibold text-gray-900">
          Add New Inventory Stock
        </h2>
        <p className="text-sm text-gray-600">
          Add new inventory stock to this garage.
        </p>
      </div>

      <form
        className="mt-4 space-y-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm"
        onSubmit={handleSubmit}
      >
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-800">
              Inventory Item
            </label>
            <select
              value={form.itemId}
              onChange={onChange("itemId")}
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-200"
            >
              <option value="">Select an item</option>
              {parsedItems.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label} {option.unit ? `(${option.unit})` : ""}
                </option>
              ))}
            </select>
            {selectedItem && (
              <p className="text-xs text-gray-500">
                Type: {selectedItem.type} | Unit: {selectedItem.unit}
              </p>
            )}
            {isDuplicateSelection && (
              <p className="text-xs font-semibold text-red-600">
                Item already exists in the garage, please use Restock button to
                restock the item
              </p>
            )}
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-800">
              Quantity
            </label>
            <input
              type="number"
              min={1}
              required
              value={form.quantity}
              onChange={onChange("quantity")}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-200"
              placeholder="e.g. 22"
            />
            {selectedItem?.unit && (
              <p className="text-xs text-gray-500">Unit: {selectedItem.unit}</p>
            )}
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-800">
              Minimum Quantity
            </label>
            <input
              type="number"
              min={1}
              required
              value={form.minimumQuantity}
              onChange={onChange("minimumQuantity")}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-200"
              placeholder="e.g. 5"
            />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-800">
              Maximum Quantity
            </label>
            <input
              type="number"
              min={1}
              required
              value={form.maximumQuantity}
              onChange={onChange("maximumQuantity")}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-200"
              placeholder="e.g. 50"
            />
          </div>
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

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
          <p className="text-xs text-gray-500">
            Fill all fields to add the item to this garage.
          </p>
          <button
            type="submit"
            disabled={isLoading || isDuplicateSelection}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-gray-900 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isLoading ? "Adding..." : "Add Inventory"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddNewInventoryStock;
