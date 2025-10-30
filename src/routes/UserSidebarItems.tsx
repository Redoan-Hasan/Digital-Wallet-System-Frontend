import { lazy } from "react";
import type { ISidebarItem } from "@/types";

const AddMoney = lazy(() => import("@/pages/userAndagent/AddMoney"));
const BecomeAgent = lazy(() => import("@/pages/userAndagent/BecomeAgent"));
const CashOut = lazy(() => import("@/pages/userAndagent/CashOut"));
const MyProfile = lazy(() => import("@/pages/userAndagent/MyProfile"));
const MyWallet = lazy(() => import("@/pages/userAndagent/MyWallet"));
const SendMoney = lazy(() => import("@/pages/userAndagent/SendMoney"));
const TransactionHistory = lazy(() => import("@/pages/userAndagent/TransactionHistory"));
const WithdrawMoney = lazy(() => import("@/pages/userAndagent/WithdrawMoney"));

export const UserSidebarItems: ISidebarItem[] = [
  {
    title: " User Dashboard",
    items: [
      {
        title: "My Profile",
        url: "/user/my-profile",
        component: MyProfile,
      },
      {
        title: "My Wallet",
        url: "/user/my-wallet",
        component: MyWallet,
      },
      {
        title: "Add Money",
        url: "/user/add-money",
        component: AddMoney,
      },
      {
        title: "Withdraw Money",
        url: "/user/withdraw-money",
        component: WithdrawMoney,
      },
      {
        title: "Send Money",
        url: "/user/send-money",
        component: SendMoney,
      },
      {
        title: "Cash Out",
        url: "/user/cash-out",
        component: CashOut,
      },
      {
        title: "Transaction History",
        url: "/user/transaction-history",
        component: TransactionHistory,
      },
      {
        title: "Become an Agent",
        url: "/user/become-agent",
        component: BecomeAgent,
      },
    ],
  },
];
