import AllUsers from "@/pages/admin/AllUsers";
import AgentAddMoney from "@/pages/agent/AddMoney";
import UserAddMoney from "@/pages/user/AddMoney";
import BecomeAgent from "@/pages/user/BecomeAgent";
import MyProfile from "@/pages/user/MyProfile";
import MyWallet from "@/pages/user/MyWallet";
import SendMoney from "@/pages/user/SendMoney";
import TransactionHistory from "@/pages/user/TransactionHistory";
import WithdrawMoney from "@/pages/user/WithdrawMoney";
import { Role } from "@/constants/role";
import type { ComponentType } from "react";

export interface IDashboardRoute {
  title: string;
  url: string;
  component: ComponentType;
  roles: string[];
}

export const dashboardRoutes: IDashboardRoute[] = [
  // Admin Routes
  {
    title: "All Users",
    url: "/admin/all-users",
    component: AllUsers,
    roles: [Role.ADMIN],
  },
  // Agent Routes
  {
    title: "Add Money",
    url: "/agent/add-money",
    component: AgentAddMoney,
    roles: [Role.AGENT],
  },
  // User Routes
  {
    title: "My Profile",
    url: "/user/me",
    component: MyProfile,
    roles: [Role.USER, Role.AGENT],
  },
  {
    title: "My Wallet",
    url: "/user/my-wallet",
    component: MyWallet,
    roles: [Role.USER, Role.AGENT],
  },
  {
    title: "Add Money",
    url: "/user/add-money",
    component: UserAddMoney,
    roles: [Role.USER, Role.AGENT],
  },
  {
    title: "Withdraw Money",
    url: "/user/withdraw-money",
    component: WithdrawMoney,
    roles: [Role.USER, Role.AGENT],
  },
  {
    title: "Send Money",
    url: "/user/send-money",
    component: SendMoney,
    roles: [Role.USER],
  },
  {
    title: "Transaction History",
    url: "/user/transaction-history",
    component: TransactionHistory,
    roles: [Role.USER],
  },
  {
    title: "Become an Agent",
    url: "/user/become-agent",
    component: BecomeAgent,
    roles: [Role.USER],
  },
];
