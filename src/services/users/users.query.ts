/* eslint-disable @typescript-eslint/no-explicit-any */

import baseApi from "../base-api";

export const usersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserByEmail: builder.query<any | null, { email: string }>({
      query: ({ email }) => ({
        url: `/api/v1/users/by-email`,
        params: { email },
      }),
      providesTags: ["Users"],
      // transformResponse: (response) => candidateTransformer(response),
    }),

    postUserData: builder.mutation<any | null, { body: any }>({
      query: ({ body }) => ({
        url: `/api/v1/users/`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Users"],
    }),
  }),
});

export const {
  useGetUserByEmailQuery,
  useLazyGetUserByEmailQuery,
  usePostUserDataMutation,
} = usersApi;
