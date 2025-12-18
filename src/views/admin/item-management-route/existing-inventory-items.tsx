import { useGetInventoryItemsQuery } from "@/src/services/inventory/inventory.query";

const ExistingInventoryItems = () => {
  const {
    data: inventoryItems,
    isLoading,
    isError,
  } = useGetInventoryItemsQuery();

  const renderTypeBadge = (itemType: string) => {
    const isTool = itemType === "TOOL";
    const colorClasses = isTool
      ? "bg-blue-50 text-blue-700 ring-1 ring-blue-100"
      : "bg-amber-50 text-amber-700 ring-1 ring-amber-100";

    return (
      <span
        className={`text-xs font-semibold px-3 py-1 rounded-full ${colorClasses}`}
      >
        {itemType}
      </span>
    );
  };

  const renderLoadingRows = () =>
    Array.from({ length: 3 }).map((_, idx) => (
      <div key={idx} className="grid grid-cols-4 gap-4 px-4 py-4 animate-pulse">
        <div className="h-3 bg-gray-200 rounded col-span-2" />
        <div className="h-3 bg-gray-200 rounded" />
        <div className="h-3 bg-gray-200 rounded" />
      </div>
    ));

  return (
    <div className="space-y-4">
      <div className="border border-gray-200 rounded-2xl shadow-sm overflow-hidden bg-white">
        <div className="hidden md:grid grid-cols-4 gap-4 px-4 py-3 text-xs font-semibold uppercase tracking-[0.15em] text-gray-500 bg-gray-50">
          <span className="col-span-2">Item</span>
          <span>Type</span>
          <span>Unit</span>
        </div>

        <div className="divide-y divide-gray-100">
          {isLoading && renderLoadingRows()}

          {isError && !isLoading && (
            <div className="px-4 py-6 text-sm text-red-600">
              Unable to load inventory items. Please try again.
            </div>
          )}

          {!isLoading && !isError && inventoryItems?.length === 0 && (
            <div className="px-4 py-6 text-sm text-gray-600">
              No inventory items found.
            </div>
          )}

          {!isLoading &&
            !isError &&
            inventoryItems?.map((item) => (
              <div
                key={item.id}
                className="flex flex-col gap-3 md:grid md:grid-cols-4 md:items-center md:gap-4 px-4 py-4 text-sm"
              >
                <div className="flex items-start justify-between gap-3 md:block md:col-span-2">
                  <div>
                    <p className="text-base md:text-sm font-semibold text-gray-900">
                      {item.name}
                    </p>
                    <p className="text-xs text-gray-500">ID: {item.id}</p>
                  </div>
                  <div className="md:hidden">
                    {renderTypeBadge(item.item_type)}
                  </div>
                </div>

                <div className="hidden md:flex items-center">
                  {renderTypeBadge(item.item_type)}
                </div>

                <div className="flex items-center justify-between md:block">
                  <span className="text-gray-500 md:hidden">Unit</span>
                  <span className="text-gray-800 font-medium">{item.unit}</span>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ExistingInventoryItems;
