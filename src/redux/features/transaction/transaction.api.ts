import { baseApi } from "@/redux/baseApi";
import { type IResponse, type ITransaction } from "@/types";

export const transactionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMyTransactions: builder.query<IResponse<{data:ITransaction[], meta:{limit: number,page: number,total:number,totalPage:number}}>, Record<string, string | undefined>>({
      query: (query) => ({
        url: "/transaction/get-my-transactions",
        method: "GET",
        params: query
      }),
      providesTags: ["TRANSACTION"],
    }),
    getAllTransactions: builder.query<IResponse<{data:ITransaction[], meta:{limit: number,page: number,total:number,totalPage:number}}>, Record<string, string | undefined>>({
      query: (query) => ({
        url: "/transaction/get-all-transactions",
        method: "GET",
        params: query
      }),
      providesTags: ["TRANSACTION"],
    }),
  }),
});

export const { useGetMyTransactionsQuery, useGetAllTransactionsQuery } = transactionApi;
