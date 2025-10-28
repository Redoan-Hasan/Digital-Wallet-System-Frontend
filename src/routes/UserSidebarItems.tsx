import AddMoney from "@/pages/user/AddMoney";
import BecomeAgent from "@/pages/user/BecomeAgent";
import MyProfile from "@/pages/user/MyProfile";
import MyWallet from "@/pages/user/MyWallet";
import SendMoney from "@/pages/user/SendMoney";
import TransactionHistory from "@/pages/user/TransactionHistory";
import WithdrawMoney from "@/pages/user/WithdrawMoney";
import type { ISidebarItem } from "@/types";

export const UserSidebarItems: ISidebarItem[] = [
  {
    title: " User Dashboard",
    items: [
      {
        title: "My Profile",
        url: "/user",
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