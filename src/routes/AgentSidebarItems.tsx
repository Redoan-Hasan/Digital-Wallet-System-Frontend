import AddMoney from "@/pages/userAndagent/AddMoney";
import MyProfile from "@/pages/userAndagent/MyProfile";
import MyWallet from "@/pages/userAndagent/MyWallet";
import WithdrawMoney from "@/pages/userAndagent/WithdrawMoney";
import TransactionHistory from "@/pages/userAndagent/TransactionHistory";
import type { ISidebarItem } from "@/types";
import CashIn from "@/pages/userAndagent/CashIn";

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
