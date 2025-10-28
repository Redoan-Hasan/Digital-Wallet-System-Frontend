import AddMoney from "@/pages/userAndagent/AddMoney";
import BecomeAgent from "@/pages/userAndagent/BecomeAgent";
import CashOut from "@/pages/userAndagent/CashOut";
import MyProfile from "@/pages/userAndagent/MyProfile";
import MyWallet from "@/pages/userAndagent/MyWallet";
import SendMoney from "@/pages/userAndagent/SendMoney";
import TransactionHistory from "@/pages/userAndagent/TransactionHistory";
import WithdrawMoney from "@/pages/userAndagent/WithdrawMoney";
import type { ISidebarItem } from "@/types";

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
