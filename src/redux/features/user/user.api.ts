import { baseApi } from "@/redux/baseApi";
import { type IResponse, type IUser } from "@/types";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    updateUser: builder.mutation<IResponse<IUser>, { id: string; data: Partial<IUser> }>({
      query: ({ id, data }) => ({
        url: `/user/${id}`,
        method: "PATCH",
        data: data,
      }),
      invalidatesTags: ["USER"],
    }),
    getAllUsers: builder.query<IResponse<{ data: IUser[], meta: { limit: number, page: number, total: number, totalPage: number } }>, Record<string, string | undefined>>({
      query: (query) => ({
        url: "/user",
        method: "GET",
        params: query
      }),
      providesTags: ["USER"],
    }),
    getAllPendingAgents: builder.query<IResponse<{ data: IUser[], meta: { total: number } }>, void>({
      query: () => ({
        url: "/user/all-pending-agents",
        method: "GET",
      }),
      providesTags: ["USER"],
    }),
    getAllApprovedAgents: builder.query<IResponse<{ data: IUser[], meta: { total: number } }>, void>({
      query: () => ({
        url: "/user/all-approved-agents",
        method: "GET",
      }),
      providesTags: ["USER"],
    }),
    updateUserStatus: builder.mutation<IResponse<IUser>, { id: string; data: { status?: string; agentStatus?: string } }>({ // New mutation for status/agentStatus
      query: ({ id, data }) => ({
        url: `/user/${id}`,
        method: "PATCH",
        data: data,
      }),
      invalidatesTags: ["USER"],
    }),
    approveAgent: builder.mutation<IResponse<IUser>, string>({
      query: (id) => ({
        url: `/user/make-agent/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["USER"],
    }),
  }),
});

export const {
  useUpdateUserMutation,
  useGetAllUsersQuery,
  useGetAllPendingAgentsQuery,
  useGetAllApprovedAgentsQuery,
  useUpdateUserStatusMutation,
  useApproveAgentMutation,
} = userApi;
