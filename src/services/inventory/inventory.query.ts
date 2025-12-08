import { inventoryItemsTransformer } from "@/src/types/inventory-item/inventory-item.transformer";
import baseApi from "../base-api";
import InventoryItem from "@/src/types/inventory-item/InventoryItem";

export const inventoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getInventoryItems: builder.query<InventoryItem[], void>({
      query: () => ({
        url: `/api/v1/inventory/items`,
      }),
      providesTags: ["InventoryItem"],
      transformResponse: (response) => inventoryItemsTransformer(response),
    }),

    postInventoryItem: builder.mutation<unknown | null, { body: unknown }>({
      query: ({ body }) => ({
        url: `/api/v1/inventory/items`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["InventoryItem"],
    }),
  }),
});

export const {
  useGetInventoryItemsQuery,
  useLazyGetInventoryItemsQuery,
  usePostInventoryItemMutation,
} = inventoryApi;
