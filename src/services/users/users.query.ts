/* eslint-disable @typescript-eslint/no-explicit-any */

import baseApi from "../base-api";

// curl --location --request GET 'http://localhost:8000/api/v1/users/by-email?email=shailesh.bhattarai148@gmail.com'

export const usersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserByEmail: builder.query<any | null, { email: string }>({
      query: ({ email }) => ({
        url: `/api/v1/users/by-email`,
        params: { email },
      }),
      // transformResponse: (response) => candidateTransformer(response),
    }),

    // postMenteeData: builder.mutation<
    //   PostMenteeDataRequest,
    //   PostMenteeDataRequest
    // >({
    //   query: ({ body, params }) => ({
    //     method: "POST",
    //     url: "/candidates/profile",
    //     body,
    //     params,
    //   }),
    //   invalidatesTags: ["Candidates"],
    // }),
  }),
});

export const { useGetUserByEmailQuery, useLazyGetUserByEmailQuery } = usersApi;
