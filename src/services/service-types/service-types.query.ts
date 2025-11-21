import serviceTypeTransformer from "@/src/types/service-type/service-type.transformer";
import baseApi from "../base-api";
import ServiceType from "@/src/types/service-type/ServiceType";

export const serviceTypesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getServiceTypes: builder.query<ServiceType[], void>({
      query: () => ({
        url: `/api/v1/service_types/`,
      }),
      transformResponse: (response) => serviceTypeTransformer(response),
    }),
  }),
});

export const { useGetServiceTypesQuery } = serviceTypesApi;
