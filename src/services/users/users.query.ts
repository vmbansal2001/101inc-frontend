/* eslint-disable @typescript-eslint/no-explicit-any */

import userTransformer from "@/src/types/user/user.transformer";
import baseApi from "../base-api";
import User from "@/src/types/user/User";

export const usersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserByEmail: builder.query<User | null, { email: string }>({
      query: ({ email }) => ({
        url: `/api/v1/users/by-email`,
        params: { email },
      }),
      providesTags: ["Users"],
      transformResponse: (response) => userTransformer(response),
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
