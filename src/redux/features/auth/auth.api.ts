import { baseApi } from "@/redux/baseApi";
import { type IResponse, type IUser } from "@/types";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<IResponse<{ accessToken: string; refreshToken: string; user: IUser }>,{ email: string; password: string }>({
      query: (data) => ({
        url: "/auth/login",
        method: "POST",
        data: data,
      }),
      invalidatesTags: ["USER"],
    }),
    logout: builder.mutation<IResponse<null>, void>({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      invalidatesTags: ["USER"],
    }),
    register: builder.mutation<IResponse<null>, { name: string; email: string; password: string; pin: string }>({
      query: (data) => ({
        url: "/user/register",
        method: "POST",
        data: data,
      }),
    }),
    getMyInfo: builder.query<IResponse<{ data: IUser }>, void>({
      query: () => ({
        url: "/user/me",
        method: "GET",
      }),
      providesTags: ["USER"],
    }),
  }),
});

export const { useLoginMutation , useGetMyInfoQuery , useLogoutMutation, useRegisterMutation } = authApi;
