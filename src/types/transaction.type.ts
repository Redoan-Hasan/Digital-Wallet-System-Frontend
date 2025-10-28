import type { IUser } from "./auth.type";
import type { IWallet } from "./wallet.type";

export type TransactionType =
  | "ADD"
  | "WITHDRAW"
  | "CASH_IN"
  | "CASH_OUT"
  | "SEND_MONEY"
  | "ADD_MONEY_BY_AGENT"
  | "WITHDRAW_MONEY_BY_AGENT";

export type TTransactionStatus = "PENDING" | "COMPLETED" | "REVERSED";

export type TAddMoneySource = "BANK" | "CARD" | "MOBILE_BANKING" | "OTHER";

export type TWithdrawMoneySource = "BANK" | "CARD" | "MOBILE_BANKING" | "OTHER";

export interface ITransaction {
  _id: string;
  wallet: string;
  user: string;
  transactionType: TransactionType;
  amount: number;
  senderWallet?: Partial<IWallet> & {user?: Partial<IUser>};
  receiverWallet?: Partial<IWallet> & { user?:Partial<IUser>};
  transactionFee: number;
  status: TTransactionStatus;
  addMoneySource?: TAddMoneySource;
  withdrawMoneySource?: TWithdrawMoneySource;
  createdAt: string;
}
