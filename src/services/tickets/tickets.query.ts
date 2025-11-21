/* eslint-disable @typescript-eslint/no-explicit-any */

import baseApi from "../base-api";

export const ticketsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    postTicket: builder.mutation<any | null, { body: any }>({
      query: ({ body }) => ({
        url: `/api/v1/tickets/`,
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { usePostTicketMutation } = ticketsApi;
