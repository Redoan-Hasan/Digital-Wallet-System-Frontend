import type { TRole, TStatus } from ".";

export interface IUser {
  _id?: string;
  wallet: string;
  name: string;
  phone: string;
  email: string;
  password: string;
  pin : string;
  role: TRole;
  status: TStatus;
  agentStatus?: string; 
  createdAt?: Date;
}