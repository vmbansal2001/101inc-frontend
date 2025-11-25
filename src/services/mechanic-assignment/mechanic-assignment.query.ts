import baseApi from "../base-api";

export const mechanicAssignmentsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    postMechanicAssignment: builder.mutation<unknown | null, { body: unknown }>(
      {
        query: ({ body }) => ({
          url: `/api/v1/mechanic_assignment/`,
          method: "POST",
          body,
        }),
        invalidatesTags: ["Tickets"],
      }
    ),
  }),
});

export const { usePostMechanicAssignmentMutation } = mechanicAssignmentsApi;
