import { usePostInventoryItemMutation } from "@/src/services/inventory/inventory.query";
import InventoryItem from "@/src/types/inventory-item/InventoryItem";
import React, { useMemo, useState } from "react";

type InventoryItemPayload = Omit<InventoryItem, "id">;

const AddNewInventoryItem = () => {
  const [formData, setFormData] = useState<InventoryItemPayload>({
    name: "",
    item_type: "TOOL",
    unit: "",
  });
  const [localError, setLocalError] = useState<string | null>(null);

  const [addNewInventoryItem, { isLoading, isError, isSuccess, error }] =
    usePostInventoryItemMutation();

  const itemTypeOptions: InventoryItemPayload["item_type"][] = useMemo(
    () => ["TOOL", "PART"],
    []
  );

  const apiErrorMessage = useMemo(() => {
    if (!isError || !error) return null;

    if ("data" in error) {
      const data = error.data as { message?: string } | string | undefined;
      if (typeof data === "string") return data;
      if (data?.message) return data.message;
    }

    return "Unable to add inventory item. Please try again.";
  }, [error, isError]);

  const handleInputChange =
    (field: keyof InventoryItemPayload) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const value = event.target.value;
      setFormData((prev) => ({ ...prev, [field]: value }));
    };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLocalError(null);

    if (!formData.name.trim() || !formData.unit.trim()) {
      setLocalError("Name and unit are required.");
      return;
    }

    try {
      await addNewInventoryItem({ body: formData }).unwrap();
      setFormData({ name: "", item_type: itemTypeOptions[0], unit: "" });
    } catch (submitError) {
      setLocalError("Unable to add inventory item. Please try again.");
    }
  };

  const shouldDisableSubmit = isLoading || !formData.name || !formData.unit;

  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
      <div className="px-6 py-5 border-b border-gray-100">
        <h2 className="text-xl font-semibold text-gray-900">
          Add new inventory item
        </h2>
        <p className="text-sm text-gray-600">
          Provide a name, type, and unit to create a new inventory record.
        </p>
      </div>

      <form className="px-6 py-6 space-y-5" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4">
          <label className="space-y-2">
            <span className="text-sm font-medium text-gray-700">Name</span>
            <input
              type="text"
              value={formData.name}
              onChange={handleInputChange("name")}
              placeholder="e.g. Impact wrench"
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200"
              required
            />
          </label>

          <label className="space-y-2">
            <span className="text-sm font-medium text-gray-700">Type</span>
            <select
              value={formData.item_type}
              onChange={handleInputChange("item_type")}
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm bg-white focus:border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200"
            >
              {itemTypeOptions.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </label>

          <label className="space-y-2">
            <span className="text-sm font-medium text-gray-700">Unit</span>
            <input
              type="text"
              value={formData.unit}
              onChange={handleInputChange("unit")}
              placeholder="e.g. pieces"
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200"
              required
            />
          </label>
        </div>

        {(localError || apiErrorMessage) && (
          <div className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
            {localError || apiErrorMessage}
          </div>
        )}

        {isSuccess && !isError && (
          <div className="text-sm text-green-700 bg-green-50 border border-green-100 rounded-lg px-3 py-2">
            Inventory item added successfully.
          </div>
        )}

        <button
          type="submit"
          disabled={shouldDisableSubmit}
          className="inline-flex items-center w-full justify-center cursor-pointer rounded-lg bg-gray-900 px-4 py-2 text-sm font-semibold text-white disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isLoading ? "Adding..." : "Add item"}
        </button>
      </form>
    </div>
  );
};

export default AddNewInventoryItem;
