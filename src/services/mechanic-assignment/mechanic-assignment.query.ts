import MechanicAssignment from "@/src/types/mechanic-assignment/MechanicAssignment";
import baseApi from "../base-api";
import { mechanicAssignmentsTransformer } from "@/src/types/mechanic-assignment/mechanic-assignment.transformer";

export const mechanicAssignmentsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMechanicAssignmentsByUserId: builder.query<
      MechanicAssignment[] | null,
      { user_id: number }
    >({
      query: ({ user_id }) => ({
        url: `/api/v1/mechanic_assignment/`,
        params: { user_id },
      }),
      providesTags: ["MechanicAssignments"],
      transformResponse: (response) => mechanicAssignmentsTransformer(response),
    }),

    postMechanicAssignment: builder.mutation<unknown | null, { body: unknown }>(
      {
        query: ({ body }) => ({
          url: `/api/v1/mechanic_assignment/`,
          method: "POST",
          body,
        }),
        invalidatesTags: ["Tickets", "MechanicAssignments"],
      }
    ),
  }),
});

export const {
  usePostMechanicAssignmentMutation,
  useGetMechanicAssignmentsByUserIdQuery,
  useLazyGetMechanicAssignmentsByUserIdQuery,
} = mechanicAssignmentsApi;
