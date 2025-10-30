import { lazy } from "react";
import type { ISidebarItem } from "@/types";

const AdminDashboard = lazy(() => import("@/pages/admin/AdminDashboard"));
const UserManagement = lazy(() => import("@/pages/admin/UserManagement"));
const AgentManagement = lazy(() => import("@/pages/admin/AgentManagement"));
const SystemTransactions = lazy(() => import("@/pages/admin/SystemTransactions"));

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