import type { ComponentType } from "react";

export type { IUser } from "./auth.type";
export interface IResponse<T> {
  success: boolean;
  message: string;
  data: T;
  meta?: {
    page: number;
    limit: number;
    total: number;
    totalPage: number;
  };
}

export type TRole = "ADMIN" | "USER" | "AGENT";

export type TStatus = "ACTIVE" | "BLOCKED";

export interface ISidebarItem {
  title: string;
  items: {
    title: string;
    url: string;
    component: ComponentType;
  }[];
}