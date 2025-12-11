import Inventory from "@/src/types/inventory/Inventory";
import UseItemButton from "./use-up-inventory-item/use-item-button";

type Props = {
  inventory: Inventory[];
  garageId: number;
};

const OperatorInventoryStock = ({ inventory, garageId }: Props) => {
  const summary = inventory.reduce(
    (acc, item) => {
      const type = (item.item?.item_type || "").toUpperCase();
      acc.totalItems += 1;
      acc.totalQuantity += item.quantity;
      if (type === "PART") {
        acc.consumableItems += 1;
        acc.consumableUnits += item.quantity;
      }

      if (type === "TOOL") {
        acc.toolItems += 1;
        acc.toolUnits += item.quantity;
      }
      return acc;
    },
    {
      totalItems: 0,
      totalQuantity: 0,
      consumableItems: 0,
      consumableUnits: 0,
      toolItems: 0,
      toolUnits: 0,
    }
  );

  const parts = inventory.filter(
    (item) => (item.item?.item_type || "").toUpperCase() === "PART"
  );
  const tools = inventory.filter(
    (item) => (item.item?.item_type || "").toUpperCase() === "TOOL"
  );

  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-xl font-semibold text-gray-900">
          Existing Inventory Stock
        </h2>
        <p className="text-sm text-gray-600">
          Quick view of what is available for operators to use.
        </p>
      </div>

      {inventory.length === 0 ? (
        <div className="rounded-xl border border-dashed border-gray-200 bg-gray-50 px-4 py-6 text-sm text-gray-600">
          No inventory items have been added to this garage yet.
        </div>
      ) : (
        <div className="space-y-8">
          <div className="space-y-2">
            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-2 rounded-lg bg-violet-50 px-3 py-2 text-sm text-violet-700 ring-1 ring-violet-100">
                <span className="h-2 w-2 rounded-full bg-violet-500" />
                {summary.consumableItems} consumable item
                {summary.consumableItems === 1 ? "" : "s"}
              </div>
              <div className="flex items-center gap-2 rounded-lg bg-violet-50 px-3 py-2 text-sm text-violet-700 ring-1 ring-violet-100">
                <span className="h-2 w-2 rounded-full bg-violet-500" />
                {summary.consumableUnits} consumable unit
                {summary.consumableUnits === 1 ? "" : "s"}
              </div>
            </div>

            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
              <div className="flex items-center justify-between border-b border-gray-100 px-4 py-3">
                <div>
                  <h3 className="text-base font-semibold text-gray-900">
                    Parts (consumable)
                  </h3>
                  <p className="text-xs text-gray-500">
                    Items that are used up (e.g., oil, filters).
                  </p>
                </div>
                <span className="rounded-full bg-violet-50 px-3 py-1 text-xs font-semibold text-violet-700 ring-1 ring-violet-100">
                  {parts.length} item{parts.length === 1 ? "" : "s"}
                </span>
              </div>
              {parts.length === 0 ? (
                <div className="px-4 py-5 text-sm text-gray-600">
                  No consumable parts available.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50 hidden md:table-header-group">
                      <tr className="text-left text-xs font-semibold uppercase tracking-wide text-gray-600">
                        <th scope="col" className="px-4 py-3">
                          Item
                        </th>
                        <th scope="col" className="px-4 py-3">
                          Quantity
                        </th>
                        <th scope="col" className="px-4 py-3 text-right">
                          Use
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 text-sm text-gray-900 md:table-row-group">
                      {parts.map((item) => {
                        const isOutOfStock = item.quantity <= 0;
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
                                Quantity
                              </span>
                              <div className="font-semibold">
                                {item.quantity} {item.item?.unit || ""}
                              </div>
                            </td>
                            <td className="block px-4 py-3 md:table-cell md:text-right">
                              <UseItemButton
                                item={item}
                                disabled={isOutOfStock}
                                className={`inline-flex w-full md:w-auto items-center justify-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-1 ${
                                  !isOutOfStock
                                    ? "bg-violet-600 text-white hover:bg-violet-500 focus:ring-violet-300"
                                    : "bg-gray-200 text-gray-500 cursor-not-allowed focus:ring-gray-300"
                                }`}
                              >
                                {isOutOfStock ? "Out of stock" : "Use Item"}
                              </UseItemButton>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-2 rounded-lg bg-slate-100 px-3 py-2 text-sm text-slate-700 ring-1 ring-slate-200">
                <span className="h-2 w-2 rounded-full bg-slate-500" />
                {summary.toolItems} tool{summary.toolItems === 1 ? "" : "s"}
              </div>
              <div className="flex items-center gap-2 rounded-lg bg-slate-100 px-3 py-2 text-sm text-slate-700 ring-1 ring-slate-200">
                <span className="h-2 w-2 rounded-full bg-slate-500" />
                {summary.toolUnits} tool unit
                {summary.toolUnits === 1 ? "" : "s"}
              </div>
            </div>

            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
              <div className="flex items-center justify-between border-b border-gray-100 px-4 py-3">
                <div>
                  <h3 className="text-base font-semibold text-gray-900">
                    Tools (reusable)
                  </h3>
                  <p className="text-xs text-gray-500">
                    Gear that stays in circulation for future jobs.
                  </p>
                </div>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700 ring-1 ring-slate-200">
                  {tools.length} item{tools.length === 1 ? "" : "s"}
                </span>
              </div>
              {tools.length === 0 ? (
                <div className="px-4 py-5 text-sm text-gray-600">
                  No reusable tools listed.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50 hidden md:table-header-group">
                      <tr className="text-left text-xs font-semibold uppercase tracking-wide text-gray-600">
                        <th scope="col" className="px-4 py-3">
                          Item
                        </th>
                        <th scope="col" className="px-4 py-3">
                          Quantity
                        </th>
                        <th scope="col" className="px-4 py-3 text-right">
                          Availability
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 text-sm text-gray-900 md:table-row-group">
                      {tools.map((item) => (
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
                              Quantity
                            </span>
                            <div className="font-semibold">
                              {item.quantity} {item.item?.unit || ""}
                            </div>
                          </td>
                          <td className="block px-4 py-3 md:table-cell md:text-right">
                            <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700 ring-1 ring-slate-200">
                              Ready to use
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default OperatorInventoryStock;
