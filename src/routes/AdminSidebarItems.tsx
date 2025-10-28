import AdminDashboard from "@/pages/admin/AdminDashboard";
import AgentManagement from "@/pages/admin/AgentManagement";
import SystemTransactions from "@/pages/admin/SystemTransactions";
import UserManagement from "@/pages/admin/UserManagement";
import type { ISidebarItem } from "@/types";

export const AdminSidebarItems: ISidebarItem[] = [
  {
    title: "Admin Menu",
    items: [
      {
        title: "Dashboard",
        url: "/admin/dashboard",
        component: AdminDashboard,
      },
      {
        title: "User Management",
        url: "/admin/user-management",
        component: UserManagement,
      },
      {
        title: "Agent Management",
        url: "/admin/agent-management",
        component: AgentManagement,
      },
      {
        title: "System Transactions",
        url: "/admin/system-transactions",
        component: SystemTransactions,
      },
    ],
  },
];