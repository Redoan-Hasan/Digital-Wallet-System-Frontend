import type { ComponentType } from "react";

export type { IUser } from "./auth.type";
export type { IWallet } from "./wallet.type";
export type { ITransaction } from "./transaction.type";
export type { IResponse } from "./response.type";

export type TRole = "ADMIN" | "USER" | "AGENT";

export type TStatus = "ACTIVE" | "BLOCKED";

export type TAgentStatus = "PENDING" | "APPROVED" | "REJECTED" | "NONE" | "SUSPENDED";


export interface ISidebarItem {
  title: string;
  items: {
    title: string;
    url: string;
    component: ComponentType;
  }[];
}