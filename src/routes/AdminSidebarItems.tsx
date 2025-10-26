import AllUsers from "@/pages/admin/AllUsers";
import type { ISidebarItem } from "@/types";

export const AdminSidebarItems: ISidebarItem[] = [
  {
    title: " Admin Dashboard",
    items: [
      {
        title: "All Users",
        url: "/admin/all-users",
        component: AllUsers
      },
    ],
  },
];