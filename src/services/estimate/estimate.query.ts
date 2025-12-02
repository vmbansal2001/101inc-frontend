import baseApi from "../base-api";

export const estimatesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    putEstimate: builder.mutation<unknown | null, { body: unknown }>({
      query: ({ body }) => ({
        url: `/api/v1/estimates/`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Tickets"],
    }),

    postEstimate: builder.mutation<unknown | null, { body: unknown }>({
      query: ({ body }) => ({
        url: `/api/v1/estimates/`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Tickets"],
    }),
  }),
});

export const { usePostEstimateMutation, usePutEstimateMutation } = estimatesApi;
