/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  userTransformer,
  usersTransformer,
} from "@/src/types/user/user.transformer";
import baseApi from "../base-api";
import User from "@/src/types/user/User";

export const usersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMechanicUsers: builder.query<User[] | null, void>({
      query: () => ({
        url: `/api/v1/users/mechanic/all`,
      }),
      providesTags: ["Users"],
      transformResponse: (response) => usersTransformer(response),
    }),

    getUserByEmail: builder.query<User | null, { email: string }>({
      query: ({ email }) => ({
        url: `/api/v1/users/by-email`,
        params: { email },
      }),
      providesTags: ["Users"],
      transformResponse: (response) => userTransformer(response),
    }),

    getUserByPhone: builder.query<User | null, { phone: string }>({
      query: ({ phone }) => ({
        url: `/api/v1/users/by-phone`,
        params: { phone },
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
  useGetMechanicUsersQuery,
  useLazyGetMechanicUsersQuery,
  useGetUserByPhoneQuery,
  useLazyGetUserByPhoneQuery,
} = usersApi;
