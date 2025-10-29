import { baseApi } from "@/redux/baseApi";
import { type IResponse,  type IWallet } from "@/types";
import { type TAddMoneySource, type TWithdrawMoneySource } from "@/types/transaction.type";

export const walletApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSingleWallet: builder.query<IResponse<IWallet[]>, string>({
      query: (id) => ({
        url: `/wallet/${id}`,
        method: "GET",
      }),
      providesTags: ["WALLET"],
    }),
    getMyWallet: builder.query<IResponse<IWallet[]>, void>({
      query: () => ({
        url: "/wallet/my-wallet",
        method: "GET",
      }),
      providesTags: ["WALLET"],
    }),
    addMoney: builder.mutation<IResponse<null>,{ amount: number; addMoneySource: TAddMoneySource }>({
      query: (data) => ({
        url: "/wallet/add-money",
        method: "POST",
        data: data,
      }),
      invalidatesTags: ["WALLET" , "TRANSACTION"],
    }),
    withdrawMoney: builder.mutation<IResponse<null>,{ amount: number; withdrawMoneySource: TWithdrawMoneySource }>({
      query: (data) => ({
        url: "/wallet/withdraw-money",
        method: "POST",
        data: data,
      }),
      invalidatesTags: ["WALLET", "TRANSACTION"],
    }),
    sendMoney: builder.mutation<IResponse<null>,{ phone: string; amount: number }>({
      query: (data) => ({
        url: "/wallet/send-money",
        method: "POST",
        data: data,
      }),
      invalidatesTags: ["WALLET", "TRANSACTION"],
    }),
    cashOutMoney: builder.mutation<IResponse<null>,{ phone: string; amount: number }>({
      query: (data) => ({
        url: "/wallet/cash-out-money",
        method: "POST",
        data: data,
      }),
      invalidatesTags: ["WALLET", "TRANSACTION"],
    }),
    cashInMoney: builder.mutation<IResponse<null>,{ phone: string; amount: number }>({
      query: (data) => ({
        url: "/wallet/cash-in-money",
        method: "POST",
        data: data,
      }),
      invalidatesTags: ["WALLET", "TRANSACTION"],
    }),
    makeMeAgent: builder.mutation<IResponse<null>, void>({
        query: () => ({
            url: "/user/make-me-agent",
            method: "PATCH",
        }),
        invalidatesTags:["USER"]
    }),
  }),
});

export const {
  useGetSingleWalletQuery,
  useGetMyWalletQuery,
  useAddMoneyMutation,
  useWithdrawMoneyMutation,
  useSendMoneyMutation,
  useCashOutMoneyMutation,
  useCashInMoneyMutation,
  useMakeMeAgentMutation,
} = walletApi;
