import {
  createApi,
  fetchBaseQuery,
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import authHeader from "./auth-header";

// Custom base query with error logging
const baseQueryWithErrorLogging = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_BASE_API_URL,
  prepareHeaders: async (headers) => {
    headers.set("Authorization", await authHeader());
    return headers;
  },
});

const baseQueryWithLogging: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const result = await baseQueryWithErrorLogging(args, api, extraOptions);

  return result;
};

const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithLogging,
  endpoints: () => ({}),
});

export const baseApiReducer = baseApi.reducer;
export const baseApiReducerPath = baseApi.reducerPath;
export default baseApi;
