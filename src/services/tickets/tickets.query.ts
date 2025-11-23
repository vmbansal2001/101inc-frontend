/* eslint-disable @typescript-eslint/no-explicit-any */

import baseApi from "../base-api";
import Ticket from "@/src/types/ticket/Ticket";
import {
  ticketTransformer,
  ticketsTransformer,
} from "@/src/types/ticket/ticket.transformer";

export const ticketsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTicketById: builder.query<Ticket | null, { ticket_id: number }>({
      query: ({ ticket_id }) => ({
        url: `/api/v1/tickets/id`,
        params: { ticket_id },
      }),
      providesTags: ["Tickets"],
      transformResponse: (response: any) => ticketTransformer(response[0]),
    }),
    getTicketsByUserId: builder.query<Ticket[] | null, { user_id: number }>({
      query: ({ user_id }) => ({
        url: `/api/v1/tickets/`,
        params: { user_id },
      }),
      providesTags: ["Tickets"],
      transformResponse: (response: any) => ticketsTransformer(response),
    }),
    postTicket: builder.mutation<any | null, { body: any }>({
      query: ({ body }) => ({
        url: `/api/v1/tickets/`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Tickets"],
    }),
  }),
});

export const {
  usePostTicketMutation,
  useGetTicketsByUserIdQuery,
  useLazyGetTicketsByUserIdQuery,
  useGetTicketByIdQuery,
  useLazyGetTicketByIdQuery,
} = ticketsApi;
