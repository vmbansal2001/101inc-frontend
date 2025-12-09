import { inventoryItemsTransformer } from "@/src/types/inventory-item/inventory-item.transformer";
import baseApi from "../base-api";
import InventoryItem from "@/src/types/inventory-item/InventoryItem";
import InventoryGarage from "@/src/types/inventory-garage/InventoryGarage";
import {
  inventoryGaragesTransformer,
  inventoryGarageTransformer,
} from "@/src/types/inventory-garage/inventory-garage.transformer";

export const inventoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getInventoryItems: builder.query<InventoryItem[], void>({
      query: () => ({
        url: `/api/v1/inventory/items`,
      }),
      providesTags: ["InventoryItem"],
      transformResponse: (response) => inventoryItemsTransformer(response),
    }),

    getInventoryGarages: builder.query<InventoryGarage[], void>({
      query: () => ({
        url: `/api/v1/inventory/garages`,
      }),
      providesTags: ["InventoryGarage"],
      transformResponse: (response) => inventoryGaragesTransformer(response),
    }),

    getInventoryGarageById: builder.query<
      InventoryGarage,
      { garageId: number }
    >({
      query: ({ garageId }) => ({
        url: `/api/v1/inventory/garages/${garageId}`,
      }),
      providesTags: ["InventoryGarage"],
      transformResponse: (response) => inventoryGarageTransformer(response),
    }),

    postInventoryItem: builder.mutation<unknown | null, { body: unknown }>({
      query: ({ body }) => ({
        url: `/api/v1/inventory/items`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["InventoryItem"],
    }),

    postInventoryGarageUser: builder.mutation<
      unknown | null,
      { garageId: number; body: unknown }
    >({
      query: ({ garageId, body }) => ({
        url: `/api/v1/inventory/garages/${garageId}/users`,
        method: "POST",
        body,
      }),
    }),

    postInventoryGarage: builder.mutation<unknown | null, { body: unknown }>({
      query: ({ body }) => ({
        url: `/api/v1/inventory/garages`,
        method: "POST",
        body,
      }),
    }),

    postInventory: builder.mutation<unknown | null, { body: unknown }>({
      query: ({ body }) => ({
        url: `/api/v1/inventory/`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["InventoryGarage"],
    }),

    postInventoryAddItem: builder.mutation<unknown | null, { body: unknown }>({
      query: ({ body }) => ({
        url: `/api/v1/inventory/add_item`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["InventoryGarage"],
    }),

    postInventoryUseItem: builder.mutation<unknown | null, { body: unknown }>({
      query: ({ body }) => ({
        url: `/api/v1/inventory/use_item`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["InventoryGarage"],
    }),
  }),
});

export const {
  useGetInventoryItemsQuery,
  useLazyGetInventoryItemsQuery,
  usePostInventoryItemMutation,
  useGetInventoryGaragesQuery,
  useLazyGetInventoryGaragesQuery,
  usePostInventoryGarageMutation,
  usePostInventoryGarageUserMutation,
  useGetInventoryGarageByIdQuery,
  useLazyGetInventoryGarageByIdQuery,
  usePostInventoryMutation,
  usePostInventoryAddItemMutation,
  usePostInventoryUseItemMutation,
} = inventoryApi;
