import { type TStatus } from ".";
import { type IUser } from "./auth.type";

export interface IWallet {
  _id?: string;
  user: Partial<IUser>;
  balance: number;
  status: TStatus;
}
