import { lazy } from "react";
import type { ISidebarItem } from "@/types";

const AddMoney = lazy(() => import("@/pages/userAndagent/AddMoney"));
const MyProfile = lazy(() => import("@/pages/userAndagent/MyProfile"));
const MyWallet = lazy(() => import("@/pages/userAndagent/MyWallet"));
const WithdrawMoney = lazy(() => import("@/pages/userAndagent/WithdrawMoney"));
const TransactionHistory = lazy(() => import("@/pages/userAndagent/TransactionHistory"));
const CashIn = lazy(() => import("@/pages/userAndagent/CashIn"));

export const AgentSidebarItems: ISidebarItem[] = [
  {
    title: "Agent Dashboard",
    items: [
      {
        title: "My Profile",
        url: "/agent/my-profile",
        component: MyProfile,
      },
      {
        title: "My Wallet",
        url: "/agent/my-wallet",
        component: MyWallet,
      },
      {
        title: "Add Money",
        url: "/agent/add-money",
        component: AddMoney,
      },
      {
        title: "Withdraw Money",
        url: "/agent/withdraw-money",
        component: WithdrawMoney,
      },
      {
        title: "Cash In",
        url: "/agent/cash-in",
        component: CashIn,
      },
      {
        title: "Transaction History",
        url: "/agent/transaction-history",
        component: TransactionHistory,
      },
    ],
  },
];
