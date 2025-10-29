/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "../../baseApi";

const statsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserStats: builder.query<any, void>({
      query: () => ({
        url: "/stats/user",
        method: "GET",
      }),
      providesTags: ["STATS"],
    }),
    getTransactionStats: builder.query<any, void>({
      query: () => ({
        url: "/stats/transaction",
        method: "GET",
      }),
      providesTags: ["STATS"],
    }),
  }),
});

export const { useGetUserStatsQuery, useGetTransactionStatsQuery } = statsApi;
