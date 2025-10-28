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
  }),
});

export const { useUpdateUserMutation } = userApi;
