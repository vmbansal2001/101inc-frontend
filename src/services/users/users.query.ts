/* eslint-disable @typescript-eslint/no-explicit-any */

import baseApi from "../base-api";

export const usersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserByEmail: builder.query<any | null, { email: string }>({
      query: ({ email }) => ({
        url: `/api/v1/users/by-email`,
        params: { email },
      }),
      // transformResponse: (response) => candidateTransformer(response),
    }),

    postUserData: builder.mutation<any | null, { body: any }>({
      query: ({ body }) => ({
        url: `/api/v1/users`,
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useGetUserByEmailQuery,
  useLazyGetUserByEmailQuery,
  usePostUserDataMutation,
} = usersApi;
