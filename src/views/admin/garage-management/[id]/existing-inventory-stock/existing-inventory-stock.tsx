import Inventory from "@/src/types/inventory/Inventory";
import RestockButton from "./restock-inventory/restock-button";

type Props = {
  inventory: Inventory[];
  garageId: number;
};

const ExistingInventoryStock = ({ inventory, garageId }: Props) => {
  const summary = inventory.reduce(
    (acc, item) => {
      acc.totalItems += 1;
      acc.totalQuantity += item.quantity;
      if (item.quantity <= item.minimum_quantity) acc.lowStock += 1;
      if (item.quantity >= item.maximum_quantity) acc.atCapacity += 1;
      return acc;
    },
    { totalItems: 0, totalQuantity: 0, lowStock: 0, atCapacity: 0 }
  );

  const getStatus = (item: Inventory) => {
    if (item.quantity <= item.minimum_quantity) {
      return {
        label: "Low stock",
        classes: "bg-amber-50 text-amber-700 ring-1 ring-amber-100",
      };
    }
    if (item.quantity >= item.maximum_quantity) {
      return {
        label: "At capacity",
        classes: "bg-blue-50 text-blue-700 ring-1 ring-blue-100",
      };
    }
    return {
      label: "Healthy",
      classes: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100",
    };
  };

  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-xl font-semibold text-gray-900">
          Existing Inventory Stock
        </h2>
        <p className="text-sm text-gray-600">
          View and manage the inventory stock for this garage.
        </p>
        <div className="flex flex-wrap gap-3">
          <div className="flex items-center gap-2 rounded-lg bg-gray-50 px-3 py-2 text-sm text-gray-700 ring-1 ring-gray-200">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            {summary.totalQuantity} total units
          </div>
          <div className="flex items-center gap-2 rounded-lg bg-gray-50 px-3 py-2 text-sm text-gray-700 ring-1 ring-gray-200">
            <span className="h-2 w-2 rounded-full bg-gray-400" />
            {summary.totalItems} item{summary.totalItems === 1 ? "" : "s"}
          </div>
          <div className="flex items-center gap-2 rounded-lg bg-amber-50 px-3 py-2 text-sm text-amber-700 ring-1 ring-amber-100">
            <span className="h-2 w-2 rounded-full bg-amber-500" />
            {summary.lowStock} low stock
          </div>
          <div className="flex items-center gap-2 rounded-lg bg-blue-50 px-3 py-2 text-sm text-blue-700 ring-1 ring-blue-100">
            <span className="h-2 w-2 rounded-full bg-blue-500" />
            {summary.atCapacity} at capacity
          </div>
        </div>
      </div>

      {inventory.length === 0 ? (
        <div className="rounded-xl border border-dashed border-gray-200 bg-gray-50 px-4 py-6 text-sm text-gray-600">
          No inventory items have been added to this garage yet.
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50 hidden md:table-header-group">
                <tr className="text-left text-xs font-semibold uppercase tracking-wide text-gray-600">
                  <th scope="col" className="px-4 py-3">
                    Item
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Type
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Quantity
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Min / Max
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Status
                  </th>
                  <th scope="col" className="px-4 py-3 text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm text-gray-900 md:table-row-group">
                {inventory.map((item) => {
                  const status = getStatus(item);
                  return (
                    <tr
                      key={`${item.id}-${item.item_id}`}
                      className="block hover:bg-gray-50 md:table-row md:py-0 py-5"
                    >
                      <td className="block px-4 py-3 md:table-cell">
                        <span className="mb-1 block text-xs font-semibold uppercase text-gray-500 md:hidden">
                          Item
                        </span>
                        <div className="font-semibold">
                          {item.item?.name || "Unnamed item"}
                        </div>
                        <p className="text-xs text-gray-500">
                          ID: {item.item_id}
                        </p>
                      </td>
                      <td className="block px-4 py-3 md:table-cell">
                        <span className="mb-1 block text-xs font-semibold uppercase text-gray-500 md:hidden">
                          Type
                        </span>
                        {item.item?.item_type || "N/A"}
                      </td>
                      <td className="block px-4 py-3 md:table-cell">
                        <span className="mb-1 block text-xs font-semibold uppercase text-gray-500 md:hidden">
                          Quantity
                        </span>
                        <div className="font-semibold">
                          {item.quantity} {item.item?.unit || ""}
                        </div>
                      </td>
                      <td className="block px-4 py-3 md:table-cell">
                        <span className="mb-1 block text-xs font-semibold uppercase text-gray-500 md:hidden">
                          Min / Max
                        </span>
                        <div className="text-gray-700">
                          {item.minimum_quantity} min / {item.maximum_quantity}{" "}
                          max
                        </div>
                      </td>
                      <td className="block px-4 py-3 md:table-cell">
                        <span className="mb-1 block text-xs font-semibold uppercase text-gray-500 md:hidden">
                          Status
                        </span>
                        <span
                          className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${status.classes}`}
                        >
                          <span className="h-2 w-2 rounded-full bg-current opacity-70" />
                          {status.label}
                        </span>
                      </td>
                      <td className="block px-4 py-3 md:table-cell md:text-right">
                        <RestockButton
                          inventory={item}
                          garageId={garageId}
                          className="inline-flex items-center gap-2 rounded-lg bg-gray-900 px-3 py-2 text-xs font-semibold text-white shadow-sm hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-1 w-full md:w-auto justify-center"
                        >
                          Restock Item
                        </RestockButton>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </section>
  );
};

export default ExistingInventoryStock;
